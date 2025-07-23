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
