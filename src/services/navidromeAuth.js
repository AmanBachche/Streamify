import CryptoJS from 'crypto-js';

const AUTH_STORAGE_KEY = 'streamify_navidrome_auth';
const DEFAULT_NAVIDROME_URL = import.meta.env.VITE_NAVIDROME_URL || 'http://localhost:4533';

export function getNavidromeUrl() {
  const auth = getAuth();
  const serverUrl = auth?.serverUrl || DEFAULT_NAVIDROME_URL;
  if (!serverUrl) {
    throw new Error('Enter your Navidrome server address to connect.');
  }
  return serverUrl.replace(/\/+$/, '');
}

export function createAuth(username, password, serverUrl = DEFAULT_NAVIDROME_URL) {
  const salt = cryptoRandomString(16);
  const token = CryptoJS.MD5(password + salt).toString();

  return {
    username,
    serverUrl: serverUrl.trim().replace(/\/+$/, ''),
    token,
    salt,
    client: 'Streamify',
    version: '1.16.1',
  };
}

function cryptoRandomString(length) {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  const values = new Uint32Array(length);
  crypto.getRandomValues(values);

  return Array.from(values, (value) => chars[value % chars.length]).join('');
}

export function saveAuth(auth) {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
}

export function getAuth() {
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function clearAuth() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

export const NAVIDROME_URL = DEFAULT_NAVIDROME_URL;
