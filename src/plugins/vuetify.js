import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import * as directives from 'vuetify/es5/directives';
import enLang from 'vuetify/es5/locale/en';
import zhLang from 'vuetify/es5/locale/zh-Hans';
import '@mdi/font/css/materialdesignicons.min.css';
import 'font-awesome/css/font-awesome.css';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.use(Vuetify);

const opts = {
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: '#021059',//#010356 #010356 #1976D2 # 060AB9 #040769 #020659 #010B3A #021269
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        leftmenu: '#021059',
      },
      dark: {
        primary: '#101010', //#303030  #424242 #010D19 #101010
      },
    },
  },
  directives,
  lang: {
    locales: { enLang, zhLang },
    current: 'zhLang',
  },
  icons: {
    iconfont: 'mdi',  // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4'
  },
};

export default new Vuetify(opts);

