import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

@Injectable()
export class LocalStorageService2 {
  storageValue: any;

  constructor(private storage: Storage) {
    this.storage.create();
  }

  async setItem(keyItem: any, valueItem: any) {
    await this.storage?.set(keyItem, valueItem);

    return true;
  }

  async getItem(keyItem: string) {
    return await this.storage.get(keyItem);
  }

  async clearItem(keyItem: string) {
    await this.storage.remove(keyItem);
  }

  async clearAll() {
    await this.storage.clear();
  }
}
