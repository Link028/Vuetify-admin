<template>
      <v-snackbar
         dark 
         bottom 
         right
         multi-line
         vertical   
         v-model="snackbar.show"  
         :color="snackbar.color"
         :timeout="snackbar.timeout"
      >
      {{ snackbar.text }}
      <v-btn dark text icon @click.native="snackbar.show = false">
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>

</template>
<script>
export default {
  name: 'Snackbar',
  components: {
  },
  data() {
    return {
        snackbar: {
        show: false,
        text: "",
        color: "info",
        timeout:300000,
      }
    }
  },
  created() {
  },
  methods: {
  }
}
</script>

