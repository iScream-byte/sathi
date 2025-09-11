// encryption-utils.ts
import * as CryptoJS from 'crypto-js';

const KEY = CryptoJS.enc.Utf8.parse('S@tH!2O2s'); // 8-byte key

export function encryptDES_ECB_PKCS5(text: string): string {
  const encrypted = CryptoJS.DES.encrypt(text, KEY, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7 // equivalent to PKCS5
  });
  return encrypted.toString(); // Base64 string
}

export function decryptDES_ECB_PKCS5(base64CipherText: string): string {
  const decrypted = CryptoJS.DES.decrypt(base64CipherText, KEY, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}

export function getCurrentDateTime() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(now.getDate()).padStart(2, '0');

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
