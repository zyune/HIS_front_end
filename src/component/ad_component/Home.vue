<template>
<div>




        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                    <myHeader></myHeader>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple-dark">
                    <mySidebar></mySidebar>
                </div>
            </el-col>
            <el-col :span="17">
                <div class="grid-content bg-purple-dark">
                    <router-view></router-view>
                </div>
            </el-col>
        </el-row>




</div>

</template>
<script>
import myHeader from './Header'
import mySidebar from './Sidebar'

export default {
   components:{ myHeader, mySidebar }

}
</script>
<style>




</style>


