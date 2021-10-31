<template>
  <div>
    <view1 ref="view1"></view1>
  <el-tabs v-model="activeName" @tab-click="handleClick" style="background-color: #d8ebf2">
    <el-tab-pane label="检查申请模板" name="first">
      <el-row style="background-color: #eaf1f5">
        <el-col :span="8"> <el-radio v-model="templateSelect" label="1">全院模板</el-radio></el-col>
        <el-col :span="8">  <el-radio v-model="templateSelect" label="2">本科模板</el-radio></el-col>
        <el-col :span="8"> <el-radio selected v-model="templateSelect" label="3">个人模板</el-radio></el-col>
      </el-row>
      <el-row>
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </el-row>

      <el-row style="background-color: #eaf1f5">
        <el-col :span="17">&nbsp;&nbsp;组套名称:{{mb.checkStackName}}</el-col>
        <el-col :span="1">&nbsp;</el-col>
        <el-col :span="5">
          <a href="javascript:void(0)" @click="useTemplate"> <i class="el-icon-check"></i>引用</a>
          <a href="javascript:void(0)" @click="curdTemplate"> <i class="el-icon-check"></i>管理</a>
        </el-col>
      </el-row>
      <div style="border-radius: 4px">
        组套名称:
        <el-input type="textarea" v-model="mb.checkStackName" :disabled="true">
        </el-input>
        目的和要求：
        <el-input type="textarea" v-model="mb.requirements" :disabled="true">
        </el-input>
        检查项目列表：
        <el-input type="textarea" v-model="mb.fmedItemNames" :disabled="true">
        </el-input>
      </div>


    </el-tab-pane>
  </el-tabs>

</div>
</template>

<script>
  import event from "../../../config/eventJS"
  import view1 from "./view"
  export default {
    name: 'rightViewRight',
    components:{
      view1
    },
    data() {
      return {
        templateSelect: "",
        activeName: 'first',
        data: [{
          templateName: '医生检查申请模板',
          children: [{
            templateName: '选择模板类型',
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'checkStackName'
        },
        mb: {

        }
      };
    },
    methods: {
      curdTemplate(){
        //打开dialog
        console.log("hahha ")
        this.$refs.view1.openTemplateVisible();
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleNodeClick(data) {
        // 把内容显示在table内容中
        console.log("xxxxx");
        this.mb = data;
        console.log(this.mb)

      },
      useTemplate(){
        event.$emit("useCheckTemplate",this.mb);
      }
    },
    watch: {
      templateSelect: {
        handler(newValue, oldValue) {
          console.log(newValue);
          //请求网络请求
          //1 是全院 2是本科室 3是个人
          if(newValue == "1"){
            var _this = this;
            this.$axios.get("/od/getCheckTemplateAll",{params:{
                type:1
              }}).then(res =>{
              console.log(res);
              _this.data[0].children = res.data.data;
            })
          }else if(newValue == "2"){
            var _this = this;
            this.$axios.get("/od/getCheckTemplateAllDeID",{params:{
                type:1
              }}).then(res =>{
              console.log(res);
              _this.data[0].children = res.data.data;
            })
          } else if(newValue == "3"){
            var _this = this;
            this.$axios.get("/od/getCheckTemplateByDoctorID",{params:{
                type:1
              }}).then(res =>{
              console.log(res);

              _this.data[0].children = res.data.data;
            })
          }
        },
        deep: true  //开启深入监听，一般用于监听数组中的值；如果不开启，将只监听数组整体，而不会监听数组中的值
      }
    }
  }
</script>
