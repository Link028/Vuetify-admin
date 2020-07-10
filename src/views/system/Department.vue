<template> 
  <c-form-card title="部门管理">
    <template slot="card-content">
      <v-row no-gutters>

        <v-col cols="3" xs3 sm3 md3 lg3 xl3>
          <v-card class="elevation-16 pa-1 mr-2" outlined tile>
            <v-sheet class="pa-4 pt-0 pb-0 primary">
              <!-- flat solo-inverted hide-details -->
              <v-text-field v-model="searchTree" label="查找" dark clearable transition clear-icon="mdi-close-circle-outline"/>
              <!--
              <v-checkbox
                v-model="caseSensitive"
                dark
                hide-details
                label="Case sensitive search">
              </v-checkbox>
              -->
            </v-sheet><!-- 
              selectable 
              :open-on-click="true" 
               hoverable 
               activatable 
               expand-icon="mdi-chevron-down"
               on-icon="mdi-bookmark"
               off-icon="mdi-bookmark-outline"
               indeterminate-icon="mdi-bookmark-minus"   
               :search="searchTree"
               :filter="filter"
            -->
            <VuePerfectScrollbar  style="height: 460px !important; " minScrollbarLength="60" class="drawer-menu--scroll" maxScrollbarLength="260">
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
                  <!-- 
                  <v-icon
                    v-if="item.children"
                    v-text="`mdi-${item.id === 1 ? 'folder-network' : 'home-variant'}`" />
                  -->
                  <v-icon v-if="item.children" v-text="`mdi-folder-network`" />
                  <v-icon v-if="! item.children" v-text="`mdi-home-variant`" />
                </template>
              </v-treeview>
            </VuePerfectScrollbar>
            <!-- 
            <v-divider />
            <v-col class="pa-6" cols="6">
              <template v-if="!selection.length">
                No nodes selected.
              </template>
              <template v-else>
                <div v-for="node in selection" :key="node.id">
                  {{ node.name }}
                </div>
              </template>
            </v-col>
            -->
          </v-card>
      </v-col>

      <v-col cols="9" xs9 sm9 md9 lg9 xl9>

          <v-form ref="form" class="elevation-16 pa-4" color="primary">
              <v-row align="center">

                <v-col cols="6"  xs="6" md="6" lg="6">
                  <v-text-field v-model="condtions.orgParentId" class="d-none"/>
                  <v-text-field v-model="condtions.orgParentName" :counter="120" label="上级部门"  dark readonly/>
                </v-col>

                <v-col cols="6"  xs="6" md="6" lg="6">
                  <!-- <v-text-field v-model="condtions.orgParentId" class="d-none"/> -->
                  <v-text-field v-model="condtions.orgNum" :counter="20" label="部门编号"  dark clearable transition clear-icon="mdi-close-circle-outline"/>
                </v-col>
                <v-col cols="6"  xs="6" md="6" lg="6">
                  <v-text-field v-model="condtions.orgFullName" :counter="120" label="部门名称"  dark clearable transition clear-icon="mdi-close-circle-outline"/>
                </v-col>
                 <v-col cols="6"  xs="6" md="6" lg="6">
                  <v-select  v-model="condtions.orgType" :items="types" label="部门类型"  dark clearable transition clear-icon="mdi-close-circle-outline"/>
                </v-col>
              </v-row>
              <v-row align="center" justify="end">
                <v-btn tile text dark outlined height="36" width="140" class="mr-4" @click.stop="createItem"><v-icon left size="17">fa-plus</v-icon> 新建下级部门</v-btn>
                <v-btn tile text dark outlined height="36" width="80" class="mr-4" @click.stop="find"><v-icon left size="17">fa-search</v-icon> 查询</v-btn>
                <v-btn tile text dark outlined height="36" width="80" class="mr-3" @click.stop="clear"><v-icon left size="17">fa-mail-reply-all</v-icon> 重置</v-btn>
              </v-row>
          </v-form>

          <c-confirm-dialog content="确认删除这条记录？" :dialog="confirm" @confirm="remove(arguments)" />

          <v-data-table
            :headers="headers"
            :items="items"
            :items-per-page="options.itemsPerPage"
            :items-per-page-options="options.rowsPerPageItems"
            :page="options.page"
            :server-items-length="tatal"
            :options.sync="options"
            :expanded.sync="expanded"
            show-expand
            :single-expand="false"
            dark
            item-key="orgId"
            no-data-text="没有数据"
            class="elevation-16 primary mt-2 pa-4 pt-2 pb-2"
            :hide-default-footer="true"> 
            <template v-slot:item.orgType="{ item }">{{getOrgType(item.orgType)}}</template>
            <template v-slot:item.status="{ item }">{{getStatus(item.status)}}</template>
            <template v-slot:expanded-item="{ item }">
              <td :colspan="headers.length" style="padding: 0px;">
                <table cellspacing="0">
                  <tr style="padding: 0px;">
                    <td width="160px"><b>上级部门名称:</b></td><td>{{item.orgParentName}}</td>
                  </tr>                  
                  <tr style="padding: 0px;">
                    <td width="160px"><b>部门名称:</b></td><td>{{item.orgFullName}}</td>
                  </tr>
                  <tr style="padding: 0px;">
                    <td width="160px"><b>联系人:</b></td><td>{{item.conUser}}</td>
                  </tr>
                  <tr style="padding: 0px;">
                    <td width="160px"><b>联系人电话:</b></td><td>{{item.conTel}}</td>
                  </tr>
                  <tr style="padding: 0px;">
                    <td width="160px"><b>联系人邮箱:</b></td><td>{{item.conEmail}}</td>
                  </tr>
                  <tr style="padding: 0px;">
                    <td width="160px"><b>备注:</b></td><td>{{item.remark}}</td>
                  </tr>                                                      
                </table>
              </td>
            </template>
            <template v-slot:item.action="{ item }">
              <v-btn tile small text dark height="32" width="66" class="mr-0 body-2" @click="editItem(item)"><v-icon left size="16" class="mr-1">edit</v-icon>修改</v-btn>
              <v-btn tile small text dark height="32" width="66" class="mr-0 body-2" @click="removeItem(item)"><v-icon left size="16" class="mr-1">delete</v-icon>删除</v-btn>
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
                        <v-text-field  label="上级部门" readonly v-model="fields.orgParentName"  hint="上级部门" />
                      </v-col>
                      <v-col cols="6"  xs="6" md="6" lg="6">
                        <v-text-field label="部门名称" v-model="fields.orgFullName"  @input="$v.fields.orgFullName.$touch()"  @blur="$v.fields.orgFullName.$touch()" :error-messages="orgFullNameErrors" :counter="120" required hint="部门名称"/>
                      </v-col>                      
                      <v-col cols="6"  xs="6" md="6" lg="6">
                        <v-text-field v-model="fields.orgParentId" class="d-none"/>
                        <v-text-field v-model="fields.orgId"       class="d-none"/>
                        <v-text-field v-model="fields.version"     class="d-none"/>
                        <v-text-field label="部门编号" v-model="fields.orgNum" @input="$v.fields.orgNum.$touch()"  @blur="$v.fields.orgNum.$touch()" :error-messages="orgNumErrors" :counter="20" required hint="部门编号"/>
                      </v-col>
                      <v-col cols="6"  xs="6" md="6" lg="6">
                        <v-text-field label="部门简称" v-model="fields.orgName"  @input="$v.fields.orgName.$touch()"  @blur="$v.fields.orgName.$touch()" :error-messages="orgNameErrors" :counter="20" required hint="部门简称"/>
                      </v-col>
                      <v-col cols="6"  xs="6" md="6" lg="6">
                        <v-select     label="部门类型" v-model="fields.orgType" :items="types" :error-messages="orgTypeErrors" required/>
                      </v-col>
                      <v-col cols="6"  xs="6" md="6" lg="6">
                        <v-text-field     label="负责人" v-model="fields.conUser"  :error-messages="conUserErrors"/>
                      </v-col>
                      <v-col cols="6"  xs="6" md="6" lg="6">
                        <v-text-field     label="联系电话" v-model="fields.conTel"  :error-messages="conTelErrors" />
                      </v-col>
                      <v-col cols="6"  xs="6" md="6" lg="6">
                        <v-text-field     label="邮箱" v-model="fields.conEmail"  :error-messages="conEmailErrors" />
                      </v-col>
                      <v-col cols="6"  xs="6" md="6" lg="6">
                        <v-select     label="状态" v-model="fields.status" :items="states" :error-messages="statusErrors" required/>
                      </v-col>
                      <v-col cols="12"  xs="12" md="12" lg="12">
                        <v-text-field label="备注" v-model="fields.remark" :counter="120" :error-messages="remarkErrors"/>
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
import VuePerfectScrollbar from "vue-perfect-scrollbar"
 import { validationMixin } from 'vuelidate'
 import { required,minLength,maxLength,email,between,ipAddress,alpha,alphaNum,numeric,sameAs,url,or,and,requiredIf,requiredUnless,minValue,maxValue} from 'vuelidate/lib/validators'

 export default {
      components: {VuePerfectScrollbar },
      validations: {fields:{
          orgFullName: { required, maxLength: maxLength(120) },
          orgNum: { numeric , required, maxLength: maxLength(20) },
          orgName: { required, maxLength: maxLength(40) },
          orgType: { required },
          conUser: { maxLength: maxLength(40) },
          conTel: { numeric , minLength: minLength(6),maxLength: maxLength(40) },
          conEmail: { email , maxLength: maxLength(40) },
          status: { required },
          remark: {  maxLength: maxLength(120) },
      }},
      computed: {
        orgFullNameErrors () {
          const errors = []
          if (!this.$v.fields.orgFullName.$dirty) return errors ;
          !this.$v.fields.orgFullName.maxLength && errors.push('不超过120个字符') ;
          !this.$v.fields.orgFullName.required && errors.push('需要输入') ;
          return errors ;
        },
        orgNumErrors () {
          const errors = []
          if (!this.$v.fields.orgNum.$dirty) return errors ;
          !this.$v.fields.orgNum.numeric && errors.push('机构号码为全数字') ;
          !this.$v.fields.orgNum.maxLength && errors.push('不超过20个字符') ;
          !this.$v.fields.orgNum.required && errors.push('需要输入') ;
          return errors ;
        },
        orgNameErrors () {
          const errors = []
          if (!this.$v.fields.orgName.$dirty) return errors ;
          !this.$v.fields.orgName.maxLength && errors.push('不超过40个字符') ;
          !this.$v.fields.orgName.required && errors.push('需要输入') ;
          return errors ;
        },
        orgTypeErrors () {
          const errors = []
          if (!this.$v.fields.orgType.$dirty) return errors ;
          !this.$v.fields.orgType.required && errors.push('需要输入') ;
          return errors ;
        },
        conUserErrors () {
          const errors = []
          if (!this.$v.fields.conUser.$dirty) return errors ;
          !this.$v.fields.conUser.maxLength && errors.push('不超过40个字符') ;
          return errors ;
        },
        conTelErrors () {
          const errors = []
          if (!this.$v.fields.conTel.$dirty) return errors ;
          !this.$v.fields.conTel.minLength && errors.push('电话号码6个字符') ;
          !this.$v.fields.conTel.maxLength && errors.push('不超过40个字符') ;
          !this.$v.fields.conTel.numeric && errors.push('输入正确的联系电话') ;
          return errors ;
        },
        conEmailErrors () {
          const errors = []
          if (!this.$v.fields.conEmail.$dirty) return errors ;
          !this.$v.fields.conEmail.maxLength && errors.push('不超过40个字符') ;
          !this.$v.fields.conEmail.email && errors.push('输入正确的邮箱地址') ;
          return errors ;
        },
        statusErrors () {
          const errors = []
          if (!this.$v.fields.status.$dirty) return errors ;
          !this.$v.fields.status.required && errors.push('需要输入') ;
          return errors ;
        },
        remarkErrors () {
          const errors = []
          if (!this.$v.fields.remark.$dirty) return errors ;
          !this.$v.fields.remark.maxLength && errors.push('不超过120个字符') ;
          return errors ;
        },
        filter(){
           return this.caseSensitive ? (trees, searchTree, textKey) => trees[textKey].indexOf(searchTree) > -1: undefined ;
        },  
      },
      data: () => ({
          headers: [ //headers表头数组，里面是对象 //left，center，rights三种对其方式
            {text: '部门编号',   align: 'start', value: 'orgNum',   sortable: true},
            {text: '部门简称',   align: 'start',   value: 'orgName' ,   sortable: true },
            //{text: '部门名称',  align: 'start', value: 'orgFullName' ,   sortable: true },
            {text: '部门类型',   align: 'center', value: 'orgType' ,  sortable: true },
            {text: '部门状态',   align: 'center', value: 'status' ,  sortable: true },
            //{text: '备注',     align: 'start', value: 'remark' ,  sortable: false },
            { text: '',      align: 'center', width: '60px',value: 'data-table-expand' },
            {text: '操作',       align: 'center', value: 'action' ,  sortable: false },
          ],
          tatal : 0,
          totalPages  : 0,
          items: [],
          expanded: [],
          options: { page : 1 , itemsPerPage: 10, rowsPerPageItems: [5, 10, 20, 50] } , 
          condtions: {orgParentId: '', orgParentName: '', orgNum: '', orgFullName: '', orgType: '' },
          fields: { orgId:'', orgParentId:'',orgParentName: '',orgNum:'',orgName:'', orgFullName:'', orgType:'', conUser:'', conTel:'', conEmail:'', status: '',remark:'' , version:0 },
          types: [{value:'1',text:'机构'},{value:'2',text:'部门'}],//,{value:'3',text:'岗位'},{value:'4',text:'其它'}
          states:[{value:'1',text:'有效'},{value:'0',text:'无效'}],
          dialog: false,
          confirm: false ,
          title:'',
          opration:'',
          trees: [],
          searchTree: null,
          caseSensitive: false,
          selection: [],
      }),
      mounted(){
         this.getTree();
      },
      watch: {
        options: { handler () { this.search();}, deep: true ,},
      },
      methods: {
        getOrgType (type) {
          if('1' === type){return '机构'} else if('2' === type) {return '部门'} else if('3' === type) {return '岗位'}  if('4' === type) {return '其它'} else {return ''}
        },
        getStatus (type) {
          if('1' === type){return '有效'} else if('0' === type) {return '无效'} else {return ''}
        },
        getTree () {
            this.$http.get("/app-system/org/findOrg")
            .then((data) => {this.trees = data.data ;})
            .catch((err)=>{ console.log( err ); });
        },
        find () {
          this.options.page = 1 ;
          this.options.itemsPerPage = 10 ;
          this.search();
        },        
        clear () {
          var orgParentId =  this.condtions.orgParentId ;
          var orgParentName =  this.condtions.orgParentName ;
          this.options.page = 1 ;
          this.options.itemsPerPage = 10 ;
          this.condtions = {};//this.$refs.form.reset(); //bug
          this.condtions.orgParentId = orgParentId ;
          this.condtions.orgParentName = orgParentName ;
          this.search();
        },
        search () {
          this.condtions.number = this.options.page ;
          this.condtions.size = this.options.itemsPerPage ;
          if ( this.options.sortBy && this.options.sortBy.length === 1 && this.options.sortDesc && this.options.sortDesc.length === 1) {
              this.condtions.sortName =  this.options.sortBy[0] ;
              this.condtions.sortType=  this.options.sortDesc[0] ;
          }
          console.log(this.condtions);
          this.$http.get("/app-system/org/find",{ params : this.condtions } )
              .then((data) => {
                this.items = data.data ;
                this.tatal= data.totalElements ; 
                this.totalPages=data.totalPages ;
                //console.log(  data.data ); 
                })
              .catch((err)=>{ console.log( err ); });
          this.getTree();
        },
        //对话框
        createItem() {
          this.$v.$reset();

          var orgParentId =  this.fields.orgParentId ;
          var orgParentName =  this.fields.orgParentName ;
          this.fields = {};
          this.fields.orgParentId = orgParentId ;
          this.fields.orgParentName = orgParentName ;

          this.title="新建部门";
          this.opration="save";
          this.dialog = true  ;
        },
        editItem (item) {
          this.$v.$reset();
          this.fields = Object.assign({}, item) ;
          if( item.parent )
          {
            this.fields.orgParentId = item.parent.orgId ;
            this.fields.orgParentName = item.parent.orgFullName ;
          }

          this.title="修改部门";
          this.opration="edit";
          this.dialog = true  ;
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
          this.$http.post("/app-system/org/create",this.fields)
              .then((data) => {this.$message.info("创建成功.");this.find();})
              .catch((err)=>{ console.log("Error:"+err)});
        },
        update () {
          this.$v.$touch();
          if(  this.$v.$invalid ) return ;
          this.dialog = false  ;
          this.$http.post("/app-system/org/update",this.fields )
              .then((data) => {this.$message.info("修改成功.");this.find();})
              .catch((err)=>{ console.log("Error:"+err)});
        },
        remove( val ) { 
          if( val &&  val[0] ) { 
              this.$http.post("/app-system/org/delete", this.fields )
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
            //console.dir( item[0] );
            //alert( item[0].id ) ;
            //alert( item[0].name ) ;
            this.condtions.orgParentId = item[0].id ;
            this.condtions.orgParentName = item[0].name ;
            this.fields.orgParentId = item[0].id ;
            this.fields.orgParentName = item[0].name ;
          }
          else
          {
            this.condtions.orgParentId = null ;
            this.condtions.orgParentName = null ;
            this.fields.orgParentId = null ;
            this.fields.orgParentName = null ;
          }

          this.find();
        },
      },
  }
</script>