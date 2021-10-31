<template>

   <div>
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
					<el-button type="primary" @click="outerVisible1 = true">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

        <!--列表  highlight-current-row
            v-loading="listLoading" .slice((currpage - 1) * pagesize, currpage * pagesize) -->
		<el-table   ref="multipleTable"
            :data="fmeditemList.slice((currpage - 1) * pagesize, currpage * pagesize)"
            @selection-change="handleSelectionChange"
            tooltip-effect="dark"
            style="width: 100%;">
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="itemcode" label="项目编码" align="center" width="110" sortable>
			</el-table-column>
			<el-table-column prop="itemname" label="项目名称" align="center" width="130"  sortable>
			</el-table-column>
			<el-table-column prop="format" label="规格" align="center" width="100" sortable>
			</el-table-column>
			<el-table-column prop="price" label="单价" align="center" width="90" sortable>
			</el-table-column>
			<el-table-column prop="expclassid" label="所属费用科目" align="center" width="140" sortable>
                 <template slot-scope="scope">
                   <div v-if="scope.row.expclassid==3">检验费</div>
                   <div v-if="scope.row.expclassid==7">放射检查费</div>
                   <div v-if="scope.row.expclassid==16">放射科</div>
                </template>
			</el-table-column>
            <el-table-column prop="deptid" label="执行科室" align="center" width="120" sortable>
                <template slot-scope="scope">
                   <div v-if="scope.row.deptid==122">高压氧科</div>
                   <div v-if="scope.row.deptid==125">检验科</div>
                   <div v-if="scope.row.deptid==128">放射科</div>
                   <div v-if="scope.row.deptid==133">护理科</div>
                </template>
			</el-table-column>
            <el-table-column prop="memoniccode" label="助记码" align="center" width="100" sortable>
			</el-table-column>
            <el-table-column prop="recordtype" label="项目类型" align="center" width="100" sortable>
			</el-table-column>
            <el-table-column prop="creationdate" label="创建时间" align="center" width="120" sortable>
                 <template slot-scope="scope" >
                 {{scope.row.creationdate | dateTimeForm}}
             </template>
			</el-table-column>
			<el-table-column label="操作" align="center" width="160">
				<template  slot-scope="scope">
					<el-button size="small"  @click="EidtFmeditem(scope.row)" >编辑</el-button>
					<el-button type="danger" size="small" >删除</el-button>
				</template>
			</el-table-column>
		</el-table>
        <div style="text-align: center;margin-top: 30px;">
             <el-pagination background
                   layout="prev, pager, next, sizes, total, jumper"
                   :page-sizes="[5, 10, 15, 20]"
                   :page-size="pagesize"
                   :total="fmeditemList.length"
                   @current-change="handleCurrentChange"
                   @size-change="handleSizeChange" >
            </el-pagination>
        </div>


        <!--编辑界面-->
         <template>
        <el-dialog title="非药品收费项目信息修改"  :visible.sync="outerVisible">
          <el-row>
              <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
              <el-col :span="10">
                  <div class="grid-content bg-purple">
                     <el-form  label-width="100px">
                         <el-form-item  label="项目编码:" >
					       <el-input auto-complete="off" v-model="editFmeditemList.itemcode" placeholder="请输入疾病编码"  clearable></el-input>
				         </el-form-item>
                     </el-form>
                  </div>
                </el-col>
               <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
                <el-col :span="10">
                 <div class="grid-content bg-purple">
                    <el-form  label-width="100px">
                       <el-form-item label="项目名称:">
					   <el-input  auto-complete="off" v-model="editFmeditemList.itemname" ></el-input>
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
                        <el-form-item label="规格:" >
					   <el-input  auto-complete="off" v-model="editFmeditemList.format" ></el-input>
				    </el-form-item>
                   </el-form>
                 </div>
               </el-col>
              <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
               <el-col :span="10">
              <div class="grid-content bg-purple">
                    <el-form  label-width="100px">
                       <el-form-item label="单价:">
					       <el-input  auto-complete="off"  v-model="editFmeditemList.price" ></el-input>
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
                        <el-form-item label="所属费用科目:" >
					   <el-input  auto-complete="off" v-model="editFmeditemList.expclassid"></el-input>
				    </el-form-item>
                   </el-form>
              </div>
           </el-col>
           <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
           <el-col :span="10">
              <div class="grid-content bg-purple">
                    <el-form  label-width="100px">
                       <el-form-item label="执行科室:">
					     <el-input  auto-complete="off" v-model="editFmeditemList.deptid"  ></el-input>
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
                        <el-form-item label="助记码:" >
					   <el-input  auto-complete="off"  v-model="editFmeditemList.memoniccode"></el-input>
				    </el-form-item>
                   </el-form>
              </div>
           </el-col>
           <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
           <el-col :span="10">
              <div class="grid-content bg-purple">
                    <el-form  label-width="100px">
                       <el-form-item label="项目类型:">
					     <el-input  auto-complete="off" v-model="editFmeditemList.recordtype" ></el-input>
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
                        <el-form-item label="创建时间:" >
					    <el-input  auto-complete="off" v-model="editFmeditemList.creationdate">
                             <template slot-scope="scope" >
                                {{scope.creationdate | dateTimeForm}}
                             </template>
                       </el-input>
				    </el-form-item>
                   </el-form>
              </div>
           </el-col>
          </el-row>

              <div slot="footer" class="dialog-footer">
                   <el-button @click="CanselEdit">取 消</el-button>
                   <el-button type="primary" @click=" updataFmeditem">提交</el-button>
              </div>
       </el-dialog>
     </template>

     <!-- 新增非药品收费项目 -->
     <template>
        <el-dialog title="非药品收费项目信息修改"  :visible.sync="outerVisible1">
          <el-row>
              <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
              <el-col :span="10">
                  <div class="grid-content bg-purple">
                     <el-form  label-width="100px">
                         <el-form-item  label="项目编码:" >
					       <el-input auto-complete="off" v-model="addFmeditemList.itemcode" placeholder="请输入疾病编码"  clearable></el-input>
				         </el-form-item>
                     </el-form>
                  </div>
                </el-col>
               <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
                <el-col :span="10">
                 <div class="grid-content bg-purple">
                    <el-form  label-width="100px">
                       <el-form-item label="项目名称:">
					   <el-input  auto-complete="off" v-model="addFmeditemList.itemname" ></el-input>
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
                        <el-form-item label="规格:" >
					   <el-input  auto-complete="off" v-model="addFmeditemList.format" ></el-input>
				    </el-form-item>
                   </el-form>
                 </div>
               </el-col>
              <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
               <el-col :span="10">
              <div class="grid-content bg-purple">
                    <el-form  label-width="100px">
                       <el-form-item label="单价:">
					       <el-input  auto-complete="off"  v-model="addFmeditemList.price" ></el-input>
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
                        <el-form-item label="所属费用科目:" >
					   <el-input  auto-complete="off" v-model="addFmeditemList.expclassid"></el-input>
				    </el-form-item>
                   </el-form>
              </div>
           </el-col>
           <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
           <el-col :span="10">
              <div class="grid-content bg-purple">
                    <el-form  label-width="100px">
                       <el-form-item label="执行科室:">
					     <el-input  auto-complete="off" v-model="addFmeditemList.deptid"  ></el-input>
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
                        <el-form-item label="助记码:" >
					   <el-input  auto-complete="off"  v-model="addFmeditemList.memoniccode"></el-input>
				    </el-form-item>
                   </el-form>
              </div>
           </el-col>
           <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
           <el-col :span="10">
              <div class="grid-content bg-purple">
                    <el-form  label-width="100px">
                       <el-form-item label="项目类型:">
					     <el-input  auto-complete="off" v-model="addFmeditemList.recordtype" ></el-input>
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
                        <el-form-item label="创建时间:" >
					   <el-input  auto-complete="off" v-model="addFmeditemList.creationdate">

                       </el-input>
				    </el-form-item>
                   </el-form>
              </div>
           </el-col>
          </el-row>

              <div slot="footer" class="dialog-footer">
                   <el-button @click="outerVisible1 = false">取 消</el-button>
                   <el-button type="primary" @click="addFmeditem" >提交</el-button>
              </div>
       </el-dialog>
     </template>





