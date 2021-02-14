import React from 'react';
import CookieOption from './CookieOption';
import bannerStyle from './bannerStyle';

export default (props = {}) => {
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
    onTogglePreferencesCookies = Function,
    onToggleStatisticsCookies = Function,
    onToggleMarketingCookies = Function,
  } = props;

  const {
    selectPane: selectPaneStyle,
    optionWrapper: optionWrapperStyle,
    optionLabel: optionLabelStyle,
    checkbox: checkboxStyle,
  } = { ...bannerStyle, ...styles };

  const cookieOptionStyle = { optionWrapperStyle, optionLabelStyle, checkboxStyle };

  return (
    <div className="react-cookie-law-select-pane" style={selectPaneStyle}>
      <CookieOption
        id="check-required-cookies"
        text={necessaryOptionText}
        styles={cookieOptionStyle}
        disabled
        checked
      />

      {
        showPreferencesOption && (
          <CookieOption
            id="check-preferences-cookies"
            text={preferencesOptionText}
            styles={cookieOptionStyle}
            defaultChecked={preferencesDefaultChecked}
            onChange={onTogglePreferencesCookies}
          />
        )
      }

      {
        showStatisticsOption && (
          <CookieOption
            id="check-statistics-cookies"
            text={statisticsOptionText}
            styles={cookieOptionStyle}
            defaultChecked={statisticsDefaultChecked}
            onChange={onToggleStatisticsCookies}
          />
        )
      }

      {
        showMarketingOption && (
          <CookieOption
            id="check-marketing-cookies"
            text={marketingOptionText}
            styles={cookieOptionStyle}
            defaultChecked={marketingDefaultChecked}
            onChange={onToggleMarketingCookies}
          />
        )
      }
    </div>
  );
};
