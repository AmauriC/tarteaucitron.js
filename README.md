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
- AddThis
- Alexa
- Clicky
- Dailymotion
- Disqus
- Facebook
- FERank
- Google Adsense
- Google Analytics (ga.js)
- Google Analytics (universal)
- Google+
- Linkedin
- Pinterest
- Shareaholic
- ShareThis
- Twitter
- Vimeo
- Xiti
- Youtube
- Zopim

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