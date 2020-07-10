<template>
  <v-app id="inspire" class="app">
    <!-- App Drawer --> 
    <app-drawer :imini="imini" :showDrawer="showDrawer" @on-result-change="onResultChange" @on-mini-change="onMiniChange" /> 
    <!-- App Toolbar --> 
    <app-toolbar :drawerOpen="showDrawer" @side-icon-click="handleDrawerVisiable" @right-settings-click="handleSettingsVisiable" />
    
    <v-content  v-if="! this.$config.view.tag" id="v-content" class="primary darken-1" style="opacity:1; "><!-- class="primary darken-1" class="primary lighten-1" -->
      <app-header class="page-header"/>
        <v-fade-transition mode="out-in"><!-- v-expand-x-transition <v-fade-transition mode="out-in"> --> 
          <VuePerfectScrollbar minScrollbarLength="60" class="drawer-menu--scroll" :settings="scrollSettings">
            <router-view class="page-wrapper"/>
          </VuePerfectScrollbar>
        </v-fade-transition><!-- </v-fade-transition> v-expand-x-transition -->
    </v-content>
    
    <!-- 
      <app-tabs   class="page-header pl-0 pr-0"/>
    -->
    <v-content  v-if="this.$config.view.tag" id="v-content-tab" class="primary darken-1" style="opacity:1; "><!-- class="primary darken-1" class="primary lighten-1" -->
        <v-container fluid>
          <v-layout class="align-center layout px-4" row wrap>

            <v-flex xs12 sm12 md12 lg12 xl12>
            <v-tabs dark show-arrows background-color="primary darken-1" v-model="tab" :height="46">
              <v-tabs-slider color="primary lighten-3" />
              
              <v-tab to="/system/dict">Item One</v-tab>
              <v-btn x-small circle tile text dark size="24" class="mt-3" style="margin-left: -24px;">
                <v-icon left size="16" class="ma-0 pa-0">fa-close</v-icon>
              </v-btn>
              <v-tab to="/system/param">Item Two</v-tab>
              <v-btn x-small circle tile text dark size="10" class="mt-3" style="margin-left: -20px;">
                <v-icon left size="16" class="ma-0 pa-0">fa-close</v-icon>
              </v-btn>
              <v-tab to="/system/user">Item Three</v-tab>
              <v-btn x-small circle tile text dark size="10" class="mt-3" style="margin-left: -20px;">
                <v-icon left size="16" class="ma-0 pa-0">fa-close</v-icon>
              </v-btn>
              <v-tab href="#tab-4">Item Four</v-tab>
              <v-tab href="#tab-5">Item Five</v-tab>
              <v-tab href="#tab-6">Item Six</v-tab>
              <v-tab>Item 1</v-tab>
              <v-tab>Item 2</v-tab>
              <v-tab>Item 3</v-tab>
              <v-tab>Item 4</v-tab>
              <v-tab>Item 5</v-tab>
              <v-tab>Item 6</v-tab>
            </v-tabs>
          </v-flex>

          <v-flex xs12 sm12 md12 lg12 xl12>
            <v-tabs-items v-model="tab">
              <v-tab-item value="tab-4">
                
                <VuePerfectScrollbar minScrollbarLength="60" class="drawer-menu--scroll" :settings="scrollSettings">
                  <v-expand-x-transition>
                      <router-view class="page-wrapper"/>
                  </v-expand-x-transition>
                </VuePerfectScrollbar> 

              </v-tab-item>
              <v-tab-item value="tab-5">
                  <v-card flat>
                    <v-card-text>
                      <h2>tab-5</h2>
                      bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
                    </v-card-text>
                  </v-card>
                </v-tab-item>
                <v-tab-item value="tab-6">
                  <v-card flat>
                    <v-card-text>
                      <h2>tab-6</h2>
                      vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
                    </v-card-text>
                  </v-card>
                </v-tab-item>
              </v-tabs-items>
            </v-flex>

        </v-layout>
      </v-container>
    </v-content>

    <!-- App Footer --> 
    <app-footer/>
    <!-- right setting drawer -->
    <app-right-settings :rDrawer="rDrawer" @toggleMini="toggleMini" @on-settings-change="onSettingsChange"/>
    <!-- Go to top -->
    <app-fab/>

  </v-app>
</template>

<script>
import AppDrawer from "@/components/AppDrawer"
import AppToolbar from "@/components/AppToolbar"
import AppFab from "@/components/AppFab"
import AppHeader from "@/components/AppHeader"
import AppFooter from "@/components/AppFooter"
import AppRightSettings from "@/components/AppRightSettings" 
import VuePerfectScrollbar from "vue-perfect-scrollbar"

