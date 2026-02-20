import ora from 'ora';
import { query } from './api-client.js';
import { renderText, renderRaw } from './renderer.js';

// Phase messages that rotate while waiting for the API response.
// Timings approximate what shumi does server-side.
const PHASES = [
  { text: 'classifying query', delay: 0 },
  { text: 'fetching market data', delay: 2500 },
  { text: 'analyzing results', delay: 6000 },
  { text: 'generating response', delay: 9000 },
];

/**
 * Execute a Shumi query with animated spinner, error handling, and rendering.
 */
export async function execute({ queryText, raw = false, archetype = 'base', commandContext = null }) {
  const startTime = Date.now();
  const spinner = ora({ text: PHASES[0].text, spinner: 'dots' }).start();

  // Schedule phase transitions
  const timers = PHASES.slice(1).map(phase =>
    setTimeout(() => { spinner.text = phase.text; }, phase.delay)
  );

  try {
    const messages = [{ role: 'user', content: queryText }];
    const result = await query({ messages, raw, archetype, commandContext });

    timers.forEach(clearTimeout);
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    spinner.succeed(`done in ${elapsed}s`);

    if (raw) {
      renderRaw(result.steps || result);
    } else {
      renderText(result.text);
    }
  } catch (error) {
    timers.forEach(clearTimeout);
    spinner.fail(error.message);
    process.exitCode = 1;
  }
}
