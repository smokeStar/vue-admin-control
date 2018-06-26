
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import { router } from './router'
import g from "./g.js"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.g = g;

Vue.prototype.$login = async function(){

	let res =  await axios('static/data.json');
    let routes = res && res.data || []; 

    let map = {};
    routes.length && routes.forEach(r=>{
        map[r] = true;
    });

    // 子路由的显示与父路由相关, 与后台定义相关.默认是false
    g.routes.forEach((r,i)=>{
        r.meta.show   = map[r.path] || false;
        r.meta.children && r.meta.children.forEach(r2=>{
            r2.meta.show = r.meta.show && map[r2.path] || false;
            r2.meta.children && r2.meta.children.forEach(r3=>{
                r3.meta.show = r2.meta.show && map[r3.path] || false;
            });
        });
    });
}


Vue.use(ElementUI);


router.beforeEach(check);

function check(to, from, next){
	// 这里需要添加延时,created钩子先走
	setTimeout(()=>{
		if(to.meta.allow){
			next();
		}else if(!to.meta.show){
			next('/error');
		}else if(to.meta.children){
				// 存在子路由,则跳到有组件的那层
			for(let i = 0; i < to.meta.children.length; i++){
				let c = to.meta.children[i];
				if(c.meta.show) return next(c.path);
			}
		}else{
			next();
		}
	},0.001)
}


window.$app = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
