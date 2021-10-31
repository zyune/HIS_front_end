<template>
  <div >


      <el-row >
      <el-col :span="5" style="padding-left: 10px;">
        <leftView ref="leftView"></leftView>
      </el-col>

      <el-col :span="1" style="margin-top: 20%;" >
        <i :class="[isActive ?'el-icon-caret-left':'el-icon-caret-right']" @click="showLeftView"></i>
      </el-col>

      <el-col :span="num">
        <rightView></rightView>
      </el-col>
    </el-row>
  </div>
</template>
<!--导入HelloWorld.vue-->
<script>
  import leftView from '../../component/od_component/leftView';
  import rightView from '../../component/od_component/rightView';
  import mzbl from "./mzbl"
  export default {
    name: 'App',
    data(){
      return{
        isActive:false,
        num:23
      }
    },
    components:{
      mzbl,
      rightView,
      leftView
    },methods:{
      showLeftView(){
        this.$refs.leftView.showDialog();
        if(this.num == 23){
          this.num = 18;
          this.isActive = true;
        } else if(this.num == 18){
          this.num = 23;
          this.isActive = false;
        }
      }
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
