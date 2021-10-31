/**
 * 各种画echarts图表的方法都封装在这里
 *
 */
import echarts from 'echarts' //引入echarts

const install = function(Vue) {
  Object.defineProperties(Vue.prototype, {
    $chart4: {
      get() {
        return {

          medicine1: function (id,nameData,herbalData,medicalData,surgeryData,otherData) {
            this.chart4 = echarts.init(document.getElementById(id));
            this.chart4.clear();

            const optionData = {
              title: {
                text: '门技数据对比'
              },
              tooltip: {trigger: 'axis',
                axisPointer: {
                  animation: false
                }
                },
              legend: {
                data:['中药','西药','处置','其他']

              },
              dataZoom: [
                {
                  show: true,
                  realtime: true,
                  //start: 30,
                  //end: 70,
                  //xAxisIndex: [0, 1]
                },
                {
                  type: 'inside',
                  realtime: true,
                  //start: 30,
                  //end: 70,
                  //xAxisIndex: [0, 1]
                }
              ],

              xAxis: [{
                type: 'category',
                data: nameData

              },
                {
                  type: 'category',
                  //data: nameData
                }],
              yAxis: {
                type: 'value',

              },

              series: [{
                data: herbalData,
                type: 'line',
                name:'中药',
                smooth: true
              },
                {
                  data: medicalData,
                  type: 'line',
                  name:'西药',
                  smooth: true

                },
                {
                  data: surgeryData,
                  type: 'line',
                  name:'处置',
                  smooth: true
                },
                {
                  data: otherData,
                  type: 'line',
                  name:'其他',
                  smooth: true
                }]
            };

            this.chart4.setOption(optionData);
          },

        }
      }
    }
  })
}

export default {
  install
}
