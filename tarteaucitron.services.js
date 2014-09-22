/*global tarteaucitron, ga*/

// addthis
tarteaucitron.services.addthis = {
    "key": "addthis",
    "type": "social",
    "name": "AddThis",
    "uri": "http://www.addthis.com/privacy/privacy-policy#publisher-visitors",
    "needConsent": true,
    "js": function () {
        "use strict";
        if (tarteaucitron.user.addthisPubId === undefined) {
            return;
        }
        tarteaucitron.addScript('//s7.addthis.com/js/300/addthis_widget.js#pubid=' + tarteaucitron.user.addthisPubId);
    },
    "lang": {
        "en": "AddThis collects non-personal information such as your IP address, your browser, your operating system... Personal information may be collected when you submit yourself (email address).<br/><br/><em>AddThis provide a policy about the use of tracking technologies and cookies.</em>",
        "fr": "AddThis collecte des informations non personnelles tel que votre IP, votre navigateur, votre syst&egrave;me d'exploitation... Des informations personnelles peuvent &ecirc;tre collect&eacute;es lorsque vous les soumettez vous m&ecirc;me (adresse email par exemple).<br/><br/><em>AddThis met &agrave; disposition une politique sur l'utilisation de ses syst&egrave;mes de suivi et l'utilisation des cookies.</em>",
        "de": "",
        "es": "",
        "it": ""
    }
};

// ferank
tarteaucitron.services.ferank = {
    "key": "ferank",
    "type": "analytics",
    "name": "FERank",
    "uri": "https://www.ferank.fr/respect-vie-privee/#mesureaudience",
    "needConsent": false,
    "js": function () {
        "use strict";
        tarteaucitron.addScript('//static.ferank.fr/pixel.js', '', function () {
            if (typeof tarteaucitron.user.ferankMore === 'function') {
                tarteaucitron.user.ferankMore();
            }
        });
    },
    "lang": {
        "en": "FERank uses a beacon to generate traffic statistics. During your visits, information about your browsing and your equipment are transmitted to FERank. The collected data is immediately anonymized, personal information that identifies you is never stored, not even your IP address, and the statistics are not cross-checked with other sites or files.<br/><br/><em>FERank meets the criteria to be exempted from prior consent.</em>",
        "fr": "FERank utilise un pixel invisible pour g&eacute;n&eacute;rer des statistiques de fr&eacute;quentation. Lors de vos visites, des informations sur votre navigation et votre mat&eacute;riel sont transmises &agrave; FERank.<br/><br/>Les donn&eacute;es collect&eacute;es sont imm&eacute;diatement anonymis&eacute;es, aucune information personnelle ou permettant de vous identifier n'est stock&eacute;e, pas m&ecirc;me votre adresse IP, et les statistiques ne sont pas recoup&eacute;es avec d'autres sites ou fichiers.<br/><br/><em>FERank r&eacute;pond aux crit&egrave;res pour &ecirc;tre dispens&eacute; de consentement pr&eacute;alable.</em>",
        "de": "",
        "es": "",
        "it": ""
    }
};

// facebook
tarteaucitron.services.facebook = {
    "key": "facebook",
    "type": "social",
    "name": "Facebook",
    "uri": "https://www.facebook.com/help/cookies/",
    "needConsent": true,
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['fb-like'], '');
        tarteaucitron.addScript('//connect.facebook.net/fr_FR/sdk.js#xfbml=1&version=v2.0', 'facebook-jssdk');
    },
    "fallback": function () {
        "use strict";
        tarteaucitron.fallback(['fb-post', 'fb-follow', 'fb-comments', 'fb-activity', 'fb-like-box', 'fb-send', 'fb-share-button', 'fb-like'], '<a href="https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(document.location) + '" target="_blank" class="tac_share tac_share_facebook">Facebook</a>');
    },
    "lang": {
        "en": "Facebook, its subsidiaries and partners uses technology such as cookies, tracking pixels and local storage. These technologies are used for security purposes and to provide products, services and advertisements.<br/><br/><em> Facebook provide a policy about the use of tracking technologies and cookies.</em>",
        "fr": "Facebook, ses filiales et autres partenaires utilisent des technologies telles que les cookies, les pixels de suivi et le stockage local. Ces technologies sont utilis&eacute;es &agrave; des fins de s&eacute;curit&eacute; et pour fournir des produits, des services et des publicit&eacute;s.<br/><br/><em>Facebook met &agrave; disposition une politique sur l'utilisation de ses syst&egrave;mes de suivi et l'utilisation des cookies.</em>",
        "de": "",
        "es": "",
        "it": ""
    }
};

