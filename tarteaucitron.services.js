/*global tarteaucitron, ga, Shareaholic, stLight, clicky, top, google, Typekit, FB, ferankReady, IN, stButtons, twttr, PCWidget*/
/*jslint regexp: true, nomen: true*/
/* min ready */

// generic iframe
tarteaucitron.services.iframe = {
    "key": "iframe",
    "type": "other",
    "name": "Web content",
    "uri": "",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['tac_iframe'], function (x) {
            var frame_title = (tarteaucitron.getElemAttr(x,"title")) ? tarteaucitron.getElemAttr(x,"title") : '',
                width = tarteaucitron.getElemAttr(x,"width"),
                height = tarteaucitron.getElemAttr(x,"height"),
                allowfullscreen = tarteaucitron.getElemAttr(x,"allowfullscreen"),
                url = tarteaucitron.getElemAttr(x,"url");

            var styleAttr = (width !== "" ? "width:" + parseInt(width, 10) + "px;" : "") + (height !== "" ? "height:" + parseInt(height, 10) + "px;" : "");

            return '<iframe title="' + frame_title + '" src="' + url + '" style="' + styleAttr + '" allowtransparency' + (allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'iframe';
        tarteaucitron.fallback(['tac_iframe'], function (elem) {
            elem.style.width = tarteaucitron.getElemAttr(elem,'width') + 'px';
            elem.style.height = tarteaucitron.getElemAttr(elem,'height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// goldenbees
tarteaucitron.services.goldenbees = {
    "key": "goldenbees",
    "type": "ads",
    "name": "Golden Bees",
    "uri": "https://www.goldenbees.fr/politique-confidentialite",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.goldenbeesId === undefined) {
            return;
        }

        tarteaucitron.addScript('https://cdn.goldenbees.fr/proxy?url=http%3A%2F%2Fstatic.goldenbees.fr%2Fcdn%2Fjs%2Fgtag%2Fgoldentag-min.js&attachment=0', '', function() {
            window.gbTag = GbTagBuilder.build(tarteaucitron.user.goldenbeesId);
            window.gbTag.fire();
        });
    }
};

// weply
tarteaucitron.services.weply = {
    "key": "weply",
    "type": "support",
    "name": "Weply",
    "uri": "https://weply.chat/",
    "needConsent": true,
    "cookies": ['weply.analytics', 'logglytrackingsession'],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.weplyId === undefined) {
            return;
        }

        tarteaucitron.addScript('https://app.weply.chat/widget/' + tarteaucitron.user.weplyId);
    }
};

// skaze
tarteaucitron.services.skaze = {
    "key": "skaze",
    "type": "ads",
    "name": "Skaze",
    "uri": "https://www.skaze.com/fr/politique/politique-de-confidentialite/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.skazeIdentifier === undefined) {
            return;
        }

        window.skaze = window.skaze || {};
        tarteaucitron.addScript('https://events.sk.ht/' + tarteaucitron.user.skazeIdentifier + '/lib.js', '', function() {
            skaze.cmd = skaze.cmd || [];
            skaze.cmd.push(function() {
                skaze.init({ siteIdentifier : tarteaucitron.user.skazeIdentifier });

                if (typeof tarteaucitron.user.skazeMore === 'function') {
                    tarteaucitron.user.skazeMore();
                }
            });
        });
    }
};

// dialoginsight
tarteaucitron.services.dialoginsight = {
    "key": "dialoginsight",
    "type": "support",
    "name": "Dialog Insight",
    "uri": "https://www.dialoginsight.com/politique-de-confidentialite/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.dialogInsightId === undefined) {
            return;
        }

        tarteaucitron.addScript('https://t.ofsys.com/js/Journey/1/' + tarteaucitron.user.dialogInsightId + '/DI.Journey-min.js');
    }
};

// markerio
tarteaucitron.services.markerio = {
    "key": "markerio",
    "type": "support",
    "name": "Marker.io",
    "uri": "https://marker.io/cookie-policy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.markerioProjectId === undefined) {
            return;
        }

        window.markerConfig = {
            project: tarteaucitron.user.markerioProjectId,
            source: 'snippet'
        };

        !function(e,r,a){if(!e.__Marker){e.__Marker={};var t=[],n={__cs:t};["show","hide","isVisible","capture","cancelCapture","unload","reload","isExtensionInstalled","setReporter","setCustomData","on","off"].forEach(function(e){n[e]=function(){var r=Array.prototype.slice.call(arguments);r.unshift(e),t.push(r)}}),e.Marker=n;var s=r.createElement("script");s.async=1,s.src="https://edge.marker.io/latest/shim.js";var i=r.getElementsByTagName("script")[0];i.parentNode.insertBefore(s,i)}}(window,document);
    }
};

// tolkaigenii
tarteaucitron.services.tolkaigenii = {
    "key": "tolkaigenii",
    "type": "support",
    "name": "Tolk.ai Genii",
    "uri": "https://www.tolk.ai/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.tolkaiGeniiProject === undefined) {
            return;
        }

        tarteaucitron.addScript('https://genii-script.tolk.ai/lightchat.js', 'lightchat-bot', '', '', 'project-id', tarteaucitron.user.tolkaiGeniiProject);
    }
};

// seamlessaccess
tarteaucitron.services.seamlessaccess = {
    "key": "seamlessaccess",
    "type": "api",
    "name": "Seamlessaccess",
    "uri": "https://seamlessaccess.org/about/trust/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.seamlessaccessInitiator === undefined) {
            return;
        }
        var uniqIds = [];
        tarteaucitron.fallback(['seamlessaccess_button'], function(x) {
            var uniqId = tarteaucitron.getElemAttr(x, 'id');
            if (uniqId === undefined) {
                uniqId = '_' + Math.random().toString(36).substr(2, 9);
                x.setAttribute('id', uniqId);
            }
            uniqIds.push(uniqId);
            x.innerHTML = '';
        }, true);
        tarteaucitron.addScript('//service.seamlessaccess.org/thiss.js', 'seamlessaccessjs', function() {
            for (var i = 0; i < uniqIds.length; i += 1) {
                thiss.DiscoveryComponent.render({
                    loginInitiatorURL: tarteaucitron.user.seamlessaccessInitiator,
                }, '#' + uniqIds[i]);
            }
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'seamlessaccess';
        tarteaucitron.fallback(['seamlessaccess_button'], tarteaucitron.engage(id));
    }
};

// reddit
tarteaucitron.services.reddit = {
    "key": "reddit",
    "type": "ads",
    "name": "Reddit",
    "uri": "https://business.reddithelp.com/helpcenter/s/article/Reddit-Advertising-Policy-Overview",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.redditInit === undefined) {
            return;
        }

        !function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};p.callQueue=[];var t=d.createElement("script");t.src="https://www.redditstatic.com/ads/pixel.js",t.async=!0;var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(t,s)}}(window,document);rdt('init',tarteaucitron.user.redditInit, {"aaid":tarteaucitron.user.redditAAID,"externalId":tarteaucitron.user.redditExternalId,"idfa":tarteaucitron.user.redditIDFA});rdt('track', 'PageVisit');
    }
};

// zoho
tarteaucitron.services.zoho = {
    "key": "zoho",
    "type": "support",
    "name": "Zoho SalesIQ",
    "uri": "https://www.zoho.com/gdpr.html",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.zohoWidgetCode === undefined) {
            return;
        }

        var $zoho=$zoho || {};
        $zoho.salesiq = $zoho.salesiq || {widgetcode:tarteaucitron.user.zohoWidgetCode, values:{},ready:function(){}};
        tarteaucitron.addScript('https://salesiq.zoho.eu/widget');
    }
};

// teads
tarteaucitron.services.teads = {
    "key": "teads",
    "type": "ads",
    "name": "Teads",
    "uri": "https://privacy-policy.teads.com",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.teadsBuyerPixelId === undefined) {
            return;
        }

        tarteaucitron.addScript('https://p.teads.tv/teads-fellow.js');

        window.teads_e = window.teads_e || [];
        window.teads_buyer_pixel_id = tarteaucitron.user.teadsBuyerPixelId;
    }
};

// thetradedesk
tarteaucitron.services.thetradedesk = {
    "key": "thetradedesk",
    "type": "ads",
    "name": "TheTradeDesk",
    "uri": "https://www.thetradedesk.com/fr/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.thetradedeskAdvertiserId === undefined || tarteaucitron.user.thetradedeskUpixelId === undefined) {
            return;
        }

        tarteaucitron.addScript('https://js.adsrvr.org/up_loader.1.1.0.js', '', function() {
            ttd_dom_ready( function() {
                if (typeof TTDUniversalPixelApi === 'function') {
                    var universalPixelApi = new TTDUniversalPixelApi();
                    universalPixelApi.init(tarteaucitron.user.thetradedeskAdvertiserId, [tarteaucitron.user.thetradedeskUpixelId], "https://insight.adsrvr.org/track/up");
                }
            });
        });
    }
};

// gcmanalyticsstorage
tarteaucitron.services.gcmanalyticsstorage = {
    "key": "gcmanalyticsstorage",
    "type": "google",
    "name": "Analytics",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.parameters.googleConsentMode === true) {
            window.tac_gtag('consent', 'update', {
                analytics_storage: 'granted'
            });
        }
    },
    "fallback": function () {
        "use strict";

        if (tarteaucitron.parameters.googleConsentMode === true) {
            window.tac_gtag('consent', 'update', {
                analytics_storage: 'denied'
            });
        }
    }
};

// gcmadstorage
tarteaucitron.services.gcmadstorage = {
    "key": "gcmadstorage",
    "type": "google",
    "name": "Advertising",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.parameters.googleConsentMode === true) {
            window.tac_gtag('consent', 'update', {
                ad_storage: 'granted'
            });
        }
    },
    "fallback": function () {
        "use strict";

        if (tarteaucitron.parameters.googleConsentMode === true) {
            window.tac_gtag('consent', 'update', {
                ad_storage: 'denied'
            });
        }
    }
};

// gcmadsuserdata
tarteaucitron.services.gcmadsuserdata = {
    "key": "gcmadsuserdata",
    "type": "google",
    "name": "Personalized Advertising",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.parameters.googleConsentMode === true) {
            window.tac_gtag('consent', 'update', {
                ad_user_data: 'granted',
                ad_personalization: 'granted'
            });
        }
    },
    "fallback": function () {
        "use strict";

        if (tarteaucitron.parameters.googleConsentMode === true) {
            window.tac_gtag('consent', 'update', {
                ad_user_data: 'denied',
                ad_personalization: 'denied'
            });
        }
    }
};

// gcmpersonalization
tarteaucitron.services.gcmpersonalization = {
    "key": "gcmpersonalization",
    "type": "google",
    "name": "Personalization",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.parameters.googleConsentMode === true) {
            window.tac_gtag('consent', 'update', {
                personalization_storage: 'granted'
            });
        }
    },
    "fallback": function () {
        "use strict";

        if (tarteaucitron.parameters.googleConsentMode === true) {
            window.tac_gtag('consent', 'update', {
                personalization_storage: 'denied'
            });
        }
    }
};

// gcmfunctionality
tarteaucitron.services.gcmfunctionality = {
    "key": "gcmfunctionality",
    "type": "google",
    "name": "Functionality",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.parameters.googleConsentMode === true) {
            window.tac_gtag('consent', 'update', {
                functionality_storage: 'granted'
            });
        }
    },
    "fallback": function () {
        "use strict";

        if (tarteaucitron.parameters.googleConsentMode === true) {
            window.tac_gtag('consent', 'update', {
                functionality_storage: 'denied'
            });
        }
    }
};

// gcmsecurity
tarteaucitron.services.gcmsecurity = {
    "key": "gcmsecurity",
    "type": "google",
    "name": "Security",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.parameters.googleConsentMode === true) {
            window.tac_gtag('consent', 'update', {
                security_storage: 'granted'
            });
        }
    },
    "fallback": function () {
        "use strict";

        if (tarteaucitron.parameters.googleConsentMode === true) {
            window.tac_gtag('consent', 'update', {
                security_storage: 'denied'
            });
        }
    }
};

// piximedia
tarteaucitron.services.piximedia = {
    "key": "piximedia",
    "type": "ads",
    "name": "Piximedia",
    "uri": "https://piximedia.com/privacy/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.piximediaName === undefined || tarteaucitron.user.piximediaTag === undefined || tarteaucitron.user.piximediaType === undefined || tarteaucitron.user.piximediaId === undefined) {
            return;
        }

        tarteaucitron.addScript('https://ad.piximedia.com/tools/activity/?' + tarteaucitron.user.piximediaName + '||'+ tarteaucitron.user.piximediaTag + '|' + tarteaucitron.user.piximediaType + '|' + tarteaucitron.user.piximediaId + '|||||');
    }
};

// screeb
tarteaucitron.services.screeb = {
    "key": "screeb",
    "type": "support",
    "name": "Screeb",
    "uri": "https://screeb.app/gdpr-privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.screebId === undefined) {
            return;
        }

        window['ScreebObject'] = '$screeb';
        window['$screeb'] = window['$screeb'] || function() {
            var d = arguments;
            return new Promise(function(a, b) {
                (window['$screeb'].q = window['$screeb'].q || []).push({
                    v: 1,
                    args: d,
                    ok: a,
                    ko: b
                })
            })
        };

        tarteaucitron.addScript('https://t.screeb.app/tag.js', '$screeb');

        if (tarteaucitron.user.screebDontInit !== true) {
            window.$screeb('init', tarteaucitron.user.screebId);
        }
    }
};

// pipedrive
tarteaucitron.services.pipedrive = {
    "key": "pipedrive",
    "type": "support",
    "name": "Pipedrive",
    "uri": "https://www.pipedrive.com/en/cookie-notice",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.pipedriveCompany === undefined || tarteaucitron.user.pipedrivePlaybook === undefined) {
            return;
        }

        window.pipedriveLeadboosterConfig = {base: 'leadbooster-chat.pipedrive.com', companyId: tarteaucitron.user.pipedriveCompany, playbookUuid: tarteaucitron.user.pipedrivePlaybook, version: 2};

        if (!window.LeadBooster) {
            window.LeadBooster = {
                q: [],
                on: function(n, h) {
                    this.q.push({
                        t: 'o',
                        n: n,
                        h: h
                    });
                },
                trigger: function(n) {
                    this.q.push({
                        t: 't',
                        n: n
                    });
                },
            };
        }

        tarteaucitron.addScript('https://leadbooster-chat.pipedrive.com/assets/loader.js');
    },
    "fallback": function () {
        "use strict";
        var id = '';
        tarteaucitron.fallback(['proactiveChat'], function (elem) {
            return tarteaucitron.engage(id);
        });
    }
};

// dynatrace
tarteaucitron.services.dynatrace = {
    "key": "dynatrace",
    "type": "api",
    "name": "Dynatrace",
    "uri": "https://www.dynatrace.com/company/trust-center/privacy/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.dynatraceJSPath === undefined || tarteaucitron.user.dynatraceConfig === undefined) {
            return;
        }

        tarteaucitron.addScript(tarteaucitron.user.dynatraceJSPath, '', '', '', 'data-dtconfig', tarteaucitron.user.dynatraceConfig);
    }
};

// mixpanel
tarteaucitron.services.mixpanel = {
    "key": "mixpanel",
    "type": "analytic",
    "name": "Mixpanel",
    "uri": "https://docs.mixpanel.com/docs/privacy/overview",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        (function (f, b) { if (!b.__SV) { var e, g, i, h; window.mixpanel = b; b._i = []; b.init = function (e, f, c) { function g(a, d) { var b = d.split("."); 2 == b.length && ((a = a[b[0]]), (d = b[1])); a[d] = function () { a.push([d].concat(Array.prototype.slice.call(arguments, 0))); }; } var a = b; "undefined" !== typeof c ? (a = b[c] = []) : (c = "mixpanel"); a.people = a.people || []; a.toString = function (a) { var d = "mixpanel"; "mixpanel" !== c && (d += "." + c); a || (d += " (stub)"); return d; }; a.people.toString = function () { return a.toString(1) + ".people (stub)"; }; i = "disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split( " "); for (h = 0; h < i.length; h++) g(a, i[h]); var j = "set set_once union unset remove delete".split(" "); a.get_group = function () { function b(c) { d[c] = function () { call2_args = arguments; call2 = [c].concat(Array.prototype.slice.call(call2_args, 0)); a.push([e, call2]); }; } for ( var d = {}, e = ["get_group"].concat( Array.prototype.slice.call(arguments, 0)), c = 0; c < j.length; c++) b(j[c]); return d; }; b._i.push([e, f, c]); }; b.__SV = 1.2; e = f.createElement("script"); e.type = "text/javascript"; e.async = !0; e.src = "undefined" !== typeof MIXPANEL_CUSTOM_LIB_URL ? MIXPANEL_CUSTOM_LIB_URL : "file:" === f.location.protocol && "//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//) ? "https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js" : "//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js"; g = f.getElementsByTagName("script")[0]; g.parentNode.insertBefore(e, g); } })(document, window.mixpanel || []);
    }
};

// freshsalescrm
tarteaucitron.services.freshsalescrm = {
  "key": "freshsalescrm",
  "type": "analytic",
  "name": "FreshSales (CRM)",
  "uri": "https://www.freshworks.com/gdpr/",
  "needConsent": true,
  "cookies": [],
  "js": function () {
    "use strict";

    if (tarteaucitron.user.freshsalescrmId === undefined) {
     return;
    }

    tarteaucitron.addScript('https://eu.fw-cdn.com/' + tarteaucitron.user.freshsalescrmId + '.js');
  }
};

// equativ
tarteaucitron.services.equativ = {
    "key": "equativ",
    "type": "ads",
    "name": "Equativ",
    "uri": "https://equativ.com/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.equativId === undefined) {
            return;
        }

        tarteaucitron.addScript('https://ced.sascdn.com/tag/' + tarteaucitron.user.equativId + '/smart.js');
    }
};

// twitch
tarteaucitron.services.twitch = {
    "key": "twitch",
    "type": "video",
    "name": "Twitch",
    "needConsent": true,
    "cookies": [],
    "uri": "https://www.twitch.tv/p/en/legal/privacy-notice",
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['twitch_player'], function (x) {
            var frame_title = (tarteaucitron.getElemAttr(x,"title")) ? tarteaucitron.getElemAttr(x,"title") : 'Twitch iframe',
                id = tarteaucitron.getElemAttr(x, 'videoID'),
                parent = tarteaucitron.getElemAttr(x, 'parent'),
                width = tarteaucitron.getElemAttr(x, 'width'),
                height = tarteaucitron.getElemAttr(x, 'height');
            var embedURL = "https://player.twitch.tv/?video=" + id + "&parent=" + parent;

            var styleAttr = (width !== "" ? "width:" + parseInt(width, 10) + "px;" : "") + (height !== "" ? "height:" + parseInt(height, 10) + "px;" : "");

            return "<iframe title=\"" + frame_title + "\" style=\"" + styleAttr + "\" src=\"" + embedURL + "\"></iframe>";
        });
    },
    "fallback": function () {
        "use strict";
        var id = "twitch";
        tarteaucitron.fallback(["twitch_player"], tarteaucitron.engage(id));
    }
};

// eskimi
tarteaucitron.services.eskimi = {
    "key": "eskimi",
    "type": "ads",
    "name": "Eskimi",
    "uri": "https://fr.eskimi.com/privacy-policy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.eskimiInit === undefined) {
            return;
        }

        window.___esk = window.esk = function () {
            window.___esk.callMethod ? window.___esk.callMethod.apply(window.___esk, arguments) : window.___esk.queue.push(arguments);
        };
        window.___esk.push = window.___esk;
        window.___esk.loaded = true;
        window.___esk.queue = [];

        tarteaucitron.addScript("https://dsp-media.eskimi.com/assets/js/e/gtr.min.js", '', function () {
            esk('init', tarteaucitron.user.eskimiInit);
        });
    }
};

// sharethissticky
tarteaucitron.services.sharethissticky = {
    "key": "sharethissticky",
    "type": "social",
    "name": "ShareThis Sticky",
    "uri": "https://sharethis.com/fr/privacy/",
    "needConsent": true,
    "cookies": ['_stid','_stidv','pubconsent'],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.sharethisStickyProperty === undefined) {
            return;
        }

        tarteaucitron.addScript("https://platform-api.sharethis.com/js/sharethis.js#property=" + tarteaucitron.user.sharethisStickyProperty + "&product=sticky-share-buttons");
    }
};

// pianoanalytics
tarteaucitron.services.pianoanalytics = {
    "key": "pianoanalytics",
    "type": "analytic",
    "name": "Piano Analytics",
    "uri": "https://piano.io/privacy-policy/",
    "needConsent": true,
    "cookies": ['_pcid','_pctx','_pctx','pa_user', 'pa_privacy'],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.pianoCollectDomain === undefined || tarteaucitron.user.pianoSite === undefined) {
            return;
        }

        tarteaucitron.addScript("https://tag.aticdn.net/piano-analytics.js", '', function () {

            pa.setConfigurations({
                site: tarteaucitron.user.pianoSite,
                collectDomain: tarteaucitron.user.pianoCollectDomain
            });

            if (tarteaucitron.user.pianoSendData !== false) {
                pa.sendEvent('page.display', {
                    'page': document.title
                });
            }
        });
    }
};

// actistat
tarteaucitron.services.actistat = {
    "key": "actistat",
    "type": "analytic",
    "name": "ActiSTAT",
    "uri": "https://actigraph.com/actistat",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.actistatId === undefined) {
            return;
        }

        tarteaucitron.addScript('https://actistat.fr/umami.js', '', '', '', 'data-website-id', tarteaucitron.user.actistatId);
    }
};

// outbrainamplify
tarteaucitron.services.outbrainamplify = {
    "key": "outbrainamplify",
    "type": "ads",
    "name": "Outbrain Amplify",
    "uri": "https://www.outbrain.com/privacy/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.outbrainamplifyId === undefined) {
            return;
        }

        var OB_ADV_ID = tarteaucitron.user.outbrainamplifyId;
        if (window.obApi) {
            var toArray = function(object) {
                return Object.prototype.toString.call(object) === '[object Array]' ? object : [object];
            };
            window.obApi.marketerId = toArray(_window.obApi.marketerId).concat(toArray(OB_ADV_ID));
            return;
        }
        var api = window.obApi = function() {
            api.dispatch ? api.dispatch.apply(api, arguments) : api.queue.push(arguments);
        };
        api.version = '1.1';
        api.loaded = true;
        api.marketerId = OB_ADV_ID;
        api.queue = [];

        tarteaucitron.addScript('https://amplify.outbrain.com/cp/obtp.js', '', function () {
            obApi('track', 'PAGE_VIEW');
        });
    }
};

// playplay
tarteaucitron.services.playplay = {
    "key": "playplay",
    "type": "video",
    "name": "PlayPlay",
    "uri": "https://playplay.com/fr/confidentialite",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        tarteaucitron.fallback(['tac_playplay'], function (x) {
            var frame_title = (tarteaucitron.getElemAttr(x,"title")) ? tarteaucitron.getElemAttr(x,"title") : 'Playplay iframe',
                id = tarteaucitron.getElemAttr(x, "data-id"),
                width = tarteaucitron.getElemAttr(x, "width"),
                height = tarteaucitron.getElemAttr(x, "height");

            var playURL = "https://playplay.com/app/embed-video/" + id;

            var styleAttr = (width !== "" ? "width:" + parseInt(width, 10) + "px;" : "") + (height !== "" ? "height:" + parseInt(height, 10) + "px;" : "");

            return "<iframe title=\"" + frame_title + "\" style=\"" + styleAttr + "border:0;\" src=\"" + playURL + "\" allowfullscreen></iframe>";
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'playplay';
        tarteaucitron.fallback(['tac_playplay'], function (elem) {
            return tarteaucitron.engage(id);
        });
    }
};

// adobeworkspace
tarteaucitron.services.adobeworkspace = {
    "key": "adobeworkspace",
    "type": "analytic",
    "name": "Adobe - Analysis Workspace",
    "uri": "https://www.adobe.com/privacy/policy.html",
    "needConsent": true,
    "cookies": ['s_ecid', 's_cc', 's_sq', 's_vi', 's_fid'],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.adobeworkspaceId1 === undefined || tarteaucitron.user.adobeworkspaceId2 === undefined || tarteaucitron.user.adobeworkspaceId3 === undefined) {
            return;
        }

        tarteaucitron.addScript('https://assets.adobedtm.com/'+tarteaucitron.user.adobeworkspaceId1+'/'+tarteaucitron.user.adobeworkspaceId2+'/launch-'+tarteaucitron.user.adobeworkspaceId3+'.min.js');
    }
};

// zohopagesense
tarteaucitron.services.zohopagesense = {
    "key": "zohopagesense",
    "type": "analytic",
    "name": "Zoho PageSense",
    "uri": "https://www.zoho.com/pagesense/cookie-policy.html",
    "needConsent": true,
    "cookies": ["zab_g_", "zabUserID", "zabVisitID", "zabSplit", "zabBucket", "zabHMBucket", "zpsfa_", "zfa", "zsr", "zabme", "zsd", "ps_payloadSeqId", "zabPZBucket", "zPersonalization", "zia_", "zpc", "zps_permission_status", "zps-tgr-dts", "zpspolls_", "zpsPollsBucket", "zpspb", "zpsPopupBucket", "zpssr", "zab_g_", "zab_", "zPersonalization"],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.zohoPageSenseProjectId === undefined || tarteaucitron.user.zohoPageSenseScriptHash === undefined) {
            return;
        }
        tarteaucitron.addScript('https://cdn-eu.pagesense.io/js/' + tarteaucitron.user.zohoPageSenseProjectId + '/' + tarteaucitron.user.zohoPageSenseScriptHash + '.js');
    }
};

// leadinfo
tarteaucitron.services.leadinfo = {
    "key": "leadinfo",
    "type": "analytic",
    "name": "Leadinfo",
    "uri": "https://www.leadinfo.com/en/privacy/",
    "needConsent": true,
    "cookies": ['_li_id', '_li_ses'],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.leadinfoId === undefined) {
            return;
        }

        window.GlobalLeadinfoNamespace = window.GlobalLeadinfoNamespace || [];
        window.GlobalLeadinfoNamespace.push("leadinfo");
        window["leadinfo"] = function() {
            (window["leadinfo"].q = window["leadinfo"].q || []).push(arguments)
        };
        window["leadinfo"].t = window["leadinfo"].t || tarteaucitron.user.leadinfoId;
        window["leadinfo"].q = window["leadinfo"].q || [];

        tarteaucitron.addScript('https://cdn.leadinfo.net/ping.js');
    }
};

// force24
tarteaucitron.services.force24 = {
    "key": "force24",
    "type": "analytic",
    "name": "Force24",
    "uri": "https://support.force24.co.uk/support/solutions/articles/79000128057-cookie-policies",
    "needConsent": true,
    "cookies": ['F24_autoID', 'F24_personID'],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.force24trackingId === undefined || tarteaucitron.user.force24clientId === undefined) {
            return;
        }

        window.Force24Object = "f24", window["f24"] = window["f24"] || function() {
            window["f24"].q = window["f24"].q || [],
                window["f24"].q.push(arguments)
        }, window["f24"].l = 1 * new Date;

        tarteaucitron.addScript('https://static.websites.data-crypt.com/scripts/activity/v3/inject-v3.min.js');

        f24('config', 'set_tracking_id', tarteaucitron.user.force24trackingId);
        f24('config', 'set_client_id', tarteaucitron.user.force24clientId);
    }
};

// tiktokvideo
tarteaucitron.services.tiktokvideo = {
    "key": "tiktokvideo",
    "type": "video",
    "name": "Tiktok Video",
    "uri": "https://www.tiktok.com/legal/page/eea/privacy-policy/en",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        tarteaucitron.addScript('https://www.tiktok.com/embed.js');
    },
    "fallback": function () {
        "use strict";
        var id = 'tiktokvideo';
        tarteaucitron.fallback(['tiktok-embed'], function (elem) {
            return tarteaucitron.engage(id);
        });
    }
};

// shinystat
tarteaucitron.services.shinystat = {
    "key": "shinystat",
    "type": "analytic",
    "name": "Shinystat",
    "uri": "https://www.shinystat.com/en/opt-out.html",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.shinystatUser === undefined) {
            return;
        }

        tarteaucitron.addScript('https://codice.shinystat.com/cgi-bin/getcod.cgi?USER=' + tarteaucitron.user.shinystatUser);
    }
};

// activecampaignvgo
tarteaucitron.services.activecampaignvgo = {
    "key": "activecampaignvgo",
    "type": "other",
    "name": "Active Campaign",
    "uri": "https://www.activecampaign.com/legal/privacy-policy/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.activecampaignAccount === undefined) {
            return;
        }

        window.visitorGlobalObjectAlias="vgo";
        window[window.visitorGlobalObjectAlias]=window[window.visitorGlobalObjectAlias]||function(){(window[window.visitorGlobalObjectAlias].q=window[window.visitorGlobalObjectAlias].q||[]).push(arguments)};
        window[window.visitorGlobalObjectAlias].l=(new Date).getTime();

        tarteaucitron.addScript('https://diffuser-cdn.app-us1.com/diffuser/diffuser.js', '', function () {
            vgo('setAccount', tarteaucitron.user.activecampaignAccount);
            vgo('setTrackByDefault', true);
            vgo('process');
        });
    }
};

