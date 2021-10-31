<template>

  <div style="margin-top: 10px;margin-bottom: 20px;padding-left: 20px;padding-right: 20px">
    <h1 style="text-align: center;padding-bottom: 6px;">草药申请列表单</h1>
    <el-row>
      <el-col :span="6"><div>草药申请列表单</div></el-col>

      <el-col :span="3"><div><a href="javascript:void(0)" @click="addApplication"><i class="el-icon-document-add"></i>新增申请</a></div></el-col>
      <el-col :span="2"><div><a href="javascript:void(0)" @click="alertApplicationInfo" :class="[radinState?'abuttonDisable':'']"><i class="el-icon-check"></i>修改</a></div></el-col>
      <el-col :span="2"><div><a href="javascript:void(0)" @click="toSave" :class="[radinState?'abuttonDisable':'']"><i class="el-icon-check"></i>暂存</a></div></el-col>
      <el-col :span="2"><div><a href="javascript:void(0)" @click="toOK"  :class="[radinState?'abuttonDisable':'']"> <i class="el-icon-upload2"></i>开立</a></div></el-col>
      <el-col :span="2"><div><a href="javascript:void(0)" @click="deleteApplication" :class="[radinState?'abuttonDisable':'']"><i class="el-icon-delete"></i>作废</a></div></el-col>
    </el-row>
    </el-row>

    <div style="border: 1px black solid;padding-top: 20px;padding-right: 20px;">
      <el-row>
      <el-col :span="7">
        <div style="padding-bottom: 20px">
          <el-table :data="applicationList" border
                    :row-class-name="tableRowClassName"
                    highlight-current-row @cell-click="getApplicationXm" >
            <el-table-column align="center" label="选择">
              <template slot-scope="scope">
                <!-- class="textRadio" -->
                <el-radio @change.native="getCurrentRow(scope.$index)" :label="scope.$index" v-model="radio" class="textRadio">&nbsp;</el-radio>
              </template>
            </el-table-column>

            <el-table-column prop="herbalApplication.applicationName" label="申请名称">
            </el-table-column>

            <el-table-column prop="herbalApplication.outpatientDoctorName" label="申请门诊医生">

            </el-table-column>
            <el-table-column prop="herbalApplication.useState" label="状态">
              <template slot-scope="scope">
                {{scope.row.herbalApplication.useState  | applicationState}}
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="1"> &nbsp;</el-col>
      <el-col :span="16">
        <el-row>
          <el-col :span="6"><div>草药项目列表</div></el-col>
          <el-col :span="3"><div><a href="javascript:void(0)" @click="showxmdialog" :class="[radinState?'abuttonDisable':'']"><i class="el-icon-document-add"></i>新增项目</a></div></el-col>
          <el-col :span="3"><div><a href="javascript:void(0)" @click="deleteXm" :class="[radinState?'abuttonDisable':'']"><i class="el-icon-document-delete"></i>删除项目</a></div></el-col>
        </el-row>

        <el-row>
          <el-table :data="xiangmuList" border   highlight-current-row @cell-click="getXm">
            <el-table-column align="center" label="选择">
              <template slot-scope="scope">
                <!-- class="textRadio" -->
                <el-radio @change.native="getCurrentRow(scope.$index)" :label="scope.$index" v-model="xmradio" class="textRadio">&nbsp;</el-radio>
              </template>
            </el-table-column>
            <el-table-column prop="drugsName" label="名称"></el-table-column>
            <el-table-column prop="drugsFormat" label="规格"></el-table-column>
            <el-table-column prop="drugsPrice" label="单价">
              <template slot-scope="scope">
                {{scope.row.drugsPrice}}元
              </template>
            </el-table-column>
            <el-table-column prop="drugsUseWay" label="用法">
              <template slot-scope="scope">
                <el-select v-model="scope.row.drugsUseWay">
                  <el-option
                          v-for="item in drugsUseWayOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="drugsNuit" label="单位"></el-table-column>
            <el-table-column prop="drugsNum" label="数量">
              <template slot-scope="scope">
                <el-input v-model="scope.row.drugsNum" @blur="getNewTotalPrice(scope.$index)" ></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="drugsTotalPrice" label="总价"></el-table-column>
            <el-table-column prop="useWarn" label="用药叮嘱">
              <template slot-scope="scope">
                <el-input v-model="scope.row.useWarn" ></el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </el-col>
    </el-row>
    </div>





    <el-dialog title="草药项目结果情况" :visible.sync="dialogResultVisible" >
      <el-row>
        <div style="padding-left: 50px;padding-right: 50px;padding-top: 50px;">
             <P style="padding-left: 50px;">{{result.checkResult}}</P>
        </div>
        <div style="padding-left: 50px;padding-right: 50px;padding-top: 20px;">
          <div v-for="picture in resultImgs">
              <img slot="reference" :src="picture.path"   style="max-height: 400px;max-width: 400px" width="100%" height="100%">
          </div>
        </div>
      </el-row>
    </el-dialog>

    <el-dialog title="新增草药项目" :visible.sync="dialogTableVisible" >
      <el-row>
        <el-col :span="1">  &nbsp; </el-col>
          <el-col :span="24"><div>
            <el-row>
                <el-col :span="24">
                  <el-form>
                    <el-form-item label="按药品名称进行查询">
                      <el-input v-model="searchName" autocomplete="true" style="width: 180px"></el-input>
                    </el-form-item>
                    <el-button type="primary" @click="searchItemByName">确 定 查 询</el-button>
                  </el-form>
                </el-col>
            </el-row>
            <el-row>
              <el-table :data="xiangmuData" border @row-dblclick="addHerbalFemdItem"  v-loading="loading" style="width: 100%">
                <el-table-column prop="drugsName" label="药品名称"></el-table-column>
                <el-table-column prop="drugsCode" label="项目编号"></el-table-column>
                <el-table-column prop="drugsPrice" label="价格"></el-table-column>
              </el-table>
            </el-row>
          </div>
          </el-col>
      </el-row>
    </el-dialog>

    <el-dialog title="引用模板内容新增申请" :visible.sync="dialoguseHerbalTemplateVisible">
      <el-row>
        <el-col :span="24">
          <el-form>
            <el-form-item label="填写申请的名称">
              <el-input v-model="dialoguseHerbalTemplate.applicationName" autocomplete="true" style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="填写申请目的和要求">
              <el-input v-model="dialoguseHerbalTemplate.requirements"  style="width: 180px"></el-input>
            </el-form-item>
            <el-button type="primary" @click="sureUseHerbalTemplateAppliction">确 定 申 请</el-button>
          </el-form>
        </el-col>
      </el-row>
      </el-col>
      </el-row>
    </el-dialog>

    <el-dialog title="修改申请" :visible.sync="dialogAlertApplictionVisible">
      <el-row>
        <el-col :span="24">
          <el-form>
            <el-form-item label="修改申请的名称">
              <el-input v-model="alertApplictionInfo.applicationName" style="width: 180px"></el-input>
            </el-form-item>
            <el-button type="primary" @click="sureAlertAppliction">确 定 修 改</el-button>
          </el-form>
        </el-col>
      </el-row>
      </el-col>
      </el-row>
    </el-dialog>

    <el-dialog title="新增申请" :visible.sync="dialogApplictionVisible">
      <el-row>
            <el-col :span="24">
              <el-form>
                <el-form-item label="填写申请的名称">
                  <el-input v-model="herbalApplication.applicationName" autocomplete="true" style="width: 180px"></el-input>
                </el-form-item>
                <el-button type="primary" @click="sureAppliction">确 定 申 请</el-button>
              </el-form>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-dialog>


  </div>
