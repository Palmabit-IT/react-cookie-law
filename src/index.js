import React from 'react';
import CookieBanner from './components/CookieBanner';
import { isServer } from './helpers';

const CookieBannerUniversal = (props) => (isServer() ? null : <CookieBanner {...props} />);

export { CookieBannerUniversal as CookieBanner };
