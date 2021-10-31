<template>
<div >
  <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item>
					<el-input  placeholder="按姓名查询排班规则" v-model="odName"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="findSCheduruleByOdname">查询</el-button>
				</el-form-item>
        <el-form-item label="开始时间">
           <el-date-picker    :picker-options="startOptions" v-model="startDate" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
           <el-date-picker :picker-options="endOptions" v-model="endDate" type="date"  @blur="blurEndDate" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
					<el-button type="primary" @click="getCheckTableInfo" >生成排班计划</el-button>
				</el-form-item>
		  </el-form>
		</el-col>


    <template>
      <div class="titlediv">
       <span class="TableTitle">医生排班规则信息维护</span>
      </div>
      <!-- .slice((currpage - 1) * pagesize, currpage * pagesize) -->
       <el-table  :data="schedulruleList.slice((currpage - 1) * pagesize, currpage * pagesize)"
                  tooltip-effect="dark" style="width: 100%"
                  ref="multipleTable"
                 @selection-change="handleSelectionChange" >
           <el-table-column align="center" type="selection" :selectable="selectable" width="30"> </el-table-column>
           <el-table-column align="center" prop="week" label="星期" width="100">  </el-table-column>
            <el-table-column align="center" prop="odName" label="排班医生"> </el-table-column>
           <el-table-column align="center" prop="departmentName" label="科室" width="100"></el-table-column>
           <el-table-column align="center" prop="quota"  label="排班限额"> </el-table-column>
           <el-table-column align="center" prop="levelType"  label="号别">
              <template slot-scope="scope">
               <div v-if="scope.row.levelType==1">普通号</div>
               <div v-if="scope.row.levelType==2">专家号</div>
               <div v-if="scope.row.levelType==3">急诊号</div>
              </template>
           </el-table-column>
            <el-table-column align="center" prop="state"  label="有效状态">
              <template slot-scope="scope">
               <div v-if="scope.row.state==1">有效</div>
               <div v-if="scope.row.state==2">无效</div>
              </template>
           </el-table-column>
           <el-table-column align="center" prop="day" label="午别">
             <template slot-scope="scope" >
                <div v-if="scope.row.day==1">上午</div>
                <div v-if="scope.row.day==2">下午</div>
                <div v-if="scope.row.day==3">全天</div>
             </template>
           </el-table-column>
           <el-table-column align="center" prop="createAdminName"  label="操作员">  </el-table-column>
           <el-table-column align="center" prop="createTime"  label="操作时间" width="140" >
             <template slot-scope="scope" >
               {{scope.row.createTime | dateTimeForm}}
             </template>
           </el-table-column>
           <el-table-column label="操作" align="center" width="160">
			         <template slot-scope="scope" >
					         <el-button size="small" @click="getTableinfor(scope.row)" >编辑</el-button>
					            <el-button type="danger" size="small"  @click="delSchedulrule(scope.row)">删除</el-button>
			 	           </template>
		     	</el-table-column>
        </el-table>
        <div style="text-align: center;margin-top: 30px;">
                    <el-pagination background
                        layout="prev, pager, next, sizes, total, jumper"
                        :page-sizes="[5, 10, 15, 20]"
                        :page-size="pagesize"
                        :total="schedulruleList.length"
                        @current-change="handleCurrentChange"
                        @size-change="handleSizeChange" >
                    </el-pagination>
        </div>

     </template>



    <!-- 修改排班规则界面 -->
          <template>
        <el-dialog title="修改排班规则"  :visible.sync="outerVisible1" >
          <el-row>
              <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
              <el-col :span="10">
                  <div class="grid-content bg-purple">
                     <el-form  label-width="100px">
                         <el-form-item  label="星期:" >
					               <el-select v-model="editschedulruleList.week" placeholder="请选择">
                              <el-option
                                v-for="weekdayOptions in weekdayOptions"
                                :key="weekdayOptions.value"
                                :label="weekdayOptions.label"
                                :value="weekdayOptions.value">
                              </el-option>
                            </el-select>
				         </el-form-item>
                     </el-form>
                  </div>
                </el-col>
               <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
                <el-col :span="10">
                 <div class="grid-content bg-purple">
                    <el-form  label-width="100px">
                       <el-form-item label="科室:">
					                <el-input  auto-complete="off" v-model="editschedulruleList.departmentName" ></el-input>
				               </el-form-item>
                   </el-form>
                 </div>
              </el-col>
          </el-row>

          <el-row>
               <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
               <el-col :span="10">
                 <div class="grid-content bg-purple">
                    <el-form  label-width="100px">
                        <el-form-item label="排班医生:" >
					            <el-input  auto-complete="off" v-model="editschedulruleList.odName" ></el-input>
				            </el-form-item>
                   </el-form>
                 </div>
               </el-col>
              <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
               <el-col :span="10">
              <div class="grid-content bg-purple">
                    <el-form  label-width="100px">
                       <el-form-item label="号别:">
                         <el-select v-model="editschedulruleList.levelType" placeholder="请选择">
                                        <el-option
                                          v-for="leveltypeOptions in leveltypeOptions"
                                          :key="leveltypeOptions.value"
                                          :label="leveltypeOptions.levelName"
                                          :value="leveltypeOptions.value">
                                        </el-option>
                            </el-select>
                        <!--  <el-select v-model="editschedulruleList.levelType" >
                                        <el-option
                                          v-for="leveltypeOptions in leveltypeOptions"
                                          :key="leveltypeOptions.value"
                                          :label="leveltypeOptions.levelName"
                                          :value="leveltypeOptions.value">
                                        </el-option>
                                      </el-select> -->
				           </el-form-item>
                   </el-form>
              </div>
           </el-col>
          </el-row>
          <el-row>
              <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
          <el-col :span="10">
              <div class="grid-content bg-purple">
                    <el-form  label-width="100px">
                        <el-form-item label="有效状态:" >
                            <el-select v-model="editschedulruleList.state" >
                                        <el-option
                                          v-for="stateOptions in stateOptions"
                                          :key="stateOptions.value"
                                          :label="stateOptions.label"
                                          :value="stateOptions.value">
                                        </el-option>
                            </el-select>
				    </el-form-item>
                   </el-form>
              </div>
           </el-col>
           <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
           <el-col :span="10">
              <div class="grid-content bg-purple">
                    <el-form  label-width="100px">
                       <el-form-item label="午别:">
                           <el-select v-model="editschedulruleList.day" >
                                        <el-option
                                          v-for="dayOptions in dayOptions"
                                          :key="dayOptions.value"
                                          :label="dayOptions.label"
                                          :value="dayOptions.value">
                                        </el-option>
                            </el-select>
				       </el-form-item>
                   </el-form>
              </div>
           </el-col>
          </el-row>
          <el-row>
              <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
          <el-col :span="10">
              <div class="grid-content bg-purple">
                    <el-form  label-width="100px">
                        <el-form-item label="排班限额:" >
					   <el-input  auto-complete="off" v-model="editschedulruleList.quota" ></el-input>
				    </el-form-item>
                   </el-form>
              </div>
           </el-col>
           <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
           <el-col :span="10">
              <div class="grid-content bg-purple">
                    <el-form  label-width="100px">
                       <el-form-item label="操作员:">
					     <el-input  auto-complete="off" v-model="editschedulruleList.createAdminName"  ></el-input>
				       </el-form-item>
                   </el-form>
              </div>
           </el-col>
          </el-row>
          <el-row>
              <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
          <el-col :span="10">
              <div class="grid-content bg-purple">
                    <el-form  label-width="100px">
                        <el-form-item label="操作时间:" >
					   <el-input  auto-complete="off" v-model="editschedulruleList.createTime" ></el-input>
				    </el-form-item>
                   </el-form>
              </div>
           </el-col>
          </el-row>
              <div slot="footer" class="dialog-footer">
                   <el-button @click="canleEdit" >取 消</el-button>
                   <el-button type="primary"  @click="updataSchedulrule">提交</el-button>
              </div>
       </el-dialog>
     </template>

     <!-- 生成排班信息的界面 -->

    <template>
      <el-dialog title="排班信息"  :visible.sync="outerVisible3" >
       <el-table   :data="userPersonListData" tooltip-effect="dark" style="width: 100%">
           <el-table-column align="center" prop="schedulingDate" label="排班日期" width="130">
               <template slot-scope="scope" >
                  {{scope.row.schedulingDate | dateTimeForm}}
               </template>
           </el-table-column>
           <el-table-column align="center" prop="odName" label="排班医生"> </el-table-column>
           <el-table-column align="center" prop="departmentName" label="科室" width="100"></el-table-column>
           <el-table-column align="center" prop="quota"  label="排班限额"> </el-table-column>
           <el-table-column align="center" prop="leftQuota"  label="剩余限额">  </el-table-column>
           <el-table-column align="center" prop="levelType"  label="号别"> </el-table-column>
            <el-table-column align="center" prop="state"  label="有效状态">  </el-table-column>
           <el-table-column align="center" prop="day" label="午别">  </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
              <el-button  @click="canselSchedulPlan">取 消</el-button>
              <el-button type="primary" @click="submitSchedulInfo">提交</el-button>
        </div>
      </el-dialog>
     </template>

