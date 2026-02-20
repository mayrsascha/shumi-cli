import { execute } from '../lib/execute.js';
import { buildScanQuery } from '../lib/query-builder.js';

export function registerScanCommand(program) {
  program
    .command('scan')
    .description('filter coins by trend, category, market cap, exchange')
    .option('--trend <direction>', 'filter by trend (UP, HODL, DOWN)')
    .option('--category <name>', 'filter by category')
    .option('--mcap-min <n>', 'minimum market cap in USD', parseFloat)
    .option('--mcap-max <n>', 'maximum market cap in USD', parseFloat)
    .option('--exchange <name>', 'filter by exchange')
    .option('--interval <interval>', 'trend interval (1d, 1w)', '1d')
    .option('--limit <n>', 'max results', parseInt)
    .option('--raw', 'output raw JSON data')
    .action(async (options) => {
      const queryText = buildScanQuery(options);
      await execute({
        queryText,
        raw: options.raw,
        commandContext: 'scan',
      });
    });
}
