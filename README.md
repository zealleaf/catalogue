## @leafvein/catalogue

> 一个让你的网站内容具有目录的组件 📑  
> 请看下方介绍以快速了解组件用法 or 个人网站上 look [传送门 🚪](https://zealleaf.me/treehouse/packages/@leafvein/catalogue)。

## 快速接入

### 安装 @leafvein/catalogue

通过 **npm** or **pnpm**

```shell
npm install @leafvein/catalogue
or
pnpm install @leafvein/catalogue
```

### 代码例子

```js
import React from 'React'
import Catalogue from '@leafvein/catalogue'
import '@leafvein/catalogue/lib/style.css'

const APP: React.FC = () => {
  return (
    <>
      <div className="doc">
        <h1>hello world</h1>
      </div>
      <Catalogue contentMark=".doc" />
    </>
  )
}

export default APP
```

## API

| 参数                     | 说明                                               | 类型               | 默认值   | 版本   |
| ------------------------ | -------------------------------------------------- | ------------------ | -------- | ------ |
| contentMark              | 提供一个主体内容的选择器，供目录组件               | string             | -        | latest |
| contentLeft              | 自定义目录左边离主体内容有多远                     | number             | 20       | latest |
| isDebounce               | 滚动屏幕时，目录 Item 的激活模式                   | boolean            | true     | latest |
| scrollHash               | 滚动页面是否使 URL 上的 hash 值一起跟着变化        | boolean            | false    | latest |
| scrollBehavior           | 点击目录的 Item, 页面的滚动行为                    | 'smooth' \| 'auto' | 'smooth' | latest |
| openMoveHorizontally     | 目录组件是否跟随主体内容随着屏幕宽度变化而一起移动 | boolean            | false    | latest |
| loadingDuration          | 目录加载前 loading 持续时间                        | number             | 500ms    | latest |
| diyLoadingStyle          | 自定义 loading 样式 like {width: "100px"}          | object             | true     | latest |
| diyLoadingChildren       | 自定义 loading 组件                                | ReactElement       | -        | latest |
| diyWrapStyle             | 自定义目录 Wrap 样式 like {width: "100px"}         | object             | -        | latest |
| diyItemsStyle            | 自定义目录 Items 样式 like {width: "100px"}        | object             | -        | latest |
| diyActiveItemColor       | 自定义激活目录 Item 字体颜色 like "#000"           | string             | -        | latest |
| diyActiveItemBorderColor | 自定义激活目录 Item 边框颜色 like "#000"           | string             | -        | latest |

## changeLog

[传送门 🚪](https://zealleaf.me/treehouse/packages/@leafvein/catalogue#changeLog)
