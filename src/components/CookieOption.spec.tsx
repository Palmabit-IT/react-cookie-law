import React from 'react';
import { mount, shallow } from 'enzyme';
import CookieOption from './CookieOption';

describe('CookieOption component', () => {
  test('should be rendered', () => {
    const props = {
      id: 'check-required-cookies',
      text: 'Necessary',
      disabled: false,
      checked: false,
    };

    const component = shallow(
      <CookieOption {...props} />,
    );

    expect(component).toMatchSnapshot();
  });

  test('should be rendered with elements', () => {
    const props = {
      id: 'check-cookies',
      text: 'Custom label text',
      disabled: false,
      checked: false,
    };

    const component = mount(
      <CookieOption {...props} />,
    );

    expect(component.find('input').prop('id')).toBe('check-cookies');
    expect(component.find('.react-cookie-law-option-checkbox').props().disabled).toBeFalsy();
    expect(component.find('.react-cookie-law-option-checkbox').props().checked).toBeFalsy();
    expect(component.find('label').text()).toBe('Custom label text');
  });

  test('should be rendered checked element', () => {
    const props = {
      id: 'check-cookies',
      text: 'Custom label text',
      disabled: true,
      checked: true,
    };

    const component = mount(
      <CookieOption {...props} />,
    );

    expect(component.find('.react-cookie-law-option-checkbox').props().disabled).toBeTruthy();
    expect(component.find('.react-cookie-law-option-checkbox').props().checked).toBeTruthy();
  });

  test('should call onChange callback', () => {
    const props = {
      onChange: jest.fn(),
    };

    const component = mount<CookieOption>(
      <CookieOption {...props} />,
    );

    component.find('.react-cookie-law-option-checkbox').simulate('change');

    expect(props.onChange).toHaveBeenCalledTimes(1);
    expect(component.instance().state.checked).toBeTruthy();
  });
});
