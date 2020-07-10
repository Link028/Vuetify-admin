<template>
  <v-toolbar color="third" fixed app>

      <v-toolbar-title class="ml-0 pl-3"> 
        <v-btn flat class="white--text" to="/" href="/" small type="link" style="height:64px; ">
          <img v-bind:src="company.logo_title"  height="100%">
        </v-btn> 
      </v-toolbar-title> 

      <v-spacer></v-spacer>
      
      <v-menu open-on-hover offset-y origin="center center" :nudge-bottom="0" transition="fade-transition">
        <v-btn flat small to="/home" href="/home" class="body-2   menu-btn--fixed menu-btn--fixed-max " type="link" slot="activator">
          <v-icon size="18">home</v-icon>主页</v-btn>  
      </v-menu>

      <v-menu open-on-hover offset-y origin="center center" :nudge-bottom="0" transition="fade-transition">
        <v-btn flat small to="/products"  href="/products" class="body-2   menu-btn--fixed menu-btn--fixed-max " type="link" slot="activator">
          <v-icon size="18">list</v-icon>产品中心
        </v-btn> 
      </v-menu> 

      <v-menu open-on-hover offset-y origin="center center" :nudge-bottom="0" transition="fade-transition">
        <v-btn flat small to="/services" href="/services" class="body-2   menu-btn--fixed menu-btn--fixed-max " type="link" slot="activator">
          <v-icon size="18">donut_small</v-icon>咨询服务
        </v-btn> 
      </v-menu>

      <v-menu open-on-hover offset-y origin="center center" :nudge-bottom="0" transition="fade-transition">
        <v-btn flat small class="body-2   menu-btn--fixed menu-btn--fixed-max" type="link" slot="activator">
          <v-icon size="18">dashboard</v-icon>行业应用
        </v-btn>
        <v-list class="pa-0 menu-list--drown ">
          <v-list-tile to="/energy" href="/energy" ripple="ripple"  rel="noopener">  
            <v-icon size="18">brightness_5</v-icon>
            <v-list-tile-title class="body-2 pl-1">能源</v-list-tile-title>
          </v-list-tile>
        </v-list>
        <v-list class="pa-0 menu-list--drown ">
          <v-list-tile  to="/sewageDisposal" href="/sewageDisposal" ripple="ripple"  rel="noopener" >  
            <v-icon size="18">tune</v-icon>
            <v-list-tile-title class="body-2 pl-1">污水处理</v-list-tile-title>
         </v-list-tile>
        </v-list>   
        <v-list class="pa-0 menu-list--drown "> <!--  to="/manufacture" href="/manufacture"  -->
          <v-list-tile ripple="ripple"  rel="noopener" >  
            <v-icon size="18">devices_other</v-icon>
            <v-list-tile-title class="body-2 pl-1">工业制造</v-list-tile-title>
          </v-list-tile>
        </v-list>   
        <v-list class="pa-0 menu-list--drown "><!-- to="/firefighting" href="/firefighting" -->
          <v-list-tile  ripple="ripple"  rel="noopener" >  
            <v-icon size="18">wb_incandescent</v-icon>
            <v-list-tile-title class="body-2 pl-1">消防</v-list-tile-title>
          </v-list-tile>
        </v-list> 
        <v-list class="pa-0 menu-list--drown "><!-- to="/government" href="/government" -->
          <v-list-tile  ripple="ripple"  rel="noopener" >  
            <v-icon size="18">blur_on</v-icon>
            <v-list-tile-title class="body-2 pl-1">政府部门</v-list-tile-title>
          </v-list-tile>
        </v-list>
        <v-list class="pa-0 menu-list--drown "><!-- to="/finance" href="/finance" -->
          <v-list-tile  ripple="ripple" rel="noopener" >  
            <v-icon size="18">device_hub</v-icon>
            <v-list-tile-title class="body-2 pl-1">金融</v-list-tile-title>
          </v-list-tile>
        </v-list> 
      </v-menu>   
      <v-menu open-on-hover offset-y origin="center center" :nudge-bottom="0" transition="fade-transition">
        <v-btn flat small to="/news" href="/news" class="body-2 menu-btn--fixed menu-btn--fixed-max " type="link" slot="activator">
          <v-icon size="18">description</v-icon>新闻博客
        </v-btn> 
      </v-menu>

      <v-menu open-on-hover offset-y origin="center center" :nudge-bottom="0" transition="fade-transition">
        <v-btn flat small class="body-2 menu-btn--fixed menu-btn--fixed-max " type="link" slot="activator">
          <v-icon size="18">label_important</v-icon>关于我们
        </v-btn>
        <v-list class="pa-0 menu-list--drown "> 
          <v-list-tile to="/about" href="/about" ripple="ripple"  rel="noopener" >
            <v-icon size="18">turned_in</v-icon>
            <v-list-tile-title class="body-2 pl-1">公司介绍</v-list-tile-title>
          </v-list-tile>
        </v-list>
        <v-list class="pa-0 menu-list--drown">
        <v-list-tile to="/contacts" href="/contacts" ripple="ripple"  rel="noopener" > 
            <v-icon size="18">phone</v-icon>
            <v-list-tile-title class="body-2 pl-1">联系我们</v-list-tile-title>
          </v-list-tile>
        </v-list>  
      </v-menu>
 
      <v-menu open-on-hover offset-y origin="center center" :nudge-bottom="0" transition="fade-transition"  v-if="show">
        <v-btn flat small to="/portal" href="/portal" class="body-2 menu-btn--fixed menu-btn--fixed-max " type="link" slot="activator">
        <v-icon size="18">drag_indicator</v-icon>企业门户
        </v-btn> 
      </v-menu>

      <v-menu open-on-hover offset-y origin="center center" :nudge-bottom="10" transition="fade-transition" v-if="show">
        <v-btn icon large flat slot="activator">
          <v-avatar size="30px">
            <img src="/images/user/male.jpg" alt=""/>
          </v-avatar>
        </v-btn>
        <v-list class="pa-0 menu-list--drown">
          <v-list-tile v-for="(item,index) in items" :to="item.href" :href="item.href" @click="item.click" ripple="ripple" :disabled="item.disabled" :target="item.target" rel="noopener" :key="index">
            <v-list-tile-action v-if="item.icon">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action> 
              <v-list-tile-title class="body-2">{{ item.title }}</v-list-tile-title> 
          </v-list-tile>
        </v-list>
      </v-menu>

      <v-toolbar-items transition="scale-transition" >
        <v-btn flat small class="body-2  menu-btn--fixed menu-btn--fixed-large" type="link" @click.stop="handleDrawerToggle" transition="fade-transition">
          产品演示&nbsp;&nbsp;<v-icon size="18">launch</v-icon>
        </v-btn>   
      </v-toolbar-items>

  </v-toolbar>
