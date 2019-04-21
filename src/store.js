export default class Store {
  constructor({key, storage, optionsKey}) {
    this._storage = storage;
    this._storeKey = key;
    this._optionsKey = optionsKey;
  }

  setItem({key, item}) {
    const items = this.getAll();
    items[key] = item;

    this._storage.setItem(this._storeKey, JSON.stringify(items));
  }

  setOptions({key, item}) {
    const optionKey = `${this._optionsKey}-${key}`;
    this._storage.setItem(optionKey, JSON.stringify(item));
  }

  getOption({key}) {
    const option = [];
    try {
      return JSON.parse(this._storage.getItem([`${this._optionsKey}-${key}`]));
    } catch (e) {
      return option;
    }
  }

  getItem({key}) {
    const items = this.getAll();
    return items[key];
  }

  removeItem({key}) {
    const items = this.getAll();
    delete items[key];

    this._storage.setItem(this._storeKey, JSON.stringify(items));
  }

  getAll() {
    const emptyItems = {};

    const items = this._storage.getItem(this._storeKey);

    if (!items) {
      return emptyItems;
    }

    try {
      return JSON.parse(items);
    } catch (err) {
      return emptyItems;
    }
  }

  clear() {
    this._storage.clear();
  }
}
