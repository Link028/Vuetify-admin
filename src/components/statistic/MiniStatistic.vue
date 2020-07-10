<template>
  <v-card>
    <v-card-text class="pa-0 primary">
      <v-container class="pa-0">
        <div class="layout row ma-0">
          <div class="sm6 xs6 flex  pa-5">
            <div class="layout column ma-2 justify-center align-center">
              <v-icon size="76px" :color="color">{{ icon }}</v-icon>
              <!--  
              <div class="title text-center white--text" >{{ text }}</div>
              -->
            </div>
          </div>
          <div class="sm6 xs6 flex text-sm-center white--text  pt-5" :class="color">
            <div class="headline">{{ title }}</div>
            <span class="title">{{ subTitle }}</span>
          </div>
        </div>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    icon: String,
    title: String,
    subTitle: String,
    color: String,
    text: String,
  }
}
</script>
