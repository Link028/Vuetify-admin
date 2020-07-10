import { AppLayout , WebLayout } from "@/components/layouts"

export const publicRoute = [
  { path: '/login',  name: 'Login',    component: () => import("@/views/auth/Login.vue")},
  { path: '/regist', name: 'Regist',   component: () => import("@/views/auth/Regist.vue") },
  { path: "*",       name: 'NotFound', component: () => import("@/views/error/AppNotFound.vue") },
  { path: "/403",    name: "403",      component: () => import("@/views/error/AppDeny.vue") },
  { path: "/404",    name: "404",      component: () => import("@/views/error/AppNotFound.vue")},
  { path: "/500",    name: "500",      component: () => import("@/views/error/AppError.vue") },
  //{ path: "*",   name: '404',  component: AppLayout.vue, redirect: "/404", children: [{path: "/404",name: "NotFound",component: () => import("@/views/error/NotFound.vue")}] },
  //{ path: "403", name: '403',  component: AppLayout.vue, redirect: "/403", children: [{path: "/403",name: "Deny",component: () => import("@/views/error/Deny.vue")}] },
  //{ path: "404", name: '404',  component: AppLayout.vue, redirect: "/404", children: [{path: "/404",name: "NotFound",component: () => import("@/views/error/NotFound.vue")}] },
  //{ path: "500", name: '500',  component: AppLayout.vue, redirect: "/500", children: [{path: "/500",name: "Error",component: () => import("@/views/error/Error.vue")}] },
]

