[![](https://data.jsdelivr.com/v1/package/gh/AmauriC/tarteaucitron.js/badge)](https://www.jsdelivr.com/package/gh/AmauriC/tarteaucitron.js)
[![npm](https://img.shields.io/npm/v/tarteaucitronjs.svg)](https://www.npmjs.com/package/tarteaucitronjs) [![GitHub contributors](https://img.shields.io/github/contributors/AmauriC/tarteaucitron.js.svg)](https://github.com/AmauriC/tarteaucitron.js/graphs/contributors) [![Sponsor](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub)](https://github.com/sponsors/AmauriC)

tarteaucitron.js
================
Comply to the european cookie law is simple with the french *tarte au citron*.

# What is this script?
The european cookie law regulates the management of cookies and you should ask your visitors their consent before exposing them to third party services.

Clearly this script will:
- Disable all services by default,
- Display a banner on the first page view and a small one on other pages,
- Display a panel to allow or deny each services one by one,
- Activate services on the second page view if not denied,
- Store the consent in a cookie for 365 days.

Bonus:
- Load service when user click on Allow (without reload of the page),
- Incorporate a fallback system (display a link instead of social button and a static banner instead of advertising).


# Installation guide
[Visit tarteaucitron.io](https://tarteaucitron.io/)


# How to use

```html
<script src="/tarteaucitron/tarteaucitron.js"></script>

<script>
tarteaucitron.init({
    "privacyUrl": "", /* Privacy policy url */

    "hashtag": "#tarteaucitron", /* Open the panel with this hashtag */
    "cookieName": "tarteaucitron", /* Cookie name */

    "orientation": "middle", /* Banner position (top - bottom - middle - popup) */

    "groupServices": false, /* Group services by category */

    "showAlertSmall": false, /* Show the small banner on bottom right */
    "cookieslist": false, /* Show the cookie list */
    
    "showIcon": true, /* Show cookie icon to manage cookies */
    // "iconSrc": "", /* Optionnal: URL or base64 encoded image */
    "iconPosition": "BottomRight", /* Position of the icon between BottomRight, BottomLeft, TopRight and TopLeft */

    "adblocker": false, /* Show a Warning if an adblocker is detected */

    "DenyAllCta" : true, /* Show the deny all button */
    "AcceptAllCta" : true, /* Show the accept all button when highPrivacy on */
    "highPrivacy": true, /* HIGHLY RECOMMANDED Disable auto consent */

    "handleBrowserDNTRequest": false, /* If Do Not Track == 1, disallow all */

    "removeCredit": false, /* Remove credit link */
    "moreInfoLink": true, /* Show more info link */
    "useExternalCss": false, /* If false, the tarteaucitron.css file will be loaded */

    //"cookieDomain": ".my-multisite-domaine.fr", /* Shared cookie for subdomain website */

    "readmoreLink": "", /* Change the default readmore link pointing to tarteaucitron.io */
    
    "mandatory": true /* Show a message about mandatory cookies */
});
</script>
```

# Create custom service
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

## Thanks to the sponsors 😊

| Be the first sponsor! |
|:---:|
