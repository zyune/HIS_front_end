<template>
  <div>
    <el-row style="background-color: #e9f0f4;padding-top: 5px;padding-bottom: 5px;">
      <el-col :span="6" style="color: #3d7507">门（急）诊病历信息</el-col>
      <el-col :span="8"> &nbsp; </el-col>
      <el-col :span="2"><a href="javascript:void(0)"  @click="clear" :class="[mrpState?'abuttonDisable':'']"  ><i class="el-icon-refresh-right"></i>清屏</a></el-col>
      <el-col :span="2"><a href="javascript:void(0)" @click="putTheRecode(1)" :class="[mrpState?'abuttonDisable':'']" ><i class="el-icon-s-order"></i>暂存</a></el-col>
      <el-col :span="2"><a href="javascript:void(0)" @click="putRecodeEnd" :class="[mrpState?'abuttonDisable':'']" ><i class="el-icon-upload2" ></i>提交</a></el-col>
      <el-col :span="4"><a href="javascript:void(0)" @click="dialogSaveTempate = true"><i class="el-icon-s-claim"></i>存为模板</a></el-col>

      <el-dialog title="保存为模板" :visible.sync="dialogSaveTempate">
        <el-form >
          <el-form-item label="模板名称" >
            <el-input v-model="tempalet_name" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="模板适用范围" >
            <el-select  v-model="selectValue" placeholder="请选择模板适用范围">
              <el-option
                      v-for="item in tempaletType" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogSaveTempate = false">取 消</el-button>
          <el-button type="primary" @click="saveTempate">确 定</el-button>
        </div>
      </el-dialog>
    </el-row>
    <el-row>
      <form>
        <fieldset>
          <legend>病历内容</legend>
          <el-row>
            <el-col :span="4">主诉:</el-col>
            <el-col :span="18"> <el-input v-model="mrp.chiefComplaint" :disabled="mrpState"></el-input></el-col>
          </el-row>
          <br>
          <el-row>
            <el-col :span="4">现病史:</el-col>
            <el-col :span="18"> <el-input type="textarea" :disabled="mrpState" v-model="mrp.historyPresentIllness"></el-input>
            </el-col>
          </el-row>
          <br>
          <el-row>
            <el-col :span="4">既往史:</el-col>
            <el-col :span="18"><el-input type="textarea" :disabled="mrpState" v-model="mrp.historyIllness"></el-input>
            </el-col>
          </el-row>
          <br>
        </fieldset>

        <fieldset>
          <legend>检查及结果</legend>
          <el-row>
            <el-col :span="4">体格检查:</el-col>
            <el-col :span="18"><el-input type="textarea" :disabled="mrpState" v-model="mrp.healthExamine"></el-input>
            </el-col>

          </el-row>
          <br>
          <el-row>
            <el-col :span="4">辅助检查:</el-col>
            <el-col :span="18"><el-input type="textarea" :disabled="mrpState" v-model="mrp.assistExamine"></el-input>
            </el-col>
          </el-row>
          <br>
        </fieldset>

        <fieldset>
          <legend>评估/诊断</legend>
          <el-row>
            <el-col :span="22">
              <!--加载一个table，进行显示c数据，并且在table中使用delete图标进行删除数据-->
              <el-table :data="zd" style="width: 100%">
                <!--组件实例的作用域是孤立的。这意味着不能(也不应该)在子组件的模板内直接引用父组件的数据。-->
                <!--要让子组件使用父组件的数据，我们需要通过子组件的props选项。-->
                <el-table-column prop="icd" label="ICD编码" width="180"></el-table-column>
                <el-table-column prop="diseaseName" label="*名称" width="160"></el-table-column>

                <el-table-column label="主/辅" width="80">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.isMain" :disabled="mrpState">
                      <el-option
                              v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>

                <el-table-column label="发病时间"  width="200">
                  <template slot-scope="scope">
                    <div class="block">
                      <el-date-picker v-model="scope.row.onsetDate" :disabled="mrpState"
                                      align="right"
                                      type="date"
                                      placeholder="选择日期"
                                      :picker-options="pickerOptions">
                      </el-date-picker>
                    </div>
                  </template>
                </el-table-column>


              </el-table>
            </el-col>
            <el-col :span="2">
              <el-row>
                <el-dialog title="诊断查询" :visible.sync="dialogTableVisible">
                  <el-row>
                    <el-col :span="12">
                      <el-form :model="searchData">
                        <el-form-item label="按CODE查询诊断">
                          <el-input v-model="searchData.byIcd" autocomplete="true" style="width: 180px"></el-input>
                        </el-form-item>

                        <el-form-item label="按名称查询诊断" >
                          <el-input v-model="searchData.byName" autocomplete="off" style="width: 180px"></el-input>
                        </el-form-item>

                        <el-button type="primary" @click="searchICD">确 定 查 询</el-button>
                      </el-form>
                    </el-col>
                    <el-col :span="12">
                      <el-table :data="gridData"  v-loading="loading"  @row-dblclick="addDisease" >
                        <el-table-column property="diseaseCode" label="code" width="150"></el-table-column>
                        <el-table-column property="diseaseName" label="name" width="200"></el-table-column>
                      </el-table>
                    </el-col>
                  </el-row>
                </el-dialog>
                <i class="el-icon-circle-plus" @click="dialogTableVisible = true" :class="[mrpState?'abuttonDisable':'']"></i>
              </el-row>
              <el-row>
                <i class="el-icon-remove" :class="[mrpState?'abuttonDisable':'']"></i>
              </el-row>
            </el-col>
          </el-row>
        </fieldset>
      </form>
    </el-row>
    <el-row  style="margin-top: 40px;">

    </el-row>


  </div>
