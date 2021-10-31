<template>
  <!-- 挂号 -->
  <div id="regis">
    <el-container>
      <el-header style="height: 280px">
        <Header></Header>
      </el-header>
      <el-main>
        <Main></Main>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import Header from "../Registration/regis/head";
import Main from "../Registration/regis/main";

export default {
  name: "regis",
  components: {
    Header,
    Main
  },
  data() {
    return {};
  }
};
</script>

<style scope>
#registion {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 50px;
}

.el-header {
  line-height: 30px;
  margin-bottom: 60px;
}
</style>
