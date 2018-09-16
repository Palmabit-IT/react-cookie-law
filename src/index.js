import React from 'react';
import CookieBanner from './components/CookieBanner';
import { isServer } from './helpers';

export default props => (isServer() ? null : <CookieBanner {...props} />);
