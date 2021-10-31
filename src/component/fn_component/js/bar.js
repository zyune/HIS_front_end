/**
 * 各种画echarts图表的方法都封装在这里
 *
 */
import echarts from 'echarts' //引入echarts

const install = function(Vue) {
  Object.defineProperties(Vue.prototype, {
    $chart: {
      get() {
        return {

          bar1: function (id,nameData,numData) {
            this.chart = echarts.init(document.getElementById(id));
            this.chart.clear();

            const optionData = {
              title: {
                text: '门诊医生工作量'
              },
              tooltip: {},

              xAxis: {
                type: 'category',
                data: nameData
              },
              yAxis: {
                type: 'value',
                name:'看诊人次'
              },

              series: [{
                data: numData,
                type: 'bar',
                smooth: true
              }]
            };

            this.chart.setOption(optionData);
          },

        }
      }
    }
  })
}

export default {
  install
}
