<template>
  <v-card raised elevation="8" :id="cid" class="primary lighten-0"><!-- darken-1 -->
    <v-toolbar v-if="fillHeader" flat dense color="transparent" :height="toolbarHeight">
      <v-toolbar-title>
        <v-subheader class="pl-0 white--text body-1"><v-icon class="white--text" size="22" left>{{ icon }}</v-icon>{{ title }}</v-subheader>
      </v-toolbar-title>
      <v-spacer class="white--text"></v-spacer>
      <v-btn large icon text  class="white--text" @click="show = !show" style="margin-right: -4px;">
        <v-icon size="28">{{ show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
      </v-btn>
      <v-btn v-if="fc" large icon text  class="white--text" @click="launchFullscreen(cid)" style="margin-left: -4px;">
        <v-icon size="18">{{ isFullscreen ? 'fa-compress':'fa-expand' }}</v-icon>
      </v-btn>
    </v-toolbar>
    <v-expand-transition>
      <div v-show="show" class="ma-0 pa-0">
        <v-divider v-if="fillHeader" class="primary lighten-1"/>
        <v-card-text class="primary white--text" >
          <slot name="card-content"></slot>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  name: 'CVisualCard',
  props: {
    fillHeader: {
      type: Boolean,
      default: true,
    },
    toolbarHeight: {
      type: [Number, String],
      default: 42,
    },
    title: {
      type: String,
    },
    icon: {
      type: String,
      default: "filter_b_and_w",
    },  
    fc: {
      type: Boolean,
      default: true,
    },    
  },
  data() {
    return {
      isFullscreen: false ,
      show: true ,
      cid: Math.random().toString(36).slice(-8)
    }
  },
 methods: {
    launchFullscreen(cid) {
      var element = document.getElementById(cid);
      if( ! this.isFullscreen )
      {
         if (element.requestFullscreen) {
						element.requestFullscreen();
					} else if (element.mozRequestFullScreen) {
						element.mozRequestFullScreen();
					} else if (element.webkitRequestFullscreen) {
						element.webkitRequestFullscreen();
          } else if (element.msRequestFullscreen) {
						element.msRequestFullscreen();
          } 
          this.isFullscreen = true ; 
      }
      else
      {
          if (document.exitFullscreen) {
						document.exitFullscreen();
					} else if (document.mozCancelFullScreen) {
						document.mozCancelFullScreen();
					} else if (document.webkitExitFullscreen) {
						document.webkitExitFullscreen();
					}
          this.isFullscreen = false ; 
      }
    },
 }
};
</script>
