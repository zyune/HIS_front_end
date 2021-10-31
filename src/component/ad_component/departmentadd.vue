<template>
<div>
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item>
					<el-input  placeholder="按科室名查询" v-model="deptName"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="findByDeptName" >查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="outerVisible1 = true" >新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

         <div>
           <template>
             <el-table ref="multipleTable"
                      :data="tableDepartmentList.slice((currpage - 1) * pagesize, currpage * pagesize)"
                      style="width: 90%"
                      @selection-change="handleSelectionChange"
                      tooltip-effect="dark">
                <el-table-column  align="center" label="科室编码"  prop="deptCode">
                </el-table-column>
                <el-table-column  align="center" label="科室名称"  prop="deptName">
                </el-table-column>
                <el-table-column  align="center" label="类型编码"  prop="deptCategoryId">
                    <template slot-scope="scope">
                      <div v-if="scope.row.deptCategoryId==11">内科</div>
                      <div v-if="scope.row.deptCategoryId==12">外科</div>
                      <div v-if="scope.row.deptCategoryId==14">儿科</div>
                      <div v-if="scope.row.deptCategoryId==15">传染病科</div>
                      <div v-if="scope.row.deptCategoryId==16">妇产科</div>
                      <div v-if="scope.row.deptCategoryId==17">男科</div>
                      <div v-if="scope.row.deptCategoryId==18">精神心理科</div>
                      <div v-if="scope.row.deptCategoryId==19">皮肤性病科</div>
                      <div v-if="scope.row.deptCategoryId==20">中医科</div>
                      <div v-if="scope.row.deptCategoryId==21">肿瘤科</div>
                      <div v-if="scope.row.deptCategoryId==22">骨科</div>
                      <div v-if="scope.row.deptCategoryId==23">五官科</div>
                      <div v-if="scope.row.deptCategoryId==24">康复医学科</div>
                      <div v-if="scope.row.deptCategoryId==25">麻醉医学科</div>
                      <div v-if="scope.row.deptCategoryId==26">营养科</div>
                      <div v-if="scope.row.deptCategoryId==27">医技科</div>
                      <div v-if="scope.row.deptCategoryId==28">医学影像学</div>
                      <div v-if="scope.row.deptCategoryId==29">其他科室</div>
                    </template>
                </el-table-column>
                <el-table-column  align="center" label="科室类型"  prop="deptType">
                    <template slot-scope="scope">
                      <div v-if="scope.row.deptType==1">临床科室</div>
                      <div v-if="scope.row.deptType==2">医技科室</div>
                      <div v-if="scope.row.deptType==3">行政科室</div>
                      <div v-if="scope.row.deptType==4">财务科室</div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="160">
			         <template slot-scope="scope" >
					    <el-button size="small" @click="getTableDapartInfor(scope.row)" >编辑</el-button>
					        <el-button type="danger" size="small" @click="delDepartment(scope.row)">删除</el-button>
			 	        </template>
		     	</el-table-column>
               </el-table>
               <div style="text-align: center;margin-top: 30px;">
                    <el-pagination background
                        layout="prev, pager, next, sizes, total, jumper"
                        :page-sizes="[5, 10, 15, 20]"
                        :page-size="pagesize"
                        :total="tableDepartmentList.length"
                        @current-change="handleCurrentChange"
                        @size-change="handleSizeChange" >
                    </el-pagination>
                </div>
     </template>

     <!--    科室查询界面    -->
             <template>
                 <el-dialog title="科室查询"  :visible.sync="SelectVisible1" >
                     <el-table ref="multipleTable"
                               :data="SelecttableDepartmentList"
                               style="width: 90%"
                               @selection-change="handleSelectionChange"
                               tooltip-effect="dark">
                         <el-table-column  align="center" label="科室编码"  prop="deptCode">
                         </el-table-column>
                         <el-table-column  align="center" label="科室名称"  prop="deptName">
                         </el-table-column>
                         <el-table-column  align="center" label="类型编码"  prop="deptCategoryId">
                             <template slot-scope="scope">
                                 <div v-if="scope.row.deptCategoryId==11">内科</div>
                                 <div v-if="scope.row.deptCategoryId==12">外科</div>
                                 <div v-if="scope.row.deptCategoryId==14">儿科</div>
                                 <div v-if="scope.row.deptCategoryId==15">传染病科</div>
                                 <div v-if="scope.row.deptCategoryId==16">妇产科</div>
                                 <div v-if="scope.row.deptCategoryId==17">男科</div>
                                 <div v-if="scope.row.deptCategoryId==18">精神心理科</div>
                                 <div v-if="scope.row.deptCategoryId==19">皮肤性病科</div>
                                 <div v-if="scope.row.deptCategoryId==20">中医科</div>
                                 <div v-if="scope.row.deptCategoryId==21">肿瘤科</div>
                                 <div v-if="scope.row.deptCategoryId==22">骨科</div>
                                 <div v-if="scope.row.deptCategoryId==23">五官科</div>
                                 <div v-if="scope.row.deptCategoryId==24">康复医学科</div>
                                 <div v-if="scope.row.deptCategoryId==25">麻醉医学科</div>
                                 <div v-if="scope.row.deptCategoryId==26">营养科</div>
                                 <div v-if="scope.row.deptCategoryId==27">医技科</div>
                                 <div v-if="scope.row.deptCategoryId==28">医学影像学</div>
                                 <div v-if="scope.row.deptCategoryId==29">其他科室</div>
                             </template>
                         </el-table-column>
                         <el-table-column  align="center" label="科室类型"  prop="deptType">
                             <template slot-scope="scope">
                                 <div v-if="scope.row.deptType==1">临床科室</div>
                                 <div v-if="scope.row.deptType==2">医技科室</div>
                                 <div v-if="scope.row.deptType==3">行政科室</div>
                                 <div v-if="scope.row.deptType==4">财务科室</div>
                             </template>
                         </el-table-column>
                     </el-table>
                     <div slot="footer" class="dialog-footer">
                         <el-button @click="SelectVisible1 = false" >取 消</el-button>
                     </div>

                 </el-dialog>
             </template>


     <!-- 新增科室界面 -->
     <template>
        <el-dialog title="修改排班规则"  :visible.sync="outerVisible1" >
          <el-row>
              <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
              <el-col :span="10">
                  <div class="grid-content bg-purple">
                     <el-form  label-width="100px">
                         <el-form-item  label="科室编码:" >
                              <el-input  auto-complete="off" v-model="addDepartmentList.deptCode" ></el-input>
				         </el-form-item>
                     </el-form>
                  </div>
                </el-col>
               <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
                <el-col :span="10">
                 <div class="grid-content bg-purple">
                    <el-form  label-width="100px">
                       <el-form-item label="科室名称:">
					                <el-input  auto-complete="off" v-model="addDepartmentList.deptName" ></el-input>
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
                        <el-form-item label="类型编号:" >
					            <el-input  auto-complete="off" v-model="addDepartmentList.deptCategoryId" ></el-input>
				            </el-form-item>
                   </el-form>
                 </div>
               </el-col>
              <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
               <el-col :span="10">
              <div class="grid-content bg-purple">
                    <el-form  label-width="100px">
                       <el-form-item label="科室类型:">
                           <el-select v-model="addDepartmentList.deptType" placeholder="请选择科室">
                                  <el-option v-for="item in deptTypeOptions" :key="item.value" :label="item.label" :value="item.value">
                                  </el-option>
                            </el-select>
				        </el-form-item>
                   </el-form>
              </div>
           </el-col>
          </el-row>
          <div slot="footer" class="dialog-footer">
                <el-button @click="outerVisible1 = false" >取 消</el-button>
                <el-button type="primary" @click="addDepartment">提交</el-button>
          </div>
       </el-dialog>
     </template>

     <!-- 信息修改界面 -->

     <template>
        <el-dialog title="修改排班规则"  :visible.sync="outerVisible2" >
          <el-row>
              <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
              <el-col :span="10">
                  <div class="grid-content bg-purple">
                     <el-form  label-width="100px">
                         <el-form-item  label="科室编码:" >
                              <el-input  auto-complete="off" v-model="editDepartmentList.deptCode" ></el-input>
				         </el-form-item>
                     </el-form>
                  </div>
                </el-col>
               <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
                <el-col :span="10">
                 <div class="grid-content bg-purple">
                    <el-form  label-width="100px">
                       <el-form-item label="科室名称:">
					                <el-input  auto-complete="off" v-model="editDepartmentList.deptName" ></el-input>
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
                        <el-form-item label="类型编号:" >
					              <el-input  auto-complete="off" v-model="editDepartmentList.deptCategoryId" ></el-input>
				            </el-form-item>
                   </el-form>
                 </div>
               </el-col>
              <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
               <el-col :span="10">
              <div class="grid-content bg-purple">
                    <el-form  label-width="100px">
                       <el-form-item label="科室类型:">
                           <el-select v-model="editDepartmentList.deptType" placeholder="请选择科室">
                                <el-option v-for="item in deptTypeOptions" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
				        </el-form-item>
                   </el-form>
              </div>
           </el-col>
          </el-row>
          <div slot="footer" class="dialog-footer">
                <el-button @click="outerVisible2 = false" >取 消</el-button>
                <el-button type="primary" @click="updataDepartment">提交</el-button>
          </div>
       </el-dialog>
     </template>


    </div>
