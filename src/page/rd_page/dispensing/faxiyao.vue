<template>
    <div id="app" style="padding-left: 15px;">
        <el-row style="padding-top: 20px;">
            <el-col :span="6">
                <div>
                    <el-row>
                        <el-col :span="6"><div>

                        </div></el-col>
                        <el-col :span="6"><div >

                        </div></el-col>
                        <el-col :span="6"><div></div></el-col>
                        <el-col :span="6"><div ></div></el-col>
                    </el-row>
                    <el-row class="grid-content bg-purple-light">
                        <el-col :span="12" > <div  style="text-align: left">待发西药列表</div></el-col>
                        <el-col :span="12"> <div><a href="JavaScript:void(0)" @click="getWaitFyPatientById">刷新</a></div></el-col>

                    </el-row>
                    <fieldset>
                        <legend>检索信息</legend>
                        <el-row>
                            <el-col :span="12"><div>
                                发药药房
                            </div></el-col>

                            <el-col :span="12"><div>
                                <el-select v-model="value" placeholder="请选择">
                                    <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </div></el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="12"><div >病历发票号</div></el-col>
                            <el-col :span="12"><div><el-input v-model="input1" placeholder="请输入内容"></el-input></div></el-col>

                        </el-row>
                        <el-row>
                        </el-row>
                        <el-row>
                            <el-col :span="24"><div>

                            </div></el-col>

                        </el-row>
                    </fieldset>
                    <fieldset>
                        <legend>发药列表</legend>



                        <el-row>
                            <el-col :span="24">
                                <div>
                                    <el-table
                                            :data="tableData"
                                            style="width: 100%"
                                            @row-dblclick="getMenZhenFaYaoDan"
                                    >
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
                                        <!--<el-table-column-->

                                        <!--&lt;!&ndash;label="查看"&ndash;&gt;-->
                                        <!--&lt;!&ndash;width="110">&ndash;&gt;-->



                                        <!---->
                                        <!--</el-table-column>-->
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
                <hr width="1px" />
            </el-col>

            <el-col :span="17">
                <div>
                    <el-row>
                        <el-col :span="24"><div></div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12"><div class="grid-content bg-purple-light">发药明细信息</div></el-col>
                        <el-col :span="3"><div class="grid-content bg-purple-light"><i class="el-icon-printer"></i> <a href="JavaScript:void(0)">自动打印</a> </div></el-col>
                        <el-col :span="3"><div class="grid-content bg-purple-light"> <i class="el-icon-toilet-paper"></i><a href="JavaScript:void(0)" @click="putDistState">发药</a></div></el-col>
                        <el-col :span="3"><div class="grid-content bg-purple-light"> <i class="el-icon-document"></i><a href="JavaScript:void(0)">发药单打印</a></div></el-col>
                        <el-col :span="3"><div class="grid-content bg-purple-light"> <i class="el-icon-tickets"></i><a href="JavaScript:void(0)">处方打印</a></div></el-col>
                    </el-row>
                    <fieldset >
                        <!--这里显示病人信息-->
                        <legend>门诊发药单（未打印）</legend>
                        <el-row>
                            <el-col :span="3"><div style="text-align: left">病历号</div></el-col>
                            <el-col :span="3"><div><el-input  v-model="addform.medicalRecord"></el-input></div></el-col>
                            <el-col :span="3"><div>患者姓名</div></el-col>
                            <el-col :span="3"><div><el-input :disabled="true" v-model="addform.patientName"></el-input></div></el-col>
                            <el-col :span="3"><div>性别</div></el-col>
                            <el-col :span="3"><div><el-input :disabled="true" v-model="addform.patientSex"></el-input></div></el-col>
                            <el-col :span="3"><div >年  龄</div></el-col>
                            <el-col :span="3"><div><el-input :disabled="true" v-model="addform.patientAge"></el-input></div></el-col>

                        </el-row>
                        <el-row>
                            <el-col :span="2"><div  style="text-align: left">结算类别</div></el-col>
                            <el-col :span="4"><div><el-input value="自费"></el-input></div></el-col>
                            <el-col :span="3"><div>就诊科室</div></el-col>
                            <el-col :span="5"><div><el-input :disabled="true" v-model="addform.departmentName"></el-input></div></el-col>
                            <el-col :span="4"><div>处方状态</div></el-col>
                            <el-col :span="4"><div><el-input :disabled="true" v-model="addform.state"></el-input></div></el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="2"><div style="text-align: left">收费日期</div></el-col>
                            <el-col :span="4"><div><el-input el-input :disabled="true" v-model="addform.createTime"></el-input></div></el-col>
                            <el-col :span="3"><div>

                            </div></el-col><el-col :span="15"><div></div></el-col>
                        </el-row>
                    </fieldset>
                    <el-row>
                        <el-col :span="24"><div class="grid-content bg-purple-light" style="text-align: left">发药明细信息</div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24"><div class="grid-content bg-purple">
                            <el-table
                                    :data="drugsData"


                                    border
                                    style="width: 100%">
                                <el-table-column
                                        prop="id"
                                        label="处方号"
                                        width="80">
                                </el-table-column>
                                <el-table-column
                                        prop="outpatientDoctorName"
                                        label="开单医生"
                                        width="80"
                                        rowspan="2">
                                </el-table-column>
                                <el-table-column
                                        prop="drugsName"
                                        label="药品名称">
                                </el-table-column>
                                <el-table-column
                                        prop="drugsFormat"
                                        label="规格"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="drugsUsage"
                                        label="处方用法"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="drugsDosage"
                                        label="处方用量"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="drugsNum"
                                        label="数量"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="drugsPrice"
                                        label="药品单价"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="userWarns"
                                        label="门诊医生叮嘱"
                                >
                                </el-table-column>

                            </el-table>
                        </div></el-col>
                    </el-row>

                </div>
            </el-col>

        </el-row>


    </div>
