import Vue from "vue";
import Router from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { publicRoute, protectedRoute } from "./config";
const routes = publicRoute.concat(protectedRoute) ;

/**-------------- at new NavigationDuplicated ---------*/
/*
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  if(typeof(location)=="string"){
    var Separator = "&";
    if(location.indexOf('?')==-1) { Separator='?'; }
    location = location + Separator + "t=" + Math.random();
  }
  return routerPush.call(this, location)//.catch(error=> error)
}
*/
/**-------------- at new NavigationDuplicated end ---------*/

//NProgress.configure({ showSpinner: true }) // NProgress Configuration
//NProgress.configure({
//  template: `<div class="bar" role="bar" style="background:#1DE2C3;"><div class="peg"></div></div>
//  <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>`,
//  showSpinner: false,
//});

Vue.use(Router);

const router = new Router({
  mode: "hash", //history
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  linkActiveClass: "active",
  routes: routes
});

//------
//NProgress.configure({ ease: 'ease', speed: 500, showSpinner: true });
NProgress.configure({
  template: `<div class="bar" role="bar" style="background:var(--v-primary-lighten4); height:0px;"><div class="peg"></div></div>
  <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>`,
  ease: 'ease',
  showSpinner: true,
  speed: 500
});

//------
// router gards
router.beforeEach((to, from, next) => {
  if ( to.path &&  to.path !== "/login" && to.path !== "/regist"  ) { 
    NProgress.start();
  }
  //auth route is authenticated
  next();
});

router.afterEach((to, from) => {
  if ( to.path && to.path !== "/login" && to.path !== "/regist"  ) { 
    NProgress.done();
  }
});

//Vue.router.beforeEach((to, from, next) => {
//  NProgress.start();
//  const { token } = store.getters;
// 
//  if (to.path === '/auth/login') 
//  {
//    store.dispatch('login');
//    next();
//    NProgress.done();
//  } 
//  else if (!token) 
 // {
 //   next(`/login?redirect=${to.fullPath}`);
    //NProgress.done();
//  } 
//  else 
//  {
//    const { me } = store.getters;
//   if (!me || !me.name) 
//	{
//      store.dispatch('readMe', { token })
//        .then(() => {
//          next();
//        })
//        .catch(() => {
//          next('/login');
//        });
//    } 
//	else 
//	{
//      next();
//    }
//
//     next();
//    NProgress.done();
//  }
//});

/*
Vue.router.beforeEach((to, from, next) => { 
  const { locale } = to.query; 
  if (locale) 
  {
    delete to.query.locale;
    if (supportedLangs.includes(locale)) {
      i18n.locale = locale;
      localStorage.setItem('VUE-ADMIN-VUETIFY_LANGUAGE', locale);
    }
  } 
  next();
});
*/

//Vue.router.afterEach(() => {
//  NProgress.done();
//});

//解决Vue-router 报NavigationDuplicated问题
//const originalPush = Router.prototype.push
//Router.prototype.push = function push(location, onResolve, onReject) {
//  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
//  return originalPush.call(this, location).catch(err => err)
//}

export default router;
