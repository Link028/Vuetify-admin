<template> 
  <c-form-card title="用户管理">
    <template slot="card-content">
      <v-row no-gutters>

        <v-col cols="3" xs3 sm3 md3 lg3 xl3>
          <v-card class="elevation-16 pa-1 mr-2" outlined tile>
            <v-sheet class="pa-4 pt-0 pb-0 primary">
              <v-text-field v-model="searchTree" label="查找" dark clearable transition clear-icon="mdi-close-circle-outline"/>
            </v-sheet>
            <VuePerfectScrollbar  style="height: 460px !important; overflow: auto; " minScrollbarLength="60" class="drawer-menu--scroll" maxScrollbarLength="260">            
              <v-treeview
                dark 
                dense 
                hoverable 
                activatable 
                :items="trees" 
                v-model="selection"
                selection-type="independent"
                return-object
                v-on:update:active=selectIterm
                :search="searchTree"
                :filter="filter"
                color="primary lighten-5">
                <template v-slot:prepend="{ item }">
                  <v-icon v-if="item.children" v-text="`mdi-folder-network`" />
                  <v-icon v-if="! item.children" v-text="`mdi-home-variant`" />
                </template>
              </v-treeview>
            </VuePerfectScrollbar>
          </v-card>
      </v-col>

      <v-col cols="9" xs9 sm9 md9 lg9 xl9>

          <v-form ref="form" class="elevation-16 pa-4" color="primary">
              <v-row align="center">
                <v-col cols="12"  xs="12" md="12" lg="12">
                  <v-text-field v-model="condtions.orgId" class="d-none"/>
                  <v-text-field v-model="condtions.orgName" :counter="120" label="部门名称"  dark readonly/>
                </v-col>
                <v-col cols="6"  xs="6" md="6" lg="6">
                  <v-text-field v-model="condtions.userNum" :counter="24" label="用户账号"  dark clearable transition clear-icon="mdi-close-circle-outline"/>
                </v-col>
                <v-col cols="6"  xs="6" md="6" lg="6">
                  <v-text-field v-model="condtions.userName" :counter="20" label="用户名称"  dark clearable transition clear-icon="mdi-close-circle-outline"/>
                </v-col>
              </v-row>
              <v-row align="center" justify="end">
                <v-btn tile text dark outlined height="36" width="80" class="mr-4" @click.stop="createItem"><v-icon left size="17">fa-plus</v-icon> 新建</v-btn>
                <v-btn tile text dark outlined height="36" width="80" class="mr-4" @click.stop="find"><v-icon left size="17">fa-search</v-icon> 查询</v-btn>
                <v-btn tile text dark outlined height="36" width="80" class="mr-3" @click.stop="clear"><v-icon left size="17">fa-mail-reply-all</v-icon> 重置</v-btn>
              </v-row>
          </v-form>

          <c-confirm-dialog content="确认删除这条记录？" :dialog="confirm" @confirm="remove(arguments)" />
          <c-confirm-dialog content="确认重置密码？" :dialog="resert" @confirm="updatePass(arguments)" />
          <department-tree :orgDialog="orgDialog" @select="selectTree" />

          <v-data-table
            :headers="headers"
            :items="items"
            :items-per-page="options.itemsPerPage"
            :items-per-page-options="options.rowsPerPageItems"
            :page="options.page"
            :server-items-length="tatal"
            :options.sync="options"
            show-expand
            :single-expand="false"
            dark
            item-key="userId"
            no-data-text="没有数据"
            class="elevation-16 primary mt-2 pa-4 pt-2 pb-2"
            :hide-default-footer="true"> 
            <template v-slot:item.gender="{ item }">{{getGender(item.gender)}}</template>
            <template v-slot:item.userStatus="{ item }">{{getStatus(item.userStatus)}}</template>
            <template v-slot:expanded-item="{ item }">
              <td :colspan="headers.length" style="padding: 0px;">
                <table cellspacing="0">
                  <tr style="padding: 0px;">
                    <td width="160px"><b>Email:</b></td><td>{{item.email}}</td>
                  </tr> 
                  <tr style="padding: 0px;">
                    <td width="160px"><b>所属部门:</b></td><td>{{ item.org ? item.org.orgFullName: '' }}</td>
                  </tr>                      
                  <tr style="padding: 0px;">
                    <td width="160px"><b>备注:</b></td><td>{{item.remark}}</td>
                  </tr>                       
                </table>
              </td>
            </template>
            <template v-slot:item.action="{ item }">
              <v-btn tile small text dark height="32" width="90" class="mr-0 body-2" @click="resertPass(item)"><v-icon left size="16" class="mr-1">lock</v-icon>重置密码</v-btn>
              <v-btn tile small text dark height="32" width="66" class="mr-0 body-2" @click="editItem(item)"><v-icon left size="16" class="mr-1">edit</v-icon>修改</v-btn>
              <template v-if="item.userNum != 'admin' ">
                <v-btn tile small text dark height="32px" width="66" class="mr-0 body-2" @click="removeItem(item)"><v-icon left size="16" class="mr-1">delete</v-icon>删除</v-btn>
              </template>
            </template>
          </v-data-table>
    
          <v-flex xs8 sm8 md8 lg8 xl8 class="d-flex justify-center align-center ml-5 mr-5">
            <v-pagination circle :total-visible="20" v-model="options.page" :length="totalPages" color="primary lighten-1" class="pt-2 pb-0 mb-0 mt-0" />
          </v-flex>
        
          <c-dialog :title="title" :dialog="dialog" @save="save" @close="close">
            <template slot="dialog-content">
                <v-form class="pa-2" color="primary" dark>
                    <v-row>
                      <v-col cols="12"  xs="12" md="12" lg="12">
                        <v-row> <!-- v-if="this.opration==='save' "  -->
                          <v-text-field  label="所属部门" v-model="fields.orgName" :error-messages="orgErrors" @input="$v.fields.orgName.$touch()" @blur="$v.fields.orgName.$touch()" readonly required transition hint="所属部门"/>
                          <v-btn outlined small tile text dark height="36" width="20" class="mr-4" @click.stop="openOrgTree">...</v-btn>
                        </v-row>
                      </v-col>
                      <v-col cols="6"  xs="6" md="6" lg="6">
                        <v-text-field v-model="fields.orgId"   class="d-none" />
                        <v-text-field v-model="fields.userId"  class="d-none" />
                        <v-text-field v-model="fields.version" class="d-none" />
                        <v-text-field v-model="fields.status"  class="d-none" />
                        <v-text-field label="用户帐号" v-model="fields.userNum" @input="$v.fields.userNum.$touch()"  @blur="$v.fields.userNum.$touch()" :error-messages="userNumErrors" :counter="24" required hint="用户帐号" clearable transition clear-icon="mdi-close-circle-outline"/>
                      </v-col>
                      <v-col cols="6"  xs="6" md="6" lg="6">
                        <v-text-field label="用户名称" v-model="fields.userName"  @input="$v.fields.userName.$touch()"  @blur="$v.fields.userName.$touch()" :error-messages="userNameErrors" :counter="20" required hint="用户名称" clearable transition clear-icon="mdi-close-circle-outline"/>
                      </v-col>
                      <v-col cols="6"  xs="6" md="6" lg="6">
                        <v-select     label="性别" v-model="fields.gender" :items="genders" :error-messages="genderErrors" required/>
                      </v-col>
                      <!-- 
                      <v-col cols="6"  xs="6" md="6" lg="6">
                        <v-text-field     label="密码" v-model="fields.password"  :error-messages="conUserErrors"/>
                      </v-col>
                      <v-col cols="6"  xs="6" md="6" lg="6">
                        <v-text-field     label="确认密码" v-model="fields.rpassword"  :error-messages="conUserErrors"/>
                      </v-col>
                      -->
                      <v-col cols="6"  xs="6" md="6" lg="6">
                        <v-text-field     label="手机号码" v-model="fields.phone" @input="$v.fields.phone.$touch()"  @blur="$v.fields.phone.$touch()" :error-messages="phoneErrors" :counter="13" required clearable transition clear-icon="mdi-close-circle-outline"/>
                      </v-col>
                      <v-col cols="6"  xs="6" md="6" lg="6">
                        <v-text-field     label="邮箱" v-model="fields.email" @input="$v.fields.email.$touch()"  @blur="$v.fields.email.$touch()" :error-messages="emailErrors" :counter="40" required clearable transition clear-icon="mdi-close-circle-outline"/>
                      </v-col>
                      <v-col cols="6"  xs="6" md="6" lg="6">
                        <v-select     label="用户状态" v-model="fields.userStatus" :items="states" :error-messages="statusErrors" required />
                      </v-col>
                      <v-col cols="12"  xs="12" md="12" lg="12">
                        <v-text-field label="备注" v-model="fields.remark" :counter="120" :error-messages="remarkErrors" clearable transition clear-icon="mdi-close-circle-outline"/>
                      </v-col>
                    </v-row>
                </v-form>
            </template>    
          </c-dialog>

        </v-col>
      </v-row>
    </template> 
  </c-form-card>
