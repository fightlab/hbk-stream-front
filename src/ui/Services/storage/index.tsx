export default class Storage {
  localStorageSupported: boolean;

  constructor() {
    this.localStorageSupported =
      typeof window.localStorage !== "undefined" && window.localStorage != null;
  }

  // set value to storage
  set(key: string, item: string) {
    if (this.localStorageSupported) {
      localStorage.setItem(key, item);
    }
  }

  // get one item by key from storage
  get(key: string): string {
    if (this.localStorageSupported) {
      const item = localStorage.getItem(key);
      return item;
    }
    return null;
  }

  // set boolean value to storage
  setBool(key: string, value: boolean) {
    if (this.localStorageSupported) {
      const item = value ? "1" : "0";
      localStorage.setItem(key, item);
    }
  }

  // get boolean value from storage
  getBool(key: string): boolean {
    if (this.localStorageSupported) {
      const item = localStorage.getItem(key);
      if (item) {
        return item === "1";
      }
    }
    return null;
  }

  // remove value from storage
  remove(key: string) {
    if (this.localStorageSupported) {
      localStorage.removeItem(key);
    }
  }

  has(key: string): boolean {
    if (this.localStorageSupported) {
      const item = localStorage.getItem(key);
      if (item !== null) return true;
      return false;
    }
    return null;
  }

  // clear storage (remove all items from it)
  clear() {
    if (this.localStorageSupported) {
      localStorage.clear();
    }
  }
}
