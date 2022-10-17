import React, { ComponentProps } from 'react';
import slugify from 'slugify';
import { v4 as uuidv4 } from 'uuid';

import Cookies from '../Cookies';
import CookieBannerContent from './CookieBannerContent';
import { CoryphaApiProps, isServer, isUsingCorypha } from '../helpers';
import {
  CoryphaPreference,
  fetchCoryphaPreferences,
  saveCoryphaPreferences,
  checkVersionCoryphaPreferences,
} from '../coryphaAPI';

const CORYPHA_USER = 'rl_corypha_user';
const CONSENT_GIVEN = 'rcl_consent_given';
const PREFERENCES_COOKIE = 'rcl_preferences_consent';
const STATISTICS_COOKIE = 'rcl_statistics_consent';
const MARKETING_COOKIE = 'rcl_marketing_consent';

interface Props extends CoryphaApiProps, ComponentProps<typeof CookieBannerContent> {
  preferencesDefaultChecked?: boolean
  statisticsDefaultChecked?: boolean
  marketingDefaultChecked?: boolean
  dismissOnScroll?: boolean
  onAccept?: () => void
  onAcceptCoryphaPreferences?: (preferences: CoryphaPreference[]) => void
  onAcceptMarketing?: () => void
  onAcceptPreferences?: () => void
  onAcceptStatistics?: () => void
  onDeclineMarketing?: () => void
  onDeclinePreferences?: () => void
  onDeclineStatistics?: () => void
  onDeclineCoryphaPreferences?: (preferences: CoryphaPreference[]) => void
}

interface State {
  preferencesCookies: boolean
  statisticsCookies: boolean
  marketingCookies: boolean
  coryphaPreferences: CoryphaPreference[]
}
class CookieBanner extends React.Component<Props, State> {
  constructor(props: Props) {
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
      coryphaPreferences: [],
    };

    this.onScroll = this.onScroll.bind(this);
    this.onTogglePreferencesCookies = this.onTogglePreferencesCookies.bind(this);
    this.onToggleStatisticsCookies = this.onToggleStatisticsCookies.bind(this);
    this.onToggleMarketingCookies = this.onToggleMarketingCookies.bind(this);
    this.onAcceptAll = this.onAcceptAll.bind(this);
    this.confirm = this.confirm.bind(this);
    this.decline = this.decline.bind(this);
    this.consetsCallback = this.consetsCallback.bind(this);
    this.onToggleCoryphaPreference = this.onToggleCoryphaPreference.bind(this);

