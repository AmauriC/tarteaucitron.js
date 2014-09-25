/*jslint browser: true */

// define correct path for files inclusion
var scripts = document.getElementsByTagName('script'),
    path = scripts[scripts.length - 1].src.split('?')[0],
    cdn = path.split('/').slice(0, -1).join('/') + '/';

var tarteaucitron = {
    "autoOpen": false, // auto open the panel with #tarteaucitron hash ?
    "promoteThisScript": false, // promote this script if ads are denied ?
    "cdn": cdn,
    "user": {},
    "lang": {},
    "services": {},
    "state": [],
    "launch": [],
    "init": function () {
        "use strict";
        var cdn = tarteaucitron.cdn,
            language = tarteaucitron.getLanguage(),
            pathToLang = cdn + 'lang/tarteaucitron.' + language + '.js',
            pathToServices = cdn + 'tarteaucitron.services.js',
            linkElement = document.createElement('link');
        
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
                    isDenied,
                    isAllowed,
                    isResponded,
                    cookie = tarteaucitron.cookie.read(),
                    s = tarteaucitron.services,
                    service,
                    html = '',
                    lastTitle,
                    alert = false,
                    index;

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
                tarteaucitron.job = cleanArray(tarteaucitron.job);
                tarteaucitron.job = tarteaucitron.job.sort(function (a, b) {
                    if (s[a].type + s[a].key > s[b].type + s[b].key) { return 1; }
                    if (s[a].type + s[a].key < s[b].type + s[b].key) { return -1; }
                    return 0;
                });

                // if bypass: load all services and exit
                // for example, set tarteaucitron.user.bypass = true;
                // if the user is not in europa
                if (tarteaucitron.user.bypass === true) {
                    for (index = 0; index < tarteaucitron.job.length; index += 1) {
                        service = s[tarteaucitron.job[index]];
                        service.js();
                    }
                    return;
                }

                // Step 3: prepare the html
                html += '<div id="tarteaucitronBack"></div>';
                html += '<div id="tarteaucitron">';
                html += '   <div id="tarteaucitronClosePanel" onclick="tarteaucitron.userInterface.closePanel();">';
                html += '       ' + tarteaucitron.lang.close;
                html += '   </div>';
                html += '   <div id="tarteaucitronDisclaimer">';
                html += '       ' + tarteaucitron.lang.disclaimer;
                html += '   </div>';
                html += '   <div id="tarteaucitronServices">';

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
                    html += '       <a href="' + service.uri + '" target="_blank">';
                    html += '           ' + tarteaucitron.lang.more + ' : ' + service.uri.split('/')[2];
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
                html += '</div>';
                html += '<div id="tarteaucitronAlertBig">';
                html += '   <span id="tarteaucitronDisclaimerAlert">';
                html += '       ' + tarteaucitron.lang.alertBig;
                html += '   </span>';
                html += '   <span id="tarteaucitronPersonalize" onclick="tarteaucitron.userInterface.openPanel();">';
                html += '       ' + tarteaucitron.lang.personalize;
                html += '   </span>';
                html += '   <span id="tarteaucitronCloseAlert" onclick="tarteaucitron.userInterface.closeAlert();">';
                html += '       ' + tarteaucitron.lang.close;
                html += '   </span>';
                html += '</div>';
                html += '<div id="tarteaucitronAlertSmall" onclick="tarteaucitron.userInterface.openPanel();">';
                html += '   <span id="tarteaucitronDot"></span>';
                html += '   ' + tarteaucitron.lang.alertSmall;
                html += '</div>';

                div.id = 'tarteaucitronRoot';
                body.appendChild(div, body);
                div.innerHTML = html;

                // Step 4: load services
                for (index = 0; index < tarteaucitron.job.length; index += 1) {
                    service = s[tarteaucitron.job[index]];
                    isAutostart = (!service.needConsent) ? true : false;
                    isDenied = (cookie.indexOf(service.key + '=false') >= 0) ? true : false;
                    isAllowed = (cookie.indexOf(service.key + '=true') >= 0) ? true : false;
                    isResponded = (cookie.indexOf(service.key) >= 0) ? true : false;

                    if ((!isResponded && (isAutostart || isNavigating)) || isAllowed) {
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
                        if (typeof service.fallback === 'function') {
                            service.fallback();
                        }
                    }

                    if (tarteaucitron.state[service.key] === undefined && !alert) {
                        alert = true;
                    }
                }

                // Step 5: display the alert
                if (alert) {
                    tarteaucitron.userInterface.openAlert();
                } else {
                    tarteaucitron.userInterface.closeAlert();
                }
                if (document.location.hash === '#tarteaucitron' && tarteaucitron.autoOpen === true) {
                    tarteaucitron.userInterface.openPanel();
                }
            });
        });
    },
    "userInterface": {
        "css": function (id, property, value) {
            "use strict";
            document.getElementById(id).style[property] = value;
        },
        "respond": function (el, status) {
            "use strict";
            var key = el.id.replace(new RegExp("(Allow|Deni)ed", "g"), '');
        
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
                c = 'tarteaucitron',
                allAllowed = true,
                index;

            if (status === true) {
                tarteaucitron.userInterface.css(key + 'Line', 'backgroundColor', greenLight);
                tarteaucitron.userInterface.css(key + 'Allowed', 'backgroundColor', greenDark);
                tarteaucitron.userInterface.css(key + 'Denied', 'backgroundColor', gray);
            } else if (status === false) {
                tarteaucitron.userInterface.css(key + 'Line', 'backgroundColor', redLight);
                tarteaucitron.userInterface.css(key + 'Allowed', 'backgroundColor', gray);
                tarteaucitron.userInterface.css(key + 'Denied', 'backgroundColor', redDark);
            }
        
            // check if all services are allowed
            for (index = 0; index < tarteaucitron.job.length; index += 1) {
                if (tarteaucitron.state[tarteaucitron.job[index]] === false) {
                    allAllowed = false;
                    break;
                }
            }
        
            if (allAllowed) {
                tarteaucitron.userInterface.css(c + 'Dot', 'backgroundColor', greenDark);
            } else {
                tarteaucitron.userInterface.css(c + 'Dot', 'backgroundColor', redDark);
            }
        },
        "openPanel": function () {
            "use strict";
            tarteaucitron.userInterface.css('tarteaucitron', 'display', 'block');
            tarteaucitron.userInterface.css('tarteaucitronBack', 'display', 'block');
            tarteaucitron.userInterface.closeAlert();

            // setting hash tag
            document.location.hash = 'tarteaucitron';
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
                regex = new RegExp("!" + key + "=(true|false)", "g"),
                cookie = tarteaucitron.cookie.read().replace(regex, ""),
                value = 'tarteaucitron=' + cookie + '!' + key + '=' + status;

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
        }
    },
    "getLanguage": function () {
        "use strict";
        if (!navigator) { return 'en'; }
        
        var availableLanguages = 'en,fr',
            defaultLanguage = 'en',
            lang = navigator.language || navigator.browserLanguage ||
                navigator.systemLanguage || navigator.userLang || null,
            userLanguage = lang.substr(0, 2);
        
        if (availableLanguages.indexOf(userLanguage) === -1) {
            return defaultLanguage;
        }
        return userLanguage;
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
    
    /***
     * Fallback function for advertising services
     * 
     * Currently, a banner to promote tarteaucitron.js is displayed,
     * fell free to change this by your own ads.
     *
     * Because eval() id devil, you can't pass <script>,
     * only html like <a><img /></a>
     */
    "promoteMe": function (el) {
        "use strict";
        if (tarteaucitron.promoteThisScript === false) { return ''; }
        
        var l = tarteaucitron.getLanguage(),
            w = el.offsetWidth,
            h = el.offsetHeight,
            s = '',
            r = '';

        if (w > 0 && h === 0) {
            h = 60;
        }
        if (w >= 728 && h <= 60) {
            h = 90;
        }
        if (w >= 970 && h >= 250) {
            s = '970250';
        } else if (w >= 970 && h >= 90) {
            s = '97090';
        } else if (w >= 728 && h >= 90) {
            s = '72890';
        } else if (w >= 468 && h >= 60) {
            s = '46860';
        } else if (w >= 336 && h >= 280) {
            s = '336280';
        } else if (w >= 300 && h >= 600) {
            s = '300600';
        } else if (w >= 300 && h >= 250) {
            s = '300250';
        } else if (w >= 250 && h >= 250) {
            s = '250250';
        } else if (w >= 200 && h >= 200) {
            s = '200200';
        } else if (w >= 160 && h >= 600) {
            s = '160600';
        } else if (w >= 120 && h >= 600) {
            s = '120600';
        } else if (w >= 120 && h >= 300) {
            s = '120300';
        } else if (w >= 120 && h >= 240) {
            s = '120240';
        } else {
            s = '8080';
        }

        r += '<a href="//opt-out.ferank.eu/" target="_blank" rel="nofollow">';
        r += '  <img src="//opt-out.ferank.eu/b/' + l + '/' + s + '.gif" border="0" />';
        r += '</a>';

        return r;
    }
};