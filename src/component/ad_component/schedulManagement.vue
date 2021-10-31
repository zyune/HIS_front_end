<template>
<div>
     <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item>
					<el-input  placeholder="查询排班信息" v-model="odName"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="findSCheduinfoByOdname">查询</el-button>
				</el-form-item>
                <el-form-item>
                    <el-button @click="historySchedulList" >历史排班记录</el-button>
                </el-form-item>

		  </el-form>
		</el-col>

     <template>

       <el-table   :data="SchedulinfoList.slice((currpage - 1) * pagesize, currpage * pagesize)"
                   tooltip-effect="dark" style="width: 100%"
                   ref="multipleTable"
                   @selection-change="handleSelectionChange">

           <el-table-column align="center" prop="schedulingDate" label="排班日期" width="130" sortable>
               <template slot-scope="scope" >
                  {{scope.row.schedulingDate | dateTimeForm}}
               </template>
           </el-table-column>
           <el-table-column align="center" prop="odName" label="排班医生"> </el-table-column>
           <el-table-column align="center" prop="departmentName" label="科室" width="100"></el-table-column>
           <el-table-column align="center" prop="quota"  label="排班限额"> </el-table-column>
           <el-table-column align="center" prop="leftQuota"  label="剩余限额">  </el-table-column>
           <el-table-column align="center" prop="levelType"  label="号别">
               <template slot-scope="scope" >
                  <div v-if="scope.row.levelType==1">普通</div>
                  <div v-if="scope.row.levelType==2">专家</div>
                  <div v-if="scope.row.levelType==3">急诊</div>
               </template>
           </el-table-column>
            <el-table-column align="center" prop="state"  label="有效状态">
               <template slot-scope="scope" >
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
           <el-table-column label="操作" align="center" width="160">
			         <template  slot-scope="scope"  >
                     <!-- slot-scope="scope" -->
					         <el-button size="small" @click="getTableSchinfo(scope.row)">编辑</el-button>
					            <el-button type="danger" size="small" >删除</el-button>
			 	           </template>
		     	</el-table-column>
        </el-table>
         <div style="text-align: center;margin-top: 30px;">
             <el-pagination background
                            layout="prev, pager, next, sizes, total, jumper"
                            :page-sizes="[5, 10, 15, 20]"
                            :page-size="pagesize"
                            :total="SchedulinfoList.length"
                            @current-change="handleCurrentChange"
                            @size-change="handleSizeChange" >
             </el-pagination>
         </div>
     </template>


    <!--  查询界面  -->
    <template>
        <el-dialog title="新增排班规则"  :visible.sync="SeouterVisible1" >
         <el-table   :data="selectSchedulinfoList" tooltip-effect="dark" style="width: 100%">

              <el-table-column align="center" prop="schedulingDate" label="排班日期" width="130" sortable>
                <template slot-scope="scope" >
                    {{scope.row.schedulingDate | dateTimeForm}}
                </template>
                </el-table-column>
                <el-table-column align="center" prop="odName" label="排班医生"> </el-table-column>
                <el-table-column align="center" prop="departmentName" label="科室" ></el-table-column>
                <el-table-column align="center" prop="quota"  label="排班限额"> </el-table-column>
                <el-table-column align="center" prop="leftQuota"  label="剩余限额">  </el-table-column>
                <el-table-column align="center" prop="levelType"  label="号别">
                <template slot-scope="scope" >
                    <div v-if="scope.row.levelType==1">普通</div>
                    <div v-if="scope.row.levelType==2">专家</div>
                    <div v-if="scope.row.levelType==3">急诊</div>
                </template>
                </el-table-column>
                <el-table-column align="center" prop="state"  label="有效状态">
                    <template slot-scope="scope" >
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
          </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="SeouterVisible1 = false" >取 消</el-button>
            </div>
        </el-dialog>
    </template>

     <!-- 修改排班信息界面 -->
        <template>
        <el-dialog title="新增排班规则"  :visible.sync="outerVisible1" >
          <el-row>
              <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
              <el-col :span="10">
                  <div class="grid-content bg-purple">
                     <el-form  label-width="100px">
                         <el-form-item  label="排班时间:" >
                             <el-input  auto-complete="off" v-model="editschedulinfoList.schedulingDate" >  </el-input>
				         </el-form-item>
                     </el-form>
                  </div>
                </el-col>
               <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
                <el-col :span="10">
                 <div class="grid-content bg-purple">
                    <el-form  label-width="100px">
                       <el-form-item label="科室:">
					                <el-input  auto-complete="off" v-model="editschedulinfoList.departmentName" ></el-input>
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
					            <el-input  auto-complete="off" v-model="editschedulinfoList.odName" ></el-input>
				            </el-form-item>
                   </el-form>
                 </div>
               </el-col>
              <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
               <el-col :span="10">
              <div class="grid-content bg-purple">
                    <el-form  label-width="100px">
                       <el-form-item label="号别:">
                            <el-select v-model="editschedulinfoList.levelType" placeholder="请选择">
                                        <el-option
                                          v-for="leveltypeOptions in leveltypeOptions"
                                          :key="leveltypeOptions.value"
                                          :label="leveltypeOptions.label"
                                          :value="leveltypeOptions.value">
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
                        <el-form-item label="有效状态:" >
                            <el-input  auto-complete="off" v-model="editschedulinfoList.state" ></el-input>
                          <!--  <el-select v-model="schedulruleList.state" placeholder="请选择">
                                        <el-option
                                          v-for="item in stateOptions"
                                          :key="item.value"
                                          :label="item.label"
                                          :value="item.value">
                                        </el-option>
                                      </el-select> -->
				    </el-form-item>
                   </el-form>
              </div>
           </el-col>
           <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
           <el-col :span="10">
              <div class="grid-content bg-purple">
                    <el-form  label-width="100px">
                       <el-form-item label="午别:">
					     <el-input  auto-complete="off" v-model="editschedulinfoList.day" ></el-input>
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
					   <el-input  auto-complete="off" v-model="editschedulinfoList.quota" ></el-input>
				    </el-form-item>
                   </el-form>
              </div>
           </el-col>
          </el-row>
              <div slot="footer" class="dialog-footer">
                   <el-button @click="cancnlEdit" >取 消</el-button>
                   <el-button type="primary" @click="updataSchedulInfor" >提交</el-button>
              </div>
       </el-dialog>
     </template>

     <!-- 查看历史排班记录 -->
      <template>

        <el-dialog title="查看历史排班记录"  :visible.sync="historySchedul">
           <el-table   :data="historySchedulinfo" tooltip-effect="dark" style="width: 100%">
           <el-table-column align="center" prop="schedulingDate" label="排班日期" width="130">
               <template slot-scope="scope" >
                  {{scope.row.schedulingDate | dateTimeForm}}
               </template>
           </el-table-column>
           <el-table-column align="center" prop="odName" label="排班医生"> </el-table-column>
           <el-table-column align="center" prop="departmentName" label="科室" width="100"></el-table-column>
           <el-table-column align="center" prop="quota"  label="排班限额"> </el-table-column>
           <el-table-column align="center" prop="leftQuota"  label="剩余限额">  </el-table-column>
           <el-table-column align="center" prop="levelType"  label="号别">
               <template slot-scope="scope" >
                  <div v-if="scope.row.levelType==1">普通</div>
                  <div v-if="scope.row.levelType==2">专家</div>
                  <div v-if="scope.row.levelType==3">急诊</div>
               </template>
           </el-table-column>
            <el-table-column align="center" prop="state"  label="有效状态">
               <template slot-scope="scope" >
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
        </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancnlHistory" >取 消</el-button>
            </div>

        </el-dialog>

     </template>

