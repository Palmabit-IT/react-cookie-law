# React Cookie Law

[![npm version](https://badge.fury.io/js/%40palmabit%2Freact-cookie-law.svg)](https://badge.fury.io/js/%40palmabit%2Freact-cookie-law) [![Build Status](https://travis-ci.org/Palmabit-IT/react-cookie-law.svg?branch=master)](https://travis-ci.org/Palmabit-IT/react-cookie-law) [![Coverage Status](https://coveralls.io/repos/github/Palmabit-IT/react-cookie-law/badge.svg?branch=master)](https://coveralls.io/github/Palmabit-IT/react-cookie-law?branch=master)

A React Cookie Banner component GDPR compliance.

![Preview](https://raw.githubusercontent.com/Palmabit-IT/react-cookie-law/master/banner_preview.png)

## Install

```
yarn add @palmabit/react-cookie-law
```

or

```
npm install --save @palmabit/react-cookie-law
```

## Usage

```js
import { CookieBanner } from "@palmabit/react-cookie-law";

React.renderComponent(
  <div>
    <CookieBanner
      message="Cookie banner message"
      wholeDomain={true}
      onAccept={() => {}}
      onAcceptPreferences={() => {}}
      onAcceptStatistics={() => {}}
      onAcceptMarketing={() => {}}
    />
  </div>,
  document.body
);
```

### Options

| Name                            | Type     | Default          | Description                                                                 |
| ------------------------------- | -------- | ---------------- | --------------------------------------------------------------------------- |
| **className**                   | string   |                  | **optional**. Classes                                                       |
| **message**                     | string   |                  | **Required**. Custom text of the banner                                     |
| **wholeDomain**                 | bool     | false            | _optional_. Enable or disable the root path '/' option when a cookie is set |
| **policyLink**                  | string   | "/#"             | _optional_. Link to privacy policy page                                     |
| **privacyPolicyLinkText**       | string   | "Privacy Policy" | _optional_. Text for the privacy policy link                                |
| **necessaryOptionText**         | string   | "Necessary"      | _optional_. Text for the _necessary_ cookies checkbox                       |
| **preferencesOptionText**       | string   | "Preferences"    | _optional_. Text for the _preferences_ cookies checkbox                     |
| **statisticsOptionText**        | string   | "Statistics"     | _optional_. Text for the _statistics_ cookies checkbox                      |
| **marketingOptionText**         | string   | "Marketing"      | _optional_. Text for the _marketing_ cookies checkbox                       |
| **acceptButtonText**            | string   | "Accept"         | _optional_. Text for the _accept_ button                                    |
| **declineButtonText**           | string   | "Decline"        | _optional_. Text for the _decline_ button                                   |
| **managePreferencesButtonText** | string   | "Decline"        | _optional_. Text for the _manage preferences_ button                        |
| **savePreferencesButtonText**   | string   | "Decline"        | _optional_. Text for the save and close\* button                            |
| **showDeclineButton**           | bool     | false            | _optional_. Show or hide the _decline_ button                               |
| **dismissOnScroll**             | bool     | false            | _optional_. Enable or disable the dismissing on scroll of the banner        |
| **showPreferencesOption**       | bool     | true             | _optional_. Show or hide the _preferences_ checkbox                         |
| **showStatisticsOption**        | bool     | true             | _optional_. Show or hide the _statistics_ checkbox                          |
| **showMarketingOption**         | bool     | true             | _optional_. Show or hide the _marketing_ checkbox                           |
| **preferencesDefaultChecked**   | bool     | true             | _optional_. Check the _preferences_ checkbox as default                     |
| **statisticsDefaultChecked**    | bool     | true             | _optional_. Check the _statistics_ checkbox as default                      |
| **marketingDefaultChecked**     | bool     | true             | _optional_. Check the _marketing_ checkbox as default                       |
| **onAccept**                    | function | Function         | _optional_. Callback called when the consent is given                       |
| **onAcceptPreferences**         | function | Function         | _optional_. Callback called if _preferences_ cookies is accepted            |
| **onAcceptStatistics**          | function | Function         | _optional_. Callback called if _statistics_ cookies is accepted             |
| **onAcceptMarketing**           | function | Function         | _optional_. Callback called if _marketing_ cookies is accepted              |
| **onDeclinePreferences**        | function | Function         | _optional_. Callback called if _preferences_ cookies is declined            |
| **onDeclineStatistics**         | function | Function         | _optional_. Callback called if _statistics_ cookies is declined             |
| **onDeclineMarketing**          | function | Function         | _optional_. Callback called if _marketing_ cookies is declined              |
| **cookieOptions**               | function | {}               | _optional_. options that are passed to set cookies                          |

#### Cookie Options

| Name         | Type | Default | Description                                   |
| ------------ | ---- | ------- | --------------------------------------------- |
| **sameSite** | bool |         | _optional_. Strict or Lax enforcement         |
| **secure**   | bool |         | _optional_. Is only accessible through HTTPS? |

## Style

```js
<CookieBanner
  message="Cookie banner message"
  styles={{
    dialog: { backgroundColor: "red" },
  }}
/>
```

| Style option      | Description                                                                  |
| ----------------- | ---------------------------------------------------------------------------- |
| **dialog**        | Style that override `.react-cookie-law-dialog` class                         |
| **container**     | `.react-cookie-law-container` class                                          |
| **message**       | Style for banner text (`.react-cookie-law-message` class)                    |
| **policy**        | Style for cookie policy link (`.react-cookie-law-policy` class)              |
| **selectPane**    | Style for select pane (`.react-cookie-law-select-pane` class)                |
| **optionWrapper** | Style for option checkbox wrapper (`.react-cookie-law-option-wrapper` class) |
| **optionLabel**   | Style for the text of checkbox labels                                        |
| **checkbox**      | Style for checkboxes (`.react-cookie-law-option-checkbox` class)             |
| **buttonWrapper** | Style for buttons wrapper (`.react-cookie-law-dialog` class)                 |
| **button**        | Style for buttons (`.react-cookie-law-dialog` class)                         |

## Test

```
yarn test
```

or

```
npm test
```

# Author

[Palmabit](https://www.palmabit.com)

# Licence

[See the MIT License](http://opensource.org/licenses/MIT)
