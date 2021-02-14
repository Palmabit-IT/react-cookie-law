import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CookieBannerContent from './CookieBannerContent';
import { useCookieBanner } from '../provides/cookieProviders';
import { isServer } from '../helpers';

const ReactCookieBanner = (props) => {
  const [preferencesCookie, setPreferencesCookie] = useState(false);
  const [statisticsCookie, setStatisticsCookie] = useState(false);
  const [marketingCookie, setMarketingCookie] = useState(false);
  const { onSavePreferences, onAcceptAll } = useCookieBanner();

  const { dismissOnScroll } = props;

  useEffect(() => {
    if (isServer() || dismissOnScroll !== true) {
      return;
    }

    if (window.addEventListener) {
      window.addEventListener('scroll', onScroll);
    } else if (window.attachEvent) {
      window.attachEvent('onscroll', onScroll); // < IE9
    }

    return () => {
      if (window.removeEventListener) {
        window.removeEventListener('scroll', onScroll);
      } else if (window.detachEvent) {
        window.detachEvent('onscroll', onScroll); // < IE9
      }
    }
  }, []);

  const onScroll = () => {
    onAcceptAll();
  }

  const onTogglePreferencesCookies = (e) => {
    setPreferencesCookie(e.target.checked);
  }

  const onToggleStatisticsCookies = (e) => {
    setStatisticsCookie(e.target.checked);
  }

  const onToggleMarketingCookies = (e) => {
    setMarketingCookie(e.target.checked);
  }

  const contentProps = {
    onTogglePreferencesCookies,
    onToggleStatisticsCookies,
    onToggleMarketingCookies,
    onSave: () => onSavePreferences({ preferences: preferencesCookie, statistics: statisticsCookie, marketing: marketingCookie }),
    onAcceptAll,
  };

  return <CookieBannerContent
    {...props}
    {...contentProps}
  />;
}

ReactCookieBanner.protoTypes = {
  className: PropTypes.string,
  styles: PropTypes.object,
  message: PropTypes.string.isRequired,
  wholeDomain: PropTypes.bool,
  policyLink: PropTypes.string,
  privacyPolicyLinkText: PropTypes.string,
  necessaryOptionText: PropTypes.string,
  preferencesOptionText: PropTypes.string,
  statisticsOptionText: PropTypes.string,
  marketingOptionText: PropTypes.string,
  acceptButtonText: PropTypes.string,
  declineButtonText: PropTypes.string,
  showDeclineButton: PropTypes.bool,
  dismissOnScroll: PropTypes.bool,
  showPreferencesOption: PropTypes.bool,
  showStatisticsOption: PropTypes.bool,
  showMarketingOption: PropTypes.bool,
  preferencesDefaultChecked: PropTypes.bool,
  statisticsDefaultChecked: PropTypes.bool,
  marketingDefaultChecked: PropTypes.bool,
  onAccept: PropTypes.func,
  onAcceptPreferences: PropTypes.func,
  onAcceptStatistics: PropTypes.func,
  onAcceptMarketing: PropTypes.func,
  onDeclinePreferences: PropTypes.func,
  onDeclineStatistics: PropTypes.func,
  onDeclineMarketing: PropTypes.func,
};

export default ReactCookieBanner;
