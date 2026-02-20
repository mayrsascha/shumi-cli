import { execute } from '../lib/execute.js';
import { buildDeltaNeutralQuery } from '../lib/query-builder.js';

export function registerDeltaNeutralCommand(program) {
  program
    .command('delta-neutral')
    .description('funding rate arbitrage opportunities')
    .option('--exchange <name>', 'filter by exchange')
    .option('--dex-only', 'DEX exchanges only')
    .option('--symbol <ticker>', 'filter by specific coin')
    .option('--limit <n>', 'max results', parseInt)
    .option('--raw', 'output raw JSON data')
    .action(async (options) => {
      const queryText = buildDeltaNeutralQuery(options);
      await execute({
        queryText,
        raw: options.raw,
        archetype: 'deltaneutral',
        commandContext: 'delta-neutral',
      });
    });
}
