<template>
  <v-fab-transition>
    <v-btn
      dark
      fab="fab"
      small
      fixed="fixed"
      bottom="bottom"
      right="right"
      color="primary"
      v-show="fab"
      @click="toTop"
      v-scroll="onScroll"
    >
      <v-icon>keyboard_arrow_up</v-icon>
    </v-btn>
  </v-fab-transition>
</template>

<script>
export default {
  name: "AppFab",
  data: () => ({
    fab: false
  }), 
  methods: {
    onScroll() {
      if (typeof window === "undefined") return
      const top = window.pageYOffset || document.documentElement.offsetTop || 0
      this.fab = top > 400
    },
    toTop() {
      this.$router.push({ hash: "" }).catch(err => {err})
      this.$vuetify.goTo(0)
    }
  }
}
</script>
