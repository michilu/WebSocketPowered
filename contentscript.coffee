# Copyright (c) 2011 MiCHiLU Labs. All rights reserved.  Use of this
# source code is governed by a BSD-style license that can be found in the
# LICENSE file.
$ () ->
  isPowered = false
  checkWebSocketPowered = (src) ->
    if isPowered isnt true and src.match /WebSocket/
      isPowered = true
      chrome.extension.sendRequest {}, (response) ->
        return
    return
  for element in $("script:not([src])")
    if isPowered is true
      return
    src = $(element).text()
    if src isnt ""
      checkWebSocketPowered src
  for element in $("script:[src]")
    if isPowered is true
      return
    $.ajax
      url: $(element).attr("src")
      dataType: "text"
      success: (src) ->
        if isPowered isnt true
          checkWebSocketPowered src
        return
  return
return
