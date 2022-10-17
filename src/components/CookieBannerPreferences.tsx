import React from 'react';
import CookieOption from './CookieOption';
import bannerStyle, { StyleableComponents } from './bannerStyle';

import type { CoryphaPreference } from '../coryphaAPI';

export interface Props {
  styles?: Partial<Record<StyleableComponents, React.CSSProperties>>
  necessaryOptionText?: string
  preferencesOptionText?: string
  statisticsOptionText?: string
  marketingOptionText?: string
  showPreferencesOption?: boolean
  showStatisticsOption?: boolean
  showMarketingOption?: boolean
  preferencesDefaultChecked?: boolean
  statisticsDefaultChecked?: boolean
  marketingDefaultChecked?: boolean
  onTogglePreferencesCookies?: (checked?: boolean) => void
  onToggleStatisticsCookies?: (checked?: boolean) => void
  onToggleMarketingCookies?: (checked?: boolean) => void
  coryphaPreferences?: CoryphaPreference[]
  onToggleCoryphaPreference?: (active: boolean, preference: CoryphaPreference) => void
}
const CookieBannerPreferences: React.FC<Props> = (props: Props = {}) => {
  const {
    styles = {},
    necessaryOptionText = 'Necessary',
    preferencesOptionText = 'Preferences',
    statisticsOptionText = 'Statistics',
    marketingOptionText = 'Marketing',
    showPreferencesOption = true,
    showStatisticsOption = true,
    showMarketingOption = true,
    preferencesDefaultChecked = false,
    statisticsDefaultChecked = false,
    marketingDefaultChecked = false,
    onTogglePreferencesCookies = () => undefined,
    onToggleStatisticsCookies = () => undefined,
    onToggleMarketingCookies = () => undefined,
    coryphaPreferences = [],
    onToggleCoryphaPreference = () => undefined,
  } = props;

  const {
    selectPane: selectPaneStyle,
    optionWrapper: optionWrapperStyle,
    optionLabel: optionLabelStyle,
    checkbox: checkboxStyle,
  } = { ...bannerStyle, ...styles };

  const cookieOptionStyle = {
    optionWrapperStyle,
    optionLabelStyle,
    checkboxStyle,
  };

  return (
    <div className="react-cookie-law-select-pane" style={selectPaneStyle}>
      {coryphaPreferences.length > 0 ? (
        <>
          <CookieOption
            id="check-required-cookies"
            text={necessaryOptionText}
            styles={cookieOptionStyle}
            disabled
            checked
          />

          {coryphaPreferences.map((preference) => (
            <CookieOption
              key={preference.id}
              id={preference.id}
              text={preference.name}
              styles={cookieOptionStyle}
              disabled={preference.required}
              checked={preference.required}
              onChange={(value) => onToggleCoryphaPreference(value, preference)}
            />
          ))}
        </>
      ) : (
        <>
          <CookieOption
            id="check-required-cookies"
            text={necessaryOptionText}
            styles={cookieOptionStyle}
            disabled
            checked
          />

          {showPreferencesOption && (
            <CookieOption
              id="check-preferences-cookies"
              text={preferencesOptionText}
              styles={cookieOptionStyle}
              checked={preferencesDefaultChecked}
              onChange={onTogglePreferencesCookies}
            />
          )}

          {showStatisticsOption && (
            <CookieOption
              id="check-statistics-cookies"
              text={statisticsOptionText}
              styles={cookieOptionStyle}
              checked={statisticsDefaultChecked}
              onChange={onToggleStatisticsCookies}
            />
          )}

          {showMarketingOption && (
            <CookieOption
              id="check-marketing-cookies"
              text={marketingOptionText}
              styles={cookieOptionStyle}
              checked={marketingDefaultChecked}
              onChange={onToggleMarketingCookies}
            />
          )}
        </>
      )}
    </div>
  );
};

export default CookieBannerPreferences
