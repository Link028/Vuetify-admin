<template> 
  <c-form-card cid="paramform" title="参数管理" icon="share">
    <template slot="card-content">
      
      <v-flex xs12 lg12>
        <v-form ref="form" v-model="valid" lazy-validation class="primary elevation-12 pa-2" dark>
            <v-row align="center">
              <v-col cols="12"  xs="12" md="6" lg="4">
                <v-text-field dark v-model="firstname" :rules="nameRules" :counter="10" label="参数名称" required ></v-text-field>
              </v-col>
              <v-col cols="12"  xs="12" md="6" lg="4">
                <v-text-field dark v-model="lastname" :rules="nameRules" :counter="10" label="参数类型" required ></v-text-field>
              </v-col>
              <v-col cols="12"  xs="12" md="6" lg="4">
                <v-text-field dark v-model="email" :rules="emailRules" label="E-mail" required ></v-text-field>
              </v-col> 
            </v-row>
            <v-row align="center" justify="end">
              <v-btn tile text dark outlined min-width="80" max-width="80" class="mr-4" @click.stop="open"><v-icon left size="17">fa-plus</v-icon> 新建</v-btn>
              <v-btn tile text dark outlined min-width="80" max-width="80" class="mr-4" @click.stop="search"><v-icon left size="17">fa-search</v-icon> 查询</v-btn>
              <v-btn tile text dark outlined min-width="80" max-width="80" class="mr-3" @click.stop="clear"><v-icon left size="17">fa-mail-reply-all</v-icon> 重置</v-btn>
            </v-row>
        </v-form>
      </v-flex>

      <v-flex xs12 lg12>
        <v-data-table
          :headers="headers"
          :items="items"
          :items-per-page="10"
          :loading=false 
          dark
          no-data-text="没有数据"
          class="elevation-12 primary pa-2 mt-2"
        ><!-- height=318 :options="options" :server-items-length="totalBrands" -->
          <template slot="items" slot-scope="props" class="white--text" >
            <td class="text-xs-center">{{ props.item.id }}</td>
            <td class="text-xs-center">{{ props.item.name }}</td>
            <td class="text-xs-center"><img :src="props.item.image" alt=""/></td>
            <td class="text-xs-center">{{ props.item.letter }}</td>
            <td class="text-xs-center">修改/刪除</td>
          </template>
        </v-data-table>
      </v-flex>

      <v-flex xs12 lg12>
        <c-dialog title="新建参数" :dialog="dialog" @save="save" @close="close" >
              <template slot="dialog-content">

               <v-form ref="form" v-model="dvalid" lazy-validation class="primary pa-2" dark>
                  <v-row>
                    <v-col cols="12"  xs="12" md="6" lg="6">
                      <v-text-field label="Legal first name*" required></v-text-field>
                    </v-col>
                    <v-col cols="12"  xs="12" md="6" lg="6">
                      <v-text-field label="Legal middle name" hint="example of helper text only on focus"></v-text-field>
                    </v-col>
                    <v-col cols="12"  xs="12" md="6" lg="6">
                      <v-text-field
                        label="Legal last name*"
                        hint="example of persistent helper text"
                        persistent-hint
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12"  xs="12" md="6" lg="6">
                      <v-radio-group column label="Sex" v-model="sex">
                        <v-radio label="Male" value="M"></v-radio>
                        <v-radio label="Female" value="F"></v-radio>
                      </v-radio-group>
                    </v-col>
                    <v-col cols="12"  xs="12" md="6" lg="6">
                      <v-text-field label="Email*" required></v-text-field>
                    </v-col>
                    <v-col cols="12"  xs="12" md="6" lg="6">
                      <v-text-field label="Password*" type="password" required></v-text-field>
                    </v-col>
                    <v-col cols="12"  xs="12" md="6" lg="6">
                      <v-select
                        :items="['0-17', '18-29', '30-54', '54+']"
                        label="Age*"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="12"  xs="12" md="6" lg="6">
                      <v-autocomplete
                        :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                        label="Interests"
                        multiple
                      ></v-autocomplete>
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

export default {
      name: "MyBrand",
      data(){
        return {
          headers: [ //headers表头数组，里面是对象 //left，center，rights三种对其方式
            {text: '品牌id',   align: 'center', value: 'id',   sortable: true},
            {text: '品牌名称', align: 'center', value: 'name' , sortable: true },
            {text: '品牌Logo', align: 'center', value: 'image' , sortable: true },
            {text: '首字母',   align: 'center', value: 'letter' , sortable: false },
            {text: '操作',     align: 'center', value: 'operator' ,sortable: false }
          ],
          items: [],//数组，就是个数组，对应组件中的item
          
          options: { itemsPerPage: 5, rowsPerPageOptions: [5, 20, 50, 100] },//空對象 rowsPerPageOptions: [5, 20, 50, 100],  
          
          valid: true,
          firstname: '',
          lastname: '',
          nameRules: [
            v => !!v || 'Name is required',
            v => v.length <= 10 || 'Name must be less than 10 characters',
          ],
          email: '',
          emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+/.test(v) || 'E-mail must be valid',
          ], 
 
          dialog: false,
          dvalid: true,
          sex: '',
        }
      },
      created(){
          this.items=[
            {id:1,name:"小米",image:"2.jpg",letter:"X"},
            {id:2,name:"華為",image:"",letter:"H"},
            {id:3,name:"Apple",image:"",letter:"A"},
            {id:4,name:"三星",image:"",letter:"S"},
            {id:5,name:"三星",image:"",letter:"S"},
            {id:6,name:"三星",image:"",letter:"S"},
            {id:7,name:"三星",image:"",letter:"S"},
            {id:8,name:"三星",image:"",letter:"S"},
            {id:9,name:"三星",image:"",letter:"S"},
            {id:10,name:"三星",image:"",letter:"S"},
            {id:11,name:"三星",image:"",letter:"S"},
            {id:12,name:"三星",image:"",letter:"S"},
            {id:13,name:"三星",image:"",letter:"S"},
            {id:14,name:"三星",image:"",letter:"S"},
            {id:15,name:"三星",image:"",letter:"S"},
            {id:16,name:"三星",image:"",letter:"S"},
            {id:17,name:"三星",image:"",letter:"S"},
            {id:18,name:"三星",image:"",letter:"S"},
            {id:19,name:"三星",image:"",letter:"S"},
            {id:20,name:"三星",image:"",letter:"S"},
            {id:21,name:"三星",image:"",letter:"S"},
            {id:22,name:"三星",image:"",letter:"S"},
          ];
      },

      methods: {
      search () {
        this.$v.$touch()
      },
      clear () {
        this.$refs.form.reset();
      },

      //对话框
      open() {
        this.dialog = true  ;
      },
      save () {
        this.dialog = false  ;
      },
      close() {
        this.dialog = false  ;
      },
    },
 
    }
</script>
