import React from 'react';
import { mount, shallow } from 'enzyme';
import CookieBannerContent from './CookieBannerContent';
import CookieBannerPreferences from './CookieBannerPreferences';
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
      acceptButtonText: 'Accept all',
      managePreferencesButtonText: 'Mange my cookies',
      savePreferencesButtonText: 'Save and close',
    };

    const component = mount(
      <CookieBannerContent {...props} />,
    );

    expect(component.find('.react-cookie-law-msg').text()).toBe('Custom text');
    expect(component.find('a.react-cookie-law-policy').prop('href')).toBe('/url-to-policy');
    expect(component.find('.react-cookie-law-policy').text()).toBe('Privacy Policy');
    expect(component.contains(<CookieBannerPreferences {...props} />)).toBeFalsy();
  });

  test('should click manage preferences button', () => {
    const props = {
      onConfirm: jest.fn(),
    };

    const component = mount(
      <CookieBannerContent {...props} />,
    );

    component.find('.react-cookie-law-manage-btn').simulate('click');

    expect(component.contains(<CookieBannerPreferences {...props} />)).toBeTruthy();
  });

  test('should click confirm button', () => {
    const props = {
      onAcceptAll: jest.fn(),
    };

    const component = mount(
      <CookieBannerContent {...props} />,
    );

    component.find('.react-cookie-law-accept-btn').simulate('click');

    expect(props.onAcceptAll).toHaveBeenCalledTimes(1);
  });
});
