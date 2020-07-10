<template> 
  <v-container flat fluid class="footerbt title--fixed white--text" >   
    <v-layout  align-center justify-center row fill-height class="ml-5 mr-5">   
          <v-flex text-xs-left grow class="ml-5 pl-5 body-2" >
          <v-icon class="white--text " size="16">phone</v-icon>{{ company.tel }}
          <v-icon class="white--text " size="16">email</v-icon> {{ company.email }}
        </v-flex>  
        <v-flex text-xs-right grow class="mr-5 pr-5">  
          <v-btn flat class="white--text  btn--fixed" small type="link"  @click="login"      v-if="show">登录</v-btn>
          <v-btn flat class="white--text  btn--fixed" small type="link"  @click="loginout"   v-if="!show">退出</v-btn>
          <v-btn flat class="white--text  btn--fixed" small type="link"  @click="regist"     v-if="show">注册</v-btn>
          <v-btn flat class="white--text  btn--fixed btn--fixed-max" small type="link">English</v-btn>
        </v-flex> 
    </v-layout> 
  </v-container>  
</template>

<script> 
const Project = require('@/config/project.json');
export default {
  name: 'appTitle',
  data () {
    return {
      project:Project,
      show: this.$store.state.token == null,    //window.localStorage.getItem("token") == null,
    };
  },
  computed: {  
  } ,

  methods: {
    login () {
      window.getApp.$emit('APP_LOGIN');
    } , 
    loginout () {
      window.getApp.$emit('APP_LOGOUT');
    } , 
    regist () {
      window.getApp.$emit('APP_REGIST');
    } ,
  }
};
</script>

<style lang="stylus" scoped>
  .title--fixed {
    position: fixed;
    z-index: 2;
    top: 0px;
    left: 0px;
    height:36px;
    margin : 0px;
    padding : 4px ;
  }  
  .btn--fixed {
    top: 0px;
    left: 0px;
    margin : 0px;
    padding : 0px ;  
    width:48px;
    min-width: 48px; 
  } 
  .btn--fixed-max {
    min-width: 68px; 
  }   
</style>





