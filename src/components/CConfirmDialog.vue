<template>
  <v-row justify="center">
    <v-dialog v-model="open" :dialog="dialog" dark persistent scrollable class="primary elevation-16" max-width="360" style="z-index:1034 !important;">
       <v-card class="primary" dark>
        <v-card-title class="subtitle">确认对话框</v-card-title>
        <v-card-text class="pt-4 pb-4">{{content}}</v-card-text>
        <v-card-actions class="pb-5">
          <v-toolbar flat dense color="transparent" height="48" class="primary darken-0">
            <v-spacer></v-spacer>
            <v-btn tile text dark outlined height="36" width="80" class="mr-4" @click="confirmDialog(true)">确认</v-btn>
            <v-btn tile text dark outlined height="36" width="80" @click="confirmDialog(false)">取消</v-btn>
            <v-spacer></v-spacer>
         </v-toolbar>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
  export default {
    name : "CConfirmDialog" ,
    props: {
      content: { type: String, default: '确认？' },
      dialog: { type: Boolean, default: false },
    },
    data () {
      return {
        confirm: true ,
        open: this.dialog, 
      }
    },
    watch: {
      dialog(val) {
        this.open = val;
      }
    },
    methods: {
      confirmDialog(val) {
        this.$emit("confirm",val ) ;
      },
    },
  }
</script>