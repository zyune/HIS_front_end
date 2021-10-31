/**
 * 各种画echarts图表的方法都封装在这里
 *
 */
import echarts from 'echarts' //引入echarts

const install = function(Vue) {
  Object.defineProperties(Vue.prototype, {
    $chart3: {
      get() {
        return {
          line1: function (id,nameData,numData) {
            this.chart3 = echarts.init(document.getElementById(id));
            this.chart3.clear();

            const optionData1 = {
              title: {
                text: '医生工作量对比'
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
                type: 'line',
                smooth: true
              }]
            };

            this.chart3.setOption(optionData1);
          },

        }
      }
    }
  })
}

export default {
  install
}
