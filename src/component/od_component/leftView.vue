<template>
  <div v-show="showFlag.flag">

  <el-row>

      <div style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);height: 200px;">
        <el-image src="../assets/logo.png"></el-image>
        <P>欢迎你，门诊医生:</P>
        <P>退出</P>
      </div>
    </el-row>

  <el-row>
    <el-col :span="24">
      <hr>
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="2"></el-col>
    <el-col :span="6" style="line-height: 2.8">患者查询:</el-col>
    <el-col :span="16">
      <!--输入框-->
      <el-input placeholder="请输入患者姓名" v-model="searchName" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="searchPatient"></el-button>
      </el-input></el-col>

  </el-row>

  <el-row style="height: 50%">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="本人" name="first">
        <!--添加数据格式-->
        <P>待诊患者(共有{{WaitPatients.length}}条患者信息）<i class="el-icon-refresh-right"></i></P>
        <el-row>
          <hr>
        </el-row>
        <el-row>
        <!--加载一个table，进行显示数据，并且在table中使用delete图标进行删除数据-->
        <el-table :data="WaitPatients" highlight-current-row @cell-click="getPatient"  style="width: 100%">
          <!--组件实例的作用域是孤立的。这意味着不能(也不应该)在子组件的模板内直接引用父组件的数据。-->
          <!--要让子组件使用父组件的数据，。-->
          <el-table-column prop="medicalRecord" label="病历号" width="120"></el-table-column>
          <el-table-column prop="patientName" label="姓名" width="80"></el-table-column>
          <!--需要设置一个截住器实现添加一个岁的格式-->
          <el-table-column prop="patientAge" label="年龄" ></el-table-column>
        </el-table>
        </el-row>
        <el-row style="height: 30%">
          <!--添加数据格式-->
          <P>诊中患者(共有{{SeePatients.length}}条患者信息）<i class="el-icon-refresh-right"></i></P>
          <el-row>
            <hr>
          </el-row>
          <el-row>
            <!--加载一个table，进行显示数据，并且在table中使用delete图标进行删除数据-->
            <el-table :data="SeePatients" style="width: 100%"  @cell-click="getPatient">
              <!--组件实例的作用域是孤立的。这意味着不能(也不应该)在子组件的模板内直接引用父组件的数据。-->
              <!--要让子组件使用父组件的数据，我们需要通过子组件的props选项。-->
              <el-table-column prop="medicalRecord" label="病历号" width="120"></el-table-column>
              <el-table-column prop="patientName" label="姓名" width="80"></el-table-column>
              <!--需要设置一个截住器实现添加一个岁的格式-->
              <el-table-column prop="patientAge" label="年龄" ></el-table-column>
            </el-table>
          </el-row>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="科室" name="second"  >
        <!--科室的看诊的人员,查询本科室所有的患者-->
        <el-row style="height: 30%">
          <!--添加数据格式-->
          <P>本科室(共有{{departAllPatients.length}}条患者信息）<i class="el-icon-refresh-right"></i></P>
          <el-row>
            <hr>
          </el-row>
          <el-row>
            <!--加载一个table，进行显示数据，并且在table中使用delete图标进行删除数据-->
            <el-table :data="departAllPatients" style="width: 100%" @cell-click="getPatient" >
              <!--组件实例的作用域是孤立的。这意味着不能(也不应该)在子组件的模板内直接引用父组件的数据。-->
              <!--要让子组件使用父组件的数据，我们需要通过子组件的props选项。-->
              <el-table-column prop="medicalRecord" label="病历号" width="120"></el-table-column>
              <el-table-column prop="patientName" label="姓名" width="80"></el-table-column>
              <!--需要设置一个截住器实现添加一个岁的格式-->
              <el-table-column prop="patientAge" label="年龄" ></el-table-column>
            </el-table>
          </el-row>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="查询患者信息" name="third">
        <!--科室的看诊的人员,查询本科室所有的患者-->
        <el-row style="height: 30%">
          <!--添加数据格式-->
          <P>查询了(共有{{searchPatients.length}}条患者信息）<i class="el-icon-refresh-right"></i></P>
          <el-row>
            <hr>
          </el-row>
          <el-row>
            <!--加载一个table，进行显示数据，并且在table中使用delete图标进行删除数据-->
            <el-table :data="searchPatients" style="width: 100%" @cell-click="getPatient">
              <!--组件实例的作用域是孤立的。这意味着不能(也不应该)在子组件的模板内直接引用父组件的数据。-->
              <!--要让子组件使用父组件的数据，我们需要通过子组件的props选项。-->
              <el-table-column prop="medicalRecord" label="病历号" width="120"></el-table-column>
              <el-table-column prop="patientName" label="姓名" width="80"></el-table-column>
              <!--需要设置一个截住器实现添加一个岁的格式-->
              <el-table-column prop="patientAge" label="年龄" >
                <template slot-scope="scope">
                  {{scope.row.patientAge}}岁
                </template>

              </el-table-column>
            </el-table>
          </el-row>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-row>

  </div>
</template>

<script>
  import event from "../../config/eventJS"
    export default {
      name: "leftView",
      data(){
        return{
          showFlag:{
            flag:false
          },
          activeName: 'first',
          WaitPatients: [],
          searchName:'',//查询姓名
          SeePatients: [],
          departAllPatients:[],
          searchPatients:[]
        }},
          methods: {
            showDialog(){
              if(this.showFlag.flag == true){
                this.$set(this.showFlag, 'flag' ,false)
              } else if(this.showFlag.flag == false) {
                // this.showFlag.flag == true;
                this.$set(this.showFlag, 'flag' ,true)
              }
            },
        //单击table实现把数据传递给左边上部中
            getPatient(row){
              this.$store.commit("setInspectionPatient",row);
              //事件总线
               event.$emit("commitPatient",row)
            },
         getWaitPatients(){
           console.log("xxx执行了")
           var _this = this;
           this.$fetch("/od/getSeeEdPatient").then((res) => {
             _this.SeePatients = res.data;
             console.log(res)
           })

         },getSeePatients(){
            this.$fetch("/od/getWaitPatient").then((res) => {
              this.WaitPatients = res.data;
              console.log(res)
            })
         },getdepartPatients(){
            var this_ = this;
            this.$fetch("/od/getDePartMentPatient").then(res => {
              this_.departAllPatients = res.data;
              console.log(res);
            })
      },searchPatient(){
              this.$axios.get("/od/getSearchPatientByName",{
                params:{
                  searchName: this.searchName
                }
              }).then((res) => {
                this.searchPatients = res.data.data;
              });
            this.activeName = "third";
        },handleClick(tab, event){
              console.log(tab,event);
              if(tab.name == "second"){
                this.getdepartPatients();
              } else if(tab.name == "third"){
              //  this.searchPatient();
              } else if(tab.name == "first"){
                this.getWaitPatients();
                this.getSeePatients();
              }
            }
      },
      created(){
        this.getWaitPatients();
        this.getSeePatients();
        //默认选择第一名的病人
       // this.$store.commit("setInspectionPatient",this.WaitPatients[0]);
        event.$emit("commitPatient",this.WaitPatients[0])
      }
    }
</script>

<style >


</style>
