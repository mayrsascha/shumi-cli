import { execute } from '../lib/execute.js';
import { buildTrendsQuery } from '../lib/query-builder.js';

export function registerTrendsCommand(program) {
  program
    .command('trends')
    .description('trend analysis (fresh, stale, or aligned)')
    .option('--fresh', 'show freshly started trends (default)')
    .option('--stale', 'show longest-running trends')
    .option('--aligned', 'show coins aligned across all timeframes')
    .option('--interval <interval>', 'trend interval (1d, 1w)', '1d')
    .option('--limit <n>', 'max results', parseInt)
    .option('--raw', 'output raw JSON data')
    .action(async (options) => {
      const queryText = buildTrendsQuery(options);
      await execute({
        queryText,
        raw: options.raw,
        commandContext: 'trends',
      });
    });
}
