import { registerAskCommand } from './commands/ask.js';
import { registerCoinCommand } from './commands/coin.js';
import { registerMarketCommand } from './commands/market.js';
import { registerSentimentCommand } from './commands/sentiment.js';
import { registerTrendsCommand } from './commands/trends.js';
import { registerScanCommand } from './commands/scan.js';
import { registerCategoryCommand } from './commands/category.js';
import { registerNarrativesCommand } from './commands/narratives.js';
import { registerDeltaNeutralCommand } from './commands/deltaNeutral.js';
import { registerTweetsCommand } from './commands/tweets.js';
import { registerSearchCommand } from './commands/search.js';
import { registerAuthCommands } from './commands/auth.js';
import { registerHealthCommand } from './commands/health.js';
import { registerKeysCommand } from './commands/keys.js';

export function registerCommands(program) {
  registerAskCommand(program);
  registerCoinCommand(program);
  registerMarketCommand(program);
  registerSentimentCommand(program);
  registerTrendsCommand(program);
  registerScanCommand(program);
  registerCategoryCommand(program);
  registerNarrativesCommand(program);
  registerDeltaNeutralCommand(program);
  registerTweetsCommand(program);
  registerSearchCommand(program);
  registerAuthCommands(program);
  registerHealthCommand(program);
  registerKeysCommand(program);
}