// google adsense
tarteaucitron.services.adsense = {
    "key": "adsense",
    "type": "ads",
    "name": "Adsense (Google)",
    "uri": "http://www.google.com/ads/preferences/",
    "needConsent": true,
    "js": function () {
        "use strict";
        tarteaucitron.addScript('//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js');
    },
    "fallback": function () {
        "use strict";
        tarteaucitron.fallback(['adsbygoogle'], tarteaucitron.promoteMe);
    },
    "lang": {
        "en": "Google uses cookies to serve ads based on your previous visits. Google and its partners adjust ads based on your visit to this site and / or other web sites using the DoubleClick cookie.<br/><br/><em>You can disable the DoubleClick cookie used for ad serving via Google Advertising Solutions settings.</em>",
        "fr": "Google utilise des cookies pour diffuser des annonces en fonction de vos visites ant&eacute;rieures. Google et ses partenaires adaptent les annonces diffus&eacute;es en fonction de votre navigation sur ce site et/ou d'autres sites web en utilisant le cookie DoubleClick.<br/><br/><em>Vous pouvez d&eacute;sactiver le cookie DoubleClick utilis&eacute; pour la diffusion d'annonces par centres d'int&eacute;r&ecirc;t via les param&egrave;tres Google Solutions publicitaires.</em>",
        "de": "",
        "es": "",
        "it": ""
    }
};

// google analytics
tarteaucitron.services.analytics = {
    "key": "analytics",
    "type": "analytics",
    "name": "Analytics (Google)",
    "uri": "https://support.google.com/analytics/answer/6004245",
    "needConsent": true,
    "js": function () {
        "use strict";
        window.GoogleAnalyticsObject = 'ga';
        window.ga = window.ga || function () {
            window.ga.q = window.ga.q || [];
            window.ga.q.push(arguments);
        };
        window.ga.l = new Date();
        
        tarteaucitron.addScript('//www.google-analytics.com/analytics.js', '', function () {
            ga('create', tarteaucitron.user.analyticsUa, {'cookieExpires': 34128000});
            ga('send', 'pageview');
            if (typeof tarteaucitron.user.analyticsMore === 'function') {
                tarteaucitron.user.analyticsMore();
            }
        });
    },
    "lang": {
        "en": "Google Analytics uses cookies to generate internal reports about your interactions on this website. These cookies are used to store information that does not identify you personally. First-party cookies are stored on your browser and are not valid from one domain to another.<br/><br/><em> Google provide a policy about the use of tracking technologies and cookies.</em>",
        "fr": "Google Analytics utilise des cookies internes permettant de g&eacute;n&eacute;rer des rapports sur vos interactions sur ce site web. Ces cookies sont utilis&eacute;s pour stocker des informations ne permettant pas de vous identifier personnellement. Les cookies internes stock&eacute;s sur votre navigateur ne sont pas valables d'un domaine &agrave; l'autre.<br/><br/><em>Google met &agrave; disposition une politique sur l'utilisation de ses syst&egrave;mes de suivi et l'utilisation des cookies.</em>",
        "de": "",
        "es": "",
        "it": ""
    }
};

// google+
tarteaucitron.services.gplus = {
    "key": "gplus",
    "type": "social",
    "name": "Google+",
    "uri": "http://www.google.fr/intl/policies/privacy/",
    "needConsent": true,
    "js": function () {
        "use strict";
        tarteaucitron.addScript('https://apis.google.com/js/platform.js');
    },
    "fallback": function () {
        "use strict";
        tarteaucitron.fallback(['g-page', 'g-plus', 'g-plusone'], '<a href="https://plus.google.com/share?url=' + encodeURIComponent(document.location) + '" target="_blank" class="tac_share tac_share_googlep">Google+</a>');
    },
    "lang": {
        "en": "Google collects information used to improve services to the public. It may be basic information, such as the language you use, or more complex, such as ads that you find most useful or the people who interest you most on the web.<br/><br/><em> Google provide a policy about the use of tracking technologies and cookies.</em>",
        "fr": "Google collecte des informations servant &agrave; am&eacute;liorer ses services accessibles au public. Il peut s'agir d'informations de base, telles que la langue que vous utilisez, ou plus complexes, par exemple les annonces que vous trouvez les plus utiles ou les personnes qui vous int&eacute;ressent le plus sur le web.<br/><br/><em>Google met &agrave; disposition une politique sur l'utilisation de ses syst&egrave;mes de suivi et l'utilisation des cookies.</em>",
        "de": "",
        "es": "",
        "it": ""
    }
};

