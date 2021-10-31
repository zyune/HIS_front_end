<template>
  <div class="show">

      <!--工具条-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
          <el-form :inline="true">
              <el-form-item>
                  <el-input  placeholder="按关键字查询"  v-model="levelName"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" @click="findSCheduruleByOdname" >查询</el-button>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary"  @click="addGistration">新增</el-button>
              </el-form-item>
          </el-form>
      </el-col>
        <!-- 列表 -->
        <el-table   ref="multipleTable"
                  :data="Gistratiomlevel"
                    style="width: 90%;">
          <el-table-column prop="levelName" label="挂号级别" align="center" width="200" sortable>
          </el-table-column>
          <el-table-column prop="registrationFee" label="挂号费/元" align="center" width="200"  sortable>
          </el-table-column>
          <el-table-column label="操作" align="center" width="230">
            <template  slot-scope="scope">
              <el-button size="small"  @click="EidtFmeditem(scope.row)" >编辑</el-button>
              <el-button type="danger" size="small" @click="delRegistrationLevel(scope.row)" >删除</el-button>
            </template>
          </el-table-column>
        </el-table>




       <!--  挂号级别编辑界面  -->
        <template>
          <el-dialog title="挂号级别信息修改" :visible.sync="centerDialogVisible">
            <el-row>
              <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
              <el-col :span="10">
                  <div class="grid-content bg-purple">
                     <el-form  label-width="100px">
                         <el-form-item  label="挂号级别:" >
                             <el-select v-model="editListreginfo.levelName" >
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
                         <el-form-item  label="挂号费/元:" >
					       <el-input auto-complete="off"  v-model="editListreginfo.registrationFee" clearable></el-input>
				         </el-form-item>
                     </el-form>
                  </div>
                </el-col>
          </el-row>
           <div slot="footer" class="dialog-footer">
                   <el-button @click="canseEdit">取 消</el-button>
                   <el-button type="primary"  @click="updataRegistrationLevel" >提交</el-button>
           </div>
          </el-dialog>
        </template>
         <!-- 添加挂号级别 -->
        <template>
          <el-dialog title="添加挂号级别" :visible.sync="outerVisible">
            <el-row>
              <el-col :span="1"><div class="grid-content bg-purple"></div></el-col>
              <el-col :span="10">
                  <div class="grid-content bg-purple">
                     <el-form  label-width="100px">
                         <el-form-item  label="挂号级别:" >
                           <el-input v-model="addList.levelName" clearable></el-input>
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
                         <el-form-item  label="挂号费/元:" >
					       <el-input auto-complete="off"  v-model="addList.registrationFee" clearable></el-input>
				         </el-form-item>
                     </el-form>
                  </div>
                </el-col>
          </el-row>
           <div slot="footer" class="dialog-footer">
                   <el-button @click="canseadd">取 消</el-button>
                   <el-button type="primary" @click="addRegistrationLevel"  >提交</el-button>
           </div>
          </el-dialog>
        </template>




  </div>
</template>
<script>
export default {
  data() {
    return {

        levelName:'',
        value:'',
      leveltypeOptions:[],//挂号级别
      Gistratiomlevel:[
        {
            levelName:'',
            registrationFee:''
          }
        ],
        editListreginfo: {
          levelName:'',
          registrationFee:''
          },
        addList: {
          levelName:'',
          registrationFee:''
          },
        centerDialogVisible:false, //挂号级别编辑界面状态
        outerVisible:false, // 新增挂号级别界面状体
    }
  },
  methods: {


      //实现按关键字查询挂号级别
      findSCheduruleByOdname(){
          this.$axios({
              method: 'get',
              url: '/ad/findAllResidLevelByLname?levelName='+this.levelName
          }).then((res) => {
              console.log(res)
              this.Gistratiomlevel= res.data.data;
          });

         // this.outerVisible4= true;
      },



      addGistration(){
           this.outerVisible = true
          this.findAllRegistrationLevel();
       },

       canseadd(){
          this.outerVisible = false
          this.findAllRegistrationLevel();
    },

      canseEdit(){  //取消挂号级别编辑界面
          this.centerDialogVisible = false
          this.findAllRegistrationLevel();
      },
      //获取table当前行的数据
    EidtFmeditem(row){
      this.editListreginfo = row;
      this.centerDialogVisible = true

    },
     //删除挂号级别
    delRegistrationLevel(row){
          this.$confirm("是否删除？").then(_ => {
            this.$axios({
             method: 'delete',
             url: '/ad/delRegistrationLevel',
             data:row    //表格当前的行的数据
             }).then((res) => {
              console.log(res);
              this.$message("用户信息删除成功")
              this.Gistratiomlevel.splice(row,1);
           })
          })

       },
    // 查询挂号级别
    findAllRegistrationLevel(){
            this.$axios({
            method: 'get',
            url: '/ad/findAllRegistrationLevel'
            }).then((res) => {
            // console.log(res);
             this.Gistratiomlevel = res.data.data;
             this.leveltypeOptions = res.data.data;
          })
       },
       //增加挂号级别
       addRegistrationLevel(){
         this.$axios({
            method: 'post',
            url: '/ad/addRegistrationLevel',
            data:this.addList
            }).then((res) => {
             console.log(res);
             this.$message("挂号级别添加成功！")
             this.addList = {}
             this.outerVisible = false
          })
      },
       //修改挂号级别信息
       updataRegistrationLevel(){
          this.$axios({
            method: 'put',
            url: 'ad/updataRegistrationLevel',
            data: this.editListreginfo
            }).then((res) => {
             console.log(res);
             this.$message("挂号级别信息修改成功！")
             this.editListreginfo = {}
             this.centerDialogVisible = false;
          })
       },
  },
  created(){
    this.findAllRegistrationLevel();
  }


}
</script>
<style >
.show{
  margin-left: 150px;
}

.el-row {
  margin-bottom: 50px;

}
</style>
