<template>
    <div >
        <div class="sidebar">
            <el-row >
                <el-col>
                    <el-menu  @open="handleOpen" @close="handleClose" >
                        <el-submenu index="10" >
                            <template slot="title" ><i class="el-icon-setting"></i>财务管理</template>
                            <el-menu-item ><router-link to="Drugs">药品费用管理 </router-link> </el-menu-item>

                            <el-menu-item ><router-link to="DrugsFormat">药品规格查找</router-link></el-menu-item>
                            <el-menu-item ><router-link to="FmedItem">非药品费用管理</router-link></el-menu-item>
                            <el-menu-item ><router-link to="Recordtype">非药品类型查找</router-link></el-menu-item>
                            <el-menu-item ><router-link to="workload">工作量统计</router-link></el-menu-item>

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



