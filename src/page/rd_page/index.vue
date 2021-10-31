<template>
  <div>
    <header>
      <!-- router-link 定义点击后导航到哪个路径下 -->
      <router-link to="/page1">Home</router-link>
      <router-link to="/page2">About</router-link>
    </header>
    <!-- 对应的组件内容渲染到router-view中 -->
    <router-view>
    </router-view>
  </div>
</template>
<!--导入HelloWorld.vue-->
<script>
  import router from "../config/router.js";
  export default {
    name: 'App'
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
