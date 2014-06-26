// ==UserScript==
// @name Youku2mp4 noAds
// @author Harv
// @description Youku视频转mp4
// @version 0.0.1
// @include http://*/*
// @include https://*/*
// ==/UserScript==
/* @grant GM_xmlhttpRequest unsafeWindow*/

var root=this;

var vid='';
window.location.href.replace(/youku\.com.+id_([^\.]+)/,function(x,y) {
    vid=y;
    return y;
});


videoUrl = "http://v.youku.com/player/getPlayList/VideoIDS/" + vid + "/Pf/4/ctype/12/ev/1?__callback=BuildVideoInfo.response";
var setStyle = function(dom) {
	var style = {
		borderRadius: '3px',
		boxShadow: '0 0 21px 0 #FFBBBB inset',
		cssFloat: 'right',
		padding: '0 8px',
		textDecoration: 'none'
	};
	for (var i in style) {
		if (style.hasOwnProperty(i)) {
			dom.style[i] =style[i];
		}
	}
}
var addVideoPlayer = function(data) {
    var src = data._videoSegsDic.mp4?data._videoSegsDic.mp4[0].src:'';
    if (!src) {
    	var a = document.createElement('a');
		a.className = 'abtn';
		a.textContent='没有mp4视频!';
		a.title=data._videoSegsDic.flv[0].src;
		var t = document.querySelector('#vpvideotitlev5').querySelector('h1');
		var r=t.querySelector('.abtn');
		t.removeChild(r)
		t.appendChild(a);
		setStyle(a)
    	return;
    };

    var v = document.createElement('video');
    v.src = src;
    v.controls = true;
    v.style.width = '100%';
    v.style.height = '100%';
    var t = document.getElementById('player');
    t.innerHTML = '';
    t.appendChild(v)
}
var ykv = function(avi) {

    function na(a) {
        if (!a) return "";
        var a = a.toString(),
            c, b, f, i, e, h = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27,
                28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1
            ];
        i = a.length;
        f = 0;
        for (e = ""; f < i;) {
            do c = h[a.charCodeAt(f++) & 255]; while (f < i && -1 == c);
            if (-1 == c) break;
            do b = h[a.charCodeAt(f++) & 255]; while (f < i && -1 == b);
            if (-1 == b) break;
            e += String.fromCharCode(c << 2 | (b & 48) >> 4);
            do {
                c = a.charCodeAt(f++) & 255;
                if (61 == c) return e;
                c = h[c]
            } while (f < i && -1 == c);
            if (-1 == c) break;
            e += String.fromCharCode((b & 15) << 4 | (c & 60) >> 2);
            do {
                b = a.charCodeAt(f++) & 255;
                if (61 == b) return e;
                b = h[b]
            } while (f < i && -1 == b);
            if (-1 == b) break;
            e += String.fromCharCode((c &
                3) << 6 | b)
        }
        return e
    }

    function F(a, c) {
        for (var b = [], f = 0; f < a.length; f++) {
            for (var i = 0, i = "a" <= a[f] && "z" >= a[f] ? a[f].charCodeAt(0) - 97 : a[f] - 0 + 26, e = 0; 36 > e; e++)
                if (c[e] == i) {
                    i = e;
                    break
                }
            b[f] = 25 < i ? i - 26 : String.fromCharCode(i + 97)
        }
        return b.join("")
    }
    
    function D(a) {
        if (!a) return "";
        var a = a.toString(),
            b, d, f, e, g, h;
        f = a.length;
        d = 0;
        for (b = ""; d < f;) {
            e = a.charCodeAt(d++) & 255;
            if (d == f) {
                b += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e >> 2);
                b += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt((e & 3) << 4);
                b += "==";
                break
            }
            g = a.charCodeAt(d++);
            if (d == f) {
                b += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e >> 2);
                b += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt((e & 3) << 4 | (g & 240) >> 4);
                b += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt((g &
                    15) << 2);
                b += "=";
                break
            }
            h = a.charCodeAt(d++);
            b += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e >> 2);
            b += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt((e & 3) << 4 | (g & 240) >> 4);
            b += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt((g & 15) << 2 | (h & 192) >> 6);
            b += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(h & 63)
        }
        return b
    }

    function E(a, c) {
        for (var b = [], f = 0, i, e = "", h = 0; 256 > h; h++) b[h] = h;
        for (h = 0; 256 > h; h++) f = (f + b[h] + a.charCodeAt(h % a.length)) % 256, i = b[h], b[h] = b[f], b[f] = i;
        for (var q = f = h = 0; q < c.length; q++) h = (h + 1) % 256, f = (f + b[h]) % 256, i = b[h], b[h] = b[f], b[f] = i, e += String.fromCharCode(c.charCodeAt(q) ^ b[(b[h] + b[f]) % 256]);
        return e
    }
    var T = function(a, c) {
        this._sid = e.userCache.sid;
        this._seed = a.seed;
        this._fileType = c;
        var b = new U(this._seed);
        this._streamFileIds = a.streamfileids;
        this._videoSegsDic = {};
        for (c in a.segs) {
            for (var f = [], i = 0, g = 0; g < a.segs[c].length; g++) {
                var h = a.segs[c][g],
                    q = {};
                q.no = h.no;
                q.size = h.size;
                q.seconds = h.seconds;
                h.k && (q.key = h.k);
                q.fileId =
                    this.getFileId(a.streamfileids, c, parseInt(g), b);
                q.type = c;
                q.src = this.getVideoSrc(h.no, a, c, q.fileId);
                f[i++] = q
            }
            this._videoSegsDic[c] = f
        }
    }, U = function(a) {
            this._randomSeed = a;
            this.cg_hun()
        };
    U.prototype = {
        cg_hun: function() {
            this._cgStr = "";
            for (var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ/\\:._-1234567890", c = a.length, b = 0; b < c; b++) {
                var f = parseInt(this.ran() * a.length);
                this._cgStr += a.charAt(f);
                a = a.split(a.charAt(f)).join("")
            }
        },
        cg_fun: function(a) {
            for (var a = a.split("*"), c = "", b = 0; b < a.length - 1; b++) c += this._cgStr.charAt(a[b]);
            return c
        },
        ran: function() {
            this._randomSeed = (211 * this._randomSeed + 30031) % 65536;
            return this._randomSeed / 65536
        }
    };
    T.prototype = {
        getFileId: function(a, c, b, f) {
            for (var i in a)
                if (i == c) {
                    streamFid = a[i];
                    break
                }
            if ("" == streamFid) return "";
            c = f.cg_fun(streamFid);
            a = c.slice(0, 8);
            b = b.toString(16);
            1 == b.length && (b = "0" + b);
            b = b.toUpperCase();
            c = c.slice(10, c.length);
            return a + b + c
        },
        getVideoSrc: function(a, c, d, f, i, g) {
            if (!c.videoid || !d) return "";
            var h = {
                flv: 0,
                flvhd: 0,
                mp4: 1,
                hd2: 2,
                "3gphd": 1,
                "3gp": 0
            }[d],
                q = {
                    flv: "flv",
                    mp4: "mp4",
                    hd2: "flv",
                    "3gphd": "mp4",
                    "3gp": "flv"
                }[d],
                k = a.toString(16);
            1 == k.length && (k = "0" + k);
            var l = c.segs[d][a].seconds,
                a = c.segs[d][a].k;
            if ("" == a || -1 == a) a = c.key2 + c.key1;
            d = "";
            c.show && (d = c.show.show_paid ? "&ypremium=1" : "&ymovie=1");
            c = "/player/getFlvPath/sid/" + e.userCache.sid + "_" + k + "/st/" + q + "/fileid/" + f + "?K=" + a + "&hd=" + h + "&myp=0&ts=" + l + "&ypp=0" + d;
            f = encodeURIComponent(D(E(F(b.mk.a4 + "poz" + e.userCache.a2, [19, 1, 4, 7, 30, 14, 28, 8, 24, 17, 6, 35, 34, 16, 9, 10, 13, 22, 32, 29, 31, 21, 18, 3, 2, 23, 25, 27, 11, 20, 5, 15, 12, 0, 33, 26]).toString(), e.userCache.sid +
                "_" + f + "_" + e.userCache.token)));
            c = c + ("&ep=" + f) + "&ctype=12&ev=1" + ("&token=" + e.userCache.token);
            c += "&oip=" + b.v.data[0].ip;
            return "http://k.youku.com" + (c + ((i ? "/password/" + i : "") + (g ? g : "")))
        }
    };

    var b = {}
    b.mk = {}, b.mk.a3 = "b4et", b.mk.a4 = "boa4";
    var e = {};
    e.userCache = {};
    e.userCache.a1 = '4';
    e.userCache.a2 = '1';
    b.v = avi;
    if (!avi||!avi.data) {return};
    var a = avi.data[0],
        c = E(F(b.mk.a3 + "o0b" + e.userCache.a1, [19, 1, 4, 7, 30, 14, 28, 8, 24, 17, 6, 35, 34, 16, 9, 10, 13, 22, 32, 29, 31, 21, 18, 3, 2, 23, 25, 27, 11, 20, 5, 15, 12, 0, 33, 26]).toString(), na(a.ep));

    e.userCache.sid = c.split("_")[0];
    e.userCache.token = c.split("_")[1];
    var _type = {
        'm': 'mp4',
        'u': 'm3u8',
        'f': 'flv'
    }

    var vinfo = new T(a, _type['u'])
    addVideoPlayer(vinfo)
}

