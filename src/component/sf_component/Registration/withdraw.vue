<template>
  <div id="regis">
    <section>
      <!--工具条-->
      <el-row :gutter="20" :span="20">
        <el-form :inline="true">
          <el-col :span="5" style="padding-bottom: 0px;">
            <el-form-item>
              <el-input v-model="filters.patientName" placeholder="姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" align="left" style="padding-bottom: 0px;">
            <el-form-item>
              <el-button type="primary" @click="getAllRegistrationInfoByPatientName">&nbsp;&nbsp; 查询&nbsp;&nbsp;</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="2" align="right" style="padding-bottom: 0px;">
            <el-form-item>
              <el-button type="primary" @click="getAllRegistrationInfo">查询所有</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </section>
    <!--列表-->
    <template>
      <el-row :gutter="20" :span="20">
        <el-col :span="20">
          <el-table
            :data="registrations.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            style="width: 100%;"
          >
            <el-table-column prop="id" width="60" sortable></el-table-column>
            <el-table-column prop="medicalRecord" label="病历号" width="160" sortable></el-table-column>
            <el-table-column prop="patientName" label="姓名" width="80" sortable></el-table-column>
            <el-table-column prop="patientSex" label="性别" width="80" sormatter="formatSex" sortable></el-table-column>
            <el-table-column prop="patientAge" label="年龄" width="80" sortable></el-table-column>
            <el-table-column prop="settleAccountsCategory" label="结算类别" min-width="100" sortable>自费</el-table-column>
            <el-table-column prop="state" label="状态" min-width="100" sortable>
              <template slot-scope="scope">{{scope.row.state | registrationState}}</template>
            </el-table-column>
            <el-table-column prop="isSeenDocator" label="是否看诊" min-width="100" sortable>
              <template slot-scope="scope">{{scope.row.isSeenDocator | registrationFState}}</template>
            </el-table-column>
            <el-table-column prop="departmentName" label="挂号科室" min-width="100" sortable></el-table-column>
            <el-table-column prop="outpatientDoctorName" label="看诊医生" min-width="100" sortable></el-table-column>
            <el-table-column prop="createTime" label="看诊日期" min-width="110" sortable>
               <template slot-scope="scope">{{scope.row.createTime | dateTimeForm}}</template>
            </el-table-column>
            <el-table-column prop="patientCard" label="身份证号" min-width="130" sortable></el-table-column>
            <el-table-column prop="patientAddress" label="家庭住址" min-width="150" sortable></el-table-column>
            <el-table-column prop="registrationFeeNo" label="应收金额" min-width="100" sortable></el-table-column>
            <el-table-column fixed="right" label="操作" width="120">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="deleteRow(scope.$index, scope.row)"
                  type="text"
                  size="small"
                >退号</el-button>
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
      pagesize: 8, //    每页的数据
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
      //   this.$fetch('/sf/getPatientName',{patientName:this.filters.patientName}).then((res) => {
      //       this.registrations = res.data;
      //       console.log(res);
      // });

      this.$fetch("/sf/getListRegistrationByPatientName", {
        patientName: this.filters.patientName
      }).then(res => {
        this.registrations = res.data;
           this.$message("查询成功");
      });
    },
    // 退号成功，将状态返回为1
    deleteRow(index, row) {
      console.log(row.id)
       if(row.isSeenDocator ==  1 ){
           this.$axios.put("/sf/putRegistrationInfoUseState", {id: row.id}).then((res) =>{

           });
       }else{
         this.$message("状态有误")
       }

       
      // this.$confirm("此操作挂号信息将消失, 是否继续?", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning"
      // })
      //   .then(() => {
      //     this.$message({
      //       type: "success",
      //       message: "操作成功!"
      //     });
      //   })
      //   .catch(() => {
      //     this.$message({
      //       type: "info",
      //       message: "已取消操作"
      //     });
      //   });
      // rows.splice(index, 1);
    },
    getAllRegistrationInfo() {
      this.$fetch("/sf/listWithDrawRegistration").then(res => {
        this.registrations=res.data;
              }
      )}
  },
  created() {
    console.log("xxxx");
    this.getAllRegistrationInfo();
  }
};
</script>

<style>
</style>
