<template>
  <el-row style="padding-top: 20px;">
    <el-col :span="24">
      <leftView></leftView>
    </el-col>

  </el-row>
</template>
<script>
  import leftView from "../../component/od_component/check/leftView";
  import rightTemplate from "../../component/od_component/check/rightTemplate";
  export default {
    name:'jianyan',
    components: {leftView,rightTemplate}
  }
</script>