// Brevo (formerly sendinblue)
tarteaucitron.services.sendinblue = {
    "key": "sendinblue",
    "type": "other",
    "name": "Brevo (formerly sendinblue)",
    "uri": "https://www.brevo.com/fr/legal/cookies/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.sendinblueKey === undefined) {
            return;
        }

        window.sib = {equeue: [], client_key: tarteaucitron.user.sendinblueKey};
        window.sendinblue = {};
        for (var j = ['track', 'identify', 'trackLink', 'page'], i = 0; i < j.length; i++) {
            (function(k) {
                window.sendinblue[k] = function() {
                    var arg = Array.prototype.slice.call(arguments);
                    (window.sib[k] || function() {
                        var t = {};
                        t[k] = arg;
                        window.sib.equeue.push(t);
                    })(arg[0], arg[1], arg[2], arg[3]);
                };
            })(j[i]);
        }

        tarteaucitron.addScript('https://sibautomation.com/sa.js?key=' + window.sib.client_key, 'sendinblue-js', function () {
            window.sendinblue.page();
        });
    }
};

// collectchat
tarteaucitron.services.collectchat = {
    "key": "collectchat",
    "type": "other",
    "name": "Collect Chat",
    "uri": "https://collect.chat/privacy/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.collectchatId === undefined) {
            return;
        }

        window.CollectId = tarteaucitron.user.collectchatId;

        tarteaucitron.addScript('https://collectcdn.com/launcher.js');
    }
};

// eulerian
tarteaucitron.services.eulerian = {
    "key": "eulerian",
    "type": "analytic",
    "name": "Eulerian",
    "uri": "https://www.eulerian.com/rgpd",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.eulerianHost === undefined) {
            return;
        }

        (function(e,a){var i=e.length,y=5381,k='script',s=window,v=document,o=v.createElement(k);for(;i;){i-=1;y=(y*33)^e.charCodeAt(i)}y='_EA_'+(y>>>=0);(function(e,a,s,y){s[a]=s[a]||function(){(s[y]=s[y]||[]).push(arguments);s[y].eah=e;};}(e,a,s,y));i=new Date/1E7|0;o.ea=y;y=i%26;o.async=1;o.src='//'+e+'/'+String.fromCharCode(97+y,122-y,65+y)+(i%1E3)+'.js?2';s=v.getElementsByTagName(k)[0];s.parentNode.insertBefore(o,s);})
        (tarteaucitron.user.eulerianHost,'EA_push');
        EA_push();
    }
};

// posthog
tarteaucitron.services.posthog = {
    "key": "posthog",
    "type": "other",
    "name": "Posthog",
    "uri": "https://posthog.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.posthogApiKey === undefined || tarteaucitron.user.posthogHost === undefined) {
            return;
        }

        !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);

        posthog.init(tarteaucitron.user.posthogApiKey, {api_host: tarteaucitron.user.posthogHost});

    }
};

// googlesignin
tarteaucitron.services.googlesignin = {
    "key": "googlesignin",
    "type": "other",
    "name": "Google Signin",
    "uri": "https://policies.google.com/technologies/cookies#types-of-cookies",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        tarteaucitron.addScript('https://accounts.google.com/gsi/client');
    }
};

// calendly
tarteaucitron.services.calendly = {
    "key": "calendly",
    "type": "other",
    "name": "Calendly",
    "uri": "https://calendly.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['calendly-inline-widget'], '');
        tarteaucitron.addScript('https://assets.calendly.com/assets/external/widget.js');
    },
    "fallback": function () {
        "use strict";
        var id = 'calendly';
        tarteaucitron.fallback(['calendly-inline-widget'], function (elem) {
            return tarteaucitron.engage(id);
        });
    }
};

// tolkai
tarteaucitron.services.tolkai = {
    "key": "tolkai",
    "type": "other",
    "name": "tolk.ai",
    "uri": "https://www.tolk.ai/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.tolkaiBot === undefined) {
            return;
        }

        window.tcfbot = tarteaucitron.user.tolkaiBot;
        window.TcfWbchtParams = { behaviour: 'default' };
        window.display = 'iframe';
        tarteaucitron.addScript('https://script.tolk.ai/iframe-latest.js');
    }
};

// kwanko
tarteaucitron.services.kwanko = {
    "key": "kwanko",
    "type": "ads",
    "name": "Kwanko",
    "uri": "https://www.kwanko.com/fr/rgpd/politique-gestion-donnees/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['tac_kwanko'], function (x) {
            var mclic = tarteaucitron.getElemAttr(x, "data-mclic");

            return '<img src="https://action.metaffiliation.com/trk.php?mclic=' + mclic + '" width="1" height="1" />';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'kwanko';
        tarteaucitron.fallback(['tac_kwanko'], function (elem) {
            return tarteaucitron.engage(id);
        });
    }
};

// leadforensics
tarteaucitron.services.leadforensics = {
    "key": "leadforensics",
    "type": "ads",
    "name": "Lead Forensics",
    "uri": "https://www.leadforensics.com/cookie-policy/",
    "needConsent": true,
    "cookies": ['ifuuid'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.leadforensicsId === undefined) {
            return;
        }

        tarteaucitron.addScript('https://secure.team8save.com/js/sc/'+ tarteaucitron.user.leadforensicsId +'.js');
    }
};

// ubib
tarteaucitron.services.ubib = {
    "key": "ubib",
    "type": "support",
    "name": "Ubib Chatbot",
    "uri": "https://ubib.libanswers.com/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.ubibId === undefined || tarteaucitron.user.ubibHash === undefined) {
            return;
        }

        tarteaucitron.addScript('https://' + tarteaucitron.user.ubibId + '.libanswers.com/load_chat.php?hash=' + tarteaucitron.user.ubibHash);
    }
};

// wysistathightrack
tarteaucitron.services.wysistathightrack = {
    "key": "wysistathightrack",
    "type": "analytic",
    "name": "Wysistat (privacy by design)",
    "uri": "https://www.wysistat.net/webanalytics/exemption-cnil/",
    "needConsent": false,
    "cookies": ['wysistat'],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.wysistatNom === undefined) {
            return;
        }

        window._wsq = window._wsq || [];
        window._wsq.push(['_setNom', tarteaucitron.user.wysistatNom]);
        window._wsq.push(['_wysistat']);

        tarteaucitron.addScript('https://www.wysistat.com/ws.jsa');
    }
};

// robofabrica
tarteaucitron.services.robofabrica = {
    "key": "robofabrica",
    "type": "support",
    "name": "Robo Fabrica Chatbot",
    "uri": "https://robofabrica.tech/charte-vie-privee/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.robofabricaUuid === undefined) {
            return;
        }

        tarteaucitron.addScript('https://app.robofabrica.tech/widget/script', 'inceptive-cw-script', function() {

            document.getElementById('inceptive-cw-script').setAttribute('unique-url', tarteaucitron.user.robofabricaUuid);
            document.getElementById('inceptive-cw-script').setAttribute('label', 'start');
            document.getElementById('inceptive-cw-script').setAttribute('launch-btn-id', 'inceptive-cw-launch');
            document.getElementById('inceptive-cw-script').setAttribute('chat-server-url', 'https://app.robofabrica.tech:443');

        });
    }
};

// trustpilot
tarteaucitron.services.trustpilot = {
    "key": "trustpilot",
    "type": "other",
    "name": "Trustpilot",
    "uri": "https://fr.legal.trustpilot.com/for-reviewers/end-user-privacy-terms",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['trustpilot-widget'], '');
        tarteaucitron.addScript('https://widget.trustpilot.com/bootstrap/v5/tp.widget.sync.bootstrap.min.js');
    },
    "fallback": function () {
        "use strict";
        var id = 'trustpilot';
        tarteaucitron.fallback(['trustpilot-widget'], function (elem) {
            elem.style.width = tarteaucitron.getElemAttr(elem, 'data-style-width');
            elem.style.height = tarteaucitron.getElemAttr(elem, 'data-style-height');
            return tarteaucitron.engage(id);
        });
    }
};

// snapchat
tarteaucitron.services.snapchat = {
    "key": "snapchat",
    "type": "analytic",
    "name": "Snapchat",
    "uri": "https://snap.com/fr-FR/privacy/privacy-policy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.snapchatId === undefined) {
            return;
        }

        var a = window.snaptr = function() {
            a.handleRequest ? a.handleRequest.apply(a, arguments) : a.queue.push(arguments)
        };
        a.queue = [];

        if (tarteaucitron.user.snapchatEmail === undefined) {
            window.snaptr('init', tarteaucitron.user.snapchatId);
        } else {
            window.snaptr('init', tarteaucitron.user.snapchatId, {
                'user_email': tarteaucitron.user.snapchatEmail
            });
        }
        window.snaptr('track', 'PAGE_VIEW');

        tarteaucitron.addScript('https://sc-static.net/scevent.min.js');

        if (typeof tarteaucitron.user.snapchatMore === 'function') {
            tarteaucitron.user.snapchatMore();
        }
    }
};

// antvoice
tarteaucitron.services.antvoice = {
    "key": "antvoice",
    "type": "ads",
    "name": "antvoice",
    "uri": "https://www.antvoice.com/fr/privacy-policy/",
    "needConsent": true,
    "cookies": ['antvoice'],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.antvoiceId === undefined) {
            return;
        }

        window.avDataLayer = window.avDataLayer || [];
        window.avtag = window.avtag || function(_cmd,_p) {
            window.avDataLayer.push({cmd:_cmd,p:_p});
        }
        window.avtag('setConsent', {consent:true});
        window.avtag('init', {id: tarteaucitron.user.antvoiceId});

        tarteaucitron.addScript('https://static.avads.net/avtag.min.js');
    }
};

// plausible
tarteaucitron.services.plausible = {
    "key": "plausible",
    "type": "analytic",
    "name": "Plausible",
    "uri": "https://plausible.io/privacy",
    "needConsent": false,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.plausibleDomain === undefined) {
            return;
        }

        tarteaucitron.addScript('https://plausible.io/js/script.js', '', '', '', 'data-domain', tarteaucitron.user.plausibleDomain);
    }
};

// videas
tarteaucitron.services.videas = {
    "key": "videas",
    "type": "video",
    "name": "Videas",
    "uri": "https://videas.fr/fr/legal",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['tac_videas'], function (x) {
            var frame_title = tarteaucitron.getElemAttr(x, "title") || 'Videas iframe',
                width = tarteaucitron.getElemAttr(x, "width"),
                height = tarteaucitron.getElemAttr(x, "height"),
                id = tarteaucitron.getElemAttr(x, "data-id"),
                allowfullscreen = tarteaucitron.getElemAttr(x, "allowfullscreen");

            var styleAttr = (width !== "" ? "width:" + parseInt(width, 10) + "px;" : "") + (height !== "" ? "height:" + parseInt(height, 10) + "px;" : "");

            return '<iframe title="' + frame_title + '" src="https://app.videas.fr/embed/' + id + '/" style="' + styleAttr + '" allowtransparency ' + (allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'videas';
        tarteaucitron.fallback(['tac_videas'], function (elem) {
            elem.style.width = tarteaucitron.getElemAttr(elem, 'width') + 'px';
            elem.style.height = tarteaucitron.getElemAttr(elem, 'height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// myfeelback
tarteaucitron.services.myfeelback = {
    "key": "myfeelback",
    "type": "api",
    "name": "MyFeelBack (Skeepers)",
    "uri": "https://help.myfeelback.com/fr/quels-sont-les-cookies-d%C3%A9pos%C3%A9s-par-un-dispositif-de-collecte-myfeelback",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.myfeelbackId === undefined) {
            return;
        }

        window._Mfb_useCookie = true;
        window._Mfb_ud = {
            var1: undefined,
            var2: undefined,
            varN: undefined,
            _context: {
                lang: undefined,
                privacyMode: false,
                _page: {
                    url: location.pathname,
                    storageDuration: 30
                }
            }
        };
        tarteaucitron.addScript('https://actorssl-5637.kxcdn.com/actor/'+tarteaucitron.user.myfeelbackId+'/action', 'MFBActor');
    }
};

// arcio
tarteaucitron.services.arcio = {
    "key": "arcio",
    "type": "api",
    "name": "Arc.io",
    "uri": "https://arc.io/about",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.arcId === undefined) {
            return;
        }

        tarteaucitron.addScript('https://arc.io/widget.min.js#'+tarteaucitron.user.arcId);
    }
};

// doubleclick
tarteaucitron.services.doubleclick = {
    "key": "doubleclick",
    "type": "ads",
    "name": "DoubleClick",
    "uri": "https://support.google.com/admanager/answer/2839090",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['doubleclick_container'], function (x) {
            var frame_title = (tarteaucitron.getElemAttr(x,"title")) ? tarteaucitron.getElemAttr(x,"title") : 'Doubleclick iframe',
                id1 = tarteaucitron.getElemAttr(x, "data-id1"),
                id2 = tarteaucitron.getElemAttr(x, "data-id2"),
                type = tarteaucitron.getElemAttr(x, "data-type"),
                cat = tarteaucitron.getElemAttr(x, "data-cat"),
                item = tarteaucitron.getElemAttr(x, "data-item"),
                quantity = tarteaucitron.getElemAttr(x, "data-quantity"),
                price = tarteaucitron.getElemAttr(x, "data-price"),
                postage = tarteaucitron.getElemAttr(x, "data-postage"),
                seller = tarteaucitron.getElemAttr(x, "data-seller"),
                gdpr = tarteaucitron.getElemAttr(x, "data-gdpr"),
                gdpr_consent = tarteaucitron.getElemAttr(x, "data-gdpr-consent"),
                ord = tarteaucitron.getElemAttr(x, "data-ord"),
                num = tarteaucitron.getElemAttr(x, "data-num");

            return '<iframe title="' + frame_title + '" src="https://'+id1+'.fls.doubleclick.net/activityi;src='+id2+';type='+type+';cat='+cat+';item='+item+';quantity='+quantity+';price='+price+';postage='+postage+';seller='+seller+';gdpr='+gdpr+';gdpr_consent='+gdpr_consent+';num='+num+';ord='+ord+'?" style="width:1px;height:1px;display:none"></iframe>';
        });
    }
};

// userpilot
tarteaucitron.services.userpilot = {
    "key": "userpilot",
    "type": "analytic",
    "name": "UserPilot",
    "uri": "https://userpilot.com/privacy-policy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.userpilotToken === undefined) {
            return;
        }

        window.userpilotSettings = {token: tarteaucitron.user.userpilotToken};
        tarteaucitron.addScript('https://js.userpilot.io/sdk/latest.js');
    }
};

tarteaucitron.services.piwikpro = {
    "key": "piwikpro",
    "type": "analytic",
    "name": "Piwik Pro",
    "uri": "https://piwik.pro/privacy-policy/",
    "needConsent": true,
    "cookies": ['_pk_ref', '_pk_cvar', '_pk_id', '_pk_ses', '_pk_hsr', 'piwik_ignore', '_pk_uid'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.piwikProId === undefined || tarteaucitron.user.piwikProContainer === undefined) {
            return;
        }

        window['dataLayer'] = window['dataLayer'] || [], window['dataLayer'].push({
            start: (new Date).getTime(),
            event: "stg.start"
        });

        function stgCreateCookie(a, b, c) {
            var d = "";
            if (c) {
                var e = new Date;
                e.setTime(e.getTime() + 24 * c * 60 * 60 * 1e3), d = "; expires=" + e.toUTCString()
            }
            document.cookie = a + "=" + b + d + "; path=/"
        }

        var isStgDebug = (window.location.href.match("stg_debug") || document.cookie.match("stg_debug")) && !window.location.href.match("stg_disable_debug");
        stgCreateCookie("stg_debug", isStgDebug ? 1 : "", isStgDebug ? 14 : -1);
        var qP = [];

        var qPString = qP.length > 0 ? ("?" + qP.join("&")) : "";
        tarteaucitron.addScript('https://'+tarteaucitron.user.piwikProContainer+'.containers.piwik.pro/'+tarteaucitron.user.piwikProId+'.js'+qPString);

        ! function(a, n, i) {
            a[n] = a[n] || {};
            for (var c = 0; c < i.length; c++) ! function(i) {
                a[n][i] = a[n][i] || {}, a[n][i].api = a[n][i].api || function() {
                    var a = [].slice.call(arguments, 0);
                    "string" == typeof a[0] && window['dataLayer'].push({
                        event: n + "." + i + ":" + a[0],
                        parameters: [].slice.call(arguments, 1)
                    })
                }
            }(i[c])
        }(window, "ppms", ["tm", "cm"]);
    }
};

// pinterestpixel
tarteaucitron.services.pinterestpixel = {
    "key": "pinterestpixel",
    "type": "ads",
    "name": "Pinterest Pixel",
    "uri": "https://help.pinterest.com/fr/business/article/track-conversions-with-pinterest-tag",
    "needConsent": true,
    "cookies": ['_pinterest_sess', '_pinterest_ct', '_pinterest_ct_mw', '_pinterest_ct_rt', '_epik', '_derived_epik', '_pin_unauth', '_pinterest_ct_ua'],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.pinterestpixelId === undefined) {
            return;
        }

        if (!window.pintrk) {
            window.pintrk = function () {
                window.pintrk.queue.push(Array.prototype.slice.call(arguments));
            };

            var n = window.pintrk;
            n.queue = [];
            n.version = "3.0";

            tarteaucitron.addScript('https://s.pinimg.com/ct/core.js', '', function () {
                window.pintrk('load', tarteaucitron.user.pinterestpixelId);
                window.pintrk('page');
            });
        }
    }
};

// elfsight
tarteaucitron.services.elfsight = {
    "key": "elfsight",
    "type": "support",
    "name": "Elfsight",
    "uri": "https://elfsight.com/privacy-policy/",
    "needConsent": true,
    "cookies": ['__cfduid', '_p_hfp_client_id', 'session_id'],
    "js": function () {
        "use strict";

        tarteaucitron.addScript('https://apps.elfsight.com/p/platform.js');
    }
};

// plezi
tarteaucitron.services.plezi = {
    "key": "plezi",
    "type": "analytic",
    "name": "Plezi",
    "uri": "https://www.plezi.co/fr/mentions-legales/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.pleziTenant === undefined || tarteaucitron.user.pleziTw === undefined) {
            return;
        }

        tarteaucitron.addScript('https://brain.plezi.co/api/v1/analytics?tenant=' + tarteaucitron.user.pleziTenant + '&tw=' + tarteaucitron.user.pleziTw);
    }
};


// smartsupp
tarteaucitron.services.smartsupp = {
    "key": "smartsupp",
    "type": "support",
    "name": "Smartsupp",
    "uri": "https://www.smartsupp.com/help/privacy/",
    "needConsent": true,
    "cookies": ['ssupp.vid', 'ssupp.visits', 'AWSALB', 'AWSALBCORS'],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.smartsuppKey === undefined) {
            return;
        }

        window._smartsupp = window._smartsupp || {};
        window._smartsupp.key = tarteaucitron.user.smartsuppKey;
        window.smartsupp = function () {
            window.smartsupp._.push(arguments)
        };
        window.smartsupp._ = [];

        tarteaucitron.addScript('https://www.smartsuppchat.com/loader.js');
    }
};



// sharpspring
tarteaucitron.services.sharpspring = {
    "key": "sharpspring",
    "type": "analytic",
    "name": "SharpSpring",
    "uri": "https://sharpspring.com/legal/sharpspring-cookie-policy/",
    "needConsent": true,
    "cookies": ['koitk', '__ss', '__ss_tk', '__ss_referrer'],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.ssId === undefined || tarteaucitron.user.ssAccount === undefined) {
            return;
        }

        window._ss = window._ss || [];
        window._ss.push(['_setDomain', 'https://' + tarteaucitron.user.ssId + '.marketingautomation.services/net']);
        window._ss.push(['_setAccount', tarteaucitron.user.ssAccount]);
        window._ss.push(['_trackPageView']);

        window._pa = window._pa || {};

        tarteaucitron.addScript('https://' + tarteaucitron.user.ssId + '.marketingautomation.services/client/ss.js');
    }
};

// pardot
tarteaucitron.services.pardot = {
    "key": "pardot",
    "type": "analytic",
    "name": "Pardot",
    "uri": "https://www.salesforce.com/company/privacy/full_privacy/",
    "needConsent": true,
    "cookies": ['visitor_id'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.piAId === undefined || tarteaucitron.user.piCId === undefined) {
            return;
        }

        window.piAId = tarteaucitron.user.piAId;
        window.piCId = tarteaucitron.user.piCId;
        window.piHostname = 'pi.pardot.com';

        tarteaucitron.addScript('https://pi.pardot.com/pd.js');
    }
};

// Open Web Analytics
tarteaucitron.services.openwebanalytics = {
    "key": "openwebanalytics",
    "type": "analytic",
    "name": "Open Web Analytics",
    "uri": "",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.openwebanalyticsId === undefined || tarteaucitron.user.openwebanalyticsHost === undefined) {
            return;
        }

        window.owa_baseUrl = tarteaucitron.user.openwebanalyticsHost;
        window.owa_cmds = window.owa_cmds || [];
        window.owa_cmds.push(['setSiteId', tarteaucitron.user.openwebanalyticsId]);
        window.owa_cmds.push(['trackPageView']);
        window.owa_cmds.push(['trackClicks']);

        tarteaucitron.addScript(window.owa_baseUrl + 'modules/base/js/owa.tracker-combined-min.js');
    }
};

// xandr universal pixel
// https://docs.xandr.com/bundle/invest_invest-standard/page/topics/universal-pixel-overview.html
tarteaucitron.services.xandr = {
    "key": "xandr",
    "type": "ads",
    "name": "Xandr (Universal)",
    "uri": "https://www.xandr.com/privacy/cookie-policy/",
    "needConsent": true,
    "cookies": ['uuid2', 'uids', 'sess', 'icu', 'anj', 'usersync'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.xandrId === undefined) {
            return;
        }

        if (!window.pixie) {
            var n = window.pixie = function (e, i, a) {
                n.actionQueue.push({
                    action: e,
                    actionValue: i,
                    params: a
                })
            };
            n.actionQueue = [];
        }

        tarteaucitron.addScript('https://acdn.adnxs.com/dmp/up/pixie.js', '', function () {
            window.pixie('init', tarteaucitron.user.xandrId);
            window.pixie('event', 'PageView');
        });
    }
};

