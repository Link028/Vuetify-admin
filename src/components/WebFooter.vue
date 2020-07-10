<template>

  <div id="page-footers"> 
    
      <v-flex lg12 class="footerbt white--text pt-0 pb-0 " >
          <v-container fill-height  > 
                  <v-layout text-xs-left>   
                      <v-flex text-xs-left class="mt-2 pl-5 ">
                          <img v-bind:src="company.logo_footer">   
                      </v-flex>   
                    </v-layout>  
                    <v-layout text-xs-left class="ml-5">  
                      <v-flex>
                        <v-card-text class="white--text subheading pb-0 pt-0">电话:{{ company.tel }} &nbsp;&nbsp;&nbsp;&nbsp; 联系邮箱:{{ company.email }}</v-card-text> 
                        <v-card-text class="white--text subheading pb-0 pt-1">地址:{{ company.addr }} </v-card-text> 
                        <v-card-text class="white--text subheading pb-0 pt-1">&copy; {{ new Date().getFullYear() }} — <strong>{{ company.ename }}. </strong> All rights reserved &nbsp;&nbsp; 网站备案号:{{ company.site }}</v-card-text>
                      </v-flex> 
                  </v-layout>
          </v-container> 
      </v-flex> 
      
  </div>

</template>

<script>
const Project = require('@/config/project.json');

export default {
  name: 'app-footer',
  components: {
  },
  data () {
    return {
       project:Project,
    };
  },
  computed: {
  },  
  methods: {
  }
};
</script>
<style lang="stylus" scoped>
    .app-footer {
      background-color: #0a0d35 !important;
      color: #fff !important;
    }
    .app-footer-bottom {
      background-color: #070928 !important;
      color: #fff !important;
    }
</style>
