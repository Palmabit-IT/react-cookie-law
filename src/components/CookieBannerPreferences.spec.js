import React from 'react';
import { mount, shallow } from 'enzyme';
import CookieBannerPreferences from './CookieBannerPreferences';
import CookieOption from './CookieOption';
import bannerStyle from './bannerStyle';

describe('CookieBannerPreferences component', () => {
  test('should be rendered', () => {
    const component = shallow(
      <CookieBannerPreferences />,
    );

    expect(component).toMatchSnapshot();
  });

  test('should be rendered with elements', () => {
    const props = {
      styles: {},
      necessaryOptionText: 'Necessary',
      preferencesOptionText: 'Preferences',
      statisticsOptionText: 'Statistics',
      marketingOptionText: 'Marketing',
      showPreferencesOption: true,
      showStatisticsOption: true,
      showMarketingOption: true,
      preferencesDefaultChecked: false,
      statisticsDefaultChecked: false,
      marketingDefaultChecked: false,
      onTogglePreferencesCookies: Function,
      onToggleStatisticsCookies: Function,
      onToggleMarketingCookies: Function,
    };

    const component = mount(
      <CookieBannerPreferences {...props} />,
    );

    const cookieOptionStyle = {
      optionWrapperStyle: bannerStyle.optionWrapper,
      optionLabelStyle: bannerStyle.optionLabel,
      checkboxStyle: bannerStyle.checkbox,
    };

    expect(component.contains(<CookieOption id="check-required-cookies" text="Necessary" disabled checked styles={cookieOptionStyle} />)).toBeTruthy();
    expect(component.contains(<CookieOption id="check-preferences-cookies" text="Preferences" checked={false} onChange={Function} styles={cookieOptionStyle} />)).toBeTruthy();
    expect(component.contains(<CookieOption id="check-statistics-cookies" text="Statistics" checked={false} onChange={Function} styles={cookieOptionStyle} />)).toBeTruthy();
    expect(component.contains(<CookieOption id="check-marketing-cookies" text="Marketing" checked={false} onChange={Function} styles={cookieOptionStyle} />)).toBeTruthy();
  });

  test('should hide preferences checkbox', () => {
    const props = {
      onDecline: jest.fn(),
      showPreferencesOption: false,
    };

    const component = mount(
      <CookieBannerPreferences {...props} />,
    );

    expect(component.find('#check-preferences-cookies').exists()).toBeFalsy();
  });

  test('should hide statistics checkbox', () => {
    const props = {
      onDecline: jest.fn(),
      showStatisticsOption: false,
    };

    const component = mount(
      <CookieBannerPreferences {...props} />,
    );

    expect(component.find('#check-statistics-cookies').exists()).toBeFalsy();
  });

  test('should hide marketing checkbox', () => {
    const props = {
      onDecline: jest.fn(),
      showMarketingOption: false,
    };

    const component = mount(
      <CookieBannerPreferences {...props} />,
    );

    expect(component.find('#check-marketing-cookies').exists()).toBeFalsy();
  });

  test('should show all checkboxes as default', () => {
    const props = {
      onDecline: jest.fn(),
    };

    const component = mount(
      <CookieBannerPreferences {...props} />,
    );

    expect(component.find('#check-preferences-cookies').exists()).toBeTruthy();
    expect(component.find('#check-statistics-cookies').exists()).toBeTruthy();
    expect(component.find('#check-marketing-cookies').exists()).toBeTruthy();
  });
});