// xandr segment
// https://docs.xandr.com/bundle/invest_invest-standard/page/topics/segment-pixels-advanced.html
tarteaucitron.services.xandrsegment = {
    "key": "xandrsegment",
    "type": "ads",
    "name": "Xandr (Segment)",
    "uri": "https://www.xandr.com/privacy/cookie-policy/",
    "needConsent": true,
    "cookies": ['uuid2', 'uids', 'sess', 'icu', 'anj', 'usersync'],
    "js": function () {
        "use strict";
        var uniqIds = [],
            i,
            uri;

        tarteaucitron.fallback(['xandrsegment-canvas'], function (x) {
            var uniqId = '_' + Math.random().toString(36).substr(2, 9);
            uniqIds.push(uniqId);
            return '<div id="' + uniqId + '" xandrsegmentAdd="' + tarteaucitron.getElemAttr(x, 'xandrsegmentAdd') + '" xandrsegmentAddCode="' + tarteaucitron.getElemAttr(x, 'xandrsegmentAddCode') + '" xandrsegmentRemove="' + tarteaucitron.getElemAttr(x, 'xandrsegmentRemove') + '" xandrsegmentRemoveCode="' + tarteaucitron.getElemAttr(x, 'xandrsegmentRemoveCode') + '" xandrsegmentMember="' + tarteaucitron.getElemAttr(x, 'xandrsegmentMember') + '" xandrsegmentRedir="' + tarteaucitron.getElemAttr(x, 'xandrsegmentRedir') + '" xandrsegmentValue="' + tarteaucitron.getElemAttr(x, 'xandrsegmentValue') + '" xandrsegmentOther="' + tarteaucitron.getElemAttr(x, 'xandrsegmentOther') + '"></div>';
        });

        for (i = 0; i < uniqIds.length; i += 1) {
            uri = '//ib.adnxs.com/seg?t=2&';
            uri += 'add=' + tarteaucitron.getElemAttr(document.getElementById(uniqIds[i]), 'xandrsegmentAdd') + '&';
            uri += 'add_code=' + tarteaucitron.getElemAttr(document.getElementById(uniqIds[i]), 'xandrsegmentAddCode') + '&';
            uri += 'remove=' + tarteaucitron.getElemAttr(document.getElementById(uniqIds[i]), 'xandrsegmentRemove') + '&';
            uri += 'remove_code=' + tarteaucitron.getElemAttr(document.getElementById(uniqIds[i]), 'xandrsegmentRemoveCode') + '&';
            uri += 'member=' + tarteaucitron.getElemAttr(document.getElementById(uniqIds[i]), 'xandrsegmentMember') + '&';
            uri += 'redir=' + tarteaucitron.getElemAttr(document.getElementById(uniqIds[i]), 'xandrsegmentRedir') + '&';
            uri += 'value=' + tarteaucitron.getElemAttr(document.getElementById(uniqIds[i]), 'xandrsegmentValue') + '&';
            uri += 'other=' + tarteaucitron.getElemAttr(document.getElementById(uniqIds[i]), 'xandrsegmentOther');

            document.getElementById(uniqIds[i]).innerHTML = '<img src=\'' + uri + '\' width=\'1\' height=\'1\' />';
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'xandrsegment';
        tarteaucitron.fallback(['xandrsegment-canvas'], tarteaucitron.engage(id));
    }
};

// xandr conversion
// https://docs.xandr.com/bundle/invest_invest-standard/page/topics/working-with-conversion-pixels.html
tarteaucitron.services.xandrconversion = {
    "key": "xandrconversion",
    "type": "ads",
    "name": "Xandr (Conversion)",
    "uri": "https://www.xandr.com/privacy/cookie-policy/",
    "needConsent": true,
    "cookies": ['uuid2', 'uids', 'sess', 'icu', 'anj', 'usersync'],
    "js": function () {
        "use strict";
        var uniqIds = [],
            i,
            uri;

        tarteaucitron.fallback(['xandrconversion-canvas'], function (x) {
            var uniqId = '_' + Math.random().toString(36).substr(2, 9);
            uniqIds.push(uniqId);
            return '<div id="' + uniqId + '" xandrconversionId="' + tarteaucitron.getElemAttr(x, 'xandrconversionId') + '" xandrconversionSeg="' + tarteaucitron.getElemAttr(x, 'xandrconversionSeg') + '" xandrconversionOrderId="' + tarteaucitron.getElemAttr(x, 'xandrconversionOrderId') + '" xandrconversionValue="' + tarteaucitron.getElemAttr(x, 'xandrconversionValue') + '" xandrconversionRedir="' + tarteaucitron.getElemAttr(x, 'xandrconversionRedir') + '" xandrconversionOther="' + tarteaucitron.getElemAttr(x, 'xandrconversionOther') + '"></div>';
        });

        for (i = 0; i < uniqIds.length; i += 1) {
            uri = '//ib.adnxs.com/px?t=2&';
            uri += 'id=' + tarteaucitron.getElemAttr(document.getElementById(uniqIds[i]), 'xandrconversionId') + '&';
            uri += 'seg=' + tarteaucitron.getElemAttr(document.getElementById(uniqIds[i]), 'xandrconversionSeg') + '&';
            uri += 'order_id=' + tarteaucitron.getElemAttr(document.getElementById(uniqIds[i]), 'xandrconversionOrderId') + '&';
            uri += 'value=' + tarteaucitron.getElemAttr(document.getElementById(uniqIds[i]), 'xandrconversionValue') + '&';
            uri += 'redir=' + tarteaucitron.getElemAttr(document.getElementById(uniqIds[i]), 'xandrconversionRedir') + '&';
            uri += 'other=' + tarteaucitron.getElemAttr(document.getElementById(uniqIds[i]), 'xandrconversionOther');

            document.getElementById(uniqIds[i]).innerHTML = '<img src=\'' + uri + '\' width=\'1\' height=\'1\' />';
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'xandrconversion';
        tarteaucitron.fallback(['xandrconversion-canvas'], tarteaucitron.engage(id));
    }
};

// helloasso
tarteaucitron.services.helloasso = {
    "key": "helloasso",
    "type": "api",
    "name": "HelloAsso",
    "uri": "https://www.helloasso.com/confidentialite",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['tac_helloasso'], function (x) {
            var frame_title = tarteaucitron.getElemAttr(x, "title") || 'HelloAsso iframe',
                width = tarteaucitron.getElemAttr(x, "width"),
                height = tarteaucitron.getElemAttr(x, "height"),
                url = tarteaucitron.getElemAttr(x, "data-url"),
                allowfullscreen = tarteaucitron.getElemAttr(x, "allowfullscreen");

            var styleAttr = (width !== "" ? "width:" + parseInt(width, 10) + "px;" : "") + (height !== "" ? "height:" + parseInt(height, 10) + "px;" : "");

            return '<iframe title="' + frame_title + '" id="haWidget" src="' + url + '" style="' + styleAttr + '" allowtransparency ' + (allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'helloasso';
        tarteaucitron.fallback(['tac_helloasso'], function (elem) {
            elem.style.width = tarteaucitron.getElemAttr(elem, 'width') + 'px';
            elem.style.height = tarteaucitron.getElemAttr(elem, 'height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// podcloud
tarteaucitron.services.podcloud = {
    "key": "podcloud",
    "type": "video",
    "name": "podCloud",
    "uri": "https://podcloud.fr/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['tac_podcloud'], function (x) {
            var frame_title = tarteaucitron.getElemAttr(x, "title") || 'podCloud iframe',
                width = tarteaucitron.getElemAttr(x, "width"),
                height = tarteaucitron.getElemAttr(x, "height"),
                url = tarteaucitron.getElemAttr(x, "data-url"),
                allowfullscreen = tarteaucitron.getElemAttr(x, "allowfullscreen");

            var styleAttr = (width !== "" ? "width:" + parseInt(width, 10) + "px;" : "") + (height !== "" ? "height:" + parseInt(height, 10) + "px;" : "");

            return '<iframe title="' + frame_title + '" src="' + url + '" style="' + styleAttr + '" allowtransparency ' + (allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'podcloud';
        tarteaucitron.fallback(['tac_podcloud'], function (elem) {
            elem.style.width = tarteaucitron.getElemAttr(elem, 'width') + 'px';
            elem.style.height = tarteaucitron.getElemAttr(elem, 'height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// facebookpost
tarteaucitron.services.facebookpost = {
    "key": "facebookpost",
    "type": "social",
    "name": "Facebook (post)",
    "uri": "https://www.facebook.com/policy.php",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['tac_facebookpost'], function (x) {
            var frame_title = tarteaucitron.getElemAttr(x, "title") || 'Facebook iframe',
                width = tarteaucitron.getElemAttr(x, "width"),
                height = tarteaucitron.getElemAttr(x, "height"),
                url = tarteaucitron.getElemAttr(x, "data-url"),
                appId = tarteaucitron.getElemAttr(x, "data-appid"),
                allowfullscreen = tarteaucitron.getElemAttr(x, "allowfullscreen"),
                showText = tarteaucitron.getElemAttr(x, "data-show-text");

            var styleAttr = (width !== "" ? "width:" + parseInt(width, 10) + "px;" : "") + (height !== "" ? "height:" + parseInt(height, 10) + "px;" : "");

            return '<iframe title="' + frame_title + '" src="https://www.facebook.com/plugins/post.php?href=' + encodeURIComponent(url) + '&amp;width=' + width + '&amp;show_text=false&amp;appId=' + appId + '&amp;show_text=' + showText + '&amp;height=' + height + '" style="' + styleAttr + '" allowtransparency ' + (allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'facebookpost';
        tarteaucitron.fallback(['tac_facebookpost'], function (elem) {
            elem.style.width = tarteaucitron.getElemAttr(elem, 'width') + 'px';
            elem.style.height = tarteaucitron.getElemAttr(elem, 'height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// amplitude
tarteaucitron.services.amplitude = {
    "key": "amplitude",
    "type": "analytic",
    "name": "Amplitude",
    "uri": "https://amplitude.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.amplitude === undefined) {
            return;
        }
        tarteaucitron.addScript('https://cdn.amplitude.com/libs/amplitude-5.8.0-min.gz.js', '', function () {

            window.amplitude = {
                _q: [],
                _iq: {}
            };
            function s(e, t) { e.prototype[t] = function () { this._q.push([t].concat(Array.prototype.slice.call(arguments, 0))); return this } }
            var o = function () { this._q = []; return this };
            var a = ["add", "append", "clearAll", "prepend", "set", "setOnce", "unset"];
            for (var u = 0; u < a.length; u++) { s(o, a[u]) }
            amplitude.Identify = o;
            var c = function () { this._q = []; return this };
            var l = ["setProductId", "setQuantity", "setPrice", "setRevenueType", "setEventProperties"];
            for (var p = 0; p < l.length; p++) { s(c, l[p]) }
            amplitude.Revenue = c;
            var d = ["init", "logEvent", "logRevenue", "setUserId", "setUserProperties", "setOptOut", "setVersionName", "setDomain", "setDeviceId", "enableTracking", "setGlobalUserProperties", "identify", "clearUserProperties", "setGroup", "logRevenueV2", "regenerateDeviceId", "groupIdentify", "onInit", "logEventWithTimestamp", "logEventWithGroups", "setSessionId", "resetSessionId"];
            function v(e) { function t(t) { e[t] = function () { e._q.push([t].concat(Array.prototype.slice.call(arguments, 0))) } } for (var n = 0; n < d.length; n++) { t(d[n]) } }
            v(amplitude);
            amplitude.getInstance = function (e) { e = (!e || e.length === 0 ? "$default_instance" : e).toLowerCase(); if (!amplitude._iq.hasOwnProperty(e)) { amplitude._iq[e] = { _q: [] }; v(amplitude._iq[e]) } return amplitude._iq[e] };

            amplitude.getInstance().init(tarteaucitron.user.amplitude);
        });
    }
};

// abtasty
tarteaucitron.services.abtasty = {
    "key": "abtasty",
    "type": "api",
    "name": "ABTasty",
    "uri": "https://www.abtasty.com/terms-of-use/",
    "needConsent": true,
    "cookies": ['ABTasty', 'ABTastySession'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.abtastyID === undefined) {
            return;
        }
        tarteaucitron.addScript('//try.abtasty.com/' + tarteaucitron.user.abtastyID + '.js');
    }
};


// yandex metrica
tarteaucitron.services.metrica = {
    "key": "metrica",
    "type": "analytic",
    "name": "Yandex Metrica",
    "uri": "https://yandex.com/legal/confidential/",
    "needConsent": true,
    "cookies": ['_ym_metrika_enabled', '_ym_isad', '_ym_uid', '_ym_d', 'yabs-sid', '_ym_debug', '_ym_mp2_substs', '_ym_hostIndex', '_ym_mp2_track', 'yandexuid', 'usst'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.yandexmetrica === undefined) {
            return;
        }
        tarteaucitron.addScript('https://mc.yandex.ru/metrika/tag.js', '', function () {

            (function (m, e, t, r, i, k, a) {
                m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments) };
                m[i].l = 1 * new Date(); k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a)
            })
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(tarteaucitron.user.yandexmetrica, "init", {
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true,
                webvisor: true,
                ecommerce: "dataLayer"
            });
        });
    }
};

// addthis
tarteaucitron.services.addthis = {
    "key": "addthis",
    "type": "social",
    "name": "AddThis",
    "uri": "https://www.addthis.com/privacy/privacy-policy#publisher-visitors",
    "needConsent": true,
    "cookies": ['__atuvc', '__atuvs'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.addthisPubId === undefined) {
            return;
        }
        if (tarteaucitron.isAjax === true) {
            window.addthis = null;
            window._adr = null;
            window._atc = null;
            window._atd = null;
            window._ate = null;
            window._atr = null;
            window._atw = null;
        }
        tarteaucitron.fallback(['addthis_inline_share_toolbox'], '');
        tarteaucitron.addScript('//s7.addthis.com/js/300/addthis_widget.js#pubid=' + tarteaucitron.user.addthisPubId);
    },
    "fallback": function () {
        "use strict";
        var id = 'addthis';
        tarteaucitron.fallback(['addthis_inline_share_toolbox'], tarteaucitron.engage(id));
    }
};

// addtoanyfeed
tarteaucitron.services.addtoanyfeed = {
    "key": "addtoanyfeed",
    "type": "social",
    "name": "AddToAny (feed)",
    "uri": "https://www.addtoany.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.addtoanyfeedUri === undefined) {
            return;
        }
        tarteaucitron.user.addtoanyfeedSubscribeLink = 'https://www.addtoany.com/subscribe?linkurl=' + tarteaucitron.user.addtoanyfeedUri;
        window.a2a_config = window.a2a_config || {};
        window.a2a_config.linkurl = tarteaucitron.user.addtoanyfeedUri;
        tarteaucitron.addScript('//static.addtoany.com/menu/feed.js');
    },
    "fallback": function () {
        "use strict";
        tarteaucitron.user.addtoanyfeedSubscribeLink = 'https://www.addtoany.com/subscribe?linkurl=' + tarteaucitron.user.addtoanyfeedUri;
    }
};

// addtoanyshare
tarteaucitron.services.addtoanyshare = {
    "key": "addtoanyshare",
    "type": "social",
    "name": "AddToAny (share)",
    "uri": "https://www.addtoany.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['tac_addtoanyshare'], function (elem) {
            elem.remove();
        }, true);
        tarteaucitron.addScript('//static.addtoany.com/menu/page.js');
    },
    "fallback": function () {
        "use strict";
        var id = 'addtoanyshare';
        tarteaucitron.fallback(['tac_addtoanyshare'], tarteaucitron.engage(id));
    }
};

// aduptech ads
tarteaucitron.services.aduptech_ads = {
    "key": "aduptech_ads",
    "type": "ads",
    "name": "Ad Up Technology (ads)",
    "uri": "https://www.adup-tech.com/datenschutz",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        var IDENTIFIER = "aduptech_ads",
            API_URL = "https://s.d.adup-tech.com/jsapi";

        var elements = document.getElementsByClassName(IDENTIFIER);
        if (!elements || elements.length === 0) {
            return;
        }

        tarteaucitron.fallback([IDENTIFIER], "");

        tarteaucitron.addScript(API_URL, "", function () {
            for (var i = 0; i < elements.length; i++) {
                var element = elements[i];

                if (!tarteaucitron.getElemAttr(element, "id")) {
                    element.setAttribute("id", IDENTIFIER + Math.random().toString(36).substr(2, 9));
                }

                window.uAd.embed(tarteaucitron.getElemAttr(element, "id"), {
                    placementKey: tarteaucitron.getElemAttr(element, "placementKey"),
                    responsive: Boolean(tarteaucitron.getElemAttr(element, "responsive")),
                    lazy: Boolean(tarteaucitron.getElemAttr(element, "lazy")),
                    adtest: Boolean(tarteaucitron.getElemAttr(element, "test")),
                    query: tarteaucitron.getElemAttr(element, "query") || "",
                    minCpc: tarteaucitron.getElemAttr(element, "minCpc") || "",
                    pageUrl: tarteaucitron.getElemAttr(element, "pageUrl") || "",
                    skip: tarteaucitron.getElemAttr(element, "skip") || ""
                });
            }
        });

    },
    "fallback": function () {
        "use strict";
        tarteaucitron.fallback(["aduptech_ads"], tarteaucitron.engage("aduptech_ads"));
    }
};

// aduptech conversion
tarteaucitron.services.aduptech_conversion = {
    "key": "aduptech_conversion",
    "type": "ads",
    "name": "Ad Up Technology (conversion)",
    "uri": "https://www.adup-tech.com/datenschutz",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        var IDENTIFIER = "aduptech_conversion",
            CONVERSION_PIXEL_BASE_URL = "https://d.adup-tech.com/campaign/conversion";

        var elements = document.getElementsByClassName(IDENTIFIER);
        if (!elements || elements.length === 0) {
            return;
        }

        tarteaucitron.fallback([IDENTIFIER], "");

        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];

            if (!tarteaucitron.getElemAttr(element, "advertiserId") || !tarteaucitron.getElemAttr(element, "conversionCode")) {
                continue;
            }

            var url = CONVERSION_PIXEL_BASE_URL +
                "/" + encodeURIComponent(tarteaucitron.getElemAttr(element, "advertiserId")) +
                "?t=" + encodeURIComponent(tarteaucitron.getElemAttr(element, "conversionCode"));

            if (tarteaucitron.getElemAttr(element, "price")) {
                url += "&price=" + encodeURIComponent(tarteaucitron.getElemAttr(element, "price"));
            }

            if (tarteaucitron.getElemAttr(element, "quantity")) {
                url += "&quantity=" + encodeURIComponent(tarteaucitron.getElemAttr(element, "quantity"));
            }

            if (tarteaucitron.getElemAttr(element, "total")) {
                url += "&total=" + encodeURIComponent(tarteaucitron.getElemAttr(element, "total"));
            }

            if (tarteaucitron.getElemAttr(element, "orderId")) {
                url += "&order_id=" + encodeURIComponent(tarteaucitron.getElemAttr(element, "orderId"));
            }

            if (tarteaucitron.getElemAttr(element, "itemNumber")) {
                url += "&item_number=" + encodeURIComponent(tarteaucitron.getElemAttr(element, "itemNumber"));
            }

            if (tarteaucitron.getElemAttr(element, "description")) {
                url += "&description=" + encodeURIComponent(tarteaucitron.getElemAttr(element, "description"));
            }

            (new Image()).src = url;
        }
    }
};

// aduptech retargeting
tarteaucitron.services.aduptech_retargeting = {
    "key": "aduptech_retargeting",
    "type": "ads",
    "name": "Ad Up Technology (retargeting)",
    "uri": "https://www.adup-tech.com/datenschutz",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        var IDENTIFIER = "aduptech_retargeting",
            API_URL = "https://s.d.adup-tech.com/services/retargeting.js";

        var elements = document.getElementsByClassName(IDENTIFIER);
        if (!elements || elements.length === 0) {
            return;
        }

        tarteaucitron.fallback([IDENTIFIER], "");

        window.AdUpRetargeting = function (api) {
            for (var i = 0; i < elements.length; i++) {
                var element = elements[i];

                api.init();

                api.setAccount(tarteaucitron.getElemAttr(element, "account"));

                if (tarteaucitron.getElemAttr(element, "email")) {
                    api.setEmail(tarteaucitron.getElemAttr(element, "email"));
                } else if (tarteaucitron.getElemAttr(element, "hashedEmail")) {
                    api.setHashedEmail(tarteaucitron.getElemAttr(element, "hashedEmail"));
                }

                if (tarteaucitron.getElemAttr(element, "product")) {
                    try {
                        api.setProduct(JSON.parse(tarteaucitron.getElemAttr(element, "product")));
                    } catch (e) {
                        api.setProduct(tarteaucitron.getElemAttr(element, "product"));
                    }
                }

                if (tarteaucitron.getElemAttr(element, "transaction")) {
                    try {
                        api.setTransaction(JSON.parse(tarteaucitron.getElemAttr(element, "transaction")));
                    } catch (e) {
                        api.setTransaction(tarteaucitron.getElemAttr(element, "transaction"));
                    }
                }

                if (tarteaucitron.getElemAttr(element, "demarkUser")) {
                    api.setDemarkUser();
                } else if (tarteaucitron.getElemAttr(element, "demarkProducts")) {
                    api.setDemarkProducts();
                }

                if (tarteaucitron.getElemAttr(element, "conversionCode")) {
                    api.setConversionCode(tarteaucitron.getElemAttr(element, "conversionCode"));
                }

                if (tarteaucitron.getElemAttr(element, "device")) {
                    var setter = "set" + tarteaucitron.getElemAttr(element, "device").charAt(0).toUpperCase() + tarteaucitron.getElemAttr(element, "device").slice(1);
                    if (typeof api[setter] === 'function') {
                        api[setter]();
                    }
                }

                if (tarteaucitron.getElemAttr(element, "track")) {
                    var tracker = "track" + tarteaucitron.getElemAttr(element, "track").charAt(0).toUpperCase() + tarteaucitron.getElemAttr(element, "track").slice(1);
                    if (typeof api[tracker] === "function") {
                        api[tracker]();
                    } else {
                        api.trackHomepage();
                    }
                }
            };
        };

        tarteaucitron.addScript(API_URL);
    }
};

// alexa
tarteaucitron.services.alexa = {
    "key": "alexa",
    "type": "analytic",
    "name": "Alexa",
    "uri": "https://www.alexa.com/help/privacy",
    "needConsent": true,
    "cookies": ['__asc', '__auc'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.alexaAccountID === undefined) {
            return;
        }
        window._atrk_opts = {
            atrk_acct: tarteaucitron.user.alexaAccountID,
            domain: window.location.hostname.match(/[^\.]*\.[^.]*$/)[0],
            dynamic: true
        };
        tarteaucitron.addScript('https://d31qbv1cthcecs.cloudfront.net/atrk.js');
    }
};

// amazon
tarteaucitron.services.amazon = {
    "key": "amazon",
    "type": "ads",
    "name": "Amazon",
    "uri": "https://www.amazon.com/gp/help/customer/display.html/?ie=UTF8&nodeId=201909010",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['amazon_product'], function (x) {
            var frame_title = tarteaucitron.getElemAttr(x, "title") || 'Amazon iframe',
                amazonId = tarteaucitron.getElemAttr(x, "amazonid"),
                productId = tarteaucitron.getElemAttr(x, "productid"),
                url = '//ws-eu.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=' + tarteaucitron.getLanguage().toUpperCase() + '&source=ss&ref=ss_til&ad_type=product_link&tracking_id=' + amazonId + '&marketplace=amazon&region=' + tarteaucitron.getLanguage().toUpperCase() + '&placement=' + productId + '&asins=' + productId + '&show_border=true&link_opens_in_new_window=true',
                iframe = '<iframe title="' + frame_title + '" style="width:120px;height:240px;" src="' + url + '"></iframe>';

            return iframe;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'amazon';
        tarteaucitron.fallback(['amazon_product'], tarteaucitron.engage(id));
    }
};

