<template>
    <div >
        <div class="sidebar">
            <el-row >
                <el-col>
                    <el-menu  @open="handleOpen" @close="handleClose" >
                        <el-submenu index="10" >
                            <template slot="title" ><i class="el-icon-setting"></i>医技</template>
                            <el-menu-item ><router-link to="jiancha">检查 </router-link> </el-menu-item>
                            <el-menu-item ><router-link to="jianyan">检验 </router-link> </el-menu-item>
                            <el-menu-item ><router-link to="chuzhi">处置 </router-link> </el-menu-item>
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