export const protectedRoute = [
  //App Home
  {
    path: "/",
    name: '首页',
    component: AppLayout,
    redirect: "/home",
    children: [
      {path: "/home", name: "主页", component: () => import("@/views/Home.vue") }
    ]
  },
  //Web Index
  {
      path: "/index",
      name: 'index',
      component: WebLayout,
      redirect: "/indexPage",
      children: [
        {path: "/indexPage", name: "indexPage", component: () => import("@/views/Index.vue") }
      ]
    },
  //demo
  {
    path: "/demo",
    name: '功能演示',
    component: AppLayout,
    redirect: "/demo/dashboard",
    children: [
      { path: "/demo/dashboard", name: "Dashboard", component: () => import(/* webpackChunkName: "Dashboard" */ "@/views/demo/Dashboard.vue") },
      { path: "/demo/charts", name: "图表演示", component: () => import(/* webpackChunkName: "Charts" */ "@/views/demo/Charts.vue") },
      { path: "/demo/maps", name: "地图演示", component: () => import(/* webpackChunkName: "Maps" */ "@/views/demo/Maps.vue") },
      { path: "/demo/excelipm", name: "Excel导入", component: () => import(/* webpackChunkName: "ExcelUpload" */ "@/views/demo/ExcelUpload.vue") },
      { path: "/demo/excelpexp", name: "Excel导出", component: () => import(/* webpackChunkName: "ExcelExport" */ "@/views/demo/ExcelExport.vue") },
      { path: "/demo/pdf", name: "PDF查看", component: () => import(/* webpackChunkName: "PdfReader" */ "@/views/demo/PdfReader.vue") },
      { path: "/demo/sql-editor", name: "SQL编辑器", component: () => import(/* webpackChunkName: "SqlEditor" */ "@/views/demo/SqlEditor.vue") },
      { path: "/demo/json-editor", name: "Json编辑器", component: () => import(/* webpackChunkName: "JsonEditor" */ "@/views/demo/JsonEditor.vue") },
      {
        path: "/demo/list", name: "三级菜单", redirect: "/demo/list/user",component: {template: '<router-view></router-view>',},children: [
          { path: "/demo/list/user",     name: "测试1", component: () => import(/* webpackChunkName: "User" */ "@/views/demo/list/User.vue") },
          { path: "/demo/list/role",     name: "测试2", component: () => import(/* webpackChunkName: "Role" */ "@/views/demo/list/Role.vue") },
          { path: "/demo/list/resource", name: "测试3", component: () => import(/* webpackChunkName: "Resource" */ "@/views/demo/list/Resource.vue") },    
        ]
      },

      //{path: "/demo/tinymce-editor",   name: "富文本编辑器",   component: () => import(/* webpackChunkName: "TinymceEditor" */ "@/views/demo/TinymceEditor.vue") },
      //{path: "/demo/markdown-editor",  name: "Markdown编辑器", component: () => import(/* webpackChunkName: "MarkdownEditor" */ "@/views/demo/MarkdownEditor.vue") },  
    ]
  },  
  //exchange
  {
    path: "/exchange",
    name: '数据交换',
    component: AppLayout,
    redirect: "/exchange/Exchange",
    children: [
      {path: "/exchange/Exchange",   name: "数据交换", component: () => import(/* webpackChunkName: "Exchange" */  "@/views/exchange/Exchange.vue" )},
    ]
  }, 

  //datasert
  {
    path: "/datassets",
    name: '数据管理',
    component: AppLayout,
    redirect: "/datassets/Dashboard",
    children: [
      {path: "/datassets/Dashboard",    name: "数据管理概览", component: () => import(/* webpackChunkName: "Dashboard" */  "@/views/datassets/Dashboard.vue" )},
      {path: "/datassets/Datasert",     name: "数据资产管理", component: () => import(/* webpackChunkName: "Datasert" */ "@/views/datassets/Datasert.vue") },
      {path: "/datassets/DataSource",   name: "数据源管理", component: () => import(/* webpackChunkName: "DataSource" */ "@/views/datassets/DataSource.vue") },
      {path: "/datassets/BizSystem",    name: "业务系统管理", component: () => import(/* webpackChunkName: "BizSystem" */ "@/views/datassets/BizSystem.vue") },
      {path: "/datassets/DataMeta",     name: "元数据管理", component: () => import(/* webpackChunkName: "DataMeta" */ "@/views/datassets/DataMeta.vue") },
      {path: "/datassets/DataModel",    name: "数据模型管理", component: () => import(/* webpackChunkName: "DataModel" */ "@/views/datassets/DataModel.vue") },
    ]
  }, 
  //service
  {
      path: "/service",
      name: '数据服务',
      component: AppLayout,
      redirect: "/service/Service",
      children: [
        {path: "/service/Application",  name: "应用管理", component: () => import(/* webpackChunkName: "Application" */  "@/views/service/Application.vue" )},
        {path: "/service/Service",      name: "服务管理", component: () => import(/* webpackChunkName: "Service" */ "@/views/service/Service.vue") },
      ]
  }, 
  //monitor
  {
      path: "/scheduler",
      name: '调度中心',
      component: AppLayout,
      redirect: "/scheduler/Task",
      children: [
        {path: "/scheduler/Resource",       name: "资源管理", component: () => import(/* webpackChunkName: "Resource" */  "@/views/scheduler/Resource.vue" )},
        {path: "/scheduler/Param",      name: "参数管理", component: () => import(/* webpackChunkName: "Param" */ "@/views/scheduler/Param.vue") },
        { path:"/scheduler/Task",          name: "任务管理", component: () => import(/* webpackChunkName: "Task" */     "@/views/scheduler/Task.vue") },
        {path: "/scheduler/Job",          name: "作业管理", component: () => import(/* webpackChunkName: "Job" */     "@/views/scheduler/Job.vue") },
      ]
  }, 
  //monitor
  {
    path: "/monitor",
    name: '监控中心',
    component: AppLayout,
    redirect: "/monitor/ServiceMonitor",
    children: [
      {path: "/monitor/ServiceMonitor",       name: "数据服务监控", component: () => import(/* webpackChunkName: "ServiceMonitor" */  "@/views/monitor/ServiceMonitor.vue" )},
      {path: "/monitor/ExchangeMonitor",      name: "数据交换监控", component: () => import(/* webpackChunkName: "ExchangeMonitor" */ "@/views/monitor/ExchangeMonitor.vue") },
      {path: "/monitor/NodeMonitor",          name: "服务节点监控", component: () => import(/* webpackChunkName: "NodeMonitor" */     "@/views/monitor/NodeMonitor.vue") },
    ]
  }, 
  //user
  {
      path: "/user",
      name: '个人中心',
      component: AppLayout,
      redirect: "/user/profile",
      children: [
        {path: "/user/profile",       name: "个人主页", component: () => import(/* webpackChunkName: "Profile" */ "@/views/user/Profile.vue" )},
        {path: "/user/settings",      name: "账户设置", component: () => import(/* webpackChunkName: "Settings" */ "@/views/user/Settings.vue") },
        {path: "/user/messages",      name: "消息通知", component: () => import(/* webpackChunkName: "Messages" */ "@/views/user/Messages.vue") },
        {path: "/user/passwd",        name: "密码修改", component: () => import(/* webpackChunkName: "Passwd" */ "@/views/user/Passwd.vue")},
     ]
  },  
  //system
  {
    path: "/system",
    name: '系统管理',
    component: AppLayout,
    redirect: "/system/department",
    children: [
      {path: "/system/department",   name: "部门管理",component: () => import(/* webpackChunkName: "Department" */ "@/views/system/Department.vue")},
      {path: "/system/user",         name: "用户管理",component: () => import(/* webpackChunkName: "User" */ "@/views/system/User.vue" )},
      {path: "/system/role",         name: "角色管理",component: () => import(/* webpackChunkName: "Role" */ "@/views/system/Role.vue")},
      {path: "/system/resource",     name: "资源管理",component: () => import(/* webpackChunkName: "Resource" */ "@/views/system/Resource.vue")},
      {path: "/system/dict",         name: "字典管理",component: () => import(/* webpackChunkName: "Dict" */ "@/views/system/Dict.vue")},
      {path: "/system/param",        name: "参数管理",component: () => import(/* webpackChunkName: "Param" */ "@/views/system/Param.vue") },
      {path: "/system/message",      name: "消息管理",component: () => import(/* webpackChunkName: "Message" */ "@/views/system/Message.vue")},
      {path: "/system/opelog",       name: "操作日志",component: () => import(/* webpackChunkName: "Opelog" */ "@/views/system/Opelog.vue" )},
      {path: "/system/loginlog",     name: "登录日志",component: () => import(/* webpackChunkName: "Loginlog" */ "@/views/system/Loginlog.vue")},
      {path: "/system/onlineuser",   name: "在线用户",component: () => import(/* webpackChunkName: "OnlineUser" */ "@/views/system/OnlineUser.vue")},
      {path: "/system/database",     name: "数据监控",component: () => import(/* webpackChunkName: "Database" */ "@/views/system/Database.vue")},
      {path: "/system/service",      name: "服务监控",component: () => import(/* webpackChunkName: "Service" */ "@/views/system/Service.vue")},    
    ]
  }, 
]
