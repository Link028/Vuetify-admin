const Menu = [
  { id: "1", title: "主页", icon: "home", href: "/home" },
  {
    id:"400", title: "功能演示",icon: "widgets", //widgets filter_tilt_shift
    items: [
      { id:"411", title: "Dashboard",icon: "dashboard",  href: "/demo/dashboard" },
      { id:"401", title: "图表演示",  icon: "grade",     href: "/demo/charts" },
      { id:"402", title: "地图演示",  icon: "language",  href: "/demo/maps" },
      { id:"403", title: "Excel导入", icon: "dashboard", href: "/demo/excelipm" },
      { id:"404", title: "Excel导出", icon: "list",      href: "/demo/excelpexp" },
      { id:"405", title: "PDF查看器", icon: "view_list", href: "/demo/pdf" },
      { id:"406", title: "SQL编辑器", icon: "grade",      href: "/demo/sql-editor"},
      { id:"407", title: "Json编辑器", icon: "language",   href: "/demo/json-editor" },
      { id:"408", title: "富文本编辑器",        icon: "dashboard",  href: "/demo/tinymce-editor" },
      { id:"409", title: "Markdown编辑器",      icon: "view_list",  href: "/demo/markdown-editor" },
      { id:"410", title: "三级菜单",               icon: "list", 
        items: [
          { id:"411", title: "测试1", icon: "work_outline", href: "/demo/list/user" },
          { id:"422", title: "测试2", icon: "work",         href: "/demo/list/role" },
          { id:"433", title: "测试3", icon: "view_list",    href: "/demo/list/resource" },
          ]
      }      
    ]
  },  
  {
    id:"60", title: "数据交换",icon: "rotate_90_degrees_ccw",
    items: [
      { id:"61", title: "数据交换",  icon: "grade",        href: "/exchange/Exchange" },
    ]
  },  
  {
    id:"70", title: "数据管理",icon: "gradient",
    items: [
      { id: "71", title: "数据管理概览", icon: "dashboard", href: "/datassets/Dashboard" },
      { id:"74", title: "业务系统管理", icon: "share", href: "/datassets/BizSystem" },
      { id:"72", title: "数据资产管理", icon: "language", href: "/datassets/Datasert" },
      { id:"73", title: "数据源管理",   icon: "book", href: "/datassets/DataSource" },
      { id:"75", title: "元数据管理",    icon: "grade",      href: "/datassets/DataMeta" },
      { id:"76", title: "数据模型管理", icon: "share", href: "/datassets/DataModel" },
    ]
  },  
  {
    id:"80", title: "数据服务",icon: "language",
    items: [
      { id:"81", title: "服务管理",  icon: "grade",     href: "/service/Service" },
      { id:"82", title: "应用管理",  icon: "language",  href: "/service/Application" },
    ]
  },  
  {
    id:"40", title: "调度中心",icon: "update",
    items: [
      { id:"41", title: "资源管理",  icon: "grade",        href: "/scheduler/Resource" },
      { id:"42", title: "参数管理",  icon: "grade",        href: "/scheduler/Param" },
      { id:"43", title: "任务管理",  icon: "language",     href: "/scheduler/Task" },
      { id:"44", title: "作业管理",  icon: "dashboard",    href: "/scheduler/Job" },
    ]
  },  
  {
    id:"90", title: "监控中心",icon: "switch_video",
    items: [
      { id:"91", title: "数据服务监控",  icon: "grade",     href: "/monitor/ServiceMonitor" },
      { id:"92", title: "数据交换监控",  icon: "language",  href: "/monitor/ExchangeMonitor" },
      { id:"93", title: "服务节点监控",  icon: "dashboard", href: "/monitor/NodeMonitor" },
    ]
  },
  {
    id:"20", title: "个人中心",icon: "filter_tilt_shift", // recent_actors filter_tilt_shift
    items: [
      { id:"201", title: "个人主页", icon: "person",        href: "/user/profile" },
      { id:"202", title: "账户设置", icon: "settings",      href: "/user/settings" },
      { id:"203", title: "消息通知", icon: "notifications", href: "/user/messages" },
      { id:"204", title: "密码修改", icon: "lock",          href: "/user/passwd" },
    ]
  },   
  {
    id:"10", title: "系统管理",icon: "	storage", //storage devices dns 	settings_applications
    items: [
      { id:"101", title: "部门管理", icon: "domain",       href: "/system/department" },
      { id:"102", title: "用户管理", icon: "person_add",   href: "/system/user" },
      { id:"103", title: "角色管理", icon: "group_add",    href: "/system/role" },
      { id:"104", title: "资源管理", icon: "blur_on",      href: "/system/resource" },
      { id:"105", title: "字典管理", icon: "book",         href: "/system/dict"  },
      { id:"106", title: "参数管理", icon: "share",        href: "/system/param" },
      { id:"107", title: "消息管理", icon: "notifications_paused", href: "/system/message" },
      { id:"110", title: "在线用户", icon: "people",          href: "/system/onlineuser" },      
      { id:"108", title: "操作日志", icon: "event_note",      href: "/system/opelog" },
      { id:"109", title: "登录日志", icon: "event_available", href: "/system/loginlog" },
    ]
  },   
]

export default Menu
