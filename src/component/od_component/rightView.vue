<template>
<div>
  <el-row>
    <el-col :span="4"><b>就诊状态</b>:<span style="color: red">{{this.$store.getters.getInspectionPatient.isSeenDocator!=1?(
    this.$store.getters.getInspectionPatient.isSeenDocator==2?"看诊中":"已确诊"):"未创建病历首页"}}</span></el-col>
    <el-col :span="4"><b>就诊号</b>:{{this.$store.getters.getInspectionPatient.medicalRecord}}</el-col>
    <el-col :span="2"><b>姓名</b>:{{this.$store.getters.getInspectionPatient.patientName}}</el-col>
    <el-col :span="2"><b>性别</b>:{{this.$store.getters.getInspectionPatient.patientSex}}</el-col>
    <el-col :span="2"><b>年龄</b>:{{this.$store.getters.getInspectionPatient.patientAge}}岁</el-col>
    <el-col :span="3"><b>结算类别</b>:自费</el-col>
    <el-col :span="2"><b></b></el-col>
    <el-col :span="2"><b>过敏史</b>：无</el-col>
      <el-col :span="2"><b><a href="javascript:void(0)"  @click="surePatientOk" style="color: #0066cb"><i class="el-icon-check"></i>
          确 诊</a></b>
    </el-col>
  </el-row>

  <el-row style="margin-top: 10px">
    <el-menu :default-active="activeIndex"  style="background-color: #daecfa ; "
             class="el-menu-demo" mode="horizontal">
     <el-menu-item index="1"> <router-link to="/odIndex/mzbl">门诊病历</router-link></el-menu-item>
     <el-menu-item index="2"><router-link to="/odIndex/herbal">草药处方</router-link></el-menu-item>
      <el-menu-item index="3"><router-link to="/odIndex/medicine">西药处方</router-link></el-menu-item>
      <el-menu-item index="4"><router-link to="/odIndex/check">检查申请</router-link></el-menu-item>
      <el-menu-item index="5"><router-link to="/odIndex/inspect">检验申请</router-link></el-menu-item>
      <el-menu-item index="6"><router-link to="/odIndex/dispose">处置单</router-link></el-menu-item>
        <el-menu-item index="7"><router-link to="/odIndex/patientFeeDetail">患者账单</router-link></el-menu-item>
    </el-menu>
  </el-row>



    <router-view ></router-view>

</div>
</template>

<script>
  import leftViewCenter from './index/rightViewCenter.vue';
  import leftViewRight from './index/rightViewRight.vue';
    export default {
      name: "rightView",
      components:{
        leftViewCenter,
        leftViewRight
      },
      data(){
        return{
          surePatientDialog:false,
          activeIndex:'1',
          patient:{
          }
        }
      },
     methods:{
         surePatientOkPut(){

         },
         surePatientOk(){
             //确定明白就诊成功
             if(this.$store.getters.getInspectionPatient.isSeenDocator == 1){
                 this.$message("病人未确定病历首页")
             }
             if(this.$store.getters.getInspectionPatient.isSeenDocator == 2){
                    //弹出
                 this.$axios.get("od/surePatientOkPut",{params:{
                     infoId: this.$store.getters.getInspectionPatient.id
                 }}).then((res) => {
                     this.$message("确诊成功")
                     this.$store.getters.getInspectionPatient.isSeenDocator ==3
                 })
             }
             if(this.$store.getters.getInspectionPatient.isSeenDocator == 3){
                 this.$message("病人已经看诊结束")
             }
         }
     },
      //created是生命周期的方法
    created(){
        console.log("xxxxx");
      }
    }
</script>

<style scoped>

</style>
