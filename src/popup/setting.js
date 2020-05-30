$(function() {
  $('#stop_player').click(function() {
    chrome.tts.isSpeaking(function(v) {
      if (v) {
        chrome.tts.stop()
      }
    })
  })
  $('#pause_player').click(function() {
    chrome.tts.isSpeaking(function(v) {
      if (v) {
        chrome.tts.pause()
      }
    })
  })
  $('#resume_player').click(function() {
    chrome.tts.isSpeaking(function(v) {
      if (v) {
        chrome.tts.resume()
      }
    })
  })

  $('#playalltime').click(function() {
    let _checked = $('#playalltime').prop('checked')
    chrome.storage.local.set({'playalltime': _checked ? 'true': null}, function() {})
  })

  $('#test_player').click(function() {
    chrome.storage.local.get(['rate', 'voice'], function(result) {
      let rate = (result.rate || 14) / 10.0
      let lang = 'zh-CN'
      let voiceName = ''

      if (result.voice) {
        let _v = result.voice.split(',')
        if (_v.length == 1 && ['zh-CN', 'zh-TW', 'zh-HK'].indexOf(_v[0]) > -1) {
          lang = _v[0]
        }
        if (_v.length == 2 && ['zh-CN', 'zh-TW', 'zh-HK'].indexOf(_v[0]) > -1) {
          lang = _v[0]
          voiceName = _v[1].trim()
        }
      }

      chrome.tts.speak('世界上本没有路，走的人多了，也便成了路。', {lang: lang, voiceName: voiceName, rate: rate, requiredEventTypes: ['end'], onEvent: function(event) {

        if (event.type == 'end') {
        }

      }}, function() {

        if (chrome.runtime.lastError) {
          alert(chrome.runtime.lastError.message);
        }
      })
    })
  })

  chrome.storage.local.get(['voice', 'rate', 'playalltime'], function(result) {
    chrome.tts.getVoices(function(voices) {
      let voiceHtml = ''
      let voiceList = []

      for (var i = 0; i < voices.length; i++) {

        if (['zh-CN', 'zh-TW', 'zh-HK'].indexOf(voices[i].lang) > -1) {
          let _val = `${voices[i].lang},${voices[i].voiceName}`
          voiceList.push(_val)
          voiceHtml += `<option value="${_val}">${_val}</option>`
        }
      }

      $('#voice').html(voiceHtml)

      let voice = result.voice
      if (voice && voiceList.indexOf(voice) > -1) {
        $('#voice').val(voice)
      }

    })



    let rate = result.rate
    if (result.rate) {
      $('#rate').val(rate)
    }

    let playalltime = result.playalltime
    if (playalltime) {
      $('#playalltime').prop('checked', true)
    }
  })
  $('#male_voice').click(function() {
    $('#male_voice').prop('checked', true)
    $('#female_voice').prop('checked', false)
    chrome.storage.local.set({'voice': 'male'}, function() {})
  })
  $('#female_voice').click(function() {
    $('#male_voice').prop('checked', false)
    $('#female_voice').prop('checked', true)
    chrome.storage.local.set({'voice': 'female'}, function() {})
  })
  $('#rate').on('input change', function() {
    chrome.storage.local.set({'rate': $('#rate').val()}, function() {})
  })
  $('#voice').on('select change', function() {
    chrome.storage.local.set({'voice': $('#voice').val()}, function() {})
  })
})
