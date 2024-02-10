#!/usr/bin/env node
import { Command } from 'commander';
import { version } from '../package.json';

import { defaultConfig } from './context.js';
import { VueScanner } from './index.js';
import { VueScannerConfig } from './types.js';

const program = new Command();

program.version(version);

program.name('vue-scanner').description('A tool for scanning Vue.js projects for metrics.');

program
  .argument('<directory>', 'The directory to scan')
  .option('-O, --output <output>', `Output file`, defaultConfig.output)
  .option('-P, --no-prop-stats', "Don't collect prop stats", defaultConfig.collect.props)
  .option('-S, --no-slot-stats', "Don't collect slot stats", defaultConfig.collect.slots)
  .option('-L, --no-location-stats', "Don't collect file location stats", defaultConfig.collect.location)
  .action(async (directory, options) => {
    const res = await VueScanner({ ...options, directory });
    console.log(JSON.stringify(res, null, 2));
  });

const config = program.parse(process.argv);
