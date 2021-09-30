[![NPM](https://nodei.co/npm/react-ipynb-renderer.png?mini=true)](https://www.npmjs.com/package/react-ipynb-renderer)

# Images

| solarizedl and duotone forest themes                                                                                          | monokai and xonokai themes                                                                                  |
| ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| ![solarizedl with duotone_earth](https://github.com/righ/react-ipynb-renderer/raw/master/images/solarizedl-duotone_earth.png) | ![monokai with xonokai](https://github.com/righ/react-ipynb-renderer/raw/master/images/monokai-xonokai.png) |


# Install

```sh
$ npm install --save react-ipynb-renderer
```

or

```sh
$ yarn add react-ipynb-renderer
```


# Usage
Just pass an ipynb json object to `IpynbRenderer` component.

## Code example

```typescript
import React from "react";
import { IpynbRenderer } from "react-ipynb-renderer";

// Jupyter theme
import "react-ipynb-renderer/dist/styles/monokai.css";
// import ipynb file as json
import ipynb from "./test.ipynb";

export const Component: React.FC = () => {
  return (<>
    <IpynbRenderer
      ipynb={ipynb}
      syntaxTheme="xonokai"
      language="python"
      bgTransparent={true}
      formulaOptions={{ // optional
        renderer: "mathjax", // katex by default
        mathjaxContextProps: { version: 2 }, // mathjax3 by default
        mathjaxProps: {dynamic: true},
        katex: {
          delimiters: "gitlab", // dollars by default
          katexOptions: {
            fleqn: false,
          },
        }
      }}
    />
  </>);
};
```

## codesandbox
https://codesandbox.io/s/react-ipynb-renderer-sample-kbu4z?file=/src/App.tsx

### supporting nbformat
- 5?
- 4
- 3?

## 2 ways to get ipynb json.

- ``import ipynb from "./path/to/some.ipynb"`` (requires json-loader)
- ``const ipynb = JSON.parse(ipynbString)``

# Themes
## Jupyter themes
If you do not want to style the notebook yourself, you can use one of the following themes.

- chesterish
- grade3
- gruvboxd
- gruvboxl
- monokai
- oceans16
- onedork
- solarizedd
- solarizedl

These are the same as [jupyter-themes](https://github.com/dunovank/jupyter-themes).

Import to use as follow:

```typescript
import "react-ipynb-renderer/dist/styles/monokai.css";
```

## Syntax highlight themes
It highlights the code of the notebook using [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter).

You can select one of [prism](https://github.com/react-syntax-highlighter/react-syntax-highlighter/tree/master/src/styles/prism) themes.

- atomDark
- cb
- coy
- darcula
- dark
- duotoneDark
- duotoneEarth
- duotoneForest
- duotoneLight
- duotoneSea
- duotoneSpace
- funky
- ghcolors
- hopscotch
- okaidia
- pojoaque
- prism
- solarizedlight
- tomorrow
- twilight
- vscDarkPlus
- xonokai (default)

Pass the theme string to syntaxTheme prop.

```jsx
<IpynbRenderer
  ipynb={ipynb}
  syntaxTheme="xonokai"
/>
```

### bgTransparent prop
The background color of the code is transparent by default. For this reason, depending on the combination with jupyter theme, it may be difficult to see the text color.
You pass `bgTransparent={false}`, code background color gets back to highlighting color.

# Formula
You can choose between mathjax and katex for the formula.