</div>
</template>
<script>
export default {
    data(){
        return{
            deptName:'',//按关键字查询
            SelectVisible1:false,//科室查询界面状态
            SelecttableDepartmentList:[
                {
                    deptCode:'',
                    deptName:'',
                    deptCategoryId:'',
                    deptType:''
                }
            ],


          deptTypeOptions:[
            {
              value:'1',
              label:'临床科室'
            },
             {
              value:'2',
              label:'医技科室'
            },
             {
              value:'3',
              label:'行政科室'
            },
             {
              value:'4',
              label:'财务科室'
            },
            ],
            outerVisible2:false,//编辑界面状态
            outerVisible1:false, //新增界面状态
            //表格分页
            multipleSelection: [],
            pagesize: 10,
            currpage: 1,

             editDepartmentList:{
                 deptCode:'',
                 deptName:'',
                 deptCategoryId:'',
                 deptType:''
          },

             addDepartmentList:{
                 deptCode:'',
                 deptName:'',
                 deptCategoryId:'',
                 deptType:''
             },
             tableDepartmentList:[
                {
                deptCode:'',
                deptName:'',
                deptCategoryId:'',
                deptType:''
                }

            ]
        }

    },

    methods:{

        //科室信息查询

        //关键字查询
        findByDeptName(){
            this.$axios({
                method: 'get',
                url: '/ad/findByDeptName?deptName='+this.deptName
            }).then((res) => {
                console.log(res)
                this.SelecttableDepartmentList= res.data.data;
            });
            this.SelectVisible1= true;
        },


      delDepartment(row){

            this.$confirm("是否删除？").then(_ => {
            this.$axios({
             method: 'delete',
             url: '/ad/updataDepartment',
             data:row    //表格当前的行的数据
             }).then((res) => {
              console.log(res);
              this.$message("科室删除成功")
              this.tableDepartmentList.splice(row,1);
           })
          })
      },


      updataDepartment(){
        this.$axios({
            method: 'put',
            url: '/ad/updataDepartment',
            data:this.editDepartmentList
            }).then((res) => {
             console.log(res);
             this.$message("科室信息修改成功")
             this.editDepartmentList = {}
             this.outerVisible2 = false;
          })

      },

      getTableDapartInfor(row){
         this.outerVisible2 = true;
         this.editDepartmentList = row;
      },

        //新增科室
        addDepartment(){
          this.$axios({
            method: 'post',
            url: '/ad/addDepartment',
            data:this.addDepartmentList
            }).then((res) => {
             console.log(res);
             this.$message("科室添加成功")
             this.addDepartmentList = {}
             this.outerVisible1 = false

          })

        },


            //查询科室
            getDataDepartment(){
            this.$axios({
            method: 'get',
            url: '/ad/findAllDepartments'
             }).then((res) => {
             console.log(res);
             this.total= res.data.totalnum;
            // this.tableData = res.body.data;
             this.tableDepartmentList = res.data.data;
          })
       },
         handleCurrentChange(cpage) {
             this.currpage = cpage;
             },
         handleSizeChange(psize) {
                 this.pagesize = psize;
                 },
         handleSelectionChange(val) {
              //console.log(val)
          },


    },
    created(){
        this.getDataDepartment()
      },
}
</script>


<style>

.demo_line_02{
        margin-top: 0px;
        margin-bottom: 15px;
	    height: 1px;
	    border-top: 1px solid cadetblue;
	    text-align: center;


	}


</style>

