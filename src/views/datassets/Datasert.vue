<template> 
  <c-form-card title="数据资产管理">
    <template slot="card-content">
      <v-row no-gutters>

        <v-col cols="3" xs3 sm3 md3 lg3 xl3>
          <v-card class="elevation-16 pa-1 mr-2" outlined tile>
            <v-sheet class="pa-4 pt-2 pb-0 primary" style="height:42px;">
              <label class="body-1 white--text">业务系统列表</label>
            </v-sheet>
            <v-divider class="primary lighten-1"/>
            <v-sheet class="pa-4 pt-0 pb-0 primary">
              <v-text-field v-model="searchTree" label="查找" dark clearable transition clear-icon="mdi-close-circle-outline"/>
            </v-sheet>
            <VuePerfectScrollbar  style="height: 420px !important; " minScrollbarLength="60" class="drawer-menu--scroll" maxScrollbarLength="260">
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
          <v-toolbar flat dense color="transparent" height="48" class="primary darken-0" >
            <label class="body-1 white--text">业务系统表清单</label> <!--  [{{this.condtions.dsname}}]  -->
            <v-spacer class="white--text"></v-spacer>
          </v-toolbar>
          <v-divider class="primary lighten-1"/>
          <v-data-table
            :headers="headers"
            :items="items"
            :items-per-page="options.itemsPerPage"
            :items-per-page-options="options.rowsPerPageItems"
            :page="999999"
            :server-items-length="999999"
            :options.sync="options"
            :expanded.sync="expanded"
            dark
            item-key="ds_id"
            no-data-text="没有数据"
            class="elevation-16 primary mt-0 pa-4 pt-2 pb-2"
            :hide-default-footer="true"
            > 
            <template v-slot:item.action="{ item }">
              <v-btn tile small text dark height="32" width="66" class="mr-0 body-2" @click="editItem(item)"><v-icon left size="16" class="mr-1">search</v-icon>查看</v-btn>
            </template>
          </v-data-table>
          <!-- 
          <v-flex xs8 sm8 md8 lg8 xl8 class="d-flex justify-center align-center ml-5 mr-5">
            <v-pagination circle :total-visible="20" v-model="options.page" :length="totalPages" color="primary lighten-1" class="pt-2 pb-0 mb-0 mt-0" />
          </v-flex>
          -->
        </v-col>   

      </v-row>

      <v-flex xs12 sm12 md12 lg12 xl12>
        <c-detail-dialog :title="title" :width="800" :dialog="dialog"  @close="close" fluid>
              <template slot="dialog-content"> 
                  <v-data-table
                    :headers="fheaders"
                    :items="fields"
                    dark
                    no-data-text="没有数据"
                    class="elevation-0 primary ma-0 pa-0"
                    :hide-default-footer="true"
                    :page="999999"
                    :server-items-length="999999"
                    style="width:100%;"
                    > 
                  </v-data-table>
              </template>    
        </c-detail-dialog>
      </v-flex>
    </template> 
  </c-form-card>
</template>

