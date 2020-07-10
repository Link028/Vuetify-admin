<template>
    <v-navigation-drawer elevation="8" app dark color="leftmenu" class="app--drawer" v-model="sDrawer" :mini-variant="mini" width="260" :expand-on-hover="mini">
    <v-toolbar elevation="8" color="primary darken-1 drawer-toolbar--scroll" dark height="56">
      <img :src="project.product_logo_header" height="36" :alt="project.product_cname" />
      <v-toolbar-title class="ml-0 pl-3">
        <span class="hidden-sm-and-down">{{ project.product_sname }}</span>
      </v-toolbar-title>
    </v-toolbar>
    <VuePerfectScrollbar class="drawer-menu--scroll" :settings="scrollSettings">
      <!-- 
      <v-flex>
       <img :src="project.product_logo_title" width="250" height="100%" />
      </v-flex>
       -->
      <v-list elevation="0" raised dark expand class="mt-0 pt-0" style="height:48px;" > 
          <v-list-item   @click.stop="dialog = true" ripple="ripple">
            <v-list-item-action><v-icon>list</v-icon></v-list-item-action> 
            <v-list-item-content><v-list-item-title>快捷操作<v-icon  style="padding-left:104px;">keyboard_arrow_down</v-icon></v-list-item-title></v-list-item-content>
          </v-list-item>  
      </v-list> 

      <!--快捷弹出框设置 :overlay-opacity="0.6"  -->
      <v-dialog dark open-on-hover overlay-opacity="0.6" v-model="dialog" origin="left top" transition="slide-y-transition" class="primary elevation-16" width="832" max-width="832">
        <v-card class="pa-4 shortcut primary lighten-2" dark style="background-color: transparent !important; ">
          <template v-for="item  in shortcuts ">
            <v-card :key="item.name" :color="item.color" outlined class="shortcut-card mr-3 mt-1 mb-1 d-inline-block mx-auto" height="120" width="120">
              <!-- a :href="item.path" router-link :to="item.path" @click.stop="closeDialog(item.path)" -->
              <a style="text-decoration: none; " @click.stop="closeDialog(item.path)">
                <div class="ma-2 ml-1" style="text-align: center;">
                  <div style="text-align: center;"> 
                    <v-icon class="ma-0 pa-0" size="80px" style="text-align: center; display: block;">{{ item.icon }}</v-icon>
                    <span style="white-space: nowrap; ">{{ item.name }}</span> <!--  class="ml-2" -->
                  </div> 
                </div>
              </a>
              <!-- 
              <router-link :to="item.path" style="text-decoration: none; " @click="closeDialog(item.path)">
                <div class="ma-2 ml-1">
                  <span style="text-align: center;"> 
                    <v-icon class="ma-0 pa-0" size="80px" style="text-align: center; display: block;">{{ item.icon }}</v-icon>
                    <span class="ml-5">{{ item.name }}</span> 
                  </span> 
                </div>
              </router-link>
              <a :href="item.path" style="text-decoration: none; " @click.stop="closeDialog(item.path)">
                <div class="ma-2 ml-1">
                  <span style="text-align: center;"> 
                    <v-icon class="ma-0 pa-0" size="80px" style="text-align: center; display: block;">{{ item.icon }}</v-icon>
                    <span class="ml-5">{{ item.name }}</span> 
                  </span> 
                </div>
              </a>
              -->
            </v-card>
           </template>  
        </v-card>
      </v-dialog>

      <!-- 侧边栏立体效果设置 --> 
      <v-divider class="mt-0 pt-0 leftmenu darken-1" style="width:100%"/><v-divider style="width:100%" class="mt-0 pt-0 leftmenu lighten-1"/>
      <!-- 
      <v-divider class="mt-0 pt-0 leftmenu darken-1" style="width:97%"/><v-divider style="width:97%" class="mt-0 pt-0 leftmenu lighten-1"/>
      侧边栏立体效果设置结束 -->

      <v-list expand raised dark> <!-- dense -->
        <template v-for="item in menus">
          <v-list-group v-if="item.items" :key="item.id" :prepend-icon="item.icon"><!-- :prepend-icon="item.icon" --> 
              <v-list-item slot="activator" class="f-child">
                <!--<v-list-item-action><v-icon>{{ item.icon }}</v-icon></v-list-item-action>-->
                <v-list-item-content><v-list-item-title>{{ item.title }}</v-list-item-title></v-list-item-content>
              </v-list-item> 
              <v-list-item v-for="(grand) in item.items" :key="grand.id" class="tc-child">
                <v-list-group class="t-child" v-if="grand.items" :prepend-icon="grand.icon"><!-- :prepend-icon="grand.icon" -->
                  <v-list-item slot="activator" class="f-child">
                    <!--<v-list-item-action><v-icon>{{ grand.icon }}</v-icon></v-list-item-action>-->
                    <v-list-item-content><v-list-item-title>{{ grand.title }}</v-list-item-title></v-list-item-content>
                  </v-list-item><!-- :to="subItem.href"  @click.stop="openPage(subItem.href)" -->
                  <v-list-item v-for="(subItem)  in grand.items" :to="subItem.href" @click.stop="openTab(subItem.href)" :key="subItem.id" ripple="ripple" class="tt-child">
                      <v-list-item-action><v-icon>{{ subItem.icon }}</v-icon></v-list-item-action>
                      <v-list-item-content><v-list-item-title>{{ subItem.title }}</v-list-item-title></v-list-item-content>
                  </v-list-item>
                </v-list-group><!-- :to="grand.href"  @click.stop="openPage(grand.href)" -->
                <v-list-item v-else :to="grand.href" @click.stop="openTab(grand.href)" :key="grand.id" ripple="ripple"  class="s-child">
                  <v-list-item-action><v-icon>{{ grand.icon }}</v-icon></v-list-item-action>
                  <v-list-item-content><v-list-item-title>{{ grand.title }}</v-list-item-title></v-list-item-content>
                </v-list-item>
            </v-list-item>
          </v-list-group> <!-- :to="item.href" @click.stop="openPage(item.href)" -->
          <v-list-item v-else :to="item.href" @click.stop="openTab(item.href)" :key="item.id" ripple="ripple">
            <v-list-item-action><v-icon>{{ item.icon }}</v-icon></v-list-item-action> 
            <v-list-item-content><v-list-item-title>{{ item.title }}</v-list-item-title></v-list-item-content>
          </v-list-item>  
         </template>
      </v-list>
    </VuePerfectScrollbar>
  </v-navigation-drawer>
