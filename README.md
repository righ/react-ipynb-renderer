[![NPM](https://nodei.co/npm/react-ipynb-renderer.png?mini=true)](https://www.npmjs.com/package/react-ipynb-renderer)
[![NPM](https://nodei.co/npm/react-ipynb-renderer-katex.png?mini=true)](https://www.npmjs.com/package/react-ipynb-renderer-katex)

# Images

| solarizedl and duotone forest themes                                                                                          | monokai and xonokai themes                                                                                  |
| ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| ![solarizedl with duotone_earth](https://github.com/righ/react-ipynb-renderer/raw/master/images/solarizedl-duotone_earth.png) | ![monokai with xonokai](https://github.com/righ/react-ipynb-renderer/raw/master/images/monokai-xonokai.png) |

This component draws an ipynb file in Jupyter Notebook.
You can use MathJax or Katex to render math expressions; install `react-ipynb-renderer` if you use MathJax, or `react-ipynb-renderer-katex` if you use Katex.

If you are not particular, we recommend using react-ipynb-renderer.

# Install

```sh
$ npm install --save react-ipynb-renderer
```

or

```sh
$ npm install --save react-ipynb-renderer-katex
```

# Usage
Just pass an ipynb json object to `IpynbRenderer` component.

## Code example

### Using react-ipynb-renderer

```jsx
import { IpynbRenderer } from "react-ipynb-renderer";

// Jupyter theme
import "react-ipynb-renderer/dist/styles/monokai.css";
// import ipynb file as json
import ipynb from "./test.ipynb";

export const Component = () => {
  return (<>
    <IpynbRenderer
      ipynb={ipynb}
      syntaxTheme="xonokai"
      language="python"
      bgTransparent={true}
      mdiOptions={{
        html: true,
        linkify: true,
      }}
    />
  </>);
};
```

### Using react-ipynb-renderer-katex

```jsx
import { IpynbRenderer } from "react-ipynb-renderer-katex";

// Formula renderer for katex
import 'katex/dist/katex.min.css';

// Jupyter theme
import "react-ipynb-renderer-katex/dist/styles/monokai.css";
// import ipynb file as json
import ipynb from "./test.ipynb";

export const Component = () => {
  return (<>
    <IpynbRenderer
      ipynb={ipynb}
      syntaxTheme="xonokai"
      language="python"
      bgTransparent={true}
      formulaOptions={{ // optional
        texmath: {
          delimiters: "gitlab", // dollars by default
          katexOptions: {
            fleqn: false,
          },
        }
      }}
      mdiOptions={{
        html: true,
        linkify: true,
      }}
    />
  </>);
};
```

### sample
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
If you pass `bgTransparent={false}`, code background color will get back to highlighting color.


# Migrate for v1.0.0

## If you were using renderer mathjax

Remove the following code.
- `katex.min.css` import (if you wrote)
  - Originally, it is not used in Mathjax.
- formulaOption prop.

### before

```jsx
import { IpynbRenderer } from "react-ipynb-renderer";

// Formula renderer for katex
// import 'katex/dist/katex.min.css'; // Remove this

// Jupyter theme
import "react-ipynb-renderer-katex/dist/styles/monokai.css";
// import ipynb file as json
import ipynb from "./test.ipynb";

export const Component = () => {
  return (<>
    <IpynbRenderer
      ipynb={ipynb}
      syntaxTheme="xonokai"
      language="python"
      bgTransparent={true}
      formulaOptions={{ // Remove this
        renderer: "mathjax",
      }}
      mdiOptions={{
        html: true,
        linkify: true,
      }}
    />
  </>);
};
```

### after
```jsx
import { IpynbRenderer } from "react-ipynb-renderer";

// Jupyter theme
import "react-ipynb-renderer-katex/dist/styles/monokai.css";
// import ipynb file as json
import ipynb from "./test.ipynb";

export const Component = () => {
  return (<>
    <IpynbRenderer
      ipynb={ipynb}
      syntaxTheme="xonokai"
      language="python"
      bgTransparent={true}
      mdiOptions={{
        html: true,
        linkify: true,
      }}
    />
  </>);
};
```

## If you were using renderer katex

- Rename `katex` to `texmath` in formulaOption.
- Change import name `react-ipynb-render` to `react-ipynb-renderer-katex`.

### before

```jsx
import { IpynbRenderer } from "react-ipynb-renderer"; // Change

// Formula renderer for katex
import 'katex/dist/katex.min.css';

// Jupyter theme
import "react-ipynb-renderer-katex/dist/styles/monokai.css";
// import ipynb file as json
import ipynb from "./test.ipynb";

export const Component = () => {
  return (<>
    <IpynbRenderer
      ipynb={ipynb}
      syntaxTheme="xonokai"
      language="python"
      bgTransparent={true}
      formulaOptions={{
        renderer: "katex", // Remove this
        katex: { // Rename this to texmath
          delimiters: "gitlab",
          katexOptions: {
            fleqn: false,
          },
        }
      }}
      mdiOptions={{
        html: true,
        linkify: true,
      }}
    />
  </>);
};
```

### after
```jsx
import { IpynbRenderer } from "react-ipynb-renderer-katex";

// Formula renderer for katex
import 'katex/dist/katex.min.css';

// Jupyter theme
import "react-ipynb-renderer-katex/dist/styles/monokai.css";
// import ipynb file as json
import ipynb from "./test.ipynb";

export const Component = () => {
  return (<>
    <IpynbRenderer
      ipynb={ipynb}
      syntaxTheme="xonokai"
      language="python"
      bgTransparent={true}
      formulaOptions={{
        texmath: {
          delimiters: "gitlab",
          katexOptions: {
            fleqn: false,
          },
        }
      }}
      mdiOptions={{
        html: true,
        linkify: true,
      }}
    />
  </>);
};
```
