<template>
    <v-layout class="align-center layout px-4" >

      <v-breadcrumbs small divider="/" :items="breadcrumbs" class="breadcrumbs">
      <!--
          <v-breadcrumbs small divider="/" :items="items" class="breadcrumbs">
          <template v-slot:item="props">
             <a :href="props.item.href" :class="[props.item.disabled && 'disabled']">{{ props.item.text}}</a>
        </template>
      -->
      </v-breadcrumbs>
      
      <v-spacer></v-spacer>
      
      <div class="page-header-right">
        <v-btn icon text @click.stop="refresh">
          <v-icon class="white--text" >refresh</v-icon>
        </v-btn>
      </div>
      
    </v-layout>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      title: "Home",
      breadcrumbs: [],
      pagehref:"",
    }
  },
  watch: {
    '$route.path': function (newVal) {
      this.computeBreadcrumbs()
    }
  },
  methods: {
    computeBreadcrumbs () {
      //console.log(this.$route.path)
      //if( this.$route.path == '/403' || this.$route.path == '/404' || this.$route.path == '/500' )
      //{
      //   this.breadcrumbs = ['404'];
      //}
      let  breadcrumbs = [];//[  {text: "Home",href: "/",disabled: false } ];
      let appends = []
      appends = this.$route.matched.map( item => {
        this.pagehref = item.path; 
        return {
          text: item.name || "",
          href: item.path || "/",
          disabled: item.path === this.$route.path
        }
      })
      this.breadcrumbs = breadcrumbs.concat(appends)
    },
    refresh () {
    var href = this.pagehref + "?t=" + Math.random()  ;  
    var separator = "&";
    if(href.indexOf('?')==-1) { separator='?'; }
     if(href.indexOf('t=')==-1)
     {
       href = href + separator + "t=" + Math.random();
     }
     else
     {
       href = href.substring(0,href.indexOf('t=')) + separator + "t=" + Math.random();
     }
     this.$router.replace(href);
    } 
  },
  created () {
    this.computeBreadcrumbs()
  },
  /*
  computed: {
    items() {
      const { path, matched } = this.$route;
      const items = [];
      for (let i = 0, len = matched.length; i < len; i += 1) {
        const route = matched[i];
        if (route.name) {
          items.push({
            text: route.name,
            disabled: route.path === path,
            to: route.path,
          });
        }
      }
      return items;
    },
  },
  */
}
</script>
<style lang="stylus">
  .disabled
  {
    color: grey 
    pointer-events: none
    text-decoration: blink
  }
  .breadcrumbs
  {
    height: 50px ;
    padding 0px !important;
  }
  .theme--light.v-breadcrumbs .v-breadcrumbs__divider, .theme--light.v-breadcrumbs .v-breadcrumbs__item--disabled {
    color: rgba(255, 255, 255, 0.6) !important;
  }
  .v-application a {
    color: rgba(255, 255, 255, 1) !important ;
  }
</style>