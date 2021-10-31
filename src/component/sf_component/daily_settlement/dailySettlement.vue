<template>
  <!-- 日结 -->

  <el-form :inline="true" label-width="90px">
    <!-- 上边通过时间段进行查询 -->
    <el-divider><i class="el-icon-search"></i></el-divider>
    <el-row :span="24">


      <el-col :span="7" style="padding-bottom: 0px;">
        <el-form-item label="统计时间从 ">
          <el-date-picker type="date" v-model="startDate"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="7" style="padding-bottom: 0px;">
        <el-form-item label="到">
          <el-date-picker type="date" v-model="endDate"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="7" style="padding-bottom: 0px;">
        <el-form-item label="收费员">
          <el-select v-model="aa" :disabled="true">
            <el-option :label="username" :value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="2" :offset="1">
        <el-form-item>
          <el-button type="primary" @click="searchDay">查询</el-button>
        </el-form-item>
      </el-col>

    </el-row>
    <el-divider><i class="el-icon-loading"></i></el-divider>
    <el-row :span="24" :gutter="40">
      <!-- 左边写日结的信息列表 -->
      <el-col :span="8">
        <div class="grid-content bg-purple-dark">
          <span>日结信息列表</span>

          <el-table style="width: 100%;" :data="dailySettlement.slice((currentPage-1)*pagesize,currentPage*pagesize)" @cell-dblclick="as">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="registrarName" label="姓名" width="80"></el-table-column>
            <el-table-column prop="startTime" label="开始时间" width="80">
              <template slot-scope="scope">{{scope.row.startTime | dateTimeForm}}</template>
            </el-table-column>
            <el-table-column prop="endTime" label="截止时间" width="80">
              <template slot-scope="scope">{{scope.row.endTime | dateTimeForm}}</template>
            </el-table-column>
          </el-table>
          <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-sizes="[5, 10, 20, 40]"
                  :page-size="pagesize"
                  layout="total, sizes, prev, pager, next, jumper"

          ></el-pagination>
        </div>
      </el-col>
      <el-col :span="14">
        <div>
          <span>日结明细表</span>
          <el-row>
            <el-col :span="24">
              <el-table :data="dailyDetail" highlight-current-row style="width: 100%;">
                <el-table-column type="index" width="30"></el-table-column>
                <el-table-column prop="id" label="单据号" width="80"></el-table-column>
                <el-table-column prop="medicalRecord" label="病历号" width="80"></el-table-column>
                <el-table-column prop="patientName" label="姓名" width="80"></el-table-column>
                <el-table-column prop="price" label="价格" width="80"></el-table-column>
                <el-table-column prop="settlementCategory" label="挂号类别" width="80"></el-table-column>
                <el-table-column prop="discountAmount" label="优惠金额" width="80"></el-table-column>
                <el-table-column prop="accountToPay" label="账户支付" width="80"></el-table-column>
              </el-table>
            </el-col>
            <el-col :span="6" :offset="16">
              <el-form-item label="今日收益" prop="fee">
                <el-input v-model="dailySettlement.fee">
                  <template slot="append">￥</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      currentPage: 1, //初始页
      pagesize: 5, //    每页的数据
      startDate: null,
      endDate: null,
      fee: "0",
      dailySettlement: [
        {
          registrarName: "11",
          startTime: "132",
          endTime: "121",
          fee: "0"
        }
      ],
      dailyDetail: [
        {
          id: "11",
          medicalRecord: "121",
          patientName: "ss",
          price: "11",
          settlementCategory: "自费",
          discountAmount: "0",
          accountToPay: "0"
        }
      ]
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
    searchDay() {
      console.log(this.startDate);
      this.$fetch("/sf/listDailyDetailByRegistrar", {
        startDate: this.startDate,
        endDate: this.endDate,
        id: 11
      }).then(res => {
        console.log(res);
        this.$message("查询成功");
      });
    },
    getAllDailySettlement() {
      this.$fetch("sf/listDailySettlement").then((res) => {
        console.log(res);
        this.dailySettlement = res.data;
      });
    },
    as(row) {
      this.dailySettlement.fee=row.fee
      this.$fetch("/sf/listDailyDetailByRegistrarNo", {
        dailySettlementNo: row.id
      }).then((res) => {
        this.dailyDetail = res.data;
      
        console.log("ss");
      })
    }
  },
  created() {

    console.log("xxxx");
    this.getAllDailySettlement();
    this.username =   this.$store.getters.getLoginUser.name;
  }
};
</script>

<style >
</style>