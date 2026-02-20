import { execute } from '../lib/execute.js';
import { buildCoinQuery } from '../lib/query-builder.js';

export function registerCoinCommand(program) {
  program
    .command('coin <symbol>')
    .description('coin analysis (trend, streak, bands, sentiment)')
    .option('--interval <interval>', 'trend interval (1d, 1w)', '1d')
    .option('--history', 'include 24h historical comparison')
    .option('--no-sentiment', 'skip sentiment data')
    .option('--raw', 'output raw JSON data')
    .action(async (symbol, options) => {
      const queryText = buildCoinQuery(symbol.toUpperCase(), options);
      await execute({
        queryText,
        raw: options.raw,
        commandContext: 'coin',
      });
    });
}