</template>

<script>

  import event from "../../../config/eventJS"

  export default {
    name: "rightViewCenter",
    data() {

      return {
        abuttonDisable:{

        },
        mrpState:false,
        selectValue: "",
        tempalet_name: "",
        dialogSaveTempate: false,
        tempaletType: [{
          value: '1',
          label: '全院'
        }, {
          value: '2',
          label: '本科室'
        }, {
          value: '3',
          label: '个人'
        }],
        options: [{
          value: '1',
          label: '主'
        }, {
          value: '2',
          label: '副'
        }],
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        mrp: {},
        searchData: {
          byIcd: "",
          byName: ""
        },
        gridData: {
          diseaseCode: "",
          diseaseName: ""
        },
        zd: [],
        loading: false,
        dialogTableVisible: false,
      }
    },
    methods: {
      clear() {
        this.mrp = {};
      },
      searchICD() {
        //显示加入药品的model
        var _this = this;
        this.loading = true;

        this.$axios.get('/od/getDisease', {
          params: {
            "code": this.searchData.byIcd,
            "name": this.searchData.byName
          }
        }).then(res => {
          console.log(res);
          if (res.data == null || res.data.size == 0) {
            _this.$message('查询无数据');
          } else {
            _this.gridData = res.data.data;
            _this.loading = false;
          }
        })
      },
      //单击
      addDisease(row) {
        this.$message("添加成功");
        console.log("哈哈哈哈，为什么会出现问题呢");
        console.log(row);
        if(this.zd == null)
          this.zd = [{
            icd: row.diseaseIcd,
            diseaseName: row.diseaseName
          }]
        else
        this.zd.push({
          icd: row.diseaseIcd,
          diseaseName: row.diseaseName
        });

      },
      putRecodeEnd(){
        if (this.$store.getters.getInspectionPatient.medicalRecord == null) {
          this.$message("当前无有患者");
        } else {
          this.mrp.registrationInfo = this.$store.getters.getInspectionPatient.id;
          this.mrp.patientName = this.$store.getters.getInspectionPatient.patientName;
          this.mrp.medicalRecord = this.$store.getters.getInspectionPatient.medicalRecord;
          this.mrp.outpatientDoctorNo = this.$store.getters.getInspectionPatient.outpatientDoctorNo;
          if(this.zd == null){
           this.$message("提交，初步诊断不能为空")
          }else {
            let acceptMRPandList = {}
            acceptMRPandList.mrp = this.mrp;
            acceptMRPandList.diagnosis = this.zd;
            this.$axios.put("/od/PutMedicalRecordPageEnd",acceptMRPandList).then((res) => {
              console.log(res);
              this.$message("提交成功");
              this.$store.getters.getInspectionPatient.isSeenDocator = 2
              //当状态更换之后，都要进行调用
              this.getMRP()
            })
          }
        }
      },
      putTheRecode(state) {
        //put 暂存或者提交都使用这个
        //首先判断是否有病历号
        var _this = this;
        if (this.$store.getters.getInspectionPatient.medicalRecord == null) {
          this.$message("当前无有患者");
        } else {
          this.mrp.registrationInfo = this.$store.getters.getInspectionPatient.id;
          this.mrp.patientName = this.$store.getters.getInspectionPatient.patientName;
          this.mrp.medicalRecord = this.$store.getters.getInspectionPatient.medicalRecord;
          this.mrp.outpatientDoctorNo = this.$store.getters.getInspectionPatient.outpatientDoctorNo;
          this.mrp.state = state;
          let acceptMRPandList = {}
          acceptMRPandList.mrp = this.mrp;
          acceptMRPandList.diagnosis = this.zd;
          this.$axios.put("/od/PutMedicalRecordPage", acceptMRPandList).then((res) => {
            console.log(res);
            if(state == 1)
               this.$message("暂存成功");
            else
              this.$message("提交成功");
            //当状态更换之后，都要进行调用
            this.getMRP()
          })

        }
      },
      getMRP(){
        this.$axios.get('/od/getMRPandListbyMedicalRecord', {
          params: {
            "blh": this.$store.getters.getInspectionPatient.medicalRecord
          }
        }).then((res)  => {
          if(res.data.data != null) {
            this.mrp = res.data.data.mrp;
            this.zd = res.data.data.diagnosiList;
          } else {
            this.mrp = {};
            this.zd = [];
          }
        });
      },
      stateOperation(){
        //如果该病人是已经结束看诊的话，那么就不能对数据进行操作，如果数据是已经提交的话也不能，只有数据是暂存的
        // 需要在created中先执行mrp,先获得该患者对应的门诊记录
        if(this.mrp != null && this.mrp.state == 2){
          //说明this.mrp == null这个病人还未具有门诊病历，因此可以进行申请
          //不能进行操作
        } else {

        }


      },
      saveTempate() {
        //保存为模板
        //step1 获得数据
        //step2 调用接口
        this.mrp.templateName = this.tempalet_name;
        this.mrp.state = this.selectValue;
        this.$axios.post("/od/postMRPTemplate", {
          "mrp": this.mrp,
          "list": this.zd
        }).then(res => {
          console.log(res);
          $message("保存为模板成功");
        })
      }
    },
    created() {
      var _this = this;
      event.$on("useTemplate",res => {
        if(this.mrpState == true)
          this.$message("患者门诊病历已经提交禁止修改");
        else
        _this.mrp = res;
      });
      //然后设置
      this.getMRP();
      //如果进行
      event.$on("commitPatient",res =>{
        this.getMRP();
      })

    },
    computed: {
      //这里的一个业务需求就是当，user进行改变的时候，判断user的mrp的state用来修改样式
      mrpStateCss() {
        return this.mrp.state;//当这个数据进行改变的时候就会返回这个这个方法，然后监听这个方法即可
      }
    },
    watch:{
      mrpStateCss:function(old,newd){
        console.log("newd的数据为：");
        console.log(this.mrp.state);
        //1表示是暂存的，2表示是完成提交的，当2进行完成提交之后那么就不应该容许操作界面了
        if(this.mrp.state == "2"){
          this.mrpState = true;
        } else {
          this.mrpState = false;
        }
      }
    }
  }
</script>

<style scoped>

</style>