    this.cookies = new Cookies(wholeDomain);
  }

  async componentDidMount() {
    const { dismissOnScroll } = this.props;

    if (isUsingCorypha(this.props)) {
      if (this.cookies.get(CONSENT_GIVEN)) {
        const { hasNewVersion, preferences } = await checkVersionCoryphaPreferences(this.props);

        if (hasNewVersion) {
          this.cookies.clear();

          this.setState({ coryphaPreferences: preferences }, () => {
            this.forceUpdate();
          });
        }
      } else {
        const preferences = await fetchCoryphaPreferences(this.props);

        this.setState({
          coryphaPreferences: preferences.map((preference) => ({
            ...preference,
            accepted: preference.required,
          })),
        });
      }
    }

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

  onTogglePreferencesCookies(value?: boolean) {
    this.setState({ preferencesCookies: value });
  }

  onToggleStatisticsCookies(value?: boolean) {
    this.setState({ statisticsCookies: value });
  }

  onToggleMarketingCookies(value?: boolean) {
    this.setState({ marketingCookies: value });
  }

  onToggleCoryphaPreference(value, preference) {
    const { coryphaPreferences = [] } = this.state;
    const newCoryphaPreferences = [...coryphaPreferences];
    const changedPreference = newCoryphaPreferences.find(
      ({ id }) => id === preference.id,
    );

    changedPreference.accepted = value;

    this.setState({ coryphaPreferences: newCoryphaPreferences });
  }

  onAcceptAll() {
    const {
      onAcceptPreferences = () => undefined,
      onAcceptStatistics = () => undefined,
      onAcceptMarketing = () => undefined,
      onAcceptCoryphaPreferences = () => undefined,
      coryphaUserId,
    } = this.props;

    const { coryphaPreferences = [] } = this.state;

    if (isUsingCorypha(this.props)) {
      this.cookies.set(CONSENT_GIVEN);
      this.cookies.set({
        key: CORYPHA_USER,
        value: coryphaUserId || uuidv4(),
      });

      coryphaPreferences.forEach(({ name }) => {
        this.cookies.set(`rl_${slugify(name.toLowerCase(), '_')}_consent`);
      });

      onAcceptCoryphaPreferences(coryphaPreferences);
      saveCoryphaPreferences(
        this.props,
        coryphaPreferences.map((preference) => ({
          id: preference.id,
          accepted: true,
        })),
      );
    } else {
      this.cookies.set(CONSENT_GIVEN);
      this.cookies.set(PREFERENCES_COOKIE);
      this.cookies.set(STATISTICS_COOKIE);
      this.cookies.set(MARKETING_COOKIE);

      onAcceptPreferences();
      onAcceptStatistics();
      onAcceptMarketing();
    }

    this.forceUpdate();
  }

  cookies: Cookies

  confirm() {
    const { coryphaUserId } = this.props;
    const { coryphaPreferences = [] } = this.state;

    if (isUsingCorypha(this.props)) {
      this.cookies.set(CONSENT_GIVEN);
      this.cookies.set({
        key: CORYPHA_USER,
        value: coryphaUserId || uuidv4(),
      });

      coryphaPreferences.forEach(({ name, accepted }) => {
        this.cookies.set({
          key: `rl_${slugify(name.toLowerCase(), '_')}_consent`,
          value: accepted,
        });
      });

      saveCoryphaPreferences(
        this.props,
        coryphaPreferences.map((preference) => ({
          id: preference.id,
          accepted: preference.accepted,
        })),
      );
    } else {
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
    }

    this.forceUpdate();
  }

  decline() {
    const {
      onDeclinePreferences = () => undefined,
      onDeclineStatistics = () => undefined,
      onDeclineMarketing = () => undefined,
      onDeclineCoryphaPreferences = () => undefined,
    } = this.props;

    const { coryphaPreferences = [] } = this.state;

    if (isUsingCorypha(this.props)) {
      this.cookies.set(CONSENT_GIVEN);
      this.cookies.remove(CORYPHA_USER);

      coryphaPreferences.forEach(({ name }) => {
        this.cookies.remove(`rl_${slugify(name.toLowerCase(), '_')}_consent`);
      });

      onDeclineCoryphaPreferences(coryphaPreferences);
    } else {
      this.cookies.set(CONSENT_GIVEN);
      this.cookies.remove(PREFERENCES_COOKIE);
      this.cookies.remove(STATISTICS_COOKIE);
      this.cookies.remove(MARKETING_COOKIE);

      onDeclinePreferences();
      onDeclineStatistics();
      onDeclineMarketing();
    }

    this.forceUpdate();
  }

  consetsCallback() {
    const {
      onAccept = () => undefined,
      onAcceptPreferences = () => undefined,
      onAcceptStatistics = () => undefined,
      onAcceptMarketing = () => undefined,
      onDeclinePreferences = () => undefined,
      onDeclineStatistics = () => undefined,
      onDeclineMarketing = () => undefined,
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

    const { coryphaPreferences = [] } = this.state;

    if (this.cookies.get(CONSENT_GIVEN)) {
      this.consetsCallback();
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
      coryphaPreferences,
      onToggleCoryphaPreference: this.onToggleCoryphaPreference,
    };

    return <CookieBannerContent {...contentProps} />;
  }
}

export default CookieBanner;
