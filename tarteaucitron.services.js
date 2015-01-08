/*global tarteaucitron, ga, Shareaholic, stLight*/

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
        tarteaucitron.fallback(['addthis_sharing_toolbox'], '');
        tarteaucitron.addScript('//s7.addthis.com/js/300/addthis_widget.js#pubid=' + tarteaucitron.user.addthisPubId);
    },
    "fallback": function () {
        "use strict";
        var cookies = ['__atuvc', '__atuvs'],
            id = 'addthis';
        
        tarteaucitron.cookie.purge(cookies);
        tarteaucitron.fallback(['addthis_sharing_toolbox'], tarteaucitron.engage(id));
    }
};

// clicky
tarteaucitron.services.clicky = {
    "key": "clicky",
    "type": "analytics",
    "name": "Clicky",
    "uri": "https://clicky.com/terms",
    "needConsent": true,
    "js": function () {
        "use strict";
        if (tarteaucitron.user.clickyId === undefined) {
            return;
        }
        tarteaucitron.addScript('//static.getclicky.com/js', '', function () {
            if (typeof clicky.init === 'function') {
                clicky.init(tarteaucitron.user.clickyId);
            }
            if (typeof tarteaucitron.user.clickyMore === 'function') {
                tarteaucitron.user.clickyMore();
            }
        });
    },
    "fallback": function () {
        "use strict";
        var cookies = ['_jsuid', '_eventqueue', '_referrer_og', '_utm_og', '_first_pageview', 'clicky_olark', 'no_trackyy_' + tarteaucitron.user.clickyId, 'unpoco_' + tarteaucitron.user.clickyId, 'heatmaps_g2g_' + tarteaucitron.user.clickyId];
        tarteaucitron.cookie.purge(cookies);
    }
};

// disqus
tarteaucitron.services.disqus = {
    "key": "disqus",
    "type": "social",
    "name": "Disqus",
    "uri": "https://help.disqus.com/customer/portal/articles/466259-privacy-policy",
    "needConsent": true,
    "js": function () {
        "use strict";
        if (tarteaucitron.user.disqusShortname === undefined) {
            return;
        }
        tarteaucitron.addScript('//' + tarteaucitron.user.disqusShortname + '.disqus.com/embed.js');
        tarteaucitron.addScript('//' + tarteaucitron.user.disqusShortname + '.disqus.com/count.js');
    },
    "fallback": function () {
        "use strict";
        var id = 'disqus';
        
        if (document.getElementById('disqus_thread')) {
            document.getElementById('disqus_thread').innerHTML = tarteaucitron.engage(id);
        }
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
        tarteaucitron.addScript('//connect.facebook.net/' + tarteaucitron.getLocale() + '/sdk.js#xfbml=1&version=v2.0', 'facebook-jssdk');
    },
    "fallback": function () {
        "use strict";
        tarteaucitron.fallback(['fb-post', 'fb-follow', 'fb-comments', 'fb-activity', 'fb-like-box', 'fb-send', 'fb-share-button', 'fb-like'], '<a href="https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(document.location) + '" target="_blank" class="tac_share tac_share_facebook">Facebook</a>');
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
        var id = 'adsense';
        
        tarteaucitron.fallback(['adsbygoogle'], tarteaucitron.engage(id));
    }
};

// google analytics (old)
tarteaucitron.services.gajs = {
    "key": "gajs",
    "type": "analytics",
    "name": "Google Analytics (ga.js)",
    "uri": "https://support.google.com/analytics/answer/6004245",
    "needConsent": true,
    "js": function () {
        "use strict";
        window._gaq = window._gaq || [];
        window._gaq.push(['_setAccount', tarteaucitron.user.gajsUa]);
        window._gaq.push(['_trackPageview']);
        
        tarteaucitron.addScript('//www.google-analytics.com/ga.js', '', function () {
            if (typeof tarteaucitron.user.gajsMore === 'function') {
                tarteaucitron.user.gajsMore();
            }
        });
    },
    "fallback": function () {
        "use strict";
        var cookies = ['_ga', '_gat', '__utma', '__utmb', '__utmc', '__utmt', '__utmz'];
        tarteaucitron.cookie.purge(cookies);
    }
};

// google analytics
tarteaucitron.services.analytics = {
    "key": "analytics",
    "type": "analytics",
    "name": "Google Analytics (universal)",
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
    "grayJs": function () {
        "use strict";
        window.GoogleAnalyticsObject = 'ga';
        window.ga = window.ga || function () {
            window.ga.q = window.ga.q || [];
            window.ga.q.push(arguments);
        };
        window.ga.l = new Date();
        
        tarteaucitron.addScript('//www.google-analytics.com/analytics.js', '', function () {
            ga('create', tarteaucitron.user.analyticsUa, {'cookieExpires': 86400});
            ga('set', 'anonymizeIp', true);
            ga('set', 'forceSSL', true);
            ga('send', 'pageview');
            if (typeof tarteaucitron.user.analyticsMore === 'function') {
                tarteaucitron.user.analyticsMore();
            }
        });
    },
    "fallback": function () {
        "use strict";
        var cookies = ['_ga', '_gat', '__utma', '__utmb', '__utmc', '__utmt', '__utmz'];
        tarteaucitron.cookie.purge(cookies);
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
    }
};

// shareaholic
tarteaucitron.services.shareaholic = {
    "key": "shareaholic",
    "type": "social",
    "name": "Shareaholic",
    "uri": "https://shareaholic.com/privacy/choices",
    "needConsent": true,
    "js": function () {
        "use strict";
        if (tarteaucitron.user.shareaholicSiteId === undefined) {
            return;
        }
        
        tarteaucitron.fallback(['shareaholic-canvas'], '');
        tarteaucitron.addScript('//dsms0mj1bbhn4.cloudfront.net/assets/pub/shareaholic.js', '', function () {
            try {
                Shareaholic.init(tarteaucitron.user.shareaholicSiteId);
            } catch (e) {}
        });
    },
    "fallback": function () {
        "use strict";
        var cookies = ['__utma', '__utmb', '__utmc', '__utmz', '__utmt_Shareaholic%20Pageviews'],
            id = 'shareaholic';
        
        tarteaucitron.cookie.purge(cookies);
        tarteaucitron.fallback(['shareaholic-canvas'], tarteaucitron.engage(id));
    }
};

// sharethis
tarteaucitron.services.sharethis = {
    "key": "sharethis",
    "type": "social",
    "name": "ShareThis",
    "uri": "http://www.sharethis.com/legal/privacy/",
    "needConsent": true,
    "js": function () {
        "use strict";
        if (tarteaucitron.user.sharethisPublisher === undefined) {
            return;
        }
        var switchTo5x = true,
            uri = ('https:' === document.location.protocol ? 'https://ws' : 'http://w') + '.sharethis.com/button/buttons.js';
        
        tarteaucitron.fallback(['tacSharethis'], '');
        tarteaucitron.addScript(uri, '', function () {
            stLight.options({publisher: tarteaucitron.user.sharethisPublisher, doNotHash: false, doNotCopy: false, hashAddressBar: false});
        });
    },
    "fallback": function () {
        "use strict";
        var cookies = ['__unam'],
            id = 'sharethis';
        
        tarteaucitron.cookie.purge(cookies);
        tarteaucitron.fallback(['tacSharethis'], tarteaucitron.engage(id));
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
    }
};

// youtube
tarteaucitron.services.youtube = {
    "key": "youtube",
    "type": "social",
    "name": "YouTube",
    "uri": "https://www.google.fr/intl/fr/policies/privacy/",
    "needConsent": true,
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['youtube_player'], function (x) {
            var video_id = x.getAttribute("videoID"),
                video_width = x.getAttribute("width"),
                frame_width = 'width=',
                video_height = x.getAttribute("height"),
                frame_height = 'height=',
                video_frame;
            
            if (video_id === undefined) {
                return "";
            }
            if (video_width !== undefined) {
                frame_width += '"' + video_width + '" ';
            } else {
                frame_width += '"" ';
            }
            if (video_height !== undefined) {
                frame_height +=  '"' + video_height + '" ';
            } else {
                frame_height += '"" ';
            }
            video_frame = '<iframe id="ytplayer" type="text/html" ' + frame_width + frame_height + '" src="//www.youtube.com/embed/' + video_id + ' " frameborder="0" />';
            return video_frame;
        });
    },
    "fallback": function () {
        "use strict";
        var cookies = ['VISITOR_INFO1_LIVE', 'YSC', 'PREF', 'GEUP'],
            id = 'youtube';
        tarteaucitron.cookie.purge(cookies);
        tarteaucitron.fallback(['youtube_player'], tarteaucitron.engage(id));
    }
};

