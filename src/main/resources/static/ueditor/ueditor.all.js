(function () {
    function X(d, b, c) {
        var a;
        b = b.toLowerCase();
        return (a = d.__allListeners || c && (d.__allListeners = {})) && (a[b] || c && (a[b] = []))
    }

    function Y(d, b, c, a, e, h) {
        a = a && d[b];
        var g;
        for (!a && (a = d[c]); !a && (g = (g || d).parentNode);) {
            if ("BODY" == g.tagName || h && !h(g))return null;
            a = g[c]
        }
        return a && e && !e(a) ? Y(a, b, c, !1, e) : a
    }

    UEDITOR_CONFIG = window.UEDITOR_CONFIG || {};
    var t = window.baidu || {};
    window.baidu = t;
    window.UE = t.editor = window.UE || {};
    UE.plugins = {};
    UE.commands = {};
    UE.instants = {};
    UE.I18N = {};
    UE._customizeUI = {};
    UE.version = "1.4.3";
    var M = UE.dom = {}, r = UE.browser = function () {
        var d = navigator.userAgent.toLowerCase(), b = window.opera, c = {
            ie: /(msie\s|trident.*rv:)([\w.]+)/.test(d),
            opera: !!b && b.version,
            webkit: -1 < d.indexOf(" applewebkit/"),
            mac: -1 < d.indexOf("macintosh"),
            quirks: "BackCompat" == document.compatMode
        };
        c.gecko = "Gecko" == navigator.product && !c.webkit && !c.opera && !c.ie;
        var a = 0;
        if (c.ie) {
            var a = d.match(/(?:msie\s([\w.]+))/), e = d.match(/(?:trident.*rv:([\w.]+))/), a = a && e && a[1] && e[1] ? Math.max(1 * a[1], 1 * e[1]) : a && a[1] ? 1 * a[1] : e && e[1] ? 1 * e[1] : 0;
            c.ie11Compat =
                11 == document.documentMode;
            c.ie9Compat = 9 == document.documentMode;
            c.ie8 = !!document.documentMode;
            c.ie8Compat = 8 == document.documentMode;
            c.ie7Compat = 7 == a && !document.documentMode || 7 == document.documentMode;
            c.ie6Compat = 7 > a || c.quirks;
            c.ie9above = 8 < a;
            c.ie9below = 9 > a;
            c.ie11above = 10 < a;
            c.ie11below = 11 > a
        }
        c.gecko && (e = d.match(/rv:([\d\.]+)/)) && (e = e[1].split("."), a = 1E4 * e[0] + 100 * (e[1] || 0) + 1 * (e[2] || 0));
        /chrome\/(\d+\.\d)/i.test(d) && (c.chrome = +RegExp.$1);
        /(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(d) && !/chrome/i.test(d) &&
        (c.safari = +(RegExp.$1 || RegExp.$2));
        c.opera && (a = parseFloat(b.version()));
        c.webkit && (a = parseFloat(d.match(/ applewebkit\/(\d+)/)[1]));
        c.version = a;
        c.isCompatible = !c.mobile && (c.ie && 6 <= a || c.gecko && 10801 <= a || c.opera && 9.5 <= a || c.air && 1 <= a || c.webkit && 522 <= a || !1);
        return c
    }(), J = r.ie, ma = r.opera, p = UE.utils = {
        each: function (d, b, c) {
            if (null != d)if (d.length === +d.length)for (var a = 0, e = d.length; a < e; a++) {
                if (!1 === b.call(c, d[a], a, d))return !1
            } else for (a in d)if (d.hasOwnProperty(a) && !1 === b.call(c, d[a], a, d))return !1
        }, makeInstance: function (d) {
            var b =
                new Function;
            b.prototype = d;
            d = new b;
            b.prototype = null;
            return d
        }, extend: function (d, b, c) {
            if (b)for (var a in b)c && d.hasOwnProperty(a) || (d[a] = b[a]);
            return d
        }, extend2: function (d) {
            for (var b = arguments, c = 1; c < b.length; c++) {
                var a = b[c], e;
                for (e in a)d.hasOwnProperty(e) || (d[e] = a[e])
            }
            return d
        }, inherits: function (d, b) {
            var c = d.prototype, a = p.makeInstance(b.prototype);
            p.extend(a, c, !0);
            d.prototype = a;
            return a.constructor = d
        }, bind: function (d, b) {
            return function () {
                return d.apply(b, arguments)
            }
        }, defer: function (d, b, c) {
            var a;
            return function () {
                c &&
                clearTimeout(a);
                a = setTimeout(d, b)
            }
        }, indexOf: function (d, b, c) {
            var a = -1;
            c = this.isNumber(c) ? c : 0;
            this.each(d, function (e, h) {
                if (h >= c && e === b)return a = h, !1
            });
            return a
        }, removeItem: function (d, b) {
            for (var c = 0, a = d.length; c < a; c++)d[c] === b && (d.splice(c, 1), c--)
        }, trim: function (d) {
            return d.replace(/(^[ \t\n\r]+)|([ \t\n\r]+$)/g, "")
        }, listToMap: function (d) {
            if (!d)return {};
            d = p.isArray(d) ? d : d.split(",");
            for (var b = 0, c, a = {}; c = d[b++];)a[c.toUpperCase()] = a[c] = 1;
            return a
        }, unhtml: function (d, b) {
            return d ? d.replace(b || /[&<">'](?:(amp|lt|quot|gt|#39|nbsp|#\d+);)?/g,
                function (c, a) {
                    return a ? c : {"<": "&lt;", "&": "&amp;", '"': "&quot;", ">": "&gt;", "'": "&#39;"}[c]
                }) : ""
        }, html: function (d) {
            return d ? d.replace(/&((g|l|quo)t|amp|#39|nbsp);/g, function (b) {
                return {"&lt;": "<", "&amp;": "&", "&quot;": '"', "&gt;": ">", "&#39;": "'", "&nbsp;": " "}[b]
            }) : ""
        }, cssStyleToDomStyle: function () {
            var d = document.createElement("div").style, b = {"float": void 0 != d.cssFloat ? "cssFloat" : void 0 != d.styleFloat ? "styleFloat" : "float"};
            return function (c) {
                return b[c] || (b[c] = c.toLowerCase().replace(/-./g, function (a) {
                        return a.charAt(1).toUpperCase()
                    }))
            }
        }(),
        loadFile: function () {
            function d(c, a) {
                try {
                    for (var e = 0, h; h = b[e++];)if (h.doc === c && h.url == (a.src || a.href))return h
                } catch (g) {
                    return null
                }
            }

            var b = [];
            return function (c, a, e) {
                var h = d(c, a);
                if (h)h.ready ? e && e() : h.funs.push(e); else if (b.push({
                        doc: c,
                        url: a.src || a.href,
                        funs: [e]
                    }), !c.body) {
                    e = [];
                    for (var g in a)"tag" != g && e.push(g + '="' + a[g] + '"');
                    c.write("<" + a.tag + " " + e.join(" ") + " ></" + a.tag + ">")
                } else if (!a.id || !c.getElementById(a.id)) {
                    var l = c.createElement(a.tag);
                    delete a.tag;
                    for (g in a)l.setAttribute(g, a[g]);
                    l.onload =
                        l.onreadystatechange = function () {
                            if (!this.readyState || /loaded|complete/.test(this.readyState)) {
                                h = d(c, a);
                                if (0 < h.funs.length) {
                                    h.ready = 1;
                                    for (var e; e = h.funs.pop();)e()
                                }
                                l.onload = l.onreadystatechange = null
                            }
                        };
                    l.onerror = function () {
                        throw Error("The load " + (a.href || a.src) + " fails,check the url settings of file ueditor.config.js ");
                    };
                    c.getElementsByTagName("head")[0].appendChild(l)
                }
            }
        }(), isEmptyObject: function (d) {
            if (null == d)return !0;
            if (this.isArray(d) || this.isString(d))return 0 === d.length;
            for (var b in d)if (d.hasOwnProperty(b))return !1;
            return !0
        }, fixColor: function (d, b) {
            if (/color/i.test(d) && /rgba?/.test(b)) {
                var c = b.split(",");
                if (3 < c.length)return "";
                b = "#";
                for (var a = 0, e; e = c[a++];)e = parseInt(e.replace(/[^\d]/gi, ""), 10).toString(16), b += 1 == e.length ? "0" + e : e;
                b = b.toUpperCase()
            }
            return b
        }, optCss: function (d) {
            function b(a, c) {
                if (!a)return "";
                var g = a.top, b = a.bottom, k = a.left, d = a.right, n = "";
                if (g && k && b && d)n += ";" + c + ":" + (g == b && b == k && k == d ? g : g == b && k == d ? g + " " + k : k == d ? g + " " + k + " " + b : g + " " + d + " " + b + " " + k) + ";"; else for (var f in a)n += ";" + c + "-" + f + ":" + a[f] + ";";
                return n
            }

            var c, a;
            d = d.replace(/(padding|margin|border)\-([^:]+):([^;]+);?/gi, function (e, b, g, l) {
                if (1 == l.split(" ").length)switch (b) {
                    case "padding":
                        return !c && (c = {}), c[g] = l, "";
                    case "margin":
                        return !a && (a = {}), a[g] = l, "";
                    case "border":
                        return "initial" == l ? "" : e
                }
                return e
            });
            d += b(c, "padding") + b(a, "margin");
            return d.replace(/^[ \n\r\t;]*|[ \n\r\t]*$/, "").replace(/;([ \n\r\t]+)|\1;/g, ";").replace(/(&((l|g)t|quot|#39))?;{2,}/g, function (a, b) {
                return b ? b + ";;" : ";"
            })
        }, clone: function (d, b) {
            var c;
            b = b || {};
            for (var a in d)d.hasOwnProperty(a) &&
            (c = d[a], "object" == typeof c ? (b[a] = p.isArray(c) ? [] : {}, p.clone(d[a], b[a])) : b[a] = c);
            return b
        }, transUnitToPx: function (d) {
            if (!/(pt|cm)/.test(d))return d;
            var b;
            d.replace(/([\d.]+)(\w+)/, function (c, a, e) {
                d = a;
                b = e
            });
            switch (b) {
                case "cm":
                    d = 25 * parseFloat(d);
                    break;
                case "pt":
                    d = Math.round(96 * parseFloat(d) / 72)
            }
            return d + (d ? "px" : "")
        }, domReady: function () {
            function d(c) {
                for (c.isReady = !0; c = b.pop(); c());
            }

            var b = [];
            return function (c, a) {
                a = a || window;
                var e = a.document;
                c && b.push(c);
                "complete" === e.readyState ? d(e) : (e.isReady && d(e),
                    r.ie && 11 != r.version ? (function () {
                        if (!e.isReady) {
                            try {
                                e.documentElement.doScroll("left")
                            } catch (a) {
                                setTimeout(arguments.callee, 0);
                                return
                            }
                            d(e)
                        }
                    }(), a.attachEvent("onload", function () {
                        d(e)
                    })) : (e.addEventListener("DOMContentLoaded", function () {
                        e.removeEventListener("DOMContentLoaded", arguments.callee, !1);
                        d(e)
                    }, !1), a.addEventListener("load", function () {
                        d(e)
                    }, !1)))
            }
        }(), cssRule: r.ie && 11 != r.version ? function (d, b, c) {
            var a, e;
            if (void 0 === b || b && b.nodeType && 9 == b.nodeType) {
                if (c = b && b.nodeType && 9 == b.nodeType ? b : c || document,
                        a = c.indexList || (c.indexList = {}), e = a[d], void 0 !== e)return c.styleSheets[e].cssText
            } else {
                c = c || document;
                a = c.indexList || (c.indexList = {});
                e = a[d];
                if ("" === b)return void 0 !== e ? (c.styleSheets[e].cssText = "", delete a[d], !0) : !1;
                void 0 !== e ? sheetStyle = c.styleSheets[e] : (sheetStyle = c.createStyleSheet("", e = c.styleSheets.length), a[d] = e);
                sheetStyle.cssText = b
            }
        } : function (d, b, c) {
            var a;
            if (void 0 === b || b && b.nodeType && 9 == b.nodeType)return c = b && b.nodeType && 9 == b.nodeType ? b : c || document, (a = c.getElementById(d)) ? a.innerHTML : void 0;
            c = c || document;
            a = c.getElementById(d);
            if ("" === b)return a ? (a.parentNode.removeChild(a), !0) : !1;
            a ? a.innerHTML = b : (a = c.createElement("style"), a.id = d, a.innerHTML = b, c.getElementsByTagName("head")[0].appendChild(a))
        }, sort: function (d, b) {
            b = b || function (a, e) {
                    return a.localeCompare(e)
                };
            for (var c = 0, a = d.length; c < a; c++)for (var e = c, h = d.length; e < h; e++)if (0 < b(d[c], d[e])) {
                var g = d[c];
                d[c] = d[e];
                d[e] = g
            }
            return d
        }, serializeParam: function (d) {
            var b = [], c;
            for (c in d)if ("method" != c && "timeout" != c && "async" != c)if ("function" != (typeof d[c]).toLowerCase() &&
                "object" != (typeof d[c]).toLowerCase())b.push(encodeURIComponent(c) + "=" + encodeURIComponent(d[c])); else if (p.isArray(d[c]))for (var a = 0; a < d[c].length; a++)b.push(encodeURIComponent(c) + "[]=" + encodeURIComponent(d[c][a]));
            return b.join("&")
        }, formatUrl: function (d) {
            d = d.replace(/&&/g, "&");
            d = d.replace(/\?&/g, "?");
            d = d.replace(/&$/g, "");
            d = d.replace(/&#/g, "#");
            return d = d.replace(/&+/g, "&")
        }, isCrossDomainUrl: function (d) {
            var b = document.createElement("a");
            b.href = d;
            r.ie && (b.href = b.href);
            return !(b.protocol == location.protocol &&
            b.hostname == location.hostname && (b.port == location.port || "80" == b.port && "" == location.port || "" == b.port && "80" == location.port))
        }, clearEmptyAttrs: function (d) {
            for (var b in d)"" === d[b] && delete d[b];
            return d
        }, str2json: function (d) {
            return p.isString(d) ? window.JSON ? JSON.parse(d) : (new Function("return " + p.trim(d || "")))() : null
        }, json2str: function () {
            if (window.JSON)return JSON.stringify;
            var d = function (a) {
                return 10 > a ? "0" + a : a
            }, b = function (a) {
                /["\\\x00-\x1f]/.test(a) && (a = a.replace(/["\\\x00-\x1f]/g, function (a) {
                    var b = c[a];
                    if (b)return b;
                    b = a.charCodeAt();
                    return "\\u00" + Math.floor(b / 16).toString(16) + (b % 16).toString(16)
                }));
                return '"' + a + '"'
            }, c = {"\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\"};
            return function (a) {
                switch (typeof a) {
                    case "undefined":
                        return "undefined";
                    case "number":
                        return isFinite(a) ? String(a) : "null";
                    case "string":
                        return b(a);
                    case "boolean":
                        return String(a);
                    default:
                        if (null === a)return "null";
                        if (p.isArray(a)) {
                            var e = ["["], c = a.length, g, l, k;
                            for (l = 0; l < c; l++)switch (k = a[l], typeof k) {
                                case "undefined":
                                case "function":
                                case "unknown":
                                    break;
                                default:
                                    g && e.push(","), e.push(p.json2str(k)), g = 1
                            }
                            e.push("]");
                            return e.join("")
                        }
                        if (p.isDate(a))return '"' + a.getFullYear() + "-" + d(a.getMonth() + 1) + "-" + d(a.getDate()) + "T" + d(a.getHours()) + ":" + d(a.getMinutes()) + ":" + d(a.getSeconds()) + '"';
                        g = ["{"];
                        l = p.json2str;
                        for (c in a)if (Object.prototype.hasOwnProperty.call(a, c))switch (k = a[c], typeof k) {
                            case "undefined":
                            case "unknown":
                            case "function":
                                break;
                            default:
                                e && g.push(","), e = 1, g.push(l(c) + ":" + l(k))
                        }
                        g.push("}");
                        return g.join("")
                }
            }
        }()
    };
    p.each("String Function Array Number RegExp Object Date".split(" "),
        function (d) {
            UE.utils["is" + d] = function (b) {
                return Object.prototype.toString.apply(b) == "[object " + d + "]"
            }
        });
    var ba = UE.EventBase = function () {
    };
    ba.prototype = {
        addListener: function (d, b) {
            d = p.trim(d).split(/\s+/);
            for (var c = 0, a; a = d[c++];)X(this, a, !0).push(b)
        }, on: function (d, b) {
            return this.addListener(d, b)
        }, off: function (d, b) {
            return this.removeListener(d, b)
        }, trigger: function () {
            return this.fireEvent.apply(this, arguments)
        }, removeListener: function (d, b) {
            d = p.trim(d).split(/\s+/);
            for (var c = 0, a; a = d[c++];)p.removeItem(X(this,
                    a) || [], b)
        }, fireEvent: function () {
            for (var d = arguments[0], d = p.trim(d).split(" "), b = 0, c; c = d[b++];) {
                var a = X(this, c), e, h, g;
                if (a)for (g = a.length; g--;)if (a[g]) {
                    h = a[g].apply(this, arguments);
                    if (!0 === h)return h;
                    void 0 !== h && (e = h)
                }
                if (h = this["on" + c.toLowerCase()])e = h.apply(this, arguments)
            }
            return e
        }
    };
    var w = M.dtd = function () {
            function d(a) {
                for (var e in a)a[e.toUpperCase()] = a[e];
                return a
            }

            var b = p.extend2, c = d({isindex: 1, fieldset: 1}), a = d({
                    input: 1,
                    button: 1,
                    select: 1,
                    textarea: 1,
                    label: 1
                }), e = b(d({a: 1}), a), h = b({iframe: 1}, e),
                g = d({
                    hr: 1,
                    ul: 1,
                    menu: 1,
                    div: 1,
                    blockquote: 1,
                    noscript: 1,
                    table: 1,
                    center: 1,
                    address: 1,
                    dir: 1,
                    pre: 1,
                    h5: 1,
                    dl: 1,
                    h4: 1,
                    noframes: 1,
                    h6: 1,
                    ol: 1,
                    h1: 1,
                    h3: 1,
                    h2: 1
                }), l = d({ins: 1, del: 1, script: 1, style: 1}), k = b(d({
                    b: 1,
                    acronym: 1,
                    bdo: 1,
                    "var": 1,
                    "#": 1,
                    abbr: 1,
                    code: 1,
                    br: 1,
                    i: 1,
                    cite: 1,
                    kbd: 1,
                    u: 1,
                    strike: 1,
                    s: 1,
                    tt: 1,
                    strong: 1,
                    q: 1,
                    samp: 1,
                    em: 1,
                    dfn: 1,
                    span: 1
                }), l), f = b(d({
                    sub: 1,
                    img: 1,
                    embed: 1,
                    object: 1,
                    sup: 1,
                    basefont: 1,
                    map: 1,
                    applet: 1,
                    font: 1,
                    big: 1,
                    small: 1
                }), k), n = b(d({p: 1}), f), a = b(d({iframe: 1}), f, a), f = d({
                    img: 1,
                    embed: 1,
                    noscript: 1,
                    br: 1,
                    kbd: 1,
                    center: 1,
                    button: 1,
                    basefont: 1,
                    h5: 1,
                    h4: 1,
                    samp: 1,
                    h6: 1,
                    ol: 1,
                    h1: 1,
                    h3: 1,
                    h2: 1,
                    form: 1,
                    font: 1,
                    "#": 1,
                    select: 1,
                    menu: 1,
                    ins: 1,
                    abbr: 1,
                    label: 1,
                    code: 1,
                    table: 1,
                    script: 1,
                    cite: 1,
                    input: 1,
                    iframe: 1,
                    strong: 1,
                    textarea: 1,
                    noframes: 1,
                    big: 1,
                    small: 1,
                    span: 1,
                    hr: 1,
                    sub: 1,
                    bdo: 1,
                    "var": 1,
                    div: 1,
                    object: 1,
                    sup: 1,
                    strike: 1,
                    dir: 1,
                    map: 1,
                    dl: 1,
                    applet: 1,
                    del: 1,
                    isindex: 1,
                    fieldset: 1,
                    ul: 1,
                    b: 1,
                    acronym: 1,
                    a: 1,
                    blockquote: 1,
                    i: 1,
                    u: 1,
                    s: 1,
                    tt: 1,
                    address: 1,
                    q: 1,
                    pre: 1,
                    p: 1,
                    em: 1,
                    dfn: 1
                }), q = b(d({a: 0}), a), u = d({tr: 1}), x = d({"#": 1}), z = b(d({param: 1}), f), v = b(d({form: 1}), c, h, g, n),
                D = d({li: 1, ol: 1, ul: 1}), F = d({style: 1, script: 1}), H = d({
                    base: 1,
                    link: 1,
                    meta: 1,
                    title: 1
                }), F = b(H, F), B = d({head: 1, body: 1}), O = d({html: 1}), r = d({
                    address: 1,
                    blockquote: 1,
                    center: 1,
                    dir: 1,
                    div: 1,
                    dl: 1,
                    fieldset: 1,
                    form: 1,
                    h1: 1,
                    h2: 1,
                    h3: 1,
                    h4: 1,
                    h5: 1,
                    h6: 1,
                    hr: 1,
                    isindex: 1,
                    menu: 1,
                    noframes: 1,
                    ol: 1,
                    p: 1,
                    pre: 1,
                    table: 1,
                    ul: 1
                }), t = d({
                    area: 1,
                    base: 1,
                    basefont: 1,
                    br: 1,
                    col: 1,
                    command: 1,
                    dialog: 1,
                    embed: 1,
                    hr: 1,
                    img: 1,
                    input: 1,
                    isindex: 1,
                    keygen: 1,
                    link: 1,
                    meta: 1,
                    param: 1,
                    source: 1,
                    track: 1,
                    wbr: 1
                });
            return d({
                $nonBodyContent: b(O, B, H),
                $block: r,
                $inline: q,
                $inlineWithA: b(d({a: 1}),
                    q),
                $body: b(d({script: 1, style: 1}), r),
                $cdata: d({script: 1, style: 1}),
                $empty: t,
                $nonChild: d({iframe: 1, textarea: 1}),
                $listItem: d({dd: 1, dt: 1, li: 1}),
                $list: d({ul: 1, ol: 1, dl: 1}),
                $isNotEmpty: d({
                    table: 1,
                    ul: 1,
                    ol: 1,
                    dl: 1,
                    iframe: 1,
                    area: 1,
                    base: 1,
                    col: 1,
                    hr: 1,
                    img: 1,
                    embed: 1,
                    input: 1,
                    link: 1,
                    meta: 1,
                    param: 1,
                    h1: 1,
                    h2: 1,
                    h3: 1,
                    h4: 1,
                    h5: 1,
                    h6: 1
                }),
                $removeEmpty: d({
                    a: 1,
                    abbr: 1,
                    acronym: 1,
                    address: 1,
                    b: 1,
                    bdo: 1,
                    big: 1,
                    cite: 1,
                    code: 1,
                    del: 1,
                    dfn: 1,
                    em: 1,
                    font: 1,
                    i: 1,
                    ins: 1,
                    label: 1,
                    kbd: 1,
                    q: 1,
                    s: 1,
                    samp: 1,
                    small: 1,
                    span: 1,
                    strike: 1,
                    strong: 1,
                    sub: 1,
                    sup: 1,
                    tt: 1,
                    u: 1,
                    "var": 1
                }),
                $removeEmptyBlock: d({p: 1, div: 1}),
                $tableContent: d({
                    caption: 1,
                    col: 1,
                    colgroup: 1,
                    tbody: 1,
                    td: 1,
                    tfoot: 1,
                    th: 1,
                    thead: 1,
                    tr: 1,
                    table: 1
                }),
                $notTransContent: d({pre: 1, script: 1, style: 1, textarea: 1}),
                html: B,
                head: F,
                style: x,
                script: x,
                body: v,
                base: {},
                link: {},
                meta: {},
                title: x,
                col: {},
                tr: d({td: 1, th: 1}),
                img: {},
                embed: {},
                colgroup: d({thead: 1, col: 1, tbody: 1, tr: 1, tfoot: 1}),
                noscript: v,
                td: v,
                br: {},
                th: v,
                center: v,
                kbd: q,
                button: b(n, g),
                basefont: {},
                h5: q,
                h4: q,
                samp: q,
                h6: q,
                ol: D,
                h1: q,
                h3: q,
                option: x,
                h2: q,
                form: b(c, h, g, n),
                select: d({
                    optgroup: 1,
                    option: 1
                }),
                font: q,
                ins: q,
                menu: D,
                abbr: q,
                label: q,
                table: d({thead: 1, col: 1, tbody: 1, tr: 1, colgroup: 1, caption: 1, tfoot: 1}),
                code: q,
                tfoot: u,
                cite: q,
                li: v,
                input: {},
                iframe: v,
                strong: q,
                textarea: x,
                noframes: v,
                big: q,
                small: q,
                span: d({"#": 1, br: 1, b: 1, strong: 1, u: 1, i: 1, em: 1, sub: 1, sup: 1, strike: 1, span: 1}),
                hr: q,
                dt: q,
                sub: q,
                optgroup: d({option: 1}),
                param: {},
                bdo: q,
                "var": q,
                div: v,
                object: z,
                sup: q,
                dd: v,
                strike: q,
                area: {},
                dir: D,
                map: b(d({area: 1, form: 1, p: 1}), c, l, g),
                applet: z,
                dl: d({dt: 1, dd: 1}),
                del: q,
                isindex: {},
                fieldset: b(d({legend: 1}), f),
                thead: u,
                ul: D,
                acronym: q,
                b: q,
                a: b(d({a: 1}), a),
                blockquote: b(d({td: 1, tr: 1, tbody: 1, li: 1}), v),
                caption: q,
                i: q,
                u: q,
                tbody: u,
                s: q,
                address: b(h, n),
                tt: q,
                legend: q,
                q: q,
                pre: b(k, e),
                p: b(d({a: 1}), q),
                em: q,
                dfn: q
            })
        }(), ka = J && 9 > r.version ? {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder"
        } : {
            tabindex: "tabIndex",
            readonly: "readOnly"
        }, oa = p.listToMap("-webkit-box -moz-box block list-item table table-row-group table-header-group table-footer-group table-row table-column-group table-column table-cell table-caption".split(" ")),
        f = M.domUtils = {
            NODE_ELEMENT: 1,
            NODE_DOCUMENT: 9,
            NODE_TEXT: 3,
            NODE_COMMENT: 8,
            NODE_DOCUMENT_FRAGMENT: 11,
            POSITION_IDENTICAL: 0,
            POSITION_DISCONNECTED: 1,
            POSITION_FOLLOWING: 2,
            POSITION_PRECEDING: 4,
            POSITION_IS_CONTAINED: 8,
            POSITION_CONTAINS: 16,
            fillChar: J && "6" == r.version ? "\ufeff" : "\u200b",
            keys: {8: 1, 46: 1, 16: 1, 17: 1, 18: 1, 37: 1, 38: 1, 39: 1, 40: 1, 13: 1},
            getPosition: function (d, b) {
                if (d === b)return 0;
                var c, a = [d], e = [b];
                for (c = d; c = c.parentNode;) {
                    if (c === b)return 10;
                    a.push(c)
                }
                for (c = b; c = c.parentNode;) {
                    if (c === d)return 20;
                    e.push(c)
                }
                a.reverse();
                e.reverse();
                if (a[0] !== e[0])return 1;
                for (c = -1; c++, a[c] === e[c];);
                d = a[c];
                for (b = e[c]; d = d.nextSibling;)if (d === b)return 4;
                return 2
            },
            getNodeIndex: function (d, b) {
                for (var c = d, a = 0; c = c.previousSibling;)b && 3 == c.nodeType ? c.nodeType != c.nextSibling.nodeType && a++ : a++;
                return a
            },
            inDoc: function (d, b) {
                return 10 == f.getPosition(d, b)
            },
            findParent: function (d, b, c) {
                if (d && !f.isBody(d))for (d = c ? d : d.parentNode; d;) {
                    if (!b || b(d) || f.isBody(d))return b && !b(d) && f.isBody(d) ? null : d;
                    d = d.parentNode
                }
                return null
            },
            findParentByTagName: function (d,
                                           b, c, a) {
                b = p.listToMap(p.isArray(b) ? b : [b]);
                return f.findParent(d, function (e) {
                    return b[e.tagName] && !(a && a(e))
                }, c)
            },
            findParents: function (d, b, c, a) {
                for (b = b && (c && c(d) || !c) ? [d] : []; d = f.findParent(d, c);)b.push(d);
                return a ? b : b.reverse()
            },
            insertAfter: function (d, b) {
                return d.nextSibling ? d.parentNode.insertBefore(b, d.nextSibling) : d.parentNode.appendChild(b)
            },
            remove: function (d, b) {
                var c = d.parentNode, a;
                if (c) {
                    if (b && d.hasChildNodes())for (; a = d.firstChild;)c.insertBefore(a, d);
                    c.removeChild(d)
                }
                return d
            },
            getNextDomNode: function (d,
                                      b, c, a) {
                return Y(d, "firstChild", "nextSibling", b, c, a)
            },
            getPreDomNode: function (d, b, c, a) {
                return Y(d, "lastChild", "previousSibling", b, c, a)
            },
            isBookmarkNode: function (d) {
                return 1 == d.nodeType && d.id && /^_baidu_bookmark_/i.test(d.id)
            },
            getWindow: function (d) {
                d = d.ownerDocument || d;
                return d.defaultView || d.parentWindow
            },
            getCommonAncestor: function (d, b) {
                if (d === b)return d;
                for (var c = [d], a = [b], e = d, h = -1; e = e.parentNode;) {
                    if (e === b)return e;
                    c.push(e)
                }
                for (e = b; e = e.parentNode;) {
                    if (e === d)return e;
                    a.push(e)
                }
                c.reverse();
                for (a.reverse(); h++,
                c[h] === a[h];);
                return 0 == h ? null : c[h - 1]
            },
            clearEmptySibling: function (d, b, c) {
                function a(a, b) {
                    for (var g; a && !f.isBookmarkNode(a) && (f.isEmptyInlineElement(a) || !(new RegExp("[^\t\n\r" + f.fillChar + "]")).test(a.nodeValue));)g = a[b], f.remove(a), a = g
                }

                !b && a(d.nextSibling, "nextSibling");
                !c && a(d.previousSibling, "previousSibling")
            },
            split: function (d, b) {
                var c = d.ownerDocument;
                if (r.ie && b == d.nodeValue.length) {
                    var a = c.createTextNode("");
                    return f.insertAfter(d, a)
                }
                a = d.splitText(b);
                r.ie8 && (c = c.createTextNode(""), f.insertAfter(a,
                    c), f.remove(c));
                return a
            },
            isWhitespace: function (d) {
                return !(new RegExp("[^ \t\n\r" + f.fillChar + "]")).test(d.nodeValue)
            },
            getXY: function (d) {
                for (var b = 0, c = 0; d.offsetParent;)c += d.offsetTop, b += d.offsetLeft, d = d.offsetParent;
                return {x: b, y: c}
            },
            on: function (d, b, c) {
                var a = p.isArray(b) ? b : p.trim(b).split(/\s+/), e = a.length;
                if (e)for (; e--;)if (b = a[e], d.addEventListener)d.addEventListener(b, c, !1); else {
                    c._d || (c._d = {els: []});
                    var h = b + c.toString(), g = p.indexOf(c._d.els, d);
                    c._d[h] && -1 != g || (-1 == g && c._d.els.push(d), c._d[h] || (c._d[h] =
                        function (a) {
                            return c.call(a.srcElement, a || window.event)
                        }), d.attachEvent("on" + b, c._d[h]))
                }
                d = null
            },
            un: function (d, b, c) {
                var a = p.isArray(b) ? b : p.trim(b).split(/\s+/), e = a.length;
                if (e)for (; e--;)if (b = a[e], d.removeEventListener)d.removeEventListener(b, c, !1); else {
                    var h = b + c.toString();
                    try {
                        d.detachEvent("on" + b, c._d ? c._d[h] : c)
                    } catch (g) {
                    }
                    c._d && c._d[h] && (b = p.indexOf(c._d.els, d), -1 != b && c._d.els.splice(b, 1), 0 == c._d.els.length && delete c._d[h])
                }
            },
            isSameElement: function (d, b) {
                if (d.tagName != b.tagName)return !1;
                var c = d.attributes,
                    a = b.attributes;
                if (!J && c.length != a.length)return !1;
                for (var e, h, g = 0, l = 0, k = 0; e = c[k++];) {
                    if ("style" == e.nodeName)if (e.specified && g++, f.isSameStyle(d, b))continue; else return !1;
                    if (J)if (e.specified)g++, h = a.getNamedItem(e.nodeName); else continue; else h = b.attributes[e.nodeName];
                    if (!h.specified || e.nodeValue != h.nodeValue)return !1
                }
                if (J) {
                    for (k = 0; h = a[k++];)h.specified && l++;
                    if (g != l)return !1
                }
                return !0
            },
            isSameStyle: function (d, b) {
                var c = d.style.cssText.replace(/( ?; ?)/g, ";").replace(/( ?: ?)/g, ":"), a = b.style.cssText.replace(/( ?; ?)/g,
                    ";").replace(/( ?: ?)/g, ":");
                if (r.opera) {
                    c = d.style;
                    a = b.style;
                    if (c.length != a.length)return !1;
                    for (var e in c)if (!/^(\d+|csstext)$/i.test(e) && c[e] != a[e])return !1;
                    return !0
                }
                if (!c || !a)return c == a;
                c = c.split(";");
                a = a.split(";");
                if (c.length != a.length)return !1;
                e = 0;
                for (var h; h = c[e++];)if (-1 == p.indexOf(a, h))return !1;
                return !0
            },
            isBlockElm: function (d) {
                return 1 == d.nodeType && (w.$block[d.tagName] || oa[f.getComputedStyle(d, "display")]) && !w.$nonChild[d.tagName]
            },
            isBody: function (d) {
                return d && 1 == d.nodeType && "body" == d.tagName.toLowerCase()
            },
            breakParent: function (d, b) {
                var c, a = d, e = d, h, g;
                do {
                    a = a.parentNode;
                    h ? (c = a.cloneNode(!1), c.appendChild(h), h = c, c = a.cloneNode(!1), c.appendChild(g), g = c) : (h = a.cloneNode(!1), g = h.cloneNode(!1));
                    for (; c = e.previousSibling;)h.insertBefore(c, h.firstChild);
                    for (; c = e.nextSibling;)g.appendChild(c);
                    e = a
                } while (b !== a);
                c = b.parentNode;
                c.insertBefore(h, b);
                c.insertBefore(g, b);
                c.insertBefore(d, g);
                f.remove(b);
                return d
            },
            isEmptyInlineElement: function (d) {
                if (1 != d.nodeType || !w.$removeEmpty[d.tagName])return 0;
                for (d = d.firstChild; d;) {
                    if (f.isBookmarkNode(d) ||
                        1 == d.nodeType && !f.isEmptyInlineElement(d) || 3 == d.nodeType && !f.isWhitespace(d))return 0;
                    d = d.nextSibling
                }
                return 1
            },
            trimWhiteTextNode: function (d) {
                function b(b) {
                    for (var a; (a = d[b]) && 3 == a.nodeType && f.isWhitespace(a);)d.removeChild(a)
                }

                b("firstChild");
                b("lastChild")
            },
            mergeChild: function (d, b, c) {
                b = f.getElementsByTagName(d, d.tagName.toLowerCase());
                for (var a = 0, e; e = b[a++];)if (e.parentNode && !f.isBookmarkNode(e))if ("span" == e.tagName.toLowerCase()) {
                    if (d === e.parentNode && (f.trimWhiteTextNode(d), 1 == d.childNodes.length)) {
                        d.style.cssText =
                            e.style.cssText + ";" + d.style.cssText;
                        f.remove(e, !0);
                        continue
                    }
                    e.style.cssText = d.style.cssText + ";" + e.style.cssText;
                    if (c) {
                        var h = c.style;
                        if (h)for (var h = h.split(";"), g = 0, l; l = h[g++];)e.style[p.cssStyleToDomStyle(l.split(":")[0])] = l.split(":")[1]
                    }
                    f.isSameStyle(e, d) && f.remove(e, !0)
                } else f.isSameElement(d, e) && f.remove(e, !0)
            },
            getElementsByTagName: function (d, b, c) {
                if (c && p.isString(c)) {
                    var a = c;
                    c = function (e) {
                        return f.hasClass(e, a)
                    }
                }
                b = p.trim(b).replace(/[ ]{2,}/g, " ").split(" ");
                for (var e = [], h = 0, g; g = b[h++];) {
                    g = d.getElementsByTagName(g);
                    for (var l = 0, k; k = g[l++];)c && !c(k) || e.push(k)
                }
                return e
            },
            mergeToParent: function (d) {
                for (var b = d.parentNode; b && w.$removeEmpty[b.tagName];) {
                    if (b.tagName == d.tagName || "A" == b.tagName) {
                        f.trimWhiteTextNode(b);
                        if ("SPAN" == b.tagName && !f.isSameStyle(b, d) || "A" == b.tagName && "SPAN" == d.tagName)if (1 < b.childNodes.length || b !== d.parentNode) {
                            d.style.cssText = b.style.cssText + ";" + d.style.cssText;
                            b = b.parentNode;
                            continue
                        } else b.style.cssText += ";" + d.style.cssText, "A" == b.tagName && (b.style.textDecoration = "underline");
                        if ("A" != b.tagName) {
                            b ===
                            d.parentNode && f.remove(d, !0);
                            break
                        }
                    }
                    b = b.parentNode
                }
            },
            mergeSibling: function (d, b, c) {
                function a(a, b, g) {
                    var c;
                    if ((c = g[a]) && !f.isBookmarkNode(c) && 1 == c.nodeType && f.isSameElement(g, c)) {
                        for (; c.firstChild;)"firstChild" == b ? g.insertBefore(c.lastChild, g.firstChild) : g.appendChild(c.firstChild);
                        f.remove(c)
                    }
                }

                !b && a("previousSibling", "firstChild", d);
                !c && a("nextSibling", "lastChild", d)
            },
            unSelectable: J && r.ie9below || r.opera ? function (d) {
                d.onselectstart = function () {
                    return !1
                };
                d.onclick = d.onkeyup = d.onkeydown = function () {
                    return !1
                };
                d.unselectable = "on";
                d.setAttribute("unselectable", "on");
                for (var b = 0, c; c = d.all[b++];)switch (c.tagName.toLowerCase()) {
                    case "iframe":
                    case "textarea":
                    case "input":
                    case "select":
                        break;
                    default:
                        c.unselectable = "on", d.setAttribute("unselectable", "on")
                }
            } : function (d) {
                d.style.MozUserSelect = d.style.webkitUserSelect = d.style.msUserSelect = d.style.KhtmlUserSelect = "none"
            },
            removeAttributes: function (d, b) {
                b = p.isArray(b) ? b : p.trim(b).replace(/[ ]{2,}/g, " ").split(" ");
                for (var c = 0, a; a = b[c++];) {
                    a = ka[a] || a;
                    switch (a) {
                        case "className":
                            d[a] =
                                "";
                            break;
                        case "style":
                            d.style.cssText = "";
                            var e = d.getAttributeNode("style");
                            !r.ie && e && d.removeAttributeNode(e)
                    }
                    d.removeAttribute(a)
                }
            },
            createElement: function (d, b, c) {
                return f.setAttributes(d.createElement(b), c)
            },
            setAttributes: function (d, b) {
                for (var c in b)if (b.hasOwnProperty(c)) {
                    var a = b[c];
                    switch (c) {
                        case "class":
                            d.className = a;
                            break;
                        case "style":
                            d.style.cssText = d.style.cssText + ";" + a;
                            break;
                        case "innerHTML":
                            d[c] = a;
                            break;
                        case "value":
                            d.value = a;
                            break;
                        default:
                            d.setAttribute(ka[c] || c, a)
                    }
                }
                return d
            },
            getComputedStyle: function (d,
                                        b) {
                if (-1 < "width height top left".indexOf(b))return d["offset" + b.replace(/^\w/, function (a) {
                        return a.toUpperCase()
                    })] + "px";
                3 == d.nodeType && (d = d.parentNode);
                if (r.ie && 9 > r.version && "font-size" == b && !d.style.fontSize && !w.$empty[d.tagName] && !w.$nonChild[d.tagName]) {
                    var c = d.ownerDocument.createElement("span");
                    c.style.cssText = "padding:0;border:0;font-family:simsun;";
                    c.innerHTML = ".";
                    d.appendChild(c);
                    var a = c.offsetHeight;
                    d.removeChild(c);
                    c = null;
                    return a + "px"
                }
                try {
                    c = f.getStyle(d, b) || (window.getComputedStyle ? f.getWindow(d).getComputedStyle(d,
                            "").getPropertyValue(b) : (d.currentStyle || d.style)[p.cssStyleToDomStyle(b)])
                } catch (e) {
                    return ""
                }
                return p.transUnitToPx(p.fixColor(b, c))
            },
            removeClasses: function (d, b) {
                b = p.isArray(b) ? b : p.trim(b).replace(/[ ]{2,}/g, " ").split(" ");
                for (var c = 0, a, e = d.className; a = b[c++];)e = e.replace(new RegExp("\\b" + a + "\\b"), "");
                (e = p.trim(e).replace(/[ ]{2,}/g, " ")) ? d.className = e : f.removeAttributes(d, ["class"])
            },
            addClass: function (d, b) {
                if (d) {
                    b = p.trim(b).replace(/[ ]{2,}/g, " ").split(" ");
                    for (var c = 0, a, e = d.className; a = b[c++];)(new RegExp("\\b" +
                        a + "\\b")).test(e) || (e += " " + a);
                    d.className = p.trim(e)
                }
            },
            hasClass: function (d, b) {
                if (p.isRegExp(b))return b.test(d.className);
                b = p.trim(b).replace(/[ ]{2,}/g, " ").split(" ");
                for (var c = 0, a, e = d.className; a = b[c++];)if (!(new RegExp("\\b" + a + "\\b", "i")).test(e))return !1;
                return c - 1 == b.length
            },
            preventDefault: function (d) {
                d.preventDefault ? d.preventDefault() : d.returnValue = !1
            },
            removeStyle: function (d, b) {
                r.ie ? ("color" == b && (b = "(^|;)" + b), d.style.cssText = d.style.cssText.replace(new RegExp(b + "[^:]*:[^;]+;?", "ig"), "")) : d.style.removeProperty ?
                    d.style.removeProperty(b) : d.style.removeAttribute(p.cssStyleToDomStyle(b));
                d.style.cssText || f.removeAttributes(d, ["style"])
            },
            getStyle: function (d, b) {
                var c = d.style[p.cssStyleToDomStyle(b)];
                return p.fixColor(b, c)
            },
            setStyle: function (d, b, c) {
                d.style[p.cssStyleToDomStyle(b)] = c;
                p.trim(d.style.cssText) || this.removeAttributes(d, "style")
            },
            setStyles: function (d, b) {
                for (var c in b)b.hasOwnProperty(c) && f.setStyle(d, c, b[c])
            },
            removeDirtyAttr: function (d) {
                for (var b = 0, c, a = d.getElementsByTagName("*"); c = a[b++];)c.removeAttribute("_moz_dirty");
                d.removeAttribute("_moz_dirty")
            },
            getChildCount: function (d, b) {
                var c = 0, a = d.firstChild;
                for (b = b || function () {
                        return 1
                    }; a;)b(a) && c++, a = a.nextSibling;
                return c
            },
            isEmptyNode: function (d) {
                return !d.firstChild || 0 == f.getChildCount(d, function (b) {
                        return !f.isBr(b) && !f.isBookmarkNode(b) && !f.isWhitespace(b)
                    })
            },
            clearSelectedArr: function (d) {
                for (var b; b = d.pop();)f.removeAttributes(b, ["class"])
            },
            scrollToView: function (d, b, c) {
                var a = function () {
                    var a = b.document, c = "CSS1Compat" == a.compatMode;
                    return {
                        width: (c ? a.documentElement.clientWidth :
                            a.body.clientWidth) || 0,
                        height: (c ? a.documentElement.clientHeight : a.body.clientHeight) || 0
                    }
                }().height;
                c = -1 * a + c + (d.offsetHeight || 0);
                d = f.getXY(d);
                c += d.y;
                d = function (a) {
                    if ("pageXOffset"in a)return {x: a.pageXOffset || 0, y: a.pageYOffset || 0};
                    a = a.document;
                    return {
                        x: a.documentElement.scrollLeft || a.body.scrollLeft || 0,
                        y: a.documentElement.scrollTop || a.body.scrollTop || 0
                    }
                }(b).y;
                (c > d || c < d - a) && b.scrollTo(0, c + (0 > c ? -20 : 20))
            },
            isBr: function (d) {
                return 1 == d.nodeType && "BR" == d.tagName
            },
            isFillChar: function (d, b) {
                if (3 != d.nodeType)return !1;
                var c = d.nodeValue;
                return b ? (new RegExp("^" + f.fillChar)).test(c) : !c.replace(new RegExp(f.fillChar, "g"), "").length
            },
            isStartInblock: function (d) {
                d = d.cloneRange();
                var b = 0, c = d.startContainer, a;
                if (1 == c.nodeType && c.childNodes[d.startOffset])for (var c = c.childNodes[d.startOffset], e = c.previousSibling; e && f.isFillChar(e);)c = e, e = e.previousSibling;
                this.isFillChar(c, !0) && 1 == d.startOffset && (d.setStartBefore(c), c = d.startContainer);
                for (; c && f.isFillChar(c);)a = c, c = c.previousSibling;
                a && (d.setStartBefore(a), c = d.startContainer);
                for (1 == c.nodeType && f.isEmptyNode(c) && 1 == d.startOffset && d.setStart(c, 0).collapse(!0); !d.startOffset;) {
                    c = d.startContainer;
                    if (f.isBlockElm(c) || f.isBody(c)) {
                        b = 1;
                        break
                    }
                    var e = d.startContainer.previousSibling, h;
                    if (e) {
                        for (; e && f.isFillChar(e);)h = e, e = e.previousSibling;
                        h ? d.setStartBefore(h) : d.setStartBefore(d.startContainer)
                    } else d.setStartBefore(d.startContainer)
                }
                return b && !f.isBody(d.startContainer) ? 1 : 0
            },
            isEmptyBlock: function (d, b) {
                if (1 != d.nodeType)return 0;
                b = b || new RegExp("[ \u00a0\t\r\n" + f.fillChar + "]", "g");
                if (0 < d[r.ie ? "innerText" : "textContent"].replace(b, "").length)return 0;
                for (var c in w.$isNotEmpty)if (d.getElementsByTagName(c).length)return 0;
                return 1
            },
            setViewportOffset: function (d, b) {
                var c = parseInt(d.style.left) | 0, a = parseInt(d.style.top) | 0, e = d.getBoundingClientRect(), h = b.left - e.left, e = b.top - e.top;
                h && (d.style.left = c + h + "px");
                e && (d.style.top = a + e + "px")
            },
            fillNode: function (d, b) {
                var c = r.ie ? d.createTextNode(f.fillChar) : d.createElement("br");
                b.innerHTML = "";
                b.appendChild(c)
            },
            moveChild: function (d, b, c) {
                for (; d.firstChild;)c &&
                b.firstChild ? b.insertBefore(d.lastChild, b.firstChild) : b.appendChild(d.firstChild)
            },
            hasNoAttributes: function (d) {
                return r.ie ? /^<\w+\s*?>/.test(d.outerHTML) : 0 == d.attributes.length
            },
            isCustomeNode: function (d) {
                return 1 == d.nodeType && d.getAttribute("_ue_custom_node_")
            },
            isTagNode: function (d, b) {
                return 1 == d.nodeType && (new RegExp("\\b" + d.tagName + "\\b", "i")).test(b)
            },
            filterNodeList: function (d, b, c) {
                var a = [];
                if (!p.isFunction(b)) {
                    var e = b;
                    b = function (a) {
                        return -1 != p.indexOf(p.isArray(e) ? e : e.split(" "), a.tagName.toLowerCase())
                    }
                }
                p.each(d,
                    function (e) {
                        b(e) && a.push(e)
                    });
                return 0 == a.length ? null : 1 != a.length && c ? a : a[0]
            },
            isInNodeEndBoundary: function (d, b) {
                var c = d.startContainer;
                if (3 == c.nodeType && d.startOffset != c.nodeValue.length || 1 == c.nodeType && d.startOffset != c.childNodes.length)return 0;
                for (; c !== b;) {
                    if (c.nextSibling)return 0;
                    c = c.parentNode
                }
                return 1
            },
            isBoundaryNode: function (d, b) {
                for (var c; !f.isBody(d);)if (c = d, d = d.parentNode, c !== d[b])return !1;
                return !0
            },
            fillHtml: r.ie11below ? "&nbsp;" : "<br/>"
        }, Q = new RegExp(f.fillChar, "g");
    (function () {
        function d(a) {
            return !a.collapsed &&
                1 == a.startContainer.nodeType && a.startContainer === a.endContainer && 1 == a.endOffset - a.startOffset
        }

        function b(a, g, e, b) {
            1 == g.nodeType && (w.$empty[g.tagName] || w.$nonChild[g.tagName]) && (e = f.getNodeIndex(g) + (a ? 0 : 1), g = g.parentNode);
            a ? (b.startContainer = g, b.startOffset = e, b.endContainer || b.collapse(!0)) : (b.endContainer = g, b.endOffset = e, b.startContainer || b.collapse(!1));
            b.collapsed = b.startContainer && b.endContainer && b.startContainer === b.endContainer && b.startOffset == b.endOffset;
            return b
        }

        function c(a, g) {
            var b = a.startContainer,
                e = a.endContainer, c = a.startOffset, l = a.endOffset, k = a.document, h = k.createDocumentFragment(), d, p;
            1 == b.nodeType && (b = b.childNodes[c] || (d = b.appendChild(k.createTextNode(""))));
            1 == e.nodeType && (e = e.childNodes[l] || (p = e.appendChild(k.createTextNode(""))));
            if (b === e && 3 == b.nodeType)return h.appendChild(k.createTextNode(b.substringData(c, l - c))), g && (b.deleteData(c, l - c), a.collapse(!0)), h;
            for (var B, O, r = h, t = f.findParents(b, !0), w = f.findParents(e, !0), A = 0; t[A] == w[A];)A++;
            for (var I = A, E; E = t[I]; I++) {
                B = E.nextSibling;
                E == b ?
                d || (3 == a.startContainer.nodeType ? (r.appendChild(k.createTextNode(b.nodeValue.slice(c))), g && b.deleteData(c, b.nodeValue.length - c)) : r.appendChild(g ? b : b.cloneNode(!0))) : (O = E.cloneNode(!1), r.appendChild(O));
                for (; B && B !== e && B !== w[I];)E = B.nextSibling, r.appendChild(g ? B : B.cloneNode(!0)), B = E;
                r = O
            }
            r = h;
            t[A] || (r.appendChild(t[A - 1].cloneNode(!1)), r = r.firstChild);
            for (I = A; c = w[I]; I++) {
                B = c.previousSibling;
                c == e ? p || 3 != a.endContainer.nodeType || (r.appendChild(k.createTextNode(e.substringData(0, l))), g && e.deleteData(0, l)) :
                    (O = c.cloneNode(!1), r.appendChild(O));
                if (I != A || !t[A])for (; B && B !== b;)c = B.previousSibling, r.insertBefore(g ? B : B.cloneNode(!0), r.firstChild), B = c;
                r = O
            }
            g && a.setStartBefore(w[A] ? t[A] ? w[A] : t[A - 1] : w[A - 1]).collapse(!0);
            d && f.remove(d);
            p && f.remove(p);
            return h
        }

        function a(a, g) {
            try {
                if (l && f.inDoc(l, a))if (l.nodeValue.replace(Q, "").length)l.nodeValue = l.nodeValue.replace(Q, ""); else {
                    var b = l.parentNode;
                    for (f.remove(l); b && f.isEmptyInlineElement(b) && (r.safari ? !(f.getPosition(b, g) & f.POSITION_CONTAINS) : !b.contains(g));)l = b.parentNode,
                        f.remove(b), b = l
                }
            } catch (e) {
            }
        }

        function e(a, b) {
            var g;
            for (a = a[b]; a && f.isFillChar(a);)g = a[b], f.remove(a), a = g
        }

        var h = 0, g = f.fillChar, l, k = M.Range = function (a) {
            this.startContainer = this.startOffset = this.endContainer = this.endOffset = null;
            this.document = a;
            this.collapsed = !0
        };
        k.prototype = {
            cloneContents: function () {
                return this.collapsed ? null : c(this, 0)
            }, deleteContents: function () {
                var a;
                this.collapsed || c(this, 1);
                r.webkit && (a = this.startContainer, 3 != a.nodeType || a.nodeValue.length || (this.setStartBefore(a).collapse(!0), f.remove(a)));
                return this
            }, extractContents: function () {
                return this.collapsed ? null : c(this, 2)
            }, setStart: function (a, g) {
                return b(!0, a, g, this)
            }, setEnd: function (a, g) {
                return b(!1, a, g, this)
            }, setStartAfter: function (a) {
                return this.setStart(a.parentNode, f.getNodeIndex(a) + 1)
            }, setStartBefore: function (a) {
                return this.setStart(a.parentNode, f.getNodeIndex(a))
            }, setEndAfter: function (a) {
                return this.setEnd(a.parentNode, f.getNodeIndex(a) + 1)
            }, setEndBefore: function (a) {
                return this.setEnd(a.parentNode, f.getNodeIndex(a))
            }, setStartAtFirst: function (a) {
                return this.setStart(a,
                    0)
            }, setStartAtLast: function (a) {
                return this.setStart(a, 3 == a.nodeType ? a.nodeValue.length : a.childNodes.length)
            }, setEndAtFirst: function (a) {
                return this.setEnd(a, 0)
            }, setEndAtLast: function (a) {
                return this.setEnd(a, 3 == a.nodeType ? a.nodeValue.length : a.childNodes.length)
            }, selectNode: function (a) {
                return this.setStartBefore(a).setEndAfter(a)
            }, selectNodeContents: function (a) {
                return this.setStart(a, 0).setEndAtLast(a)
            }, cloneRange: function () {
                return (new k(this.document)).setStart(this.startContainer, this.startOffset).setEnd(this.endContainer,
                    this.endOffset)
            }, collapse: function (a) {
                a ? (this.endContainer = this.startContainer, this.endOffset = this.startOffset) : (this.startContainer = this.endContainer, this.startOffset = this.endOffset);
                this.collapsed = !0;
                return this
            }, shrinkBoundary: function (a) {
                function g(a) {
                    return 1 == a.nodeType && !f.isBookmarkNode(a) && !w.$empty[a.tagName] && !w.$nonChild[a.tagName]
                }

                for (var b, e = this.collapsed; 1 == this.startContainer.nodeType && (b = this.startContainer.childNodes[this.startOffset]) && g(b);)this.setStart(b, 0);
                if (e)return this.collapse(!0);
                if (!a)for (; 1 == this.endContainer.nodeType && 0 < this.endOffset && (b = this.endContainer.childNodes[this.endOffset - 1]) && g(b);)this.setEnd(b, b.childNodes.length);
                return this
            }, getCommonAncestor: function (a, b) {
                var g = this.startContainer, e = this.endContainer;
                return g === e ? a && d(this) && (g = g.childNodes[this.startOffset], 1 == g.nodeType) ? g : b && 3 == g.nodeType ? g.parentNode : g : f.getCommonAncestor(g, e)
            }, trimBoundary: function (a) {
                this.txtToElmBoundary();
                var g = this.startContainer, b = this.startOffset, e = this.collapsed, c = this.endContainer;
                if (3 == g.nodeType) {
                    if (0 == b)this.setStartBefore(g); else if (b >= g.nodeValue.length)this.setStartAfter(g); else {
                        var l = f.split(g, b);
                        g === c ? this.setEnd(l, this.endOffset - b) : g.parentNode === c && (this.endOffset += 1);
                        this.setStartBefore(l)
                    }
                    if (e)return this.collapse(!0)
                }
                a || (b = this.endOffset, c = this.endContainer, 3 == c.nodeType && (0 == b ? this.setEndBefore(c) : (b < c.nodeValue.length && f.split(c, b), this.setEndAfter(c))));
                return this
            }, txtToElmBoundary: function (a) {
                function g(a, b) {
                    var e = a[b + "Container"], c = a[b + "Offset"];
                    if (3 == e.nodeType)if (!c)a["set" +
                    b.replace(/(\w)/, function (a) {
                        return a.toUpperCase()
                    }) + "Before"](e); else if (c >= e.nodeValue.length)a["set" + b.replace(/(\w)/, function (a) {
                        return a.toUpperCase()
                    }) + "After"](e)
                }

                if (a || !this.collapsed)g(this, "start"), g(this, "end");
                return this
            }, insertNode: function (a) {
                var g = a, b = 1;
                11 == a.nodeType && (g = a.firstChild, b = a.childNodes.length);
                this.trimBoundary(!0);
                var e = this.startContainer, c = e.childNodes[this.startOffset];
                c ? e.insertBefore(a, c) : e.appendChild(a);
                g.parentNode === this.endContainer && (this.endOffset += b);
                return this.setStartBefore(g)
            },
            setCursor: function (a, g) {
                return this.collapse(!a).select(g)
            }, createBookmark: function (a, g) {
                var b, e = this.document.createElement("span");
                e.style.cssText = "display:none;line-height:0px;";
                e.appendChild(this.document.createTextNode("\u200d"));
                e.id = "_baidu_bookmark_start_" + (g ? "" : h++);
                this.collapsed || (b = e.cloneNode(!0), b.id = "_baidu_bookmark_end_" + (g ? "" : h++));
                this.insertNode(e);
                b && this.collapse().insertNode(b).setEndBefore(b);
                this.setStartAfter(e);
                return {start: a ? e.id : e, end: b ? a ? b.id : b : null, id: a}
            }, moveToBookmark: function (a) {
                var g =
                    a.id ? this.document.getElementById(a.start) : a.start;
                a = a.end && a.id ? this.document.getElementById(a.end) : a.end;
                this.setStartBefore(g);
                f.remove(g);
                a ? (this.setEndBefore(a), f.remove(a)) : this.collapse(!0);
                return this
            }, enlarge: function (a, g) {
                var b = f.isBody, e, c, l = this.document.createTextNode("");
                if (a) {
                    c = this.startContainer;
                    1 == c.nodeType ? c.childNodes[this.startOffset] ? e = c = c.childNodes[this.startOffset] : (c.appendChild(l), e = c = l) : e = c;
                    for (; ;) {
                        if (f.isBlockElm(c)) {
                            for (c = e; (e = c.previousSibling) && !f.isBlockElm(e);)c =
                                e;
                            this.setStartBefore(c);
                            break
                        }
                        e = c;
                        c = c.parentNode
                    }
                    c = this.endContainer;
                    1 == c.nodeType ? ((e = c.childNodes[this.endOffset]) ? c.insertBefore(l, e) : c.appendChild(l), e = c = l) : e = c;
                    for (; ;) {
                        if (f.isBlockElm(c)) {
                            for (c = e; (e = c.nextSibling) && !f.isBlockElm(e);)c = e;
                            this.setEndAfter(c);
                            break
                        }
                        e = c;
                        c = c.parentNode
                    }
                    l.parentNode === this.endContainer && this.endOffset--;
                    f.remove(l)
                }
                if (!this.collapsed) {
                    for (; !(0 != this.startOffset || g && g(this.startContainer) || b(this.startContainer));)this.setStartBefore(this.startContainer);
                    for (; !(this.endOffset !=
                    (1 == this.endContainer.nodeType ? this.endContainer.childNodes.length : this.endContainer.nodeValue.length) || g && g(this.endContainer) || b(this.endContainer));)this.setEndAfter(this.endContainer)
                }
                return this
            }, enlargeToBlockElm: function (a) {
                for (; !f.isBlockElm(this.startContainer);)this.setStartBefore(this.startContainer);
                if (!a)for (; !f.isBlockElm(this.endContainer);)this.setEndAfter(this.endContainer);
                return this
            }, adjustmentBoundary: function () {
                if (!this.collapsed) {
                    for (; !f.isBody(this.startContainer) && this.startOffset ==
                    this.startContainer[3 == this.startContainer.nodeType ? "nodeValue" : "childNodes"].length && this.startContainer[3 == this.startContainer.nodeType ? "nodeValue" : "childNodes"].length;)this.setStartAfter(this.startContainer);
                    for (; !f.isBody(this.endContainer) && !this.endOffset && this.endContainer[3 == this.endContainer.nodeType ? "nodeValue" : "childNodes"].length;)this.setEndBefore(this.endContainer)
                }
                return this
            }, applyInlineStyle: function (a, g, b) {
                if (this.collapsed)return this;
                this.trimBoundary().enlarge(!1, function (a) {
                    return 1 ==
                        a.nodeType && f.isBlockElm(a)
                }).adjustmentBoundary();
                for (var e = this.createBookmark(), c = e.end, l = function (a) {
                    return 1 == a.nodeType ? "br" != a.tagName.toLowerCase() : !f.isWhitespace(a)
                }, k = f.getNextDomNode(e.start, !1, l), h, d, p = this.cloneRange(); k && f.getPosition(k, c) & f.POSITION_PRECEDING;)if (3 == k.nodeType || w[a][k.tagName]) {
                    p.setStartBefore(k);
                    for (h = k; h && (3 == h.nodeType || w[a][h.tagName]) && h !== c;)d = h, h = f.getNextDomNode(h, 1 == h.nodeType, null, function (g) {
                        return w[a][g.tagName]
                    });
                    var k = p.setEndAfter(d).extractContents(),
                        B;
                    if (b && 0 < b.length) {
                        var O;
                        O = B = b[0].cloneNode(!1);
                        for (var r = 1, t; t = b[r++];)B.appendChild(t.cloneNode(!1)), B = B.firstChild
                    } else B = p.document.createElement(a);
                    g && f.setAttributes(B, g);
                    B.appendChild(k);
                    p.insertNode(b ? O : B);
                    var U;
                    "span" == a && g.style && /text\-decoration/.test(g.style) && (U = f.findParentByTagName(B, "a", !0)) ? (f.setAttributes(U, g), f.remove(B, !0), B = U) : (f.mergeSibling(B), f.clearEmptySibling(B));
                    f.mergeChild(B, g);
                    k = f.getNextDomNode(B, !1, l);
                    f.mergeToParent(B);
                    if (h === c)break
                } else k = f.getNextDomNode(k,
                    !0, l);
                return this.moveToBookmark(e)
            }, removeInlineStyle: function (a) {
                if (this.collapsed)return this;
                a = p.isArray(a) ? a : [a];
                this.shrinkBoundary().adjustmentBoundary();
                for (var g = this.startContainer, b = this.endContainer; ;) {
                    if (1 == g.nodeType) {
                        if (-1 < p.indexOf(a, g.tagName.toLowerCase()))break;
                        if ("body" == g.tagName.toLowerCase()) {
                            g = null;
                            break
                        }
                    }
                    g = g.parentNode
                }
                for (; ;) {
                    if (1 == b.nodeType) {
                        if (-1 < p.indexOf(a, b.tagName.toLowerCase()))break;
                        if ("body" == b.tagName.toLowerCase()) {
                            b = null;
                            break
                        }
                    }
                    b = b.parentNode
                }
                var e = this.createBookmark(),
                    c, l;
                g && (l = this.cloneRange().setEndBefore(e.start).setStartBefore(g), c = l.extractContents(), l.insertNode(c), f.clearEmptySibling(g, !0), g.parentNode.insertBefore(e.start, g));
                b && (l = this.cloneRange().setStartAfter(e.end).setEndAfter(b), c = l.extractContents(), l.insertNode(c), f.clearEmptySibling(b, !1, !0), b.parentNode.insertBefore(e.end, b.nextSibling));
                for (g = f.getNextDomNode(e.start, !1, function (a) {
                    return 1 == a.nodeType
                }); g && g !== e.end;)b = f.getNextDomNode(g, !0, function (a) {
                    return 1 == a.nodeType
                }), -1 < p.indexOf(a,
                    g.tagName.toLowerCase()) && f.remove(g, !0), g = b;
                return this.moveToBookmark(e)
            }, getClosedNode: function () {
                var a;
                if (!this.collapsed) {
                    var g = this.cloneRange().adjustmentBoundary().shrinkBoundary();
                    d(g) && (g = g.startContainer.childNodes[g.startOffset]) && 1 == g.nodeType && (w.$empty[g.tagName] || w.$nonChild[g.tagName]) && (a = g)
                }
                return a
            }, select: r.ie ? function (b, c) {
                var k;
                this.collapsed || this.shrinkBoundary();
                var h = this.getClosedNode();
                if (h && !c) {
                    try {
                        k = this.document.body.createControlRange(), k.addElement(h), k.select()
                    } catch (d) {
                    }
                    return this
                }
                var h =
                    this.createBookmark(), z = h.start;
                k = this.document.body.createTextRange();
                k.moveToElementText(z);
                k.moveStart("character", 1);
                if (!this.collapsed) {
                    var v = this.document.body.createTextRange(), z = h.end;
                    v.moveToElementText(z);
                    k.setEndPoint("EndToEnd", v)
                } else if (!b && 3 != this.startContainer.nodeType) {
                    var v = this.document.createTextNode(g), D = this.document.createElement("span");
                    D.appendChild(this.document.createTextNode(g));
                    z.parentNode.insertBefore(D, z);
                    z.parentNode.insertBefore(v, z);
                    a(this.document, v);
                    l = v;
                    e(D, "previousSibling");
                    e(z, "nextSibling");
                    k.moveStart("character", -1);
                    k.collapse(!0)
                }
                this.moveToBookmark(h);
                D && f.remove(D);
                try {
                    k.select()
                } catch (p) {
                }
                return this
            } : function (b) {
                function c(a) {
                    function b(g, e, c) {
                        3 == g.nodeType && g.nodeValue.length < e && (a[c + "Offset"] = g.nodeValue.length)
                    }

                    b(a.startContainer, a.startOffset, "start");
                    b(a.endContainer, a.endOffset, "end")
                }

                var k = f.getWindow(this.document), h = k.getSelection();
                r.gecko ? this.document.body.focus() : k.focus();
                if (h) {
                    h.removeAllRanges();
                    this.collapsed && !b && (b = k = this.startContainer, 1 ==
                    k.nodeType && (b = k.childNodes[this.startOffset]), 3 == k.nodeType && this.startOffset || (b ? b.previousSibling && 3 == b.previousSibling.nodeType : k.lastChild && 3 == k.lastChild.nodeType) || (b = this.document.createTextNode(g), this.insertNode(b), a(this.document, b), e(b, "previousSibling"), e(b, "nextSibling"), l = b, this.setStart(b, r.webkit ? 1 : 0).collapse(!0)));
                    k = this.document.createRange();
                    if (this.collapsed && r.opera && 1 == this.startContainer.nodeType)if (b = this.startContainer.childNodes[this.startOffset]) {
                        for (; b && f.isBlockElm(b);)if (1 ==
                            b.nodeType && b.childNodes[0])b = b.childNodes[0]; else break;
                        b && this.setStartBefore(b).collapse(!0)
                    } else(b = this.startContainer.lastChild) && f.isBr(b) && this.setStartBefore(b).collapse(!0);
                    c(this);
                    k.setStart(this.startContainer, this.startOffset);
                    k.setEnd(this.endContainer, this.endOffset);
                    h.addRange(k)
                }
                return this
            }, scrollToView: function (a, b) {
                a = a ? window : f.getWindow(this.document);
                var g = this.document.createElement("span");
                g.innerHTML = "&nbsp;";
                this.cloneRange().insertNode(g);
                f.scrollToView(g, a, b);
                f.remove(g);
                return this
            }, inFillChar: function () {
                var a = this.startContainer;
                return this.collapsed && 3 == a.nodeType && a.nodeValue.replace(new RegExp("^" + f.fillChar), "").length + 1 == a.nodeValue.length ? !0 : !1
            }, createAddress: function (a, b) {
                function g(a) {
                    for (var e = a ? c.startContainer : c.endContainer, k = f.findParents(e, !0, function (a) {
                        return !f.isBody(a)
                    }), l = [], h = 0, d; d = k[h++];)l.push(f.getNodeIndex(d, b));
                    k = 0;
                    if (b)if (3 == e.nodeType) {
                        for (e = e.previousSibling; e && 3 == e.nodeType;)k += e.nodeValue.replace(Q, "").length, e = e.previousSibling;
                        k +=
                            a ? c.startOffset : c.endOffset
                    } else if (e = e.childNodes[a ? c.startOffset : c.endOffset])k = f.getNodeIndex(e, b); else for (e = a ? c.startContainer : c.endContainer, a = e.firstChild; a;)if (f.isFillChar(a))a = a.nextSibling; else if (k++, 3 == a.nodeType)for (; a && 3 == a.nodeType;)a = a.nextSibling; else a = a.nextSibling; else k = a ? f.isFillChar(e) ? 0 : c.startOffset : c.endOffset;
                    0 > k && (k = 0);
                    l.push(k);
                    return l
                }

                var e = {}, c = this;
                e.startAddress = g(!0);
                a || (e.endAddress = c.collapsed ? [].concat(e.startAddress) : g());
                return e
            }, moveToAddress: function (a,
                                        b) {
                function g(a, b) {
                    for (var c = e.document.body, k, l, h = 0, d, n = a.length; h < n; h++)if (d = a[h], k = c, c = c.childNodes[d], !c) {
                        l = d;
                        break
                    }
                    b ? c ? e.setStartBefore(c) : e.setStart(k, l) : c ? e.setEndBefore(c) : e.setEnd(k, l)
                }

                var e = this;
                g(a.startAddress, !0);
                !b && a.endAddress && g(a.endAddress);
                return e
            }, equals: function (a) {
                for (var b in this)if (this.hasOwnProperty(b) && this[b] !== a[b])return !1;
                return !0
            }, traversal: function (a, b) {
                if (this.collapsed)return this;
                for (var g = this.createBookmark(), e = g.end, c = f.getNextDomNode(g.start, !1, b); c && c !==
                e && f.getPosition(c, e) & f.POSITION_PRECEDING;) {
                    var k = f.getNextDomNode(c, !1, b);
                    a(c);
                    c = k
                }
                return this.moveToBookmark(g)
            }
        }
    })();
    (function () {
        function d(a, b) {
            var c = f.getNodeIndex;
            a = a.duplicate();
            a.collapse(b);
            var g = a.parentElement();
            if (!g.hasChildNodes())return {container: g, offset: 0};
            for (var l = g.children, k, d = a.duplicate(), n = 0, q = l.length - 1, u = -1; n <= q;) {
                u = Math.floor((n + q) / 2);
                k = l[u];
                d.moveToElementText(k);
                var x = d.compareEndPoints("StartToStart", a);
                if (0 < x)q = u - 1; else if (0 > x)n = u + 1; else return {container: g, offset: c(k)}
            }
            if (-1 ==
                u) {
                d.moveToElementText(g);
                d.setEndPoint("StartToStart", a);
                d = d.text.replace(/(\r\n|\r)/g, "\n").length;
                l = g.childNodes;
                if (!d)return k = l[l.length - 1], {container: k, offset: k.nodeValue.length};
                for (c = l.length; 0 < d;)d -= l[--c].nodeValue.length;
                return {container: l[c], offset: -d}
            }
            d.collapse(0 < x);
            d.setEndPoint(0 < x ? "StartToStart" : "EndToStart", a);
            d = d.text.replace(/(\r\n|\r)/g, "\n").length;
            if (!d)return w.$empty[k.tagName] || w.$nonChild[k.tagName] ? {
                container: g,
                offset: c(k) + (0 < x ? 0 : 1)
            } : {container: k, offset: 0 < x ? 0 : k.childNodes.length};
            for (; 0 < d;)try {
                l = k, k = k[0 < x ? "previousSibling" : "nextSibling"], d -= k.nodeValue.length
            } catch (z) {
                return {container: g, offset: c(l)}
            }
            return {container: k, offset: 0 < x ? -d : k.nodeValue.length + d}
        }

        function b(a, b) {
            if (a.item)b.selectNode(a.item(0)); else {
                var c = d(a, !0);
                b.setStart(c.container, c.offset);
                0 != a.compareEndPoints("StartToEnd", a) && (c = d(a, !1), b.setEnd(c.container, c.offset))
            }
            return b
        }

        function c(a) {
            var b;
            try {
                b = a.getNative().createRange()
            } catch (c) {
                return null
            }
            var g = b.item ? b.item(0) : b.parentElement();
            return (g.ownerDocument ||
            g) === a.document ? b : null
        }

        (M.Selection = function (a) {
            var b = this;
            b.document = a;
            r.ie9below && (a = f.getWindow(a).frameElement, f.on(a, "beforedeactivate", function () {
                b._bakIERange = b.getIERange()
            }), f.on(a, "activate", function () {
                try {
                    !c(b) && b._bakIERange && b._bakIERange.select()
                } catch (a) {
                }
                b._bakIERange = null
            }));
            a = a = null
        }).prototype = {
            rangeInBody: function (a, b) {
                var c = r.ie9below || b ? a.item ? a.item() : a.parentElement() : a.startContainer;
                return c === this.document.body || f.inDoc(c, this.document)
            }, getNative: function () {
                var a = this.document;
                try {
                    return a ? r.ie9below ? a.selection : f.getWindow(a).getSelection() : null
                } catch (b) {
                    return null
                }
            }, getIERange: function () {
                var a = c(this);
                return !a && this._bakIERange ? this._bakIERange : a
            }, cache: function () {
                this.clear();
                this._cachedRange = this.getRange();
                this._cachedStartElement = this.getStart();
                this._cachedStartElementPath = this.getStartElementPath()
            }, getStartElementPath: function () {
                if (this._cachedStartElementPath)return this._cachedStartElementPath;
                var a = this.getStart();
                return a ? f.findParents(a, !0, null, !0) : []
            },
            clear: function () {
                this._cachedStartElementPath = this._cachedRange = this._cachedStartElement = null
            }, isFocus: function () {
                try {
                    if (r.ie9below) {
                        var a = c(this);
                        return !(!a || !this.rangeInBody(a))
                    }
                    return !!this.getNative().rangeCount
                } catch (b) {
                    return !1
                }
            }, getRange: function () {
                function a(a) {
                    for (var b = c.document.body.firstChild, g = a.collapsed; b && b.firstChild;)a.setStart(b, 0), b = b.firstChild;
                    a.startContainer || a.setStart(c.document.body, 0);
                    g && a.collapse(!0)
                }

                var c = this;
                if (null != c._cachedRange)return this._cachedRange;
                var h =
                    new t.editor.dom.Range(c.document);
                if (r.ie9below) {
                    var g = c.getIERange();
                    if (g)try {
                        b(g, h)
                    } catch (l) {
                        a(h)
                    } else a(h)
                } else {
                    var k = c.getNative();
                    if (k && k.rangeCount)g = k.getRangeAt(0), k = k.getRangeAt(k.rangeCount - 1), h.setStart(g.startContainer, g.startOffset).setEnd(k.endContainer, k.endOffset), h.collapsed && f.isBody(h.startContainer) && !h.startOffset && a(h); else {
                        if (this._bakRange && f.inDoc(this._bakRange.startContainer, this.document))return this._bakRange;
                        a(h)
                    }
                }
                return this._bakRange = h
            }, getStart: function () {
                if (this._cachedStartElement)return this._cachedStartElement;
                var a = r.ie9below ? this.getIERange() : this.getRange(), b, c;
                if (r.ie9below) {
                    if (!a)return this.document.body.firstChild;
                    if (a.item)return a.item(0);
                    b = a.duplicate();
                    0 < b.text.length && b.moveStart("character", 1);
                    b.collapse(1);
                    b = b.parentElement();
                    for (c = a = a.parentElement(); a = a.parentNode;)if (a == b) {
                        b = c;
                        break
                    }
                } else if (a.shrinkBoundary(), b = a.startContainer, 1 == b.nodeType && b.hasChildNodes() && (b = b.childNodes[Math.min(b.childNodes.length - 1, a.startOffset)]), 3 == b.nodeType)return b.parentNode;
                return b
            }, getText: function () {
                var a;
                return this.isFocus() && (a = this.getNative()) ? (a = r.ie9below ? a.createRange() : a.getRangeAt(0), r.ie9below ? a.text : a.toString()) : ""
            }, clearRange: function () {
                this.getNative()[r.ie9below ? "empty" : "removeAllRanges"]()
            }
        }
    })();
    (function () {
        function d(a, b) {
            var c;
            if (b.textarea)if (p.isString(b.textarea))for (var e = 0, h, d = f.getElementsByTagName(a, "textarea"); h = d[e++];) {
                if (h.id == "ueditor_textarea_" + b.options.textarea) {
                    c = h;
                    break
                }
            } else c = b.textarea;
            c || (a.appendChild(c = f.createElement(document, "textarea", {
                name: b.options.textarea,
                id: "ueditor_textarea_" + b.options.textarea, style: "display:none"
            })), b.textarea = c);
            !c.getAttribute("name") && c.setAttribute("name", b.options.textarea);
            c.value = b.hasContents() ? b.options.allHtmlEnabled ? b.getAllHtml() : b.getContent(null, null, !0) : ""
        }

        function b(a) {
            for (var b in a)return b
        }

        function c(a) {
            a.langIsReady = !0;
            a.fireEvent("langReady")
        }

        var a = 0, e, h = UE.Editor = function (g) {
            var e = this;
            e.uid = a++;
            ba.call(e);
            e.commands = {};
            e.options = p.extend(p.clone(g || {}), UEDITOR_CONFIG, !0);
            e.shortcutkeys = {};
            e.inputRules = [];
            e.outputRules = [];
            e.setOpt(h.defaultOptions(e));
            e.loadServerConfig();
            p.isEmptyObject(UE.I18N) ? p.loadFile(document, {
                src: e.options.langPath + e.options.lang + "/" + e.options.lang + ".js",
                tag: "script",
                type: "text/javascript",
                defer: "defer"
            }, function () {
                UE.plugin.load(e);
                c(e)
            }) : (e.options.lang = b(UE.I18N), UE.plugin.load(e), c(e));
            UE.instants["ueditorInstant" + e.uid] = e
        };
        h.prototype = {
            registerCommand: function (a, b) {
                this.commands[a] = b
            }, ready: function (a) {
                a && (this.isReady ? a.apply(this) : this.addListener("ready", a))
            }, setOpt: function (a,
                                 b) {
                var c = {};
                p.isString(a) ? c[a] = b : c = a;
                p.extend(this.options, c, !0)
            }, getOpt: function (a) {
                return this.options[a]
            }, destroy: function () {
                this.fireEvent("destroy");
                var a = this.container.parentNode, b = this.textarea;
                b ? b.style.display = "" : (b = document.createElement("textarea"), a.parentNode.insertBefore(b, a));
                b.style.width = this.iframe.offsetWidth + "px";
                b.style.height = this.iframe.offsetHeight + "px";
                b.value = this.getContent();
                b.id = this.key;
                a.innerHTML = "";
                f.remove(a);
                var a = this.key, c;
                for (c in this)this.hasOwnProperty(c) && delete this[c];
                UE.delEditor(a)
            }, render: function (a) {
                var b = this.options;
                p.isString(a) && (a = document.getElementById(a));
                if (a) {
                    b.minFrameWidth = b.initialFrameWidth ? b.initialFrameWidth : b.initialFrameWidth = a.offsetWidth;
                    b.initialFrameHeight ? b.minFrameHeight = b.initialFrameHeight : b.initialFrameHeight = b.minFrameHeight = a.offsetHeight;
                    a.style.width = /%$/.test(b.initialFrameWidth) ? "100%" : b.initialFrameWidth - parseInt(f.getComputedStyle(a, "padding-left")) - parseInt(f.getComputedStyle(a, "padding-right")) + "px";
                    a.style.height =
                        /%$/.test(b.initialFrameHeight) ? "100%" : b.initialFrameHeight - parseInt(f.getComputedStyle(a, "padding-top")) - parseInt(f.getComputedStyle(a, "padding-bottom")) + "px";
                    a.style.zIndex = b.zIndex;
                    var c = (J && 9 > r.version ? "" : "<!DOCTYPE html>") + "<html xmlns='http://www.w3.org/1999/xhtml' class='view' ><head><style type='text/css'>.view{padding:0;word-wrap:break-word;cursor:text;height:90%;}\nbody{margin:8px;font-family:sans-serif;font-size:16px;}p{margin:5px 0;}</style>" + (b.iframeCssUrl ? "<link rel='stylesheet' type='text/css' href='" +
                        p.unhtml(b.iframeCssUrl) + "'/>" : "") + (b.initialStyle ? "<style>" + b.initialStyle + "</style>" : "") + "</head><body class='view' ></body><script type='text/javascript' " + (J ? "defer='defer'" : "") + " id='_initialScript'>setTimeout(function(){editor = window.parent.UE.instants['ueditorInstant" + this.uid + "'];editor._setup(document);},0);var _tmpScript = document.getElementById('_initialScript');_tmpScript.parentNode.removeChild(_tmpScript);\x3c/script></html>";
                    a.appendChild(f.createElement(document, "iframe", {
                        id: "ueditor_" +
                        this.uid,
                        width: "100%",
                        height: "100%",
                        frameborder: "0",
                        src: "javascript:void(function(){document.open();" + (b.customDomain && document.domain != location.hostname ? 'document.domain="' + document.domain + '";' : "") + 'document.write("' + c + '");document.close();}())'
                    }));
                    a.style.overflow = "hidden";
                    setTimeout(function () {
                        /%$/.test(b.initialFrameWidth) && (b.minFrameWidth = b.initialFrameWidth = a.offsetWidth);
                        /%$/.test(b.initialFrameHeight) && (b.minFrameHeight = b.initialFrameHeight = a.offsetHeight, a.style.height = b.initialFrameHeight +
                            "px")
                    })
                }
            }, _setup: function (a) {
                var b = this, c = b.options;
                J ? (a.body.disabled = !0, a.body.contentEditable = !0, a.body.disabled = !1) : a.body.contentEditable = !0;
                a.body.spellcheck = !1;
                b.document = a;
                b.window = a.defaultView || a.parentWindow;
                b.iframe = b.window.frameElement;
                b.body = a.body;
                b.selection = new M.Selection(a);
                var e;
                r.gecko && (e = this.selection.getNative()) && e.removeAllRanges();
                this._initEvents();
                for (var h = this.iframe.parentNode; !f.isBody(h); h = h.parentNode)if ("FORM" == h.tagName) {
                    b.form = h;
                    if (b.options.autoSyncData)f.on(b.window,
                        "blur", function () {
                            d(h, b)
                        }); else f.on(h, "submit", function () {
                        d(this, b)
                    });
                    break
                }
                if (c.initialContent)if (c.autoClearinitialContent) {
                    var q = b.execCommand;
                    b.execCommand = function () {
                        b.fireEvent("firstBeforeExecCommand");
                        return q.apply(b, arguments)
                    };
                    this._setDefaultContent(c.initialContent)
                } else this.setContent(c.initialContent, !1, !0);
                f.isEmptyNode(b.body) && (b.body.innerHTML = "<p>" + (r.ie ? "" : "<br/>") + "</p>");
                c.focus && setTimeout(function () {
                        b.focus(b.options.focusInEnd);
                        !b.options.autoClearinitialContent && b._selectionChange()
                    },
                    0);
                b.container || (b.container = this.iframe.parentNode);
                c.fullscreen && b.ui && b.ui.setFullScreen(!0);
                try {
                    b.document.execCommand("2D-position", !1, !1)
                } catch (u) {
                }
                try {
                    b.document.execCommand("enableInlineTableEditing", !1, !1)
                } catch (x) {
                }
                try {
                    b.document.execCommand("enableObjectResizing", !1, !1)
                } catch (z) {
                }
                b._bindshortcutKeys();
                b.isReady = 1;
                b.fireEvent("ready");
                c.onready && c.onready.call(b);
                if (!r.ie9below)f.on(b.window, ["blur", "focus"], function (a) {
                    if ("blur" == a.type) {
                        b._bakRange = b.selection.getRange();
                        try {
                            b._bakNativeRange =
                                b.selection.getNative().getRangeAt(0), b.selection.getNative().removeAllRanges()
                        } catch (c) {
                            b._bakNativeRange = null
                        }
                    } else try {
                        b._bakRange && b._bakRange.select()
                    } catch (e) {
                    }
                });
                r.gecko && 10902 >= r.version && (b.body.contentEditable = !1, setTimeout(function () {
                    b.body.contentEditable = !0
                }, 100), setInterval(function () {
                    b.body.style.height = b.iframe.offsetHeight - 20 + "px"
                }, 100));
                !c.isShow && b.setHide();
                c.readonly && b.setDisabled()
            }, sync: function (a) {
                (a = a ? document.getElementById(a) : f.findParent(this.iframe.parentNode, function (a) {
                    return "FORM" ==
                        a.tagName
                }, !0)) && d(a, this)
            }, setHeight: function (a, b) {
                a !== parseInt(this.iframe.parentNode.style.height) && (this.iframe.parentNode.style.height = a + "px");
                !b && (this.options.minFrameHeight = this.options.initialFrameHeight = a);
                this.body.style.height = a + "px";
                !b && this.trigger("setHeight")
            }, addshortcutkey: function (a, b) {
                var c = {};
                b ? c[a] = b : c = a;
                p.extend(this.shortcutkeys, c)
            }, _bindshortcutKeys: function () {
                var a = this, b = this.shortcutkeys;
                a.addListener("keydown", function (c, e) {
                    var h = e.keyCode || e.which, d;
                    for (d in b)for (var u =
                        b[d].split(","), x = 0, z; z = u[x++];) {
                        z = z.split(":");
                        var v = z[0];
                        z = z[1];
                        if (/^(ctrl)(\+shift)?\+(\d+)$/.test(v.toLowerCase()) || /^(\d+)$/.test(v))if ("ctrl" == RegExp.$1 && (e.ctrlKey || e.metaKey) && ("" != RegExp.$2 ? e[RegExp.$2.slice(1) + "Key"] : 1) && h == RegExp.$3 || h == RegExp.$1)-1 != a.queryCommandState(d, z) && a.execCommand(d, z), f.preventDefault(e)
                    }
                })
            }, getContent: function (a, b, c, e, h) {
                a && p.isFunction(a) && (b = a, a = "");
                if (b ? !b() : !this.hasContents())return "";
                this.fireEvent("beforegetcontent");
                b = UE.htmlparser(this.body.innerHTML,
                    e);
                this.filterOutputRule(b);
                this.fireEvent("aftergetcontent", a, b);
                return b.toHtml(h)
            }, getAllHtml: function () {
                var a = [];
                this.fireEvent("getAllHtml", a);
                if (r.ie && 8 < r.version) {
                    var b = "";
                    p.each(this.document.styleSheets, function (a) {
                        b += a.href ? '<link rel="stylesheet" type="text/css" href="' + a.href + '" />' : "<style>" + a.cssText + "</style>"
                    });
                    p.each(this.document.getElementsByTagName("script"), function (a) {
                        b += a.outerHTML
                    })
                }
                return "<html><head>" + (this.options.charset ? '<meta http-equiv="Content-Type" content="text/html; charset=' +
                    this.options.charset + '"/>' : "") + (b || this.document.getElementsByTagName("head")[0].innerHTML) + a.join("\n") + "</head><body " + (J && 9 > r.version ? 'class="view"' : "") + ">" + this.getContent(null, null, !0) + "</body></html>"
            }, getPlainTxt: function () {
                var a = new RegExp(f.fillChar, "g"), b = this.body.innerHTML.replace(/[\n\r]/g, ""), b = b.replace(/<(p|div)[^>]*>(<br\/?>|&nbsp;)<\/\1>/gi, "\n").replace(/<br\/?>/gi, "\n").replace(/<[^>/]+>/g, "").replace(/(\n)?<\/([^>]+)>/g, function (a, b, c) {
                    return w.$block[c] ? "\n" : b ? b : ""
                });
                return b.replace(a,
                    "").replace(/\u00a0/g, " ").replace(/&nbsp;/g, " ")
            }, getContentTxt: function () {
                return this.body[r.ie ? "innerText" : "textContent"].replace(new RegExp(f.fillChar, "g"), "").replace(/\u00a0/g, " ")
            }, setContent: function (a, b, c) {
                this.fireEvent("beforesetcontent", a);
                a = UE.htmlparser(a);
                this.filterInputRule(a);
                a = a.toHtml();
                this.body.innerHTML = (b ? this.body.innerHTML : "") + a;
                if ("p" == this.options.enterTag)if (b = this.body.firstChild, !b || 1 == b.nodeType && (w.$cdata[b.tagName] || "DIV" == b.tagName && b.getAttribute("cdata_tag") ||
                    f.isCustomeNode(b)) && b === this.body.lastChild)this.body.innerHTML = "<p>" + (r.ie ? "&nbsp;" : "<br/>") + "</p>" + this.body.innerHTML; else for (var e = this.document.createElement("p"); b;) {
                    for (; b && (3 == b.nodeType || 1 == b.nodeType && w.p[b.tagName] && !w.$cdata[b.tagName]);)a = b.nextSibling, e.appendChild(b), b = a;
                    if (e.firstChild)if (b)b.parentNode.insertBefore(e, b), e = this.document.createElement("p"); else {
                        this.body.appendChild(e);
                        break
                    }
                    b = b.nextSibling
                }
                this.fireEvent("aftersetcontent");
                this.fireEvent("contentchange");
                !c && this._selectionChange();
                this._bakRange = this._bakIERange = this._bakNativeRange = null;
                var h;
                r.gecko && (h = this.selection.getNative()) && h.removeAllRanges();
                this.options.autoSyncData && this.form && d(this.form, this)
            }, focus: function (a) {
                try {
                    var b = this.selection.getRange();
                    if (a) {
                        var c = this.body.lastChild;
                        c && 1 == c.nodeType && !w.$empty[c.tagName] && (f.isEmptyBlock(c) ? b.setStartAtFirst(c) : b.setStartAtLast(c), b.collapse(!0));
                        b.setCursor(!0)
                    } else!b.collapsed && f.isBody(b.startContainer) && 0 == b.startOffset && (c = this.body.firstChild) && 1 == c.nodeType && !w.$empty[c.tagName] && b.setStartAtFirst(c).collapse(!0), b.select(!0);
                    this.fireEvent("focus selectionchange")
                } catch (e) {
                }
            }, isFocus: function () {
                return this.selection.isFocus()
            }, blur: function () {
                var a = this.selection.getNative();
                if (a.empty && r.ie) {
                    var b = document.body.createTextRange();
                    b.moveToElementText(document.body);
                    b.collapse(!0);
                    b.select();
                    a.empty()
                } else a.removeAllRanges()
            }, _initEvents: function () {
                var a = this, b = a.document, c = a.window;
                a._proxyDomEvent = p.bind(a._proxyDomEvent, a);
                f.on(b, "click contextmenu mousedown keydown keyup keypress mouseup mouseover mouseout selectstart".split(" "),
                    a._proxyDomEvent);
                f.on(c, ["focus", "blur"], a._proxyDomEvent);
                f.on(a.body, "drop", function (b) {
                    r.gecko && b.stopPropagation && b.stopPropagation();
                    a.fireEvent("contentchange")
                });
                f.on(b, ["mouseup", "keydown"], function (b) {
                    "keydown" == b.type && (b.ctrlKey || b.metaKey || b.shiftKey || b.altKey) || 2 != b.button && a._selectionChange(250, b)
                })
            }, _proxyDomEvent: function (a) {
                return !1 === this.fireEvent("before" + a.type.replace(/^on/, "").toLowerCase()) || !1 === this.fireEvent(a.type.replace(/^on/, ""), a) ? !1 : this.fireEvent("after" + a.type.replace(/^on/,
                        "").toLowerCase())
            }, _selectionChange: function (a, b) {
                var c = this, h = !1, d, f;
                r.ie && 9 > r.version && b && "mouseup" == b.type && !this.selection.getRange().collapsed && (h = !0, d = b.clientX, f = b.clientY);
                clearTimeout(e);
                e = setTimeout(function () {
                    if (c.selection && c.selection.getNative()) {
                        var a;
                        if (h && "None" == c.selection.getNative().type) {
                            a = c.document.body.createTextRange();
                            try {
                                a.moveToPoint(d, f)
                            } catch (e) {
                                a = null
                            }
                        }
                        var g;
                        a && (g = c.selection.getIERange, c.selection.getIERange = function () {
                            return a
                        });
                        c.selection.cache();
                        g && (c.selection.getIERange =
                            g);
                        c.selection._cachedRange && c.selection._cachedStartElement && (c.fireEvent("beforeselectionchange"), c.fireEvent("selectionchange", !!b), c.fireEvent("afterselectionchange"), c.selection.clear())
                    }
                }, a || 50)
            }, _callCmdFn: function (a, b) {
                var c = b[0].toLowerCase(), e;
                e = (c = this.commands[c] || UE.commands[c]) && c[a];
                if (!(c && e || "queryCommandState" != a))return 0;
                if (e)return e.apply(this, b)
            }, execCommand: function (a) {
                a = a.toLowerCase();
                var b, c = this.commands[a] || UE.commands[a];
                if (!c || !c.execCommand)return null;
                c.notNeedUndo ||
                this.__hasEnterExecCommand ? (b = this._callCmdFn("execCommand", arguments), this.__hasEnterExecCommand || c.ignoreContentChange || this._ignoreContentChange || this.fireEvent("contentchange")) : (this.__hasEnterExecCommand = !0, -1 != this.queryCommandState.apply(this, arguments) && (this.fireEvent("saveScene"), this.fireEvent.apply(this, ["beforeexeccommand", a].concat(arguments)), b = this._callCmdFn("execCommand", arguments), this.fireEvent.apply(this, ["afterexeccommand", a].concat(arguments)), this.fireEvent("saveScene")),
                    this.__hasEnterExecCommand = !1);
                this.__hasEnterExecCommand || c.ignoreContentChange || this._ignoreContentChange || this._selectionChange();
                return b
            }, queryCommandState: function (a) {
                return this._callCmdFn("queryCommandState", arguments)
            }, queryCommandValue: function (a) {
                return this._callCmdFn("queryCommandValue", arguments)
            }, hasContents: function (a) {
                if (a)for (var b = 0, c; c = a[b++];)if (0 < this.document.getElementsByTagName(c).length)return !0;
                if (!f.isEmptyBlock(this.body))return !0;
                a = ["div"];
                for (b = 0; c = a[b++];) {
                    c = f.getElementsByTagName(this.document,
                        c);
                    for (var e = 0, h; h = c[e++];)if (f.isCustomeNode(h))return !0
                }
                return !1
            }, reset: function () {
                this.fireEvent("reset")
            }, setEnabled: function () {
                var a;
                if ("false" == this.body.contentEditable) {
                    this.body.contentEditable = !0;
                    a = this.selection.getRange();
                    try {
                        a.moveToBookmark(this.lastBk), delete this.lastBk
                    } catch (b) {
                        a.setStartAtFirst(this.body).collapse(!0)
                    }
                    a.select(!0);
                    this.bkqueryCommandState && (this.queryCommandState = this.bkqueryCommandState, delete this.bkqueryCommandState);
                    this.bkqueryCommandValue && (this.queryCommandValue =
                        this.bkqueryCommandValue, delete this.bkqueryCommandValue);
                    this.fireEvent("selectionchange")
                }
            }, enable: function () {
                return this.setEnabled()
            }, setDisabled: function (a) {
                var b = this;
                a = a ? p.isArray(a) ? a : [a] : [];
                "true" == b.body.contentEditable && (b.lastBk || (b.lastBk = b.selection.getRange().createBookmark(!0)), b.body.contentEditable = !1, b.bkqueryCommandState = b.queryCommandState, b.bkqueryCommandValue = b.queryCommandValue, b.queryCommandState = function (c) {
                    return -1 != p.indexOf(a, c) ? b.bkqueryCommandState.apply(b, arguments) :
                        -1
                }, b.queryCommandValue = function (c) {
                    return -1 != p.indexOf(a, c) ? b.bkqueryCommandValue.apply(b, arguments) : null
                }, b.fireEvent("selectionchange"))
            }, disable: function (a) {
                return this.setDisabled(a)
            }, _setDefaultContent: function () {
                function a() {
                    var b = this;
                    b.document.getElementById("initContent") && (b.body.innerHTML = "<p>" + (J ? "" : "<br/>") + "</p>", b.removeListener("firstBeforeExecCommand focus", a), setTimeout(function () {
                        b.focus();
                        b._selectionChange()
                    }, 0))
                }

                return function (b) {
                    this.body.innerHTML = '<p id="initContent">' +
                        b + "</p>";
                    this.addListener("firstBeforeExecCommand focus", a)
                }
            }(), setShow: function () {
                var a = this.selection.getRange();
                if ("none" == this.container.style.display) {
                    try {
                        a.moveToBookmark(this.lastBk), delete this.lastBk
                    } catch (b) {
                        a.setStartAtFirst(this.body).collapse(!0)
                    }
                    setTimeout(function () {
                        a.select(!0)
                    }, 100);
                    this.container.style.display = ""
                }
            }, show: function () {
                return this.setShow()
            }, setHide: function () {
                this.lastBk || (this.lastBk = this.selection.getRange().createBookmark(!0));
                this.container.style.display = "none"
            },
            hide: function () {
                return this.setHide()
            }, getLang: function (a) {
                var b = UE.I18N[this.options.lang];
                if (!b)throw Error("not import language file");
                a = (a || "").split(".");
                for (var c = 0, e; (e = a[c++]) && (b = b[e], b););
                return b
            }, getContentLength: function (a, b) {
                var c = this.getContent(!1, !1, !0).length;
                if (a) {
                    b = (b || []).concat(["hr", "img", "iframe"]);
                    for (var c = this.getContentTxt().replace(/[\t\r\n]+/g, "").length, e = 0, h; h = b[e++];)c += this.document.getElementsByTagName(h).length
                }
                return c
            }, addInputRule: function (a) {
                this.inputRules.push(a)
            },
            filterInputRule: function (a) {
                for (var b = 0, c; c = this.inputRules[b++];)c.call(this, a)
            }, addOutputRule: function (a) {
                this.outputRules.push(a)
            }, filterOutputRule: function (a) {
                for (var b = 0, c; c = this.outputRules[b++];)c.call(this, a)
            }, getActionUrl: function (a) {
                a = this.getOpt(a) || a;
                var b = this.getOpt("imageUrl"), c = this.getOpt("serverUrl");
                !c && b && (c = b.replace(/^(.*[\/]).+([\.].+)$/, "$1controller$2"));
                return c ? (c = c + (-1 == c.indexOf("?") ? "?" : "&") + "action=" + (a || ""), p.formatUrl(c)) : ""
            }
        };
        p.inherits(h, ba)
    })();
    UE.Editor.defaultOptions =
        function (d) {
            d = d.options.UEDITOR_HOME_URL;
            return {
                isShow: !0,
                initialContent: "",
                initialStyle: "",
                autoClearinitialContent: !1,
                iframeCssUrl: d + "themes/iframe.css",
                textarea: "editorValue",
                focus: !1,
                focusInEnd: !0,
                autoClearEmptyNode: !0,
                fullscreen: !1,
                readonly: !1,
                zIndex: 999,
                imagePopup: !0,
                enterTag: "p",
                customDomain: !1,
                lang: "zh-cn",
                langPath: d + "lang/",
                theme: "default",
                themePath: d + "themes/",
                allHtmlEnabled: !1,
                scaleEnabled: !1,
                tableNativeEditInFF: !1,
                autoSyncData: !0,
                fileNameFormat: "{time}{rand:6}"
            }
        };
    (function () {
        UE.Editor.prototype.loadServerConfig =
            function () {
                function d(b) {
                    console && console.error(b)
                }

                var b = this;
                setTimeout(function () {
                    try {
                        b.options.imageUrl && b.setOpt("serverUrl", b.options.imageUrl.replace(/^(.*[\/]).+([\.].+)$/, "$1controller$2"));
                        var c = b.getActionUrl("config"), a = p.isCrossDomainUrl(c);
                        b._serverConfigLoaded = !1;
                        c && UE.ajax.request(c, {
                            method: "GET", dataType: a ? "jsonp" : "", onsuccess: function (c) {
                                try {
                                    var e = a ? c : eval("(" + c.responseText + ")");
                                    p.extend(b.options, e);
                                    b.fireEvent("serverConfigLoaded");
                                    b._serverConfigLoaded = !0
                                } catch (l) {
                                    d(b.getLang("loadconfigFormatError"))
                                }
                            },
                            onerror: function () {
                                d(b.getLang("loadconfigHttpError"))
                            }
                        })
                    } catch (e) {
                        d(b.getLang("loadconfigError"))
                    }
                })
            };
        UE.Editor.prototype.isServerConfigLoaded = function () {
            return this._serverConfigLoaded || !1
        };
        UE.Editor.prototype.afterConfigReady = function (d) {
            if (d && p.isFunction(d)) {
                var b = this, c = function () {
                    d.apply(b, arguments);
                    b.removeListener("serverConfigLoaded", c)
                };
                b.isServerConfigLoaded() ? d.call(b, "serverConfigLoaded") : b.addListener("serverConfigLoaded", c)
            }
        }
    })();
    UE.ajax = function () {
        function d(a) {
            var b = [], c;
            for (c in a)if ("method" !=
                c && "timeout" != c && "async" != c && "dataType" != c && "callback" != c && void 0 != a[c] && null != a[c])if ("function" != (typeof a[c]).toLowerCase() && "object" != (typeof a[c]).toLowerCase())b.push(encodeURIComponent(c) + "=" + encodeURIComponent(a[c])); else if (p.isArray(a[c]))for (var e = 0; e < a[c].length; e++)b.push(encodeURIComponent(c) + "[]=" + encodeURIComponent(a[c][e]));
            return b.join("&")
        }

        function b(a, b) {
            var c = g(), e = !1, h = {
                method: "POST", timeout: 5E3, async: !0, data: {}, onsuccess: function () {
                }, onerror: function () {
                }
            };
            "object" === typeof a &&
            (b = a, a = b.url);
            if (c && a) {
                var f = b ? p.extend(h, b) : h, h = d(f);
                p.isEmptyObject(f.data) || (h += (h ? "&" : "") + d(f.data));
                var x = setTimeout(function () {
                    4 != c.readyState && (e = !0, c.abort(), clearTimeout(x))
                }, f.timeout), z = f.method.toUpperCase(), v = a + (-1 == a.indexOf("?") ? "?" : "&") + ("POST" == z ? "" : h + "&noCache=" + +new Date);
                c.open(z, v, f.async);
                c.onreadystatechange = function () {
                    if (4 == c.readyState)if (e || 200 != c.status)f.onerror(c); else f.onsuccess(c)
                };
                "POST" == z ? (c.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), c.send(h)) :
                    c.send(null)
            }
        }

        function c(a, b) {
            function c(a) {
                return function () {
                    try {
                        if (a)h.onerror && h.onerror(); else try {
                            clearTimeout(F), e.apply(window, arguments)
                        } catch (b) {
                        }
                    } catch (c) {
                        h.onerror && h.onerror.call(window, c)
                    } finally {
                        h.oncomplete && h.oncomplete.apply(window, arguments);
                        g.parentNode && g.parentNode.removeChild(g);
                        window[v] = null;
                        try {
                            delete window[v]
                        } catch (k) {
                        }
                    }
                }
            }

            var e = b.onsuccess || function () {
                }, g = document.createElement("SCRIPT"), h = b || {}, f = h.charset, z = h.jsonp || "callback", v, D = h.timeOut || 0, F, H = new RegExp("(\\?|&)" +
                z + "=([^&]*)"), B;
            if (p.isFunction(e))v = "bd__editor__" + Math.floor(2147483648 * Math.random()).toString(36), window[v] = c(0); else if (p.isString(e))v = e; else if (B = H.exec(a))v = B[2];
            a = a.replace(H, "$1" + z + "=" + v);
            0 > a.search(H) && (a += (0 > a.indexOf("?") ? "?" : "&") + z + "=" + v);
            z = d(b);
            p.isEmptyObject(b.data) || (z += (z ? "&" : "") + d(b.data));
            z && (a = a.replace(/\?/, "?" + z + "&"));
            g.onerror = c(1);
            D && (F = setTimeout(c(1), D));
            (function (a, b, c) {
                a.setAttribute("type", "text/javascript");
                a.setAttribute("defer", "defer");
                c && a.setAttribute("charset",
                    c);
                a.setAttribute("src", b);
                document.getElementsByTagName("head")[0].appendChild(a)
            })(g, a, f)
        }

        var a = "XMLHttpRequest()";
        try {
            new ActiveXObject("Msxml2.XMLHTTP"), a = "ActiveXObject('Msxml2.XMLHTTP')"
        } catch (e) {
            try {
                new ActiveXObject("Microsoft.XMLHTTP"), a = "ActiveXObject('Microsoft.XMLHTTP')"
            } catch (h) {
            }
        }
        var g = new Function("return new " + a);
        return {
            request: function (a, e) {
                e && "jsonp" == e.dataType ? c(a, e) : b(a, e)
            }, getJSONP: function (a, b, e) {
                c(a, {data: b, oncomplete: e})
            }
        }
    }();
    UE.filterWord = function () {
        function d(b) {
            return b =
                b.replace(/[\d.]+\w+/g, function (a) {
                    return p.transUnitToPx(a)
                })
        }

        function b(b) {
            return b.replace(/[\t\r\n]+/g, " ").replace(/\x3c!--[\s\S]*?--\x3e/ig, "").replace(/<v:shape [^>]*>[\s\S]*?.<\/v:shape>/gi, function (a) {
                if (r.opera)return "";
                try {
                    if (/Bitmap/i.test(a))return "";
                    var b = a.match(/width:([ \d.]*p[tx])/i)[1], c = a.match(/height:([ \d.]*p[tx])/i)[1], g = a.match(/src=\s*"([^"]*)"/i)[1];
                    return '<img width="' + d(b) + '" height="' + d(c) + '" src="' + g + '" />'
                } catch (l) {
                    return ""
                }
            }).replace(/<\/?div[^>]*>/g, "").replace(/v:\w+=(["']?)[^'"]+\1/g,
                "").replace(/<(!|script[^>]*>.*?<\/script(?=[>\s])|\/?(\?xml(:\w+)?|xml|meta|link|style|\w+:\w+)(?=[\s\/>]))[^>]*>/gi, "").replace(/<p [^>]*class="?MsoHeading"?[^>]*>(.*?)<\/p>/gi, "<p><strong>$1</strong></p>").replace(/\s+(class|lang|align)\s*=\s*(['"]?)([\w-]+)\2/ig, function (a, b, c, g) {
                    return "class" == b && "MsoListParagraph" == g ? a : ""
                }).replace(/<(font|span)[^>]*>(\s*)<\/\1>/gi, function (a, b, c) {
                    return c.replace(/[\t\r\n ]+/g, " ")
                }).replace(/(<[a-z][^>]*)\sstyle=(["'])([^\2]*?)\2/gi, function (a, b, c, g) {
                    a = [];
                    g = g.replace(/^\s+|\s+$/, "").replace(/&#39;/g, "'").replace(/&quot;/gi, "'").replace(/[\d.]+(cm|pt)/g, function (a) {
                        return p.transUnitToPx(a)
                    }).split(/;\s*/g);
                    c = 0;
                    for (var l; l = g[c]; c++) {
                        var k, f = l.split(":");
                        if (2 == f.length && (l = f[0].toLowerCase(), k = f[1].toLowerCase(), !(/^(background)\w*/.test(l) && 0 == k.replace(/(initial|\s)/g, "").length || /^(margin)\w*/.test(l) && /^0\w+$/.test(k)))) {
                            switch (l) {
                                case "mso-padding-alt":
                                case "mso-padding-top-alt":
                                case "mso-padding-right-alt":
                                case "mso-padding-bottom-alt":
                                case "mso-padding-left-alt":
                                case "mso-margin-alt":
                                case "mso-margin-top-alt":
                                case "mso-margin-right-alt":
                                case "mso-margin-bottom-alt":
                                case "mso-margin-left-alt":
                                case "mso-height":
                                case "mso-width":
                                case "mso-vertical-align-alt":
                                    /<table/.test(b) ||
                                    (a[c] = l.replace(/^mso-|-alt$/g, "") + ":" + d(k));
                                    continue;
                                case "horiz-align":
                                    a[c] = "text-align:" + k;
                                    continue;
                                case "vert-align":
                                    a[c] = "vertical-align:" + k;
                                    continue;
                                case "font-color":
                                case "mso-foreground":
                                    a[c] = "color:" + k;
                                    continue;
                                case "mso-background":
                                case "mso-highlight":
                                    a[c] = "background:" + k;
                                    continue;
                                case "mso-default-height":
                                    a[c] = "min-height:" + d(k);
                                    continue;
                                case "mso-default-width":
                                    a[c] = "min-width:" + d(k);
                                    continue;
                                case "mso-padding-between-alt":
                                    a[c] = "border-collapse:separate;border-spacing:" + d(k);
                                    continue;
                                case "text-line-through":
                                    if ("single" == k || "double" == k)a[c] = "text-decoration:line-through";
                                    continue;
                                case "mso-zero-height":
                                    "yes" == k && (a[c] = "display:none");
                                    continue;
                                case "margin":
                                    if (!/[1-9]/.test(k))continue
                            }
                            /^(mso|column|font-emph|lang|layout|line-break|list-image|nav|panose|punct|row|ruby|sep|size|src|tab-|table-border|text-(?:decor|trans)|top-bar|version|vnd|word-break)/.test(l) || /text\-indent|padding|margin/.test(l) && /\-[\d.]+/.test(k) || (a[c] = l + ":" + f[1])
                        }
                    }
                    return b + (a.length ? ' style="' + a.join(";").replace(/;{2,}/g,
                            ";") + '"' : "")
                })
        }

        return function (c) {
            return /(class="?Mso|style="[^"]*\bmso\-|w:WordDocument|<(v|o):|lang=)/ig.test(c) ? b(c) : c
        }
    }();
    (function () {
        function d(a, b, c) {
            a.push("\n");
            return b + (c ? 1 : -1)
        }

        function b(a, b) {
            for (var c = 0; c < b; c++)a.push("    ")
        }

        function c(e, g, h, k) {
            switch (e.type) {
                case "root":
                    for (var l = 0, v; v = e.children[l++];)h && "element" == v.type && !w.$inlineWithA[v.tagName] && 1 < l && (d(g, k, !0), b(g, k)), c(v, g, h, k);
                    break;
                case "text":
                    "pre" == e.parentNode.tagName ? g.push(e.data) : g.push(f[e.parentNode.tagName] ? p.html(e.data) :
                        e.data.replace(/[ ]{2}/g, " &nbsp;"));
                    break;
                case "element":
                    a(e, g, h, k);
                    break;
                case "comment":
                    g.push("\x3c!--" + e.data + "--\x3e")
            }
            return g
        }

        function a(a, e, g, h) {
            var l = "";
            if (a.attrs) {
                var l = [], f = a.attrs, m;
                for (m in f)l.push(m + (void 0 !== f[m] ? '="' + (k[m] ? p.html(f[m]).replace(/["]/g, function (a) {
                        return "&quot;"
                    }) : p.unhtml(f[m])) + '"' : ""));
                l = l.join(" ")
            }
            e.push("<" + a.tagName + (l ? " " + l : "") + (w.$empty[a.tagName] ? "/" : "") + ">");
            g && !w.$inlineWithA[a.tagName] && "pre" != a.tagName && a.children && a.children.length && (h = d(e, h, !0), b(e,
                h));
            if (a.children && a.children.length)for (l = 0; f = a.children[l++];)g && "element" == f.type && !w.$inlineWithA[f.tagName] && 1 < l && (d(e, h), b(e, h)), c(f, e, g, h);
            w.$empty[a.tagName] || (g && !w.$inlineWithA[a.tagName] && "pre" != a.tagName && a.children && a.children.length && (h = d(e, h), b(e, h)), e.push("</" + a.tagName + ">"))
        }

        function e(a, b) {
            var c;
            if ("element" == a.type && a.getAttr("id") == b)return a;
            if (a.children && a.children.length)for (var g = 0; c = a.children[g++];)if (c = e(c, b))return c
        }

        function h(a, b, c) {
            "element" == a.type && a.tagName == b &&
            c.push(a);
            if (a.children && a.children.length)for (var e = 0, g; g = a.children[e++];)h(g, b, c)
        }

        function g(a, b) {
            if (a.children && a.children.length)for (var c = 0, e; e = a.children[c];)g(e, b), e.parentNode && (e.children && e.children.length && b(e), e.parentNode && c++); else b(a)
        }

        var l = UE.uNode = function (a) {
            this.type = a.type;
            this.data = a.data;
            this.tagName = a.tagName;
            this.parentNode = a.parentNode;
            this.attrs = a.attrs || {};
            this.children = a.children
        }, k = {href: 1, src: 1, _src: 1, _href: 1, cdata_data: 1}, f = {style: 1, script: 1};
        l.createElement = function (a) {
            return /[<>]/.test(a) ?
                UE.htmlparser(a).children[0] : new l({type: "element", children: [], tagName: a})
        };
        l.createText = function (a, b) {
            return new UE.uNode({type: "text", data: b ? a : p.unhtml(a || "")})
        };
        l.prototype = {
            toHtml: function (a) {
                var b = [];
                c(this, b, a, 0);
                return b.join("")
            }, innerHTML: function (a) {
                if ("element" != this.type || w.$empty[this.tagName])return this;
                if (p.isString(a)) {
                    if (this.children)for (var b = 0, c; c = this.children[b++];)c.parentNode = null;
                    this.children = [];
                    a = UE.htmlparser(a);
                    for (b = 0; c = a.children[b++];)this.children.push(c), c.parentNode =
                        this;
                    return this
                }
                a = new UE.uNode({type: "root", children: this.children});
                return a.toHtml()
            }, innerText: function (a, b) {
                if ("element" != this.type || w.$empty[this.tagName])return this;
                if (a) {
                    if (this.children)for (var c = 0, e; e = this.children[c++];)e.parentNode = null;
                    this.children = [];
                    this.appendChild(l.createText(a, b));
                    return this
                }
                return this.toHtml().replace(/<[^>]+>/g, "")
            }, getData: function () {
                return "element" == this.type ? "" : this.data
            }, firstChild: function () {
                return this.children ? this.children[0] : null
            }, lastChild: function () {
                return this.children ?
                    this.children[this.children.length - 1] : null
            }, previousSibling: function () {
                for (var a = this.parentNode, b = 0, c; c = a.children[b]; b++)if (c === this)return 0 == b ? null : a.children[b - 1]
            }, nextSibling: function () {
                for (var a = this.parentNode, b = 0, c; c = a.children[b++];)if (c === this)return a.children[b]
            }, replaceChild: function (a, b) {
                if (this.children) {
                    a.parentNode && a.parentNode.removeChild(a);
                    for (var c = 0, e; e = this.children[c]; c++)if (e === b)return this.children.splice(c, 1, a), b.parentNode = null, a.parentNode = this, a
                }
            }, appendChild: function (a) {
                if ("root" ==
                    this.type || "element" == this.type && !w.$empty[this.tagName]) {
                    this.children || (this.children = []);
                    a.parentNode && a.parentNode.removeChild(a);
                    for (var b = 0, c; c = this.children[b]; b++)if (c === a) {
                        this.children.splice(b, 1);
                        break
                    }
                    this.children.push(a);
                    a.parentNode = this;
                    return a
                }
            }, insertBefore: function (a, b) {
                if (this.children) {
                    a.parentNode && a.parentNode.removeChild(a);
                    for (var c = 0, e; e = this.children[c]; c++)if (e === b)return this.children.splice(c, 0, a), a.parentNode = this, a
                }
            }, insertAfter: function (a, b) {
                if (this.children) {
                    a.parentNode &&
                    a.parentNode.removeChild(a);
                    for (var c = 0, e; e = this.children[c]; c++)if (e === b)return this.children.splice(c + 1, 0, a), a.parentNode = this, a
                }
            }, removeChild: function (a, b) {
                if (this.children)for (var c = 0, e; e = this.children[c]; c++)if (e === a) {
                    this.children.splice(c, 1);
                    e.parentNode = null;
                    if (b && e.children && e.children.length)for (var g = 0, h; h = e.children[g]; g++)this.children.splice(c + g, 0, h), h.parentNode = this;
                    return e
                }
            }, getAttr: function (a) {
                return this.attrs && this.attrs[a.toLowerCase()]
            }, setAttr: function (a, b) {
                if (a)if (this.attrs ||
                    (this.attrs = {}), p.isObject(a))for (var c in a)a[c] ? this.attrs[c.toLowerCase()] = a[c] : delete this.attrs[c]; else b ? this.attrs[a.toLowerCase()] = b : delete this.attrs[a]; else delete this.attrs
            }, getIndex: function () {
                for (var a = this.parentNode, b = 0, c; c = a.children[b]; b++)if (c === this)return b;
                return -1
            }, getNodeById: function (a) {
                var b;
                if (this.children && this.children.length)for (var c = 0; b = this.children[c++];)if (b = e(b, a))return b
            }, getNodesByTagName: function (a) {
                a = p.trim(a).replace(/[ ]{2,}/g, " ").split(" ");
                var b = [], c =
                    this;
                p.each(a, function (a) {
                    if (c.children && c.children.length)for (var e = 0, g; g = c.children[e++];)h(g, a, b)
                });
                return b
            }, getStyle: function (a) {
                var b = this.getAttr("style");
                return b ? (a = b.match(new RegExp("(^|;)\\s*" + a + ":([^;]+)", "i"))) && a[0] ? a[2] : "" : ""
            }, setStyle: function (a, b) {
                function c(a, b) {
                    e = e.replace(new RegExp("(^|;)\\s*" + a + ":([^;]+;?)", "gi"), "$1");
                    b && (e = a + ":" + p.unhtml(b) + ";" + e)
                }

                var e = this.getAttr("style");
                e || (e = "");
                if (p.isObject(a))for (var g in a)c(g, a[g]); else c(a, b);
                this.setAttr("style", p.trim(e))
            }, traversal: function (a) {
                this.children &&
                this.children.length && g(this, a);
                return this
            }
        }
    })();
    UE.htmlparser = function (d, b) {
        function c(a, b) {
            if (n[a.tagName]) {
                var c = k.createElement(n[a.tagName]);
                a.appendChild(c);
                c.appendChild(k.createText(b))
            } else a.appendChild(k.createText(b))
        }

        function a(b, c, e) {
            var g;
            if (g = m[c]) {
                for (var d = b, f; "root" != d.type;) {
                    if (p.isArray(g) ? -1 != p.indexOf(g, d.tagName) : g == d.tagName) {
                        b = d;
                        f = !0;
                        break
                    }
                    d = d.parentNode
                }
                f || (b = a(b, p.isArray(g) ? g[0] : g))
            }
            g = new k({
                parentNode: b, type: "element", tagName: c.toLowerCase(), children: w.$empty[c] ? null :
                    []
            });
            if (e) {
                for (d = {}; f = h.exec(e);)d[f[1].toLowerCase()] = l[f[1].toLowerCase()] ? f[2] || f[3] || f[4] : p.unhtml(f[2] || f[3] || f[4]);
                g.attrs = d
            }
            b.children.push(g);
            return w.$empty[c] ? b : g
        }

        var e = /<(?:(?:\/([^>]+)>)|(?:!--([\S|\s]*?)--\x3e)|(?:([^\s\/<>]+)\s*((?:(?:"[^"]*")|(?:'[^']*')|[^"'<>])*)\/?>))/g, h = /([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g, g = {
            b: 1,
            code: 1,
            i: 1,
            u: 1,
            strike: 1,
            s: 1,
            tt: 1,
            strong: 1,
            q: 1,
            samp: 1,
            em: 1,
            span: 1,
            sub: 1,
            img: 1,
            sup: 1,
            font: 1,
            big: 1,
            small: 1,
            iframe: 1,
            a: 1,
            br: 1,
            pre: 1
        };
        d = d.replace(new RegExp(f.fillChar, "g"), "");
        b || (d = d.replace(new RegExp("[\\r\\t\\n" + (b ? "" : " ") + "]*</?(\\w+)\\s*(?:[^>]*)>[\\r\\t\\n" + (b ? "" : " ") + "]*", "g"), function (a, c) {
            return c && g[c.toLowerCase()] ? a.replace(/(^[\n\r]+)|([\n\r]+$)/g, "") : a.replace(new RegExp("^[\\r\\n" + (b ? "" : " ") + "]+"), "").replace(new RegExp("[\\r\\n" + (b ? "" : " ") + "]+$"), "")
        }));
        for (var l = {href: 1, src: 1}, k = UE.uNode, m = {
            td: "tr",
            tr: ["tbody", "thead", "tfoot"],
            tbody: "table",
            th: "tr",
            thead: "table",
            tfoot: "table",
            caption: "table",
            li: ["ul", "ol"],
            dt: "dl",
            dd: "dl",
            option: "select"
        }, n = {ol: "li", ul: "li"}, q, u = 0, x = 0, z = new k({type: "root", children: []}), v = z; q = e.exec(d);) {
            u = q.index;
            try {
                if (u > x && c(v, d.slice(x, u)), q[3])w.$cdata[v.tagName] ? c(v, q[0]) : v = a(v, q[3].toLowerCase(), q[4]); else if (q[1]) {
                    if ("root" != v.type)if (w.$cdata[v.tagName] && !w.$cdata[q[1]])c(v, q[0]); else {
                        for (u = v; "element" == v.type && v.tagName != q[1].toLowerCase();)if (v = v.parentNode, "root" == v.type)throw v = u, "break";
                        v = v.parentNode
                    }
                } else q[2] && v.children.push(new k({type: "comment", data: q[2], parentNode: v}))
            } catch (D) {
            }
            x =
                e.lastIndex
        }
        x < d.length && c(v, d.slice(x));
        return z
    };
    UE.filterNode = function () {
        function d(b, c) {
            switch (b.type) {
                case "element":
                    var a;
                    if (a = c[b.tagName])if ("-" === a)b.parentNode.removeChild(b); else if (p.isFunction(a)) {
                        var e = b.parentNode, h = b.getIndex();
                        a(b);
                        if (b.parentNode) {
                            if (b.children)for (a = 0; h = b.children[a];)d(h, c), h.parentNode && a++
                        } else for (a = h; h = e.children[a];)d(h, c), h.parentNode && a++
                    } else {
                        if ((a = a.$) && b.attrs) {
                            var h = {}, g;
                            for (e in a) {
                                g = b.getAttr(e);
                                if ("style" == e && p.isArray(a[e])) {
                                    var l = [];
                                    p.each(a[e],
                                        function (a) {
                                            var c;
                                            (c = b.getStyle(a)) && l.push(a + ":" + c)
                                        });
                                    g = l.join(";")
                                }
                                g && (h[e] = g)
                            }
                            b.attrs = h
                        }
                        if (b.children)for (a = 0; h = b.children[a];)d(h, c), h.parentNode && a++
                    } else if (w.$cdata[b.tagName])b.parentNode.removeChild(b); else for (e = b.parentNode, h = b.getIndex(), b.parentNode.removeChild(b, !0), a = h; h = e.children[a];)d(h, c), h.parentNode && a++;
                    break;
                case "comment":
                    b.parentNode.removeChild(b)
            }
        }

        return function (b, c) {
            if (p.isEmptyObject(c))return b;
            var a;
            (a = c["-"]) && p.each(a.split(" "), function (a) {
                c[a] = "-"
            });
            a = 0;
            for (var e; e =
                b.children[a];)d(e, c), e.parentNode && a++;
            return b
        }
    }();
    UE.plugin = function () {
        var d = {};
        return {
            register: function (b, c, a, e) {
                a && p.isFunction(a) && (e = a, a = null);
                d[b] = {optionName: a || b, execFn: c, afterDisabled: e}
            }, load: function (b) {
                p.each(d, function (c) {
                    var a = c.execFn.call(b);
                    !1 !== b.options[c.optionName] ? a && p.each(a, function (a, c) {
                        switch (c.toLowerCase()) {
                            case "shortcutkey":
                                b.addshortcutkey(a);
                                break;
                            case "bindevents":
                                p.each(a, function (a, c) {
                                    b.addListener(c, a)
                                });
                                break;
                            case "bindmultievents":
                                p.each(p.isArray(a) ? a : [a],
                                    function (a) {
                                        var c = p.trim(a.type).split(/\s+/);
                                        p.each(c, function (c) {
                                            b.addListener(c, a.handler)
                                        })
                                    });
                                break;
                            case "commands":
                                p.each(a, function (a, c) {
                                    b.commands[c] = a
                                });
                                break;
                            case "outputrule":
                                b.addOutputRule(a);
                                break;
                            case "inputrule":
                                b.addInputRule(a);
                                break;
                            case "defaultoptions":
                                b.setOpt(a)
                        }
                    }) : c.afterDisabled && c.afterDisabled.call(b)
                });
                p.each(UE.plugins, function (c) {
                    c.call(b)
                })
            }, run: function (b, c) {
                var a = d[b];
                a && a.exeFn.call(c)
            }
        }
    }();
    var ja = UE.keymap = {
        Backspace: 8,
        Tab: 9,
        Enter: 13,
        Shift: 16,
        Control: 17,
        Alt: 18,
        CapsLock: 20,
        Esc: 27,
        Spacebar: 32,
        PageUp: 33,
        PageDown: 34,
        End: 35,
        Home: 36,
        Left: 37,
        Up: 38,
        Right: 39,
        Down: 40,
        Insert: 45,
        Del: 46,
        NumLock: 144,
        Cmd: 91,
        "=": 187,
        "-": 189,
        b: 66,
        i: 73,
        z: 90,
        y: 89,
        v: 86,
        x: 88,
        s: 83,
        n: 78
    }, Z = UE.LocalStorage = function () {
        function d() {
            var a = document.createElement("div");
            a.style.display = "none";
            if (!a.addBehavior)return null;
            a.addBehavior("#default#userdata");
            return {
                getItem: function (b) {
                    var h = null;
                    try {
                        document.body.appendChild(a), a.load(c), h = a.getAttribute(b), document.body.removeChild(a)
                    } catch (g) {
                    }
                    return h
                }, setItem: function (b,
                                      h) {
                    document.body.appendChild(a);
                    a.setAttribute(b, h);
                    a.save(c);
                    document.body.removeChild(a)
                }, removeItem: function (b) {
                    document.body.appendChild(a);
                    a.removeAttribute(b);
                    a.save(c);
                    document.body.removeChild(a)
                }
            }
        }

        var b = window.localStorage || d() || null, c = "localStorage";
        return {
            saveLocalData: function (a, c) {
                return b && c ? (b.setItem(a, c), !0) : !1
            }, getLocalData: function (a) {
                return b ? b.getItem(a) : null
            }, removeItem: function (a) {
                b && b.removeItem(a)
            }
        }
    }();
    (function () {
        UE.Editor.prototype.setPreferences = function (d, b) {
            var c = {};
            p.isString(d) ? c[d] = b : c = d;
            var a = Z.getLocalData("ueditor_preference");
            a && (a = p.str2json(a)) ? p.extend(a, c) : a = c;
            a && Z.saveLocalData("ueditor_preference", p.json2str(a))
        };
        UE.Editor.prototype.getPreferences = function (d) {
            var b = Z.getLocalData("ueditor_preference");
            return b && (b = p.str2json(b)) ? d ? b[d] : b : null
        };
        UE.Editor.prototype.removePreferences = function (d) {
            var b = Z.getLocalData("ueditor_preference");
            b && (b = p.str2json(b)) && (b[d] = void 0, delete b[d]);
            b && Z.saveLocalData("ueditor_preference", p.json2str(b))
        }
    })();
    UE.plugins.defaultfilter =
        function () {
            var d = this;
            d.setOpt({allowDivTransToP: !0, disabledTableInTable: !0});
            d.addInputRule(function (b) {
                function c(a) {
                    for (; a && "element" == a.type;) {
                        if ("td" == a.tagName)return !0;
                        a = a.parentNode
                    }
                    return !1
                }

                var a = this.options.allowDivTransToP, e;
                b.traversal(function (b) {
                    if ("element" == b.type)if (w.$cdata[b.tagName] || !d.options.autoClearEmptyNode || !w.$inline[b.tagName] || w.$empty[b.tagName] || b.attrs && !p.isEmptyObject(b.attrs))switch (b.tagName) {
                        case "style":
                        case "script":
                            b.setAttr({
                                cdata_tag: b.tagName, cdata_data: b.innerHTML() ||
                                "", _ue_custom_node_: "true"
                            });
                            b.tagName = "div";
                            b.innerHTML("");
                            break;
                        case "a":
                            (e = b.getAttr("href")) && b.setAttr("_href", e);
                            break;
                        case "img":
                            if ((e = b.getAttr("src")) && /^data:/.test(e)) {
                                b.parentNode.removeChild(b);
                                break
                            }
                            b.setAttr("_src", b.getAttr("src"));
                            break;
                        case "span":
                            r.webkit && (e = b.getStyle("white-space")) && /nowrap|normal/.test(e) && (b.setStyle("white-space", ""), d.options.autoClearEmptyNode && p.isEmptyObject(b.attrs) && b.parentNode.removeChild(b, !0));
                            (e = b.getAttr("id")) && /^_baidu_bookmark_/i.test(e) &&
                            b.parentNode.removeChild(b);
                            break;
                        case "p":
                            if (e = b.getAttr("align"))b.setAttr("align"), b.setStyle("text-align", e);
                            p.each(b.children, function (a) {
                                if ("element" == a.type && "p" == a.tagName) {
                                    var c = a.nextSibling();
                                    for (b.parentNode.insertAfter(a, b); c;) {
                                        var e = c.nextSibling();
                                        b.parentNode.insertAfter(c, a);
                                        a = c;
                                        c = e
                                    }
                                    return !1
                                }
                            });
                            b.firstChild() || b.innerHTML(r.ie ? "&nbsp;" : "<br/>");
                            break;
                        case "div":
                            if (b.getAttr("cdata_tag"))break;
                            if ((e = b.getAttr("class")) && /^line number\d+/.test(e))break;
                            if (!a)break;
                            for (var g, l = UE.uNode.createElement("p"); g =
                                b.firstChild();)"text" != g.type && UE.dom.dtd.$block[g.tagName] ? l.firstChild() ? (b.parentNode.insertBefore(l, b), l = UE.uNode.createElement("p")) : b.parentNode.insertBefore(g, b) : l.appendChild(g);
                            l.firstChild() && b.parentNode.insertBefore(l, b);
                            b.parentNode.removeChild(b);
                            break;
                        case "dl":
                            b.tagName = "ul";
                            break;
                        case "dt":
                        case "dd":
                            b.tagName = "li";
                            break;
                        case "li":
                            (g = b.getAttr("class")) && /list\-/.test(g) || b.setAttr();
                            g = b.getNodesByTagName("ol ul");
                            UE.utils.each(g, function (a) {
                                b.parentNode.insertAfter(a, b)
                            });
                            break;
                        case "td":
                        case "th":
                        case "caption":
                            b.children && b.children.length || b.appendChild(r.ie11below ? UE.uNode.createText(" ") : UE.uNode.createElement("br"));
                            break;
                        case "table":
                            d.options.disabledTableInTable && c(b) && (b.parentNode.insertBefore(UE.uNode.createText(b.innerText()), b), b.parentNode.removeChild(b))
                    } else b.firstChild() ? "span" != b.tagName || b.attrs && !p.isEmptyObject(b.attrs) || b.parentNode.removeChild(b, !0) : b.parentNode.removeChild(b)
                })
            });
            d.addOutputRule(function (b) {
                var c;
                b.traversal(function (a) {
                    if ("element" ==
                        a.type)if (!d.options.autoClearEmptyNode || !w.$inline[a.tagName] || w.$empty[a.tagName] || a.attrs && !p.isEmptyObject(a.attrs))switch (a.tagName) {
                        case "div":
                            if (c = a.getAttr("cdata_tag"))a.tagName = c, a.appendChild(UE.uNode.createText(a.getAttr("cdata_data"))), a.setAttr({
                                cdata_tag: "",
                                cdata_data: "",
                                _ue_custom_node_: ""
                            });
                            break;
                        case "a":
                            (c = a.getAttr("_href")) && a.setAttr({href: p.html(c), _href: ""});
                            break;
                        case "span":
                            (c = a.getAttr("id")) && /^_baidu_bookmark_/i.test(c) && a.parentNode.removeChild(a);
                            break;
                        case "img":
                            (c =
                                a.getAttr("_src")) && a.setAttr({src: a.getAttr("_src"), _src: ""})
                    } else a.firstChild() ? "span" != a.tagName || a.attrs && !p.isEmptyObject(a.attrs) || a.parentNode.removeChild(a, !0) : a.parentNode.removeChild(a)
                })
            })
        };
    UE.commands.inserthtml = {
        execCommand: function (d, b, c) {
            var a = this, e;
            if (b && !0 !== a.fireEvent("beforeinserthtml", b)) {
                e = a.selection.getRange();
                d = e.document.createElement("div");
                d.style.display = "inline";
                c || (c = UE.htmlparser(b), a.options.filterRules && UE.filterNode(c, a.options.filterRules), a.filterInputRule(c),
                    b = c.toHtml());
                d.innerHTML = p.trim(b);
                if (!e.collapsed && (c = e.startContainer, f.isFillChar(c) && e.setStartBefore(c), c = e.endContainer, f.isFillChar(c) && e.setEndAfter(c), e.txtToElmBoundary(), e.endContainer && 1 == e.endContainer.nodeType && (c = e.endContainer.childNodes[e.endOffset]) && f.isBr(c) && e.setEndAfter(c), 0 == e.startOffset && (c = e.startContainer, f.isBoundaryNode(c, "firstChild") && (c = e.endContainer, e.endOffset == (3 == c.nodeType ? c.nodeValue.length : c.childNodes.length) && f.isBoundaryNode(c, "lastChild") && (a.body.innerHTML =
                        "<p>" + (r.ie ? "" : "<br/>") + "</p>", e.setStart(a.body.firstChild, 0).collapse(!0)))), !e.collapsed && e.deleteContents(), 1 == e.startContainer.nodeType)) {
                    c = e.startContainer.childNodes[e.startOffset];
                    var h;
                    if (c && f.isBlockElm(c) && (h = c.previousSibling) && f.isBlockElm(h)) {
                        for (e.setEnd(h, h.childNodes.length).collapse(); c.firstChild;)h.appendChild(c.firstChild);
                        f.remove(c)
                    }
                }
                var g, l, k = 0, m;
                e.inFillChar() && (c = e.startContainer, f.isFillChar(c) ? (e.setStartBefore(c).collapse(!0), f.remove(c)) : f.isFillChar(c, !0) && (c.nodeValue =
                    c.nodeValue.replace(Q, ""), e.startOffset--, e.collapsed && e.collapse(!0)));
                var n = f.findParentByTagName(e.startContainer, "li", !0);
                if (n) {
                    for (var q; c = d.firstChild;) {
                        for (; c && (3 == c.nodeType || !f.isBlockElm(c) || "HR" == c.tagName);)q = c.nextSibling, e.insertNode(c).collapse(), g = c, c = q;
                        if (c)if (/^(ol|ul)$/i.test(c.tagName)) {
                            for (; c.firstChild;)g = c.firstChild, f.insertAfter(n, c.firstChild), n = n.nextSibling;
                            f.remove(c)
                        } else q = c.nextSibling, h = a.document.createElement("li"), f.insertAfter(n, h), h.appendChild(c), g = c, c = q, n = h
                    }
                    n =
                        f.findParentByTagName(e.startContainer, "li", !0);
                    f.isEmptyBlock(n) && f.remove(n);
                    g && e.setStartAfter(g).collapse(!0).select(!0)
                } else {
                    for (; c = d.firstChild;) {
                        if (k) {
                            for (g = a.document.createElement("p"); c && (3 == c.nodeType || !w.$block[c.tagName]);)m = c.nextSibling, g.appendChild(c), c = m;
                            g.firstChild && (c = g)
                        }
                        e.insertNode(c);
                        m = c.nextSibling;
                        if (!k && c.nodeType == f.NODE_ELEMENT && f.isBlockElm(c) && (g = f.findParent(c, function (a) {
                                return f.isBlockElm(a)
                            })) && "body" != g.tagName.toLowerCase() && (!w[g.tagName][c.nodeName] || c.parentNode !==
                            g)) {
                            if (w[g.tagName][c.nodeName])for (l = c.parentNode; l !== g;)h = l, l = l.parentNode; else h = g;
                            f.breakParent(c, h || l);
                            h = c.previousSibling;
                            f.trimWhiteTextNode(h);
                            h.childNodes.length || f.remove(h);
                            !r.ie && (q = c.nextSibling) && f.isBlockElm(q) && q.lastChild && !f.isBr(q.lastChild) && q.appendChild(a.document.createElement("br"));
                            k = 1
                        }
                        q = c.nextSibling;
                        if (!d.firstChild && q && f.isBlockElm(q)) {
                            e.setStart(q, 0).collapse(!0);
                            break
                        }
                        e.setEndAfter(c).collapse()
                    }
                    c = e.startContainer;
                    m && f.isBr(m) && f.remove(m);
                    if (f.isBlockElm(c) && f.isEmptyNode(c))if (m =
                            c.nextSibling)f.remove(c), 1 == m.nodeType && w.$block[m.tagName] && e.setStart(m, 0).collapse(!0).shrinkBoundary(); else try {
                        c.innerHTML = r.ie ? f.fillChar : "<br/>"
                    } catch (u) {
                        e.setStartBefore(c), f.remove(c)
                    }
                    try {
                        e.select(!0)
                    } catch (x) {
                    }
                }
                setTimeout(function () {
                    e = a.selection.getRange();
                    e.scrollToView(a.autoHeightEnabled, a.autoHeightEnabled ? f.getXY(a.iframe).y : 0);
                    a.fireEvent("afterinserthtml", b)
                }, 200)
            }
        }
    };
    UE.plugins.autotypeset = function () {
        function d(a, b) {
            if (!a || 3 == a.nodeType)return 0;
            if (f.isBr(a))return 1;
            if (a && a.parentNode &&
                k[a.tagName.toLowerCase()])return m && m.contains(a) || a.getAttribute("pagebreak") ? 0 : b ? !f.isEmptyBlock(a) : f.isEmptyBlock(a, new RegExp("[\\s" + f.fillChar + "]", "g"))
        }

        function b(a) {
            a.style.cssText || (f.removeAttributes(a, ["style"]), "span" == a.tagName.toLowerCase() && f.hasNoAttributes(a) && f.remove(a, !0))
        }

        function c(a, c) {
            var e;
            if (c) {
                if (!h.pasteFilter)return;
                e = this.document.createElement("div");
                e.innerHTML = c.html
            } else e = this.document.body;
            for (var k = f.getElementsByTagName(e, "*"), z = 0, v; v = k[z++];)if (!0 !== this.fireEvent("excludeNodeinautotype",
                    v)) {
                h.clearFontSize && v.style.fontSize && (f.removeStyle(v, "font-size"), b(v));
                h.clearFontFamily && v.style.fontFamily && (f.removeStyle(v, "font-family"), b(v));
                if (d(v)) {
                    if (h.mergeEmptyline)for (var D = v.nextSibling, F, H = f.isBr(v); d(D);) {
                        F = D;
                        D = F.nextSibling;
                        if (H && (!D || D && !f.isBr(D)))break;
                        f.remove(F)
                    }
                    if (h.removeEmptyline && f.inDoc(v, e) && !l[v.parentNode.tagName.toLowerCase()]) {
                        if (f.isBr(v) && (D = v.nextSibling) && !f.isBr(D))continue;
                        f.remove(v);
                        continue
                    }
                }
                d(v, !0) && "SPAN" != v.tagName && (h.indent && (v.style.textIndent = h.indentValue),
                h.textAlign && (v.style.textAlign = h.textAlign));
                if (h.removeClass && v.className && !g[v.className.toLowerCase()]) {
                    if (m && m.contains(v))continue;
                    f.removeAttributes(v, ["class"])
                }
                if (h.imageBlockLine && "img" == v.tagName.toLowerCase() && !v.getAttribute("emotion"))if (c)switch (H = v, h.imageBlockLine) {
                    case "left":
                    case "right":
                    case "none":
                        for (var D = H.parentNode, r; w.$inline[D.tagName] || "A" == D.tagName;)D = D.parentNode;
                        F = D;
                        if ("P" == F.tagName && "center" == f.getStyle(F, "text-align") && !f.isBody(F) && 1 == f.getChildCount(F, function (a) {
                                return !f.isBr(a) && !f.isWhitespace(a)
                            }))if (r = F.previousSibling, D = F.nextSibling, r && D && 1 == r.nodeType && 1 == D.nodeType && r.tagName == D.tagName && f.isBlockElm(r)) {
                            for (r.appendChild(F.firstChild); D.firstChild;)r.appendChild(D.firstChild);
                            f.remove(F);
                            f.remove(D)
                        } else f.setStyle(F, "text-align", "");
                        f.setStyle(H, "float", h.imageBlockLine);
                        break;
                    case "center":
                        if ("center" != this.queryCommandValue("imagefloat")) {
                            D = H.parentNode;
                            f.setStyle(H, "float", "none");
                            for (F = H; D && 1 == f.getChildCount(D, function (a) {
                                return !f.isBr(a) && !f.isWhitespace(a)
                            }) &&
                            (w.$inline[D.tagName] || "A" == D.tagName);)F = D, D = D.parentNode;
                            D = this.document.createElement("p");
                            f.setAttributes(D, {style: "text-align:center"});
                            F.parentNode.insertBefore(D, F);
                            D.appendChild(F);
                            f.setStyle(F, "float", "")
                        }
                } else this.selection.getRange().selectNode(v).select(), this.execCommand("imagefloat", h.imageBlockLine);
                h.removeEmptyNode && h.removeTagNames[v.tagName.toLowerCase()] && f.hasNoAttributes(v) && f.isEmptyBlock(v) && f.remove(v)
            }
            h.tobdc && (k = UE.htmlparser(e.innerHTML), k.traversal(function (a) {
                if ("text" ==
                    a.type) {
                    for (var b = a.data, b = p.html(b), c = "", e = 0; e < b.length; e++)c = 32 == b.charCodeAt(e) ? c + String.fromCharCode(12288) : 127 > b.charCodeAt(e) ? c + String.fromCharCode(b.charCodeAt(e) + 65248) : c + b.charAt(e);
                    a.data = c
                }
            }), e.innerHTML = k.toHtml());
            h.bdc2sb && (k = UE.htmlparser(e.innerHTML), k.traversal(function (a) {
                if ("text" == a.type) {
                    for (var b = a.data, c = "", e = 0; e < b.length; e++)var g = b.charCodeAt(e), c = 65281 <= g && 65373 >= g ? c + String.fromCharCode(b.charCodeAt(e) - 65248) : 12288 == g ? c + String.fromCharCode(b.charCodeAt(e) - 12288 + 32) : c + b.charAt(e);
                    a.data = c
                }
            }), e.innerHTML = k.toHtml());
            c && (c.html = e.innerHTML)
        }

        function a() {
            var a = e.getPreferences("autotypeset");
            p.extend(e.options.autotypeset, a)
        }

        this.setOpt({
            autotypeset: {
                mergeEmptyline: !0,
                removeClass: !0,
                removeEmptyline: !1,
                textAlign: "left",
                imageBlockLine: "center",
                pasteFilter: !1,
                clearFontSize: !1,
                clearFontFamily: !1,
                removeEmptyNode: !1,
                removeTagNames: p.extend({div: 1}, w.$removeEmpty),
                indent: !1,
                indentValue: "2em",
                bdc2sb: !1,
                tobdc: !1
            }
        });
        var e = this, h = e.options.autotypeset, g = {selectTdClass: 1, pagebreak: 1, anchorclass: 1},
            l = {li: 1}, k = {
                div: 1,
                p: 1,
                blockquote: 1,
                center: 1,
                h1: 1,
                h2: 1,
                h3: 1,
                h4: 1,
                h5: 1,
                h6: 1,
                span: 1
            }, m;
        h && (a(), h.pasteFilter && e.addListener("beforepaste", c), e.commands.autotypeset = {
            execCommand: function () {
                e.removeListener("beforepaste", c);
                h.pasteFilter && e.addListener("beforepaste", c);
                c.call(e)
            }
        })
    };
    UE.plugin.register("autosubmit", function () {
        return {
            shortcutkey: {autosubmit: "ctrl+13"}, commands: {
                autosubmit: {
                    execCommand: function () {
                        var d = f.findParentByTagName(this.iframe, "form", !1);
                        d && !1 !== this.fireEvent("beforesubmit") && (this.sync(),
                            d.submit())
                    }
                }
            }
        }
    });
    UE.plugin.register("background", function () {
        function d(a) {
            var b = {};
            a = a.split(";");
            p.each(a, function (a) {
                var c = a.indexOf(":"), e = p.trim(a.substr(0, c)).toLowerCase();
                e && (b[e] = p.trim(a.substr(c + 1) || ""))
            });
            return b
        }

        function b(a) {
            if (a) {
                var b = [], e;
                for (e in a)a.hasOwnProperty(e) && b.push(e + ":" + a[e] + "; ");
                p.cssRule("editor_background", b.length ? "body{" + b.join("") + "}" : "", c.document)
            } else p.cssRule("editor_background", "", c.document)
        }

        var c = this, a, e = /body[\s]*\{(.+)\}/i, h = c.hasContents;
        c.hasContents =
            function () {
                return c.queryCommandValue("background") ? !0 : h.apply(c, arguments)
            };
        return {
            bindEvents: {
                getAllHtml: function (a, b) {
                    var e = this.body, h = f.getComputedStyle(e, "background-image"), d = "", d = 0 < h.indexOf(c.options.imagePath) ? h.substring(h.indexOf(c.options.imagePath), h.length - 1).replace(/"|\(|\)/ig, "") : "none" != h ? h.replace(/url\("?|"?\)/ig, "") : "", h = '<style type="text/css">body{', e = {
                        "background-color": f.getComputedStyle(e, "background-color") || "#ffffff",
                        "background-image": d ? "url(" + d + ")" : "",
                        "background-repeat": f.getComputedStyle(e,
                            "background-repeat") || "",
                        "background-position": r.ie ? f.getComputedStyle(e, "background-position-x") + " " + f.getComputedStyle(e, "background-position-y") : f.getComputedStyle(e, "background-position"),
                        height: f.getComputedStyle(e, "height")
                    }, q;
                    for (q in e)e.hasOwnProperty(q) && (h += q + ":" + e[q] + "; ");
                    b.push(h + "}</style> ")
                }, aftersetcontent: function () {
                    0 == a && b()
                }
            }, inputRule: function (c) {
                a = !1;
                p.each(c.getNodesByTagName("p"), function (c) {
                    var e = c.getAttr("data-background");
                    e && (a = !0, b(d(e)), c.parentNode.removeChild(c))
                })
            },
            outputRule: function (a) {
                var b = (p.cssRule("editor_background", this.document) || "").replace(/[\n\r]+/g, "").match(e);
                b && a.appendChild(UE.uNode.createElement('<p style="display:none;" data-background="' + p.trim(b[1].replace(/"/g, "").replace(/[\s]+/g, " ")) + '"><br/></p>'))
            }, commands: {
                background: {
                    execCommand: function (a, c) {
                        b(c)
                    }, queryCommandValue: function () {
                        var a = (p.cssRule("editor_background", this.document) || "").replace(/[\n\r]+/g, "").match(e);
                        return a ? d(a[1]) : null
                    }, notNeedUndo: !0
                }
            }
        }
    });
    UE.commands.imagefloat =
    {
        execCommand: function (d, b) {
            var c = this.selection.getRange();
            if (!c.collapsed) {
                var a = c.getClosedNode();
                if (a && "IMG" == a.tagName)switch (b) {
                    case "left":
                    case "right":
                    case "none":
                        for (var e = a.parentNode, h, g; w.$inline[e.tagName] || "A" == e.tagName;)e = e.parentNode;
                        h = e;
                        if ("P" == h.tagName && "center" == f.getStyle(h, "text-align")) {
                            if (!f.isBody(h) && 1 == f.getChildCount(h, function (a) {
                                    return !f.isBr(a) && !f.isWhitespace(a)
                                }))if (e = h.previousSibling, g = h.nextSibling, e && g && 1 == e.nodeType && 1 == g.nodeType && e.tagName == g.tagName && f.isBlockElm(e)) {
                                for (e.appendChild(h.firstChild); g.firstChild;)e.appendChild(g.firstChild);
                                f.remove(h);
                                f.remove(g)
                            } else f.setStyle(h, "text-align", "");
                            c.selectNode(a).select()
                        }
                        f.setStyle(a, "float", "none" == b ? "" : b);
                        "none" == b && f.removeAttributes(a, "align");
                        break;
                    case "center":
                        if ("center" != this.queryCommandValue("imagefloat")) {
                            e = a.parentNode;
                            f.setStyle(a, "float", "");
                            f.removeAttributes(a, "align");
                            for (h = a; e && 1 == f.getChildCount(e, function (a) {
                                return !f.isBr(a) && !f.isWhitespace(a)
                            }) && (w.$inline[e.tagName] || "A" == e.tagName);)h = e, e = e.parentNode;
                            c.setStartBefore(h).setCursor(!1);
                            e = this.document.createElement("div");
                            e.appendChild(h);
                            f.setStyle(h, "float", "");
                            this.execCommand("insertHtml", '<p id="_img_parent_tmp" style="text-align:center">' + e.innerHTML + "</p>");
                            h = this.document.getElementById("_img_parent_tmp");
                            h.removeAttribute("id");
                            h = h.firstChild;
                            c.selectNode(h).select();
                            (g = h.parentNode.nextSibling) && f.isEmptyNode(g) && f.remove(g)
                        }
                }
            }
        }, queryCommandValue: function () {
        var d = this.selection.getRange(), b;
        return d.collapsed ? "none" : (d = d.getClosedNode()) && 1 == d.nodeType && "IMG" == d.tagName ? (b = f.getComputedStyle(d, "float") ||
            d.getAttribute("align"), "none" == b && (b = "center" == f.getComputedStyle(d.parentNode, "text-align") ? "center" : b), {
            left: 1,
            right: 1,
            center: 1
        }[b] ? b : "none") : "none"
    }, queryCommandState: function () {
        var d = this.selection.getRange();
        return d.collapsed ? -1 : (d = d.getClosedNode()) && 1 == d.nodeType && "IMG" == d.tagName ? 0 : -1
    }
    };
    UE.commands.insertimage = {
        execCommand: function (d, b) {
            b = p.isArray(b) ? b : [b];
            if (b.length) {
                var c = this.selection.getRange(), a = c.getClosedNode();
                if (!0 !== this.fireEvent("beforeinsertimage", b)) {
                    if (!a || !/img/i.test(a.tagName) ||
                        "edui-faked-video" == a.className && -1 == a.className.indexOf("edui-upload-video") || a.getAttribute("word_img")) {
                        var c = [], a = "", e;
                        e = b[0];
                        if (1 == b.length)a = '<img src="' + e.src + '" ' + (e._src ? ' _src="' + e._src + '" ' : "") + (e.width ? 'width="' + e.width + '" ' : "") + (e.height ? ' height="' + e.height + '" ' : "") + ("left" == e.floatStyle || "right" == e.floatStyle ? ' style="float:' + e.floatStyle + ';"' : "") + (e.title && "" != e.title ? ' title="' + e.title + '"' : "") + (e.border && "0" != e.border ? ' border="' + e.border + '"' : "") + (e.alt && "" != e.alt ? ' alt="' + e.alt +
                            '"' : "") + (e.hspace && "0" != e.hspace ? ' hspace = "' + e.hspace + '"' : "") + (e.vspace && "0" != e.vspace ? ' vspace = "' + e.vspace + '"' : "") + "/>", "center" == e.floatStyle && (a = '<p style="text-align: center">' + a + "</p>"), c.push(a); else for (var h = 0; e = b[h++];)a = "<p " + ("center" == e.floatStyle ? 'style="text-align: center" ' : "") + '><img src="' + e.src + '" ' + (e.width ? 'width="' + e.width + '" ' : "") + (e._src ? ' _src="' + e._src + '" ' : "") + (e.height ? ' height="' + e.height + '" ' : "") + ' style="' + (e.floatStyle && "center" != e.floatStyle ? "float:" + e.floatStyle +
                            ";" : "") + (e.border || "") + '" ' + (e.title ? ' title="' + e.title + '"' : "") + " /></p>", c.push(a);
                        this.execCommand("insertHtml", c.join(""))
                    } else e = b.shift(), h = e.floatStyle, delete e.floatStyle, f.setAttributes(a, e), this.execCommand("imagefloat", h), 0 < b.length && (c.setStartAfter(a).setCursor(!1, !0), this.execCommand("insertimage", b));
                    this.fireEvent("afterinsertimage", b)
                }
            }
        }
    };
    UE.plugins.justify = function () {
        var d = f.isBlockElm, b = {left: 1, right: 1, center: 1, justify: 1}, c = function (a, b) {
            var c = a.createBookmark(), g = function (a) {
                return 1 ==
                a.nodeType ? "br" != a.tagName.toLowerCase() && !f.isBookmarkNode(a) : !f.isWhitespace(a)
            };
            a.enlarge(!0);
            for (var l = a.createBookmark(), k = f.getNextDomNode(l.start, !1, g), m = a.cloneRange(), n; k && !(f.getPosition(k, l.end) & f.POSITION_FOLLOWING);)if (3 != k.nodeType && d(k))k = f.getNextDomNode(k, !0, g); else {
                for (m.setStartBefore(k); k && k !== l.end && !d(k);)n = k, k = f.getNextDomNode(k, !1, null, function (a) {
                    return !d(a)
                });
                m.setEndAfter(n);
                k = m.getCommonAncestor();
                if (!f.isBody(k) && d(k))f.setStyles(k, p.isString(b) ? {"text-align": b} : b); else {
                    k =
                        a.document.createElement("p");
                    f.setStyles(k, p.isString(b) ? {"text-align": b} : b);
                    var q = m.extractContents();
                    k.appendChild(q);
                    m.insertNode(k)
                }
                k = f.getNextDomNode(k, !1, g)
            }
            return a.moveToBookmark(l).moveToBookmark(c)
        };
        UE.commands.justify = {
            execCommand: function (a, b) {
                var h = this.selection.getRange(), g;
                h.collapsed && (g = this.document.createTextNode("p"), h.insertNode(g));
                c(h, b);
                g && (h.setStartBefore(g).collapse(!0), f.remove(g));
                h.select();
                return !0
            }, queryCommandValue: function () {
                var a = this.selection.getStart(), a = f.getComputedStyle(a,
                    "text-align");
                return b[a] ? a : "left"
            }, queryCommandState: function () {
                var a = this.selection.getStart();
                return a && f.findParentByTagName(a, ["td", "th", "caption"], !0) ? -1 : 0
            }
        }
    };
    UE.plugins.font = function () {
        function d(a) {
            for (var b; b = a.parentNode;)if ("SPAN" == b.tagName && 1 == f.getChildCount(b, function (a) {
                    return !f.isBookmarkNode(a) && !f.isBr(a)
                }))b.style.cssText += a.style.cssText, f.remove(a, !0), a = b; else break
        }

        function b(a, b, c) {
            if (h[b] && (a.adjustmentBoundary(), !a.collapsed && 1 == a.startContainer.nodeType)) {
                var e = a.startContainer.childNodes[a.startOffset];
                if (e && f.isTagNode(e, "span")) {
                    var g = a.createBookmark();
                    p.each(f.getElementsByTagName(e, "span"), function (a) {
                        !a.parentNode || f.isBookmarkNode(a) || "backcolor" == b && f.getComputedStyle(a, "background-color").toLowerCase() === c || (f.removeStyle(a, h[b]), 0 == a.style.cssText.replace(/^\s+$/, "").length && f.remove(a, !0))
                    });
                    a.moveToBookmark(g)
                }
            }
        }

        function c(a, c, e) {
            var g = a.collapsed, h = a.createBookmark();
            if (g)for (g = h.start.parentNode; w.$inline[g.tagName];)g = g.parentNode; else g = f.getCommonAncestor(h.start, h.end);
            p.each(f.getElementsByTagName(g,
                "span"), function (a) {
                if (a.parentNode && !f.isBookmarkNode(a))if (/\s*border\s*:\s*none;?\s*/i.test(a.style.cssText))/^\s*border\s*:\s*none;?\s*$/.test(a.style.cssText) ? f.remove(a, !0) : f.removeStyle(a, "border"); else {
                    /border/i.test(a.style.cssText) && "SPAN" == a.parentNode.tagName && /border/i.test(a.parentNode.style.cssText) && (a.style.cssText = a.style.cssText.replace(/border[^:]*:[^;]+;?/gi, ""));
                    if ("fontborder" != c || "none" != e)for (var b = a.nextSibling; b && 1 == b.nodeType && "SPAN" == b.tagName;) {
                        if (f.isBookmarkNode(b) &&
                            "fontborder" == c)a.appendChild(b); else if (b.style.cssText == a.style.cssText && (f.moveChild(b, a), f.remove(b)), a.nextSibling === b)break;
                        b = a.nextSibling
                    }
                    d(a);
                    r.ie && 8 < r.version && (b = f.findParent(a, function (a) {
                        return "SPAN" == a.tagName && /background-color/.test(a.style.cssText)
                    })) && !/background-color/.test(a.style.cssText) && (a.style.backgroundColor = b.style.backgroundColor)
                }
            });
            a.moveToBookmark(h);
            b(a, c, e)
        }

        var a = {
            forecolor: "color",
            backcolor: "background-color",
            fontsize: "font-size",
            fontfamily: "font-family",
            underline: "text-decoration",
            strikethrough: "text-decoration",
            fontborder: "border"
        }, e = {underline: 1, strikethrough: 1, fontborder: 1}, h = {
            forecolor: "color",
            backcolor: "background-color",
            fontsize: "font-size",
            fontfamily: "font-family"
        };
        this.setOpt({
            fontfamily: [{name: "songti", val: "\u5b8b\u4f53,SimSun"}, {
                name: "yahei",
                val: "\u5fae\u8f6f\u96c5\u9ed1,Microsoft YaHei"
            }, {name: "kaiti", val: "\u6977\u4f53,\u6977\u4f53_GB2312, SimKai"}, {
                name: "heiti",
                val: "\u9ed1\u4f53, SimHei"
            }, {name: "lishu", val: "\u96b6\u4e66, SimLi"}, {name: "andaleMono", val: "andale mono"},
                {name: "arial", val: "arial, helvetica,sans-serif"}, {
                    name: "arialBlack",
                    val: "arial black,avant garde"
                }, {name: "comicSansMs", val: "comic sans ms"}, {
                    name: "impact",
                    val: "impact,chicago"
                }, {name: "timesNewRoman", val: "times new roman"}], fontsize: [10, 11, 12, 14, 16, 18, 20, 24, 36]
        });
        this.addInputRule(function (a) {
            p.each(a.getNodesByTagName("u s del font strike"), function (a) {
                if ("font" == a.tagName) {
                    var b = [], c;
                    for (c in a.attrs)switch (c) {
                        case "size":
                            b.push("font-size:" + ({
                                    1: "10",
                                    2: "12",
                                    3: "16",
                                    4: "18",
                                    5: "24",
                                    6: "32",
                                    7: "48"
                                }[a.attrs[c]] ||
                                a.attrs[c]) + "px");
                            break;
                        case "color":
                            b.push("color:" + a.attrs[c]);
                            break;
                        case "face":
                            b.push("font-family:" + a.attrs[c]);
                            break;
                        case "style":
                            b.push(a.attrs[c])
                    }
                    a.attrs = {style: b.join(";")}
                } else b = "u" == a.tagName ? "underline" : "line-through", a.attrs = {style: (a.getAttr("style") || "") + "text-decoration:" + b + ";"};
                a.tagName = "span"
            })
        });
        for (var g in a)(function (a, b) {
            UE.commands[a] = {
                execCommand: function (g, h) {
                    h = h || (this.queryCommandState(g) ? "none" : "underline" == g ? "underline" : "fontborder" == g ? "1px solid #000" : "line-through");
                    var d = this.selection.getRange(), u;
                    if ("default" == h)d.collapsed && (u = this.document.createTextNode("font"), d.insertNode(u).select()), this.execCommand("removeFormat", "span,a", b), u && (d.setStartBefore(u).collapse(!0), f.remove(u)), c(d, g, h), d.select(); else if (d.collapsed) {
                        var x = f.findParentByTagName(d.startContainer, "span", !0);
                        u = this.document.createTextNode("font");
                        if (!x || x.children.length || x[r.ie ? "innerText" : "textContent"].replace(Q, "").length) {
                            d.insertNode(u);
                            d.selectNode(u).select();
                            x = d.document.createElement("span");
                            if (e[a]) {
                                if (f.findParentByTagName(u, "a", !0)) {
                                    d.setStartBefore(u).setCursor();
                                    f.remove(u);
                                    return
                                }
                                this.execCommand("removeFormat", "span,a", b)
                            }
                            x.style.cssText = b + ":" + h;
                            u.parentNode.insertBefore(x, u);
                            if (!r.ie || r.ie && 9 == r.version)for (var z = x.parentNode; !f.isBlockElm(z);)"SPAN" == z.tagName && (x.style.cssText = z.style.cssText + ";" + x.style.cssText), z = z.parentNode;
                            ma ? setTimeout(function () {
                                d.setStart(x, 0).collapse(!0);
                                c(d, g, h);
                                d.select()
                            }) : (d.setStart(x, 0).collapse(!0), c(d, g, h), d.select())
                        } else d.insertNode(u),
                        e[a] && (d.selectNode(u).select(), this.execCommand("removeFormat", "span,a", b, null), x = f.findParentByTagName(u, "span", !0), d.setStartBefore(u)), x && (x.style.cssText += ";" + b + ":" + h), d.collapse(!0).select();
                        f.remove(u)
                    } else e[a] && this.queryCommandValue(a) && this.execCommand("removeFormat", "span,a", b), d = this.selection.getRange(), d.applyInlineStyle("span", {style: b + ":" + h}), c(d, g, h), d.select();
                    return !0
                }, queryCommandValue: function (a) {
                    var c = this.selection.getStart();
                    if ("underline" == a || "strikethrough" == a) {
                        for (var e =
                            c; e && !f.isBlockElm(e) && !f.isBody(e);) {
                            if (1 == e.nodeType && (a = f.getComputedStyle(e, b), "none" != a))return a;
                            e = e.parentNode
                        }
                        return "none"
                    }
                    if ("fontborder" == a) {
                        for (a = c; a && w.$inline[a.tagName];) {
                            if ((e = f.getComputedStyle(a, "border")) && /1px/.test(e) && /solid/.test(e))return e;
                            a = a.parentNode
                        }
                        return ""
                    }
                    return "FontSize" == a ? (e = f.getComputedStyle(c, b), (a = /^([\d\.]+)(\w+)$/.exec(e)) ? Math.floor(a[1]) + a[2] : e) : f.getComputedStyle(c, b)
                }, queryCommandState: function (a) {
                    if (!e[a])return 0;
                    var b = this.queryCommandValue(a);
                    return "fontborder" ==
                    a ? /1px/.test(b) && /solid/.test(b) : "underline" == a ? /underline/.test(b) : /line\-through/.test(b)
                }
            }
        })(g, a[g])
    };
    UE.plugins.link = function () {
        function d(b) {
            var c = b.startContainer, a = b.endContainer;
            (c = f.findParentByTagName(c, "a", !0)) && b.setStartBefore(c);
            (a = f.findParentByTagName(a, "a", !0)) && b.setEndAfter(a)
        }

        UE.commands.unlink = {
            execCommand: function () {
                var b = this.selection.getRange(), c;
                if (!b.collapsed || f.findParentByTagName(b.startContainer, "a", !0))c = b.createBookmark(), d(b), b.removeInlineStyle("a").moveToBookmark(c).select()
            },
            queryCommandState: function () {
                return !this.highlight && this.queryCommandValue("link") ? 0 : -1
            }
        };
        UE.commands.link = {
            execCommand: function (b, c) {
                var a;
                c._href && (c._href = p.unhtml(c._href, /[<">]/g));
                c.href && (c.href = p.unhtml(c.href, /[<">]/g));
                c.textValue && (c.textValue = p.unhtml(c.textValue, /[<">]/g));
                var e = a = this.selection.getRange(), h = e.cloneRange(), g = this.queryCommandValue("link");
                d(e = e.adjustmentBoundary());
                var l = e.startContainer;
                1 == l.nodeType && g && (l = l.childNodes[e.startOffset]) && 1 == l.nodeType && "A" == l.tagName &&
                /^(?:https?|ftp|file)\s*:\s*\/\//.test(l[r.ie ? "innerText" : "textContent"]) && (l[r.ie ? "innerText" : "textContent"] = p.html(c.textValue || c.href));
                if (!h.collapsed || g)e.removeInlineStyle("a"), h = e.cloneRange();
                if (h.collapsed) {
                    var g = e.document.createElement("a"), k = "";
                    c.textValue ? (k = p.html(c.textValue), delete c.textValue) : k = p.html(c.href);
                    f.setAttributes(g, c);
                    (l = f.findParentByTagName(h.startContainer, "a", !0)) && f.isInNodeEndBoundary(h, l) && e.setStartAfter(l).collapse(!0);
                    g[r.ie ? "innerText" : "textContent"] = k;
                    e.insertNode(g).selectNode(g)
                } else e.applyInlineStyle("a",
                    c);
                a.collapse().select(!0)
            }, queryCommandValue: function () {
                var b = this.selection.getRange(), c;
                if (b.collapsed) {
                    if (c = b.startContainer, (c = 1 == c.nodeType ? c : c.parentNode) && (c = f.findParentByTagName(c, "a", !0)) && !f.isInNodeEndBoundary(b, c))return c
                } else {
                    b.shrinkBoundary();
                    var a = 3 != b.startContainer.nodeType && b.startContainer.childNodes[b.startOffset] ? b.startContainer.childNodes[b.startOffset] : b.startContainer, e = 3 == b.endContainer.nodeType || 0 == b.endOffset ? b.endContainer : b.endContainer.childNodes[b.endOffset - 1],
                        b = b.getCommonAncestor();
                    c = f.findParentByTagName(b, "a", !0);
                    if (!c && 1 == b.nodeType)for (var b = b.getElementsByTagName("a"), h, g, d = 0, k; k = b[d++];)if (h = f.getPosition(k, a), g = f.getPosition(k, e), (h & f.POSITION_FOLLOWING || h & f.POSITION_CONTAINS) && (g & f.POSITION_PRECEDING || g & f.POSITION_CONTAINS)) {
                        c = k;
                        break
                    }
                    return c
                }
            }, queryCommandState: function () {
                var b = this.selection.getRange().getClosedNode();
                return !b || "edui-faked-video" != b.className && -1 == b.className.indexOf("edui-upload-video") ? 0 : -1
            }
        }
    };
    UE.plugins.insertframe = function () {
        var d =
            this;
        d.addListener("selectionchange", function () {
            d._iframe && delete d._iframe
        })
    };
    UE.commands.scrawl = {
        queryCommandState: function () {
            return r.ie && 8 >= r.version ? -1 : 0
        }
    };
    UE.plugins.removeformat = function () {
        this.setOpt({
            removeFormatTags: "b,big,code,del,dfn,em,font,i,ins,kbd,q,samp,small,span,strike,strong,sub,sup,tt,u,var",
            removeFormatAttributes: "class,style,lang,width,height,align,hspace,valign"
        });
        this.commands.removeformat = {
            execCommand: function (d, b, c, a, e) {
                function h(a) {
                    if (3 == a.nodeType || "span" != a.tagName.toLowerCase())return 0;
                    if (r.ie) {
                        var b = a.attributes;
                        if (b.length) {
                            a = 0;
                            for (var c = b.length; a < c; a++)if (b[a].specified)return 0;
                            return 1
                        }
                    }
                    return !a.attributes.length
                }

                var g = new RegExp("^(?:" + (b || this.options.removeFormatTags).replace(/,/g, "|") + ")$", "i"), l = c ? [] : (a || this.options.removeFormatAttributes).split(",");
                d = new M.Range(this.document);
                var k, m, n = function (a) {
                    return 1 == a.nodeType
                };
                d = this.selection.getRange();
                (function (a) {
                    var b = a.createBookmark();
                    a.collapsed && a.enlarge(!0);
                    if (!e) {
                        var d = f.findParentByTagName(a.startContainer, "a",
                            !0);
                        d && a.setStartBefore(d);
                        (d = f.findParentByTagName(a.endContainer, "a", !0)) && a.setEndAfter(d)
                    }
                    k = a.createBookmark();
                    for (d = k.start; (m = d.parentNode) && !f.isBlockElm(m);)f.breakParent(d, m), f.clearEmptySibling(d);
                    if (k.end) {
                        for (d = k.end; (m = d.parentNode) && !f.isBlockElm(m);)f.breakParent(d, m), f.clearEmptySibling(d);
                        for (var d = f.getNextDomNode(k.start, !1, n), z; d && d != k.end;)z = f.getNextDomNode(d, !0, n), w.$empty[d.tagName.toLowerCase()] || f.isBookmarkNode(d) || (g.test(d.tagName) ? c ? (f.removeStyle(d, c), h(d) && "text-decoration" !=
                        c && f.remove(d, !0)) : f.remove(d, !0) : w.$tableContent[d.tagName] || w.$list[d.tagName] || (f.removeAttributes(d, l), h(d) && f.remove(d, !0))), d = z
                    }
                    d = k.start.parentNode;
                    !f.isBlockElm(d) || w.$tableContent[d.tagName] || w.$list[d.tagName] || f.removeAttributes(d, l);
                    d = k.end.parentNode;
                    k.end && f.isBlockElm(d) && !w.$tableContent[d.tagName] && !w.$list[d.tagName] && f.removeAttributes(d, l);
                    a.moveToBookmark(k).moveToBookmark(b);
                    d = a.startContainer;
                    for (z = a.collapsed; 1 == d.nodeType && f.isEmptyNode(d) && w.$removeEmpty[d.tagName];)b = d.parentNode,
                        a.setStartBefore(d), a.startContainer === a.endContainer && a.endOffset--, f.remove(d), d = b;
                    if (!z)for (d = a.endContainer; 1 == d.nodeType && f.isEmptyNode(d) && w.$removeEmpty[d.tagName];)b = d.parentNode, a.setEndBefore(d), f.remove(d), d = b
                })(d);
                d.select()
            }
        }
    };
    UE.plugins.blockquote = function () {
        this.commands.blockquote = {
            execCommand: function (d, b) {
                var c = this.selection.getRange(), a = f.filterNodeList(this.selection.getStartElementPath(), "blockquote"), e = w.blockquote, h = c.createBookmark();
                if (a) {
                    var e = c.startContainer, e = f.isBlockElm(e) ?
                        e : f.findParent(e, function (a) {
                        return f.isBlockElm(a)
                    }), g = c.endContainer, g = f.isBlockElm(g) ? g : f.findParent(g, function (a) {
                        return f.isBlockElm(a)
                    }), e = f.findParentByTagName(e, "li", !0) || e, g = f.findParentByTagName(g, "li", !0) || g;
                    "LI" == e.tagName || "TD" == e.tagName || e === a || f.isBody(e) ? f.remove(a, !0) : f.breakParent(e, a);
                    e !== g && (a = f.findParentByTagName(g, "blockquote")) && ("LI" == g.tagName || "TD" == g.tagName || f.isBody(g) ? a.parentNode && f.remove(a, !0) : f.breakParent(g, a));
                    for (var l = f.getElementsByTagName(this.document, "blockquote"),
                             a = 0, k; k = l[a++];)k.childNodes.length ? f.getPosition(k, e) & f.POSITION_FOLLOWING && f.getPosition(k, g) & f.POSITION_PRECEDING && f.remove(k, !0) : f.remove(k)
                } else {
                    a = c.cloneRange();
                    l = g = 1 == a.startContainer.nodeType ? a.startContainer : a.startContainer.parentNode;
                    for (k = 1; ;) {
                        if (f.isBody(g)) {
                            l !== g ? c.collapsed ? (a.selectNode(l), k = 0) : a.setStartBefore(l) : a.setStart(g, 0);
                            break
                        }
                        if (!e[g.tagName]) {
                            c.collapsed ? a.selectNode(l) : a.setStartBefore(l);
                            break
                        }
                        l = g;
                        g = g.parentNode
                    }
                    if (k)for (l = g = g = 1 == a.endContainer.nodeType ? a.endContainer :
                        a.endContainer.parentNode; ;) {
                        if (f.isBody(g)) {
                            l !== g ? a.setEndAfter(l) : a.setEnd(g, g.childNodes.length);
                            break
                        }
                        if (!e[g.tagName]) {
                            a.setEndAfter(l);
                            break
                        }
                        l = g;
                        g = g.parentNode
                    }
                    g = c.document.createElement("blockquote");
                    f.setAttributes(g, b);
                    g.appendChild(a.extractContents());
                    a.insertNode(g);
                    e = f.getElementsByTagName(g, "blockquote");
                    for (a = 0; g = e[a++];)g.parentNode && f.remove(g, !0)
                }
                c.moveToBookmark(h).select()
            }, queryCommandState: function () {
                return f.filterNodeList(this.selection.getStartElementPath(), "blockquote") ?
                    1 : 0
            }
        }
    };
    UE.commands.touppercase = UE.commands.tolowercase = {
        execCommand: function (d) {
            var b = this.selection.getRange();
            if (b.collapsed)return b;
            for (var c = b.createBookmark(), a = c.end, e = function (a) {
                return !f.isBr(a) && !f.isWhitespace(a)
            }, h = f.getNextDomNode(c.start, !1, e); h && f.getPosition(h, a) & f.POSITION_PRECEDING && (3 == h.nodeType && (h.nodeValue = h.nodeValue["touppercase" == d ? "toUpperCase" : "toLowerCase"]()), h = f.getNextDomNode(h, !0, e), h !== a););
            b.moveToBookmark(c).select()
        }
    };
    UE.commands.indent = {
        execCommand: function () {
            var d =
                this.queryCommandState("indent") ? "0em" : this.options.indentValue || "2em";
            this.execCommand("Paragraph", "p", {style: "text-indent:" + d})
        }, queryCommandState: function () {
            var d = f.filterNodeList(this.selection.getStartElementPath(), "p h1 h2 h3 h4 h5 h6");
            return d && d.style.textIndent && parseInt(d.style.textIndent) ? 1 : 0
        }
    };
    UE.commands.print = {
        execCommand: function () {
            this.window.print()
        }, notNeedUndo: 1
    };
    UE.commands.preview = {
        execCommand: function () {
            var d = window.open("", "_blank", "").document;
            d.open();
            d.write('<!DOCTYPE html><html><head><meta charset="utf-8"/><script src="' +
                this.options.UEDITOR_HOME_URL + "ueditor.parse.js\">\x3c/script><script>setTimeout(function(){uParse('div',{rootPath: '" + this.options.UEDITOR_HOME_URL + "'})},300)\x3c/script></head><body><div>" + this.getContent(null, null, !0) + "</div></body></html>");
            d.close()
        }, notNeedUndo: 1
    };
    UE.plugins.selectall = function () {
        this.commands.selectall = {
            execCommand: function () {
                var d = this.body, b = this.selection.getRange();
                b.selectNodeContents(d);
                f.isEmptyBlock(d) && (r.opera && d.firstChild && 1 == d.firstChild.nodeType && b.setStartAtFirst(d.firstChild),
                    b.collapse(!0));
                b.select(!0)
            }, notNeedUndo: 1
        };
        this.addshortcutkey({selectAll: "ctrl+65"})
    };
    UE.plugins.paragraph = function () {
        var d = f.isBlockElm, b = ["TD", "LI", "PRE"], c = function (a, c, h, g) {
            var l = a.createBookmark(), k = function (a) {
                return 1 == a.nodeType ? "br" != a.tagName.toLowerCase() && !f.isBookmarkNode(a) : !f.isWhitespace(a)
            }, m;
            a.enlarge(!0);
            var n = a.createBookmark();
            m = f.getNextDomNode(n.start, !1, k);
            for (var q = a.cloneRange(), u; m && !(f.getPosition(m, n.end) & f.POSITION_FOLLOWING);)if (3 != m.nodeType && d(m))m = f.getNextDomNode(m,
                !0, k); else {
                for (q.setStartBefore(m); m && m !== n.end && !d(m);)u = m, m = f.getNextDomNode(m, !1, null, function (a) {
                    return !d(a)
                });
                q.setEndAfter(u);
                m = a.document.createElement(c);
                h && (f.setAttributes(m, h), g && "customstyle" == g && h.style && (m.style.cssText = h.style));
                m.appendChild(q.extractContents());
                f.isEmptyNode(m) && f.fillChar(a.document, m);
                q.insertNode(m);
                var x = m.parentNode;
                d(x) && !f.isBody(m.parentNode) && -1 == p.indexOf(b, x.tagName) && (g && "customstyle" == g || (x.getAttribute("dir") && m.setAttribute("dir", x.getAttribute("dir")),
                x.style.cssText && (m.style.cssText = x.style.cssText + ";" + m.style.cssText), x.style.textAlign && !m.style.textAlign && (m.style.textAlign = x.style.textAlign), x.style.textIndent && !m.style.textIndent && (m.style.textIndent = x.style.textIndent), x.style.padding && !m.style.padding && (m.style.padding = x.style.padding)), h && /h\d/i.test(x.tagName) && !/h\d/i.test(m.tagName) ? (f.setAttributes(x, h), g && "customstyle" == g && h.style && (x.style.cssText = h.style), f.remove(m, !0), m = x) : f.remove(m.parentNode, !0));
                m = -1 != p.indexOf(b, x.tagName) ?
                    x : m;
                m = f.getNextDomNode(m, !1, k)
            }
            return a.moveToBookmark(n).moveToBookmark(l)
        };
        this.setOpt("paragraph", {p: "", h1: "", h2: "", h3: "", h4: "", h5: "", h6: ""});
        this.commands.paragraph = {
            execCommand: function (a, b, h, g) {
                a = this.selection.getRange();
                if (a.collapsed) {
                    var d = this.document.createTextNode("p");
                    a.insertNode(d);
                    if (r.ie) {
                        var k = d.previousSibling;
                        k && f.isWhitespace(k) && f.remove(k);
                        (k = d.nextSibling) && f.isWhitespace(k) && f.remove(k)
                    }
                }
                a = c(a, b, h, g);
                d && (a.setStartBefore(d).collapse(!0), pN = d.parentNode, f.remove(d), f.isBlockElm(pN) &&
                f.isEmptyNode(pN) && f.fillNode(this.document, pN));
                r.gecko && a.collapsed && 1 == a.startContainer.nodeType && (h = a.startContainer.childNodes[a.startOffset]) && 1 == h.nodeType && h.tagName.toLowerCase() == b && a.setStart(h, 0).collapse(!0);
                a.select();
                return !0
            }, queryCommandValue: function () {
                var a = f.filterNodeList(this.selection.getStartElementPath(), "p h1 h2 h3 h4 h5 h6");
                return a ? a.tagName.toLowerCase() : ""
            }
        }
    };
    (function () {
        var d = f.isBlockElm, b = function (a) {
            return f.filterNodeList(a.selection.getStartElementPath(), function (a) {
                return a &&
                    1 == a.nodeType && a.getAttribute("dir")
            })
        }, c = function (a, c, h) {
            var g = function (a) {
                return 1 == a.nodeType ? !f.isBookmarkNode(a) : !f.isWhitespace(a)
            };
            if ((c = b(c)) && a.collapsed)return c.setAttribute("dir", h), a;
            c = a.createBookmark();
            a.enlarge(!0);
            for (var l = a.createBookmark(), k = f.getNextDomNode(l.start, !1, g), m = a.cloneRange(), n; k && !(f.getPosition(k, l.end) & f.POSITION_FOLLOWING);)if (3 != k.nodeType && d(k))k = f.getNextDomNode(k, !0, g); else {
                for (m.setStartBefore(k); k && k !== l.end && !d(k);)n = k, k = f.getNextDomNode(k, !1, null, function (a) {
                    return !d(a)
                });
                m.setEndAfter(n);
                k = m.getCommonAncestor();
                if (!f.isBody(k) && d(k))k.setAttribute("dir", h); else {
                    k = a.document.createElement("p");
                    k.setAttribute("dir", h);
                    var q = m.extractContents();
                    k.appendChild(q);
                    m.insertNode(k)
                }
                k = f.getNextDomNode(k, !1, g)
            }
            return a.moveToBookmark(l).moveToBookmark(c)
        };
        UE.commands.directionality = {
            execCommand: function (a, b) {
                var h = this.selection.getRange();
                if (h.collapsed) {
                    var g = this.document.createTextNode("d");
                    h.insertNode(g)
                }
                c(h, this, b);
                g && (h.setStartBefore(g).collapse(!0), f.remove(g));
                h.select();
                return !0
            }, queryCommandValue: function () {
                var a = b(this);
                return a ? a.getAttribute("dir") : "ltr"
            }
        }
    })();
    UE.plugins.horizontal = function () {
        this.commands.horizontal = {
            execCommand: function (d) {
                if (-1 !== this.queryCommandState(d)) {
                    this.execCommand("insertHtml", "<hr>");
                    d = this.selection.getRange();
                    var b = d.startContainer;
                    if (1 == b.nodeType && !b.childNodes[d.startOffset]) {
                        var c;
                        (c = b.childNodes[d.startOffset - 1]) && 1 == c.nodeType && "HR" == c.tagName && ("p" == this.options.enterTag ? (c = this.document.createElement("p"), d.insertNode(c),
                            d.setStart(c, 0).setCursor()) : (c = this.document.createElement("br"), d.insertNode(c), d.setStartBefore(c).setCursor()))
                    }
                    return !0
                }
            }, queryCommandState: function () {
                return f.filterNodeList(this.selection.getStartElementPath(), "table") ? -1 : 0
            }
        };
        this.addListener("delkeydown", function (d, b) {
            var c = this.selection.getRange();
            c.txtToElmBoundary(!0);
            if (f.isStartInblock(c)) {
                var a = c.startContainer.previousSibling;
                if (a && f.isTagNode(a, "hr"))return f.remove(a), c.select(), f.preventDefault(b), !0
            }
        })
    };
    UE.commands.time = UE.commands.date =
    {
        execCommand: function (d, b) {
            function c(a, b) {
                var c = ("0" + a.getHours()).slice(-2), e = ("0" + a.getMinutes()).slice(-2), d = ("0" + a.getSeconds()).slice(-2);
                return (b || "hh:ii:ss").replace(/hh/ig, c).replace(/ii/ig, e).replace(/ss/ig, d)
            }

            function a(a, b) {
                var c = ("000" + a.getFullYear()).slice(-4), e = c.slice(-2), d = ("0" + (a.getMonth() + 1)).slice(-2), f = ("0" + a.getDate()).slice(-2);
                return (b || "yyyy-mm-dd").replace(/yyyy/ig, c).replace(/yy/ig, e).replace(/mm/ig, d).replace(/dd/ig, f)
            }

            var e = new Date;
            this.execCommand("insertHtml", "time" ==
            d ? c(e, b) : a(e, b))
        }
    };
    UE.plugins.rowspacing = function () {
        this.setOpt({rowspacingtop: ["5", "10", "15", "20", "25"], rowspacingbottom: ["5", "10", "15", "20", "25"]});
        this.commands.rowspacing = {
            execCommand: function (d, b, c) {
                this.execCommand("paragraph", "p", {style: "margin-" + c + ":" + b + "px"});
                return !0
            }, queryCommandValue: function (d, b) {
                var c = f.filterNodeList(this.selection.getStartElementPath(), function (a) {
                    return f.isBlockElm(a)
                });
                return c ? (c = f.getComputedStyle(c, "margin-" + b).replace(/[^\d]/g, "")) ? c : 0 : 0
            }
        }
    };
    UE.plugins.lineheight =
        function () {
            this.setOpt({lineheight: "1 1.5 1.75 2 3 4 5".split(" ")});
            this.commands.lineheight = {
                execCommand: function (d, b) {
                    this.execCommand("paragraph", "p", {style: "line-height:" + ("1" == b ? "normal" : b + "em")});
                    return !0
                }, queryCommandValue: function () {
                    var d = f.filterNodeList(this.selection.getStartElementPath(), function (b) {
                        return f.isBlockElm(b)
                    });
                    if (d)return d = f.getComputedStyle(d, "line-height"), "normal" == d ? 1 : d.replace(/[^\d.]*/ig, "")
                }
            }
        };
    UE.plugins.insertcode = function () {
        var d = this;
        d.ready(function () {
            p.cssRule("pre",
                "pre{margin:.5em 0;padding:.4em .6em;border-radius:8px;background:#f8f8f8;}", d.document)
        });
        d.setOpt("insertcode", {
            as3: "ActionScript3",
            bash: "Bash/Shell",
            cpp: "C/C++",
            css: "Css",
            cf: "CodeFunction",
            "c#": "C#",
            delphi: "Delphi",
            diff: "Diff",
            erlang: "Erlang",
            groovy: "Groovy",
            html: "Html",
            java: "Java",
            jfx: "JavaFx",
            js: "Javascript",
            pl: "Perl",
            php: "Php",
            plain: "Plain Text",
            ps: "PowerShell",
            python: "Python",
            ruby: "Ruby",
            scala: "Scala",
            sql: "Sql",
            vb: "Vb",
            xml: "Xml"
        });
        d.commands.insertcode = {
            execCommand: function (b, c) {
                var a = this.selection.getRange(),
                    e = f.findParentByTagName(a.startContainer, "pre", !0);
                if (e)e.className = "brush:" + c + ";toolbar:false;"; else {
                    var h = "";
                    a.collapsed ? h = r.ie && r.ie11below ? 8 >= r.version ? "&nbsp;" : "" : "<br/>" : (e = a.extractContents(), a = this.document.createElement("div"), a.appendChild(e), p.each(UE.filterNode(UE.htmlparser(a.innerHTML.replace(/[\r\t]/g, "")), this.options.filterTxtRules).children, function (a) {
                        r.ie && r.ie11below && 8 < r.version ? ("element" == a.type ? "br" == a.tagName ? h += "\n" : w.$empty[a.tagName] || (p.each(a.children, function (b) {
                            "element" ==
                            b.type ? "br" == b.tagName ? h += "\n" : w.$empty[a.tagName] || (h += b.innerText()) : h += b.data
                        }), /\n$/.test(h) || (h += "\n")) : h += a.data + "\n", !a.nextSibling() && /\n$/.test(h) && (h = h.replace(/\n$/, ""))) : r.ie && r.ie11below ? ("element" == a.type ? "br" == a.tagName ? h += "<br>" : w.$empty[a.tagName] || (p.each(a.children, function (b) {
                            "element" == b.type ? "br" == b.tagName ? h += "<br>" : w.$empty[a.tagName] || (h += b.innerText()) : h += b.data
                        }), /br>$/.test(h) || (h += "<br>")) : h += a.data + "<br>", !a.nextSibling() && /<br>$/.test(h) && (h = h.replace(/<br>$/, ""))) :
                            (h += "element" == a.type ? w.$empty[a.tagName] ? "" : a.innerText() : a.data, !/br\/?\s*>$/.test(h) && a.nextSibling() && (h += "<br>"))
                    }));
                    this.execCommand("inserthtml", '<pre id="coder"class="brush:' + c + ';toolbar:false">' + h + "</pre>", !0);
                    e = this.document.getElementById("coder");
                    f.removeAttributes(e, "id");
                    (a = e.previousSibling) && (3 == a.nodeType && 1 == a.nodeValue.length && r.ie && 6 == r.version || f.isEmptyBlock(a)) && f.remove(a);
                    a = this.selection.getRange();
                    f.isEmptyBlock(e) ? a.setStart(e, 0).setCursor(!1, !0) : a.selectNodeContents(e).select()
                }
            },
            queryCommandValue: function () {
                var b = this.selection.getStartElementPath(), c = "";
                p.each(b, function (a) {
                    if ("PRE" == a.nodeName)return c = (a = a.className.match(/brush:([^;]+)/)) && a[1] ? a[1] : "", !1
                });
                return c
            }
        };
        d.addInputRule(function (b) {
            p.each(b.getNodesByTagName("pre"), function (b) {
                var a = b.getNodesByTagName("br");
                a.length ? r.ie && r.ie11below && 8 < r.version && p.each(a, function (a) {
                    var b = UE.uNode.createText("\n");
                    a.parentNode.insertBefore(b, a);
                    a.parentNode.removeChild(a)
                }) : r.ie && r.ie11below && 8 < r.version || (a = b.innerText().split(/\n/),
                    b.innerHTML(""), p.each(a, function (a) {
                    a.length && b.appendChild(UE.uNode.createText(a));
                    b.appendChild(UE.uNode.createElement("br"))
                }))
            })
        });
        d.addOutputRule(function (b) {
            p.each(b.getNodesByTagName("pre"), function (b) {
                var a = "";
                p.each(b.children, function (b) {
                    a = "text" == b.type ? a + b.data.replace(/[ ]/g, "&nbsp;").replace(/\n$/, "") : "br" == b.tagName ? a + "\n" : a + (w.$empty[b.tagName] ? b.innerText() : "")
                });
                b.innerText(a.replace(/(&nbsp;|\n)+$/, ""))
            })
        });
        d.notNeedCodeQuery = {
            help: 1, undo: 1, redo: 1, source: 1, print: 1, searchreplace: 1,
            fullscreen: 1, preview: 1, insertparagraph: 1, elementpath: 1, insertcode: 1, inserthtml: 1, selectall: 1
        };
        d.queryCommandState = function (b) {
            return !this.notNeedCodeQuery[b.toLowerCase()] && this.selection && this.queryCommandValue("insertcode") ? -1 : UE.Editor.prototype.queryCommandState.apply(this, arguments)
        };
        d.addListener("beforeenterkeydown", function () {
            var b = d.selection.getRange(), c = f.findParentByTagName(b.startContainer, "pre", !0);
            if (c) {
                d.fireEvent("saveScene");
                b.collapsed || b.deleteContents();
                if (!r.ie || r.ie9above) {
                    c =
                        d.document.createElement("br");
                    b.insertNode(c).setStartAfter(c).collapse(!0);
                    c.nextSibling || r.ie && !(10 < r.version) ? b.setStartAfter(c) : b.insertNode(c.cloneNode(!1));
                    for (var c = c.previousSibling, a; c;)if (a = c, c = c.previousSibling, !c || "BR" == c.nodeName) {
                        c = a;
                        break
                    }
                    if (c) {
                        for (a = ""; c && "BR" != c.nodeName && (new RegExp("^[\\s" + f.fillChar + "]*$")).test(c.nodeValue);)a += c.nodeValue, c = c.nextSibling;
                        "BR" != c.nodeName && (c = c.nodeValue.match(new RegExp("^([\\s" + f.fillChar + "]+)"))) && c[1] && (a += c[1]);
                        a && (a = d.document.createTextNode(a),
                            b.insertNode(a).setStartAfter(a))
                    }
                    b.collapse(!0).select(!0)
                } else if (8 < r.version)if (c = d.document.createTextNode("\n"), a = b.startContainer, 0 == b.startOffset) {
                    if (a.previousSibling) {
                        b.insertNode(c);
                        var e = d.document.createTextNode(" ");
                        b.setStartAfter(c).insertNode(e).setStart(e, 0).collapse(!0).select(!0)
                    }
                } else b.insertNode(c).setStartAfter(c), e = d.document.createTextNode(" "), (a = b.startContainer.childNodes[b.startOffset]) && !/^\n/.test(a.nodeValue) && b.setStartBefore(c), b.insertNode(e).setStart(e, 0).collapse(!0).select(!0);
                else {
                    c = d.document.createElement("br");
                    b.insertNode(c);
                    b.insertNode(d.document.createTextNode(f.fillChar));
                    b.setStartAfter(c);
                    for (c = c.previousSibling; c;)if (a = c, c = c.previousSibling, !c || "BR" == c.nodeName) {
                        c = a;
                        break
                    }
                    if (c) {
                        for (a = ""; c && "BR" != c.nodeName && (new RegExp("^[ " + f.fillChar + "]*$")).test(c.nodeValue);)a += c.nodeValue, c = c.nextSibling;
                        "BR" != c.nodeName && (c = c.nodeValue.match(new RegExp("^([ " + f.fillChar + "]+)"))) && c[1] && (a += c[1]);
                        a = d.document.createTextNode(a);
                        b.insertNode(a).setStartAfter(a)
                    }
                    b.collapse(!0).select()
                }
                d.fireEvent("saveScene");
                return !0
            }
        });
        d.addListener("tabkeydown", function (b, c) {
            var a = d.selection.getRange(), e = f.findParentByTagName(a.startContainer, "pre", !0);
            if (e) {
                d.fireEvent("saveScene");
                if (!c.shiftKey)if (a.collapsed)e = d.document.createTextNode("    "), a.insertNode(e).setStartAfter(e).collapse(!0).select(!0); else {
                    for (var h = a.createBookmark(), g = h.start.previousSibling; g;) {
                        if (e.firstChild === g && !f.isBr(g)) {
                            e.insertBefore(d.document.createTextNode("    "), g);
                            break
                        }
                        if (f.isBr(g)) {
                            e.insertBefore(d.document.createTextNode("    "),
                                g.nextSibling);
                            break
                        }
                        g = g.previousSibling
                    }
                    var l = h.end, g = h.start.nextSibling;
                    for (e.firstChild === h.start && e.insertBefore(d.document.createTextNode("    "), g.nextSibling); g && g !== l;) {
                        if (f.isBr(g) && g.nextSibling) {
                            if (g.nextSibling === l)break;
                            e.insertBefore(d.document.createTextNode("    "), g.nextSibling)
                        }
                        g = g.nextSibling
                    }
                    a.moveToBookmark(h).select()
                }
                d.fireEvent("saveScene");
                return !0
            }
        });
        d.addListener("beforeinserthtml", function (b, c) {
            var a = this, e = a.selection.getRange();
            if (f.findParentByTagName(e.startContainer,
                    "pre", !0)) {
                e.collapsed || e.deleteContents();
                var h = "";
                if (r.ie && 8 < r.version) {
                    p.each(UE.filterNode(UE.htmlparser(c), a.options.filterTxtRules).children, function (a) {
                        "element" == a.type ? "br" == a.tagName ? h += "\n" : w.$empty[a.tagName] || (p.each(a.children, function (b) {
                            "element" == b.type ? "br" == b.tagName ? h += "\n" : w.$empty[a.tagName] || (h += b.innerText()) : h += b.data
                        }), /\n$/.test(h) || (h += "\n")) : h += a.data + "\n";
                        !a.nextSibling() && /\n$/.test(h) && (h = h.replace(/\n$/, ""))
                    });
                    var g = a.document.createTextNode(p.html(h.replace(/&nbsp;/g,
                        " ")));
                    e.insertNode(g).selectNode(g).select()
                } else {
                    var d = a.document.createDocumentFragment();
                    p.each(UE.filterNode(UE.htmlparser(c), a.options.filterTxtRules).children, function (b) {
                        "element" == b.type ? "br" == b.tagName ? d.appendChild(a.document.createElement("br")) : w.$empty[b.tagName] || (p.each(b.children, function (c) {
                            "element" == c.type ? "br" == c.tagName ? d.appendChild(a.document.createElement("br")) : w.$empty[b.tagName] || d.appendChild(a.document.createTextNode(p.html(c.innerText().replace(/&nbsp;/g, " ")))) : d.appendChild(a.document.createTextNode(p.html(c.data.replace(/&nbsp;/g,
                                " "))))
                        }), "BR" != d.lastChild.nodeName && d.appendChild(a.document.createElement("br"))) : d.appendChild(a.document.createTextNode(p.html(b.data.replace(/&nbsp;/g, " "))));
                        b.nextSibling() || "BR" != d.lastChild.nodeName || d.removeChild(d.lastChild)
                    });
                    e.insertNode(d).select()
                }
                return !0
            }
        });
        d.addListener("keydown", function (b, c) {
            if (40 == (c.keyCode || c.which)) {
                var a = this.selection.getRange(), e, h = a.startContainer;
                if (a.collapsed && (e = f.findParentByTagName(a.startContainer, "pre", !0)) && !e.nextSibling) {
                    for (var g = e.lastChild; g &&
                    "BR" == g.nodeName;)g = g.previousSibling;
                    if (g === h || a.startContainer === e && a.startOffset == e.childNodes.length)this.execCommand("insertparagraph"), f.preventDefault(c)
                }
            }
        });
        d.addListener("delkeydown", function (b, c) {
            var a = this.selection.getRange();
            a.txtToElmBoundary(!0);
            var e = a.startContainer;
            if (f.isTagNode(e, "pre") && a.collapsed && f.isStartInblock(a)) {
                var h = d.document.createElement("p");
                f.fillNode(d.document, h);
                e.parentNode.insertBefore(h, e);
                f.remove(e);
                a.setStart(h, 0).setCursor(!1, !0);
                f.preventDefault(c);
                return !0
            }
        })
    };
    UE.commands.cleardoc = {
        execCommand: function (d) {
            var b = this;
            d = b.options.enterTag;
            var c = b.selection.getRange();
            "br" == d ? (b.body.innerHTML = "<br/>", c.setStart(b.body, 0).setCursor()) : (b.body.innerHTML = "<p>" + (J ? "" : "<br/>") + "</p>", c.setStart(b.body.firstChild, 0).setCursor(!1, !0));
            setTimeout(function () {
                b.fireEvent("clearDoc")
            }, 0)
        }
    };
    UE.plugin.register("anchor", function () {
        return {
            bindEvents: {
                ready: function () {
                    p.cssRule("anchor", ".anchorclass{background: url('" + this.options.themePath + this.options.theme + "/images/anchor.gif') no-repeat scroll left center transparent;cursor: auto;display: inline-block;height: 16px;width: 15px;}",
                        this.document)
                }
            }, outputRule: function (d) {
                p.each(d.getNodesByTagName("img"), function (b) {
                    var c;
                    if (c = b.getAttr("anchorname"))b.tagName = "a", b.setAttr({anchorname: "", name: c, "class": ""})
                })
            }, inputRule: function (d) {
                p.each(d.getNodesByTagName("a"), function (b) {
                    b.getAttr("name") && !b.getAttr("href") && (b.tagName = "img", b.setAttr({
                        anchorname: b.getAttr("name"),
                        "class": "anchorclass"
                    }), b.setAttr("name"))
                })
            }, commands: {
                anchor: {
                    execCommand: function (d, b) {
                        var c = this.selection.getRange(), a = c.getClosedNode();
                        a && a.getAttribute("anchorname") ?
                            b ? a.setAttribute("anchorname", b) : (c.setStartBefore(a).setCursor(), f.remove(a)) : b && (a = this.document.createElement("img"), c.collapse(!0), f.setAttributes(a, {
                            anchorname: b,
                            "class": "anchorclass"
                        }), c.insertNode(a).setStartAfter(a).setCursor(!1, !0))
                    }
                }
            }
        }
    });
    UE.plugins.wordcount = function () {
        var d = this;
        d.setOpt("wordCount", !0);
        d.addListener("contentchange", function () {
            d.fireEvent("wordcount")
        });
        var b;
        d.addListener("ready", function () {
            var c = this;
            f.on(c.body, "keyup", function (a) {
                (a.keyCode || a.which)in{
                    16: 1, 18: 1, 20: 1,
                    37: 1, 38: 1, 39: 1, 40: 1
                } || (clearTimeout(b), b = setTimeout(function () {
                    c.fireEvent("wordcount")
                }, 200))
            })
        })
    };
    UE.plugins.pagebreak = function () {
        function d(a) {
            if (f.isEmptyBlock(a)) {
                for (var b = a.firstChild, g; b && 1 == b.nodeType && f.isEmptyBlock(b);)g = b, b = b.firstChild;
                !g && (g = a);
                f.fillNode(c.document, g)
            }
        }

        function b(a) {
            return a && 1 == a.nodeType && "HR" == a.tagName && "pagebreak" == a.className
        }

        var c = this, a = ["td"];
        c.setOpt("pageBreakTag", "_ueditor_page_break_tag_");
        c.ready(function () {
            p.cssRule("pagebreak", ".pagebreak{display:block;clear:both !important;cursor:default !important;width: 100% !important;margin:0;}",
                c.document)
        });
        c.addInputRule(function (a) {
            a.traversal(function (a) {
                if ("text" == a.type && a.data == c.options.pageBreakTag) {
                    var b = UE.uNode.createElement('<hr class="pagebreak" noshade="noshade" size="5" style="-webkit-user-select: none;">');
                    a.parentNode.insertBefore(b, a);
                    a.parentNode.removeChild(a)
                }
            })
        });
        c.addOutputRule(function (a) {
            p.each(a.getNodesByTagName("hr"), function (a) {
                if ("pagebreak" == a.getAttr("class")) {
                    var b = UE.uNode.createText(c.options.pageBreakTag);
                    a.parentNode.insertBefore(b, a);
                    a.parentNode.removeChild(a)
                }
            })
        });
        c.commands.pagebreak = {
            execCommand: function () {
                var e = c.selection.getRange(), h = c.document.createElement("hr");
                f.setAttributes(h, {"class": "pagebreak", noshade: "noshade", size: "5"});
                f.unSelectable(h);
                var g = f.findParentByTagName(e.startContainer, a, !0), l = [];
                if (g)switch (g.tagName) {
                    case "TD":
                        g = g.parentNode, g.previousSibling ? (g.parentNode.insertBefore(h, g), l = f.findParents(h)) : (e = f.findParentByTagName(g, "table"), e.parentNode.insertBefore(h, e), l = f.findParents(h, !0)), g = l[1], h !== g && f.breakParent(h, g), c.fireEvent("afteradjusttable",
                            c.document)
                } else {
                    if (!e.collapsed)for (e.deleteContents(), g = e.startContainer; !f.isBody(g) && f.isBlockElm(g) && f.isEmptyNode(g);)e.setStartBefore(g).collapse(!0), f.remove(g), g = e.startContainer;
                    e.insertNode(h);
                    for (g = h.parentNode; !f.isBody(g);)f.breakParent(h, g), (g = h.nextSibling) && f.isEmptyBlock(g) && f.remove(g), g = h.parentNode;
                    g = h.nextSibling;
                    l = h.previousSibling;
                    b(l) ? f.remove(l) : l && d(l);
                    g ? (b(g) ? f.remove(g) : d(g), e.setEndAfter(h).collapse(!1)) : (g = c.document.createElement("p"), h.parentNode.appendChild(g), f.fillNode(c.document,
                        g), e.setStart(g, 0).collapse(!0));
                    e.select(!0)
                }
            }
        }
    };
    UE.plugin.register("wordimage", function () {
        var d = this, b = [];
        return {
            commands: {
                wordimage: {
                    execCommand: function () {
                        for (var b = f.getElementsByTagName(d.body, "img"), a = [], e = 0, h; h = b[e++];)(h = h.getAttribute("word_img")) && a.push(h);
                        return a
                    }, queryCommandState: function () {
                        b = f.getElementsByTagName(d.body, "img");
                        for (var c = 0, a; a = b[c++];)if (a.getAttribute("word_img"))return 1;
                        return -1
                    }, notNeedUndo: !0
                }
            }, inputRule: function (b) {
                p.each(b.getNodesByTagName("img"), function (a) {
                    var b =
                        a.attrs, c = 128 > parseInt(b.width) || 43 > parseInt(b.height), g = d.options, f = g.UEDITOR_HOME_URL + "themes/default/images/spacer.gif";
                    b.src && /^(?:(file:\/+))/.test(b.src) && a.setAttr({
                        width: b.width,
                        height: b.height,
                        alt: b.alt,
                        word_img: b.src,
                        src: f,
                        style: "background:url(" + (c ? g.themePath + g.theme + "/images/word.gif" : g.langPath + g.lang + "/images/localimage.png") + ") no-repeat center center;border:1px solid #ddd"
                    })
                })
            }
        }
    });
    UE.plugins.dragdrop = function () {
        var d = this;
        d.ready(function () {
            f.on(this.body, "dragend", function () {
                var b =
                    d.selection.getRange(), c = b.getClosedNode() || d.selection.getStart();
                if (c && "IMG" == c.tagName) {
                    for (var a = c.previousSibling, e; (e = c.nextSibling) && 1 == e.nodeType && "SPAN" == e.tagName && !e.firstChild;)f.remove(e);
                    (!a || 1 != a.nodeType || f.isEmptyBlock(a)) && a || e && (!e || f.isEmptyBlock(e)) || (a && "P" == a.tagName && !f.isEmptyBlock(a) ? (a.appendChild(c), f.moveChild(e, a), f.remove(e)) : e && "P" == e.tagName && !f.isEmptyBlock(e) && e.insertBefore(c, e.firstChild), a && "P" == a.tagName && f.isEmptyBlock(a) && f.remove(a), e && "P" == e.tagName && f.isEmptyBlock(e) &&
                    f.remove(e), b.selectNode(c).select(), d.fireEvent("saveScene"))
                }
            })
        });
        d.addListener("keyup", function (b, c) {
            if (13 == (c.keyCode || c.which)) {
                var a = d.selection.getRange(), e;
                (e = f.findParentByTagName(a.startContainer, "p", !0)) && "center" == f.getComputedStyle(e, "text-align") && f.removeStyle(e, "text-align")
            }
        })
    };
    UE.plugins.undo = function () {
        function d(a, b) {
            if (a.length != b.length)return 0;
            for (var c = 0, e = a.length; c < e; c++)if (a[c] != b[c])return 0;
            return 1
        }

        var b, c = this, a = c.options.maxUndoCount || 20, e = c.options.maxInputCount ||
            20, h = new RegExp(f.fillChar + "|</hr>", "gi"), g = {
            ol: 1,
            ul: 1,
            table: 1,
            tbody: 1,
            tr: 1,
            body: 1
        }, l = c.options.autoClearEmptyNode;
        c.undoManger = new function () {
            this.list = [];
            this.index = 0;
            this.hasRedo = this.hasUndo = !1;
            this.undo = function () {
                if (this.hasUndo)if (this.list[this.index - 1] || 1 != this.list.length) {
                    for (; this.list[this.index].content == this.list[this.index - 1].content;)if (this.index--, 0 == this.index)return this.restore(0);
                    this.restore(--this.index)
                } else this.reset()
            };
            this.redo = function () {
                if (this.hasRedo) {
                    for (; this.list[this.index].content ==
                           this.list[this.index + 1].content;)if (this.index++, this.index == this.list.length - 1)return this.restore(this.index);
                    this.restore(++this.index)
                }
            };
            this.restore = function () {
                var a = this.editor, b = this.list[this.index], c = UE.htmlparser(b.content.replace(h, ""));
                a.options.autoClearEmptyNode = !1;
                a.filterInputRule(c);
                a.options.autoClearEmptyNode = l;
                a.document.body.innerHTML = c.toHtml();
                a.fireEvent("afterscencerestore");
                r.ie && p.each(f.getElementsByTagName(a.document, "td th caption p"), function (b) {
                    f.isEmptyNode(b) && f.fillNode(a.document,
                        b)
                });
                try {
                    var e = (new M.Range(a.document)).moveToAddress(b.address);
                    e.select(g[e.startContainer.nodeName.toLowerCase()])
                } catch (d) {
                }
                this.update();
                this.clearKey();
                a.fireEvent("reset", !0)
            };
            this.getScene = function () {
                var a = this.editor, b = a.selection.getRange().createAddress(!1, !0);
                a.fireEvent("beforegetscene");
                var c = UE.htmlparser(a.body.innerHTML);
                a.options.autoClearEmptyNode = !1;
                a.filterOutputRule(c);
                a.options.autoClearEmptyNode = l;
                c = c.toHtml();
                a.fireEvent("aftergetscene");
                return {address: b, content: c}
            };
            this.save =
                function (e, g) {
                    clearTimeout(b);
                    var h = this.getScene(g), k = this.list[this.index];
                    k && k.content != h.content && c.trigger("contentchange");
                    var f;
                    if (f = k && k.content == h.content)e ? k = 1 : (k = k.address, f = h.address, k = k.collapsed != f.collapsed ? 0 : d(k.startAddress, f.startAddress) && d(k.endAddress, f.endAddress) ? 1 : 0), f = k;
                    f || (this.list = this.list.slice(0, this.index + 1), this.list.push(h), this.list.length > a && this.list.shift(), this.index = this.list.length - 1, this.clearKey(), this.update())
                };
            this.update = function () {
                this.hasRedo = !!this.list[this.index +
                1];
                this.hasUndo = !!this.list[this.index - 1]
            };
            this.reset = function () {
                this.list = [];
                this.index = 0;
                this.hasRedo = this.hasUndo = !1;
                this.clearKey()
            };
            this.clearKey = function () {
                m = 0
            }
        };
        c.undoManger.editor = c;
        c.addListener("saveScene", function () {
            var a = Array.prototype.splice.call(arguments, 1);
            this.undoManger.save.apply(this.undoManger, a)
        });
        c.addListener("reset", function (a, b) {
            b || this.undoManger.reset()
        });
        c.commands.redo = c.commands.undo = {
            execCommand: function (a) {
                this.undoManger[a]()
            }, queryCommandState: function (a) {
                return this.undoManger["has" +
                ("undo" == a.toLowerCase() ? "Undo" : "Redo")] ? 0 : -1
            }, notNeedUndo: 1
        };
        var k = {16: 1, 17: 1, 18: 1, 37: 1, 38: 1, 39: 1, 40: 1}, m = 0, n = !1;
        c.addListener("ready", function () {
            f.on(this.body, "compositionstart", function () {
                n = !0
            });
            f.on(this.body, "compositionend", function () {
                n = !1
            })
        });
        c.addshortcutkey({Undo: "ctrl+90", Redo: "ctrl+89"});
        var q = !0;
        c.addListener("keydown", function (a, c) {
            var g = this;
            if (!(k[c.keyCode || c.which] || c.ctrlKey || c.metaKey || c.shiftKey || c.altKey)) {
                var h = function (a) {
                    a.undoManger.save(!1, !0);
                    a.fireEvent("selectionchange")
                };
                n || (g.selection.getRange().collapsed ? (0 == g.undoManger.list.length && g.undoManger.save(!0), clearTimeout(b), b = setTimeout(function () {
                    if (n)var a = setInterval(function () {
                        n || (h(g), clearInterval(a))
                    }, 300); else h(g)
                }, 200), m++, m >= e && h(g)) : (g.undoManger.save(!1, !0), q = !1))
            }
        });
        c.addListener("keyup", function (a, b) {
            k[b.keyCode || b.which] || b.ctrlKey || b.metaKey || b.shiftKey || b.altKey || n || q || (this.undoManger.save(!1, !0), q = !0)
        });
        c.stopCmdUndo = function () {
            c.__hasEnterExecCommand = !0
        };
        c.startCmdUndo = function () {
            c.__hasEnterExecCommand = !1
        }
    };
    UE.plugin.register("copy", function () {
        function d() {
            ZeroClipboard.config({
                debug: !1,
                swfPath: b.options.UEDITOR_HOME_URL + "third-party/zeroclipboard/ZeroClipboard.swf"
            });
            var c = b.zeroclipboard = new ZeroClipboard;
            c.on("copy", function (a) {
                a = a.client;
                var c = b.selection.getRange(), h = document.createElement("div");
                h.appendChild(c.cloneContents());
                a.setText(h.innerText || h.textContent);
                a.setHtml(h.innerHTML);
                c.select()
            });
            c.on("mouseover mouseout", function (a) {
                var b = a.target;
                "mouseover" == a.type ? f.addClass(b, "edui-state-hover") :
                "mouseout" == a.type && f.removeClasses(b, "edui-state-hover")
            });
            c.on("wrongflash noflash", function () {
                ZeroClipboard.destroy()
            })
        }

        var b = this;
        return {
            bindEvents: {
                ready: function () {
                    r.ie || (window.ZeroClipboard ? d() : p.loadFile(document, {
                        src: b.options.UEDITOR_HOME_URL + "third-party/zeroclipboard/ZeroClipboard.js",
                        tag: "script",
                        type: "text/javascript",
                        defer: "defer"
                    }, function () {
                        d()
                    }))
                }
            }, commands: {
                copy: {
                    execCommand: function (c) {
                        b.document.execCommand("copy") || alert(b.getLang("copymsg"))
                    }
                }
            }
        }
    });
    UE.plugins.paste = function () {
        function d(a) {
            var b =
                this.document;
            if (!b.getElementById("baidu_pastebin")) {
                var c = this.selection.getRange(), e = c.createBookmark(), g = b.createElement("div");
                g.id = "baidu_pastebin";
                r.webkit && g.appendChild(b.createTextNode(f.fillChar + f.fillChar));
                b.body.appendChild(g);
                e.start.style.display = "";
                g.style.cssText = "position:absolute;width:1px;height:1px;overflow:hidden;left:-1000px;white-space:nowrap;top:" + f.getXY(e.start).y + "px";
                c.selectNodeContents(g).select(!0);
                setTimeout(function () {
                    if (r.webkit)for (var h = 0, d = b.querySelectorAll("#baidu_pastebin"),
                                          z; z = d[h++];)if (f.isEmptyNode(z))f.remove(z); else {
                        g = z;
                        break
                    }
                    try {
                        g.parentNode.removeChild(g)
                    } catch (v) {
                    }
                    c.moveToBookmark(e).select(!0);
                    a(g)
                }, 0)
            }
        }

        function b(a) {
            return a.replace(/<(\/?)([\w\-]+)([^>]*)>/gi, function (a, b, c, e) {
                c = c.toLowerCase();
                if ({img: 1}[c])return a;
                e = e.replace(/([\w\-]*?)\s*=\s*(("([^"]*)")|('([^']*)')|([^\s>]+))/gi, function (a, b, c) {
                    return {src: 1, href: 1, name: 1}[b.toLowerCase()] ? b + "=" + c + " " : ""
                });
                return {span: 1, div: 1}[c] ? "" : "<" + b + c + " " + p.trim(e) + ">"
            })
        }

        function c(c) {
            var d;
            if (c.firstChild) {
                var m =
                    f.getElementsByTagName(c, "span");
                d = 0;
                for (var n; n = m[d++];)"_baidu_cut_start" != n.id && "_baidu_cut_end" != n.id || f.remove(n);
                if (r.webkit) {
                    n = c.querySelectorAll("div br");
                    for (d = 0; m = n[d++];)m = m.parentNode, "DIV" == m.tagName && 1 == m.childNodes.length && (m.innerHTML = "<p><br/></p>", f.remove(m));
                    m = c.querySelectorAll("#baidu_pastebin");
                    for (d = 0; n = m[d++];) {
                        var q = a.document.createElement("p");
                        for (n.parentNode.insertBefore(q, n); n.firstChild;)q.appendChild(n.firstChild);
                        f.remove(n)
                    }
                    n = c.querySelectorAll("meta");
                    for (d = 0; m =
                        n[d++];)f.remove(m);
                    n = c.querySelectorAll("br");
                    for (d = 0; m = n[d++];)/^apple-/i.test(m.className) && f.remove(m)
                }
                if (r.gecko)for (n = c.querySelectorAll("[_moz_dirty]"), d = 0; m = n[d++];)m.removeAttribute("_moz_dirty");
                if (!r.ie)for (n = c.querySelectorAll("span.Apple-style-span"), d = 0; m = n[d++];)f.remove(m, !0);
                d = c.innerHTML;
                d = UE.filterWord(d);
                c = UE.htmlparser(d);
                a.options.filterRules && UE.filterNode(c, a.options.filterRules);
                a.filterInputRule(c);
                r.webkit && ((d = c.lastChild()) && "element" == d.type && "br" == d.tagName && c.removeChild(d),
                    p.each(a.body.querySelectorAll("div"), function (a) {
                        f.isEmptyBlock(a) && f.remove(a, !0)
                    }));
                d = {html: c.toHtml()};
                a.fireEvent("beforepaste", d, c);
                d.html && (c = UE.htmlparser(d.html, !0), 1 === a.queryCommandState("pasteplain") ? a.execCommand("insertHtml", UE.filterNode(c, a.options.filterTxtRules).toHtml(), !0) : (UE.filterNode(c, a.options.filterTxtRules), e = c.toHtml(), h = d.html, g = a.selection.getRange().createAddress(!0), a.execCommand("insertHtml", !0 === a.getOpt("retainOnlyLabelPasted") ? b(h) : h, !0)), a.fireEvent("afterpaste",
                    d))
            }
        }

        var a = this;
        a.setOpt({retainOnlyLabelPasted: !1});
        var e, h, g;
        a.addListener("pasteTransfer", function (c, d) {
            if (g && e && h && e != h) {
                var m = a.selection.getRange();
                m.moveToAddress(g, !0);
                if (!m.collapsed) {
                    for (; !f.isBody(m.startContainer);) {
                        var n = m.startContainer;
                        if (1 == n.nodeType) {
                            n = n.childNodes[m.startOffset];
                            if (!n) {
                                m.setStartBefore(m.startContainer);
                                continue
                            }
                            (n = n.previousSibling) && 3 == n.nodeType && (new RegExp("^[\n\r\t " + f.fillChar + "]*$")).test(n.nodeValue) && m.setStartBefore(n)
                        }
                        if (0 == m.startOffset)m.setStartBefore(m.startContainer);
                        else break
                    }
                    for (; !f.isBody(m.endContainer);) {
                        n = m.endContainer;
                        if (1 == n.nodeType) {
                            n = n.childNodes[m.endOffset];
                            if (!n) {
                                m.setEndAfter(m.endContainer);
                                continue
                            }
                            (n = n.nextSibling) && 3 == n.nodeType && (new RegExp("^[\n\r\t" + f.fillChar + "]*$")).test(n.nodeValue) && m.setEndAfter(n)
                        }
                        if (m.endOffset == m.endContainer[3 == m.endContainer.nodeType ? "nodeValue" : "childNodes"].length)m.setEndAfter(m.endContainer); else break
                    }
                }
                m.deleteContents();
                m.select(!0);
                a.__hasEnterExecCommand = !0;
                m = h;
                2 === d ? m = b(m) : d && (m = e);
                a.execCommand("inserthtml",
                    m, !0);
                a.__hasEnterExecCommand = !1;
                for (m = a.selection.getRange(); !f.isBody(m.startContainer) && !m.startOffset && m.startContainer[3 == m.startContainer.nodeType ? "nodeValue" : "childNodes"].length;)m.setStartBefore(m.startContainer);
                m = m.createAddress(!0);
                g.endAddress = m.startAddress
            }
        });
        a.addListener("ready", function () {
            f.on(a.body, "cut", function () {
                !a.selection.getRange().collapsed && a.undoManger && a.undoManger.save()
            });
            f.on(a.body, r.ie || r.opera ? "keydown" : "paste", function (b) {
                (!r.ie && !r.opera || (b.ctrlKey || b.metaKey) &&
                "86" == b.keyCode) && d.call(a, function (a) {
                    c(a)
                })
            })
        });
        a.commands.paste = {
            execCommand: function (b) {
                r.ie ? (d.call(a, function (a) {
                    c(a)
                }), a.document.execCommand("paste")) : alert(a.getLang("pastemsg"))
            }
        }
    };
    UE.plugins.pasteplain = function () {
        this.setOpt({
            pasteplain: !1, filterTxtRules: function () {
                function b(a) {
                    a.tagName = "p";
                    a.setStyle()
                }

                function c(a) {
                    a.parentNode.removeChild(a, !0)
                }

                return {
                    "-": "script style object iframe embed input select",
                    p: {$: {}},
                    br: {$: {}},
                    div: function (a) {
                        for (var b, c = UE.uNode.createElement("p"); b = a.firstChild();)"text" !=
                        b.type && UE.dom.dtd.$block[b.tagName] ? c.firstChild() ? (a.parentNode.insertBefore(c, a), c = UE.uNode.createElement("p")) : a.parentNode.insertBefore(b, a) : c.appendChild(b);
                        c.firstChild() && a.parentNode.insertBefore(c, a);
                        a.parentNode.removeChild(a)
                    },
                    ol: c,
                    ul: c,
                    dl: c,
                    dt: c,
                    dd: c,
                    li: c,
                    caption: b,
                    th: b,
                    tr: b,
                    h1: b,
                    h2: b,
                    h3: b,
                    h4: b,
                    h5: b,
                    h6: b,
                    td: function (a) {
                        a.innerText() && a.parentNode.insertAfter(UE.uNode.createText(" &nbsp; &nbsp;"), a);
                        a.parentNode.removeChild(a, a.innerText())
                    }
                }
            }()
        });
        var d = this.options.pasteplain;
        this.commands.pasteplain =
        {
            queryCommandState: function () {
                return d ? 1 : 0
            }, execCommand: function () {
            d = !d | 0
        }, notNeedUndo: 1
        }
    };
    UE.plugins.list = function () {
        function d(a) {
            var b = [], c;
            for (c in a)b.push(c);
            return b
        }

        function b(a) {
            var b = a.className;
            return f.hasClass(a, /custom_/) ? b.match(/custom_(\w+)/)[1] : f.getStyle(a, "list-style-type")
        }

        function c(c, g) {
            p.each(f.getElementsByTagName(c, "ol ul"), function (d) {
                if (f.inDoc(d, c)) {
                    var h = d.parentNode;
                    if (h.tagName == d.tagName) {
                        var k = b(d) || ("OL" == d.tagName ? "decimal" : "disc"), l = b(h) || ("OL" == h.tagName ? "decimal" :
                                "disc");
                        k == l && (k = p.indexOf(n[d.tagName], k), k = k + 1 == n[d.tagName].length ? 0 : k + 1, e(d, n[d.tagName][k]))
                    }
                    var q = 0, k = 2;
                    f.hasClass(d, /custom_/) ? /[ou]l/i.test(h.tagName) && f.hasClass(h, /custom_/) || (k = 1) : /[ou]l/i.test(h.tagName) && f.hasClass(h, /custom_/) && (k = 3);
                    (h = f.getStyle(d, "list-style-type")) && (d.style.cssText = "list-style-type:" + h);
                    d.className = p.trim(d.className.replace(/list-paddingleft-\w+/, "")) + " list-paddingleft-" + k;
                    p.each(f.getElementsByTagName(d, "li"), function (a) {
                        a.style.cssText && (a.style.cssText = "");
                        if (!a.firstChild)f.remove(a); else if (a.parentNode === d) {
                            q++;
                            if (f.hasClass(d, /custom_/)) {
                                var c = 1, e = b(d);
                                if ("OL" == d.tagName) {
                                    if (e)switch (e) {
                                        case "cn":
                                        case "cn1":
                                        case "cn2":
                                            10 < q && (0 == q % 10 || 10 < q && 20 > q) ? c = 2 : 20 < q && (c = 3);
                                            break;
                                        case "num2":
                                            9 < q && (c = 2)
                                    }
                                    a.className = "list-" + m[e] + q + " list-" + e + "-paddingleft-" + c
                                } else a.className = "list-" + m[e] + " list-" + e + "-paddingleft"
                            } else a.className = a.className.replace(/list-[\w\-]+/gi, "");
                            c = a.getAttribute("class");
                            null === c || c.replace(/\s/g, "") || f.removeAttributes(a, "class")
                        }
                    });
                    !g && a(d, d.tagName.toLowerCase(), b(d) || f.getStyle(d, "list-style-type"), !0)
                }
            })
        }

        function a(a, e, g, d) {
            var h = a.nextSibling;
            h && 1 == h.nodeType && h.tagName.toLowerCase() == e && (b(h) || f.getStyle(h, "list-style-type") || ("ol" == e ? "decimal" : "disc")) == g && (f.moveChild(h, a), 0 == h.childNodes.length && f.remove(h));
            h && f.isFillChar(h) && f.remove(h);
            (h = a.previousSibling) && 1 == h.nodeType && h.tagName.toLowerCase() == e && (b(h) || f.getStyle(h, "list-style-type") || ("ol" == e ? "decimal" : "disc")) == g && f.moveChild(a, h);
            h && f.isFillChar(h) && f.remove(h);
            !d && f.isEmptyBlock(a) && f.remove(a);
            b(a) && c(a.ownerDocument, !0)
        }

        function e(a, b) {
            m[b] && (a.className = "custom_" + b);
            try {
                f.setStyle(a, "list-style-type", b)
            } catch (c) {
            }
        }

        function h(a) {
            var b = a.previousSibling;
            b && f.isEmptyBlock(b) && f.remove(b);
            (b = a.nextSibling) && f.isEmptyBlock(b) && f.remove(b)
        }

        function g(a) {
            for (; a && !f.isBody(a);) {
                if ("TABLE" == a.nodeName)return null;
                if ("LI" == a.nodeName)return a;
                a = a.parentNode
            }
        }

        var l = this, k = {TD: 1, PRE: 1, BLOCKQUOTE: 1}, m = {
            cn: "cn-1-", cn1: "cn-2-", cn2: "cn-3-", num: "num-1-", num1: "num-2-",
            num2: "num-3-", dash: "dash", dot: "dot"
        };
        l.setOpt({
            autoTransWordToList: !1,
            insertorderedlist: {
                num: "",
                num1: "",
                num2: "",
                cn: "",
                cn1: "",
                cn2: "",
                decimal: "",
                "lower-alpha": "",
                "lower-roman": "",
                "upper-alpha": "",
                "upper-roman": ""
            },
            insertunorderedlist: {circle: "", disc: "", square: "", dash: "", dot: ""},
            listDefaultPaddingLeft: "30",
            listiconpath: "http://bs.baidu.com/listicon/",
            maxListLevel: -1,
            disablePInList: !1
        });
        var n = {
            OL: d(l.options.insertorderedlist),
            UL: d(l.options.insertunorderedlist)
        }, q = l.options.listiconpath, u;
        for (u in m)l.options.insertorderedlist.hasOwnProperty(u) ||
        l.options.insertunorderedlist.hasOwnProperty(u) || delete m[u];
        l.ready(function () {
            var a = [], b;
            for (b in m) {
                if ("dash" == b || "dot" == b)a.push("li.list-" + m[b] + "{background-image:url(" + q + m[b] + ".gif)}"), a.push("ul.custom_" + b + "{list-style:none;}ul.custom_" + b + " li{background-position:0 3px;background-repeat:no-repeat}"); else {
                    for (var c = 0; 99 > c; c++)a.push("li.list-" + m[b] + c + "{background-image:url(" + q + "list-" + m[b] + c + ".gif)}");
                    a.push("ol.custom_" + b + "{list-style:none;}ol.custom_" + b + " li{background-position:0 3px;background-repeat:no-repeat}")
                }
                switch (b) {
                    case "cn":
                        a.push("li.list-" +
                            b + "-paddingleft-1{padding-left:25px}");
                        a.push("li.list-" + b + "-paddingleft-2{padding-left:40px}");
                        a.push("li.list-" + b + "-paddingleft-3{padding-left:55px}");
                        break;
                    case "cn1":
                        a.push("li.list-" + b + "-paddingleft-1{padding-left:30px}");
                        a.push("li.list-" + b + "-paddingleft-2{padding-left:40px}");
                        a.push("li.list-" + b + "-paddingleft-3{padding-left:55px}");
                        break;
                    case "cn2":
                        a.push("li.list-" + b + "-paddingleft-1{padding-left:40px}");
                        a.push("li.list-" + b + "-paddingleft-2{padding-left:55px}");
                        a.push("li.list-" + b + "-paddingleft-3{padding-left:68px}");
                        break;
                    case "num":
                    case "num1":
                        a.push("li.list-" + b + "-paddingleft-1{padding-left:25px}");
                        break;
                    case "num2":
                        a.push("li.list-" + b + "-paddingleft-1{padding-left:35px}");
                        a.push("li.list-" + b + "-paddingleft-2{padding-left:40px}");
                        break;
                    case "dash":
                        a.push("li.list-" + b + "-paddingleft{padding-left:35px}");
                        break;
                    case "dot":
                        a.push("li.list-" + b + "-paddingleft{padding-left:20px}")
                }
            }
            a.push(".list-paddingleft-1{padding-left:0}");
            a.push(".list-paddingleft-2{padding-left:" + l.options.listDefaultPaddingLeft + "px}");
            a.push(".list-paddingleft-3{padding-left:" +
                2 * l.options.listDefaultPaddingLeft + "px}");
            p.cssRule("list", "ol,ul{margin:0;pading:0;" + (r.ie ? "" : "width:95%") + "}li{clear:both;}" + a.join("\n"), l.document)
        });
        l.ready(function () {
            f.on(l.body, "cut", function () {
                setTimeout(function () {
                    var a = l.selection.getRange(), b;
                    if (!a.collapsed && (b = f.findParentByTagName(a.startContainer, "li", !0)) && !b.nextSibling && f.isEmptyBlock(b)) {
                        b = b.parentNode;
                        var c;
                        (c = b.previousSibling) ? (f.remove(b), a.setStartAtLast(c).collapse(!0)) : (c = b.nextSibling) ? (f.remove(b), a.setStartAtFirst(c).collapse(!0)) :
                            (c = l.document.createElement("p"), f.fillNode(l.document, c), b.parentNode.insertBefore(c, b), f.remove(b), a.setStart(c, 0).collapse(!0));
                        a.select(!0)
                    }
                })
            })
        });
        l.addListener("beforepaste", function (a, c) {
            var e = this.selection.getRange(), g = UE.htmlparser(c.html, !0);
            if (e = f.findParentByTagName(e.startContainer, "li", !0)) {
                var d = e.parentNode;
                p.each(g.getNodesByTagName("OL" == d.tagName ? "ul" : "ol"), function (c) {
                    c.tagName = d.tagName;
                    c.setAttr();
                    if (c.parentNode === g)a = b(d) || ("OL" == d.tagName ? "decimal" : "disc"); else {
                        var e = c.parentNode.getAttr("class");
                        (a = e && /custom_/.test(e) ? e.match(/custom_(\w+)/)[1] : c.parentNode.getStyle("list-style-type")) || (a = "OL" == d.tagName ? "decimal" : "disc")
                    }
                    e = p.indexOf(n[d.tagName], a);
                    c.parentNode !== g && (e = e + 1 == n[d.tagName].length ? 0 : e + 1);
                    e = n[d.tagName][e];
                    m[e] ? c.setAttr("class", "custom_" + e) : c.setStyle("list-style-type", e)
                })
            }
            c.html = g.toHtml()
        });
        !0 === l.getOpt("disablePInList") && l.addOutputRule(function (a) {
            p.each(a.getNodesByTagName("li"), function (a) {
                var b = [], c = 0;
                p.each(a.children, function (e) {
                    if ("p" == e.tagName) {
                        for (var g; g = e.children.pop();)b.splice(c,
                            0, g), g.parentNode = a, lastNode = g;
                        g = b[b.length - 1];
                        g && "element" == g.type && "br" == g.tagName || (e = UE.uNode.createElement("br"), e.parentNode = a, b.push(e));
                        c = b.length
                    }
                });
                b.length && (a.children = b)
            })
        });
        l.addInputRule(function (a) {
            p.each(a.getNodesByTagName("li"), function (a) {
                for (var b = UE.uNode.createElement("p"), c = 0, e; e = a.children[c];)"text" == e.type || w.p[e.tagName] ? b.appendChild(e) : b.firstChild() ? (a.insertBefore(b, e), b = UE.uNode.createElement("p"), c += 2) : c++;
                (b.firstChild() && !b.parentNode || !a.firstChild()) && a.appendChild(b);
                b.firstChild() || b.innerHTML(r.ie ? "&nbsp;" : "<br/>");
                a = a.firstChild();
                (b = a.lastChild()) && "text" == b.type && /^\s*$/.test(b.data) && a.removeChild(b)
            });
            if (l.options.autoTransWordToList) {
                var b = function (a, b) {
                    var g = b.firstChild();
                    if (g && "element" == g.type && "span" == g.tagName && /Wingdings|Symbol/.test(g.getStyle("font-family"))) {
                        for (var d in e)if (e[d] == g.data)return d;
                        return "disc"
                    }
                    for (d in c)if (c[d].test(a))return d
                }, c = {
                    num1: /^\d+\)/,
                    decimal: /^\d+\./,
                    "lower-alpha": /^[a-z]+\)/,
                    "upper-alpha": /^[A-Z]+\./,
                    cn: /^[\u4E00\u4E8C\u4E09\u56DB\u516d\u4e94\u4e03\u516b\u4e5d]+[\u3001]/,
                    cn2: /^\([\u4E00\u4E8C\u4E09\u56DB\u516d\u4e94\u4e03\u516b\u4e5d]+\)/
                }, e = {square: "n"};
                p.each(a.getNodesByTagName("p"), function (a) {
                    if ("MsoListParagraph" == a.getAttr("class")) {
                        a.setStyle("margin", "");
                        a.setStyle("margin-left", "");
                        a.setAttr("class", "");
                        var e = a, g, d = a;
                        if ("li" != a.parentNode.tagName && (g = b(a.innerText(), a))) {
                            var h = UE.uNode.createElement(l.options.insertorderedlist.hasOwnProperty(g) ? "ol" : "ul");
                            for (m[g] ? h.setAttr("class", "custom_" + g) : h.setStyle("list-style-type", g); a && "li" != a.parentNode.tagName &&
                            b(a.innerText(), a);) {
                                (e = a.nextSibling()) || a.parentNode.insertBefore(h, a);
                                var k = h, f = g;
                                if ("ol" == k.tagName)if (r.ie) {
                                    var n = a.firstChild();
                                    "element" == n.type && "span" == n.tagName && c[f].test(n.innerText()) && a.removeChild(n)
                                } else a.innerHTML(a.innerHTML().replace(c[f], "")); else a.removeChild(a.firstChild());
                                f = UE.uNode.createElement("li");
                                f.appendChild(a);
                                k.appendChild(f);
                                a = e
                            }
                            !h.parentNode && a && a.parentNode && a.parentNode.insertBefore(h, a)
                        }
                        (e = d.firstChild()) && "element" == e.type && "span" == e.tagName && /^\s*(&nbsp;)+\s*$/.test(e.innerText()) &&
                        e.parentNode.removeChild(e)
                    }
                })
            }
        });
        l.addListener("contentchange", function () {
            c(l.document)
        });
        l.addListener("keydown", function (a, b) {
            function c() {
                b.preventDefault ? b.preventDefault() : b.returnValue = !1;
                l.fireEvent("contentchange");
                l.undoManger && l.undoManger.save()
            }

            function e(a, b) {
                for (; a && !f.isBody(a) && !b(a);) {
                    if (1 == a.nodeType && /[ou]l/i.test(a.tagName))return a;
                    a = a.parentNode
                }
                return null
            }

            var g = b.keyCode || b.which;
            if (13 == g && !b.shiftKey) {
                var d = l.selection.getRange(), k = f.findParent(d.startContainer, function (a) {
                        return f.isBlockElm(a)
                    },
                    !0), n = f.findParentByTagName(d.startContainer, "li", !0);
                k && "PRE" != k.tagName && !n && (n = k.innerHTML.replace(new RegExp(f.fillChar, "g"), ""), /^\s*1\s*\.[^\d]/.test(n) && (k.innerHTML = n.replace(/^\s*1\s*\./, ""), d.setStartAtLast(k).collapse(!0).select(), l.__hasEnterExecCommand = !0, l.execCommand("insertorderedlist"), l.__hasEnterExecCommand = !1));
                d = l.selection.getRange();
                k = e(d.startContainer, function (a) {
                    return "TABLE" == a.tagName
                });
                n = d.collapsed ? k : e(d.endContainer, function (a) {
                    return "TABLE" == a.tagName
                });
                if (k && n && k ===
                    n) {
                    if (!d.collapsed)if (k = f.findParentByTagName(d.startContainer, "li", !0), n = f.findParentByTagName(d.endContainer, "li", !0), k && n && k === n) {
                        if (d.deleteContents(), (n = f.findParentByTagName(d.startContainer, "li", !0)) && f.isEmptyBlock(n)) {
                            u = n.previousSibling;
                            next = n.nextSibling;
                            k = l.document.createElement("p");
                            f.fillNode(l.document, k);
                            q = n.parentNode;
                            u && next ? (d.setStart(next, 0).collapse(!0).select(!0), f.remove(n)) : ((u || next) && u ? n.parentNode.parentNode.insertBefore(k, q.nextSibling) : q.parentNode.insertBefore(k, q),
                                f.remove(n), q.firstChild || f.remove(q), d.setStart(k, 0).setCursor());
                            c();
                            return
                        }
                    } else {
                        var k = d.cloneRange(), m = k.collapse(!1).createBookmark();
                        d.deleteContents();
                        k.moveToBookmark(m);
                        n = f.findParentByTagName(k.startContainer, "li", !0);
                        h(n);
                        k.select();
                        c();
                        return
                    }
                    if (n = f.findParentByTagName(d.startContainer, "li", !0)) {
                        if (f.isEmptyBlock(n)) {
                            var m = d.createBookmark(), q = n.parentNode;
                            n !== q.lastChild ? (f.breakParent(n, q), h(n)) : (q.parentNode.insertBefore(n, q.nextSibling), f.isEmptyNode(q) && f.remove(q));
                            if (!w.$list[n.parentNode.tagName])if (f.isBlockElm(n.firstChild))f.remove(n,
                                !0); else {
                                k = l.document.createElement("p");
                                for (n.parentNode.insertBefore(k, n); n.firstChild;)k.appendChild(n.firstChild);
                                f.remove(n)
                            }
                            d.moveToBookmark(m).select()
                        } else {
                            k = n.firstChild;
                            if (!k || !f.isBlockElm(k)) {
                                k = l.document.createElement("p");
                                for (!n.firstChild && f.fillNode(l.document, k); n.firstChild;)k.appendChild(n.firstChild);
                                n.appendChild(k)
                            }
                            m = l.document.createElement("span");
                            d.insertNode(m);
                            f.breakParent(m, n);
                            u = m.nextSibling;
                            k = u.firstChild;
                            k || (k = l.document.createElement("p"), f.fillNode(l.document, k),
                                u.appendChild(k));
                            f.isEmptyNode(k) && (k.innerHTML = "", f.fillNode(l.document, k));
                            d.setStart(k, 0).collapse(!0).shrinkBoundary().select();
                            f.remove(m);
                            var u = u.previousSibling;
                            u && f.isEmptyBlock(u) && (u.innerHTML = "<p></p>", f.fillNode(l.document, u.firstChild))
                        }
                        c()
                    }
                }
            }
            if (8 == g && (d = l.selection.getRange(), d.collapsed && f.isStartInblock(d) && (k = d.cloneRange().trimBoundary(), (n = f.findParentByTagName(d.startContainer, "li", !0)) && f.isStartInblock(k))))if ((k = f.findParentByTagName(d.startContainer, "p", !0)) && k !== n.firstChild)q =
                f.findParentByTagName(k, ["ol", "ul"]), f.breakParent(k, q), h(k), l.fireEvent("contentchange"), d.setStart(k, 0).setCursor(!1, !0), l.fireEvent("saveScene"), f.preventDefault(b); else if (n && (u = n.previousSibling)) {
                if (46 != g || !n.childNodes.length) {
                    w.$list[u.tagName] && (u = u.lastChild);
                    l.undoManger && l.undoManger.save();
                    k = n.firstChild;
                    if (f.isBlockElm(k))if (f.isEmptyNode(k))for (u.appendChild(k), d.setStart(k, 0).setCursor(!1, !0); n.firstChild;)u.appendChild(n.firstChild); else m = l.document.createElement("span"), d.insertNode(m),
                    f.isEmptyBlock(u) && (u.innerHTML = ""), f.moveChild(n, u), d.setStartBefore(m).collapse(!0).select(!0), f.remove(m); else if (f.isEmptyNode(n))k = l.document.createElement("p"), u.appendChild(k), d.setStart(k, 0).setCursor(); else for (d.setEnd(u, u.childNodes.length).collapse().select(!0); n.firstChild;)u.appendChild(n.firstChild);
                    f.remove(n);
                    l.fireEvent("contentchange");
                    l.fireEvent("saveScene");
                    f.preventDefault(b)
                }
            } else if (n && !n.previousSibling) {
                q = n.parentNode;
                m = d.createBookmark();
                if (f.isTagNode(q.parentNode, "ol ul"))q.parentNode.insertBefore(n,
                    q); else {
                    for (; n.firstChild;)q.parentNode.insertBefore(n.firstChild, q);
                    f.remove(n)
                }
                f.isEmptyNode(q) && f.remove(q);
                d.moveToBookmark(m).setCursor(!1, !0);
                l.fireEvent("contentchange");
                l.fireEvent("saveScene");
                f.preventDefault(b)
            }
        });
        l.addListener("keyup", function (c, e) {
            if (8 == (e.keyCode || e.which)) {
                var g = l.selection.getRange(), d;
                (d = f.findParentByTagName(g.startContainer, ["ol", "ul"], !0)) && a(d, d.tagName.toLowerCase(), b(d) || f.getComputedStyle(d, "list-style-type"), !0)
            }
        });
        l.addListener("tabkeydown", function () {
            function c(a) {
                if (-1 !=
                    l.options.maxListLevel) {
                    a = a.parentNode;
                    for (var b = 0; /[ou]l/i.test(a.tagName);)b++, a = a.parentNode;
                    if (b >= l.options.maxListLevel)return !0
                }
            }

            var g = l.selection.getRange(), d = f.findParentByTagName(g.startContainer, "li", !0);
            if (d) {
                var h;
                if (g.collapsed) {
                    if (c(d))return !0;
                    var k = d.parentNode, m = l.document.createElement(k.tagName), q = p.indexOf(n[m.tagName], b(k) || f.getComputedStyle(k, "list-style-type")), q = q + 1 == n[m.tagName].length ? 0 : q + 1, q = n[m.tagName][q];
                    e(m, q);
                    if (f.isStartInblock(g))return l.fireEvent("saveScene"),
                        h = g.createBookmark(), k.insertBefore(m, d), m.appendChild(d), a(m, m.tagName.toLowerCase(), q), l.fireEvent("contentchange"), g.moveToBookmark(h).select(!0), !0
                } else {
                    l.fireEvent("saveScene");
                    h = g.createBookmark();
                    for (var k = 0, u, m = f.findParents(d), r; r = m[k++];)if (f.isTagNode(r, "ol ul")) {
                        u = r;
                        break
                    }
                    r = d;
                    if (h.end)for (; r && !(f.getPosition(r, h.end) & f.POSITION_FOLLOWING);)if (c(r))r = f.getNextDomNode(r, !1, null, function (a) {
                        return a !== u
                    }); else {
                        k = r.parentNode;
                        m = l.document.createElement(k.tagName);
                        q = p.indexOf(n[m.tagName],
                            b(k) || f.getComputedStyle(k, "list-style-type"));
                        q = n[m.tagName][q + 1 == n[m.tagName].length ? 0 : q + 1];
                        e(m, q);
                        for (k.insertBefore(m, r); r && !(f.getPosition(r, h.end) & f.POSITION_FOLLOWING);) {
                            d = r.nextSibling;
                            m.appendChild(r);
                            if (!d || f.isTagNode(d, "ol ul")) {
                                if (d)for (; (d = d.firstChild) && "LI" != d.tagName;); else d = f.getNextDomNode(r, !1, null, function (a) {
                                    return a !== u
                                });
                                break
                            }
                            r = d
                        }
                        a(m, m.tagName.toLowerCase(), q);
                        r = d
                    }
                    l.fireEvent("contentchange");
                    g.moveToBookmark(h).select();
                    return !0
                }
            }
        });
        l.commands.insertorderedlist = l.commands.insertunorderedlist =
        {
            execCommand: function (c, d) {
                d || (d = "insertorderedlist" == c.toLowerCase() ? "decimal" : "disc");
                var h = this.selection.getRange(), l = function (a) {
                    return 1 == a.nodeType ? "br" != a.tagName.toLowerCase() : !f.isWhitespace(a)
                }, n = "insertorderedlist" == c.toLowerCase() ? "ol" : "ul", m = this.document.createDocumentFragment();
                h.adjustmentBoundary().shrinkBoundary();
                var q = h.createBookmark(!0), u = g(this.document.getElementById(q.start)), p = 0, r = g(this.document.getElementById(q.end)), t = 0, A, I, E, C;
                if (u || r) {
                    u && (A = u.parentNode);
                    q.end || (r =
                        u);
                    r && (I = r.parentNode);
                    if (A === I) {
                        for (; u !== r;) {
                            C = u;
                            u = u.nextSibling;
                            if (!f.isBlockElm(C.firstChild)) {
                                for (l = this.document.createElement("p"); C.firstChild;)l.appendChild(C.firstChild);
                                C.appendChild(l)
                            }
                            m.appendChild(C)
                        }
                        C = this.document.createElement("span");
                        A.insertBefore(C, r);
                        if (!f.isBlockElm(r.firstChild)) {
                            for (l = this.document.createElement("p"); r.firstChild;)l.appendChild(r.firstChild);
                            r.appendChild(l)
                        }
                        m.appendChild(r);
                        f.breakParent(C, A);
                        f.isEmptyNode(C.previousSibling) && f.remove(C.previousSibling);
                        f.isEmptyNode(C.nextSibling) &&
                        f.remove(C.nextSibling);
                        l = b(A) || f.getComputedStyle(A, "list-style-type") || ("insertorderedlist" == c.toLowerCase() ? "decimal" : "disc");
                        if (A.tagName.toLowerCase() == n && l == d) {
                            r = 0;
                            for (r = this.document.createDocumentFragment(); l = m.firstChild;)if (f.isTagNode(l, "ol ul"))r.appendChild(l); else for (; l.firstChild;)r.appendChild(l.firstChild), f.remove(l);
                            C.parentNode.insertBefore(r, C)
                        } else E = this.document.createElement(n), e(E, d), E.appendChild(m), C.parentNode.insertBefore(E, C);
                        f.remove(C);
                        E && a(E, n, d);
                        h.moveToBookmark(q).select();
                        return
                    }
                    if (u) {
                        for (; u;) {
                            C = u.nextSibling;
                            if (f.isTagNode(u, "ol ul"))m.appendChild(u); else {
                                E = this.document.createDocumentFragment();
                                for (var P = 0; u.firstChild;)f.isBlockElm(u.firstChild) && (P = 1), E.appendChild(u.firstChild);
                                P ? m.appendChild(E) : (P = this.document.createElement("p"), P.appendChild(E), m.appendChild(P));
                                f.remove(u)
                            }
                            u = C
                        }
                        A.parentNode.insertBefore(m, A.nextSibling);
                        f.isEmptyNode(A) ? (h.setStartBefore(A), f.remove(A)) : h.setStartAfter(A);
                        p = 1
                    }
                    if (r && f.inDoc(I, this.document)) {
                        for (u = I.firstChild; u && u !== r;) {
                            C =
                                u.nextSibling;
                            if (f.isTagNode(u, "ol ul"))m.appendChild(u); else {
                                E = this.document.createDocumentFragment();
                                for (P = 0; u.firstChild;)f.isBlockElm(u.firstChild) && (P = 1), E.appendChild(u.firstChild);
                                P ? m.appendChild(E) : (P = this.document.createElement("p"), P.appendChild(E), m.appendChild(P));
                                f.remove(u)
                            }
                            u = C
                        }
                        C = f.createElement(this.document, "div", {tmpDiv: 1});
                        f.moveChild(r, C);
                        m.appendChild(C);
                        f.remove(r);
                        I.parentNode.insertBefore(m, I);
                        h.setEndBefore(I);
                        f.isEmptyNode(I) && f.remove(I);
                        t = 1
                    }
                }
                p || h.setStartBefore(this.document.getElementById(q.start));
                q.end && !t && h.setEndAfter(this.document.getElementById(q.end));
                h.enlarge(!0, function (a) {
                    return k[a.tagName]
                });
                m = this.document.createDocumentFragment();
                r = h.createBookmark();
                A = f.getNextDomNode(r.start, !1, l);
                E = h.cloneRange();
                for (p = f.isBlockElm; A && A !== r.end && f.getPosition(A, r.end) & f.POSITION_PRECEDING;)if (3 == A.nodeType || w.li[A.tagName])if (1 == A.nodeType && w.$list[A.tagName]) {
                    for (; A.firstChild;)m.appendChild(A.firstChild);
                    u = f.getNextDomNode(A, !1, l);
                    f.remove(A);
                    A = u
                } else {
                    u = A;
                    for (E.setStartBefore(A); A && A !==
                    r.end && (!p(A) || f.isBookmarkNode(A));)u = A, A = f.getNextDomNode(A, !1, null, function (a) {
                        return !k[a.tagName]
                    });
                    A && p(A) && (C = f.getNextDomNode(u, !1, l)) && f.isBookmarkNode(C) && (A = f.getNextDomNode(C, !1, l), u = C);
                    E.setEndAfter(u);
                    A = f.getNextDomNode(u, !1, l);
                    C = h.document.createElement("li");
                    C.appendChild(E.extractContents());
                    if (f.isEmptyNode(C)) {
                        for (u = h.document.createElement("p"); C.firstChild;)u.appendChild(C.firstChild);
                        C.appendChild(u)
                    }
                    m.appendChild(C)
                } else A = f.getNextDomNode(A, !0, l);
                h.moveToBookmark(r).collapse(!0);
                E = this.document.createElement(n);
                e(E, d);
                E.appendChild(m);
                h.insertNode(E);
                a(E, n, d);
                r = 0;
                for (n = f.getElementsByTagName(E, "div"); l = n[r++];)l.getAttribute("tmpDiv") && f.remove(l, !0);
                h.moveToBookmark(q).select()
            }, queryCommandState: function (a) {
            a = "insertorderedlist" == a.toLowerCase() ? "ol" : "ul";
            for (var b = this.selection.getStartElementPath(), c = 0, e; (e = b[c++]) && "TABLE" != e.nodeName;)if (a == e.nodeName.toLowerCase())return 1;
            return 0
        }, queryCommandValue: function (a) {
            a = "insertorderedlist" == a.toLowerCase() ? "ol" : "ul";
            for (var c =
                this.selection.getStartElementPath(), e, g = 0, d; d = c[g++];) {
                if ("TABLE" == d.nodeName) {
                    e = null;
                    break
                }
                if (a == d.nodeName.toLowerCase()) {
                    e = d;
                    break
                }
            }
            return e ? b(e) || f.getComputedStyle(e, "list-style-type") : null
        }
        }
    };
    (function () {
        var d = {
            textarea: function (b, c) {
                var a = c.ownerDocument.createElement("textarea");
                a.style.cssText = "position:absolute;resize:none;width:100%;height:100%;border:0;padding:0;margin:0;overflow-y:auto;";
                r.ie && 8 > r.version && (a.style.width = c.offsetWidth + "px", a.style.height = c.offsetHeight + "px", c.onresize =
                    function () {
                        a.style.width = c.offsetWidth + "px";
                        a.style.height = c.offsetHeight + "px"
                    });
                c.appendChild(a);
                return {
                    setContent: function (b) {
                        a.value = b
                    }, getContent: function () {
                        return a.value
                    }, select: function () {
                        var b;
                        r.ie ? (b = a.createTextRange(), b.collapse(!0), b.select()) : (a.setSelectionRange(0, 0), a.focus())
                    }, dispose: function () {
                        c.removeChild(a);
                        c = a = c.onresize = null
                    }
                }
            }, codemirror: function (b, c) {
                var a = window.CodeMirror(c, {
                    mode: "text/html",
                    tabMode: "indent",
                    lineNumbers: !0,
                    lineWrapping: !0
                }), e = a.getWrapperElement();
                e.style.cssText =
                    'position:absolute;left:0;top:0;width:100%;height:100%;font-family:consolas,"Courier new",monospace;font-size:13px;';
                a.getScrollerElement().style.cssText = "position:absolute;left:0;top:0;width:100%;height:100%;";
                a.refresh();
                return {
                    getCodeMirror: function () {
                        return a
                    }, setContent: function (b) {
                        a.setValue(b)
                    }, getContent: function () {
                        return a.getValue()
                    }, select: function () {
                        a.focus()
                    }, dispose: function () {
                        c.removeChild(e);
                        a = e = null
                    }
                }
            }
        };
        UE.plugins.source = function () {
            var b = this, c = this.options, a = !1, e, h;
            c.sourceEditor =
                r.ie ? "textarea" : c.sourceEditor || "codemirror";
            b.setOpt({sourceEditorFirst: !1});
            var g, l, k;
            b.commands.source = {
                execCommand: function () {
                    if (a = !a) {
                        k = b.selection.getRange().createAddress(!1, !0);
                        b.undoManger && b.undoManger.save(!0);
                        r.gecko && (b.body.contentEditable = !1);
                        g = b.iframe.style.cssText;
                        b.iframe.style.cssText += "position:absolute;left:-32768px;top:-32768px;";
                        b.fireEvent("beforegetcontent");
                        var n = UE.htmlparser(b.body.innerHTML);
                        b.filterOutputRule(n);
                        n.traversal(function (a) {
                            if ("element" == a.type)switch (a.tagName) {
                                case "td":
                                case "th":
                                case "caption":
                                    a.children &&
                                    1 == a.children.length && "br" == a.firstChild().tagName && a.removeChild(a.firstChild());
                                    break;
                                case "pre":
                                    a.innerText(a.innerText().replace(/&nbsp;/g, " "))
                            }
                        });
                        b.fireEvent("aftergetcontent");
                        n = n.toHtml(!0);
                        e = d["codemirror" == c.sourceEditor && window.CodeMirror ? "codemirror" : "textarea"](b, b.iframe.parentNode);
                        e.setContent(n);
                        h = b.setContent;
                        b.setContent = function (a) {
                            a = UE.htmlparser(a);
                            b.filterInputRule(a);
                            a = a.toHtml();
                            e.setContent(a)
                        };
                        setTimeout(function () {
                            e.select();
                            b.addListener("fullscreenchanged", function () {
                                try {
                                    e.getCodeMirror().refresh()
                                } catch (a) {
                                }
                            })
                        });
                        l = b.getContent;
                        b.getContent = function () {
                            return e.getContent() || "<p>" + (r.ie ? "" : "<br/>") + "</p>"
                        }
                    } else if (b.iframe.style.cssText = g, n = e.getContent() || "<p>" + (r.ie ? "" : "<br/>") + "</p>", n = n.replace(RegExp("[\\r\\t\\n ]*</?(\\w+)\\s*(?:[^>]*)>", "g"), function (a, b) {
                            return b && !w.$inlineWithA[b.toLowerCase()] ? a.replace(/(^[\n\r\t ]*)|([\n\r\t ]*$)/g, "") : a.replace(/(^[\n\r\t]*)|([\n\r\t]*$)/g, "")
                        }), b.setContent = h, b.setContent(n), e.dispose(), e = null, b.getContent = l, n = b.body.firstChild, n || (b.body.innerHTML = "<p>" + (r.ie ?
                                "" : "<br/>") + "</p>", n = b.body.firstChild), b.undoManger && b.undoManger.save(!0), r.gecko) {
                        var m = document.createElement("input");
                        m.style.cssText = "position:absolute;left:0;top:-32768px";
                        document.body.appendChild(m);
                        b.body.contentEditable = !1;
                        setTimeout(function () {
                            f.setViewportOffset(m, {left: -32768, top: 0});
                            m.focus();
                            setTimeout(function () {
                                b.body.contentEditable = !0;
                                b.selection.getRange().moveToAddress(k).select(!0);
                                f.remove(m)
                            })
                        })
                    } else try {
                        b.selection.getRange().moveToAddress(k).select(!0)
                    } catch (u) {
                    }
                    this.fireEvent("sourcemodechanged",
                        a)
                }, queryCommandState: function () {
                    return a | 0
                }, notNeedUndo: 1
            };
            var m = b.queryCommandState;
            b.queryCommandState = function (b) {
                b = b.toLowerCase();
                return a ? b in{source: 1, fullscreen: 1} ? 1 : -1 : m.apply(this, arguments)
            };
            "codemirror" == c.sourceEditor && b.addListener("ready", function () {
                p.loadFile(document, {
                    src: c.codeMirrorJsUrl || c.UEDITOR_HOME_URL + "third-party/codemirror/codemirror.js",
                    tag: "script",
                    type: "text/javascript",
                    defer: "defer"
                }, function () {
                    c.sourceEditorFirst && setTimeout(function () {
                        b.execCommand("source")
                    }, 0)
                });
                p.loadFile(document, {
                    tag: "link",
                    rel: "stylesheet",
                    type: "text/css",
                    href: c.codeMirrorCssUrl || c.UEDITOR_HOME_URL + "third-party/codemirror/codemirror.css"
                })
            })
        }
    })();
    UE.plugins.enterkey = function () {
        var d, b = this, c = b.options.enterTag;
        b.addListener("keyup", function (a, c) {
            if (13 == (c.keyCode || c.which)) {
                var h = b.selection.getRange(), g = h.startContainer, l;
                if (r.ie)b.fireEvent("saveScene", !0, !0); else {
                    if (/h\d/i.test(d)) {
                        if (r.gecko)f.findParentByTagName(g, "h1 h2 h3 h4 h5 h6 blockquote caption table".split(" "), !0) || (b.document.execCommand("formatBlock",
                            !1, "<p>"), l = 1); else if (1 == g.nodeType) {
                            var g = b.document.createTextNode(""), k;
                            h.insertNode(g);
                            if (k = f.findParentByTagName(g, "div", !0)) {
                                for (l = b.document.createElement("p"); k.firstChild;)l.appendChild(k.firstChild);
                                k.parentNode.insertBefore(l, k);
                                f.remove(k);
                                h.setStartBefore(g).setCursor();
                                l = 1
                            }
                            f.remove(g)
                        }
                        b.undoManger && l && b.undoManger.save()
                    }
                    r.opera && h.select()
                }
            }
        });
        b.addListener("keydown", function (a, e) {
            if (13 == (e.keyCode || e.which))if (b.fireEvent("beforeenterkeydown"))f.preventDefault(e); else {
                b.fireEvent("saveScene",
                    !0, !0);
                d = "";
                var h = b.selection.getRange();
                if (!h.collapsed) {
                    var g = h.startContainer, l = h.endContainer, g = f.findParentByTagName(g, "td", !0), l = f.findParentByTagName(l, "td", !0);
                    if (g && l && g !== l || !g && l || g && !l) {
                        e.preventDefault ? e.preventDefault() : e.returnValue = !1;
                        return
                    }
                }
                if ("p" == c)r.ie || ((g = f.findParentByTagName(h.startContainer, "ol ul p h1 h2 h3 h4 h5 h6 blockquote caption".split(" "), !0)) || r.opera ? (d = g.tagName, "p" == g.tagName.toLowerCase() && r.gecko && f.removeDirtyAttr(g)) : (b.document.execCommand("formatBlock",
                    !1, "<p>"), r.gecko && (h = b.selection.getRange(), (g = f.findParentByTagName(h.startContainer, "p", !0)) && f.removeDirtyAttr(g)))); else if (e.preventDefault ? e.preventDefault() : e.returnValue = !1, h.collapsed)l = h.document.createElement("br"), h.insertNode(l), l.parentNode.lastChild === l ? (l.parentNode.insertBefore(l.cloneNode(!0), l), h.setStartBefore(l)) : h.setStartAfter(l), h.setCursor(); else if (h.deleteContents(), g = h.startContainer, 1 == g.nodeType && (g = g.childNodes[h.startOffset])) {
                    for (; 1 == g.nodeType;) {
                        if (w.$empty[g.tagName])return h.setStartBefore(g).setCursor(),
                        b.undoManger && b.undoManger.save(), !1;
                        if (!g.firstChild)return l = h.document.createElement("br"), g.appendChild(l), h.setStart(g, 0).setCursor(), b.undoManger && b.undoManger.save(), !1;
                        g = g.firstChild
                    }
                    g === h.startContainer.childNodes[h.startOffset] ? (l = h.document.createElement("br"), h.insertNode(l).setCursor()) : h.setStart(g, 0).setCursor()
                } else l = h.document.createElement("br"), h.insertNode(l).setStartAfter(l).setCursor()
            }
        })
    };
    UE.plugins.keystrokes = function () {
        var d = this, b = !0;
        d.addListener("keydown", function (c, a) {
            var e =
                a.keyCode || a.which, h = d.selection.getRange();
            if (!(h.collapsed || a.ctrlKey || a.shiftKey || a.altKey || a.metaKey) && (65 <= e && 90 >= e || 48 <= e && 57 >= e || 96 <= e && 111 >= e || {
                    13: 1,
                    8: 1,
                    46: 1
                }[e])) {
                var g = h.startContainer;
                f.isFillChar(g) && h.setStartBefore(g);
                g = h.endContainer;
                f.isFillChar(g) && h.setEndAfter(g);
                h.txtToElmBoundary();
                h.endContainer && 1 == h.endContainer.nodeType && (g = h.endContainer.childNodes[h.endOffset]) && f.isBr(g) && h.setEndAfter(g);
                if (0 == h.startOffset && (g = h.startContainer, f.isBoundaryNode(g, "firstChild") && (g = h.endContainer,
                    h.endOffset == (3 == g.nodeType ? g.nodeValue.length : g.childNodes.length) && f.isBoundaryNode(g, "lastChild")))) {
                    d.fireEvent("saveScene");
                    d.body.innerHTML = "<p>" + (r.ie ? "" : "<br/>") + "</p>";
                    h.setStart(d.body.firstChild, 0).setCursor(!1, !0);
                    d._selectionChange();
                    return
                }
            }
            if (e == ja.Backspace) {
                h = d.selection.getRange();
                b = h.collapsed;
                if (d.fireEvent("delkeydown", a))return;
                var l, k;
                h.collapsed && h.inFillChar() && (l = h.startContainer, f.isFillChar(l) ? (h.setStartBefore(l).shrinkBoundary(!0).collapse(!0), f.remove(l)) : (l.nodeValue =
                    l.nodeValue.replace(new RegExp("^" + f.fillChar), ""), h.startOffset--, h.collapse(!0).select(!0)));
                if (l = h.getClosedNode()) {
                    d.fireEvent("saveScene");
                    h.setStartBefore(l);
                    f.remove(l);
                    h.setCursor();
                    d.fireEvent("saveScene");
                    f.preventDefault(a);
                    return
                }
                if (!r.ie && (l = f.findParentByTagName(h.startContainer, "table", !0), k = f.findParentByTagName(h.endContainer, "table", !0), l && !k || !l && k || l !== k)) {
                    a.preventDefault();
                    return
                }
            }
            if (e == ja.Tab) {
                var m = {ol: 1, ul: 1, table: 1};
                if (d.fireEvent("tabkeydown", a)) {
                    f.preventDefault(a);
                    return
                }
                h =
                    d.selection.getRange();
                d.fireEvent("saveScene");
                var g = 0, n = "";
                l = d.options.tabSize || 4;
                for (k = d.options.tabNode || "&nbsp;"; g < l; g++)n += k;
                g = d.document.createElement("span");
                g.innerHTML = n + f.fillChar;
                if (h.collapsed)h.insertNode(g.cloneNode(!0).firstChild).setCursor(!0); else if (n = function (a) {
                        return f.isBlockElm(a) && !m[a.tagName.toLowerCase()]
                    }, l = f.findParent(h.startContainer, n, !0), k = f.findParent(h.endContainer, n, !0), l && k && l === k)h.deleteContents(), h.insertNode(g.cloneNode(!0).firstChild).setCursor(!0); else {
                    l =
                        h.createBookmark();
                    h.enlarge(!0);
                    k = h.createBookmark();
                    for (var q = f.getNextDomNode(k.start, !1, n); q && !(f.getPosition(q, k.end) & f.POSITION_FOLLOWING);)q.insertBefore(g.cloneNode(!0).firstChild, q.firstChild), q = f.getNextDomNode(q, !1, n);
                    h.moveToBookmark(k).moveToBookmark(l).select()
                }
                f.preventDefault(a)
            }
            if (r.gecko && 46 == e && (h = d.selection.getRange(), h.collapsed && (l = h.startContainer, f.isEmptyBlock(l)))) {
                for (e = l.parentNode; 1 == f.getChildCount(e) && !f.isBody(e);)l = e, e = e.parentNode;
                l === e.lastChild && a.preventDefault()
            }
        });
        d.addListener("keyup", function (c, a) {
            var e;
            if ((a.keyCode || a.which) == ja.Backspace && !this.fireEvent("delkeyup")) {
                e = this.selection.getRange();
                if (e.collapsed) {
                    var d;
                    if ((d = f.findParentByTagName(e.startContainer, "h1 h2 h3 h4 h5 h6".split(" "), !0)) && f.isEmptyBlock(d)) {
                        var g = d.previousSibling;
                        if (g && "TABLE" != g.nodeName) {
                            f.remove(d);
                            e.setStartAtLast(g).setCursor(!1, !0);
                            return
                        }
                        if ((g = d.nextSibling) && "TABLE" != g.nodeName) {
                            f.remove(d);
                            e.setStartAtFirst(g).setCursor(!1, !0);
                            return
                        }
                    }
                    f.isBody(e.startContainer) && (d = f.createElement(this.document,
                        "p", {innerHTML: r.ie ? f.fillChar : "<br/>"}), e.insertNode(d).setStart(d, 0).setCursor(!1, !0))
                }
                !b && (3 == e.startContainer.nodeType || 1 == e.startContainer.nodeType && f.isEmptyBlock(e.startContainer)) && (r.ie ? (d = e.document.createElement("span"), e.insertNode(d).setStartBefore(d).collapse(!0), e.select(), f.remove(d)) : e.select())
            }
        })
    };
    UE.plugins.fiximgclick = function () {
        function d() {
            this.cover = this.resizer = this.editor = null;
            this.doc = document;
            this.prePos = {x: 0, y: 0};
            this.startPos = {x: 0, y: 0}
        }

        var b = !1;
        (function () {
            var c = [[0,
                0, -1, -1], [0, 0, 0, -1], [0, 0, 1, -1], [0, 0, -1, 0], [0, 0, 1, 0], [0, 0, -1, 1], [0, 0, 0, 1], [0, 0, 1, 1]];
            d.prototype = {
                init: function (a) {
                    var b = this;
                    b.editor = a;
                    b.startPos = this.prePos = {x: 0, y: 0};
                    b.dragId = -1;
                    a = [];
                    var c = b.cover = document.createElement("div"), g = b.resizer = document.createElement("div");
                    c.id = b.editor.ui.id + "_imagescale_cover";
                    c.style.cssText = "position:absolute;display:none;z-index:" + b.editor.options.zIndex + ";filter:alpha(opacity=0); opacity:0;background:#CCC;";
                    f.on(c, "mousedown click", function () {
                        b.hide()
                    });
                    for (i =
                             0; 8 > i; i++)a.push('<span class="edui-editor-imagescale-hand' + i + '"></span>');
                    g.id = b.editor.ui.id + "_imagescale";
                    g.className = "edui-editor-imagescale";
                    g.innerHTML = a.join("");
                    g.style.cssText += ";display:none;border:1px solid #3b77ff;z-index:" + b.editor.options.zIndex + ";";
                    b.editor.ui.getDom().appendChild(c);
                    b.editor.ui.getDom().appendChild(g);
                    b.initStyle();
                    b.initEvents()
                }, initStyle: function () {
                    p.cssRule("imagescale", ".edui-editor-imagescale{display:none;position:absolute;border:1px solid #38B2CE;cursor:hand;-webkit-box-sizing: content-box;-moz-box-sizing: content-box;box-sizing: content-box;}.edui-editor-imagescale span{position:absolute;width:6px;height:6px;overflow:hidden;font-size:0px;display:block;background-color:#3C9DD0;}.edui-editor-imagescale .edui-editor-imagescale-hand0{cursor:nw-resize;top:0;margin-top:-4px;left:0;margin-left:-4px;}.edui-editor-imagescale .edui-editor-imagescale-hand1{cursor:n-resize;top:0;margin-top:-4px;left:50%;margin-left:-4px;}.edui-editor-imagescale .edui-editor-imagescale-hand2{cursor:ne-resize;top:0;margin-top:-4px;left:100%;margin-left:-3px;}.edui-editor-imagescale .edui-editor-imagescale-hand3{cursor:w-resize;top:50%;margin-top:-4px;left:0;margin-left:-4px;}.edui-editor-imagescale .edui-editor-imagescale-hand4{cursor:e-resize;top:50%;margin-top:-4px;left:100%;margin-left:-3px;}.edui-editor-imagescale .edui-editor-imagescale-hand5{cursor:sw-resize;top:100%;margin-top:-3px;left:0;margin-left:-4px;}.edui-editor-imagescale .edui-editor-imagescale-hand6{cursor:s-resize;top:100%;margin-top:-3px;left:50%;margin-left:-4px;}.edui-editor-imagescale .edui-editor-imagescale-hand7{cursor:se-resize;top:100%;margin-top:-3px;left:100%;margin-left:-3px;}")
                },
                initEvents: function () {
                    this.startPos.x = this.startPos.y = 0;
                    this.isDraging = !1
                }, _eventHandler: function (a) {
                    switch (a.type) {
                        case "mousedown":
                            var c = a.target || a.srcElement;
                            -1 != c.className.indexOf("edui-editor-imagescale-hand") && -1 == this.dragId && (this.dragId = c.className.slice(-1), this.startPos.x = this.prePos.x = a.clientX, this.startPos.y = this.prePos.y = a.clientY, f.on(this.doc, "mousemove", this.proxy(this._eventHandler, this)));
                            break;
                        case "mousemove":
                            -1 != this.dragId && (this.updateContainerStyle(this.dragId, {
                                x: a.clientX -
                                this.prePos.x, y: a.clientY - this.prePos.y
                            }), this.prePos.x = a.clientX, this.prePos.y = a.clientY, b = !0, this.updateTargetElement());
                            break;
                        case "mouseup":
                            -1 != this.dragId && (this.updateContainerStyle(this.dragId, {
                                x: a.clientX - this.prePos.x,
                                y: a.clientY - this.prePos.y
                            }), this.updateTargetElement(), this.target.parentNode && this.attachTo(this.target), this.dragId = -1), f.un(this.doc, "mousemove", this.proxy(this._eventHandler, this)), b && (b = !1, this.editor.fireEvent("contentchange"))
                    }
                }, updateTargetElement: function () {
                    f.setStyles(this.target,
                        {width: this.resizer.style.width, height: this.resizer.style.height});
                    this.target.width = parseInt(this.resizer.style.width);
                    this.target.height = parseInt(this.resizer.style.height);
                    this.attachTo(this.target)
                }, updateContainerStyle: function (a, b) {
                    var d = this.resizer, g;
                    0 != c[a][0] && (g = parseInt(d.style.left) + b.x, d.style.left = this._validScaledProp("left", g) + "px");
                    0 != c[a][1] && (g = parseInt(d.style.top) + b.y, d.style.top = this._validScaledProp("top", g) + "px");
                    0 != c[a][2] && (g = d.clientWidth + c[a][2] * b.x, d.style.width = this._validScaledProp("width",
                            g) + "px");
                    0 != c[a][3] && (g = d.clientHeight + c[a][3] * b.y, d.style.height = this._validScaledProp("height", g) + "px")
                }, _validScaledProp: function (a, b) {
                    var c = this.resizer, g = document;
                    b = isNaN(b) ? 0 : b;
                    switch (a) {
                        case "left":
                            return 0 > b ? 0 : b + c.clientWidth > g.clientWidth ? g.clientWidth - c.clientWidth : b;
                        case "top":
                            return 0 > b ? 0 : b + c.clientHeight > g.clientHeight ? g.clientHeight - c.clientHeight : b;
                        case "width":
                            return 0 >= b ? 1 : b + c.offsetLeft > g.clientWidth ? g.clientWidth - c.offsetLeft : b;
                        case "height":
                            return 0 >= b ? 1 : b + c.offsetTop > g.clientHeight ?
                            g.clientHeight - c.offsetTop : b
                    }
                }, hideCover: function () {
                    this.cover.style.display = "none"
                }, showCover: function () {
                    var a = f.getXY(this.editor.ui.getDom()), b = f.getXY(this.editor.iframe);
                    f.setStyles(this.cover, {
                        width: this.editor.iframe.offsetWidth + "px",
                        height: this.editor.iframe.offsetHeight + "px",
                        top: b.y - a.y + "px",
                        left: b.x - a.x + "px",
                        position: "absolute",
                        display: ""
                    })
                }, show: function (a) {
                    this.resizer.style.display = "block";
                    a && this.attachTo(a);
                    f.on(this.resizer, "mousedown", this.proxy(this._eventHandler, this));
                    f.on(this.doc,
                        "mouseup", this.proxy(this._eventHandler, this));
                    this.showCover();
                    this.editor.fireEvent("afterscaleshow", this);
                    this.editor.fireEvent("saveScene")
                }, hide: function () {
                    this.hideCover();
                    this.resizer.style.display = "none";
                    f.un(this.resizer, "mousedown", this.proxy(this._eventHandler, this));
                    f.un(this.doc, "mouseup", this.proxy(this._eventHandler, this));
                    this.editor.fireEvent("afterscalehide", this)
                }, proxy: function (a, b) {
                    return function (c) {
                        return a.apply(b || this, arguments)
                    }
                }, attachTo: function (a) {
                    a = this.target = a;
                    var b =
                        this.resizer, c = f.getXY(a), g = f.getXY(this.editor.iframe), d = f.getXY(b.parentNode);
                    f.setStyles(b, {
                        width: a.width + "px",
                        height: a.height + "px",
                        left: g.x + c.x - this.editor.document.body.scrollLeft - d.x - parseInt(b.style.borderLeftWidth) + "px",
                        top: g.y + c.y - this.editor.document.body.scrollTop - d.y - parseInt(b.style.borderTopWidth) + "px"
                    })
                }
            }
        })();
        return function () {
            var b = this, a;
            b.setOpt("imageScaleEnabled", !0);
            !r.ie && b.options.imageScaleEnabled && b.addListener("click", function (e, h) {
                var g = b.selection.getRange().getClosedNode();
                if (g && "IMG" == g.tagName && "false" != b.body.contentEditable) {
                    if (!(-1 != g.className.indexOf("edui-faked-music") || g.getAttribute("anchorname") || f.hasClass(g, "loadingclass") || f.hasClass(g, "loaderrorclass"))) {
                        if (!a) {
                            a = new d;
                            a.init(b);
                            b.ui.getDom().appendChild(a.resizer);
                            var l = function (e) {
                                a.hide();
                                a.target && b.selection.getRange().selectNode(a.target).select()
                            }, k = function (a) {
                                var b = a.target || a.srcElement;
                                !b || void 0 !== b.className && -1 != b.className.indexOf("edui-editor-imagescale") || l(a)
                            }, m;
                            b.addListener("afterscaleshow",
                                function (a) {
                                    b.addListener("beforekeydown", l);
                                    b.addListener("beforemousedown", k);
                                    f.on(document, "keydown", l);
                                    f.on(document, "mousedown", k);
                                    b.selection.getNative().removeAllRanges()
                                });
                            b.addListener("afterscalehide", function (e) {
                                b.removeListener("beforekeydown", l);
                                b.removeListener("beforemousedown", k);
                                f.un(document, "keydown", l);
                                f.un(document, "mousedown", k);
                                e = a.target;
                                e.parentNode && b.selection.getRange().selectNode(e).select()
                            });
                            f.on(a.resizer, "mousedown", function (e) {
                                b.selection.getNative().removeAllRanges();
                                var g = e.target || e.srcElement;
                                g && -1 == g.className.indexOf("edui-editor-imagescale-hand") && (m = setTimeout(function () {
                                    a.hide();
                                    a.target && b.selection.getRange().selectNode(g).select()
                                }, 200))
                            });
                            f.on(a.resizer, "mouseup", function (a) {
                                (a = a.target || a.srcElement) && -1 == a.className.indexOf("edui-editor-imagescale-hand") && clearTimeout(m)
                            })
                        }
                        a.show(g)
                    }
                } else a && "none" != a.resizer.style.display && a.hide()
            });
            r.webkit && b.addListener("click", function (a, d) {
                "IMG" == d.target.tagName && "false" != b.body.contentEditable && (new M.Range(b.document)).selectNode(d.target).select()
            })
        }
    }();
    UE.plugin.register("autolink", function () {
        return r.ie ? {} : {
            bindEvents: {
                reset: function () {
                }, keydown: function (d, b) {
                    var c = b.keyCode || b.which;
                    if (32 == c || 13 == c) {
                        for (var c = this.selection.getNative(), a = c.getRangeAt(0).cloneRange(), e, h = a.startContainer; 1 == h.nodeType && 0 < a.startOffset;) {
                            h = a.startContainer.childNodes[a.startOffset - 1];
                            if (!h)break;
                            a.setStart(h, 1 == h.nodeType ? h.childNodes.length : h.nodeValue.length);
                            a.collapse(!0);
                            h = a.startContainer
                        }
                        do {
                            if (0 == a.startOffset) {
                                for (h = a.startContainer.previousSibling; h && 1 ==
                                h.nodeType;)h = h.lastChild;
                                if (!h || f.isFillChar(h))break;
                                e = h.nodeValue.length
                            } else h = a.startContainer, e = a.startOffset;
                            a.setStart(h, e - 1);
                            e = a.toString().charCodeAt(0)
                        } while (160 != e && 32 != e);
                        if (a.toString().replace(new RegExp(f.fillChar, "g"), "").match(/(?:https?:\/\/|ssh:\/\/|ftp:\/\/|file:\/|www\.)/i)) {
                            for (; a.toString().length && !/^(?:https?:\/\/|ssh:\/\/|ftp:\/\/|file:\/|www\.)/i.test(a.toString());)try {
                                a.setStart(a.startContainer, a.startOffset + 1)
                            } catch (g) {
                                for (h = a.startContainer; !(next = h.nextSibling);) {
                                    if (f.isBody(h))return;
                                    h = h.parentNode
                                }
                                a.setStart(next, 0)
                            }
                            if (!f.findParentByTagName(a.startContainer, "a", !0)) {
                                e = this.document.createElement("a");
                                var h = this.document.createTextNode(" "), l;
                                this.undoManger && this.undoManger.save();
                                e.appendChild(a.extractContents());
                                e.href = e.innerHTML = e.innerHTML.replace(/<[^>]+>/g, "");
                                l = e.getAttribute("href").replace(new RegExp(f.fillChar, "g"), "");
                                l = /^(?:https?:\/\/)/ig.test(l) ? l : "http://" + l;
                                e.setAttribute("_src", p.html(l));
                                e.href = p.html(l);
                                a.insertNode(e);
                                e.parentNode.insertBefore(h, e.nextSibling);
                                a.setStart(h, 0);
                                a.collapse(!0);
                                c.removeAllRanges();
                                c.addRange(a);
                                this.undoManger && this.undoManger.save()
                            }
                        }
                    }
                }
            }
        }
    }, function () {
        function d(b) {
            if (3 == b.nodeType)return null;
            if ("A" == b.nodeName)return b;
            for (b = b.lastChild; b;) {
                if ("A" == b.nodeName)return b;
                if (3 == b.nodeType) {
                    if (f.isWhitespace(b)) {
                        b = b.previousSibling;
                        continue
                    }
                    return null
                }
                b = b.lastChild
            }
        }

        var b = {37: 1, 38: 1, 39: 1, 40: 1, 13: 1, 32: 1};
        r.ie && this.addListener("keyup", function (c, a) {
            var e = a.keyCode;
            if (b[e]) {
                var h = this.selection.getRange(), g = h.startContainer;
                if (13 ==
                    e) {
                    for (; g && !f.isBody(g) && !f.isBlockElm(g);)g = g.parentNode;
                    g && !f.isBody(g) && "P" == g.nodeName && (h = g.previousSibling) && 1 == h.nodeType && (h = d(h)) && !h.getAttribute("_href") && f.remove(h, !0)
                } else 32 == e ? 3 == g.nodeType && /^\s$/.test(g.nodeValue) && (g = g.previousSibling) && "A" == g.nodeName && !g.getAttribute("_href") && f.remove(g, !0) : (g = f.findParentByTagName(g, "a", !0)) && !g.getAttribute("_href") && (e = h.createBookmark(), f.remove(g, !0), h.moveToBookmark(e).select(!0))
            }
        })
    });
    UE.plugins.autoheight = function () {
        function d() {
            var b =
                this;
            clearTimeout(g);
            l || b.queryCommandState && (!b.queryCommandState || 1 == b.queryCommandState("source")) || (g = setTimeout(function () {
                for (var c = b.body.lastChild; c && 1 != c.nodeType;)c = c.previousSibling;
                c && 1 == c.nodeType && (c.style.clear = "both", h = Math.max(f.getXY(c).y + c.offsetHeight + 25, Math.max(e.minFrameHeight, e.initialFrameHeight)), h != a && (h !== parseInt(b.iframe.parentNode.style.height) && (b.iframe.parentNode.style.height = h + "px"), b.body.style.height = h + "px", a = h), f.removeStyle(c, "clear"))
            }, 50))
        }

        var b = this;
        b.autoHeightEnabled =
            !1 !== b.options.autoHeightEnabled;
        if (b.autoHeightEnabled) {
            var c, a = 0, e = b.options, h, g, l;
            b.addListener("fullscreenchanged", function (a, b) {
                l = b
            });
            b.addListener("destroy", function () {
                b.removeListener("contentchange afterinserthtml keyup mouseup", d)
            });
            b.enableAutoHeight = function () {
                var a = this;
                if (a.autoHeightEnabled) {
                    var b = a.document;
                    a.autoHeightEnabled = !0;
                    c = b.body.style.overflowY;
                    b.body.style.overflowY = "hidden";
                    a.addListener("contentchange afterinserthtml keyup mouseup", d);
                    setTimeout(function () {
                        d.call(a)
                    }, r.gecko ?
                        100 : 0);
                    a.fireEvent("autoheightchanged", a.autoHeightEnabled)
                }
            };
            b.disableAutoHeight = function () {
                b.body.style.overflowY = c || "";
                b.removeListener("contentchange", d);
                b.removeListener("keyup", d);
                b.removeListener("mouseup", d);
                b.autoHeightEnabled = !1;
                b.fireEvent("autoheightchanged", b.autoHeightEnabled)
            };
            b.on("setHeight", function () {
                b.disableAutoHeight()
            });
            b.addListener("ready", function () {
                b.enableAutoHeight();
                var a;
                f.on(r.ie ? b.body : b.document, r.webkit ? "dragover" : "drop", function () {
                    clearTimeout(a);
                    a = setTimeout(function () {
                            d.call(b)
                        },
                        100)
                });
                var c;
                window.onscroll = function () {
                    null === c ? c = this.scrollY : 0 == this.scrollY && 0 != c && (b.window.scrollTo(0, 0), c = null)
                }
            })
        }
    };
    UE.plugins.autofloat = function () {
        function d() {
            var a = document.body.style;
            a.backgroundImage = 'url("about:blank")';
            a.backgroundAttachment = "fixed"
        }

        function b() {
            z = !0;
            n.parentNode && n.parentNode.removeChild(n);
            q.style.cssText = m
        }

        function c() {
            var c = x(a.container), e = a.options.toolbarTopOffset || 0;
            if (0 > c.top && c.bottom - q.offsetHeight > e) {
                var c = f.getXY(q), e = f.getComputedStyle(q, "position"), g =
                    f.getComputedStyle(q, "left");
                q.style.width = q.offsetWidth + "px";
                q.style.zIndex = 1 * a.options.zIndex + 1;
                q.parentNode.insertBefore(n, q);
                l || k && r.ie ? ("absolute" != q.style.position && (q.style.position = "absolute"), q.style.top = (document.body.scrollTop || document.documentElement.scrollTop) - u + h + "px") : (r.ie7Compat && z && (z = !1, q.style.left = f.getXY(q).x - document.documentElement.getBoundingClientRect().left + 2 + "px"), "fixed" != q.style.position && (q.style.position = "fixed", q.style.top = h + "px", ("absolute" == e || "relative" == e) && parseFloat(g) &&
                (q.style.left = c.x + "px")))
            } else b()
        }

        var a = this, e = a.getLang();
        a.setOpt({topOffset: 0});
        var h = a.options.topOffset;
        if (!1 !== a.options.autoFloatEnabled) {
            var g = UE.ui.uiUtils, l = r.ie && 6 >= r.version, k = r.quirks, m, n = document.createElement("div"), q, u, x, z = !0, v = p.defer(function () {
                c()
            }, r.ie ? 200 : 100, !0);
            a.addListener("destroy", function () {
                f.un(window, ["scroll", "resize"], c);
                a.removeListener("keydown", v)
            });
            a.addListener("ready", function () {
                var h;
                UE.ui ? h = 1 : (alert(e.autofloatMsg), h = 0);
                h && a.ui && (x = g.getClientRect, q = a.ui.getDom("toolbarbox"),
                    u = x(q).top, m = q.style.cssText, n.style.height = q.offsetHeight + "px", l && d(), f.on(window, ["scroll", "resize"], c), a.addListener("keydown", v), a.addListener("beforefullscreenchange", function (a, c) {
                    c && b()
                }), a.addListener("fullscreenchanged", function (a, b) {
                    b || c()
                }), a.addListener("sourcemodechanged", function (a, b) {
                    setTimeout(function () {
                        c()
                    }, 0)
                }), a.addListener("clearDoc", function () {
                    setTimeout(function () {
                        c()
                    }, 0)
                }))
            })
        }
    };
    UE.plugins.video = function () {
        function d(a, b, d, g, f, k, m) {
            var n;
            switch (m) {
                case "image":
                    n = "<img " + (g ?
                        'id="' + g + '"' : "") + ' width="' + b + '" height="' + d + '" _url="' + a + '" class="' + k.replace(/\bvideo-js\b/, "") + '" src="' + c.options.UEDITOR_HOME_URL + 'themes/default/images/spacer.gif" style="background:url(' + c.options.UEDITOR_HOME_URL + "themes/default/images/videologo.gif) no-repeat center center; border:1px solid gray;" + (f ? "float:" + f + ";" : "") + '" />';
                    break;
                case "embed":
                    n = '<embed type="application/x-shockwave-flash" class="' + k + '" pluginspage="http://www.macromedia.com/go/getflashplayer" src="' + p.html(a) + '" width="' +
                        b + '" height="' + d + '"' + (f ? ' style="float:' + f + '"' : "") + ' wmode="transparent" play="true" loop="false" menu="false" allowscriptaccess="never" allowfullscreen="true" >';
                    break;
                case "video":
                    m = a.substr(a.lastIndexOf(".") + 1), "ogv" == m && (m = "ogg"), n = "<video" + (g ? ' id="' + g + '"' : "") + ' class="' + k + ' video-js" ' + (f ? ' style="float:' + f + '"' : "") + ' controls preload="none" width="' + b + '" height="' + d + '" src="' + a + '" data-setup="{}"><source src="' + a + '" type="video/' + m + '" /></video>'
            }
            return n
        }

        function b(a, b) {
            p.each(a.getNodesByTagName(b ?
                "img" : "embed video"), function (a) {
                var c = a.getAttr("class");
                if (c && -1 != c.indexOf("edui-faked-video")) {
                    var f = d(b ? a.getAttr("_url") : a.getAttr("src"), a.getAttr("width"), a.getAttr("height"), null, a.getStyle("float") || "", c, b ? "embed" : "image");
                    a.parentNode.replaceChild(UE.uNode.createElement(f), a)
                }
                c && -1 != c.indexOf("edui-upload-video") && (f = d(b ? a.getAttr("_url") : a.getAttr("src"), a.getAttr("width"), a.getAttr("height"), null, a.getStyle("float") || "", c, b ? "video" : "image"), a.parentNode.replaceChild(UE.uNode.createElement(f),
                    a))
            })
        }

        var c = this;
        c.addOutputRule(function (a) {
            b(a, !0)
        });
        c.addInputRule(function (a) {
            b(a)
        });
        c.commands.insertvideo = {
            execCommand: function (a, b, h) {
                b = p.isArray(b) ? b : [b];
                var g = [], l;
                a = 0;
                for (var k, m = b.length; a < m; a++)k = b[a], l = "upload" == h ? "edui-upload-video video-js vjs-default-skin" : "edui-faked-video", g.push(d(k.url, k.width || 420, k.height || 280, "tmpVedio" + a, null, l, "image"));
                c.execCommand("inserthtml", g.join(""), !0);
                h = this.selection.getRange();
                a = 0;
                for (m = b.length; a < m; a++)g = this.document.getElementById("tmpVedio" +
                    a), f.removeAttributes(g, "id"), h.selectNode(g).select(), c.execCommand("imagefloat", b[a].align)
            }, queryCommandState: function () {
                var a = c.selection.getRange().getClosedNode();
                return !a || "edui-faked-video" != a.className && -1 == a.className.indexOf("edui-upload-video") ? 0 : 1
            }
        }
    };
    (function () {
        var d = UE.UETable = function (b) {
            this.table = b;
            this.indexTable = [];
            this.selectedTds = [];
            this.cellsRange = {};
            this.update(b)
        };
        d.removeSelectedClass = function (b) {
            p.each(b, function (b) {
                f.removeClasses(b, "selectTdClass")
            })
        };
        d.addSelectedClass =
            function (b) {
                p.each(b, function (b) {
                    f.addClass(b, "selectTdClass")
                })
            };
        d.isEmptyBlock = function (b) {
            var c = new RegExp(f.fillChar, "g");
            if (0 < b[r.ie ? "innerText" : "textContent"].replace(/^\s*$/, "").replace(c, "").length)return 0;
            for (var a in w.$isNotEmpty)if (w.$isNotEmpty.hasOwnProperty(a) && b.getElementsByTagName(a).length)return 0;
            return 1
        };
        d.getWidth = function (b) {
            return b ? parseInt(f.getComputedStyle(b, "width"), 10) : 0
        };
        d.getTableCellAlignState = function (b) {
            !p.isArray(b) && (b = [b]);
            var c = {}, a = ["align", "valign"], e = null,
                d = !0;
            p.each(b, function (b) {
                p.each(a, function (a) {
                    e = b.getAttribute(a);
                    if (!c[a] && e)c[a] = e; else if (!c[a] || e !== c[a])return d = !1
                });
                return d
            });
            return d ? c : null
        };
        d.getTableItemsByRange = function (b) {
            var c = b.selection.getStart();
            c && c.id && 0 === c.id.indexOf("_baidu_bookmark_start_") && c.nextSibling && (c = c.nextSibling);
            var a = (b = c && f.findParentByTagName(c, ["td", "th"], !0)) && b.parentNode, c = c && f.findParentByTagName(c, "caption", !0);
            return {cell: b, tr: a, table: c ? c.parentNode : a && a.parentNode.parentNode, caption: c}
        };
        d.getUETableBySelected =
            function (b) {
                return (b = d.getTableItemsByRange(b).table) && b.ueTable && b.ueTable.selectedTds.length ? b.ueTable : null
            };
        d.getDefaultValue = function (b, c) {
            var a = {thin: "0px", medium: "1px", thick: "2px"}, e, d, g;
            if (c)l = c.getElementsByTagName("td")[0], g = f.getComputedStyle(c, "border-left-width"), e = parseInt(a[g] || g, 10), g = f.getComputedStyle(l, "padding-left"), d = parseInt(a[g] || g, 10), g = f.getComputedStyle(l, "border-left-width"), a = parseInt(a[g] || g, 10); else {
                c = b.document.createElement("table");
                c.insertRow(0).insertCell(0).innerHTML =
                    "xxx";
                b.body.appendChild(c);
                var l = c.getElementsByTagName("td")[0];
                g = f.getComputedStyle(c, "border-left-width");
                e = parseInt(a[g] || g, 10);
                g = f.getComputedStyle(l, "padding-left");
                d = parseInt(a[g] || g, 10);
                g = f.getComputedStyle(l, "border-left-width");
                a = parseInt(a[g] || g, 10);
                f.remove(c)
            }
            return {tableBorder: e, tdPadding: d, tdBorder: a}
        };
        d.getUETable = function (b) {
            var c = b.tagName.toLowerCase();
            b = "td" == c || "th" == c || "caption" == c ? f.findParentByTagName(b, "table", !0) : b;
            b.ueTable || (b.ueTable = new d(b));
            return b.ueTable
        };
        d.cloneCell =
            function (b, c, a) {
                if (!b || p.isString(b))return this.table.ownerDocument.createElement(b || "td");
                var e = f.hasClass(b, "selectTdClass");
                e && f.removeClasses(b, "selectTdClass");
                var d = b.cloneNode(!0);
                c && (d.rowSpan = d.colSpan = 1);
                !a && f.removeAttributes(d, "width height");
                !a && f.removeAttributes(d, "style");
                d.style.borderLeftStyle = "";
                d.style.borderTopStyle = "";
                d.style.borderLeftColor = b.style.borderRightColor;
                d.style.borderLeftWidth = b.style.borderRightWidth;
                d.style.borderTopColor = b.style.borderBottomColor;
                d.style.borderTopWidth =
                    b.style.borderBottomWidth;
                e && f.addClass(b, "selectTdClass");
                return d
            };
        d.prototype = {
            getMaxRows: function () {
                for (var b = this.table.rows, c = 1, a = 0, e; e = b[a]; a++) {
                    for (var d = 1, g = 0, f; f = e.cells[g++];)d = Math.max(f.rowSpan || 1, d);
                    c = Math.max(d + a, c)
                }
                return c
            }, getMaxCols: function () {
                for (var b = this.table.rows, c = 0, a = {}, e = 0, d; d = b[e]; e++) {
                    for (var g = 0, f = 0, k; k = d.cells[f++];)if (g += k.colSpan || 1, k.rowSpan && 1 < k.rowSpan)for (var m = 1; m < k.rowSpan; m++)a["row_" + (e + m)] ? a["row_" + (e + m)]++ : a["row_" + (e + m)] = k.colSpan || 1;
                    g += a["row_" + e] || 0;
                    c = Math.max(g, c)
                }
                return c
            }, getCellColIndex: function (b) {
            }, getHSideCell: function (b, c) {
                try {
                    var a = this.getCellInfo(b), e, d, g = this.selectedTds.length, f = this.cellsRange;
                    if (!c && (g ? !f.beginColIndex : !a.colIndex) || c && (g ? f.endColIndex == this.colsNum - 1 : a.colIndex == this.colsNum - 1))return null;
                    e = g ? f.beginRowIndex : a.rowIndex;
                    d = c ? g ? f.endColIndex + 1 : a.colIndex + 1 : g ? f.beginColIndex - 1 : 1 > a.colIndex ? 0 : a.colIndex - 1;
                    return this.getCell(this.indexTable[e][d].rowIndex, this.indexTable[e][d].cellIndex)
                } catch (k) {
                }
            }, getTabNextCell: function (b,
                                         c) {
                var a = this.getCellInfo(b), e = c || a.rowIndex, a = a.colIndex + 1 + (a.colSpan - 1), d;
                try {
                    d = this.getCell(this.indexTable[e][a].rowIndex, this.indexTable[e][a].cellIndex)
                } catch (g) {
                    try {
                        e = 1 * e + 1, a = 0, d = this.getCell(this.indexTable[e][a].rowIndex, this.indexTable[e][a].cellIndex)
                    } catch (f) {
                    }
                }
                return d
            }, getVSideCell: function (b, c, a) {
                try {
                    var e = this.getCellInfo(b), d, g, f = this.selectedTds.length && !a, k = this.cellsRange;
                    if (!c && 0 == e.rowIndex || c && (f ? k.endRowIndex == this.rowsNum - 1 : e.rowIndex + e.rowSpan > this.rowsNum - 1))return null;
                    d = c ? f ? k.endRowIndex + 1 : e.rowIndex + e.rowSpan : f ? k.beginRowIndex - 1 : e.rowIndex - 1;
                    g = f ? k.beginColIndex : e.colIndex;
                    return this.getCell(this.indexTable[d][g].rowIndex, this.indexTable[d][g].cellIndex)
                } catch (m) {
                }
            }, getSameEndPosCells: function (b, c) {
                try {
                    for (var a = "x" === c.toLowerCase(), e = f.getXY(b)[a ? "x" : "y"] + b["offset" + (a ? "Width" : "Height")], d = this.table.rows, g = null, l = [], k = 0; k < this.rowsNum; k++)for (var g = d[k].cells, m = 0, n; n = g[m++];) {
                        var q = f.getXY(n)[a ? "x" : "y"] + n["offset" + (a ? "Width" : "Height")];
                        if (q > e && a)break;
                        if (b ==
                            n || e == q)if (1 == n[a ? "colSpan" : "rowSpan"] && l.push(n), a)break
                    }
                    return l
                } catch (u) {
                }
            }, setCellContent: function (b, c) {
                b.innerHTML = c || (r.ie ? f.fillChar : "<br />")
            }, cloneCell: d.cloneCell, getSameStartPosXCells: function (b) {
                try {
                    var c = f.getXY(b).x + b.offsetWidth, a = this.table.rows, e;
                    b = [];
                    for (var d = 0; d < this.rowsNum; d++) {
                        e = a[d].cells;
                        for (var g = 0, l; l = e[g++];) {
                            var k = f.getXY(l).x;
                            if (k > c)break;
                            if (k == c && 1 == l.colSpan) {
                                b.push(l);
                                break
                            }
                        }
                    }
                    return b
                } catch (m) {
                }
            }, update: function (b) {
                this.table = b || this.table;
                this.selectedTds = [];
                this.cellsRange =
                {};
                this.indexTable = [];
                b = this.table.rows;
                for (var c = this.getMaxRows(), a = c - b.length, e = this.getMaxCols(); a--;)this.table.insertRow(b.length);
                this.rowsNum = c;
                this.colsNum = e;
                for (var a = 0, d = b.length; a < d; a++)this.indexTable[a] = Array(e);
                for (var a = 0, g; g = b[a]; a++) {
                    var d = 0, l;
                    for (g = g.cells; l = g[d]; d++) {
                        l.rowSpan > c && (l.rowSpan = c);
                        var k = d, m = l.rowSpan || 1;
                        for (l = l.colSpan || 1; this.indexTable[a][k];)k++;
                        for (var n = 0; n < m; n++)for (var q = 0; q < l; q++)this.indexTable[a + n][k + q] = {
                            rowIndex: a,
                            cellIndex: d,
                            colIndex: k,
                            rowSpan: m,
                            colSpan: l
                        }
                    }
                }
                for (n =
                         0; n < c; n++)for (q = 0; q < e; q++)void 0 === this.indexTable[n][q] && (g = b[n], l = (l = g.cells[g.cells.length - 1]) ? l.cloneNode(!0) : this.table.ownerDocument.createElement("td"), this.setCellContent(l), 1 !== l.colSpan && (l.colSpan = 1), 1 !== l.rowSpan && (l.rowSpan = 1), g.appendChild(l), this.indexTable[n][q] = {
                    rowIndex: n,
                    cellIndex: l.cellIndex,
                    colIndex: q,
                    rowSpan: 1,
                    colSpan: 1
                });
                b = f.getElementsByTagName(this.table, "td");
                var u = [];
                p.each(b, function (a) {
                    f.hasClass(a, "selectTdClass") && u.push(a)
                });
                u.length && (c = u[u.length - 1], b = this.getCellInfo(u[0]),
                    c = this.getCellInfo(c), this.selectedTds = u, this.cellsRange = {
                    beginRowIndex: b.rowIndex,
                    beginColIndex: b.colIndex,
                    endRowIndex: c.rowIndex + c.rowSpan - 1,
                    endColIndex: c.colIndex + c.colSpan - 1
                });
                if (!f.hasClass(this.table.rows[0], "firstRow"))for (f.addClass(this.table.rows[0], "firstRow"), a = 1; a < this.table.rows.length; a++)f.removeClasses(this.table.rows[a], "firstRow")
            }, getCellInfo: function (b) {
                if (b) {
                    var c = b.cellIndex;
                    b = b.parentNode.rowIndex;
                    for (var a = this.indexTable[b], e = this.colsNum, d = c; d < e; d++) {
                        var g = a[d];
                        if (g.rowIndex ===
                            b && g.cellIndex === c)return g
                    }
                }
            }, getCell: function (b, c) {
                return b < this.rowsNum && this.table.rows[b].cells[c] || null
            }, deleteCell: function (b, c) {
                c = "number" == typeof c ? c : b.parentNode.rowIndex;
                this.table.rows[c].deleteCell(b.cellIndex)
            }, getCellsRange: function (b, c) {
                function a(b, c, g, d) {
                    var k = b, h = c, f = g, l = d, n, m, q;
                    if (0 < b)for (m = c; m < d; m++)n = e.indexTable[b][m], q = n.rowIndex, q < b && (k = Math.min(q, k));
                    if (d < e.colsNum)for (q = b; q < g; q++)n = e.indexTable[q][d], m = n.colIndex + n.colSpan - 1, m > d && (l = Math.max(m, l));
                    if (g < e.rowsNum)for (m = c; m <
                    d; m++)n = e.indexTable[g][m], q = n.rowIndex + n.rowSpan - 1, q > g && (f = Math.max(q, f));
                    if (0 < c)for (q = b; q < g; q++)n = e.indexTable[q][c], m = n.colIndex, m < c && (h = Math.min(n.colIndex, h));
                    return k != b || h != c || f != g || l != d ? a(k, h, f, l) : {
                        beginRowIndex: b,
                        beginColIndex: c,
                        endRowIndex: g,
                        endColIndex: d
                    }
                }

                try {
                    var e = this, d = e.getCellInfo(b);
                    if (b === c)return {
                        beginRowIndex: d.rowIndex,
                        beginColIndex: d.colIndex,
                        endRowIndex: d.rowIndex + d.rowSpan - 1,
                        endColIndex: d.colIndex + d.colSpan - 1
                    };
                    var g = e.getCellInfo(c), f = Math.min(d.rowIndex, g.rowIndex), k = Math.min(d.colIndex,
                        g.colIndex), m = Math.max(d.rowIndex + d.rowSpan - 1, g.rowIndex + g.rowSpan - 1), n = Math.max(d.colIndex + d.colSpan - 1, g.colIndex + g.colSpan - 1);
                    return a(f, k, m, n)
                } catch (q) {
                }
            }, getCells: function (b) {
                this.clearSelected();
                for (var c = b.beginColIndex, a = b.endRowIndex, e = b.endColIndex, d, g, f = {}, k = [], m = b.beginRowIndex; m <= a; m++)for (var n = c; n <= e; n++) {
                    b = this.indexTable[m][n];
                    d = b.rowIndex;
                    g = b.colIndex;
                    var q = d + "|" + g;
                    if (!f[q]) {
                        f[q] = 1;
                        if (d < m || g < n || d + b.rowSpan - 1 > a || g + b.colSpan - 1 > e)return null;
                        k.push(this.getCell(d, b.cellIndex))
                    }
                }
                return k
            },
            clearSelected: function () {
                d.removeSelectedClass(this.selectedTds);
                this.selectedTds = [];
                this.cellsRange = {}
            }, setSelected: function (b) {
                var c = this.getCells(b);
                d.addSelectedClass(c);
                this.selectedTds = c;
                this.cellsRange = b
            }, isFullRow: function () {
                var b = this.cellsRange;
                return b.endColIndex - b.beginColIndex + 1 == this.colsNum
            }, isFullCol: function () {
                var b = this.cellsRange, c = this.table.getElementsByTagName("th"), b = b.endRowIndex - b.beginRowIndex + 1;
                return c.length ? b == this.rowsNum || b == this.rowsNum - 1 : b == this.rowsNum
            }, getNextCell: function (b,
                                      c, a) {
                try {
                    var e = this.getCellInfo(b), d, g, f = this.selectedTds.length && !a, k = this.cellsRange;
                    if (!c && 0 == e.rowIndex || c && (f ? k.endRowIndex == this.rowsNum - 1 : e.rowIndex + e.rowSpan > this.rowsNum - 1))return null;
                    d = c ? f ? k.endRowIndex + 1 : e.rowIndex + e.rowSpan : f ? k.beginRowIndex - 1 : e.rowIndex - 1;
                    g = f ? k.beginColIndex : e.colIndex;
                    return this.getCell(this.indexTable[d][g].rowIndex, this.indexTable[d][g].cellIndex)
                } catch (m) {
                }
            }, getPreviewCell: function (b, c) {
                try {
                    var a = this.getCellInfo(b), e, d, g = this.selectedTds.length, f = this.cellsRange;
                    if (!c && (g ? !f.beginColIndex : !a.colIndex) || c && (g ? f.endColIndex == this.colsNum - 1 : a.rowIndex > this.colsNum - 1))return null;
                    e = c ? g ? f.beginRowIndex : 1 > a.rowIndex ? 0 : a.rowIndex - 1 : g ? f.beginRowIndex : a.rowIndex;
                    d = c ? g ? f.endColIndex + 1 : a.colIndex : g ? f.beginColIndex - 1 : 1 > a.colIndex ? 0 : a.colIndex - 1;
                    return this.getCell(this.indexTable[e][d].rowIndex, this.indexTable[e][d].cellIndex)
                } catch (k) {
                }
            }, moveContent: function (b, c) {
                if (!d.isEmptyBlock(c))if (d.isEmptyBlock(b))b.innerHTML = c.innerHTML; else {
                    var a = b.lastChild;
                    for (3 != a.nodeType &&
                         w.$block[a.tagName] || b.appendChild(b.ownerDocument.createElement("br")); a = c.firstChild;)b.appendChild(a)
                }
            }, mergeRight: function (b) {
                var c = this.getCellInfo(b), a = this.indexTable[c.rowIndex][c.colIndex + c.colSpan], e = this.getCell(a.rowIndex, a.cellIndex);
                b.colSpan = c.colSpan + a.colSpan;
                b.removeAttribute("width");
                this.moveContent(b, e);
                this.deleteCell(e, a.rowIndex);
                this.update()
            }, mergeDown: function (b) {
                var c = this.getCellInfo(b), a = this.indexTable[c.rowIndex + c.rowSpan][c.colIndex], e = this.getCell(a.rowIndex, a.cellIndex);
                b.rowSpan = c.rowSpan + a.rowSpan;
                b.removeAttribute("height");
                this.moveContent(b, e);
                this.deleteCell(e, a.rowIndex);
                this.update()
            }, mergeRange: function () {
                var b = this.cellsRange, c = this.getCell(b.beginRowIndex, this.indexTable[b.beginRowIndex][b.beginColIndex].cellIndex);
                if ("TH" == c.tagName && b.endRowIndex !== b.beginRowIndex)var a = this.indexTable, b = this.getCellInfo(c), c = this.getCell(1, a[1][b.colIndex].cellIndex), b = this.getCellsRange(c, this.getCell(a[this.rowsNum - 1][b.colIndex].rowIndex, a[this.rowsNum - 1][b.colIndex].cellIndex));
                for (var e = this.getCells(b), a = 0, d; d = e[a++];)d !== c && (this.moveContent(c, d), this.deleteCell(d));
                c.rowSpan = b.endRowIndex - b.beginRowIndex + 1;
                1 < c.rowSpan && c.removeAttribute("height");
                c.colSpan = b.endColIndex - b.beginColIndex + 1;
                1 < c.colSpan && c.removeAttribute("width");
                c.rowSpan == this.rowsNum && 1 != c.colSpan && (c.colSpan = 1);
                if (c.colSpan == this.colsNum && 1 != c.rowSpan) {
                    e = c.parentNode.rowIndex;
                    if (this.table.deleteRow)for (a = e + 1, e += 1, b = c.rowSpan; a < b; a++)this.table.deleteRow(e); else for (a = 0, b = c.rowSpan - 1; a < b; a++)d = this.table.rows[e +
                    1], d.parentNode.removeChild(d);
                    c.rowSpan = 1
                }
                this.update()
            }, insertRow: function (b, c) {
                function a(a, b, c) {
                    0 == a ? (a = (c.nextSibling || c.previousSibling).cells[a], "TH" == a.tagName && (a = b.ownerDocument.createElement("th"), a.appendChild(b.firstChild), c.insertBefore(a, b), f.remove(b))) : "TH" == b.tagName && (a = b.ownerDocument.createElement("td"), a.appendChild(b.firstChild), c.insertBefore(a, b), f.remove(b))
                }

                var e = this.colsNum, d = this.table.insertRow(b), g, l = "string" == typeof c && "TH" == c.toUpperCase();
                if (0 == b || b == this.rowsNum)for (var k =
                    0; k < e; k++)g = this.cloneCell(c, !0), this.setCellContent(g), g.getAttribute("vAlign") && g.setAttribute("vAlign", g.getAttribute("vAlign")), d.appendChild(g), l || a(k, g, d); else for (var m = this.indexTable[b], k = 0; k < e; k++) {
                    var n = m[k];
                    n.rowIndex < b ? (g = this.getCell(n.rowIndex, n.cellIndex), g.rowSpan = n.rowSpan + 1) : (g = this.cloneCell(c, !0), this.setCellContent(g), d.appendChild(g));
                    l || a(k, g, d)
                }
                this.update();
                return d
            }, deleteRow: function (b) {
                for (var c = this.table.rows[b], a = this.indexTable[b], e = this.colsNum, d = 0, g = 0; g < e;) {
                    var l =
                        a[g], k = this.getCell(l.rowIndex, l.cellIndex);
                    if (1 < k.rowSpan && l.rowIndex == b) {
                        l = k.cloneNode(!0);
                        l.rowSpan = k.rowSpan - 1;
                        l.innerHTML = "";
                        k.rowSpan = 1;
                        var m = b + 1, n = this.table.rows[m], m = this.getPreviewMergedCellsNum(m, g) - d;
                        m < g ? (m = g - m - 1, f.insertAfter(n.cells[m], l)) : n.cells.length && n.insertBefore(l, n.cells[0]);
                        d += 1
                    }
                    g += k.colSpan || 1
                }
                b = [];
                d = {};
                for (g = 0; g < e; g++)k = a[g].rowIndex, l = a[g].cellIndex, n = k + "_" + l, d[n] || (d[n] = 1, k = this.getCell(k, l), b.push(k));
                var q = [];
                p.each(b, function (a) {
                    1 == a.rowSpan ? a.parentNode.removeChild(a) :
                        q.push(a)
                });
                p.each(q, function (a) {
                    a.rowSpan--
                });
                c.parentNode.removeChild(c);
                this.update()
            }, insertCol: function (b, c, a) {
                function e(a, b, c) {
                    0 == a ? (a = b.nextSibling || b.previousSibling, "TH" == a.tagName && (a = b.ownerDocument.createElement("th"), a.appendChild(b.firstChild), c.insertBefore(a, b), f.remove(b))) : "TH" == b.tagName && (a = b.ownerDocument.createElement("td"), a.appendChild(b.firstChild), c.insertBefore(a, b), f.remove(b))
                }

                var d = this.rowsNum, g = 0, l, k, m = parseInt((this.table.offsetWidth - 20 * (this.colsNum + 1) - (this.colsNum +
                    1)) / (this.colsNum + 1), 10), n = "string" == typeof c && "TH" == c.toUpperCase(), q;
                if (0 == b || b == this.colsNum)for (; g < d; g++)l = this.table.rows[g], q = l.cells[0 == b ? b : l.cells.length], k = this.cloneCell(c, !0), this.setCellContent(k), k.setAttribute("vAlign", k.getAttribute("vAlign")), q && k.setAttribute("width", q.getAttribute("width")), b ? f.insertAfter(l.cells[l.cells.length - 1], k) : l.insertBefore(k, l.cells[0]), n || e(g, k, l); else for (; g < d; g++)q = this.indexTable[g][b], q.colIndex < b ? (k = this.getCell(q.rowIndex, q.cellIndex), k.colSpan =
                    q.colSpan + 1) : (l = this.table.rows[g], q = l.cells[q.cellIndex], k = this.cloneCell(c, !0), this.setCellContent(k), k.setAttribute("vAlign", k.getAttribute("vAlign")), q && k.setAttribute("width", q.getAttribute("width")), q ? l.insertBefore(k, q) : l.appendChild(k)), n || e(g, k, l);
                this.update();
                this.updateWidth(m, a || {tdPadding: 10, tdBorder: 1})
            }, updateWidth: function (b, c) {
                var a = this.table, e = d.getWidth(a) - 2 * c.tdPadding - c.tdBorder + b;
                e < a.ownerDocument.body.offsetWidth ? a.setAttribute("width", e) : (a = f.getElementsByTagName(this.table,
                    "td th"), p.each(a, function (a) {
                    a.setAttribute("width", b)
                }))
            }, deleteCol: function (b) {
                for (var c = this.indexTable, a = this.table.rows, e = this.table.getAttribute("width"), d = 0, g = this.rowsNum, f = {}, k = 0; k < g;) {
                    var m = c[k][b], n = m.rowIndex + "_" + m.colIndex;
                    f[n] || (f[n] = 1, n = this.getCell(m.rowIndex, m.cellIndex), d || (d = n && parseInt(n.offsetWidth / n.colSpan, 10).toFixed(0)), 1 < n.colSpan ? n.colSpan-- : a[k].deleteCell(m.cellIndex), k += m.rowSpan || 1)
                }
                this.table.setAttribute("width", e - d);
                this.update()
            }, splitToCells: function (b) {
                var c =
                    this;
                b = this.splitToRows(b);
                p.each(b, function (a) {
                    c.splitToCols(a)
                })
            }, splitToRows: function (b) {
                var c = this.getCellInfo(b), a = c.rowIndex, e = c.colIndex, d = [];
                b.rowSpan = 1;
                d.push(b);
                for (var g = a, f = a + c.rowSpan; g < f; g++)if (g != a) {
                    var k = this.table.rows[g].insertCell(e - this.getPreviewMergedCellsNum(g, e));
                    k.colSpan = c.colSpan;
                    this.setCellContent(k);
                    k.setAttribute("vAlign", b.getAttribute("vAlign"));
                    k.setAttribute("align", b.getAttribute("align"));
                    b.style.cssText && (k.style.cssText = b.style.cssText);
                    d.push(k)
                }
                this.update();
                return d
            }, getPreviewMergedCellsNum: function (b, c) {
                for (var a = this.indexTable[b], e = 0, d = 0; d < c;)var g = a[d].colSpan, e = e + (g - (a[d].rowIndex == b ? 1 : 0)), d = d + g;
                return e
            }, splitToCols: function (b) {
                var c = (b.offsetWidth / b.colSpan - 22).toFixed(0), a = this.getCellInfo(b), e = a.rowIndex, d = a.colIndex, g = [];
                b.colSpan = 1;
                b.setAttribute("width", c);
                g.push(b);
                for (var l = d, k = d + a.colSpan; l < k; l++)if (l != d) {
                    var m = this.table.rows[e], n = m.insertCell(this.indexTable[e][l].cellIndex + 1);
                    n.rowSpan = a.rowSpan;
                    this.setCellContent(n);
                    n.setAttribute("vAlign",
                        b.getAttribute("vAlign"));
                    n.setAttribute("align", b.getAttribute("align"));
                    n.setAttribute("width", c);
                    b.style.cssText && (n.style.cssText = b.style.cssText);
                    if ("TH" == b.tagName) {
                        var q = b.ownerDocument.createElement("th");
                        q.appendChild(n.firstChild);
                        q.setAttribute("vAlign", b.getAttribute("vAlign"));
                        q.rowSpan = n.rowSpan;
                        m.insertBefore(q, n);
                        f.remove(n)
                    }
                    g.push(n)
                }
                this.update();
                return g
            }, isLastCell: function (b, c, a) {
                c = c || this.rowsNum;
                a = a || this.colsNum;
                b = this.getCellInfo(b);
                return b.rowIndex + b.rowSpan == c && b.colIndex +
                    b.colSpan == a
            }, getLastCell: function (b) {
                b = b || this.table.getElementsByTagName("td");
                this.getCellInfo(b[0]);
                var c = this, a = b[0], e = a.parentNode, d = 0, g = 0, f;
                p.each(b, function (a) {
                    a.parentNode == e && (g += a.colSpan || 1);
                    d += a.rowSpan * a.colSpan || 1
                });
                f = d / g;
                p.each(b, function (b) {
                    if (c.isLastCell(b, f, g))return a = b, !1
                });
                return a
            }, selectRow: function (b) {
                var c = this.indexTable[b];
                b = this.getCell(c[0].rowIndex, c[0].cellIndex);
                c = this.getCell(c[this.colsNum - 1].rowIndex, c[this.colsNum - 1].cellIndex);
                b = this.getCellsRange(b, c);
                this.setSelected(b)
            },
            selectTable: function () {
                var b = this.table.getElementsByTagName("td"), b = this.getCellsRange(b[0], b[b.length - 1]);
                this.setSelected(b)
            }, setBackground: function (b, c) {
                if ("string" === typeof c)p.each(b, function (a) {
                    a.style.backgroundColor = c
                }); else if ("object" === typeof c) {
                    c = p.extend({repeat: !0, colorList: ["#ddd", "#fff"]}, c);
                    for (var a = this.getCellInfo(b[0]).rowIndex, e = 0, d = c.colorList, g = function (a, b, c) {
                        return a[b] ? a[b] : c ? a[b % a.length] : ""
                    }, f = 0, k; k = b[f++];) {
                        var m = this.getCellInfo(k);
                        k.style.backgroundColor = g(d, a + e ==
                        m.rowIndex ? e : ++e, c.repeat)
                    }
                }
            }, removeBackground: function (b) {
                p.each(b, function (b) {
                    b.style.backgroundColor = ""
                })
            }
        }
    })();
    (function () {
        function d(c, e) {
            var d = f.getElementsByTagName(c, "td th");
            p.each(d, function (a) {
                a.removeAttribute("width")
            });
            c.setAttribute("width", b(e, !0, a.getDefaultValue(e, c)));
            var h = [];
            setTimeout(function () {
                p.each(d, function (a) {
                    1 == a.colSpan && h.push(a.offsetWidth)
                });
                p.each(d, function (a, b) {
                    1 == a.colSpan && a.setAttribute("width", h[b] + "")
                })
            }, 0)
        }

        function b(a, b, c) {
            var e = a.body;
            return e.offsetWidth -
                (b ? 2 * parseInt(f.getComputedStyle(e, "margin-left"), 10) : 0) - 2 * c.tableBorder - (a.options.offsetWidth || 0)
        }

        function c(a) {
            if (a = e(a).cell) {
                var b = h(a);
                return b.selectedTds.length ? b.selectedTds : [a]
            }
            return []
        }

        var a = UE.UETable, e = function (b) {
            return a.getTableItemsByRange(b)
        }, h = function (b) {
            return a.getUETable(b)
        };
        UE.commands.inserttable = {
            queryCommandState: function () {
                return e(this).table ? -1 : 0
            }, execCommand: function (b, c) {
                c || (c = p.extend({}, {
                    numCols: this.options.defaultCols,
                    numRows: this.options.defaultRows,
                    tdvalign: this.options.tdvalign
                }));
                var e = this.selection.getRange().startContainer, e = f.findParent(e, function (a) {
                        return f.isBlockElm(a)
                    }, !0) || this.body, d = a.getDefaultValue(this, void 0), e = Math.floor(e.offsetWidth / c.numCols - 2 * d.tdPadding - d.tdBorder);
                !c.tdvalign && (c.tdvalign = this.options.tdvalign);
                this.execCommand("inserthtml", function (a, b) {
                    for (var c = [], e = a.numRows, d = a.numCols, g = 0; g < e; g++) {
                        c.push("<tr" + (0 == g ? ' class="firstRow"' : "") + ">");
                        for (var k = 0; k < d; k++)c.push('<td width="' + b + '"  vAlign="' + a.tdvalign + '" >' + (r.ie && 11 > r.version ? f.fillChar :
                                "<br/>") + "</td>");
                        c.push("</tr>")
                    }
                    return "<table><tbody>" + c.join("") + "</tbody></table>"
                }(c, e))
            }
        };
        UE.commands.insertparagraphbeforetable = {
            queryCommandState: function () {
                return e(this).cell ? 0 : -1
            }, execCommand: function () {
                var a = e(this).table;
                if (a) {
                    var b = this.document.createElement("p");
                    b.innerHTML = r.ie ? "&nbsp;" : "<br />";
                    a.parentNode.insertBefore(b, a);
                    this.selection.getRange().setStart(b, 0).setCursor()
                }
            }
        };
        UE.commands.deletetable = {
            queryCommandState: function () {
                var a = this.selection.getRange();
                return f.findParentByTagName(a.startContainer,
                    "table", !0) ? 0 : -1
            }, execCommand: function (a, b) {
                var c = this.selection.getRange();
                if (b = b || f.findParentByTagName(c.startContainer, "table", !0)) {
                    var e = b.nextSibling;
                    e || (e = f.createElement(this.document, "p", {innerHTML: r.ie ? f.fillChar : "<br/>"}), b.parentNode.insertBefore(e, b));
                    f.remove(b);
                    c = this.selection.getRange();
                    3 == e.nodeType ? c.setStartBefore(e) : c.setStart(e, 0);
                    c.setCursor(!1, !0);
                    this.fireEvent("tablehasdeleted")
                }
            }
        };
        UE.commands.cellalign = {
            queryCommandState: function () {
                return c(this).length ? 0 : -1
            }, execCommand: function (a,
                                      b) {
                var e = c(this);
                if (e.length)for (var d = 0, f; f = e[d++];)f.setAttribute("align", b)
            }
        };
        UE.commands.cellvalign = {
            queryCommandState: function () {
                return c(this).length ? 0 : -1
            }, execCommand: function (a, b) {
                var e = c(this);
                if (e.length)for (var d = 0, f; f = e[d++];)f.setAttribute("vAlign", b)
            }
        };
        UE.commands.insertcaption = {
            queryCommandState: function () {
                var a = e(this).table;
                return a ? 0 == a.getElementsByTagName("caption").length ? 1 : -1 : -1
            }, execCommand: function () {
                var a = e(this).table;
                if (a) {
                    var b = this.document.createElement("caption");
                    b.innerHTML =
                        r.ie ? f.fillChar : "<br/>";
                    a.insertBefore(b, a.firstChild);
                    this.selection.getRange().setStart(b, 0).setCursor()
                }
            }
        };
        UE.commands.deletecaption = {
            queryCommandState: function () {
                var a = this.selection.getRange();
                return (a = f.findParentByTagName(a.startContainer, "table")) ? 0 == a.getElementsByTagName("caption").length ? -1 : 1 : -1
            }, execCommand: function () {
                var a = this.selection.getRange();
                if (a = f.findParentByTagName(a.startContainer, "table"))f.remove(a.getElementsByTagName("caption")[0]), this.selection.getRange().setStart(a.rows[0].cells[0],
                    0).setCursor()
            }
        };
        UE.commands.inserttitle = {
            queryCommandState: function () {
                var a = e(this).table;
                return a ? (a = a.rows[0], "th" != a.cells[a.cells.length - 1].tagName.toLowerCase() ? 0 : -1) : -1
            }, execCommand: function () {
                var a = e(this).table;
                a && h(a).insertRow(0, "th");
                a = a.getElementsByTagName("th")[0];
                this.selection.getRange().setStart(a, 0).setCursor(!1, !0)
            }
        };
        UE.commands.deletetitle = {
            queryCommandState: function () {
                var a = e(this).table;
                return a ? (a = a.rows[0], "th" == a.cells[a.cells.length - 1].tagName.toLowerCase() ? 0 : -1) : -1
            }, execCommand: function () {
                var a =
                    e(this).table;
                a && f.remove(a.rows[0]);
                a = a.getElementsByTagName("td")[0];
                this.selection.getRange().setStart(a, 0).setCursor(!1, !0)
            }
        };
        UE.commands.inserttitlecol = {
            queryCommandState: function () {
                var a = e(this).table;
                return a ? a.rows[a.rows.length - 1].getElementsByTagName("th").length ? -1 : 0 : -1
            }, execCommand: function (a) {
                (a = e(this).table) && h(a).insertCol(0, "th");
                d(a, this);
                a = a.getElementsByTagName("th")[0];
                this.selection.getRange().setStart(a, 0).setCursor(!1, !0)
            }
        };
        UE.commands.deletetitlecol = {
            queryCommandState: function () {
                var a =
                    e(this).table;
                return a ? a.rows[a.rows.length - 1].getElementsByTagName("th").length ? 0 : -1 : -1
            }, execCommand: function () {
                var a = e(this).table;
                if (a)for (var b = 0; b < a.rows.length; b++)f.remove(a.rows[b].children[0]);
                d(a, this);
                a = a.getElementsByTagName("td")[0];
                this.selection.getRange().setStart(a, 0).setCursor(!1, !0)
            }
        };
        UE.commands.mergeright = {
            queryCommandState: function (a) {
                var b = e(this);
                a = b.table;
                b = b.cell;
                if (!a || !b)return -1;
                var c = h(a);
                if (c.selectedTds.length)return -1;
                var d = c.getCellInfo(b), f = d.colIndex + d.colSpan;
                if (f >= c.colsNum)return -1;
                c = c.indexTable[d.rowIndex][f];
                return (a = a.rows[c.rowIndex].cells[c.cellIndex]) && b.tagName == a.tagName ? c.rowIndex == d.rowIndex && c.rowSpan == d.rowSpan ? 0 : -1 : -1
            }, execCommand: function (a) {
                a = this.selection.getRange();
                var b = a.createBookmark(!0), c = e(this).cell;
                h(c).mergeRight(c);
                a.moveToBookmark(b).select()
            }
        };
        UE.commands.mergedown = {
            queryCommandState: function (a) {
                var b = e(this);
                a = b.table;
                b = b.cell;
                if (!a || !b)return -1;
                var c = h(a);
                if (c.selectedTds.length)return -1;
                var d = c.getCellInfo(b), f = d.rowIndex +
                    d.rowSpan;
                if (f >= c.rowsNum)return -1;
                c = c.indexTable[f][d.colIndex];
                return (a = a.rows[c.rowIndex].cells[c.cellIndex]) && b.tagName == a.tagName ? c.colIndex == d.colIndex && c.colSpan == d.colSpan ? 0 : -1 : -1
            }, execCommand: function () {
                var a = this.selection.getRange(), b = a.createBookmark(!0), c = e(this).cell;
                h(c).mergeDown(c);
                a.moveToBookmark(b).select()
            }
        };
        UE.commands.mergecells = {
            queryCommandState: function () {
                return a.getUETableBySelected(this) ? 0 : -1
            }, execCommand: function () {
                var b = a.getUETableBySelected(this);
                if (b && b.selectedTds.length) {
                    var c =
                        b.selectedTds[0];
                    b.mergeRange();
                    b = this.selection.getRange();
                    f.isEmptyBlock(c) ? b.setStart(c, 0).collapse(!0) : b.selectNodeContents(c);
                    b.select()
                }
            }
        };
        UE.commands.insertrow = {
            queryCommandState: function () {
                var a = e(this), b = a.cell;
                return b && ("TD" == b.tagName || "TH" == b.tagName && a.tr !== a.table.rows[0]) && h(a.table).rowsNum < this.options.maxRowNum ? 0 : -1
            }, execCommand: function () {
                var a = this.selection.getRange(), b = a.createBookmark(!0), c = e(this), d = c.cell, c = c.table, f = h(c), q = f.getCellInfo(d);
                if (f.selectedTds.length)for (var q =
                    f.cellsRange, u = 0, x = q.endRowIndex - q.beginRowIndex + 1; u < x; u++)f.insertRow(q.beginRowIndex, d); else f.insertRow(q.rowIndex, d);
                a.moveToBookmark(b).select();
                "enabled" === c.getAttribute("interlaced") && this.fireEvent("interlacetable", c)
            }
        };
        UE.commands.insertrownext = {
            queryCommandState: function () {
                var a = e(this), b = a.cell;
                return b && "TD" == b.tagName && h(a.table).rowsNum < this.options.maxRowNum ? 0 : -1
            }, execCommand: function () {
                var a = this.selection.getRange(), b = a.createBookmark(!0), c = e(this), d = c.cell, c = c.table, f = h(c), q = f.getCellInfo(d);
                if (f.selectedTds.length)for (var q = f.cellsRange, u = 0, x = q.endRowIndex - q.beginRowIndex + 1; u < x; u++)f.insertRow(q.endRowIndex + 1, d); else f.insertRow(q.rowIndex + q.rowSpan, d);
                a.moveToBookmark(b).select();
                "enabled" === c.getAttribute("interlaced") && this.fireEvent("interlacetable", c)
            }
        };
        UE.commands.deleterow = {
            queryCommandState: function () {
                return e(this).cell ? 0 : -1
            }, execCommand: function () {
                var a = e(this).cell, b = h(a), c = b.cellsRange, d = b.getCellInfo(a), n = b.getVSideCell(a), q = b.getVSideCell(a, !0), a = this.selection.getRange();
                if (p.isEmptyObject(c))b.deleteRow(d.rowIndex); else for (var u = c.beginRowIndex; u < c.endRowIndex + 1; u++)b.deleteRow(c.beginRowIndex);
                u = b.table;
                u.getElementsByTagName("td").length ? 1 == d.rowSpan || d.rowSpan == c.endRowIndex - c.beginRowIndex + 1 ? (q || n) && a.selectNodeContents(q || n).setCursor(!1, !0) : (b = b.getCell(d.rowIndex, b.indexTable[d.rowIndex][d.colIndex].cellIndex)) && a.selectNodeContents(b).setCursor(!1, !0) : (b = u.nextSibling, f.remove(u), b && a.setStart(b, 0).setCursor(!1, !0));
                "enabled" === u.getAttribute("interlaced") &&
                this.fireEvent("interlacetable", u)
            }
        };
        UE.commands.insertcol = {
            queryCommandState: function (a) {
                a = e(this);
                var b = a.cell;
                return b && ("TD" == b.tagName || "TH" == b.tagName && b !== a.tr.cells[0]) && h(a.table).colsNum < this.options.maxColNum ? 0 : -1
            }, execCommand: function (a) {
                var b = this.selection.getRange(), c = b.createBookmark(!0);
                if (-1 != this.queryCommandState(a)) {
                    a = e(this).cell;
                    var d = h(a), f = d.getCellInfo(a);
                    if (d.selectedTds.length)for (var f = d.cellsRange, q = 0, u = f.endColIndex - f.beginColIndex + 1; q < u; q++)d.insertCol(f.beginColIndex,
                        a); else d.insertCol(f.colIndex, a);
                    b.moveToBookmark(c).select(!0)
                }
            }
        };
        UE.commands.insertcolnext = {
            queryCommandState: function () {
                var a = e(this);
                return a.cell && h(a.table).colsNum < this.options.maxColNum ? 0 : -1
            }, execCommand: function () {
                var a = this.selection.getRange(), b = a.createBookmark(!0), c = e(this).cell, d = h(c), f = d.getCellInfo(c);
                if (d.selectedTds.length)for (var f = d.cellsRange, q = 0, u = f.endColIndex - f.beginColIndex + 1; q < u; q++)d.insertCol(f.endColIndex + 1, c); else d.insertCol(f.colIndex + f.colSpan, c);
                a.moveToBookmark(b).select()
            }
        };
        UE.commands.deletecol = {
            queryCommandState: function () {
                return e(this).cell ? 0 : -1
            }, execCommand: function () {
                var a = e(this).cell, b = h(a), c = b.cellsRange, d = b.getCellInfo(a), n = b.getHSideCell(a), q = b.getHSideCell(a, !0);
                if (p.isEmptyObject(c))b.deleteCol(d.colIndex); else for (d = c.beginColIndex; d < c.endColIndex + 1; d++)b.deleteCol(c.beginColIndex);
                b = b.table;
                c = this.selection.getRange();
                b.getElementsByTagName("td").length ? f.inDoc(a, this.document) ? c.setStart(a, 0).setCursor(!1, !0) : q && f.inDoc(q, this.document) ? c.selectNodeContents(q).setCursor(!1,
                    !0) : n && f.inDoc(n, this.document) && c.selectNodeContents(n).setCursor(!0, !0) : (a = b.nextSibling, f.remove(b), a && c.setStart(a, 0).setCursor(!1, !0))
            }
        };
        UE.commands.splittocells = {
            queryCommandState: function () {
                var a = e(this), b = a.cell;
                return !b || 0 < h(a.table).selectedTds.length ? -1 : b && (1 < b.colSpan || 1 < b.rowSpan) ? 0 : -1
            }, execCommand: function () {
                var a = this.selection.getRange(), b = a.createBookmark(!0), c = e(this).cell;
                h(c).splitToCells(c);
                a.moveToBookmark(b).select()
            }
        };
        UE.commands.splittorows = {
            queryCommandState: function () {
                var a =
                    e(this), b = a.cell;
                return !b || 0 < h(a.table).selectedTds.length ? -1 : b && 1 < b.rowSpan ? 0 : -1
            }, execCommand: function () {
                var a = this.selection.getRange(), b = a.createBookmark(!0), c = e(this).cell;
                h(c).splitToRows(c);
                a.moveToBookmark(b).select()
            }
        };
        UE.commands.splittocols = {
            queryCommandState: function () {
                var a = e(this), b = a.cell;
                return !b || 0 < h(a.table).selectedTds.length ? -1 : b && 1 < b.colSpan ? 0 : -1
            }, execCommand: function () {
                var a = this.selection.getRange(), b = a.createBookmark(!0), c = e(this).cell;
                h(c).splitToCols(c);
                a.moveToBookmark(b).select()
            }
        };
        UE.commands.adaptbytext = UE.commands.adaptbywindow = {
            queryCommandState: function () {
                return e(this).table ? 0 : -1
            }, execCommand: function (a) {
                var b = e(this).table;
                b && ("adaptbywindow" == a ? d(b, this) : (a = f.getElementsByTagName(b, "td th"), p.each(a, function (a) {
                    a.removeAttribute("width")
                }), b.removeAttribute("width")))
            }
        };
        UE.commands.averagedistributecol = {
            queryCommandState: function () {
                var b = a.getUETableBySelected(this);
                return b ? b.isFullRow() || b.isFullCol() ? 0 : -1 : -1
            }, execCommand: function (b) {
                function c() {
                    var b = h.table, e = 0,
                        g = 0, f = a.getDefaultValue(d, b);
                    if (h.isFullRow())e = b.offsetWidth, g = h.colsNum; else for (var b = h.cellsRange.endColIndex, k, l = h.cellsRange.beginColIndex; l <= b;)k = h.selectedTds[l], e += k.offsetWidth, l += k.colSpan, g += 1;
                    return Math.ceil(e / g) - 2 * f.tdBorder - 2 * f.tdPadding
                }

                function e(a) {
                    p.each(f.getElementsByTagName(h.table, "th"), function (a) {
                        a.setAttribute("width", "")
                    });
                    var b = h.isFullRow() ? f.getElementsByTagName(h.table, "td") : h.selectedTds;
                    p.each(b, function (b) {
                        1 == b.colSpan && b.setAttribute("width", a)
                    })
                }

                var d = this, h = a.getUETableBySelected(d);
                h && h.selectedTds.length && e(c())
            }
        };
        UE.commands.averagedistributerow = {
            queryCommandState: function () {
                var b = a.getUETableBySelected(this);
                return !b || b.selectedTds && /th/ig.test(b.selectedTds[0].tagName) ? -1 : b.isFullRow() || b.isFullCol() ? 0 : -1
            }, execCommand: function (b) {
                function c() {
                    var b, e = 0;
                    b = h.table;
                    var g = a.getDefaultValue(d, b), k = parseInt(f.getComputedStyle(b.getElementsByTagName("td")[0], "padding-top"));
                    if (h.isFullCol()) {
                        var e = f.getElementsByTagName(b, "caption"), l = f.getElementsByTagName(b, "th"), p, t;
                        0 < e.length &&
                        (p = e[0].offsetHeight);
                        0 < l.length && (t = l[0].offsetHeight);
                        e = b.offsetHeight - (p || 0) - (t || 0);
                        b = 0 == l.length ? h.rowsNum : h.rowsNum - 1
                    } else {
                        t = h.cellsRange.beginRowIndex;
                        l = h.cellsRange.endRowIndex;
                        p = 0;
                        for (b = f.getElementsByTagName(b, "tr"); t <= l; t++)e += b[t].offsetHeight, p += 1;
                        b = p
                    }
                    return r.ie && 9 > r.version ? Math.ceil(e / b) : Math.ceil(e / b) - 2 * g.tdBorder - 2 * k
                }

                function e(a) {
                    var b = h.isFullCol() ? f.getElementsByTagName(h.table, "td") : h.selectedTds;
                    p.each(b, function (b) {
                        1 == b.rowSpan && b.setAttribute("height", a)
                    })
                }

                var d = this, h = a.getUETableBySelected(d);
                h && h.selectedTds.length && e(c())
            }
        };
        UE.commands.cellalignment = {
            queryCommandState: function () {
                return e(this).table ? 0 : -1
            }, execCommand: function (b, c) {
                var e = a.getUETableBySelected(this);
                e ? p.each(e.selectedTds, function (a) {
                    f.setAttributes(a, c)
                }) : (e = (e = this.selection.getStart()) && f.findParentByTagName(e, ["td", "th", "caption"], !0), /caption/ig.test(e.tagName) ? (e.style.textAlign = c.align, e.style.verticalAlign = c.vAlign) : f.setAttributes(e, c), this.selection.getRange().setCursor(!0))
            }, queryCommandValue: function (a) {
                (a =
                    e(this).cell) || (a = c(this)[0]);
                if (a) {
                    var b = UE.UETable.getUETable(a).selectedTds;
                    !b.length && (b = a);
                    return UE.UETable.getTableCellAlignState(b)
                }
                return null
            }
        };
        UE.commands.tablealignment = {
            queryCommandState: function () {
                return r.ie && 8 > r.version ? -1 : e(this).table ? 0 : -1
            }, execCommand: function (a, b) {
                var c = this.selection.getStart();
                (c = c && f.findParentByTagName(c, ["table"], !0)) && c.setAttribute("align", b)
            }
        };
        UE.commands.edittable = {
            queryCommandState: function () {
                return e(this).table ? 0 : -1
            }, execCommand: function (a, b) {
                var c =
                    this.selection.getRange();
                if (c = f.findParentByTagName(c.startContainer, "table"))c = f.getElementsByTagName(c, "td").concat(f.getElementsByTagName(c, "th"), f.getElementsByTagName(c, "caption")), p.each(c, function (a) {
                    a.style.borderColor = b
                })
            }
        };
        UE.commands.edittd = {
            queryCommandState: function () {
                return e(this).table ? 0 : -1
            }, execCommand: function (b, c) {
                var e = a.getUETableBySelected(this);
                if (e)p.each(e.selectedTds, function (a) {
                    a.style.backgroundColor = c
                }); else if (e = (e = this.selection.getStart()) && f.findParentByTagName(e,
                            ["td", "th", "caption"], !0))e.style.backgroundColor = c
            }
        };
        UE.commands.settablebackground = {
            queryCommandState: function () {
                return 1 < c(this).length ? 0 : -1
            }, execCommand: function (a, b) {
                var e;
                e = c(this);
                h(e[0]).setBackground(e, b)
            }
        };
        UE.commands.cleartablebackground = {
            queryCommandState: function () {
                var a = c(this);
                if (!a.length)return -1;
                for (var b = 0, e; e = a[b++];)if ("" !== e.style.backgroundColor)return 0;
                return -1
            }, execCommand: function () {
                var a = c(this);
                h(a[0]).removeBackground(a)
            }
        };
        UE.commands.interlacetable = UE.commands.uninterlacetable =
        {
            queryCommandState: function (a) {
                var b = e(this).table;
                if (!b)return -1;
                b = b.getAttribute("interlaced");
                return "interlacetable" == a ? "enabled" === b ? -1 : 0 : b && "disabled" !== b ? 0 : -1
            }, execCommand: function (a, b) {
            var c = e(this).table;
            "interlacetable" == a ? (c.setAttribute("interlaced", "enabled"), this.fireEvent("interlacetable", c, b)) : (c.setAttribute("interlaced", "disabled"), this.fireEvent("uninterlacetable", c))
        }
        };
        UE.commands.setbordervisible = {
            queryCommandState: function (a) {
                return e(this).table ? 0 : -1
            }, execCommand: function () {
                var a =
                    e(this).table;
                p.each(f.getElementsByTagName(a, "td"), function (a) {
                    a.style.borderWidth = "1px";
                    a.style.borderStyle = "solid"
                })
            }
        }
    })();
    UE.plugins.table = function () {
        function d(a, c) {
            b(a, "width", !0);
            b(a, "height", !0)
        }

        function b(a, b, c) {
            a.style[b] && (c && a.setAttribute(b, parseInt(a.style[b], 10)), a.style[b] = "")
        }

        function c(a) {
            if ("TD" == a.tagName || "TH" == a.tagName)return a;
            var b;
            return (b = f.findParentByTagName(a, "td", !0) || f.findParentByTagName(a, "th", !0)) ? b : null
        }

        function a(a) {
            var b = new RegExp(f.fillChar, "g");
            if (0 < a[r.ie ?
                    "innerText" : "textContent"].replace(/^\s*$/, "").replace(b, "").length)return 0;
            for (var c in w.$isNotEmpty)if (a.getElementsByTagName(c).length)return 0;
            return 1
        }

        function e(a) {
            return a.pageX || a.pageY ? {
                x: a.pageX,
                y: a.pageY
            } : {
                x: a.clientX + y.document.body.scrollLeft - y.document.body.clientLeft,
                y: a.clientY + y.document.body.scrollTop - y.document.body.clientTop
            }
        }

        function h(a) {
            if (!ea())try {
                var b = c(a.target || a.srcElement), d;
                ca && (y.body.style.webkitUserSelect = "none", 10 < Math.abs(fa.x - a.clientX) || 10 < Math.abs(fa.y - a.clientY)) &&
                (t(), ca = !1, R = 0, H(a));
                if (V && S)if (R = 0, y.body.style.webkitUserSelect = "none", y.selection.getNative()[r.ie9below ? "empty" : "removeAllRanges"](), d = e(a), m(y, !0, V, d, b), "h" == V) {
                    var h = T.style, l;
                    var b = S, q = N(b);
                    if (q) {
                        var u = q.getSameEndPosCells(b, "x")[0], p = q.getSameStartPosXCells(b)[0], z = e(a).x, x = (u ? f.getXY(u).x : f.getXY(q.table).x) + 20, v = p ? f.getXY(p).x + p.offsetWidth - 20 : y.body.offsetWidth + 5 || parseInt(f.getComputedStyle(y.body, "width"), 10), x = x + 5, v = v - 5;
                        l = z < x ? x : z > v ? v : z
                    } else l = void 0;
                    h.left = l + "px"
                } else {
                    if ("v" == V) {
                        var F =
                            T.style, w;
                        a:{
                            try {
                                var A = f.getXY(S).y, B = e(a).y;
                                w = B < A ? A : B;
                                break a
                            } catch (C) {
                            }
                            w = void 0
                        }
                        F.top = w + "px"
                    }
                } else if (b) {
                    if (!0 !== y.fireEvent("excludetable", b)) {
                        d = e(a);
                        var E = n(b, d), da = f.findParentByTagName(b, "table", !0);
                        k(da, b, a, !0) ? !0 !== y.fireEvent("excludetable", da) && (y.body.style.cursor = "url(" + y.options.cursorpath + "h.png),pointer") : k(da, b, a) ? !0 !== y.fireEvent("excludetable", da) && (y.body.style.cursor = "url(" + y.options.cursorpath + "v.png),pointer") : (y.body.style.cursor = "text", /\d/.test(E) && (E = E.replace(/\d/, ""), b =
                            N(b).getPreviewCell(b, "v" == E)), m(y, b ? !!E : !1, b ? E : "", d, b))
                    }
                } else g(!1, da, y)
            } catch (I) {
            }
        }

        function g(a, b, c) {
            a ? l(b, c) : ga || setTimeout(function () {
                !ga && K && K.parentNode && K.parentNode.removeChild(K)
            }, 2E3)
        }

        function l(a, b) {
            function c(e, d) {
                clearTimeout(g);
                g = setTimeout(function () {
                    b.fireEvent("tableClicked", a, d)
                }, 300)
            }

            var e = f.getXY(a), d = a.ownerDocument;
            if (K && K.parentNode)return K;
            K = d.createElement("div");
            K.contentEditable = !1;
            K.innerHTML = "";
            K.style.cssText = "width:15px;height:15px;background-image:url(" + b.options.UEDITOR_HOME_URL +
                "dialogs/table/dragicon.png);position: absolute;cursor:move;top:" + (e.y - 15) + "px;left:" + e.x + "px;";
            f.unSelectable(K);
            K.onmouseover = function (a) {
                ga = !0
            };
            K.onmouseout = function (a) {
                ga = !1
            };
            f.on(K, "click", function (a, b) {
                c(b, this)
            });
            f.on(K, "dblclick", function (c, e) {
                clearTimeout(g);
                var d = N(a), f = a.rows[0].cells[0], h = d.getLastCell(), h = d.getCellsRange(f, h);
                b.selection.getRange().setStart(f, 0).setCursor(!1, !0);
                d.setSelected(h)
            });
            f.on(K, "dragstart", function (a, b) {
                f.preventDefault(b)
            });
            var g;
            d.body.appendChild(K)
        }

        function k(a,
                   b, c, d) {
            c = e(c);
            b = n(b, c);
            return d ? (d = (d = a.getElementsByTagName("caption")[0]) ? d.offsetHeight : 0, "v1" == b && 8 > c.y - f.getXY(a).y - d) : "h1" == b && 8 > c.x - f.getXY(a).x
        }

        function m(a, b, c, e, d) {
            try {
                a.body.style.cursor = "h" == c ? "col-resize" : "v" == c ? "row-resize" : "text", r.ie && (!c || aa || G.getUETableBySelected(a) ? J(a) : (P(a, a.document), la(c, d))), X = b
            } catch (g) {
            }
        }

        function n(a, b) {
            var c = f.getXY(a);
            return c ? 5 > c.x + a.offsetWidth - b.x ? "h" : 5 > b.x - c.x ? "h1" : 5 > c.y + a.offsetHeight - b.y ? "v" : 5 > b.y - c.y ? "v1" : "" : ""
        }

        function q(a, b) {
            if (!ea())if (fa = {
                    x: b.clientX,
                    y: b.clientY
                }, 2 == b.button) {
                var c = G.getUETableBySelected(y), e = !1;
                if (c) {
                    var d = Y(y, b);
                    p.each(c.selectedTds, function (a) {
                        a === d && (e = !0)
                    });
                    e ? (d = c.selectedTds[0], setTimeout(function () {
                        y.selection.getRange().setStart(d, 0).setCursor(!1, !0)
                    }, 0)) : (ha(f.getElementsByTagName(y.body, "th td")), c.clearSelected())
                }
            } else x(b)
        }

        function u(a) {
            R = 0;
            a = a || y.window.event;
            var b = c(a.target || a.srcElement);
            if (b) {
                var d;
                if (d = n(b, e(a)))if (J(y), "h1" == d && (d = "h", k(f.findParentByTagName(b, "table"), b, a) ? y.execCommand("adaptbywindow") : (b =
                        N(b).getPreviewCell(b)) && y.selection.getRange().selectNodeContents(b).setCursor(!0, !0)), "h" == d) {
                    a = N(b);
                    var g = A(b, a.table, !0), g = v(g, "left");
                    a.width = a.offsetWidth;
                    var h = [], l = [];
                    p.each(g, function (a) {
                        h.push(a.offsetWidth)
                    });
                    p.each(g, function (a) {
                        a.removeAttribute("width")
                    });
                    window.setTimeout(function () {
                        var a = !0;
                        p.each(g, function (b, c) {
                            var e = b.offsetWidth;
                            if (e > h[c])return a = !1;
                            l.push(e)
                        });
                        var b = a ? l : h;
                        p.each(g, function (a, c) {
                            a.width = b[c] - C()
                        })
                    }, 0)
                }
            }
        }

        function x(a) {
            ha(f.getElementsByTagName(y.body, "td th"));
            p.each(y.document.getElementsByTagName("table"), function (a) {
                a.ueTable = null
            });
            if (L = Y(y, a)) {
                var b = f.findParentByTagName(L, "table", !0);
                (ut = N(b)) && ut.clearSelected();
                X ? z(a) : (y.document.body.style.webkitUserSelect = "", aa = !0, y.addListener("mouseover", O))
            }
        }

        function z(a) {
            r.ie && (a = F(a));
            t();
            ca = !0;
            ia = setTimeout(function () {
                H(a)
            }, 360)
        }

        function v(a, b) {
            for (var c = [], e = null, d = 0, g = a.length; d < g; d++)(e = a[d][b]) && c.push(e);
            return c
        }

        function t() {
            ia && clearTimeout(ia);
            ia = null
        }

        function F(a) {
            var b = "pageX pageY clientX clientY srcElement target".split(" "),
                c = {};
            if (a)for (var e = 0, d, g; d = b[e]; e++)(g = a[d]) && (c[d] = g);
            return c
        }

        function H(a) {
            ca = !1;
            if (L = a.target || a.srcElement)a = n(L, e(a)), /\d/.test(a) && (a = a.replace(/\d/, ""), L = N(L).getPreviewCell(L, "v" == a)), J(y), P(y, y.document), y.fireEvent("saveScene"), la(a, L), aa = !0, V = a, S = L
        }

        function B(a, b) {
            if (!ea()) {
                t();
                ca = !1;
                if (X && (R = ++R % 3, fa = {x: b.clientX, y: b.clientY}, setTimeout(function () {
                        0 < R && R--
                    }, 360), 2 === R)) {
                    R = 0;
                    u(b);
                    return
                }
                if (2 != b.button) {
                    var c = this.selection.getRange(), e = f.findParentByTagName(c.startContainer, "table", !0),
                        d = f.findParentByTagName(c.endContainer, "table", !0);
                    if (e || d)e === d ? (e = f.findParentByTagName(c.startContainer, ["td", "th", "caption"], !0), d = f.findParentByTagName(c.endContainer, ["td", "th", "caption"], !0), e !== d && this.selection.clearRange()) : this.selection.clearRange();
                    aa = !1;
                    this.document.body.style.webkitUserSelect = "";
                    if (V && S && (this.selection.getNative()[r.ie9below ? "empty" : "removeAllRanges"](), R = 0, T = this.document.getElementById("ue_tableDragLine"))) {
                        c = f.getXY(S);
                        e = f.getXY(T);
                        switch (V) {
                            case "h":
                                na(S, e.x -
                                    c.x);
                                break;
                            case "v":
                                U(S, e.y - c.y - S.offsetHeight)
                        }
                        V = "";
                        S = null;
                        J(this);
                        this.fireEvent("saveScene");
                        return
                    }
                    if (L)(e = (c = N(L)) ? c.selectedTds[0] : null) ? (c = new M.Range(this.document), f.isEmptyBlock(e) ? c.setStart(e, 0).setCursor(!1, !0) : c.selectNodeContents(e).shrinkBoundary().setCursor(!1, !0)) : (c = this.selection.getRange().shrinkBoundary(), c.collapsed || (e = f.findParentByTagName(c.startContainer, ["td", "th"], !0), d = f.findParentByTagName(c.endContainer, ["td", "th"], !0), (e && !d || !e && d || e && d && e !== d) && c.setCursor(!1, !0))),
                        L = null, this.removeListener("mouseover", O); else if ((e = f.findParentByTagName(b.target || b.srcElement, "td", !0)) || (e = f.findParentByTagName(b.target || b.srcElement, "th", !0)), e && ("TD" == e.tagName || "TH" == e.tagName)) {
                        if (!0 === this.fireEvent("excludetable", e))return;
                        c = new M.Range(this.document);
                        c.setStart(e, 0).setCursor(!1, !0)
                    }
                    this._selectionChange(250, b)
                }
            }
        }

        function O(a, b) {
            if (!ea()) {
                var c = b.target || b.srcElement;
                W = f.findParentByTagName(c, "td", !0) || f.findParentByTagName(c, "th", !0);
                if (L && W && ("TD" == L.tagName && "TD" ==
                    W.tagName || "TH" == L.tagName && "TH" == W.tagName) && f.findParentByTagName(L, "table") == f.findParentByTagName(W, "table"))if (c = N(W), L != W) {
                    this.document.body.style.webkitUserSelect = "none";
                    this.selection.getNative()[r.ie9below ? "empty" : "removeAllRanges"]();
                    var e = c.getCellsRange(L, W);
                    c.setSelected(e)
                } else this.document.body.style.webkitUserSelect = "", c.clearSelected();
                b.preventDefault ? b.preventDefault() : b.returnValue = !1
            }
        }

        function na(a, b) {
            var c = N(a);
            if (c) {
                var c = c.table, e = A(a, c);
                c.style.width = "";
                c.removeAttribute("width");
                b = I(b, a, e);
                a.nextSibling ? p.each(e, function (a) {
                    a.left.width = +a.left.width + b;
                    a.right && (a.right.width = +a.right.width - b)
                }) : p.each(e, function (a) {
                    a.left.width -= -b
                })
            }
        }

        function ea() {
            return "false" === y.body.contentEditable
        }

        function U(a, b) {
            if (!(10 > Math.abs(b))) {
                var c = N(a);
                if (c)for (var c = c.getSameEndPosCells(a, "y"), e = c[0] ? c[0].offsetHeight : 0, d = 0, g; g = c[d++];) {
                    var h = b, k = e, l = parseInt(f.getComputedStyle(g, "line-height"), 10), h = k + h, h = h < l ? l : h;
                    g.style.height && (g.style.height = "");
                    1 == g.rowSpan ? g.setAttribute("height",
                        h) : g.removeAttribute && g.removeAttribute("height")
                }
            }
        }

        function A(a, b, c) {
            b || (b = f.findParentByTagName(a, "table"));
            if (!b)return null;
            f.getNodeIndex(a);
            b = b.rows;
            for (var e = 0; a;)1 === a.nodeType && (e += a.colSpan || 1), a = a.previousSibling;
            a = null;
            var d = [];
            p.each(b, function (a) {
                var b = 0;
                p.each(a.cells, function (a) {
                    b += a.colSpan || 1;
                    if (b === e)return d.push({left: a, right: a.nextSibling || null}), !1;
                    if (b > e)return c && d.push({left: a}), !1
                })
            });
            return d
        }

        function I(a, b, c) {
            a -= C();
            if (0 > a)return 0;
            a -= E(b);
            var e = 0 > a ? "left" : "right";
            a = Math.abs(a);
            p.each(c, function (b) {
                (b = b[e]) && (a = Math.min(a, E(b) - 5))
            });
            a = 0 > a ? 0 : a;
            return "left" === e ? -a : a
        }

        function E(a) {
            var b = 0, b = a.offsetWidth - C();
            if (!a.nextSibling) {
                tab = f.findParentByTagName(a, "table", !1);
                if (void 0 === tab.offsetVal) {
                    var c = a.previousSibling;
                    tab.offsetVal = c ? a.offsetWidth - c.offsetWidth === G.borderWidth ? G.borderWidth : 0 : 0
                }
                b -= tab.offsetVal
            }
            b = 0 > b ? 0 : b;
            try {
                a.width = b
            } catch (e) {
            }
            return b
        }

        function C() {
            if (void 0 === G.tabcellSpace) {
                var a = y.document.createElement("table"), b = y.document.createElement("tbody"), c = y.document.createElement("tr"),
                    e = y.document.createElement("td"), d = null;
                e.style.cssText = "border: 0;";
                e.width = 1;
                c.appendChild(e);
                c.appendChild(d = e.cloneNode(!1));
                b.appendChild(c);
                a.appendChild(b);
                a.style.cssText = "visibility: hidden;";
                y.body.appendChild(a);
                G.paddingSpace = e.offsetWidth - 1;
                b = a.offsetWidth;
                e.style.cssText = "";
                d.style.cssText = "";
                G.borderWidth = (a.offsetWidth - b) / 3;
                G.tabcellSpace = G.paddingSpace + G.borderWidth;
                y.body.removeChild(a)
            }
            C = function () {
                return G.tabcellSpace
            };
            return G.tabcellSpace
        }

        function P(a, b) {
            aa || (T = a.document.createElement("div"),
                f.setAttributes(T, {
                    id: "ue_tableDragLine",
                    unselectable: "on",
                    contenteditable: !1,
                    onresizestart: "return false",
                    ondragstart: "return false",
                    onselectstart: "return false",
                    style: "background-color:blue;position:absolute;padding:0;margin:0;background-image:none;border:0px none;opacity:0;filter:alpha(opacity=0)"
                }), a.body.appendChild(T))
        }

        function J(a) {
            if (!aa)for (var b; b = a.document.getElementById("ue_tableDragLine");)f.remove(b)
        }

        function la(a, b) {
            if (b) {
                var c = f.findParentByTagName(b, "table"), e = c.getElementsByTagName("caption"),
                    d = c.offsetWidth, g = c.offsetHeight - (0 < e.length ? e[0].offsetHeight : 0), c = f.getXY(c), h = f.getXY(b);
                switch (a) {
                    case "h":
                        e = "height:" + g + "px;top:" + (c.y + (0 < e.length ? e[0].offsetHeight : 0)) + "px;left:" + (h.x + b.offsetWidth);
                        T.style.cssText = e + "px;position: absolute;display:block;background-color:blue;width:1px;border:0; color:blue;opacity:.3;filter:alpha(opacity=30)";
                        break;
                    case "v":
                        e = "width:" + d + "px;left:" + c.x + "px;top:" + (h.y + b.offsetHeight), T.style.cssText = e + "px;overflow:hidden;position: absolute;display:block;background-color:blue;height:1px;border:0;color:blue;opacity:.2;filter:alpha(opacity=20)"
                }
            }
        }

        function Q(a, b) {
            for (var c = f.getElementsByTagName(a.body, "table"), e, d = 0, g; g = c[d++];)e = f.getElementsByTagName(g, "td"), e[0] && (b ? (e = e[0].style.borderColor.replace(/\s/g, ""), /(#ffffff)|(rgb\(255,255,255\))/ig.test(e) && f.addClass(g, "noBorderTable")) : f.removeClasses(g, "noBorderTable"))
        }

        function Z(a, b, c) {
            var e = a.body;
            return e.offsetWidth - (b ? 2 * parseInt(f.getComputedStyle(e, "margin-left"), 10) : 0) - 2 * c.tableBorder - (a.options.offsetWidth || 0)
        }

        function Y(a, b) {
            var c = f.findParentByTagName(b.target || b.srcElement, ["td",
                "th"], !0), d = null;
            if (!c)return null;
            d = n(c, e(b));
            if (!c)return null;
            if ("h1" === d && c.previousSibling) {
                var d = f.getXY(c), g = c.offsetWidth;
                Math.abs(d.x + g - b.clientX) > g / 3 && (c = c.previousSibling)
            } else"v1" === d && c.parentNode.previousSibling && (d = f.getXY(c), g = c.offsetHeight, Math.abs(d.y + g - b.clientY) > g / 3 && (c = c.parentNode.previousSibling.firstChild));
            return c && !0 !== a.fireEvent("excludetable", c) ? c : null
        }

        var y = this, ia = null, ca = !1, R = 0, fa = null, G = UE.UETable, N = function (a) {
            return G.getUETable(a)
        }, ha = function (a) {
            return G.removeSelectedClass(a)
        };
        y.ready(function () {
            var a = this, b = a.selection.getText;
            a.selection.getText = function () {
                var c = G.getUETableBySelected(a);
                if (c) {
                    var e = "";
                    p.each(c.selectedTds, function (a) {
                        e += a[r.ie ? "innerText" : "textContent"]
                    });
                    return e
                }
                return b.call(a.selection)
            }
        });
        var L = null, W = null, V = "", X = !1, K = null, ga = !1, T = null, S = null, aa = !1;
        y.setOpt({
            maxColNum: 20,
            maxRowNum: 100,
            defaultCols: 5,
            defaultRows: 5,
            tdvalign: "top",
            cursorpath: y.options.UEDITOR_HOME_URL + "themes/default/images/cursor_",
            tableDragable: !1,
            classList: ["ue-table-interlace-color-single",
                "ue-table-interlace-color-double"]
        });
        y.getUETable = N;
        var ba = {
            deletetable: 1,
            inserttable: 1,
            cellvalign: 1,
            insertcaption: 1,
            deletecaption: 1,
            inserttitle: 1,
            deletetitle: 1,
            mergeright: 1,
            mergedown: 1,
            mergecells: 1,
            insertrow: 1,
            insertrownext: 1,
            deleterow: 1,
            insertcol: 1,
            insertcolnext: 1,
            deletecol: 1,
            splittocells: 1,
            splittorows: 1,
            splittocols: 1,
            adaptbytext: 1,
            adaptbywindow: 1,
            adaptbycustomer: 1,
            insertparagraph: 1,
            insertparagraphbeforetable: 1,
            averagedistributecol: 1,
            averagedistributerow: 1
        };
        y.ready(function () {
            p.cssRule("table",
                ".selectTdClass{background-color:#edf5fa !important}table.noBorderTable td,table.noBorderTable th,table.noBorderTable caption{border:1px dashed #ddd !important}table{margin-bottom:10px;border-collapse:collapse;display:table;}td,th{padding: 5px 10px;border: 1px solid #DDD;}caption{border:1px dashed #DDD;border-bottom:0;padding:3px;text-align:center;}th{border-top:1px solid #BBB;background-color:#F7F7F7;}table tr.firstRow th{border-top-width:2px;}.ue-table-interlace-color-single{ background-color: #fcfcfc; } .ue-table-interlace-color-double{ background-color: #f7faff; }td p{margin:0;padding:0;}",
                y.document);
            var b, e, l;
            y.addListener("keydown", function (c, d) {
                var g = d.keyCode || d.which;
                if (8 == g) {
                    var h = G.getUETableBySelected(this);
                    h && h.selectedTds.length && (h.isFullCol() ? this.execCommand("deletecol") : h.isFullRow() ? this.execCommand("deleterow") : this.fireEvent("delcells"), f.preventDefault(d));
                    var k = f.findParentByTagName(this.selection.getStart(), "caption", !0), n = this.selection.getRange();
                    n.collapsed && k && a(k) && (this.fireEvent("saveScene"), h = k.parentNode, f.remove(k), h && n.setStart(h.rows[0].cells[0], 0).setCursor(!1,
                        !0), this.fireEvent("saveScene"))
                }
                if (46 == g && (h = G.getUETableBySelected(this))) {
                    this.fireEvent("saveScene");
                    for (k = 0; n = h.selectedTds[k++];)f.fillNode(this.document, n);
                    this.fireEvent("saveScene");
                    f.preventDefault(d)
                }
                if (13 == g) {
                    g = this.selection.getRange();
                    if (k = f.findParentByTagName(g.startContainer, "caption", !0)) {
                        h = f.findParentByTagName(k, "table");
                        g.collapsed ? k && g.setStart(h.rows[0].cells[0], 0).setCursor(!1, !0) : (g.deleteContents(), this.fireEvent("saveScene"));
                        f.preventDefault(d);
                        return
                    }
                    g.collapsed && (h = f.findParentByTagName(g.startContainer,
                        "table")) && (n = h.rows[0].cells[0], k = f.findParentByTagName(this.selection.getStart(), ["td", "th"], !0), h = h.previousSibling, n === k && (!h || 1 == h.nodeType && "TABLE" == h.tagName) && f.isStartInblock(g) && (g = f.findParent(this.selection.getStart(), function (a) {
                        return f.isBlockElm(a)
                    }, !0)) && (/t(h|d)/i.test(g.tagName) || g === k.firstChild) && (this.execCommand("insertparagraphbeforetable"), f.preventDefault(d)))
                }
                if ((d.ctrlKey || d.metaKey) && "67" == d.keyCode && (b = null, h = G.getUETableBySelected(this)))for (g = h.selectedTds, e = h.isFullCol(),
                                                                                                                           l = h.isFullRow(), b = [[h.cloneCell(g[0], null, !0)]], k = 1; n = g[k]; k++)n.parentNode !== g[k - 1].parentNode ? b.push([h.cloneCell(n, null, !0)]) : b[b.length - 1].push(h.cloneCell(n, null, !0))
            });
            y.addListener("tablehasdeleted", function () {
                m(this, !1, "", null);
                K && f.remove(K)
            });
            y.addListener("beforepaste", function (c, g) {
                var h = this, k = h.selection.getRange();
                if (f.findParentByTagName(k.startContainer, "caption", !0))k = h.document.createElement("div"), k.innerHTML = g.html, g.html = k[r.ie9below ? "innerText" : "textContent"]; else {
                    var n = G.getUETableBySelected(h);
                    if (b) {
                        h.fireEvent("saveScene");
                        var k = h.selection.getRange(), m = f.findParentByTagName(k.startContainer, ["td", "th"], !0), q, u;
                        if (m) {
                            n = N(m);
                            if (l) {
                                var z = n.getCellInfo(m).rowIndex;
                                "TH" == m.tagName && z++;
                                for (var k = 0, x; x = b[k++];) {
                                    u = n.insertRow(z++, "td");
                                    for (var v = 0, t; t = x[v]; v++)(m = u.cells[v]) || (m = u.insertCell(v)), m.innerHTML = t.innerHTML, t.getAttribute("width") && m.setAttribute("width", t.getAttribute("width")), t.getAttribute("vAlign") && m.setAttribute("vAlign", t.getAttribute("vAlign")), t.getAttribute("align") &&
                                    m.setAttribute("align", t.getAttribute("align")), t.style.cssText && (m.style.cssText = t.style.cssText);
                                    for (v = 0; (t = u.cells[v]) && x[v]; v++)t.innerHTML = x[v].innerHTML, x[v].getAttribute("width") && t.setAttribute("width", x[v].getAttribute("width")), x[v].getAttribute("vAlign") && t.setAttribute("vAlign", x[v].getAttribute("vAlign")), x[v].getAttribute("align") && t.setAttribute("align", x[v].getAttribute("align")), x[v].style.cssText && (t.style.cssText = x[v].style.cssText)
                                }
                            } else {
                                if (e) {
                                    z = n.getCellInfo(m);
                                    v = m = 0;
                                    for (x = b[0]; t =
                                        x[v++];)m += t.colSpan || 1;
                                    h.__hasEnterExecCommand = !0;
                                    for (k = 0; k < m; k++)h.execCommand("insertcol");
                                    h.__hasEnterExecCommand = !1;
                                    m = n.table.rows[0].cells[z.cellIndex];
                                    "TH" == m.tagName && (m = n.table.rows[1].cells[z.cellIndex])
                                }
                                for (k = 0; x = b[k++];) {
                                    q = m;
                                    for (v = 0; t = x[v++];)m ? (m.innerHTML = t.innerHTML, t.getAttribute("width") && m.setAttribute("width", t.getAttribute("width")), t.getAttribute("vAlign") && m.setAttribute("vAlign", t.getAttribute("vAlign")), t.getAttribute("align") && m.setAttribute("align", t.getAttribute("align")),
                                    t.style.cssText && (m.style.cssText = t.style.cssText), u = m, m = m.nextSibling) : (z = t.cloneNode(!0), f.removeAttributes(z, ["class", "rowSpan", "colSpan"]), u.parentNode.appendChild(z));
                                    m = n.getNextCell(q, !0, !0);
                                    if (!b[k])break;
                                    m || (z = n.getCellInfo(q), n.table.insertRow(n.table.rows.length), n.update(), m = n.getVSideCell(q, !0))
                                }
                            }
                            n.update()
                        } else {
                            n = h.document.createElement("table");
                            for (k = 0; x = b[k++];) {
                                u = n.insertRow(n.rows.length);
                                for (v = 0; t = x[v++];)z = G.cloneCell(t, null, !0), f.removeAttributes(z, ["class"]), u.appendChild(z);
                                2 == v && 1 < z.rowSpan && (z.rowSpan = 1)
                            }
                            k = G.getDefaultValue(h, void 0);
                            k = h.body.offsetWidth - 2 * parseInt(f.getComputedStyle(h.body, "margin-left"), 10) - 2 * k.tableBorder - (h.options.offsetWidth || 0);
                            h.execCommand("insertHTML", "<table  " + (e && l ? 'width="' + k + '"' : "") + ">" + n.innerHTML.replace(/>\s*</g, "><").replace(/\bth\b/gi, "td") + "</table>")
                        }
                        h.fireEvent("contentchange");
                        h.fireEvent("saveScene");
                        g.html = "";
                        return !0
                    }
                    k = h.document.createElement("div");
                    k.innerHTML = g.html;
                    x = k.getElementsByTagName("table");
                    f.findParentByTagName(h.selection.getStart(),
                        "table") ? (p.each(x, function (a) {
                        f.remove(a)
                    }), f.findParentByTagName(h.selection.getStart(), "caption", !0) && (k.innerHTML = k[r.ie ? "innerText" : "textContent"])) : p.each(x, function (b) {
                        d(b, !0);
                        f.removeAttributes(b, ["style", "border"]);
                        p.each(f.getElementsByTagName(b, "td"), function (b) {
                            a(b) && f.fillNode(h.document, b);
                            d(b, !0)
                        })
                    });
                    g.html = k.innerHTML
                }
            });
            y.addListener("afterpaste", function () {
                p.each(f.getElementsByTagName(y.body, "table"), function (a) {
                    if (a.offsetWidth > y.body.offsetWidth) {
                        var b = G.getDefaultValue(y, a);
                        a.style.width = y.body.offsetWidth - 2 * parseInt(f.getComputedStyle(y.body, "margin-left"), 10) - 2 * b.tableBorder - (y.options.offsetWidth || 0) + "px"
                    }
                })
            });
            y.addListener("blur", function () {
                b = null
            });
            var n;
            y.addListener("keydown", function () {
                clearTimeout(n);
                n = setTimeout(function () {
                    var a = y.selection.getRange();
                    if (a = f.findParentByTagName(a.startContainer, ["th", "td"], !0)) {
                        var b = a.parentNode.parentNode.parentNode;
                        b.offsetWidth > b.getAttribute("width") && (a.style.wordBreak = "break-all")
                    }
                }, 100)
            });
            y.addListener("selectionchange",
                function () {
                    m(y, !1, "", null)
                });
            y.addListener("contentchange", function () {
                var a = this;
                J(a);
                if (!G.getUETableBySelected(a)) {
                    var b = a.selection.getRange().startContainer, b = f.findParentByTagName(b, ["td", "th"], !0);
                    p.each(f.getElementsByTagName(a.document, "table"), function (b) {
                        !0 !== a.fireEvent("excludetable", b) && (b.ueTable = new G(b), b.onmouseover = function () {
                            a.fireEvent("tablemouseover", b)
                        }, b.onmousemove = function () {
                            a.fireEvent("tablemousemove", b);
                            a.options.tableDragable && g(!0, this, a);
                            p.defer(function () {
                                a.fireEvent("contentchange",
                                    50)
                            }, !0)
                        }, b.onmouseout = function () {
                            a.fireEvent("tablemouseout", b);
                            m(a, !1, "", null);
                            J(a)
                        }, b.onclick = function (b) {
                            b = a.window.event || b;
                            var e = c(b.target || b.srcElement);
                            if (e) {
                                var d = N(e), g = d.table, h = d.getCellInfo(e), f = a.selection.getRange();
                                k(g, e, b, !0) ? (g = d.getCell(d.indexTable[d.rowsNum - 1][h.colIndex].rowIndex, d.indexTable[d.rowsNum - 1][h.colIndex].cellIndex), b.shiftKey && d.selectedTds.length ? d.selectedTds[0] !== g ? (b = d.getCellsRange(d.selectedTds[0], g), d.setSelected(b)) : f && f.selectNodeContents(g).select() : e !==
                                g ? (b = d.getCellsRange(e, g), d.setSelected(b)) : f && f.selectNodeContents(g).select()) : k(g, e, b) && (g = d.getCell(d.indexTable[h.rowIndex][d.colsNum - 1].rowIndex, d.indexTable[h.rowIndex][d.colsNum - 1].cellIndex), b.shiftKey && d.selectedTds.length ? d.selectedTds[0] !== g ? (b = d.getCellsRange(d.selectedTds[0], g), d.setSelected(b)) : f && f.selectNodeContents(g).select() : e !== g ? (b = d.getCellsRange(e, g), d.setSelected(b)) : f && f.selectNodeContents(g).select())
                            }
                        })
                    });
                    Q(a, !0)
                }
            });
            f.on(y.document, "mousemove", h);
            f.on(y.document, "mouseout",
                function (a) {
                    "TABLE" == (a.target || a.srcElement).tagName && m(y, !1, "", null)
                });
            y.addListener("interlacetable", function (a, b, c) {
                if (b) {
                    a = b.rows;
                    b = a.length;
                    for (var e = 0; e < b; e++) {
                        var d = c || this.options.classList;
                        a[e].className = d[e] ? d[e] : d[e % d.length]
                    }
                }
            });
            y.addListener("uninterlacetable", function (a, b) {
                if (b)for (var c = b.rows, e = this.options.classList, d = c.length, g = 0; g < d; g++)f.removeClasses(c[g], e)
            });
            y.addListener("mousedown", q);
            y.addListener("mouseup", B);
            f.on(y.body, "dragstart", function (a) {
                B.call(y, "dragstart", a)
            });
            y.addOutputRule(function (a) {
                p.each(a.getNodesByTagName("div"), function (a) {
                    "ue_tableDragLine" == a.getAttr("id") && a.parentNode.removeChild(a)
                })
            });
            var u = 0;
            y.addListener("mousedown", function () {
                u = 0
            });
            y.addListener("tabkeydown", function () {
                var b = this.selection.getRange(), c = b.getCommonAncestor(!0, !0), e = f.findParentByTagName(c, "table");
                if (e) {
                    if (f.findParentByTagName(c, "caption", !0))(c = f.getElementsByTagName(e, "th td")) && c.length && b.setStart(c[0], 0).setCursor(!1, !0); else {
                        var c = f.findParentByTagName(c, ["td",
                            "th"], !0), d = N(c);
                        u = 1 < c.rowSpan ? u : d.getCellInfo(c).rowIndex;
                        (c = d.getTabNextCell(c, u)) ? a(c) ? b.setStart(c, 0).setCursor(!1, !0) : b.selectNodeContents(c).select() : (y.fireEvent("saveScene"), y.__hasEnterExecCommand = !0, this.execCommand("insertrownext"), y.__hasEnterExecCommand = !1, b = this.selection.getRange(), b.setStart(e.rows[e.rows.length - 1].cells[0], 0).setCursor(), y.fireEvent("saveScene"))
                    }
                    return !0
                }
            });
            r.ie && y.addListener("selectionchange", function () {
                m(this, !1, "", null)
            });
            y.addListener("keydown", function (a, b) {
                var c =
                    b.keyCode || b.which;
                if (8 != c && 46 != c) {
                    (c = !b.ctrlKey && !b.metaKey && !b.shiftKey && !b.altKey) && ha(f.getElementsByTagName(this.body, "td"));
                    var e = G.getUETableBySelected(this);
                    e && c && e.clearSelected()
                }
            });
            y.addListener("beforegetcontent", function () {
                Q(this, !1);
                r.ie && p.each(this.document.getElementsByTagName("caption"), function (a) {
                    f.isEmptyNode(a) && (a.innerHTML = "&nbsp;")
                })
            });
            y.addListener("aftergetcontent", function () {
                Q(this, !0)
            });
            y.addListener("getAllHtml", function () {
                ha(y.document.getElementsByTagName("td"))
            });
            y.addListener("fullscreenchanged", function (a, b) {
                if (!b) {
                    var c = this.body.offsetWidth / document.body.offsetWidth, e = f.getElementsByTagName(this.body, "table");
                    p.each(e, function (a) {
                        if (a.offsetWidth < y.body.offsetWidth)return !1;
                        var b = f.getElementsByTagName(a, "td"), e = [];
                        p.each(b, function (a) {
                            e.push(a.offsetWidth)
                        });
                        for (var d = 0, g; g = b[d]; d++)g.setAttribute("width", Math.floor(e[d] * c));
                        a.setAttribute("width", Math.floor(Z(y, !0, G.getDefaultValue(y, void 0))))
                    })
                }
            });
            var z = y.execCommand;
            y.execCommand = function (b, c) {
                b =
                    b.toLowerCase();
                var e = G.getUETableBySelected(this), d = new M.Range(this.document), g = this.commands[b] || UE.commands[b], h;
                if (g) {
                    if (!e || ba[b] || g.notNeedUndo || this.__hasEnterExecCommand)h = z.apply(this, arguments); else {
                        this.__hasEnterExecCommand = !0;
                        this.fireEvent("beforeexeccommand", b);
                        for (var e = e.selectedTds, k = g = -2, l, n, m = 0, q; q = e[m]; m++)if (a(q) ? d.setStart(q, 0).setCursor(!1, !0) : d.selectNode(q).select(!0), n = this.queryCommandState(b), l = this.queryCommandValue(b), -1 != n) {
                            if (g !== n || k !== l)this._ignoreContentChange = !0, h = z.apply(this, arguments), this._ignoreContentChange = !1;
                            g = this.queryCommandState(b);
                            k = this.queryCommandValue(b);
                            f.isEmptyBlock(q) && f.fillNode(this.document, q)
                        }
                        d.setStart(e[0], 0).shrinkBoundary(!0).setCursor(!1, !0);
                        this.fireEvent("contentchange");
                        this.fireEvent("afterexeccommand", b);
                        this.__hasEnterExecCommand = !1;
                        this._selectionChange()
                    }
                    return h
                }
            }
        })
    };
    UE.UETable.prototype.sortTable = function (d, b) {
        var c = this.table, a = c.rows, e = [], h = "TH" === a[0].cells[0].tagName, g = 0;
        if (this.selectedTds.length) {
            for (var f =
                this.cellsRange, k = f.endRowIndex + 1, m = f.beginRowIndex; m < k; m++)e[m] = a[m];
            e.splice(0, f.beginRowIndex);
            g = f.endRowIndex + 1 === this.rowsNum ? 0 : f.endRowIndex + 1
        } else for (m = 0, k = a.length; m < k; m++)e[m] = a[m];
        var n = {
            reversecurrent: function (a, b) {
                return 1
            }, orderbyasc: function (a, b) {
                return (a.innerText || a.textContent).localeCompare(b.innerText || b.textContent)
            }, reversebyasc: function (a, b) {
                return b.innerHTML.localeCompare(a.innerHTML)
            }, orderbynum: function (a, b) {
                var c = a[r.ie ? "innerText" : "textContent"].match(/\d+/), e = b[r.ie ?
                    "innerText" : "textContent"].match(/\d+/);
                c && (c = +c[0]);
                e && (e = +e[0]);
                return (c || 0) - (e || 0)
            }, reversebynum: function (a, b) {
                var c = a[r.ie ? "innerText" : "textContent"].match(/\d+/), e = b[r.ie ? "innerText" : "textContent"].match(/\d+/);
                c && (c = +c[0]);
                e && (e = +e[0]);
                return (e || 0) - (c || 0)
            }
        };
        c.setAttribute("data-sort-type", b && "string" === typeof b && n[b] ? b : "");
        h && e.splice(0, 1);
        e = p.sort(e, function (a, c) {
            return b && "function" === typeof b ? b.call(this, a.cells[d], c.cells[d]) : b && "number" === typeof b ? 1 : b && "string" === typeof b && n[b] ? n[b].call(this,
                a.cells[d], c.cells[d]) : n.orderbyasc.call(this, a.cells[d], c.cells[d])
        });
        h = c.ownerDocument.createDocumentFragment();
        m = 0;
        for (k = e.length; m < k; m++)h.appendChild(e[m]);
        c = c.getElementsByTagName("tbody")[0];
        g ? c.insertBefore(h, a[g - f.endRowIndex + f.beginRowIndex - 1]) : c.appendChild(h)
    };
    UE.plugins.tablesort = function () {
        var d = this, b = UE.UETable;
        d.ready(function () {
            p.cssRule("tablesort", "table.sortEnabled tr.firstRow th,table.sortEnabled tr.firstRow td{padding-right:20px;background-repeat: no-repeat;background-position: center right;   background-image:url(" +
                d.options.themePath + d.options.theme + "/images/sortable.png);}", d.document);
            d.addListener("afterexeccommand", function (b, a) {
                "mergeright" != a && "mergedown" != a && "mergecells" != a || this.execCommand("disablesort")
            })
        });
        UE.commands.sorttable = {
            queryCommandState: function () {
                var c = b.getTableItemsByRange(this);
                if (!c.cell)return -1;
                for (var c = c.table.getElementsByTagName("td"), a = 0, e; e = c[a++];)if (1 != e.rowSpan || 1 != e.colSpan)return -1;
                return 0
            }, execCommand: function (c, a) {
                var e = this.selection.getRange(), d = e.createBookmark(!0),
                    g = b.getTableItemsByRange(this), f = g.cell, g = b.getUETable(g.table), f = g.getCellInfo(f);
                g.sortTable(f.cellIndex, a);
                e.moveToBookmark(d);
                try {
                    e.select()
                } catch (k) {
                }
            }
        };
        UE.commands.enablesort = UE.commands.disablesort = {
            queryCommandState: function (c) {
                var a = b.getTableItemsByRange(this).table;
                if (a && "enablesort" == c)for (var e = f.getElementsByTagName(a, "th td"), d = 0; d < e.length; d++)if (1 < e[d].getAttribute("colspan") || 1 < e[d].getAttribute("rowspan"))return -1;
                return a ? "enablesort" == c ^ "sortEnabled" != a.getAttribute("data-sort") ?
                    -1 : 0 : -1
            }, execCommand: function (c) {
                var a = b.getTableItemsByRange(this).table;
                a.setAttribute("data-sort", "enablesort" == c ? "sortEnabled" : "sortDisabled");
                "enablesort" == c ? f.addClass(a, "sortEnabled") : f.removeClasses(a, "sortEnabled")
            }
        }
    };
    UE.plugins.contextmenu = function () {
        var d = this;
        d.setOpt("enableContextMenu", !0);
        if (!1 !== d.getOpt("enableContextMenu")) {
            var b = d.getLang("contextMenu"), c, a = d.options.contextMenu || [{
                    label: b.selectall,
                    cmdName: "selectall"
                }, {
                    label: b.cleardoc, cmdName: "cleardoc", exec: function () {
                        confirm(b.confirmclear) &&
                        this.execCommand("cleardoc")
                    }
                }, "-", {label: b.unlink, cmdName: "unlink"}, "-", {
                    group: b.paragraph,
                    icon: "justifyjustify",
                    subMenu: [{label: b.justifyleft, cmdName: "justify", value: "left"}, {
                        label: b.justifyright,
                        cmdName: "justify",
                        value: "right"
                    }, {label: b.justifycenter, cmdName: "justify", value: "center"}, {
                        label: b.justifyjustify,
                        cmdName: "justify",
                        value: "justify"
                    }]
                }, "-", {
                    group: b.table,
                    icon: "table",
                    subMenu: [{label: b.inserttable, cmdName: "inserttable"}, {
                        label: b.deletetable,
                        cmdName: "deletetable"
                    }, "-", {
                        label: b.deleterow,
                        cmdName: "deleterow"
                    }, {label: b.deletecol, cmdName: "deletecol"}, {
                        label: b.insertcol,
                        cmdName: "insertcol"
                    }, {label: b.insertcolnext, cmdName: "insertcolnext"}, {
                        label: b.insertrow,
                        cmdName: "insertrow"
                    }, {label: b.insertrownext, cmdName: "insertrownext"}, "-", {
                        label: b.insertcaption,
                        cmdName: "insertcaption"
                    }, {label: b.deletecaption, cmdName: "deletecaption"}, {
                        label: b.inserttitle,
                        cmdName: "inserttitle"
                    }, {label: b.deletetitle, cmdName: "deletetitle"}, {
                        label: b.inserttitlecol,
                        cmdName: "inserttitlecol"
                    }, {label: b.deletetitlecol, cmdName: "deletetitlecol"},
                        "-", {label: b.mergecells, cmdName: "mergecells"}, {
                            label: b.mergeright,
                            cmdName: "mergeright"
                        }, {label: b.mergedown, cmdName: "mergedown"}, "-", {
                            label: b.splittorows,
                            cmdName: "splittorows"
                        }, {label: b.splittocols, cmdName: "splittocols"}, {
                            label: b.splittocells,
                            cmdName: "splittocells"
                        }, "-", {label: b.averageDiseRow, cmdName: "averagedistributerow"}, {
                            label: b.averageDisCol,
                            cmdName: "averagedistributecol"
                        }, "-", {
                            label: b.edittd, cmdName: "edittd", exec: function () {
                                UE.ui.edittd && new UE.ui.edittd(this);
                                this.getDialog("edittd").open()
                            }
                        },
                        {
                            label: b.edittable, cmdName: "edittable", exec: function () {
                            UE.ui.edittable && new UE.ui.edittable(this);
                            this.getDialog("edittable").open()
                        }
                        }, {label: b.setbordervisible, cmdName: "setbordervisible"}]
                }, {
                    group: b.tablesort,
                    icon: "tablesort",
                    subMenu: [{label: b.enablesort, cmdName: "enablesort"}, {
                        label: b.disablesort,
                        cmdName: "disablesort"
                    }, "-", {
                        label: b.reversecurrent,
                        cmdName: "sorttable",
                        value: "reversecurrent"
                    }, {label: b.orderbyasc, cmdName: "sorttable", value: "orderbyasc"}, {
                        label: b.reversebyasc,
                        cmdName: "sorttable",
                        value: "reversebyasc"
                    },
                        {label: b.orderbynum, cmdName: "sorttable", value: "orderbynum"}, {
                            label: b.reversebynum,
                            cmdName: "sorttable",
                            value: "reversebynum"
                        }]
                }, {
                    group: b.borderbk,
                    icon: "borderBack",
                    subMenu: [{
                        label: b.setcolor, cmdName: "interlacetable", exec: function () {
                            this.execCommand("interlacetable")
                        }
                    }, {
                        label: b.unsetcolor, cmdName: "uninterlacetable", exec: function () {
                            this.execCommand("uninterlacetable")
                        }
                    }, {
                        label: b.setbackground, cmdName: "settablebackground", exec: function () {
                            this.execCommand("settablebackground", {
                                repeat: !0, colorList: ["#bbb",
                                    "#ccc"]
                            })
                        }
                    }, {
                        label: b.unsetbackground, cmdName: "cleartablebackground", exec: function () {
                            this.execCommand("cleartablebackground")
                        }
                    }, {
                        label: b.redandblue, cmdName: "settablebackground", exec: function () {
                            this.execCommand("settablebackground", {repeat: !0, colorList: ["red", "blue"]})
                        }
                    }, {
                        label: b.threecolorgradient, cmdName: "settablebackground", exec: function () {
                            this.execCommand("settablebackground", {repeat: !0, colorList: ["#aaa", "#bbb", "#ccc"]})
                        }
                    }]
                }, {
                    group: b.aligntd, icon: "aligntd", subMenu: [{
                        cmdName: "cellalignment", value: {
                            align: "left",
                            vAlign: "top"
                        }
                    }, {cmdName: "cellalignment", value: {align: "center", vAlign: "top"}}, {
                        cmdName: "cellalignment",
                        value: {align: "right", vAlign: "top"}
                    }, {cmdName: "cellalignment", value: {align: "left", vAlign: "middle"}}, {
                        cmdName: "cellalignment",
                        value: {align: "center", vAlign: "middle"}
                    }, {cmdName: "cellalignment", value: {align: "right", vAlign: "middle"}}, {
                        cmdName: "cellalignment",
                        value: {align: "left", vAlign: "bottom"}
                    }, {cmdName: "cellalignment", value: {align: "center", vAlign: "bottom"}}, {
                        cmdName: "cellalignment", value: {
                            align: "right",
                            vAlign: "bottom"
                        }
                    }]
                }, {
                    group: b.aligntable,
                    icon: "aligntable",
                    subMenu: [{
                        cmdName: "tablealignment",
                        className: "left",
                        label: b.tableleft,
                        value: "left"
                    }, {
                        cmdName: "tablealignment",
                        className: "center",
                        label: b.tablecenter,
                        value: "center"
                    }, {cmdName: "tablealignment", className: "right", label: b.tableright, value: "right"}]
                }, "-", {
                    label: b.insertparagraphbefore,
                    cmdName: "insertparagraph",
                    value: !0
                }, {label: b.insertparagraphafter, cmdName: "insertparagraph"}, {
                    label: b.copy,
                    cmdName: "copy"
                }, {label: b.paste, cmdName: "paste"}];
            if (a.length) {
                var e =
                    UE.ui.uiUtils;
                d.addListener("contextmenu", function (h, g) {
                    var l = e.getViewportOffsetByEvent(g);
                    d.fireEvent("beforeselectionchange");
                    c && c.destroy();
                    for (var k = 0, m, n = []; m = a[k]; k++) {
                        var q;
                        (function (a) {
                            if ("-" == a)(q = n[n.length - 1]) && "-" !== q && n.push("-"); else if (a.hasOwnProperty("group")) {
                                for (var c = 0, e, g = []; e = a.subMenu[c]; c++)(function (a) {
                                    "-" == a ? (q = g[g.length - 1]) && "-" !== q ? g.push("-") : g.splice(g.length - 1) : (d.commands[a.cmdName] || UE.commands[a.cmdName] || a.query) && -1 < (a.query ? a.query() : d.queryCommandState(a.cmdName)) &&
                                    g.push({
                                        label: a.label || d.getLang("contextMenu." + a.cmdName + (a.value || "")) || "",
                                        className: "edui-for-" + a.cmdName + (a.className ? " edui-for-" + a.cmdName + "-" + a.className : ""),
                                        onclick: a.exec ? function () {
                                            a.exec.call(d)
                                        } : function () {
                                            d.execCommand(a.cmdName, a.value)
                                        }
                                    })
                                })(e);
                                g.length && n.push({
                                    label: function () {
                                        switch (a.icon) {
                                            case "table":
                                                return d.getLang("contextMenu.table");
                                            case "justifyjustify":
                                                return d.getLang("contextMenu.paragraph");
                                            case "aligntd":
                                                return d.getLang("contextMenu.aligntd");
                                            case "aligntable":
                                                return d.getLang("contextMenu.aligntable");
                                            case "tablesort":
                                                return b.tablesort;
                                            case "borderBack":
                                                return b.borderbk;
                                            default:
                                                return ""
                                        }
                                    }(), className: "edui-for-" + a.icon, subMenu: {items: g, editor: d}
                                })
                            } else(d.commands[a.cmdName] || UE.commands[a.cmdName] || a.query) && -1 < (a.query ? a.query.call(d) : d.queryCommandState(a.cmdName)) && n.push({
                                label: a.label || d.getLang("contextMenu." + a.cmdName),
                                className: "edui-for-" + (a.icon ? a.icon : a.cmdName + (a.value || "")),
                                onclick: a.exec ? function () {
                                    a.exec.call(d)
                                } : function () {
                                    d.execCommand(a.cmdName, a.value)
                                }
                            })
                        })(m)
                    }
                    "-" == n[n.length -
                    1] && n.pop();
                    c = new UE.ui.Menu({items: n, className: "edui-contextmenu", editor: d});
                    c.render();
                    c.showAt(l);
                    d.fireEvent("aftershowcontextmenu", c);
                    f.preventDefault(g);
                    if (r.ie) {
                        var u;
                        try {
                            u = d.selection.getNative().createRange()
                        } catch (p) {
                            return
                        }
                        u.item && (new M.Range(d.document)).selectNode(u.item(0)).select(!0, !0)
                    }
                });
                d.addListener("aftershowcontextmenu", function (a, b) {
                    if (d.zeroclipboard) {
                        var c = b.items, e;
                        for (e in c)"edui-for-copy" == c[e].className && d.zeroclipboard.clip(c[e].getDom())
                    }
                })
            }
        }
    };
    UE.plugins.shortcutmenu =
        function () {
            var d, b = this.options.shortcutMenu || [];
            b.length && (this.addListener("contextmenu mouseup", function (c, a) {
                var e = this, h = {
                    type: c,
                    target: a.target || a.srcElement,
                    screenX: a.screenX,
                    screenY: a.screenY,
                    clientX: a.clientX,
                    clientY: a.clientY
                };
                setTimeout(function () {
                    if (!1 === e.selection.getRange().collapsed || "contextmenu" == c)d || (d = new t.editor.ui.ShortCutMenu({
                        editor: e,
                        items: b,
                        theme: e.options.theme,
                        className: "edui-shortcutmenu"
                    }), d.render(), e.fireEvent("afterrendershortcutmenu", d)), d.show(h, !!UE.plugins.contextmenu)
                });
                if ("contextmenu" == c && (f.preventDefault(a), r.ie9below)) {
                    var g;
                    try {
                        g = e.selection.getNative().createRange()
                    } catch (l) {
                        return
                    }
                    g.item && (new M.Range(e.document)).selectNode(g.item(0)).select(!0, !0)
                }
            }), this.addListener("keydown", function (b) {
                "keydown" == b && d && !d.isHidden && d.hide()
            }))
        };
    UE.plugins.basestyle = function () {
        var d = {
            bold: ["strong", "b"],
            italic: ["em", "i"],
            subscript: ["sub"],
            superscript: ["sup"]
        }, b = function (a, b) {
            return f.filterNodeList(a.selection.getStartElementPath(), b)
        }, c = this;
        c.addshortcutkey({
            Bold: "ctrl+66",
            Italic: "ctrl+73", Underline: "ctrl+85"
        });
        c.addInputRule(function (a) {
            p.each(a.getNodesByTagName("b i"), function (a) {
                switch (a.tagName) {
                    case "b":
                        a.tagName = "strong";
                        break;
                    case "i":
                        a.tagName = "em"
                }
            })
        });
        for (var a in d)(function (a, d) {
            c.commands[a] = {
                execCommand: function (a) {
                    var e = c.selection.getRange(), k = b(this, d);
                    if (e.collapsed) {
                        if (k)a = c.document.createTextNode(""), e.insertNode(a).removeInlineStyle(d), e.setStartBefore(a), f.remove(a); else {
                            k = e.document.createElement(d[0]);
                            if ("superscript" == a || "subscript" == a)a =
                                c.document.createTextNode(""), e.insertNode(a).removeInlineStyle(["sub", "sup"]).setStartBefore(a).collapse(!0);
                            e.insertNode(k).setStart(k, 0)
                        }
                        e.collapse(!0)
                    } else {
                        if ("superscript" == a || "subscript" == a)k && k.tagName.toLowerCase() == a || e.removeInlineStyle(["sub", "sup"]);
                        k ? e.removeInlineStyle(d) : e.applyInlineStyle(d[0])
                    }
                    e.select()
                }, queryCommandState: function () {
                    return b(this, d) ? 1 : 0
                }
            }
        })(a, d[a])
    };
    UE.plugins.elementpath = function () {
        var d, b, c = this;
        c.setOpt("elementPathEnabled", !0);
        c.options.elementPathEnabled && (c.commands.elementpath =
        {
            execCommand: function (a, e) {
                var h = b[e], g = c.selection.getRange();
                d = 1 * e;
                g.selectNode(h).select()
            }, queryCommandValue: function () {
            var a = [].concat(this.selection.getStartElementPath()).reverse(), c = [];
            b = a;
            for (var h = 0, g; g = a[h]; h++)if (3 != g.nodeType) {
                var f = g.tagName.toLowerCase();
                "img" == f && g.getAttribute("anchorname") && (f = "anchor");
                c[h] = f;
                if (d == h) {
                    d = -1;
                    break
                }
            }
            return c
        }
        })
    };
    UE.plugins.formatmatch = function () {
        function d(h, g) {
            if (r.webkit)var l = "IMG" == g.target.tagName ? g.target : null;
            b.undoManger && b.undoManger.save();
            var k = b.selection.getRange(), l = l || k.getClosedNode();
            if (a && l && "IMG" == l.tagName)l.style.cssText += ";float:" + (a.style.cssFloat || a.style.styleFloat || "none") + ";display:" + (a.style.display || "inline"), a = null; else if (!a) {
                if (k.collapsed) {
                    var m = b.document.createTextNode("match");
                    k.insertNode(m).select()
                }
                b.__hasEnterExecCommand = !0;
                k = b.options.removeFormatAttributes;
                b.options.removeFormatAttributes = "";
                b.execCommand("removeformat");
                b.options.removeFormatAttributes = k;
                b.__hasEnterExecCommand = !1;
                k = b.selection.getRange();
                c.length && (l = k, m && l.selectNode(m), l.applyInlineStyle(c[c.length - 1].tagName, null, c));
                m && k.setStartBefore(m).collapse(!0);
                k.select();
                m && f.remove(m)
            }
            b.undoManger && b.undoManger.save();
            b.removeListener("mouseup", d);
            e = 0
        }

        var b = this, c = [], a, e = 0;
        b.addListener("reset", function () {
            c = [];
            e = 0
        });
        b.commands.formatmatch = {
            execCommand: function (h) {
                if (e)e = 0, c = [], b.removeListener("mouseup", d); else {
                    h = b.selection.getRange();
                    a = h.getClosedNode();
                    if (!a || "IMG" != a.tagName) {
                        h.collapse(!0).shrinkBoundary();
                        c = f.findParents(h.startContainer,
                            !0, function (a) {
                                return !f.isBlockElm(a) && 1 == a.nodeType
                            });
                        h = 0;
                        for (var g; g = c[h]; h++)if ("A" == g.tagName) {
                            c.splice(h, 1);
                            break
                        }
                    }
                    b.addListener("mouseup", d);
                    e = 1
                }
            }, queryCommandState: function () {
                return e
            }, notNeedUndo: 1
        }
    };
    UE.plugin.register("searchreplace", function () {
        function d(a, b, c) {
            var l = 0;
            a = a.firstChild;
            for (var k = 0; a;) {
                if (3 == a.nodeType) {
                    if (k = a.nodeValue.replace(/(^[\t\r\n]+)|([\t\r\n]+$)/, "").length, l += k, l >= b)return {
                        node: a,
                        index: k - (l - b)
                    }
                } else if (!w.$empty[a.tagName] && (k = a[r.ie ? "innerText" : "textContent"].replace(/(^[\t\r\n]+)|([\t\r\n]+$)/,
                        "").length, l += k, l >= b && (k = d(a, k - (l - b), c))))return k;
                a = f.getNextDomNode(a)
            }
        }

        function b(b, h) {
            var g = b.selection.getRange(), l, k = h.searchStr, m = b.document.createElement("span");
            m.innerHTML = "$$ueditor_searchreplace_key$$";
            g.shrinkBoundary(!0);
            if (!g.collapsed) {
                g.select();
                var n = b.selection.getText();
                if ((new RegExp("^" + h.searchStr + "$", h.casesensitive ? "" : "i")).test(n)) {
                    if (void 0 != h.replaceStr)return k = h.replaceStr, k = c.document.createTextNode(k), g.deleteContents().insertNode(k), g.select(), !0;
                    g.collapse(-1 == h.dir)
                }
            }
            g.insertNode(m);
            g.enlargeToBlockElm(!0);
            l = g.startContainer;
            n = l[r.ie ? "innerText" : "textContent"].indexOf("$$ueditor_searchreplace_key$$");
            g.setStartBefore(m);
            f.remove(m);
            a:{
                var m = l, q;
                l = h.all || 1 == h.dir ? "getNextDomNode" : "getPreDomNode";
                f.isBody(m) && (m = m.firstChild);
                for (; m;) {
                    q = 3 == m.nodeType ? m.nodeValue : m[r.ie ? "innerText" : "textContent"];
                    b:{
                        var u = h, p = n, z = u.searchStr;
                        -1 == u.dir && (q = q.split("").reverse().join(""), z = z.split("").reverse().join(""), p = q.length - p);
                        for (var z = new RegExp(z, "g" + (u.casesensitive ? "" : "i")), v = void 0; v =
                            z.exec(q);)if (v.index >= p) {
                            q = -1 == u.dir ? q.length - v.index - u.searchStr.length : v.index;
                            break b
                        }
                        q = -1
                    }
                    if (-1 != q) {
                        n = {node: m, index: q};
                        break a
                    }
                    for (m = f[l](m); m && a[m.nodeName.toLowerCase()];)m = f[l](m, !0);
                    m && (n = -1 == h.dir ? (3 == m.nodeType ? m.nodeValue : m[r.ie ? "innerText" : "textContent"]).length : 0)
                }
                n = void 0
            }
            if (n)return m = d(n.node, n.index, k), k = d(n.node, n.index + k.length, k), g.setStart(m.node, m.index).setEnd(k.node, k.index), void 0 !== h.replaceStr && (k = h.replaceStr, k = c.document.createTextNode(k), g.deleteContents().insertNode(k)),
                g.select(), !0;
            g.setCursor()
        }

        var c = this, a = {table: 1, tbody: 1, tr: 1, ol: 1, ul: 1};
        return {
            commands: {
                searchreplace: {
                    execCommand: function (a, d) {
                        p.extend(d, {all: !1, casesensitive: !1, dir: 1}, !0);
                        var g = 0;
                        if (d.all) {
                            var f = c.selection.getRange(), k = c.body.firstChild;
                            k && 1 == k.nodeType ? (f.setStart(k, 0), f.shrinkBoundary(!0)) : 3 == k.nodeType && f.setStartBefore(k);
                            f.collapse(!0).select(!0);
                            for (void 0 !== d.replaceStr && c.fireEvent("saveScene"); b(this, d);)g++
                        } else void 0 !== d.replaceStr && c.fireEvent("saveScene"), b(this, d) && g++;
                        g &&
                        c.fireEvent("saveScene");
                        return g
                    }, notNeedUndo: 1
                }
            }
        }
    });
    UE.plugins.customstyle = function () {
        var d = this;
        d.setOpt({
            customstyle: [{
                tag: "h1",
                name: "tc",
                style: "font-size:32px;font-weight:bold;border-bottom:#ccc 2px solid;padding:0 4px 0 0;text-align:center;margin:0 0 20px 0;"
            }, {
                tag: "h1",
                name: "tl",
                style: "font-size:32px;font-weight:bold;border-bottom:#ccc 2px solid;padding:0 4px 0 0;text-align:left;margin:0 0 10px 0;"
            }, {tag: "span", name: "im", style: "font-size:16px;font-style:italic;font-weight:bold;line-height:18px;"},
                {
                    tag: "span",
                    name: "hi",
                    style: "font-size:16px;font-style:italic;font-weight:bold;color:rgb(51, 153, 204);line-height:18px;"
                }]
        });
        d.commands.customstyle = {
            execCommand: function (b, c) {
                var a = c.tag, e = f.findParent(this.selection.getStart(), function (a) {
                    return a.getAttribute("label")
                }, !0), d, g, l = {};
                for (d in c)void 0 !== c[d] && (l[d] = c[d]);
                delete l.tag;
                if (e && e.getAttribute("label") == c.label) {
                    d = this.selection.getRange();
                    g = d.createBookmark();
                    if (d.collapsed)if (w.$block[e.tagName]) {
                        var k = this.document.createElement("p");
                        f.moveChild(e, k);
                        e.parentNode.insertBefore(k, e);
                        f.remove(e)
                    } else f.remove(e, !0); else {
                        e = f.getCommonAncestor(g.start, g.end);
                        l = f.getElementsByTagName(e, a);
                        (new RegExp(a, "i")).test(e.tagName) && l.push(e);
                        for (var m = 0, n; n = l[m++];)if (n.getAttribute("label") == c.label) {
                            var k = f.getPosition(n, g.start), q = f.getPosition(n, g.end);
                            (k & f.POSITION_FOLLOWING || k & f.POSITION_CONTAINS) && (q & f.POSITION_PRECEDING || q & f.POSITION_CONTAINS) && w.$block[a] && (k = this.document.createElement("p"), f.moveChild(n, k), n.parentNode.insertBefore(k,
                                n));
                            f.remove(n, !0)
                        }
                        (e = f.findParent(e, function (a) {
                            return a.getAttribute("label") == c.label
                        }, !0)) && f.remove(e, !0)
                    }
                    d.moveToBookmark(g).select()
                } else w.$block[a] ? (this.execCommand("paragraph", a, l, "customstyle"), d = this.selection.getRange(), d.collapsed || (d.collapse(), e = f.findParent(this.selection.getStart(), function (a) {
                    return a.getAttribute("label") == c.label
                }, !0), a = this.document.createElement("p"), f.insertAfter(e, a), f.fillNode(this.document, a), d.setStart(a, 0).setCursor())) : (d = this.selection.getRange(), d.collapsed ?
                    (e = this.document.createElement(a), f.setAttributes(e, l), d.insertNode(e).setStart(e, 0).setCursor()) : (g = d.createBookmark(), d.applyInlineStyle(a, l).moveToBookmark(g).select()))
            }, queryCommandValue: function () {
                var b = f.filterNodeList(this.selection.getStartElementPath(), function (b) {
                    return b.getAttribute("label")
                });
                return b ? b.getAttribute("label") : ""
            }
        };
        d.addListener("keyup", function (b, c) {
            var a = c.keyCode || c.which;
            if (32 == a || 13 == a)if (a = d.selection.getRange(), a.collapsed) {
                var e = f.findParent(d.selection.getStart(),
                    function (a) {
                        return a.getAttribute("label")
                    }, !0);
                if (e && w.$block[e.tagName] && f.isEmptyNode(e)) {
                    var h = d.document.createElement("p");
                    f.insertAfter(e, h);
                    f.fillNode(d.document, h);
                    f.remove(e);
                    a.setStart(h, 0).setCursor()
                }
            }
        })
    };
    UE.plugins.catchremoteimage = function () {
        var d = this, b = UE.ajax;
        !1 !== d.options.catchRemoteImageEnable && (d.setOpt({catchRemoteImageEnable: !1}), d.addListener("afterpaste", function () {
            d.fireEvent("catchRemoteImage")
        }), d.addListener("catchRemoteImage", function () {
            function c(a, c) {
                var f = p.serializeParam(d.queryCommandValue("serverparam")) ||
                    "", f = p.formatUrl(e + (-1 == e.indexOf("?") ? "?" : "&") + f), h = {
                    method: "POST",
                    dataType: p.isCrossDomainUrl(f) ? "jsonp" : "",
                    timeout: 6E4,
                    onsuccess: c.success,
                    onerror: c.error
                };
                h[g] = a;
                b.request(f, h)
            }

            for (var a = d.getOpt("catcherLocalDomain"), e = d.getActionUrl(d.getOpt("catcherActionName")), h = d.getOpt("catcherUrlPrefix"), g = d.getOpt("catcherFieldName"), l = [], k = f.getElementsByTagName(d.document, "img"), m = function (a, b) {
                if (-1 != a.indexOf(location.host) || /(^\.)|(^\/)/.test(a))return !0;
                if (b)for (var c = 0, e; e = b[c++];)if (-1 !== a.indexOf(e))return !0;
                return !1
            }, n = 0, q; q = k[n++];)q.getAttribute("word_img") || (q = q.getAttribute("_src") || q.src || "", /^(https?|ftp):/i.test(q) && !m(q, a) && l.push(q));
            l.length && c(l, {
                success: function (a) {
                    try {
                        var b = void 0 !== a.state ? a : eval("(" + a.responseText + ")")
                    } catch (c) {
                        return
                    }
                    var e, g, n, l = b.list;
                    for (a = 0; b = k[a++];)for (n = b.getAttribute("_src") || b.src || "", e = 0; g = l[e++];)if (n == g.source && "SUCCESS" == g.state) {
                        e = h + g.url;
                        f.setAttributes(b, {src: e, _src: e});
                        break
                    }
                    d.fireEvent("catchremotesuccess")
                }, error: function () {
                    d.fireEvent("catchremoteerror")
                }
            })
        }))
    };
    UE.plugin.register("snapscreen", function () {
        function d(a) {
            var c = document.createElement("a"), d = p.serializeParam(b.queryCommandValue("serverparam")) || "";
            c.href = a;
            r.ie && (c.href = c.href);
            a = c.search;
            d && (a = a + (-1 == a.indexOf("?") ? "?" : "&") + d, a = a.replace(/[&]+/ig, "&"));
            return {port: c.port, hostname: c.hostname, path: c.pathname + a || +c.hash}
        }

        var b = this, c;
        return {
            commands: {
                snapscreen: {
                    execCommand: function (a) {
                        function e(a) {
                            try {
                                if (a = eval("(" + a + ")"), "SUCCESS" == a.state) {
                                    var c = b.options;
                                    b.execCommand("insertimage", {
                                        src: c.snapscreenUrlPrefix +
                                        a.url,
                                        _src: c.snapscreenUrlPrefix + a.url,
                                        alt: a.title || "",
                                        floatStyle: c.snapscreenImgAlign
                                    })
                                } else alert(a.state)
                            } catch (e) {
                                alert(l.callBackErrorMsg)
                            }
                        }

                        var f, g, l = b.getLang("snapScreen_plugin");
                        if (!c) {
                            a = b.container;
                            c = (b.container.ownerDocument || b.container.document).createElement("object");
                            try {
                                c.type = "application/x-pluginbaidusnap"
                            } catch (k) {
                                return
                            }
                            c.style.cssText = "position:absolute;left:-9999px;width:0;height:0;";
                            c.setAttribute("width", "0");
                            c.setAttribute("height", "0");
                            a.appendChild(c)
                        }
                        a = b.getActionUrl(b.getOpt("snapscreenActionName"));
                        f = d(a);
                        setTimeout(function () {
                            try {
                                g = c.saveSnapshot(f.hostname, f.path, f.port)
                            } catch (a) {
                                b.ui._dialogs.snapscreenDialog.open();
                                return
                            }
                            e(g)
                        }, 50)
                    }, queryCommandState: function () {
                        return -1 != navigator.userAgent.indexOf("Windows", 0) ? 0 : -1
                    }
                }
            }
        }
    });
    UE.commands.insertparagraph = {
        execCommand: function (d, b) {
            for (var c = this.selection.getRange(), a = c.startContainer, e; a && !f.isBody(a);)e = a, a = a.parentNode;
            e && (a = this.document.createElement("p"), b ? e.parentNode.insertBefore(a, e) : e.parentNode.insertBefore(a, e.nextSibling), f.fillNode(this.document,
                a), c.setStart(a, 0).setCursor(!1, !0))
        }
    };
    UE.plugin.register("webapp", function () {
        function d(c, a) {
            return a ? '<iframe class="edui-faked-webapp" title="' + c.title + '" ' + (c.align && !c.cssfloat ? 'align="' + c.align + '"' : "") + (c.cssfloat ? 'style="float:' + c.cssfloat + '"' : "") + 'width="' + c.width + '" height="' + c.height + '"  scrolling="no" frameborder="0" src="' + c.url + '" logo_url = "' + c.logo + '"></iframe>' : '<img title="' + c.title + '" width="' + c.width + '" height="' + c.height + '" src="' + b.options.UEDITOR_HOME_URL + 'themes/default/images/spacer.gif" _logo_url="' +
            c.logo + '" style="background:url(' + c.logo + ') no-repeat center center; border:1px solid gray;" class="edui-faked-webapp" _url="' + c.url + '" ' + (c.align && !c.cssfloat ? 'align="' + c.align + '"' : "") + (c.cssfloat ? 'style="float:' + c.cssfloat + '"' : "") + "/>"
        }

        var b = this;
        return {
            outputRule: function (b) {
                p.each(b.getNodesByTagName("img"), function (a) {
                    var b;
                    "edui-faked-webapp" == a.getAttr("class") && (b = d({
                        title: a.getAttr("title"),
                        width: a.getAttr("width"),
                        height: a.getAttr("height"),
                        align: a.getAttr("align"),
                        cssfloat: a.getStyle("float"),
                        url: a.getAttr("_url"),
                        logo: a.getAttr("_logo_url")
                    }, !0), b = UE.uNode.createElement(b), a.parentNode.replaceChild(b, a))
                })
            }, inputRule: function (b) {
                p.each(b.getNodesByTagName("iframe"), function (a) {
                    if ("edui-faked-webapp" == a.getAttr("class")) {
                        var b = UE.uNode.createElement(d({
                            title: a.getAttr("title"),
                            width: a.getAttr("width"),
                            height: a.getAttr("height"),
                            align: a.getAttr("align"),
                            cssfloat: a.getStyle("float"),
                            url: a.getAttr("src"),
                            logo: a.getAttr("logo_url")
                        }));
                        a.parentNode.replaceChild(b, a)
                    }
                })
            }, commands: {
                webapp: {
                    execCommand: function (b,
                                           a) {
                        var e = d(p.extend(a, {align: "none"}), !1);
                        this.execCommand("inserthtml", e)
                    }, queryCommandState: function () {
                        var b = this.selection.getRange().getClosedNode();
                        return b && "edui-faked-webapp" == b.className ? 1 : 0
                    }
                }
            }
        }
    });
    UE.plugins.template = function () {
        UE.commands.template = {
            execCommand: function (d, b) {
                b.html && this.execCommand("inserthtml", b.html)
            }
        };
        this.addListener("click", function (d, b) {
            var c = b.target || b.srcElement, a = this.selection.getRange();
            (c = f.findParent(c, function (a) {
                    if (a.className && f.hasClass(a, "ue_t"))return a
                },
                !0)) && a.selectNode(c).shrinkBoundary().select()
        });
        this.addListener("keydown", function (d, b) {
            var c = this.selection.getRange();
            c.collapsed || b.ctrlKey || b.metaKey || b.shiftKey || b.altKey || (c = f.findParent(c.startContainer, function (a) {
                if (a.className && f.hasClass(a, "ue_t"))return a
            }, !0)) && f.removeClasses(c, ["ue_t"])
        })
    };
    UE.plugin.register("music", function () {
        function d(c, a, e, d, g, f) {
            return f ? '<embed type="application/x-shockwave-flash" class="edui-faked-music" pluginspage="http://www.macromedia.com/go/getflashplayer" src="' +
            c + '" width="' + a + '" height="' + e + '" ' + (d && !g ? 'align="' + d + '"' : "") + (g ? 'style="float:' + g + '"' : "") + ' wmode="transparent" play="true" loop="false" menu="false" allowscriptaccess="never" allowfullscreen="true" >' : "<img " + (d && !g ? 'align="' + d + '"' : "") + (g ? 'style="float:' + g + '"' : "") + ' width="' + a + '" height="' + e + '" _url="' + c + '" class="edui-faked-music" src="' + b.options.langPath + b.options.lang + '/images/music.png" />'
        }

        var b = this;
        return {
            outputRule: function (b) {
                p.each(b.getNodesByTagName("img"), function (a) {
                    var b;
                    if ("edui-faked-music" ==
                        a.getAttr("class")) {
                        b = a.getStyle("float");
                        var c = a.getAttr("align");
                        b = d(a.getAttr("_url"), a.getAttr("width"), a.getAttr("height"), c, b, !0);
                        b = UE.uNode.createElement(b);
                        a.parentNode.replaceChild(b, a)
                    }
                })
            }, inputRule: function (b) {
                p.each(b.getNodesByTagName("embed"), function (a) {
                    if ("edui-faked-music" == a.getAttr("class")) {
                        var b = a.getStyle("float"), c = a.getAttr("align");
                        html = d(a.getAttr("src"), a.getAttr("width"), a.getAttr("height"), c, b, !1);
                        b = UE.uNode.createElement(html);
                        a.parentNode.replaceChild(b, a)
                    }
                })
            }, commands: {
                music: {
                    execCommand: function (b,
                                           a) {
                        var e = d(a.url, a.width || 400, a.height || 95, "none", !1);
                        this.execCommand("inserthtml", e)
                    }, queryCommandState: function () {
                        var b = this.selection.getRange().getClosedNode();
                        return b && "edui-faked-music" == b.className ? 1 : 0
                    }
                }
            }
        }
    });
    UE.plugin.register("autoupload", function () {
        function d(b, c) {
            var a, e, d, g, l, k, m, n, q = /image\/\w+/i.test(b.type) ? "image" : "file", u = "loading_" + (+new Date).toString(36);
            a = c.getOpt(q + "FieldName");
            e = c.getOpt(q + "UrlPrefix");
            d = c.getOpt(q + "MaxSize");
            g = c.getOpt(q + "AllowFiles");
            l = c.getActionUrl(c.getOpt(q +
                "ActionName"));
            m = function (a) {
                var b = c.document.getElementById(u);
                b && f.remove(b);
                c.fireEvent("showmessage", {id: u, content: a, type: "error", timeout: 4E3})
            };
            "image" == q ? (k = '<img class="loadingclass" id="' + u + '" src="' + c.options.themePath + c.options.theme + '/images/spacer.gif" title="' + (c.getLang("autoupload.loading") || "") + '" >', n = function (a) {
                var b = e + a.url, d = c.document.getElementById(u);
                d && (d.setAttribute("src", b), d.setAttribute("_src", b), d.setAttribute("title", a.title || ""), d.setAttribute("alt", a.original || ""),
                    d.removeAttribute("id"), f.removeClasses(d, "loadingclass"))
            }) : (k = '<p><img class="loadingclass" id="' + u + '" src="' + c.options.themePath + c.options.theme + '/images/spacer.gif" title="' + (c.getLang("autoupload.loading") || "") + '" ></p>', n = function (a) {
                a = e + a.url;
                var b = c.document.getElementById(u), d = c.selection.getRange(), g = d.createBookmark();
                d.selectNode(b).select();
                c.execCommand("insertfile", {url: a});
                d.moveToBookmark(g).select()
            });
            c.execCommand("inserthtml", k);
            c.getOpt(q + "ActionName") ? b.size > d ? m(c.getLang("autoupload.exceedSizeError")) :
                (d = b.name ? b.name.substr(b.name.lastIndexOf(".")) : "") && "image" != q || g && -1 == (g.join("") + ".").indexOf(d.toLowerCase() + ".") ? m(c.getLang("autoupload.exceedTypeError")) : (g = new XMLHttpRequest, q = new FormData, d = p.serializeParam(c.queryCommandValue("serverparam")) || "", l = p.formatUrl(l + (-1 == l.indexOf("?") ? "?" : "&") + d), q.append(a, b, b.name || "blob." + b.type.substr(6)), q.append("type", "ajax"), g.open("post", l, !0), g.setRequestHeader("X-Requested-With", "XMLHttpRequest"), g.addEventListener("load", function (a) {
                    try {
                        var b =
                            (new Function("return " + p.trim(a.target.response)))();
                        "SUCCESS" == b.state && b.url ? n(b) : m(b.state)
                    } catch (e) {
                        m(c.getLang("autoupload.loadError"))
                    }
                }), g.send(q)) : m(c.getLang("autoupload.errorLoadConfig"))
        }

        return {
            outputRule: function (b) {
                p.each(b.getNodesByTagName("img"), function (b) {
                    /\b(loaderrorclass)|(bloaderrorclass)\b/.test(b.getAttr("class")) && b.parentNode.removeChild(b)
                });
                p.each(b.getNodesByTagName("p"), function (b) {
                    /\bloadpara\b/.test(b.getAttr("class")) && b.parentNode.removeChild(b)
                })
            }, bindEvents: {
                ready: function (b) {
                    var c =
                        this;
                    window.FormData && window.FileReader && (f.on(c.body, "paste drop", function (a) {
                        var b = !1, f;
                        if (f = "paste" == a.type ? a.clipboardData && a.clipboardData.items && 1 == a.clipboardData.items.length && /^image\//.test(a.clipboardData.items[0].type) ? a.clipboardData.items : null : a.dataTransfer && a.dataTransfer.files ? a.dataTransfer.files : null) {
                            for (var g = f.length, l; g--;)l = f[g], l.getAsFile && (l = l.getAsFile()), l && 0 < l.size && (d(l, c), b = !0);
                            b && a.preventDefault()
                        }
                    }), f.on(c.body, "dragover", function (a) {
                        "Files" == a.dataTransfer.types[0] &&
                        a.preventDefault()
                    }), p.cssRule("loading", ".loadingclass{display:inline-block;cursor:default;background: url('" + this.options.themePath + this.options.theme + "/images/loading.gif') no-repeat center center transparent;border:1px solid #cccccc;margin-left:1px;height: 22px;width: 22px;}\n.loaderrorclass{display:inline-block;cursor:default;background: url('" + this.options.themePath + this.options.theme + "/images/loaderror.png') no-repeat center center transparent;border:1px solid #cccccc;margin-right:1px;height: 22px;width: 22px;}",
                        this.document))
                }
            }
        }
    });
    UE.plugin.register("autosave", function () {
        function d(e) {
            var d;
            20 > new Date - c || (e.hasContents() ? (c = new Date, e._saveFlag = null, d = b.body.innerHTML, !1 !== e.fireEvent("beforeautosave", {content: d}) && (b.setPreferences(a, d), e.fireEvent("afterautosave", {content: d}))) : a && b.removePreferences(a))
        }

        var b = this, c = new Date, a = null;
        return {
            defaultOptions: {saveInterval: 500}, bindEvents: {
                ready: function () {
                    var c = null, c = b.key ? b.key + "-drafts-data" : (b.container.parentNode.id || "ue-common") + "-drafts-data";
                    a = (location.protocol +
                        location.host + location.pathname).replace(/[.:\/]/g, "_") + c
                }, contentchange: function () {
                    a && (b._saveFlag && window.clearTimeout(b._saveFlag), 0 < b.options.saveInterval ? b._saveFlag = window.setTimeout(function () {
                        d(b)
                    }, b.options.saveInterval) : d(b))
                }
            }, commands: {
                clearlocaldata: {
                    execCommand: function (c, d) {
                        a && b.getPreferences(a) && b.removePreferences(a)
                    }, notNeedUndo: !0, ignoreContentChange: !0
                }, getlocaldata: {
                    execCommand: function (c, d) {
                        return a ? b.getPreferences(a) || "" : ""
                    }, notNeedUndo: !0, ignoreContentChange: !0
                }, drafts: {
                    execCommand: function (c,
                                           d) {
                        a && (b.body.innerHTML = b.getPreferences(a) || "<p>" + f.fillHtml + "</p>", b.focus(!0))
                    }, queryCommandState: function () {
                        return a ? null === b.getPreferences(a) ? -1 : 0 : -1
                    }, notNeedUndo: !0, ignoreContentChange: !0
                }
            }
        }
    });
    UE.plugin.register("charts", function () {
        function d(b) {
            var a = null, d = 0;
            if (2 > b.rows.length || 2 > b.rows[0].cells.length)return !1;
            for (var a = b.rows[0].cells, d = a.length, f = 0, g; g = a[f]; f++)if ("th" !== g.tagName.toLowerCase())return !1;
            for (f = 1; a = b.rows[f]; f++) {
                if (a.cells.length != d || "th" !== a.cells[0].tagName.toLowerCase())return !1;
                for (var l = 1; g = a.cells[l]; l++)if (g = p.trim(g.innerText || g.textContent || ""), g = g.replace(new RegExp(UE.dom.domUtils.fillChar, "g"), "").replace(/^\s+|\s+$/g, ""), !/^\d*\.?\d+$/.test(g))return !1
            }
            return !0
        }

        var b = this;
        return {
            bindEvents: {
                chartserror: function () {
                }
            }, commands: {
                charts: {
                    execCommand: function (c, a) {
                        var e = f.findParentByTagName(this.selection.getRange().startContainer, "table", !0), h = [], g = {};
                        if (!e)return !1;
                        if (!d(e))return b.fireEvent("chartserror"), !1;
                        g.title = a.title || "";
                        g.subTitle = a.subTitle || "";
                        g.xTitle =
                            a.xTitle || "";
                        g.yTitle = a.yTitle || "";
                        g.suffix = a.suffix || "";
                        g.tip = a.tip || "";
                        g.dataFormat = a.tableDataFormat || "";
                        g.chartType = a.chartType || 0;
                        for (var l in g)g.hasOwnProperty(l) && h.push(l + ":" + g[l]);
                        e.setAttribute("data-chart", h.join(";"));
                        f.addClass(e, "edui-charts-table")
                    }, queryCommandState: function (b, a) {
                        var e = f.findParentByTagName(this.selection.getRange().startContainer, "table", !0);
                        return e && d(e) ? 0 : -1
                    }
                }
            }, inputRule: function (b) {
                p.each(b.getNodesByTagName("table"), function (a) {
                    void 0 !== a.getAttr("data-chart") &&
                    a.setAttr("style")
                })
            }, outputRule: function (b) {
                p.each(b.getNodesByTagName("table"), function (a) {
                    void 0 !== a.getAttr("data-chart") && a.setAttr("style", "display: none;")
                })
            }
        }
    });
    UE.plugin.register("section", function () {
        function d(a) {
            this.tag = "";
            this.level = -1;
            this.parentSection = this.previousSection = this.nextSection = this.dom = null;
            this.startAddress = [];
            this.endAddress = [];
            this.children = []
        }

        function b(a) {
            var b = new d;
            return p.extend(b, a)
        }

        function c(a, b) {
            for (var c = b, d = 0; d < a.length; d++) {
                if (!c.childNodes)return null;
                c = c.childNodes[a[d]]
            }
            return c
        }

        var a = this;
        return {
            bindMultiEvents: {
                type: "aftersetcontent afterscencerestore", handler: function () {
                    a.fireEvent("updateSections")
                }
            }, bindEvents: {
                ready: function () {
                    a.fireEvent("updateSections");
                    f.on(a.body, "drop paste", function () {
                        a.fireEvent("updateSections")
                    })
                }, afterexeccommand: function (b, c) {
                    "paragraph" == c && a.fireEvent("updateSections")
                }, keyup: function (a, b) {
                    if (1 != this.selection.getRange().collapsed)this.fireEvent("updateSections"); else {
                        var c = b.keyCode || b.which;
                        13 != c && 8 != c &&
                        46 != c || this.fireEvent("updateSections")
                    }
                }
            }, commands: {
                getsections: {
                    execCommand: function (a, c) {
                        function d(a, c) {
                            for (var e, h = null, k, r = a.childNodes, t = 0, w = r.length; t < w; t++) {
                                k = r[t];
                                a:{
                                    e = k;
                                    for (var B = 0; B < f.length; B++)if (f[B](e)) {
                                        e = B;
                                        break a
                                    }
                                    e = -1
                                }
                                if (0 <= e) {
                                    h = m.selection.getRange().selectNode(k).createAddress(!0).startAddress;
                                    h = b({
                                        tag: k.tagName,
                                        title: k.innerText || k.textContent || "",
                                        level: e,
                                        dom: k,
                                        startAddress: p.clone(h, []),
                                        endAddress: p.clone(h, []),
                                        children: []
                                    });
                                    n.nextSection = h;
                                    for (k = h.previousSection = n; e <= k.level;)k =
                                        k.parentSection;
                                    h.parentSection = k;
                                    k.children.push(h);
                                    h = n = h
                                } else 1 === k.nodeType && d(k, c), h && h.endAddress[h.endAddress.length - 1]++
                            }
                        }

                        for (var f = c || "h1 h2 h3 h4 h5 h6".split(" "), k = 0; k < f.length; k++)"string" == typeof f[k] ? f[k] = function (a) {
                            return function (b) {
                                return b.tagName == a.toUpperCase()
                            }
                        }(f[k]) : "function" != typeof f[k] && (f[k] = function (a) {
                            return null
                        });
                        var m = this, n = k = b({level: -1, title: "root"});
                        d(m.body, k);
                        return k
                    }, notNeedUndo: !0
                }, movesection: {
                    execCommand: function (a, b, d, l) {
                        if (b && d && -1 != d.level) {
                            d = l ? d.endAddress :
                                d.startAddress;
                            a = c(d, this.body);
                            var k;
                            if (!(k = !d || !a)) {
                                k = b.startAddress;
                                for (var m = !1, n = !1, q = 0; q < k.length && !(q >= d.length); q++)if (d[q] > k[q]) {
                                    m = !0;
                                    break
                                } else if (d[q] < k[q])break;
                                for (q = 0; q < b.endAddress.length && !(q >= d.length); q++)if (d[q] < k[q]) {
                                    n = !0;
                                    break
                                } else if (d[q] > k[q])break;
                                k = m && n
                            }
                            if (!k) {
                                d = c(b.startAddress, this.body);
                                b = c(b.endAddress, this.body);
                                if (l)for (l = b; l && !(f.getPosition(d, l) & f.POSITION_FOLLOWING);) {
                                    k = l.previousSibling;
                                    f.insertAfter(a, l);
                                    if (l == d)break;
                                    l = k
                                } else for (l = d; l && !(f.getPosition(l, b) & f.POSITION_FOLLOWING);) {
                                    k =
                                        l.nextSibling;
                                    a.parentNode.insertBefore(l, a);
                                    if (l == b)break;
                                    l = k
                                }
                                this.fireEvent("updateSections")
                            }
                        }
                    }
                }, deletesection: {
                    execCommand: function (a, b, c) {
                        function d(a) {
                            for (var b = k.body, c = 0; c < a.length; c++) {
                                if (!b.childNodes)return null;
                                b = b.childNodes[a[c]]
                            }
                            return b
                        }

                        var k = this;
                        if (b) {
                            a = d(b.startAddress);
                            b = d(b.endAddress);
                            if (c)f.remove(a); else for (; a && f.inDoc(b, k.document) && !(f.getPosition(a, b) & f.POSITION_FOLLOWING);)c = a.nextSibling, f.remove(a), a = c;
                            k.fireEvent("updateSections")
                        }
                    }
                }, selectsection: {
                    execCommand: function (a,
                                           b) {
                        if (!b && !b.dom)return !1;
                        var c = this.selection.getRange(), d = {
                            startAddress: p.clone(b.startAddress, []),
                            endAddress: p.clone(b.endAddress, [])
                        };
                        d.endAddress[d.endAddress.length - 1]++;
                        c.moveToAddress(d).select().scrollToView();
                        return !0
                    }, notNeedUndo: !0
                }, scrolltosection: {
                    execCommand: function (a, b) {
                        if (!b && !b.dom)return !1;
                        var c = this.selection.getRange(), d = {startAddress: b.startAddress, endAddress: b.endAddress};
                        d.endAddress[d.endAddress.length - 1]++;
                        c.moveToAddress(d).scrollToView();
                        return !0
                    }, notNeedUndo: !0
                }
            }
        }
    });
    UE.plugin.register("simpleupload", function () {
        function d() {
            var d = a.offsetWidth || 20, h = a.offsetHeight || 20, g = document.createElement("iframe"), l = "display:block;width:" + d + "px;height:" + h + "px;overflow:hidden;border:0;margin:0;padding:0;position:absolute;top:0;left:0;filter:alpha(opacity=0);-moz-opacity:0;-khtml-opacity: 0;opacity: 0;cursor:pointer;";
            f.on(g, "load", function () {
                var a = (+new Date).toString(36), m, n, q;
                n = g.contentDocument || g.contentWindow.document;
                q = n.body;
                m = n.createElement("div");
                m.innerHTML = '<form id="edui_form_' +
                    a + '" target="edui_iframe_' + a + '" method="POST" enctype="multipart/form-data" action="' + b.getOpt("serverUrl") + '" style="' + l + '"><input id="edui_input_' + a + '" type="file" accept="image/*" name="' + b.options.imageFieldName + '" style="' + l + '"></form><iframe id="edui_iframe_' + a + '" name="edui_iframe_' + a + '" style="display:none;width:0;height:0;border:0;margin:0;padding:0;position:absolute;"></iframe>';
                m.className = "edui-" + b.options.theme;
                m.id = b.ui.id + "_iframeupload";
                q.style.cssText = l;
                q.style.width = d + "px";
                q.style.height =
                    h + "px";
                q.appendChild(m);
                q.parentNode && (q.parentNode.style.width = d + "px", q.parentNode.style.height = d + "px");
                var u = n.getElementById("edui_form_" + a), x = n.getElementById("edui_input_" + a), r = n.getElementById("edui_iframe_" + a);
                f.on(x, "change", function () {
                    function a() {
                        try {
                            var e, g, k, h = (r.contentDocument || r.contentWindow.document).body;
                            g = (new Function("return " + (h.innerText || h.textContent || "")))();
                            e = b.options.imageUrlPrefix + g.url;
                            "SUCCESS" == g.state && g.url ? (k = b.document.getElementById(d), k.setAttribute("src", e),
                                k.setAttribute("_src", e), k.setAttribute("title", g.title || ""), k.setAttribute("alt", g.original || ""), k.removeAttribute("id"), f.removeClasses(k, "loadingclass")) : c && c(g.state)
                        } catch (n) {
                            c && c(b.getLang("simpleupload.loadError"))
                        }
                        u.reset();
                        f.un(r, "load", a)
                    }

                    function c(a) {
                        if (d) {
                            var e = b.document.getElementById(d);
                            e && f.remove(e);
                            b.fireEvent("showmessage", {id: d, content: a, type: "error", timeout: 4E3})
                        }
                    }

                    if (x.value) {
                        var d = "loading_" + (+new Date).toString(36), e = p.serializeParam(b.queryCommandValue("serverparam")) || "",
                            g = b.getActionUrl(b.getOpt("imageActionName")), k = b.getOpt("imageAllowFiles");
                        b.focus();
                        b.execCommand("inserthtml", '<img class="loadingclass" id="' + d + '" src="' + b.options.themePath + b.options.theme + '/images/spacer.gif" title="' + (b.getLang("simpleupload.loading") || "") + '" >');
                        if (b.getOpt("imageActionName")) {
                            var h = x.value, h = h ? h.substr(h.lastIndexOf(".")) : "";
                            !h || k && -1 == (k.join("") + ".").indexOf(h.toLowerCase() + ".") ? c(b.getLang("simpleupload.exceedTypeError")) : (f.on(r, "load", a), u.action = p.formatUrl(g + (-1 ==
                                g.indexOf("?") ? "?" : "&") + e), u.submit())
                        } else errorHandler(b.getLang("autoupload.errorLoadConfig"))
                    }
                });
                var v;
                b.addListener("selectionchange", function () {
                    clearTimeout(v);
                    v = setTimeout(function () {
                        -1 == b.queryCommandState("simpleupload") ? x.disabled = "disabled" : x.disabled = !1
                    }, 400)
                });
                c = !0
            });
            g.style.cssText = l;
            a.appendChild(g)
        }

        var b = this, c = !1, a;
        return {
            bindEvents: {
                ready: function () {
                    p.cssRule("loading", ".loadingclass{display:inline-block;cursor:default;background: url('" + this.options.themePath + this.options.theme +
                        "/images/loading.gif') no-repeat center center transparent;border:1px solid #cccccc;margin-right:1px;height: 22px;width: 22px;}\n.loaderrorclass{display:inline-block;cursor:default;background: url('" + this.options.themePath + this.options.theme + "/images/loaderror.png') no-repeat center center transparent;border:1px solid #cccccc;margin-right:1px;height: 22px;width: 22px;}", this.document)
                }, simpleuploadbtnready: function (c, f) {
                    a = f;
                    b.afterConfigReady(d)
                }
            }, outputRule: function (a) {
                p.each(a.getNodesByTagName("img"),
                    function (a) {
                        /\b(loaderrorclass)|(bloaderrorclass)\b/.test(a.getAttr("class")) && a.parentNode.removeChild(a)
                    })
            }, commands: {
                simpleupload: {
                    queryCommandState: function () {
                        return c ? 0 : -1
                    }
                }
            }
        }
    });
    UE.plugin.register("serverparam", function () {
        var d = {};
        return {
            commands: {
                serverparam: {
                    execCommand: function (b, c, a) {
                        void 0 === c || null === c ? d = {} : p.isString(c) ? void 0 === a || null === a ? delete d[c] : d[c] = a : p.isObject(c) ? p.extend(d, c, !0) : p.isFunction(c) && p.extend(d, c(), !0)
                    }, queryCommandValue: function () {
                        return d || {}
                    }
                }
            }
        }
    });
    UE.plugin.register("insertfile",
        function () {
            var d = this;
            return {
                commands: {
                    insertfile: {
                        execCommand: function (b, c) {
                            c = p.isArray(c) ? c : [c];
                            var a, e, f, g, l = "";
                            a = d.getOpt("UEDITOR_HOME_URL");
                            var k = a + ("/" == a.substr(a.length - 1) ? "" : "/") + "dialogs/attachment/fileTypeImages/";
                            for (a = 0; a < c.length; a++)e = c[a], f = e.url, f = f.substr(f.lastIndexOf(".") + 1).toLowerCase(), g = {
                                rar: "icon_rar.gif",
                                zip: "icon_rar.gif",
                                tar: "icon_rar.gif",
                                gz: "icon_rar.gif",
                                bz2: "icon_rar.gif",
                                doc: "icon_doc.gif",
                                docx: "icon_doc.gif",
                                pdf: "icon_pdf.gif",
                                mp3: "icon_mp3.gif",
                                xls: "icon_xls.gif",
                                chm: "icon_chm.gif",
                                ppt: "icon_ppt.gif",
                                pptx: "icon_ppt.gif",
                                avi: "icon_mv.gif",
                                rmvb: "icon_mv.gif",
                                wmv: "icon_mv.gif",
                                flv: "icon_mv.gif",
                                swf: "icon_mv.gif",
                                rm: "icon_mv.gif",
                                exe: "icon_exe.gif",
                                psd: "icon_psd.gif",
                                txt: "icon_txt.gif",
                                jpg: "icon_jpg.gif",
                                png: "icon_jpg.gif",
                                jpeg: "icon_jpg.gif",
                                gif: "icon_jpg.gif",
                                ico: "icon_jpg.gif",
                                bmp: "icon_jpg.gif"
                            }, f = k + (g[f] ? g[f] : g.txt), g = e.title || e.url.substr(e.url.lastIndexOf("/") + 1), l += '<p style="line-height: 16px;"><img style="vertical-align: middle; margin-right: 2px;" src="' +
                                f + '" _src="' + f + '" /><a style="font-size:12px; color:#0066cc;" href="' + e.url + '" title="' + g + '">' + g + "</a></p>";
                            d.execCommand("insertHtml", l)
                        }
                    }
                }
            }
        });
    t = t || {};
    t.editor = t.editor || {};
    UE.ui = t.editor.ui = {};
    (function () {
        function d() {
            var a = document.getElementById("edui_fixedlayer");
            f.setViewportOffset(a, {left: 0, top: 0})
        }

        var b = t.editor.browser, c = t.editor.dom.domUtils, a = window.$EDITORUI = {}, e = 0, f = t.editor.ui.uiUtils = {
            uid: function (a) {
                return a ? a.ID$EDITORUI || (a.ID$EDITORUI = ++e) : ++e
            }, hook: function (a, b) {
                var c;
                a && a._callbacks ?
                    c = a : (c = function () {
                    var b;
                    a && (b = a.apply(this, arguments));
                    for (var d = c._callbacks, e = d.length; e--;) {
                        var f = d[e].apply(this, arguments);
                        void 0 === b && (b = f)
                    }
                    return b
                }, c._callbacks = []);
                c._callbacks.push(b);
                return c
            }, createElementByHtml: function (a) {
                var b = document.createElement("div");
                b.innerHTML = a;
                b = b.firstChild;
                b.parentNode.removeChild(b);
                return b
            }, getViewportElement: function () {
                return b.ie && b.quirks ? document.body : document.documentElement
            }, getClientRect: function (a) {
                var b;
                try {
                    b = a.getBoundingClientRect()
                } catch (d) {
                    b =
                    {left: 0, top: 0, height: 0, width: 0}
                }
                for (var e = {
                    left: Math.round(b.left),
                    top: Math.round(b.top),
                    height: Math.round(b.bottom - b.top),
                    width: Math.round(b.right - b.left)
                }, f; (f = a.ownerDocument) !== document && (a = c.getWindow(f).frameElement);)b = a.getBoundingClientRect(), e.left += b.left, e.top += b.top;
                e.bottom = e.top + e.height;
                e.right = e.left + e.width;
                return e
            }, getViewportRect: function () {
                var a = f.getViewportElement(), b = (window.innerWidth || a.clientWidth) | 0, a = (window.innerHeight || a.clientHeight) | 0;
                return {
                    left: 0, top: 0, height: a,
                    width: b, bottom: a, right: b
                }
            }, setViewportOffset: function (a, b) {
                var d = f.getFixedLayer();
                a.parentNode === d ? (a.style.left = b.left + "px", a.style.top = b.top + "px") : c.setViewportOffset(a, b)
            }, getEventOffset: function (a) {
                var b = f.getClientRect(a.target || a.srcElement);
                a = f.getViewportOffsetByEvent(a);
                return {left: a.left - b.left, top: a.top - b.top}
            }, getViewportOffsetByEvent: function (a) {
                var b = a.target || a.srcElement, d = c.getWindow(b).frameElement;
                a = {left: a.clientX, top: a.clientY};
                d && b.ownerDocument !== document && (b = f.getClientRect(d),
                    a.left += b.left, a.top += b.top);
                return a
            }, setGlobal: function (b, c) {
                a[b] = c;
                return '$EDITORUI["' + b + '"]'
            }, unsetGlobal: function (b) {
                delete a[b]
            }, copyAttributes: function (a, d) {
                for (var e = d.attributes, f = e.length; f--;) {
                    var h = e[f];
                    "style" == h.nodeName || "class" == h.nodeName || b.ie && !h.specified || a.setAttribute(h.nodeName, h.nodeValue)
                }
                d.className && c.addClass(a, d.className);
                d.style.cssText && (a.style.cssText += ";" + d.style.cssText)
            }, removeStyle: function (a, b) {
                if (a.style.removeProperty)a.style.removeProperty(b); else if (a.style.removeAttribute)a.style.removeAttribute(b);
                else throw"";
            }, contains: function (a, b) {
                return a && b && (a === b ? !1 : a.contains ? a.contains(b) : a.compareDocumentPosition(b) & 16)
            }, startDrag: function (a, b, c) {
                function d(a) {
                    b.ondragmove(a.clientX - e, a.clientY - f, a);
                    a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0
                }

                c = c || document;
                var e = a.clientX, f = a.clientY;
                if (c.addEventListener) {
                    var h = function (a) {
                        c.removeEventListener("mousemove", d, !0);
                        c.removeEventListener("mouseup", h, !0);
                        window.removeEventListener("mouseup", h, !0);
                        b.ondragstop()
                    };
                    c.addEventListener("mousemove",
                        d, !0);
                    c.addEventListener("mouseup", h, !0);
                    window.addEventListener("mouseup", h, !0);
                    a.preventDefault()
                } else {
                    var p = function () {
                        r.releaseCapture();
                        r.detachEvent("onmousemove", d);
                        r.detachEvent("onmouseup", p);
                        r.detachEvent("onlosecaptrue", p);
                        b.ondragstop()
                    }, r = a.srcElement;
                    r.setCapture();
                    r.attachEvent("onmousemove", d);
                    r.attachEvent("onmouseup", p);
                    r.attachEvent("onlosecaptrue", p);
                    a.returnValue = !1
                }
                b.ondragstart()
            }, getFixedLayer: function () {
                var a = document.getElementById("edui_fixedlayer");
                null == a && (a = document.createElement("div"),
                    a.id = "edui_fixedlayer", document.body.appendChild(a), b.ie && 8 >= b.version ? (a.style.position = "absolute", c.on(window, "scroll", d), c.on(window, "resize", t.editor.utils.defer(d, 0, !0)), setTimeout(d)) : a.style.position = "fixed", a.style.left = "0", a.style.top = "0", a.style.width = "0", a.style.height = "0");
                return a
            }, makeUnselectable: function (a) {
                if (b.opera || b.ie && 9 > b.version) {
                    if (a.unselectable = "on", a.hasChildNodes())for (var c = 0; c < a.childNodes.length; c++)1 == a.childNodes[c].nodeType && f.makeUnselectable(a.childNodes[c])
                } else void 0 !==
                a.style.MozUserSelect ? a.style.MozUserSelect = "none" : void 0 !== a.style.WebkitUserSelect ? a.style.WebkitUserSelect = "none" : void 0 !== a.style.KhtmlUserSelect && (a.style.KhtmlUserSelect = "none")
            }
        }
    })();
    (function () {
        var d = t.editor.utils, b = t.editor.ui.uiUtils, c = t.editor.EventBase, a = t.editor.ui.UIBase = function () {
        };
        a.prototype = {
            className: "", uiName: "", initOptions: function (a) {
                for (var c in a)this[c] = a[c];
                this.id = this.id || "edui" + b.uid()
            }, initUIBase: function () {
                this._globalKey = d.unhtml(b.setGlobal(this.id, this))
            }, render: function (a) {
                for (var c =
                    this.renderHtml(), c = b.createElementByHtml(c), d = f.getElementsByTagName(c, "*"), l = "edui-" + (this.theme || this.editor.options.theme), k = document.getElementById("edui_fixedlayer"), m = 0, n; n = d[m++];)f.addClass(n, l);
                f.addClass(c, l);
                k && (k.className = "", f.addClass(k, l));
                d = this.getDom();
                null != d ? (d.parentNode.replaceChild(c, d), b.copyAttributes(c, d)) : ("string" == typeof a && (a = document.getElementById(a)), a = a || b.getFixedLayer(), f.addClass(a, l), a.appendChild(c));
                this.postRender()
            }, getDom: function (a) {
                return a ? document.getElementById(this.id +
                    "_" + a) : document.getElementById(this.id)
            }, postRender: function () {
                this.fireEvent("postrender")
            }, getHtmlTpl: function () {
                return ""
            }, formatHtml: function (a) {
                var b = "edui-" + this.uiName;
                return a.replace(/##/g, this.id).replace(/%%-/g, this.uiName ? b + "-" : "").replace(/%%/g, (this.uiName ? b : "") + " " + this.className).replace(/\$\$/g, this._globalKey)
            }, renderHtml: function () {
                return this.formatHtml(this.getHtmlTpl())
            }, dispose: function () {
                var a = this.getDom();
                a && t.editor.dom.domUtils.remove(a);
                b.unsetGlobal(this.id)
            }
        };
        d.inherits(a,
            c)
    })();
    (function () {
        var d = t.editor.utils, b = t.editor.ui.UIBase, c = t.editor.ui.Separator = function (a) {
            this.initOptions(a);
            this.initSeparator()
        };
        c.prototype = {
            uiName: "separator", initSeparator: function () {
                this.initUIBase()
            }, getHtmlTpl: function () {
                return '<div id="##" class="edui-box %%"></div>'
            }
        };
        d.inherits(c, b)
    })();
    (function () {
        var d = t.editor.utils, b = t.editor.dom.domUtils, c = t.editor.ui.UIBase, a = t.editor.ui.uiUtils, e = t.editor.ui.Mask = function (a) {
            this.initOptions(a);
            this.initUIBase()
        };
        e.prototype = {
            getHtmlTpl: function () {
                return '<div id="##" class="edui-mask %%" onclick="return $$._onClick(event, this);" onmousedown="return $$._onMouseDown(event, this);"></div>'
            },
            postRender: function () {
                var a = this;
                b.on(window, "resize", function () {
                    setTimeout(function () {
                        a.isHidden() || a._fill()
                    })
                })
            }, show: function (a) {
                this._fill();
                this.getDom().style.display = "";
                this.getDom().style.zIndex = a
            }, hide: function () {
                this.getDom().style.display = "none";
                this.getDom().style.zIndex = ""
            }, isHidden: function () {
                return "none" == this.getDom().style.display
            }, _onMouseDown: function () {
                return !1
            }, _onClick: function (a, b) {
                this.fireEvent("click", a, b)
            }, _fill: function () {
                var b = this.getDom(), c = a.getViewportRect();
                b.style.width =
                    c.width + "px";
                b.style.height = c.height + "px"
            }
        };
        d.inherits(e, c)
    })();
    (function () {
        function d(a, b) {
            for (var c = 0; c < g.length; c++) {
                var d = g[c];
                if (!d.isHidden() && !1 !== d.queryAutoHide(b)) {
                    if (a && /scroll/ig.test(a.type) && "edui-wordpastepop" == d.className)return;
                    d.hide()
                }
            }
            g.length && d.editor.fireEvent("afterhidepop")
        }

        var b = t.editor.utils, c = t.editor.ui.uiUtils, a = t.editor.dom.domUtils, e = t.editor.ui.UIBase, f = t.editor.ui.Popup = function (a) {
            this.initOptions(a);
            this.initPopup()
        }, g = [];
        f.postHide = d;
        var l = ["edui-anchor-topleft",
            "edui-anchor-topright", "edui-anchor-bottomleft", "edui-anchor-bottomright"];
        f.prototype = {
            SHADOW_RADIUS: 5,
            content: null,
            _hidden: !1,
            autoRender: !0,
            canSideLeft: !0,
            canSideUp: !0,
            initPopup: function () {
                this.initUIBase();
                g.push(this)
            },
            getHtmlTpl: function () {
                return '<div id="##" class="edui-popup %%" onmousedown="return false;"> <div id="##_body" class="edui-popup-body"> <iframe style="position:absolute;z-index:-1;left:0;top:0;background-color: transparent;" frameborder="0" width="100%" height="100%" src="about:blank"></iframe> <div class="edui-shadow"></div> <div id="##_content" class="edui-popup-content">' +
                    this.getContentHtmlTpl() + "  </div> </div></div>"
            },
            getContentHtmlTpl: function () {
                return this.content ? "string" == typeof this.content ? this.content : this.content.renderHtml() : ""
            },
            _UIBase_postRender: e.prototype.postRender,
            postRender: function () {
                this.content instanceof e && this.content.postRender();
                if (this.captureWheel && !this.captured) {
                    this.captured = !0;
                    var b = (document.documentElement.clientHeight || document.body.clientHeight) - 80, d = this.getDom().offsetHeight, f = c.getClientRect(this.combox.getDom()).top, g = this.getDom("content"),
                        h = this.getDom("body").getElementsByTagName("iframe"), l = this;
                    for (h.length && (h = h[0]); f + d > b;)d -= 30;
                    g.style.height = d + "px";
                    h && (h.style.height = d + "px");
                    if (window.XMLHttpRequest)a.on(g, "onmousewheel"in document.body ? "mousewheel" : "DOMMouseScroll", function (a) {
                        a.preventDefault ? a.preventDefault() : a.returnValue = !1;
                        g.scrollTop = a.wheelDelta ? g.scrollTop - a.wheelDelta / 120 * 60 : g.scrollTop - a.detail / -3 * 60
                    }); else a.on(this.getDom(), "mousewheel", function (a) {
                        a.returnValue = !1;
                        l.getDom("content").scrollTop -= a.wheelDelta / 120 *
                            60
                    })
                }
                this.fireEvent("postRenderAfter");
                this.hide(!0);
                this._UIBase_postRender()
            },
            _doAutoRender: function () {
                !this.getDom() && this.autoRender && this.render()
            },
            mesureSize: function () {
                var a = this.getDom("content");
                return c.getClientRect(a)
            },
            fitSize: function () {
                if (this.captureWheel && this.sized)return this.__size;
                this.sized = !0;
                var a = this.getDom("body");
                a.style.width = "";
                a.style.height = "";
                var b = this.mesureSize();
                if (this.captureWheel) {
                    a.style.width = -(-20 - b.width) + "px";
                    var c = parseInt(this.getDom("content").style.height,
                        10);
                    !window.isNaN(c) && (b.height = c)
                } else a.style.width = b.width + "px";
                a.style.height = b.height + "px";
                this.__size = b;
                this.captureWheel && (this.getDom("content").style.overflow = "auto");
                return b
            },
            showAnchor: function (a, b) {
                this.showAnchorRect(c.getClientRect(a), b)
            },
            showAnchorRect: function (b, d, e) {
                this._doAutoRender();
                var f = c.getViewportRect();
                this.getDom().style.visibility = "hidden";
                this._show();
                e = this.fitSize();
                var g;
                d ? (d = this.canSideLeft && b.right + e.width > f.right && b.left > e.width, f = this.canSideUp && b.top + e.height >
                    f.bottom && b.bottom > e.height, g = d ? b.left - e.width : b.right, b = f ? b.bottom - e.height : b.top) : (d = this.canSideLeft && b.right + e.width > f.right && b.left > e.width, f = this.canSideUp && b.top + e.height > f.bottom && b.bottom > e.height, g = d ? b.right - e.width : b.left, b = f ? b.top - e.height : b.bottom);
                e = this.getDom();
                c.setViewportOffset(e, {left: g, top: b});
                a.removeClasses(e, l);
                e.className += " " + l[2 * (f ? 1 : 0) + (d ? 1 : 0)];
                this.editor && (e.style.zIndex = 1 * this.editor.container.style.zIndex + 10, t.editor.ui.uiUtils.getFixedLayer().style.zIndex = e.style.zIndex -
                    1);
                this.getDom().style.visibility = "visible"
            },
            showAt: function (a) {
                var b = a.left;
                a = a.top;
                this.showAnchorRect({left: b, top: a, right: b, bottom: a, height: 0, width: 0}, !1, !0)
            },
            _show: function () {
                this._hidden && (this.getDom().style.display = "", this._hidden = !1, this.fireEvent("show"))
            },
            isHidden: function () {
                return this._hidden
            },
            show: function () {
                this._doAutoRender();
                this._show()
            },
            hide: function (a) {
                !this._hidden && this.getDom() && (this.getDom().style.display = "none", this._hidden = !0, a || this.fireEvent("hide"))
            },
            queryAutoHide: function (a) {
                return !a || !c.contains(this.getDom(), a)
            }
        };
        b.inherits(f, e);
        a.on(document, "mousedown", function (a) {
            d(a, a.target || a.srcElement)
        });
        a.on(window, "scroll", function (a, b) {
            d(a, b)
        })
    })();
    (function () {
        var d = t.editor.utils, b = t.editor.ui.UIBase, c = t.editor.ui.ColorPicker = function (a) {
            this.initOptions(a);
            this.noColorText = this.noColorText || this.editor.getLang("clearColor");
            this.initUIBase()
        };
        c.prototype = {
            getHtmlTpl: function () {
                for (var b = this.editor, c = '<div id="##" class="edui-colorpicker %%"><div class="edui-colorpicker-topbar edui-clearfix"><div unselectable="on" id="##_preview" class="edui-colorpicker-preview"></div><div unselectable="on" class="edui-colorpicker-nocolor" onclick="$$._onPickNoColor(event, this);">' +
                    this.noColorText + '</div></div><table  class="edui-box" style="border-collapse: collapse;" onmouseover="$$._onTableOver(event, this);" onmouseout="$$._onTableOut(event, this);" onclick="return $$._onTableClick(event, this);" cellspacing="0" cellpadding="0"><tr style="border-bottom: 1px solid #ddd;font-size: 13px;line-height: 25px;color:#39C;padding-top: 2px"><td colspan="10">' + b.getLang("themeColor") + '</td> </tr><tr class="edui-colorpicker-tablefirstrow" >', d = 0; d < a.length; d++)d && 0 === d % 10 && (c += "</tr>" +
                    (60 == d ? '<tr style="border-bottom: 1px solid #ddd;font-size: 13px;line-height: 25px;color:#39C;"><td colspan="10">' + b.getLang("standardColor") + "</td></tr>" : "") + "<tr" + (60 == d ? ' class="edui-colorpicker-tablefirstrow"' : "") + ">"), c += 70 > d ? '<td style="padding: 0 2px;"><a hidefocus title="' + a[d] + '" onclick="return false;" href="javascript:" unselectable="on" class="edui-box edui-colorpicker-colorcell" data-color="#' + a[d] + '" style="background-color:#' + a[d] + ";border:solid #ccc;" + (10 > d || 60 <= d ? "border-width:1px;" :
                    10 <= d && 20 > d ? "border-width:1px 1px 0 1px;" : "border-width:0 1px 0 1px;") + '"></a></td>' : "";
                return c + "</tr></table></div>"
            }, _onTableClick: function (a) {
                (a = (a.target || a.srcElement).getAttribute("data-color")) && this.fireEvent("pickcolor", a)
            }, _onTableOver: function (a) {
                if (a = (a.target || a.srcElement).getAttribute("data-color"))this.getDom("preview").style.backgroundColor = a
            }, _onTableOut: function () {
                this.getDom("preview").style.backgroundColor = ""
            }, _onPickNoColor: function () {
                this.fireEvent("picknocolor")
            }
        };
        d.inherits(c,
            b);
        var a = "ffffff 000000 eeece1 1f497d 4f81bd c0504d 9bbb59 8064a2 4bacc6 f79646 f2f2f2 7f7f7f ddd9c3 c6d9f0 dbe5f1 f2dcdb ebf1dd e5e0ec dbeef3 fdeada d8d8d8 595959 c4bd97 8db3e2 b8cce4 e5b9b7 d7e3bc ccc1d9 b7dde8 fbd5b5 bfbfbf 3f3f3f 938953 548dd4 95b3d7 d99694 c3d69b b2a2c7 92cddc fac08f a5a5a5 262626 494429 17365d 366092 953734 76923c 5f497a 31859b e36c09 7f7f7f 0c0c0c 1d1b10 0f243e 244061 632423 4f6128 3f3151 205867 974806 c00000 ff0000 ffc000 ffff00 92d050 00b050 00b0f0 0070c0 002060 7030a0 ".split(" ")
    })();
    (function () {
        var d = t.editor.utils, b = t.editor.ui.uiUtils, c = t.editor.ui.UIBase, a = t.editor.ui.TablePicker = function (a) {
            this.initOptions(a);
            this.initTablePicker()
        };
        a.prototype = {
            defaultNumRows: 10,
            defaultNumCols: 10,
            maxNumRows: 20,
            maxNumCols: 20,
            numRows: 10,
            numCols: 10,
            lengthOfCellSide: 22,
            initTablePicker: function () {
                this.initUIBase()
            },
            getHtmlTpl: function () {
                return '<div id="##" class="edui-tablepicker %%"><div class="edui-tablepicker-body"><div class="edui-infoarea"><span id="##_label" class="edui-label"></span></div><div class="edui-pickarea" onmousemove="$$._onMouseMove(event, this);" onmouseover="$$._onMouseOver(event, this);" onmouseout="$$._onMouseOut(event, this);" onclick="$$._onClick(event, this);"><div id="##_overlay" class="edui-overlay"></div></div></div></div>'
            },
            _UIBase_render: c.prototype.render,
            render: function (a) {
                this._UIBase_render(a);
                this.getDom("label").innerHTML = "0" + this.editor.getLang("t_row") + " x 0" + this.editor.getLang("t_col")
            },
            _track: function (a, b) {
                var c = this.getDom("overlay").style, d = this.lengthOfCellSide;
                c.width = a * d + "px";
                c.height = b * d + "px";
                this.getDom("label").innerHTML = a + this.editor.getLang("t_col") + " x " + b + this.editor.getLang("t_row");
                this.numCols = a;
                this.numRows = b
            },
            _onMouseOver: function (a, c) {
                var d = a.relatedTarget || a.fromElement;
                b.contains(c, d) ||
                c === d || (this.getDom("label").innerHTML = "0" + this.editor.getLang("t_col") + " x 0" + this.editor.getLang("t_row"), this.getDom("overlay").style.visibility = "")
            },
            _onMouseOut: function (a, c) {
                var d = a.relatedTarget || a.toElement;
                b.contains(c, d) || c === d || (this.getDom("label").innerHTML = "0" + this.editor.getLang("t_col") + " x 0" + this.editor.getLang("t_row"), this.getDom("overlay").style.visibility = "hidden")
            },
            _onMouseMove: function (a, c) {
                this.getDom("overlay");
                var d = b.getEventOffset(a), f = this.lengthOfCellSide, k = Math.ceil(d.left /
                    f), d = Math.ceil(d.top / f);
                this._track(k, d)
            },
            _onClick: function () {
                this.fireEvent("picktable", this.numCols, this.numRows)
            }
        };
        d.inherits(a, c)
    })();
    (function () {
        var d = t.editor.dom.domUtils, b = t.editor.ui.uiUtils, c = 'onmousedown="$$.Stateful_onMouseDown(event, this);" onmouseup="$$.Stateful_onMouseUp(event, this);"' + (t.editor.browser.ie ? ' onmouseenter="$$.Stateful_onMouseEnter(event, this);" onmouseleave="$$.Stateful_onMouseLeave(event, this);"' : ' onmouseover="$$.Stateful_onMouseOver(event, this);" onmouseout="$$.Stateful_onMouseOut(event, this);"');
        t.editor.ui.Stateful = {
            alwalysHoverable: !1, target: null, Stateful_init: function () {
                this._Stateful_dGetHtmlTpl = this.getHtmlTpl;
                this.getHtmlTpl = this.Stateful_getHtmlTpl
            }, Stateful_getHtmlTpl: function () {
                return this._Stateful_dGetHtmlTpl().replace(/stateful/g, function () {
                    return c
                })
            }, Stateful_onMouseEnter: function (a, b) {
                this.target = b;
                if (!this.isDisabled() || this.alwalysHoverable)this.addState("hover"), this.fireEvent("over")
            }, Stateful_onMouseLeave: function (a, b) {
                if (!this.isDisabled() || this.alwalysHoverable)this.removeState("hover"),
                    this.removeState("active"), this.fireEvent("out")
            }, Stateful_onMouseOver: function (a, c) {
                var d = a.relatedTarget;
                b.contains(c, d) || c === d || this.Stateful_onMouseEnter(a, c)
            }, Stateful_onMouseOut: function (a, c) {
                var d = a.relatedTarget;
                b.contains(c, d) || c === d || this.Stateful_onMouseLeave(a, c)
            }, Stateful_onMouseDown: function (a, b) {
                this.isDisabled() || this.addState("active")
            }, Stateful_onMouseUp: function (a, b) {
                this.isDisabled() || this.removeState("active")
            }, Stateful_postRender: function () {
                this.disabled && !this.hasState("disabled") &&
                this.addState("disabled")
            }, hasState: function (a) {
                return d.hasClass(this.getStateDom(), "edui-state-" + a)
            }, addState: function (a) {
                this.hasState(a) || (this.getStateDom().className += " edui-state-" + a)
            }, removeState: function (a) {
                this.hasState(a) && d.removeClasses(this.getStateDom(), ["edui-state-" + a])
            }, getStateDom: function () {
                return this.getDom("state")
            }, isChecked: function () {
                return this.hasState("checked")
            }, setChecked: function (a) {
                !this.isDisabled() && a ? this.addState("checked") : this.removeState("checked")
            }, isDisabled: function () {
                return this.hasState("disabled")
            },
            setDisabled: function (a) {
                a ? (this.removeState("hover"), this.removeState("checked"), this.removeState("active"), this.addState("disabled")) : this.removeState("disabled")
            }
        }
    })();
    (function () {
        var d = t.editor.utils, b = t.editor.ui.UIBase, c = t.editor.ui.Stateful, a = t.editor.ui.Button = function (a) {
            if (a.name) {
                var b = a.name, c = a.cssRules;
                a.className || (a.className = "edui-for-" + b);
                a.cssRules = ".edui-default  .edui-for-" + b + " .edui-icon {" + c + "}"
            }
            this.initOptions(a);
            this.initButton()
        };
        a.prototype = {
            uiName: "button", label: "", title: "",
            showIcon: !0, showText: !0, cssRules: "", initButton: function () {
                this.initUIBase();
                this.Stateful_init();
                this.cssRules && d.cssRule("edui-customize-" + this.name + "-style", this.cssRules)
            }, getHtmlTpl: function () {
                return '<div id="##" class="edui-box %%"><div id="##_state" stateful><div class="%%-wrap"><div id="##_body" unselectable="on" ' + (this.title ? 'title="' + this.title + '"' : "") + ' class="%%-body" onmousedown="return $$._onMouseDown(event, this);" onclick="return $$._onClick(event, this);">' + (this.showIcon ? '<div class="edui-box edui-icon"></div>' :
                        "") + (this.showText ? '<div class="edui-box edui-label">' + this.label + "</div>" : "") + "</div></div></div></div>"
            }, postRender: function () {
                this.Stateful_postRender();
                this.setDisabled(this.disabled)
            }, _onMouseDown: function (a) {
                a = (a = a.target || a.srcElement) && a.tagName && a.tagName.toLowerCase();
                if ("input" == a || "object" == a || "object" == a)return !1
            }, _onClick: function () {
                this.isDisabled() || this.fireEvent("click")
            }, setTitle: function (a) {
                this.getDom("label").innerHTML = a
            }
        };
        d.inherits(a, b);
        d.extend(a.prototype, c)
    })();
    (function () {
        var d =
            t.editor.utils, b = t.editor.ui.uiUtils, c = t.editor.ui.UIBase, a = t.editor.ui.Stateful, e = t.editor.ui.SplitButton = function (a) {
            this.initOptions(a);
            this.initSplitButton()
        };
        e.prototype = {
            popup: null, uiName: "splitbutton", title: "", initSplitButton: function () {
                this.initUIBase();
                this.Stateful_init();
                if (null != this.popup) {
                    var a = this.popup;
                    this.popup = null;
                    this.setPopup(a)
                }
            }, _UIBase_postRender: c.prototype.postRender, postRender: function () {
                this.Stateful_postRender();
                this._UIBase_postRender()
            }, setPopup: function (a) {
                this.popup !==
                a && (null != this.popup && this.popup.dispose(), a.addListener("show", d.bind(this._onPopupShow, this)), a.addListener("hide", d.bind(this._onPopupHide, this)), a.addListener("postrender", d.bind(function () {
                    a.getDom("body").appendChild(b.createElementByHtml('<div id="' + this.popup.id + '_bordereraser" class="edui-bordereraser edui-background" style="width:' + (b.getClientRect(this.getDom()).width + 20) + 'px"></div>'));
                    a.getDom().className += " " + this.className
                }, this)), this.popup = a)
            }, _onPopupShow: function () {
                this.addState("opened")
            },
            _onPopupHide: function () {
                this.removeState("opened")
            }, getHtmlTpl: function () {
                return '<div id="##" class="edui-box %%"><div ' + (this.title ? 'title="' + this.title + '"' : "") + ' id="##_state" stateful><div class="%%-body"><div id="##_button_body" class="edui-box edui-button-body" onclick="$$._onButtonClick(event, this);"><div class="edui-box edui-icon"></div></div><div class="edui-box edui-splitborder"></div><div class="edui-box edui-arrow" onclick="$$._onArrowClick();"></div></div></div></div>'
            }, showPopup: function () {
                var a =
                    b.getClientRect(this.getDom());
                a.top -= this.popup.SHADOW_RADIUS;
                a.height += this.popup.SHADOW_RADIUS;
                this.popup.showAnchorRect(a)
            }, _onArrowClick: function (a, b) {
                this.isDisabled() || this.showPopup()
            }, _onButtonClick: function () {
                this.isDisabled() || this.fireEvent("buttonclick")
            }
        };
        d.inherits(e, c);
        d.extend(e.prototype, a, !0)
    })();
    (function () {
        var d = t.editor.utils, b = t.editor.ui.uiUtils, c = t.editor.ui.ColorPicker, a = t.editor.ui.Popup, e = t.editor.ui.SplitButton, f = t.editor.ui.ColorButton = function (a) {
            this.initOptions(a);
            this.initColorButton()
        };
        f.prototype = {
            initColorButton: function () {
                var b = this;
                this.popup = new a({
                    content: new c({
                        noColorText: b.editor.getLang("clearColor"),
                        editor: b.editor,
                        onpickcolor: function (a, c) {
                            b._onPickColor(c)
                        },
                        onpicknocolor: function (a, c) {
                            b._onPickNoColor(c)
                        }
                    }), editor: b.editor
                });
                this.initSplitButton()
            }, _SplitButton_postRender: e.prototype.postRender, postRender: function () {
                this._SplitButton_postRender();
                this.getDom("button_body").appendChild(b.createElementByHtml('<div id="' + this.id + '_colorlump" class="edui-colorlump"></div>'));
                this.getDom().className += " edui-colorbutton"
            }, setColor: function (a) {
                this.color = this.getDom("colorlump").style.backgroundColor = a
            }, _onPickColor: function (a) {
                !1 !== this.fireEvent("pickcolor", a) && (this.setColor(a), this.popup.hide())
            }, _onPickNoColor: function (a) {
                !1 !== this.fireEvent("picknocolor") && this.popup.hide()
            }
        };
        d.inherits(f, e)
    })();
    (function () {
        var d = t.editor.utils, b = t.editor.ui.Popup, c = t.editor.ui.TablePicker, a = t.editor.ui.SplitButton, e = t.editor.ui.TableButton = function (a) {
            this.initOptions(a);
            this.initTableButton()
        };
        e.prototype = {
            initTableButton: function () {
                var a = this;
                this.popup = new b({
                    content: new c({
                        editor: a.editor, onpicktable: function (b, c, d) {
                            a._onPickTable(c, d)
                        }
                    }), editor: a.editor
                });
                this.initSplitButton()
            }, _onPickTable: function (a, b) {
                !1 !== this.fireEvent("picktable", a, b) && this.popup.hide()
            }
        };
        d.inherits(e, a)
    })();
    (function () {
        var d = t.editor.utils, b = t.editor.ui.UIBase, c = t.editor.ui.AutoTypeSetPicker = function (a) {
            this.initOptions(a);
            this.initAutoTypeSetPicker()
        };
        c.prototype = {
            initAutoTypeSetPicker: function () {
                this.initUIBase()
            },
            getHtmlTpl: function () {
                var a = this.editor, b = a.options.autotypeset, c = a.getLang("autoTypeSet"), d = "textAlignValue" + a.uid, f = "imageBlockLineValue" + a.uid, k = "symbolConverValue" + a.uid;
                return '<div id="##" class="edui-autotypesetpicker %%"><div class="edui-autotypesetpicker-body"><table ><tr><td nowrap><input type="checkbox" name="mergeEmptyline" ' + (b.mergeEmptyline ? "checked" : "") + ">" + c.mergeLine + '</td><td colspan="2"><input type="checkbox" name="removeEmptyline" ' + (b.removeEmptyline ? "checked" : "") + ">" + c.delLine +
                    '</td></tr><tr><td nowrap><input type="checkbox" name="removeClass" ' + (b.removeClass ? "checked" : "") + ">" + c.removeFormat + '</td><td colspan="2"><input type="checkbox" name="indent" ' + (b.indent ? "checked" : "") + ">" + c.indent + '</td></tr><tr><td nowrap><input type="checkbox" name="textAlign" ' + (b.textAlign ? "checked" : "") + ">" + c.alignment + '</td><td colspan="2" id="' + d + '"><input type="radio" name="' + d + '" value="left" ' + (b.textAlign && "left" == b.textAlign ? "checked" : "") + ">" + a.getLang("justifyleft") + '<input type="radio" name="' +
                    d + '" value="center" ' + (b.textAlign && "center" == b.textAlign ? "checked" : "") + ">" + a.getLang("justifycenter") + '<input type="radio" name="' + d + '" value="right" ' + (b.textAlign && "right" == b.textAlign ? "checked" : "") + ">" + a.getLang("justifyright") + '</td></tr><tr><td nowrap><input type="checkbox" name="imageBlockLine" ' + (b.imageBlockLine ? "checked" : "") + ">" + c.imageFloat + '</td><td nowrap id="' + f + '"><input type="radio" name="' + f + '" value="none" ' + (b.imageBlockLine && "none" == b.imageBlockLine ? "checked" : "") + ">" + a.getLang("default") +
                    '<input type="radio" name="' + f + '" value="left" ' + (b.imageBlockLine && "left" == b.imageBlockLine ? "checked" : "") + ">" + a.getLang("justifyleft") + '<input type="radio" name="' + f + '" value="center" ' + (b.imageBlockLine && "center" == b.imageBlockLine ? "checked" : "") + ">" + a.getLang("justifycenter") + '<input type="radio" name="' + f + '" value="right" ' + (b.imageBlockLine && "right" == b.imageBlockLine ? "checked" : "") + ">" + a.getLang("justifyright") + '</td></tr><tr><td nowrap><input type="checkbox" name="clearFontSize" ' + (b.clearFontSize ?
                        "checked" : "") + ">" + c.removeFontsize + '</td><td colspan="2"><input type="checkbox" name="clearFontFamily" ' + (b.clearFontFamily ? "checked" : "") + ">" + c.removeFontFamily + '</td></tr><tr><td nowrap colspan="3"><input type="checkbox" name="removeEmptyNode" ' + (b.removeEmptyNode ? "checked" : "") + ">" + c.removeHtml + '</td></tr><tr><td nowrap colspan="3"><input type="checkbox" name="pasteFilter" ' + (b.pasteFilter ? "checked" : "") + ">" + c.pasteFilter + '</td></tr><tr><td nowrap><input type="checkbox" name="symbolConver" ' + (b.bdc2sb ||
                    b.tobdc ? "checked" : "") + ">" + c.symbol + '</td><td id="' + k + '"><input type="radio" name="bdc" value="bdc2sb" ' + (b.bdc2sb ? "checked" : "") + ">" + c.bdc2sb + '<input type="radio" name="bdc" value="tobdc" ' + (b.tobdc ? "checked" : "") + ">" + c.tobdc + '</td><td nowrap align="right"><button >' + c.run + "</button></td></tr></table></div></div>"
            }, _UIBase_render: b.prototype.render
        };
        d.inherits(c, b)
    })();
    (function () {
        function d(a) {
            for (var c = {}, d = a.getDom(), e = a.editor.uid, h = null, h = null, q = f.getElementsByTagName(d, "input"), u = q.length - 1, p; p =
                q[u--];)if (h = p.getAttribute("type"), "checkbox" == h)if (h = p.getAttribute("name"), c[h] && delete c[h], p.checked)if (p = document.getElementById(h + "Value" + e))if (/input/ig.test(p.tagName))c[h] = p.value; else {
                p = p.getElementsByTagName("input");
                for (var r = p.length - 1, v; v = p[r--];)if (v.checked) {
                    c[h] = v.value;
                    break
                }
            } else c[h] = !0; else c[h] = !1; else c[p.getAttribute("value")] = p.checked;
            d = f.getElementsByTagName(d, "select");
            for (u = 0; e = d[u++];)q = e.getAttribute("name"), c[q] = c[q] ? e.value : "";
            b.extend(a.editor.options.autotypeset,
                c);
            a.editor.setPreferences("autotypeset", c)
        }

        var b = t.editor.utils, c = t.editor.ui.Popup, a = t.editor.ui.AutoTypeSetPicker, e = t.editor.ui.SplitButton, h = t.editor.ui.AutoTypeSetButton = function (a) {
            this.initOptions(a);
            this.initAutoTypeSetButton()
        };
        h.prototype = {
            initAutoTypeSetButton: function () {
                var b = this;
                this.popup = new c({
                    content: new a({editor: b.editor}), editor: b.editor, hide: function () {
                        !this._hidden && this.getDom() && (d(this), this.getDom().style.display = "none", this._hidden = !0, this.fireEvent("hide"))
                    }
                });
                var e = 0;
                this.popup.addListener("postRenderAfter", function () {
                    var a = this;
                    if (!e) {
                        var c = this.getDom();
                        c.getElementsByTagName("button")[0].onclick = function () {
                            d(a);
                            b.editor.execCommand("autotypeset");
                            a.hide()
                        };
                        f.on(c, "click", function (c) {
                            c = c.target || c.srcElement;
                            var e = b.editor.uid;
                            if (c && "INPUT" == c.tagName) {
                                if ("imageBlockLine" == c.name || "textAlign" == c.name || "symbolConver" == c.name)for (var f = c.checked, h = document.getElementById(c.name + "Value" + e).getElementsByTagName("input"), l = {
                                    imageBlockLine: "none", textAlign: "left",
                                    symbolConver: "tobdc"
                                }, m = 0; m < h.length; m++)f ? h[m].value == l[c.name] && (h[m].checked = "checked") : h[m].checked = !1;
                                (c.name == "imageBlockLineValue" + e || c.name == "textAlignValue" + e || "bdc" == c.name) && (c = c.parentNode.previousSibling.getElementsByTagName("input")) && (c[0].checked = !0);
                                d(a)
                            }
                        });
                        e = 1
                    }
                });
                this.initSplitButton()
            }
        };
        b.inherits(h, e)
    })();
    (function () {
        var d = t.editor.utils, b = t.editor.ui.Popup, c = t.editor.ui.Stateful, a = t.editor.ui.UIBase, e = t.editor.ui.CellAlignPicker = function (a) {
            this.initOptions(a);
            this.initSelected();
            this.initCellAlignPicker()
        };
        e.prototype = {
            initSelected: function () {
                var a = {top: 0, middle: 1, bottom: 2}, b = {left: 0, center: 1, right: 2};
                this.selected && (this.selectedIndex = 3 * a[this.selected.valign] + b[this.selected.align])
            }, initCellAlignPicker: function () {
                this.initUIBase();
                this.Stateful_init()
            }, getHtmlTpl: function () {
                for (var a = ["left", "center", "right"], b = null, c = -1, d = [], e = 0; 9 > e; e++)b = this.selectedIndex === e ? ' class="edui-cellalign-selected" ' : "", c = e % 3, 0 === c && d.push("<tr>"), d.push('<td index="' + e + '" ' + b + ' stateful><div class="edui-icon edui-' +
                    a[c] + '"></div></td>'), 2 === c && d.push("</tr>");
                return '<div id="##" class="edui-cellalignpicker %%"><div class="edui-cellalignpicker-body"><table onclick="$$._onClick(event);">' + d.join("") + "</table></div></div>"
            }, getStateDom: function () {
                return this.target
            }, _onClick: function (a) {
                var c = a.target || a.srcElement;
                /icon/.test(c.className) && (this.items[c.parentNode.getAttribute("index")].onclick(), b.postHide(a))
            }, _UIBase_render: a.prototype.render
        };
        d.inherits(e, a);
        d.extend(e.prototype, c, !0)
    })();
    (function () {
        var d =
            t.editor.utils, b = t.editor.ui.Stateful, c = t.editor.ui.uiUtils, a = t.editor.ui.UIBase, e = t.editor.ui.PastePicker = function (a) {
            this.initOptions(a);
            this.initPastePicker()
        };
        e.prototype = {
            initPastePicker: function () {
                this.initUIBase();
                this.Stateful_init()
            }, getHtmlTpl: function () {
                return '<div class="edui-pasteicon" onclick="$$._onClick(this)"></div><div class="edui-pastecontainer"><div class="edui-title">' + this.editor.getLang("pasteOpt") + '</div><div class="edui-button"><div title="' + this.editor.getLang("pasteSourceFormat") +
                    '" onclick="$$.format(false)" stateful><div class="edui-richtxticon"></div></div><div title="' + this.editor.getLang("tagFormat") + '" onclick="$$.format(2)" stateful><div class="edui-tagicon"></div></div><div title="' + this.editor.getLang("pasteTextFormat") + '" onclick="$$.format(true)" stateful><div class="edui-plaintxticon"></div></div></div></div></div>'
            }, getStateDom: function () {
                return this.target
            }, format: function (a) {
                this.editor.ui._isTransfer = !0;
                this.editor.fireEvent("pasteTransfer", a)
            }, _onClick: function (a) {
                var b =
                    f.getNextDomNode(a), d = c.getViewportRect().height, e = c.getClientRect(b);
                b.style.top = e.top + e.height > d ? -e.height - a.offsetHeight + "px" : "";
                /hidden/ig.test(f.getComputedStyle(b, "visibility")) ? (b.style.visibility = "visible", f.addClass(a, "edui-state-opened")) : (b.style.visibility = "hidden", f.removeClasses(a, "edui-state-opened"))
            }, _UIBase_render: a.prototype.render
        };
        d.inherits(e, a);
        d.extend(e.prototype, b, !0)
    })();
    (function () {
        var d = t.editor.utils, b = t.editor.ui.uiUtils, c = t.editor.ui.UIBase, a = t.editor.ui.Toolbar = function (a) {
            this.initOptions(a);
            this.initToolbar()
        };
        a.prototype = {
            items: null, initToolbar: function () {
                this.items = this.items || [];
                this.initUIBase()
            }, add: function (a, b) {
                void 0 === b ? this.items.push(a) : this.items.splice(b, 0, a)
            }, getHtmlTpl: function () {
                for (var a = [], b = 0; b < this.items.length; b++)a[b] = this.items[b].renderHtml();
                return '<div id="##" class="edui-toolbar %%" onselectstart="return false;" onmousedown="return $$._onMouseDown(event, this);">' + a.join("") + "</div>"
            }, postRender: function () {
                for (var a = this.getDom(), c = 0; c < this.items.length; c++)this.items[c].postRender();
                b.makeUnselectable(a)
            }, _onMouseDown: function (a) {
                a = (a = a.target || a.srcElement) && a.tagName && a.tagName.toLowerCase();
                if ("input" == a || "object" == a || "object" == a)return !1
            }
        };
        d.inherits(a, c)
    })();
    (function () {
        var d = t.editor.utils, b = t.editor.dom.domUtils, c = t.editor.ui.uiUtils, a = t.editor.ui.UIBase, e = t.editor.ui.Popup, f = t.editor.ui.Stateful, g = t.editor.ui.CellAlignPicker, l = t.editor.ui.Menu = function (a) {
            this.initOptions(a);
            this.initMenu()
        }, k = {
            renderHtml: function () {
                return '<div class="edui-menuitem edui-menuseparator"><div class="edui-menuseparator-inner"></div></div>'
            },
            postRender: function () {
            }, queryAutoHide: function () {
                return !0
            }
        };
        l.prototype = {
            items: null, uiName: "menu", initMenu: function () {
                this.items = this.items || [];
                this.initPopup();
                this.initItems()
            }, initItems: function () {
                for (var a = 0; a < this.items.length; a++) {
                    var b = this.items[a];
                    "-" == b ? this.items[a] = this.getSeparator() : b instanceof m || (b.editor = this.editor, b.theme = this.editor.options.theme, this.items[a] = this.createItem(b))
                }
            }, getSeparator: function () {
                return k
            }, createItem: function (a) {
                a.menu = this;
                return new m(a)
            }, _Popup_getContentHtmlTpl: e.prototype.getContentHtmlTpl,
            getContentHtmlTpl: function () {
                if (0 == this.items.length)return this._Popup_getContentHtmlTpl();
                for (var a = [], b = 0; b < this.items.length; b++)a[b] = this.items[b].renderHtml();
                return '<div class="%%-body">' + a.join("") + "</div>"
            }, _Popup_postRender: e.prototype.postRender, postRender: function () {
                for (var a = this, d = 0; d < this.items.length; d++) {
                    var e = this.items[d];
                    e.ownerMenu = this;
                    e.postRender()
                }
                b.on(this.getDom(), "mouseover", function (b) {
                    b = b || event;
                    b = b.relatedTarget || b.fromElement;
                    var d = a.getDom();
                    c.contains(d, b) || d === b ||
                    a.fireEvent("over")
                });
                this._Popup_postRender()
            }, queryAutoHide: function (a) {
                if (a) {
                    if (c.contains(this.getDom(), a))return !1;
                    for (var b = 0; b < this.items.length; b++)if (!1 === this.items[b].queryAutoHide(a))return !1
                }
            }, clearItems: function () {
                for (var a = 0; a < this.items.length; a++) {
                    var b = this.items[a];
                    clearTimeout(b._showingTimer);
                    clearTimeout(b._closingTimer);
                    b.subMenu && b.subMenu.destroy()
                }
                this.items = []
            }, destroy: function () {
                this.getDom() && b.remove(this.getDom());
                this.clearItems()
            }, dispose: function () {
                this.destroy()
            }
        };
        d.inherits(l, e);
        var m = t.editor.ui.MenuItem = function (a) {
            this.initOptions(a);
            this.initUIBase();
            this.Stateful_init();
            if (this.subMenu && !(this.subMenu instanceof l))if (a.className && -1 != a.className.indexOf("aligntd")) {
                var c = this;
                this.subMenu.selected = this.editor.queryCommandValue("cellalignment");
                this.subMenu = new e({
                    content: new g(this.subMenu),
                    parentMenu: c,
                    editor: c.editor,
                    destroy: function () {
                        this.getDom() && b.remove(this.getDom())
                    }
                });
                this.subMenu.addListener("postRenderAfter", function () {
                    b.on(this.getDom(),
                        "mouseover", function () {
                            c.addState("opened")
                        })
                })
            } else this.subMenu = new l(this.subMenu)
        };
        m.prototype = {
            label: "",
            subMenu: null,
            ownerMenu: null,
            uiName: "menuitem",
            alwalysHoverable: !0,
            getHtmlTpl: function () {
                return '<div id="##" class="%%" stateful onclick="$$._onClick(event, this);"><div class="%%-body">' + this.renderLabelHtml() + "</div></div>"
            },
            postRender: function () {
                var a = this;
                this.addListener("over", function () {
                    a.ownerMenu.fireEvent("submenuover", a);
                    a.subMenu && a.delayShowSubMenu()
                });
                this.subMenu && (this.getDom().className +=
                    " edui-hassubmenu", this.subMenu.render(), this.addListener("out", function () {
                    a.delayHideSubMenu()
                }), this.subMenu.addListener("over", function () {
                    clearTimeout(a._closingTimer);
                    a._closingTimer = null;
                    a.addState("opened")
                }), this.ownerMenu.addListener("hide", function () {
                    a.hideSubMenu()
                }), this.ownerMenu.addListener("submenuover", function (b, c) {
                    c !== a && a.delayHideSubMenu()
                }), this.subMenu._bakQueryAutoHide = this.subMenu.queryAutoHide, this.subMenu.queryAutoHide = function (b) {
                    return b && c.contains(a.getDom(), b) ? !1 : this._bakQueryAutoHide(b)
                });
                this.getDom().style.tabIndex = "-1";
                c.makeUnselectable(this.getDom());
                this.Stateful_postRender()
            },
            delayShowSubMenu: function () {
                var a = this;
                a.isDisabled() || (a.addState("opened"), clearTimeout(a._showingTimer), clearTimeout(a._closingTimer), a._closingTimer = null, a._showingTimer = setTimeout(function () {
                    a.showSubMenu()
                }, 250))
            },
            delayHideSubMenu: function () {
                var a = this;
                a.isDisabled() || (a.removeState("opened"), clearTimeout(a._showingTimer), a._closingTimer || (a._closingTimer = setTimeout(function () {
                    a.hasState("opened") ||
                    a.hideSubMenu();
                    a._closingTimer = null
                }, 400)))
            },
            renderLabelHtml: function () {
                return '<div class="edui-arrow"></div><div class="edui-box edui-icon"></div><div class="edui-box edui-label %%-label">' + (this.label || "") + "</div>"
            },
            getStateDom: function () {
                return this.getDom()
            },
            queryAutoHide: function (a) {
                if (this.subMenu && this.hasState("opened"))return this.subMenu.queryAutoHide(a)
            },
            _onClick: function (a, b) {
                this.hasState("disabled") || !1 !== this.fireEvent("click", a, b) && (this.subMenu ? this.showSubMenu() : e.postHide(a))
            },
            showSubMenu: function () {
                var a = c.getClientRect(this.getDom());
                a.right -= 5;
                a.left += 2;
                a.width -= 7;
                a.top -= 4;
                a.bottom += 4;
                a.height += 8;
                this.subMenu.showAnchorRect(a, !0, !0)
            },
            hideSubMenu: function () {
                this.subMenu.hide()
            }
        };
        d.inherits(m, a);
        d.extend(m.prototype, f, !0)
    })();
    (function () {
        var d = t.editor.utils, b = t.editor.ui.uiUtils, c = t.editor.ui.Menu, a = t.editor.ui.SplitButton, e = t.editor.ui.Combox = function (a) {
            this.initOptions(a);
            this.initCombox()
        };
        e.prototype = {
            uiName: "combox", onbuttonclick: function () {
                this.showPopup()
            }, initCombox: function () {
                var a =
                    this;
                this.items = this.items || [];
                for (var b = 0; b < this.items.length; b++) {
                    var d = this.items[b];
                    d.uiName = "listitem";
                    d.index = b;
                    d.onclick = function () {
                        a.selectByIndex(this.index)
                    }
                }
                this.popup = new c({
                    items: this.items,
                    uiName: "list",
                    editor: this.editor,
                    captureWheel: !0,
                    combox: this
                });
                this.initSplitButton()
            }, _SplitButton_postRender: a.prototype.postRender, postRender: function () {
                this._SplitButton_postRender();
                this.setLabel(this.label || "");
                this.setValue(this.initValue || "")
            }, showPopup: function () {
                var a = b.getClientRect(this.getDom());
                a.top += 1;
                --a.bottom;
                a.height -= 2;
                this.popup.showAnchorRect(a)
            }, getValue: function () {
                return this.value
            }, setValue: function (a) {
                var b = this.indexByValue(a);
                -1 != b ? (this.selectedIndex = b, this.setLabel(this.items[b].label), this.value = this.items[b].value) : (this.selectedIndex = -1, this.setLabel(this.getLabelForUnknowValue(a)), this.value = a)
            }, setLabel: function (a) {
                this.label = this.getDom("button_body").innerHTML = a
            }, getLabelForUnknowValue: function (a) {
                return a
            }, indexByValue: function (a) {
                for (var b = 0; b < this.items.length; b++)if (a ==
                    this.items[b].value)return b;
                return -1
            }, getItem: function (a) {
                return this.items[a]
            }, selectByIndex: function (a) {
                a < this.items.length && !1 !== this.fireEvent("select", a) && (this.selectedIndex = a, this.value = this.items[a].value, this.setLabel(this.items[a].label))
            }
        };
        d.inherits(e, a)
    })();
    (function () {
        var d = t.editor.utils, b = t.editor.dom.domUtils, c = t.editor.ui.uiUtils, a = t.editor.ui.Mask, e = t.editor.ui.UIBase, f = t.editor.ui.Button, g = t.editor.ui.Dialog = function (a) {
            if (a.name) {
                var b = a.name, c = a.cssRules;
                a.className || (a.className =
                    "edui-for-" + b);
                c && (a.cssRules = ".edui-default .edui-for-" + b + " .edui-dialog-content  {" + c + "}")
            }
            this.initOptions(d.extend({
                autoReset: !0, draggable: !0, onok: function () {
                }, oncancel: function () {
                }, onclose: function (a, b) {
                    return b ? this.onok() : this.oncancel()
                }, holdScroll: !1
            }, a));
            this.initDialog()
        }, l, k, m;
        g.prototype = {
            draggable: !1, uiName: "dialog", initDialog: function () {
                var b = this, c = this.editor.options.theme;
                this.cssRules && d.cssRule("edui-customize-" + this.name + "-style", this.cssRules);
                this.initUIBase();
                this.modalMask =
                    l || (l = new a({
                        className: "edui-dialog-modalmask", theme: c, onclick: function () {
                            m && m.close(!1)
                        }
                    }));
                this.dragMask = k || (k = new a({className: "edui-dialog-dragmask", theme: c}));
                this.closeButton = new f({
                    className: "edui-dialog-closebutton",
                    title: b.closeDialog,
                    theme: c,
                    onclick: function () {
                        b.close(!1)
                    }
                });
                this.fullscreen && this.initResizeEvent();
                if (this.buttons)for (c = 0; c < this.buttons.length; c++)this.buttons[c]instanceof f || (this.buttons[c] = new f(d.extend(this.buttons[c], {editor: this.editor}, !0)))
            }, initResizeEvent: function () {
                var a =
                    this;
                b.on(window, "resize", function () {
                    a._hidden || void 0 === a._hidden || (a.__resizeTimer && window.clearTimeout(a.__resizeTimer), a.__resizeTimer = window.setTimeout(function () {
                        a.__resizeTimer = null;
                        var b = a.getDom(), d = a.getDom("content"), e = UE.ui.uiUtils.getClientRect(b), f = UE.ui.uiUtils.getClientRect(d), g = c.getViewportRect();
                        d.style.width = g.width - e.width + f.width + "px";
                        d.style.height = g.height - e.height + f.height + "px";
                        b.style.width = g.width + "px";
                        b.style.height = g.height + "px";
                        a.fireEvent("resize")
                    }, 100))
                })
            }, fitSize: function () {
                var a =
                    this.getDom("body"), b = this.mesureSize();
                a.style.width = b.width + "px";
                a.style.height = b.height + "px";
                return b
            }, safeSetOffset: function (a) {
                var b = this.getDom(), d = c.getViewportRect(), e = c.getClientRect(b), f = a.left;
                f + e.width > d.right && (f = d.right - e.width);
                a = a.top;
                a + e.height > d.bottom && (a = d.bottom - e.height);
                b.style.left = Math.max(f, 0) + "px";
                b.style.top = Math.max(a, 0) + "px"
            }, showAtCenter: function () {
                var a = c.getViewportRect();
                if (this.fullscreen) {
                    var d = this.getDom(), e = this.getDom("content");
                    d.style.display = "block";
                    var f =
                        UE.ui.uiUtils.getClientRect(d), g = UE.ui.uiUtils.getClientRect(e);
                    d.style.left = "-100000px";
                    e.style.width = a.width - f.width + g.width + "px";
                    e.style.height = a.height - f.height + g.height + "px";
                    d.style.width = a.width + "px";
                    d.style.height = a.height + "px";
                    d.style.left = 0;
                    this._originalContext = {
                        html: {
                            overflowX: document.documentElement.style.overflowX,
                            overflowY: document.documentElement.style.overflowY
                        }, body: {overflowX: document.body.style.overflowX, overflowY: document.body.style.overflowY}
                    };
                    document.documentElement.style.overflowX =
                        "hidden";
                    document.documentElement.style.overflowY = "hidden";
                    document.body.style.overflowX = "hidden";
                    document.body.style.overflowY = "hidden"
                } else this.getDom().style.display = "", e = this.fitSize(), f = this.getDom("titlebar").offsetHeight | 0, d = a.width / 2 - e.width / 2, a = a.height / 2 - (e.height - f) / 2 - f, e = this.getDom(), this.safeSetOffset({
                    left: Math.max(d | 0, 0),
                    top: Math.max(a | 0, 0)
                }), b.hasClass(e, "edui-state-centered") || (e.className += " edui-state-centered");
                this._show()
            }, getContentHtml: function () {
                var a = "";
                "string" == typeof this.content ?
                    a = this.content : this.iframeUrl && (a = '<span id="' + this.id + '_contmask" class="dialogcontmask"></span><iframe id="' + this.id + '_iframe" class="%%-iframe" height="100%" width="100%" frameborder="0" src="' + this.iframeUrl + '"></iframe>');
                return a
            }, getHtmlTpl: function () {
                var a = "";
                if (this.buttons) {
                    for (var a = [], b = 0; b < this.buttons.length; b++)a[b] = this.buttons[b].renderHtml();
                    a = '<div class="%%-foot"><div id="##_buttons" class="%%-buttons">' + a.join("") + "</div></div>"
                }
                return '<div id="##" class="%%"><div ' + (this.fullscreen ?
                        'class="%%-wrap edui-dialog-fullscreen-flag"' : 'class="%%"') + '><div id="##_body" class="%%-body"><div class="%%-shadow"></div><div id="##_titlebar" class="%%-titlebar"><div class="%%-draghandle" onmousedown="$$._onTitlebarMouseDown(event, this);"><span class="%%-caption">' + (this.title || "") + "</span></div>" + this.closeButton.renderHtml() + '</div><div id="##_content" class="%%-content">' + (this.autoReset ? "" : this.getContentHtml()) + "</div>" + a + "</div></div></div>"
            }, postRender: function () {
                this.modalMask.getDom() ||
                (this.modalMask.render(), this.modalMask.hide());
                this.dragMask.getDom() || (this.dragMask.render(), this.dragMask.hide());
                var a = this;
                this.addListener("show", function () {
                    a.modalMask.show(this.getDom().style.zIndex - 2)
                });
                this.addListener("hide", function () {
                    a.modalMask.hide()
                });
                if (this.buttons)for (var d = 0; d < this.buttons.length; d++)this.buttons[d].postRender();
                b.on(window, "resize", function () {
                    setTimeout(function () {
                        a.isHidden() || a.safeSetOffset(c.getClientRect(a.getDom()))
                    })
                });
                this._hide()
            }, mesureSize: function () {
                var a =
                    this.getDom("body"), b = c.getClientRect(this.getDom("content")).width;
                a.style.width = b;
                return c.getClientRect(a)
            }, _onTitlebarMouseDown: function (a, d) {
                if (this.draggable) {
                    var e;
                    c.getViewportRect();
                    var f = this;
                    c.startDrag(a, {
                        ondragstart: function () {
                            e = c.getClientRect(f.getDom());
                            f.getDom("contmask").style.visibility = "visible";
                            f.dragMask.show(f.getDom().style.zIndex - 1)
                        }, ondragmove: function (a, b) {
                            f.safeSetOffset({left: e.left + a, top: e.top + b})
                        }, ondragstop: function () {
                            f.getDom("contmask").style.visibility = "hidden";
                            b.removeClasses(f.getDom(), ["edui-state-centered"]);
                            f.dragMask.hide()
                        }
                    })
                }
            }, reset: function () {
                this.getDom("content").innerHTML = this.getContentHtml();
                this.fireEvent("dialogafterreset")
            }, _show: function () {
                this._hidden && (this.getDom().style.display = "", this.editor.container.style.zIndex && (this.getDom().style.zIndex = 1 * this.editor.container.style.zIndex + 10), this._hidden = !1, this.fireEvent("show"), t.editor.ui.uiUtils.getFixedLayer().style.zIndex = this.getDom().style.zIndex - 4)
            }, isHidden: function () {
                return this._hidden
            },
            _hide: function () {
                if (!this._hidden) {
                    var a = this.getDom();
                    a.style.display = "none";
                    a.style.zIndex = "";
                    a.style.width = "";
                    a.style.height = "";
                    this._hidden = !0;
                    this.fireEvent("hide")
                }
            }, open: function () {
                if (this.autoReset)try {
                    this.reset()
                } catch (a) {
                    this.render(), this.open()
                }
                this.showAtCenter();
                if (this.iframeUrl)try {
                    this.getDom("iframe").focus()
                } catch (b) {
                }
                m = this
            }, _onCloseButtonClick: function (a, b) {
                this.close(!1)
            }, close: function (a) {
                if (!1 !== this.fireEvent("close", a)) {
                    this.fullscreen && (document.documentElement.style.overflowX =
                        this._originalContext.html.overflowX, document.documentElement.style.overflowY = this._originalContext.html.overflowY, document.body.style.overflowX = this._originalContext.body.overflowX, document.body.style.overflowY = this._originalContext.body.overflowY, delete this._originalContext);
                    this._hide();
                    a = this.getDom("content");
                    var c = this.getDom("iframe");
                    a && c && ((c = c.contentDocument || c.contentWindow.document) && (c.body.innerHTML = ""), b.remove(a))
                }
            }
        };
        d.inherits(g, e)
    })();
    (function () {
        var d = t.editor.utils, b = t.editor.ui.Menu,
            c = t.editor.ui.SplitButton, a = t.editor.ui.MenuButton = function (a) {
                this.initOptions(a);
                this.initMenuButton()
            };
        a.prototype = {
            initMenuButton: function () {
                var a = this;
                this.uiName = "menubutton";
                this.popup = new b({items: a.items, className: a.className, editor: a.editor});
                this.popup.addListener("show", function () {
                    for (var b = 0; b < this.items.length; b++)this.items[b].removeState("checked"), this.items[b].value == a._value && (this.items[b].addState("checked"), this.value = a._value)
                });
                this.initSplitButton()
            }, setValue: function (a) {
                this._value =
                    a
            }
        };
        d.inherits(a, c)
    })();
    (function () {
        var d = t.editor.utils, b = t.editor.ui.Popup, c = t.editor.ui.SplitButton, a = t.editor.ui.MultiMenuPop = function (a) {
            this.initOptions(a);
            this.initMultiMenu()
        };
        a.prototype = {
            initMultiMenu: function () {
                var a = this;
                this.popup = new b({
                    content: "", editor: a.editor, iframe_rendered: !1, onshow: function () {
                        this.iframe_rendered || (this.iframe_rendered = !0, this.getDom("content").innerHTML = '<iframe id="' + a.id + '_iframe" src="' + a.iframeUrl + '" frameborder="0"></iframe>', a.editor.container.style.zIndex &&
                        (this.getDom().style.zIndex = 1 * a.editor.container.style.zIndex + 1))
                    }
                });
                this.onbuttonclick = function () {
                    this.showPopup()
                };
                this.initSplitButton()
            }
        };
        d.inherits(a, c)
    })();
    (function () {
        function d(a) {
            if (!f.findParent(a.target || a.srcElement, function (a) {
                    return f.hasClass(a, "edui-shortcutmenu") || f.hasClass(a, "edui-popup")
                }, !0)) {
                a = 0;
                for (var b; b = g[a++];)b.hide()
            }
        }

        var b = t.editor.ui, c = b.UIBase, a = b.uiUtils, e = t.editor.utils, f = t.editor.dom.domUtils, g = [], l, k = !1, m = b.ShortCutMenu = function (a) {
            this.initOptions(a);
            this.initShortCutMenu()
        };
        m.postHide = d;
        m.prototype = {
            isHidden: !0, SPACE: 5, initShortCutMenu: function () {
                this.items = this.items || [];
                this.initUIBase();
                this.initItems();
                this.initEvent();
                g.push(this)
            }, initEvent: function () {
                var a = this, b = a.editor.document;
                f.on(b, "mousemove", function (b) {
                    if (!1 === a.isHidden && !a.getSubMenuMark() && "contextmenu" != a.eventType) {
                        var c = !0, d = a.getDom(), e = d.offsetWidth / 2 + a.SPACE, f = d.offsetHeight / 2, g = Math.abs(b.screenX - a.left), k = Math.abs(b.screenY - a.top);
                        clearTimeout(l);
                        l = setTimeout(function () {
                            0 < k && k < f ? a.setOpacity(d,
                                "1") : k > f && k < f + 70 ? (a.setOpacity(d, "0.5"), c = !1) : k > f + 70 && k < f + 140 && a.hide();
                            c && 0 < g && g < e ? a.setOpacity(d, "1") : g > e && g < e + 70 ? a.setOpacity(d, "0.5") : g > e + 70 && g < e + 140 && a.hide()
                        })
                    }
                });
                if (r.chrome)f.on(b, "mouseout", function (b) {
                    b = b.relatedTarget || b.toElement;
                    null != b && "HTML" != b.tagName || a.hide()
                });
                a.editor.addListener("afterhidepop", function () {
                    a.isHidden || (k = !0)
                })
            }, initItems: function () {
                if (e.isArray(this.items))for (var a = 0, c = this.items.length; a < c; a++) {
                    var d = this.items[a].toLowerCase();
                    b[d] && (this.items[a] = new b[d](this.editor),
                        this.items[a].className += " edui-shortcutsubmenu ")
                }
            }, setOpacity: function (a, b) {
                r.ie && 9 > r.version ? a.style.filter = "alpha(opacity = " + 100 * parseFloat(b) + ");" : a.style.opacity = b
            }, getSubMenuMark: function () {
                k = !1;
                for (var b = a.getFixedLayer(), b = f.getElementsByTagName(b, "div", function (a) {
                    return f.hasClass(a, "edui-shortcutsubmenu edui-popup")
                }), c = 0, d; d = b[c++];)"none" != d.style.display && (k = !0);
                return k
            }, show: function (b, c) {
                function d(a) {
                    0 > a.left && (a.left = 0);
                    0 > a.top && (a.top = 0);
                    k.style.cssText = "position:absolute;left:" +
                        a.left + "px;top:" + a.top + "px;"
                }

                function e(a) {
                    a.tagName || (a = a.getDom());
                    g.left = parseInt(a.style.left);
                    g.top = parseInt(a.style.top);
                    g.top -= k.offsetHeight + 15;
                    d(g)
                }

                var g = {}, k = this.getDom(), l = a.getFixedLayer();
                this.eventType = b.type;
                k.style.cssText = "display:block;left:-9999px";
                if ("contextmenu" == b.type && c) {
                    var m = f.getElementsByTagName(l, "div", "edui-contextmenu")[0];
                    m ? e(m) : this.editor.addListener("aftershowcontextmenu", function (a, b) {
                        e(b)
                    })
                } else g = a.getViewportOffsetByEvent(b), g.top -= k.offsetHeight + this.SPACE,
                    g.left += this.SPACE + 20, d(g), this.setOpacity(k, .2);
                this.isHidden = !1;
                this.left = b.screenX + k.offsetWidth / 2 - this.SPACE;
                this.top = b.screenY - k.offsetHeight / 2 - this.SPACE;
                this.editor && (k.style.zIndex = 1 * this.editor.container.style.zIndex + 10, l.style.zIndex = k.style.zIndex - 1)
            }, hide: function () {
                this.getDom() && (this.getDom().style.display = "none");
                this.isHidden = !0
            }, postRender: function () {
                if (e.isArray(this.items))for (var a = 0, b; b = this.items[a++];)b.postRender()
            }, getHtmlTpl: function () {
                var a;
                if (e.isArray(this.items)) {
                    a =
                        [];
                    for (var b = 0; b < this.items.length; b++)a[b] = this.items[b].renderHtml();
                    a = a.join("")
                } else a = this.items;
                return '<div id="##" class="%% edui-toolbar" data-src="shortcutmenu" onmousedown="return false;" onselectstart="return false;" >' + a + "</div>"
            }
        };
        e.inherits(m, c);
        f.on(document, "mousedown", function (a) {
            d(a)
        });
        f.on(window, "scroll", function (a) {
            d(a)
        })
    })();
    (function () {
        var d = t.editor.utils, b = t.editor.ui.UIBase, c = t.editor.ui.Breakline = function (a) {
            this.initOptions(a);
            this.initSeparator()
        };
        c.prototype = {
            uiName: "Breakline",
            initSeparator: function () {
                this.initUIBase()
            }, getHtmlTpl: function () {
                return "<br/>"
            }
        };
        d.inherits(c, b)
    })();
    (function () {
        var d = t.editor.utils, b = t.editor.dom.domUtils, c = t.editor.ui.UIBase, a = t.editor.ui.Message = function (a) {
            this.initOptions(a);
            this.initMessage()
        };
        a.prototype = {
            initMessage: function () {
                this.initUIBase()
            }, getHtmlTpl: function () {
                return '<div id="##" class="edui-message %%"> <div id="##_closer" class="edui-message-closer">\u00d7</div> <div id="##_body" class="edui-message-body edui-message-type-info"> <iframe style="position:absolute;z-index:-1;left:0;top:0;background-color: transparent;" frameborder="0" width="100%" height="100%" src="about:blank"></iframe> <div class="edui-shadow"></div> <div id="##_content" class="edui-message-content">  </div> </div></div>'
            },
            reset: function (a) {
                var b = this;
                a.keepshow || (clearTimeout(this.timer), b.timer = setTimeout(function () {
                    b.hide()
                }, a.timeout || 4E3));
                void 0 !== a.content && b.setContent(a.content);
                void 0 !== a.type && b.setType(a.type);
                b.show()
            }, postRender: function () {
                var a = this, c = this.getDom("closer");
                c && b.on(c, "click", function () {
                    a.hide()
                })
            }, setContent: function (a) {
                this.getDom("content").innerHTML = a
            }, setType: function (a) {
                a = a || "info";
                var b = this.getDom("body");
                b.className = b.className.replace(/edui-message-type-[\w-]+/, "edui-message-type-" +
                    a)
            }, getContent: function () {
                return this.getDom("content").innerHTML
            }, getType: function () {
                var a = this.getDom("body").match(/edui-message-type-([\w-]+)/);
                return a ? a[1] : ""
            }, show: function () {
                this.getDom().style.display = "block"
            }, hide: function () {
                var a = this.getDom();
                a && (a.style.display = "none", a.parentNode && a.parentNode.removeChild(a))
            }
        };
        d.inherits(a, c)
    })();
    (function () {
        var d = t.editor.utils, b = t.editor.ui, c = b.Dialog;
        b.buttons = {};
        b.Dialog = function (a) {
            var b = new c(a);
            b.addListener("hide", function () {
                if (b.editor) {
                    var a =
                        b.editor;
                    try {
                        if (r.gecko) {
                            var c = a.window.scrollY, d = a.window.scrollX;
                            a.body.focus();
                            a.window.scrollTo(d, c)
                        } else a.focus()
                    } catch (e) {
                    }
                }
            });
            return b
        };
        for (var a = {
                anchor: "~/dialogs/anchor/anchor.html",
                insertimage: "~/dialogs/image/image.html",
                link: "~/dialogs/link/link.html",
                spechars: "~/dialogs/spechars/spechars.html",
                searchreplace: "~/dialogs/searchreplace/searchreplace.html",
                map: "~/dialogs/map/map.html",
                gmap: "~/dialogs/gmap/gmap.html",
                insertvideo: "~/dialogs/video/video.html",
                help: "~/dialogs/help/help.html",
                preview: "~/dialogs/preview/preview.html",
                emotion: "~/dialogs/emotion/emotion.html",
                wordimage: "~/dialogs/wordimage/wordimage.html",
                attachment: "~/dialogs/attachment/attachment.html",
                insertframe: "~/dialogs/insertframe/insertframe.html",
                edittip: "~/dialogs/table/edittip.html",
                edittable: "~/dialogs/table/edittable.html",
                edittd: "~/dialogs/table/edittd.html",
                webapp: "~/dialogs/webapp/webapp.html",
                snapscreen: "~/dialogs/snapscreen/snapscreen.html",
                scrawl: "~/dialogs/scrawl/scrawl.html",
                music: "~/dialogs/music/music.html",
                template: "~/dialogs/template/template.html",
                background: "~/dialogs/background/background.html",
                charts: "~/dialogs/charts/charts.html"
            }, e = "undo redo formatmatch bold italic underline fontborder touppercase tolowercase strikethrough subscript superscript source indent outdent blockquote pasteplain pagebreak selectall print horizontal removeformat time date unlink insertparagraphbeforetable insertrow insertcol mergeright mergedown deleterow deletecol splittorows splittocols splittocells mergecells deletetable drafts".split(" "),
                 f = 0, g; g = e[f++];)g = g.toLowerCase(), b[g] = function (a) {
            return function (c) {
                var d = new b.Button({
                    className: "edui-for-" + a,
                    title: c.options.labelMap[a] || c.getLang("labelMap." + a) || "",
                    onclick: function () {
                        c.execCommand(a)
                    },
                    theme: c.options.theme,
                    showText: !1
                });
                b.buttons[a] = d;
                c.addListener("selectionchange", function (b, e, f) {
                    b = c.queryCommandState(a);
                    -1 == b ? (d.setDisabled(!0), d.setChecked(!1)) : f || (d.setDisabled(!1), d.setChecked(b))
                });
                return d
            }
        }(g);
        b.cleardoc = function (a) {
            var c = new b.Button({
                className: "edui-for-cleardoc",
                title: a.options.labelMap.cleardoc || a.getLang("labelMap.cleardoc") || "",
                theme: a.options.theme,
                onclick: function () {
                    confirm(a.getLang("confirmClear")) && a.execCommand("cleardoc")
                }
            });
            b.buttons.cleardoc = c;
            a.addListener("selectionchange", function () {
                c.setDisabled(-1 == a.queryCommandState("cleardoc"))
            });
            return c
        };
        var e = {
            justify: ["left", "right", "center", "justify"],
            imagefloat: ["none", "left", "center", "right"],
            directionality: ["ltr", "rtl"]
        }, l;
        for (l in e)(function (a, c) {
            for (var d = 0, e; e = c[d++];)(function (c) {
                b[a.replace("float",
                    "") + c] = function (d) {
                    var e = new b.Button({
                        className: "edui-for-" + a.replace("float", "") + c,
                        title: d.options.labelMap[a.replace("float", "") + c] || d.getLang("labelMap." + a.replace("float", "") + c) || "",
                        theme: d.options.theme,
                        onclick: function () {
                            d.execCommand(a, c)
                        }
                    });
                    b.buttons[a] = e;
                    d.addListener("selectionchange", function (b, f, g) {
                        e.setDisabled(-1 == d.queryCommandState(a));
                        e.setChecked(d.queryCommandValue(a) == c && !g)
                    });
                    return e
                }
            })(e)
        })(l, e[l]);
        for (f = 0; g = ["backcolor", "forecolor"][f++];)b[g] = function (a) {
            return function (c) {
                var d =
                    new b.ColorButton({
                        className: "edui-for-" + a,
                        color: "default",
                        title: c.options.labelMap[a] || c.getLang("labelMap." + a) || "",
                        editor: c,
                        onpickcolor: function (b, d) {
                            c.execCommand(a, d)
                        },
                        onpicknocolor: function () {
                            c.execCommand(a, "default");
                            this.setColor("transparent");
                            this.color = "default"
                        },
                        onbuttonclick: function () {
                            c.execCommand(a, this.color)
                        }
                    });
                b.buttons[a] = d;
                c.addListener("selectionchange", function () {
                    d.setDisabled(-1 == c.queryCommandState(a))
                });
                return d
            }
        }(g);
        e = {
            noOk: ["searchreplace", "help", "spechars", "webapp", "preview"],
            ok: "attachment anchor link insertimage map gmap insertframe wordimage insertvideo insertframe edittip edittable edittd scrawl template music background charts".split(" ")
        };
        for (l in e)(function (c, e) {
            for (var f = 0, g; g = e[f++];)r.opera && "searchreplace" === g || function (e) {
                b[e] = function (f, g, h) {
                    g = g || (f.options.iframeUrlMap || {})[e] || a[e];
                    h = f.options.labelMap[e] || f.getLang("labelMap." + e) || "";
                    var l;
                    g && (l = new b.Dialog(d.extend({
                        iframeUrl: f.ui.mapUrl(g),
                        editor: f,
                        className: "edui-for-" + e,
                        title: h,
                        holdScroll: "insertimage" ===
                        e,
                        fullscreen: /charts|preview/.test(e),
                        closeDialog: f.getLang("closeDialog")
                    }, "ok" == c ? {
                        buttons: [{
                            className: "edui-okbutton",
                            label: f.getLang("ok"),
                            editor: f,
                            onclick: function () {
                                l.close(!0)
                            }
                        }, {
                            className: "edui-cancelbutton",
                            label: f.getLang("cancel"),
                            editor: f,
                            onclick: function () {
                                l.close(!1)
                            }
                        }]
                    } : {})), f.ui._dialogs[e + "Dialog"] = l);
                    var m = new b.Button({
                        className: "edui-for-" + e,
                        title: h,
                        onclick: function () {
                            if (l)switch (e) {
                                case "wordimage":
                                    var a = f.execCommand("wordimage");
                                    a && a.length && (l.render(), l.open());
                                    break;
                                case "scrawl":
                                    -1 !=
                                    f.queryCommandState("scrawl") && (l.render(), l.open());
                                    break;
                                default:
                                    l.render(), l.open()
                            }
                        },
                        theme: f.options.theme,
                        disabled: "scrawl" == e && -1 == f.queryCommandState("scrawl") || "charts" == e
                    });
                    b.buttons[e] = m;
                    f.addListener("selectionchange", function () {
                        if (!(e in{edittable: 1})) {
                            var a = f.queryCommandState(e);
                            m.getDom() && (m.setDisabled(-1 == a), m.setChecked(a))
                        }
                    });
                    return m
                }
            }(g.toLowerCase())
        })(l, e[l]);
        b.snapscreen = function (c, d, e) {
            e = c.options.labelMap.snapscreen || c.getLang("labelMap.snapscreen") || "";
            var f = new b.Button({
                className: "edui-for-snapscreen",
                title: e, onclick: function () {
                    c.execCommand("snapscreen")
                }, theme: c.options.theme
            });
            b.buttons.snapscreen = f;
            if (d = d || (c.options.iframeUrlMap || {}).snapscreen || a.snapscreen) {
                var g = new b.Dialog({
                    iframeUrl: c.ui.mapUrl(d),
                    editor: c,
                    className: "edui-for-snapscreen",
                    title: e,
                    buttons: [{
                        className: "edui-okbutton", label: c.getLang("ok"), editor: c, onclick: function () {
                            g.close(!0)
                        }
                    }, {
                        className: "edui-cancelbutton", label: c.getLang("cancel"), editor: c, onclick: function () {
                            g.close(!1)
                        }
                    }]
                });
                g.render();
                c.ui._dialogs.snapscreenDialog =
                    g
            }
            c.addListener("selectionchange", function () {
                f.setDisabled(-1 == c.queryCommandState("snapscreen"))
            });
            return f
        };
        b.insertcode = function (a, c, e) {
            c = a.options.insertcode || [];
            e = a.options.labelMap.insertcode || a.getLang("labelMap.insertcode") || "";
            var f = [];
            d.each(c, function (b, c) {
                f.push({
                    label: b, value: c, theme: a.options.theme, renderLabelHtml: function () {
                        return '<div class="edui-label %%-label" >' + (this.label || "") + "</div>"
                    }
                })
            });
            var g = new b.Combox({
                editor: a, items: f, onselect: function (b, c) {
                    a.execCommand("insertcode",
                        this.items[c].value)
                }, onbuttonclick: function () {
                    this.showPopup()
                }, title: e, initValue: e, className: "edui-for-insertcode", indexByValue: function (a) {
                    if (a)for (var b = 0, c; c = this.items[b]; b++)if (-1 != c.value.indexOf(a))return b;
                    return -1
                }
            });
            b.buttons.insertcode = g;
            a.addListener("selectionchange", function (b, c, d) {
                d || (-1 == a.queryCommandState("insertcode") ? g.setDisabled(!0) : (g.setDisabled(!1), (b = a.queryCommandValue("insertcode")) ? (b && (b = b.replace(/['"]/g, "").split(",")[0]), g.setValue(b)) : g.setValue(e)))
            });
            return g
        };
        b.fontfamily = function (a, c, e) {
            c = a.options.fontfamily || [];
            e = a.options.labelMap.fontfamily || a.getLang("labelMap.fontfamily") || "";
            if (c.length) {
                for (var f = 0, g, h = []; g = c[f]; f++) {
                    var l = a.getLang("fontfamily")[g.name] || "";
                    (function (b, c) {
                        h.push({
                            label: b, value: c, theme: a.options.theme, renderLabelHtml: function () {
                                return '<div class="edui-label %%-label" style="font-family:' + d.unhtml(this.value) + '">' + (this.label || "") + "</div>"
                            }
                        })
                    })(g.label || l, g.val)
                }
                var p = new b.Combox({
                    editor: a, items: h, onselect: function (b, c) {
                        a.execCommand("FontFamily",
                            this.items[c].value)
                    }, onbuttonclick: function () {
                        this.showPopup()
                    }, title: e, initValue: e, className: "edui-for-fontfamily", indexByValue: function (a) {
                        if (a)for (var b = 0, c; c = this.items[b]; b++)if (-1 != c.value.indexOf(a))return b;
                        return -1
                    }
                });
                b.buttons.fontfamily = p;
                a.addListener("selectionchange", function (b, c, d) {
                    d || (-1 == a.queryCommandState("FontFamily") ? p.setDisabled(!0) : (p.setDisabled(!1), (b = a.queryCommandValue("FontFamily")) && (b = b.replace(/['"]/g, "").split(",")[0]), p.setValue(b)))
                });
                return p
            }
        };
        b.fontsize = function (a,
                               c, d) {
            d = a.options.labelMap.fontsize || a.getLang("labelMap.fontsize") || "";
            c = c || a.options.fontsize || [];
            if (c.length) {
                for (var e = [], f = 0; f < c.length; f++) {
                    var g = c[f] + "px";
                    e.push({
                        label: g, value: g, theme: a.options.theme, renderLabelHtml: function () {
                            return '<div class="edui-label %%-label" style="line-height:1;font-size:' + this.value + '">' + (this.label || "") + "</div>"
                        }
                    })
                }
                var h = new b.Combox({
                    editor: a, items: e, title: d, initValue: d, onselect: function (b, c) {
                        a.execCommand("FontSize", this.items[c].value)
                    }, onbuttonclick: function () {
                        this.showPopup()
                    },
                    className: "edui-for-fontsize"
                });
                b.buttons.fontsize = h;
                a.addListener("selectionchange", function (b, c, d) {
                    d || (-1 == a.queryCommandState("FontSize") ? h.setDisabled(!0) : (h.setDisabled(!1), h.setValue(a.queryCommandValue("FontSize"))))
                });
                return h
            }
        };
        b.paragraph = function (a, c, e) {
            e = a.options.labelMap.paragraph || a.getLang("labelMap.paragraph") || "";
            c = a.options.paragraph || [];
            if (!d.isEmptyObject(c)) {
                var f = [], g;
                for (g in c)f.push({
                    value: g,
                    label: c[g] || a.getLang("paragraph")[g],
                    theme: a.options.theme,
                    renderLabelHtml: function () {
                        return '<div class="edui-label %%-label"><span class="edui-for-' +
                            this.value + '">' + (this.label || "") + "</span></div>"
                    }
                });
                var h = new b.Combox({
                    editor: a,
                    items: f,
                    title: e,
                    initValue: e,
                    className: "edui-for-paragraph",
                    onselect: function (b, c) {
                        a.execCommand("Paragraph", this.items[c].value)
                    },
                    onbuttonclick: function () {
                        this.showPopup()
                    }
                });
                b.buttons.paragraph = h;
                a.addListener("selectionchange", function (b, c, d) {
                    d || (-1 == a.queryCommandState("Paragraph") ? h.setDisabled(!0) : (h.setDisabled(!1), b = a.queryCommandValue("Paragraph"), -1 != h.indexByValue(b) ? h.setValue(b) : h.setValue(h.initValue)))
                });
                return h
            }
        };
        b.customstyle = function (a) {
            var c = a.options.customstyle || [], d = a.options.labelMap.customstyle || a.getLang("labelMap.customstyle") || "";
            if (c.length) {
                for (var e = a.getLang("customstyle"), f = 0, g = [], h; h = c[f++];)(function (b) {
                    var c = {};
                    c.label = b.label ? b.label : e[b.name];
                    c.style = b.style;
                    c.className = b.className;
                    c.tag = b.tag;
                    g.push({
                        label: c.label, value: c, theme: a.options.theme, renderLabelHtml: function () {
                            return '<div class="edui-label %%-label"><' + c.tag + " " + (c.className ? ' class="' + c.className + '"' : "") + (c.style ?
                                ' style="' + c.style + '"' : "") + ">" + c.label + "</" + c.tag + "></div>"
                        }
                    })
                })(h);
                var l = new b.Combox({
                    editor: a,
                    items: g,
                    title: d,
                    initValue: d,
                    className: "edui-for-customstyle",
                    onselect: function (b, c) {
                        a.execCommand("customstyle", this.items[c].value)
                    },
                    onbuttonclick: function () {
                        this.showPopup()
                    },
                    indexByValue: function (a) {
                        for (var b = 0, c; c = this.items[b++];)if (c.label == a)return b - 1;
                        return -1
                    }
                });
                b.buttons.customstyle = l;
                a.addListener("selectionchange", function (b, c, d) {
                    d || (-1 == a.queryCommandState("customstyle") ? l.setDisabled(!0) :
                        (l.setDisabled(!1), b = a.queryCommandValue("customstyle"), -1 != l.indexByValue(b) ? l.setValue(b) : l.setValue(l.initValue)))
                });
                return l
            }
        };
        b.inserttable = function (a, c, d) {
            d = a.options.labelMap.inserttable || a.getLang("labelMap.inserttable") || "";
            var e = new b.TableButton({
                editor: a,
                title: d,
                className: "edui-for-inserttable",
                onpicktable: function (b, c, d) {
                    a.execCommand("InsertTable", {numRows: d, numCols: c, border: 1})
                },
                onbuttonclick: function () {
                    this.showPopup()
                }
            });
            b.buttons.inserttable = e;
            a.addListener("selectionchange", function () {
                e.setDisabled(-1 ==
                    a.queryCommandState("inserttable"))
            });
            return e
        };
        b.lineheight = function (a) {
            var c = a.options.lineheight || [];
            if (c.length) {
                for (var d = 0, e, f = []; e = c[d++];)f.push({
                    label: e,
                    value: e,
                    theme: a.options.theme,
                    onclick: function () {
                        a.execCommand("lineheight", this.value)
                    }
                });
                var g = new b.MenuButton({
                    editor: a,
                    className: "edui-for-lineheight",
                    title: a.options.labelMap.lineheight || a.getLang("labelMap.lineheight") || "",
                    items: f,
                    onbuttonclick: function () {
                        var b = a.queryCommandValue("LineHeight") || this.value;
                        a.execCommand("LineHeight",
                            b)
                    }
                });
                b.buttons.lineheight = g;
                a.addListener("selectionchange", function () {
                    var b = a.queryCommandState("LineHeight");
                    if (-1 == b)g.setDisabled(!0); else {
                        g.setDisabled(!1);
                        var c = a.queryCommandValue("LineHeight");
                        c && g.setValue((c + "").replace(/cm/, ""));
                        g.setChecked(b)
                    }
                });
                return g
            }
        };
        l = ["top", "bottom"];
        for (e = 0; f = l[e++];)(function (a) {
            b["rowspacing" + a] = function (c) {
                var d = c.options["rowspacing" + a] || [];
                if (!d.length)return null;
                for (var e = 0, f, g = []; f = d[e++];)g.push({
                    label: f, value: f, theme: c.options.theme, onclick: function () {
                        c.execCommand("rowspacing",
                            this.value, a)
                    }
                });
                var h = new b.MenuButton({
                    editor: c,
                    className: "edui-for-rowspacing" + a,
                    title: c.options.labelMap["rowspacing" + a] || c.getLang("labelMap.rowspacing" + a) || "",
                    items: g,
                    onbuttonclick: function () {
                        var b = c.queryCommandValue("rowspacing", a) || this.value;
                        c.execCommand("rowspacing", b, a)
                    }
                });
                b.buttons[a] = h;
                c.addListener("selectionchange", function () {
                    var b = c.queryCommandState("rowspacing", a);
                    if (-1 == b)h.setDisabled(!0); else {
                        h.setDisabled(!1);
                        var d = c.queryCommandValue("rowspacing", a);
                        d && h.setValue((d + "").replace(/%/,
                            ""));
                        h.setChecked(b)
                    }
                });
                return h
            }
        })(f);
        l = ["insertorderedlist", "insertunorderedlist"];
        for (e = 0; f = l[e++];)(function (a) {
            b[a] = function (c) {
                var d = c.options[a], e = function () {
                    c.execCommand(a, this.value)
                }, f = [], g;
                for (g in d)f.push({
                    label: d[g] || c.getLang()[a][g] || "",
                    value: g,
                    theme: c.options.theme,
                    onclick: e
                });
                var h = new b.MenuButton({
                    editor: c,
                    className: "edui-for-" + a,
                    title: c.getLang("labelMap." + a) || "",
                    items: f,
                    onbuttonclick: function () {
                        var b = c.queryCommandValue(a) || this.value;
                        c.execCommand(a, b)
                    }
                });
                b.buttons[a] = h;
                c.addListener("selectionchange",
                    function () {
                        var b = c.queryCommandState(a);
                        if (-1 == b)h.setDisabled(!0); else {
                            h.setDisabled(!1);
                            var d = c.queryCommandValue(a);
                            h.setValue(d);
                            h.setChecked(b)
                        }
                    });
                return h
            }
        })(f);
        b.fullscreen = function (a, c) {
            c = a.options.labelMap.fullscreen || a.getLang("labelMap.fullscreen") || "";
            var d = new b.Button({
                className: "edui-for-fullscreen",
                title: c,
                theme: a.options.theme,
                onclick: function () {
                    a.ui && a.ui.setFullScreen(!a.ui.isFullScreen());
                    this.setChecked(a.ui.isFullScreen())
                }
            });
            b.buttons.fullscreen = d;
            a.addListener("selectionchange",
                function () {
                    var b = a.queryCommandState("fullscreen");
                    d.setDisabled(-1 == b);
                    d.setChecked(a.ui.isFullScreen())
                });
            return d
        };
        b.emotion = function (c, d) {
            var e = new b.MultiMenuPop({
                title: c.options.labelMap.emotion || c.getLang("labelMap.emotion") || "",
                editor: c,
                className: "edui-for-emotion",
                iframeUrl: c.ui.mapUrl(d || (c.options.iframeUrlMap || {}).emotion || a.emotion)
            });
            b.buttons.emotion = e;
            c.addListener("selectionchange", function () {
                e.setDisabled(-1 == c.queryCommandState("emotion"))
            });
            return e
        };
        b.autotypeset = function (a) {
            var c =
                new b.AutoTypeSetButton({
                    editor: a,
                    title: a.options.labelMap.autotypeset || a.getLang("labelMap.autotypeset") || "",
                    className: "edui-for-autotypeset",
                    onbuttonclick: function () {
                        a.execCommand("autotypeset")
                    }
                });
            b.buttons.autotypeset = c;
            a.addListener("selectionchange", function () {
                c.setDisabled(-1 == a.queryCommandState("autotypeset"))
            });
            return c
        };
        b.simpleupload = function (a) {
            var c = new b.Button({
                className: "edui-for-simpleupload",
                title: a.options.labelMap.simpleupload || a.getLang("labelMap.simpleupload") || "",
                onclick: function () {
                },
                theme: a.options.theme,
                showText: !1
            });
            b.buttons.simpleupload = c;
            a.addListener("ready", function () {
                var b = c.getDom("body").children[0];
                a.fireEvent("simpleuploadbtnready", b)
            });
            a.addListener("selectionchange", function (b, d, e) {
                b = a.queryCommandState("simpleupload");
                -1 == b ? (c.setDisabled(!0), c.setChecked(!1)) : e || (c.setDisabled(!1), c.setChecked(b))
            });
            return c
        }
    })();
    (function () {
        function d(a) {
            this.initOptions(a);
            this.initEditorUI()
        }

        var b = t.editor.utils, c = t.editor.ui.uiUtils, a = t.editor.ui.UIBase, e = t.editor.dom.domUtils,
            f = [];
        d.prototype = {
            uiName: "editor", initEditorUI: function () {
                function a(b, c) {
                    b.setOpt({
                        wordCount: !0,
                        maximumWords: 1E4,
                        wordCountMsg: b.options.wordCountMsg || b.getLang("wordCountMsg"),
                        wordOverFlowMsg: b.options.wordOverFlowMsg || b.getLang("wordOverFlowMsg")
                    });
                    var d = b.options, e = d.maximumWords, f = d.wordCountMsg, g = d.wordOverFlowMsg, h = c.getDom("wordcount");
                    d.wordCount && (d = b.getContentLength(!0), d > e ? (h.innerHTML = g, b.fireEvent("wordcountoverflow")) : h.innerHTML = f.replace("{#leave}", e - d).replace("{#count}", d))
                }

                this.editor.ui =
                    this;
                this._dialogs = {};
                this.initUIBase();
                this._initToolbars();
                var b = this.editor, c = this;
                b.addListener("ready", function () {
                    b.getDialog = function (a) {
                        return b.ui._dialogs[a + "Dialog"]
                    };
                    e.on(b.window, "scroll", function (a) {
                        t.editor.ui.Popup.postHide(a)
                    });
                    b.ui._actualFrameWidth = b.options.initialFrameWidth;
                    UE.browser.ie && 6 === UE.browser.version && b.container.ownerDocument.execCommand("BackgroundImageCache", !1, !0);
                    b.options.elementPathEnabled && (b.ui.getDom("elementpath").innerHTML = '<div class="edui-editor-breadcrumb">' +
                        b.getLang("elementPathTip") + ":</div>");
                    b.options.wordCount && (e.on(b.document, "click", function () {
                        a(b, c);
                        e.un(b.document, "click", arguments.callee)
                    }), b.ui.getDom("wordcount").innerHTML = b.getLang("wordCountTip"));
                    b.ui._scale();
                    b.options.scaleEnabled ? (b.autoHeightEnabled && b.disableAutoHeight(), c.enableScale()) : c.disableScale();
                    b.options.elementPathEnabled || b.options.wordCount || b.options.scaleEnabled || (b.ui.getDom("elementpath").style.display = "none", b.ui.getDom("wordcount").style.display = "none", b.ui.getDom("scale").style.display =
                        "none");
                    b.selection.isFocus() && b.fireEvent("selectionchange", !1, !0)
                });
                b.addListener("mousedown", function (a, b) {
                    t.editor.ui.Popup.postHide(b, b.target || b.srcElement);
                    t.editor.ui.ShortCutMenu.postHide(b)
                });
                b.addListener("delcells", function () {
                    UE.ui.edittip && new UE.ui.edittip(b);
                    b.getDialog("edittip").open()
                });
                var d, f = !1, g;
                b.addListener("afterpaste", function () {
                    b.queryCommandState("pasteplain") || (t.editor.ui.PastePicker && (d = new t.editor.ui.Popup({
                        content: new t.editor.ui.PastePicker({editor: b}), editor: b,
                        className: "edui-wordpastepop"
                    }), d.render()), f = !0)
                });
                b.addListener("afterinserthtml", function () {
                    clearTimeout(g);
                    g = setTimeout(function () {
                        if (d && (f || b.ui._isTransfer)) {
                            if (d.isHidden()) {
                                var a = e.createElement(b.document, "span", {
                                    style: "line-height:0px;",
                                    innerHTML: "\ufeff"
                                });
                                b.selection.getRange().insertNode(a);
                                var c = Y(a, "firstChild", "previousSibling");
                                c && d.showAnchor(3 == c.nodeType ? c.parentNode : c);
                                e.remove(a)
                            } else d.show();
                            delete b.ui._isTransfer;
                            f = !1
                        }
                    }, 200)
                });
                b.addListener("contextmenu", function (a, b) {
                    t.editor.ui.Popup.postHide(b)
                });
                b.addListener("keydown", function (a, b) {
                    d && d.dispose(b);
                    var c = b.keyCode || b.which;
                    if (b.altKey && 90 == c)UE.ui.buttons.fullscreen.onclick()
                });
                b.addListener("wordcount", function (b) {
                    a(this, c)
                });
                b.addListener("selectionchange", function () {
                    if (b.options.elementPathEnabled)c[(-1 == b.queryCommandState("elementpath") ? "dis" : "en") + "ableElementPath"]();
                    if (b.options.scaleEnabled)c[(-1 == b.queryCommandState("scale") ? "dis" : "en") + "ableScale"]()
                });
                var h = new t.editor.ui.Popup({
                    editor: b, content: "", className: "edui-bubble", _onEditButtonClick: function () {
                        this.hide();
                        b.ui._dialogs.linkDialog.open()
                    }, _onImgEditButtonClick: function (a) {
                        this.hide();
                        b.ui._dialogs[a] && b.ui._dialogs[a].open()
                    }, _onImgSetFloat: function (a) {
                        this.hide();
                        b.execCommand("imagefloat", a)
                    }, _setIframeAlign: function (a) {
                        var b = h.anchorEl, c = b.cloneNode(!0);
                        switch (a) {
                            case -2:
                                c.setAttribute("align", "");
                                break;
                            case -1:
                                c.setAttribute("align", "left");
                                break;
                            case 1:
                                c.setAttribute("align", "right")
                        }
                        b.parentNode.insertBefore(c, b);
                        e.remove(b);
                        h.anchorEl = c;
                        h.showAnchor(h.anchorEl)
                    }, _updateIframe: function () {
                        var a =
                            b._iframe = h.anchorEl;
                        e.hasClass(a, "ueditor_baidumap") ? (b.selection.getRange().selectNode(a).select(), b.ui._dialogs.mapDialog.open()) : b.ui._dialogs.insertframeDialog.open();
                        h.hide()
                    }, _onRemoveButtonClick: function (a) {
                        b.execCommand(a);
                        this.hide()
                    }, queryAutoHide: function (a) {
                        return a && a.ownerDocument == b.document && ("img" == a.tagName.toLowerCase() || e.findParentByTagName(a, "a", !0)) ? a !== h.anchorEl : t.editor.ui.Popup.prototype.queryAutoHide.call(this, a)
                    }
                });
                h.render();
                b.options.imagePopup && (b.addListener("mouseover",
                    function (a, c) {
                        c = c || window.event;
                        var d = c.target || c.srcElement;
                        if (b.ui._dialogs.insertframeDialog && /iframe/ig.test(d.tagName)) {
                            var e = h.formatHtml("<nobr>" + b.getLang("property") + ': <span onclick=$$._setIframeAlign(-2) class="edui-clickable">' + b.getLang("default") + '</span>&nbsp;&nbsp;<span onclick=$$._setIframeAlign(-1) class="edui-clickable">' + b.getLang("justifyleft") + '</span>&nbsp;&nbsp;<span onclick=$$._setIframeAlign(1) class="edui-clickable">' + b.getLang("justifyright") + '</span>&nbsp;&nbsp; <span onclick="$$._updateIframe( this);" class="edui-clickable">' +
                                b.getLang("modify") + "</span></nobr>");
                            e ? (h.getDom("content").innerHTML = e, h.anchorEl = d, h.showAnchor(h.anchorEl)) : h.hide()
                        }
                    }), b.addListener("selectionchange", function (a, c) {
                    if (c) {
                        var d = "", f = "", g = b.selection.getRange().getClosedNode(), f = b.ui._dialogs;
                        if (g && "IMG" == g.tagName) {
                            var l = "insertimageDialog";
                            if (-1 != g.className.indexOf("edui-faked-video") || -1 != g.className.indexOf("edui-upload-video"))l = "insertvideoDialog";
                            -1 != g.className.indexOf("edui-faked-webapp") && (l = "webappDialog");
                            -1 != g.src.indexOf("http://api.map.baidu.com") &&
                            (l = "mapDialog");
                            -1 != g.className.indexOf("edui-faked-music") && (l = "musicDialog");
                            -1 != g.src.indexOf("http://maps.google.com/maps/api/staticmap") && (l = "gmapDialog");
                            g.getAttribute("anchorname") && (l = "anchorDialog", d = h.formatHtml("<nobr>" + b.getLang("property") + ': <span onclick=$$._onImgEditButtonClick("anchorDialog") class="edui-clickable">' + b.getLang("modify") + "</span>&nbsp;&nbsp;<span onclick=$$._onRemoveButtonClick('anchor') class=\"edui-clickable\">" + b.getLang("delete") + "</span></nobr>"));
                            g.getAttribute("word_img") &&
                            (b.word_img = [g.getAttribute("word_img")], l = "wordimageDialog");
                            if (e.hasClass(g, "loadingclass") || e.hasClass(g, "loaderrorclass"))l = "";
                            if (!f[l])return;
                            f = "<nobr>" + b.getLang("property") + ': <span onclick=$$._onImgSetFloat("none") class="edui-clickable">' + b.getLang("default") + '</span>&nbsp;&nbsp;<span onclick=$$._onImgSetFloat("left") class="edui-clickable">' + b.getLang("justifyleft") + '</span>&nbsp;&nbsp;<span onclick=$$._onImgSetFloat("right") class="edui-clickable">' + b.getLang("justifyright") + '</span>&nbsp;&nbsp;<span onclick=$$._onImgSetFloat("center") class="edui-clickable">' +
                                b.getLang("justifycenter") + "</span>&nbsp;&nbsp;<span onclick=\"$$._onImgEditButtonClick('" + l + '\');" class="edui-clickable">' + b.getLang("modify") + "</span></nobr>";
                            !d && (d = h.formatHtml(f))
                        }
                        if (b.ui._dialogs.linkDialog) {
                            var m = b.queryCommandValue("link"), n;
                            m && (n = m.getAttribute("_href") || m.getAttribute("href", 2)) && (f = n, 30 < n.length && (f = n.substring(0, 20) + "..."), d && (d += '<div style="height:5px;"></div>'), d += h.formatHtml("<nobr>" + b.getLang("anthorMsg") + ': <a target="_blank" href="' + n + '" title="' + n + '" >' + f + '</a> <span class="edui-clickable" onclick="$$._onEditButtonClick();">' +
                                b.getLang("modify") + '</span> <span class="edui-clickable" onclick="$$._onRemoveButtonClick(\'unlink\');"> ' + b.getLang("clear") + "</span></nobr>"), h.showAnchor(m))
                        }
                        d ? (h.getDom("content").innerHTML = d, h.anchorEl = g || m, h.showAnchor(h.anchorEl)) : h.hide()
                    }
                }))
            }, _initToolbars: function () {
                for (var a = this.editor, c = this.toolbars || [], d = [], e = 0; e < c.length; e++) {
                    for (var f = c[e], g = new t.editor.ui.Toolbar({theme: a.options.theme}), h = 0; h < f.length; h++) {
                        var p = f[h], r = null;
                        if ("string" == typeof p) {
                            if (p = p.toLowerCase(), "|" == p &&
                                (p = "Separator"), "||" == p && (p = "Breakline"), t.editor.ui[p] && (r = new t.editor.ui[p](a)), "fullscreen" == p) {
                                d && d[0] ? d[0].items.splice(0, 0, r) : r && g.items.splice(0, 0, r);
                                continue
                            }
                        } else r = p;
                        r && r.id && g.add(r)
                    }
                    d[e] = g
                }
                b.each(UE._customizeUI, function (b, c) {
                    var d, e;
                    if (b.id && b.id != a.key)return !1;
                    if (d = b.execFn.call(a, a, c))e = b.index, void 0 === e && (e = g.items.length), g.add(d, e)
                });
                this.toolbars = d
            }, getHtmlTpl: function () {
                return '<div id="##" class="%%"><div id="##_toolbarbox" class="%%-toolbarbox">' + (this.toolbars.length ? '<div id="##_toolbarboxouter" class="%%-toolbarboxouter"><div class="%%-toolbarboxinner">' +
                    this.renderToolbarBoxHtml() + "</div></div>" : "") + '<div id="##_toolbarmsg" class="%%-toolbarmsg" style="display:none;"><div id = "##_upload_dialog" class="%%-toolbarmsg-upload" onclick="$$.showWordImageDialog();">' + this.editor.getLang("clickToUpload") + '</div><div class="%%-toolbarmsg-close" onclick="$$.hideToolbarMsg();">x</div><div id="##_toolbarmsg_label" class="%%-toolbarmsg-label"></div><div style="height:0;overflow:hidden;clear:both;"></div></div><div id="##_message_holder" class="%%-messageholder"></div></div><div id="##_iframeholder" class="%%-iframeholder"></div><div id="##_bottombar" class="%%-bottomContainer"><table><tr><td id="##_elementpath" class="%%-bottombar"></td><td id="##_wordcount" class="%%-wordcount"></td><td id="##_scale" class="%%-scale"><div class="%%-icon"></div></td></tr></table></div><div id="##_scalelayer"></div></div>'
            },
            showWordImageDialog: function () {
                this._dialogs.wordimageDialog.open()
            }, renderToolbarBoxHtml: function () {
                for (var a = [], b = 0; b < this.toolbars.length; b++)a.push(this.toolbars[b].renderHtml());
                return a.join("")
            }, setFullScreen: function (a) {
                var b = this.editor, c = b.container.parentNode.parentNode;
                if (this._fullscreen != a) {
                    this._fullscreen = a;
                    this.editor.fireEvent("beforefullscreenchange", a);
                    if (t.editor.browser.gecko)var d = b.selection.getRange().createBookmark();
                    if (a) {
                        for (; "BODY" != c.tagName;) {
                            var e = t.editor.dom.domUtils.getComputedStyle(c,
                                "position");
                            f.push(e);
                            c.style.position = "static";
                            c = c.parentNode
                        }
                        this._bakHtmlOverflow = document.documentElement.style.overflow;
                        this._bakBodyOverflow = document.body.style.overflow;
                        this._bakAutoHeight = this.editor.autoHeightEnabled;
                        this._bakScrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
                        this._bakEditorContaninerWidth = b.iframe.parentNode.offsetWidth;
                        this._bakAutoHeight && (b.autoHeightEnabled = !1, this.editor.disableAutoHeight());
                        document.documentElement.style.overflow = "hidden";
                        window.scrollTo(0, window.scrollY);
                        this._bakCssText = this.getDom().style.cssText;
                        this._bakCssText1 = this.getDom("iframeholder").style.cssText;
                        b.iframe.parentNode.style.width = "";
                        this._updateFullScreen()
                    } else {
                        for (; "BODY" != c.tagName;)c.style.position = f.shift(), c = c.parentNode;
                        this.getDom().style.cssText = this._bakCssText;
                        this.getDom("iframeholder").style.cssText = this._bakCssText1;
                        this._bakAutoHeight && (b.autoHeightEnabled = !0, this.editor.enableAutoHeight());
                        document.documentElement.style.overflow = this._bakHtmlOverflow;
                        document.body.style.overflow = this._bakBodyOverflow;
                        b.iframe.parentNode.style.width = this._bakEditorContaninerWidth + "px";
                        window.scrollTo(0, this._bakScrollTop)
                    }
                    if (r.gecko && "true" === b.body.contentEditable) {
                        var g = document.createElement("input");
                        document.body.appendChild(g);
                        b.body.contentEditable = !1;
                        setTimeout(function () {
                            g.focus();
                            setTimeout(function () {
                                b.body.contentEditable = !0;
                                b.fireEvent("fullscreenchanged", a);
                                b.selection.getRange().moveToBookmark(d).select(!0);
                                t.editor.dom.domUtils.remove(g);
                                a && window.scroll(0,
                                    0)
                            }, 0)
                        }, 0)
                    }
                    "true" === b.body.contentEditable && (this.editor.fireEvent("fullscreenchanged", a), this.triggerLayout())
                }
            }, _updateFullScreen: function () {
                if (this._fullscreen) {
                    var a = c.getViewportRect();
                    this.getDom().style.cssText = "border:0;position:absolute;left:0;top:" + (this.editor.options.topOffset || 0) + "px;width:" + a.width + "px;height:" + a.height + "px;z-index:" + (1 * this.getDom().style.zIndex + 100);
                    c.setViewportOffset(this.getDom(), {left: 0, top: this.editor.options.topOffset || 0});
                    this.editor.setHeight(a.height - this.getDom("toolbarbox").offsetHeight -
                        this.getDom("bottombar").offsetHeight - (this.editor.options.topOffset || 0), !0);
                    if (r.gecko)try {
                        window.onresize()
                    } catch (b) {
                    }
                }
            }, _updateElementPath: function () {
                var a = this.getDom("elementpath"), b;
                if (this.elementPathEnabled && (b = this.editor.queryCommandValue("elementpath"))) {
                    for (var c = [], d = 0, e; e = b[d]; d++)c[d] = this.formatHtml('<span unselectable="on" onclick="$$.editor.execCommand(&quot;elementpath&quot;, &quot;' + d + '&quot;);">' + e + "</span>");
                    a.innerHTML = '<div class="edui-editor-breadcrumb" onmousedown="return false;">' +
                        this.editor.getLang("elementPathTip") + ": " + c.join(" &gt; ") + "</div>"
                } else a.style.display = "none"
            }, disableElementPath: function () {
                var a = this.getDom("elementpath");
                a.innerHTML = "";
                a.style.display = "none";
                this.elementPathEnabled = !1
            }, enableElementPath: function () {
                this.getDom("elementpath").style.display = "";
                this.elementPathEnabled = !0;
                this._updateElementPath()
            }, _scale: function () {
                function a() {
                    J = e.getXY(h);
                    M || (M = g.options.minFrameHeight + t.offsetHeight + w.offsetHeight);
                    H.style.cssText = "position:absolute;left:0;display:;top:0;background-color:#41ABFF;opacity:0.4;filter: Alpha(opacity=40);width:" +
                        h.offsetWidth + "px;height:" + h.offsetHeight + "px;z-index:" + (g.options.zIndex + 1);
                    e.on(f, "mousemove", b);
                    e.on(p, "mouseup", c);
                    e.on(f, "mouseup", c)
                }

                function b(a) {
                    d();
                    a = a || window.event;
                    U = a.pageX || f.documentElement.scrollLeft + a.clientX;
                    A = a.pageY || f.documentElement.scrollTop + a.clientY;
                    I = U - J.x;
                    E = A - J.y;
                    I >= Q && (B = !0, H.style.width = I + "px");
                    E >= M && (B = !0, H.style.height = E + "px")
                }

                function c() {
                    B && (B = !1, g.ui._actualFrameWidth = H.offsetWidth - 2, h.style.width = g.ui._actualFrameWidth + "px", g.setHeight(H.offsetHeight - w.offsetHeight -
                        t.offsetHeight - 2, !0));
                    H && (H.style.display = "none");
                    d();
                    e.un(f, "mousemove", b);
                    e.un(p, "mouseup", c);
                    e.un(f, "mouseup", c)
                }

                function d() {
                    r.ie ? f.selection.clear() : window.getSelection().removeAllRanges()
                }

                var f = document, g = this.editor, h = g.container, p = g.document, t = this.getDom("toolbarbox"), w = this.getDom("bottombar"), F = this.getDom("scale"), H = this.getDom("scalelayer"), B = !1, J = null, M = 0, Q = g.options.minFrameWidth, U = 0, A = 0, I = 0, E = 0, C = this;
                this.editor.addListener("fullscreenchanged", function (a, b) {
                    if (b)C.disableScale();
                    else if (C.editor.options.scaleEnabled) {
                        C.enableScale();
                        var c = C.editor.document.createElement("span");
                        C.editor.body.appendChild(c);
                        C.editor.body.style.height = Math.max(e.getXY(c).y, C.editor.iframe.offsetHeight - 20) + "px";
                        e.remove(c)
                    }
                });
                this.enableScale = function () {
                    1 != g.queryCommandState("source") && (F.style.display = "", this.scaleEnabled = !0, e.on(F, "mousedown", a))
                };
                this.disableScale = function () {
                    F.style.display = "none";
                    this.scaleEnabled = !1;
                    e.un(F, "mousedown", a)
                }
            }, isFullScreen: function () {
                return this._fullscreen
            },
            postRender: function () {
                a.prototype.postRender.call(this);
                for (var b = 0; b < this.toolbars.length; b++)this.toolbars[b].postRender();
                var c = this, d, e = t.editor.dom.domUtils, f = function () {
                    clearTimeout(d);
                    d = setTimeout(function () {
                        c._updateFullScreen()
                    })
                };
                e.on(window, "resize", f);
                c.addListener("destroy", function () {
                    e.un(window, "resize", f);
                    clearTimeout(d)
                })
            }, showToolbarMsg: function (a, b) {
                this.getDom("toolbarmsg_label").innerHTML = a;
                this.getDom("toolbarmsg").style.display = "";
                b || (this.getDom("upload_dialog").style.display =
                    "none")
            }, hideToolbarMsg: function () {
                this.getDom("toolbarmsg").style.display = "none"
            }, mapUrl: function (a) {
                return a ? a.replace("~/", this.editor.options.UEDITOR_HOME_URL || "") : ""
            }, triggerLayout: function () {
                var a = this.getDom();
                a.style.zoom = "1" == a.style.zoom ? "100%" : "1"
            }
        };
        b.inherits(d, t.editor.ui.UIBase);
        var g = {};
        UE.ui.Editor = function (a) {
            var c = new UE.Editor(a);
            c.options.editor = c;
            b.loadFile(document, {
                href: c.options.themePath + c.options.theme + "/css/ueditor.css",
                tag: "link",
                type: "text/css",
                rel: "stylesheet"
            });
            var f =
                c.render;
            c.render = function (a) {
                a.constructor === String && (c.key = a, g[a] = c);
                b.domReady(function () {
                    function b() {
                        c.setOpt({labelMap: c.options.labelMap || c.getLang("labelMap")});
                        new d(c.options);
                        if (a && (a.constructor === String && (a = document.getElementById(a)), a && a.getAttribute("name") && (c.options.textarea = a.getAttribute("name")), a && /script|textarea/ig.test(a.tagName))) {
                            var g = document.createElement("div");
                            a.parentNode.insertBefore(g, a);
                            var h = a.value || a.innerHTML;
                            c.options.initialContent = /^[\t\r\n ]*$/.test(h) ?
                                c.options.initialContent : h.replace(/>[\n\r\t]+([ ]{4})+/g, ">").replace(/[\n\r\t]+([ ]{4})+</g, "<").replace(/>[\n\r\t]+</g, "><");
                            a.className && (g.className = a.className);
                            a.style.cssText && (g.style.cssText = a.style.cssText);
                            /textarea/i.test(a.tagName) ? (c.textarea = a, c.textarea.style.display = "none") : a.parentNode.removeChild(a);
                            a.id && (g.id = a.id, e.removeAttributes(a, "id"));
                            a = g;
                            a.innerHTML = ""
                        }
                        e.addClass(a, "edui-" + c.options.theme);
                        c.ui.render(a);
                        g = c.options;
                        c.container = c.ui.getDom();
                        for (var h = e.findParents(a,
                            !0), l = [], p = 0, q; q = h[p]; p++)l[p] = q.style.display, q.style.display = "block";
                        g.initialFrameWidth ? g.minFrameWidth = g.initialFrameWidth : (g.minFrameWidth = g.initialFrameWidth = a.offsetWidth, p = a.style.width, /%$/.test(p) && (g.initialFrameWidth = p));
                        g.initialFrameHeight ? g.minFrameHeight = g.initialFrameHeight : g.initialFrameHeight = g.minFrameHeight = a.offsetHeight;
                        for (p = 0; q = h[p]; p++)q.style.display = l[p];
                        a.style.height && (a.style.height = "");
                        c.container.style.width = g.initialFrameWidth + (/%$/.test(g.initialFrameWidth) ? "" : "px");
                        c.container.style.zIndex = g.zIndex;
                        f.call(c, c.ui.getDom("iframeholder"));
                        c.fireEvent("afteruiready")
                    }

                    c.langIsReady ? b() : c.addListener("langReady", b)
                })
            };
            return c
        };
        UE.getEditor = function (a, b) {
            var c = g[a];
            c || (c = g[a] = new UE.ui.Editor(b), c.render(a));
            return c
        };
        UE.delEditor = function (a) {
            var b;
            if (b = g[a])b.key && b.destroy(), delete g[a]
        };
        UE.registerUI = function (a, c, d, e) {
            b.each(a.split(/\s+/), function (a) {
                UE._customizeUI[a] = {id: e, execFn: c, index: d}
            })
        }
    })();
    UE.registerUI("message", function (d) {
        function b() {
            var b = f.ui.getDom("toolbarbox");
            b && (a.style.top = b.offsetHeight + 3 + "px");
            a.style.zIndex = Math.max(f.options.zIndex, f.iframe.style.zIndex) + 1
        }

        var c = t.editor.ui.Message, a, e = [], f = d;
        f.addListener("ready", function () {
            a = document.getElementById(f.ui.id + "_message_holder");
            b();
            setTimeout(function () {
                b()
            }, 500)
        });
        f.addListener("showmessage", function (d, l) {
            l = p.isString(l) ? {content: l} : l;
            var k = new c({
                timeout: l.timeout,
                type: l.type,
                content: l.content,
                keepshow: l.keepshow,
                editor: f
            }), m = l.id || "msg_" + (+new Date).toString(36);
            k.render(a);
            e[m] = k;
            k.reset(l);
            b();
            return m
        });
        f.addListener("updatemessage", function (b, c, d) {
            d = p.isString(d) ? {content: d} : d;
            b = e[c];
            b.render(a);
            b && b.reset(d)
        });
        f.addListener("hidemessage", function (a, b) {
            var c = e[b];
            c && c.hide()
        })
    });
    UE.registerUI("autosave", function (d) {
        var b = null, c = null;
        d.on("afterautosave", function () {
            clearTimeout(b);
            b = setTimeout(function () {
                c && d.trigger("hidemessage", c);
                c = d.trigger("showmessage", {content: d.getLang("autosave.success"), timeout: 2E3})
            }, 2E3)
        })
    })
})();
