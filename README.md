# app-web

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


2.路由权限问题需求:将权限控制到按钮级别，高度自定义角色访问权限。每一个路由都可配置。方案:利用require.context和export、import自动化注册路由和组件。利用vue-router的导航卫士和addRoutes实现动态路由。利用vue的directive实现v-auth指令权限。根据后端下发的权限树提取扁平权限标识符，前端映射路由和按钮，根据配置接口筛选动态加载路由，控制按钮加载。问题:领导不断调整菜单内容次序，任务分期也在不断追加新的路由，产生新的页面，前端映射文件依赖后端接口更新，但前台的更新过程较为繁琐，新增标识符需一一对应，指令权限需要局部开发人员自己根据权限表一一添加。如同顽固小疾。早期还干扰新注册路由的加载，后优化调整逻辑后解决。

作者：Feahter
链接：https://www.zhihu.com/question/347372270/answer/976529200
