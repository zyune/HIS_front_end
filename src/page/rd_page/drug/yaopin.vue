<template>
  <div id="app" style="padding-left: 15px;">
    <el-row style="padding-top: 20px;">
      <el-col :span="24">
        <div>
          <fieldset>
            <legend>查询条件</legend>
            <el-row>
              <el-col :span="2"><div></div></el-col>
              <el-col :span="2"><div>

              </div></el-col>
              <el-col :span="2"><div>
                <!--药品类别-->
              </div></el-col>
              <el-col :span="2"><div>
                <!--<el-select v-model="value1" placeholder="请选择">-->
                  <!--<el-option-->
                    <!--v-for="item in options1"-->
                    <!--:key="item.value1"-->
                    <!--:label="item.label1"-->
                    <!--:value="item.value1">-->
                  <!--</el-option>-->
                <!--</el-select>-->
              </div></el-col>
              <el-col :span="2"><div>药品编码</div></el-col>
              <el-col :span="2"><el-input v-model="drugsCode"></el-input></el-col>
              <el-col :span="1"><div style="text-align: left">拼音码</div></el-col>
              <el-col :span="2"><div><el-input v-model="input1"></el-input></div></el-col>
              <el-col :span="2"><div>状态</div></el-col>
              <el-col :span="2"><div>
                <el-select v-model="value2" placeholder="请选择">
                  <el-option
                    v-for="item in options2"
                    :key="item.value2"
                    :label="item.label2"
                    :value="item.value2">
                  </el-option>
                </el-select>
              </div></el-col>
              <el-col :span="1"><div> <i class="el-icon-search"></i><a href="JavaScript:void(0)" @click="getDrugByCode" >查询</a></div></el-col>
              <el-col :span="1"><div> <i class="el-icon-refresh-right"></i><a href="JavaScript:void(0)" @click="reload">重置</a></div></el-col>
            </el-row>
          </fieldset>
          <el-row>
            <el-col  :span="24"><div style="text-align: left" class="ypmlcss">药品目录列表</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="24"><div class="grid-content bg-purple">
              <el-table
                :data="drugsInfoData"
                :span-method="objectSpanMethod"
                stripe
                height="250"
                border
                style="width: 100%"
                 @row-dblclick="getRow"
              >


                <el-table-column  width="80">
                  <div><el-checkbox v-model="checked">备选项</el-checkbox></div>
                </el-table-column>
                <el-table-column
                  prop="drugsCode"
                  label="编码"
                  width="80">
                </el-table-column>
                <el-table-column
                  prop="drugsName"
                  label="药品名"
                  width="100"
                  rowspan="2">
                </el-table-column>
                <el-table-column
                  prop="mnemonicCode"
                  label="拼音助记码">
                </el-table-column>
                <el-table-column
                  prop="drugsFormat"
                  label="规格"
                >
                </el-table-column>
                <el-table-column
                  prop="drugsDosage"
                  label="剂型"
                >
                </el-table-column>

                <el-table-column
                  prop="drugsUnit"
                  label="包装单位"
                >
                </el-table-column>
                <el-table-column
                  prop="drugsPrice"
                  label="售价"
                >
                </el-table-column>
                <el-table-column
                  prop="manufacturer"
                  label="生产厂商"
                >
                </el-table-column>
                <el-table-column
                  prop="drugsType"
                  label="药品类型"
                >
                </el-table-column>
                <el-table-column
                  prop="creationdate"
                  label="创建日期"
                >
                </el-table-column>

              </el-table>
            </div></el-col>
          </el-row>
          <el-row><el-col :span="12"><div style="text-align: left"><el-pagination
            small
            layout="prev, pager, next"
            :total="50">
          </el-pagination></div></el-col>
            <el-col :span="6">
              <el-button @click="dialogFormVisible = true">添加记录</el-button>
              <!--/这个是添加药品信息的弹出框-->
              <el-dialog title="增药" :visible.sync="dialogFormVisible">
                <el-form ref="form" :model="addform" label-width="80px">
                  <!--<el-form-item label="id">-->
                    <!--<el-input v-model="addform.id"></el-input>-->
                  <!--</el-form-item>-->
                  <el-form-item label="编码">
                    <el-input v-model="addform.drugsCode"></el-input>
                  </el-form-item>
                  <el-form-item label="药品名">
                    <el-input v-model="addform.drugsName"></el-input>
                  </el-form-item>
                  <el-form-item label="拼音助记码">
                    <el-input v-model="addform.mnemonicCode"></el-input>
                  </el-form-item>
                  <el-form-item label="规格">
                    <el-input v-model="addform.drugsFormat"></el-input>
                  </el-form-item>
                  <el-form-item label="剂型">
                    <el-input v-model="addform.drugsDosage"></el-input>
                  </el-form-item>
                  <el-form-item label="包装单位">
                    <el-select v-model="addform.drugsUnit" placeholder="请选择活动区域">
                      <el-option label="盒" value="盒"></el-option>
                      <el-option label="瓶" value="瓶"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="售价">
                    <el-input v-model="addform.drugsPrice"></el-input>
                  </el-form-item>
                  <el-form-item label="生产厂商">
                    <el-input v-model="addform.manufacturer"></el-input>
                  </el-form-item>
                  <el-form-item label="药品类型">
                    <el-input v-model="addform.drugsType"></el-input>
                  </el-form-item>
                  <el-form-item label="创建日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="addform.creationdate" style="width: 100%;"></el-date-picker>
                  </el-form-item>


                  <el-form-item>
                    <el-button type="primary" @click="addDrug">立即添加</el-button>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                </div>
              </el-dialog>
            </el-col>
            <el-col :span="6">

              <el-button @click="deleteDrugByCode">删除记录</el-button>
            </el-col>


          </el-row>

        </div>
      </el-col>
    </el-row>

    <el-row style="padding-top: 20px;">
      <el-col :span="24">
        <div>
          <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
            <el-tab-pane label="药品修改区间" :data="xianshi" name="first">
              <el-row>
                <el-col :span="22"><div style="text-align: left">当前药品：XXXXX</div></el-col>
                <el-col :span="2"><div><i class="el-icon-download"></i><a href="JavaScript:void(0)" @click="changeDrug">保存</a></div></el-col>
              </el-row>
              <el-row>
                <el-col :span="2"><div>药品ID</div></el-col>
                <el-col :span="2"><div><el-input v-model="xianshi.id"></el-input></div></el-col>
                <el-col :span="2"><div>拼音码</div></el-col>
                <el-col :span="2"><div><el-input v-model="xianshi.mnemonicCode"></el-input></div></el-col>
                <el-col :span="2"><div>药品名</div></el-col>
                <el-col :span="2"><div><el-input v-model="xianshi.drugsName"></el-input></div></el-col>
                <el-col :span="2"><div>药品编码</div></el-col>
                <el-col :span="2"><div><el-input v-model="xianshi.drugsCode"></el-input></div></el-col>
                <el-col :span="4"><div>药品规格</div></el-col>
                <el-col :span="2"><div><el-input v-model="xianshi.drugsFormat"></el-input></div></el-col>
                <el-col :span="2"><div></div></el-col>

              </el-row>
              <el-row>
                <el-col :span="2"><div>药品单位</div></el-col>
                <el-col :span="2"><div><el-input v-model="xianshi.drugsUnit"></el-input></div></el-col>
                <el-col :span="2"><div>药品售价</div></el-col>
                <el-col :span="2"><div><el-input v-model="xianshi.drugsPrice"></el-input></div></el-col>
                <el-col :span="2"><div>用法</div></el-col>
                <el-col :span="2"><div>
                  <el-input v-model="xianshi.drugsDosage"></el-input>
                </div></el-col>
                <el-col :span="2"><div>药品类型</div></el-col>
                <el-col :span="2"><div><el-input v-model="xianshi.drugsType"></el-input></div></el-col>
                <el-col :span="4"><div>创建时间</div></el-col>
                <el-col :span="2"><div><el-input v-model="xianshi.creationdate"></el-input></div></el-col>
                <el-col :span="2"><div></div></el-col>

              </el-row>
              <el-row>
                <el-col :span="2"><div>制造厂</div></el-col>
                <el-col :span="2"><div>
                  <el-input v-model="xianshi.manufacturer"></el-input>
                </div></el-col>
                <el-col :span="2"><div></div></el-col>
                <el-col :span="2"><div>

                </div></el-col>
                <el-col :span="2"><div></div></el-col>
                <el-col :span="2"><div></div></el-col>
                <el-col :span="2"><div></div></el-col>
                <el-col :span="2"><div></div></el-col>
                <el-col :span="8"><div></div></el-col>
              </el-row>
              <!--<el-row>-->
                <!--<el-col :span="2"><div>最新供药公司</div></el-col>-->
                <!--<el-col :span="2"><div><el-input v-model="input11"></el-input></div></el-col>-->
                <!--<el-col :span="2"><div>性别限制</div></el-col>-->
                <!--<el-col :span="2"><div>-->
                  <!--<el-select v-model="value3" placeholder="请选择">-->
                    <!--<el-option-->
                      <!--v-for="item in optionssex"-->
                      <!--:key="item.value"-->
                      <!--:label="item.label"-->
                      <!--:value="item.value">-->
                    <!--</el-option>-->
                  <!--</el-select>-->
                <!--</div></el-col>-->
                <!--<el-col :span="2"><div>小儿常用剂量</div></el-col>-->
                <!--<el-col :span="2"><div><el-input v-model="input12"></el-input></div></el-col>-->
                <!--<el-col :span="2"><div>小儿最大剂量</div></el-col>-->
                <!--<el-col :span="2"><div><el-input v-model="input13"></el-input></div></el-col>-->
                <!--<el-col :span="8"><div></div></el-col>-->
              <!--</el-row>-->
              <!--<el-row>-->
                <!--<el-col :span="2"><div>特殊人群</div></el-col>-->
                <!--<el-col :span="8"><div>-->
                  <!--<el-checkbox-group v-model="checkList">-->
                    <!--<el-checkbox label="老年人"></el-checkbox>-->
                    <!--<el-checkbox label="儿童"></el-checkbox>-->
                    <!--<el-checkbox label="孕产妇"></el-checkbox>-->
                    <!--<el-checkbox label="哺乳期妇女"></el-checkbox>-->

                  <!--</el-checkbox-group>-->
                <!--</div></el-col>-->
                <!--<el-col :span="8"><div></div></el-col>-->
                <!--<el-col :span="6"><div></div></el-col>-->


              <!--</el-row>-->
              <!--<el-row>-->
                <!--<el-col :span="2"><div>医生嘱托</div></el-col>-->
                <!--<el-col :span="22"><div>-->
                  <!--<el-input-->
                    <!--type="textarea"-->
                    <!--:rows="2"-->
                    <!--placeholder="请输入内容"-->
                    <!--v-model="textarea">-->
                  <!--</el-input>-->
                <!--</div></el-col>-->
              <!--</el-row>-->
            </el-tab-pane>
            <el-tab-pane label="医保对照" name="second">医保对照</el-tab-pane>
            <el-tab-pane label="调价记录" name="third">
              <el-row><el-col :span="24"><div style="text-align: left">当前药品：XXXX</div></el-col></el-row>
              <el-row>
                <el-col :span="4"><div>       </div></el-col>
                <el-col :span="20"><div class="tjjlcss">调价记录表</div></el-col>
              </el-row>
              <el-row>
                <el-col :span="4"><div style="">调价记录</div></el-col>
                <el-col :span="20"><div>

                  <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                    <el-table-column
                      prop="ypmc"
                      label="药品名称"
                      width="100">
                    </el-table-column>
                    <el-table-column
                      prop="guige"
                      label="规格"
                      width="100">
                    </el-table-column>
                    <el-table-column
                      prop="chandi"
                      label="产地">
                    </el-table-column>
                    <el-table-column
                      prop="ylsj"
                      label="原零售价">
                    </el-table-column>
                    <el-table-column
                      prop="chandi"
                      label="xlsj">
                    </el-table-column>
                    <el-table-column
                      prop="tjdh"
                      label="调价单号">
                    </el-table-column>
                    <el-table-column
                      prop="tjrq"
                      label="调价日期">
                    </el-table-column>
                    <el-table-column
                      prop="tjwh"
                      label="调价文号">
                    </el-table-column>
                    <el-table-column
                      prop="tjyy"
                      label="调价原因">
                    </el-table-column>

                  </el-table>
                </div></el-col>
              </el-row>
            </el-tab-pane>

          </el-tabs>
        </div>
      </el-col>
    </el-row>

  </div>
  </template>

