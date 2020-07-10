<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex>
        <v-card raised elevation="8"  :id="cid" class="primary lighten-0"><!-- darken-1 -->
          <v-toolbar v-if="fillHeader" flat dense color="transparent" :height="toolbarHeight">
            <v-toolbar-title>
              <v-subheader class="pl-0 white--text body-1"><v-icon class="white--text" size="17" left>{{ icon }}</v-icon>{{ title }}</v-subheader>
            </v-toolbar-title>
            <v-spacer class="white--text"></v-spacer>
            <v-btn v-if="fc" large icon text class="white--text" @click="launchFullscreen(cid)">
              <v-icon size="18">{{ isFullscreen ? 'fa-compress' : 'fa-expand' }}</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider v-if="fillHeader" class="primary lighten-1"/>
          <v-card-text class="primary white--text" >
            <slot name="card-content"></slot>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'CFormCard',
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
    cid: {
      type: String,
      default: Math.random().toString(36).slice(-8),
    },
    icon: {
      type: String,
      default: "share",
    },
    fc: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isFullscreen: false ,
    }
  },
 methods: {
    launchFullscreen(cid) {
       //if( this.getFullscreenElement() != null &&  ! this.isFullscreen  ){
       //    return ;
       //}
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
    test() {
      let doc = window.document ;
      let docEl = doc.documentElement ;
      let requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen ;
      let cancelFullScreen =  doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen ;
      if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        this.isFullscreen = false ;
      } else {
        this.isFullscreen = true ;
      }
    },
    getFullscreenElement() {
        return (        
            document.fullscreenElement ||
            document.mozFullScreenElement ||
            document.msFullScreenElement ||
            document.webkitFullscreenElement||null
        );
    },

  },
  mounted(){
  },
};
</script>