</div>
</template>

<script>
export default {

   data() {
      return {

          //表格分页显示
          multipleSelection: [],
          pagesize: 10,
          currpage: 1,

          //查询界面数据
          selectSchedulinfoList:[{
              schedulingDate:'',
              departmentName:'',
              odName:'',
              levelType:'',
              state:'',
              day:'',
              quota:'',
              leftQuota:''
          }],
          //查询关键字
          odName:'',
          //查询界面状态
          SeouterVisible1:false,
          value:'',
         leveltypeOptions:[],
          nowDate:'', //当前时间
          nowDateNofmat:'',//当前时间的时间戳形式
         outerVisible: false,  //修改排班信息
         innerVisible: false,
         historySchedul:false,//历史排班记录界面状态
         historySchedulinfo:[{
           schedulingDate:'',
             departmentName:'',
             odName:'',
             levelType:'',
             state:'',
             day:'',
             quota:'',
             leftQuota:''
        }],

        outerVisible1:false, //排班信息界面状态
        editschedulinfoList:{
             schedulingDate:'',
             departmentName:'',
             odName:'',
             levelType:'',
             state:'',
             day:'',
             quota:'',
             leftQuota:''
        },
         SchedulinfoList:[{
             schedulingDate:'',
             departmentName:'',
             odName:'',
             levelType:'',
             state:'',
             day:'',
             quota:'',
             leftQuota:''
          }],
      }
   },
   methods:{
    //分页
       handleCurrentChange(cpage) {
           this.currpage = cpage;
       },
       handleSizeChange(psize) {
           this.pagesize = psize;
       },
       handleSelectionChange(val) {
           //console.log(val)
       },

       //查询历史排班记录
       historySchedulList(){
           this.getNowDate();
           this.dateNofmat(this.nowDate);
           let schedulingDate = this.nowDateNofmat;
           this.$axios({
               method: 'get',
               url: '/ad/findSchedulinfoByDate?schedulingDate='+schedulingDate
           }).then((res) => {
               console.log(res)
               this.historySchedulinfo = res.data.data;
           });
           this.historySchedul = true;
       },
       //取消历史排班记录
       cancnlHistory(){
           this.getDataSchedulinfo();
           this.historySchedul = false;
       },
       //关键字查询
       findSCheduinfoByOdname(){
           this.$axios({
               method: 'get',
               url: '/ad/findSCheduinfoByOdname?odName='+this.odName
               // data:{params:{odName:this.odName}}
           }).then((res) => {
               console.log(res)
               this.selectSchedulinfoList= res.data.data;
           });
           this.SeouterVisible1= true;
       },
      cancnlEdit(){
         this.outerVisible1 = false
         this.getDataSchedulinfo();
      },
      //将日期转化成时间戳
      dateNofmat(val){
         let date = new Date(val);
         this.nowDateNofmat = date.getTime();
      },
     //将时间戳转化成日期
         datetimeFat(val){
            var time = new Date(val);
            var y = time.getFullYear();
            var m = time.getMonth()+1;
            var d = time.getDate();
            return y+'-'+m+'-'+d;
         },
      updataSchedulInfor(){
         this.$axios({
            method: 'put',
            url: '/ad/updataSchedulInfor',
            data:this.editschedulinfoList
            }).then((res) => {
             console.log(res);
             this.$message("用户排班信息修改成功")
             this.editschedulinfoList = {}
             this.outerVisible1 = false;
          })
          this.getDataSchedulinfo();
      },
       //获取当前时间
       getNowDate(){
           let myDate = new Date();
           myDate.toLocaleDateString();
           this.nowDate = myDate;
           this.datetimeFat(this.nowDate )
       },
      getTableSchinfo(row){
         let time1; //排班时间
          time1=row.schedulingDate;
         let time2  //当前时间
          //将当前时间转化成时间戳
          this.dateNofmat(this.nowDate);
          time2 = this.nowDateNofmat;
          if(time1>time2){
              this.outerVisible1=true
              this.editschedulinfoList = row;
          }
          else {
              alert("当前排班记录为历史排班记录，无法进行编辑！")
          }
      },
     getDataSchedulinfo(){
            this.$axios({
            method: 'get',
            url: '/ad/schedulInfoList'
             }).then((res) => {
             console.log(res);
             this.SchedulinfoList = res.data.data;
          })
     }
   },
   created(){
     this.getDataSchedulinfo();
     this.getNowDate();

   },
}
</script>

<style>

</style>



