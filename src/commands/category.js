import { execute } from '../lib/execute.js';
import { buildCategoryQuery } from '../lib/query-builder.js';

export function registerCategoryCommand(program) {
  program
    .command('category [name]')
    .description('category trend breakdown (or list all categories)')
    .option('--interval <interval>', 'trend interval (1d, 1w)', '1d')
    .option('--raw', 'output raw JSON data')
    .action(async (name, options) => {
      const queryText = buildCategoryQuery(name, options);
      await execute({
        queryText,
        raw: options.raw,
        commandContext: 'category',
      });
    });
}
