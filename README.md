[![NPM](https://nodei.co/npm/react-ipynb-renderer.png?mini=true)](https://www.npmjs.com/package/react-ipynb-renderer)
[![NPM](https://nodei.co/npm/react-ipynb-renderer-katex.png?mini=true)](https://www.npmjs.com/package/react-ipynb-renderer-katex)

| solarizedl and duotone forest themes                                                                                          | monokai and xonokai themes                                                                                  |
| ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| ![solarizedl with duotone_earth](https://github.com/righ/react-ipynb-renderer/raw/master/images/solarizedl-duotone_earth.png) | ![monokai with xonokai](https://github.com/righ/react-ipynb-renderer/raw/master/images/monokai-xonokai.png) |

This component draws an ipynb file in Jupyter Notebook.
You can use MathJax or Katex to render math expressions; install `react-ipynb-renderer` if you use MathJax, or `react-ipynb-renderer-katex` if you use Katex.

If you are not particular, we recommend react-ipynb-renderer.

### Demo

- https://codesandbox.io/s/react-ipynb-renderer-sample-kbu4z?file=/src/App.tsx
- https://codesandbox.io/s/react-ipynb-renderer-katex-sample-770np1?file=/src/App.tsx


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
  return (
    <IpynbRenderer
      ipynb={ipynb}
    />
  );
};
```

#### How to use this on Next.js

```jsx
import dynamic from 'next/dynamic';
const IpynbRenderer = dynamic(() => import('react-ipynb-renderer').then((mod) => mod.IpynbRenderer), {
  ssr: false
});
// import ipynb file as json
import ipynb from "./test.ipynb";

export const Component = () => {
  return (
    <IpynbRenderer
      ipynb={ipynb}
    />
  );
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
  return (
    <IpynbRenderer
      ipynb={ipynb}
    />
  );
};
```

# Links

- https://docs.walkframe.com/products/react-ipynb-renderer/
- https://www.npmjs.com/package/react-ipynb-renderer
