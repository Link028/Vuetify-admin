<template>
  <v-layout>
    <v-flex>
        <v-container grid-list-md>
          <v-card class="elevation-0 primary lighten-0">
            <v-subheader class="pl-1 white--text">主题颜色</v-subheader>
            <v-flex>
              <chrome-picker id="c-picker" :class="[$style.colorPicker]" v-model="primarycolor"/>
            </v-flex>
            <v-divider class="mt-4 primary lighten-1"></v-divider>
            <v-subheader class="pl-1 white--text">侧边栏颜色</v-subheader>
            <v-flex class="pl-1">
              <v-card-text class="mt-2 mb-2 pt-0 pb-0 ml-0 pl-0">
                <v-btn style="border:2px solid;" fab dark ripple small color="#101010" max-height="20" max-width="20"  min-width="20" min-height="20" @click="changeLeftMenuColor('#101010')" transition="scale-transition"/>
                &nbsp;  
                <v-btn style="border:2px solid;" fab dark ripple small color="#4c4c4c" max-height="20" max-width="20"  min-width="20" min-height="20" @click="changeLeftMenuColor('#4c4c4c')" transition="scale-transition"/>
                &nbsp;
                <v-btn style="border:2px solid;" fab dark ripple small color="#FF5200" max-height="20" max-width="20"  min-width="20" min-height="20" @click="changeLeftMenuColor('#FF5200')" transition="scale-transition"/>
                &nbsp;
                <v-btn style="border:2px solid;" fab dark ripple small color="#E91E63" max-height="20" max-width="20"  min-width="20" min-height="20" @click="changeLeftMenuColor('#E91E63')" transition="scale-transition"/>
                &nbsp; 
                <v-btn style="border:2px solid;" fab dark ripple small color="#00E3CA" max-height="20" max-width="20"  min-width="20" min-height="20" @click="changeLeftMenuColor('#00E3CA')" transition="scale-transition"/>
                &nbsp; 
                <v-btn style="border:2px solid;" fab dark ripple small color="#0C10FF" max-height="20" max-width="20"  min-width="20" min-height="20" @click="changeLeftMenuColor('#0C10FF')" transition="scale-transition"/>
                &nbsp;
                <v-btn style="border:2px solid;" fab dark ripple small color="#021579" max-height="20" max-width="20"  min-width="20" min-height="20" @click="changeLeftMenuColor('#021579')" transition="scale-transition"/>
                &nbsp;                 
                <v-btn style="border:2px solid;" fab dark ripple small :color="leftmenucolor"  max-height="20" max-width="20"  min-width="20" min-height="20" @click="changeLeftMenuColor( leftmenucolor )"     transition="scale-transition"/>
              </v-card-text> 
            </v-flex>
          </v-card>

          <v-divider class="mt-4 primary lighten-1"></v-divider>
          <v-card class="elevation-0 primary lighten-0 ma-0 pa-0">
           <v-subheader class="pl-1 white--text">预定义主题</v-subheader>  
           <v-flex class="color-option">
            <v-layout wrap>
              <label class="color-option--label flex xs6 pa-1" v-for="(option, index) in themeColorOptions" :key="index">
                <input type="radio" name="color" :value="option.key" v-model="themeColor" v-on:click="changePreColor(option.key)"/>
                <span class="color-option--item bg">
                  <span class="overlay">
                    <span class="material-icons">check</span>
                  </span>
                  <span class="color-option--item--header sideNav darken-1" :class="option.value.sideNav" style="height: 15px; width:35%"></span>
                  <span class="color-option--item--header mainNav" :class="option.value.mainNav" style="height: 15px; width:65%"></span>
                  <span class="sideMenu" :class="option.value.sideMenu" style="width:35%"></span>
                  <span class="rightPage lighten-2" :class="option.value.sideMenu" style="width:65%"></span>
                </span>
              </label>
              <label class="color-option--label flex xs6 pa-1">
                <input type="radio" name="color" value="#021399" v-model="themeColor" @click="changePreColor('#021399')"/>
                <span class="color-option--item bg">
                  <span class="overlay">
                    <span class="material-icons">check</span>
                  </span>
                  <span class="color-option--item--header sideNav" style="background-color: #00007e !important; border-color: #021399 !important; height: 15px; width:35% "></span>
                  <span class="color-option--item--header mainNav" style="background-color: #021399 !important; border-color: #021399 !important; height: 15px; width:65% "></span>
                  <span class="sideMenu" style="background-color: #021399 !important; border-color: #021399 !important; width:35%"></span>
                  <span class="rightPage darken-1" style="background-color: #455AFF !important; border-color: #021399 !important; width:65%"></span>
                </span>
              </label>
            </v-layout>
           </v-flex>
          </v-card>
          <v-divider class="mt-4 primary lighten-1"></v-divider>
          <v-card class="elevation-0 primary lighten-0">
            <v-card-text class="pa-0">
              <v-list class="pa-0"> 
                  <!-- 侧边栏立体效果设置停用
                  <v-list-item>
                      <v-card-text class="white--text">侧边栏颜色</v-card-text>
                  </v-list-item>
                  <v-list-item style="padding: 0 12px;">
                      <v-card-text class="mt-2 mb-2 pt-0 pb-2">
                        <v-btn style="border:2px solid;" fab dark ripple small color="#101010" max-height="20" max-width="20"  min-width="20" min-height="20" @click="changeLeftMenuColor('#101010')" transition="scale-transition"/>
                        &nbsp;  
                        <v-btn style="border:2px solid;" fab dark ripple small color="#4c4c4c" max-height="20" max-width="20"  min-width="20" min-height="20" @click="changeLeftMenuColor('#4c4c4c')" transition="scale-transition"/>
                        &nbsp;
                        <v-btn style="border:2px solid;" fab dark ripple small color="#FF5200" max-height="20" max-width="20"  min-width="20" min-height="20" @click="changeLeftMenuColor('#FF5200')" transition="scale-transition"/>
                        &nbsp;
                        <v-btn style="border:2px solid;" fab dark ripple small color="#E91E63" max-height="20" max-width="20"  min-width="20" min-height="20" @click="changeLeftMenuColor('#E91E63')" transition="scale-transition"/>
                        &nbsp; 
                        <v-btn style="border:2px solid;" fab dark ripple small color="#00E3CA" max-height="20" max-width="20"  min-width="20" min-height="20" @click="changeLeftMenuColor('#00E3CA')" transition="scale-transition"/>
                         &nbsp; 
                        <v-btn style="border:2px solid;" fab dark ripple small color="#0C10FF" max-height="20" max-width="20"  min-width="20" min-height="20" @click="changeLeftMenuColor('#0C10FF')" transition="scale-transition"/>
                        &nbsp; 
                        <v-btn style="border:2px solid;" fab dark ripple small :color="leftmenucolor"  max-height="20" max-width="20"  min-width="20" min-height="20" @click="changeLeftMenuColor( leftmenucolor )"     transition="scale-transition"/>
                      </v-card-text> 
                  </v-list-item>
                  <v-divider class="primary lighten-1"></v-divider> 
                   -->
                  <!-- 侧边栏立体效果设置停用结束 -->

                  <v-list-item>
                      <v-card-text class="white--text">暗色主题</v-card-text>
                      <v-switch  v-model="dark"  @change="changeDark" color="primary lighten-1"/>
                  </v-list-item>
                  <v-divider class="primary lighten-1"></v-divider>
                  
                  <v-list-item>
                      <v-card-text class="white--text">侧边栏最小化</v-card-text>
                      <v-switch v-model="mini" @change="changeMini" color="primary lighten-1"/>
                  </v-list-item>

                  <v-divider class="primary lighten-1"></v-divider>
                  <v-list-item>
                      <v-card-text>标签视图</v-card-text>
                        <v-switch v-model="tagview" @change="changeTagview" color="primary lighten-1"/>
                  </v-list-item>
                 
                  <!-- 
                  <v-divider class="primary lighten-1"></v-divider>
                  <v-list-item>
                      <v-card-text>RTL视图</v-card-text>
                        <v-switch v-model="rtl" @change="changeRtl" color="primary lighten-1"/>
                  </v-list-item>
                  -->

                  <v-divider class="primary lighten-1"></v-divider>
                    
                  <v-list-item class="ml-4 mt-2">
                    <v-btn tile text dark outlined height="36px" width="80" @click="saveSettings">
                      保存设置
                    </v-btn>    
                    <!--
                    <v-btn tile text dark outlined height="36px" width="120" @click.stop="saveSettings"><v-icon left size="17">fa-save</v-icon> 保存设置</v-btn>
                    -->
                  </v-list-item>
                  <!-- 
                  <v-divider class="primary lighten-1"></v-divider>
                  <v-list-item>
                      <v-card-text>侧边栏固定</v-card-text>
                        <v-switch v-model="permanent" @change="changeTemporary"></v-switch>
                  </v-list-item>
                  -->
              </v-list>
            </v-card-text>
          </v-card>
        </v-container> 
    </v-flex>
  </v-layout>
