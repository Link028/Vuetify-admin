<template> 
  <c-form-card title="角色管理">
    <template slot="card-content">
      
      <v-flex xs12 sm12 md12 lg12 xl12>
        <v-form ref="form" class="elevation-16 pa-4" color="primary">
            <v-row align="center">
              <v-col cols="12"  xs="12" md="6" lg="4">
                <v-text-field v-model="condtions.paramName" :counter="20" label="参数名称"  dark />
              </v-col>
              <v-col cols="12"  xs="12" md="6" lg="4">
                <v-text-field v-model="condtions.paramKey" :counter="20" label="参数键名"  dark/>
              </v-col>
              <v-col cols="12"  xs="12" md="6" lg="4">
                <v-select     v-model="condtions.paramType" :items="ptype" label="是否系统参数"  dark/>
              </v-col>
            </v-row>
            <v-row align="center" justify="end">
              <v-btn tile text dark outlined height="36px" width="80" class="mr-4" @click.stop="createItem"><v-icon left size="17">fa-plus</v-icon> 新建</v-btn>
              <v-btn tile text dark outlined height="36px" width="80" class="mr-4" @click.stop="find"><v-icon left size="17">fa-search</v-icon> 查询</v-btn>
              <v-btn tile text dark outlined height="36px" width="80" class="mr-3" @click.stop="clear"><v-icon left size="17">fa-mail-reply-all</v-icon> 重置</v-btn>
            </v-row>
        </v-form>
      </v-flex>

      <v-flex xs12 sm12 md12 lg12 xl12><c-confirm-dialog content="确认删除这条记录？" :dialog="confirm" @confirm="remove(arguments)" /></v-flex>

      <v-flex xs12 sm12 md12 lg12 xl12>
        <v-data-table
          :headers="headers"
          :items="items"
          :items-per-page="options.itemsPerPage"
          :items-per-page-options="options.rowsPerPageItems"
          :page="options.page"
          :server-items-length="tatal"
          :options.sync="options"
          dark
          no-data-text="没有数据"
          class="elevation-16 primary mt-2 pa-4 pt-2 pb-2"
          :hide-default-footer="true"
          > 
         <!-- 
          <template v-slot:item.paramType="{ item }">
               <v-chip :color="getColor(item.paramType)" dark>{{ item.paramType }}</v-chip>
          </template>
          -->
          <template v-slot:item.paramType="{ item }">{{getType(item.paramType)}}</template>
          <template v-slot:item.action="{ item }">
            <v-btn tile small text dark height="32px" width="66" class="mr-0 body-2" @click="editItem(item)"><v-icon left size="16" class="mr-1">edit</v-icon>修改</v-btn>
            <v-btn tile small text dark height="32px" width="66" class="mr-0 body-2" @click="removeItem(item)"><v-icon left size="16" class="mr-1">delete</v-icon>删除</v-btn>
          </template>
        </v-data-table>
        <!--  -->
        <v-flex xs12 sm12 md12 lg12 xl12 class="d-flex justify-center align-center ml-5 mr-5">
          <v-pagination circle :total-visible="20" v-model="options.page" :length="totalPages" color="primary lighten-1" class="pt-2 pb-0 mb-0 mt-0" />
        </v-flex>
      </v-flex>
      <v-flex xs12 sm12 md12 lg12 xl12>
        <c-dialog :title="title" :width="600" :dialog="dialog" @save="save" @close="close">
              <template slot="dialog-content">
               <v-form class="pa-2" color="primary" dark>
                  <v-row>
                    <v-col cols="12"  xs="12" md="12" lg="12">
                      <v-text-field v-model="fields.paramId" class="d-none"/>
                      <v-text-field v-model="fields.version" class="d-none"/>
                      <v-text-field label="参数名称" v-model="fields.paramName" @input="$v.fields.paramName.$touch()"  @blur="$v.fields.paramName.$touch()" :error-messages="nameErrors" :counter="20" required hint="参数名称"/>
                    </v-col>
                    <v-col cols="12"  xs="12" md="12" lg="12">
                      <v-text-field label="参数键名" v-model="fields.paramKey"  @input="$v.fields.paramKey.$touch()"  @blur="$v.fields.paramKey.$touch()" :error-messages="keyErrors" :counter="20" required hint="多个参数使用统一的键名进行管理" />
                    </v-col>
                    <v-col cols="12"  xs="12" md="12" lg="12">
                      <v-text-field label="参数键值" v-model="fields.paramVal"  @input="$v.fields.paramVal.$touch()"  @blur="$v.fields.paramVal.$touch()" :error-messages="valErrors" :counter="40" required />
                    </v-col>
                    <v-col cols="12"  xs="12" md="12" lg="12">
                      <v-select     label="是否系统参数" v-model="fields.paramType" :items="ptype" :error-messages="typeErrors" required/>
                    </v-col>
                    <v-col cols="12"  xs="12" md="12" lg="12">
                      <v-text-field label="描述" v-model="fields.remark" :counter="120" :error-messages="remarkErrors"/>
                    </v-col>
                  </v-row>
               </v-form>
              </template>    
        </c-dialog>
      </v-flex>
    </template> 
  </c-form-card>
