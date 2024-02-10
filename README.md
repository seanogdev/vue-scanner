# vue-scanner

Vue Scanner is a tool to gather usage metrics in Vue project. It can provide information such as:

- How many unique components are used in the project
- How many times each component is used
- What props are passed to each component

This tool can be used as an entry point to build your own reports or dashboards.

The API was partly inspired by [react-scanner](https://github.com/moroshko/react-scanner).

## Installation

- pnpm

  ```bash
  pnpm add -D vue-scanner
  ```

- npm

  ```bash
  npm install --save-dev vue-scanner
  ```

## Usage

### CLI

```bash
vue-scanner directory --output output.json
```

### API

```js
import { scan } from "vue-scanner";
import { resolve } from "path";


const result = scan(resolve(__dirname, "src")), {
  output: "report.json",
});
```

## Command Line Options

The program accepts the following command line arguments and options:

### Arguments

- `[directory]`: Specifies the directory to scan. If not provided, the program will use the default directory (`./`).

### Options

- `-O, --output <output>`: Specifies the output file. If not provided, the program will use the default output file specified in the configuration.

- `-P, --no-prop-stats`: If this option is set, the program will not collect prop statistics. By default, prop statistics are collected as specified in the configuration.

- `-S, --no-slot-stats`: If this option is set, the program will not collect slot statistics. By default, slot statistics are collected as specified in the configuration.

- `-L, --no-location-stats`: If this option is set, the program will not collect file location statistics. By default, file location statistics are collected as specified in the configuration.

## Limitations

This tool only **offically** works wit Vue 3 projects. It may work with Vue 2 projects, but it's not a goal of this project.
