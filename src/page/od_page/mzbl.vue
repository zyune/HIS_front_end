<template>
  <el-row style="padding-top: 20px;">
    <el-col :span="16">
      <rightViewCenter></rightViewCenter>
    </el-col>
    <el-col :span="1">
      &nbsp;

    </el-col>
    <el-col :span="7">
      <rightViewRight></rightViewRight>
    </el-col>

  </el-row>
</template>
<script>
  import rightViewCenter from "../../component/od_component/index/rightViewCenter";
  import rightViewRight from "../../component/od_component/index/rightViewRight";
  export default {
    name:'mzbl',
    components: {rightViewCenter,rightViewRight}
  }
</script>
