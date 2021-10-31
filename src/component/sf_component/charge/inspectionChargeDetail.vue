<template>
  <div id="foo">
    <el-row :gutter="20" :span="20">
      <el-form :inline="true">
        <el-col :span="5" style="padding-bottom: 0px;">
          <el-form-item>
            <el-input v-model="patientName" placeholder="姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4" align="left" style="padding-bottom: 0px;">
          <el-form-item>
            <el-button
              type="primary"
              @click="getAllCheckFeeByPatientName"
            >&nbsp;&nbsp; 查询&nbsp;&nbsp;</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="2" align="right" style="padding-bottom: 0px;">
          <el-form-item>
            <el-button type="primary" @click="getAllCheckFee">查询所有</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <el-row :gutter="20" :span="20">
      <el-col :span="20">
        <el-table
          :data="CheckFee.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          style="width: 100%;"
        >
          <el-table-column type="index" width="30"></el-table-column>
          <el-table-column prop="medicalRecord" label="病历号" width="100"></el-table-column>
          <el-table-column prop="patientName" label="姓名" width="80"></el-table-column>
          <el-table-column prop="outpatientDoctorName" label="门诊医生" min-width="100"></el-table-column>
          <el-table-column prop="medicalDoctorName" label="门技医生" min-width="100"></el-table-column>
          <el-table-column prop="createTime" label="创建日期" min-width="100">
               <template slot-scope="scope">{{scope.row.createTime | dateTimeForm}}</template>
          </el-table-column>
          <el-table-column prop="price" label="金额" min-width="100"></el-table-column>
          <el-table-column prop="checkType" label="项目类型" min-width="100"></el-table-column>
        </el-table>
        <el-pagination
               @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[5, 10, 20, 40]"
                            
                            :page-size="pagesize"        
                         
                            layout="total, sizes, prev, pager, next, jumper"
          :total="CheckFee.length"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "foo",
  data() {
    return {
      currentPage: 1, //初始页
      pagesize: 8, //    每页的数据
      patientName: "",
      CheckFee: []
    };
  },
  methods: {
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pagesize = size;
      console.log(this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
    },
    getAllCheckFee() {
      this.$fetch("/sf/listAllInspectionFee").then(res => {
        const data = res.data;
        console.log(data);
        this.CheckFee = data.map(item => {
          switch (item.checkType) {
            case "2":
              item.checkType = "检验";
          }
          return item;
        });
      });
    },
    getAllCheckFeeByPatientName() {
      this.$fetch("/sf/listInspectionFeeByPatientName", {
        patientName: this.patientName
      }).then(res => {
        const data = res.data;
        console.log(data);
        this.CheckFee = data.map(item => {
          switch (item.checkType) {
            case "2":
              item.checkType = "检验";
          }
          return item;
        });
           this.$message("查询成功");
      });
    }
  },
  created() {
    console.log("xx");
    this.getAllCheckFee();
  }
};
</script>

<style>
</style>
