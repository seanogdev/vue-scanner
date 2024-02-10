#!/usr/bin/env node
import { Command } from 'commander';
import pc from 'picocolors';
import { version } from '../package.json';

import { defaultConfig, defaultDirectory } from './context.js';
import { scan } from './index.js';
import { VueScannerConfig } from './types.js';

const program = new Command();

program.name('vue-scanner');
program.description('Scan a Vue project for component usage');
program.version(version);

program
  .argument('[directory]', 'The directory to scan', defaultDirectory)
  .option('-O, --output <output>', 'Output file', defaultConfig.output)
  .option('-P, --no-prop-stats', "Don't collect prop stats", defaultConfig.collect.props)
  .option('-S, --no-slot-stats', "Don't collect slot stats", defaultConfig.collect.slots)
  .option('-L, --no-location-stats', "Don't collect file location stats", defaultConfig.collect.location)
  .action(async (directory: string, config: Partial<VueScannerConfig>) => {
    const start = performance.now();
    const res = await scan(directory, config);
    if (res) {
      console.log(JSON.stringify(res, null, 2));
    }
    const end = performance.now();
    const time = Math.round((end - start) * 100) / 100;
    console.log(pc.green(`Scanning complete in ${time} ms`));
  });

program.parse(process.argv);
