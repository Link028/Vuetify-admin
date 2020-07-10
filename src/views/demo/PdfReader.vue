<template>
  <pdf-reader :style="{ height: domHeight + 'px' }" />
</template>

<script>
import PdfReader from '@/views/demo/pdf/PdfReader.vue';

export default {
  name: 'PdfReaderComponent',
  components: {
    PdfReader,
  },
  data() {
    return {
      domHeight: 600,
    };
  },
  mounted() {
    try {
      const { clientHeight } = document.getElementById('main-container');
      this.domHeight = clientHeight - 145;
    } catch (err) {
      this.domHeight = 600;
    }
  },
};
</script>