</template>
<script> 
import { Chrome } from 'vue-color';
export default {
  name: 'SettingOptions',
  components: {
    'chrome-picker': Chrome,
  },
  data() {
    return {
      dark: this.$config.view.darkthem,
      mini: this.$config.view.minidraw,
      tagview: this.$config.view.tag,
      rtl: this.$config.view.rtl,
      permanent: this.$config.view.permanent,
      primarycolor: this.$config.view.primary,
      leftmenucolor: this.$config.view.leftmenu,
      //----------------
      themeColor: this.$config.view.primary,
    };
  },
  methods: {
     changeLeftMenuColor(val){
       this.$vuetify.theme.themes.light.leftmenu = val;
       this.$config.view.leftmenu = val ;

       //this.themeColor = "#FFFFFF";
       this.themeColor=val;
     },
     changeDark(val){
       this.$vuetify.theme.dark = val ;
       this.$config.view.darkthem = val ;
     },
     changeMini(val) {
       this.$emit('toggleMini', val);
       this.$config.view.minidraw = val ;
     },
     changeTagview(val) {
        this.$config.view.tag = val;
        console.log( this.$config.view.tag );
     },
     changeRtl() {
        this.$config.view.rtl = ! this.$config.view.rtl ;
        this.$vuetify.rtl = this.$config.view.rtl ;
     },

     changeTemporary(val) {
      this.$refs.navigationDrawer.temporary = val;
      this.$config.view.permanent = val;
     },
     changePreColor(val) {
       //this.$vuetify.theme.primary = this.colors[val].base
       this.$config.view.primary = val ;
       this.$vuetify.theme.themes.light.primary = val ;
       this.$config.view.leftmenu = val ;
       this.$vuetify.theme.themes.light.leftmenu = val ;
       this.leftmenucolor= val ;

       //this.primarycolor= val ;
     },
     saveSettings() {
     },     
  },
  watch: {
    primarycolor(newVal) {
       this.$config.view.primary = newVal.hex;
       this.$vuetify.theme.themes.light.primary = newVal.hex;
       this.$config.view.leftmenu = newVal.hex;
       this.leftmenucolor= newVal.hex;
       //this.$vuetify.theme.themes.light.leftmenu = newVal.hex; //启用或停用调节左侧栏位颜色
       
       /**侧边栏立体效果设置*/
       //this.$vuetify.theme.themes.light.leftmenu = newVal.hex; 
       /**侧边栏立体效果设置结束*/

       this.themeColor = newVal.hex ;
    },
    //themeColor: {
    //  handler(val) {
    //    this.$config.view.primary = val ;
    //    this.$vuetify.theme.themes.light.primary = val ;
    //    this.$config.view.leftmenu = val ;
    //    this.$vuetify.theme.themes.light.leftmenu = val;
    //    this.leftmenucolor= val ;
    //  },
    //  //immediate: true
    //},
  },
  mounted(){
    this.$emit('toggleMini', this.$config.view.minidraw );
    this.$vuetify.theme.dark = this.$config.view.darkthem ;
    this.$vuetify.theme.themes.light.primary = this.$config.view.primary ;
    this.$vuetify.theme.themes.light.leftmenu = this.$config.view.leftmenu ;
    this.$vuetify.rtl = this.$config.view.rtl ;
  },

  computed: {
    themeColorOptions() {return [
        {key: "#2196F3",value: {sideNav: "blue",mainNav: "blue", sideMenu: "blue"}},
        {key: "#009688",value: {sideNav: "teal",mainNav: "teal", sideMenu: "teal"}},
        {key: "#F44336",value: {sideNav: "red",mainNav: "red", sideMenu: "red"}},
        {key: "#FF9800",value: {sideNav: "orange",mainNav: "orange", sideMenu: "orange"}},
        {key: "#9C27B0",value: {sideNav: "purple",mainNav: "purple", sideMenu: "purple"}},
        {key: "#3F51B5",value: {sideNav: "indigo",mainNav: "indigo", sideMenu: "indigo"}},
        {key: "#00BCD4",value: {sideNav: "cyan",mainNav: "cyan", sideMenu: "cyan"}},
        {key: "#E91E63",value: {sideNav: "pink",mainNav: "pink", sideMenu: "pink"}},
        {key: "#4CAF50",value: {sideNav: "green",mainNav: "green", sideMenu: "green"}},
    ]}
  },

};
</script>

<style lang="scss" module>
.colorPicker {
  margin: auto;
}
</style>
<style lang="scss">
.vc-chrome-saturation-wrap {
    width: 100%;
    padding-bottom: 55%;
    position: relative;
    border-radius: 0px 0px 0px 0px !important ;
    overflow: hidden;
}
</style>

<style lang="stylus" scoped>
.color-option
  &--label
    position: relative
    display: block
    cursor: pointer
    & input[type="radio"]
      display:none
      &+span
        position: relative
        &>.overlay
          display: none;
          position: absolute
          top: 0;
          bottom: 0;
          right: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0,0,0,.3);
          text-align: center;
          line-height: 30px;
          color: #fff;
      &:checked+span>.overlay
        display:block
    & .bg
      background-color: #f1f1f1
  &--item
    overflow: hidden;
    display: block;
    box-shadow: 0 0 2px rgba(0,0,0,.1);
    margin-bottom: 0px;
    &--header
      height: 10px
    &>span
      display: block;
      float: left;
      width: 50%;
      height: 20px;
</style>
