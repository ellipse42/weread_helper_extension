// ui.js

const version = chrome.runtime.getManifest().version
const zeroPad = (num, places) => String(num).padStart(places, '0')
const currentpath = window.location.toString()
const pathname = window.location.pathname
const homePage = 'https://weread.qq.com/'
const shelfPage = 'https://weread.qq.com/web/shelf'
const bookPage = '/web/reader/'


var shelfdict = {}


function getTimestamp() {
  return Math.floor(Date.now() / 1000)
}


function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000)
  var year = a.getFullYear()
  var month = zeroPad(a.getMonth()+1, 2)
  var day = zeroPad(a.getDate(), 2)
  var hour = zeroPad(a.getHours(), 2)
  var min = zeroPad(a.getMinutes(), 2)
  var sec = zeroPad(a.getSeconds(), 2)
  return `${year}.${month}.${day} ${hour}:${min}`
}


function getMondayTimestamp() {
  var ts = Date.now()
  var dt = new Date(ts)
  return (ts / 1000) - dt.getSeconds() - 60 * dt.getMinutes() - 3600 * dt.getHours() - Number.parseInt('6012345'[dt.getDay()]) * 24 * 3600
}


function showToast(msg) {
  let _toast_ui = `<div id="webook_toast" style="position: fixed; background-color: #f78d8d; color: #fff; border-radius: 6px; padding: 2px 10px; display: block; text-align: center; margin: 0 auto;left:50%;transform: translateX(-50%);z-index:99999; margin-top: 10px;">${msg}</div>`
  $('body').prepend(_toast_ui)
  setTimeout(function() {
    $('#webook_toast').remove()
  }, 1500)
}


function copy(str, mimeType) {
  document.oncopy = function(event) {
    event.clipboardData.setData(mimeType, str)
    event.preventDefault()
  }
  document.execCommand('copy', false, null)
}


function setScreen(px) {
  if (px > 0) {
    $('.app_content').css('max-width', `${px}px`)
    $('.readerTopBar').css('max-width', `${px}px`)
    $('.readerControls').css('margin-left', `${px / 2 + 48}px`)
    setTimeout(function() {
      window.dispatchEvent(new Event('resize'))
    }, 500)
  }
}


