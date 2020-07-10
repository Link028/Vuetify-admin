<template>
    <v-snackbar
      v-model="visible"
      :color="color || type"
      :timeout="timeout"
      dark 
      bottom 
      right
      multi-line
      vertical
    >
      {{ text }}
      <v-btn dark text icon @click="close">
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      timeout: 3000,
      text: '',
      color: null,
      timer: null,
      closed: false,
      duration: this.timeout,
      type: 'info',
    };
  },
  methods: {
    close() {
      this.visible = false;
      this.closed = true;
      setTimeout(() => {
        // 从DOM里将这个组件移除
        this.$destroy(true);
        if( this.$el.parentNode)
        {
           this.$el.parentNode.removeChild(this.$el);
        }
      }, 500);
    },
    clearTimer() {
      // TODO: Can be disabled when the mouse is over.
      // this.timeout = 0;
      clearTimeout(this.timer);
    },
    startTimer() {
      // this.timeout = this.duration;
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close();
            this.duration = 0;
          }
        }, this.duration);
      }
    },
    keydown(e) {// esc关闭消息
      if (e.keyCode === 27 && !this.closed) {      
        this.close();
      }
    },
  },
  mounted() {
    this.duration = this.timeout;
    this.startTimer();
    document.addEventListener('keydown', this.keydown);
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.keydown);
  },
};
</script>
