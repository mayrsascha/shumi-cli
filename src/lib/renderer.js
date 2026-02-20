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
