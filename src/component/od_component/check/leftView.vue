<template>

  <div style="margin-top: 10px;margin-bottom: 20px;padding-left: 20px;padding-right: 20px">
    <h1 style="text-align: center;padding-bottom: 6px;">检查申请列表单</h1>
    <el-row>
      <el-col :span="6"><div>检查申请列表单</div></el-col>

      <el-col :span="3"><div><a href="javascript:void(0)" @click="addApplication"><i class="el-icon-document-add"></i>新增申请</a></div></el-col>
      <el-col :span="2"><div><a href="javascript:void(0)" @click="alertApplicationInfo" :class="[radinState?'abuttonDisable':'']"><i class="el-icon-check"></i>修改</a></div></el-col>
      <el-col :span="2"><div><a href="javascript:void(0)" @click="toSave" :class="[radinState?'abuttonDisable':'']"><i class="el-icon-check"></i>暂存</a></div></el-col>
      <el-col :span="2"><div><a href="javascript:void(0)" @click="toOK"  :class="[radinState?'abuttonDisable':'']"> <i class="el-icon-upload2"></i>开立</a></div></el-col>
      <el-col :span="2"><div><a href="javascript:void(0)" @click="deleteApplication" :class="[radinState?'abuttonDisable':'']"><i class="el-icon-delete"></i>作废</a></div></el-col>
      <el-col :span="3"><div><a href="javascript:void(0)" @click="openSaveTempate"><i class="el-icon-download"></i>存为组套</a></div></el-col>
      <el-col :span="3"><div><a href="javascript:void(0)" @click="openStack"><i class="el-icon-download"></i>引用组套</a></div></el-col>

      <el-col :span="3"><div><a href="javascript:void(0)" @click="refreshData"><i class="el-icon-refresh"></i>刷新数据</a></div></el-col>


    </el-row>
    </el-row>

    <el-row>
      <el-col :span="24">
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

        <el-table-column prop="checkApplication.checkApplicationName" label="申请名称">
        </el-table-column>
        <el-table-column prop="checkApplication.createTime" label="申请时间">
          <template slot-scope="scope">
            {{scope.row.checkApplication.createTime  | dateTimeForm}}
          </template>
        </el-table-column>
        <el-table-column prop="checkApplication.outpatientDoctorName" label="申请门诊医生">

        </el-table-column>
        <el-table-column prop="checkApplication.useState" label="状态">
          <template slot-scope="scope">
            {{scope.row.checkApplication.useState  | applicationState}}
          </template>
        </el-table-column>
        <el-table-column prop="checkApplication.requirements" label="目的和要求">

        </el-table-column>
        <el-table-column prop="checkApplication.isFee" label="收费状态">

          <template slot-scope="scope">
            {{scope.row.checkApplication.isFee  | feeState}}
          </template>

        </el-table-column>
        <el-table-column prop="checkApplication.price" label="金额">

        </el-table-column>
      </el-table>
      </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-row>
          <el-col :span="6"><div>检查项目列表</div></el-col>
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
            <el-table-column prop="itemName" label="项目名称"></el-table-column>
            <el-table-column prop="itemCode" label="项目编码"></el-table-column>
            <el-table-column prop="itemHandleState" label="执行状态">
              <template slot-scope="scope">
               <div v-if="scope.row.itemHandleState == '1'">  {{scope.row.itemHandleState | handlerState}}</div>
                <div v-if="scope.row.itemHandleState == '2'"> 已登记</div>
                <div v-if="scope.row.itemHandleState == '3'">
                  <el-button type="success" plain @click="lookItemResult(scope.$index)">查看结果</el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="itemPrice" label="项目价格"></el-table-column>
          </el-table>
        </el-row>
      </el-col>
      </el-row>

    <el-dialog title="检查项目结果情况" :visible.sync="dialogResultVisible" >
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

    <el-dialog title="新增检查项目" :visible.sync="dialogTableVisible" >
      <el-row>
        <el-col :span="1">  &nbsp; </el-col>
          <el-col :span="24"><div>
            <el-row>
                <el-col :span="24">
                  <el-form>
                    <el-form-item label="按项目名称进行查询">
                      <el-input v-model="searchName" autocomplete="true" style="width: 180px"></el-input>
                    </el-form-item>
                    <el-button type="primary" @click="searchItemByName">确 定 查 询</el-button>
                  </el-form>
                </el-col>
            </el-row>
            <el-row>
              <el-table :data="xiangmuData" border @row-dblclick="addCheckFemdItem"  v-loading="loading" style="width: 100%">
                <el-table-column prop="itemname" label="项目名称"></el-table-column>
                <el-table-column prop="itemcode" label="项目编号"></el-table-column>
                <el-table-column prop="price" label="价格"></el-table-column>
              </el-table>
            </el-row>
          </div>
          </el-col>
      </el-row>
    </el-dialog>

    <el-dialog title="引用模板内容新增申请" :visible.sync="dialoguseCheckTemplateVisible">
      <el-row>
        <el-col :span="24">
          <el-form>
            <el-form-item label="填写申请的名称">
              <el-input v-model="dialoguseCheckTemplate.checkApplicationName" autocomplete="true" style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="填写申请目的和要求">
              <el-input v-model="dialoguseCheckTemplate.requirements"  style="width: 180px"></el-input>
            </el-form-item>
            <el-button type="primary" @click="sureUseCheckTemplateAppliction">确 定 申 请</el-button>
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
              <el-input v-model="alertApplictionInfo.checkApplicationName" style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="修改申请目的和要求">
              <el-input v-model="alertApplictionInfo.requirements"  style="width: 180px"></el-input>
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
                  <el-input v-model="checkApplication.checkApplicationName" autocomplete="true" style="width: 180px"></el-input>
                </el-form-item>
                <el-form-item label="填写申请目的和要求">
                  <el-input v-model="checkApplication.requirements"  style="width: 180px"></el-input>
                </el-form-item>

                <el-button type="primary" @click="sureAppliction">确 定 申 请</el-button>
              </el-form>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-dialog>

    <saveDialogTemplate ref="myDialogTemplate"></saveDialogTemplate>
    <view1 ref="view1"></view1>

  </div>
