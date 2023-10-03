#!/usr/bin/env node

import { Command } from "commander";
import { argv } from "process";

const program = new Command();

program
  .name("vue-scanner")
  .description("A tool for scanning Vue.js projects for metrics.");

program
  .option("-D, --directory <directory>")
  .option("-O, --output <output>")
  .action((message, { opts }) => {
    console.log("test:", opts());
  });

program.parse(argv);