<script>
 import VuePerfectScrollbar from "vue-perfect-scrollbar"

 export default {
      components: {VuePerfectScrollbar },
      computed: {
        filter(){
           return this.caseSensitive ? (trees, searchTree, textKey) => trees[textKey].indexOf(searchTree) > -1: undefined ;
        },  
      },
      data: () => ({
          headers: [ //headers表头数组，里面是对象 //left，center，rights三种对其方式
            {text: '表英文名称',   align: 'start',  value: 'name' ,   sortable: false },
            //{text: '表中文名称',   align: 'start',  value: 'cname' ,   sortable: false },
            {text: '备注',       align: 'start',   value: 'remark' ,  sortable: false },
            {text: '操作',       align: 'center',  value: 'action' ,  sortable: false }
          ],
          fields: [],
          fheaders: [ 
            {text: '字段名称',   align: 'start', value: 'name' ,   sortable: false },
            {text: '字段类型',   align: 'start', value: 'dbType' ,  sortable: false },
            {text: '字段长度',   align: 'start', value: 'length' ,  sortable: false },
            {text: '字段精度',   align: 'start', value: 'pri' ,     sortable: false },
            {text: '是否为空',   align: 'start', value: 'null' ,  sortable: false },
            {text: '备注',      align: 'start',  value: 'remark' ,  sortable: false }
          ],
          tatal : 99999,
          totalPages  : 99999,
          items: [],
          expanded: [],
          options: { page : 1 , itemsPerPage: 10, rowsPerPageItems: [5, 10, 20, 50] } , 
          condtions: {dsid: ''},
          dialog: false,
          title:'',
          opration:'',
          trees: [],
          searchTree: null,
          caseSensitive: false,
          selection: [],
      }),
      mounted(){
        this.trees = [{'id':'1','name':'aaaaaaaa'},{'id':'2','name':'aaaaaaaa'},{'id':'3','name':'aaaaaaaa'},{'id':'4','name':'aaaaaaaa'},{'id':'5','name':'aaaaaaaa'},{'id':'6','name':'aaaaaaaa'},{'id':'7','name':'aaaaaaaa'},{'id':'8','name':'aaaaaaaa'},{'id':'28','name':'aaaaaaaa'},{'id':'9','name':'aaaaaaaa'},{'id':'10','name':'aaaaaaaa'},{'id':'11','name':'aaaaaaaa'},{'id':'12','name':'aaaaaaaa'},{'id':'13','name':'aaaaaaaa'},{'id':'14','name':'aaaaaaaa'},{'id':'15','name':'aaaaaaaa'},{'id':'16','name':'aaaaaaaa'},{'id':'17','name':'aaaaaaaa'},{'id':'18','name':'aaaaaaaa'},{'id':'19','name':'aaaaaaaa'},{'id':'20','name':'aaaaaaaa'},{'id':'21','name':'aaaaaaaa'},{'id':'22','name':'aaaaaaaa'},{'id':'16','name':'aaaaaaaa'},{'id':'23','name':'aaaaaaaa'}];
        //this.getTree();
      },
      watch: {
        options: { handler () { this.search();}, deep: true ,},
      },
      methods: {
        getTree () {
            this.$http.get("/service/admin/sysTree")
            .then((data) => {
               this.trees = data.data ;
              })
            .catch((err)=>{ console.log( err ); });
        },
        find () {
          this.options.page = 1 ;
          this.options.itemsPerPage = 10 ;
          this.search();
        },        
        clear () {
          this.options.page = 1 ;
          this.options.itemsPerPage = 10 ;
          this.condtions = {};
          this.condtions.dsid = '' ;
          this.search();
        },
        search () {

          this.condtions.number = this.options.page ;
          this.condtions.size = this.options.itemsPerPage ;
          if ( this.options.sortBy && this.options.sortBy.length === 1 && this.options.sortDesc && this.options.sortDesc.length === 1) {
              this.condtions.sortName =  this.options.sortBy[0] ;
              this.condtions.sortType=  this.options.sortDesc[0] ;
          }
          
          this.$http.get("/service/admin/table",{ params : this.condtions } )
              .then((data) => {
                this.items = data.data ;
                this.tatal= data.totalElements ; 
                this.totalPages=data.totalPages ;
              })
              .catch((err)=>{ console.log( err ); });
        },
       
        selectIterm( item ) 
        {
          if( item && item[0])
          {
            this.condtions.dsid = item[0].id ;
            this.condtions.dsname = item[0].name ;
            this.find();
          }
          else
          {
            this.condtions.dsid = null ;
            this.condtions.dsname = '' ;
            this.items = [] ;
            this.tatal = 0 ; 
            this.totalPages = 0 ;
          }
        },
        editItem (item) { 
          this.condtions = {dsid:this.condtions.dsid , table : item.name  } ;

          this.$http.get("/service/admin/tableDetail",{ params : this.condtions } )
              .then((data) => {
                this.fields = data.data ;
              })
              .catch((err)=>{ console.log( err ); });
          this.title="表详细信息";
          this.dialog = true  ;
        },
        close() {
           this.dialog = false  ;
           this.fields = [];
        },
      },
  }
</script>