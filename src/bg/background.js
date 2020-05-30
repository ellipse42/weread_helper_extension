//

function safe_add(x, y) {
  var lsw = (x & 0xFFFF) + (y & 0xFFFF),
  msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

function bit_rol(num, cnt) {
  return (num << cnt) | (num >>> (32 - cnt));
}

function md5_cmn(q, a, b, x, s, t) {
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
}
function md5_ff(a, b, c, d, x, s, t) {
  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t) {
  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t) {
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t) {
  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

function binl_md5(x, len) {
  /* append padding */
  x[len >> 5] |= 0x80 << (len % 32);
  x[(((len + 64) >>> 9) << 4) + 14] = len;

  var i, olda, oldb, oldc, oldd,
    a =  1732584193,
    b = -271733879,
    c = -1732584194,
    d =  271733878;

  for (i = 0; i < x.length; i += 16) {
    olda = a;
    oldb = b;
    oldc = c;
    oldd = d;

    a = md5_ff(a, b, c, d, x[i],       7, -680876936);
    d = md5_ff(d, a, b, c, x[i +  1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i +  2], 17,  606105819);
    b = md5_ff(b, c, d, a, x[i +  3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i +  4],  7, -176418897);
    d = md5_ff(d, a, b, c, x[i +  5], 12,  1200080426);
    c = md5_ff(c, d, a, b, x[i +  6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i +  7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i +  8],  7,  1770035416);
    d = md5_ff(d, a, b, c, x[i +  9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i + 12],  7,  1804603682);
    d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i + 15], 22,  1236535329);

    a = md5_gg(a, b, c, d, x[i +  1],  5, -165796510);
    d = md5_gg(d, a, b, c, x[i +  6],  9, -1069501632);
    c = md5_gg(c, d, a, b, x[i + 11], 14,  643717713);
    b = md5_gg(b, c, d, a, x[i],      20, -373897302);
    a = md5_gg(a, b, c, d, x[i +  5],  5, -701558691);
    d = md5_gg(d, a, b, c, x[i + 10],  9,  38016083);
    c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i +  4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i +  9],  5,  568446438);
    d = md5_gg(d, a, b, c, x[i + 14],  9, -1019803690);
    c = md5_gg(c, d, a, b, x[i +  3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i +  8], 20,  1163531501);
    a = md5_gg(a, b, c, d, x[i + 13],  5, -1444681467);
    d = md5_gg(d, a, b, c, x[i +  2],  9, -51403784);
    c = md5_gg(c, d, a, b, x[i +  7], 14,  1735328473);
    b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

    a = md5_hh(a, b, c, d, x[i +  5],  4, -378558);
    d = md5_hh(d, a, b, c, x[i +  8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i + 11], 16,  1839030562);
    b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i +  1],  4, -1530992060);
    d = md5_hh(d, a, b, c, x[i +  4], 11,  1272893353);
    c = md5_hh(c, d, a, b, x[i +  7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i + 13],  4,  681279174);
    d = md5_hh(d, a, b, c, x[i],      11, -358537222);
    c = md5_hh(c, d, a, b, x[i +  3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i +  6], 23,  76029189);
    a = md5_hh(a, b, c, d, x[i +  9],  4, -640364487);
    d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i + 15], 16,  530742520);
    b = md5_hh(b, c, d, a, x[i +  2], 23, -995338651);

    a = md5_ii(a, b, c, d, x[i],       6, -198630844);
    d = md5_ii(d, a, b, c, x[i +  7], 10,  1126891415);
    c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i +  5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i + 12],  6,  1700485571);
    d = md5_ii(d, a, b, c, x[i +  3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i +  1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i +  8],  6,  1873313359);
    d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i +  6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i + 13], 21,  1309151649);
    a = md5_ii(a, b, c, d, x[i +  4],  6, -145523070);
    d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i +  2], 15,  718787259);
    b = md5_ii(b, c, d, a, x[i +  9], 21, -343485551);

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return [a, b, c, d];
}

/*
* Convert an array of little-endian words to a string
*/
function binl2rstr(input) {
  var i,
    output = '';
  for (i = 0; i < input.length * 32; i += 8) {
    output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF);
  }
  return output;
}

/*
* Convert a raw string to an array of little-endian words
* Characters >255 have their high-byte silently ignored.
*/
function rstr2binl(input) {
  var i,
    output = [];
  output[(input.length >> 2) - 1] = undefined;
  for (i = 0; i < output.length; i += 1) {
    output[i] = 0;
  }
  for (i = 0; i < input.length * 8; i += 8) {
    output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32);
  }
  return output;
}

/*
* Calculate the MD5 of a raw string
*/
function rstr_md5(s) {
  return binl2rstr(binl_md5(rstr2binl(s), s.length * 8));
}