<!--  关键字查询界面  -->
    <template>
        <el-dialog title="查询信息"  :visible.sync="outerVisible4" >
        <div class="titlediv">
            <span class="TableTitle">医生排班规则信息</span>
        </div>
        <el-table  :data="SelectschedulruleList"
                   tooltip-effect="dark" style="width: 100%"
                   ref="multipleTable"
                   @selection-change="handleSelectionChange" >
            <el-table-column align="center" prop="week" label="星期" width="100">  </el-table-column>
            <el-table-column align="center" prop="odName" label="排班医生"> </el-table-column>
            <el-table-column align="center" prop="departmentName" label="科室" width="100"></el-table-column>
            <el-table-column align="center" prop="quota"  label="排班限额"> </el-table-column>
            <el-table-column align="center" prop="levelType"  label="号别">
                <template slot-scope="scope">
                    <div v-if="scope.row.levelType==1">普通号</div>
                    <div v-if="scope.row.levelType==2">专家号</div>
                    <div v-if="scope.row.levelType==3">急诊号</div>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="state"  label="有效状态">
                <template slot-scope="scope">
                    <div v-if="scope.row.state==1">有效</div>
                    <div v-if="scope.row.state==2">无效</div>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="day" label="午别">
                <template slot-scope="scope" >
                    <div v-if="scope.row.day==1">上午</div>
                    <div v-if="scope.row.day==2">下午</div>
                    <div v-if="scope.row.day==3">全天</div>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="createAdminName"  label="操作员">  </el-table-column>
            <el-table-column align="center" prop="createTime"  label="操作时间" width="140" >
                <template slot-scope="scope" >
                    {{scope.row.createTime | dateTimeForm}}
                </template>
            </el-table-column>
        </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button  @click="cnaleSelectView">取 消</el-button>
            </div>
        </el-dialog>
    </template>

