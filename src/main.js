import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import App from './component/demo/index.vue';
import App from './page/App';
import {post,fetch,patch,put,mdelete} from './config/http'
import axioss from './config/http'
import router from './config/router' //引进router对象
import store from './config/store' //引进router对象
import filters from './config/filters';

import myCharts from './component/fn_component/js/bar'
import myCharts1 from './component/fn_component/js/line'
import myCharts2 from './component/fn_component/js/medicine'

Vue.use(myCharts);
Vue.use(myCharts1);
Vue.use(myCharts2);


Vue.use(ElementUI);
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

router.beforeEach((to, from, next) => {
  if (to.matched.some(m => m.meta.auth)) {
    if (window.localStorage.LoginUser  != null) {
      next()
    } else if (to.path !== '/') {
      next({path: '/login'})
      Vue.prototype.$message.warning('检测到您还未登录,请登录后操作！')
    }
  } else {
    next()
  }
});
//定义全局变量
Vue.prototype.$fetch=fetch;
Vue.prototype.$put=put;
Vue.prototype.$fetch=fetch;
Vue.prototype.$post=post;
Vue.prototype.$mdelete=mdelete;
Vue.prototype.$axios=axioss;
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
});
