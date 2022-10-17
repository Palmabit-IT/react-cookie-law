import React, { ComponentProps } from 'react';
import CookieBanner from './components/CookieBanner';
import { isServer } from './helpers';

const CookieBannerUniversal = (props: ComponentProps<typeof CookieBanner>) => {
  if (isServer()) {
    return null;
  }
  return <CookieBanner {...props} />;
};

export { CookieBannerUniversal as CookieBanner };
