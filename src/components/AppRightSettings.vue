<template>
   <div>
     
    <!-- 右侧设置按钮-自定义 
    <div class="right-settings primary">
      <v-btn
        dark
        v-show="!rightDrawer"
        text
        icon
        x-small
        class="white--text"
        @click="openRightSettings"
      >
        <v-icon  style="margin-top:3px">settings</v-icon>
      </v-btn>
    </div>
    -->
    <!-- 右侧设置按钮-原始 -->
    <!--
    <div class="right-settings primary">
      <v-btn
        dark
        v-show="!rightDrawer"
        text
        icon 
        middle
        class="white--text"
        @click="openRightSettings"
      >
        <v-icon>settings</v-icon>
      </v-btn>
    </div>
    -->
    <v-navigation-drawer
      v-model="rightDrawer"
      right
      fixed
      dark
      hide-overlay
      temporary
      class="setting-drawer primary"
    >
    <v-toolbar dark color="primary darken-1" class="white--text" height="56">
      <v-toolbar-title class="white--text body-1">
        系统设置
      </v-toolbar-title>
    </v-toolbar>
      <setting-options
        ref="settingOptions"
        @toggleMini="(val) => $emit('toggleMini', val)" 
        @toggleTemporary="(val) => $emit('toggleTemporary', val)"
      />
    </v-navigation-drawer>
  </div>
</template>

<script>
import SettingOptions from './setting-options/ThemeSettingMain.vue';

export default {
  name: 'AppRightSettings',
  components: {
    SettingOptions,
  },
  props: ["rDrawer"],
  data() {
    return {
      rightDrawer: this.rDrawer,
    };
  },
  watch: {
      rDrawer(val) {
        this.rightDrawer = val;
      },
      rightDrawer(val){
        this.$emit("on-settings-change",val);
      },
  },   
  methods: {
    openRightSettings() {
      this.rightDrawer = true;
    },
    changeTemporary(val) {
      this.$refs.settingOptions.changeTemporary(val);
    },
  },
};
</script>

<style lang="scss" scoped>
.right-settings {
  position: fixed;
  top: 64px !important;
  right: 0;
  width: 30px;
  height: 30px;
  z-index: 1036 !important;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 18px 0 0 18px;
  text-align: center;
}
/*
.right-settings {
  position: fixed;
  top: 50% !important;
  right: 0;
  width: 36px;
  z-index: 1036;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 18px 0 0 18px;
  text-align: center;
}
*/
</style>
