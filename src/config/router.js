//导入router
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);


import dispose from "../page/od_page/Dispose"
import inspect from "../page/od_page/inspect"
import check from "../page/od_page/check"
import mzbl from "../page/od_page/mzbl"
import herbal from "../page/od_page/medicine"
import medicine from "../page/od_page/herbal"
import login from "../page/Login"
import index from "../page/od_page"
import patientFeeDetail from "../page/od_page/patientFeeDetail"



import adhome from "../component/ad_component/Home"
import departmented from "../component/ad_component/departmentadd"
import diseasListadddel from "../component/ad_component/diseasListadddel"
import fmeditem from "../component/ad_component/fmeditem"
import gistrationManagement from "../component/ad_component/gistrationAddDeletere"
import userManagement from "../component/ad_component/management"
import schedulingrule from "../component/ad_component/paiban"
import schedulinginfo from "../component/ad_component/schedulManagement"
import personalinfo from "../component/ad_component/personalinfor"

// 药房
import fayao from '../page/rd_page/dispensing/fayaoA'
import faxiyao from '../page/rd_page/dispensing/faxiyaoA'
import yaopin from '../page/rd_page/drug/yaopinA'
import jiancha from '../page/rd_page/check/jianchaA'
import jianyan from '../page/rd_page/inspect/jianyanA'
import chuzhi from  '../page/rd_page/dispose/disposeA'

//挂号
import registration from  '../page/sf_page/registration'
import withdraw from '../page/sf_page/withdraw'

// 测试
//收费
import charge from '../page/sf_page/charge'
import checkChargeDetail from '../page/sf_page/checkChargeDetail'
import inspectionChargeDetail from '../page/sf_page/inspectionChargeDetail'
import disposeChargeDetail from '../page/sf_page/disposeChargeDetail'
//日结
import dailySettlement from '../page/sf_page/dailySettlement'


//财务管理
import Drugs from '../page/fn_page/Drugs'
import DrugsFormat from '../page/fn_page/DrugsByDrugsFormat'
import FmedItem from '../page/fn_page/FmedItem'
import Recordtype from '../page/fn_page/FmedItemByRecordtype'
import workload from '../page/fn_page/workload'


var mroumter = new Router({
  mode:'history',
  base:'/hisVue',
  routes:[
    {
      path:"/",
      name:'login',
      component:login,
      hidden: true

    },
    {
      path:"/login",
      name:'login',
      component:login,
      hidden: true
    },


     //管理员界面路由
    {
      path:"/adhome",
      name:"home",
      component:adhome,
      meta: {auth: true},

      children: [
        {
          //科室管理
          path: "departmented",
          name: "departmented",
          component: departmented
        },{
          //诊断目录管理
          path: "diseasListadddel",
          name: "diseasListadddel",
          component: diseasListadddel
        },{
          //非药品收费项目管理
          path: "fmeditem",
          name: "fmeditem",
          component: fmeditem
        },{
          //挂号级别管理
          path: "gistrationManagement",
          name: "gistrationManagement",
          component: gistrationManagement
        },{
          //用户管理
          path: "userManagement",
          name: "userManagement",
          component: userManagement
        },{
          //排班规则管理
          path: "schedulingrule",
          name: "schedulingrule",
          component: schedulingrule
        },{
          //排班信息管理
          path: "schedulinginfo",
          name: "schedulinginfo",
          component: schedulinginfo
        },{
          //个人信息
          path: "personalinfo",
          name: "personalinfo",
          component: personalinfo
        }
      ]
    },


    {
      path:"/odIndex",
      name:"门诊医生的路由",
      component:index,
      meta: {auth: true},
      hidden: true,
      children:[

        {
          path: "",
          name: "检查申请",
          component: mzbl
        }
        ,
        { path: "patientFeeDetail",
          name: "患者明细",
          component: patientFeeDetail

        },

        {
          path:"check",
          name:"检查申请",
          component:check
        },{
          path:"herbal",
          name:"herbal",
          component:herbal
        },
        {
          path:"medicine",
          name:"西药",
          component:medicine
        },{
          path:"dispose",
          name:"dispose",
          component:dispose
        },
        {
          path:"inspect",
          name:"inspect",
          component:inspect
        },{
          path:"mzbl",
          name:"mzbl",
          component:mzbl
        }
      ]
    },
 //药房
    {
      path: '/rdhome',
      component:fayao,
      hidden: true,
    },
    {
      path: '/fayao',
      component:fayao,
      hidden: true,
    },
      {
          path: '/faxiyao',
          component:faxiyao,
          hidden: true,
      },
    {
      path: '/yaopin',
      component:yaopin,
      hidden: true,
    },
 //医技
    {
      path:'/yjhome',
      component:jiancha,
      hidden: true,
    },
    {
      path:'/jiancha',
      component:jiancha,
      hidden: true,
    },
    {
      path:'/jianyan',
      component:jianyan,
      hidden: true,
    },
      {
          path:'/chuzhi',
          component:chuzhi,
          hidden: true,
      },

//财务
    {
      path:'/fnhome',
      component:Drugs,
      hidden: true,
    },
    {
      path:'/Drugs',
      component:Drugs,
      hidden: true,
    },
    {
      path:'/DrugsFormat',
      component:DrugsFormat,
      hidden: true,
    },
    {
      path:'/FmedItem',
      component:FmedItem,
      hidden: true,
    },
    {
      path:'/Recordtype',
      component:Recordtype,
      hidden: true,
    },
    {
      path:'/workload',
      component:workload,
      hidden: true,
    },

//挂号

         { path: '/sfhome', component: registration, name: '挂号'},
        { path: '/registration', component: registration, name: '挂号'},
        { path: '/withdraw', component: withdraw, name: '退号' },
        { path: '/charge', component: charge, name: '收费' },
        { path: '/checkChargeDetail', component: checkChargeDetail, name: '检查收费明细' },
        { path: '/inspectionChargeDetail', component: inspectionChargeDetail , name: '检验收费明细' },
        { path: '/disposeChargeDetail', component: disposeChargeDetail, name: '处置收费明细' },
        { path: '/dailySettlement', component:dailySettlement , name: '日结'}

]
});
export default mroumter
