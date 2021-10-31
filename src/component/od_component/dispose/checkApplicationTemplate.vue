<template>
  <div>

<el-dialog
  :title="checkTemplateObjcet.name"
  :visible.sync="templateVisible"
  width="30%"
  :before-close="handleClose">
  <el-row>组套信息</el-row>
  <el-row>
    <el-col :span="6"><div style="text-align: right">组合名称</div></el-col>
    <el-col :span="6"><div><el-input v-model="templateName"></el-input></div></el-col>
    <el-col :span="6"><div style="text-align: right">模板范围</div></el-col>
    <el-col :span="6"><div>
      <el-select  v-model="selectValue" placeholder="请选择">
        <el-option
                v-for="item in tempaletType" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div></el-col>

  </el-row>

  <el-row><el-col><div :span="4">目的和要求</div></el-col>
    <el-col><div :span="20"><el-input
      type="textarea"
      :autosize="{ minRows: 2, maxRows: 4}"
      disabled
      v-model="requirements">
    </el-input></div></el-col>
  </el-row>
  <el-row>
    <el-col :span="6"><div style="text-align: right">创建医生</div></el-col>
    <el-col :span="6"><div><el-input disabled v-model="checkTemplateObjcet.outpatientDoctorName"></el-input></div></el-col>
    <el-col :span="6"><div style="text-align: right">创建科室</div></el-col>
    <el-col :span="6"><div><el-input disabled v-model="checkTemplateObjcet.departmentName"></el-input></div></el-col>
  </el-row>
  <el-row>
    <fieldset>
    <legend>明细一览</legend>
      <el-table :data="zd" border style="width: 100%">
        <el-table-column prop="itemName" label="项目名称"></el-table-column>
        <el-table-column prop="itemCode" label="项目编号"></el-table-column>
      </el-table>

    </fieldset>
  </el-row>


  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="SaveTempate">保存</el-button>
  </span>
</el-dialog>
  </div>
</template>
<script>
  export default {
    name:'zutaosheding',
    data() {
      return {
        selectValue:"3",
        requirements:"",
        zd:[],
        templateName:"",
        templateVisible:false,
        tempaletType: [{
          value: '1',
          label: '全院'
        }, {
          value: '2',
          label: '本科室'
        }, {
          value: '3',
          label: '个人'
        }],
        checkTemplateObjcet:{}
      };
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },SaveTempate(){
        //获得数据进行添加
        //首先验证
        if(this.templateName == ""){
          this.$message("模板名称不能为空");
        } else {
          let accpetCheckTemplate = {};
          let checkStack ={}
          checkStack.checkStackName = this.templateName;
          checkStack.usableRange = this.selectValue;
          checkStack.departmentName = this.checkTemplateObjcet.departmentName
          checkStack.outpatientDoctorName = this.checkTemplateObjcet.outpatientDoctorName
          checkStack.requirements = this.requirements
          let itemCodeList = [];
          this.zd.forEach((value => {
            let itemsCodeAndName = [];
            itemsCodeAndName.push(value.itemCode);
            itemsCodeAndName.push(value.itemName);
            itemCodeList.push(itemsCodeAndName);
          }));
          accpetCheckTemplate.checkStack = checkStack;
          accpetCheckTemplate.itemCodeList = itemCodeList;
          this.$axios.post("/od/postNewDisposeTemplate",accpetCheckTemplate).then((res) => {
            this.$message("保存成功");
            this.templateName = "";
            this.templateVisible = false;
          })
        }
      },openDiaLog(templateObject){//给父组件进行调用
        this.templateVisible = true;
        this.checkTemplateObjcet = templateObject;
        console.log(this.checkTemplateObjcet);
        this.requirements = this.checkTemplateObjcet.requirements;
        this.zd = this.checkTemplateObjcet.zd;
      }
    },created(){
      //把props中的值传入过来。

    }
  };
</script>
