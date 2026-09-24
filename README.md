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

<br>

> [!TIP]
> 🍋 **A little slice to keep the project going?**
>
> If tarteaucitron makes your life easier, help me keep it growing.
>
> **[Give a slice of lemon tart →](https://tarteaucitron.io/en/thanks-sponsors/)**  
> From €5 · No subscription

<br>

## Features

- **Cookie consent banner:** offer visitors clear choices to accept, reject or customize their consent.
- **Service-level preferences:** let visitors manage individual services from a dedicated panel.
- **Consent-based loading:** keep configured services requiring consent blocked until permission is granted, with explicit consent enabled.
- **Content placeholders:** display a fallback for supported embedded content while consent is pending or refused.
- **Loading without a page refresh:** load supported services when visitors accept them.
- **Customizable interface:** configure the banner layout, texts, colors and consent options.
- **Accessibility options:** adjust the panel's position in the document and provide a way to reopen consent preferences.
- **Consent Mode integrations:** support Google Consent Mode v2, Bing Consent Mode and Piano Analytics Consent Mode.

## Open source or Pro?

### tarteaucitron.js — manual integration

Use this library to host and configure your consent manager yourself.

Initialize tarteaucitron.js, add the services used on your website and adapt their integration so that tarteaucitron can manage their loading.

**Initializing the banner alone does not automatically block scripts already loaded elsewhere on your website.**

[Follow the open-source installation guide](https://tarteaucitron.io/en/free-installation-open-source/).

### tarteaucitron.io Pro — managed service

Choose the Pro service for automatic detection of supported services, an online configuration dashboard and consent statistics.

The open-source library remains free. The Pro service is a separate paid offering.

[Explore tarteaucitron.io Pro](https://tarteaucitron.io/).

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

