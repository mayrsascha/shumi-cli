import chalk from 'chalk';
import ora from 'ora';
import { healthCheck } from '../lib/api-client.js';
import { getToken, getWalletAddress, getDeviceId } from '../lib/config.js';

export function registerHealthCommand(program) {
  program
    .command('health')
    .description('check shumi service connectivity')
    .action(async () => {
      const spinner = ora({ text: 'checking...', spinner: 'dots' }).start();

      const result = await healthCheck();
      spinner.stop();

      console.log('');
      console.log(chalk.bold('Shumi Health Check'));
      console.log('─'.repeat(40));

      // Service status
      if (result.ok) {
        console.log(`Service:  ${chalk.green('online')}`);
      } else {
        console.log(`Service:  ${chalk.red('offline')} (${result.error || result.status})`);
      }

      // Auth status
      const token = getToken();
      const wallet = getWalletAddress();
      if (token) {
        console.log(`Auth:     ${chalk.green('authenticated')}`);
        console.log(`Wallet:   ${wallet}`);
      } else {
        console.log(`Auth:     ${chalk.yellow('not authenticated')}`);
      }

      // Device ID
      const deviceId = getDeviceId();
      console.log(`Device:   ${deviceId}`);
      console.log('');
    });
}
