<template>

  <el-row>
    <el-col :span="24" id="app">
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
        <disposeChargeDetail></disposeChargeDetail>
      </div>
    </el-col>
  </el-row>


</template>

<script>

  import myHeader  from '../../component/sf_component/Header'
  import mySidebar from '../../component/sf_component/Sidebar3'
  import disposeChargeDetail from '../../component/sf_component/charge/disposeChargeDetail'


  export default {

    components:{ mySidebar, myHeader,disposeChargeDetail}


  }
</script>

<style>

  .el-row {
    margin-bottom: 20px;

  }
  .el-col {
    border-radius: 4px;
  }

  .grid-content {

    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;

  }

</style>