// calameo
tarteaucitron.services.calameo = {
    "key": "calameo",
    "type": "video",
    "name": "Calameo",
    "uri": "https://fr.calameo.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['calameo-canvas'], function (x) {
            var frame_title = tarteaucitron.getElemAttr(x, "title") || 'Calameo iframe',
                id = tarteaucitron.getElemAttr(x, "data-id"),
                width = tarteaucitron.getElemAttr(x, "width"),
                height = tarteaucitron.getElemAttr(x, "height"),
                url = '//v.calameo.com/?bkcode=' + id,
                allowfullscreen = tarteaucitron.getElemAttr(x, "allowfullscreen");

            var styleAttr = (width !== "" ? "width:" + parseInt(width, 10) + "px;" : "") + (height !== "" ? "height:" + parseInt(height, 10) + "px;" : "");

            return '<iframe title="' + frame_title + '" src="' + url + '" style="' + styleAttr + '" allowtransparency ' + (allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'calameo';
        tarteaucitron.fallback(['calameo-canvas'], function (elem) {
            elem.style.width = tarteaucitron.getElemAttr(elem, 'width') + 'px';
            elem.style.height = tarteaucitron.getElemAttr(elem, 'height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// calameolibrary
tarteaucitron.services.calameolibrary = {
    "key": "calameolibrary",
    "type": "video",
    "name": "Calameo Library",
    "uri": "https://fr.calameo.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['calameolibrary-canvas'], function (x) {
            var frame_title = tarteaucitron.getElemAttr(x, "title") || 'Calameo iframe',
                id = tarteaucitron.getElemAttr(x, "data-id"),
                width = tarteaucitron.getElemAttr(x, "width"),
                height = tarteaucitron.getElemAttr(x, "height"),
                url = '//v.calameo.com/library/?type=subscription&id=' + id,
                allowfullscreen = tarteaucitron.getElemAttr(x, "allowfullscreen");

            var styleAttr = (width !== "" ? "width:" + parseInt(width, 10) + "px;" : "") + (height !== "" ? "height:" + parseInt(height, 10) + "px;" : "");

            return '<iframe title="' + frame_title + '" src="' + url + '" style="' + styleAttr + '" allowtransparency ' + (allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'calameolibrary';
        tarteaucitron.fallback(['calameolibrary-canvas'], function (elem) {
            elem.style.width = tarteaucitron.getElemAttr(elem, 'width') + 'px';
            elem.style.height = tarteaucitron.getElemAttr(elem, 'height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// clicky
tarteaucitron.services.clicky = {
    "key": "clicky",
    "type": "analytic",
    "name": "Clicky",
    "uri": "https://clicky.com/terms",
    "needConsent": true,
    "cookies": ['_jsuid', '_eventqueue', '_referrer_og', '_utm_og', '_first_pageview', 'clicky_olark', 'no_trackyy_' + tarteaucitron.user.clickyId, 'unpoco_' + tarteaucitron.user.clickyId, 'heatmaps_g2g_' + tarteaucitron.user.clickyId],
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
    }
};

// clicmanager
tarteaucitron.services.clicmanager = {
    "key": "clicmanager",
    "type": "ads",
    "name": "Clicmanager",
    "uri": "https://www.clicmanager.fr/infos_legales.php",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        var uniqIds = [],
            i,
            uri;

        tarteaucitron.fallback(['clicmanager-canvas'], function (x) {
            var uniqId = '_' + Math.random().toString(36).substr(2, 9);
            uniqIds.push(uniqId);
            return '<div id="' + uniqId + '" c="' + tarteaucitron.getElemAttr(x, 'c') + '" s="' + tarteaucitron.getElemAttr(x, 's') + '" t="' + tarteaucitron.getElemAttr(x, 't') + '"></div>';
        });

        for (i = 0; i < uniqIds.length; i += 1) {
            uri = '//ads.clicmanager.fr/exe.php?';
            uri += 'c=' + tarteaucitron.getElemAttr(document.getElementById(uniqIds[i]), 'c') + '&';
            uri += 's=' + tarteaucitron.getElemAttr(document.getElementById(uniqIds[i]), 's') + '&';
            uri += 't=' + tarteaucitron.getElemAttr(document.getElementById(uniqIds[i]), 't');

            tarteaucitron.makeAsync.init(uri, uniqIds[i]);
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'clicmanager';
        tarteaucitron.fallback(['clicmanager-canvas'], tarteaucitron.engage(id));
    }
};

// compteur
tarteaucitron.services.compteur = {
    "key": "compteur",
    "type": "analytic",
    "name": "Compteur.fr",
    "uri": "https://www.compteur.fr/help_privacy_policy.htm",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.compteurID === undefined) {
            return;
        }
        tarteaucitron.addScript('https://server2.compteur.fr/log7.js', '', function () { wtslog7(tarteaucitron.user.compteurID, 1); });
    }
};

// contentsquare
tarteaucitron.services.contentsquare = {
    "key": "contentsquare",
    "type": "analytic",
    "name": "ContentSquare",
    "uri": "https://docs.contentsquare.com/uxa-en/#collected-data",
    "needConsent": true,
    "cookies": ['_cs_id', '_cs_s', '_cs_vars', '_cs_ex', '_cs_c', '_cs_optout'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.contentsquareID === undefined) {
            return;
        }
        tarteaucitron.addScript('//t.contentsquare.net/uxa/' + tarteaucitron.user.contentsquareID + '.js');
    }
};

// crazyegg
tarteaucitron.services.crazyegg = {
    "key": "crazyegg",
    "type": "analytic",
    "name": "Crazy Egg",
    "uri": "https://www.crazyegg.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.crazyeggId === undefined) {
            return;
        }

        tarteaucitron.addScript('//script.crazyegg.com/pages/scripts/' + tarteaucitron.user.crazyeggId.substr(0, 4) + '/' + tarteaucitron.user.crazyeggId.substr(4, 4) + '.js');
    }
};

// clarity
tarteaucitron.services.clarity = {
    "key": "clarity",
    "type": "analytic",
    "name": "Clarity",
    "uri": "https://clarity.microsoft.com/",
    "needConsent": true,
    "cookies": ['_clck', '_clsk', 'CLID', 'ANONCHK', 'MR', 'MUID', 'SM'],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.clarity === undefined) {
            return;
        }

        window["clarity"] = window["clarity"] || function () { (window["clarity"].q = window["clarity"].q || []).push(arguments) };

        tarteaucitron.addScript('https://www.clarity.ms/tag/' + tarteaucitron.user.clarity, '', function() {
            window["clarity"]("consent");
        });
    },
    "fallback": function () {
        if (tarteaucitron.parameters.bingConsentMode === true) {
            if (tarteaucitron.parameters.softConsentMode === false) {
                this.js();
            }
        }
    }
};

// criteo
tarteaucitron.services.criteo = {
    "key": "criteo",
    "type": "ads",
    "name": "Criteo",
    "uri": "https://www.criteo.com/privacy/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        document.MAX_ct0 = '';
        var uniqIds = [],
            i,
            uri;

        tarteaucitron.fallback(['criteo-canvas'], function (x) {
            var uniqId = '_' + Math.random().toString(36).substr(2, 9);
            uniqIds.push(uniqId);
            return '<div id="' + uniqId + '" zoneid="' + tarteaucitron.getElemAttr(x, 'zoneid') + '"></div>';
        });

        for (i = 0; i < uniqIds.length; i += 1) {
            uri = '//cas.criteo.com/delivery/ajs.php?';
            uri += 'zoneid=' + tarteaucitron.getElemAttr(document.getElementById(uniqIds[i]), 'zoneid');
            uri += '&nodis=1&cb=' + Math.floor(Math.random() * 99999999999);
            uri += '&loc=' + encodeURI(window.location);
            uri += (document.MAX_used !== ',') ? '&exclude=' + document.MAX_used : '';
            uri += (document.charset !== undefined ? '&charset=' + document.charset : '');
            uri += (document.characterSet !== undefined ? '&charset=' + document.characterSet : '');
            uri += (document.referrer !== undefined) ? '&referer=' + encodeURI(document.referrer) : '';
            uri += (document.context !== undefined) ? '&context=' + encodeURI(document.context) : '';
            uri += ((document.MAX_ct0 !== undefined) && (document.MAX_ct0.substring(0, 4) === 'http')) ? '&ct0=' + encodeURI(document.MAX_ct0) : '';
            uri += (document.mmm_fo !== undefined) ? '&mmm_fo=1' : '';

            tarteaucitron.makeAsync.init(uri, uniqIds[i]);
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'criteo';
        tarteaucitron.fallback(['criteo-canvas'], tarteaucitron.engage(id));
    }
};

// criteo onetag
tarteaucitron.services.criteoonetag = {
    "key": "criteoonetag",
    "type": "ads",
    "name": "Criteo OneTag",
    "uri": "https://www.criteo.com/privacy/",
    "needConsent": true,
    "cookies": ['uid', 'tk', 'uid3pd'],
    "js": function() {
        "use strict";
        if (tarteaucitron.user.criteoonetagAccount === undefined) return;

        window.criteo_q = window.criteo_q || [];
        window.criteo_q.push({
            event: "setAccount",
            account: tarteaucitron.user.criteoonetagAccount
        })

        tarteaucitron.addScript('//static.criteo.net/js/ld/ld.js', '', function() {
            if (typeof tarteaucitron.user.criteoonetagMore === 'function') {
                tarteaucitron.user.criteoonetagMore();
            }
        });
    }
};

// artetv
tarteaucitron.services.artetv = {
    "key": "artetv",
    "type": "video",
    "name": "Arte.tv",
    "uri": "https://www.arte.tv/sites/fr/corporate/donnees-personnelles/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['artetv_player'], function (x) {
            var frame_title = tarteaucitron.getElemAttr(x, "title") || 'Arte.tv iframe',
                video_json = tarteaucitron.getElemAttr(x, "json"),
                video_width = tarteaucitron.getElemAttr(x, "width"),
                video_height = tarteaucitron.getElemAttr(x, "height"),
                video_frame,
                video_allowfullscreen = tarteaucitron.getElemAttr(x, "allowfullscreen");

            if (video_json === undefined) {
                return "";
            }

            var styleAttr = (video_width !== "" ? "width:" + parseInt(video_width, 10) + "px;" : "") + (video_height !== "" ? "height:" + parseInt(video_height, 10) + "px;" : "");

            video_frame = '<iframe title="' + frame_title + '" style="' + styleAttr + 'transition-duration: 0; transition-property: no; margin: 0 auto; position: relative; display: block; background-color: #000000;" src="https://www.arte.tv/player/v5/index.php?json_url=' + video_json + '" ' + (video_allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';
            return video_frame;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'artetv';
        tarteaucitron.fallback(['artetv_player'], function (elem) {
            elem.style.width = tarteaucitron.getElemAttr(elem, 'width') + 'px';
            elem.style.height = tarteaucitron.getElemAttr(elem, 'height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// dailymotion
tarteaucitron.services.dailymotion = {
    "key": "dailymotion",
    "type": "video",
    "name": "Dailymotion",
    "uri": "https://www.dailymotion.com/legal/privacy",
    "needConsent": true,
    "cookies": ['ts', 'dmvk', 'hist', 'v1st', 's_vi'],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['dailymotion_player'], function (x) {
            var frame_title = tarteaucitron.getElemAttr(x, "title") || 'Dailymotion iframe',
                video_id = tarteaucitron.getElemAttr(x, "videoID"),
                video_width = tarteaucitron.getElemAttr(x, "width"),
                video_height = tarteaucitron.getElemAttr(x, "height"),
                styleAttr = "",
                video_frame,
                embed_type = tarteaucitron.getElemAttr(x, "embedType"),
                allowfullscreen = tarteaucitron.getElemAttr(x, "allowfullscreen"),
                showinfo = tarteaucitron.getElemAttr(x, "showinfo"),
                autoplay = tarteaucitron.getElemAttr(x, "autoplay"),
                api = tarteaucitron.getElemAttr(x, "api"),
                params = 'info=' + showinfo + '&autoPlay=' + autoplay + '&api=' + api;

            if (video_id === undefined) {
                return "";
            }
            if (video_width !== "") {
                styleAttr += 'width:' + parseInt(video_width, 10) + 'px;';
            }
            if (video_height !== undefined) {
                styleAttr += 'height:' + parseInt(video_height, 10) + 'px;';
            }
            if (embed_type === undefined || !['video', 'playlist'].includes(embed_type)) {
                embed_type = "video";
            }
            video_frame = '<iframe title="' + frame_title + '" src="//www.dailymotion.com/embed/' + embed_type + '/' + video_id + '?' + params + '" style="' + styleAttr + '" ' + (allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';
            return video_frame;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'dailymotion';
        tarteaucitron.fallback(['dailymotion_player'], function (elem) {
            elem.style.width = tarteaucitron.getElemAttr(elem, 'width') + 'px';
            elem.style.height = tarteaucitron.getElemAttr(elem, 'height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// dating affiliation
tarteaucitron.services.datingaffiliation = {
    "key": "datingaffiliation",
    "type": "ads",
    "name": "Dating Affiliation",
    "uri": "https://www.dating-affiliation.com/conditions-generales.php",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['datingaffiliation-canvas'], function (x) {
            var frame_title = tarteaucitron.getElemAttr(x, "title") || 'Dating Affiliation iframe',
                comfrom = tarteaucitron.getElemAttr(x, "data-comfrom"),
                r = tarteaucitron.getElemAttr(x, "data-r"),
                p = tarteaucitron.getElemAttr(x, "data-p"),
                cf0 = tarteaucitron.getElemAttr(x, "data-cf0"),
                langue = tarteaucitron.getElemAttr(x, "data-langue"),
                forward_affiliate = tarteaucitron.getElemAttr(x, "data-forwardAffiliate"),
                cf2 = tarteaucitron.getElemAttr(x, "data-cf2"),
                cfsa2 = tarteaucitron.getElemAttr(x, "data-cfsa2"),
                width = tarteaucitron.getElemAttr(x, "width"),
                height = tarteaucitron.getElemAttr(x, "height"),
                url = 'https://www.tools-affil2.com/rotaban/ban.php?' + comfrom;

            var styleAttr = (width !== "" ? "width:" + parseInt(width, 10) + "px;" : "") + (height !== "" ? "height:" + parseInt(height, 10) + "px;" : "");

            return '<iframe title="' + frame_title + '" src="' + url + '&r=' + r + '&p=' + p + '&cf0=' + cf0 + '&langue=' + langue + '&forward_affiliate=' + forward_affiliate + '&cf2=' + cf2 + '&cfsa2=' + cfsa2 + '" style="' + styleAttr + '"></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'datingaffiliation';
        tarteaucitron.fallback(['datingaffiliation-canvas'], function (elem) {
            elem.style.width = tarteaucitron.getElemAttr(elem, 'width') + 'px';
            elem.style.height = tarteaucitron.getElemAttr(elem, 'height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// dating affiliation popup
tarteaucitron.services.datingaffiliationpopup = {
    "key": "datingaffiliationpopup",
    "type": "ads",
    "name": "Dating Affiliation (Pop Up)",
    "uri": "https://www.dating-affiliation.com/conditions-generales.php",
    "needConsent": true,
    "cookies": ['__utma', '__utmb', '__utmc', '__utmt_Tools', '__utmv', '__utmz', '_ga', '_gat', '_gat_UA-65072040-17', '__da-pu-xflirt-ID-pc-o169'],
    "js": function () {
        "use strict";
        var uniqIds = [],
            i,
            uri;

        tarteaucitron.fallback(['datingaffiliationpopup-canvas'], function (x) {
            var uniqId = '_' + Math.random().toString(36).substr(2, 9);
            uniqIds.push(uniqId);
            return '<div id="' + uniqId + '" uri="' + tarteaucitron.getElemAttr(x, 'uri') + '" comfrom="' + tarteaucitron.getElemAttr(x, 'comfrom') + '" promo="' + tarteaucitron.getElemAttr(x, 'promo') + '" productid="' + tarteaucitron.getElemAttr(x, 'productid') + '" submitconfig="' + tarteaucitron.getElemAttr(x, 'submitconfig') + '" ur="' + tarteaucitron.getElemAttr(x, 'ur') + '" brand="' + tarteaucitron.getElemAttr(x, 'brand') + '" lang="' + tarteaucitron.getElemAttr(x, 'lang') + '" cf0="' + tarteaucitron.getElemAttr(x, 'cf0') + '" cf2="' + tarteaucitron.getElemAttr(x, 'cf2') + '" subid1="' + tarteaucitron.getElemAttr(x, 'subid1') + '" cfsa2="' + tarteaucitron.getElemAttr(x, 'cfsa2') + '" subid2="' + tarteaucitron.getElemAttr(x, 'subid2') + '" nicheid="' + tarteaucitron.getElemAttr(x, 'nicheid') + '" degreid="' + tarteaucitron.getElemAttr(x, 'degreid') + '" bt="' + tarteaucitron.getElemAttr(x, 'bt') + '" vis="' + tarteaucitron.getElemAttr(x, 'vis') + '" hid="' + tarteaucitron.getElemAttr(x, 'hid') + '" snd="' + tarteaucitron.getElemAttr(x, 'snd') + '" aabd="' + tarteaucitron.getElemAttr(x, 'aabd') + '" aabs="' + tarteaucitron.getElemAttr(x, 'aabs') + '"></div>';
        });

        for (i = 0; i < uniqIds.length; i += 1) {
            uri = 'https://www.promotools.biz/da/popunder/script.php?';
            uri += 'comfrom=' + tarteaucitron.getElemAttr(document.getElementById(uniqIds[i]), 'comfrom') + '&';
            uri += 'promo=' + tarteaucitron.getElemAttr(document.getElementById(uniqIds[i]), 'promo') + '&';
            uri += 'product_id=' + tarteaucitron.getElemAttr(document.getElementById(uniqIds[i]), 'productid') + '&';
            uri += 'submitconfig=' + tarteaucitron.getElemAttr(document.getElementById(uniqIds[i]), 'submitconfig') + '&';
            uri += 'ur=' + tarteaucitron.getElemAttr(document.getElementById(uniqIds[i]), 'ur') + '&';
            uri += 'brand=' + tarteaucitron.getElemAttr(document.getElementById(uniqIds[i]), 'brand') + '&';
            uri += 'lang=' + tarteaucitron.getElemAttr(document.getElementById(uniqIds[i]), 'lang') + '&';
            uri += 'cf0=' + tarteaucitron.getElemAttr(document.getElementById(uniqIds[i]), 'cf0') + '&';
            uri += 'cf2=' + tarteaucitron.getElemAttr(document.getElementById(uniqIds[i]), 'cf2') + '&';
            uri += 'subid1=' + tarteaucitron.getElemAttr(document.getElementById(uniqIds[i]), 'subid1') + '&';
            uri += 'cfsa2=' + tarteaucitron.getElemAttr(document.getElementById(uniqIds[i]), 'cfsa2') + '&';
            uri += 'subid2=' + tarteaucitron.getElemAttr(document.getElementById(uniqIds[i]), 'subid2') + '&';
            uri += 'nicheId=' + tarteaucitron.getElemAttr(document.getElementById(uniqIds[i]), 'nicheid') + '&';
            uri += 'degreId=' + tarteaucitron.getElemAttr(document.getElementById(uniqIds[i]), 'degreid') + '&';
            uri += 'bt=' + tarteaucitron.getElemAttr(document.getElementById(uniqIds[i]), 'bt') + '&';
            uri += 'vis=' + tarteaucitron.getElemAttr(document.getElementById(uniqIds[i]), 'vis') + '&';
            uri += 'hid=' + tarteaucitron.getElemAttr(document.getElementById(uniqIds[i]), 'hid') + '&';
            uri += 'snd=' + tarteaucitron.getElemAttr(document.getElementById(uniqIds[i]), 'snd') + '&';
            uri += 'aabd=' + tarteaucitron.getElemAttr(document.getElementById(uniqIds[i]), 'aabd') + '&';
            uri += 'aabs=' + tarteaucitron.getElemAttr(document.getElementById(uniqIds[i]), 'aabs');

            tarteaucitron.makeAsync.init(uri, uniqIds[i]);
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'datingaffiliationpopup';
        tarteaucitron.fallback(['datingaffiliationpopup-canvas'], tarteaucitron.engage(id));
    }
};

// deezer
tarteaucitron.services.deezer = {
    "key": "deezer",
    "type": "video",
    "name": "Deezer",
    "uri": "https://www.deezer.com/legal/personal-datas",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['deezer_player'], function (x) {
            var frame_title = tarteaucitron.getElemAttr(x, "title") || 'Deezer iframe',
                deezer_id = tarteaucitron.getElemAttr(x, "deezerID"),
                deezer_width = tarteaucitron.getElemAttr(x, "width"),
                deezer_height = tarteaucitron.getElemAttr(x, "height"),
                styleAttr = "",
                deezer_frame,
                embed_theme = tarteaucitron.getElemAttr(x, "theme"),
                embed_type = tarteaucitron.getElemAttr(x, "embedType"),
                radius = tarteaucitron.getElemAttr(x, "radius"),
                tracklist = tarteaucitron.getElemAttr(x, "tracklist"),
                allowfullscreen = tarteaucitron.getElemAttr(x, "allowfullscreen"),
                params;

            if (deezer_id === undefined) {
                return "";
            }
            if (deezer_width !== "") {
                styleAttr += 'width:' + parseInt(deezer_width, 10) + 'px;';
            }
            if (deezer_height !== "") {
                styleAttr += 'height:' + parseInt(deezer_height, 10) + 'px;';
            }
            if (embed_theme === undefined || !['auto', 'light', 'dark'].includes(embed_theme)) {
                embed_theme = "auto";
            }
            if (embed_type === undefined || !['album', 'track', 'playlist'].includes(embed_type)) {
                embed_type = "album";
            }
            if (radius === undefined || !['true', 'false'].includes(radius)) {
                radius = "true";
            }
            if (tracklist === undefined || !['true', 'false'].includes(tracklist)) {
                tracklist = "true";
            }
            params = 'tracklist=' + tracklist + '&radius=' + radius;
            deezer_frame = '<iframe title="' + frame_title + '" src="//widget.deezer.com/widget/' + embed_theme + '/' + embed_type + '/' + deezer_id + '?' + params + '" style="' + styleAttr + '" ' + (allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';
            return deezer_frame;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'deezer';
        tarteaucitron.fallback(['deezer_player'], function (elem) {
            elem.style.width = tarteaucitron.getElemAttr(elem, 'width') + 'px';
            elem.style.height = tarteaucitron.getElemAttr(elem, 'height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// leadforensicsold
tarteaucitron.services.leadforensicsold = {
    "key": "leadforensicsold",
    "type": "analytic",
    "name": "LeadForensics",
    "uri": "https://www.leadforensics.com/privacy-policy/",
    "needConsent": true,
    "cookies": ['trackalyzer'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.leadforensicsSf14gv === undefined ||
            tarteaucitron.user.leadforensicsIidentifier === undefined) {
            return;
        }

        window.sf14gv = tarteaucitron.user.leadforensicsSf14gv;

        (function () {
            var sf14g = document.createElement('script'); sf14g.async = true;
            sf14g.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 't.sf14g.com/sf14g.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(sf14g, s);
        })();

        tarteaucitron.addScript('//secure.leadforensics.com/js/' + tarteaucitron.user.leadforensicsIidentifier + '.js');
    }
};

// disqus
tarteaucitron.services.disqus = {
    "key": "disqus",
    "type": "comment",
    "name": "Disqus",
    "uri": "https://help.disqus.com/customer/portal/articles/466259-privacy-policy",
    "needConsent": true,
    "cookies": [],
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

// ekomi
tarteaucitron.services.ekomi = {
    "key": "ekomi",
    "type": "social",
    "name": "eKomi",
    "uri": "https://www.ekomi-us.com/us/privacy/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.ekomiCertId === undefined) {
            return;
        }
        window.eKomiIntegrationConfig = [
            { certId: tarteaucitron.user.ekomiCertId }
        ];
        tarteaucitron.addScript('//connect.ekomi.de/integration_1410173009/' + tarteaucitron.user.ekomiCertId + '.js');
    }
};

// etracker
tarteaucitron.services.etracker = {
    "key": "etracker",
    "type": "analytic",
    "name": "eTracker",
    "uri": "https://www.etracker.com/en/data-protection.html",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.etracker === undefined) {
            return;
        }

        tarteaucitron.addScript('//static.etracker.com/code/e.js', '_etLoader', function () { }, true, "data-secure-code", tarteaucitron.user.etracker);
    }
};

// facebook
tarteaucitron.services.facebook = {
    "key": "facebook",
    "type": "social",
    "name": "Facebook",
    "uri": "https://www.facebook.com/policy.php",
    "needConsent": true,
    "cookies": ['xs', 'sb', 'fr', 'datr', 'dpr', 'c_user'],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['fb-post', 'fb-follow', 'fb-activity', 'fb-send', 'fb-share-button', 'fb-like', 'fb-video'], '');
        tarteaucitron.addScript('//connect.facebook.net/' + tarteaucitron.getLocale() + '/sdk.js#xfbml=1&version=v2.0', 'facebook-jssdk');
        if (tarteaucitron.isAjax === true) {
            if (typeof FB !== "undefined") {
                FB.XFBML.parse();
            }
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'facebook';
        tarteaucitron.fallback(['fb-post', 'fb-follow', 'fb-activity', 'fb-send', 'fb-share-button', 'fb-like', 'fb-video'], tarteaucitron.engage(id));
    }
};

// facebooklikebox
tarteaucitron.services.facebooklikebox = {
    "key": "facebooklikebox",
    "type": "social",
    "name": "Facebook (like box)",
    "uri": "https://www.facebook.com/policy.php",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['fb-like-box', 'fb-page'], '');
        tarteaucitron.addScript('//connect.facebook.net/' + tarteaucitron.getLocale() + '/sdk.js#xfbml=1&version=v2.3', 'facebook-jssdk');
        if (tarteaucitron.isAjax === true) {
            if (typeof FB !== "undefined") {
                FB.XFBML.parse();
            }
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'facebooklikebox';
        tarteaucitron.fallback(['fb-like-box', 'fb-page'], tarteaucitron.engage(id));
    }
};

// facebookcomment
tarteaucitron.services.facebookcomment = {
    "key": "facebookcomment",
    "type": "comment",
    "name": "Facebook (commentaire)",
    "uri": "https://www.facebook.com/policy.php",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['fb-comments'], '');
        tarteaucitron.addScript('//connect.facebook.net/' + tarteaucitron.getLocale() + '/sdk.js#xfbml=1&version=v2.0', 'facebook-jssdk');
        if (tarteaucitron.isAjax === true) {
            if (typeof FB !== "undefined") {
                FB.XFBML.parse();
            }
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'facebookcomment';
        tarteaucitron.fallback(['fb-comments'], tarteaucitron.engage(id));
    }
};

// ferank
tarteaucitron.services.ferank = {
    "key": "ferank",
    "type": "analytic",
    "name": "FERank",
    "uri": "https://www.ferank.fr/respect-vie-privee/#mesureaudience",
    "needConsent": false,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.addScript('//static.ferank.fr/pixel.js', '', function () {
            if (typeof tarteaucitron.user.ferankMore === 'function') {
                tarteaucitron.user.ferankMore();
            }
        });
    }
};

// pingdom
tarteaucitron.services.pingdom = {
    "key": "pingdom",
    "type": "api",
    "name": "Pingdom",
    "uri": "https://www.solarwinds.com/general-data-protection-regulation-cloud",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.pingdomId === undefined) {
            return;
        }

        window._prum = [['id', tarteaucitron.user.pingdomId], ['mark', 'firstbyte', (new Date()).getTime()]];

        tarteaucitron.addScript('https://rum-static.pingdom.net/prum.min.js');
    }
};


// simpleanalytics
tarteaucitron.services.simpleanalytics = {
    "key": "simpleanalytics",
    "type": "analytic",
    "name": "Simple Analytics",
    "uri": "https://docs.simpleanalytics.com/what-we-collect",
    "needConsent": false,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.addScript('https://scripts.simpleanalyticscdn.com/latest.js');
    }
};

// stonly
tarteaucitron.services.stonly = {
    "key": "stonly",
    "type": "api",
    "name": "Stonly (privacy by design)",
    "uri": "https://trust.stonly.com/",
    "needConsent": false,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.stonlyId === undefined) {
            return;
        }

        window.STONLY_WID = tarteaucitron.user.stonlyId;
        window.StonlyWidget || ((window.w = window.StonlyWidget = function () {
            window.w._api ? window.w._api.apply(window.w, arguments) : window.w.queue.push(arguments)
        }).queue = []);

        tarteaucitron.addScript('https://stonly.com/js/widget/v2/stonly-widget.js?v=' + Date.now());
    }
};

// stripe
/*tarteaucitron.services.stripe = {
    "key": "stripe",
    "type": "api",
    "name": "Stripe",
    "uri": "https://stripe.com/cookies-policy/legal",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.addScript('https://js.stripe.com/v3/');
    }
};*/

// ferank pub
tarteaucitron.services.ferankpub = {
    "key": "ferankpub",
    "type": "ads",
    "name": "FERank (pub)",
    "uri": "https://www.ferank.fr/respect-vie-privee/#regiepublicitaire",
    "needConsent": false,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.addScript('//static.ferank.fr/publicite.async.js');
        if (tarteaucitron.isAjax === true) {
            if (typeof ferankReady === 'function') {
                ferankReady();
            }
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'ferankpub';
        tarteaucitron.fallback(['ferank-publicite'], tarteaucitron.engage(id));
    }
};

// get+
tarteaucitron.services.getplus = {
    "key": "getplus",
    "type": "analytic",
    "name": "Get+",
    "uri": "https://www.getplus.fr/Conditions-generales-de-vente_a226.html",
    "needConsent": true,
    "cookies": ['_first_pageview', '_jsuid', 'no_trackyy_' + tarteaucitron.user.getplusId, '_eventqueue'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.getplusId === undefined) {
            return;
        }

        window.webleads_site_ids = window.webleads_site_ids || [];
        window.webleads_site_ids.push(tarteaucitron.user.getplusId);
        tarteaucitron.addScript('//stats.webleads-tracker.com/js');
    }
};

// google+
tarteaucitron.services.gplus = {
    "key": "gplus",
    "type": "social",
    "name": "Google+",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.addScript('https://apis.google.com/js/platform.js');
    },
    "fallback": function () {
        "use strict";
        var id = 'gplus';
        tarteaucitron.fallback(['g-plus', 'g-plusone'], tarteaucitron.engage(id));
    }
};

// google+ badge
tarteaucitron.services.gplusbadge = {
    "key": "gplusbadge",
    "type": "social",
    "name": "Google+ (badge)",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.addScript('https://apis.google.com/js/platform.js');
    },
    "fallback": function () {
        "use strict";
        var id = 'gplusbadge';
        tarteaucitron.fallback(['g-page', 'g-person'], tarteaucitron.engage(id));
    }
};

// google adsense
tarteaucitron.services.adsense = {
    "key": "adsense",
    "type": "ads",
    "name": "Google Adsense",
    "uri": "https://adssettings.google.com/",
    "needConsent": true,
    "readmoreLink": "https://policies.google.com/technologies/partner-sites",
    "cookies": ['__gads'],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['adsbygoogle'], '');
        tarteaucitron.addScript('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js');
    },
    "fallback": function () {
        "use strict";
        var id = 'adsense';
        tarteaucitron.fallback(['adsbygoogle'], tarteaucitron.engage(id));
    }
};


// google adsense automatic
tarteaucitron.services.adsenseauto = {
    "key": "adsenseauto",
    "type": "ads",
    "name": "Google Adsense Automatic",
    "uri": "https://adssettings.google.com/",
    "needConsent": true,
    "readmoreLink": "https://policies.google.com/technologies/partner-sites",
    "cookies": ['__gads'],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.adsensecapub === undefined) {
            return;
        }
        tarteaucitron.addScript('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + tarteaucitron.user.adsensecapub, '', '', '', 'crossorigin', 'anonymous');
    }
};

// Google Adsense Search
tarteaucitron.services.adsensesearch = {
    "key": "adsensesearch",
    "type": "ads",
    "name": "Google Adsense Search",
    "uri": "https://adssettings.google.com/",
    "needConsent": true,
    "readmoreLink": "https://policies.google.com/technologies/partner-sites",
    "cookies": ['__gads'],
    "js": function () {
        "use strict";
        tarteaucitron.addScript('https://www.google.com/adsense/search/ads.js');
    },
    "fallback": function () {
        "use strict";
        var id = 'adsensesearch';
        tarteaucitron.fallback(['afscontainer1'], tarteaucitron.engage(id));
    }
};

// google partners badge
tarteaucitron.services.googlepartners = {
    "key": "googlepartners",
    "type": "ads",
    "name": "Google Partners Badge",
    "uri": "https://adssettings.google.com/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.addScript('https://apis.google.com/js/platform.js');
    },
    "fallback": function () {
        "use strict";
        var id = 'googlepartners';
        tarteaucitron.fallback(['g-partnersbadge'], tarteaucitron.engage(id));
    }
};

// google adsense search (form)
tarteaucitron.services.adsensesearchform = {
    "key": "adsensesearchform",
    "type": "ads",
    "name": "Google Adsense Search (form)",
    "uri": "https://adssettings.google.com/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.addScript('//www.google.com/coop/cse/brand?form=cse-search-box&lang=' + tarteaucitron.getLanguage());
    }
};

// google adsense search (result)
tarteaucitron.services.adsensesearchresult = {
    "key": "adsensesearchresult",
    "type": "ads",
    "name": "Google Adsense Search (result)",
    "uri": "https://adssettings.google.com/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.adsensesearchresultCx === undefined) {
            return;
        }
        tarteaucitron.addScript('//www.google.com/cse/cse.js?cx=' + tarteaucitron.user.adsensesearchresultCx);
    },
    "fallback": function () {
        "use strict";
        var id = 'adsensesearchresult';

        if (document.getElementById('gcse_searchresults')) {
            document.getElementById('gcse_searchresults').innerHTML = tarteaucitron.engage(id);
        }
    }
};

// googleadwordsconversion
tarteaucitron.services.googleadwordsconversion = {
    "key": "googleadwordsconversion",
    "type": "ads",
    "name": "Google Adwords (conversion)",
    "uri": "https://www.google.com/settings/ads",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.adwordsconversionId === undefined) {
            return;
        }

        tarteaucitron.addScript('//www.googleadservices.com/pagead/conversion_async.js', '', function () {
            window.google_trackConversion({
                google_conversion_id: tarteaucitron.user.adwordsconversionId,
                google_conversion_label: tarteaucitron.user.adwordsconversionLabel,
                google_conversion_language: tarteaucitron.user.adwordsconversionLanguage,
                google_conversion_format: tarteaucitron.user.adwordsconversionFormat,
                google_conversion_color: tarteaucitron.user.adwordsconversionColor,
                google_conversion_value: tarteaucitron.user.adwordsconversionValue,
                google_conversion_currency: tarteaucitron.user.adwordsconversionCurrency,
                google_custom_params: {
                    parameter1: tarteaucitron.user.adwordsconversionCustom1,
                    parameter2: tarteaucitron.user.adwordsconversionCustom2
                }
            });
        });
    }
};

// googleadwordsremarketing
tarteaucitron.services.googleadwordsremarketing = {
    "key": "googleadwordsremarketing",
    "type": "ads",
    "name": "Google Adwords (remarketing)",
    "uri": "https://www.google.com/settings/ads",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.adwordsremarketingId === undefined) {
            return;
        }

        tarteaucitron.addScript('//www.googleadservices.com/pagead/conversion_async.js', '', function () {
            window.google_trackConversion({
                google_conversion_id: tarteaucitron.user.adwordsremarketingId,
                google_remarketing_only: true
            });
        });
    }
};

// google analytics (old)
tarteaucitron.services.gajs = {
    "key": "gajs",
    "type": "analytic",
    "name": "Google Analytics (ga.js)",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": (function () {
        var googleIdentifier = tarteaucitron.user.gajsUa,
            tagUaCookie = '_gat_gtag_' + googleIdentifier,
            tagGCookie = '_ga_' + googleIdentifier;

        tagUaCookie = tagUaCookie.replace(/-/g, '_');
        tagGCookie = tagGCookie.replace(/G-/g, '');

        return ['_ga', '_gat', '_gid', '__utma', '__utmb', '__utmc', '__utmt', '__utmz', tagUaCookie, tagGCookie, '_gcl_au'];
    })(),
    "js": function () {
        "use strict";

        if (tarteaucitron.user.gajsUa === undefined) {
            return;
        }

        window._gaq = window._gaq || [];
        window._gaq.push(['_setAccount', tarteaucitron.user.gajsUa]);
        if (timeExpire !== undefined) {
            _gaq.push(['_setVisitorCookieTimeout', timeExpire]);
        }

        if (tarteaucitron.user.gajsAnonymizeIp) {
            window._gaq.push(['_gat._anonymizeIp']);
        }

        if (tarteaucitron.user.gajsPageView) {
            window._gaq.push(['_trackPageview, ' + tarteaucitron.user.gajsPageView]);
        } else {
            window._gaq.push(['_trackPageview']);
        }

        tarteaucitron.addScript('//www.google-analytics.com/ga.js', '', function () {
            if (typeof tarteaucitron.user.gajsMore === 'function') {
                tarteaucitron.user.gajsMore();
            }
        });
    }
};

// google analytics
tarteaucitron.services.analytics = {
    "key": "analytics",
    "type": "analytic",
    "name": "Google Analytics (universal)",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": (function () {
        var googleIdentifier = tarteaucitron.user.analyticsUa,
            tagUaCookie = '_gat_gtag_' + googleIdentifier,
            tagGCookie = '_ga_' + googleIdentifier;

        tagUaCookie = tagUaCookie.replace(/-/g, '_');
        tagGCookie = tagGCookie.replace(/G-/g, '');

        return ['_ga', '_gat', '_gid', '__utma', '__utmb', '__utmc', '__utmt', '__utmz', tagUaCookie, tagGCookie, '_gcl_au'];
    })(),
    "js": function () {
        "use strict";

        if (tarteaucitron.user.analyticsUa === undefined) {
            return;
        }

        window.GoogleAnalyticsObject = 'ga';
        window.ga = window.ga || function () {
            window.ga.q = window.ga.q || [];
            window.ga.q.push(arguments);
        };
        window.ga.l = new Date();
        tarteaucitron.addScript('https://www.google-analytics.com/analytics.js', '', function () {
            var uaCreate = { 'cookieExpires': (timeExpire !== undefined) ? timeExpire : 34128000 };
            tarteaucitron.extend(uaCreate, tarteaucitron.user.analyticsUaCreate || {});
            ga('create', tarteaucitron.user.analyticsUa, uaCreate);

            if (tarteaucitron.user.analyticsAnonymizeIp) {
                ga('set', 'anonymizeIp', true);
            }

            if (typeof tarteaucitron.user.analyticsPrepare === 'function') {
                tarteaucitron.user.analyticsPrepare();
            }

            if (tarteaucitron.user.analyticsPageView) {
                ga('send', 'pageview', tarteaucitron.user.analyticsPageView);
            } else {
                ga('send', 'pageview');
            }

            if (typeof tarteaucitron.user.analyticsMore === 'function') {
                tarteaucitron.user.analyticsMore();
            }
        });
    }
};

// google ads
tarteaucitron.services.googleads = {
    "key": "googleads",
    "type": "ads",
    "name": "Google Ads",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": (function () {
        var googleIdentifier = tarteaucitron.user.googleadsId,
            tagUaCookie = '_gat_gtag_' + googleIdentifier,
            tagGCookie = '_ga_' + googleIdentifier;

        tagUaCookie = tagUaCookie.replace(/-/g, '_');
        tagGCookie = tagGCookie.replace(/G-/g, '');

        return ['_ga', '_gat', '_gid', '__utma', '__utmb', '__utmc', '__utmt', '__utmz', tagUaCookie, tagGCookie, '_gcl_au'];
    })(),
    "js": function () {
        "use strict";

        if (tarteaucitron.user.googleadsId === undefined) {
            return;
        }

        window.dataLayer = window.dataLayer || [];
        tarteaucitron.addScript('https://www.googletagmanager.com/gtag/js?id=' + tarteaucitron.user.googleadsId, '', function () {
            window.gtag = function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());
            var additional_config_info = (timeExpire !== undefined) ? {'anonymize_ip': true, 'cookie_expires': timeExpire / 1000} : {'anonymize_ip': true};

            gtag('config', tarteaucitron.user.googleadsId, additional_config_info);

            if (typeof tarteaucitron.user.googleadsMore === 'function') {
                tarteaucitron.user.googleadsMore();
            }
        });
    },
    "fallback": function () {
        if (tarteaucitron.parameters.googleConsentMode === true) {
            if (tarteaucitron.parameters.softConsentMode === false) {
                this.js();
            }
        }
    }
};

// google analytics
tarteaucitron.services.gtag = {
    "key": "gtag",
    "type": "analytic",
    "name": "Google Analytics (GA4)",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": (function () {
        var googleIdentifier = tarteaucitron.user.gtagUa,
            tagUaCookie = '_gat_gtag_' + googleIdentifier,
            tagGCookie = '_ga_' + googleIdentifier;

        tagUaCookie = tagUaCookie.replace(/-/g, '_');
        tagGCookie = tagGCookie.replace(/G-/g, '');

        return ['_ga', '_gat', '_gid', '__utma', '__utmb', '__utmc', '__utmt', '__utmz', tagUaCookie, tagGCookie, '_gcl_au'];
    })(),
    "js": function () {
        "use strict";

        if (tarteaucitron.user.gtagUa === undefined) {
            return;
        }

        window.dataLayer = window.dataLayer || [];
        tarteaucitron.addScript('https://www.googletagmanager.com/gtag/js?id=' + tarteaucitron.user.gtagUa, '', function () {
            window.gtag = function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());
            var additional_config_info = (timeExpire !== undefined) ? {'anonymize_ip': true, 'cookie_expires': timeExpire / 1000} : {'anonymize_ip': true};

            if (tarteaucitron.user.gtagCrossdomain) {
                /**
                 * https://support.google.com/analytics/answer/7476333?hl=en
                 * https://developers.google.com/analytics/devguides/collection/gtagjs/cross-domain
                 */
                gtag('config', tarteaucitron.user.gtagUa, additional_config_info, { linker: { domains: tarteaucitron.user.gtagCrossdomain, } });
            } else {
                gtag('config', tarteaucitron.user.gtagUa, additional_config_info);
            }

            if (typeof tarteaucitron.user.gtagMore === 'function') {
                tarteaucitron.user.gtagMore();
            }
        });
    },
    "fallback": function () {
        if (tarteaucitron.parameters.googleConsentMode === true) {
            if (tarteaucitron.parameters.softConsentMode === false) {
                this.js();
            }
        }
    }
};

