## Catalogue

> Generate a catalogue from your website content 📑

[![npm version](https://img.shields.io/npm/v/@leafvein/catalogue)](https://www.npmjs.com/package/@leafvein/catalogue)

## Installation

```bash
npm i @leafvein/catalogue
# or
pnpm i @leafvein/catalogue
```

## Usage

### Example

```js
import React from 'react'
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

| Property                 | Description                                                                              | Type               | Default  | Version |
| ------------------------ | ---------------------------------------------------------------------------------------- | ------------------ | -------- | ------- |
| contentMark              | Provides a body content selector for the catalog component                               | string             | -        |         |
| contentLeft              | How far is the left side of the custom catalogue from the main content                   | number             | 20       |         |
| isDebounce               | Activation mode of the catalogue item when scrolling the screen                          | boolean            | true     |         |
| delayTime                | Rolling event departure frequency                                                        | number             | 50ms     |         |
| scrollHash               | Whether scrolling the page makes the hash value on the URL change with it                | boolean            | false    |         |
| scrollBehavior           | Click on the Item of the catalogue, the scrolling behavior of the page                   | 'smooth' \| 'auto' | 'smooth' |         |
| openMoveHorizontally     | Whether the catalogue component follows the body content and moves with the screen width | boolean            | false    |         |
| loadingDuration          | loading duration before catalogue loads                                                  | number             | 500ms    |         |
| diyLoadingStyle          | Custom loading style like {width: "100px"}                                               | object             | true     |         |
| diyLoadingChildren       | Custom loading component                                                                 | ReactElement       | -        |         |
| diyWrapStyle             | Custom Wrap style like {width: "100px"}                                                  | object             | -        |         |
| diyItemsStyle            | Custom Items style like {width: "100px"}                                                 | object             | -        |         |
| diyActiveItemColor       | Customize Active Catalogue Item font color like "#000"                                   | string             | -        |         |
| diyActiveItemBorderColor | Customize Active Catalogue Item border color like "#000"                                 | string             | -        |         |

## License

MIT
