import React, { useState } from 'react';
import bannerStyle from './bannerStyle';
import CookieBannerPreferences from './CookieBannerPreferences';

export default (props = {}) => {
  const [showPreferences, setPreferences] = useState(false);

  const {
    styles = {},
    className = '',
    message = 'No text',
    policyLink = '/#',
    privacyPolicyLinkText = 'Privacy Policy',
    acceptButtonText = 'Accept all',
    managePreferencesButtonText = 'Mange my cookies',
    savePreferencesButtonText = 'Save and close',
    onConfirm = Function,
    onAcceptAll = Function,
  } = props;

  const {
    dialog: dialogStyle,
    container: containerStyle,
    message: messageStyle,
    policy: policyStyle,
    buttonWrapper: buttonWrapperStyle,
    button: buttonStyle,
  } = { ...bannerStyle, ...styles };

  return (
    <div className={`react-cookie-law-dialog ${className}`} style={dialogStyle}>
      <div className="react-cookie-law-container" style={containerStyle}>
        <div className="react-cookie-law-msg" style={messageStyle}>{message}</div>

        {
          showPreferences && (<CookieBannerPreferences {...props} />)
        }

        <a href={policyLink} className="react-cookie-law-policy" style={policyStyle}>{privacyPolicyLinkText}</a>

        <div className="react-cookie-law-button-wrapper" style={buttonWrapperStyle}>
          {
            showPreferences
              ?
              <button type="button" className="react-cookie-law-save-btn" style={buttonStyle} onClick={() => onConfirm()}>
                <span>{savePreferencesButtonText}</span>
              </button>
              :
              <button type="button" className="react-cookie-law-manage-btn" style={buttonStyle} onClick={() => setPreferences(true)}>
                <span>{managePreferencesButtonText}</span>
              </button>
          }

          <button type="button" className="react-cookie-law-accept-btn" style={buttonStyle} onClick={() => onAcceptAll()}>
            <span>{acceptButtonText}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
