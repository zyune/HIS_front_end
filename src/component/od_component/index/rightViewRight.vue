<template>
  <div>
  <el-tabs v-model="activeName" @tab-click="handleClick" style="background-color: #d8ebf2">
    <el-tab-pane label="病历模板" name="first">
      <el-row style="background-color: #eaf1f5">
        <el-col :span="8"> <el-radio v-model="templateSelect" label="1">全院模板</el-radio></el-col>
        <el-col :span="8">  <el-radio v-model="templateSelect" label="2">本科模板</el-radio></el-col>
        <el-col :span="8"> <el-radio selected v-model="templateSelect" label="3">个人模板</el-radio></el-col>
      </el-row>
      <el-row>
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </el-row>

      <el-row style="background-color: #eaf1f5">
        <el-col :span="17">&nbsp;&nbsp;模板名称:{{mb.templateName}}</el-col>
        <el-col :span="1">&nbsp;</el-col>
        <el-col :span="5">
          <a href="javascript:void(0)" @click="useTemplate"> <i class="el-icon-check"></i>引用</a>
        </el-col>
      </el-row>
      <div style="border-radius: 4px">
        主诉:
        <el-input type="textarea" v-model="mb.chiefComplaint" :disabled="true">
        </el-input>
        现病史：
        <el-input type="textarea" v-model="mb.historyPresentIllness" :disabled="true">
        </el-input>既往史:
        <el-input type="textarea" v-model="mb.historyIllness" :disabled="true">
        </el-input>体格检查:
        <el-input type="textarea" v-model="mb.healthExamine" :disabled="true">
        </el-input>辅助检查：
        <el-input type="textarea" v-model="mb.assistExamine" :disabled="true">
        </el-input>
      </div>

    </el-tab-pane>
    <el-tab-pane label="常用诊断" name="second">配置管理</el-tab-pane>
    <el-tab-pane label="历史病历" name="third">角色管理</el-tab-pane>
  </el-tabs>

</div>
</template>

<script>
  import event from "../../../config/eventJS"
  export default {
    name: 'rightViewRight',
    data() {
      return {
        templateSelect: "",
        activeName: 'first',
        data: [{
          templateName: '医生门诊病历',
          children: [{
            templateName: '选择模板类型',
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'templateName'
        },
        mb: {

        }
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleNodeClick(data) {
        // 把内容显示在table内容中
        console.log("xxxxx")
        this.mb = data;
      },
      useTemplate(){
        this.mb.state = 1;
        event.$emit("useTemplate",this.mb);
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
            this.$axios.get("/od/getMRPTmplateAll").then(res =>{
              console.log(res);
              _this.data[0].children = res.data.data;
            })
          }else if(newValue == "2"){
            var _this = this;
            this.$axios.get("/od/getMRPTmplateDeID").then(res =>{
              console.log(res);
              _this.data[0].children = res.data.data;
            })
          } else if(newValue == "3"){
            this.$axios.get("/od/getMRPTmplateByDoctorID").then((res) =>{
              console.log(res);
              this.data[0].children = res.data.data;
            })
          }
        },
        deep: true  //开启深入监听，一般用于监听数组中的值；如果不开启，将只监听数组整体，而不会监听数组中的值
      }
    }
  }
</script>
