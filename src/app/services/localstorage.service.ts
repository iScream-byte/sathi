import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { encryptDES_ECB_PKCS5 } from '../utils/myencrypt';
import { decryptDES_ECB_PKCS5 } from 'src/app/utils/myencrypt';

@Injectable()
export class LocalStorageService {
  storageValue: any;
  constructor(private storage: Storage) {
    this.storage.create();
  }

  async setItem(keyItem: any, valueItem: any) {
    const encrypted = encryptDES_ECB_PKCS5(valueItem)
    await this.storage?.set(keyItem, encrypted);
    return true;
  }

  async getItem(keyItem: string) {
    const stored = await this.storage.get(keyItem);

    if (!stored) {
      return null;
    }

    const decrypted = decryptDES_ECB_PKCS5(stored);
    return decrypted;
  }

  async clearItem(keyItem: string) {
    await this.storage.remove(keyItem);
  }

  async clearAll() {
    await this.storage.clear();
  }
}