tarteaucitron.services.firebase = {
    "key": "firebase",
    "type": "analytic",
    "name": "Firebase",
    "uri": "https://firebase.google.com/support/privacy",
    "needConsent": true,
    "cookies": (function () {
        var googleIdentifier = tarteaucitron.user.firebaseMeasurementId,
            tagGCookie = '_ga_' + googleIdentifier;

        tagGCookie = tagGCookie.replace(/G-/g, '');

        return ['_ga', tagGCookie];
    })(),
    "js": function () {
        "use strict";

        if (tarteaucitron.user.firebaseApiKey === undefined) {
            return;
        }

        tarteaucitron.addScript('https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js', '', function () {
            tarteaucitron.addScript('https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js', '', function () {

                var firebaseConfig = {
                    apiKey: tarteaucitron.user.firebaseApiKey,
                    authDomain: tarteaucitron.user.firebaseAuthDomain,
                    databaseURL: tarteaucitron.user.firebaseDatabaseUrl,
                    projectId: tarteaucitron.user.firebaseProjectId,
                    storageBucket: tarteaucitron.user.firebaseStorageBucket,
                    appId: tarteaucitron.user.firebaseAppId,
                    measurementId: tarteaucitron.user.firebaseMeasurementId,
                };
                firebase.initializeApp(firebaseConfig);
                firebase.analytics();
            });
        });
    }
};

// genially
tarteaucitron.services.genially = {
    "key": "genially",
    "type": "api",
    "name": "genially",
    "uri": "https://www.genial.ly/cookies",
    "needConsent": true,
    "cookies": ['_gat', '_ga', '_gid'],
    "js": function () {
        "use strict";

        tarteaucitron.fallback(['tac_genially'], function (x) {
            var frame_title = tarteaucitron.getElemAttr(x, "title") || 'genially iframe',
                width = tarteaucitron.getElemAttr(x, "width"),
                height = tarteaucitron.getElemAttr(x, "height"),
                geniallyid = tarteaucitron.getElemAttr(x, "geniallyid"),
                allowfullscreen = tarteaucitron.getElemAttr(x, "allowfullscreen");

            var styleAttr = (width !== "" ? "width:" + parseInt(width, 10) + "px;" : "") + (height !== "" ? "height:" + parseInt(height, 10) + "px;" : "");

            return '<div style="position: relative; padding-bottom: 109.00%; padding-top: 0; height: 0;"><iframe style="position: absolute; top: 0; left: 0;' + styleAttr + '" title="' + frame_title + '" src="https://view.genial.ly/' + geniallyid + '" allowtransparency ' + (allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe></div>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'genially';
        tarteaucitron.fallback(['tac_genially'], function (elem) {
            elem.style.width = tarteaucitron.getElemAttr(elem, 'width') + 'px';
            elem.style.height = tarteaucitron.getElemAttr(elem, 'height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// google maps
tarteaucitron.services.googlemaps = {
    "key": "googlemaps",
    "type": "api",
    "name": "Google Maps",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        var mapOptions,
            map,
            uniqIds = [],
            i;

        if (tarteaucitron.user.mapscallback === undefined) {
            tarteaucitron.user.mapscallback = 'tac_googlemaps_callback';
        }

        // Add Google Maps libraries if any (https://developers.google.com/maps/documentation/javascript/libraries)
        var googleMapsLibraries = '';
        if (tarteaucitron.user.googlemapsLibraries) {
            googleMapsLibraries = '&libraries=' + tarteaucitron.user.googlemapsLibraries;
        }

        tarteaucitron.addScript('//maps.googleapis.com/maps/api/js?v=3.exp&key=' + tarteaucitron.user.googlemapsKey + '&callback=' + tarteaucitron.user.mapscallback + googleMapsLibraries);

        window.tac_googlemaps_callback = function () {
            tarteaucitron.fallback(['googlemaps-canvas'], function (x) {
                var uniqId = '_' + Math.random().toString(36).substr(2, 9);
                uniqIds.push(uniqId);
                return '<div id="' + uniqId + '" zoom="' + tarteaucitron.getElemAttr(x, 'zoom') + '" latitude="' + tarteaucitron.getElemAttr(x, 'latitude') + '" longitude="' + tarteaucitron.getElemAttr(x, 'longitude') + '" style="width:' + x.offsetWidth + 'px;height:' + x.offsetHeight + 'px"></div>';
            });

            var i;
            for (i = 0; i < uniqIds.length; i += 1) {
                mapOptions = {
                    zoom: parseInt(tarteaucitron.getElemAttr(document.getElementById(uniqIds[i]), 'zoom'), 10),
                    center: new google.maps.LatLng(parseFloat(tarteaucitron.getElemAttr(document.getElementById(uniqIds[i]), 'latitude'), 10), parseFloat(tarteaucitron.getElemAttr(document.getElementById(uniqIds[i]), 'longitude'), 10))
                };
                map = new google.maps.Map(document.getElementById(uniqIds[i]), mapOptions);
                new google.maps.Marker({ position: { lat: parseFloat(tarteaucitron.getElemAttr(document.getElementById(uniqIds[i]), 'latitude'), 10), lng: parseFloat(tarteaucitron.getElemAttr(document.getElementById(uniqIds[i]), 'longitude'), 10) }, map: map });
            }
        };
    },
    "fallback": function () {
        "use strict";
        var id = 'googlemaps';
        tarteaucitron.fallback(['googlemaps-canvas'], tarteaucitron.engage(id));
    }
};

// googlemaps search
tarteaucitron.services.googlemapssearch = {
    "key": "googlemapssearch",
    "type": "api",
    "name": "Google Maps Search API",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": ['nid'],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['googlemapssearch'], function (x) {
            var frame_title = tarteaucitron.getElemAttr(x, "title") || 'Google search iframe',
                width = tarteaucitron.getElemAttr(x, "width"),
                height = tarteaucitron.getElemAttr(x, "height"),
                // url = tarteaucitron.getElemAttr(x, "data-url");
                query = escape(tarteaucitron.getElemAttr(x, "data-search")),
                key = tarteaucitron.getElemAttr(x, "data-api-key");

            var styleAttr = (width !== "" ? "width:" + parseInt(width, 10) + "px;" : "") + (height !== "" ? "height:" + parseInt(height, 10) + "px;" : "");

            return '<iframe title="' + frame_title + '" style="' + styleAttr + 'border:0" src="https://www.google.com/maps/embed/v1/place?q=' + query + '&key=' + key + '" allowfullscreen></iframe> '
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'googlemapssearch';
        tarteaucitron.fallback(['googlemapssearch'], function (elem) {
            elem.style.width = tarteaucitron.getElemAttr(elem, 'width') + 'px';
            elem.style.height = tarteaucitron.getElemAttr(elem, 'height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// googlemaps embed iframe
tarteaucitron.services.googlemapsembed = {
    "key": "googlemapsembed",
    "type": "api",
    "name": "Google Maps Embed",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": ['apisid', 'hsid', 'nid', 'sapisid', 'sid', 'sidcc', 'ssid', '1p_jar'],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['googlemapsembed'], function (x) {
            var frame_title = tarteaucitron.getElemAttr(x, "title") || 'Google maps iframe',
                width = tarteaucitron.getElemWidth(x),
                height = tarteaucitron.getElemHeight(x),
                url = tarteaucitron.getElemAttr(x, "data-url");

            var styleAttr = (width !== "" ? "width:" + parseInt(width, 10) + "px;" : "") + (height !== "" ? "height:" + parseInt(height, 10) + "px;" : "");

            return '<iframe title="' + frame_title + '" src="' + url + '" style="' + styleAttr + '" allowtransparency allowfullscreen></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'googlemapsembed';
        tarteaucitron.fallback(['googlemapsembed'], function (elem) {
            elem.style.width = tarteaucitron.getElemWidth(elem) + 'px';
            elem.style.height = tarteaucitron.getElemHeight(elem) + 'px';
            return tarteaucitron.engage(id);
        });
    }
};


// openstreetmap embed iframe
tarteaucitron.services.openstreetmap = {
    "key": "openstreetmap",
    "type": "api",
    "name": "Openstreetmap Embed",
    "uri": "https://wiki.osmfoundation.org/wiki/Privacy_Policy#Cookies",
    "needConsent": true,
    "cookies": ['apisid', 'hsid', 'nid', 'sapisid', 'sid', 'sidcc', 'ssid', '1p_jar'],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['openstreetmap'], function (x) {
            var frame_title = (tarteaucitron.getElemAttr(x,"title")) ? tarteaucitron.getElemAttr(x,"title") : 'Openstreetmap iframe',
                width = tarteaucitron.getElemWidth(x),
                height = tarteaucitron.getElemHeight(x),
                url = tarteaucitron.getElemAttr(x, "data-url");

            var styleAttr = (width !== "" ? "width:" + parseInt(width, 10) + "px;" : "") + (height !== "" ? "height:" + parseInt(height, 10) + "px;" : "");

            return '<iframe title="' + frame_title + '" src="' + url + '" style="' + styleAttr + '" allowfullscreen></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'openstreetmap';
        tarteaucitron.fallback(['openstreetmap'], function (elem) {
            elem.style.width = tarteaucitron.getElemWidth(elem) + 'px';
            elem.style.height = tarteaucitron.getElemHeight(elem) + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// geoportail embed iframe
tarteaucitron.services.geoportail = {
    "key": "geoportail",
    "type": "api",
    "name": "Geoportail maps Embed",
    "uri": "https://www.ign.fr/institut/gestion-des-cookies",
    "needConsent": true,
    "cookies": ['apisid', 'hsid', 'nid', 'sapisid', 'sid', 'sidcc', 'ssid', '1p_jar'],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['geoportail'], function (x) {
            var frame_title = (tarteaucitron.getElemAttr(x,"title")) ? tarteaucitron.getElemAttr(x,"title") : 'Geoportail maps iframe',
                width = tarteaucitron.getElemWidth(x),
                height = tarteaucitron.getElemHeight(x),
                url = tarteaucitron.getElemAttr(x, "data-url");

            var styleAttr = (width !== "" ? "width:" + parseInt(width, 10) + "px;" : "") + (height !== "" ? "height:" + parseInt(height, 10) + "px;" : "");

            return '<iframe title="' + frame_title + '" src="' + url + '" style="' + styleAttr + '" sandbox="allow-forms allow-scripts allow-same-origin" allowfullscreen></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'geoportail';
        tarteaucitron.fallback(['geoportail'], function (elem) {
            elem.style.width = tarteaucitron.getElemWidth(elem) + 'px';
            elem.style.height = tarteaucitron.getElemHeight(elem) + 'px';
            return tarteaucitron.engage(id);
        });
    }
};


// google tag manager
tarteaucitron.services.googletagmanager = {
    "key": "googletagmanager",
    "type": "api",
    "name": "Google Tag Manager",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": ['_ga', '_gat', '__utma', '__utmb', '__utmc', '__utmt', '__utmz', '__gads', '_drt_', 'FLC', 'exchange_uid', 'id', 'fc', 'rrs', 'rds', 'rv', 'uid', 'UIDR', 'UID', 'clid', 'ipinfo', 'acs'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.googletagmanagerId === undefined) {
            return;
        }
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'gtm.start': new Date().getTime(),
            event: 'gtm.js'
        });
        tarteaucitron.addScript('https://www.googletagmanager.com/gtm.js?id=' + tarteaucitron.user.googletagmanagerId);
    }
};

// google tag manager multiple
tarteaucitron.services.multiplegoogletagmanager = {
    "key": "multiplegoogletagmanager",
    "type": "api",
    "name": "Google Tag Manager",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": ['_ga', '_gat', '__utma', '__utmb', '__utmc', '__utmt', '__utmz', '__gads', '_drt_', 'FLC', 'exchange_uid', 'id', 'fc', 'rrs', 'rds', 'rv', 'uid', 'UIDR', 'UID', 'clid', 'ipinfo', 'acs'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.multiplegoogletagmanagerId === undefined) {
            return;
        }
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'gtm.start': new Date().getTime(),
            event: 'gtm.js'
        });

        tarteaucitron.user.multiplegoogletagmanagerId.forEach(function (id) {
            tarteaucitron.addScript('https://www.googletagmanager.com/gtm.js?id=' + id);
        });

    }
};

// google webfonts
tarteaucitron.services.googlefonts = {
    "key": "googlefonts",
    "type": "api",
    "name": "Google Webfonts",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.googleFonts === undefined) {
            return;
        }
        tarteaucitron.addScript('//ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js', '', function () {

            if (tarteaucitron.user.googleFonts instanceof Array) {
                WebFont.load({
                    google: {
                        families: tarteaucitron.user.googleFonts
                    }
                });
            } else {
                WebFont.load({
                    google: {
                        families: [tarteaucitron.user.googleFonts]
                    }
                });
            }
        });
    }
};

// hubspot
tarteaucitron.services.hubspot = {
    "key": "hubspot",
    "type": "analytic",
    "name": "Hubspot",
    "uri": "https://legal.hubspot.com/privacy-policy",
    "needConsent": true,
    "cookies": ['hubspotutk', 'fr', '__hstc', '__hssrc', '__hssc', '__cfduid'],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.hubspotId === undefined) {
            return;
        }

        tarteaucitron.addScript('//js.hs-scripts.com/' + tarteaucitron.user.hubspotId + '.js', 'hs-script-loader');
    }
};

// instagram
tarteaucitron.services.instagram = {
    "key": "instagram",
    "type": "social",
    "name": "Instagram",
    "uri": "https://www.instagram.com/legal/privacy/",
    "needConsent": true,
    "cookies": ['shbts', 'sessionid', 'csrftoken', 'rur', 'shbid', 'mid', 'ds_usr_id', 'ig_did', 'ig_cb', 'datr'],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['instagram_post'], function (x) {
            var frame_title = tarteaucitron.getElemAttr(x, "title") || 'Instagram iframe',
                post_id = tarteaucitron.getElemAttr(x, 'postId'),
                post_permalink = tarteaucitron.getElemAttr(x, 'data-instgrm-permalink'),
                embed_width = tarteaucitron.getElemAttr(x, 'width'),
                embed_height = tarteaucitron.getElemAttr(x, 'height'),
                styleAttr = "",
                post_frame;

            if (post_permalink != null) {
                tarteaucitron.addScript('//www.instagram.com/embed.js', 'instagram-embed');

                return '';
            }

            if (post_id === undefined) {
                return "";
            }

            if (embed_width !== "") {
                styleAttr = 'width:' + parseInt(embed_width, 10) + 'px;';
            }
            if (embed_height !== "") {
                styleAttr = 'height:' + parseInt(embed_height, 10) + 'px;';
            }

            post_frame = '<iframe title="' + frame_title + '" src="//www.instagram.com/p/' + post_id + '/embed" style="' + styleAttr + '"></iframe>';

            return post_frame;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'instagram';
        tarteaucitron.fallback(['instagram_post'], function (elem) {
            elem.style.width = tarteaucitron.getElemAttr(elem, 'width') + 'px';
            elem.style.height = tarteaucitron.getElemAttr(elem, 'height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// jsapi
tarteaucitron.services.jsapi = {
    "key": "jsapi",
    "type": "api",
    "name": "Google jsapi",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.addScript('//www.google.com/jsapi');
    }
};

// twitterwidgetsapi
tarteaucitron.services.twitterwidgetsapi = {
    "key": "twitterwidgetsapi",
    "type": "api",
    "name": "X (formerly Twitter) Widgets API",
    "uri": "https://support.twitter.com/articles/20170514",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['tacTwitterAPI'], '');
        tarteaucitron.addScript('//platform.twitter.com/widgets.js', 'twitter-wjs');
    },
    "fallback": function () {
        "use strict";
        var id = 'twitterwidgetsapi';
        tarteaucitron.fallback(['tacTwitterAPI'], tarteaucitron.engage(id));
    }
};

// recaptcha
tarteaucitron.services.recaptcha = {
    "key": "recaptcha",
    "type": "api",
    "name": "reCAPTCHA",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": ['nid'],
    "js": function () {
        "use strict";
        window.tacRecaptchaOnLoad = tarteaucitron.user.recaptchaOnLoad || function () { };
        tarteaucitron.fallback(['g-recaptcha'], '');

        let url = 'https://www.google.com/recaptcha/api.js?onload=tacRecaptchaOnLoad';
        if (tarteaucitron.user.recaptchaapi !== undefined) {
            url += '&render=' + tarteaucitron.user.recaptchaapi;
        }
        if (tarteaucitron.user.recaptcha_hl !== undefined) {
            url += '&hl=' + tarteaucitron.user.recaptcha_hl;
        }
        tarteaucitron.addScript(url);
    },
    "fallback": function () {
        "use strict";
        var id = 'recaptcha';
        tarteaucitron.fallback(['g-recaptcha'], tarteaucitron.engage(id));
    }
};

// linkedin
tarteaucitron.services.linkedin = {
    "key": "linkedin",
    "type": "social",
    "name": "Linkedin",
    "uri": "https://www.linkedin.com/legal/cookie-policy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['tacLinkedin'], '');
        tarteaucitron.addScript('//platform.linkedin.com/in.js');
        if (tarteaucitron.isAjax === true) {
            if (typeof IN !== "undefined") {
                IN.parse();
            }
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'linkedin';
        tarteaucitron.fallback(['tacLinkedin'], tarteaucitron.engage(id));
    }
};

// mautic
tarteaucitron.services.mautic = {
    "key": "mautic",
    "type": "analytic",
    "name": "Mautic",
    "uri": "https://www.mautic.org/privacy-policy/",
    "needConsent": true,
    "cookies": ['mtc_id', 'mtc_sid'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.mauticurl === undefined) {
            return;
        }

        window.MauticTrackingObject = 'mt';
        window.mt = window.mt || function () {
            window.mt.q = window.mt.q || [];
            window.mt.q.push(arguments);
        };

        tarteaucitron.addScript(tarteaucitron.user.mauticurl, '', function () {
            mt('send', 'pageview');
        });
    }
};

// microsoftcampaignanalytics
tarteaucitron.services.microsoftcampaignanalytics = {
    "key": "microsoftcampaignanalytics",
    "type": "analytic",
    "name": "Microsoft Campaign Analytics",
    "uri": "https://privacy.microsoft.com/privacystatement/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.microsoftcampaignanalyticsUUID === undefined) {
            return;
        }

        tarteaucitron.addScript('//flex.atdmt.com/mstag/site/' + tarteaucitron.user.microsoftcampaignanalyticsUUID + '/mstag.js', 'mstag_tops', function () {
            window.mstag = { loadTag: function () { }, time: (new Date()).getTime() };
            window.mstag.loadTag("analytics", { dedup: "1", domainId: tarteaucitron.user.microsoftcampaignanalyticsdomainId, type: "1", actionid: tarteaucitron.user.microsoftcampaignanalyticsactionId });
        });
    }
};

// onesignal
tarteaucitron.services.onesignal = {
    "key": "onesignal",
    "type": "api",
    "name": "OneSignal",
    "uri": "https://onesignal.com/privacy_policy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.onesignalAppId === undefined) {
            return;
        }
        window.OneSignal = window.OneSignal || [];

        window.OneSignal.push(function () {
            window.OneSignal.init({
                appId: tarteaucitron.user.onesignalAppId,
            });
        });

        tarteaucitron.addScript('https://cdn.onesignal.com/sdks/OneSignalSDK.js');
    }
};

// pinterest
tarteaucitron.services.pinterest = {
    "key": "pinterest",
    "type": "social",
    "name": "Pinterest",
    "uri": "https://about.pinterest.com/privacy-policy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['tacPinterest'], '');
        tarteaucitron.addScript('//assets.pinterest.com/js/pinit.js');
    },
    "fallback": function () {
        "use strict";
        var id = 'pinterest';
        tarteaucitron.fallback(['tacPinterest'], tarteaucitron.engage(id));
    }
};

