<template>
  <el-row style="padding-top: 20px;">
    <el-col :span="24">
      <leftView></leftView>
    </el-col>

  </el-row>
</template>
<script>
  import leftView from "../../component/od_component/patientFeeDetail/leftView";
  export default {
    name:'patient',
    components: {leftView}
  }
</script>
