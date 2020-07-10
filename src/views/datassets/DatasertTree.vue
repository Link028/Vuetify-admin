<template> 
  <v-dialog dark v-model="open" :dialog="orgDialog" max-width="500px"  class="primary elevation-16">
    <v-card class="primary" dark>
      <v-toolbar flat dense color="transparent" height="52" class="primary darken-0">
        <v-toolbar-title><v-subheader class="pl-0 white--text body-1"><v-icon class="white--text" size="24" left>scatter_plot</v-icon>选择部门</v-subheader></v-toolbar-title>
      </v-toolbar>
      <v-divider class="primary lighten-1"/>
      <v-card-text style="height: 484px;" class="pa-2">
            <v-card class="elevation-16 pa-2 ma-0" outlined tile>
              <v-sheet class="pa-2 pt-0 pb-0 primary">
                <v-text-field v-model="searchOrgTree" label="查找" dark clearable transition clear-icon="mdi-close-circle-outline"/>
              </v-sheet>
              <v-treeview
                dark 
                dense 
                hoverable 
                activatable 
                :items="orgTrees" 
                v-model="orgSelection"
                selection-type="independent"
                return-object
                v-on:update:active=selectIterm
                :search="searchOrgTree"
                :filter="filter"
                style="height: 380px; "
                color="primary lighten-5">
                <template v-slot:prepend="{ item }">
                  <v-icon v-if="item.children" v-text="`mdi-folder-network`" />
                  <v-icon v-if="! item.children" v-text="`mdi-home-variant`" />
                </template>
              </v-treeview>
             </v-card>
      </v-card-text>
      <v-divider class="primary lighten-1"/>
      <v-toolbar flat dense color="transparent" height="48" class="primary darken-0">
          <v-spacer class="white--text"></v-spacer>
          <v-btn tile text dark outlined height="36" width="80"  @click.stop="selectTree" >确定</v-btn>
      </v-toolbar>
    </v-card>
  </v-dialog>
</template>

<script>
 export default {
      props: {
        orgDialog : { type: Boolean,  default: false },
      },
      data() {
        return { 
          orgTrees: [],
          searchOrgTree: null,
          caseSensitive: false,
          orgSelection: [],
          open: this.orgDialog , 
          orgId : null ,
          orgName : null ,
        }
      },
      computed: {
        filter () {
           return this.caseSensitive ? (orgTrees, searchOrgTree, textKey) => orgTrees[textKey].indexOf(searchOrgTree) > -1 : undefined ;
        },  
      },
      mounted(){
         this.getTree();
      },
      methods: {
        getTree () {
            this.$http.get("/app-system/org/findOrg")
            .then((data) => {this.orgTrees = data.data ;})
            .catch((err)=>{ this.$message.error(err);  });
        },
        selectIterm( item ) 
        {
          if( item && item[0])
          {
             this.orgId = item[0].id ;
             this.orgName = item[0].name ;
          }
          else
          {
             this.orgId = null ;
             this.orgName = null ;
          }

          this.$emit("select" , this.orgId , this.orgName ) ;
        },
        selectTree()
        {
          this.$emit("select" , this.orgId , this.orgName ) ;
        }
      },
      watch: {
         orgDialog(val) { this.open = val; }
      },
  }
</script>