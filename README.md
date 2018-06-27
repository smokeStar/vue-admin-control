# vue-admin-control

> vue实现后台管理类项目的权限控制

## Build Setup

``` 
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 思路

*   首先初始化一张路由表, 包含所有的路由, 其中路由可以分为两类, 一类是要显示到菜单之上的称为A类路由, 一类是不需要显示到菜单之上的称为B类,A类需要根据后端的数据来初始化显示隐藏(meta.show), 而B类则需要添加一个开关(meta.allow),控制它是否可被访问.

*   本项目初始没有使用vue-router中的子路由概念, 采用的都是一级路由, 通过在router.beforeEach中控制路由的跳转.meta.allow的优先级高于
meta.show .

*   需要在根组件的created钩子中,初始化路由表, 实现{ path:'/rpt', name:'报表系统', meta:{ show:false, children:[] }}这样的结构,
并且在登录之后,每次刷新都需要重新请求后台获得权限控制表.

## 有待完善

    登录之后, 通过本地缓存后端返回的token值, 每次请求都带上token, 验证登录状态, 当后天返回403的时候在axios的拦截器中做相应的控制 .
