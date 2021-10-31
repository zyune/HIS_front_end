<template>
  <el-form :model="inServForm" ref="inServForm"  label-width="130px" size="small" >
    <el-form-item label="处方列表"  prop="servin" >
      <el-button type="primary" @click="addRow(chufangList)">增方</el-button>
      <!--<template>-->
        <el-table border :data="chufangList" style="width: 100%" >
          <el-table-column type="expand">

            <template slot-scope="props">
              <el-button type="primary" @click="addRow(drugsList)">增方</el-button>
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="药物列表">
                  <el-table border :data="drugsList" style="width: 100%" >
                    <el-table-column prop="drugsName" label="药品名称" style="width:6vw;" >
                      <template scope="scope">
                        <el-input size="mini" v-model="scope.row.drugsName"  ></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column prop="drugsFormat" label="规格" style="width:6vw;" >
                      <template scope="scope">
                        <el-input size="mini" v-model="scope.row.drugsFormat"  ></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column prop="drugsPrice" label="单价" style="width:6vw;" >
                      <template scope="scope">
                        <el-input size="mini" v-model="scope.row.drugsPrice"  ></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column prop="drugsUsage" label="用法" style="width:6vw;" >
                      <template scope="scope">
                        <el-select v-model="scope.row.drugsUsage" clearable  >
                          <el-option
                            v-for="item in drugsUsage"
                            :key="item.value"
                            :label="item.text"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </template>
                    </el-table-column>
                    <el-table-column prop="drugsDosage" label="用量" style="width:6vw;" >
                      <template scope="scope">
                        <el-input size="mini" v-model="scope.row.drugsDosage"  ></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column prop="drugsUnit" label="单位" style="width:6vw;" >
                      <template scope="scope">
                        <el-input size="mini" v-model="scope.row.drugsUnit"  ></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column prop="drugsNum" label="数量" style="width:6vw;" >
                      <template scope="scope">
                        <el-input size="mini" v-model="scope.row.drugsNum"  ></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column prop="userWarns" label="门诊医生叮嘱" style="width:6vw;" >
                      <template scope="scope">
                        <el-input size="mini" v-model="scope.row.userWarns"  ></el-input>
                      </template>
                    </el-table-column>

                    <el-table-column fixed="right"  label="操作">
                      <template slot-scope="scope">
                        <el-button @click.native.prevent="deleteRow(scope.$index, drugsList)" size="small"> 移除 </el-button>
                      </template>
                    </el-table-column>
                  </el-table>

                </el-form-item>

              </el-form>
            </template>
          </el-table-column>
          <el-table-column prop="drugsName" label="处方号" style="width:6vw;" >
            <template scope="scope">
              <el-input size="mini" v-model="scope.row.drugsName"  ></el-input>
            </template>
          </el-table-column>

          <el-table-column fixed="right"  label="操作">
            <template slot-scope="scope">
              <el-button @click.native.prevent="deleteRow(scope.$index, chufangList)" size="small"> 移除 </el-button>
            </template>
          </el-table-column>
        </el-table>
      <!--</template>-->
    </el-form-item>
  </el-form>
</template>
<script>
 export default {
   name:'bianjishanchu',
   data() {
     return {
       chufangList: [],
       drugsList:[],


       drugsUsage: [{text: '静脉滴注', value: '1'}, {text: '皮试', value: '2'}],

     }
   },
   methods: {
     deleteRow(index, rows) {//删除改行
       rows.splice(index, 1);

     },
     addRow(tableData,event){
       tableData.push({ drugsName: '',drugsFormat:'',drugsPrice:'',drugsUsage:'',
         drugsDosage:'',drugsUnit:'',drugsNum:'',userWarns:''
       })
     },
   }

 }
</script>
<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

</style>
