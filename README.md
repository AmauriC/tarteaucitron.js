# tarteaucitron.js — Open-source cookie consent manager

[![jsDelivr downloads](https://data.jsdelivr.com/v1/package/npm/tarteaucitronjs/badge)](https://www.jsdelivr.com/package/npm/tarteaucitronjs)
[![npm version](https://img.shields.io/npm/v/tarteaucitronjs.svg)](https://www.npmjs.com/package/tarteaucitronjs)
[![GitHub contributors](https://img.shields.io/github/contributors/AmauriC/tarteaucitron.js.svg)](https://github.com/AmauriC/tarteaucitron.js/graphs/contributors)
[![Sponsor](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4)](https://tarteaucitron.io/en/thanks-sponsors/)

**Add a cookie consent banner to your website and let visitors control third-party services.**

tarteaucitron.js is a free, open-source JavaScript consent manager created and maintained by [Amauri Champeaux](https://amauri.io/en/), an independent developer based in France.

It provides the consent interface and service controls for your consent management platform (CMP) setup, helping you implement GDPR / RGPD consent requirements on your website.

Use it to manage consent for analytics, advertising, embedded videos, social widgets and other supported third-party services.

[Installation guide](https://tarteaucitron.io/en/free-installation-open-source/) · [Website and Pro service](https://tarteaucitron.io/) · [Support the project](https://tarteaucitron.io/en/thanks-sponsors/)

## Features

- **Cookie consent banner:** offer visitors clear choices to accept, reject or customize their consent.
- **Service-level preferences:** let visitors manage individual services from a dedicated panel.
- **Consent-based loading:** keep configured services requiring consent blocked until permission is granted, with explicit consent enabled.
- **Content placeholders:** display a fallback for supported embedded content while consent is pending or refused.
- **Loading without a page refresh:** load supported services when visitors accept them.
- **Customizable interface:** configure the banner layout, texts, colors and consent options, or fully customize its appearance using CSS.
- **Accessibility options:** adjust the panel's position in the document and provide a way to reopen consent preferences.
- **Consent Mode integrations:** support Google Consent Mode v2, Bing Consent Mode and Piano Analytics Consent Mode.

<img width="1194" height="839" alt="screenshot-3" src="https://github.com/user-attachments/assets/3ad11276-fc39-4349-b0d3-6cb70f943285" />

## Open source or Pro?

### tarteaucitron.js — manual integration

Use this library to host and configure your consent manager yourself.

Initialize tarteaucitron.js, add the services used on your website and adapt their integration so that tarteaucitron can manage their loading.

**Initializing the banner alone does not automatically block scripts already loaded elsewhere on your website.**

[Follow the open-source installation guide](https://tarteaucitron.io/en/free-installation-open-source/).

### tarteaucitron.io Pro — managed service

Choose the Pro service for a simpler integration and additional features:

- Automatic detection of supported third-party services.
- Online configuration dashboard.
- Consent statistics.
- 50+ ready-to-use design themes.
- Dedicated WordPress plugin.
- Unlimited websites and unlimited traffic.
- Hosted in France.

<img width="1206" height="832" alt="screenshot-5" src="https://github.com/user-attachments/assets/fd1bfa4f-b853-49d7-8a5c-6ed68472de44" />


The open-source library remains free. The Pro service is a separate paid offering.

A 7-day free trial is available, with no credit card required and no automatic renewal.

[Explore tarteaucitron.io Pro](https://tarteaucitron.io/en/).

### Design themes — Pro

Choose from 50+ ready-to-use themes directly from the tarteaucitron.io Pro dashboard, without editing CSS.

Each theme customizes the entire consent interface: the cookie banner, consent panel, buttons, service descriptions, cookie list and permanent icon.

The collection covers eight categories:

- Accessibility and readability
- Sports
- Professions and industries
- Nature and landscapes
- Creative and playful
- Minimal and elegant
- Retro and technical
- Events and seasonal designs

<img width="1121" height="689" alt="screenshot-2" src="https://github.com/user-attachments/assets/f4a2ad8e-8db5-47f4-af5a-793fa7ba5d22" />


All themes maintain equal visual prominence for accept and reject buttons.

[Explore and try all themes in the interactive gallery](https://tarteaucitron.io/en/demonstration-tarteaucitron-templates/).

These ready-to-use themes are exclusive to the Pro service. The open-source version retains its existing CSS customization options.

## Consent and configuration

Your website's behavior depends on the services you integrate and the options you enable, including Consent Mode settings.

Test your implementation before consent, after acceptance and after rejection. Check for third-party scripts loaded independently by your website, plugins or tag manager.

tarteaucitron.js provides consent management tools; using it does not, by itself, guarantee that your entire website complies with the GDPR.

## Maintainer and community

Originally created for a personal blog, tarteaucitron.js is maintained by Amauri Champeaux with contributions from the community.

Bug reports, integration improvements, translations and documentation contributions are welcome.

[Meet the developer](https://amauri.io/en/amauri-champeaux/) · [Contributors](https://github.com/AmauriC/tarteaucitron.js/graphs/contributors) · [Sponsors](https://tarteaucitron.io/en/thanks-sponsors/)

# How to use

```html
<script src="/tarteaucitron/tarteaucitron.js"></script>

<script>
tarteaucitron.init({
    "privacyUrl": "", /* Privacy policy url */
    "bodyPosition": "bottom", /* or top to bring it as first element for accessibility */

    "hashtag": "#tarteaucitron", /* Open the panel with this hashtag */
    "cookieName": "tarteaucitron", /* Cookie name */

    "orientation": "middle", /* Banner position (top - bottom - middle - popup) */

    "groupServices": false, /* Group services by category */
    "showDetailsOnClick": true, /* Click to expand the description */
    "serviceDefaultState": "wait", /* Default state (true - wait - false) */

    "showAlertSmall": false, /* Show the small banner on bottom right */
    "showTitleBanner": false, /* Also show the title (middleBarHead) on the top/bottom banners */
    "cookieslist": false, /* Show the cookie list in a mini banner */
    "cookieslistEmbed": false, /* Show the cookie list on the control panel */
    
    "showIcon": true, /* Show cookie icon to manage cookies */
    // "iconSrc": "", /* Optional: URL or base64 encoded image */
    "iconPosition": "BottomRight", /* Position of the icon between BottomRight, BottomLeft, TopRight and TopLeft */

    "adblocker": false, /* Show a Warning if an adblocker is detected */

    "DenyAllCta" : true, /* Show the deny all button */
    "AcceptAllCta" : true, /* Show the accept all button when highPrivacy on */
    "highPrivacy": true, /* HIGHLY RECOMMANDED Disable auto consent */
    "alwaysNeedConsent": false, /* Ask the consent for "Privacy by design" services */
    
    "handleBrowserDNTRequest": false, /* If Do Not Track == 1, disallow all */

    "removeCredit": false, /* Remove credit link */
    "moreInfoLink": true, /* Show more info link */
    "useExternalCss": false, /* If false, the tarteaucitron.css file will be loaded */
    "useExternalJs": false, /* If false, the tarteaucitron.services.js file and lang files will be loaded */

    // "cookieDomain": ".my-multisite-domaine.fr", /* Shared cookie for subdomain website */

    "readmoreLink": "", /* Change the default readmore link pointing to tarteaucitron.io */
    
    "mandatory": true, /* Show a message about mandatory cookies */
    "mandatoryCta": true, /* Show the disabled accept button when mandatory on */
    
    // "customCloserId": "", /* Optional a11y: Custom element ID used to open the panel */

    "googleConsentMode": true, /* Enable Google Consent Mode v2 for Google ads and GA4 */
    "bingConsentMode": true, /* Enable Bing Consent Mode for Clarity and Bing Ads */
    "pianoConsentMode": true, /* Enable Piano Analytics Consent Mode */
    "pianoConsentModeEssential": false, /* Load in Essential mode instead of opt-out by default */
    "piwikConsentMode": true, /* Enable Piwik Consent Mode */
    "softConsentMode": false, /* Soft consent mode (consent is required to load the services) */

    "dataLayer": false, /* Send an event to dataLayer with the services status */
    "serverSide": false, /* Server side only, tags are not loaded client side */
    
    "partnersList": false /* Details the number of partners on the popup and middle banner */
});
</script>
```

# Add a service
[Installation guide](https://tarteaucitron.io/en/free-installation-open-source/)

# Customization

## Create custom service
```js
tarteaucitron.services.mycustomservice = {
  "key": "mycustomservice",
  "type": "ads|analytic|api|comment|other|social|support|video",
  "name": "MyCustomService",
  "needConsent": true,
  "cookies": ['cookie', 'cookie2'],
  "readmoreLink": "/custom_read_more", // If you want to change readmore link
  "js": function () {
    "use strict";
    // When user allow cookie
  },
  "fallback": function () {
    "use strict";
    // when use deny cookie
  }
};
```

## Events

The following events are available:
* (document) `{SERVICE_KEY}_added` for each enabled service
* (document) `{SERVICE_KEY}_loaded` for each enabled service
* (document) `{SERVICE_KEY}_allowed` for each service when allowed
* (document) `{SERVICE_KEY}_disallowed ` for each service when disallowed

* (window) `tac.root_available`: the root element with panel has been created, services will be loaded
* (window) `tac.open_alert`
* (window) `tac.close_alert`
* (window) `tac.open_panel`
* (window) `tac.close_panel`

## Customize text

To change a translation, use `tarteaucitronCustomText` variable. It will be merge with the translation shipping with TAC. This variable must be defined before the initialization. For example:
```js
tarteaucitronCustomText = {
  'support': {
    'title': 'Support client',
  },
  'close': 'Enregistrer et fermer',
};
tarteaucitron.init(...);
```

There is a special case for engagement text. By the default, the engagement text is  _{SERVICE_NAME} is disabled._, however you can change it per service. For example:
```js
tarteaucitronCustomText = {
  'engage-twitter': 'Follow us on Twitter!'
};
```
<!--
# Thanks to the sponsors 😊

| ![Amaury Cleuziou](https://avatars.githubusercontent.com/u/26336203?v=4&s=60) |                                                              |   |
|---|--------------------------------------------------------------|---|
|  [Amaury Cleuziou](https://github.com/MoryCorp) - first sponsor 🎉 |                                                              |  |
| |                                                              |   |
-->