var BuildVideoInfo = {};
BuildVideoInfo.response = ykv;

(function() {
	if (!vid) {return};
	GM_xmlhttpRequest({
		method: 'GET',
		url: videoUrl,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
			if (responseDetails.status == 200 && responseDetails.readyState == 4) {
				var txt = responseDetails.responseText;
				eval('(' + txt + ')');
			};
		}
	});
})();




(function() {
	var node = document.querySelector('#vpvideotitlev5');
	var v = window.location.href.match(/id\_.[^\.]*/img) || null;
	if (!v) {
		return
	};
	var vt = v.toString();
	var vid = vt.replace(/id\_/, '');
	var videoUrl = "http://v.youku.com/player/getPlayList/VideoIDS/" + vid + "/Pf/4/ctype/12/ev/1?__callback=BuildVideoInfo.response";
	if (node&&node.nodeType) {
		var a = document.createElement('a');
		a.className = 'abtn';
		a.textContent='切换到mp4';
		var t = document.querySelector('#vpvideotitlev5').querySelector('h1');
		t.appendChild(a);
		setStyle(a)
		a.addEventListener('click', function(event) {
			root.GM_xmlhttpRequest({
				method: 'GET',
				url: videoUrl,
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					'Accept': 'application/atom+xml,application/xml,text/xml',
				},
				onload: function(responseDetails) {
					if (responseDetails.status == 200 && responseDetails.readyState == 4) {
						var txt = responseDetails.responseText;
						eval('(' + txt + ')');
					};
				},
				onerror:function () {
					t.removeChild(a);
				}
			});
		}, false);
	};
})();

