import { homedir, hostname, userInfo, platform, arch } from 'os';
import { join } from 'path';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { createHash } from 'crypto';

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

/**
 * Derive a deterministic device ID from stable machine properties.
 * Survives config deletion — same machine always produces the same ID.
 */
function getMachineFingerprint() {
  const data = [
    hostname(),
    userInfo().username,
    platform(),
    arch(),
    homedir(),
  ].join('|');
  return createHash('sha256').update(data).digest('hex').slice(0, 24);
}

export function getDeviceId() {
  return getMachineFingerprint();
}

export function getToken() {
  if (process.env.SHUMI_TOKEN) return process.env.SHUMI_TOKEN;
  const config = readConfig();
  if (!config.token) return null;
  if (config.expiresAt && new Date(config.expiresAt) < new Date()) {
    return null;
  }
  return config.token;
}

export function getWalletAddress() {
  return process.env.SHUMI_WALLET || readConfig().walletAddress || null;
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
