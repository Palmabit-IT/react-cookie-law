import { Cookies as ReactCookies } from 'react-cookie';
import { getExpirationDate } from './helpers';

export default class Cookies {
  constructor(wholeDomain = false) {
    this.cookies = new ReactCookies();
    this.whole_domain = wholeDomain;
  }

  get(cookie) {
    return this.cookies.get(cookie);
  }

  set(cookie, cookieExpiration) {
    const optionPath = this.whole_domain ? { path: '/' } : {};
    this.cookies.set(cookie, true, {
      expires: cookieExpiration || getExpirationDate(),
      ... optionPath,
    });
  }

  remove(cookie) {
    return this.cookies.remove(cookie);
  }
}
