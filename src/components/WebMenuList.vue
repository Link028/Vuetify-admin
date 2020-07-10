<template> 
  <v-container flat fluid class="primary menulist--fixed white--text" >   
        <v-layout  align-center justify-center row fill-height class="ml-5 mr-5">   
          <v-flex text-xs-left grow class="ml-5 pl-5" >
          <v-icon class="white--text " size="18">phone</v-icon>{{ company.tel }}
          <v-icon class="white--text " size="18">email</v-icon> {{ company.email }}
        </v-flex>  
        <v-flex text-xs-right grow class="mr-5 pr-5">  
          <v-btn flat class="white--text" href="#" small type="link">登录</v-btn>
          <v-btn flat class="white--text" href="#" small type="link">注册</v-btn>
          <v-btn flat class="white--text" href="#" small type="link">English</v-btn>
        </v-flex>  
    </v-layout> 
  </v-container>  
</template>

<script> 
import {Company} from '@/api/company';
export default {
  name: 'appMenuList',
  data () {
    return {
      company:Company,
    };
  },
  computed: {  
  }
};
</script>

<style lang="stylus" scoped>
  .menulist--fixed {
    position: fixed;
    z-index: 2;
    top: 100px;
    left: 0px;
    height:520px;
    margin : 0px;
    padding : 4px ;
  }  
  
</style>