</template>
<script>
import Util from '@/utils/utils';
const Project = require('@/config/project.json');
export default {
  name: 'app-toolbar',
  components: {},
  data () {
    return {
      show: this.$store.state.token != null,    //window.localStorage.getItem("token") == null,
      project:Project,
      items: [
        {icon: 'info',href: '/person',title: '个人信息', click: (e) => { console.log(e);}}, 
        { icon: 'fullscreen', href: '#', title: '退出系统', click: () => { window.getApp.$emit('APP_LOGOUT'); } }
      ],
    };
  },
  /*
  data: () => (
    {
      show: this.$store.state.token == null,    //window.localStorage.getItem("token") == null,
      company:Company,
      items: [
      {
        icon: 'info',
        href: '/person',
        title: '个人信息',
        click: (e) => {
          //console.log(e);
        }
      }, 
      {
        icon: 'fullscreen',
        href: '#',
        title: '退出系统',
        click: (e) => {
          window.getApp.$emit('APP_LOGOUT');
        }
      }
    ],
  }),
  */
 
  methods: {
    handleDrawerToggle () {
      window.getApp.$emit('APP_DRAWER_TOGGLED');
      //关闭底层滚动条
      document.body.style.height = '100vh';
      document.body.style['overflow-y'] = 'hidden';
    },
    handleFullScreen () {
      Util.toggleFullScreen();
    }
  }
};
</script>

<style lang="stylus" scoped>
  .menu-btn--fixed {
    top: 0px;
    left: 0px;
    margin : 0px;
    padding : 0px ;  
    min-width: 68px; 
    height: 64px;
  } 
  .menu-btn--fixed-nom {
    min-width: 80px; 
  }   
  .menu-btn--fixed-max {
    min-width: 100px; 
  }  
    .menu-btn--fixed-large {
    min-width: 120px; 
  }  
  .menu-list--drown {
    min-width: 180px; 
  }   
  .v-menu__content {
    box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.2), 0px 0px 0px 0px rgba(0,0,0,0.14), 0px 0px 0px 0px rgba(0,0,0,0.12);
    border-radius: 0px;
  } 
</style>
