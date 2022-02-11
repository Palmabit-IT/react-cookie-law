import React from 'react';
import PropTypes from 'prop-types';
import Cookies from '../Cookies';
import CookieBannerContent from './CookieBannerContent';
import { isServer } from '../helpers';

const CONSENT_GIVEN = 'rcl_consent_given';
const PREFERENCES_COOKIE = 'rcl_preferences_consent';
const STATISTICS_COOKIE = 'rcl_statistics_consent';
const MARKETING_COOKIE = 'rcl_marketing_consent';

class CookieBanner extends React.Component {
  constructor(props) {
    super(props);

    const {
      preferencesDefaultChecked = false,
      statisticsDefaultChecked = false,
      marketingDefaultChecked = false,
      wholeDomain = false,
    } = this.props;

    this.state = {
      preferencesCookies: preferencesDefaultChecked,
      statisticsCookies: statisticsDefaultChecked,
      marketingCookies: marketingDefaultChecked,
    };

    this.onScroll = this.onScroll.bind(this);
    this.onTogglePreferencesCookies = this.onTogglePreferencesCookies.bind(this);
    this.onToggleStatisticsCookies = this.onToggleStatisticsCookies.bind(this);
    this.onToggleMarketingCookies = this.onToggleMarketingCookies.bind(this);
    this.onAcceptAll = this.onAcceptAll.bind(this);
    this.confirm = this.confirm.bind(this);
    this.decline = this.decline.bind(this);
    this.consetsCallback = this.consetsCallback.bind(this);

    this.cookies = new Cookies(wholeDomain);
  }

  componentDidMount() {
    const { dismissOnScroll } = this.props;

    if (isServer() || dismissOnScroll !== true) {
      return;
    }

    if (window.addEventListener) {
      window.addEventListener('scroll', this.onScroll);
    } else if (window.attachEvent) {
      window.attachEvent('onscroll', this.onScroll); // < IE9
    }
  }

  componentWillUnmount() {
    if (isServer()) {
      return;
    }

    if (window.removeEventListener) {
      window.removeEventListener('scroll', this.onScroll);
    } else if (window.detachEvent) {
      window.detachEvent('onscroll', this.onScroll); // < IE9
    }
  }

  onScroll() {
    this.confirm();
  }

  onTogglePreferencesCookies(value) {
    this.setState({ preferencesCookies: value });
  }

  onToggleStatisticsCookies(value) {
    this.setState({ statisticsCookies: value });
  }

  onToggleMarketingCookies(value) {
    this.setState({ marketingCookies: value });
  }

  onAcceptAll() {
    this.cookies.set(CONSENT_GIVEN);
    this.cookies.set(PREFERENCES_COOKIE);
    this.cookies.set(STATISTICS_COOKIE);
    this.cookies.set(MARKETING_COOKIE);

    this.consetsCallback();

    this.forceUpdate();
  }

  confirm() {
    const { preferencesCookies, statisticsCookies, marketingCookies } = this.state;

    this.cookies.set(CONSENT_GIVEN);

    if (preferencesCookies) {
      this.cookies.set(PREFERENCES_COOKIE);
    } else {
      this.cookies.remove(PREFERENCES_COOKIE);
    }

    if (statisticsCookies) {
      this.cookies.set(STATISTICS_COOKIE);
    } else {
      this.cookies.remove(STATISTICS_COOKIE);
    }

    if (marketingCookies) {
      this.cookies.set(MARKETING_COOKIE);
    } else {
      this.cookies.remove(MARKETING_COOKIE);
    }

    this.consetsCallback();

    this.forceUpdate();
  }

  decline() {
    const {
      onDeclinePreferences = () => {},
      onDeclineStatistics = () => {},
      onDeclineMarketing = () => {},
    } = this.props;

    this.cookies.set(CONSENT_GIVEN);
    this.cookies.remove(PREFERENCES_COOKIE);
    this.cookies.remove(STATISTICS_COOKIE);
    this.cookies.remove(MARKETING_COOKIE);

    onDeclinePreferences();
    onDeclineStatistics();
    onDeclineMarketing();

    this.forceUpdate();
  }

  consetsCallback() {
    const {
      onAccept = () => {},
      onAcceptPreferences = () => {},
      onAcceptStatistics = () => {},
      onAcceptMarketing = () => {},
      onDeclinePreferences = () => {},
      onDeclineStatistics = () => {},
      onDeclineMarketing = () => {},
    } = this.props;

    const hasPreferencesCookie = this.cookies.get(PREFERENCES_COOKIE);
    const hasStatisticsCookie = this.cookies.get(STATISTICS_COOKIE);
    const hasMarketingCookie = this.cookies.get(MARKETING_COOKIE);

    onAccept();

    if (hasPreferencesCookie) {
      onAcceptPreferences();
    } else {
      onDeclinePreferences();
    }

    if (hasStatisticsCookie) {
      onAcceptStatistics();
    } else {
      onDeclineStatistics();
    }

    if (hasMarketingCookie) {
      onAcceptMarketing();
    } else {
      onDeclineMarketing();
    }
  }

  render() {
    const {
      styles,
      className,
      message,
      policyLink,
      privacyPolicyLinkText,
      necessaryOptionText,
      preferencesOptionText,
      statisticsOptionText,
      marketingOptionText,
      showDeclineButton,
      acceptButtonText,
      declineButtonText,
      managePreferencesButtonText,
      savePreferencesButtonText,
      showPreferencesOption,
      showStatisticsOption,
      showMarketingOption,
      preferencesDefaultChecked,
      statisticsDefaultChecked,
      marketingDefaultChecked,
    } = this.props;

    if (this.cookies.get(CONSENT_GIVEN)) {
      return null;
    }

    const contentProps = {
      styles,
      className,
      message,
      policyLink,
      privacyPolicyLinkText,
      necessaryOptionText,
      preferencesOptionText,
      statisticsOptionText,
      marketingOptionText,
      showDeclineButton,
      acceptButtonText,
      declineButtonText,
      managePreferencesButtonText,
      savePreferencesButtonText,
      showPreferencesOption,
      showStatisticsOption,
      showMarketingOption,
      preferencesDefaultChecked,
      statisticsDefaultChecked,
      marketingDefaultChecked,
      onTogglePreferencesCookies: this.onTogglePreferencesCookies,
      onToggleStatisticsCookies: this.onToggleStatisticsCookies,
      onToggleMarketingCookies: this.onToggleMarketingCookies,
      onDecline: this.decline,
      onConfirm: this.confirm,
      onAcceptAll: this.onAcceptAll,
    };

    return (<CookieBannerContent {...contentProps} />);
  }
}

CookieBanner.protoTypes = {
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
  managePreferencesButtonText: PropTypes.string,
  savePreferencesButtonText: PropTypes.string,
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

export default CookieBanner;