// prelinker
tarteaucitron.services.prelinker = {
    "key": "prelinker",
    "type": "ads",
    "name": "Prelinker",
    "uri": "https://www.prelinker.com/index/index/cgu/",
    "needConsent": true,
    "cookies": ['_sp_id.32f5', '_sp_ses.32f5'],
    "js": function () {
        "use strict";
        var uniqIds = [],
            i,
            uri;

        tarteaucitron.fallback(['prelinker-canvas'], function (x) {
            var uniqId = '_' + Math.random().toString(36).substr(2, 9);
            uniqIds.push(uniqId);
            return '<div id="' + uniqId + '" siteId="' + tarteaucitron.getElemAttr(x, 'siteId') + '" bannerId="' + tarteaucitron.getElemAttr(x, 'bannerId') + '" defaultLanguage="' + tarteaucitron.getElemAttr(x, 'defaultLanguage') + '" tracker="' + tarteaucitron.getElemAttr(x, 'tracker') + '"></div>';
        });

        for (i = 0; i < uniqIds.length; i += 1) {
            uri = 'https://promo.easy-dating.org/banner/index?';
            uri += 'site_id=' + tarteaucitron.getElemAttr(document.getElementById(uniqIds[i]), 'siteId') + '&';
            uri += 'banner_id=' + tarteaucitron.getElemAttr(document.getElementById(uniqIds[i]), 'bannerId') + '&';
            uri += 'default_language=' + tarteaucitron.getElemAttr(document.getElementById(uniqIds[i]), 'defaultLanguage') + '&';
            uri += 'tr4ck=' + tarteaucitron.getElemAttr(document.getElementById(uniqIds[i]), 'trackrt');

            tarteaucitron.makeAsync.init(uri, uniqIds[i]);
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'prelinker';
        tarteaucitron.fallback(['prelinker-canvas'], tarteaucitron.engage(id));
    }
};

// prezi
tarteaucitron.services.prezi = {
    "key": "prezi",
    "type": "video",
    "name": "Prezi",
    "uri": "https://prezi.com/privacy-policy/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['prezi-canvas'], function (x) {
            var frame_title = tarteaucitron.getElemAttr(x, "title") || 'Prezi iframe',
                id = tarteaucitron.getElemAttr(x, "data-id"),
                width = tarteaucitron.getElemAttr(x, "width"),
                height = tarteaucitron.getElemAttr(x, "height"),
                url = 'https://prezi.com/embed/' + id + '/?bgcolor=ffffff&amp;lock_to_path=0&amp;autoplay=0&amp;autohide_ctrls=0';

            var styleAttr = (width !== "" ? "width:" + parseInt(width, 10) + "px;" : "") + (height !== "" ? "height:" + parseInt(height, 10) + "px;" : "");

            return '<iframe title="' + frame_title + '" src="' + url + '" style="' + styleAttr + '" allowtransparency allowfullscreen></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'prezi';
        tarteaucitron.fallback(['prezi-canvas'], function (elem) {
            elem.style.width = tarteaucitron.getElemAttr(elem, 'width') + 'px';
            elem.style.height = tarteaucitron.getElemAttr(elem, 'height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// pubdirecte
tarteaucitron.services.pubdirecte = {
    "key": "pubdirecte",
    "type": "ads",
    "name": "Pubdirecte",
    "uri": "https://pubdirecte.com/contact.php",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        var uniqIds = [],
            i,
            uri;

        tarteaucitron.fallback(['pubdirecte-canvas'], function (x) {
            var uniqId = '_' + Math.random().toString(36).substr(2, 9);
            uniqIds.push(uniqId);
            return '<div id="' + uniqId + '" pid="' + tarteaucitron.getElemAttr(x, 'pid') + '" ref="' + tarteaucitron.getElemAttr(x, 'ref') + '"></div>';
        });

        for (i = 0; i < uniqIds.length; i += 1) {
            uri = '//www.pubdirecte.com/script/banniere.php?';
            uri += 'id=' + tarteaucitron.getElemAttr(document.getElementById(uniqIds[i]), 'pid') + '&';
            uri += 'ref=' + tarteaucitron.getElemAttr(document.getElementById(uniqIds[i]), 'ref');

            tarteaucitron.makeAsync.init(uri, uniqIds[i]);
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'pubdirecte';
        tarteaucitron.fallback(['pubdirecte-canvas'], tarteaucitron.engage(id));
    }
};

// purechat
tarteaucitron.services.purechat = {
    "key": "purechat",
    "type": "support",
    "name": "PureChat",
    "uri": "https://www.purechat.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.purechatId === undefined) {
            return;
        }

        tarteaucitron.addScript('//app.purechat.com/VisitorWidget/WidgetScript', '', function () {
            try {
                window.w = new PCWidget({ c: tarteaucitron.user.purechatId, f: true });
            } catch (e) { }
        });
    }
};

// Intercom
tarteaucitron.services.intercomChat = {
    "key": "intercomChat",
    "type": "support",
    "name": "Intercom",
    "uri": "https://www.intercom.com/",
    "needConsent": true,
    "cookies": [
        "intercom-id-" + tarteaucitron.user.intercomKey,
        "intercom-session-" + tarteaucitron.user.intercomKey,
    ],
    "readmoreLink": "https://www.intercom.com/legal/privacy",
    "js": function () {

        if (tarteaucitron.user.intercomKey === undefined) {
            return;
        }

        window.intercomSettings = {
            app_id: tarteaucitron.user.intercomKey,
        };

        var w = window;
        var ic = w.Intercom;
        if (typeof ic === "function") {
            ic("reattach_activator");
            ic("update", w.intercomSettings);
        } else {
            var i = function () {
                i.c(arguments);
            };
            i.q = [];
            i.c = function (args) {
                i.q.push(args);
            };
            w.Intercom = i;
            tarteaucitron.addScript(
                "https://widget.intercom.io/widget/" + tarteaucitron.user.intercomKey,
                "",
                function () {
                    // Execute callback if function `intercomChatEnable`
                    // is defined
                    if (typeof intercomChatEnable === 'function') {
                        intercomChatEnable()
                    }
                }
            );
        }
    },
    "fallback": function () {
        "use strict";
        var id = "intercomChat";
        tarteaucitron.fallback(
            ["intercom-chat"],
            function () {
                // Execute callback if function `intercomChatDisable`
                // is defined
                if (typeof intercomChatDisable === 'function') {
                    intercomChatDisable()
                }
                return tarteaucitron.engage(id)
            }
        );
    },
};

// rumbletalk
tarteaucitron.services.rumbletalk = {
    "key": "rumbletalk",
    "type": "social",
    "name": "RumbleTalk",
    "needConsent": true,
    "cookies": ['AWSALB'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.rumbletalkid === undefined) {
            return;
        }

        tarteaucitron.addScript('https://rumbletalk.com/client/?' + tarteaucitron.user.rumbletalkid);

        tarteaucitron.fallback(['rumbletalk'], function (x) {
            var width = tarteaucitron.getElemWidth(x),
                height = tarteaucitron.getElemHeight(x),
                id = tarteaucitron.getElemAttr(x, "data-id");

            return '<div style="height: ' + height + 'px; width: ' + width + 'px;"><div id="' + id + '"></div></div>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'rumbletalk';
        tarteaucitron.fallback(['rumbletalk'], function (elem) {
            elem.style.width = tarteaucitron.getElemWidth(elem) + 'px';
            elem.style.height = tarteaucitron.getElemHeight(elem) + 'px';

            return tarteaucitron.engage(id);
        });
    }
};

// shareaholic
tarteaucitron.services.shareaholic = {
    "key": "shareaholic",
    "type": "social",
    "name": "Shareaholic",
    "uri": "https://shareaholic.com/privacy/choices",
    "needConsent": true,
    "cookies": ['__utma', '__utmb', '__utmc', '__utmz', '__utmt_Shareaholic%20Pageviews'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.shareaholicSiteId === undefined) {
            return;
        }

        tarteaucitron.fallback(['shareaholic-canvas'], '');
        tarteaucitron.addScript('//dsms0mj1bbhn4.cloudfront.net/assets/pub/shareaholic.js', '', function () {
            try {
                Shareaholic.init(tarteaucitron.user.shareaholicSiteId);
            } catch (e) { }
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'shareaholic';
        tarteaucitron.fallback(['shareaholic-canvas'], tarteaucitron.engage(id));
    }
};

// shareasale
tarteaucitron.services.shareasale = {
    "key": "shareasale",
    "type": "ads",
    "name": "ShareASale",
    "uri": "https://www.shareasale.com/PrivacyPolicy.pdf",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        var uniqIds = [],
            i,
            uri;

        tarteaucitron.fallback(['shareasale-canvas'], function (x) {
            var uniqId = '_' + Math.random().toString(36).substr(2, 9);
            uniqIds.push(uniqId);
            return '<div id="' + uniqId + '" amount="' + tarteaucitron.getElemAttr(x, 'amount') + '" tracking="' + tarteaucitron.getElemAttr(x, 'tracking') + '" transtype="' + tarteaucitron.getElemAttr(x, 'transtype') + '" persale="' + tarteaucitron.getElemAttr(x, 'persale') + '" perlead="' + tarteaucitron.getElemAttr(x, 'perlead') + '" perhit="' + tarteaucitron.getElemAttr(x, 'perhit') + '" merchantID="' + tarteaucitron.getElemAttr(x, 'merchantID') + '"></div>';
        });

        for (i = 0; i < uniqIds.length; i += 1) {
            uri = 'https://shareasale.com/sale.cfm?';
            uri += 'amount=' + tarteaucitron.getElemAttr(document.getElementById(uniqIds[i]), 'amount') + '&';
            uri += 'tracking=' + tarteaucitron.getElemAttr(document.getElementById(uniqIds[i]), 'tracking') + '&';
            uri += 'transtype=' + tarteaucitron.getElemAttr(document.getElementById(uniqIds[i]), 'transtype') + '&';
            uri += 'persale=' + tarteaucitron.getElemAttr(document.getElementById(uniqIds[i]), 'persale') + '&';
            uri += 'perlead=' + tarteaucitron.getElemAttr(document.getElementById(uniqIds[i]), 'perlead') + '&';
            uri += 'perhit=' + tarteaucitron.getElemAttr(document.getElementById(uniqIds[i]), 'perhit') + '&';
            uri += 'merchantID=' + tarteaucitron.getElemAttr(document.getElementById(uniqIds[i]), 'merchantID');

            document.getElementById(uniqIds[i]).innerHTML = '<img src=\'' + uri + '\' width=\'1\' height=\'1\' />';
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'shareasale';
        tarteaucitron.fallback(['shareasale-canvas'], tarteaucitron.engage(id));
    }
};

// sharethis
tarteaucitron.services.sharethis = {
    "key": "sharethis",
    "type": "social",
    "name": "ShareThis",
    "uri": "https://www.sharethis.com/legal/privacy/",
    "needConsent": true,
    "cookies": ['__unam'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.sharethisPublisher === undefined) {
            return;
        }
        var switchTo5x = true,
            uri = ('https:' === document.location.protocol ? 'https://ws' : 'http://w') + '.sharethis.com/button/buttons.js';

        tarteaucitron.fallback(['tacSharethis'], '');
        tarteaucitron.addScript(uri, '', function () {
            stLight.options({ publisher: tarteaucitron.user.sharethisPublisher, doNotHash: false, doNotCopy: false, hashAddressBar: false });
        });

        if (tarteaucitron.isAjax === true) {
            if (typeof stButtons !== "undefined") {
                stButtons.locateElements();
            }
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'sharethis';
        tarteaucitron.fallback(['tacSharethis'], tarteaucitron.engage(id));
    }
};

// slideshare
tarteaucitron.services.slideshare = {
    "key": "slideshare",
    "type": "video",
    "name": "SlideShare",
    "uri": "https://www.linkedin.com/legal/privacy-policy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['slideshare-canvas'], function (x) {
            var frame_title = tarteaucitron.getElemAttr(x, "title") || 'Slideshare iframe',
                id = tarteaucitron.getElemAttr(x, "data-id"),
                width = tarteaucitron.getElemAttr(x, "width"),
                height = tarteaucitron.getElemAttr(x, "height"),
                url = '//www.slideshare.net/slideshow/embed_code/key/' + id;

            var styleAttr = (width !== "" ? "width:" + parseInt(width, 10) + "px;" : "") + (height !== "" ? "height:" + parseInt(height, 10) + "px;" : "");

            return '<iframe title="' + frame_title + '" src="' + url + '" style="' + styleAttr + '" allowtransparency allowfullscreen></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'slideshare';
        tarteaucitron.fallback(['slideshare-canvas'], function (elem) {
            elem.style.width = tarteaucitron.getElemAttr(elem, 'width') + 'px';
            elem.style.height = tarteaucitron.getElemAttr(elem, 'height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// soundcloud
tarteaucitron.services.soundcloud = {
    key: 'soundcloud',
    type: 'video',
    name: 'SoundCloud',
    needConsent: true,
    uri: "https://soundcloud.com/pages/privacy",
    cookies: ['sc_anonymous_id', 'sclocale'],
    js: function () {
        "use strict";
        tarteaucitron.fallback(['soundcloud_player'], function (x) {
            var frame_title = tarteaucitron.getElemAttr(x, "title") || 'Soundcloud iframe',
                player_height = tarteaucitron.getElemAttr(x, 'data-height'),
                frame_height = 'height:' + parseInt(player_height, 10) + 'px;',
                playable_id = tarteaucitron.getElemAttr(x, 'data-playable-id'),
                playable_type = tarteaucitron.getElemAttr(x, 'data-playable-type'),
                playable_url = tarteaucitron.getElemAttr(x, 'data-playable-url'),
                color = tarteaucitron.getElemAttr(x, 'data-color'),
                autoplay = tarteaucitron.getElemAttr(x, 'data-auto-play'),
                hideRelated = tarteaucitron.getElemAttr(x, 'data-hide-related'),
                showComments = tarteaucitron.getElemAttr(x, 'data-show-comments'),
                showUser = tarteaucitron.getElemAttr(x, 'data-show-user'),
                showReposts = tarteaucitron.getElemAttr(x, 'data-show-reposts'),
                showTeaser = tarteaucitron.getElemAttr(x, 'data-show-teaser'),
                visual = tarteaucitron.getElemAttr(x, 'data-visual'),
                artwork = tarteaucitron.getElemAttr(x, 'data-artwork');

            var allowAutoplay = autoplay === 'true' ? 'allow="autoplay"' : '';

            if (playable_id === undefined && playable_url === undefined) {
                return "";
            }

            // Allow to embed from API results (playable_type + playable_id)
            var qs = '?url=https%3A//api.soundcloud.com/' + playable_type + '/' + playable_id;
            // Or from raw URL from Soundcloud website
            if (playable_url && playable_url.length > 0) qs = '?url=' + escape(playable_url);

            if (hideRelated && hideRelated.length > 0) qs += '&hide_related=' + hideRelated;
            if (color && color.length > 0) qs += '&color=' + color.replace('#', '%23');
            if (autoplay && autoplay.length > 0) qs += '&auto_play=' + autoplay;
            if (showComments && showComments.length > 0) qs += '&show_comments=' + showComments;
            if (hideRelated && hideRelated.length > 0) qs += '&hide_related=' + hideRelated;
            if (showUser && showUser.length > 0) qs += '&show_user=' + showUser;
            if (showReposts && showReposts.length > 0) qs += '&show_reposts=' + showReposts;
            if (showTeaser && showTeaser.length > 0) qs += '&show_teaser=' + showTeaser;
            if (visual && visual.length > 0) qs += '&visual=' + visual;
            if (artwork && artwork.length > 0) qs += '&show_artwork=' + artwork;

            return '<iframe title="' + frame_title + '" style="width:100%;' + frame_height + '" ' + allowAutoplay + ' src="https://w.soundcloud.com/player/' + qs + '"></iframe>';
        });
    },
    fallback: function () {
        "use strict";
        tarteaucitron.fallback(['soundcloud_player'], function (elem) {
            elem.style.height = tarteaucitron.getElemAttr(elem, 'data-height') + 'px';
            return tarteaucitron.engage('soundcloud');
        });
    }
};

// spotify
tarteaucitron.services.spotify = {
    "key": "spotify",
    "type": "video",
    "name": "Spotify",
    "uri": "https://www.spotify.com/us/legal/privacy-policy/",
    "needConsent": true,
    "cookies": ['sp_landing', '_ga', 'sp_ab', 'sp_landingref', 'sp_t', 'sp_usid', 'OptanonConsent', 'sp_m', 'spot'],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['spotify_player'], function (x) {
            var frame_title = tarteaucitron.getElemAttr(x, "title") || 'Spotify iframe',
                spotify_id = tarteaucitron.getElemAttr(x, "spotifyID"),
                spotify_width = tarteaucitron.getElemAttr(x, "width"),
                spotify_height = tarteaucitron.getElemAttr(x, "height"),
                styleAttr = "",
                spotify_frame;

            if (spotify_id === undefined) {
                return "";
            }
            if (spotify_width !== "") {
                styleAttr += 'width:' + parseInt(spotify_width, 10) + 'px;';
            }
            if (spotify_height !== "") {
                styleAttr += 'height:' + parseInt(spotify_height, 10) + 'px;';
            }
            spotify_frame = '<iframe title="' + frame_title + '" src="//open.spotify.com/embed/' + spotify_id + '" style="' + styleAttr + '" allowfullscreen></iframe>';
            return spotify_frame;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'spotify';
        tarteaucitron.fallback(['spotify_player'], function (elem) {
            elem.style.width = tarteaucitron.getElemAttr(elem, 'width') + 'px';
            elem.style.height = tarteaucitron.getElemAttr(elem, 'height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// statcounter
tarteaucitron.services.statcounter = {
    "key": "statcounter",
    "type": "analytic",
    "name": "StatCounter",
    "uri": "https://fr.statcounter.com/about/legal/#privacy",
    "needConsent": true,
    "cookies": ['sc_is_visitor_unique'],
    "js": function () {
        "use strict";
        var uniqIds = [],
            i,
            uri = '//statcounter.com/counter/counter.js';

        tarteaucitron.fallback(['statcounter-canvas'], function (x) {
            var uniqId = '_' + Math.random().toString(36).substr(2, 9);
            uniqIds.push(uniqId);
            return '<div id="' + uniqId + '"></div>';
        });

        for (i = 0; i < uniqIds.length; i += 1) {
            tarteaucitron.makeAsync.init(uri, uniqIds[i]);
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'statcounter';
        tarteaucitron.fallback(['statcounter-canvas'], tarteaucitron.engage(id));
    }
};

// timelinejs
tarteaucitron.services.timelinejs = {
    "key": "timelinejs",
    "type": "api",
    "name": "Timeline JS",
    "uri": "https://timeline.knightlab.com/#help",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['timelinejs-canvas'], function (x) {
            var frame_title = tarteaucitron.getElemAttr(x, "title") || 'Twitter iframe',
                spreadsheet_id = tarteaucitron.getElemAttr(x, "spreadsheet_id"),
                width = tarteaucitron.getElemAttr(x, "width"),
                height = tarteaucitron.getElemAttr(x, "height"),
                lang = tarteaucitron.getElemAttr(x, "lang_2_letter"),
                font = tarteaucitron.getElemAttr(x, "font"),
                map = tarteaucitron.getElemAttr(x, "map"),
                start_at_end = tarteaucitron.getElemAttr(x, "start_at_end"),
                hash_bookmark = tarteaucitron.getElemAttr(x, "hash_bookmark"),
                start_at_slide = tarteaucitron.getElemAttr(x, "start_at_slide"),
                start_zoom = tarteaucitron.getElemAttr(x, "start_zoom"),
                url = '//cdn.knightlab.com/libs/timeline/latest/embed/index.html?source=' + spreadsheet_id + '&font=' + font + '&maptype=' + map + '&lang=' + lang + '&start_at_end=' + start_at_end + '&hash_bookmark=' + hash_bookmark + '&start_at_slide=' + start_at_slide + '&start_zoom_adjust=' + start_zoom + '&height=' + height;

            var styleAttr = (width !== "" ? "width:" + parseInt(width, 10) + "px;" : "") + (height !== "" ? "height:" + parseInt(height, 10) + "px;" : "");

            return '<iframe title="' + frame_title + '" src="' + url + '" style="' + styleAttr + '" allowtransparency allowfullscreen></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'timelinejs';
        tarteaucitron.fallback(['timelinejs-canvas'], function (elem) {
            elem.style.width = tarteaucitron.getElemAttr(elem, 'width') + 'px';
            elem.style.height = tarteaucitron.getElemAttr(elem, 'height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// tagcommander
tarteaucitron.services.tagcommander = {
    "key": "tagcommander",
    "type": "api",
    "name": "TagCommander",
    "uri": "https://www.commandersact.com/en/privacy/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.tagcommanderid === undefined) {
            return;
        }
        tarteaucitron.addScript('https://cdn.tagcommander.com/' + tarteaucitron.user.tagcommanderid + '.js');
    }
};

// typekit
tarteaucitron.services.typekit = {
    "key": "typekit",
    "type": "api",
    "name": "Typekit (adobe)",
    "uri": "https://www.adobe.com/privacy.html",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.typekitId === undefined) {
            return;
        }
        tarteaucitron.addScript('//use.typekit.net/' + tarteaucitron.user.typekitId + '.js', '', function () {
            try {
                Typekit.load();
            } catch (e) { }
        });
    }
};

// twenga
tarteaucitron.services.twenga = {
    "key": "twenga",
    "type": "ads",
    "name": "Twenga",
    "uri": "https://www.twenga.com/privacy.php",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.twengaId === undefined || tarteaucitron.user.twengaLocale === undefined) {
            return;
        }

        tarteaucitron.addScript('//tracker.twenga.' + tarteaucitron.user.twengaLocale + '/st/tracker_' + tarteaucitron.user.twengaId + '.js');
    }
};

// twitter
tarteaucitron.services.twitter = {
    "key": "twitter",
    "type": "social",
    "name": "X (formerly Twitter)",
    "uri": "https://support.twitter.com/articles/20170514",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['tacTwitter'], '');
        tarteaucitron.addScript('//platform.twitter.com/widgets.js', 'twitter-wjs');
    },
    "fallback": function () {
        "use strict";
        var id = 'twitter';
        tarteaucitron.fallback(['tacTwitter'], tarteaucitron.engage(id));
    }
};

// twitter embed
tarteaucitron.services.twitterembed = {
    "key": "twitterembed",
    "type": "social",
    "name": "X (formerly Twitter) cards",
    "uri": "https://support.twitter.com/articles/20170514",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        var uniqIds = [],
            i,
            e,
            html;

        tarteaucitron.fallback(['twitterembed-canvas'], function (x) {
            var uniqId = '_' + Math.random().toString(36).substr(2, 9);
            uniqIds.push(uniqId);
            html = '<div id="' + uniqId + '" ';
            html += 'tweetid="' + tarteaucitron.getElemAttr(x, 'tweetid') + '" ';
            html += 'theme="' + tarteaucitron.getElemAttr(x, 'theme') + '" ';
            html += 'cards="' + tarteaucitron.getElemAttr(x, 'cards') + '" ';
            html += 'conversation="' + tarteaucitron.getElemAttr(x, 'conversation') + '" ';
            html += 'data-width="' + tarteaucitron.getElemAttr(x, 'data-width') + '" ';
            html += 'data-align="' + tarteaucitron.getElemAttr(x, 'data-align') + '" ';
            html += '></div>';
            return html;
        });

        tarteaucitron.addScript('//platform.twitter.com/widgets.js', 'twitter-wjs', function () {
            var i;
            for (i = 0; i < uniqIds.length; i += 1) {
                e = document.getElementById(uniqIds[i]);
                twttr.widgets.createTweet(
                    tarteaucitron.getElemAttr(e, 'tweetid'),
                    e,
                    {
                        theme: tarteaucitron.getElemAttr(e, 'theme'),
                        cards: tarteaucitron.getElemAttr(e, 'cards'),
                        conversation: tarteaucitron.getElemAttr(e, 'conversation'),
                        lang: tarteaucitron.getLanguage(),
                        dnt: true,
                        width: tarteaucitron.getElemAttr(e, 'data-width'),
                        align: tarteaucitron.getElemAttr(e, 'data-align')
                    }
                );
            }
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'twitterembed';
        tarteaucitron.fallback(['twitterembed-canvas'], function (elem) {
            elem.style.width = tarteaucitron.getElemAttr(elem, 'data-width') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// twitter timeline
tarteaucitron.services.twittertimeline = {
    "key": "twittertimeline",
    "type": "social",
    "name": "X (formerly Twitter) timelines",
    "uri": "https://support.twitter.com/articles/20170514",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['tacTwitterTimelines'], '');
        tarteaucitron.addScript('https://platform.twitter.com/widgets.js', 'twitter-wjs');
    },
    "fallback": function () {
        "use strict";
        var id = 'twittertimeline';
        tarteaucitron.fallback(['tacTwitterTimelines'], tarteaucitron.engage(id));
    }
};

// twitter universal website tag
tarteaucitron.services.twitteruwt = {
    "key": "twitteruwt",
    "type": "analytic",
    "name": "X (formerly Twitter) Universal Website Tag",
    "uri": "https://business.twitter.com/en/help/campaign-measurement-and-analytics/conversion-tracking-for-websites.html",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.twitteruwtId === undefined) {
            return;
        }

        window.twq = function () {
            window.twq.exe ? window.twq.exe.apply(window.twq, arguments) : window.twq.queue.push(arguments);
        }
        window.twq.version = '1.1';
        window.twq.queue = [];

        tarteaucitron.addScript('https://static.ads-twitter.com/uwt.js', '', function () {
            window.twq('init', tarteaucitron.user.twitteruwtId);
            window.twq('track', 'PageView');
        });
    }
};

// user voice
tarteaucitron.services.uservoice = {
    "key": "uservoice",
    "type": "support",
    "name": "UserVoice",
    "uri": "https://www.uservoice.com/privacy/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.userVoiceApi === undefined) {
            return;
        }
        tarteaucitron.addScript('//widget.uservoice.com/' + tarteaucitron.user.userVoiceApi + '.js');
    }
};

// vimeo
tarteaucitron.services.vimeo = {
    "key": "vimeo",
    "type": "video",
    "name": "Vimeo",
    "uri": "https://vimeo.com/privacy",
    "needConsent": true,
    "cookies": ['__utmt_player', '__utma', '__utmb', '__utmc', '__utmv', 'vuid', '__utmz', 'player'],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['vimeo_player'], function (x) {
            var frame_title = tarteaucitron.getElemAttr(x, "title") || 'Vimeo iframe',
                video_width = tarteaucitron.getElemAttr(x, "width"),
                video_height = tarteaucitron.getElemAttr(x, "height"),
                styleAttr = "",

                video_id = tarteaucitron.getElemAttr(x, "videoID"),
                video_hash = tarteaucitron.getElemAttr(x, "data-hash") || '',
                video_allowfullscreen = tarteaucitron.getElemAttr(x, "data-allowfullscreen"),

                video_qs = "",
                attrs = ["title", "byline", "portrait", "loop", "autoplay", "autopause", "background", "color", "controls", "maxheight", "maxwidth", "muted", "playsinline", "speed", "transparent"],
                params = attrs.filter(function (a) {
                    return tarteaucitron.getElemAttr(x, a) !== null;
                }).map(function (a) {
                    return a + "=" + tarteaucitron.getElemAttr(x, a);
                }),

                video_frame;

            if (video_id === undefined) {
                return "";
            }

            // query params
            if (video_hash.length > 0) {
                params.push("h=" + video_hash);
            }
            if (params.length > 0) {
                video_qs = "?" + params.join("&");
            }

            // attributes
            if (video_width !== undefined) {
                styleAttr += 'width:' + parseInt(video_width, 10) + 'px;';
            }
            if (video_height !== undefined) {
                styleAttr += 'height:' + parseInt(video_height, 10) + 'px;';
            }

            video_frame = '<iframe title="' + frame_title + '" src="//player.vimeo.com/video/' + video_id + video_qs + '" style="' + styleAttr + '" ' + (video_allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';

            return video_frame;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'vimeo';
        tarteaucitron.fallback(['vimeo_player'], function (elem) {
            elem.style.width = tarteaucitron.getElemAttr(elem, 'width') + 'px';
            elem.style.height = tarteaucitron.getElemAttr(elem, 'height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// visualrevenue
tarteaucitron.services.visualrevenue = {
    "key": "visualrevenue",
    "type": "analytic",
    "name": "VisualRevenue",
    "uri": "https://www.outbrain.com/legal/privacy-713/",
    "needConsent": true,
    "cookies": ['__vrf', '__vrm', '__vrl', '__vry', '__vru', '__vrid', '__vrz'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.visualrevenueId === undefined) {
            return;
        }
        window._vrq = window._vrq || [];
        window._vrq.push(['id', tarteaucitron.user.visualrevenueId]);
        window._vrq.push(['automate', true]);
        window._vrq.push(['track', function () { }]);
        tarteaucitron.addScript('https://a.visualrevenue.com/vrs.js');
    }
};

// verizon dot tag
tarteaucitron.services.verizondottag = {
    "key": "verizondottag",
    "type": "analytic",
    "name": "Verizon Dot Tag",
    "uri": "https://developer.verizonmedia.com/native/guide/audience-management/dottags/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.verizondottagProjectId === undefined) {
            return;
        }

        window.dotq = window.dotq || [];
        window.dotq.push({
            'projectId': tarteaucitron.user.verizondottagProjectId,
            'properties': { 'pixelId': tarteaucitron.user.verizondottagPixelId }
        });

        tarteaucitron.addScript('https://s.yimg.com/wi/ytc.js', '', function () {
            //const items = window.dotq;
            window.dotq = [];
            window.dotq.push = function (item) {
                YAHOO.ywa.I13N.fireBeacon([item])
            };
            YAHOO.ywa.I13N.fireBeacon(items)
        });
    }
};

// vshop
tarteaucitron.services.vshop = {
    "key": "vshop",
    "type": "ads",
    "name": "vShop",
    "uri": "https://vshop.fr/privacy-policy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['vcashW'], '');
        tarteaucitron.addScript('//vshop.fr/js/w.js');
    },
    "fallback": function () {
        "use strict";
        var id = 'vshop';
        tarteaucitron.fallback(['vcashW'], tarteaucitron.engage(id));
    }
};

// wysistat
tarteaucitron.services.wysistat = {
    "key": "wysistat",
    "type": "analytic",
    "name": "Wysistat",
    "uri": "https://wysistat.net/contact/",
    "needConsent": true,
    "cookies": ['Wysistat'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.wysistat === undefined) {
            return;
        }
        tarteaucitron.addScript('//www.wysistat.com/statistique.js', '', function () {
            window.stat(tarteaucitron.user.wysistat.cli, tarteaucitron.user.wysistat.frm, tarteaucitron.user.wysistat.prm, tarteaucitron.user.wysistat.ce, tarteaucitron.user.wysistat.page, tarteaucitron.user.wysistat.roi, tarteaucitron.user.wysistat.prof, tarteaucitron.user.wysistat.cpt);
        });
    }
};

// xiti
tarteaucitron.services.xiti = {
    "key": "xiti",
    "type": "analytic",
    "name": "Xiti",
    "uri": "https://www.atinternet.com/rgpd-et-vie-privee/",
    "needConsent": true,
    "cookies": [],
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
        Xt_i += 'src="https://logv3.xiti.com/hit.xiti?' + Xt_param;
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
    }
};

// AT Internet
tarteaucitron.services.atinternet = {
    "key": "atinternet",
    "type": "analytic",
    "name": "AT Internet (privacy by design)",
    "uri": "https://www.atinternet.com/rgpd-et-vie-privee/",
    "needConsent": true,
    "safeanalytic": false,
    "cookies": ['atidvisitor', 'atreman', 'atredir', 'atsession'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.atLibUrl === undefined) {
            return;
        }

        if (tarteaucitron.user.atinternetAlreadyLoaded !== undefined) {
            return;
        }

        tarteaucitron.addScript(tarteaucitron.user.atLibUrl, '', function () {

            window.tag = new ATInternet.Tracker.Tag();

            if (typeof window.tag.privacy !== 'undefined') {
                window.tag.privacy.setVisitorOptin();
            }

            if (typeof tarteaucitron.user.atMore === 'function') {
                tarteaucitron.user.atMore();
            }

            if (tarteaucitron.user.atinternetSendData !== false) {
                window.tag.page.send();
            }
        });
    },
    "fallback": function () {
        "use strict";
        if (tarteaucitron.user.atLibUrl === undefined) {
            return;
        }

        if (tarteaucitron.user.atNoFallback === true) {
            return;
        }

        tarteaucitron.user.atinternetAlreadyLoaded = true;

        tarteaucitron.addScript(tarteaucitron.user.atLibUrl, '', function () {

            window.tag = new ATInternet.Tracker.Tag();

            if (typeof window.tag.privacy !== 'undefined') {

                var visitorMode = window.tag.privacy.getVisitorMode();
                if (visitorMode !== null && visitorMode.name !== undefined && visitorMode.name == "optout") {
                    window.tag.privacy.setVisitorOptout();
                } else {
                    window.tag.privacy.setVisitorMode('cnil', 'exempt');
                }
            }

            if (typeof tarteaucitron.user.atMore === 'function') {
                tarteaucitron.user.atMore();
            }

            if (tarteaucitron.user.atinternetSendData !== false) {
                window.tag.page.send();
            }
        });
    }
};

// AT Internet
tarteaucitron.services.atinternethightrack = {
    "key": "atinternethightrack",
    "type": "analytic",
    "name": "AT Internet",
    "uri": "https://www.atinternet.com/rgpd-et-vie-privee/",
    "needConsent": true,
    "cookies": ['atidvisitor', 'atreman', 'atredir', 'atsession'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.atLibUrl === undefined) {
            return;
        }

        tarteaucitron.addScript(tarteaucitron.user.atLibUrl, '', function () {

            var tag = new ATInternet.Tracker.Tag();

            if (typeof tarteaucitron.user.atMore === 'function') {
                tarteaucitron.user.atMore();
            }
        })
    }
};

// youtube
tarteaucitron.services.youtube = {
    "key": "youtube",
    "type": "video",
    "name": "YouTube",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": ['VISITOR_INFO1_LIVE', 'YSC', 'PREF', 'GEUP'],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['youtube_player'], function (x) {
            var frame_title = tarteaucitron.getElemAttr(x, "title") || 'Youtube iframe',
                video_id = tarteaucitron.getElemAttr(x, "videoID"),
                srcdoc = tarteaucitron.getElemAttr(x, "srcdoc"),
                loading = tarteaucitron.getElemAttr(x, "loading"),
                video_width = tarteaucitron.getElemAttr(x, "width"),
                video_height = tarteaucitron.getElemAttr(x, "height"),
                styleAttr = "",
                video_frame,
                allowfullscreen = tarteaucitron.getElemAttr(x, "allowfullscreen"),
                start = tarteaucitron.getElemAttr(x, "start"),
                end = tarteaucitron.getElemAttr(x, "end"),
                attrs = ["theme", "rel", "controls", "showinfo", "autoplay", "mute", "start", "end", "loop", "enablejsapi"],
                params = attrs.filter(function (a) {
                    return tarteaucitron.getElemAttr(x, a) !== null;
                }).map(function (a) {
                    return a + "=" + tarteaucitron.getElemAttr(x, a);
                }).join("&");

            if(tarteaucitron.getElemAttr(x, "loop") == 1) {
                params = params + "&playlist=" + video_id;
            }

            if (video_id === undefined) {
                return "";
            }
            if (video_width !== "") {
                styleAttr += 'width:' + parseInt(video_width, 10) + 'px;';
            }
            if (video_height !== "") {
                styleAttr += 'height:' + parseInt(video_height, 10) + 'px;';
            }

            if (srcdoc !== undefined && srcdoc !== null && srcdoc !== "") {
                srcdoc = 'srcdoc="' + srcdoc + '" ';
            } else {
                srcdoc = '';
            }

            if (loading !== undefined && loading !== null && loading !== "") {
                loading = 'loading ';
            } else {
                loading = '';
            }

            video_frame = '<iframe title="' + frame_title + '" style="' + styleAttr + '" src="//www.youtube-nocookie.com/embed/' + video_id + '?' + params + '"' + (allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + ' ' + srcdoc + ' ' + loading + '></iframe>';
            return video_frame;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'youtube';
        tarteaucitron.fallback(['youtube_player'], function (elem) {
            elem.style.width = tarteaucitron.getElemAttr(elem,'width') + 'px';
            elem.style.height = tarteaucitron.getElemAttr(elem,'height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// youtube playlist
tarteaucitron.services.youtubeplaylist = {
    "key": "youtubeplaylist",
    "type": "video",
    "name": "YouTube (playlist)",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": ['VISITOR_INFO1_LIVE', 'YSC', 'PREF', 'GEUP'],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['youtube_playlist_player'], function (x) {
            var frame_title = tarteaucitron.getElemAttr(x, "title") || 'Youtube iframe',
                playlist_id = tarteaucitron.getElemAttr(x, "playlistID"),
                video_width = tarteaucitron.getElemAttr(x, "width"),
                video_height = tarteaucitron.getElemAttr(x, "height"),
                styleAttr = "",
                video_frame,
                allowfullscreen = tarteaucitron.getElemAttr(x, "allowfullscreen"),
                params = 'theme=' + tarteaucitron.getElemAttr(x, "theme") + '&rel=' + tarteaucitron.getElemAttr(x, "rel") + '&controls=' + tarteaucitron.getElemAttr(x, "controls") + '&showinfo=' + tarteaucitron.getElemAttr(x, "showinfo") + '&autoplay=' + tarteaucitron.getElemAttr(x, "autoplay") + '&mute=' + tarteaucitron.getElemAttr(x, "mute");

            if (playlist_id === undefined) {
                return "";
            }
            if (video_width !== "") {
                styleAttr += 'width:' + parseInt(video_width, 10) + 'px;';
            }
            if (video_height !== "") {
                styleAttr += 'height:' + parseInt(video_height, 10) + 'px;';
            }
            video_frame = '<iframe title="' + frame_title + '" style="' + styleAttr + '" src="//www.youtube-nocookie.com/embed/videoseries?list=' + playlist_id + '&' + params + '"' + (allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';
            return video_frame;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'youtubeplaylist';
        tarteaucitron.fallback(['youtube_playlist_player'], function (elem) {
            elem.style.width = tarteaucitron.getElemAttr(elem,'width') + 'px';
            elem.style.height = tarteaucitron.getElemAttr(elem,'height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// zopim
tarteaucitron.services.zopim = {
    "key": "zopim",
    "type": "support",
    "name": "Zopim",
    "uri": "https://www.zopim.com/privacy",
    "needConsent": true,
    "cookies": ['__zlcid', '__zprivacy'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.zopimID === undefined) {
            return;
        }
        tarteaucitron.addScript('//v2.zopim.com/?' + tarteaucitron.user.zopimID);
    }
};

// kameleoon
tarteaucitron.services.kameleoon = {
    "key": "kameleoon",
    "type": "analytic",
    "name": "Kameleoon",
    "uri": "https://www.kameleoon.com/fr/compliance/rgpd",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.kameleoon !== undefined) {
            tarteaucitron.addScript("https://" + tarteaucitron.user.kameleoon + ".kameleoon.eu/kameleoon.js");
        }
    }
};

// linkedin insight
tarteaucitron.services.linkedininsighttag = {
    "key": "linkedininsighttag",
    "type": "ads",
    "name": "Linkedin Insight",
    "uri": "https://www.linkedin.com/legal/cookie-policy",
    "needConsent": true,
    "cookies": ['li_fat_id'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.linkedininsighttag !== undefined) {
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(tarteaucitron.user.linkedininsighttag);
        }

        tarteaucitron.addScript('https://snap.licdn.com/li.lms-analytics/insight.min.js');
    }
};

// xiti smartTag
tarteaucitron.services.xiti_smarttag = {
    "key": "xiti_smarttag",
    "type": "analytic",
    "name": "Xiti (SmartTag)",
    "uri": "https://www.atinternet.com/rgpd-et-vie-privee/",
    "needConsent": true,
    "cookies": ["atidvisitor", "atreman", "atredir", "atsession", "attvtreman", "attvtsession"],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.xiti_smarttagLocalPath !== undefined) {
            tarteaucitron.addScript(tarteaucitron.user.xiti_smarttagLocalPath, 'smarttag', null, null, "onload", "addTracker();");
        } else {
            var xitiSmarttagId = tarteaucitron.user.xiti_smarttagSiteId;
            if (xitiSmarttagId === undefined) {
                return;
            }

            tarteaucitron.addScript('//tag.aticdn.net/' + xitiSmarttagId + '/smarttag.js', 'smarttag', null, null, "onload", "addTracker();");
        }
    }
};

// facebook pixel
tarteaucitron.services.facebookpixel = {
    "key": "facebookpixel",
    "type": "ads",
    "name": "Facebook Pixel",
    "uri": "https://www.facebook.com/policy.php",
    "needConsent": true,
    "cookies": ['datr', 'fr', 'reg_ext_ref', 'reg_fb_gate', 'reg_fb_ref', 'sb', 'wd', 'x-src', '_fbp'],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.facebookpixelId === undefined) {
            return;
        }

        var n;
        if (window.fbq) return;
        n = window.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments) };
        if (!window._fbq) window._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        tarteaucitron.addScript('https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', tarteaucitron.user.facebookpixelId);
        fbq('track', 'PageView');

        if (typeof tarteaucitron.user.facebookpixelMore === 'function') {
            tarteaucitron.user.facebookpixelMore();
        }
    }
};

//Issuu
tarteaucitron.services.issuu = {
    "key": "issuu",
    "type": "other",
    "name": "Issuu",
    "uri": "https://issuu.com/legal/privacy",
    "needConsent": true,
    "cookies": ['__qca', 'iutk', 'mc'],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['issuu_player'], function (x) {
            var frame_title = tarteaucitron.getElemAttr(x, "title") || 'Issuu iframe',
                issuu_id = tarteaucitron.getElemAttr(x, "issuuID"),
                issuu_width = tarteaucitron.getElemAttr(x, "width"),
                issuu_height = tarteaucitron.getElemAttr(x, "height"),
                styleAttr = "",
                issuu_frame,
                issuu_embed;

            if (issuu_id === undefined) {
                return "";
            }
            if (issuu_width !== "") {
                styleAttr += 'width:' + parseInt(issuu_width, 10) + 'px;';
            }
            if (issuu_height !== "") {
                styleAttr += 'height:' + parseInt(issuu_height, 10) + 'px;';
            }


            if (issuu_id.match(/\d+\/\d+/)) { issuu_embed = '#' + issuu_id; } else if (issuu_id.match(/d=(.*)&u=(.*)/)) { issuu_embed = '?' + issuu_id; }


            issuu_frame = '<iframe title="' + frame_title + '" style="' + styleAttr + '" src="//e.issuu.com/embed.html' + issuu_embed + '"></iframe>';

            return issuu_frame;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'issuu';
        tarteaucitron.fallback(['issuu_player'], function (elem) {
            elem.style.width = tarteaucitron.getElemAttr(elem, 'width') + 'px';
            elem.style.height = tarteaucitron.getElemAttr(elem, 'height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// webmecanik
tarteaucitron.services.webmecanik = {
    "key": "webmecanik",
    "type": "analytic",
    "name": "Webmecanik",
    "uri": "https://webmecanik.com/tos",
    "needConsent": true,
    "cookies": ['mtc_id', 'mtc_sid'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.webmecanikurl === undefined) {
            return;
        }

        window.MauticTrackingObject = 'mt';
        window.mt = window.mt || function () {
            window.mt.q = window.mt.q || [];
            window.mt.q.push(arguments);
        };

        tarteaucitron.addScript(tarteaucitron.user.webmecanikurl, '', function () {
            mt('send', 'pageview');
        });
    }
};

// google analytics multiple
tarteaucitron.services.multiplegtag = {
    "key": "multiplegtag",
    "type": "analytic",
    "name": "Google Analytics (gtag.js)",
    "uri": "https://support.google.com/analytics/answer/6004245",
    "needConsent": true,
    "cookies": (function () {

        var cookies = ['_ga', '_gat', '_gid', '__utma', '__utmb', '__utmc', '__utmt', '__utmz', '_gcl_au'];

        if (tarteaucitron.user.multiplegtagUa !== undefined) {
            tarteaucitron.user.multiplegtagUa.forEach(function (ua) {
                cookies.push('_gat_gtag_' + ua.replace(/-/g, '_'));
                cookies.push('_ga_' + ua.replace(/G-/g, ''));
            });
        }

        return cookies;
    })(),
    "js": function () {
        "use strict";
        window.dataLayer = window.dataLayer || [];

        if (tarteaucitron.user.multiplegtagUa !== undefined) {
            tarteaucitron.user.multiplegtagUa.forEach(function (ua) {
                tarteaucitron.addScript('https://www.googletagmanager.com/gtag/js?id=' + ua, '', function () {
                    window.gtag = function gtag() { dataLayer.push(arguments); }
                    gtag('js', new Date());
                    var additional_config_info = (timeExpire !== undefined) ? {'anonymize_ip': true, 'cookie_expires': timeExpire / 1000} : {'anonymize_ip': true};
                    gtag('config', ua, additional_config_info);
                });
            });
        }
    },
    "fallback": function () {
        if (tarteaucitron.parameters.googleConsentMode === true) {
            if (tarteaucitron.parameters.softConsentMode === false) {
                this.js();
            }
        }
    }
};

// Koban
tarteaucitron.services.koban = {
    "key": "koban",
    "type": "analytic",
    "name": "Koban",
    "uri": "https://koban.cloud/tos",
    "needConsent": true,
    "cookies": ['kbntrk'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.kobanurl === undefined) {
            return;
        }
        if (tarteaucitron.user.kobanapi === undefined) {
            return;
        }
        window.KobanObject = 'kb';
        window.kb = window.kb || function () {
            window.kb.q = window.kb.q || [];
            window.kb.q.push(arguments);
        };
        window.kb.l = new Date();
        kb('reg', tarteaucitron.user.kobanapi);
        tarteaucitron.addScript(tarteaucitron.user.kobanurl, '', function () {
        });
    }
};

// DEPRECATED, USE MATOMO CLOUD
tarteaucitron.services.matomo = {
    "key": "matomo",
    "type": "analytic",
    "name": "Matomo (privacy by design)",
    "uri": "https://matomo.org/faq/general/faq_146/",
    "needConsent": false,
    "cookies": ['_pk_ref', '_pk_cvar', '_pk_id', '_pk_ses', '_pk_hsr', 'piwik_ignore', '_pk_uid'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.matomoId === undefined) {
            return;
        }

        window._paq = window._paq || [];
        window._paq.push(["setSiteId", tarteaucitron.user.matomoId]);
        window._paq.push(["setTrackerUrl", tarteaucitron.user.matomoHost + "piwik.php"]);
        window._paq.push(["setDoNotTrack", 1]);
        window._paq.push(["trackPageView"]);
        window._paq.push(["setIgnoreClasses", ["no-tracking", "colorbox"]]);
        window._paq.push(["enableLinkTracking"]);

        if (typeof tarteaucitron.user.matomoMore === 'function') {
            tarteaucitron.user.matomoMore();
        }

        window._paq.push([function () {
            var self = this;
            function getOriginalVisitorCookieTimeout() {
                var now = new Date(),
                    nowTs = Math.round(now.getTime() / 1000),
                    visitorInfo = self.getVisitorInfo();
                var createTs = parseInt(visitorInfo[2]);
                var cookieTimeout = 33696000; // 13 mois en secondes
                var originalTimeout = createTs + cookieTimeout - nowTs;
                return originalTimeout;
            }
            this.setVisitorCookieTimeout(getOriginalVisitorCookieTimeout());
        }]);

        tarteaucitron.addScript(tarteaucitron.user.matomoHost + 'piwik.js', '', '', true, 'defer', true);

        // waiting for piwik to be ready to check first party cookies
        var interval = setInterval(function () {
            if (typeof Piwik === 'undefined') return

            clearInterval(interval)

            // make piwik/matomo cookie accessible by getting tracker
            Piwik.getTracker();

            // looping throught cookies
            var theCookies = document.cookie.split(';');
            for (var i = 1; i <= theCookies.length; i++) {
                var cookie = theCookies[i - 1].split('=');
                var cookieName = cookie[0].trim();

                // if cookie starts like a piwik one, register it
                if (cookieName.indexOf('_pk_') === 0) {
                    tarteaucitron.services.matomo.cookies.push(cookieName);
                }
            }
        }, 100)
    }
};

// DEPRECATED, USE MATOMO CLOUD
tarteaucitron.services.matomohightrack = {
    "key": "matomohightrack",
    "type": "analytic",
    "name": "Matomo",
    "uri": "https://matomo.org/faq/general/faq_146/",
    "needConsent": false,
    "cookies": ['_pk_ref', '_pk_cvar', '_pk_id', '_pk_ses', '_pk_hsr', 'piwik_ignore', '_pk_uid'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.matomoId === undefined) {
            return;
        }

        window._paq = window._paq || [];
        window._paq.push(["setSiteId", tarteaucitron.user.matomoId]);
        window._paq.push(["setTrackerUrl", tarteaucitron.user.matomoHost + "piwik.php"]);
        window._paq.push(["trackPageView"]);
        window._paq.push(["setIgnoreClasses", ["no-tracking", "colorbox"]]);
        window._paq.push(["enableLinkTracking"]);
        window._paq.push([function () {
            var self = this;
        }]);

        tarteaucitron.addScript(tarteaucitron.user.matomoHost + 'piwik.js', '', '', true, 'defer', true);

        // waiting for piwik to be ready to check first party cookies
        var interval = setInterval(function () {
            if (typeof Piwik === 'undefined') return

            clearInterval(interval)
            Piwik.getTracker();

            var theCookies = document.cookie.split(';');
            for (var i = 1; i <= theCookies.length; i++) {
                var cookie = theCookies[i - 1].split('=');
                var cookieName = cookie[0].trim();

                if (cookieName.indexOf('_pk_') === 0) {
                    tarteaucitron.services.matomo.cookies.push(cookieName);
                }
            }
        }, 100)
    }
};

// matomocloud
tarteaucitron.services.matomocloud = {
    "key": "matomocloud",
    "type": "analytic",
    "name": "Matomo Cloud (privacy by design)",
    "uri": "https://matomo.org/faq/general/faq_146/",
    "needConsent": true,
    "cookies": ['_pk_ref', '_pk_cvar', '_pk_id', '_pk_ses', '_pk_hsr', 'mtm_consent', 'matomo_ignore', 'matomo_sessid'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.matomoId === undefined) {
            return;
        }

        window._paq = window._paq || [];

        if (tarteaucitron.user.matomoFullTracking === true) {
            window._paq.push(["requireCookieConsent"]);
            window._paq.push(["setCookieConsentGiven"]);
            window._paq.push(["trackAllContentImpressions"]);
        } else {
            window._paq.push(["requireConsent"]);
            window._paq.push(["setConsentGiven"]);
        }

        window._paq.push(["setSiteId", tarteaucitron.user.matomoId]);
        window._paq.push(["setTrackerUrl", tarteaucitron.user.matomoHost + "matomo.php"]);
        window._paq.push(["enableLinkTracking"]);

        if (tarteaucitron.user.matomoDontTrackPageView !== true) {
            window._paq.push(["trackPageView"]);
        }

        if (tarteaucitron.user.matomoCustomJSPath === undefined || tarteaucitron.user.matomoCustomJSPath == '') {
            tarteaucitron.addScript('https://cdn.matomo.cloud/matomo.js', '', '', true, 'defer', true);
        } else {
            tarteaucitron.addScript(tarteaucitron.user.matomoCustomJSPath, '', '', true, 'defer', true);
        }

        if (typeof tarteaucitron.user.matomocloudMore === 'function') {
            tarteaucitron.user.matomocloudMore();
        }

        // waiting for Matomo to be ready to check first party cookies
        var interval = setInterval(function () {
            if (typeof Matomo === 'undefined') return

            clearInterval(interval)

            // make Matomo cookie accessible by getting tracker
            Matomo.getTracker();

            // looping through cookies
            var theCookies = document.cookie.split(';');
            for (var i = 1; i <= theCookies.length; i++) {
                var cookie = theCookies[i - 1].split('=');
                var cookieName = cookie[0].trim();

                // if cookie starts like a matomo one, register it
                if (cookieName.indexOf('_pk_') === 0) {
                    tarteaucitron.services.matomo.cookies.push(cookieName);
                }
            }
        }, 100);
    },
    "fallback": function () {
        "use strict";
        if (tarteaucitron.user.matomoId === undefined) {
            return;
        }

        window._paq = window._paq || [];
        if (tarteaucitron.user.matomoFullTracking === true) {
            window._paq.push(["requireCookieConsent"]);
        } else {
            window._paq.push(["requireConsent"]);
        }
        window._paq.push(["setSiteId", tarteaucitron.user.matomoId]);
        window._paq.push(["setTrackerUrl", tarteaucitron.user.matomoHost + "matomo.php"]);
        window._paq.push(["trackPageView"]);
        window._paq.push(["enableLinkTracking"]);

        if (typeof tarteaucitron.user.matomocloudMore === 'function') {
            tarteaucitron.user.matomocloudMore();
        }

        if (tarteaucitron.user.matomoCustomJSPath === undefined || tarteaucitron.user.matomoCustomJSPath == '') {
            tarteaucitron.addScript('https://cdn.matomo.cloud/matomo.js', '', '', true, 'defer', true);
        } else {
            tarteaucitron.addScript(tarteaucitron.user.matomoCustomJSPath, '', '', true, 'defer', true);
        }
    }
};

// matomotm
tarteaucitron.services.matomotm = {
    "key": "matomotm",
    "type": "api",
    "name": "Matomo Tag Manager",
    "uri": "https://matomo.org/privacy/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.matomotmUrl === undefined) {
            return;
        }

        var _mtm = window._mtm = window._mtm || [];
        _mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});

        tarteaucitron.addScript(tarteaucitron.user.matomotmUrl);
    }
};


// Hotjar
tarteaucitron.services.hotjar = {
    "key": "hotjar",
    "type": "analytic",
    "name": "Hotjar",
    "uri": "https://help.hotjar.com/hc/en-us/categories/115001323967-About-Hotjar",
    "needConsent": true,
    "cookies": ["hjClosedSurveyInvites", "_hjDonePolls", "_hjMinimizedPolls", "_hjShownFeedbackMessage", "_hjAbsoluteSessionInProgress", "_hjid"],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.hotjarId === undefined || tarteaucitron.user.HotjarSv === undefined) {
            return;
        }
        window.hj = window.hj || function () {
            (window.hj.q = window.hj.q || []).push(arguments)
        };
        window._hjSettings = {
            hjid: tarteaucitron.user.hotjarId,
            hjsv: tarteaucitron.user.HotjarSv
        };
        var uri = 'https://static.hotjar.com/c/hotjar-';
        var extension = '.js?sv=';
        tarteaucitron.addScript(uri + window._hjSettings.hjid + extension + window._hjSettings.hjsv);
    }
};

// bing ads universal event tracking
tarteaucitron.services.bingads = {
    'key': 'bingads',
    'type': 'ads',
    'name': 'Bing Ads Universal Event Tracking',
    'uri': 'https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads',
    'needConsent': true,
    'cookies': ['_uetmsclkid', '_uetvid', '_uetsid'],
    'js': function () {
        'use strict';

        if (tarteaucitron.user.bingadsID === undefined) {
            return;
        }

        window.uetq = window.uetq || [];

        tarteaucitron.addScript('https://bat.bing.com/bat.js', '', function () {
            var bingadsCreate = { ti: tarteaucitron.user.bingadsID };

            if ('bingadsStoreCookies' in tarteaucitron.user) {
                bingadsCreate['storeConvTrackCookies'] = tarteaucitron.user.bingadsStoreCookies;
            }

            bingadsCreate.q = window.uetq;
            window.uetq = new UET(bingadsCreate);
            window.uetq.push('pageLoad');

            if (typeof tarteaucitron.user.bingadsMore === 'function') {
                tarteaucitron.user.bingadsMore();
            }
        });
    },
    "fallback": function () {
        if (tarteaucitron.parameters.bingConsentMode === true) {
            if (tarteaucitron.parameters.softConsentMode === false) {
                this.js();
            }
        }
    }
};

//Matterport
tarteaucitron.services.matterport = {
    "key": "matterport",
    "type": "other",
    "name": "Matterport",
    "uri": "https://matterport.com/es/legal/privacy-policy/",
    "needConsent": true,
    "cookies": ['__cfduid', 'ajs_anonymous_id', 'ajs_group_id', 'ajs_user_id'],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['matterport'], function (x) {
            var frame_title = tarteaucitron.getElemAttr(x, "title") || 'Matterport iframe',
                matterport_id = tarteaucitron.getElemAttr(x, "matterportID"),
                matterport_width = tarteaucitron.getElemAttr(x, "width"),
                matterport_height = tarteaucitron.getElemAttr(x, "height"),
                styleAttr = "",
                matterport_parameters = tarteaucitron.getElemAttr(x, "parameters"),
                matterport_allowfullscreen = tarteaucitron.getElemAttr(x, 'allowfullscreen'),
                matterport_frame;

            if (matterport_id === undefined) {
                return "";
            }
            if (matterport_width !== "") {
                styleAttr += 'width:' + parseInt(matterport_width, 10) + 'px;';
            }
            if (matterport_height !== undefined) {
                styleAttr += 'height:' + parseInt(matterport_height, 10) + 'px;';
            }
            if (matterport_parameters === undefined) {
                return "";
            }

            matterport_frame = '<iframe title="' + frame_title + '" style="' + styleAttr + '" src="https://my.matterport.com/show/?m=' + matterport_id + '&utm_source=hit-content' + matterport_parameters + '"' + (matterport_allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';
            return matterport_frame;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'matterport';
        tarteaucitron.fallback(['matterport'], function (elem) {
            elem.style.width = tarteaucitron.getElemAttr(elem, 'width') + 'px';
            elem.style.height = tarteaucitron.getElemAttr(elem, 'height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// Adform
tarteaucitron.services.adform = {
    "key": "adform",
    "type": "ads",
    "name": "Adform",
    "uri": "https://site.adform.com/privacy-center/overview/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.adformpm === undefined || tarteaucitron.user.adformpagename === undefined) {
            return;
        }

        window._adftrack = {
            pm: tarteaucitron.user.adformpm,
            divider: encodeURIComponent('|'),
            pagename: encodeURIComponent(tarteaucitron.user.adformpagename)
        };

        tarteaucitron.addScript("https://track.adform.net/serving/scripts/trackpoint/async/");
    }
};

// Active Campaign
tarteaucitron.services.activecampaign = {
    "key": "activecampaign",
    "type": "ads",
    "name": "Active Campaign",
    "uri": "https://www.activecampaign.com/privacy-policy/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.actid === undefined) {
            return;
        }

        window.trackcmp_email = '';

        tarteaucitron.addScript('https://trackcmp.net/visit?actid=' + tarteaucitron.user.actid + '&e=' + encodeURIComponent(trackcmp_email) + '&r=' + encodeURIComponent(document.referrer) + '&u=' + encodeURIComponent(window.location.href));
    }
};

// tawk.to
tarteaucitron.services.tawkto = {
    "key": "tawkto",
    "type": "support",
    "name": "Tawk.to chat",
    "uri": "https://www.tawk.to/data-protection/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.tawktoId === undefined) {
            return;
        }

        tarteaucitron.user.tawktoWidgetId = tarteaucitron.user.tawktoWidgetId || 'default';

        window.Tawk_API = window.Tawk_API || {};
        window.Tawk_LoadStart = new Date();

        tarteaucitron.addScript('https://embed.tawk.to/' + tarteaucitron.user.tawktoId + '/' + tarteaucitron.user.tawktoWidgetId);
    }

};

// getquanty
tarteaucitron.services.getquanty = {
    "key": "getquanty",
    "type": "analytic",
    "name": "GetQuanty",
    "uri": "https://www.getquanty.com/mentions-legales/",
    "needConsent": true,
    "cookies": ['_first_pageview', 'eqy_sessionid', 'eqy_siteid', 'cluid', 'eqy_company', 'cluid', 'gq_utm', '_jsuid'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.getguanty === undefined) {
            return;
        }

        if (tarteaucitron.user.getquantyAlreadyLoaded !== undefined) {
            return;
        }

        tarteaucitron.addScript('https://get.smart-data-systems.com/gq?site_id=' + tarteaucitron.user.getguanty + '&consent=1');
    },
    "fallback": function () {
        "use strict";
        if (tarteaucitron.user.getguanty === undefined) {
            return;
        }

        tarteaucitron.user.getquantyAlreadyLoaded = true;

        tarteaucitron.addScript('https://get.smart-data-systems.com/gq?site_id=' + tarteaucitron.user.getguanty + '&notrack=1');
    }
};

// emolytics
tarteaucitron.services.emolytics = {
    "key": "emolytics",
    "type": "analytic",
    "name": "Emolytics",
    "uri": "https://www.emolytics.com/main/privacy-policy.php",
    "needConsent": true,
    "cookies": ['__hssc', '__hssrc', '__hstc', '_ga', '_gid', 'hubspotutk', 'lang', 'incap_ses_', 'nlbi_', 'visid_incap_'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.emolyticsID === undefined) {
            return;
        }
        var scriptEmolytics = document.createElement('script');
        scriptEmolytics.text = 'var getsmily_id="' + tarteaucitron.user.emolyticsID + '";';
        document.getElementsByTagName('body')[0].appendChild(scriptEmolytics);
        tarteaucitron.addScript('https://cdn.emolytics.com/script/emolytics-widget.js')
    }
};

// youtubeapi
tarteaucitron.services.youtubeapi = {
    "key": "youtubeapi",
    "type": "video",
    "name": "Youtube (Js API)",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.addScript('https://www.youtube.com/player_api');
    }
};

