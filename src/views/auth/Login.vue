<template>
  <v-app id="login" class="primary">
    <v-content > 
      <v-container fluid fill-height>  
        <v-layout align-center justify-center>

          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-5 pa-3" style="background-color:#fff !important ; "> 
       
                <div class="layout column align-center pt-5"> 
                  <img :src="project.product_logo_login" :alt="project.product_name" width="60"/>
                  <h2 class="flex my-4 primary--text">{{ project.product_cname }}</h2>
                </div>   
                <!--
                <div class="layout column align-center"> 
                  <h3 class="flex my-4 primary--text">用户登录</h3>
                </div> 
                -->
                <v-form v-model="valid" ref="form" class="ma-2">
                  
                  <v-text-field append-icon="person" name="login"    label="用户ID" type="text"  
                  required
                  :rules="emailRules"
                  v-model="model.username"/>
                  
                  <v-text-field append-icon="lock"   name="password" label="密码"      type="password" 
                  required
                  :rules="pwdRules"
                  v-model="model.password" id="password" />

                  <v-card-actions> 
                    <v-btn text block color="primary" @click="regist"   class="mt-0">新用户注册</v-btn>
                  </v-card-actions>
                  <v-card-actions class="pb-5"> 
                    <v-btn block color="primary" @click="login1" :loading="loading" class="mt-0">登录</v-btn>
                  </v-card-actions>

                </v-form>
              <!-- 
              <v-card-actions> 
                <v-btn text block color="primary" @click="regist"   class="mt-0">新用户注册</v-btn>
              </v-card-actions>
              <v-card-actions class="pb-5" >
                
                <v-btn icon class="pl-5 pt-0 mt-0">
                  <img v-bind:src="project.product_qrcode"  height="40px;">
                </v-btn>
                <v-btn block color="primary" @click="home"   class="mt-0">返回首页</v-btn>
                <v-spacer></v-spacer>
                
                <v-btn block color="primary" @click="login" :loading="loading" class="mt-0">登录</v-btn>
              </v-card-actions>
              -->
            </v-card>
          </v-flex>

        </v-layout>
      </v-container>
    </v-content>

    <v-snackbar :timeout="3000" bottom right :color="snackbar.color" v-model="snackbar.show">
      {{ snackbar.text }}
      <v-btn dark text @click.native="snackbar.show = false" icon>
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>

  </v-app>
</template>

<script>
const Project = require('@/config/project.json');

export default {
  data: () => ({
    valid: false,
    loading: false,
    model: {
      username: '',
      password: ''
    },
     project:Project,
    emailRules: [
        v => !!v || '用户ID必须输入',
        //v => v.length > 4 || "用户ID至少5位" ,
        v =>  /^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(v) || '请输入正确的E-mail地址'
        //v =>  /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(v) || '请输入正确的E-mail地址'
    ],
    pwdRules: [
        v => !!v || '密码必须输入',
        v => v.length > 5 || "密码至少6位"
    ],
    snackbar: {
      show: false,
      text: "",
      color: ""
    }
  }), 
  methods: {
    login1() { 
      if( ! this.$refs.form.validate() )
      {
          return ;
      }
      this.submit() ;
    } , 
    submit(){
      //const success = (data) => {
      //  this.onSuccess(data)
      //}
      //this.$http.ajax(this.$http.post(`/auth/login`, this.model), success) ;
      this.$http.post("/auth/login", this.model)
      .then(response => { 
        console.log( response.data) ;
        this.onSuccess( response.data ) ;
      })
      .catch(error => {
        this.snackbar = {   show: true,  color: "error", text: "登录失败:" + error };
      });
    },
    onSuccess (data) {
      this.$store.commit('setAuth', data ) ;
      this.$http.defaults.headers.common['Authorization'] = this.$http.getToken();
      var $location = this.$route.query.redirect ? this.$route.query.redirect : '/';
      this.$router.replace($location);
      //this.snackbar = {   show: true,  color: "green", text: "登录成功."};
    },
    login() {
      if( ! this.$refs.form.validate() ){ return ; }
        this.loading = true;  
        this.$store.dispatch('login', this.model)
        .then(() => {
          try {
            this.$router.push({ path: '/' });
          } catch (err) { 
            this.$router.push({ path: '/login' });
          }
        })
       .catch(error => {
        this.snackbar = {   show: true,  color: "error", text: "登录失败:" + error.status };
        })
        .finally(() => {
          this.loading = false;
        });
    },
    redirectForgotPassword() {
      this.$message({
        type: 'info',
        text: 'Ahem: Please add redirect function',
      });
    },
    home () {
      setTimeout(() => {
        this.$router.replace('/home');
      }, 1000);
    } , 
    regist () {
      //window.getApp.$emit('APP_REGIST');
      this.$router.replace('/regist');
    } ,
    clear () {
      this.formModel = {};
      this.$validator.reset();
    },
    validateField () {
        this.$refs.form.validate() ;
    }
  },
  mounted () {
    //this.$validator.localize('en', this.dictionary);
    //var bg = this.$vuetify.theme.themes.light.primary ;
    //var bg = this.$config.view.primary ;
    //document.getElementById("login").style.backgroundColor=bg;
  },  
};
</script>
<style scoped lang="css">
  #login {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
    background-color:var(--v-primary-base) !important ;
  }
</style>
