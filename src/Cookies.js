import { Cookies as ReactCookies } from 'react-cookie';
import { getExpirationDate } from './helpers';

export default class Cookies {
  constructor() {
    this.cookies = new ReactCookies();
  }

  get(cookie) {
    return this.cookies.get(cookie);
  }

  set(cookie, cookieExpiration) {
    this.cookies.set(cookie, true, {
      expires: cookieExpiration || getExpirationDate(),
    });
  }

  remove(cookie) {
    return this.cookies.remove(cookie);
  }
}
