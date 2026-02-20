import { createServer } from 'http';
import { nanoid } from 'nanoid';
import open from 'open';
import { saveCredentials, clearCredentials } from './config.js';

const AUTH_URL = 'https://shumi.ai/auth/cli';

/**
 * Start a temporary localhost server, open browser for auth,
 * wait for callback with token + wallet.
 */
export async function login() {
  const state = nanoid();

  return new Promise((resolve, reject) => {
    let settled = false;
    let timeoutId;

    function cleanup() {
      settled = true;
      clearTimeout(timeoutId);
      server.close();
    }

    const server = createServer((req, res) => {
      const url = new URL(req.url, `http://localhost`);

      if (url.pathname !== '/callback') {
        res.writeHead(404);
        res.end('Not found');
        return;
      }

      if (settled) {
        res.writeHead(400);
        res.end('Authentication already completed.');
        return;
      }

      const callbackState = url.searchParams.get('state');
      const token = url.searchParams.get('token');
      const wallet = url.searchParams.get('wallet');
      const expiresAt = url.searchParams.get('expiresAt');

      if (callbackState !== state) {
        res.writeHead(400);
        res.end('Invalid state parameter. Authentication failed.');
        cleanup();
        reject(new Error('State mismatch — possible CSRF attempt'));
        return;
      }

      if (!token || !wallet) {
        res.writeHead(400);
        res.end('Missing token or wallet. Authentication failed.');
        cleanup();
        reject(new Error('Missing token or wallet in callback'));
        return;
      }

      saveCredentials({ token, walletAddress: wallet, expiresAt: expiresAt || null });

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`
        <html>
          <body style="font-family: monospace; background: #1c1c1e; color: #fff; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0;">
            <div style="text-align: center;">
              <h1>Authenticated</h1>
              <p>You can close this tab and return to your terminal.</p>
            </div>
          </body>
        </html>
      `);

      cleanup();
      resolve({ walletAddress: wallet });
    });

    // Listen on random port
    server.listen(0, '127.0.0.1', () => {
      const port = server.address().port;
      const authUrl = `${AUTH_URL}?state=${state}&port=${port}`;
      open(authUrl);
    });

    // Timeout after 2 minutes
    timeoutId = setTimeout(() => {
      if (!settled) {
        cleanup();
        reject(new Error('Authentication timed out. Please try again.'));
      }
    }, 120000);
  });
}

export function logout() {
  clearCredentials();
}
