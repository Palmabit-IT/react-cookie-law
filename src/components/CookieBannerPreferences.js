import React from "react";
import CookieOption from "./CookieOption";
import bannerStyle from "./bannerStyle";

export default (props = {}) => {
  const {
    styles = {},
    necessaryOptionText = "Necessary",
    preferencesOptionText = "Preferences",
    statisticsOptionText = "Statistics",
    marketingOptionText = "Marketing",
    showPreferencesOption = true,
    showStatisticsOption = true,
    showMarketingOption = true,
    preferencesDefaultChecked = false,
    statisticsDefaultChecked = false,
    marketingDefaultChecked = false,
    onTogglePreferencesCookies = () => {},
    onToggleStatisticsCookies = () => {},
    onToggleMarketingCookies = () => {},
    coryphaPreferences = [],
    onToggleCoryphaPreference = () => {},
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
        <React.Fragment>
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
        </React.Fragment>
      ) : (
        <React.Fragment>
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
        </React.Fragment>
      )}
    </div>
  );
};