</template>
<script> 
import VuePerfectScrollbar from "vue-perfect-scrollbar"
import menu from "@/api/menu"
import shortcuts from "@/api/shortcuts"
const Project = require('@/config/project.json');

export default {
  name: "AppDrawer",
  components: {
    VuePerfectScrollbar,
  },
  props: ["showDrawer","imini"],
  data() {
    return {
      project:Project,
      mini: this.imini,
      menus: menu,
      shortcuts:shortcuts,
      drawer: null, 
      scrollSettings: {maxScrollbarLength: 240 ,  wheelSpeed: 2,wheelPropagation: false, minScrollbarLength: 120 ,suppressScrollX :false ,suppressScrollY :false },
      sDrawer:this.showDrawer, 
      dialog: false,
    }
  },
  watch: {
      showDrawer(val) {this.sDrawer = val;},
      sDrawer(val){this.$emit("on-result-change",val);},
      imini(val) {this.mini = val;},
      mini(val){this.$emit("on-mini-change",val);},
  },
  computed: {},
  methods: {
    openPage(page){
      this.$router.push({  path: page });
    },
    openTab(page){
      //alert(page);
      //this.$router.push({  path: page });
    },
    closeDialog(page){
      this.dialog = false ;
      try { 
        this.$router.replace({  path: page });
      }
      catch(err) { 
        console.log( err );
      }
    },    
  },
}
</script>
<!-- 快捷菜单栏设置 -->
<style lang="scss">
.shortcut{
    position: absolute !important;
    top: 0px !important;
    left: 0px !important;
    z-index: 1035 !important;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 0px !important;
    /* background: var(--v-primary-base)  !important;
    opacity: 0.3 ; */
}
.shortcut-card {
    border-radius: 50% 0 !important;
    color: var(--v-primary-base) !important;
    border-color: var(--v-info-lighten1) !important;
    background: var(--v-info-lighten1) !important;
}
</style>

<style lang="scss" scoped>
.app--drawer{
   overflow: hidden;
   z-index: 99;
}
.drawer-menu--scroll{
   height: calc(100vh - 56px);
   overflow: auto; 
   /**侧边栏立体效果设置*/
   //background: linear-gradient(to right, var(--v-primary-base) 97%, var(--v-primary-darken1) 100%);
}
.drawer-toolbar--scroll {
  /**侧边栏立体效果设置*/
  //background: linear-gradient(to right, var(--v-primary-darken1) 97%, var(--v-primary-darken2) 100%);
}
</style> 
<style lang="scss">
/**侧边栏立体效果设置
.v-navigation-drawer__border {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 0px !important;
}
*/
</style> 
<!-- 左侧菜单栏设置 -->
<style lang="scss" >
 .v-list-item--active  {
    color:#FFF !important;
}
.v-application--is-ltr .v-list-item__action:first-child, .v-application--is-ltr .v-list-item__icon:first-child {
    margin-left: 0px;
    margin-right: 12px;
}
.f-child {
    padding-left: 0px;
}
.s-child {
    padding-left: 34px;
}
.t-child {
    padding-left: 18px;
    flex: 1 1 100%;
    padding-right: 0px;
}
.tc-child{
    padding-right: 0px;
}
.tt-child {
    padding-left:50px;
}
.theme--dark.v-navigation-drawer {
    background-color: #101010;
}
</style> 