/*
* Calculate the HMAC-MD5, of a key and some data (raw strings)
*/
function rstr_hmac_md5(key, data) {
  var i,
    bkey = rstr2binl(key),
    ipad = [],
    opad = [],
    hash;
  ipad[15] = opad[15] = undefined;
  if (bkey.length > 16) {
    bkey = binl_md5(bkey, key.length * 8);
  }
  for (i = 0; i < 16; i += 1) {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }
  hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
  return binl2rstr(binl_md5(opad.concat(hash), 512 + 128));
}

/*
* Convert a raw string to a hex string
*/
function rstr2hex(input) {
  var hex_tab = '0123456789abcdef',
    output = '',
    x,
    i;
  for (i = 0; i < input.length; i += 1) {
    x = input.charCodeAt(i);
    output += hex_tab.charAt((x >>> 4) & 0x0F) +
      hex_tab.charAt(x & 0x0F);
  }
  return output;
}

/*
* Encode a string as utf-8
*/
function str2rstr_utf8(input) {
  return unescape(encodeURIComponent(input));
}

/*
* Take string arguments and return either raw or hex encoded strings
*/
function raw_md5(s) {
  return rstr_md5(str2rstr_utf8(s));
}
function hex_md5(s) {
  return rstr2hex(raw_md5(s));
}
function raw_hmac_md5(k, d) {
  return rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d));
}
function hex_hmac_md5(k, d) {
  return rstr2hex(raw_hmac_md5(k, d));
}

function md5_(string, key, raw) {
  if (!key) {
    if (!raw) {
      return hex_md5(string);
    }
    return raw_md5(string);
  }
  if (!raw) {
    return hex_hmac_md5(key, string);
  }
  return raw_hmac_md5(key, string);
}

var MD5 = function(d){var r = M(V(Y(X(d),8*d.length)));return r.toLowerCase()};function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}


function make_me_happy(t) {
  if ("number" == typeof t && (t = t.toString()),
  "string" != typeof t)
    return t;
  var e = MD5(t)
    , n = e.substr(0, 3)
    , r = function(t) {
    if (/^\d*$/.test(t)) {
      for (var e = t.length, n = [], r = 0; r < e; r += 9) {
        var i = t.slice(r, Math.min(r + 9, e));
        n.push(parseInt(i).toString(16))
      }
      return ["3", n]
    }
    for (var o = "", a = 0; a < t.length; a++) {
      o += t.charCodeAt(a).toString(16)
    }
    return ["4", [o]]
  }(t);
  n += r[0],
  n += 2 + e.substr(e.length - 2, 2);
  for (var i = r[1], o = 0; o < i.length; o++) {
    var a = i[o].length.toString(16);
    1 === a.length && (a = "0" + a),
    n += a,
    n += i[o],
    o < i.length - 1 && (n += "g")
  }
  return n.length < 20 && (n += e.substr(0, 20 - n.length)),
  n += MD5(n).substr(0, 3)
}


var onHeadersReceived = function (details) {
  for (var i = 0; i < details.responseHeaders.length; i++) {
    if (details.responseHeaders[i].name.toLowerCase() === 'content-security-policy') {
      details.responseHeaders[i].value = ''
    }
  }
  return {
    responseHeaders: details.responseHeaders
  }
}


var _init = function () {
  var onHeaderFilter = { urls: ['*://weread.qq.com/*'], types: ['main_frame', 'sub_frame'] }
  chrome.webRequest.onHeadersReceived.addListener(
    onHeadersReceived, onHeaderFilter, ['blocking', 'responseHeaders']
  )
}

_init()


chrome.webRequest.onBeforeSendHeaders.addListener(function (obj) {
  let bookid = obj.url.replace('https://weread.qq.com/web/book/bookmarklist?bookId=', '').replace('&type=1', '')
  for (var i = 0; i < obj.requestHeaders.length; ++i) {
    if (obj.requestHeaders[i].name === 'Referer') {
      obj.requestHeaders[i].value = 'https://weread.qq.com/web/reader/' + make_me_happy(bookid);
    }
  }
  return {requestHeaders: obj.requestHeaders}
}, {
  urls: ['https://weread.qq.com/web/book/bookmarklist*'],
}, ['blocking', 'requestHeaders', 'extraHeaders'])


chrome.webRequest.onBeforeRequest.addListener(
  function(obj) {
    console.log('**userVid**', obj.url)
    chrome.storage.local.set({viduri: obj.url})
    return {redirectUrl: obj.url}
  }, {
    urls: [
      '*://weread.qq.com/web/user?userVid=*',
    ],
    types: ["xmlhttprequest"],
  }, ['blocking']
)


function getCurrentTabId(callback) {
  chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    if (callback) {
      callback(tabs.length ? tabs[0].id: null)
    }
  })
}


function callbackMsg(payload) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, payload, function(response) {
      console.log(response)
    })
  })
}


function sendMsg(payload, tab) {
  chrome.tabs.sendMessage(tab.id, payload, function(response) {
    console.log(response)
  })
}

