[![](https://data.jsdelivr.com/v1/package/gh/AmauriC/tarteaucitron.js/badge)](https://www.jsdelivr.com/package/gh/AmauriC/tarteaucitron.js)
[![npm](https://img.shields.io/npm/v/tarteaucitronjs.svg)](https://www.npmjs.com/package/tarteaucitronjs) [![GitHub contributors](https://img.shields.io/github/contributors/AmauriC/tarteaucitron.js.svg)](https://github.com/AmauriC/tarteaucitron.js/graphs/contributors)

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
<script type="text/javascript" src="/tarteaucitron/tarteaucitron.js"></script>

<script type="text/javascript">
tarteaucitron.init({
    privacyUrl: '', /* Privacy policy url */

    hashtag: '#tarteaucitron', /* Open the panel with this hashtag */
    cookieName: 'tarteaucitron', /* Cookie name */

    orientation: 'middle', /* Banner position (top - bottom) */
    showAlertSmall: true, /* Show the small banner on bottom right */
    cookieslist: true, /* Show the cookie list */

    adblocker: false, /* Show a Warning if an adblocker is detected */
    acceptAllCta : true, /* Show the accept all button when highPrivacy on */
    denyAllCta : true, /* Show the deny all button when highPrivacy off */
    highPrivacy: true, /* Disable auto consent */
    handleBrowserDNTRequest: false, /* If Do Not Track == 1, disallow all */

    removeCredit: false, /* Remove credit link */
    moreInfoLink: true, /* Show more info link */
    useExternalCss: false, /* If false, the tarteaucitron.css file will be loaded */

    //cookieDomain: '.my-multisite-domaine.fr', /* Shared cookie for subdomain website */

    readmoreLink: '/cookiespolicy', /* Change the default readmore link pointing to tarteaucitron.io */
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

# Styles customization

If you want to use tarteaucitron's styles and customize some colors, you can change almost all color variables in your project css file. Here is the default values:

```css
#tarteaucitronRoot {
  --tac-primary: #387cc6;
  --tac-secondary: #c23ffd;
  --tac-white: #fff;
  --tac-gray-100: #424242;
  --tac-gray-200: #333;
  --tac-bg-panel: #333;
  --tac-green: #4f8a46;
  --tac-red: #c74848;
  --tac-yellow: #fbda26;
  --tac-back-panel: #eee;
  --tac-panel-shadow: #575757;
  --tac-scrollbar-bg: #555;
  --tac-btn-allow-bg: #555;
  --tac-btn-deny-bg: #555;

  --tac-font: "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
```

Of course if you want to use your own CSS and remove tarteaucitron's CSS you can disable it in your script init options :  
```html
<script type="text/javascript">
tarteaucitron.init({
    /* ... */
    "useExternalCss": true,
});
</script>
```

# Contributing to tarteaucitron.js

Thank you so much for contributing to this project.  
We've added a Gulp stack for easier development.  

Here is some simple commands to fire up the project:

**Install dependencies:**

```bash
$ npm install
```

## Dev environment

**Start the Gulp watchers and BrowserSync:**
```bash
$ npm run dev
```

Gulp will copy the `index.html` inside the `dist` folder and start BrowserSync for you. It will also watch files you modify.

## Production environment

If you want to build a "non-minified" production version, use:

```bash
$ npm run build
```

If you want to build a minified production version:

```bash
$ npm run build:min
```

If you want to make your own release inside a zip folder:

```bash
$ npm run release
```

## Lint 

```bash
# Lint everything
$ npm run lint

# Lint styles only
$ npm run lint:scss

# Lint scripts only
$ npm run lint:js
```