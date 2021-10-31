<template>
  <div id="charge1">
    <!-- 查找所有消费信息，并通过姓名进行查找 -->
    <el-row :gutter="20" :span="20" style="margin-left: 30px">
      <!-- 左边页面 -->
      <el-col :span="8" style="margin-top: 35px">
        <!-- 第一行 -->
        <el-row :gutter="40" :span="20">
          <el-col :span="8">
            <el-input v-model="patientName" placeholder="姓名"></el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="getAllRegistrationByPatientName">查询</el-button>
          </el-col>
          <el-col :span="4" :offset="2">
            <el-button type="primary" @click="getAllRegistration">查询所有</el-button>
          </el-col>
        </el-row>
        <!-- 第二行 -->
        <el-row>
          <el-col>
            <el-table
              :data="charge.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              style="width: 100%;"
              @cell-dblclick="aa"
            >
              <el-table-column type="index" width="30"></el-table-column>
              <el-table-column prop="medicalRecord" label="病历号" width="160"></el-table-column>
              <el-table-column prop="patientName" label="姓名" width="80"></el-table-column>
              <el-table-column prop="checkType" label="项目类别" width="80">
                <template slot-scope="scope">{{scope.row.checkType | checkstate}}</template>
              </el-table-column>
            </el-table>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[5, 10, 20, 40]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="charge.length">
            ></el-pagination>
          </el-col>
        </el-row>
      </el-col>
      <!-- 右边 -->
      <el-col :span="16" style="margin-top: 35px">
        <el-form label-width="100px" :model="check">
          <el-row :gutter="40">
            <el-col :span="8">
              <el-form-item label="病历号">
                <el-input v-model="check.medicalRecord" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="姓名">
                <el-input v-model="check.patientName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="8">
              <el-form-item label="项目类别">
                <el-input v-model="check.checkType "></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="性别">
                <el-input v-model="check.patientSex" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="8">
              <el-form-item label="年龄">
                <el-input v-model="check.patientAge" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="卡号">
                <el-input v-model="check.patientCard" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="8">
              <el-form-item label="金额">
                <el-input v-model="check.price"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" align="center">
              <el-button type="primary" @click="getcheck">结算</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "charge1",

  data() {
    return {
      currentPage: 1, //初始页
      pagesize: 5, //    每页的数据
      patientName: "",
      charge: [],
      currentRow: {},
      check: {
        medicalRecord: "",
        patientName: "",
        patientSex: "",
        checkType: "",
        patientAge: "",
        patientCard: "",
        price: ""
      }
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

    getcheck() {
      this.check.outpatientDoctorName = this.currentRow.outpatientDoctorName;
      this.check.outpatientDoctorNo = this.currentRow.outpatientDoctorNo;
      this.check.registrationInfoNo = this.currentRow.registrationInfoNo;
      this.check.checkApplicationNo = this.currentRow.id;

      this.$post("/sf/addCheckFee", this.check).then(res => {
        console.log(res);
        this.$message("结算成功");
      });
    },

    getAllRegistrationByPatientName() {
     this.$axios.get("/sf/listPatientName",{
                patientName: this.patientName
      }).then((res) => {
        this.charge = res.data.data;
           this.$message("查询成功");
      });
    },

    getAllRegistration() {
      this.$fetch("/sf/listCheck").then(res => {
        console.log(res);
        this.charge = res.data;
      });
    },
    aa(row) {
      console.log("hhhh"+row.medicalRecord)
      this.$fetch("/sf/getRegistrationByMedicalRecord", {medicalRecord:row.medicalRecord}).then((res) => {
        console.log(res);
        this.check.price = row.price;
        this.check.patientSex = res.data.patientSex;
        this.check.patientAge = res.data.patientAge;
        this.check.patientCard = res.data.patientCard;

        this.check.departmentNo = res.data.departmentNo;
        this.check.medicalRecord = row.medicalRecord;
        this.check.patientName = row.patientName;
        this.check.checkType = row.checkType;
        console.log(this.check);
      });
      this.currentRow = row;
    }
  },
  created() {
    console.log("xxxx");
    this.getAllRegistration();
  }
};
</script>


<style scoped>
</style>