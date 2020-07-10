<template>
     <v-footer 
        elevation="8"
        app
        dark
        class="primary"
        color="white--text"  
        height="32"
        inset
        ><!-- pa-2--> 
        <span class="caption">{{ project.product_name }}-{{ project.product_sname }} {{ project.product_version }}</span>
        <v-spacer></v-spacer>
        <span class="caption mr-1 ">Copyright &copy;  2018 - {{ new Date().getFullYear() }}   — <strong>{{ project.company_ename }} </strong> All rights reserved. </span>
      </v-footer>
</template>

<script>
const Project = require('@/config/project.json');

export default {
  name: 'AppFooter',
  components: {
  },
  data () {
    return {
      project:Project,
    };
  }
};
</script>

<style type="text/css">
.ft-mt {
  margin-top: 0px;
}
</style>