<script>

  export default {

    data() {

      return {
        //ypml1
        nowrow:{},
        checked: '',
        drugsCode:'',
        input1:'',
        input2:'',
        //选择框

        options1:[{value1:'选项1',label1:'西药'},{value1:'选项2',label1:'中成药'},{value1:'选项3',label1:'中草药'}],
        value1:'',
        options2:[{value2:'选项1',label2:'有效'},{value2:'选项2',label2:'无效'}],
        value2:'',
        drugsInfoData: [

        ],

        //ypml2
        xianshi:{
          id:'',
          drugsCode: '',
          drugsName:'',
          drugsFormat:'',
          drugsUnit:'',
          manufacturer:'',
          drugsDosage:'',
          drugsType:'',
          drugsPrice:'',
          mnemonicCode:'',
          creationdate:''

        },

        activeName: 'first',
        value: '',
        value1: '',
        value2: '',
        value3:'',
        checkList: ['选中且禁用','复选框 A'],
        textarea: '',
        tableData: [{
          ypmc:'伟哥',
          guige:'一箱',
          chandi:'美国',
          ylsj:'$10',
          xlsj:'$100',
          tjdh:'XXXX9081' ,
          tjrq:'2019/6/10',
          tjwh:'321312312',
          tjyy:'鸡把变长',
        }],
        addform: {
          id:'',
          drugsCode: '',
          drugsName:'',
          drugsFormat:'',
          drugsUnit:'',
          manufacturer:'',
          drugsDosage:'',
          drugsType:'',
          drugsPrice:'',
          mnemonicCode:'',
          creationdate:''
        },
        dialogFormVisible: false,

      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      getAllDrugs(){
        var _this = this;
        //url , data
        this.$fetch("/drugs/getAllDrugs").then(function (res) {
          // console.log(res);
          // console.log(res.data);
          _this.drugsInfoData = res.data;
        })
      },
      addDrug(){
        var _this = this;
        this.$post("/drugs/addDrug",this.addform).then(function (res) {
          console.log(res);
          alert("添加成功");
          this.getAllDrugs();

        })
      },
      getRow: function (row) {
        var _this = this;
        console.log(row.id);
        console.log(row);
        this.nowrow = row;
        this.xianshi.drugsCode=row.drugsCode;
        this.xianshi.drugsName=row.drugsName;
        this.xianshi.id=row.id;
        this.xianshi.manufacturer=row.manufacturer;
        this.xianshi.creationdate=row.creationdate;
        this.xianshi.drugsType=row.drugsType;
        this.xianshi.drugsDosage=row.drugsDosage;
        this.xianshi.mnemonicCode=row.mnemonicCode;
        this.xianshi.drugsUnit=row.drugsUnit;
        this.xianshi.drugsPrice=row.drugsPrice;
        this.xianshi.drugsFormat=row.drugsFormat;




      },
      deleteDrugByCode(){
        var _this = this;
        console.log(this.nowrow.drugsCode);
        this.$mdelete("/drugs/deleteDrugByCode",{params:{drugCode:this.nowrow.drugsCode}}).then((res) =>{
          alert("删除成功")
        })
       },
      getDrugByCode(){
        console.log(this.drugsCode);
        this.$fetch("/drugs/getDrugByCode",{drugCode:this.drugsCode}).then((res)=>{
           console.log(res);
          //  this.xianshi.drugsCode=res.data.drugsCode;
          //  this.xianshi.id=res.data.id;
          //  this.xianshi.drugsName=res.data.drugsName;
          // this.xianshi.drugsDosage=res.data.drugsDosage;
          // this.xianshi.drugsUnit=res.data.drugsUnit;
          // this.xianshi.drugsPrice=res.data.drugsPrice;
          // this.xianshi.drugsFormat=res.data.drugsFormat;
          // this.xianshi.drugsUsage=res.data.drugsUsage;
          // this.xianshi.mnemonicCode=res.data.mnemonicCode;
          // this.xianshi.creationdate=res.data.creationdate;
          // this.xianshi.drugsType=res.data.drugsType
          // this.xianshi.manufacturer=res.data.manufacturer;
          this.xianshi=res.data;
          console.log(this.xianshi.drugsCode)
        })
        this.$fetch("drugs/getDrugByCode1",{drugCode:this.drugsCode}).then((res)=>{
 this.drugsInfoData=res.data;
        })
      },
      changeDrug(){
        console.log(this.xianshi);
        this.xianshi.creationdate = null;
        this.$put("/drugs/changeDrug",this.xianshi).then((res) =>{
          console.log(this.xianshi);
          console.log(res);
          alert("保存成功")
        })
      },
      reload(){
        this.$router.go(0);
      }


    },
    created(){
      this.getAllDrugs();
    }

  }
  </script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  a{
    text-decoration:none;
    color:#0000FF;
  }
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