</template>

<script>
 import { validationMixin } from 'vuelidate'
 import { required,minLength,maxLength,email,between,ipAddress,alpha,alphaNum,numeric,sameAs,url,or,and,requiredIf,requiredUnless,minValue,maxValue} from 'vuelidate/lib/validators'

 export default {
      validations: {fields:{
          paramName: { required, maxLength: maxLength(20) },
          paramKey: { required, maxLength: maxLength(20) },
          paramVal: { required, maxLength: maxLength(40) },
          paramType: { required },
          remark: {  maxLength: maxLength(120) },
      }},
      computed: {
        nameErrors () {
          const errors = []
          if (!this.$v.fields.paramName.$dirty) return errors ;
          !this.$v.fields.paramName.maxLength && errors.push('不超过20个字符') ;
          !this.$v.fields.paramName.required && errors.push('需要输入') ;
          return errors ;
        },
        keyErrors () {
          const errors = []
          if (!this.$v.fields.paramKey.$dirty) return errors ;
          !this.$v.fields.paramKey.maxLength && errors.push('不超过20个字符') ;
          !this.$v.fields.paramKey.required && errors.push('需要输入') ;
          return errors ;
        },
        valErrors () {
          const errors = []
          if (!this.$v.fields.paramVal.$dirty) return errors ;
          !this.$v.fields.paramVal.maxLength && errors.push('不超过40个字符') ;
          !this.$v.fields.paramVal.required && errors.push('需要输入') ;
          return errors ;
        },
        typeErrors () {
          const errors = []
          if (!this.$v.fields.paramType.$dirty) return errors ;
          !this.$v.fields.paramType.required && errors.push('需要输入') ;
          return errors ;
        },
        remarkErrors () {
          const errors = []
          if (!this.$v.fields.remark.$dirty) return errors ;
          !this.$v.fields.remark.maxLength && errors.push('不超过120个字符') ;
          return errors ;
        },
      },
      data: () => ({
          headers: [ //headers表头数组，里面是对象 //left，center，rights三种对其方式
            {text: '参数名称',   align: 'left', value: 'paramName',   sortable: true},
            {text: '参数键名',   align: 'left',   value: 'paramKey' ,   sortable: true },
            {text: '参数键值',   align: 'left', value: 'paramVal' ,   sortable: true },
            {text: '系统参数',   align: 'center', value: 'paramType' ,  sortable: false },
            {text: '描述',       align: 'left', value: 'remark' ,  sortable: false  , width: 200},
            {text: '操作',       align: 'center', value: 'action' ,  sortable: false }
          ],
          tatal : 0,
          totalPages  : 0,
          items: [],
          options: { page : 1 , itemsPerPage: 10, rowsPerPageItems: [5, 10, 20, 50] } , 
          condtions: {paramName: '',paramKey: '', paramType: '' },
          fields: { paramId:null, paramName:null,paramKey:null,paramVal:null, paramType:null, remark:null , version:0 },
          ptype:[{value:'1',text:'是'},{value:'0',text:'否'}],
          dialog: false,
          confirm: false ,
          title:'',
          opration:'',
      }),
      mounted(){
          //this.search();
      },
      watch: {
        options: { handler () { this.search();}, deep: true ,},
      },
      methods: {
        getType (type) {
          if('1' === type){return '是'} else if('0' === type) {return '否'} else {return ''}
        },
        clear () {
          this.options.page = 1 ;
          this.options.itemsPerPage = 10 ;
          this.$refs.form.reset();
          this.search();
        },
        find () {
          this.options.page = 1 ;
          this.options.itemsPerPage = 10 ;
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
          this.$http.get("/app-system/param/find",{ params : this.condtions } )
              .then((data) => {this.items = data.data ;this.tatal= data.totalElements ; this.totalPages=data.totalPages ;})
              .catch((err)=>{ console.log( err ); });
        },

        //对话框
        createItem() {
          this.$v.$reset();
          this.fields = {};
          this.title="新建参数";
          this.opration="save";
          this.dialog = true  ;
        },
        editItem (item) {
          this.$v.$reset();
          this.fields = Object.assign({}, item) ;
          this.title="修改参数";
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
          this.$http.post("/app-system/param/create",this.fields)
              .then((data) => {this.$message.info("创建成功.");this.find();})
              .catch((err)=>{ console.log("Error:"+err)});
        },
        update () {
          this.$v.$touch();
          if(  this.$v.$invalid ) return ;
          this.dialog = false  ;
          this.$http.post("/app-system/param/update",this.fields )
              .then((data) => {this.$message.info("修改成功.");this.find();})
              .catch((err)=>{ console.log("Error:"+err)});
        },
        remove( val ) { 
          if( val &&  val[0] ) { 
              this.$http.post("/app-system/param/delete", this.fields )
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
      },
  }
</script>