// linkedin
tarteaucitron.services.linkedin = {
    "key": "linkedin",
    "type": "social",
    "name": "Linkedin",
    "uri": "https://www.linkedin.com/legal/cookie_policy",
    "needConsent": true,
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['tacLinkedin'], '');
        tarteaucitron.addScript('//platform.linkedin.com/in.js');
    },
    "fallback": function () {
        "use strict";
        tarteaucitron.fallback(['tacLinkedin'], '<a href="http://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(document.location) + '" target="_blank" class="tac_share tac_share_linkedin">Linkedin</a>');
    },
    "lang": {
        "en": "Linkedin and its partners may set cookies to improve and secure their services, offer you relevant ads or customize your user experience.<br/><br/><em>Linkedin provided a policy about the use of tracking technologies and cookies.</em>",
        "fr": "Linkedin et ses partenaires peuvent installer des cookies afin d'am&eacute;liorer et s&eacute;curiser leurs services, vous proposer des publicit&eacute;s pertinentes ou encore personnaliser votre exp&eacute;rience utilisateur.<br/><br/><em>Linkedin met &grave; disposition une politique sur l'utilisation de ses syst&egrave;mes de suivi et l'utilisation des cookies.</em>",
        "de": "",
        "es": "",
        "it": ""
    }
};

// pinterest
tarteaucitron.services.pinterest = {
    "key": "pinterest",
    "type": "social",
    "name": "Pinterest",
    "uri": "https://about.pinterest.com/privacy-policy",
    "needConsent": true,
    "js": function () {
        "use strict";
        tarteaucitron.addScript('//assets.pinterest.com/js/pinit.js');
    },
    "lang": {
        "en": "Pinterest collect technical information and the type of equipment you use through his widget on this site. These informations can be stored in log files or cookies, and are used to improve Pinterest services and develop new ones.<br/><br/><em> Pinterest provide a policy about the use of tracking technologies and cookies.</em>",
        "fr": "Pinterest collecte des informations techniques et le type de mat&eacute;riel que vous utilisez via le widget pr&eacute;sent sur ce site. Ces informations peuvent &ecirc;tre stock&eacute;es dans des fichiers logs ou des cookies et sont utilis&eacute;es pour am&eacute;liorer les services de Pinterest et en d&eacute;velopper de nouveaux.<br/><br/><em>Pinterest met &agrave; disposition une politique sur l'utilisation de ses syst&egrave;mes de suivi et l'utilisation des cookies.</em>",
        "de": "",
        "es": "",
        "it": ""
    }
};

// twitter
tarteaucitron.services.twitter = {
    "key": "twitter",
    "type": "social",
    "name": "Twitter",
    "uri": "https://support.twitter.com/articles/20170514",
    "needConsent": true,
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['tacTwitter'], '');
        tarteaucitron.addScript('//platform.twitter.com/widgets.js', 'twitter-wjs');
    },
    "fallback": function () {
        "use strict";
        tarteaucitron.fallback(['tacTwitter'], '<a href="https://twitter.com/intent/tweet?text=' + encodeURIComponent(document.title) + '%20' + encodeURIComponent(document.location) + '" target="_blank" class="tac_share tac_share_twitter">Twitter</a>');
    },
    "lang": {
        "en": "Twitter collects and uses information to deliver services and to measure and improve service over time. Twitter can tailor content for you based on your visits to other websites via cookies.<br/><br/><em>Twitter provide a policy about the use of tracking technologies and cookies.</em>",
        "fr": "Twitter collecte et utilise des informations pour fournir ses services, ainsi que pour mesurer et am&eacute;liorer ses services au fil du temps. Twitter peux adapter le contenu qui vous est destin&eacute; en fonction de vos visites sur des sites tiers via des cookies.<br/><br/><em>Twitter met &agrave; disposition une politique sur l'utilisation de ses syst&egrave;mes de suivi et l'utilisation des cookies.</em>",
        "de": "",
        "es": "",
        "it": ""
    }
};