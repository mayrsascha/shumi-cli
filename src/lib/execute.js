import ora from 'ora';
import { query } from './api-client.js';
import { renderText, renderRaw } from './renderer.js';

/**
 * Execute a Shumi query with spinner, error handling, and rendering.
 */
export async function execute({ queryText, raw = false, archetype = 'base', commandContext = null }) {
  const spinner = ora({ text: 'thinking...', spinner: 'dots' }).start();

  try {
    const messages = [{ role: 'user', content: queryText }];
    const result = await query({ messages, raw, archetype, commandContext });

    spinner.stop();

    if (raw) {
      renderRaw(result.steps || result);
    } else {
      renderText(result.text);
    }
  } catch (error) {
    spinner.fail(error.message);
    process.exitCode = 1;
  }
}
