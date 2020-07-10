import '@babel/polyfill';
import Vue from 'vue';
import moment from 'moment';
import vuetify from './plugins/vuetify';
import echarts from './plugins/echarts';
import router from './router';
import store from './store';
import i18n from './i18n';
import App from './App.vue';
import config from './config/config.js';
import helper from './helper.js';
import http from './http.js';
import axios from 'axios';
import validate from './validate.js';
import * as consts from './config/consts';
import CVisualCard from './components/CVisualCard.vue';
import CFormCard from './components/CFormCard.vue';
import CDialog from '@/components/CDialog.vue';
import CConfirmDialog from '@/components/CConfirmDialog.vue';
import Snackbar from '@/components/snackbar/index';

Vue.component('c-visual-card', CVisualCard);
Vue.component('c-form-card', CFormCard);
Vue.component('c-dialog', CDialog);
Vue.component('c-confirm-dialog', CConfirmDialog);

Vue.config.productionTip = true ;
Vue.router = router;
Vue.store = store;
Vue.prototype.$moment = moment;
Vue.prototype.$consts = consts;
Vue.prototype.$helper = helper;
Vue.prototype.$config = config;
Vue.prototype.$message = Snackbar;
Vue.prototype.$http = http;

//获取用户初始化参数并进行设置
//Vue.prototype.$config.view.darkthem  = ...
//Vue.prototype.$config.view.minidraw  = ...
//Vue.prototype.$config.view.tag  = ...
//Vue.prototype.$config.view.rtl  = ...
//Vue.prototype.$config.view.permanent  = ...
//Vue.prototype.$config.view.primary = ... ;
//Vue.prototype.$config.view.leftmenu = ... ;
//获取系统参数并进行设置
//Vue.prototype.$config.view.secondary = ... ;
//Vue.prototype.$config.view.accent = ... ;
//Vue.prototype.$config.view.error = ... ;
//Vue.prototype.$config.view.info = ... ;
//Vue.prototype.$config.view.success = ... ;
//Vue.prototype.$config.view.warning ;
//Vue.prototype.$config.view.darkprimary = ... ;

console.log('service url:' + config.url);

axios.get(config.url + '/app-system/param/findparam').then(function (response){
  if ( response.data && response.data.map ) { 
        var map = response.data.map;
        //用户参数
        config.view.darkthem  = JSON.parse( map.darkthem ) ;
        config.view.minidraw  = JSON.parse( map.minidraw ) ;
        config.view.tag  = JSON.parse( map.tag ) ;
        config.view.rtl  = JSON.parse( map.rtl ) ;
        config.view.permanent  = JSON.parse( map.permanent ) ;
        config.view.primary = map.primary;
        config.view.leftmenu = map.leftmenu;
        //系统参数
        config.view.secondary = map.secondary;
        config.view.accent = map.accent ;
        config.view.error = map.error ;
        config.view.info = map.info ;
        config.view.success = map.secondsuccessary ;
        config.view.warning = map.warning ;
        config.view.darkprimary = map.darkprimary;
  }
})
.catch(function (error) {
  console.log(error);
});

vuetify.preset.theme.themes.light.primary = config.view.primary; 
vuetify.preset.theme.themes.light.leftmenu = config.view.leftmenu;
vuetify.preset.theme.themes.light.secondary = config.view.secondary ;
vuetify.preset.theme.themes.light.accent = config.view.accent ;
vuetify.preset.theme.themes.light.error = config.view.error ;
vuetify.preset.theme.themes.light.info = config.view.info ;
vuetify.preset.theme.themes.light.success = config.view.success ;
vuetify.preset.theme.themes.light.warning = config.view.warning ; 
vuetify.preset.theme.themes.dark.primary = config.view.darkprimary;

//Vue.filter('formatDate', (v, isUTC = true, dateFormat = 'YYYY-MM-DD HH:mm:ss') => {
//  if (v) {
//    return isUTC ? moment.utc(v).local().format(dateFormat) : moment.utc(v).format(dateFormat);
//  } 
//  return '';
//});

const supportedLangs = ['zh-CN', 'en'];
const userLocale = navigator.language || navigator.userLanguage;
i18n.locale = localStorage.getItem('VUE-ADMIN-VUETIFY_LANGUAGE')|| (supportedLangs.includes(userLocale) ? userLocale : 'zh-CN');
//Vue.prototype.$locale.use(i18n.locale);

new Vue({
  router,
  store,
  i18n,
  vuetify,
  echarts,
  render: h => h(App)
}).$mount('#app');
