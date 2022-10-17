import { Cookies as ReactCookies } from 'react-cookie';

import { getExpirationDate } from './helpers';

interface Cookie {
  key: string
  value: unknown
}

export default class Cookies {
  cookies: ReactCookies

  wholeDomain: boolean

  constructor(wholeDomain = false) {
    this.cookies = new ReactCookies();
    this.wholeDomain = wholeDomain;
  }

  get(cookie: string) {
    return this.cookies.get(cookie);
  }

  set(cookie: Cookie | string, cookieExpiration?: Date) {
    const optionPath = this.wholeDomain ? { path: '/' } : {};

    if (typeof cookie === 'object') {
      this.cookies.set(cookie.key, cookie.value, {
        expires: cookieExpiration || getExpirationDate(),
        ...{ optionPath },
      });
      return;
    }

    this.cookies.set(cookie, true, {
      expires: cookieExpiration || getExpirationDate(),
      ...{ optionPath },
    });
  }

  remove(cookie: string) {
    return this.cookies.remove(cookie);
  }

  clear() {
    Object.keys(this.cookies.getAll()).forEach((cookie) => {
      this.cookies.remove(cookie);
    });
  }
}
