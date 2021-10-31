<template>
    <div >
        <div class="sidebar">
            <el-row >
                <el-col>
                    <el-menu  @open="handleOpen" @close="handleClose" >
                        <el-submenu index="9" >
                            <template slot="title" ><i class="el-icon-setting"></i>挂号管理</template>
                            <el-menu-item ><router-link to="registration">挂号 </router-link> </el-menu-item>
                            <el-menu-item ><router-link to="withdraw">退号</router-link></el-menu-item>
                        </el-submenu>
                        <el-submenu index="6" >
                            <template slot="title" ><i class="el-icon-setting"></i>收费管理</template>
                            <el-menu-item ><router-link to="charge">收费 </router-link> </el-menu-item>
                            <el-menu-item ><router-link to="checkChargeDetail">检查收费明细</router-link></el-menu-item>
                            <el-menu-item ><router-link to="inspectionChargeDetail">检验收费明细</router-link></el-menu-item>
                            <el-menu-item ><router-link to="disposeChargeDetail">处置收费明细</router-link></el-menu-item>
                        </el-submenu>
                        <el-submenu index="8" >
                            <template slot="title" ><i class="el-icon-setting"></i>日结管理</template>
                            <el-menu-item ><router-link to="dailySettlement">日结 </router-link> </el-menu-item>

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



