# vue_demo

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

####

```js
   ├── index.html                      入口页面
   ├── favicon.ico                     页面图标
   ├── .babelrc                        babel规则
   ├── .editorconfig                   编辑器配置
   ├── .eslintignore                   eslint忽略规律
   ├── .eslintrc.js                    eslint规则
   ├── .gitignore                      git忽略规则
   ├── build                           构建脚本目录
   │   ├── build-server.js                 运行本地构建服务器，可以访问构后的页面
   │   ├── build.js                        生产环境构建脚本
   │   ├── dev-client.js                   开发服务器热重载脚本，主要用来实现开发阶段的页面自动刷新
   │   ├── dev-server.js                   运行本地开发服务器
   │   ├── utils.js                        构建相关工具方法
   │   ├── webpack.base.conf.js            wabpack基础配置
   │   ├── webpack.dev.conf.js             wabpack开发环境配置
   │   └── webpack.prod.conf.js            wabpack生产环境配置
   │   └── webpack.cdn.conf.js             wabpack cdn配置
   │   └── webpack.dll.conf.js             wabpack dll配置
   ├── config                          项目配置
   │   ├── dev.env.js                      开发环境变量
   │   ├── index.js                        项目配置文件
   │   ├── prod.env.js                     生产环境变量
   │   └── test.env.js                     测试环境变量
   ├── mock                            mock数据目录
   │   └── hello.js
   ├── package.json                    npm包配置文件，里面定义了项目的npm脚本，依赖包等信息
   ├── readmd.md                       项目描述文件
   ├── src                                项目源码目录
   │   ├── main.js                            入口js文件
   │   ├── App.vue                            根组件
   │   ├── components                         公共组件目录
   │   │   └── title.vue
   │   ├── assets                         静态资源目录，这里的资源会被wabpack构建
   │   │   ├── css                            公共样式文件目录
   │   │   ├── js                             公共js文件目录（如帮助方法）
   │   │   └── img                            图片存放目录
   |   |── lib                            外部引用的插件存放及修改文件
   |   |—— datas                          模拟数据，临时存放
   │   ├── routes                         前端路由
   │   │   └── index.js
   │   ├── api                            接口，统一管理
   │   │   └── index.js
   │   ├── store                          vuex, 统一管理
   │   │   └── index.js
   │   └── views                          视图模块名
   │       ├── hello.vue
   │       └── notfound.vue
   ├── static                             纯静态资源，不会被wabpack构建。
   └── test                               测试文件目录（unit&e2e）
       └── unit                               单元测试
           ├── index.js                           入口脚本
           ├── karma.conf.js                      karma配置文件
           └── specs                           单测case目录
               └── Hello.spec.js

```


For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
