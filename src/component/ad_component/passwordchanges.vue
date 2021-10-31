<template>
<div>
    <el-row></el-row>
    <div class="changediv">
    <el-row></el-row>
    <el-row></el-row>
    <el-row></el-row>
    <el-row>
    <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
    <el-col :span="12">
          <div class="grid-content bg-purple-light">
               <el-form  label-width="100px">
                    <el-form-item label="账 号:">
                           <el-input placeholder="请输入内容" v-model="username" clearable></el-input>
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
                           <el-input placeholder="请输入内容" v-model="userpassword" clearable></el-input>
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
                           <el-input placeholder="请输入内容" v-model="newpassword" clearable></el-input>
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

<el-row></el-row>
<el-row></el-row>

</div>




</div>
    
</template>

<script>
export default {
    data(){
        return{
            username:'',
            userpassword:'',
            newpassword:'',
        }
    }
    
}
</script>

<style scoped>

.changediv{
    /* border: 1px solid cadetblue; */
    background-color: rgba(169, 218, 220, 0.3);
    margin-left: 200px;
    margin-right: 220px;
    border-radius:10px;

}


</style>