function resetScreen() {
  $('.app_content').css('max-width', '')
  $('.readerTopBar').css('max-width', '')
  $('.readerControls').css('margin-left', '')

  setTimeout(function() {
    window.dispatchEvent(new Event('resize'))
  }, 500)
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



function shelfInsertCheckbox() {
  $('.shelfBook').each(function() {
    var href = $(this).attr('href')
    if (href.startsWith('/web/reader/')) {
      var _key = href.replace('/web/reader/', '')
      if (shelfdict[_key]) {
        $(this).append($(`
        <div class="m_webook_shelf_checkbox" style="padding: 5px; display: flex; align-items: center; justify-content: center;">
          <input type="checkbox" data-id="${shelfdict[_key].bookId}" />
        </div>
        `))
        $(this).attr('id', `bookid-${shelfdict[_key].bookId}`)
      }
    }
  })
  $('input[type="checkbox"]').click(function(e) {
    e.stopPropagation()
  })
}


function shelfRemoveCheckbox() {
  $('.m_webook_shelf_checkbox').remove()
}


function shelfRemoveBook(bookIds) {
  var payload = {
    bookIds: bookIds,
    private: 1,
  }

  fetch('https://i.weread.qq.com/shelf/delete', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(resp => {
    return resp.json()
  }).then(data => {
    bookIds.forEach(function(_id) {
      $(`#bookid-${_id}`).remove()
    })
    $('.m_webook_shelf_checkbox > input').prop('checked', false)
    showToast('👏 移除成功')
  })
}


function shelfMakeBookPrivate(bookIds) {
  var payload = {
    bookIds: bookIds,
    private: 1,
  }
  fetch('https://i.weread.qq.com/book/secret', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(resp => {
    return resp.json()
  }).then(data => {
    bookIds.forEach(function(_id) {
      if ($(`#bookid-${_id} > .wr_bookCover > .wr_bookCover_privateTag`).length === 0) {
        $(`#bookid-${_id} > .wr_bookCover`).prepend($(`<span class="wr_bookCover_privateTag"></span>`))
      }
    })
    $('.m_webook_shelf_checkbox > input').prop('checked', false)
    showToast('👏 操作成功')
  })
}


function shelfMakeBookPublic(bookIds) {
  var payload = {
    bookIds: bookIds,
    private: 0,
  }

  fetch('https://i.weread.qq.com/book/secret', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(resp => {
    return resp.json()
  }).then(data => {
    bookIds.forEach(function(_id) {
      $(`#bookid-${_id} > .wr_bookCover > .wr_bookCover_privateTag`).remove()
    })
    $('.m_webook_shelf_checkbox > input').prop('checked', false)
    showToast('👏 操作成功')
  })
}


function shelfSelectAll() {
  var isall = false
  $('.m_webook_shelf_checkbox > input').each(function() {
    if (!$(this).is(':checked')) {
      isall = true
    }
  })

  if (isall) {
    $('.m_webook_shelf_checkbox > input').prop('checked', true)
  } else {
    $('.m_webook_shelf_checkbox > input').prop('checked', false)
  }
}


function gettext() {
  let textarr = []
  $('span.wr_absolute').each(function() {
    let obj = $(this)
    if (obj.css('left') && obj.css('top')) {
      textarr.push({top: parseInt(obj.css('top').replace('px', '')), left: parseInt(obj.css('left').replace('px', '')), text: obj.text()})
    }
  })

  var content = ''
  _(_.sortBy(textarr, ['top', 'left'])).forEach(function(val) {
    content += val['text']
  })

  return content
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


async function fetchNotes(bookIds) {
  let notes = []
  for(let i=0;i<bookIds.length;i++) {
    let resp = await fetch(`https://weread.qq.com/web/book/bookmarklist?bookId=${bookIds[i]}&type=1`)
    let data = await resp.json()
    notes.push(data)
    await sleep(500)
  }
  return notes
}


function _zudui(force) {
  let forceVid = null

  fetch('https://weread.qq.com/wrpage/huodong/abtest/zudui').then(function(resp) {
    return resp.text()
  }).then(function(data) {
      let doc = $(data)
      let memberCount = 0
      doc.find('.members_list > div.wr_avatar').each(function(idx) {
        let vid = $(this).data('vid')
        if (vid) {
          memberCount += 1
        }
        if (idx == 0 && vid) {
          forceVid = vid
        }
      })
      if (force && memberCount != 5) {
        if (!forceVid) {
          let _m = data.match(/data \+= '&vid=' \+ encodeURIComponent\('(.*)'\)/)
          if (_m) {
            forceVid = _m[1]
          } else {
            _m = ak.match(/<script>config\.vid = \+'(.*)'<\/script>/)
            if (_m) {
              forceVid = _m[1]
            }
          }
        }
        if (forceVid) {
          console.log('**forceVid**', forceVid)
          $.ajax({
            method: "POST",
            url: "https://weread.qnmlgb.tech/submit?ref=chrome",
            data: JSON.stringify({'url': forceVid.toString()}),
            contentType: "application/json",
          }).done(function( msg ) {
            console.log('**resp**', msg)
            showToast('提交成功，耐心等待')
          })
        } else {
          showToast('💥 请登录')
        }
      }

      if (memberCount == 0) {
        let _m = data.match(/csrfToken:.*'(.*)'/)
        if (_m) {
          console.log('csrfToken', _m[1])
          fetch('https://weread.qq.com/wrpage/infinite/lottery/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `csrfToken=${_m[1]}`,
          }).then(function(resp) {
            return resp.json()
          }).then(function(data) {
            console.log('*data**', data)
            if (data && data.result && data.result.humanMessage) {
              showToast('💥 需先在微信读书网站（weread.qq.com）上登录')
            }
            let _obj = data
            if (_obj && Number.isInteger(_obj.lackMembers)) {
              if (_obj.lackMembers == 0) {
                showToast('👏 已组完')
              } else {
                showToast(`🐼 还差 ${_obj.lackMembers} 个`)
              }
            }
          }).catch((err) => {
            showToast('微信读书服务器故障')
          })
        }
      } else if (memberCount == 5) {
        showToast('👏 已组完')
      } else {
        showToast(`🐼 还差 ${5 - memberCount} 个`)
      }
  }).catch(function(err) {
    showToast('微信读书服务器故障')
  })
}

$(document).ready(function() {

  for (var i = 1; i < 99999; i++) {
     window.clearInterval(i);
  }

  var _css = `
  @media (max-width: 1120px) {
    .m_shelf_admin {
      padding: 0 40px;
    }
  }

  @media (max-width: 960px) {
    .m_shelf_admin {
      padding: 0 30px;
    }
  }

  @media (max-width: 680px) {
    .m_shelf_admin {
      padding: 0 30px;
    }
  }

  .m_shelf_admin > a:hover {
    font-weight: bold;
  }

  .webook_box_btn:hover {
    font-weight: bold;
  }

  .webook_round {
    position: relative;
  }

  .webook_round label {
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 50%;
    cursor: pointer;
    height: 14px;
    left: 0;
    position: absolute;
    top: 0;
    width: 14px;
  }

  .webook_round label:after {
    border: 2px solid #fff;
    border-top: none;
    border-right: none;
    content: "";
    height: 6px;
    left: 7px;
    opacity: 0;
    position: absolute;
    top: 8px;
    transform: rotate(-45deg);
    width: 12px;
  }

  .webook_round input[type="checkbox"] {
    visibility: hidden;
  }

  .webook_round input[type="checkbox"]:checked + label {
    background-color: #66bb6a;
    border-color: #66bb6a;
  }

  .webook_round input[type="checkbox"]:checked + label:after {
    opacity: 1;
  }

  .css_ui_1 {
    background-color: #e2e2e4;
  }
  `

  $('body').prepend(`<style>${_css}</style>`)

  // 助手Bar
  var rightColor = '#595a5a'
  if ($('.readerControls_item.white').length > 0) {
    rightColor = 'white'
  }

  var _right_nav = $(`
  <a id="webook_master" href="javascript:" title="助手" class="readerControls_item">
    <span class="" style="font-weight: bold; color: ${rightColor} ;">助手</span>
  </a>
  `)

  // 当前宽度
  var _def_max_width = 0
  var _app_content = $('.app_content')
  if (_app_content) {
    var _max_width = _app_content.css('max-width')
    if (_max_width) {
      var _px = Number.parseInt(_max_width.replace('px', ''))
      if (_px) {
        _def_max_width = _px
      }
    }
  }

  //
  var _webookBox = $(`
    <div id="webook_box" class="wr_dialog" style="display: none;">
      <div class="wr_dialog_mask"></div>
      <div class="wr_dialog_container wr_dialog_bg">
        <a href="javascript:" class="wr_dialog_closeButton webook_dialog_closeButton">close</a>
        <div style="width: 200px;">
          <div style="margin-top: 40px; margin-bottom: 40px; display: flex; padding: 5px; font-size: 14px; align-items: center; flex-direction: column;">

            <div class="webook_box_btn" id="webook_export_note" style="width: 140px; background-color: #2196F3; color: white; padding: 3px 10px; margin: 5px; cursor: pointer; border-radius: 4px;">
              导出笔记到剪贴板
            </div>

            <div style="margin-top: 10px; color: #c7c6c6; font-size: 13px;">设置背景</div>
            <div style="display: flex; flex-direction: row; margin-top: 5px;">
              <div id="webook_ui_1" style="background-color: #e2e2e4; width: 24px; height: 24px; margin: 0 5px; cursor: pointer;" data-color="#e2e2e4"></div>
              <div id="webook_ui_2" style="background-color: #e1dac7; width: 24px; height: 24px; margin: 0 5px; cursor: pointer;" data-color="#e1dac7"></div>
              <div id="webook_ui_3" style="background-color: #b3d6b4; width: 24px; height: 24px; margin: 0 5px; cursor: pointer;" data-color="#b3d6b4"></div>
              <div id="webook_ui_4" style="background-color: #ffc107; width: 24px; height: 24px; margin: 0 5px; cursor: pointer;" data-color="#ffc107"></div>
            </div>

            <div style="margin-top: 10px; color: #c7c6c6; font-size: 13px;">屏幕</div>
            <div style="display: flex; flex-direction: row; margin-top: 5px;">
              <div id="webook_screen_1_0" style="color: #a1a1a1; margin: 0 5px; cursor: pointer; font-size: 13px;">默认</div>
              <div id="webook_screen_1_2" style="color: #a1a1a1; margin: 0 5px; cursor: pointer; font-size: 13px;">1.2</div>
              <div id="webook_screen_1_4" style="color: #a1a1a1; margin: 0 5px; cursor: pointer; font-size: 13px;">1.4</div>
              <div id="webook_screen_1_6" style="color: #a1a1a1; margin: 0 5px; cursor: pointer; font-size: 13px;">1.6</div>
              <div id="webook_screen_2_0" style="color: #a1a1a1; margin: 0 5px; cursor: pointer; font-size: 13px;">2.0</div>
            </div>

          </div>
        </div>
      </div>
    </div>
  `)


  if (pathname.startsWith(bookPage)) {

    setTimeout(function() {
      $('.readerControls').prepend(_right_nav)
      $('body').append(_webookBox)

      $('#webook_master').click(function() {
        $('#webook_box').show()
      })

      $('.webook_dialog_closeButton').click(function() {
        $('#webook_box').hide()
        $('#webook_assist_box').hide()
      })

      $('#webook_export_note').click(function(idx, ele) {
        var header = $('title').text().split('-').slice(0, 2).join('\n') + '\n\n'
        var txt = ''
        $('.readerNoteList > .sectionListItem').each(function() {
          var titleobj = $(this).find('.sectionListItem_title')
          if (titleobj.length > 0) {
            txt += `\n◆ ${titleobj[0].innerText}\n`
          }

          var noteobj = $(this).find('.sectionListItem_content')
          if (noteobj.length > 0) {
            for(var i=0; i<noteobj.length; i++) {
              txt += `\n>> ${noteobj[i].innerText}\n`
            }
          }
        })

        if (txt.length === 0) {
          showToast('没发现此书的笔记')
          return
        }

        copy(header + txt, 'text/plain;charset=UTF-8')
        showToast('👏 已成功导出笔记到剪贴板')
      })

      $('#webook_player').click(function() {
        let _content = document.body.getAttribute('data-bbq') + gettext()
        if (_content.length > 0) {
          chrome.runtime.sendMessage({text: _content, action: 'speakText'}, function(resp) {
            showToast('👏 开始播放')
          })
        } else {
          showToast('没找到本章的内容')
        }
      })

      $('#webook_player_pause').click(function() {
        chrome.runtime.sendMessage({text: '', action: 'pauseText'}, function(resp) {})
      })

      $('#webook_player_continue').click(function() {
        chrome.runtime.sendMessage({text: '', action: 'continueText'}, function(resp) {})
      })

      $('#webook_player_stop').click(function() {
        chrome.runtime.sendMessage({text: '', action: 'stopText'}, function(resp) {})
      })

      chrome.storage.local.get(['webook_ui'], function(result) {
        let webook_ui = result.webook_ui
        if (webook_ui) {
          let _obj = $(`#${webook_ui}`)
          if (_obj.length > 0) {
            _obj[0].click()
          }
        }
      })

      function set_webook_ui(color) {
        var _w = $('.readerControls_item.white')
        if (_w.length > 0) {
          $('.readerControls_item.white')[0].click()
        }
        $('.readerChapterContent').css('background-color', color)
        $('.app_content').css('background-color', color)
        $('.readerTopBar').css('background-color', color)
        $('.wr_canvasContainer canvas').css('background-color', color)
        $('#webook_master span').css('color', '#595a5a')
      }

      $('#webook_screen_1_0').click(function() {
        resetScreen()
        chrome.storage.local.remove('webook_screen')
      })

      $('#webook_screen_1_2').click(function() {
        setScreen(_def_max_width * 1.2)
        chrome.storage.local.set({'webook_screen': '1.2'})
      })

      $('#webook_screen_1_4').click(function() {
        setScreen(_def_max_width * 1.4)
        chrome.storage.local.set({'webook_screen': '1.4'})
      })

      $('#webook_screen_1_6').click(function() {
        setScreen(_def_max_width * 1.6)
        chrome.storage.local.set({'webook_screen': '1.6'})
      })

      $('#webook_screen_2_0').click(function() {
        setScreen(_def_max_width * 2.0)
        chrome.storage.local.set({'webook_screen': '2.0'})
      })

      $('#webook_ui_1').click(function(e) {
        console.log('webook_ui_1')
        let _c = $(this).data('color')
        chrome.storage.local.set({'webook_ui': 'webook_ui_1'})
        set_webook_ui(_c)
      })

      $('#webook_ui_2').click(function(e) {
        console.log('webook_ui_2')
        let _c = $(this).data('color')
        chrome.storage.local.set({'webook_ui': 'webook_ui_2'})
        set_webook_ui(_c)
      })

      $('#webook_ui_3').click(function(e) {
        console.log('webook_ui_3')
        let _c = $(this).data('color')
        chrome.storage.local.set({'webook_ui': 'webook_ui_3'})
        set_webook_ui(_c)
      })

      $('#webook_ui_4').click(function(e) {
        console.log('webook_ui_4')
        let _c = $(this).data('color')
        chrome.storage.local.set({'webook_ui': 'webook_ui_4'})
        set_webook_ui(_c)
      })

      $('.readerControls_item.dark').click(function(e) {
        $('.readerChapterContent').css('background-color', '')
        $('.app_content').css('background-color', '')
        $('.readerTopBar').css('background-color', '')
        $('.wr_canvasContainer canvas').css('background-color', '')
        chrome.storage.local.set({'webook_ui': null})
        let rightColor = '#595a5a'
        if ($('.readerControls_item.white').length > 0) {
          rightColor = 'white'
        }
        $('#webook_master span').css('color', rightColor)
      })

      $('.readerControls_item.white').click(function(e) {
        console.log('click dark')
        $('.readerChapterContent').css('background-color', '')
        $('.app_content').css('background-color', '')
        $('.readerTopBar').css('background-color', '')
        $('.wr_canvasContainer canvas').css('background-color', '')
        chrome.storage.local.set({'webook_ui': null})
        var rightColor = '#595a5a'
        if ($('.readerControls_item.white').length > 0) {
          rightColor = 'white'
        }
        $('#webook_master span').css('color', rightColor)
      })
    }, 1000)

    chrome.storage.local.get('webook_screen', function(result) {
      var screen = result.webook_screen
      if (screen && Number.parseFloat(screen)) {
        setScreen(_def_max_width * Number.parseFloat(screen))
      }
    })
  }

  if (currentpath === homePage || currentpath === shelfPage) {
    setTimeout(function() {
      chrome.storage.local.get(['viduri', 'last_user_info'], function(result) {
        var viduri = result.viduri
        var last_user_info = result.last_user_info
        if (!viduri) return

        if (last_user_info && (last_user_info + 300) > getTimestamp()) return
        fetch(viduri).then(function(resp) {
          return resp.json()
        }).then(function(data) {
          data['vid'] = data['userVid']
          chrome.storage.local.set({'userInfo': data, 'last_user_info': getTimestamp()}, function() {})
        })
      })
    }, 500)

    setTimeout(function() {
      chrome.storage.local.get(['userInfo'], function(result) {
        var userInfo = result.userInfo
        if (userInfo && userInfo.vid) {
          fetch(`https://i.weread.qq.com/readdetail?baseTimestamp=${getMondayTimestamp()}&count=1&type=0`).then(function(resp) {
            return resp.json()
          }).then(function(data) {
            if (data && data.datas && data.datas.length > 0) {
              var _data = data.datas[0]
              if (_data.timeMeta && _data.timeMeta.totalReadTime != undefined) {
                chrome.storage.local.set({'totalReadTime': _data.timeMeta.totalReadTime})
              }
            }
          })
        }
      })
    }, 2000)

    setTimeout(function() {
      chrome.storage.local.get(['last_card_summary'], function(result) {
        let last_card_summary = result.last_card_summary
        if (last_card_summary && (last_card_summary + 300) > getTimestamp()) return
        fetch('https://weread.qq.com/web/pay/memberCardSummary?pf=ios').then(function(resp) {
          return resp.json()
        }).then(function(data) {
          chrome.storage.local.set({userCardSummary: data, last_card_summary: getTimestamp()})
        })
      })
    }, 2000)

    fetch('https://weread.qq.com/web/shelf').then(function(resp) {return resp.text()}).then(function(data) {
      var initdata = JSON.parse(data.match(/window\.__INITIAL_STATE__\=({.*?});/)[1])
      if (initdata.shelf.books) {
        var books = initdata.shelf.books
        for(var i=0;i<books.length;i++) {
          shelfdict[make_me_happy(books[i].bookId)] = books[i]
        }
      }
      if (initdata.shelf) {
        chrome.storage.local.set({'userShelf': initdata.shelf}, function() {})
      }
    })
  }

  var _shelfBox = $(`
    <div style="display: flex; flex-direction: row; font-size: 14px; color: gray; margin-top: 10px;" class="m_shelf_admin">
      <a class="m_webook_shelf_mp" style="padding: 5px 0; margin-right:10px; cursor: pointer; color: #5d646e;" data-status="close">查看公众号</a>
      <a class="m_webook_shelf_admin" style="padding: 5px 0; margin-right:10px; cursor: pointer; color: #5d646e;" data-status="close">整理书架</a>
      <a class="op m_webook_shelf_remove_book" style="padding: 5px 0; margin-right:10px; cursor: pointer; color: #5d646e; display:none;">移出</a>
      <a class="op m_webook_shelf_make_book_private" style="padding: 5px 0; margin-right:10px; cursor: pointer; color: #5d646e; display:none;">私密阅读</a>
      <a class="op m_webook_shelf_make_book_public" style="padding: 5px 0; margin-right:10px; cursor: pointer; color: #5d646e; display:none;">公开阅读</a>
      <a class="op m_webook_shelf_select_all" style="padding: 5px 0; margin-right:10px; cursor: pointer; color: #5d646e; display:none;">全选</a>
    </div>
  `)

  var shelf_download_app = $('.shelf_download_app')
  if (shelf_download_app) {
    shelf_download_app.remove()
  }

  $('.shelf_header').after(_shelfBox)

  let _mpBox = $(`
    <div id="webook_mp_box" class="wr_dialog" style="display: none;">
      <div class="wr_dialog_mask"></div>
      <div class="wr_dialog_container wr_dialog_bg">
        <a href="#" class="wr_dialog_closeButton mp_dialog_closeButton">close</a>
        <div id="webook_mp_scroll" style="width: 400px; height: 600px; overflow-y: scroll;">
          <div style="margin-top: 40px; margin-bottom: 40px; padding: 5px; font-size: 14px; display: flex; flex-direction: column;">
              <div id="webook_mp_list" style="display: flex; flex-direction: column; text-align: left; padding: 0 10px;">
              </div>
              <div id="webook_mp_load_more" style="cursor: pointer; background-color: #eceaea; border-radius: 3px; font-weight: bold; padding: 8px; margin: 0 20px; color: white;">加载更多</div>
          </div>
        </div>
      </div>
    </div>
  `)

  if (currentpath === shelfPage) {
    $('body').append(_mpBox)
    $('.mp_dialog_closeButton').click(function() {
      $('#webook_box').hide()
      $('#webook_assist_box').hide()
      document.getElementById('webook_mp_scroll').scroll(0, 0)
      document.getElementById('webook_mp_box').style.display = 'none'
    })
  }

  $('.m_webook_shelf_mp').click(function() {
    let status = $(this).data('status')
    if (status == 'open') {
      $(this).text('查看公众号')
      $(this).data('status', 'close')
      $('a.webook_mp').remove()
      return
    }
    $(this).text('收起公众号')
    $(this).data('status', 'open')

    fetch('https://i.weread.qq.com/shelf/sync?synckey=0', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    }).then(resp => {
      return resp.json()
    }).then(data => {
      if (!data.books) return
      let mps = []
      data.books.forEach(each => {
        if (each.bookId.startsWith('MP_WXS_')) {
          mps.push(each)
          shelfdict[make_me_happy(each.bookId)] = each
        }
      })
      if (mps.length == 0) return

      _(_.sortBy(mps, ['version'])).forEach(function(mp) {
        $('.shelf_list').prepend($(`<a href="/web/reader/${make_me_happy(mp.bookId)}" class="shelfBook webook_mp" data-id="${mp.bookId}"><div class="wr_bookCover cover">${mp.secret ? '<span class="wr_bookCover_privateTag"></span>': ''}<!----><!----><img src="${mp.cover.replace('http://', 'https://')}" alt="书籍封面" class="wr_bookCover_img"><div class="wr_bookCover_border"></div><span class="wr_bookCover_decor wr_bookCover_gradientDecor wr_bookCover_borderDecor"></span></div><div class="title">${mp.title}</div><!----></a>`))
      })

      $('.webook_mp').click(function(e) {
        e.preventDefault()
        let bookId = $(this).data('id')
        if (!bookId) return
        fetch(`https://i.weread.qq.com/book/articles?bookId=${bookId}&count=10&offset=0`).then(function(resp) {
          return resp.json()
        }).then(function(data) {
          if (!data.reviews) return
          let _html = ''
          data.reviews.forEach(function(each) {
            if (each.review && each.review.mpInfo) {
              let mpInfo = each.review.mpInfo
              _html += `
                <div style="padding: 8px 5px; display: flex; flex-direction: row; justify-content: space-between;"><div><a href="${mpInfo.doc_url}" target="_blank" style="font-weight: bold; font-size: 14px;">${mpInfo.title}</a><div style="font-size: 12px; font-weight: normal; color: #9e9e9e; margin-top: 5px;">${timeConverter(mpInfo.time)}</div></div><div><img src="${mpInfo.pic_url}" style="width: 50px; height: 50px; margin-left: 8px; border-radius: 3px;" /></div></div>
              `
            }
          })
          $('#webook_mp_list').html(_html)
          $('#webook_mp_load_more').data('bookid', bookId)
          $('#webook_mp_load_more').data('offset', 10)
          $('#webook_mp_box').css('display', 'block')
        })
      })
    })
  })

  $('#webook_mp_load_more').click(function() {
    let bookId = $(this).data('bookid')
    let offset = $(this).data('offset')
    if (!bookId || !offset) return

    fetch(`https://i.weread.qq.com/book/articles?bookId=${bookId}&count=10&offset=${offset}`).then(function(resp) {
      return resp.json()
    }).then(function(data) {
      if (!data.reviews || data.reviews.length == 0) return

      let _html = ''
      data.reviews.forEach(function(each) {
        if (each.review && each.review.mpInfo) {
          let mpInfo = each.review.mpInfo
          _html += `
            <div style="padding: 8px 5px; display: flex; flex-direction: row; justify-content: space-between;"><div><a href="${mpInfo.doc_url}" target="_blank" style="font-weight: bold; font-size: 14px;">${mpInfo.title}</a><div style="font-size: 12px; font-weight: normal; color: #9e9e9e; margin-top: 5px;">${timeConverter(mpInfo.time)}</div></div><div><img src="${mpInfo.pic_url}" style="width: 50px; height: 50px; margin-left: 8px; border-radius: 3px;" /></div></div>
          `
        }
      })
      $('#webook_mp_list').append(_html)
      $('#webook_mp_load_more').data('bookid', bookId)
      $('#webook_mp_load_more').data('offset', Number.parseInt(offset)+10)
    })
  })

  $('.m_webook_shelf_admin').click(function() {
    let status = $(this).data('status')
    if (status == 'close') {
      shelfInsertCheckbox()
      $('.m_shelf_admin > a.op').css('display', 'block')
      $(this).data('status', 'open')
    } else {
      shelfRemoveCheckbox()
      $('.m_shelf_admin > a.op').css('display', 'none')
      $(this).data('status', 'close')
    }
  })

  $('.m_webook_shelf_make_book_private').click(function() {
    let bookIds = []
    $('.m_webook_shelf_checkbox > input').each(function() {
      if ($(this).is(':checked')) {
        bookIds.push($(this).data('id').toString())
      }
    })
    if (bookIds.length > 0) {
      shelfMakeBookPrivate(bookIds)
    }
  })

  $('.m_webook_shelf_make_book_public').click(function() {
    let bookIds = []
    $('.m_webook_shelf_checkbox > input').each(function() {
      if ($(this).is(':checked')) {
        bookIds.push($(this).data('id').toString())
      }
    })
    if (bookIds.length > 0) {
      shelfMakeBookPublic(bookIds)
    }
  })

  $('.m_webook_shelf_remove_book').click(function() {
    let bookIds = []
    $('.m_webook_shelf_checkbox > input').each(function() {
      if ($(this).is(':checked')) {
        bookIds.push($(this).data('id').toString())
      }
    })
    if (bookIds.length > 0) {
      shelfRemoveBook(bookIds)
    }
  })

  $('.m_webook_shelf_select_all').click(function() {
    shelfSelectAll()
  })
})
