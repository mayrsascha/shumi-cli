import { execute } from '../lib/execute.js';
import { buildSentimentQuery } from '../lib/query-builder.js';

export function registerSentimentCommand(program) {
  program
    .command('sentiment')
    .description('sentiment analysis (market, coin, category, or narrative)')
    .option('--coin <symbol>', 'sentiment for a specific coin')
    .option('--category <name>', 'sentiment for a category')
    .option('--narrative <name>', 'sentiment for a narrative')
    .option('--interval <interval>', 'time interval (1h, 1d, 1w, 1m)', '1d')
    .option('--raw', 'output raw JSON data')
    .action(async (options) => {
      const queryText = buildSentimentQuery(options);
      await execute({
        queryText,
        raw: options.raw,
        commandContext: 'sentiment',
      });
    });
}
