<template>
 <v-app id="inspire" class="app">
      
          <web-title class="app--title"></web-title> 
          <web-toolbar class="app--toolbar toolbar-abs-post"></web-toolbar>
          
          <v-content class="main-wrapper">
   
            <div class="page-wrapper">
              <router-view></router-view>
            </div>
          </v-content>

        <web-footer class="primary"></web-footer>    
  
        <!-- Go to top -->
        <web-fab></web-fab>

      </v-app>

</template>

<script>
import WebTitle from "@/components/WebTitle";
import WebToolbar from "@/components/WebToolbar";
import WebFab from "@/components/WebFab"; 
import WebFooter from "@/components/WebFooter";

export default {
  components: {
    WebTitle,
    WebToolbar,
    WebFab,
    WebFooter,
  },
  data: () => ({
    expanded: true,
    rightDrawer: false,
    snackbar: {
      show: false,
      text: "",
      color: ""
    }
  }),
  computed: {},
}
</script>
<style lang="stylus" scoped>
  .toolbar-abs-post {
    top: 36px;
    height:64px;
    left: 0;
    z-index:2; 
  }
  .setting-fab {
    top:50%!important; 
    right:0;
    border-radius:0
  }  
  .page-wrapper {
    min-height:calc(100vh - 64px - 50px - 81px );  
  }
  .main-wrapper {
    padding: 100px 0px 0px !important;
  }

  #appRoot{
    margin-left :0px ;
    margin-right 0px;
  }

</style>