</template>
<!--导入HelloWorld.vue-->
<script>

    export default {

        data() {
            return {
                //zujian
                nowcfh:'',//用于存放当前的处方号
                input:'',
                input1:'',

                //选择框


                //日期选择器
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
                value1: '',
                value2: '',
                radio: 3,
                tableData: [
                    //   {
                    //     binglihao: '0000000062',
                    //     name: '红丽',
                    //     fapiaohao: '80100011249'
                    // }, {
                    //   binglihao: '0000000061',
                    //   name: '姜莉莉',
                    //   fapiaohao: '80100011248'
                    // }
                ],
                //zujian1\
                medicalRecord:'',
                form:{
                },
                addform:{
                    medicalRecord:'',
                    patientName:'',
                    patientAge:'',
                    patientSex:'',
                    departmentName:'',
                    state:'',
                    createTime:'',
                },
                options: [{
                    value: '选项1',
                    label: '男'
                }, {
                    value: '选项2',
                    label: '女'
                }],
                value: '',
                drugsData: [
                ]
            }
        },
        methods: {
            //zujian
            getFayaolist(){
                var _this = this;
                //url , data
                this.$fetch("/md/getWaitFyPatient").then(function (res) {
                    // console.log(res);
                    // console.log(res.data);
                    _this.tableData = res.data;
                })
            },


            getMenZhenFaYaoDan(row){
                var _this = this;
                console.log(row.medicalRecord);
                this.$fetch("/md/getPatientAgeAndSex",{ blh:row.medicalRecord}).then(res =>{
                    _this.addform.patientAge= res.data.patientAge;
                    _this.addform.patientSex= res.data.patientSex;
                })

                this.$fetch("/md/getPatientOtherInfo",{blh:row.medicalRecord}).then(res =>{
                    _this.addform.medicalRecord=res.data.medicalRecord;
                    _this.addform.patientName=res.data.patientName;
                    _this.addform.departmentName=res.data.departmentName;
                    _this.addform.state=res.data.state;
                    _this.addform.createTime=res.data.createTime;

                })
                this.$fetch("/md/getDrugs",{blh:row.medicalRecord}).then(res =>{
                    _this.drugsData=res.data;
                    this.$fetch("/md/getDrugsDetail",{cfh:row.id}).then(res =>{
                        _this.drugsData=res.data;

                    })

                })
                this.nowcfh=row.id;
            },
            getWaitFyPatientById(){
                var _this = this;
                //url , data
                this.$fetch("/md/getWaitFyPatientById",{medicalRecord:this.input1}).then((res)=> {
                    // console.log(res);
                    console.log(res);
                    _this.tableData = res.data;
                })
            },
            putDistState(){
                console.log(this.nowcfh);
                this.$put("/md/putDistState",this.nowcfh).then((res)=>{
                    alert("发药成功")
                });
            },


            //zujian1

            arraySpanMethod({ row, column, rowIndex, columnIndex }) {
                if (rowIndex % 2 === 0) {
                    if (columnIndex === 0) {
                        return [1, 2];
                    } else if (columnIndex === 1) {
                        return [0, 0];
                    }
                }
            },
            objectSpanMethod({ row, column, rowIndex, columnIndex }) {
                if (columnIndex === 0) {

                    if (rowIndex % 100 === 0 ) {
                        return {
                            rowspan: 100,
                            colspan: 1
                        };
                    }
                    else {
                        return {
                            rowspan: 0,
                            colspan: 0
                        };
                    }

                }
                if (columnIndex === 1) {

                    if (rowIndex % 100 === 0 ) {
                        return {
                            rowspan: 100,
                            colspan: 1
                        };
                    }
                    else {
                        return {
                            rowspan: 0,
                            colspan: 0
                        };
                    }

                }
            }

        },
        created(){
            this.getFayaolist();

            //this.getbingrenxinxi();
        }
    };
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
