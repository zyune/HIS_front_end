<template>
  <div >

    <el-row>
      <shead></shead>
    </el-row>

    <el-row >
      <!--<el-col :span="6">-->
        <!--<siderbar ></siderbar>-->
      <!--</el-col>-->
      <el-col :span="24">
        <el-row> <odIndex></odIndex></el-row>
      </el-col>

    </el-row>
  </div>
</template>
<!--导入HelloWorld.vue-->
<script>
  import shead from './head';
  import siderbar from "./Sidebar"
  import odIndex from './odIndex';
  import mzbl from './mzbl';
  export default {
    name: 'App',
    data(){
      return{
      }
    },
    components:{
      shead,
      siderbar,
      odIndex,
      mzbl
    },methods:{

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


.el-table .warning-row {
  background: #f5f7fa;
 }

.el-table .success-row {
  background: #f0f9eb;
}




/* 用来设置当前页面element全局table的内间距 */
.el-table__row td{
  padding: 0;
}
/* 用来设置当前页面element全局table 选中某行时的背景色*/
.el-table__body tr.current-row>td{
  background-color: #f19944 !important;
  /* color: #f19944; */  /* 设置文字颜色，可以选择不设置 */
}
/* 用来设置当前页面element全局table 鼠标移入某行时的背景色*/
.el-table--enable-row-hover .el-table__body tr:hover>td {
  background-color: #f19944;
  /* color: #f19944; */ /* 设置文字颜色，可以选择不设置 */
}

hr{

  width: 100%;
  height: 1px;
  background-color:lightskyblue;


} a{
    text-decoration:none;
    color: #0066cb;
  }

/*设置一个美化样式*/
.abuttonDisable{

  cursor: not-allowed;
  color: grey;
  background-color: #ffffff;
  text-decoration:none;
  pointer-events: none;
  disabled:true


}
.abuttonDisable a{

}


</style>
