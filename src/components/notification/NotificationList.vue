<template>
  <v-card>
    <v-toolbar flat dense color="transparent" class="primary">
      <v-toolbar-title class="white--text body-1 font-weight-bold">消息通知</v-toolbar-title>
      <!-- <v-spacer></v-spacer>
      <v-btn @click="checkAllItems" icon > 
       <v-icon>{{ actionsLen === selected.length ? 'check_circle' : 'check_circle_outline' }}</v-icon>
      </v-btn>-->
    </v-toolbar>
    
    <v-card-text class="pa-0 primary">
      <v-divider class="primary lighten-1"></v-divider>
      <v-list dense two-line class="pa-0 primary">
        <template v-for="(item, index) in items">
          <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>
          <v-divider class="primary lighten-1" v-else-if="item.divider" :key="index"></v-divider>
          <v-list-item v-else :key="item.title" @click="handleClick">
            <v-list-item-avatar size="32" :color="item.color">
              <v-icon dark class="white--text">{{ item.icon }}</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-subtitle v-html="item.title" class="white--text"></v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action class="caption white--text">
              {{ item.timeLabel }}
            </v-list-item-action>
          </v-list-item>
        </template>
      </v-list>
      <v-divider class="primary lighten-1"></v-divider>
         <v-btn block text large class="ma-0 white--text body-1" @click="handleNotice">全部</v-btn>
      <v-divider></v-divider>
    </v-card-text>
  </v-card>
</template>

<script>
import notes from "@/api/notification"
export default {
  data: () => ({
    items: notes.list
  }),
  methods: {
    handleClick() { 
    },
    handleNotice() {
      this.$router.push('/user/messages')
    },
  }
}
</script>