</div>

</template>

<script>
export default {
    data(){
        return{

            outerVisible:false,//编辑界面状态
            outerVisible1:false,//新增界面状态

            addFmeditemList:{
                itemcode:'',
                itemname:'',
                format:'',
                price:'',
                expclassid:'',
                deptid:'',
                memoniccode:'',
                recordtype:'',
                creationdate:''
            },

            editFmeditemList:{
                itemcode:'',
                itemname:'',
                format:'',
                price:'',
                expclassid:'',
                deptid:'',
                memoniccode:'',
                recordtype:'',
                creationdate:''
            },

            fmeditemList:[ {
                itemcode:'',
                itemname:'',
                format:'',
                price:'',
                expclassid:'',
                deptid:'',
                memoniccode:'',
                recordtype:'',
                creationdate:''
              } ],
             //表格分页
            multipleSelection: [],
            pagesize: 10,
            currpage: 1,




        }
    },

    methods:{

        CanselEdit(){ //取消编辑界面
            this.outerVisible=false

        },

         updataFmeditem(){
             //修改非药品收费项目信息
          this.$axios({
            method: 'put',
            url: '/ad/updataFmeditem',
            data:this.editFmeditemList
            }).then((res) => {
             console.log(res);
             this.$message("用户信息修改成功")
             this.editFmeditemList = {}
             this.outerVisible = false;
          })
       },

        addFmeditem(){//添加非药品收费项目信息
         this.$axios({
            method: 'post',
            url: '/ad/addFmeditem',
            data:this.addFmeditemList
            }).then((res) => {
             console.log(res);
             this.$message("添加成功")
             /* this.addFmeditemList.clear() */
             this.addList = {}
             this.outerVisible1 = false
          })
        },

        //编辑界面从表格中获取数据
        EidtFmeditem(row){
            this.outerVisible = true
            this.editFmeditemList = row
            if(row.expclassid==3){
                this.editFmeditemList.expclassid ="检验费"
            }
            else{
                if(row.expclassid==7)
                   this.editFmeditemList.expclassid ="放射检查费"
                else
                  this.editFmeditemList.expclassid ="处置费"
            }
            switch(row.deptid){
                case 122:
                    this.editFmeditemList.deptid ="高压氧科";
                    break;
                case 125:
                    this.editFmeditemList.deptid ="检验科";
                    break;
                case 128:
                    this.editFmeditemList.deptid ="放射科";
                    break;
                case 133:
                    this.editFmeditemList.deptid ="护理科";
                    break;
            }
           this.findAll();

        },


        //查询所有数据
        findAll(){
          this.$axios({
            method: 'get',
            url: '/ad/findAllFemdItems'
            }).then((res) => {
             console.log(res);
            this.fmeditemList = res.data.data;
          })
         },

         //表格分页显示
        handleCurrentChange(cpage) {
             this.currpage = cpage;
             },
         handleSizeChange(psize) {
                 this.pagesize = psize;
                 },
         handleSelectionChange(val) {
                     console.log(val)
                      }

    },
    created(){
        //组件加载时调用查询所有数据的方法
        this.findAll()
    }



}
</script>

<style scoped>

</style>
