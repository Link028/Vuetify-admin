<template>
  <v-container grid-list-lg fluid><!-- grid-list-lg -->
    <v-layout row wrap>
      
      <v-flex xs12>
        <c-visual-card title="Line Charts - Area" cid="lc-area">
          <template slot="card-content">
            <line-area-chart />
          </template>
        </c-visual-card>
      </v-flex>

      <v-flex xs12 lg7>
        <c-visual-card title="Line Charts - Base" cid="lc-base">
          <template slot="card-content">
            <line-base-chart />
          </template>
        </c-visual-card>
      </v-flex>
      <v-flex xs12 lg5>
        <c-visual-card title="Line Charts - Sections" cid="lc-cections">
          <template slot="card-content">
            <line-sections-chart />
          </template>
        </c-visual-card>
      </v-flex>

      <v-flex xs12 lg4>
        <c-visual-card title="Line Charts - Rect Area" cid="lc-rarea">
          <template slot="card-content">
            <line-rect-area-chart />
          </template>
        </c-visual-card>
      </v-flex>
      <v-flex xs12 lg4>
        <c-visual-card title="Line Charts - Split Area" cid="lc-sarea">
          <template slot="card-content">
            <line-split-area-chart />
          </template>
        </c-visual-card>
      </v-flex>
      <v-flex xs12 lg4>
        <c-visual-card title="Liquid Fill" cid="lc-liquid">
          <template slot="card-content">
            <liquid-fill-chart />
          </template>
        </c-visual-card>
      </v-flex>

      <v-flex xs12>
        <c-visual-card title="Line Charts - Big Data" cid="lc-bd">
          <template slot="card-content">
            <line-big-data-chart />
          </template>
        </c-visual-card>
      </v-flex>


    </v-layout>
  </v-container>
</template>

<script>
import LineBaseChart from '@/views/demo/charts/LineBaseChart.vue';
import LineSectionsChart from '@/views/demo/charts/LineSectionsChart.vue';
import LineAreaChart from '@/views/demo/charts/LineAreaChart.vue';
import LineRectAreaChart from '@/views/demo/charts/LineRectAreaChart.vue';
import LineSplitAreaChart from '@/views/demo/charts/LineSplitAreaChart.vue';
import LineBigDataChart from '@/views/demo/charts/LineBigDataChart.vue';
import LiquidFillChart from '@/views/demo/charts/LiquidFillChart.vue';

export default {
  name: 'VLineIndex',
  components: {
    LineBaseChart,
    LineSectionsChart,
    LineAreaChart,
    LineRectAreaChart,
    LineSplitAreaChart,
    LineBigDataChart,
    LiquidFillChart,
  },
};
</script>
