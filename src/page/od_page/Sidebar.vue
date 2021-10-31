<template>
    <div >
        <div class="sidebar">
            <el-row >
                <el-col>
                    <el-menu  @open="handleOpen" @close="handleClose" >
                        <el-menu-item index="1" ><i class="el-icon-star-on"></i> 门诊医生系统  </el-menu-item>
                        <el-submenu index="2" >
                            <template slot="title"  ><i class="el-icon-menu"></i>病历首页</template>
                            <el-menu-item  ><router-link to="mzbl"> 病历首页录入 </router-link></el-menu-item>
                        </el-submenu>
                        <el-submenu index="3">
                            <template slot="title" ><i class="el-icon-date"></i>药品申请</template>
                            <el-menu-item > <router-link to="mySchedul"> 草药申请 </router-link> </el-menu-item>
                            <el-menu-item > <router-link to="schedulManagement">西药申请 </router-link></el-menu-item>
                        </el-submenu>
                        <el-submenu index="4">
                            <template slot="title" ><i class="el-icon-menu"></i>处置检查检验申请</template>
                            <el-menu-item > <router-link to="Departadddel">  检查申请  </router-link> </el-menu-item>
                            <el-menu-item > <router-link to="Departadddel">  检验申请  </router-link> </el-menu-item>
                            <el-menu-item > <router-link to="Departadddel">  处置申请  </router-link> </el-menu-item>
                        </el-submenu>
                        <el-submenu  index="5">
                            <template slot="title" ><i class="el-icon-menu"></i>患者账单信息</template>
                            <el-menu-item > <router-link to="GistrationAddDel"> 患者账单 </router-link> </el-menu-item>
                        </el-submenu>

                        <el-submenu index="6">
                            <template slot="title" ><i class="el-icon-tickets"></i>组套管理</template>
                            <el-menu-item > <router-link to="Fmeditemadddel"> 病历首页模板管理 </router-link> </el-menu-item>
                            <el-menu-item  ><router-link to="Fmeditemupdateselect">处置组套管理 </router-link></el-menu-item>
                            <el-menu-item  ><router-link to="Fmeditemupdateselect">检查组套管理 </router-link></el-menu-item>
                            <el-menu-item  ><router-link to="Fmeditemupdateselect">检验组套管理 </router-link></el-menu-item>

                        </el-submenu>
                        <el-submenu index="7">
                            <template slot="title" ><i class="el-icon-document"></i>个人工作量统计</template>
                            <el-menu-item > <router-link to="Diseaseadddel"> 个人工作量 </router-link> </el-menu-item>
                        </el-submenu>
                        <el-submenu index="8" >
                            <template slot="title" ><i class="el-icon-setting"></i>个人中心</template>
                            <el-menu-item ><router-link to="Personalinfor">个人信息 </router-link> </el-menu-item>
                            <el-menu-item ><router-link to="Passwordchange">密码修改</router-link></el-menu-item>
                        </el-submenu>
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
        position:relative;
        width: 350px;
        margin-top: 0px;
        /* background-color:rgba(45, 135, 140, 0.2); */
        /* border-right: solid 2px gray; */

    }
    .el-menu-vertical-demo{
        background-color:rgba(45, 135, 140, 0.5);
    }



</style>



