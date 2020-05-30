const version = chrome.runtime.getManifest().version


function setCookie(name,value,days) {
  var expires = "";
  if (days != 0) {
    var date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=.qnmlgb.tech";
}


function getExpireTime() {
  var date = new Date()
  return (date.getTime() + (3*365*24*60*60*1000)) / 1000
}


function getReadTimeStr(seconds) {
  if (seconds === 0) {
    return ' 未阅读'
  }
  let tt = ''
  if (seconds && Number.isInteger(seconds)) {
    let hours = Number.parseInt(seconds / 3600)
    let minutes = Number.parseInt((seconds - hours * 3600) / 60)

    if (hours > 0) {
      tt += `${hours} 小时 `
    }
    if (minutes > 0) {
      tt += `${minutes} 分钟`
    }
  }
  return tt
}


function sendMsg(payload, tab) {
  chrome.tabs.sendMessage(tab.id, payload, function(response) {
    console.log(response)
  })
}


function callbackMsg(payload) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, payload, function(response) {
      console.log(response)
    })
  })
}

chrome.storage.local.get(['userInfo', 'userShelf', 'userCardSummary', 'totalReadTime'], function(result) {
  let userInfo = result.userInfo
  let shelf = result.userShelf
  let card = result.userCardSummary
  let totalReadTime = result.totalReadTime

  let book_count = 0
  if (shelf && shelf.books) {
    book_count = shelf.books.length
  }

  let remainday = 0
  if (card && card.expiredTime) {
    remainday = Math.max(0, parseInt((card.expiredTime - Date.parse(new Date()) / 1000) / (24 * 60 * 60)))
  }

  console.log('**popup**', result, remainday)

  if (userInfo && userInfo.vid) {
    console.log('**storage**', userInfo)
    let _ui = $(`
    <a style="display: flex; flex-direction: row; justify-content: left; align-items: center;" href="https://weread.qq.com/" target="_blank">
      ${(userInfo.avatar && userInfo.avatar.length > 0) ? `<img src="${userInfo.avatar}" style="width: 20px; height: 20px; border-radius: 20px;" />` : `<div style="width: 20px; height: 20px; background-color: #e4e4e4; border-radius: 20px;"></div>`}
      <span style="margin-left: 5px; text-decoration: none; cursor: pointer; color: #259;">${userInfo.name}</span>
    </a>` + `<div style="margin-top: 5px; color: #5d646e;">vid: ${userInfo.vid}</div>
    ${remainday >= 0 ? `<div style="margin-top: 5px; color: #5d646e;">无限卡剩余: <span style="font-weight: bold;">${remainday}</span> 天</div>` : ''}
    <div style="margin-top: 5px; color: #5d646e;">本周阅读时长: ${getReadTimeStr(totalReadTime)}</div>
    <div style="margin-top: 5px; color: #5d646e;">书架: <a href="shelf.html" style="margin: 0 3px;">${book_count}</a>本</div>
    `)
    $('#webook_user_info').prepend(_ui)

  } else {
    let _ui = $(`
    <div style="display: flex; flex-direction: row; justify-content: left; align-items: center;">
      <a href="https://weread.qq.com/" target="_blank" style="text-decoration: none; cursor: pointer; color: #259;">⚡️ 前往登录微信读书</a>
    </div>
    `)
    $('#webook_user_info').prepend(_ui)
  }
})


function showToast(content) {
  $('#webook_toast').text(content)
  $('#webook_toast').css('display', 'block')
  setTimeout(function() {
    $('#webook_toast').css('display', 'none')
  }, 2000)
}


$(function() {
  $('#version').text(version)
  $('#clearme').click(function() {
    chrome.storage.local.clear()
    window.location.href = '/src/popup/popup.html'
  })
})

