import { execute } from '../lib/execute.js';
import { buildNarrativesQuery } from '../lib/query-builder.js';

export function registerNarrativesCommand(program) {
  program
    .command('narratives [name]')
    .description('emerging narratives (or sentiment for a specific narrative)')
    .option('--interval <interval>', 'time interval (1d, 1w, 1m)', '1d')
    .option('--refresh', 'force fresh analysis')
    .option('--raw', 'output raw JSON data')
    .action(async (name, options) => {
      const queryText = buildNarrativesQuery(name, options);
      await execute({
        queryText,
        raw: options.raw,
        commandContext: 'narratives',
      });
    });
}