// Facil'ITI
tarteaucitron.services.faciliti = {
    "key": "faciliti",
    "type": "other",
    "name": "Facil'ITI",
    "uri": "https://www.facil-iti.com/legal-terms/",
    "needConsent": true,
    "cookies": ['FACIL_ITI'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.facilitiID === undefined) {
            return;
        }

        (function () {
            var fs = document.createElement("script");
            fs.setAttribute("src", "https://cdn.facil-iti.app/tags/faciliti-tag.min.js");
            fs.dataset.applicationIdentifier = tarteaucitron.user.facilitiID;
            document.head.appendChild(fs);
        }());
    }
};

// userlike
tarteaucitron.services.userlike = {
    "key": "userlike",
    "type": "support",
    "name": "Userlike",
    "uri": "https://www.userlike.com/en/terms#privacy-policy",
    "needConsent": true,
    "cookies": ['uslk_s', 'uslk_e'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.userlikeKey === undefined) {
            return;
        }
        tarteaucitron.addScript('//userlike-cdn-widgets.s3-eu-west-1.amazonaws.com/' + tarteaucitron.user.userlikeKey);
    }
};

// adobeanalytics
tarteaucitron.services.adobeanalytics = {
    "key": "adobeanalytics",
    "type": "analytic",
    "name": "Adobe Analytics",
    "uri": "https://www.adobe.com/privacy/policy.html",
    "needConsent": true,
    "cookies": ['s_ecid', 's_cc', 's_sq', 's_vi', 's_fid'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.adobeanalyticskey === undefined) {
            return;
        }
        tarteaucitron.addScript('//assets.adobedtm.com/launch-' + tarteaucitron.user.adobeanalyticskey + '.min.js');
    }
};

// woopra customer journey analytics
tarteaucitron.services.woopra = {
    'key': 'woopra',
    'type': 'analytic',
    'name': 'Woopra Customer Journey Analytics',
    'uri': 'https://www.woopra.com/privacy',
    'needConsent': true,
    'cookies': ['wooTracker', 'intercom-session-erbfalba', 'intercom-id-erbfalba'],
    'js': function () {
        'use strict';

        if (tarteaucitron.user.woopraDomain === undefined) {
            return;
        }

        (function () {
            var t, i, e, n = window, o = document, a = arguments, s = "script", r = ["config", "track", "identify", "visit", "push", "call", "trackForm", "trackClick"], c = function () { var t, i = this; for (i._e = [], t = 0; r.length > t; t++)(function (t) { i[t] = function () { return i._e.push([t].concat(Array.prototype.slice.call(arguments, 0))), i } })(r[t]) }; for (n._w = n._w || {}, t = 0; a.length > t; t++)n._w[a[t]] = n[a[t]] = n[a[t]] || new c; i = o.createElement(s), i.async = 1, i.src = "//static.woopra.com/js/w.js", e = o.getElementsByTagName(s)[0], e.parentNode.insertBefore(i, e)
        })("woopra");

        woopra.config({
            domain: tarteaucitron.user.woopraDomain
        });
        woopra.track();
    }
};

// ausha
tarteaucitron.services.ausha = {
    key: "ausha",
    type: "video",
    name: "Ausha",
    uri: "https://www.ausha.co/protection-personal-data/",
    needConsent: true,
    cookies: [],
    js: function () {
        "use strict";
        tarteaucitron.fallback(['ausha_player'], function (x) {
            var frame_title = (tarteaucitron.getElemAttr(x,"title")) ? tarteaucitron.getElemAttr(x,"title") : 'Ausha iframe',
                player_height = tarteaucitron.getElemAttr(x, 'data-height'),
                podcast_id = tarteaucitron.getElemAttr(x, 'data-podcast-id'),
                player_id = tarteaucitron.getElemAttr(x, 'data-player-id'),
                playlist = tarteaucitron.getElemAttr(x, 'data-playlist'),
                useshowid = tarteaucitron.getElemAttr(x, 'data-useshowid'),
                color = tarteaucitron.getElemAttr(x, 'data-color');

            if (podcast_id === undefined) {
                return "";
            }

            var src = 'https://player.ausha.co/index.html?podcastId=' + podcast_id + '&v=3';

            if (useshowid == "1") {
                src = 'https://player.ausha.co/index.html?showId=' + podcast_id + '&v=3';
            }

            if (playlist && playlist.length > 0) src += '&playlist=' + playlist;
            if (color && color.length > 0) src += '&color=' + color.replace('#', '%23');
            if (player_id && player_id.length > 0) src += '&playerId=' + player_id;

            return '<iframe title="' + frame_title + '" id="' + player_id + '" loading="lazy" style="width:100%;height:' + parseInt(player_height, 10) + 'px;" src="' + src + '"></iframe>';
        });

        tarteaucitron.addScript('//player.ausha.co/ausha-player.js', 'ausha-player');
    },
    fallback: function () {
        "use strict";
        tarteaucitron.fallback(['ausha_player'], function (elem) {
            elem.style.height = tarteaucitron.getElemAttr(elem, 'data-height') + 'px';
            return tarteaucitron.engage('ausha');
        });
    }
};

// visiblee
tarteaucitron.services.visiblee = {
    key: "visiblee",
    type: "analytic",
    name: "Visiblee",
    uri: "https://confidentiality.visiblee.io/fr/confidentialite",
    needConsent: true,
    cookies: ["visitor_v2", tarteaucitron.user.visibleedomain, "check", "campaign_ref_" + tarteaucitron.user.visibleedomain, "reload_" + tarteaucitron.user.visibleedomain],
    js: function () {
        "use strict";

        if (tarteaucitron.user.visibleeclientid === undefined) {
            return;
        }
        tarteaucitron.addScript('//www.link-page.info/tracking_' + tarteaucitron.user.visibleeclientid + '.js', 'visiblee');
    }
};

// bandcamp
tarteaucitron.services.bandcamp = {
    key: "bandcamp",
    type: "video",
    name: "Bandcamp",
    uri: "https://bandcamp.com",
    readmoreLink: "https://bandcamp.com/privacy",
    needConsent: true,
    cookies: ['client_id', 'BACKENDID', '_comm_playlist'],
    js: function () {
        "use strict";
        tarteaucitron.fallback(['bandcamp_player'], function (x) {
            var frame_title = tarteaucitron.getElemAttr(x, "title") || 'Bandcamp iframe',
                album_id = tarteaucitron.getElemAttr(x, "albumID"),
                bandcamp_width = tarteaucitron.getElemAttr(x, "width"),
                bandcamp_height = tarteaucitron.getElemAttr(x, "height"),
                styleAttr = "",
                attrs = ["size", "bgcol", "linkcol", "artwork", "minimal", "tracklist", "package", "transparent"],
                params = attrs.filter(function (a) {
                    return tarteaucitron.getElemAttr(x, a) !== null;
                }).map(function (a) {
                    if (a && a.length > 0) return a + "=" + tarteaucitron.getElemAttr(x, a);
                }).join("/");

            if (album_id === null) {
                return "";
            }

            if (bandcamp_width !== "") {
                styleAttr += 'width:' + parseInt(bandcamp_width, 10) + 'px;';
            }
            if (bandcamp_height !== "") {
                styleAttr += 'height:' + parseInt(bandcamp_height, 10) + 'px;';
            }

            var src = 'https://bandcamp.com/EmbeddedPlayer/album=' + album_id + '/' + params;

            return '<iframe title="' + frame_title + '" src="' + src + '" style="' + styleAttr + '" allowfullscreen seamless></iframe>';
        });
    },
    fallback: function () {
        "use strict";
        tarteaucitron.fallback(['bandcamp_player'], function (elem) {
            elem.style.width = tarteaucitron.getElemAttr(elem, 'width');
            elem.style.height = tarteaucitron.getElemAttr(elem, 'height');
            return tarteaucitron.engage('bandcamp');
        });
    }
};

