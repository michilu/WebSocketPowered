/*
 * Copyright (c) 2011 MiCHiLU Labs. All rights reserved.  Use of this
 * source code is governed by a BSD-style license that can be found in the
 * LICENSE file.
 */
(function() {
  $(function() {
    var checkWebSocketPowered, element, isPowered, src, _i, _j, _len, _len2, _ref, _ref2;
    isPowered = false;
    checkWebSocketPowered = function(src) {
      if (isPowered !== true && src.match(/WebSocket/)) {
        isPowered = true;
        chrome.extension.sendRequest({}, function(response) {});
      }
    };
    _ref = $("script:not([src])");
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      element = _ref[_i];
      if (isPowered === true) {
        return;
      }
      src = $(element).text();
      if (src !== "") {
        checkWebSocketPowered(src);
      }
    }
    _ref2 = $("script:[src]");
    for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
      element = _ref2[_j];
      if (isPowered === true) {
        return;
      }
      $.ajax({
        url: $(element).attr("src"),
        dataType: "text",
        success: function(src) {
          if (isPowered !== true) {
            checkWebSocketPowered(src);
          }
        }
      });
    }
  });
  return;
}).call(this);
