<template>
<div>
    <!-- <selection> -->
    	<!--工具条-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item>
					<el-input  placeholder="疾病名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" >查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary"  @click="addOuterVisible = true">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

        <!--列表  @selection-change="selsChange"  v-loading="listLoading"-->
		<el-table  ref="multipleTable"
               :data="tabledisease.slice((currpage - 1) * pagesize, currpage * pagesize)"
                highlight-current-row
                @selection-change="handleSelectionChange"
                style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column prop="diseaseCode" label="疾病编码" width="160" sortable>
			</el-table-column>
			<el-table-column prop="diseaseName" label="疾病名称" width="160"  sortable>
			</el-table-column>
			<el-table-column prop="diseaseIcd" label="疾病助记码" width="160" sortable>
			</el-table-column>
			<el-table-column prop="dicaCode" label="疾病类型编码" width="160" sortable>
			</el-table-column>
			<el-table-column prop="dicaName" label="分类名称" width="160" sortable>
			</el-table-column>
            <el-table-column prop="sequenceNo" label="顺序号" width="160" sortable>
			</el-table-column>
            <el-table-column prop="dicaType" label="疾病类型" width="160" sortable>
            </el-table-column>
			<el-table-column label="操作" align="center" width="160">
				<template  >
					<el-button size="small"  @click="outerVisible = true" >编辑</el-button>
					<el-button type="danger" size="small"   @click="handleDelete(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

         <div style="text-align: center;margin-top: 30px;">
                    <el-pagination background
                        layout="prev, pager, next, sizes, total, jumper"
                        :page-sizes="[5, 10, 15, 20]"
                        :page-size="pagesize"
                        :total="tabledisease.length"
                        @current-change="handleCurrentChange"
                        @size-change="handleSizeChange" >
                    </el-pagination>
         </div>

        	<!--工具条  @current-change="handleCurrentChange"  :total="total"-->
		<el-col :span="24" class="toolbar">
			<el-button   type="danger" size="mini">批量删除</el-button>
			<el-pagination layout="prev, pager, next"  :page-size="20"  style="float:right;">
			</el-pagination>
		</el-col>

        <!--编辑界面-->
        <!-- <template>
        <el-dialog title="诊断目录信息修改"  :visible.sync="outerVisible">
          <el-row>
              <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
              <el-col :span="10">
                  <div class="grid-content bg-purple">
                     <el-form  label-width="100px">
                         <el-form-item  label="疾病编码:" >
					       <el-input auto-complete="off" placeholder="请输入疾病编码" v-model="editList.disease_code" clearable></el-input>
				         </el-form-item>
                     </el-form>
                  </div>
                </el-col>
               <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
                <el-col :span="10">
                 <div class="grid-content bg-purple">
                    <el-form  label-width="100px">
                       <el-form-item label="疾病名称:">
					   <el-input  auto-complete="off"  v-model="editList.disease_name"></el-input>
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
                        <el-form-item label="疾病助记码:" >
					   <el-input  auto-complete="off" v-model="editList.disease_icd"></el-input>
				    </el-form-item>
                   </el-form>
                 </div>
               </el-col>
              <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
               <el-col :span="10">
              <div class="grid-content bg-purple">
                    <el-form  label-width="100px">
                       <el-form-item label="类型编码:">
					       <el-input  auto-complete="off"  v-model="editList.dica_code"></el-input>
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
                        <el-form-item label="疾病类型:" >
					   <el-input  auto-complete="off" v-model="editList.dica_name"></el-input>
				    </el-form-item>
                   </el-form>
              </div>
           </el-col>
           <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
           <el-col :span="10">
              <div class="grid-content bg-purple">
                    <el-form  label-width="100px">
                       <el-form-item label="顺序号:">
					     <el-input  auto-complete="off"  v-model="editList.sequence_no"></el-input>
				       </el-form-item>
                   </el-form>
              </div>
           </el-col>
          </el-row>

              <div slot="footer" class="dialog-footer">
                   <el-button @click="outerVisible = false">取 消</el-button>
                   <el-button type="primary" >提交</el-button>
              </div>
       </el-dialog>
     </template>-->

     <!-- 添加界面 -->
     <!--<template>
        <el-dialog title="添加诊断目录信息"  :visible.sync="addOuterVisible">
          <el-row>
              <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
              <el-col :span="10">
                  <div class="grid-content bg-purple">
                     <el-form  label-width="100px">
                         <el-form-item  label="疾病编码:" >
					       <el-input auto-complete="off" placeholder="请输入疾病编码" v-model="addList.disease_code" clearable></el-input>
				         </el-form-item>
                     </el-form>
                  </div>
                </el-col>
               <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
                <el-col :span="10">
                 <div class="grid-content bg-purple">
                    <el-form  label-width="100px">
                       <el-form-item label="疾病名称:">
					   <el-input  auto-complete="off"  v-model="addList.disease_name"></el-input>
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
                        <el-form-item label="疾病助记码:" >
					   <el-input  auto-complete="off" v-model="addList.disease_icd"></el-input>
				    </el-form-item>
                   </el-form>
                 </div>
               </el-col>
              <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
               <el-col :span="10">
              <div class="grid-content bg-purple">
                    <el-form  label-width="100px">
                       <el-form-item label="类型编码:">
					       <el-input  auto-complete="off"  v-model="addList.dica_code"></el-input>
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
                        <el-form-item label="疾病类型:" >
					   <el-input  auto-complete="off" v-model="addList.dica_name"></el-input>
				    </el-form-item>
                   </el-form>
              </div>
           </el-col>
           <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
           <el-col :span="10">
              <div class="grid-content bg-purple">
                    <el-form  label-width="100px">
                       <el-form-item label="顺序号:">
					     <el-input  auto-complete="off"  v-model="addList.sequence_no"></el-input>
				       </el-form-item>
                   </el-form>
              </div>
           </el-col>
          </el-row>
              <div slot="footer" class="dialog-footer">
                   <el-button>取 消</el-button>
                   <el-button type="primary" >添加</el-button>
              </div>
       </el-dialog>
     </template>-->

     <!-- 删除提示界面 -->
    <!-- <template>
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
           <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
                <span slot="footer" class="dialog-footer">
                   <el-button @click="delVisible = false">取 消</el-button>
                   <el-button type="primary"  >确 定</el-button>
                   &lt;!&ndash; @click="deleteRow"   &ndash;&gt;
                </span>
        </el-dialog>
     </template>-->