</template>

<script>
  import event from "../../../config/eventJS"
  import store from "../../../config/store"
  export default {
    name: 'jianyan1',
    components: {
    },
    data() {
      return {
        drugsUseWayOptions: [{
          value: '静脉注射',
          label: '静脉注射',
        }, {
          value: '口服',
          label: '口服'
        }, {
          value: '手动注射',
          label: '手动注射'
        }],
        dialogResultVisible:false,
        result:{},//返回的查询item的result对象
        resultImgs:[],//返回对应的查询对应的imgs
        dialogAlertApplictionVisible:false,
        alertApplictionInfo:{
        },
        radinState:false,
        dialoguseHerbalTemplateVisible: false,
        dialoguseHerbalTemplate: {},
        checkTemplate: {
          name: "草药申请保存模板",
          zd: [],//保存为项目的
          requirements: "",//要求
          outpatientDoctorName: "",//要从登陆信息查询
          departmentName: ""//要从登陆信息查询
        },
        herbalApplication: {},//新增申请
        dialogApplictionVisible: false,
        dialogTableVisible: false,
        searchName: "",
        radio: 0,
        xmradio: 0,
        loading: false,
        xiangmuList: [],//当前申请的list
        xiangmuData: [],//需要待加入的查询的list
        applicationList: []
      }
    },
    methods: {
      getNewTotalPrice(index){
          //重新计算价格

        this.applicationList[this.radio].herbalItemList[this.xmradio].drugsTotalPrice =
                parseInt(this.applicationList[this.radio].herbalItemList[this.xmradio].drugsNum) * parseFloat(
                    this.applicationList[this.radio].herbalItemList[this.xmradio].drugsPrice
                )
        alert( this.applicationList[this.radio].herbalItemList[this.xmradio].drugsTotalPrice)
      },
      refreshData(){
        console.log("当前的下标的位置为:"+this.radio)
        var radio2 = this.radio;
        this.loadingPatientHerbalInfo();//radio = 0
        console.log("radio2："+radio2)
        this.radio = radio2;
        console.log("更改之后的下标的位置为："+this.radio)
        console.log("this.newRadio:"+this.radio)
      },
      lookItemResult(index){
        //index是打开的items的下标
        console.log("dfajd")
        console.log(JSON.parse(localStorage.getItem("LoginUser")))
        let id = this.xiangmuList[index].id;
        //应该返回一个
        this.$axios.get("/od/getItemResult",{
          params: {
            id: id
          }
        }).then((res) => {
          console.log("项目的草药结果")
          console.log(res)
          this.result = res.data.data[0];
          this.resultImgs = res.data.data[1];
          this.dialogResultVisible = true;
        })
      },
      alertApplicationInfo(){

        this.alertApplictionInfo= this.applicationList[this.radio].herbalApplication
        this.dialogAlertApplictionVisible = true;
      },
      sureAlertAppliction(){
        //申请一个axios申请
        let info = [this.alertApplictionInfo.applicationName,this.alertApplictionInfo.requirements,this.alertApplictionInfo.id];
        this.$axios.put("/od/sureAlertHerbalAppliction",info).then((res) => {
          this.$message("修改成功");
          this.dialogAlertApplictionVisible = false;
          this.applicationList[this.radio].herbalApplication.applicationName = this.alertApplictionInfo.applicationName
        })
      },
      //应用组套的内容创建申请以及对应的项目
      sureUseHerbalTemplateAppliction() {
        if(this.$store.getters.getInspectionPatient.isSeenDocator !=2 ){
          if(this.$store.getters.getInspectionPatient.isSeenDocator == 1)
            this.$message("病人还未确定病历首页")
          if(this.$store.getters.getInspectionPatient.isSeenDocator == 3)
            this.$message("病人已经诊断完毕")
        } else {
          this.dialoguseHerbalTemplate.registrationInfoNo = this.$store.getters.getInspectionPatient.id;
          this.dialoguseHerbalTemplate.medicalRecord = this.$store.getters.getInspectionPatient.medicalRecord;
          this.dialoguseHerbalTemplate.patientName = this.$store.getters.getInspectionPatient.patientName;
          this.dialoguseHerbalTemplate.herbalType = "1";//草药申请
          this.dialoguseHerbalTemplate.checkItemNos = this.dialoguseHerbalTemplate.fmedItemNos;
          this.$axios.post("od/postNewHerbalApplication", this.dialoguseHerbalTemplate).then((res) => {
            console.log(res);
            this.$message("申请成功");
            this.dialoguseHerbalTemplateVisible = false;
            this.loadingPatientHerbalInfo();
          })
        }
      },
      openSaveTempate() {
        //把数据复制过去
        if (this.applicationList.length > 0) {
          this.checkTemplate.zd = this.xiangmuList;
          this.checkTemplate.requirements = this.applicationList[this.radio].herbalApplication.requirements;
          this.checkTemplate.outpatientDoctorName = "方聪"//要从登陆信息查询
          this.checkTemplate.departmentName = "方聪的部门"//要从登陆信息查询
          this.$refs.myDialogTemplate.openDiaLog(this.checkTemplate);
        } else {
          this.$message("当前无申请数据")
        }
      },
      addHerbalFemdItem(row) {
        console.log("哈哈哈哈")
        console.log(row)
        if (this.applicationList[this.radio].herbalApplication.useState == 1) {
          let herbalItem = {};
          herbalItem.id = null;
          herbalItem.drugsNo = row.id;
          herbalItem.drugsName = row.drugsName;
          herbalItem.drugsFormat = row.drugsFormat;
          herbalItem.drugsPrice = row.drugsPrice;
          herbalItem.drugsNuit = row.drugsUnit;
          herbalItem.drugsNum = 1;
          herbalItem.drugsTotalPrice = herbalItem.drugsPrice;
          herbalItem.handleState = 1
          console.log(herbalItem)
          if( this.applicationList[this.radio].herbalItemList == null) {
            this.applicationList[this.radio].herbalItemList = []
          }
          this.applicationList[this.radio].herbalItemList.push(herbalItem);
          console.log( this.applicationList[this.radio].herbalItemList)
          console.log(this.applicationList[this.radio].herbalItemList)
          this.xiangmuList = this.applicationList[this.radio].herbalItemList;
          this.$message("该草药已经加入，请注意暂存哦！")
        } else {
          if (this.applicationList[this.radio].herbalApplication.useState == 2)
            this.$message("该草药申请已经开立！,禁止进行操作")
          if (this.applicationList[this.radio].herbalApplication.useState == 3)
            this.$message("该草药申请已作废！,操作失败")
        }
      },
      sureAppliction() {
        this.herbalApplication.registrationInfoNo = this.$store.getters.getInspectionPatient.id;
        this.herbalApplication.medicalRecord = this.$store.getters.getInspectionPatient.medicalRecord;
        this.herbalApplication.patientName = this.$store.getters.getInspectionPatient.patientName;
        this.herbalApplication.herbalType= "1";
        this.$axios.post("od/postNewHerbalApplication", this.herbalApplication).then(res => {
          console.log(res);
          this.$message("申请成功");
          this.dialogApplictionVisible = false;
          //界面出现一行新数据
          this.loadingPatientHerbalInfo();
        })
      },
      toSave() {
        //step1 判断选中的行数数据 他的状态
        if (this.applicationList[this.radio].herbalApplication.useState == 2)
          this.$message("该草药申请已经开立！,禁止进行操作")
        if (this.applicationList[this.radio].herbalApplication.useState == 3)
          this.$message("该草药申请已作废！,操作失败")
        if (this.applicationList[this.radio].herbalApplication.useState == 1){
          //把整个的对象全部传过去
          this.$axios.put("/od/putHerbalApplicationUseStateToSave", this.applicationList[this.radio]).then(res => {
                this.$message("药品申请已经暂存成功");
          });
          this.$message("暂存成功");
        }

      },
      //作废申请
      deleteApplication() {
        console.log("作废申请");
        if (this.applicationList[this.radio].herbalApplication.useState == 1) {
          this.$axios.put("/od/putHerbalApplicationUseStateToDelete", this.applicationList[this.radio].herbalApplication.id).then(res => {
            console.log(res);
            this.$message("该申请成功被作废！！");
            this.applicationList[this.radio].herbalApplication.useState = 3;
            this.dialogApplictionVisible = false;
            this.loadingPatientHerbalInfo();
          });
        } else {
          if (this.applicationList[this.radio].herbalApplication.useState == 2)
            this.$message("该草药申请已经开立！,禁止进行操作")
          if (this.applicationList[this.radio].herbalApplication.useState == 3)
            this.$message("该草药申请已作废！,操作失败")
        }
      },
      toOK() {

        //1 to 2
        // step1 判断它当前状态是否为1 select
        let _this = this;
        if (this.applicationList[this.radio].herbalApplication.useState == 1) {
          this.$axios.put("/od/putHerbalApplicationUseStateToOk", this.applicationList[this.radio].herbalApplication.id).then(res => {
            console.log(res);
            this.$message("草药申请成功开立！！");
            _this.applicationList[this.radio].herbalApplication.useState = 2;
            _this.dialogApplictionVisible = false;
            _this.loadingPatientHerbalInfo();
          })
        } else {
          if (this.applicationList[this.radio].herbalApplication.useState == 2)
            this.$message("该草药申请已经开立！,禁止进行操作")
          if (this.applicationList[this.radio].herbalApplication.useState == 3)
            this.$message("该草药申请已作废！,操作失败")
        }
      },
      tableRowClassName(row) {
        //通过row的 1 暂存 2开立  3 作废
        if (this.applicationList[row.rowIndex].herbalApplication.useState == 1)
          return "warning-row";
        if (this.applicationList[row.rowIndex].herbalApplication.useState == 2)
          return "success-row";
        if (this.applicationList[row.rowIndex].herbalApplication.useState == 3)
          return "warning-row";
      },
      getApplicationXm(row) {
        this.radio = this.applicationList.indexOf(row);
        console.log("点击了" + this.radio)
        console.log(this.applicationList[this.radio])
        this.xiangmuList = this.applicationList[this.radio].herbalItemList;
      },
      getXm(row) {
        this.xmradio = this.xiangmuList.indexOf(row);
      },
      addApplication() {
        // this.applicationList.push({})
        this.dialogApplictionVisible = true;
      },
      deleteXm() {
        //step1. 获得当前选中,从applicationList删除该row
        // 先从数据库中把这个进行删除,判断是否可以进行删除，如果useState==1就可以 2的话是不能进行操作的
        if (this.applicationList[this.radio].herbalApplication.useState == 1) {
            this.xiangmuList.splice(this.xmradio, 1);
            this.$message("删除成功")
        } else {
          if (this.applicationList[this.radio].herbalApplication.useState == 2)
            this.$message("该草药申请已经开立！,禁止进行操作")
          if (this.applicationList[this.radio].herbalApplication.useState == 2)
            this.$message("该草药申请已作废！,操作失败")
        }
      },
      showxmdialog() {
        this.dialogTableVisible = true;
      },
      searchItemByName() {
        this.loading = true;
        var _this = this;
        this.$axios.get("/od/getHerbalDrugsByName", {
          params: {
            name: this.searchName
          }
        }).then(res => {
          _this.xiangmuData = res.data.data;
          _this.loading = false;
        })
      },
      loadingPatientHerbalInfo() {
        //通过用户的blh,获得用户的所有的申请表信息，通过申请表信息获得所有的项目信息然后并且显示在项目中。
        //首先判断是否有病历号
        if (this.$store.getters.getInspectionPatient.medicalRecord == null) {
        } else {
          this.$axios.get("/od/getHerbalApplicationByblh", {
            params: {
              blh: this.$store.getters.getInspectionPatient.medicalRecord
            }
          }).then((res) => {
            console.log("通过病历号："+this.$store.getters.getInspectionPatient.medicalRecord+"查询的数据")
            console.log(res);
            // 这里获得的data是一个很复杂的类型数据,需要一层一层进行解析
            this.applicationList = res.data.data;
            if (this.applicationList != null) {
              this.radio = 0;
              if (this.applicationList[this.radio].herbalItemList != null)
                this.xiangmuList = this.applicationList[this.radio].herbalItemList;
            }

            if (this.applicationList[this.radio].herbalApplication.useState != 1) {
              this.radinState = true;
            } else {
              this.radinState = false;
            }
            console.log("radinState的值是什么呢?"+this.radinState)
          })
        }
        //默认选择第一个
      }
    },

    computed: {
      //这里的一个业务需求就是当，user进行改变的时候，判断user的mrp的state用来修改样式
      radinCss() {
        return this.radio;//当这个数据进行改变的时候就会返回这个这个方法，然后监听这个方法即可
      }
    },
    watch:{
      radinCss:function(old,newd){
        //1表示是暂存的，2表示是完成提交的，3是作废当2进行完成提交之后那么就不应该容许操作界面了
        if (this.applicationList[this.radio].herbalApplication.useState != 1) {
          this.radinState = true;
        } else {
          this.radinState = false;
        }
      }
    },
    created() {
      //当点击这个vue的时候，那么就应该加载用户的申请信息的了，不然就废蛋了
      this.loadingPatientHerbalInfo();
      event.$on("commitPatient", (res) => {
        // 进行下通知，让这个方法进行获得下新的数据
        this.xiangmuList = null;
        this.loadingPatientHerbalInfo();
      });
      //当用户进行草药申请的时候，会触发这个逻辑，使得逻辑能够新增加一条记录
      event.$on("useHerbalTemplate", res => {
        //新创建一个申请（申请的名称，申请的
        this.dialoguseHerbalTemplateVisible = true;
        this.dialoguseHerbalTemplate = res;
        console.log("dialoguseHerbalTemplate数据为")
        console.log(res)
      });



    }
  }

</script>

<style>

</style>
