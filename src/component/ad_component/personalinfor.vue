<template>
<div>
    <el-row></el-row>
    <el-row></el-row>
    <el-row :gutter="20">
       <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>
       <el-col :span="8">
           <div class="grid-content bg-purple">
                <el-form  label-width="100px">
                       <el-form-item label="账 号">
                           <el-input  v-model="Personinfo.username" ></el-input>
                       </el-form-item>
                </el-form>  
           </div>
        </el-col>
       <el-col :span="8">
            <div class="grid-content bg-purple">
                <el-form  label-width="100px">
                       <el-form-item label="姓 名">
                           <el-input  v-model="Personinfo.name" ></el-input>
                       </el-form-item>
                   </el-form>  
            </div>
        </el-col>
       <el-col :span="2"><div class="grid-content bg-purple"></div></el-col>
    </el-row>

    <el-row :gutter="20">
       <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>
       <el-col :span="8">
           <div class="grid-content bg-purple">
                <el-form  label-width="100px">
                       <el-form-item label="职 位">
                           <el-input  v-model="Personinfo.position" ></el-input>
                       </el-form-item>
                </el-form>  
           </div>
        </el-col>
       <el-col :span="8">
            <div class="grid-content bg-purple">
                <el-form  label-width="100px">
                       <el-form-item label="角 色">
                           <el-input  v-model="Personinfo.role" ></el-input>
                       </el-form-item>
                   </el-form>  
            </div>
        </el-col>
       <el-col :span="2"><div class="grid-content bg-purple"></div></el-col>
    </el-row>

    <el-row :gutter="20">
       <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>
       <el-col :span="8">
           <div class="grid-content bg-purple">
                <el-form  label-width="100px">
                       <el-form-item label="科 室">
                           <el-input  v-model="Personinfo.departmentName" ></el-input>
                       </el-form-item>
                </el-form>  
           </div>
        </el-col>
       <el-col :span="8">
            <div class="grid-content bg-purple">
                <el-form  label-width="100px">
                       <el-form-item label="排 班">
                           <el-input  v-model="Personinfo.isSchedul" ></el-input>
                       </el-form-item>
                   </el-form>  
            </div>
        </el-col>
       <el-col :span="2"><div class="grid-content bg-purple"></div></el-col>
    </el-row>

    <el-row :gutter="20">
       <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>
       <el-col :span="8">
           <div class="grid-content bg-purple">
                <el-form  label-width="100px">
                       <el-form-item label="电 话">
                           <el-input  v-model="Personinfo.iphone" ></el-input>
                       </el-form-item>
                </el-form>  
           </div>
        </el-col>
        <el-col :span="8">
           <div class="grid-content bg-purple">
                <el-form  label-width="100px">
                       <el-form-item label="地 址">
                           <el-input  v-model="Personinfo.adderst" ></el-input>
                       </el-form-item>
                </el-form>  
           </div>
        </el-col>
    </el-row>

    <el-row :gutter="20">
       <el-col :span="16"><div class="grid-content bg-purple"></div></el-col>
       <el-col :span="3">
           <div class="grid-content bg-purple">
                <el-button type="primary" @click="changePass" >修改密码</el-button>
           </div>
        </el-col>
    </el-row>

     <!-- 修改密码页面 -->
     <template>
         <el-dialog :visible.sync="outerVisible">
              <el-row>
    <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
    <el-col :span="12">
          <div class="grid-content bg-purple-light">
               <el-form  label-width="100px">
                    <el-form-item label="账 号:">
                           <el-input placeholder="请输入内容" v-model=" changePassword.username" clearable></el-input>
                    </el-form-item>
                </el-form>  
          </div>
    </el-col>
  
</el-row>

<el-row>
    <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
    <el-col :span="12">
          <div class="grid-content bg-purple-light">
               <el-form  label-width="100px">
                    <el-form-item label="密 码:">
                           <el-input placeholder="请输入内容" v-model=" changePassword.userpassword" clearable></el-input>
                    </el-form-item>
                </el-form>  
          </div>
    </el-col>
 
</el-row>

<el-row>
    <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
    <el-col :span="12">
          <div class="grid-content bg-purple-light">
               <el-form  label-width="100px">
                    <el-form-item label="新密码:">
                           <el-input placeholder="请输入内容" v-model=" changePassword.ewpassword" clearable></el-input>
                    </el-form-item>
                </el-form>  
          </div>
    </el-col>
  
</el-row>

<el-row>
    <el-col :span="10"><div class="grid-content bg-purple-light"></div></el-col>
    <el-col :span="3">
          <div class="grid-content bg-purple-light">
               <el-button   size="mini">重置</el-button>
          </div>
    </el-col>
     
     <el-col :span="3">
          <div class="grid-content bg-purple-light">
               <el-button type="primary"  size="mini">确认</el-button>
          </div>
    </el-col>
</el-row>
         </el-dialog>
     </template>
</div>    
   
   

</template>

<script>
export default {
    data(){
        return{
            outerVisible:false,
            changePassword:[{
                 username:'',
                 userpassword:'',
                 newpassword:'',
            }],
        Personinfo:[
            {
            name: "",
            username: "",
            position: "",
            iphone: "",
            departmentName: "",
            adderst:'',
            role:'',
            isSchedul: "",
            }
        ],
            
        }
    },
    methods:{
        changePass(){
            this.changePassword.username = this.Personinfo.username
             this.outerVisible=true
        }
       
    }
    
}
</script>

<style scoped>


</style>


