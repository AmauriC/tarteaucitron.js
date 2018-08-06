[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.me/SASAICAGENCY)


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

## Supported services
* Advertising network
  * Ad Up Technology (ads)
  * Ad Up Technology (conversion)
  * Ad Up Technology (retargeting)
  * Amazon
  * Clicmanager
  * Criteo
  * FERank (pub)
  * Google Adsense
  * Google Adsense Search (form)
  * Google Adsense Search (result)
  * Google Adwords (conversion)
  * Google Adwords (remarketing)
  * Pubdirecte
  * Twenga
  * vShop

* APIs
  * Google jsapi
  * Google Maps
  * Google Tag Manager
  * Timeline JS
  * Typekit (adobe)

* Audience measurement
  * Alexa
  * Clicky
  * Crazyegg
  * FERank
  * Get+
  * Google Analytics (ga.js)
  * Google Analytics (universal)
  * StatCounter
  * VisualRevenue
  * Xiti

* Comment
  * Disqus
  * Facebook (commentaire)
  
* Marketing Automation & CRM
  * Mautic
  * Webmecanik Automation
  * Koban
  
* Social network
  * AddThis
  * AddToAny (feed)
  * AddToAny (share)
  * eKomi
  * Facebook
  * Facebook (like box)
  * Google+
  * Google+ (badge)
  * Linkedin
  * Pinterest
  * Shareaholic
  * ShareThis
  * Twitter
  * Twitter (cards)
  * Twitter (timelines)

* Support
  * UserVoice
  * Zopim

* Video
  * Calameo
  * Dailymotion
  * Prezi
  * SlideShare
  * Vimeo
  * YouTube
  * Issuu


## Visitors outside the EU
In PHP for example, you can bypass all the script by setting this var `tarteaucitron.user.bypass = true;` if the visitor is not in the EU.

## Tested on
- IE 6+
- FF 3+
- Safari 4+
- Chrome 14+
- Opera 10+

# Installation guide
[Visit opt-out.ferank.eu](https://opt-out.ferank.eu/)


# How to use

```html
<script type="text/javascript" src="/tarteaucitron/tarteaucitron.js"></script>

<script type="text/javascript">
tarteaucitron.init({
    "hashtag": "#tarteaucitron", /* Ouverture automatique du panel avec le hashtag */
    "cookieName": "tartaucitron", /* Nom du cookie */
    "highPrivacy": false, /* désactiver le consentement implicite (en naviguant) ? */
    "orientation": "top", /* le bandeau doit être en haut (top) ou en bas (bottom) ? */
    "adblocker": false, /* Afficher un message si un adblocker est détecté */
    "showAlertSmall": true, /* afficher le petit bandeau en bas à droite ? */
    "cookieslist": true, /* Afficher la liste des cookies installés ? */
    "removeCredit": false, /* supprimer le lien vers la source ? */
    "handleBrowserDNTRequest": false, /* Répondre au DoNotTrack du navigateur ?*/
    "cookieDomain": ".my-multisite-domaine.fr" /* Nom de domaine sur lequel sera posé le cookie - pour les multisites / sous-domaines - Facultatif */
});
</script>
```
