import React, { useEffect, useState } from 'react';
import CookieBanner from './CookieBanner';
import CookieBannerContent from './CookieBannerContent';
import { useCookieBanner } from '../provides/cookieProviders';
import { isServer } from '../helpers';

const ReactCookieBanner = (props: React.ComponentProps<typeof CookieBanner>) => {
  const {
    preferencesDefaultChecked,
    statisticsDefaultChecked,
    marketingDefaultChecked,
    dismissOnScroll,
  } = props;

  const [preferencesCookie, setPreferencesCookie] = useState(
    preferencesDefaultChecked,
  );
  const [statisticsCookie, setStatisticsCookie] = useState(
    statisticsDefaultChecked,
  );
  const [marketingCookie, setMarketingCookie] = useState(
    marketingDefaultChecked,
  );
  const { onSaveConsents, onAcceptAll } = useCookieBanner();

  useEffect(() => {
    if (isServer() || dismissOnScroll !== true) {
      return;
    }

    if (window.addEventListener) {
      window.addEventListener('scroll', onAcceptAll);
    } else if (window.attachEvent) {
      window.attachEvent('onscroll', onAcceptAll); // < IE9
    }

    // eslint-disable-next-line consistent-return
    return () => {
      if (window.removeEventListener) {
        window.removeEventListener('scroll', onAcceptAll);
      } else if (window.detachEvent) {
        window.detachEvent('onscroll', onAcceptAll); // < IE9
      }
    };
  }, []);

  const onTogglePreferencesCookies = () => {
    setPreferencesCookie((checked) => !checked);
  };

  const onToggleStatisticsCookies = () => {
    setStatisticsCookie((checked) => !checked);
  };

  const onToggleMarketingCookies = () => {
    setMarketingCookie((checked) => !checked);
  };

  const onSave = () => {
    onSaveConsents({
      preferences: preferencesCookie,
      statistics: statisticsCookie,
      marketing: marketingCookie,
    });
  };

  const contentProps = {
    onTogglePreferencesCookies,
    onToggleStatisticsCookies,
    onToggleMarketingCookies,
    onSave,
    onAcceptAll,
  };

  return <CookieBannerContent {...props} {...contentProps} />;
};

export default ReactCookieBanner;
