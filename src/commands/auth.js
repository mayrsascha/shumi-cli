import chalk from 'chalk';
import ora from 'ora';
import { login, logout } from '../lib/auth.js';
import { getToken, getWalletAddress } from '../lib/config.js';

export function registerAuthCommands(program) {
  program
    .command('login')
    .description('authenticate with shumi via browser')
    .action(async () => {
      const existingToken = getToken();
      if (existingToken) {
        const wallet = getWalletAddress();
        console.log(chalk.yellow(`Already authenticated as ${truncate(wallet)}`));
        console.log('Run "shumi logout" first to re-authenticate.');
        return;
      }

      console.log('Opening browser for authentication...');
      const spinner = ora({ text: 'waiting for authentication...', spinner: 'dots' }).start();

      try {
        const { walletAddress } = await login();
        spinner.succeed(`Authenticated as ${truncate(walletAddress)}`);
      } catch (error) {
        spinner.fail(error.message);
        process.exitCode = 1;
      }
    });

  program
    .command('logout')
    .description('clear stored credentials')
    .action(() => {
      logout();
      console.log('Logged out successfully.');
    });

  program
    .command('whoami')
    .description('show current authentication status')
    .action(() => {
      const token = getToken();
      const wallet = getWalletAddress();

      if (!token) {
        console.log(chalk.yellow('Not authenticated. Run: shumi login'));
        return;
      }

      console.log(`Wallet: ${wallet}`);
      console.log(`Status: ${chalk.green('authenticated')}`);
    });
}

function truncate(address) {
  if (!address || address.length < 10) return address || '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
