import React from 'react';
import bannerStyle from './bannerStyle';
import CookieBannerPreferences from './CookieBannerPreferences';

interface Props extends React.ComponentProps<typeof CookieBannerPreferences> {
  acceptButtonText?: string
  className?: string
  // Not used to-date.
  declineButtonText?: string
  managePreferencesButtonText?: string
  message?: string
  onAcceptAll?: () => void
  // Not used to-date.
  onDecline?: () => void
  onConfirm?: () => void
  policyLink?: string
  privacyPolicyLinkText?: string
  savePreferencesButtonText?: string
  // Not used to-date.
  showDeclineButton?: boolean
}

interface State {
  showPreferences?: boolean
}
class CookieBannerContent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { showPreferences: false };
  }

  render() {
    const {
      acceptButtonText = 'Accept all',
      className = '',
      managePreferencesButtonText = 'Mange my cookies',
      message = 'No text',
      onAcceptAll = () => undefined,
      onConfirm = () => undefined,
      policyLink = '/#',
      privacyPolicyLinkText = 'Privacy Policy',
      savePreferencesButtonText = 'Save and close',
      ...preferenceProps
    } = this.props;

    const { showPreferences } = this.state;

    const {
      dialog: dialogStyle,
      container: containerStyle,
      message: messageStyle,
      policy: policyStyle,
      buttonWrapper: buttonWrapperStyle,
      button: buttonStyle,
    } = { ...bannerStyle, ...preferenceProps.styles };

    return (
      <div
        className={`react-cookie-law-dialog ${className}`}
        style={dialogStyle}
      >
        <div className="react-cookie-law-container" style={containerStyle}>
          <div className="react-cookie-law-msg" style={messageStyle}>
            {message}
          </div>

          {showPreferences && <CookieBannerPreferences {...preferenceProps} />}

          <a
            href={policyLink}
            className="react-cookie-law-policy"
            style={policyStyle}
          >
            {privacyPolicyLinkText}
          </a>

          <div
            className="react-cookie-law-button-wrapper"
            style={buttonWrapperStyle}
          >
            {showPreferences ? (
              <button
                type="button"
                className="react-cookie-law-save-btn"
                style={buttonStyle}
                onClick={() => onConfirm()}
              >
                <span>{savePreferencesButtonText}</span>
              </button>
            ) : (
              <button
                type="button"
                className="react-cookie-law-manage-btn"
                style={buttonStyle}
                onClick={() => this.setState({ showPreferences: true })}
              >
                <span>{managePreferencesButtonText}</span>
              </button>
            )}
            <button
              type="button"
              className="react-cookie-law-accept-btn"
              style={buttonStyle}
              onClick={() => onAcceptAll()}
            >
              <span>{acceptButtonText}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CookieBannerContent;
