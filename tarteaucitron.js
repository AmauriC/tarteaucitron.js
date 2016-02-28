// define correct path for files inclusion
var scripts = document.getElementsByTagName('script'),
    path = scripts[scripts.length - 1].src.split('?')[0],
    cdn = path.split('/').slice(0, -1).join('/') + '/',
    alreadyLaunch = (alreadyLaunch === undefined) ? 0 : alreadyLaunch,
    tarteaucitronForceLanguage = (tarteaucitronForceLanguage === undefined) ? '' : tarteaucitronForceLanguage,
    tarteaucitronProLoadServices,
    tarteaucitronNoAdBlocker = false;


var TAC = (function (undefined) {
    'use strict';

/* PRIVATE API */
    // code


/* PUBLIC API */
    return {
        "version": 323,
        "cdn": cdn,
        "user": {},
        "lang": {},
        "services": {},
        "added": [],
        "idprocessed": [],
        "state": [],
        "launch": [],
        "parameters": {},
        "isAjax": false,
        "reloadThePage": false,
        "init": function (params) {
            var origOpen;

            TAC.parameters = params;
            if (alreadyLaunch === 0) {
                alreadyLaunch = 1;
                if (window.addEventListener) {
                    window.addEventListener("load", function () {
                        TAC.load();
                        TAC.fallback(['tarteaucitronOpenPanel'], function (elem) {
                            elem.addEventListener("click", function () {
                                TAC.userInterface.openPanel();
                            }, false);
                        }, true);
                    }, false);
                    window.addEventListener("scroll", function () {
                        var scrollPos = window.pageYOffset || document.documentElement.scrollTop,
                            heightPosition;
                        if (document.getElementById('tarteaucitronAlertBig') !== null && !TAC.highPrivacy) {
                            if (document.getElementById('tarteaucitronAlertBig').style.display === 'block') {
                                heightPosition = document.getElementById('tarteaucitronAlertBig').offsetHeight + 'px';

                                if (scrollPos > (screen.height * 2)) {
                                    TAC.userInterface.respondAll(true);
                                } else if (scrollPos > (screen.height / 2)) {
                                    document.getElementById('tarteaucitronDisclaimerAlert').innerHTML = '<b>' + TAC.lang.alertBigScroll + '</b> ' + TAC.lang.alertBig;
                                }

                                if (TAC.orientation === 'top') {
                                    document.getElementById('tarteaucitronPercentage').style.top = heightPosition;
                                } else {
                                    document.getElementById('tarteaucitronPercentage').style.bottom = heightPosition;
                                }
                                document.getElementById('tarteaucitronPercentage').style.width = ((100 / (screen.height * 2)) * scrollPos) + '%';
                            }
                        }
                    }, false);
                    window.addEventListener("keydown", function (evt) {
                        if (evt.keyCode === 27) {
                            TAC.userInterface.closePanel();
                        }
                    }, false);
                    window.addEventListener("hashchange", function () {
                        if (document.location.hash === TAC.hashtag && TAC.hashtag !== '') {
                            TAC.userInterface.openPanel();
                        }
                    }, false);
                    window.addEventListener("resize", function () {
                        if (document.getElementById('tarteaucitron') !== null) {
                            if (document.getElementById('tarteaucitron').style.display === 'block') {
                                TAC.userInterface.jsSizing('main');
                            }
                        }

                        if (document.getElementById('tarteaucitronCookiesListContainer') !== null) {
                            if (document.getElementById('tarteaucitronCookiesListContainer').style.display === 'block') {
                                TAC.userInterface.jsSizing('cookie');
                            }
                        }
                    }, false);
                } else {
                    window.attachEvent("onload", function () {
                        TAC.load();
                        TAC.fallback(['tarteaucitronOpenPanel'], function (elem) {
                            elem.attachEvent("onclick", function () {
                                TAC.userInterface.openPanel();
                            });
                        }, true);
                    });
                    window.attachEvent("onscroll", function () {
                        var scrollPos = window.pageYOffset || document.documentElement.scrollTop,
                            heightPosition;
                        if (document.getElementById('tarteaucitronAlertBig') !== null && !TAC.highPrivacy) {
                            if (document.getElementById('tarteaucitronAlertBig').style.display === 'block') {
                                heightPosition = document.getElementById('tarteaucitronAlertBig').offsetHeight + 'px';

                                if (scrollPos > (screen.height * 2)) {
                                    TAC.userInterface.respondAll(true);
                                } else if (scrollPos > (screen.height / 2)) {
                                    document.getElementById('tarteaucitronDisclaimerAlert').innerHTML = '<b>' + TAC.lang.alertBigScroll + '</b> ' + TAC.lang.alertBig;
                                }
                                if (TAC.orientation === 'top') {
                                    document.getElementById('tarteaucitronPercentage').style.top = heightPosition;
                                } else {
                                    document.getElementById('tarteaucitronPercentage').style.bottom = heightPosition;
                                }
                                document.getElementById('tarteaucitronPercentage').style.width = ((100 / (screen.height * 2)) * scrollPos) + '%';
                            }
                        }
                    });
                    window.attachEvent("onkeydown", function (evt) {
                        if (evt.keyCode === 27) {
                            TAC.userInterface.closePanel();
                        }
                    });
                    window.attachEvent("onhashchange", function () {
                        if (document.location.hash === TAC.hashtag && TAC.hashtag !== '') {
                            TAC.userInterface.openPanel();
                        }
                    });
                    window.attachEvent("onresize", function () {
                        if (document.getElementById('tarteaucitron') !== null) {
                            if (document.getElementById('tarteaucitron').style.display === 'block') {
                                TAC.userInterface.jsSizing('main');
                            }
                        }

                        if (document.getElementById('tarteaucitronCookiesListContainer') !== null) {
                            if (document.getElementById('tarteaucitronCookiesListContainer').style.display === 'block') {
                                TAC.userInterface.jsSizing('cookie');
                            }
                        }
                    });
                }

                if (typeof XMLHttpRequest !== 'undefined') {
                    origOpen = XMLHttpRequest.prototype.open;
                    XMLHttpRequest.prototype.open = function () {

                        if (window.addEventListener) {
                            this.addEventListener("load", function () {
                                if (typeof tarteaucitronProLoadServices === 'function') {
                                    tarteaucitronProLoadServices();
                                }
                            }, false);
                        } else if (typeof this.attachEvent !== 'undefined') {
                            this.attachEvent("onload", function () {
                                if (typeof tarteaucitronProLoadServices === 'function') {
                                    tarteaucitronProLoadServices();
                                }
                            });
                        } else {
                            if (typeof tarteaucitronProLoadServices === 'function') {
                                setTimeout(tarteaucitronProLoadServices, 1000);
                            }
                        }

                        try {
                            origOpen.apply(this, arguments);
                        } catch (err) {}
                    };
                }
            }
        },
        "load": function () {
            var cdn = TAC.cdn,
                language = TAC.getLanguage(),
                pathToLang = cdn + 'lang/tarteaucitron.' + language + '.js?v=' + TAC.version,
                pathToServices = cdn + 'tarteaucitron.services.js?v=' + TAC.version,
                linkElement = document.createElement('link'),
                defaults = {
                    "adblocker": false,
                    "hashtag": '#tarteaucitron',
                    "highPrivacy": false,
                    "orientation": "top",
                    "removeCredit": false,
                    "showAlertSmall": true,
                    "cookieslist": true
                },
                params = TAC.parameters;

            // Step 0: get params
            if (params !== undefined) {
                TAC.extend(defaults, params);
            }

            // global
            TAC.orientation = defaults.orientation;
            TAC.hashtag = defaults.hashtag;
            TAC.highPrivacy = defaults.highPrivacy;

            // Step 1: load css
            linkElement.rel = 'stylesheet';
            linkElement.type = 'text/css';
            linkElement.href = cdn + 'css/tarteaucitron.css?v=' + TAC.version;
            document.getElementsByTagName('head')[0].appendChild(linkElement);

            // Step 2: load language and services
            TAC.addScript(pathToLang, '', function () {
                TAC.addScript(pathToServices, '', function () {

                    var body = document.body,
                        div = document.createElement('div'),
                        html = '',
                        index,
                        orientation = 'Top',
                        cat = ['ads', 'analytic', 'api', 'comment', 'social', 'support', 'video'],
                        i;

                    cat = cat.sort(function (a, b) {
                        if (TAC.lang[a].title > TAC.lang[b].title) { return 1; }
                        if (TAC.lang[a].title < TAC.lang[b].title) { return -1; }
                        return 0;
                    });

                    // Step 3: prepare the html
                    html += '<div id="tarteaucitronPremium"></div>';
                    html += '<div id="tarteaucitronBack" onclick="TAC.userInterface.closePanel();"></div>';
                    html += '<div id="tarteaucitron">';
                    html += '   <div id="tarteaucitronClosePanel" onclick="TAC.userInterface.closePanel();">';
                    html += '       ' + TAC.lang.close;
                    html += '   </div>';
                    html += '   <div id="tarteaucitronServices">';
                    html += '      <div class="tarteaucitronLine tarteaucitronMainLine" id="tarteaucitronMainLineOffset">';
                    html += '         <div class="tarteaucitronName">';
                    html += '            <b><a href="#" onclick="TAC.userInterface.toggle(\'tarteaucitronInfo\', \'tarteaucitronInfoBox\');return false">&#10011;</a> ' + TAC.lang.all + '</b>';
                    html += '         </div>';
                    html += '         <div class="tarteaucitronAsk" id="tarteaucitronScrollbarAdjust">';
                    html += '            <div id="tarteaucitronAllAllowed" class="tarteaucitronAllow" onclick="TAC.userInterface.respondAll(true);">';
                    html += '               &#10003; ' + TAC.lang.allow;
                    html += '            </div> ';
                    html += '            <div id="tarteaucitronAllDenied" class="tarteaucitronDeny" onclick="TAC.userInterface.respondAll(false);">';
                    html += '               &#10007; ' + TAC.lang.deny;
                    html += '            </div>';
                    html += '         </div>';
                    html += '      </div>';
                    html += '      <div id="tarteaucitronInfo" class="tarteaucitronInfoBox">';
                    html += '         ' + TAC.lang.disclaimer;
                    if (defaults.removeCredit === false) {
                        html += '        <br/><br/>';
                        html += '        <a href="https://opt-out.ferank.eu/" rel="nofollow" target="_blank">' + TAC.lang.credit + '</a>';
                    }
                    html += '      </div>';
                    html += '      <div class="tarteaucitronBorder" id="tarteaucitronScrollbarParent">';
                    html += '         <div class="clear"></div>';
                    for (i = 0; i < cat.length; i += 1) {
                        html += '         <div id="tarteaucitronServicesTitle_' + cat[i] + '" class="tarteaucitronHidden">';
                        html += '            <div class="tarteaucitronTitle">';
                        html += '               <a href="#" onclick="TAC.userInterface.toggle(\'tarteaucitronDetails' + cat[i] + '\', \'tarteaucitronInfoBox\');return false">&#10011;</a> ' + TAC.lang[cat[i]].title;
                        html += '            </div>';
                        html += '            <div id="tarteaucitronDetails' + cat[i] + '" class="tarteaucitronDetails tarteaucitronInfoBox">';
                        html += '               ' + TAC.lang[cat[i]].details;
                        html += '            </div>';
                        html += '         </div>';
                        html += '         <div id="tarteaucitronServices_' + cat[i] + '"></div>';
                    }
                    html += '         <div class="tarteaucitronHidden" id="tarteaucitronScrollbarChild" style="height:20px;display:block"></div>';
                    html += '       </div>';
                    html += '   </div>';
                    html += '</div>';

                    if (defaults.orientation === 'bottom') {
                        orientation = 'Bottom';
                    }

                    if (defaults.highPrivacy) {
                        html += '<div id="tarteaucitronAlertBig" class="tarteaucitronAlertBig' + orientation + '">';
                        html += '   <span id="tarteaucitronDisclaimerAlert">';
                        html += '       ' + TAC.lang.alertBigPrivacy;
                        html += '   </span>';
                        html += '   <span id="tarteaucitronPersonalize" onclick="TAC.userInterface.openPanel();">';
                        html += '       ' + TAC.lang.personalize;
                        html += '   </span>';
                        html += '</div>';
                    } else {
                        html += '<div id="tarteaucitronAlertBig" class="tarteaucitronAlertBig' + orientation + '">';
                        html += '   <span id="tarteaucitronDisclaimerAlert">';
                        html += '       ' + TAC.lang.alertBigClick + ' ' + TAC.lang.alertBig;
                        html += '   </span>';
                        html += '   <span id="tarteaucitronPersonalize" onclick="TAC.userInterface.respondAll(true);">';
                        html += '       &#10003; ' + TAC.lang.acceptAll;
                        html += '   </span>';
                        html += '   <span id="tarteaucitronCloseAlert" onclick="TAC.userInterface.openPanel();">';
                        html += '       ' + TAC.lang.personalize;
                        html += '   </span>';
                        html += '</div>';
                        html += '<div id="tarteaucitronPercentage"></div>';
                    }

                    if (defaults.showAlertSmall === true) {
                        html += '<div id="tarteaucitronAlertSmall">';
                        html += '   <div id="tarteaucitronManager" onclick="TAC.userInterface.openPanel();">';
                        html += '       ' + TAC.lang.alertSmall;
                        html += '       <div id="tarteaucitronDot">';
                        html += '           <span id="tarteaucitronDotGreen"></span>';
                        html += '           <span id="tarteaucitronDotYellow"></span>';
                        html += '           <span id="tarteaucitronDotRed"></span>';
                        html += '       </div>';
                        if (defaults.cookieslist === true) {
                            html += '   </div><!-- @whitespace';
                            html += '   --><div id="tarteaucitronCookiesNumber" onclick="TAC.userInterface.toggleCookiesList();">0</div>';
                            html += '   <div id="tarteaucitronCookiesListContainer">';
                            html += '       <div id="tarteaucitronClosePanelCookie" onclick="TAC.userInterface.closePanel();">';
                            html += '           ' + TAC.lang.close;
                            html += '       </div>';
                            html += '       <div class="tarteaucitronCookiesListMain" id="tarteaucitronCookiesTitle">';
                            html += '            <b id="tarteaucitronCookiesNumberBis">0 cookie</b>';
                            html += '       </div>';
                            html += '       <div id="tarteaucitronCookiesList"></div>';
                            html += '    </div>';
                        } else {
                            html += '   </div>';
                        }
                        html += '</div>';
                    }

                    TAC.addScript(TAC.cdn + 'advertising.js?v=' + TAC.version, '', function () {
                        if (tarteaucitronNoAdBlocker === true || defaults.adblocker === false) {
                            div.id = 'tarteaucitronRoot';
                            body.appendChild(div, body);
                            div.innerHTML = html;

                            if (TAC.job !== undefined) {
                                TAC.job = TAC.cleanArray(TAC.job);
                                for (index = 0; index < TAC.job.length; index += 1) {
                                    TAC.addService(TAC.job[index]);
                                }
                            }

                            TAC.isAjax = true;
                            TAC.job.push = function (id) {

                                // ie <9 hack
                                if (typeof TAC.job.indexOf === 'undefined') {
                                    TAC.job.indexOf = function (obj, start) {
                                        var i,
                                            j = this.length;
                                        for (i = (start || 0); i < j; i += 1) {
                                            if (this[i] === obj) { return i; }
                                        }
                                        return -1;
                                    };
                                }

                                if (TAC.job.indexOf(id) === -1) {
                                    Array.prototype.push.call(this, id);
                                }
                                TAC.launch[id] = false;
                                TAC.addService(id);
                            };

                            if (document.location.hash === TAC.hashtag && TAC.hashtag !== '') {
                                TAC.userInterface.openPanel();
                            }

                            TAC.cookie.number();
                            setInterval(TAC.cookie.number, 60000);
                        }
                    }, defaults.adblocker);

                    if (defaults.adblocker === true) {
                        setTimeout(function () {
                            if (tarteaucitronNoAdBlocker === false) {
                                html = '<div id="tarteaucitronAlertBig" class="tarteaucitronAlertBig' + orientation + '" style="display:block">';
                                html += '   <span id="tarteaucitronDisclaimerAlert">';
                                html += '       ' + TAC.lang.adblock + '<br/>';
                                html += '       <b>' + TAC.lang.adblock_call + '</b>';
                                html += '   </span>';
                                html += '   <span id="tarteaucitronPersonalize" onclick="location.reload();">';
                                html += '       ' + TAC.lang.reload;
                                html += '   </span>';
                                html += '</div>';
                                html += '<div id="tarteaucitronPremium"></div>';
                                div.id = 'tarteaucitronRoot';
                                body.appendChild(div, body);
                                div.innerHTML = html;
                                TAC.pro('!adblocker=true');
                            } else {
                                TAC.pro('!adblocker=false');
                            }
                        }, 1500);
                    }
                });
            });
        },
        "addService": function (serviceId) {
            var html = '',
                s = TAC.services,
                service = s[serviceId],
                cookie = TAC.cookie.read(),
                hostname = document.location.hostname,
                hostRef = document.referrer.split('/')[2],
                isNavigating = (hostRef === hostname) ? true : false,
                isAutostart = (!service.needConsent) ? true : false,
                isWaiting = (cookie.indexOf(service.key + '=wait') >= 0) ? true : false,
                isDenied = (cookie.indexOf(service.key + '=false') >= 0) ? true : false,
                isAllowed = (cookie.indexOf(service.key + '=true') >= 0) ? true : false,
                isResponded = (cookie.indexOf(service.key + '=false') >= 0 || cookie.indexOf(service.key + '=true') >= 0) ? true : false;

            if (TAC.added[service.key] !== true) {
                TAC.added[service.key] = true;

                html += '<div id="' + service.key + 'Line" class="tarteaucitronLine">';
                html += '   <div class="tarteaucitronName">';
                html += '       <b>' + service.name + '</b><br/>';
                html += '       <span id="tacCL' + service.key + '" class="tarteaucitronListCookies"></span><br/>';
                html += '       <a href="https://opt-out.ferank.eu/service/' + service.key + '/" target="_blank">';
                html += '           ' + TAC.lang.more;
                html += '       </a>';
                html += '        - ';
                html += '       <a href="' + service.uri + '" target="_blank">';
                html += '           ' + TAC.lang.source;
                html += '       </a>';
                html += '   </div>';
                html += '   <div class="tarteaucitronAsk">';
                html += '       <div id="' + service.key + 'Allowed" class="tarteaucitronAllow" onclick="TAC.userInterface.respond(this, true);">';
                html += '           &#10003; ' + TAC.lang.allow;
                html += '       </div> ';
                html += '       <div id="' + service.key + 'Denied" class="tarteaucitronDeny" onclick="TAC.userInterface.respond(this, false);">';
                html += '           &#10007; ' + TAC.lang.deny;
                html += '       </div>';
                html += '   </div>';
                html += '</div>';

                TAC.userInterface.css('tarteaucitronServicesTitle_' + service.type, 'display', 'block');

                if (document.getElementById('tarteaucitronServices_' + service.type) !== null) {
                    document.getElementById('tarteaucitronServices_' + service.type).innerHTML += html;
                }

                TAC.userInterface.order(service.type);
            }

            // allow by default for non EU
            if (isResponded === false && TAC.user.bypass === true) {
                isAllowed = true;
                TAC.cookie.create(service.key, true);
            }

            if ((!isResponded && (isAutostart || (isNavigating && isWaiting)) && !TAC.highPrivacy) || isAllowed) {
                if (!isAllowed) {
                    TAC.cookie.create(service.key, true);
                }
                if (TAC.launch[service.key] !== true) {
                    TAC.launch[service.key] = true;
                    service.js();
                }
                TAC.state[service.key] = true;
                TAC.userInterface.color(service.key, true);
            } else if (isDenied) {
                if (typeof service.fallback === 'function') {
                    service.fallback();
                }
                TAC.state[service.key] = false;
                TAC.userInterface.color(service.key, false);
            } else if (!isResponded) {
                TAC.cookie.create(service.key, 'wait');
                if (typeof service.fallback === 'function') {
                    service.fallback();
                }
                TAC.userInterface.color(service.key, 'wait');
                TAC.userInterface.openAlert();
            }

            TAC.cookie.checkCount(service.key);
        },
        "cleanArray": function cleanArray(arr) {
            var i,
                len = arr.length,
                out = [],
                obj = {},
                s = TAC.services;

            for (i = 0; i < len; i += 1) {
                if (!obj[arr[i]]) {
                    obj[arr[i]] = {};
                    if (TAC.services[arr[i]] !== undefined) {
                        out.push(arr[i]);
                    }
                }
            }

            out = out.sort(function (a, b) {
                if (s[a].type + s[a].key > s[b].type + s[b].key) { return 1; }
                if (s[a].type + s[a].key < s[b].type + s[b].key) { return -1; }
                return 0;
            });

            return out;
        },
        "userInterface": {
            "css": function (id, property, value) {
                if (document.getElementById(id) !== null) {
                    document.getElementById(id).style[property] = value;
                }
            },
            "respondAll": function (status) {
                var s = TAC.services,
                    service,
                    key,
                    index = 0;

                for (index = 0; index < TAC.job.length; index += 1) {
                    service = s[TAC.job[index]];
                    key = service.key;
                    if (TAC.state[key] !== status) {
                        if (status === false && TAC.launch[key] === true) {
                            TAC.reloadThePage = true;
                        }
                        if (TAC.launch[key] !== true && status === true) {
                            TAC.launch[key] = true;
                            TAC.services[key].js();
                        }
                        TAC.state[key] = status;
                        TAC.cookie.create(key, status);
                        TAC.userInterface.color(key, status);
                    }
                }
            },
            "respond": function (el, status) {
                var key = el.id.replace(new RegExp("(Eng[0-9]+|Allow|Deni)ed", "g"), '');

                // return if same state
                if (TAC.state[key] === status) {
                    return;
                }

                if (status === false && TAC.launch[key] === true) {
                    TAC.reloadThePage = true;
                }

                // if not already launched... launch the service
                if (status === true) {
                    if (TAC.launch[key] !== true) {
                        TAC.launch[key] = true;
                        TAC.services[key].js();
                    }
                }
                TAC.state[key] = status;
                TAC.cookie.create(key, status);
                TAC.userInterface.color(key, status);
            },
            "color": function (key, status) {
                var gray = '#808080',
                    greenDark = '#1B870B',
                    // greenLight = '#E6FFE2', // never used
                    redDark = '#9C1A1A',
                    // redLight = '#FFE2E2', // never used
                    // yellowDark = '#FBDA26', // never used
                    c = 'tarteaucitron',
                    nbDenied = 0,
                    nbPending = 0,
                    nbAllowed = 0,
                    sum = TAC.job.length,
                    index;

                if (status === true) {
                    TAC.userInterface.css(key + 'Line', 'borderLeft', '5px solid ' + greenDark);
                    TAC.userInterface.css(key + 'Allowed', 'backgroundColor', greenDark);
                    TAC.userInterface.css(key + 'Denied', 'backgroundColor', gray);
                } else if (status === false) {
                    TAC.userInterface.css(key + 'Line', 'borderLeft', '5px solid ' + redDark);
                    TAC.userInterface.css(key + 'Allowed', 'backgroundColor', gray);
                    TAC.userInterface.css(key + 'Denied', 'backgroundColor', redDark);
                }

                // check if all services are allowed
                for (index = 0; index < sum; index += 1) {
                    if (TAC.state[TAC.job[index]] === false) {
                        nbDenied += 1;
                    } else if (TAC.state[TAC.job[index]] === undefined) {
                        nbPending += 1;
                    } else if (TAC.state[TAC.job[index]] === true) {
                        nbAllowed += 1;
                    }
                }

                TAC.userInterface.css(c + 'DotGreen', 'width', ((100 / sum) * nbAllowed) + '%');
                TAC.userInterface.css(c + 'DotYellow', 'width', ((100 / sum) * nbPending) + '%');
                TAC.userInterface.css(c + 'DotRed', 'width', ((100 / sum) * nbDenied) + '%');

                if (nbDenied === 0 && nbPending === 0) {
                    TAC.userInterface.css(c + 'AllAllowed', 'backgroundColor', greenDark);
                    TAC.userInterface.css(c + 'AllDenied', 'backgroundColor', gray);
                } else if (nbAllowed === 0 && nbPending === 0) {
                    TAC.userInterface.css(c + 'AllAllowed', 'backgroundColor', gray);
                    TAC.userInterface.css(c + 'AllDenied', 'backgroundColor', redDark);
                } else {
                    TAC.userInterface.css(c + 'AllAllowed', 'backgroundColor', gray);
                    TAC.userInterface.css(c + 'AllDenied', 'backgroundColor', gray);
                }

                // close the alert if all service have been reviewed
                if (nbPending === 0) {
                    TAC.userInterface.closeAlert();
                }

                if (TAC.services[key].cookies.length > 0 && status === false) {
                    TAC.cookie.purge(TAC.services[key].cookies);
                }

                if (status === true) {
                    if (document.getElementById('tacCL' + key) !== null) {
                        document.getElementById('tacCL' + key).innerHTML = '...';
                    }
                    setTimeout(function () {
                        TAC.cookie.checkCount(key);
                    }, 2500);
                } else {
                    TAC.cookie.checkCount(key);
                }
            },
            "openPanel": function () {
                TAC.userInterface.css('tarteaucitron', 'display', 'block');
                TAC.userInterface.css('tarteaucitronBack', 'display', 'block');
                TAC.userInterface.css('tarteaucitronCookiesListContainer', 'display', 'none');
                TAC.userInterface.jsSizing('main');
            },
            "closePanel": function () {

                if (document.location.hash === TAC.hashtag) {
                    document.location.hash = '';
                }
                TAC.userInterface.css('tarteaucitron', 'display', 'none');
                TAC.userInterface.css('tarteaucitronCookiesListContainer', 'display', 'none');

                TAC.fallback(['tarteaucitronInfoBox'], function (elem) {
                    elem.style.display = 'none';
                }, true);

                if (TAC.reloadThePage === true) {
                    window.location.reload();
                } else {
                    TAC.userInterface.css('tarteaucitronBack', 'display', 'none');
                }
            },
            "openAlert": function () {
                var c = 'tarteaucitron';
                TAC.userInterface.css(c + 'Percentage', 'display', 'block');
                TAC.userInterface.css(c + 'AlertSmall', 'display', 'none');
                TAC.userInterface.css(c + 'AlertBig',   'display', 'block');
            },
            "closeAlert": function () {
                var c = 'tarteaucitron';
                TAC.userInterface.css(c + 'Percentage', 'display', 'none');
                TAC.userInterface.css(c + 'AlertSmall', 'display', 'block');
                TAC.userInterface.css(c + 'AlertBig',   'display', 'none');
                TAC.userInterface.jsSizing('box');
            },
            "toggleCookiesList": function () {
                var div = document.getElementById('tarteaucitronCookiesListContainer');

                if (div === null) {
                    return;
                }

                if (div.style.display !== 'block') {
                    TAC.cookie.number();
                    div.style.display = 'block';
                    TAC.userInterface.jsSizing('cookie');
                    TAC.userInterface.css('tarteaucitron', 'display', 'none');
                    TAC.userInterface.css('tarteaucitronBack', 'display', 'block');
                    TAC.fallback(['tarteaucitronInfoBox'], function (elem) {
                        elem.style.display = 'none';
                    }, true);
                } else {
                    div.style.display = 'none';
                    TAC.userInterface.css('tarteaucitron', 'display', 'none');
                    TAC.userInterface.css('tarteaucitronBack', 'display', 'none');
                }
            },
            "toggle": function (id, closeClass) {
                var div = document.getElementById(id);

                if (div === null) {
                    return;
                }

                if (closeClass !== undefined) {
                    TAC.fallback([closeClass], function (elem) {
                        if (elem.id !== id) {
                            elem.style.display = 'none';
                        }
                    }, true);
                }

                if (div.style.display !== 'block') {
                    div.style.display = 'block';
                } else {
                    div.style.display = 'none';
                }
            },
            "order": function (id) {
                var main = document.getElementById('tarteaucitronServices_' + id),
                    allDivs;
                    // store = [], // never used
                    // i; // never used

                if (main === null) {
                    return;
                }

                allDivs = main.childNodes;

                if (typeof Array.prototype.map === 'function') {
                    Array.prototype.map.call(main.children, Object).sort(function (a, b) {
                        if (TAC.services[a.id.replace(/Line/g, '')].name > TAC.services[b.id.replace(/Line/g, '')].name) { return 1; }
                        if (TAC.services[a.id.replace(/Line/g, '')].name < TAC.services[b.id.replace(/Line/g, '')].name) { return -1; }
                        return 0;
                    }).forEach(function (element) {
                        main.appendChild(element);
                    });
                }
            },
            "jsSizing": function (type) {
                var scrollbarMarginRight = 10,
                    scrollbarWidthParent,
                    scrollbarWidthChild,
                    servicesHeight,
                    e = window,
                    a = 'inner',
                    windowInnerHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
                    mainTop,
                    mainHeight,
                    closeButtonHeight,
                    headerHeight,
                    cookiesListHeight,
                    cookiesCloseHeight,
                    cookiesTitleHeight,
                    paddingBox,
                    alertSmallHeight,
                    cookiesNumberHeight;

                if (type === 'box') {
                    if (document.getElementById('tarteaucitronAlertSmall') !== null && document.getElementById('tarteaucitronCookiesNumber') !== null) {

                        // reset
                        TAC.userInterface.css('tarteaucitronCookiesNumber', 'padding', '0px 10px');

                        // calculate
                        alertSmallHeight = document.getElementById('tarteaucitronAlertSmall').offsetHeight;
                        cookiesNumberHeight = document.getElementById('tarteaucitronCookiesNumber').offsetHeight;
                        paddingBox = (alertSmallHeight - cookiesNumberHeight) / 2;

                        // apply
                        TAC.userInterface.css('tarteaucitronCookiesNumber', 'padding', paddingBox + 'px 10px');
                    }
                } else if (type === 'main') {

                    // get the real window width for media query
                    if (window.innerWidth === undefined) {
                        a = 'client';
                        e = document.documentElement || document.body;
                    }

                    // height of the services list container
                    if (document.getElementById('tarteaucitron') !== null && document.getElementById('tarteaucitronClosePanel') !== null && document.getElementById('tarteaucitronMainLineOffset') !== null) {

                        // reset
                        TAC.userInterface.css('tarteaucitronScrollbarParent', 'height', 'auto');

                        // calculate
                        mainHeight = document.getElementById('tarteaucitron').offsetHeight;
                        closeButtonHeight = document.getElementById('tarteaucitronClosePanel').offsetHeight;
                        headerHeight = document.getElementById('tarteaucitronMainLineOffset').offsetHeight;

                        // apply
                        servicesHeight = (mainHeight - closeButtonHeight - headerHeight + 1);
                        TAC.userInterface.css('tarteaucitronScrollbarParent', 'height', servicesHeight + 'px');
                    }

                    // align the main allow/deny button depending on scrollbar width
                    if (document.getElementById('tarteaucitronScrollbarParent') !== null && document.getElementById('tarteaucitronScrollbarChild') !== null) {

                        // media query
                        if (e[a + 'Width'] <= 479) {
                            TAC.userInterface.css('tarteaucitronScrollbarAdjust', 'marginLeft', '11px');
                        } else if (e[a + 'Width'] <= 767) {
                            scrollbarMarginRight = 12;
                        }

                        scrollbarWidthParent = document.getElementById('tarteaucitronScrollbarParent').offsetWidth;
                        scrollbarWidthChild = document.getElementById('tarteaucitronScrollbarChild').offsetWidth;
                        TAC.userInterface.css('tarteaucitronScrollbarAdjust', 'marginRight', ((scrollbarWidthParent - scrollbarWidthChild) + scrollbarMarginRight) + 'px');
                    }

                    // center the main panel
                    if (document.getElementById('tarteaucitron') !== null) {

                        // media query
                        if (e[a + 'Width'] <= 767) {
                            mainTop = 0;
                        } else {
                            mainTop = ((windowInnerHeight - document.getElementById('tarteaucitron').offsetHeight) / 2) - 21;
                        }

                        // correct
                        if (mainTop < 0) {
                            mainTop = 0;
                        }

                        if (document.getElementById('tarteaucitronMainLineOffset') !== null) {
                            if (document.getElementById('tarteaucitron').offsetHeight < (windowInnerHeight / 2)) {
                                mainTop -= document.getElementById('tarteaucitronMainLineOffset').offsetHeight;
                            }
                        }

                        // apply
                        TAC.userInterface.css('tarteaucitron', 'top', mainTop + 'px');
                    }


                } else if (type === 'cookie') {

                    // put cookies list at bottom
                    if (document.getElementById('tarteaucitronAlertSmall') !== null) {
                        TAC.userInterface.css('tarteaucitronCookiesListContainer', 'bottom', (document.getElementById('tarteaucitronAlertSmall').offsetHeight) + 'px');
                    }

                    // height of cookies list
                    if (document.getElementById('tarteaucitronCookiesListContainer') !== null) {

                        // reset
                        TAC.userInterface.css('tarteaucitronCookiesList', 'height', 'auto');

                        // calculate
                        cookiesListHeight = document.getElementById('tarteaucitronCookiesListContainer').offsetHeight;
                        cookiesCloseHeight = document.getElementById('tarteaucitronClosePanelCookie').offsetHeight;
                        cookiesTitleHeight = document.getElementById('tarteaucitronCookiesTitle').offsetHeight;

                        // apply
                        TAC.userInterface.css('tarteaucitronCookiesList', 'height', (cookiesListHeight - cookiesCloseHeight - cookiesTitleHeight - 2) + 'px');
                    }
                }
            }
        },
        "cookie": {
            "owner": {},
            "create": function (key, status) {
                var d = new Date(),
                    time = d.getTime(),
                    expireTime = time + 31536000000, // 365 days
                    regex = new RegExp("!" + key + "=(wait|true|false)", "g"),
                    cookie = TAC.cookie.read().replace(regex, ""),
                    value = 'tarteaucitron=' + cookie + '!' + key + '=' + status;

                if (TAC.cookie.read().indexOf(key + '=' + status) === -1) {
                    TAC.pro('!' + key + '=' + status);
                }

                d.setTime(expireTime);
                document.cookie = value + '; expires=' + d.toGMTString() + '; path=/;';
            },
            "read": function () {
                var nameEQ = "tarteaucitron=",
                    ca = document.cookie.split(';'),
                    i,
                    c;

                for (i = 0; i < ca.length; i += 1) {
                    c = ca[i];
                    while (c.charAt(0) === ' ') {
                        c = c.substring(1, c.length);
                    }
                    if (c.indexOf(nameEQ) === 0) {
                        return c.substring(nameEQ.length, c.length);
                    }
                }
                return '';
            },
            "purge": function (arr) {
                var i;

                for (i = 0; i < arr.length; i += 1) {
                    document.cookie = arr[i] + '=; expires=Thu, 01 Jan 2000 00:00:00 GMT; path=/;';
                    document.cookie = arr[i] + '=; expires=Thu, 01 Jan 2000 00:00:00 GMT; path=/; domain=.' + location.hostname + ';';
                    document.cookie = arr[i] + '=; expires=Thu, 01 Jan 2000 00:00:00 GMT; path=/; domain=.' + location.hostname.split('.').slice(-2).join('.') + ';';
                }
            },
            "checkCount": function (key) {
                var arr = TAC.services[key].cookies,
                    nb = arr.length,
                    nbCurrent = 0,
                    html = '',
                    i,
                    status = document.cookie.indexOf(key + '=true');

                if (status >= 0 && nb === 0) {
                    html += TAC.lang.useNoCookie;
                } else if (status >= 0) {
                    for (i = 0; i < nb; i += 1) {
                        if (document.cookie.indexOf(arr[i] + '=') !== -1) {
                            nbCurrent += 1;
                            if (TAC.cookie.owner[arr[i]] === undefined) {
                                TAC.cookie.owner[arr[i]] = [];
                            }
                            if (TAC.cookie.crossIndexOf(TAC.cookie.owner[arr[i]], TAC.services[key].name) === false) {
                                TAC.cookie.owner[arr[i]].push(TAC.services[key].name);
                            }
                        }
                    }

                    if (nbCurrent > 0) {
                        html += TAC.lang.useCookieCurrent + ' ' + nbCurrent + ' cookie';
                        if (nbCurrent > 1) {
                            html += 's';
                        }
                        html += '.';
                    } else {
                        html += TAC.lang.useNoCookie;
                    }
                } else if (nb === 0) {
                    html = TAC.lang.noCookie;
                } else {
                    html += TAC.lang.useCookie + ' ' + nb + ' cookie';
                    if (nb > 1) {
                        html += 's';
                    }
                    html += '.';
                }

                if (document.getElementById('tacCL' + key) !== null) {
                    document.getElementById('tacCL' + key).innerHTML = html;
                }
            },
            "crossIndexOf": function (arr, match) {
                var i;
                for (i = 0; i < arr.length; i += 1) {
                    if (arr[i] === match) {
                        return true;
                    }
                }
                return false;
            },
            "number": function () {
                var cookies = document.cookie.split(';'),
                    nb = (document.cookie !== '') ? cookies.length : 0,
                    html = '',
                    i,
                    name,
                    namea,
                    nameb,
                    c,
                    d,
                    s = (nb > 1) ? 's' : '',
                    savedname,
                    regex = /^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i,
                    regexedDomain = (TAC.cdn.match(regex) !== null) ? TAC.cdn.match(regex)[1] : TAC.cdn,
                    host = (TAC.domain !== undefined) ? TAC.domain : regexedDomain;

                cookies = cookies.sort(function (a, b) {
                    namea = a.split('=', 1).toString().replace(/ /g, '');
                    nameb = b.split('=', 1).toString().replace(/ /g, '');
                    c = (TAC.cookie.owner[namea] !== undefined) ? TAC.cookie.owner[namea] : '0';
                    d = (TAC.cookie.owner[nameb] !== undefined) ? TAC.cookie.owner[nameb] : '0';
                    if (c + a > d + b) { return 1; }
                    if (c + a < d + b) { return -1; }
                    return 0;
                });

                if (document.cookie !== '') {
                    for (i = 0; i < nb; i += 1) {
                        name = cookies[i].split('=', 1).toString().replace(/ /g, '');
                        if (TAC.cookie.owner[name] !== undefined && TAC.cookie.owner[name].join(' // ') !== savedname) {
                            savedname = TAC.cookie.owner[name].join(' // ');
                            html += '<div class="tarteaucitronHidden">';
                            html += '     <div class="tarteaucitronTitle">';
                            html += '        ' + TAC.cookie.owner[name].join(' // ');
                            html += '    </div>';
                            html += '</div>';
                        } else if (TAC.cookie.owner[name] === undefined && host !== savedname) {
                            savedname = host;
                            html += '<div class="tarteaucitronHidden">';
                            html += '     <div class="tarteaucitronTitle">';
                            html += '        ' + host;
                            html += '    </div>';
                            html += '</div>';
                        }
                        html += '<div class="tarteaucitronCookiesListMain">';
                        html += '    <div class="tarteaucitronCookiesListLeft"><a href="#" onclick="TAC.cookie.purge([\'' + cookies[i].split('=', 1) + '\']);TAC.cookie.number();TAC.userInterface.jsSizing(\'cookie\');return false"><b>&times;</b></a> <b>' + name + '</b>';
                        html += '    </div>';
                        html += '    <div class="tarteaucitronCookiesListRight">' + cookies[i].split('=').slice(1).join('=') + '</div>';
                        html += '</div>';
                    }
                } else {
                    html += '<div class="tarteaucitronCookiesListMain">';
                    html += '    <div class="tarteaucitronCookiesListLeft"><b>-</b></div>';
                    html += '    <div class="tarteaucitronCookiesListRight"></div>';
                    html += '</div>';
                }

                html += '<div class="tarteaucitronHidden" style="height:20px;display:block"></div>';

                if (document.getElementById('tarteaucitronCookiesList') !== null) {
                    document.getElementById('tarteaucitronCookiesList').innerHTML = html;
                }

                if (document.getElementById('tarteaucitronCookiesNumber') !== null) {
                    document.getElementById('tarteaucitronCookiesNumber').innerHTML = nb;
                }

                if (document.getElementById('tarteaucitronCookiesNumberBis') !== null) {
                    document.getElementById('tarteaucitronCookiesNumberBis').innerHTML = nb + ' cookie' + s;
                }

                for (i = 0; i < TAC.job.length; i += 1) {
                    TAC.cookie.checkCount(TAC.job[i]);
                }
            }
        },
        "getLanguage": function () {
            if (!navigator) { return 'en'; }

            var availableLanguages = 'en,fr,es,it,de,pt,pl,ru',
                defaultLanguage = 'en',
                lang = navigator.language || navigator.browserLanguage ||
                    navigator.systemLanguage || navigator.userLang || null,
                userLanguage = lang.substr(0, 2);

            if (tarteaucitronForceLanguage !== '') {
                if (availableLanguages.indexOf(tarteaucitronForceLanguage) !== -1) {
                    return tarteaucitronForceLanguage;
                }
            }

            if (availableLanguages.indexOf(userLanguage) === -1) {
                return defaultLanguage;
            }
            return userLanguage;
        },
        "getLocale": function () {
            if (!navigator) { return 'en_US'; }

            var lang = navigator.language || navigator.browserLanguage ||
                    navigator.systemLanguage || navigator.userLang || null,
                userLanguage = lang.substr(0, 2);

            if (userLanguage === 'fr') {
                return 'fr_FR';
            } else if (userLanguage === 'en') {
                return 'en_US';
            } else if (userLanguage === 'de') {
                return 'de_DE';
            } else if (userLanguage === 'es') {
                return 'es_ES';
            } else if (userLanguage === 'it') {
                return 'it_IT';
            } else if (userLanguage === 'pt') {
                return 'pt_PT';
            } else {
                return 'en_US';
            }
        },
        "addScript": function (url, id, callback, execute, attrName, attrVal) {
            var script,
                done = false;

            if (execute === false) {
                if (typeof callback === 'function') {
                    callback();
                }
            } else {
                script = document.createElement('script');
                script.type = 'text/javascript';
                script.id = (id !== undefined) ? id : '';
                script.async = true;
                script.src = url;

                if (attrName !== undefined && attrVal !== undefined) {
                    script.setAttribute(attrName, attrVal);
                }

                if (typeof callback === 'function') {
                    script.onreadystatechange = script.onload = function () {
                        var state = script.readyState;
                        if (!done && (!state || /loaded|complete/.test(state))) {
                            done = true;
                            callback();
                        }
                    };
                }

                document.getElementsByTagName('head')[0].appendChild(script);
            }
        },
        "makeAsync": {
            "antiGhost": 0,
            "buffer": '',
            "init": function (url, id) {
                var savedWrite = document.write,
                    savedWriteln = document.writeln;

                document.write = function (content) {
                    TAC.makeAsync.buffer += content;
                };
                document.writeln = function (content) {
                    TAC.makeAsync.buffer += content.concat("\n");
                };

                setTimeout(function () {
                    document.write = savedWrite;
                    document.writeln = savedWriteln;
                }, 20000);

                TAC.makeAsync.getAndParse(url, id);
            },
            "getAndParse": function (url, id) {
                if (TAC.makeAsync.antiGhost > 9) {
                    TAC.makeAsync.antiGhost = 0;
                    return;
                }
                TAC.makeAsync.antiGhost += 1;
                TAC.addScript(url, '', function () {
                    if (document.getElementById(id) !== null) {
                        document.getElementById(id).innerHTML += "<span style='display:none'>&nbsp;</span>" + TAC.makeAsync.buffer;
                        TAC.makeAsync.buffer = '';
                        TAC.makeAsync.execJS(id);
                    }
                });
            },
            "execJS": function (id) {
                /* not strict because third party scripts may have errors */
                var i,
                    scripts,
                    childId,
                    type;

                if (document.getElementById(id) === null) {
                    return;
                }

                scripts = document.getElementById(id).getElementsByTagName('script');
                for (i = 0; i < scripts.length; i += 1) {
                    type = (scripts[i].getAttribute('type') !== null) ? scripts[i].getAttribute('type') : '';
                    if (type === '') {
                        type = (scripts[i].getAttribute('language') !== null) ? scripts[i].getAttribute('language') : '';
                    }
                    if (scripts[i].getAttribute('src') !== null && scripts[i].getAttribute('src') !== '') {
                        childId = id + Math.floor(Math.random() * 99999999999);
                        document.getElementById(id).innerHTML += '<div id="' + childId + '"></div>';
                        TAC.makeAsync.getAndParse(scripts[i].getAttribute('src'), childId);
                    } else if (type.indexOf('javascript') !== -1 || type === '') {
                        eval(scripts[i].innerHTML);
                    }
                }
            }
        },
        "fallback": function (matchClass, content, noInner) {
            var elems = document.getElementsByTagName('*'),
                i,
                index = 0;

            for (i in elems) {
                if (elems[i] !== undefined) {
                    for (index = 0; index < matchClass.length; index += 1) {
                        if ((' ' + elems[i].className + ' ')
                                .indexOf(' ' + matchClass[index] + ' ') > -1) {
                            if (typeof content === 'function') {
                                if (noInner === true) {
                                    content(elems[i]);
                                } else {
                                    elems[i].innerHTML = content(elems[i]);
                                }
                            } else {
                                elems[i].innerHTML = content;
                            }
                        }
                    }
                }
            }
        },
        "engage": function (id) {
            var html = '',
                r = Math.floor(Math.random() * 100000);

            html += '<div class="tac_activate">';
            html += '   <div class="tac_float">';
            html += '      <b>' + TAC.services[id].name + '</b> ' + TAC.lang.fallback;
            html += '      <div class="tarteaucitronAllow" id="Eng' + r + 'ed' + id + '" onclick="TAC.userInterface.respond(this, true);">';
            html += '          &#10003; ' + TAC.lang.allow;
            html += '       </div>';
            html += '   </div>';
            html += '</div>';

            return html;
        },
        "extend": function (a, b) {
            var prop;
            for (prop in b) {
                if (b.hasOwnProperty(prop)) {
                    a[prop] = b[prop];
                }
            }
        },
        "proTemp": '',
        "proTimer": function () {
            setTimeout(TAC.proPing, 1000);
        },
        "pro": function (list) {
            TAC.proTemp += list;
            clearTimeout(TAC.proTimer);
            TAC.proTimer = setTimeout(TAC.proPing, 2500);
        },
        "proPing": function () {
            if (TAC.uuid !== '' && TAC.uuid !== undefined && TAC.proTemp !== '') {
                var div = document.getElementById('tarteaucitronPremium'),
                    timestamp = new Date().getTime(),
                    url = '//opt-out.ferank.eu/premium.php?';

                if (div === null) {
                    return;
                }

                url += 'domain=' + TAC.domain + '&';
                url += 'uuid=' + TAC.uuid + '&';
                url += 'c=' + encodeURIComponent(TAC.proTemp) + '&';
                url += '_' + timestamp;

                div.innerHTML = '<img src="' + url + '" style="display:none" />';

                TAC.proTemp = '';
            }

            TAC.cookie.number();
        }
    };

})();