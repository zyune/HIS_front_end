<template>
  <el-row style="padding-top: 20px;">
    <el-col :span="24">
      <leftView></leftView>
    </el-col>

  </el-row>
</template>
<script>
  import leftView from "../../component/od_component/inspect/leftView";
  import rightTemplate from "../../component/od_component/inspect/rightTemplate";
  export default {
    name:'inspect',
    components: {leftView,rightTemplate}
  }
</script>
