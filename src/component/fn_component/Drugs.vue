<template>
  <div id="charge">
    <!-- 查找所有消费信息，并通过姓名进行查找 -->
    <el-row :gutter="20" :span="20" style="margin-left: 30px">
      <!-- 左边页面 -->
      <el-col :span="6" style="margin-top: 35px">
        <!-- 第一行 -->
        <el-row :gutter="40" :span="20">
          <el-col :span="8">
            <el-input v-model="drugsName" placeholder="请输入名称"></el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="getAllDrugsByDrugsName">查询</el-button>
          </el-col>
          <el-col :span="4" :offset="2">
            <el-button type="primary" @click="getAllDrugs">查询所有</el-button>
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
              <el-table-column prop="drugsName" label="药品名称" width="160"></el-table-column>
              <el-table-column prop="drugsPrice" label="药品价格" width="80"></el-table-column>
              <!-- <el-table-column prop="creationdate" label="药品价格" width="100">
                  <template slot-scope="scope">{{scope.row.creationdate | dateTimeForm}}</template></el-table-column>
         -->
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
        <el-form label-width="100px" style="margin:100px;" :model="drugs">
          <el-row :gutter="40">
            <el-col :span="10">
              <el-form-item label="药品编码">
                <el-input v-model="drugs.drugsCode" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="药品名称">
                <el-input v-model="drugs.drugsName" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="10">
              <el-form-item label="药品规格">
                <el-input v-model="drugs.drugsFormat" readonly></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="10">
              <el-form-item label="包装单位">
                <el-input v-model="drugs.drugsUnit" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="10">
              <el-form-item label="厂家">
                <el-input v-model="drugs.manufacturer" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="拼音助记码">
                <el-input v-model="drugs.mnemonicCode" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="10">
              <el-form-item label="创建时间" >
                 <div style="font-weight: 700 ">{{drugs.creationdate | dateTimeForm}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="药品单价">
                <el-input v-model="drugs.drugsPrice"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20" align="right">
              <el-button type="primary" @click="updatedrugs">修改</el-button>
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
      drugsName: "",
      cc: [],
      currentRow: {},
      drugs: {
        drugsCode: "",
        drugsName: "",
        drugsFormat: "",
        drugsUnit: "",
        manufacturer: "",
        mnemonicCode: "",
        creationdate: "0",
        drugsPrice: ""
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
    updatedrugs() {
      console.log(this.currentRow);
      this.$put("/sf/putDrugsUseDrugsPrice", this.currentRow).then(res =>
        console.log("xx")
      );
    },
    getAllDrugsByDrugsName() {
        this.$fetch("/sf/listDrugsByDrugsName",{drugsName: this.drugsName}).then(res =>{
          this.cc=res.data
             this.$message("查询成功");
        })
    },
    getAllDrugs() {
      this.$fetch("/sf/listDrugs").then(res => {
        console.log(res);
        this.cc = res.data;
        
      });
    },
    aa(row) {
      this.drugs = row;
      this.drugs.creationdate = row.creationdate;
      this.currentRow = row;
    }
  },
  created() {
    console.log("xxxx");
    this.getAllDrugs();
  }
};
</script>


<style>
#aa{
  margin-top: 0;
}
</style>