</div>
</template>
<script>
import {formatDate} from "../../config/date.js"

export default {
    name:'',
    data(){
        return{


           // 按关键字查询
            odName:'',
         //表格分页显示

            pagesize: 10,
            currpage: 1,
          userPersonListData:[],
          forSatrtDate:'',
          startDate:'', // 排班开始时间
          endDate:'',//排班结束时间
          endOptions: {
         disabledDate: (time) => {
            return time.getTime() < new Date(this.startDate).getTime() ; //- 1*24*60*60*1000;
            }
        },

           //开始时间的选择限制
           startOptions:{
             disabledDate(time){
                return time.getTime() < Date.now() - 8.64e7;   //this.getchedulingInfoLastDate()
                }
          },

           value:'',//号别选择器的value值
           leveltypeOptions:[],
          //leveltypeOptions:[{}],//排班号别（普通/专家/急诊）
          //value:'',
            outerVisible1:false,  //修改排班规则界面状态
            outerVisible4:false , //关键字查询信息
          //修改排版界面数据
          editschedulruleList:{
             week:'',
             departmentName:'',
             odName:'',
             levelType:'',
             state:'',
             day:'',
             quota:'',
             createAdminName:'',
             createTime:'',
          },

            //关键字查询界面数据
            SelectschedulruleList:[{
                week:'',
                departmentName:'',
                odName:'',
                levelType:'',
                state:'',
                day:'',
                quota:'',
                createAdminName:'',
                createTime:'',
            }],


           schedulruleList:[{
             week:'',
             departmentName:'',
             odName:'',
             levelType:'',
             state:'',
             day:'',
             quota:'',
             createAdminName:'',
             createTime:'',
          }],
          //value1:'',//午别选择器的value值
          dayOptions:[
             {
             value: '1',
             label: '上午'
          },{
             value: '2',
             label: '下午'
          },{
             value: '3',
             label: '全天'
          }
          ],

          // value3:'',//有效状态选择
           stateOptions:[
             {
             value: '1',
             label: '有效'
          },{
             value: '2',
             label: '无效'
          },
          ],
           //value2: '',
          outerVisible1:false,  //设置排班规则界面状态
          week:'',
         weekdayOptions: [{
          value: '1',
          label: '星期一'
        }, {
          value: '2',
          label: '星期二'
        }, {
          value: '3',
          label: '星期三'
        }, {
          value: '4',
          label: '星期四'
        }, {
          value: '5',
          label: '星期五'
        }, {
          value: '6',
          label: '星期六'
        }, {
          value: '7',
          label: '星期日'
        }],

        multipleSelection:[], // 多选的数据
        outerVisible3:false, //生成排班计划界面状态
          days: 0,
          schedulingDateList:[],
          weekList:[],
          numberWeekList:[],
          noweekList:[],
          //排班信息
          SchedulinfoList:[ {
             schedulingDate:'',
             departmentName:'',
             odName:'',
             levelType:'',
             state:'',
             day:'',
             quota:'',
             leftQuota:''
            } ],
          disablePersonIndexs:[], //根据选择时间失效的数据
          userPersonList:[] //拼接过后的排班信息
        }
    },
    methods:{

        //取消查询界面
        cnaleSelectView(){

            this.outerVisible4 = false

        },

      //查询挂号级别
        findAllRegistrationLevel(){
            this.$axios({
            method: 'get',
            url: '/ad/findAllRegistrationLevel'
            }).then((res) => {
            // console.log(res);
             this.leveltypeOptions = res.data.data;
             console.log(this.leveltypeOptions);

          })
       },

      //提交排班信息
      submitSchedulInfo(){
        this.schedulruleList.day = this.dayOptions.value
        this.schedulruleList.forEach(e =>{
          e.id = null;
        })
        console.log(this.schedulruleList)
         this.$axios({
            method: 'post',
            url: '/ad/addAllShedulinginfoList',
            data:this.userPersonListData
            }).then((res) => {
             console.log(res);
             this.$message("排班计划成功生成")
             /* this.userPersonListData.clear() */
             //this.userPersonListData = {}
             this.outerVisible3 = false
          })


      },

       //取消生成排班信息界面
       canselSchedulPlan(){
           this.userPersonListData=['']
            this.outerVisible3 = false
       },

        selectable(row,index){
            if(this.disablePersonIndexs.indexOf(index) == -1){
              return true;
            } else {
              return false;
            }
        },
          handleCurrentChange(cpage) {
          this.currpage = cpage;
            },
          handleSizeChange(psize) {
             this.pagesize = psize;
           },


          handleSelectionChange(val) {
          this.multipleSelection = val
       },

      canleEdit(){
        this.outerVisible1=false
        this.getDataSchedulrule();

      },
       /*toggleSelection(rows) {

        if (rows) {
          //console.log("gaga")
          //console.log(rows)
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        }
      },*/

       getWeek(val){
        let startdate = new Date(val)
        //alert(mydate.getDay)
         let week;
          if(startdate.getDay() == 0) week = "星期日";
          if(startdate.getDay() == 1) week = "星期一";
          if(startdate.getDay() == 2) week = "星期二";
          if(startdate.getDay() == 3) week = "星期三";
          if(startdate.getDay() == 4) week = "星期四";
          if(startdate.getDay() == 5) week = "星期五";
          if(startdate.getDay() == 6) week = "星期六";
          return week;
      },
        //将时间戳转化成日期
         datetimeFat(val){
            var time = new Date(val);
            var y = time.getFullYear();
            var m = time.getMonth()+1;
            var d = time.getDate();
            return y+'-'+m+'-'+d;
         },


      blurEndDate(){
           this.weekList =[];
           this.numberWeekList = [];
           this.schedulingDateList = [];
           this.forSatrtDate = this.startDate;
           //得到开始日期可结束日期的差值
           this.days = parseInt(Math.abs(this.endDate - this.forSatrtDate)/1000/60/60/24);
          //获得开始日期的星期
           // 当前日期的下一天
          for(let i=0;i<this.days;i++){
             let sater = new Date(this.forSatrtDate );
            this.forSatrtDate =   sater.getTime() +1000*60*60*24;
            //将时间戳转化成日期
            this.schedulingDateList[i] = this.datetimeFat(this.forSatrtDate);
           //获取星期
            this.weekList[i] = this.getWeek(this.forSatrtDate);

            if(this.weekList[i]=="星期一")
              this.numberWeekList[i] = 1;
            else{
              if(this.weekList[i]=="星期二")
                this.numberWeekList[i] = 2;
              else{
                if(this.weekList[i]=="星期三")
                   this.numberWeekList[i] = 3;
                else{
                  if(this.weekList[i]=="星期四")
                     this.numberWeekList[i] = 4;
                     else{
                       if(this.weekList[i]=="星期五")
                          this.numberWeekList[i] = 5;
                       else{
                          if(this.weekList[i]=="星期六")
                           this.numberWeekList[i] = 6;
                          else{
                             if(this.weekList[i]=="星期日")
                               this.numberWeekList[i] = 7;
                           }
                       }
                    }
                }
              }//if判断语句结束
            }//for循环结束

          }
         // console.log("weekList数据")
         // console.log(this.weekList)
         // console.log(this.numberWeekList)
          // schedulingDate

          let joinPerson = [];
          let disableIndexs =[];
          // this.schedulruleList.forEach((value,index) => {
          //   console.log(index)
          //   console.log(value)
          //     if(this.weekList.indexOf(value.week) > -1){
          //       value.leftQuota = value.quota;
          //       joinPerson.push(value);
          //     } else {
          //         disableIndexs.push(index);
          //     }
          // });
        let allWeekPersons = []
        this.weekList.forEach(w =>{
          let weekPersons = []
          this.schedulruleList.forEach(s => {
            console.log(s);
            if(s.week == w){
                s.leftQuota=s.quota;
              weekPersons.push(s);
            }
          });
          allWeekPersons.push(weekPersons)
        });
          this.disablePersonIndexs = disableIndexs;
          this.userPersonList = allWeekPersons;
         /* console.log(this.userPersonList)
            console.log(this.startDate)
            console.log(this.endDate)*/

          //使得indexs中对应的index进行失效
          //console.log("join数据")
          //console.log(joinPerson)
           // console.log(disableIndexs)
            //schedulruleList
           //this.toggleSelection([this.schedulruleList[1], this.schedulruleList[2]])
          // this.toggleSelection([this.schedulruleList[1],this.schedulruleList[2]]);
          console.log(this.schedulingDateList)
          // this.schedulingDateList
       },


     //获取排班信息的数据
      getCheckTableInfo(){
        /* console.log(this.userPersonList)
        this.userPersonList.forEach((value,index) => {
          let week = value.week;
          let flag = 0;
          for(let i = flag; i < this.weekList.length ;i++){
              if(week == this.weekList[flag]){
                value.schedulingDate = this.schedulingDateList[flag];
                break;
              }else{
                flag++;
              }
          }
        }) */

      this.userPersonList.forEach((wu,index) => {
        console.log("index:"+index)
             console.log(this.schedulingDateList[index])
        wu.forEach((w )=> {
          console.log( this.schedulingDateList[index])
          w.schedulingDate =  this.schedulingDateList[index];
              console.log( this.schedulingDateList[index])
          console.log(w.schedulingDate)
          console.log(w)
          this.userPersonListData.push(w)
        })
      })
      console.log(this.userPersonList)
      this.outerVisible3 = true;

      },
      //删除排班规则
      delSchedulrule(row){
            this.$confirm("是否删除？").then(_ => {
            this.$axios({
             method: 'delete',
             url: '/ad/delSchedulrule',
             data:row    //表格当前的行的数据
             }).then((res) => {
              console.log(res);
              this.$message("用户信息删除成功")
              this.UserList.splice(row,1);
           })
          })
      },

       updataSchedulrule(){
          this.$axios({
            method: 'put',
            url: '/ad/updataSchedulrule',
            data:this.editschedulruleList
            }).then((res) => {
             console.log(res);
             this.$message("排班规则信息修改成功！")
             this.editschedulruleList = {};
             this.outerVisible1 = false;
          })
       },

      getTableinfor(row){

          this.findAllRegistrationLevel()
          this.editschedulruleList = row
          if(row.state==1){
            this.editschedulruleList.state="有效";
          }
          else
            this.editschedulruleList.state="无效";
          if(row.levelType==1){
             this.editschedulruleList.levelType="普通号";
          }
          else{
            if(row.levelType==2)
               this.editschedulruleList.levelType="专家号";
            else
              this.editschedulruleList.levelType="急诊号";
          }

          this.outerVisible1 = true
      },

       getDataSchedulrule(){
            this.$axios({
            method: 'get',
            url: '/ad/schedulingList'
             }).then((res) => {
             console.log(res);
             this.schedulruleList = res.data.data;

          })
       },
       // 查询最后一条排班记录的排班日期
       getchedulingInfoLastDate(){
           this.$axios({
            method: 'get',
            url: '/ad/getSchedulingInfoLastDate'
             }).then((res) => {
             //console.log(res);
              this.startDate = res.data.data;
             // console.log(this.startDate)
          });

       },
        //实现按关键字查询排班规则
        findSCheduruleByOdname(){
            this.$axios({
                method: 'get',
                url: '/ad/findSCheduruleByOdname?odName='+this.odName
                // data:{params:{odName:this.odName}}
            }).then((res) => {
                console.log(res)
                this.SelectschedulruleList= res.data.data;
            });

            this.outerVisible4= true;
        }

    },

    created(){
      this.getDataSchedulrule();

      this. getchedulingInfoLastDate();

      // this.getWeek()

  },

}
</script>

<style>

.TableTitle{
   font-size: 15px;
   color:cadetblue;
   font-style:inherit;
   margin-bottom: 15px;

}

.titlediv{
  border-bottom: 1px solid cadetblue;
}

.divAll{
  margin: 0px;
  padding: 0px;
}

	.demo_line_02{
      margin-bottom: 20px;
	    height: 2px;
	    border-top: 1px solid #ddd;
	    text-align: center;
      /* margin-top: 20px; */
	}
.paibanrugu{
  margin-bottom: 15px;
}
  .paibaninfor{
    margin-top: 10px;
  }

.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;

  }


  /* .el-row {
    margin-bottom: 5px;
    background-color: black;
    margin-top: 15px;
  }
  .el-col {
    border-radius: 0px;

  } */
  .bg-purple-dark {
   margin: 0px;
  }
  .bg-purple {
    margin: 0px;
  }
  .bg-purple-light {
    margin: 0px;
  }
  .grid-content {
    min-height: 10px;
  }
  .row-bg {
    padding: 10px 0;

  }


</style>




