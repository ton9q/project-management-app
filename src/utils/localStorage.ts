export class LocalStorage {
  static getItem = (key: string) => {
    const value = window.localStorage.getItem(key);
    if (!value) {
      return null;
    }
    return JSON.parse(value);
  };

  static setItem = (key: string, value: unknown) => {
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  static removeItem = (key: string) => {
    window.localStorage.removeItem(key);
  };

  static clear = () => {
    window.localStorage.clear();
  };
}