export default {
  name: 'appLayout',
  components: {
    AppDrawer,
    AppToolbar,
    AppFab,
    AppHeader,
    AppFooter,
    AppRightSettings,
    VuePerfectScrollbar,
  },
  data() {
    return {
      showDrawer: true,
      imini:false,
      rDrawer: false,
      scrollSettings: {maxScrollbarLength: 360 },
      tab: 'tab-1',
    }
  },
  methods: {
    handleDrawerVisiable() {this.showDrawer = !this.showDrawer},
    handleSettingsVisiable() {this.rDrawer = !this.rDrawer;},
    onSettingsChange(val) {this.rDrawer = val;},
    onResultChange(val){this.showDrawer=val;},
    toggleMini(val){this.imini=val;},
    onMiniChange(val){this.imini=val;},
  },
  created(){},
}
</script>

<!-- content 及全局样式设置 -->
<style lang="scss">
.page-header {
  height: 46px ;
}
.page-wrapper { 
   min-height: calc(100vh - 56px - 46px - 32px); 
   margin: 0px;
   padding-left: 29px;
   padding-right: 29px;
   padding-top: 8px;
   padding-bottom: 10px;
}
.drawer-menu--scroll{
  height: calc(100vh - 56px - 46px - 32px);
  overflow-x: auto;
  overflow-y: auto;
}
#v-content , #v-content-tab {
  /*background-image: url(/img/bg2.jpg);
  background-repeat: repeat;
  background-attachment:fixed;
  */
  /*
  filter:alpha(opacity=50);  
  -moz-opacity:0.5;  
  -khtml-opacity: 0.5;  
  opacity: 0.5;
  */ 
  background-color:#fafafa;
}
</style>

<!-- VuePerfectScrollbar 控件颜色设置 -->
<style lang="scss">
.ps__thumb-x, .ps__thumb-y {
    background:var(--v-primary-lighten2) !important ;
}
.ps__rail-y.ps--clicking .ps__thumb-y, .ps__rail-y:focus>.ps__thumb-y, .ps__rail-y:hover>.ps__thumb-y {
    background:var(--v-primary-darken1) !important ;
    width: 11px;
}
.ps .ps__rail-x.ps--clicking, .ps .ps__rail-x:focus, .ps .ps__rail-x:hover, .ps .ps__rail-y.ps--clicking, .ps .ps__rail-y:focus, .ps .ps__rail-y:hover {
    background:var(--v-primary-lighten1) !important ;
}
</style>

<!-- v-pagination 控件颜色设置 -->
<style lang="scss">
.theme--light.v-pagination .v-pagination__item {
    background: var(--v-primary-base) !important ;
    color: #FFFFFF !important ;
}
.theme--light.v-pagination .v-pagination__navigation {
    background: var(--v-primary-base) !important ;
}
.theme--light.v-icon {
    color:  #FFFFFF !important ;
}
</style>

<!-- v-treeview 元素自动换行 -->
<style lang="scss">
.v-treeview-node__label {
    white-space:normal !important ;
}
</style>

<!-- v-data-table 样式定义 -->
<style lang="scss">
.theme--dark.v-data-table tbody tr:hover:not(.v-data-table__expanded__content) {
  background:var(--v-primary-lighten1) !important; 
}
.v-data-table table tr td{
    height: 40px !important;
}
.v-data-table table tr th{
    height: 40px !important;
}
.v-data-table {
  border-radius: 0px !important;  
}
.v-data-table th {
    -webkit-user-select: none !important; 
    -moz-user-select: none !important; 
    -ms-user-select: none !important; 
    user-select: none !important; 
    font-size: 0.95rem !important;
    height: 48px !important; 
}
.v-data-table td {
    font-size: 0.95rem !important;
    height: 48px !important;
}
</style>

<!-- form 表单 v-list 样式定义 -->
<style lang="scss">
.theme--dark.v-label {
    color: rgba(255, 255, 255, 1) !important;
}
.theme--light.v-list {
    background: var(--v-primary-lighten1) !important;
}
.theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
    color: #FFF !important;
}
.v-application .primary--text {
     color: #FFF !important;
}
.v-list-item .v-list-item__title, .v-list-item .v-list-item__subtitle {
    line-height: 1.2 !important;
    color: white !important;
}
</style>

<!-- c-card样式定义 -->
<style lang="scss">
.theme--light.v-card {
    background-color: var(--v-primary-base);
}
.theme--dark.v-card {
    background-color: var(--v-primary-base);
}
</style>