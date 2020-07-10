<template>
  <v-app-bar 
      elevation="8"
      app
      dark
      color="white--text"
      class="primary"
      height="56" 
      v-resize="test"
  >
    <!-- <v-app-bar-nav-icon @click.stop="handleDrawerToggle" /> -->
    <!-- <v-toolbar-title> -->
      <v-btn v-if="isDrawerOpen"  large icon text  min-width="48" max-width="48" class="white--text"  @click="handleDrawerToggle">
        <v-icon>menu</v-icon>
      </v-btn>
      <v-btn v-if="!isDrawerOpen" large icon text  min-width="48" max-width="48" class="white--text"  @click="handleDrawerToggle">
        <v-icon>more_vert</v-icon>
      </v-btn> 
    <!-- </v-toolbar-title> -->
    <!-- 管理员您好,欢迎使用 {{ project.product_name }}！  -->
    <v-spacer></v-spacer>

    <v-toolbar-items>

      <v-menu elevation="8" open-on-hover bottom left offset-y origin="center center" min-width="280" max-width="280" :nudge-bottom="1" transition="fade-transition">
          <template v-slot:activator="{ on }">
            <v-btn icon text large  min-width="80" max-width="80" v-on="on"><!--v-slot:activator="{ on }"-->
              <v-badge v-if="notes.count>0" color="red" overlap>
                <span slot="badge">{{ notes.count }}</span>
                <v-icon medium>notifications</v-icon>
              </v-badge>
              <v-badge v-if="notes.count<=0" color="red" overlap>
                <v-icon medium>notifications</v-icon>
              </v-badge>
            </v-btn> 
          </template>
          <notification-list></notification-list>
      </v-menu>

      <v-menu elevation="8" open-on-hover bottom left offset-y origin="center center" min-width="160" max-width="160" :nudge-bottom="1" transition="fade-transition"><!--  slide-y-transition scale-transition -->
         <template v-slot:activator="{ on }">
          <v-btn icon large text min-width="120" max-width="120" v-on="on"><!--v-slot:activator="{ on }"-->
            <v-avatar size="30px">
              <img :src="userInfo.avatar" :alt="userInfo.username" />
            </v-avatar>
            <span style="margin-left: 10px;">{{ userInfo.username }}</span>
          </v-btn>
        </template>
        <v-list class="pa-0 primary">
          <v-list-item to="#" href="#" @click="handleProfile" ripple="ripple" rel="noopener">
            <v-list-item-action>
              <v-icon class="white--text" >account_circle</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="white--text body-1" >个人主页</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="#" href="#" @click="handleSettings" ripple="ripple" rel="noopener">
            <v-list-item-action>
              <v-icon class="white--text" >settings</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="white--text body-1" >账户设置</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="#" href="#" @click="handlePwd" ripple="ripple" rel="noopener">
            <v-list-item-action>
              <v-icon class="white--text">lock</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="white--text body-1">密码修改</v-list-item-title>
            </v-list-item-content>
          </v-list-item> 
          <v-divider class="primary lighten-1"></v-divider>
          <v-list-item to="#" href="#" @click="handleLogut" ripple="ripple" rel="noopener">
            <v-list-item-action>
              <v-icon class="white--text">exit_to_app</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="white--text body-1">退出登录</v-list-item-title>
            </v-list-item-content>
          </v-list-item>           
        </v-list>
      </v-menu>
      
      <!-- 
      <v-btn large icon text min-width="48" max-width="48" class="white--text" @click="openVoice" >
        <v-icon size="24">settings_voice</v-icon>
      </v-btn>
      -->
      
      <v-btn  large icon text min-width="48" max-width="48" class="white--text" @click="handleFullScreen()">
        <v-icon v-if="!isFullscreen">fullscreen_exit</v-icon><v-icon v-if="isFullscreen">fullscreen</v-icon>
      </v-btn>
      <v-btn large icon text min-width="48" max-width="48" class="white--text" @click="openRightSettings" >
        <v-icon>toc</v-icon>
      </v-btn>
      
    </v-toolbar-items>

    <!-- 
      <v-progress-linear
        :active="true"
        :indeterminate="true"
        absolute
        bottom
        color="deep-purple accent-4"
      ></v-progress-linear>
    -->
  </v-app-bar>
</template>

<script>
const Project = require('@/config/project.json');
import NotificationList from "@/components/notification/NotificationList"
import UserInfo from "@/api/userinfo"
import Notes from "@/api/notification"
import screenfull from "screenfull"

export default {
  name: "AppToolbar",
  components: {
    NotificationList
  },
  props: ["drawerOpen"],
  data() {
    return {
      isFullscreen: false ,
      isDrawerOpen:this.drawerOpen,
      notes: Notes,
      userInfo: UserInfo,
      project:Project,
    }
  },
  computed: {
    toolbarColor() {
      return this.$vuetify.options.extra.mainNav
    }
  },
  mounted() {
         
  },
  watch: {
      drawerOpen(val) {
        this.isDrawerOpen = val;
      }
  },
  methods: {
    handleDrawerToggle() {
      this.$emit("side-icon-click")
    },
    openRightSettings() {
      this.$emit("right-settings-click")
    },
    openVoice() {},
    
    test() {
      let doc = window.document ;
      let docEl = doc.documentElement ;
      let requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen ;
      let cancelFullScreen =  doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen ;
      if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        this.isFullscreen = true ;
      } else {
        this.isFullscreen = false ;
      }
    },

    handleFullScreen() {
      if (!screenfull.isEnabled) {
        return false ;
      }
      screenfull.toggle();
      this.isFullscreen =  ! screenfull.isFullscreen ;
       /*
      let doc = window.document ;
      let docEl = doc.documentElement ;
      let requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen ;
      let cancelFullScreen =  doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen ;
      if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        requestFullScreen.call(docEl);
        this.isFullscreen = true ;
      } else {
        cancelFullScreen.call(doc);
        this.isFullscreen = false ;
      }
      */
    },

    handleLogut() {
      this.$router.push('/login')
    },
    handleProfile() {
      this.$router.push('/user/profile')
    },
    handleSettings() {
      this.$router.push('/user/settings')
    },
    handlePwd() {
      this.$router.push('/user/passwd')
    },
  }
}
</script>

<!-- menu下拉菜单圆角样式边框定义 -->
<style lang="scss" scoped>
.theme--light.v-card {
    background-color: transparent !important ;
}
.theme--dark.v-card {
    background-color: transparent !important ;
}
</style>