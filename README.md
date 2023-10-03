# vue-scanner

Vue Scanner is a tool to gather usage metrics in Vue project. It can provide information such as:

- How many unique components are used in the project
- How many times each component is used
- What props are passed to each component

This tool can be used as an entry point to build your own reports or dashboards.

The API was partly inspired by [react-scanner](https://github.com/moroshko/react-scanner).

## Installation

- npm

  ```bash
  npm install --save-dev vue-scanner
  ```

- yarn

  ```bash
  yarn add -D vue-scanner
  ```

- pnpm
  ```bash
  pnpm add -D vue-scanner
  ```

## Usage

### CLI

```bash
vue-scanner --directory directory --output output.json
```

### API

```js
import { scan } from "vue-scanner";
import { resolve } from "path";


const result = scan({
  directory: resolve(__dirname, "src")
  output: "report.json",
});
```

## Limitations

This tool only supports Vue 3 projects. It also does not support JSX syntax.