// xiti
tarteaucitron.services.xiti = {
    "key": "xiti",
    "type": "analytics",
    "name": "Xiti",
    "uri": "http://www.atinternet.com/politique-du-respect-de-la-vie-privee/",
    "needConsent": true,
    "js": function () {
        "use strict";
        if (tarteaucitron.user.xitiId === undefined) {
            return;
        }
        var Xt_param = 's=' + tarteaucitron.user.xitiId + '&p=',
            Xt_r,
            Xt_h,
            Xt_i,
            Xt_s,
            div = document.createElement('div');
        try {
            Xt_r = top.document.referrer;
        } catch (e) {
            Xt_r = document.referrer;
        }
        Xt_h = new Date();
        Xt_i = '<img style="display:none" border="0" alt="" ';
        Xt_i += 'src="http://logv3.xiti.com/hit.xiti?' + Xt_param;
        Xt_i += '&hl=' + Xt_h.getHours() + 'x' + Xt_h.getMinutes() + 'x' + Xt_h.getSeconds();
        if (parseFloat(navigator.appVersion) >= 4) {
            Xt_s = screen;
            Xt_i += '&r=' + Xt_s.width + 'x' + Xt_s.height + 'x' + Xt_s.pixelDepth + 'x' + Xt_s.colorDepth;
        }
        
        div.innerHTML = Xt_i + '&ref=' + Xt_r.replace(/[<>"]/g, '').replace(/&/g, '$') + '" title="Internet Audience">';
        document.getElementsByTagName('body')[0].appendChild(div.firstChild);
        
        if (typeof tarteaucitron.user.xitiMore === 'function') {
            tarteaucitron.user.xitiMore();
        }
    },
    "fallback": function () {
        "use strict";
        var cookies = [''];
        tarteaucitron.cookie.purge(cookies);
    }
};

// zopim
tarteaucitron.services.zopim = {
    "key": "zopim",
    "type": "social",
    "name": "Zopim",
    "uri": "https://www.zopim.com/privacy",
    "needConsent": true,
    "js": function () {
        "use strict";
        if (tarteaucitron.user.zopimID === undefined) {
            return;
        }
        tarteaucitron.addScript('//v2.zopim.com/?' + tarteaucitron.user.zopimID);
    },
    "fallback": function () {
        "use strict";
        var cookies = ['__zlcid', '__zprivacy'];
        tarteaucitron.cookie.purge(cookies);
    }
};
