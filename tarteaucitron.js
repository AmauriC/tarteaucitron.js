/*jslint browser: true */

// define correct path for files inclusion
var scripts = document.getElementsByTagName('script'),
    path = scripts[scripts.length - 1].src.split('?')[0],
    cdn = path.split('/').slice(0, -1).join('/') + '/',
    alreadyLaunch = (alreadyLaunch === undefined) ? 0 : alreadyLaunch,
    tarteaucitronForceLanguage = (tarteaucitronForceLanguage === undefined) ? '' : tarteaucitronForceLanguage;

var tarteaucitron = {
    "cdn": cdn,
    "user": {},
    "lang": {},
    "services": {},
    "state": [],
    "launch": [],
    "init": function (params) {
        "use strict";
        if (alreadyLaunch === 0) {
            alreadyLaunch = 1;
            if (window.addEventListener) {
                window.addEventListener("load", tarteaucitron.load(params), false);
            } else {
                window.attachEvent('onload', tarteaucitron.load(params));
            }
        }
    },
    "load": function (params) {
        "use strict";
        var cdn = tarteaucitron.cdn,
            language = tarteaucitron.getLanguage(),
            pathToLang = cdn + 'lang/tarteaucitron.' + language + '.js',
            pathToServices = cdn + 'tarteaucitron.services.js',
            linkElement = document.createElement('link'),
            defaults = {
                "hashtag": '#tarteaucitron',
                "highPrivacy": false,
                "orientation": "top",
                "removeCredit": false,
                "showAlertSmall": true
            };
        
        // Step 0: get params
        if (params !== undefined) {
            tarteaucitron.extend(defaults, params);
        }
        
        // the hashtag need to be global
        tarteaucitron.hashtag = defaults.hashtag;

        // Step 1: load css
        linkElement.rel = 'stylesheet';
        linkElement.type = 'text/css';
        linkElement.href = cdn + 'css/tarteaucitron.css';
        document.getElementsByTagName('head')[0].appendChild(linkElement);

        // Step 2: load language and services
        tarteaucitron.addScript(pathToLang, '', function () {
            tarteaucitron.addScript(pathToServices, '', function () {

                var body = document.body,
                    div = document.createElement('div'),
                    hostname = document.location.hostname,
                    hostRef = document.referrer.split('/')[2],
                    isNavigating = (hostRef === hostname) ? true : false,
                    isAutostart,
                    isWaiting,
                    isDenied,
                    isAllowed,
                    isResponded,
                    cookie = tarteaucitron.cookie.read(),
                    s = tarteaucitron.services,
                    service,
                    html = '',
                    lastTitle,
                    alert = false,
                    index,
                    orientation = 'Top';

                // dedup, clean and sort job[]
                function cleanArray(arr) {
                    var i,
                        len = arr.length,
                        out = [],
                        obj = {};
 
                    for (i = 0; i < len; i += 1) {
                        if (!obj[arr[i]]) {
                            obj[arr[i]] = {};
                            if (tarteaucitron.services[arr[i]] !== undefined) {
                                out.push(arr[i]);
                            }
                        }
                    }
                    return out;
                }
                
                if (tarteaucitron.job === undefined) {
                    return;
                }
                
                tarteaucitron.job = cleanArray(tarteaucitron.job);
                tarteaucitron.job = tarteaucitron.job.sort(function (a, b) {
                    if (s[a].type + s[a].key > s[b].type + s[b].key) { return 1; }
                    if (s[a].type + s[a].key < s[b].type + s[b].key) { return -1; }
                    return 0;
                });

                // Step 3: prepare the html
                html += '<div id="tarteaucitronPremium"></div>';
                html += '<div id="tarteaucitronBack" onclick="tarteaucitron.userInterface.closePanel();"></div>';
                html += '<div id="tarteaucitron">';
                html += '   <div id="tarteaucitronClosePanel" onclick="tarteaucitron.userInterface.closePanel();">';
                html += '       ' + tarteaucitron.lang.close;
                html += '   </div>';
                html += '   <div id="tarteaucitronInfo">';
                html += '       ' + tarteaucitron.lang.info;
                html += '       <div id="tarteaucitronDisclaimer">';
                html += '           ' + tarteaucitron.lang.disclaimer;
                html += '      </div>';
                html += '   </div>';
                html += '   <div id="tarteaucitronServices">';
                
                html += '<div class="tarteaucitronLine tarteaucitronMainLine">';
                html += '   <div class="tarteaucitronName">';
                html += '       <b>' + tarteaucitron.lang.all + '</b>';
                html += '   </div>';
                html += '   <div class="tarteaucitronAsk">';
                html += '       <div id="tarteaucitronAllAllowed" class="tarteaucitronAllow" onclick="tarteaucitron.userInterface.respondAll(true);">';
                html += '           ' + tarteaucitron.lang.allow;
                html += '       </div> ';
                html += '       <div id="tarteaucitronAllDenied" class="tarteaucitronDeny" onclick="tarteaucitron.userInterface.respondAll(false);">';
                html += '           ' + tarteaucitron.lang.deny;
                html += '       </div>';
                html += '   </div>';
                html += '</div>';
                html += '<div class="clear"></div>';

                for (index = 0; index < tarteaucitron.job.length; index += 1) {
                    service = s[tarteaucitron.job[index]];

                    if (lastTitle !== service.type) {
                        html += '<div class="tarteaucitronTitle">';
                        html += '   ' + tarteaucitron.lang[service.type].title;
                        html += '   <div class="tarteaucitronDetails">';
                        html += '       ' + tarteaucitron.lang[service.type].details;
                        html += '   </div>';
                        html += '</div>';

                        lastTitle = service.type;
                    }

                    html += '<div id="' + service.key + 'Line" class="tarteaucitronLine">';
                    html += '   <div class="tarteaucitronName">';
                    html += '       <b>' + service.name + '</b><br/>';
                    html += '       <span id="tacCL' + service.key + '" class="tarteaucitronListCookies"></span><br/>';
                    html += '       <a href="https://opt-out.ferank.eu/service/' + service.key + '/" target="_blank">';
                    html += '           ' + tarteaucitron.lang.more;
                    html += '       </a>';
                    html += '        - ';
                    html += '       <a href="' + service.uri + '" target="_blank">';
                    html += '           ' + tarteaucitron.lang.source;
                    html += '       </a>';
                    html += '   </div>';
                    html += '   <div class="tarteaucitronAsk">';
                    html += '       <div id="' + service.key + 'Allowed" class="tarteaucitronAllow" onclick="tarteaucitron.userInterface.respond(this, true);">';
                    html += '           ' + tarteaucitron.lang.allow;
                    html += '       </div> ';
                    html += '       <div id="' + service.key + 'Denied" class="tarteaucitronDeny" onclick="tarteaucitron.userInterface.respond(this, false);">';
                    html += '           ' + tarteaucitron.lang.deny;
                    html += '       </div>';
                    html += '   </div>';
                    html += '</div>';
                    html += '<div class="clear"></div>';
                }

                html += '   </div>';
                
                if (defaults.removeCredit === false) {
                    html += '   <div id="tarteaucitronFooter">';
                    html += '      <a href="https://opt-out.ferank.eu/" rel="nofollow" target="_blank">' + tarteaucitron.lang.credit + '</a>';
                    html += '   </div>';
                }
                
                html += '</div>';
                
                // get the banner orientation
                if (defaults.orientation === 'bottom') {
                    orientation = 'Bottom';
                }
                
                if (defaults.highPrivacy) {
                    html += '<div id="tarteaucitronAlertBig" class="tarteaucitronAlertBig' + orientation + '">';
                    html += '   <span id="tarteaucitronDisclaimerAlert">';
                    html += '       ' + tarteaucitron.lang.alertBigPrivacy;
                    html += '   </span>';
                    html += '   <span id="tarteaucitronPersonalize" onclick="tarteaucitron.userInterface.openPanel();">';
                    html += '       ' + tarteaucitron.lang.personalize;
                    html += '   </span>';
                    html += '</div>';
                } else {
                    html += '<div id="tarteaucitronAlertBig" class="tarteaucitronAlertBig' + orientation + '">';
                    html += '   <span id="tarteaucitronDisclaimerAlert">';
                    html += '       ' + tarteaucitron.lang.alertBig;
                    html += '   </span>';
                    html += '   <span id="tarteaucitronPersonalize" onclick="tarteaucitron.userInterface.respondAll(true);">';
                    html += '       ' + tarteaucitron.lang.acceptAll;
                    html += '   </span>';
                    html += '   <span id="tarteaucitronCloseAlert" onclick="tarteaucitron.userInterface.openPanel();">';
                    html += '       ' + tarteaucitron.lang.personalize;
                    html += '   </span>';
                    html += '</div>';
                }
                
                if (defaults.showAlertSmall === true) {
                    html += '<div id="tarteaucitronAlertSmall" onclick="tarteaucitron.userInterface.openPanel();">';
                    html += '   ' + tarteaucitron.lang.alertSmall;
                    html += '   <div id="tarteaucitronDot">';
                    html += '       <span id="tarteaucitronDotGreen"></span>';
                    html += '       <span id="tarteaucitronDotYellow"></span>';
                    html += '       <span id="tarteaucitronDotRed"></span>';
                    html += '   </div>';
                    html += '</div>';
                }

                div.id = 'tarteaucitronRoot';
                body.appendChild(div, body);
                div.innerHTML = html;

                // Step 4: load services
                for (index = 0; index < tarteaucitron.job.length; index += 1) {
                    service = s[tarteaucitron.job[index]];
                    isAutostart = (!service.needConsent) ? true : false;
                    isWaiting = (cookie.indexOf(service.key + '=wait') >= 0) ? true : false;
                    isDenied = (cookie.indexOf(service.key + '=false') >= 0) ? true : false;
                    isAllowed = (cookie.indexOf(service.key + '=true') >= 0) ? true : false;
                    isResponded = (cookie.indexOf(service.key + '=false') >= 0 || cookie.indexOf(service.key + '=true') >= 0) ? true : false;

                    // allow by default for non EU
                    if (isResponded === false && tarteaucitron.user.bypass === true) {
                        isAllowed = true;
                        tarteaucitron.cookie.create(service.key, true);
                    }
                    
                    if ((!isResponded && (isAutostart || (isNavigating && isWaiting)) && !defaults.highPrivacy) || isAllowed) {
                        if (!isAllowed) {
                            tarteaucitron.cookie.create(service.key, true);
                        }
                        if (tarteaucitron.launch[service.key] !== true) {
                            tarteaucitron.launch[service.key] = true;
                            service.js();
                        }
                        tarteaucitron.state[service.key] = true;
                        tarteaucitron.userInterface.color(service.key, true);
                    } else if (isDenied) {
                        if (typeof service.fallback === 'function') {
                            service.fallback();
                        }
                        tarteaucitron.state[service.key] = false;
                        tarteaucitron.userInterface.color(service.key, false);
                    } else if (!isResponded) {
                        tarteaucitron.cookie.create(service.key, 'wait');
                        if (typeof service.fallback === 'function') {
                            service.fallback();
                        }
                    }

                    if (tarteaucitron.state[service.key] === undefined && !alert) {
                        alert = true;
                    }
                    
                    tarteaucitron.cookie.checkCount(service.key);
                }

                // Step 5: display the alert
                if (alert) {
                    tarteaucitron.userInterface.openAlert();
                } else {
                    tarteaucitron.userInterface.closeAlert();
                }
                if (document.location.hash === tarteaucitron.hashtag && tarteaucitron.hashtag !== '') {
                    tarteaucitron.userInterface.openPanel();
                }
            });
        });
    },
    "userInterface": {
        "css": function (id, property, value) {
            "use strict";
            if (document.getElementById(id) !== null) {
                document.getElementById(id).style[property] = value;
            }
        },
        "respondAll": function (status) {
            "use strict";
            var s = tarteaucitron.services,
                service,
                key,
                index = 0;
            
            for (index = 0; index < tarteaucitron.job.length; index += 1) {
                service = s[tarteaucitron.job[index]];
                key = service.key;
                if (tarteaucitron.launch[key] !== true && status === true) {
                    tarteaucitron.launch[key] = true;
                    tarteaucitron.services[key].js();
                }
                tarteaucitron.state[key] = status;
                tarteaucitron.cookie.create(key, status);
                tarteaucitron.userInterface.color(key, status);
            }
        },
        "respond": function (el, status) {
            "use strict";
            var key = el.id.replace(new RegExp("(Eng[0-9]+|Allow|Deni)ed", "g"), '');
        
            // return if same state
            if (tarteaucitron.state[key] === status) {
                return;
            }
        
            // if not already launched... launch the service
            if (status === true) {
                if (tarteaucitron.launch[key] !== true) {
                    tarteaucitron.launch[key] = true;
                    tarteaucitron.services[key].js();
                }
            }
            tarteaucitron.state[key] = status;
            tarteaucitron.cookie.create(key, status);
            tarteaucitron.userInterface.color(key, status);
        },
        "color": function (key, status) {
            "use strict";
            var gray = '#808080',
                greenDark = '#1B870B',
                greenLight = '#E6FFE2',
                redDark = '#9C1A1A',
                redLight = '#FFE2E2',
                yellowDark = '#FBDA26',
                c = 'tarteaucitron',
                nbDenied = 0,
                nbPending = 0,
                nbAllowed = 0,
                sum = tarteaucitron.job.length,
                index;

            if (status === true) {
                tarteaucitron.userInterface.css(key + 'Line', 'borderLeft', '5px solid ' + greenDark);
                tarteaucitron.userInterface.css(key + 'Allowed', 'backgroundColor', greenDark);
                tarteaucitron.userInterface.css(key + 'Denied', 'backgroundColor', gray);
            } else if (status === false) {
                tarteaucitron.userInterface.css(key + 'Line', 'borderLeft', '5px solid ' + redDark);
                tarteaucitron.userInterface.css(key + 'Allowed', 'backgroundColor', gray);
                tarteaucitron.userInterface.css(key + 'Denied', 'backgroundColor', redDark);
            }

            // check if all services are allowed
            for (index = 0; index < sum; index += 1) {
                if (tarteaucitron.state[tarteaucitron.job[index]] === false) {
                    nbDenied += 1;
                } else if (tarteaucitron.state[tarteaucitron.job[index]] === undefined) {
                    nbPending += 1;
                } else if (tarteaucitron.state[tarteaucitron.job[index]] === true) {
                    nbAllowed += 1;
                }
            }
        
            tarteaucitron.userInterface.css(c + 'DotGreen', 'width', ((100 / sum) * nbAllowed) + '%');
            tarteaucitron.userInterface.css(c + 'DotYellow', 'width', ((100 / sum) * nbPending) + '%');
            tarteaucitron.userInterface.css(c + 'DotRed', 'width', ((100 / sum) * nbDenied) + '%');
            
            if (nbDenied === 0 && nbPending === 0) {
                tarteaucitron.userInterface.css(c + 'AllAllowed', 'backgroundColor', greenDark);
                tarteaucitron.userInterface.css(c + 'AllDenied', 'backgroundColor', gray);
            } else if (nbAllowed === 0 && nbPending === 0) {
                tarteaucitron.userInterface.css(c + 'AllAllowed', 'backgroundColor', gray);
                tarteaucitron.userInterface.css(c + 'AllDenied', 'backgroundColor', redDark);
            } else {
                tarteaucitron.userInterface.css(c + 'AllAllowed', 'backgroundColor', gray);
                tarteaucitron.userInterface.css(c + 'AllDenied', 'backgroundColor', gray);
            }
            
            // close the alert if all service have been reviewed
            if (nbPending === 0) {
                tarteaucitron.userInterface.closeAlert();
            }
            
            if (tarteaucitron.services[key].cookies.length > 0 && status === false) {
                tarteaucitron.cookie.purge(tarteaucitron.services[key].cookies);
            }
            
            if (status === true) {
                if (document.getElementById('tacCL' + key) !== null) {
                    document.getElementById('tacCL' + key).innerHTML = '...';
                }
                setTimeout(function () {
                    tarteaucitron.cookie.checkCount(key);
                }, 2500);
            } else {
                tarteaucitron.cookie.checkCount(key);
            }
        },
        "openPanel": function () {
            "use strict";
            tarteaucitron.userInterface.css('tarteaucitron', 'display', 'block');
            tarteaucitron.userInterface.css('tarteaucitronBack', 'display', 'block');

            // setting hash tag
            if (tarteaucitron.hashtag !== '') {
                document.location.hash = tarteaucitron.hashtag;
            }
        },
        "closePanel": function () {
            "use strict";
            tarteaucitron.userInterface.css('tarteaucitron', 'display', 'none');
            tarteaucitron.userInterface.css('tarteaucitronBack', 'display', 'none');
        },
        "openAlert": function () {
            "use strict";
            var c = 'tarteaucitron';
            tarteaucitron.userInterface.css(c + 'AlertSmall', 'display', 'none');
            tarteaucitron.userInterface.css(c + 'AlertBig',   'display', 'block');
        },
        "closeAlert": function () {
            "use strict";
            var c = 'tarteaucitron';
            tarteaucitron.userInterface.css(c + 'AlertSmall', 'display', 'block');
            tarteaucitron.userInterface.css(c + 'AlertBig',   'display', 'none');
        }
    },
    "cookie": {
        "create": function (key, status) {
            "use strict";
            var d = new Date(),
                time = d.getTime(),
                expireTime = time + 31536000000, // 365 days
                regex = new RegExp("!" + key + "=(wait|true|false)", "g"),
                cookie = tarteaucitron.cookie.read().replace(regex, ""),
                value = 'tarteaucitron=' + cookie + '!' + key + '=' + status;
            
            if (tarteaucitron.cookie.read().indexOf(key + '=' + status) === -1) {
                tarteaucitron.pro('!' + key + '=' + status);
            }

            d.setTime(expireTime);
            document.cookie = value + '; expires=' + d.toGMTString() + '; path=/;';
        },
        "read": function () {
            "use strict";
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
            "use strict";
            var i;
            
            for (i = 0; i < arr.length; i += 1) {
                document.cookie = arr[i] + '=; expires=Thu, 01 Jan 2000 00:00:00 GMT; path=/;';
                document.cookie = arr[i] + '=; expires=Thu, 01 Jan 2000 00:00:00 GMT; path=/; domain=.' + location.hostname + ';';
                document.cookie = arr[i] + '=; expires=Thu, 01 Jan 2000 00:00:00 GMT; path=/; domain=.' + location.hostname.split('.').slice(-2).join('.') + ';';
            }
        },
        "checkCount": function (key) {
            "use strict";
            var arr = tarteaucitron.services[key].cookies,
                nb = arr.length,
                nbCurrent = 0,
                html = '',
                i,
                status = document.cookie.indexOf(key + '=true');
            
            if (status >= 0 && nb === 0) {
                html += tarteaucitron.lang.useNoCookie;
            } else if (status >= 0) {
                for (i = 0; i < nb; i += 1) {
                    if (document.cookie.indexOf(arr[i] + '=') !== -1) {
                        nbCurrent += 1;
                    }
                }
                
                if (nbCurrent > 0) {
                    html += tarteaucitron.lang.useCookieCurrent + ' ' + nbCurrent + ' cookie';
                    if (nbCurrent > 1) {
                        html += 's';
                    }
                    html += '.';
                } else {
                    html += tarteaucitron.lang.useNoCookie;
                }
            } else if (nb === 0) {
                html = tarteaucitron.lang.noCookie;
            } else {
                html += tarteaucitron.lang.useCookie + ' ' + nb + ' cookie';
                if (nb > 1) {
                    html += 's';
                }
                html += '.';
            }
            
            if (document.getElementById('tacCL' + key) !== null) {
                document.getElementById('tacCL' + key).innerHTML = html;
            }
        }
    },
    "getLanguage": function () {
        "use strict";
        if (!navigator) { return 'en'; }
        
        var availableLanguages = 'en,fr,es,de',
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
        "use strict";
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
    "addScript": function (url, id, callback) {
        "use strict";
        var script = document.createElement('script'),
            done = false;
        
        script.type = 'text/javascript';
        script.id = (id !== undefined) ? id : '';
        script.async = true;
        script.src = url;

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
    },
    "fallback": function (matchClass, content) {
        "use strict";
        var elems = document.getElementsByTagName('*'),
            i,
            index = 0;

        for (i in elems) {
            if (elems[i] !== undefined) {
                for (index = 0; index < matchClass.length; index += 1) {
                    if ((' ' + elems[i].className + ' ')
                            .indexOf(' ' + matchClass[index] + ' ') > -1) {
                        if (typeof content === 'function') {
                            elems[i].innerHTML = content(elems[i]);
                        } else {
                            elems[i].innerHTML = content;
                        }
                    }
                }
            }
        }
    },
    "engage": function (id) {
        "use strict";
        var html = '',
            r = Math.floor(Math.random() * 100000);
                
        html += '<div class="tac_activate">';
        html += '   <div class="tac_float">';
        html += '      <b>' + tarteaucitron.services[id].name + '</b> ' + tarteaucitron.lang.fallback + '<br/>';
        html += '      <div class="tarteaucitronAllow" id="Eng' + r + 'ed' + id + '" onclick="tarteaucitron.userInterface.respond(this, true);">';
        html += '          ' + tarteaucitron.lang.allow;
        html += '       </div>';
        html += '   </div>';
        html += '</div>';
        
        return html;
    },
    "extend": function (a, b) {
        "use strict";
        var prop;
        for (prop in b) {
            if (b.hasOwnProperty(prop)) {
                a[prop] = b[prop];
            }
        }
    },
    "proTemp": '',
    "proTimer": function () {
        "use strict";
        setTimeout(tarteaucitron.proPing, 1000);
    },
    "pro": function (list) {
        "use strict";
        tarteaucitron.proTemp += list;
        clearTimeout(tarteaucitron.proTimer);
        tarteaucitron.proTimer = setTimeout(tarteaucitron.proPing, 2500);
    },
    "proPing": function () {
        "use strict";
        if (tarteaucitron.uuid !== '' && tarteaucitron.uuid !== undefined && tarteaucitron.proTemp !== '') {
            var div = document.getElementById('tarteaucitronPremium'),
                timestamp = new Date().getTime(),
                url = '//opt-out.ferank.eu/premium.php?';
            
            url += 'domain=' + tarteaucitron.domain + '&';
            url += 'uuid=' + tarteaucitron.uuid + '&';
            url += 'c=' + encodeURIComponent(tarteaucitron.proTemp) + '&';
            url += '_' + timestamp;
            
            div.innerHTML = '<img src="' + url + '" style="display:none" />';
            
            tarteaucitron.proTemp = '';
        }
    }
};