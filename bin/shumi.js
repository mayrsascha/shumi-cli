#!/usr/bin/env node

import { createRequire } from 'module';
import { program } from 'commander';
import { registerCommands } from '../src/index.js';

const require = createRequire(import.meta.url);
const pkg = require('../package.json');

program
  .name('shumi')
  .description('Shumi — crypto trade intelligence from your terminal')
  .version(pkg.version);

registerCommands(program);

program.parse();
