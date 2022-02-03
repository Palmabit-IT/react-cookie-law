import React, { useState, useContext, createContext } from 'react';
import { useCookies } from 'react-cookie';
import { getExpirationDate } from '../helpers';

const CONSENT_GIVEN = 'rcl_consent_given';
const PREFERENCES_COOKIE = 'rcl_preferences_consent';
const STATISTICS_COOKIE = 'rcl_statistics_consent';
const MARKETING_COOKIE = 'rcl_marketing_consent';

const PreferencesContext = createContext();

const CookieBannerProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies([
    CONSENT_GIVEN,
    PREFERENCES_COOKIE,
    STATISTICS_COOKIE,
    MARKETING_COOKIE,
  ]);

  const [consents, setConsents] = useState({
    accepted: cookies[CONSENT_GIVEN] || false,
    preferences: cookies[PREFERENCES_COOKIE] || false,
    statistics: cookies[STATISTICS_COOKIE] || false,
    marketing: cookies[MARKETING_COOKIE] || false,
  });

  const toggleCookie = (cookie, value = false) => {
    if (value) {
      setCookie(cookie, value, { expires: getExpirationDate() });
    } else {
      removeCookie(cookie);
    }
  };

  const onSaveConsents = ({
    preferences = false,
    statistics = false,
    marketing = false,
  }) => {
    toggleCookie(PREFERENCES_COOKIE, preferences);
    toggleCookie(STATISTICS_COOKIE, statistics);
    toggleCookie(MARKETING_COOKIE, marketing);

    setConsents({
      accepted: true,
      preferences: !!preferences,
      statistics: !!statistics,
      marketing: !!marketing,
    });
  };

  const onAcceptAll = () => {
    const expires = getExpirationDate();

    setCookie(PREFERENCES_COOKIE, true, { expires });
    setCookie(STATISTICS_COOKIE, true, { expires });
    setCookie(MARKETING_COOKIE, true, { expires });

    setConsents({
      accepted: true,
      preferences: true,
      statistics: true,
      marketing: true,
    });
  };

  const context = {
    consents,
    onSaveConsents,
    onAcceptAll,
  };

  return (
    <PreferencesContext.Provider value={context}>
      {children}
    </PreferencesContext.Provider>
  );
};

const useCookieBanner = () => useContext(PreferencesContext);

export { CookieBannerProvider, useCookieBanner };
