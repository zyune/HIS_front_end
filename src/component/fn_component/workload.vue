<template>
  <div>
    <div class="aa">
      <el-divider><i class="el-icon-search"></i></el-divider>
  <div class="block">
    <span class="demonstration">统计时间从</span>
    <el-date-picker
      v-model="value2"
      type="datetimerange"
      :picker-options="pickerOptions"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="right">
    </el-date-picker>
    </div>
    <div class="button">
      <el-button type="primary" icon="el-icon-search"  @click="getWorkLd">查询</el-button>
  </div>
      <el-divider><i class="el-icon-loading"></i></el-divider>
    </div>

    <div><h5 align="center">门诊医生工作量统计表</h5></div>
    <div class="table">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        max-height="250">
        <el-table-column
          prop="outpatientDoctorName"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="patientNum"
          label="看诊人次"
          width="180">
        </el-table-column>
        <el-table-column
          prop="medicalSumPrice"
          label="西药费"
          width="180">
        </el-table-column>
        <el-table-column
          prop="registeredSumPrice"
          label="挂号费"
        width="180">
        </el-table-column>
        <el-table-column
          prop="herbalSumPrice"
          label="中成药">
        </el-table-column>
        <el-table-column
          prop="checkSumPrice"
          label="检查费">
        </el-table-column>
          <el-table-column
            prop="inspectionSumPrice"
            label="检验费">
          </el-table-column>
          <el-table-column
            prop="surgerySumPrice"
            label="处置费">
          </el-table-column>
          <el-table-column
          prop="otherSumPrice"
          label="其他费">
         </el-table-column>
      </el-table>
    </div>
    <table>
      <tr>
        <td><div id="chart1" ></div></td>
        <td><div id="chart2" ></div></td>
        <td><div id="chart3" ></div></td>
      </tr>
    </table>





  </div>


</template>

<script>
  //时间选择
  export default {
    name:"dd",
    data() {
      return {
        //table
        tableData: [{

        }],
        numData:[],
        nameData:[],
        herbalData:[],
        medicalData:[],
        //时间选择
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        value2: ''
      };
    },
    methods:{
      getWorkLd(){
        console.log(this.value2)
        var timestamp2 = (this.value2[1]).valueOf();
                console.log(this.timeStamp2)
        this.$fetch("/cw/getAllOdWorkLoad",{
          startDate:this.value2[0],
          endDate:this.value2[1]
        }).then((res) => {
          this.tableData = res.data;
          console.log(res);
          this.numData = [];
          this.nameData =[];
          this.herbalData=[];
          this.medicalData=[];
          this.surgeryData=[];
          this.otherData=[];


          this.tableData.forEach((table) => {
            this.numData.push(table.patientNum);
            this.nameData.push(table.outpatientDoctorName);
            this.herbalData.push(table.herbalSumPrice);
            this.medicalData.push(table.medicalSumPrice);
            this.surgeryData.push(table.surgerySumPrice);
            this.otherData.push(table.otherSumPrice);


          })
          this.$chart.bar1('chart1',this.nameData,this.numData);
          this.$chart3.line1('chart2',this.nameData,this.numData);
          this.$chart4.medicine1('chart3',this.nameData,this.herbalData,this.medicalData,this.surgeryData,this.otherData);


        })
      }
    },
    mounted() {
      this.$chart.bar1('chart1',this.nameData,this.numData);
      this.$chart3.line1('chart2',this.nameData,this.numData);
      this.$chart4.medicine1('chart3',this.nameData,this.herbalData,this.medicalData,this.surgeryData,this.otherData);

    }
  };

</script>

<style>
  #chart1 {
    margin-top: 50px;
    width: 500px;
    height: 500px;
    /* //margin-left: auto;
    //margin-right: auto; */

  }
  #chart2 {
    margin-top: 50px;
    width: 500px;
    height: 500px;
    /* //margin-left: auto; */

  }
  #chart3 {
    margin-top: 50px;
    width: 500px;
    height: 500px;
  /* //margin-left: auto; */

  }

  .block{

    display: inline;
  }
  .button{
    display: inline;
    padding-left: 300px;
  }
  .aa{
    margin: 100px 30px;
  }

</style>
