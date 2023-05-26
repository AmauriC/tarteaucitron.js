//import * as tarteaucitron from './tarteaucitron.js'
import {tarteaucitron} from './tarteaucitron.js'


if (tarteaucitron) {
  console.log("tarteaucitron is defined")
} else {
  console.log("tarteaucitron is not defined")
}

try {
  tarteaucitron.init({
    "privacyUrl": "", /* Privacy policy url */

    "hashtag": "#tarteaucitron", /* Open the panel with this hashtag */
    "cookieName": "tarteaucitron", /* Cookie name */

    "orientation": "bottom", /* Banner position (top - bottom) */
    "showAlertSmall": false, /* Show the small banner on bottom right */
    "cookieslist": true, /* Show the cookie list */

    "adblocker": false, /* Show a Warning if an adblocker is detected */
    "AcceptAllCta" : true, /* Show the accept all button when highPrivacy on */
    "highPrivacy": true, /* HIGHLY RECOMMANDED Disable auto consent */

    "handleBrowserDNTRequest": false, /* If Do Not Track == 1, disallow all */

    "removeCredit": false, /* Remove credit link */
    "moreInfoLink": true, /* Show more info link */

    "useExternalCss": false, /* If false, the tarteaucitron.css file will be loaded */
    "useExternalJs": false, /* If false, the tarteaucitron.js file will be loaded */

    //"cookieDomain": ".my-multisite-domaine.fr", /* Shared cookie for multisite */

    "readmoreLink": "", /* Change the default readmore link pointing to tarteaucitron.io */

    //"mandatory": true, /* Show a message about mandatory cookies */
  });
} catch (e) {
  console.log("tarteaucitron init failed")
  console.log(e)
}





