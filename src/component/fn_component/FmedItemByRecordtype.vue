<template>
  <div id="charge">
    <!-- 查找所有消费信息，并通过姓名进行查找 -->
    <el-row :gutter="20" :span="20" style="margin-left: 30px">
      <!-- 左边页面 -->
      <el-col :span="6" style="margin-top: 35px">
        <!-- 第一行 -->
          <span>"1"表示为处置  "2"表示为检查  "3"表示为检验</span>
        <el-row :gutter="40" :span="20">
          <el-col :span="10">
            <el-input v-model="recordtype" placeholder="请通过类型查找"></el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="getAllFmedItemByRecordtype">查询</el-button>
          </el-col>
          <el-col :span="4" :offset="2">
            <el-button type="primary" @click="getFmedItem">查询所有</el-button>
          </el-col>
        </el-row>
        <!-- 第二行 -->
        <el-row>
          <el-col>
            <el-table
              :data="cc.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              style="width: 100%;"
              @cell-dblclick="aa"
            >
              <el-table-column type="index" width="30"></el-table-column>
              <el-table-column prop="itemname" label="非药物项目名" width="160"></el-table-column>
              <el-table-column prop="price" label="价格" width="100"></el-table-column>
            </el-table>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[5, 10, 20, 40]"
              :page-size="pagesize"
              layout="total, sizes, prev, pager, next, jumper"
            ></el-pagination>
          </el-col>
        </el-row>
      </el-col>
      <!-- 右边 -->
      <el-col :span="16" style="margin-top: 35px">
        <el-form label-width="120px" style="margin:100px;" :model="check">
          <el-row :gutter="40">
            <el-col :span="11">
              <el-form-item label="非药物项目编码">
                <el-input v-model="check.itemcode" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="非药物项目名">
                <el-input v-model="check.itemname" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="11">
              <el-form-item label="单位">
                <el-input v-model="check.format" readonly></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="11">
              <el-form-item label="项目类型">
                <el-input v-model="check.recordtype" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="11">
              <el-form-item label="执行科室">
                <el-input v-model="check.deptid" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="拼音助记码">
                <el-input v-model="check.memoniccode" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="11">
              <el-form-item label="创建时间">
           
        <div style="font-weight: 700 ">{{check.creationdate | dateTimeForm}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="价格">
                <el-input v-model="check.price"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="20" align="right">
              <el-button type="primary" @click="updateFmedItem">修改</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>


<script>
export default {
  name: "charge",

  data() {
    return {
      currentPage: 1, //初始页
      pagesize: 5, //    每页的数据
      recordtype: "",
      cc: [],
      currentRow: {},
      check: {
        itemcode: "",
        itemname: "",
        format: "",
        price: "",
        deptid: "",
        memoniccode: "",
        price: "",
        recordtype: "",
        creationdate: "0"
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
    getAllFmedItemByRecordtype(){
 this.$fetch("/sf/listFmedItemByRecordtype",{recordtype: this.recordtype}).then(res =>{
          this.cc=res.data
             this.$message("查询成功");
        })
    },
    updateFmedItem() {
          this.$put("/sf/putFmedItemUseprice", this.currentRow).then((res)=>
      {
             this.$message("更新成功");
      })
    },
    getFmedItem() {
      this.$fetch("sf/listFmedItem").then(res => {
        console.log(res);
        this.cc = res.data;
         
      });
    },
    aa(row) {
      this.check = row;
      this.currentRow = row;
    }
  },
  created() {
    console.log("xxxx");
    this.getFmedItem();
  }
};
</script>


<style>
</style>