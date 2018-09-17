import React from 'react';
import { mount, shallow } from 'enzyme';
import CookieBannerContent from './CookieBannerContent';
import CookieOption from './CookieOption';
import bannerStyle from './bannerStyle';

describe('CookieBannerContent component', () => {
  test('should be rendered', () => {
    const component = shallow(
      <CookieBannerContent message="Custom text" />,
    );

    expect(component).toMatchSnapshot();
  });

  test('should be rendered with elements', () => {
    const props = {
      styles: bannerStyle,
      message: 'Custom text',
      policyLink: '/url-to-policy',
      privacyPolicyLinkText: 'Privacy Policy',
      necessaryOptionText: 'Necessary',
      preferencesOptionText: 'Preferences',
      statisticsOptionText: 'Statistics',
      marketingOptionText: 'Marketing',
      acceptButtonText: 'Accept',
      declineButtonText: 'Decline',
    };

    const component = mount(
      <CookieBannerContent {...props} />,
    );

    const cookieOptionStyle = {
      optionWrapperStyle: bannerStyle.optionWrapper,
      optionLabelStyle: bannerStyle.optionLabel,
      checkboxStyle: bannerStyle.checkbox,
    };

    expect(component.find('.react-cookie-law-msg').text()).toBe('Custom text');
    expect(component.find('a.react-cookie-law-policy').prop('href')).toBe('/url-to-policy');
    expect(component.find('.react-cookie-law-policy').text()).toBe('Privacy Policy');
    expect(component.contains(<CookieOption id="check-required-cookies" text="Necessary" disabled checked styles={cookieOptionStyle} />)).toBeTruthy();
    expect(component.contains(<CookieOption id="check-preferences-cookies" text="Preferences" onChange={Function} checked styles={cookieOptionStyle} />)).toBeTruthy();
    expect(component.contains(<CookieOption id="check-statistics-cookies" text="Statistics" onChange={Function} checked styles={cookieOptionStyle} />)).toBeTruthy();
    expect(component.contains(<CookieOption id="check-marketing-cookies" text="Marketing" onChange={Function} styles={cookieOptionStyle} />)).toBeTruthy();
  });

  test('should click confirm button', () => {
    const props = {
      onConfirm: jest.fn(),
    };

    const component = mount(
      <CookieBannerContent {...props} />,
    );

    component.find('.react-cookie-law-accept-btn').simulate('click');

    expect(props.onConfirm).toHaveBeenCalledTimes(1);
  });

  test('should click decline button', () => {
    const props = {
      onDecline: jest.fn(),
      showDeclineButton: true,
    };

    const component = mount(
      <CookieBannerContent {...props} />,
    );

    component.find('.react-cookie-law-decline-btn').simulate('click');

    expect(props.onDecline).toHaveBeenCalledTimes(1);
  });

  test('should hide preferences checkbox', () => {
    const props = {
      onDecline: jest.fn(),
      showPreferencesOption: false,
    };

    const component = mount(
      <CookieBannerContent {...props} />,
    );

    expect(component.find('#check-preferences-cookies').exists()).toBeFalsy();
  });

  test('should hide statistics checkbox', () => {
    const props = {
      onDecline: jest.fn(),
      showStatisticsOption: false,
    };

    const component = mount(
      <CookieBannerContent {...props} />,
    );

    expect(component.find('#check-statistics-cookies').exists()).toBeFalsy();
  });

  test('should hide marketing checkbox', () => {
    const props = {
      onDecline: jest.fn(),
      showMarketingOption: false,
    };

    const component = mount(
      <CookieBannerContent {...props} />,
    );

    expect(component.find('#check-marketing-cookies').exists()).toBeFalsy();
  });

  test('should show all checkboxes as default', () => {
    const props = {
      onDecline: jest.fn(),
    };

    const component = mount(
      <CookieBannerContent {...props} />,
    );

    expect(component.find('#check-preferences-cookies').exists()).toBeTruthy();
    expect(component.find('#check-statistics-cookies').exists()).toBeTruthy();
    expect(component.find('#check-marketing-cookies').exists()).toBeTruthy();
  });
});
