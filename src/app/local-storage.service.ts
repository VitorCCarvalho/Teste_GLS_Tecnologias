import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  set(key: string, value: object) {
    if (this.storage) {
      this.storage.setItem(key, JSON.stringify(value));
      return true;
    } else {
      return false
    }
  }

  get(key: string): any {
    if (this.storage) {
      let storage_key = this.storage.getItem(key);

      return JSON.parse(storage_key || '{}');
    }
    return null;
  }

  clear(): boolean {
    if (this.storage) {
      this.storage.clear();
      return true;
    }
    return false;
  }
}
