import { execute } from '../lib/execute.js';
import { buildMarketQuery } from '../lib/query-builder.js';

export function registerMarketCommand(program) {
  program
    .command('market')
    .description('market health overview (UP/HODL/DOWN distribution)')
    .option('--interval <interval>', 'trend interval (1d, 1w)', '1d')
    .option('--crossing', 'include trend crossing data')
    .option('--raw', 'output raw JSON data')
    .action(async (options) => {
      const queryText = buildMarketQuery(options);
      await execute({
        queryText,
        raw: options.raw,
        commandContext: 'market',
      });
    });
}