// Discord Widget
tarteaucitron.services.discord = {
    "key": "discord",
    "type": "social",
    "name": "Discord (Server Widget)",
    "needConsent": true,
    "cookies": ["__cfruid", "__dcfduid", "_ga", "_gcl_au", "OptanonConsent", "locale", "_gid"],
    "uri": "https://discord.com/privacy",
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['discord_widget'], function (x) {
            var frame_title = (tarteaucitron.getElemAttr(x,"title")) ? tarteaucitron.getElemAttr(x,"title") : 'Discord iframe',
                id = tarteaucitron.getElemAttr(x, "guildID"),
                width = tarteaucitron.getElemAttr(x, "width"),
                height = tarteaucitron.getElemAttr(x, "height")
            var widgetURL = "https://discord.com/widget?id=" + id;

            var styleAttr = (width !== "" ? "width:" + parseInt(width, 10) + "px;" : "") + (height !== "" ? "height:" + parseInt(height, 10) + "px;" : "");

            return "<iframe title=\"" + frame_title + "\" style=\"" + styleAttr + "\" src=\"" + widgetURL + "\"></iframe>";
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'discord';
        tarteaucitron.fallback(['discord_widget'], function (elem) {
            elem.style.width = tarteaucitron.getElemAttr(elem, 'width') + 'px';
            elem.style.height = tarteaucitron.getElemAttr(elem, 'height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// Google Maps
tarteaucitron.services.maps_noapi = {
    "key": "maps_noapi",
    "type": "other",
    "name": "Google Maps",
    "needConsent": true,
    "cookies": ["NID", "OGPC", "1P_JAR", "CONSENT"],
    "uri": "https://policies.google.com/privacy",
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['googlemaps_embed'], function (x) {
            var frame_title = (tarteaucitron.getElemAttr(x,"title")) ? tarteaucitron.getElemAttr(x,"title") : 'Google maps iframe',
                id = tarteaucitron.getElemAttr(x, "id"),
                width = tarteaucitron.getElemAttr(x, "width"),
                height = tarteaucitron.getElemAttr(x, "height")
            var widgetURL = "https://www.google.com/maps/embed?pb=" + id;

            var styleAttr = (width !== "" ? "width:" + parseInt(width, 10) + "px;" : "") + (height !== "" ? "height:" + parseInt(height, 10) + "px;" : "");

            return "<iframe title=\"" + frame_title + "\" style=\"" + styleAttr + "border:0;\" src=\"" + widgetURL + "\" allowfullscreen loading=\"lazy\"></iframe>";
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'maps_noapi';
        tarteaucitron.fallback(['googlemaps_embed'], function (elem) {
            elem.style.width = tarteaucitron.getElemAttr(elem, 'width') + 'px';
            elem.style.height = tarteaucitron.getElemAttr(elem, 'height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// hCaptcha
tarteaucitron.services.hcaptcha = {
    "key": "hcaptcha",
    "type": "other",
    "name": "hCaptcha",
    "needConsent": true,
    "cookies": [],
    "uri": "https://www.hcaptcha.com/privacy",
    "js": function () {
        "use strict";
        tarteaucitron.fallback(["h-captcha"], '');
        tarteaucitron.addScript("https://hcaptcha.com/1/api.js", "hcaptcha")
    },
    "fallback": function () {
        "use strict";
        var id = "hcaptcha";
        tarteaucitron.fallback(["h-captcha"], tarteaucitron.engage(id));
    }
};

// France Culture
tarteaucitron.services.fculture = {
    "key": "fculture",
    "type": "video",
    "name": "France Culture",
    "needConsent": true,
    "cookies": ["_gid", "didomi_token", "outbrain_cid_fetch", "xtvrn", "xtant", "YSC", "ABTasty", "xtan", "ABTastySession", "xtidc", "_ga", "VISITOR_INFO1_LIVE", "euconsent-v2", "v1st", "dmvk", "ts", "VISITOR_INFO1_LIVE", "YSC"],
    "uri": "https://www.radiofrance.com/politique-d-utilisation-des-cookies-sur-les-sites-internet-du-groupe-radio-france",
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['fculture_embed'], function (x) {
            var frame_title = (tarteaucitron.getElemAttr(x,"title")) ? tarteaucitron.getElemAttr(x,"title") : 'France culture iframe',
                id = tarteaucitron.getElemAttr(x, 'id'),
                width = tarteaucitron.getElemAttr(x, 'width'),
                height = tarteaucitron.getElemAttr(x, 'height');

            var styleAttr = (width !== "" ? "width:" + parseInt(width, 10) + "px;" : "") + (height !== "" ? "height:" + parseInt(height, 10) + "px;" : "");

            return "<iframe title=\"" + frame_title + "\" src=\"https://www.franceculture.fr/player/export-reecouter?content=" + id + "\" style=\"" + styleAttr + "\"></iframe>"
        });
    },
    "fallback": function () {
        "use strict";
        var id = "fculture";
        tarteaucitron.fallback(["fculture_embed"], tarteaucitron.engage(id));
    }
};

// Acast
tarteaucitron.services.acast = {
    "key": "acast",
    "type": "video",
    "name": "Acast",
    "needConsent": true,
    "cookies": ["intercom-id-ayi0335i", "intercom-session-ayi0335i"],
    "uri": "https://www.acast.com/en/privacy",
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['acast_embed'], function (x) {
            var frame_title = (tarteaucitron.getElemAttr(x,"title")) ? tarteaucitron.getElemAttr(x,"title") : 'Acast iframe',
                id = tarteaucitron.getElemAttr(x, 'id1'),
                id2 = tarteaucitron.getElemAttr(x, 'id2'),
                width = tarteaucitron.getElemAttr(x, 'width'),
                height = tarteaucitron.getElemAttr(x, 'height'),
                seek = tarteaucitron.getElemAttr(x, 'seek');
            var widgetURL = "https://embed.acast.com/" + id + "/" + id2 + "?seek=" + seek;

            var styleAttr = (width !== "" ? "width:" + parseInt(width, 10) + "px;" : "") + (height !== "" ? "height:" + parseInt(height, 10) + "px;" : "");

            return "<iframe title=\"" + frame_title + "\" src=\"" + widgetURL + "\" style=\"border: none; overflow: hidden;" + styleAttr + "\"></iframe>";
        });
    },
    "fallback": function () {
        "use strict";
        var id = "acast";
        tarteaucitron.fallback(["acast_embed"], tarteaucitron.engage(id));
    }
};

// Mixcloud
tarteaucitron.services.mixcloud = {
    "key": "mixcloud",
    "type": "video",
    "name": "Mixcloud",
    "needConsent": true,
    "cookies": ["UID", "_gat", "__stripe_mid", "_gid", "_ga", "c", "csrftoken", "__stripe_sid", "mx_t"],
    "uri": "https://www.mixcloud.com/privacy/",
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['mixcloud_embed'], function (x) {
            var frame_title = (tarteaucitron.getElemAttr(x,"title")) ? tarteaucitron.getElemAttr(x,"title") : 'Mixcloud iframe',
                id = tarteaucitron.getElemAttr(x, 'id'),
                hidecover = tarteaucitron.getElemAttr(x, 'hidecover'),
                mini = tarteaucitron.getElemAttr(x, 'mini'),
                light = tarteaucitron.getElemAttr(x, 'light'),
                width = tarteaucitron.getElemAttr(x, 'width'),
                height = tarteaucitron.getElemAttr(x, 'height');

            var styleAttr = (width !== "" ? "width:" + parseInt(width, 10) + "px;" : "") + (height !== "" ? "height:" + parseInt(height, 10) + "px;" : "");
            
            return "<iframe title=\"" + frame_title + "\" style=\"" + styleAttr + "\" src=\"https://www.mixcloud.com/widget/iframe/?hide_cover=" + hidecover + "&mini=" + mini + "&light=" + light + "&feed=" + id + "\"></iframe>";
        });
    },
    "fallback": function () {
        "use strict";
        var id = "mixcloud";
        tarteaucitron.fallback(["mixcloud_embed"], tarteaucitron.engage(id));
    }
};

// Google Agenda
tarteaucitron.services.gagenda = {
    "key": "gagenda",
    "type": "other",
    "name": "Google Agenda",
    "needConsent": true,
    "cookies": ["CONSENT", "NID"],
    "uri": "https://policies.google.com/privacy",
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['gagenda_embed'], function (x) {
            var frame_title = (tarteaucitron.getElemAttr(x,"title")) ? tarteaucitron.getElemAttr(x,"title") : 'Google agenda iframe',
                calendar_data = tarteaucitron.getElemAttr(x, 'data'),
                width = tarteaucitron.getElemAttr(x, 'width'),
                height = tarteaucitron.getElemAttr(x, 'height');

            var styleAttr = (width !== "" ? "width:" + parseInt(width, 10) + "px;" : "") + (height !== "" ? "height:" + parseInt(height, 10) + "px;" : "");

            return "<iframe title=\"" + frame_title + "\" loading=\"lazy\" style=\"" + styleAttr + "border-width:0\" src=\"https://www.google.com/calendar/embed?" + calendar_data + "\"></iframe>";
        });
    },
    "fallback": function () {
        "use strict";
        var id = "gagenda";
        tarteaucitron.fallback(["gagenda_embed"], tarteaucitron.engage(id));
    }
};

// Google Docs
tarteaucitron.services.gdocs = {
    "key": "gdocs",
    "type": "other",
    "name": "Google Docs",
    "needConsent": true,
    "cookies": ["CONSENT", "NID"],
    "uri": "https://policies.google.com/privacy",
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['gdocs_embed'], function (x) {
            var frame_title = (tarteaucitron.getElemAttr(x,"title")) ? tarteaucitron.getElemAttr(x,"title") : 'Google docs iframe',
                id = tarteaucitron.getElemAttr(x, 'id'),
                width = tarteaucitron.getElemAttr(x, 'width'),
                height = tarteaucitron.getElemAttr(x, 'height');

            var styleAttr = (width !== "" ? "width:" + parseInt(width, 10) + "px;" : "") + (height !== "" ? "height:" + parseInt(height, 10) + "px;" : "");

            return "<iframe title=\"" + frame_title + "\" style=\"" + styleAttr + "\" src=\"https://docs.google.com/document/d/e/" + id + "/pub?embedded=true\"></iframe>";
        });
    },
    "fallback": function () {
        "use strict";
        var id = "gdocs";
        tarteaucitron.fallback(["gdocs_embed"], tarteaucitron.engage(id));
    }
};

// Google Sheets
tarteaucitron.services.gsheets = {
    "key": "gsheets",
    "type": "other",
    "name": "Google Sheets",
    "needConsent": true,
    "cookies": ["CONSENT", "NID"],
    "uri": "https://policies.google.com/privacy",
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['gsheets_embed'], function (x) {
            var frame_title = (tarteaucitron.getElemAttr(x,"title")) ? tarteaucitron.getElemAttr(x,"title") : 'Google sheets iframe',
                id = tarteaucitron.getElemAttr(x, 'id'),
                width = tarteaucitron.getElemAttr(x, 'width'),
                height = tarteaucitron.getElemAttr(x, 'height'),
                headers = tarteaucitron.getElemAttr(x, 'headers');

            var styleAttr = (width !== "" ? "width:" + parseInt(width, 10) + "px;" : "") + (height !== "" ? "height:" + parseInt(height, 10) + "px;" : "");

            return "<iframe title=\"" + frame_title + "\" style=\"" + styleAttr + "\" src=\"https://docs.google.com/spreadsheets/d/e/" + id + "/pubhtml?widget=true&amp;headers=" + headers + "\"></iframe>";
        });
    },
    "fallback": function () {
        "use strict";
        var id = "gsheets";
        tarteaucitron.fallback(["gsheets_embed"], tarteaucitron.engage(id));
    }
};

// Google Slides
tarteaucitron.services.gslides = {
    "key": "gslides",
    "type": "other",
    "name": "Google Slides",
    "needConsent": true,
    "cookies": ["CONSENT", "NID"],
    "uri": "https://policies.google.com/privacy",
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['gslides_embed'], function (x) {
            var frame_title = (tarteaucitron.getElemAttr(x,"title")) ? tarteaucitron.getElemAttr(x,"title") : 'Google slides iframe',
                id = tarteaucitron.getElemAttr(x, 'id'),
                width = tarteaucitron.getElemAttr(x, 'width'),
                height = tarteaucitron.getElemAttr(x, 'height'),
                autostart = tarteaucitron.getElemAttr(x, 'autostart'),
                loop = tarteaucitron.getElemAttr(x, 'loop'),
                delay = tarteaucitron.getElemAttr(x, 'delay');

            var styleAttr = (width !== "" ? "width:" + parseInt(width, 10) + "px;" : "") + (height !== "" ? "height:" + parseInt(height, 10) + "px;" : "");

            return "<iframe title=\"" + frame_title + "\" style=\"" + styleAttr + "\" src=\"https://docs.google.com/presentation/d/e/" + id + "/embed?start=" + autostart + "&loop=" + loop + "&delayms=" + delay + "\" allowfullscreen mozallowfullscreen webkitallowfullscreen></iframe>";
        });
    },
    "fallback": function () {
        "use strict";
        var id = "gslides";
        tarteaucitron.fallback(["gslides_embed"], tarteaucitron.engage(id));
    }
};

// Google Forms
tarteaucitron.services.gforms = {
    "key": "gforms",
    "type": "other",
    "name": "Google Forms",
    "needConsent": true,
    "cookies": ["CONSENT", "NID"],
    "uri": "https://policies.google.com/privacy",
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['gforms_embed'], function (x) {
            var frame_title = (tarteaucitron.getElemAttr(x,"title")) ? tarteaucitron.getElemAttr(x,"title") : 'Google forms iframe',
                id = tarteaucitron.getElemAttr(x, 'id'),
                width = tarteaucitron.getElemAttr(x, 'width'),
                height = tarteaucitron.getElemAttr(x, 'height');

            var styleAttr = (width !== "" ? "width:" + parseInt(width, 10) + "px;" : "") + (height !== "" ? "height:" + parseInt(height, 10) + "px;" : "");

            return "<iframe title=\"" + frame_title + "\" style=\"" + styleAttr + "\" src=\"https://docs.google.com/forms/d/e/" + id + "/viewform?embedded=true\"></iframe>";
        });
    },
    "fallback": function () {
        "use strict";
        var id = "gforms";
        tarteaucitron.fallback(['gforms_embed'], tarteaucitron.engage(id));
    }
};

// Google Optimize
tarteaucitron.services.goptimize = {
    "key": "goptimize",
    "type": "other",
    "name": "Google Optimize",
    "needConsent": true,
    "cookies": ["CONSENT", "NID"],
    "uri": "https://policies.google.com/privacy",
    "js": function () {
        "use strict";

        if (tarteaucitron.user.goptimize === undefined) {
            return;
        }

        tarteaucitron.addScript('https://www.googleoptimize.com/optimize.js?id=' + tarteaucitron.user.goptimize);
    }
};

// Marketo munchkin
tarteaucitron.services.marketomunchkin = {
    "key": "marketomunchkin",
    "type": "api",
    "name": "Marketo munchkin",
    "uri": "https://documents.marketo.com/legal/cookies",
    "needConsent": true,
    "cookies": ['OptAnon', '_mkto_trk'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.marketomunchkinkey === undefined) {
            return;
        }
        var didInit = false;
        function initMunchkin() {
            if (didInit === false) {
                didInit = true;
                Munchkin.init(tarteaucitron.user.marketomunchkinkey);
            }
        }
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = '//munchkin.marketo.net/munchkin.js';
        s.onreadystatechange = function () {
            if (this.readyState == 'complete' || this.readyState == 'loaded') {
                initMunchkin();
            }
        };
        s.onload = initMunchkin;
        document.getElementsByTagName('head')[0].appendChild(s);
    }
};

// outbrain
tarteaucitron.services.outbrain = {
    "key": "outbrain",
    "type": "ads",
    "name": "Outbrain",
    "uri": "https://www.outbrain.com/fr/advertisers/guidelines/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        tarteaucitron.addScript('https://widgets.outbrain.com/outbrain.js');
    }
};

// affilae
tarteaucitron.services.affilae = {
    "key": "affilae",
    "type": "ads",
    "name": "Affilae",
    "uri": "https://affilae.com/en/privacy-cookie-policy/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.affilae === undefined) {
            return;
        }

        window._ae = { "pid": tarteaucitron.user.affilae };

        tarteaucitron.addScript('https://static.affilae.com/ae-v3.5.js');
    }
};

// Canal-U.tv
tarteaucitron.services.canalu = {
    "key": "canalu",
    "type": "video",
    "name": "Canal-U.tv",
    "uri": "https://www.canal-u.tv/conditions-generales-utilisations",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['canalu_player'], function (x) {
            var frame_title = (tarteaucitron.getElemAttr(x,"title")) ? tarteaucitron.getElemAttr(x,"title") : 'Canal-u.tv iframe',
                video_title = tarteaucitron.getElemAttr(x, "videoTitle"),
                frame_url = 'https://www.canal-u.tv/embed/' + video_title;

            return '<div style="position:relative;padding-bottom:56.25%;padding-top:10px;height:0;overflow:hidden;">' +
                '<iframe title="' + frame_title + '" src="' + frame_url + '?width=100%&amp;height=100%" ' +
                'style="position:absolute;top:0;left:0;width:100%;height: 100%;" ' +
                'allowfullscreen>' +
                '</iframe>' +
                '</div>';
        });
    },
    "fallback": function () {
        "use strict";
        tarteaucitron.fallback(['canalu_player'], function (elem) {
            return tarteaucitron.engage('canalu');
        });
    }
};

// WebTV Normandie Université
tarteaucitron.services.webtvnu = {
    "key": "webtvnu",
    "type": "video",
    "name": "WebTV Normandie Université",
    "uri": "https://docs.google.com/document/d/1tpVclj4QBoAq1meSZgYrpNECwp7dbmb_IhICY3sTl9c/edit",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['webtvnu_player'], function (x) {
            var frame_title = (tarteaucitron.getElemAttr(x,"title")) ? tarteaucitron.getElemAttr(x,"title") : 'WebTV Normandie Université iframe',
                frame_url = 'https://webtv.normandie-univ.fr/permalink/' + tarteaucitron.getElemAttr(x, "videoID") + '/iframe/',
                width = tarteaucitron.getElemAttr(x, "width"),
                height = tarteaucitron.getElemAttr(x, "height");

            var styleAttr = (width !== "" ? "width:" + parseInt(width, 10) + "px;" : "") + (height !== "" ? "height:" + parseInt(height, 10) + "px;" : "");

            return '<iframe title="' + frame_title + '" style="' + styleAttr + '" src="' + frame_url + '" allowfullscreen allow="autoplay"></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        tarteaucitron.fallback(['webtvnu_player'], function (elem) {
            return tarteaucitron.engage('webtvnu');
        });
    }
};

// studizz
tarteaucitron.services.studizz = {
    "key": "studizz",
    "type": "support",
    "name": "Studizz Chatbot",
    "uri": "https://group.studizz.fr/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.studizzToken === undefined) {
            return;
        }

        tarteaucitron.addScript('https://webchat.studizz.fr/webchat.js?token=' + tarteaucitron.user.studizzToken);
    }
};

// meteofrance
tarteaucitron.services.meteofrance = {
    "key": "meteofrance",
    "type": "api",
    "name": "Météo France",
    "uri": "https://meteofrance.com/politique-de-confidentialite",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['tac_meteofrance'], function (x) {
            var frame_title = tarteaucitron.getElemAttr(x, "title") || 'Météo France iframe',
                width = tarteaucitron.getElemAttr(x, "width"),
                height = tarteaucitron.getElemAttr(x, "height"),
                insee = tarteaucitron.getElemAttr(x, "data-insee"),
                allowfullscreen = tarteaucitron.getElemAttr(x, "allowfullscreen");

            var styleAttr = (width !== "" ? "width:" + parseInt(width, 10) + "px;" : "") + (height !== "" ? "height:" + parseInt(height, 10) + "px;" : "");

            return '<iframe title="' + frame_title + '" src="https://meteofrance.com/widget/prevision/' + insee + '" style="' + styleAttr + '" allowtransparency ' + (allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'meteofrance';
        tarteaucitron.fallback(['tac_meteofrance'], function (elem) {
            elem.style.width = tarteaucitron.getElemAttr(elem, 'width') + 'px';
            elem.style.height = tarteaucitron.getElemAttr(elem, 'height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// m6meteo
tarteaucitron.services.m6meteo = {
    "key": "m6meteo",
    "type": "api",
    "name": "M6 Météo",
    "uri": "https://gdpr.m6tech.net/charte-confidentialite-m6-web-meteocity.pdf",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['tac_m6meteo'], function (x) {
            var id = tarteaucitron.getElemAttr(x, "data-id");

            tarteaucitron.addScript('https://www.meteocity.com/widget/js/'+id);

            return '<div id="cont_'+id+'"><div id="spa_'+id+'"><a id="a_'+id+'" href="#"></a> ©<a target="_top" href="https://www.meteocity.com">M6météo</a></div></div>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'm6meteo';
        tarteaucitron.fallback(['tac_m6meteo'], function (elem) {

            return tarteaucitron.engage(id);
        });
    }
};

// mtcaptcha
tarteaucitron.services.mtcaptcha = {
    "key": "mtcaptcha",
    "type": "api",
    "name": "MTcaptcha",
    "uri": "https://www.mtcaptcha.com",
    "readmoreLink": "https://www.mtcaptcha.com/faq-cookie-declaration",
    "needConsent": true,
    "cookies": ['mtv1Pulse','mtv1ConfSum','mtv1Pong'],

    "js": function () {

        if (tarteaucitron.user.mtcaptchaSitekey === undefined) {
            return;
        }

        window.mtcaptchaConfig = {
            "sitekey": tarteaucitron.user.mtcaptchaSitekey
        };

        tarteaucitron.addScript('https://service.mtcaptcha.com/mtcv1/client/mtcaptcha.min.js');
        tarteaucitron.addScript('https://service2.mtcaptcha.com/mtcv1/client/mtcaptcha2.min.js');
    }
};

// Internet Archive / https://archive.org
tarteaucitron.services.archive = {
    "key": "archive",
    "type": "video",
    "name": "Internet Archive",
    "uri": "https://archive.org/about/terms.php",
    "needConsent": true,
    "cookies": ['abtest-identifier','donation-identifier'],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['archive_player'], function (x) {
            var frame_title = (tarteaucitron.getElemAttr(x,"title")) ? tarteaucitron.getElemAttr(x,"title") : 'Internet Archive iframe',
                video_id = tarteaucitron.getElemAttr(x, "data-videoID"),
                video_width = tarteaucitron.getElemAttr(x, "data-width"),
                video_height = tarteaucitron.getElemAttr(x, "data-height"),
                styleAttr = "",
                video_frame;

            if (video_id === undefined) {
                return "";
            }
            if (video_width !== "") {
                styleAttr += 'width:' + parseInt(video_width, 10) + 'px;';
            }
            if (video_height !== "") {
                styleAttr += 'height:' + parseInt(video_height, 10) + 'px;';
            }
            video_frame = '<iframe title="' + frame_title + '" src="https://archive.org/embed/' + video_id + '" style="' + styleAttr + '" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
            return video_frame;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'archive';
        tarteaucitron.fallback(['archive_player'], function (elem) {
            elem.style.width = tarteaucitron.getElemAttr(elem, 'data-width') + 'px';
            elem.style.height = tarteaucitron.getElemAttr(elem, 'data-height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// Gallica
tarteaucitron.services.gallica = {
    "key": "gallica",
    "type": "other",
    "name": "Gallica",
    "uri": "https://gallica.bnf.fr/edit/und/conditions-dutilisation-des-contenus-de-gallica",
    "needConsent": true,
    "cookies": ['dtCookie', 'dtLatC', 'dtPC', 'dtSa', 'rxVisitor', 'rxvt', 'xtvrn'],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['gallica_player'], function (x) {
            var frame_title = (tarteaucitron.getElemAttr(x,"title")) ? tarteaucitron.getElemAttr(x,"title") : 'Gallica iframe',
                src = tarteaucitron.getElemAttr(x, "data-src"),
                style = tarteaucitron.getElemAttr(x, "data-style"),
                frame;
            if (src === undefined) {
                return "";
            }
            frame = '<iframe title="' + frame_title + '" style="'+ style + '" src="' + src + '"></iframe>';
            return frame;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'gallica';
        tarteaucitron.fallback(['gallica_player'], function (elem) {
            elem.style = tarteaucitron.getElemAttr(elem,'data-style');
            return tarteaucitron.engage(id);
        });
    }
};

// crisp
tarteaucitron.services.crisp = {
    "key": "crisp",
    "type": "other",
    "name": "Crisp Chat",
    "uri": "https://help.crisp.chat/en/article/crisp-chatbox-cookie-ip-policy-1147xor/",
    "needConsent": false,
    "cookies": ['crisp-client', '__cfduid'],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.crispID === undefined) {
            return;
        }

        window.$crisp = [];
        window.CRISP_WEBSITE_ID = tarteaucitron.user.crispID;

        tarteaucitron.addScript('https://client.crisp.chat/l.js');
    }
};

// microanalytics
tarteaucitron.services.microanalytics = {
    "key": "microanalytics",
    "type": "analytic",
    "name": "MicroAnalytic",
    "uri": "https://microanalytics.io/page/privacy",
    "needConsent": false,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.microanalyticsID === undefined) {
            return;
        }

        tarteaucitron.addScript('https://microanalytics.io/js/script.js', tarteaucitron.user.microanalyticsID, undefined, true, "data-host", "https://microanalytics.io");
    }
};

// facebookcustomerchat
tarteaucitron.services.facebookcustomerchat = {
    "key": "facebookcustomerchat",
    "type": "social",
    "name": "Facebook (Customer Chat)",
    "uri": "https://www.facebook.com/policies/cookies/",
    "needConsent": true,
    "cookies": ['act','c_user','datr','dpr','presence','sb','wd','xs','/tr'],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.facebookChatID === undefined) {
            return;
        }

        tarteaucitron.fallback(['fb-customerchat'], '');
        window.fbAsyncInit=function(){FB.init({appId:tarteaucitron.user.facebookChatID,autoLogAppEvents:!0,xfbml:!0,version:"v3.0"})};
        tarteaucitron.addScript('https://connect.facebook.net/' + tarteaucitron.getLocale() + '/sdk/xfbml.customerchat.js', 'facebook-jssdk');
    },
    "fallback": function () {
        "use strict";
        var id = 'facebookcustomerchat';
        tarteaucitron.fallback(['fb-customerchat'], tarteaucitron.engage(id));
    }
};

// weborama
tarteaucitron.services.weborama = {
    "key": "weborama",
    "type": "analytic",
    "name": "Weborama",
    "uri": "https://weborama.com/faq-cnil-avril-2021/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.addScript('https://cstatic.weborama.fr/js/advertiserv2/adperf_conversion.js');
    }
};

// tiktok
tarteaucitron.services.tiktok = {
    "key": "tiktok",
    "type": "analytic",
    "name": "Tiktok",
    "uri": "https://www.tiktok.com/legal/tiktok-website-cookies-policy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.tiktokId === undefined) {
            return;
        }

        !function (w, d, t) {
            w.TiktokAnalyticsObject = t;
            var ttq = w[t] = w[t] || [];
            ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie"], ttq.setAndDefer = function (t, e) {
                t[e] = function () {
                    t.push([e].concat(Array.prototype.slice.call(arguments, 0)))
                }
            };
            for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
            ttq.instance = function (t) {
                for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++) ttq.setAndDefer(e, ttq.methods[n]);
                return e
            }, ttq.load = function (e, n) {
                var i = "https://analytics.tiktok.com/i18n/pixel/events.js";
                ttq._i = ttq._i || {}, ttq._i[e] = [], ttq._i[e]._u = i, ttq._t = ttq._t || {}, ttq._t[e] = +new Date, ttq._o = ttq._o || {}, ttq._o[e] = n || {};
                var o = document.createElement("script");
                o.type = "text/javascript", o.async = !0, o.src = i + "?sdkid=" + e + "&lib=" + t;
                var a = document.getElementsByTagName("script")[0];
                a.parentNode.insertBefore(o, a)
            };
            ttq.load(tarteaucitron.user.tiktokId);
            ttq.page();
        }(window, document, 'ttq');

        if (typeof tarteaucitron.user.tiktokMore === "function") {
            tarteaucitron.user.tiktokMore();
        }
    }
};

// Klaviyo
tarteaucitron.services.klaviyo = {
    "key": "klaviyo",
    "type": "ads",
    "name": "Klaviyo",
    "uri": "https://help.klaviyo.com/hc/en-us/articles/360034666712-About-Cookies-in-Klaviyo",
    "needConsent": true,
    "cookies": ['__kla_id'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.klaviyoCompanyId === undefined) {
            return;
        }
        tarteaucitron.addScript('//static.klaviyo.com/onsite/js/klaviyo.js?company_id=' + tarteaucitron.user.klaviyoCompanyId);
    }
};