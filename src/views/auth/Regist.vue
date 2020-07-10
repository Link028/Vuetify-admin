<template>
  <v-app id="regist" class="primary">
    <v-content > 
      <v-container fluid fill-height>  
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-5 pa-3" style="background-color:#fff !important ; "> 

                <div class="layout column align-center"> 
                  <h3 class="flex my-4 primary--text">用户注册</h3>
                </div> 
              
                <v-form class="ma-2">

                  <v-text-field append-icon="person" name="login" label="Email地址" type="text" v-model="model.id"></v-text-field>
                  <v-text-field append-icon="sentiment_satisfied_alt" name="name" label="用户昵称"   type="text" v-model="model.name"></v-text-field>
                  <v-text-field append-icon="lock" name="password"   label="密码" id="password"   type="password" v-model="model.password"></v-text-field>
                  <v-text-field append-icon="lock" name="repassword" label="确认密码" id="repassword" type="password" v-model="model.password"></v-text-field>
                  <v-text-field append-icon="phone" name="phone" label="手机号码" id="phone" type="text" v-model="model.phone"></v-text-field>
                  <v-text-field append-icon="place" name="code" label="验证码" id="code" type="text" v-model="model.code"></v-text-field>
                
                  <v-card-actions> 
                    <v-btn text block color="primary" @click="login" class="mt-0">使用已有帐号登录</v-btn> 
                  </v-card-actions>

                  <v-card-actions class="pb-4" >  
                    <v-btn block color="primary" @click="regist" :loading="loading" class="mt-0">注册</v-btn>
                  </v-card-actions>

                </v-form>
                
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
    loading: false,
    model: {
      id: '',
      name: '',
      password: '',
      phone: '',
      code: '',
    },
    project:Project,
    snackbar: {
      show: false,
      text: "",
      color: ""
    }
  }),

  methods: {
    regist () {
      this.loading = true; 
      this.snackbar = {   show: true,  color: "error", text: "暂未开放系统将跳转到首页。" }; 
      this.$router.push('/home');
    } , 
    login () { 
       this.$router.push('/login');
    } , 
  },
  mounted () {
    //var bg = this.$vuetify.theme.themes.light.primary ;
    //var bg = this.$config.view.primary ;
    //document.getElementById("regist").style.backgroundColor=bg;
  },
};
</script>

<style scoped lang="css">
  #regist {
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