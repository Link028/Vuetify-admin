import axios from 'axios';
import router from '@/router';
import config from './config/config'
import Snackbar from '@/components/snackbar/index';

// 创建axios实例
const service = axios.create({ baseURL: config.url, timeout: config.timeout });

// request拦截器
service.interceptors.request.use((config) => {
    const token = localStorage.getItem('token') ;
    if (token) {
      config.headers.common['Authorization'] = 'Bearer ' + token ; 
    }
    config.headers['Content-Type'] = 'application/json;charset=utf-8';
    return config ;
  }, (error) => {
    console.log(error) ;
    Promise.reject(error) ;
  }
);

// response 拦截器
service.interceptors.response.use((response) => {
  /*
  var data;
    // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
    if(response.data === undefined){
      data = response.request.responseText ;
    } else{
      data = response.data ;
    }
    // 判断data不是Object时，解析成Object
    if(!(data instanceof Object)){
      data = JSON.parse(data)
    }
    return data
    */
    const code = response.status ;
    if (code < 200 || code > 300) {
      console.log('error,code:' + code + ',message:' + response.message);
      Snackbar.error( 'Error,code:' + code + ',message:' + response.message );
      return Promise.reject('error')
    } else {
      //操作成功，由客户端提示
      //Snackbar.info( response.data.message );
      return response.data;
    }
}, (error) => {
    console.log(error);
    if ( error && error.response && error.response.status) {
      let code = error.response.status;
      console.log("Error,code:" + code);
      if (code === 401) {
        // 401: 未登录                
        // 未登录则跳转登录页面，并携带当前页面的路径                
        // 在登录成功后返回当前页面，这一步需要在登录页操作。  
        Snackbar.warning('登录状态已过期，您可以继续留在该页面，或者重新登录');
        location.reload();
      }
      else if (code === 403) {
        // 403 token过期   清除token                   
        // 登录过期对用户进行提示                    
        // 清除本地token和清空vuex中token对象                    
        // 跳转登录页面，并将要浏览的页面fullPath传过去， 
        //router.push({ path: '/401' })
        // localStorage.removeItem("token");                    
        // store.commit("loginSuccess", null);  
        Snackbar.warning('登录过期，请重新登录');
        localStorage.removeItem('token');
        setTimeout(() => {router.replace({path: "/login",query: { redirect: router.currentRoute.fullPath } }); }, 1000);
      }
      else {
        let bcode = error.response.data.code;
        let bmessage = error.response.data.message;
        if (bmessage !== undefined) {
          Snackbar.error('Error,code:' + bcode + ',message:' + bmessage);
        }
      }
    }
    else { 
      Snackbar.error('' + error);
    }
    
    return Promise.reject(error);
  }
);

/* 
function access(uri, param, method) {
  var url = config.url + uri;
  param = param || {};
  let ret = null;
  const upperMethod = method.toUpperCase();
  const __rk = Math.random();

  if (upperMethod === 'POST') {
    ret = service.post(url, param, { params: { __rk } });
  } else if (upperMethod === 'PUT') {
    ret = service.put(url, param, { params: { __rk } });
  } else if (upperMethod === 'DELETE') {
    ret = service.delete(url, { params: { ...param, __rk } });
  } else {
    ret = service.get(url, { params: { ...param, __rk } });
  }

  return ret.then((res) =>
  {
    if (res.status === 200 ) {
      return res.data;
    }
    return Promise.reject(res);
  }, (res) => {
    let errMsg = '';

    if (res.status === 401) {
      errMsg = '您无权访问该页面';
    } else if (res.status === 403) {
      errMsg = '禁止访问';
    } else if (res.status === 404) {
      errMsg = '您访问的页面不存在了';
    } else if (res.status === 500) {
      errMsg = '服务器出了一点问题，请联系管理员';
    }

    if (errMsg) {
      //snackbar.error(errMsg);
    }
    return Promise.reject(res);
  });
}

export default {
  get(url, param) {return access(url, param, 'get');},
  post(url, param) {return access(url, param, 'post');},
  put(url, param) {return access(url, param, 'put');},
  delete(url, param) {return access(url, param, 'delete');},
};
*/

export default service ;
