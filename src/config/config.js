//const baseUrl = 'http://115.28.139.137:8181'
const baseUrl = 'http://127.0.0.1:8181'
const config = {
  locale: 'zh-CN', // en-US, zh-CN
  url: baseUrl,
  timeout:60000,
  debug: {
    mock: false, // enable mock
    http: true // http request log
  },
  api: `${baseUrl}/api`,
  api_system: `${baseUrl}/app-system`,
  view: {
    darkthem: false,
    minidraw: false,
    tag: false,
    rtl: false,
    permanent: false ,
    primary: '#010356',//#010356 #1976D2 # 060AB9 #040769 #020659 #010B3A #021269
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
    leftmenu: '#010356',
    darkprimary : '#101010',
  },
}

export default config
