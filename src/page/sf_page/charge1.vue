<template>

  <el-row>
    <el-col :span="24" id="app">
      <div class="grid-content bg-purple-dark">
        <myHeader></myHeader>
      </div>
    </el-col>
    <el-col :span="3">
      <div class="grid-content bg-purple-dark">
        <mySidebar></mySidebar>
      </div>
    </el-col>
    <el-col :span="20">
      <div class="grid-content bg-purple-dark">
        <charge></charge>
      </div>
    </el-col>
  </el-row>


</template>

<script>

  import myHeader  from '../../component/sf_component/Header'
  import mySidebar from '../../component/sf_component/Sidebar3'
  import charge from '../../component/sf_component/charge/charge'


  export default {

    components:{ mySidebar, myHeader,charge}


  }
</script>

<style>

  .v-enter,.v-leave-to{
    opacity: 0;
    transition: translatex(140px);
  }
  .v-enter-active, .v-leave-active{
    transition: all 0.5s ease;

  }

  .el-row {
    margin-bottom: 20px;

  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    margin: 0px;
  }
  .bg-purple {
    margin: 0px;
  }
  .bg-purple-light {
    margin: 0px;
  }
  .grid-content {

    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;

  }
</style>
