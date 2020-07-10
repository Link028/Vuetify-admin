<template>
  <v-container fluid grid-list-lg class="pr-4 pl-4"><!-- <v-container fluid> -->
    <v-layout row wrap>
     
      <v-flex lg4 sm6 xs12>
          <mini-statistic icon="fa fa-server" 
                          :title=sys
                          sub-title="业务系统" 
                          color="red"> 
          </mini-statistic>
      </v-flex>
      <v-flex lg4 sm6 xs12>
          <mini-statistic icon="fa fa-cubes" 
                          :title=tbl 
                          sub-title="数据库表" 
                          color="cyan"> 
          </mini-statistic>
      </v-flex>    
      <v-flex lg4 sm6 xs12>
          <mini-statistic icon="fa fa-map-o" 
                          :title=rec 
                          sub-title="数据记录" 
                          color="orange"> 
          </mini-statistic>
      </v-flex>

      <v-flex xs12>
        <c-visual-card title="各系统数据分布" icon="pie_chart">
          <template slot="card-content">
            <v-chart :options="pieOptions" style="width:100%; " autoresize />
          </template>
        </c-visual-card>
      </v-flex>

      <v-flex xs12>
        <c-visual-card title="24小时作业分布" icon="fa-tachometer">
          <template slot="card-content">
            <line-area-chart />
          </template>
        </c-visual-card>
      </v-flex>

      <v-flex xs12 lg12 sm12>
        <c-visual-card title="可重复作业统计" icon="fa-bar-chart">
          <template slot="card-content">
            <v-chart :options="jobOptions" style="width:100%;" autoresize/>
          </template>
        </c-visual-card>
      </v-flex>

     <!-- 
      <v-flex xs12>
        <c-visual-card title="各系统数据分布" icon="fa-bar-chart">
          <template slot="card-content">
            <v-chart :options="barOptions" style="width:100%;" autoresize/>
          </template>
        </c-visual-card>
      </v-flex>

      <v-flex xs12 lg4>
        <c-visual-card title="各系统作业量">
          <template slot="card-content">
            <line-rect-area-chart />
          </template>
        </c-visual-card>
      </v-flex>
      <v-flex xs12 lg4>
        <c-visual-card title="作业变化趋势">
          <template slot="card-content">
            <line-split-area-chart />
          </template>
        </c-visual-card>
      </v-flex>
      <v-flex xs12 lg4>
        <c-visual-card title="作业完成情况">
          <template slot="card-content">
            <liquid-fill-chart />
          </template>
        </c-visual-card>
      </v-flex>

-->

    </v-layout>
  </v-container>
</template>

<script>
import MiniStatistic from '@/components/statistic/MiniStatistic'
import LineAreaChart from '@/views/demo/charts/LineAreaChart.vue';
import LineRectAreaChart from '@/views/demo/charts/LineRectAreaChart.vue';
import LineSplitAreaChart from '@/views/demo/charts/LineSplitAreaChart.vue';
import LiquidFillChart from '@/views/demo/charts/LiquidFillChart.vue';

export default {
  components: {
    MiniStatistic,
    LineAreaChart,
    LineRectAreaChart,
    LineSplitAreaChart,
    LiquidFillChart,
  },

  data () {
    return {
      sys : 0 + "个" ,
      tbl : 0 + "张",
      rec : 0 + "条",
      pieOptions: {
        //color: ['#3398DB'],
        title: { text: '数据分布', subtext: '各系统表数目',left: 'center'},
        tooltip: {trigger: 'item',formatter: '{b} <br/>{a} : {c} ({d}%)'},
        legend: {type: 'scroll',orient: 'vertical',right: 50,top: 20,bottom: 20,data: []},
        series: [{name: '表数目',type: 'pie',radius: '75%',center: ['40%', '50%'],selectedMode: 'single',data: [],emphasis: {itemStyle: {shadowBlur: 10,shadowOffsetX: 0,shadowColor: 'rgba(0, 0, 0, 0.5)'},}}]
      },
      barOptions: {
        color: ['#3398DB'],
        tooltip: {trigger: 'axis',axisPointer: {   type: 'shadow'},formatter: '{b} <br/>{a} : {c} '},
        grid: {left: '3%',right: '4%',bottom: '3%',containLabel: true },
        xAxis: [{type: 'category',data: [], axisTick: {alignWithLabel: true}}],
        yAxis: [ {type: 'value'}],
        series: [{name: '表数目',type: 'bar',barWidth: '60%',data: []}]
      },
      jobOptions: {
        color: ['#3398DB'],
        tooltip: {trigger: 'axis',axisPointer: {   type: 'shadow'},formatter: '{b} <br/>{a} : {c} '},
        grid: {left: '3%',right: '4%',bottom: '3%',containLabel: true },
        xAxis: [{type: 'category',data: [],axisTick: {alignWithLabel: true}}],
        yAxis: [ {type: 'value'}],
        series: [{name: '表数目',type: 'bar',barWidth: '60%',data: []}
        ]
      },
    }
  }, 

  mounted(){
       /*
       this.$http.get("/service/admin/info",{} )
        .then((data) => {
          this.sys = data.sys +"个" ;
          this.tbl = data.tbl +"张" ;
          this.rec = data.rec +"条" ;
          this.pieOptions.series[0].data = data.sysMap  ;
          this.barOptions.series[0].data = data.sysMap  ;
          this.jobOptions.series[0].data = data.sysMap  ;
          const keys = Object.values( data.sysList);
          this.pieOptions.legend.data = keys;
          this.barOptions.xAxis[0].data = keys;
          this.jobOptions.xAxis[0].data = keys;
          })
        .catch((err)=>{ console.log( err ); });
       */

       find() ;
  },
  methods: { 
    find () {
        var data ={"rec":"19,000,000","sysMap":[{value: 9, name: "青海省公安厅接口数据"},{value: 0, name: "青海省刑警总队isdata系统"},{value: 1, name: "海东虹膜系统"},{value: 0, name: "青海省刑警总队htmis系统"},{value: 21, name: "海西数据仓库"}],"sysList":["青海省公安厅接口数据","青海省刑警总队isdata系统","海东虹膜系统","青海省刑警总队htmis系统","海西数据仓库"],"message:":"请求成功","code:":"200","sys":5,"tbl":31};

        this.sys = data.sys +"个" ;
        this.tbl = data.tbl +"张" ;
        this.rec = data.rec +"条" ;

        this.pieOptions.series[0].data = data.sysMap  ;
        this.barOptions.series[0].data = data.sysMap  ;
        this.jobOptions.series[0].data = data.sysMap  ;

        const keys = Object.values( data.sysList);

        this.pieOptions.legend.data = keys;
        this.barOptions.xAxis[0].data = keys;
        this.jobOptions.xAxis[0].data = keys;
    }
  }
}
</script>
