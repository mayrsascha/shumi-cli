import { homedir } from 'os';
import { join } from 'path';
import { readFileSync, writeFileSync, mkdirSync, chmodSync, existsSync } from 'fs';
import { nanoid } from 'nanoid';

const API_URL = 'https://coinrotator.app/api/cli';
const CONFIG_DIR = join(homedir(), '.shumi');
const CONFIG_FILE = join(CONFIG_DIR, 'config.json');

function ensureConfigDir() {
  if (!existsSync(CONFIG_DIR)) {
    mkdirSync(CONFIG_DIR, { recursive: true, mode: 0o700 });
  }
}

function readConfig() {
  ensureConfigDir();
  if (!existsSync(CONFIG_FILE)) {
    return {};
  }
  try {
    return JSON.parse(readFileSync(CONFIG_FILE, 'utf-8'));
  } catch {
    return {};
  }
}

function writeConfig(config) {
  ensureConfigDir();
  writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), { mode: 0o600 });
}

export function getDeviceId() {
  const config = readConfig();
  if (config.deviceId) return config.deviceId;
  const deviceId = nanoid();
  writeConfig({ ...config, deviceId });
  return deviceId;
}

export function getToken() {
  const config = readConfig();
  if (!config.token) return null;
  if (config.expiresAt && new Date(config.expiresAt) < new Date()) {
    return null;
  }
  return config.token;
}

export function getWalletAddress() {
  return readConfig().walletAddress || null;
}

export function saveCredentials({ token, walletAddress, expiresAt }) {
  const config = readConfig();
  writeConfig({ ...config, token, walletAddress, expiresAt });
}

export function clearCredentials() {
  const config = readConfig();
  const { token, walletAddress, expiresAt, ...rest } = config;
  writeConfig(rest);
}

export { API_URL, CONFIG_DIR, CONFIG_FILE };