function WordBreaker(wordLimit, punctuator) {
  this.breakText = breakText;

  function breakText(text) {
    return merge(punctuator.getParagraphs(text), breakParagraph);
  }

  function breakParagraph(text) {
    return merge(punctuator.getSentences(text), breakSentence);
  }

  function breakSentence(sentence) {
    return merge(punctuator.getPhrases(sentence), breakPhrase);
  }

  function breakPhrase(phrase) {
    var words = punctuator.getWords(phrase);
    var splitPoint = Math.min(Math.ceil(words.length/2), wordLimit);
    var result = [];
    while (words.length) {
      result.push(words.slice(0, splitPoint).join(""));
      words = words.slice(splitPoint);
    }
    return result;
  }

  function merge(parts, breakPart) {
    var result = [];
    var group = {parts: [], wordCount: 0};

    var flush = function() {
      if (group.parts.length) {
        result.push(group.parts.join(""));
        group = {parts: [], wordCount: 0};
      }
    }

    parts.forEach(function(part) {
      var wordCount = punctuator.getWords(part).length;
      if (wordCount > wordLimit) {
        flush();
        var subParts = breakPart(part);
        for (var i=0; i<subParts.length; i++) result.push(subParts[i]);
      }
      else {
        if (group.wordCount + wordCount > wordLimit) flush();
        group.parts.push(part);
        group.wordCount += wordCount;
      }
    });
    flush();
    return result;
  }
}


function EastAsianPunctuator() {
  this.getParagraphs = function(text) {
    return recombine(text.split(/((?:\r?\n\s*){2,})/));
  }
  this.getSentences = function(text) {
    return recombine(text.split(/([.!?]+[\s\u200b]+|[\u3002\uff01]+)/));
  }
  this.getPhrases = function(sentence) {
    return recombine(sentence.split(/([,;:]\s+|[\u2025\u2026\u3000\u3001\uff0c\uff1b]+)/));
  }
  this.getWords = function(sentence) {
    return sentence.replace(/\s+/g, "").split("");
  }
  function recombine(tokens) {
    var result = [];
    for (var i=0; i<tokens.length; i+=2) {
      if (i+1 < tokens.length) result.push(tokens[i] + tokens[i+1]);
      else if (tokens[i]) result.push(tokens[i]);
    }
    return result;
  }
}


function _nativeSpeakText(words, lang, voiceName, rate, tab) {
  var current = words.shift()
  if (current && current.length > 0) {
    chrome.tts.speak(current, {lang: lang, voiceName: voiceName, rate: rate, onEvent: function(event) {
        if (event.type == 'end') {
          if (words.length > 0) {
            _nativeSpeakText(words, lang, voiceName, rate, tab)
          } else {
            sendMsg({
              action: 'speakEnd',
              data: {},
            }, tab)
          }
        }
      }
    })
  }
}


function nativeText(utterance, lang, voiceName, rate, tab) {
  var pun = new EastAsianPunctuator()
  var words = new WordBreaker(60, pun).breakText(utterance)
  _nativeSpeakText(words, lang, voiceName, rate, tab)
}


function speakText(utterance, lang, voiceName, rate, tab) {
  const gap = 300
  var current = utterance.slice(0, gap)

  if (current.length > 0) {
    chrome.tts.speak(current, {lang: lang, voiceName: voiceName, rate: rate, onEvent: function(event) {
        if (event.type === 'end') {
          if (utterance.slice(gap).length > 0) {
            speakText(utterance.slice(gap), lang, voiceName, rate, tab)
          } else {
            sendMsg({
              action: 'speakEnd',
              data: {},
            }, tab)
          }
        }
      }
    })
  }
}


chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  const action = request.action
  var msg = 'success'

  if (!action) {
    msg = 'fail'
    action = 'null'
  }

  if (action === 'speakText') {
    chrome.storage.local.get(['rate', 'voice'], function(result) {
      var rate = (result.rate || 14) / 10.0

      var lang = 'zh-CN'
      var voiceName = ''

      if (result.voice) {
        var _v = result.voice.split(',')
        if (_v.length == 1 && ['zh-CN', 'zh-TW', 'zh-HK'].indexOf(_v[0]) > -1) {
          lang = _v[0]
        }
        if (_v.length == 2 && ['zh-CN', 'zh-TW', 'zh-HK'].indexOf(_v[0]) > -1) {
          lang = _v[0]
          voiceName = _v[1].trim()
        }
      }

      if (/^Google\s/.test(voiceName)) {
        nativeText(request.text, lang, voiceName, rate, sender.tab)
      } else {
        speakText(request.text, lang, voiceName, rate, sender.tab)
      }
    })
  } else if (action === 'pauseText') {
    chrome.tts.isSpeaking(function(v) {
      if (v) {
        chrome.tts.pause()
      }
    })
  } else if (action === 'continueText') {
    chrome.tts.isSpeaking(function(v) {
      if (v) {
        chrome.tts.resume()
      }
    })
  } else if (action === 'stopText') {
    chrome.tts.isSpeaking(function(v) {
      if (v) {
        chrome.tts.stop()
      }
    })
  }

  sendResponse(`${action} _ ${msg}`)
})
