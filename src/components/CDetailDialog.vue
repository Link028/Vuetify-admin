<template> <!-- no-click-animation  -->
  <v-dialog dark persistent :id="cid" scrollable v-model="open" :dialog="dialog" :fullscreen="fullscreen" :width="width" class="primary elevation-16" style="z-index:1033 !important;">
    <v-card class="primary" dark>
      <v-toolbar flat dense color="transparent" height="52" class="primary darken-0">
        <v-toolbar-title>
          <v-subheader class="pl-0 white--text body-1"><v-icon class="white--text" size="24" left>scatter_plot</v-icon>{{ title }}</v-subheader>
        </v-toolbar-title>
        <v-spacer class="white--text"></v-spacer>
        <v-btn v-if="!fl && cfc" large icon text class="white--text" @click="launchDilalogFullscreen()" style="margin-right: -4px;">
          <v-icon size="18">{{ fullscreen ? 'fa-compress' : 'fa-expand' }}</v-icon>
        </v-btn>
        <v-btn large icon text class="white--text" @click="close" style="margin-left: -4px;">
          <v-icon size="18">fa-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-divider class="primary lighten-1"/>
      <v-card-text style="height: 600px;" class="pl-4 pr-4">
        <v-container fluid>
          <v-layout row wrap fluid>
            <slot name="dialog-content"></slot>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-divider class="primary lighten-1"/>
      <v-toolbar flat dense color="transparent" height="48" class="primary darken-0">
        <v-spacer class="white--text"></v-spacer>
        <v-btn tile text dark outlined height="36" width="80" class="mr-4" @click.stop="close"><v-icon left size="17">fa-close</v-icon> 关闭</v-btn>
      </v-toolbar>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'CDialog',
  props: {
    title: {
      type: String,
      default: '对话框'
    },
    cid: {
      type: String,
      default: Math.random().toString(36).slice(-8),
    },
    dialog: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 800
    },
    fc: {
      type: Boolean,
      default: false
    },
    cfc: {
      type: Boolean,
      default: true
    },
    height: {
      type: Number,
      default: 600
    },
  },
  data() {
    return { 
      open: this.dialog, 
      fullscreen : this.fc ,
      fl : this.fc ,
    }
  },
  methods: {
    launchDilalogFullscreen() {
      this.fullscreen = ! this.fullscreen ;
    }, 
    save() {
      this.$emit("save")
    },
    close() {
      this.$emit("close")
    },
  },
  watch: {
      dialog(val) {
        this.open = val;
      }
  },
};
</script>

<style lang="scss" scoped>
.theme--dark.v-label {
  color: rgba(255, 255, 255, 1);
}
.v-toolbar {
  flex: 0 1 auto;
}
</style>