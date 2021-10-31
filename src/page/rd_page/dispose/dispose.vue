<template>
    <div id="app" style="padding-left: 15px;">
        <el-row style="padding-top: 20px;">
            <el-col :span="6">
                <div>
                    <el-row>
                        <el-col :span="6">
                            <div>

                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div>

                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div></div>
                        </el-col>
                        <el-col :span="6">
                            <div></div>
                        </el-col>
                    </el-row>
                    <el-row class="grid-content bg-purple-light">
                        <el-col :span="12">
                            <div style="text-align: left">待处置列表</div>
                        </el-col>
                        <el-col :span="12">
                            <div><a href="JavaScript:void(0)" @click="getPatient">刷新</a></div>
                        </el-col>
                    </el-row>
                    <fieldset>
                        <legend>检索信息</legend>


                        <el-row>
                            <el-col :span="12">
                                <div>病历发票号</div>
                            </el-col>
                            <el-col :span="12">
                                <div>
                                    <el-input v-model="input1" placeholder="请输入内容"></el-input>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <div>患者姓名</div>
                            </el-col>
                            <el-col :span="12">
                                <div>
                                    <el-input v-model="hzxm" placeholder="请输入内容"></el-input>
                                </div>
                            </el-col>
                        </el-row>

                    </fieldset>
                    <fieldset>
                        <legend>本科室的待诊患者</legend>


                        <el-row>
                            <el-col :span="24">
                                <div>
                                    <el-table
                                            :data="waitPatient"
                                            style="width: 100%"
                                            @row-dblclick="getPatientInfo">
                                        <el-table-column
                                                prop="medicalRecord"
                                                label="病历号"
                                                width="100">
                                        </el-table-column>
                                        <el-table-column
                                                prop="patientName"
                                                label="姓名"
                                                width="70">
                                        </el-table-column>
                                        <el-table-column
                                                prop="id"
                                                label="申请号"
                                                width="80">
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </el-col>

                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <div>
                                    <el-pagination
                                            small
                                            layout="prev, pager, next"
                                            :total="50">
                                    </el-pagination>
                                </div>
                            </el-col>
                            <el-col :span="16"></el-col>
                        </el-row>
                    </fieldset>
                </div>
            </el-col>
            <el-col :span="1">
                <hr width="1px"/>
            </el-col>

            <el-col :span="17">
                <div>
                    <el-row>
                        <el-col :span="24">
                            <div></div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple-light"></div>
                        </el-col>
                        <el-col :span="3">
                            <div class="grid-content bg-purple-light"><i class="el-icon-printer"></i> <a
                                    href="JavaScript:void(0)">自动打印</a></div>
                        </el-col>
                        <el-col :span="3">
                            <div class="grid-content bg-purple-light"><i class="el-icon-toilet-paper"></i><a
                                    href="JavaScript:void(0)">补录</a></div>
                        </el-col>
                        <el-col :span="3">
                            <div class="grid-content bg-purple-light"><i class="el-icon-document"></i><a
                                    href="JavaScript:void(0)">发药单打印</a></div>
                        </el-col>
                        <el-col :span="3">
                            <div class="grid-content bg-purple-light"><i class="el-icon-tickets"></i><a
                                    href="JavaScript:void(0)">处方打印</a></div>
                        </el-col>
                    </el-row>
                    <fieldset>
                        <legend>病人信息</legend>


                        <el-row>
                            <el-col :span="2">
                                <div style="text-align: left">病历号</div>
                            </el-col>
                            <el-col :span="4">
                                <div>
                                    <el-input v-model="patientInfoData.medicalRecord"></el-input>
                                </div>
                            </el-col>
                            <el-col :span="3">
                                <div>患者姓名</div>
                            </el-col>
                            <el-col :span="3">
                                <div>
                                    <el-input v-model="patientInfoData.patientName"></el-input>
                                </div>
                            </el-col>
                            <el-col :span="2">
                                <div>
                                    <el-input v-model="patientInfoData.patientSex"></el-input>
                                </div>
                            </el-col>
                            <el-col :span="4">
                                <div>年 龄</div>
                            </el-col>
                            <el-col :span="4">
                                <div>
                                    <el-input v-model="patientInfoData.patientAge"></el-input>
                                </div>
                            </el-col>

                        </el-row>
                        <el-row>
                            <el-col :span="2">
                                <div style="text-align: left">结算类别</div>
                            </el-col>
                            <el-col :span="4">
                                <div>
                                    <el-input v-model="zifei"></el-input>
                                </div>
                            </el-col>
                            <el-col :span="3">
                                <div>就诊科室</div>
                            </el-col>
                            <el-col :span="5">
                                <div>
                                    <el-input v-model="patientInfoData.departmentName"></el-input>
                                </div>
                            </el-col>
                            <el-col :span="4">
                                <div></div>
                            </el-col>
                            <el-col :span="4">
                                <div></div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="2">
                                <div style="text-align: left">收费日期</div>
                            </el-col>
                            <el-col :span="4">
                                <div>
                                    <el-input v-model="patientInfoData.createTime"></el-input>
                                </div>
                            </el-col>
                            <el-col :span="3">
                                <div></div>
                            </el-col>
                            <el-col :span="15">
                                <div></div>
                            </el-col>
                        </el-row>
                    </fieldset>
                    <fieldset>
                        <el-row>
                            <el-col :span="24">
                                <div class="grid-content bg-purple-light" style="text-align: left">项目明细信息</div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <div class="grid-content bg-purple">
                                    <el-table
                                            :data="checkItemData"
                                            border
                                            style="width: 100%">
                                        <!--<el-table-column-->
                                        <!--prop="chufanghao"-->
                                        <!--label=""-->
                                        <!--width="80">-->
                                        <!--</el-table-column>-->
                                        <el-table-column
                                                prop="id"
                                                label="处置项目id"
                                                width="80"
                                                rowspan="2">
                                        </el-table-column>
                                        <el-table-column
                                                prop="itemCode"
                                                label="项目编码">
                                        </el-table-column>
                                        <el-table-column
                                                prop="itemName"
                                                label="项目名称"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="itemHandleState"
                                                label="执行状态"
                                        >
                                            <template slot-scope="scope">
                                                <div v-if="scope.row.itemHandleState == '1'">未登记</div>
                                                <div v-if="scope.row.itemHandleState == '2'">已登记</div>
                                                <div v-if="scope.row.itemHandleState == '3'">已执行</div>
                                            </template>

                                        </el-table-column>

                                        <el-table-column
                                                prop="itemPrice"
                                                label="价格"
                                        >
                                        </el-table-column>

                                        <el-table-column>
                                            <template slot-scope="scope">
                                                <div v-if="scope.row.itemHandleState=='1'">
                                                    <el-button type="primary" @click="dengji(scope.$index)">登记
                                                    </el-button>
                                                </div>
                                                <div v-if="scope.row.itemHandleState!='1'">
                                                    <el-button type="primary" style="background-color: gray"
                                                               disable="true">登记
                                                    </el-button>
                                                </div>
                                            </template>
                                        </el-table-column>


                                        <el-table-column>
                                            <template slot-scope="scope">
                                                <div v-if="scope.row.itemHandleState =='3'">
                                                    <el-button type="primary"  style="background-color: gray" @click="luru(scope.$index)">结果录入</el-button>
                                                </div>
                                                <div v-if="scope.row.itemHandleState !='3'">
                                                    <el-button type="primary" @click="luru(scope.$index)">结果录入</el-button>
                                                </div>
                                            </template>
                                        </el-table-column>


                                    </el-table>
                                </div>
                            </el-col>
                        </el-row>
                    </fieldset>
                </div>
            </el-col>
        </el-row>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible0"
                width="30%"
                :before-close="handleClose">
            <span>登记成功</span>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible0 = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible0 = false">确 定</el-button>
  </span>
        </el-dialog>

        <el-dialog title="结果录入" :visible.sync="dialogFormVisible">
            <el-form ref="form" :model="addform" label-width="80px">

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="患者名称">
                            <el-input v-model="addform.patientName"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="项目名称">
                            <el-input v-model="addform.checkItemName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="处置结果">
                            <el-input   type="textarea" v-model="addform.checkResult"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>


                <el-form-item label="处置照片">
                    <el-upload
                            action="#"
                            :file-list="fileList"
                            :multiple="true"
                            :on-change="handleChange"
                            list-type="picture-card"
                            :before-upload="beforeupload"
                            :on-preview="handlePictureCardPreview"
                    >
                        <i class="el-icon-plus"></i>
                    </el-upload>

                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>

                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitUpload">立即添加</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import myHeader from '../../../component/rd_component/Header'
    import mySidebar from '../../../component/rd_component/Sidebar'

    export default {

        data() {


            return {
                fileList:[],
                nowapplication: '', //这个可以 在双击申请号列表以后得到当前的项目申请号id
                //yiji1
                zifei: '自费',
                msg: 'Welcome to Your Vue.js App',
                hzxm: '',
                input1: '',
                dialogVisible0: false,
                dialogFormVisible: false,
                patientInfoData: {
                    //明细信息
                    medicalRecord: '',
                    patientName: '',
                    patientSex: '',
                    patientAge: '',
                    departmentName: '',
                    createTime: '',

                },
                //图片formData表单
                uploadForm: new FormData(),

                //日期选择器

                radio: 3,
                waitPatient: [],
                //yiji2

                checkItemData: [],
                addform: {
                    id: '',
                    registrationInfoNo: '',
                    medicalRecord: '',
                    checkApplicationNo: '',
                    requirements: '',
                    checkItemNo: '',
                    checkItemName: '',
                    patientName: '',
                    departmentName: '',
                    outpatientDoctorName: '',
                    medicalDoctorNo: '',
                    medicalDoctorName: '',
                    checkResultcheckResultImgs: '',
                    createTime: '',
                    state: '',
                    checkResult:""
                },
                dialogImageUrl: '',
                dialogVisible: false
            }
        },
        methods: {
            //图片的方法
            beforeupload(file) {
                this.uploadForm.append('file', file);
                return false;
            },
            handleChange(file, fileList) {
                this.fileList = fileList.slice(-3);
            },
            //图片的方
            clearUpload() {
                this.uploadForm = new FormData();
            },
            //提交录入结果
            submitUpload() {
                //把结果给录进去
                this.addform.medicalDoctorNo = "3";
                this.addform.medicalDoctorName = "一整";
                this.addform.state = "1";
                let checkResult =[
                    this.addform.registrationInfoNo,this.addform.medicalRecord,this.addform.checkApplicationNo,this.addform.requirements,
                    this.addform.checkItemNo,this.addform.checkItemName,this.addform.patientName,this.addform.departmentName,this.addform.outpatientDoctorName,
                    this.addform.medicalDoctorNo,this.addform.medicalDoctorName,this.addform.checkResult
                ];
                this.uploadForm.append('checkApplicationNo',checkResult);

                let data = this.uploadForm;
                console.log(this.addform);

                this.$axios({
                    url: '/yj/postImg',
                    method: "post",
                    data: this.uploadForm,
                    headers: {
                        a: 'file'
                    },
                    processData: false,//必写
                    contentType: false,//必写
                    success: function (rs) {
                        this.clearUpload();


                    }
                });
                this.clearUpload();
                this.$message("导入成功!");
                this.dialogFormVisible = false;
            },



            dengji(index) {
                this.dialogVisible0 = true;

                this.$put("/dispose/putItemHandleState", this.checkItemData[index].id).then((res) => {

                })
            },
            luru(index) {
                if(this.checkItemData[index].itemHandleState == "3"){
                    this.$message("已录入")
                } else if(this.checkItemData[index].itemHandleState == "2") {
                    this.dialogFormVisible = true;
                    this.addform.medicalRecord = this.patientInfoData.medicalRecord;
                    this.addform.patientName = this.patientInfoData.patientName;
                    this.addform.departmentName = this.patientInfoData.departmentName;
                    this.addform.checkItemNo = this.checkItemData[index].id;
                    this.addform.checkItemName = this.checkItemData[index].itemName;
                    this.addform.registrationInfoNo = this.nowapplication.registrationInfoNo;
                    this.addform.requirements = this.nowapplication.requirements;
                    this.addform.checkApplicationNo = this.nowapplication.id;
                    this.addform.outpatientDoctorName = this.nowapplication.outpatientDoctorName;
                }else if(this.checkItemData[index].itemHandleState == "1"){
                    this.$message("未登记")
                }

            },

            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            },

            arraySpanMethod({row, column, rowIndex, columnIndex}) {
                if (rowIndex % 2 === 0) {
                    if (columnIndex === 0) {
                        return [1, 2];
                    } else if (columnIndex === 1) {
                        return [0, 0];
                    }
                }
            },

            objectSpanMethod({row, column, rowIndex, columnIndex}) {
                if (columnIndex === 0) {

                    if (rowIndex % 100 === 0) {
                        return {
                            rowspan: 100,
                            colspan: 1
                        };
                    } else {
                        return {
                            rowspan: 0,
                            colspan: 0
                        };
                    }

                }
                // if (columnIndex === 1) {
                //
                //   if (rowIndex % 100 === 0 ) {
                //     return {
                //       rowspan: 100,
                //       colspan: 1
                //     };
                //   }
                //   else {
                //     return {
                //       rowspan: 0,
                //       colspan: 0
                //     };
                //   }
                //
                // }
            },
            getWaitYjPatient() {
                this.$fetch("/dispose/getWaitYjPatient").then((res) => {
                    this.waitPatient = res.data;
                })
            },
            getPatientInfo(row) {
                this.nowapplication = row;
                this.$fetch("/dispose/getPatientSexAndAge", {blh: row.medicalRecord}).then((res) => {
                    this.patientInfoData.patientSex = res.data.patientSex;
                    this.patientInfoData.patientAge = res.data.patientAge;
                });
                this.$fetch("/dispose/getPatientOtherInfo", {id: row.id}).then((res) => {
                    this.patientInfoData.medicalRecord = res.data.medicalRecord;
                    this.patientInfoData.patientName = res.data.patientName;
                    this.patientInfoData.departmentName = res.data.departmentName;
                    this.patientInfoData.createTime = res.data.createTime;
                });
                this.$fetch("/dispose/getCheckItem", {id: row.id}).then((res) => {
                    console.log("开始getcheck");
                    console.log(res.data);
                    this.checkItemData = res.data;
                })

            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            postCheckResult() {
                this.$post("/dispose/postCheckResult", this.addform).then(res => {
                    console.log(this.addform)
                    alert("添加成功")
                })

            },
            getPatient() {
                console.log(":" + this.input1 + ":")
                console.log(this.hzxm)
                if (this.input1 != "") {
                    console.log(this.input1)
                    this.$fetch("/dispose/getWaitFyPatientById", {medicalRecord: this.input1}).then((res) => {
                        this.waitPatient = res.data;
                        alert("搜索成功")
                    })
                } else if (this.hzxm != "") {
                    console.log(this.hzxm);
                    this.$fetch("/dispose/getWaitFyPatientByName", {patientName: this.hzxm}).then((res) => {
                        this.waitPatient = res.data;
                        alert("搜索成功")
                    })
                }

            }


        },
        created() {
            this.getWaitYjPatient();


        }
    };


</script>

<style>
    .el-row {
        margin-bottom: 20px;

    &
    :last-child {
        margin-bottom: 0;
    }

    }
    .el-col {
        border-radius: 4px;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }

    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }

</style>
