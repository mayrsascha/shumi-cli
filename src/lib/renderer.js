import chalk from 'chalk';
import { Marked } from 'marked';
import { markedTerminal } from 'marked-terminal';

const marked = new Marked(markedTerminal());

export function renderText(text) {
  if (!text) {
    console.log(chalk.yellow('No response received.'));
    return;
  }
  console.log(marked.parse(text));
}

export function renderRaw(data) {
  console.log(JSON.stringify(data, null, 2));
}

export function renderError(error) {
  if (error.status === 401 || error.status === 403) {
    console.error(chalk.yellow(error.message));
  } else {
    console.error(chalk.red(`Error: ${error.message}`));
  }
}
