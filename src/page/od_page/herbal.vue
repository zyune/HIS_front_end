<template>
  <el-row style="padding-top: 20px;">
    <el-col :span="24">
      <leftView></leftView>
    </el-col>
  </el-row>
</template>
<script>
  import leftView from "../../component/od_component/herbal/leftView";
  export default {
    name:'herbal',
    components: {leftView}
  }
</script>
