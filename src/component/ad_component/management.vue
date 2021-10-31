<template>
<div>
<!-- 工具条  -->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item>
					<el-input  placeholder="按姓名查询"  v-model="name"   ></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getUserByName" >查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="addPerson" >新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

      <!--列表 .slice((currpage - 1) * pagesize, currpage * pagesize)  -->
		<el-table :data="UserList.slice((currpage - 1) * pagesize, currpage * pagesize)"
             highlight-current-row
             @selection-change="handleSelectionChange"
            style="width: 100%;">
			<el-table-column type="index" width="50">
			</el-table-column>
			<el-table-column prop="username" align="center" label="账号" width="90" sortable>
			</el-table-column>
			<el-table-column prop="name" align="center" label="姓名" width="90"  sortable>
			</el-table-column>
			<el-table-column prop="departmentName" align="center" label="科室" width="90" sortable>
			</el-table-column>
			<el-table-column prop="position" align="center" label="职位" width="90" sortable>
			</el-table-column>
			<el-table-column prop="role" align="center" label="角色" width="90" sortable>
              <template slot-scope="scope">
                 <div v-if="scope.row.role==1">门诊</div>
                 <div v-if="scope.row.role==2">医技</div>
                 <div v-if="scope.row.role==3">药房</div>
                 <div v-if="scope.row.role==4">挂号</div>
                 <div v-if="scope.row.role==5">财务</div>
                 <div v-if="scope.row.role==6">管理员</div>
              </template>
			</el-table-column>
      <el-table-column prop="userpassword" align="center" label="密码" width="90" sortable>
			</el-table-column>
      <el-table-column prop="isSchedul" align="center" label="是否排班" width="100" sortable>
         <template slot-scope="scope">
                 <div v-if="scope.row.isSchedul==1">是</div>
                 <div v-if="scope.row.isSchedul==2">否</div>
              </template>
			</el-table-column>
      <el-table-column prop="iphone" align="center" label="电话" width="120" sortable>
			</el-table-column>
      <el-table-column prop="adderst" align="center" label="地址" width="130" sortable>
			</el-table-column>
      <el-table-column prop="msg" align="center" label="备注" width="80" sortable>
			</el-table-column>
			<el-table-column label="操作" align="center" width="260">
			   <template  slot-scope="scope">
                 <el-button size="mini" type="primary" ref="setting" @click="getTablerueinfo(scope.row)">排班规则</el-button>
					  <el-button size="mini" @click="getTableUser(scope.row)" >编辑</el-button>
					  <el-button type="danger" size="mini" @click="delUser(scope.row)" >删除</el-button>
			 	 </template>
			</el-table-column>
		</el-table>
        <div style="text-align: center;margin-top: 30px;">
                    <el-pagination background
                        layout="prev, pager, next, sizes, total, jumper"
                        :page-sizes="[5, 10, 15, 20]"
                        :page-size="pagesize"
                        :total="UserList.length"
                        @current-change="handleCurrentChange"
                        @size-change="handleSizeChange" >
                    </el-pagination>
        </div>



     <!--编辑界面  :visible.sync="outerVisible"-->
         <template>
        <el-dialog title="用户信息修改" :visible.sync="centerDialogVisible" >
          <el-row>
              <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
              <el-col :span="10">
                  <div class="grid-content bg-purple">
                     <el-form  label-width="100px">
                         <el-form-item  label="账号:" >
					       <el-input auto-complete="off"  v-model="editList.username" clearable></el-input>
				         </el-form-item>
                     </el-form>
                  </div>
                </el-col>
               <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
                <el-col :span="10">
                 <div class="grid-content bg-purple">
                    <el-form  label-width="100px">
                       <el-form-item label="姓名:">
					   <el-input  auto-complete="off"  v-model="editList.name"></el-input>
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
                        <el-form-item label="科室:" >
					   <el-input  auto-complete="off" v-model="editList.departmentName"></el-input>
				    </el-form-item>
                   </el-form>
                 </div>
               </el-col>
              <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
               <el-col :span="10">
              <div class="grid-content bg-purple">
                    <el-form  label-width="100px">
                       <el-form-item label="职位:">
					       <el-input  auto-complete="off"  v-model="editList.position"></el-input>
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
                        <el-form-item label="角色:" >
					   <el-input  auto-complete="off" v-model="editList.role"></el-input>
				    </el-form-item>
                   </el-form>
              </div>
           </el-col>
           <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
           <el-col :span="10">
              <div class="grid-content bg-purple">
                    <el-form  label-width="100px">
                       <el-form-item label="密码:">
					     <el-input  auto-complete="off"  v-model="editList.userpassword"></el-input>
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
                        <el-form-item label="排班:" >
					   <el-input  auto-complete="off" v-model="editList.isSchedul"></el-input>
				    </el-form-item>
                   </el-form>
              </div>
           </el-col>
           <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
           <el-col :span="10">
              <div class="grid-content bg-purple">
                    <el-form  label-width="100px">
                       <el-form-item label="电话:">
					     <el-input  auto-complete="off"  v-model="editList.iphone"></el-input>
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
                        <el-form-item label="地址:" >
					   <el-input  auto-complete="off" v-model="editList.adderst"></el-input>
				    </el-form-item>
                   </el-form>
              </div>
           </el-col>
           <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
           <el-col :span="10">
              <div class="grid-content bg-purple">
                    <el-form  label-width="100px">
                       <el-form-item label="备注:">
					     <el-input  auto-complete="off"  v-model="editList.msg"></el-input>
				       </el-form-item>
                   </el-form>
              </div>
           </el-col>
          </el-row>

              <div slot="footer" class="dialog-footer">
                   <el-button @click="canseEdit">取 消</el-button>
                   <el-button type="primary"  @click="updataUser" >提交</el-button>
              </div>
       </el-dialog>
     </template>

     <!--  关键字查询界面  -->
    <template>
        <el-dialog title="信息查询"  :visible.sync="SeouterVisible" >
            <el-table :data="SelectUserList"
                      highlight-current-row
                      @selection-change="handleSelectionChange"
                      style="width: 100%;">
                <el-table-column prop="username" align="center" label="账号" width="90" sortable>
                </el-table-column>
                <el-table-column prop="name" align="center" label="姓名" width="90"  sortable>
                </el-table-column>
                <el-table-column prop="departmentName" align="center" label="科室" width="90" sortable>
                </el-table-column>
                <el-table-column prop="position" align="center" label="职位" width="90" sortable>
                </el-table-column>
                <el-table-column prop="role" align="center" label="角色" width="90" sortable>
                    <template slot-scope="scope">
                        <div v-if="scope.row.role==1">门诊</div>
                        <div v-if="scope.row.role==2">医技</div>
                        <div v-if="scope.row.role==3">药房</div>
                        <div v-if="scope.row.role==4">挂号</div>
                        <div v-if="scope.row.role==5">财务</div>
                        <div v-if="scope.row.role==6">管理员</div>
                    </template>
                </el-table-column>
                <el-table-column prop="userpassword" align="center" label="密码" width="90" sortable>
                </el-table-column>
                <el-table-column prop="isSchedul" align="center" label="是否排班" width="100" sortable>
                    <template slot-scope="scope">
                        <div v-if="scope.row.isSchedul==1">是</div>
                        <div v-if="scope.row.isSchedul==2">否</div>
                    </template>
                </el-table-column>
                <el-table-column prop="iphone" align="center" label="电话" width="120" sortable>
                </el-table-column>
                <el-table-column prop="adderst" align="center" label="地址" width="130" sortable>
                </el-table-column>
            </el-table>

            <div slot="footer" class="dialog-footer">
                <el-button @click="SeouterVisible = false" >取 消</el-button>

            </div>

        </el-dialog>
    </template>


      <!--增加用户界面  -->
         <template>
        <el-dialog title="添加新用户" :visible.sync="outerVisible" >
          <el-row>
              <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
              <el-col :span="10">
                  <div class="grid-content bg-purple">
                     <el-form  label-width="100px">
                         <el-form-item  label="账号:" >
					       <el-input auto-complete="off"  v-model="addList.username" clearable></el-input>
				         </el-form-item>
                     </el-form>
                  </div>
                </el-col>
               <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
                <el-col :span="10">
                 <div class="grid-content bg-purple">
                    <el-form  label-width="100px">
                       <el-form-item label="姓名:">
					   <el-input  auto-complete="off"  v-model="addList.name"></el-input>
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
                        <el-form-item label="科室:" >
					   <el-input  auto-complete="off" v-model="addList.departmentName"></el-input>
				    </el-form-item>
                   </el-form>
                 </div>
               </el-col>
              <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
               <el-col :span="10">
              <div class="grid-content bg-purple">
                    <el-form  label-width="100px">
                       <el-form-item label="职位:">
					       <el-input  auto-complete="off"  v-model="addList.position"></el-input>
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
                        <el-form-item label="角色:" >
                            <template>
                                <el-select v-model="addList.role" placeholder="请选择">
                                    <el-option
                                            v-for="roleoptions in roleoptions"
                                            :key="roleoptions.value"
                                            :label="roleoptions.label"
                                            :value="roleoptions.value">
                                    </el-option>
                                </el-select>
                            </template>
					   <!--<el-input  auto-complete="off" v-model="addList.role"></el-input>-->
				    </el-form-item>
                   </el-form>
              </div>
           </el-col>
           <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
           <el-col :span="10">
              <div class="grid-content bg-purple">
                    <el-form  label-width="100px">
                       <el-form-item label="密码:">
					     <el-input  auto-complete="off"  v-model="addList.userpassword"></el-input>
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
                        <el-form-item label="排班:" >
                            <template>
                                <el-select v-model="addList.isSchedul" placeholder="请选择">
                                    <el-option
                                            v-for="isScheduloptions in isScheduloptions"
                                            :key="isScheduloptions.value"
                                            :label="isScheduloptions.label"
                                            :value="isScheduloptions.value">
                                    </el-option>
                                </el-select>
                            </template>

                            <!--<el-input  auto-complete="off" v-model="addList.isSchedul"></el-input>-->
				    </el-form-item>
                   </el-form>
              </div>
           </el-col>
           <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
           <el-col :span="10">
              <div class="grid-content bg-purple">
                    <el-form  label-width="100px">
                       <el-form-item label="电话:">
					     <el-input  auto-complete="off" v-model="addList.iphone" ></el-input>
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
                        <el-form-item label="地址:" >
					   <el-input  auto-complete="off" v-model="addList.adderst"></el-input>
				    </el-form-item>
                   </el-form>
              </div>
           </el-col>
           <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
           <el-col :span="10">
              <div class="grid-content bg-purple">
                    <el-form  label-width="100px">
                       <el-form-item label="备注:">
					     <el-input  auto-complete="off"  v-model="addList.msg"></el-input>
				       </el-form-item>
                   </el-form>
              </div>
           </el-col>
          </el-row>

              <div slot="footer" class="dialog-footer">
                   <el-button @click="outerVisible = false">取 消</el-button>
                   <el-button type="primary"  @click="addUser">提交</el-button>
              </div>
       </el-dialog>
     </template>

     <!-- 设置排班规则界面 -->

     <template>
        <el-dialog title="新增排班规则"  :visible.sync="outerVisible1" >
          <el-row>
              <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
              <el-col :span="10">
                  <div class="grid-content bg-purple">
                     <el-form  label-width="100px">
                         <el-form-item  label="星期:" >
					               <el-select v-model="schedulruleList.week" placeholder="请选择">
                              <el-option
                                v-for="item in weekdayOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
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
					                <el-input  auto-complete="off" v-model="schedulruleList.departmentName" ></el-input>
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
					            <el-input  auto-complete="off" v-model="schedulruleList.odName" ></el-input>
				            </el-form-item>
                   </el-form>
                 </div>
               </el-col>
              <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
               <el-col :span="10">
              <div class="grid-content bg-purple">
                    <el-form  label-width="100px">
                       <el-form-item label="号别:">
                            <el-select v-model="schedulruleList.levelType" placeholder="请选择">
                                        <el-option
                                          v-for="leveltypeOptions in leveltypeOptions"
                                          :key="leveltypeOptions.value"
                                          :label="leveltypeOptions.levelName"
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
                            <!-- <el-input  auto-complete="off" v-model="schedulruleList.state" ></el-input> -->
                                <el-select v-model="schedulruleList.state" placeholder="请选择">
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
					    <!--  <el-input  auto-complete="off" v-model="schedulruleList.day" ></el-input> -->
                             <el-select v-model="schedulruleList.day" >
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
					   <el-input  auto-complete="off" v-model="schedulruleList.quota" ></el-input>
				    </el-form-item>
                   </el-form>
              </div>
           </el-col>
           <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
           <el-col :span="10">
              <div class="grid-content bg-purple">
                    <el-form  label-width="100px">
                       <el-form-item label="操作员:">
					     <el-input  auto-complete="off" v-model="schedulruleList.createAdminName"  ></el-input>
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
					   <el-input  auto-complete="off" v-model="schedulruleList.createTime" ></el-input>
				    </el-form-item>
                   </el-form>
              </div>
           </el-col>
          </el-row>
              <div slot="footer" class="dialog-footer">
                   <el-button @click="outerVisible1 = false" >取 消</el-button>
                   <el-button type="primary"  @click="setSchedurole">提交</el-button>
              </div>
       </el-dialog>
     </template>





