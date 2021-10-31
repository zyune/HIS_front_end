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
        <DrugsByDrugsFormat></DrugsByDrugsFormat>
      </div>
    </el-col>
  </el-row>


</template>

<script>

  import myHeader  from '../../component/rd_component/Header'
  import mySidebar from '../../component/fn_component/Sidebar2'
  import DrugsByDrugsFormat from '../../component/fn_component/DrugsByDrugsFormat'


  export default {

    components:{ mySidebar, myHeader,DrugsByDrugsFormat}


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