<!--
    </selection> -->
</div>


</template>

<script>
export default {
    data(){
        return{

            //表格分页显示
            multipleSelection: [],
            pagesize: 10,
            currpage: 1,
             tabledisease:[
                   {
                       diseaseCode:'',
                       diseaseName:'',
                       diseaseIcd:'',
                       dicaCode:'',
                       dicaName:'',
                       sequenceNo:'',
                       dicaType:''
                    }
                ],
            //outerVisible: false,  //编辑界面的状态
             // ddOuterVisible :false, //增加界面的状态
              //delVisible:false, //删除提示框的状态
              msg:'',   //记录每一条数据，方便取id


             //编辑界面数据
            /* editList:{
                 diseaseCode:'',
                 diseaseName:'',
                 diseaseIcd:'',
                 dicaCode:'',
                 dicaName:'',
                 sequenceNo:'',
                 dicaType:''
             },*/
            //添加界面数据
             /*addList:{
                 diseaseCode:'',
                 diseaseName:'',
                 diseaseIcd:'',
                 dicaCode:'',
                 dicaName:'',
                 sequenceNo:'',
                 dicaType:''
             },*/

            //诊断目录数据
            DiseaseList:[{
                    diseaseCode:'',
                    diseaseName:'',
                    diseaseIcd:'',
                    diseCategoryId:''
                }],
            //诊断类型数据
            DisacategoryList:[{
                id:'',
                dicaCode:'',
                dicaName:'',
                sequenceNo:'',
                dicaType:''
            }],
            //拼接数据串
            pinjie:[]






        }
    },

    methods:{

         //表格分页
         handleCurrentChange(cpage) {
             this.currpage = cpage;
             },
         handleSizeChange(psize) {
                 this.pagesize = psize;
                 },
         handleSelectionChange(val) {
                     console.log(val)
                      },

         handleDelete(index, row) {
            this.idx = index;
            this.msg=row;//每一条数据的记录
            this.delarr.push(this.msg.disease_code);//把单行删除的每条数据的id添加进放删除数据的数组
            this.delVisible = true;
         },


        //查询诊断目录
        findAllDisease(){
            this.$axios({
                method: 'get',
                url: '/ad/findAllDisease'
            }).then((res) => {
                this.DiseaseList = res.data.data;
            })
            console.log(this.DiseaseList);
        },
        //查询诊断类型
        findAllDisacategory(){
            this.$axios({
                method: 'get',
                url: '/ad/findAllDisacategory'
            }).then((res) => {
                this.DisacategoryList = res.data.data;
            })
            console.log(this.DisacategoryList);
        },











    },

    created(){
       this.findAllDisease();
       this.findAllDisacategory();


    }


}
</script>

<style scoped>

</style>






