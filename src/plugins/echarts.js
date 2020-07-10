/* eslint-disable */

import Vue from 'vue';
import ECharts from 'vue-echarts/components/ECharts.vue';

import 'echarts/theme/dark-blue';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/map';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/radar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title';
import 'echarts/lib/component/visualMap';
import 'echarts/lib/component/polar';
import 'echarts/map/js/world';

// 以 ECharts-GL 为例：
// 需要安装依赖：npm install --save echarts-gl，并添加如下引用
import 'echarts-gl';

Vue.component('v-chart', ECharts);

export default ECharts;
//export default new ECharts();