</div>


</template>

<script>
export default {

    data(){
        return{

            isScheduloptions:[
                {
                    value: '1',
                    label: '是'

                },{
                    value: '2',
                    label: '否'
                }
            ],

            roleoptions:[
                {
                    value: '1',
                    label: '门诊医生'

                },{
                    value: '2',
                    label: '医技医生'
                }, {
                   value: '3',
                   label: '药房'

                 },{
                    value: '4',
                    label: '挂号'
                 },
                {
                    value: '5',
                    label: '财务'

                },{
                    value: '6',
                    label: '管理员'
                }
            ],

            //关键字查询界面状态
            SeouterVisible:false,
            name:'',
            //关键字查询界面数据
            SelectUserList:[{
                username:'',
                name:'',
                departmentName:'',
                position:'',
                role:'',
                userpassword:'',
                isSchedul:'',
                iphone:'',
                adderst:'',
                msg:''
            }],

           stateOptions:[
             {
             value: '1',
             label: '有效'
          },{
             value: '2',
             label: '无效'
          }
          ],

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

           keywords:'',

           //表格分页显示
            multipleSelection: [],
            pagesize: 10,
            currpage: 1,

            value:'',//号别选择器的value值
           leveltypeOptions:[],
          //排班规则
          schedulruleList:{
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
          stateOptions:[
             {
             value: '1',
             label: '有效'
          },{
             value: '2',
             label: '无效'
          },
          ],
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

            outerVisible:false,  //新增界面的状态
            centerDialogVisible: false,  //编辑界面的状态
            UserList:[{
            username:'',
            name:'',
            departmentName:'',
            position:'',
            role:'',
            userpassword:'',
            isSchedul:'',
            iphone:'',
            adderst:'',
            msg:''
          }],

          editList:{
            username:'',
            name:'',
            departmentName:'',
            position:'',
            role:'',
            userpassword:'',
            isSchedul:'',
            iphone:'',
            adderst:'',
            msg:''
          },


          addList:{
            username:'',
            name:'',
            departmentName:'',
            position:'',
            role:"" ,
            userpassword:'',
            isSchedul:'',
            iphone:'',
            adderst:'',
            msg:''
          },
          //RegistrationLevel:[],
         }
    },
    methods:{




        handleCurrentChange(cpage) {
             this.currpage = cpage;
             },
         handleSizeChange(psize) {
                 this.pagesize = psize;
                 },
         handleSelectionChange(val) {
                     //console.log(val)
                      },


       //查询挂号级别
        findAllRegistrationLevel(){
            this.$axios({
            method: 'get',
            url: '/ad/findAllRegistrationLevel'
            }).then((res) => {
            // console.log(res);
             this.leveltypeOptions = res.data.data;
             //console.log(this.leveltypeOptions);

          })
       },


       getTablerueinfo(row){

          if(row.role != "1")
          {
             this.outerVisible1 = false
             alert("当前用户为非门诊角色，不参与排班！")
          }
          else{
          this.schedulruleList.departmentName = row.departmentName
          this.schedulruleList.odName = row.name
          this.findAllRegistrationLevel()
           this.outerVisible1 = true
         }

       },

      setSchedurole(){

         this.$axios({
            method: 'post',
            url: '/ad/addSchedulingrule',
            data:this.schedulruleList
            }).then((res) => {
             console.log(res);
             this.$message("排班规则设置成功")
             /* this.addList.clear() */
             this.schedulruleList = {}
             this.outerVisible1 = false
          })

      },



       updataUser(){
           if(this.editList.role =="门诊" && this.editList.isSchedul =="是")
           {
          this.$axios({
            method: 'put',
            url: '/ad/updataUser',
            data:this.editList
            }).then((res) => {
             console.log(res);
             this.$message("用户信息修改成功")
             this.editList = {}
             this.centerDialogVisible = false;
          })
          }
          else {
             alert("当前用户不能参与排班")
          }


       },

       getTableUser(row){
          this.centerDialogVisible = true
          this.editList =row
          if(row.isSchedul==1){
             this.editList.isSchedul="是"
          }
          else
             this.editList.isSchedul="否"
         switch(row.role){
            case 1:
               this.editList.role="门诊";
               break
            case 2:
               this.editList.role="医技";
               break
            case 3:
               this.editList.role="药房";
               break
            case 4:
               this.editList.role="挂号";
               break
            case 5:
               this.editList.role="财务";
               break
            case 6:
               this.editList.role="管理员";
               break

         }

       },

       canseEdit(){
          this.centerDialogVisible = false
          this.getData();
       },

       delUser(row){
          this.$confirm("是否删除？").then(_ => {
            this.$axios({
             method: 'delete',
             url: '/ad/delUserBykey',
             data:row    //表格当前的行的数据
             }).then((res) => {
              console.log(res);
              this.$message("用户信息删除成功")
              this.UserList.splice(row,1);
           })
          })

       },

       addUser(){

           this.$axios({
            method: 'post',
            url: '/ad/addUser',
            data:this.addList
            }).then((res) => {
             console.log(res);
             this.$message("添加成功")
             /* this.addList.clear() */
             this.addList = {}
             this.outerVisible = false

          })

       },

       getData(){
            this.$axios({
            method: 'get',
            url: '/ad/userlist'
            }).then((res) => {
             console.log(res);
            this.UserList = res.data.data;
          })
       },
        //实现按关键字查询排班规则
        getUserByName(){
            this.$axios({
                method: 'get',
                url: '/ad/findUserByName?name='+this.name
            }).then((res) => {
                console.log(res)
                this.SelectUserList= res.data.data;
            });
            this.SeouterVisible= true;
        },



        addPerson(){
            this.outerVisible = true
        },



},

    created(){
      this.getData();
      this.getDataDepartment();
    },



}
</script>

<style scoped>



</style>