</template>

<script>
  import event from "../../../config/eventJS"
  import store from "../../../config/store"
  import saveDialogTemplate from "./checkApplicationTemplate"
  import view1 from "./view"
  export default {
    name: 'jianyan1',
    components: {
      saveDialogTemplate,view1
    },
    data() {
      return {
        dialogResultVisible:false,
        result:{},//返回的查询item的result对象
        resultImgs:[],//返回对应的查询对应的imgs
        dialogAlertApplictionVisible:false,
        alertApplictionInfo:{
          checkApplicationName:"",
          requirements:"",
          id:""
        },
        radinState:false,
        dialoguseCheckTemplateVisible: false,
        dialoguseCheckTemplate: {},
        checkTemplate: {
          name: "检查申请保存模板",
          zd: [],//保存为项目的
          requirements: "",//要求
          outpatientDoctorName: "",//要从登陆信息查询
          departmentName: ""//要从登陆信息查询
        },
        checkApplication: {},//新增申请
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
      openStack(){
        this.$refs.view1.openTemplateVisible();
      },
      refreshData(){
        console.log("当前的下标的位置为:"+this.radio)
        var radio2 = this.radio;
        this.loadingPatientCheckInfo();//radio = 0
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
          console.log("项目的检查结果")
          console.log(res)
          this.result = res.data.data[0];
          this.resultImgs = res.data.data[1];
          this.dialogResultVisible = true;
        })
      },
      alertApplicationInfo(){

        this.alertApplictionInfo.checkApplicationName = this.applicationList[this.radio].checkApplication.checkApplicationName
        this.alertApplictionInfo.requirements = this.applicationList[this.radio].checkApplication.requirements
        this.alertApplictionInfo.id = this.applicationList[this.radio].checkApplication.id;

        this.dialogAlertApplictionVisible = true;
      },
      sureAlertAppliction(){
        //申请一个axios申请
        let info = [this.alertApplictionInfo.checkApplicationName,this.alertApplictionInfo.requirements,this.alertApplictionInfo.id];
        this.$axios.put("/od/sureAlertAppliction",info).then((res) => {
          this.$message("修改成功");
          this.dialogAlertApplictionVisible = false;
          this.applicationList[this.radio].checkApplication.checkApplicationName = info[0];
          this.applicationList[this.radio].checkApplication.requirements = info[1];

        })
      },
      //应用组套的内容创建申请以及对应的项目
      sureUseCheckTemplateAppliction() {
        this.dialoguseCheckTemplate.registrationInfoNo = this.$store.getters.getInspectionPatient.id;
        this.dialoguseCheckTemplate.medicalRecord = this.$store.getters.getInspectionPatient.medicalRecord;
        this.dialoguseCheckTemplate.patientName = this.$store.getters.getInspectionPatient.patientName;
        this.dialoguseCheckTemplate.checkType=1;//检查申请
        // var accoetCheckStack = {};
        // accoetCheckStack.checkStack =
        //使用这个用来存储NOS
        this.dialoguseCheckTemplate.checkItemNos = this.dialoguseCheckTemplate.fmedItemNos;
        console.log(this.dialoguseCheckTemplate)
        this.$axios.post("od/postNewCheckApplication", this.dialoguseCheckTemplate).then((res) => {
          console.log(res);
          this.$message("申请成功");
          this.dialoguseCheckTemplateVisible = false;
          //界面出现一行新数据
          //然后再创建这个申请对应的数据
          this.loadingPatientCheckInfo();
        })
      },
      openSaveTempate() {
        //把数据复制过去
        if (this.applicationList.length > 0) {
          this.checkTemplate.zd = this.xiangmuList;
          this.checkTemplate.requirements = this.applicationList[this.radio].checkApplication.requirements;
          this.checkTemplate.outpatientDoctorName = "方聪"//要从登陆信息查询
          this.checkTemplate.departmentName = "方聪的部门"//要从登陆信息查询
          this.$refs.myDialogTemplate.openDiaLog(this.checkTemplate);
        } else {
          this.$message("当前无申请数据")
        }
      },
      addCheckFemdItem(row) {
        if (this.applicationList[this.radio].checkApplication.useState == 1) {
          //获得row,进行添加到applicationList中的list对象中
          let object = {};
          object.itemCode = row.itemcode;
          object.itemName = row.itemname;
          object.itemPrice = row.price;
          //把checKitem中的id设置为检查申请表的id,然后在后台获得，然后再设置为null
          object.id = this.applicationList[this.radio].checkApplication.id;
          var _this = this;
          this.$axios.post("od/postNewCheckItem", object).then((res) => {
            //界面出现一行新数据
            if (_this.applicationList[_this.radio].checkItemList == null)
              _this.applicationList[_this.radio].checkItemList = [];
            object.id = "" + res.checkItemID;//把后台的id传入给vue
            var price = parseInt(this.applicationList[this.radio].checkApplication.price) + parseInt(object.itemPrice);
            this.applicationList[this.radio].checkApplication.price = price;
            _this.applicationList[_this.radio].checkItemList.push(object);
            console.log(object);
            this.$message("添加成功,请注意开立或者暂存");
            _this.xiangmuList = _this.applicationList[this.radio].checkItemList;
          });
        } else {
          if (this.applicationList[this.radio].checkApplication.useState == 2)
            this.$message("该检查申请已经开立！,禁止进行操作")
          if (this.applicationList[this.radio].checkApplication.useState == 3)
            this.$message("该检查申请已作废！,操作失败")
        }
      },
      sureAppliction() {
        if(this.$store.getters.getInspectionPatient.isSeenDocator !=2 ){
          if(this.$store.getters.getInspectionPatient.isSeenDocator == 1)
          this.$message("病人还未确定病历首页")
          if(this.$store.getters.getInspectionPatient.isSeenDocator == 3)
            this.$message("病人已经诊断完毕")
        } else {
          this.checkApplication.registrationInfoNo = this.$store.getters.getInspectionPatient.id;
          this.checkApplication.medicalRecord = this.$store.getters.getInspectionPatient.medicalRecord;
          this.checkApplication.patientName = this.$store.getters.getInspectionPatient.patientName;
          this.checkApplication.checkType = 1;
          this.$axios.post("od/postNewCheckApplication", this.checkApplication).then(res => {
            console.log(res);
            this.$message("申请成功");
            this.dialogApplictionVisible = false;
            //界面出现一行新数据
            this.loadingPatientCheckInfo();
          })
        }
      },
      toSave() {
        //step1 判断选中的行数数据 他的状态
        if (this.applicationList[this.radio].checkApplication.useState == 2)
          this.$message("该检查申请已经开立！,禁止进行操作")
        if (this.applicationList[this.radio].checkApplication.useState == 3)
          this.$message("该检查申请已作废！,操作失败")
        if (this.applicationList[this.radio].checkApplication.useState == 1)
          this.$message("暂存成功");
      },
      //作废申请
      deleteApplication() {
        console.log("作废申请");
        if (this.applicationList[this.radio].checkApplication.useState == 1) {
          this.$axios.put("/od/putCheckApplicationUseStateToDelete", this.applicationList[this.radio].checkApplication.id).then(res => {
            console.log(res);
            this.$message("该申请成功被作废！！");
            this.applicationList[this.radio].checkApplication.useState = 3;
            this.dialogApplictionVisible = false;
            this.loadingPatientCheckInfo();
          });
        } else {
          if (this.applicationList[this.radio].checkApplication.useState == 2)
            this.$message("该检查申请已经开立！,禁止进行操作")
          if (this.applicationList[this.radio].checkApplication.useState == 3)
            this.$message("该检查申请已作废！,操作失败")
        }
      },
      toOK() {
        console.log(this.applicationList[this.radio])
        //1 to 2
        // step1 判断它当前状态是否为1 select
        let _this = this;
        if (this.applicationList[this.radio].checkApplication.useState == 1) {
          this.$axios.put("/od/putCheckApplicationUseStateToOk", this.applicationList[this.radio].checkApplication.id).then(res => {
            console.log(res);
            this.$message("检查申请成功开立！！");
            _this.applicationList[this.radio].checkApplication.useState = 2;
            _this.dialogApplictionVisible = false;
            _this.loadingPatientCheckInfo();
          })
        } else {
          if (this.applicationList[this.radio].checkApplication.useState == 2)
            this.$message("该检查申请已经开立！,禁止进行操作")
          if (this.applicationList[this.radio].checkApplication.useState == 3)
            this.$message("该检查申请已作废！,操作失败")
        }
      },
      tableRowClassName(row) {
        //通过row的 1 暂存 2开立  3 作废
        if (this.applicationList[row.rowIndex].checkApplication.useState == 1)
          return "warning-row";
        if (this.applicationList[row.rowIndex].checkApplication.useState == 2)
          return "success-row";
        if (this.applicationList[row.rowIndex].checkApplication.useState == 3)
          return "warning-row";
      },
      getApplicationXm(row) {
        this.radio = this.applicationList.indexOf(row);
        console.log("点击了" + this.radio)
        console.log(this.applicationList[this.radio])
        this.xiangmuList = this.applicationList[this.radio].checkItemList;
      },
      getXm(row) {
        this.xmradio = this.xiangmuList.indexOf(row);
      },

      addApplication() {
        // this.applicationList.push({})
        this.dialogApplictionVisible = true;
      },
      deleteXm() {
        console.log("执行删除的项目。项目id为：" + this.xiangmuList[this.xmradio].id);
        //对申请的项目进行删除
        //step1. 获得当前选中,从applicationList删除该row
        // 先从数据库中把这个进行删除,判断是否可以进行删除，如果useState==1就可以 2的话是不能进行操作的
        if (this.applicationList[this.radio].checkApplication.useState == 1) {
          var _this = this;
          this.$axios.delete("od/deleteCheckItemByCheckApplicationID", {
            params: {
              checkID: this.applicationList[this.radio].checkApplication.id,
              itemID: this.xiangmuList[this.xmradio].id
            }
          }).then((res) => {
            var price = parseInt(this.applicationList[this.radio].checkApplication.price) - parseInt(this.xiangmuList[this.xmradio].itemPrice);
            this.applicationList[this.radio].checkApplication.price = price;
            this.xiangmuList.splice(this.xmradio, 1);
            this.$message("删除成功");

          });
        } else {
          if (this.applicationList[this.radio].checkApplication.useState == 2)
            this.$message("该检查申请已经开立！,禁止进行操作")
          if (this.applicationList[this.radio].checkApplication.useState == 2)
            this.$message("该检查申请已作废,操作失败")
        }
      },
      addXm() {
        this.xiangmuList.push({})
      },
      showxmdialog() {
        this.dialogTableVisible = true;
      },
      searchItemByName() {
        this.loading = true;
        var _this = this;
        this.$axios.get("/od/getCheckFemdItemByName", {
          params: {
            name: this.searchName
          }
        }).then(res => {
          _this.xiangmuData = res.data.data;
          _this.loading = false;
        })
      },
      loadingPatientCheckInfo() {
        //通过用户的blh,获得用户的所有的申请表信息，通过申请表信息获得所有的项目信息然后并且显示在项目中。
        //首先判断是否有病历号
        var _this = this;
        if (this.$store.getters.getInspectionPatient.medicalRecord == null) {
          this.$message("当前无患者");
        } else {
          console.log("传入的病历号为：" + this.$store.getters.getInspectionPatient.medicalRecord)
          this.$axios.get("/od/getCheckApplicationByblh", {
            params: {
              blh: this.$store.getters.getInspectionPatient.medicalRecord
            }
          }).then(res => {
            // 这里获得的data是一个很复杂的类型数据,需要一层一层进行解析
            _this.applicationList = res.data.data;
            if (_this.applicationList != null) {
              _this.radio = 0;
              _this.xiangmuList = this.applicationList[_this.radio].checkItemList;
              if (this.applicationList[this.radio].herbalApplication.useState != 1) {
                this.radinState = true;
              } else {
                this.radinState = false;
              }
            }
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
        if (this.applicationList[this.radio].checkApplication.useState != 1) {
          this.radinState = true;
        } else {
          this.radinState = false;
        }
      }
    },


    created() {
      //当点击这个vue的时候，那么就应该加载用户的申请信息的了，不然就废蛋了
      this.loadingPatientCheckInfo();
      event.$on("commitPatient", (res) => {
        // 进行下通知，让这个方法进行获得下新的数据
        console.log("执行了哦");
        _this.xiangmuList = null;
        this.loadingPatientCheckInfo();
      });
      //当用户进行检查申请的时候，会触发这个逻辑，使得逻辑能够新增加一条记录
      event.$on("useCheckTemplate", res => {
        //新创建一个申请（申请的名称，申请的
        this.dialoguseCheckTemplateVisible = true;
        this.dialoguseCheckTemplate = res;
        console.log("dialoguseCheckTemplate数据为")
        console.log(res)
      });

    }
  }

</script>

<style>

</style>