</template>

<script>
import  VuePerfectScrollbar from "vue-perfect-scrollbar"
 import DepartmentTree from './DepartmentTree.vue';
 import { validationMixin } from 'vuelidate' ;
 import { required,minLength,maxLength,email,between,ipAddress,alpha,alphaNum,numeric,sameAs,url,or,and,requiredIf,requiredUnless,minValue,maxValue} from 'vuelidate/lib/validators' ;
 
 //this.$.component('department-tree', DepartmentTree);
 
 export default {
     components: {
        DepartmentTree,
        VuePerfectScrollbar
      },
      validations: {fields:{
          orgName: { required },
          userNum: { required, minLength: minLength(2) , maxLength: maxLength(24) },
          userName: { required,minLength: minLength(2) , maxLength: maxLength(20) },
          gender: { required },
          phone: { numeric ,required, minLength: minLength(6),maxLength: maxLength(13) },
          email: { email , required, maxLength: maxLength(40) },
          userStatus: { required },
          remark: {  maxLength: maxLength(120) },
      }},
      computed: {
        orgErrors () {
          const errors = [];
          if (!this.$v.fields.orgName.$dirty) return errors ;
          !this.$v.fields.orgName.required && errors.push('需要输入') ;
          return errors ;
        },
        userNumErrors () {
          const errors = []
          if (!this.$v.fields.userNum.$dirty) return errors ;
          !this.$v.fields.userNum.required && errors.push('需要输入') ;          
          !this.$v.fields.userNum.minLength && errors.push('至少2个字符') ;
          !this.$v.fields.userNum.maxLength && errors.push('不超过24个字符') ;
          return errors ;
        },
        userNameErrors () {
          const errors = []
          if (!this.$v.fields.userName.$dirty) return errors ;
          !this.$v.fields.userName.required && errors.push('需要输入') ;
          !this.$v.fields.userName.minLength && errors.push('至少2个字符') ;
          !this.$v.fields.userName.maxLength && errors.push('不超过20个字符') ;
          return errors ;
        },
        genderErrors () {
          const errors = []
          if (!this.$v.fields.gender.$dirty) return errors ;
          !this.$v.fields.gender.required && errors.push('需要输入') ;
          return errors ;
        },
        phoneErrors () {
          const errors = []
          if (!this.$v.fields.phone.$dirty) return errors ;
          !this.$v.fields.phone.required && errors.push('需要输入') ;
          !this.$v.fields.phone.numeric && errors.push('输入正确的联系电话') ;
          !this.$v.fields.phone.minLength && errors.push('电话号码6个字符') ;
          !this.$v.fields.phone.maxLength && errors.push('不超过20个字符') ;
          return errors ;
        },
        emailErrors () {
          const errors = []
          if (!this.$v.fields.email.$dirty) return errors ;
          !this.$v.fields.email.required && errors.push('需要输入') ;
          !this.$v.fields.email.email && errors.push('输入正确的邮箱地址') ;
          !this.$v.fields.email.maxLength && errors.push('不超过40个字符') ;
          return errors ;
        },
        statusErrors () {
          const errors = []
          if (!this.$v.fields.userStatus.$dirty) return errors ;
          !this.$v.fields.userStatus.required && errors.push('需要输入') ;
          return errors ;
        },
        remarkErrors () {
          const errors = []
          if (!this.$v.fields.remark.$dirty) return errors ;
          !this.$v.fields.remark.maxLength && errors.push('不超过120个字符') ;
          return errors ;
        },
        filter () {
           return this.caseSensitive
          ? (trees, searchTree, textKey) => trees[textKey].indexOf(searchTree) > -1
          : undefined
        },  
      },
      data: () => ({
          headers: [ //headers表头数组，里面是对象 //left，center，rights三种对其方式
            {text: '用户帐号',   align: 'start', value: 'userNum',   sortable: true},
            {text: '用户名称',   align: 'start',   value: 'userName' ,   sortable: true },
            {text: '性别',       align: 'center', value: 'gender' ,  sortable: true },
            {text: '手机号码',   align: 'center', value: 'phone' ,  sortable: true },
            {text: '状态',       align: 'center', value: 'userStatus' ,  sortable: true },
            { text: '',          align: 'center', width: '60px',value: 'data-table-expand' },
            {text: '操作',       align: 'center', value: 'action' ,  sortable: false },
          ],
          tatal : 0,
          totalPages  : 0,
          items: [],
          options: { page : 1 , itemsPerPage: 10, rowsPerPageItems: [5, 10, 20, 50] } , 
          condtions: {orgId: '', orgName:'', userNum: '', userName: ''},
          fields: { orgId:'', orgName:'',userNum:null,userName:null, gender:null, email:null, phone:null, address:null, password: null,userStatus:null,remark:null , version:0 },
          states:[{value:'1',text:'启用'},{value:'0',text:'停用'},{value:'3',text:'锁定'},{value:'4',text:'未激活'}],
          genders:[{value:'M',text:'男'},{value:'F',text:'女'}],
          dialog: false, 
          confirm: false ,
          resert: false ,
          title:'',
          opration:'',
          trees: [],
          searchTree: null,
          caseSensitive: false,
          selection: [],
          orgDialog : false ,
      }),
      mounted(){
         this.getTree();
      },
      watch: {
        options: { handler () { this.search();}, deep: true ,},
      },
      methods: {
        openOrgTree()
        {
          this.orgDialog = true ;
        },
        selectTree( sorgId , sorgName )
        {
          this.orgDialog = false ;
          this.fields.orgId =  sorgId ;
          this.fields.orgName = sorgName ;
          
          this.$v.fields.orgName.$reset(); 
        },
        getGender (type) {
          if('F' === type){return '女'} else if('M' === type) {return '男'} else {return ''}
        },
        getStatus (type) {
          if('1' === type){return '启用'} else if('0' === type) {return '停用'} else if('2' === type) {return '删除'} else if('3' === type) {return '锁定'} else if('4' === type) {return '未激活'} else {return ''}
        },
        getTree () {
              this.$http.get("/app-system/org/findOrg")
              .then((data) => { this.trees = data.data ;})
              .catch((err)=>{ this.$message.error(err); });
        },
        find () {
          this.options.page = 1 ;
          this.options.itemsPerPage = 10 ;
          this.search();
        },        
        clear () {
          var orgId =  this.condtions.orgId ;
          var orgName =  this.condtions.orgName ;
          this.options.page = 1 ;
          this.options.itemsPerPage = 10 ;
          this.condtions = {};
          this.condtions.orgId = orgId ;
          this.condtions.orgName = orgName ;
          this.search();
        },
        search () {
          this.condtions.number = this.options.page ;
          this.condtions.size = this.options.itemsPerPage ;
          if ( this.options.sortBy && this.options.sortBy.length === 1 && this.options.sortDesc && this.options.sortDesc.length === 1) {
              this.condtions.sortName =  this.options.sortBy[0] ;
              this.condtions.sortType=  this.options.sortDesc[0] ;
          }
          //console.log(this.condtions);
          this.$http.get("/app-system/user/find",{ params : this.condtions } )
              .then((data) => {
                this.items = data.data ;
                this.tatal= data.totalElements ; 
                this.totalPages=data.totalPages ;
                })
              .catch((err)=>{ console.log( err ); });
          this.getTree();
        },
        //对话框
        createItem() {
          //if( ! this.condtions.orgId || this.condtions.orgId === null || this.condtions.orgId === '' )
          //{
          //  this.$message.error("请先选择部门.");
          //  return ;
          //}

          this.$v.$reset(); 
          this.fields = {}; 
          this.title="新建用户";
          this.opration="save";
          this.dialog = true  ;
        },
        editItem (item) {
          this.$v.$reset();
          this.fields = Object.assign({}, item) ;
          if(item.org)
          {
            this.fields.orgId = item.org.orgId ;
            this.fields.orgName = item.org.orgFullName ;
          }

          this.title="修改用户";
          this.opration="edit";
          this.dialog = true  ;
        },
        resertPass(item){
          this.fields = Object.assign({}, item) ;
          this.resert = true ;
        },
        updatePass( val ){
          if( val &&  val[0] ) { 
              this.$http.post("/app-system/user/resert", this.fields )
              .then((data) => {this.$message.info("重置密码成功.");})
              .catch((err)=>{ console.log("Error:"+err)});
          } 
          this.resert = false ;
        },
        removeItem (item) {
          //this.editedIndex = this.items.indexOf(item) ;
          this.fields = Object.assign({}, item) ;
          this.confirm = true ;
        },
        create () {
          this.$v.$touch();
          if(  this.$v.$invalid ) return ;
          this.dialog = false  ;
          this.$http.post("/app-system/user/create",this.fields)
              .then((data) => {this.$message.info("创建成功.");this.find();})
              .catch((err)=>{ console.log("Error:"+err)});
        },
        update () {
          this.$v.$touch();
          if(  this.$v.$invalid ) return ;
          this.dialog = false  ;
          this.$http.post("/app-system/user/update",this.fields )
              .then((data) => {this.$message.info("修改成功.");this.find();})
              .catch((err)=>{ console.log("Error:"+err)});
        },
        remove( val ) { 
          if( val &&  val[0] ) { 
              this.$http.post("/app-system/user/delete", this.fields )
              .then((data) => {this.$message.info("删除成功.");this.find();})
              .catch((err)=>{ console.log("Error:"+err)});
          } 
          this.confirm = false ;
        },
        save () {
          if(this.opration === 'save') {this.create();}  else {this.update();} 
        },
        close() {
          this.dialog = false  ;
        },
        selectIterm( item ) 
        {
          if( item && item[0])
          {
            this.condtions.orgId = item[0].id ;
            this.condtions.orgName = item[0].name ;
            this.fields.orgId = item[0].id ;
            this.fields.orgName = item[0].name ;
          }
          else
          {
            this.condtions.orgId = null ;
            this.condtions.orgName = null ;
            this.fields.orgId = null ;
            this.fields.orgName = null ;
          }

          this.find();
        },
      },
  }
</script>