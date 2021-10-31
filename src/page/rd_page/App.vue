<template>
  <div id="app" >
    <el-row >
      <el-col :span="5">
        <rightView></rightView>
      </el-col>
      <el-col :span="1">
        <hr width="1px" />
      </el-col>

      <el-col :span="18">
        <leftView></leftView>
      </el-col>

    </el-row>

  </div>

</template>
<!--导入HelloWorld.vue-->
<script>

  import rightView from '../components1/leftView';
  import leftView from '../components1/rightView';

  export default {
    name: 'App',
    components:{
      rightView,
      leftView
    }
  }
</script>

<style>
#app {
  height: 100%;
}
  *{
    margin: 0px;
    padding: 0px;
  }
</style>
