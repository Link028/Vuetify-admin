<template>
  <div id="app"> 
    <router-view/>

    <!-- global snackbar
      <v-snackbar
          dark 
          bottom 
          right
          multi-line
          vertical   
          v-model="snackbar.show"  
          :color="snackbar.color"
          :timeout="snackbar.timeout"
        >
        {{ snackbar.text }}
        <v-btn dark text icon @click.native="snackbar.show = false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-snackbar>
    -->

  </div>
</template>
<script>
export default {
  name: 'app',
  data() {
    return {
        //snackbar: { show: true ,text: '',color: 'info',timeout:3000 }
    }
  },
};
</script>

<!-- 页面加载进度条全局样式设置 -->
<style type="text/css">
#nprogress .spinner {
    display: block;
    position: fixed;
    z-index: 1131;
    top: calc(50vh );
    right: calc( (100vw - 260px ) / 2  );
}
#nprogress .spinner-icon {
    width: 48px;
    height: 48px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border: solid 8px transparent;
    border-top-color: var(--v-primary-lighten2);
    border-left-color: var(--v-primary-lighten2);
    border-radius: 50%;
    -webkit-animation: nprogress-spinner 400ms linear infinite;
    animation: nprogress-spinner 400ms linear infinite;
}
</style>

<!-- body 滚动条样式-->
<style type="text/css">
html,body {
   overflow-x: hidden; 
   overflow-y: auto; 
}
::-webkit-scrollbar
{
    width:14px;
    height:14px;
    background-color:var(--v-primary-lighten1);
}
::-webkit-scrollbar-thumb
{
    border-radius:6px;
    /*box-shadow:inset 0 0 6px rgba(0,0,0,.3);*/
    background-color:var(--v-primary-darken1);
}
::-webkit-scrollbar-track
{
    border-radius:0px;
    /*box-shadow:inset 0 0 6px rgba(0,0,0,0.3);*/
    background-color:var(--v-primary-lighten2);
}
</style>
