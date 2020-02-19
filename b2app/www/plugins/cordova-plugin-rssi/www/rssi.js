cordova.define("cordova-plugin-rssi.RSSI", function(require, exports, module) {
'use strict';
const exec = require('cordova/exec');

const RSSI = {
  read : function(success, failure) {
      return exec(success, failure, "RSSI", "read", []);
  }
};

module.exports = RSSI;
});
