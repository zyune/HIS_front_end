<template>
<div >
 <div class="sidebar">
        <el-row >
          <el-col>
             <el-menu  @open="handleOpen" @close="handleClose" >
             <!-- <el-menu-item index="1" ><i class="el-icon-star-on"></i> 系统主页  </el-menu-item>-->
              <el-submenu index="2" >
                  <template slot="title"  ><i class="el-icon-menu"></i>用户管理</template>
                  <el-menu-item  ><router-link to="/adhome/userManagement"> 用户信息维护 </router-link></el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                  <template slot="title" ><i class="el-icon-date"></i>医生排班管理</template>
                  <el-menu-item > <router-link to="/adhome/schedulingrule"> 排班规则信息维护 </router-link> </el-menu-item>
                  <el-menu-item > <router-link to="/adhome/schedulinginfo">排班信息 </router-link></el-menu-item>
                </el-submenu>
                <el-submenu index="4">
                  <template slot="title" ><i class="el-icon-menu"></i>科室管理</template>
                  <el-menu-item > <router-link to="/adhome/departmented">  科室基本信息维护  </router-link> </el-menu-item>
                </el-submenu>
                <el-submenu  index="5">
                  <template slot="title" ><i class="el-icon-menu"></i>挂号级别管理</template>
                  <el-menu-item > <router-link to="/adhome/gistrationManagement"> 挂号级别基本信息维护 </router-link> </el-menu-item>
                </el-submenu>

                <el-submenu index="6">
                  <template slot="title" ><i class="el-icon-tickets"></i>非药品收费项目管理</template>
                  <el-menu-item > <router-link to="/adhome/fmeditem"> 非药品收费项目基础信息维护 </router-link> </el-menu-item>

                </el-submenu>
               <!-- <el-submenu index="7">
                  <template slot="title" ><i class="el-icon-document"></i>诊断目录管理</template>
                  <el-menu-item > <router-link to="/adhome/diseasListadddel"> 诊断目录基础信息维护 </router-link> </el-menu-item>

                </el-submenu>-->
                <!--<el-submenu index="8" >
                  <template slot="title" ><i class="el-icon-setting"></i>个人中心</template>
                  <el-menu-item ><router-link to="/adhome/personalinfo">个人信息 </router-link> </el-menu-item>
                </el-submenu>-->
            </el-menu>
          </el-col>
        </el-row>
 </div>

</div>
</template>
<script>

export default {

     methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }


  }
</script>
<style scoped>

.router-link-active {
    text-decoration: none;
}

.sidebar{
        display: block;
        height:100%;
        position: absolute;
        width: 350px;
        margin-top: 0px;
        /* background-color:rgba(45, 135, 140, 0.2); */
         /* border-right: solid 2px gray; */

}
.el-menu-vertical-demo{
   background-color:rgba(45, 135, 140, 0.5);
}



</style>



