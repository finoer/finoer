# finoer

The micro front framework tools

### 项目简介

....



### 项目目录

```js
core
├─templates // 微前端项目模版
|     ├─fino-child-vue // vue子项目模版
|     ├─fino-child // 子项目模版
|     ├─fino // 基座模版
├─src
|  └index.ts
├─scripts
|    ├─build.js
|    ├─dev.js
|    ├─docs.js
|    └utils.js
├─packages  // 项目依赖npm包
|    ├─finoer-core // 微前端框架主npm包
|    ├─finoer-component-vue // 子项目npm包

```



### 安装依赖

给package下面的npm包安装依赖

```
# npm run dev <包名>
npm run init finore-core 
# 或者
npm run init finoer-component-vue
```



### 启动命令

**运行packages下面的npm包**

```shell
# npm run dev <包名>
npm run dev finore-core 
# 或者
npm run dev finoer-component-vue
```


### 编译命令

```shell
# npm run build <包名>
npm run build finore-core 
# 或者
npm run build finoer-component-vue
```



### 生成文档

给package下的npm包生成文档

```
# npm run doc <包名>
npm run doc finore-core 
# 或者
npm run doc finoer-component-vue
```



![](./static/images/project.png)
## How to Run

```bash

git clone
git submodule update --init --recursive

```
