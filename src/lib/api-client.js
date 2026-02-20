import { API_URL, getDeviceId, getToken, getWalletAddress } from './config.js';

export class ApiError extends Error {
  constructor(status, body) {
    super(body?.error || body?.message || `API request failed: ${status}`);
    this.status = status;
    this.body = body;
  }
}

export async function query({ messages, raw = false, archetype = 'base', commandContext = null }) {
  const token = getToken();
  const deviceId = getDeviceId();
  const walletAddress = getWalletAddress();

  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const body = {
    messages,
    deviceId,
    raw,
    archetype,
  };

  if (walletAddress) body.walletAddress = walletAddress;
  if (commandContext) body.commandContext = commandContext;

  const response = await fetch(`${API_URL}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    let errorBody;
    try {
      errorBody = await response.json();
    } catch {
      errorBody = { error: await response.text() };
    }

    if (response.status === 401) {
      throw new ApiError(401, { error: 'Authentication required. Run: shumi login' });
    }
    if (response.status === 429) {
      throw new ApiError(429, { error: 'Rate limit exceeded. Please try again later.' });
    }
    if (response.status === 403) {
      throw new ApiError(403, { error: 'Free query used. Sign in to continue: shumi login' });
    }

    throw new ApiError(response.status, errorBody);
  }

  return response.json();
}

export async function healthCheck() {
  try {
    const response = await fetch(`${API_URL.replace('/api/cli', '')}/api/health`, {
      method: 'GET',
      signal: AbortSignal.timeout(10000),
    });
    return { ok: response.ok, status: response.status };
  } catch (error) {
    return { ok: false, status: 0, error: error.message };
  }
}
