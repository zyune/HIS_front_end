<template>
  <div id="regis">
    <section>
      <!--工具条-->
      <el-row :gutter="20" :span="20">
        <el-col :span="10">
          <span>挂号查询</span>
        </el-col>
        <el-col :span="10" align="right" style="padding-bottom: 0px;">
          <el-form :inline="true">
            <el-form-item>
              <el-input v-model="filters.patientName" placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getAllRegistrationInfoByPatientName">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </section>
    <!--列表-->
    <template>
      <el-row :gutter="20" :span="20">
        <el-col :span="20">
          <el-table :data="registrations.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%;">
            <el-table-column type="index" width="30"></el-table-column>
            <el-table-column prop="medicalRecord" label="病历号" width="100" sortable></el-table-column>
            <el-table-column prop="patientName" label="姓名" width="80" sortable></el-table-column>
            <el-table-column prop="patientSex" label="性别" width="80" sormatter="formatSex" sortable></el-table-column>
            <el-table-column prop="patientAge" label="年龄" width="80" sortable></el-table-column>
            <el-table-column prop="settleAccountsCategory" label="结算类别" min-width="100" sortable>自费</el-table-column>
            <el-table-column prop="levelName" label="挂号类别" min-width="100" sortable></el-table-column>
            <el-table-column prop="departmentName" label="挂号科室" min-width="100" sortable></el-table-column>
            <el-table-column prop="outpatientDoctorName" label="看诊医生" min-width="100" sortable></el-table-column>
            <el-table-column prop="createTime" label="看诊日期" min-width="140" sortable>
              <template slot-scope="scope">{{scope.row.createTime | dateTimeForm}}</template>
            </el-table-column>
            <el-table-column prop="patientCard" label="身份证号" min-width="130" sortable></el-table-column>
            <el-table-column prop="patientAddress" label="家庭住址" min-width="100" sortable></el-table-column>
            <el-table-column prop="registrationFeeNo" label="应收金额" min-width="100" sortable></el-table-column>
            <el-table-column fixed="right" label="操作" width="120">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="deleteRow(scope.$index, registrations)"
                  type="text"
                  size="small"
                >删除</el-button>
              </template>
            </el-table-column>

           
          </el-table>
           <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[5, 10, 20, 40]"
              :page-size="pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="registrations.length"
            ></el-pagination>
        </el-col>
      </el-row>
    </template>
  </div>
</template>


<script>
export default {
  data() {
    return {
      currentPage: 1, //初始页
      pagesize: 5, //    每页的数据
      filters: {
        patientName: ""
      },
      registrationCategory: "",
      registrations: []
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
    //通过病人姓名进行查找
    getAllRegistrationInfoByPatientName() {
      this.$fetch("/sf/getListRegistrationByPatientName", {
        patientName: this.filters.patientName
      }).then(res => {
        this.registrations = res.data;
           this.$message("查询成功");
      });
    },
    // 退号成功，将状态返回为1
    deleteRow(index, rows) {
      this.$confirm("此操作挂号信息将消失, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
      rows.splice(index, 1);
    },
    getAllRegistrationInfo() {
this.$fetch("/sf/listRegistration").then((res) =>{
  this.registrations=res.data;
})
      // this.$fetch("/sf/listRegistration").then((res) => {
      //   console.log("hahahhahahhhhhhhhhh");
      //   console.log(res.data[0]);
      //
      //   res.data.forEach((e)=>{
      //      let aa = {}
      //     aa.levelName = e.levelName;
      //     aa.patientName = e.registrationInfo.patientName;
      //     aa.medicalRecord =e.registrationInfo.medicalRecord;
      //     aa.patientSex =e.registrationInfo.patientSex;
      //     aa.patientAge =e.registrationInfo.patientAge;
      //     aa.outpatientDoctorName =e.registrationInfo.outpatientDoctorName;
      //     aa.createTime =e.registrationInfo.createTime;
      //     aa.patientCard =e.registrationInfo.patientCard;
      //     aa.patientAddress =e.registrationInfo.patientAddress;
      //     aa.departmentName =e.registrationInfo.departmentName;
      //     aa.registrationFeeNo =e.registrationInfo.registrationFeeNo;
      //     this.registrations.push(aa);
      //     console.log(aa);
      //   })
      //
      // });
    },
    //append 用法
    // getAllRegistrationInfo() {
    //   console.log()
    //   this.$fetch("/sf/listRegistrationLevelById",{id:this.registrations.registrationFeeNo}).then(res => {
    //     this.registrations.levelName = res.levelName;
    //     console.log(res);
    //   });
    // }
  },
  created() {
    console.log("xxxx");
    this.getAllRegistrationInfo();
    this.getAllRegistrationInfo();
  }
};
</script>

<style>
</style>
