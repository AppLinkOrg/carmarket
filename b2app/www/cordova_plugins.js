cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-clipboard/www/clipboard.js",
        "id": "cordova-clipboard.Clipboard",
        "pluginId": "cordova-clipboard",
        "clobbers": [
            "cordova.plugins.clipboard"
        ]
    },
    {
        "file": "plugins/cordova-plugin-adam-alipay/www/alipay.js",
        "id": "cordova-plugin-adam-alipay.Alipay",
        "pluginId": "cordova-plugin-adam-alipay",
        "merges": [
            "Alipay"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/DirectoryEntry.js",
        "id": "cordova-plugin-file.DirectoryEntry",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.DirectoryEntry"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/DirectoryReader.js",
        "id": "cordova-plugin-file.DirectoryReader",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.DirectoryReader"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/Entry.js",
        "id": "cordova-plugin-file.Entry",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.Entry"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/File.js",
        "id": "cordova-plugin-file.File",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.File"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/FileEntry.js",
        "id": "cordova-plugin-file.FileEntry",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.FileEntry"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/FileError.js",
        "id": "cordova-plugin-file.FileError",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.FileError"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/FileReader.js",
        "id": "cordova-plugin-file.FileReader",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.FileReader"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/FileSystem.js",
        "id": "cordova-plugin-file.FileSystem",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.FileSystem"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/FileUploadOptions.js",
        "id": "cordova-plugin-file.FileUploadOptions",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.FileUploadOptions"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/FileUploadResult.js",
        "id": "cordova-plugin-file.FileUploadResult",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.FileUploadResult"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/FileWriter.js",
        "id": "cordova-plugin-file.FileWriter",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.FileWriter"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/Flags.js",
        "id": "cordova-plugin-file.Flags",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.Flags"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/LocalFileSystem.js",
        "id": "cordova-plugin-file.LocalFileSystem",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.LocalFileSystem"
        ],
        "merges": [
            "window"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/Metadata.js",
        "id": "cordova-plugin-file.Metadata",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.Metadata"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/ProgressEvent.js",
        "id": "cordova-plugin-file.ProgressEvent",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.ProgressEvent"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/fileSystems.js",
        "id": "cordova-plugin-file.fileSystems",
        "pluginId": "cordova-plugin-file"
    },
    {
        "file": "plugins/cordova-plugin-file/www/requestFileSystem.js",
        "id": "cordova-plugin-file.requestFileSystem",
        "pluginId": "cordova-plugin-file",
        "clobbers": [
            "window.requestFileSystem"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/resolveLocalFileSystemURI.js",
        "id": "cordova-plugin-file.resolveLocalFileSystemURI",
        "pluginId": "cordova-plugin-file",
        "merges": [
            "window"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/browser/isChrome.js",
        "id": "cordova-plugin-file.isChrome",
        "pluginId": "cordova-plugin-file",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-file/www/browser/Preparing.js",
        "id": "cordova-plugin-file.Preparing",
        "pluginId": "cordova-plugin-file",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-file/src/browser/FileProxy.js",
        "id": "cordova-plugin-file.browserFileProxy",
        "pluginId": "cordova-plugin-file",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-file/www/fileSystemPaths.js",
        "id": "cordova-plugin-file.fileSystemPaths",
        "pluginId": "cordova-plugin-file",
        "merges": [
            "cordova"
        ],
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-file/www/browser/FileSystem.js",
        "id": "cordova-plugin-file.firefoxFileSystem",
        "pluginId": "cordova-plugin-file",
        "merges": [
            "window.FileSystem"
        ]
    },
    {
        "file": "plugins/cordova-plugin-advanced-http/www/cookie-handler.js",
        "id": "cordova-plugin-advanced-http.cookie-handler",
        "pluginId": "cordova-plugin-advanced-http"
    },
    {
        "file": "plugins/cordova-plugin-advanced-http/www/dependency-validator.js",
        "id": "cordova-plugin-advanced-http.dependency-validator",
        "pluginId": "cordova-plugin-advanced-http"
    },
    {
        "file": "plugins/cordova-plugin-advanced-http/www/error-codes.js",
        "id": "cordova-plugin-advanced-http.error-codes",
        "pluginId": "cordova-plugin-advanced-http"
    },
    {
        "file": "plugins/cordova-plugin-advanced-http/www/global-configs.js",
        "id": "cordova-plugin-advanced-http.global-configs",
        "pluginId": "cordova-plugin-advanced-http"
    },
    {
        "file": "plugins/cordova-plugin-advanced-http/www/helpers.js",
        "id": "cordova-plugin-advanced-http.helpers",
        "pluginId": "cordova-plugin-advanced-http"
    },
    {
        "file": "plugins/cordova-plugin-advanced-http/www/js-util.js",
        "id": "cordova-plugin-advanced-http.js-util",
        "pluginId": "cordova-plugin-advanced-http"
    },
    {
        "file": "plugins/cordova-plugin-advanced-http/www/local-storage-store.js",
        "id": "cordova-plugin-advanced-http.local-storage-store",
        "pluginId": "cordova-plugin-advanced-http"
    },
    {
        "file": "plugins/cordova-plugin-advanced-http/www/lodash.js",
        "id": "cordova-plugin-advanced-http.lodash",
        "pluginId": "cordova-plugin-advanced-http"
    },
    {
        "file": "plugins/cordova-plugin-advanced-http/www/messages.js",
        "id": "cordova-plugin-advanced-http.messages",
        "pluginId": "cordova-plugin-advanced-http"
    },
    {
        "file": "plugins/cordova-plugin-advanced-http/www/ponyfills.js",
        "id": "cordova-plugin-advanced-http.ponyfills",
        "pluginId": "cordova-plugin-advanced-http"
    },
    {
        "file": "plugins/cordova-plugin-advanced-http/www/public-interface.js",
        "id": "cordova-plugin-advanced-http.public-interface",
        "pluginId": "cordova-plugin-advanced-http"
    },
    {
        "file": "plugins/cordova-plugin-advanced-http/www/umd-tough-cookie.js",
        "id": "cordova-plugin-advanced-http.tough-cookie",
        "pluginId": "cordova-plugin-advanced-http"
    },
    {
        "file": "plugins/cordova-plugin-advanced-http/www/url-util.js",
        "id": "cordova-plugin-advanced-http.url-util",
        "pluginId": "cordova-plugin-advanced-http"
    },
    {
        "file": "plugins/cordova-plugin-advanced-http/www/advanced-http.js",
        "id": "cordova-plugin-advanced-http.http",
        "pluginId": "cordova-plugin-advanced-http",
        "clobbers": [
            "cordova.plugin.http"
        ]
    },
    {
        "file": "plugins/cordova-plugin-advanced-http/src/browser/cordova-http-plugin.js",
        "id": "cordova-plugin-advanced-http.http-proxy",
        "pluginId": "cordova-plugin-advanced-http",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-dialogs/www/notification.js",
        "id": "cordova-plugin-dialogs.notification",
        "pluginId": "cordova-plugin-dialogs",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "file": "plugins/cordova-plugin-dialogs/www/browser/notification.js",
        "id": "cordova-plugin-dialogs.notification_browser",
        "pluginId": "cordova-plugin-dialogs",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "file": "plugins/cordova-plugin-nativestorage/www/mainHandle.js",
        "id": "cordova-plugin-nativestorage.mainHandle",
        "pluginId": "cordova-plugin-nativestorage",
        "clobbers": [
            "NativeStorage"
        ]
    },
    {
        "file": "plugins/cordova-plugin-nativestorage/www/LocalStorageHandle.js",
        "id": "cordova-plugin-nativestorage.LocalStorageHandle",
        "pluginId": "cordova-plugin-nativestorage"
    },
    {
        "file": "plugins/cordova-plugin-nativestorage/www/NativeStorageError.js",
        "id": "cordova-plugin-nativestorage.NativeStorageError",
        "pluginId": "cordova-plugin-nativestorage"
    },
    {
        "file": "plugins/cordova-plugin-apprate/www/AppRate.js",
        "id": "cordova-plugin-apprate.AppRate",
        "pluginId": "cordova-plugin-apprate",
        "clobbers": [
            "AppRate"
        ]
    },
    {
        "file": "plugins/cordova-plugin-apprate/www/locales.js",
        "id": "cordova-plugin-apprate.locales",
        "pluginId": "cordova-plugin-apprate",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-apprate/www/storage.js",
        "id": "cordova-plugin-apprate.storage",
        "pluginId": "cordova-plugin-apprate",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-camera/www/CameraConstants.js",
        "id": "cordova-plugin-camera.Camera",
        "pluginId": "cordova-plugin-camera",
        "clobbers": [
            "Camera"
        ]
    },
    {
        "file": "plugins/cordova-plugin-camera/www/CameraPopoverOptions.js",
        "id": "cordova-plugin-camera.CameraPopoverOptions",
        "pluginId": "cordova-plugin-camera",
        "clobbers": [
            "CameraPopoverOptions"
        ]
    },
    {
        "file": "plugins/cordova-plugin-camera/www/Camera.js",
        "id": "cordova-plugin-camera.camera",
        "pluginId": "cordova-plugin-camera",
        "clobbers": [
            "navigator.camera"
        ]
    },
    {
        "file": "plugins/cordova-plugin-camera/src/browser/CameraProxy.js",
        "id": "cordova-plugin-camera.CameraProxy",
        "pluginId": "cordova-plugin-camera",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-device/www/device.js",
        "id": "cordova-plugin-device.device",
        "pluginId": "cordova-plugin-device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device/src/browser/DeviceProxy.js",
        "id": "cordova-plugin-device.DeviceProxy",
        "pluginId": "cordova-plugin-device",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-file-transfer/www/FileTransferError.js",
        "id": "cordova-plugin-file-transfer.FileTransferError",
        "pluginId": "cordova-plugin-file-transfer",
        "clobbers": [
            "window.FileTransferError"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file-transfer/www/FileTransfer.js",
        "id": "cordova-plugin-file-transfer.FileTransfer",
        "pluginId": "cordova-plugin-file-transfer",
        "clobbers": [
            "window.FileTransfer"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file-transfer/www/browser/FileTransfer.js",
        "id": "cordova-plugin-file-transfer.BrowserFileTransfer",
        "pluginId": "cordova-plugin-file-transfer",
        "clobbers": [
            "window.FileTransfer"
        ]
    },
    {
        "file": "plugins/cordova-plugin-globalization/www/GlobalizationError.js",
        "id": "cordova-plugin-globalization.GlobalizationError",
        "pluginId": "cordova-plugin-globalization",
        "clobbers": [
            "window.GlobalizationError"
        ]
    },
    {
        "file": "plugins/cordova-plugin-globalization/www/globalization.js",
        "id": "cordova-plugin-globalization.globalization",
        "pluginId": "cordova-plugin-globalization",
        "clobbers": [
            "navigator.globalization"
        ]
    },
    {
        "file": "plugins/cordova-plugin-globalization/www/browser/moment.js",
        "id": "cordova-plugin-globalization.moment",
        "pluginId": "cordova-plugin-globalization",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-globalization/src/browser/GlobalizationProxy.js",
        "id": "cordova-plugin-globalization.GlobalizationProxy",
        "pluginId": "cordova-plugin-globalization",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-ionic-webview/src/www/util.js",
        "id": "cordova-plugin-ionic-webview.IonicWebView",
        "pluginId": "cordova-plugin-ionic-webview",
        "clobbers": [
            "Ionic.WebView"
        ]
    },
    {
        "file": "plugins/cordova-plugin-network-information/www/network.js",
        "id": "cordova-plugin-network-information.network",
        "pluginId": "cordova-plugin-network-information",
        "clobbers": [
            "navigator.connection",
            "navigator.network.connection"
        ]
    },
    {
        "file": "plugins/cordova-plugin-network-information/www/Connection.js",
        "id": "cordova-plugin-network-information.Connection",
        "pluginId": "cordova-plugin-network-information",
        "clobbers": [
            "Connection"
        ]
    },
    {
        "file": "plugins/cordova-plugin-network-information/src/browser/network.js",
        "id": "cordova-plugin-network-information.NetworkInfoProxy",
        "pluginId": "cordova-plugin-network-information",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-networkinterface/www/networkinterface.js",
        "id": "cordova-plugin-networkinterface.networkinterface",
        "pluginId": "cordova-plugin-networkinterface",
        "clobbers": [
            "window.networkinterface"
        ]
    },
    {
        "file": "plugins/cordova-plugin-networkinterface/src/browser/networkinterfaceProxy.js",
        "id": "cordova-plugin-networkinterface.networkinterfaceProxy",
        "pluginId": "cordova-plugin-networkinterface",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-screen-orientation/www/screenorientation.js",
        "id": "cordova-plugin-screen-orientation.screenorientation",
        "pluginId": "cordova-plugin-screen-orientation",
        "clobbers": [
            "cordova.plugins.screenorientation"
        ]
    },
    {
        "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
        "id": "cordova-plugin-splashscreen.SplashScreen",
        "pluginId": "cordova-plugin-splashscreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "file": "plugins/cordova-plugin-splashscreen/src/browser/SplashScreenProxy.js",
        "id": "cordova-plugin-splashscreen.SplashScreenProxy",
        "pluginId": "cordova-plugin-splashscreen",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
        "id": "cordova-plugin-statusbar.statusbar",
        "pluginId": "cordova-plugin-statusbar",
        "clobbers": [
            "window.StatusBar"
        ]
    },
    {
        "file": "plugins/cordova-plugin-statusbar/src/browser/StatusBarProxy.js",
        "id": "cordova-plugin-statusbar.StatusBarProxy",
        "pluginId": "cordova-plugin-statusbar",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-wechat/www/wechat.js",
        "id": "cordova-plugin-wechat.Wechat",
        "pluginId": "cordova-plugin-wechat",
        "clobbers": [
            "Wechat"
        ]
    },
    {
        "file": "plugins/cordova-sqlite-storage/www/SQLitePlugin.js",
        "id": "cordova-sqlite-storage.SQLitePlugin",
        "pluginId": "cordova-sqlite-storage",
        "clobbers": [
            "SQLitePlugin"
        ]
    },
    {
        "file": "plugins/cordova-wifi-plugin/www/WifiManagerPlugin.js",
        "id": "cordova-wifi-plugin.CordovaWifiManager",
        "pluginId": "cordova-wifi-plugin",
        "clobbers": [
            "cordova.plugins.WifiManagerPlugin"
        ]
    },
    {
        "file": "plugins/cz.blocshop.socketsforcordova/socket.js",
        "id": "cz.blocshop.socketsforcordova.Socket",
        "pluginId": "cz.blocshop.socketsforcordova",
        "clobbers": [
            "window.Socket"
        ]
    },
    {
        "file": "plugins/jpush-phonegap-plugin/www/JPushPlugin.js",
        "id": "jpush-phonegap-plugin.JPushPlugin",
        "pluginId": "jpush-phonegap-plugin",
        "clobbers": [
            "JPush"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-clipboard": "1.2.1",
    "cordova-plugin-adam-alipay": "2.0.4",
    "cordova-plugin-file": "6.0.2",
    "cordova-plugin-advanced-http": "2.3.0",
    "cordova-plugin-dialogs": "2.0.2",
    "cordova-plugin-nativestorage": "2.3.2",
    "cordova-plugin-apprate": "1.5.0",
    "cordova-plugin-camera": "4.1.0",
    "cordova-plugin-device": "2.0.2",
    "cordova-plugin-file-transfer": "1.7.1",
    "cordova-plugin-globalization": "1.11.0",
    "cordova-plugin-ionic-keyboard": "2.2.0",
    "cordova-plugin-ionic-webview": "4.1.3",
    "cordova-plugin-jcore": "1.3.1",
    "cordova-plugin-network-information": "2.0.2",
    "cordova-plugin-networkinterface": "2.0.0",
    "cordova-plugin-screen-orientation": "3.0.2",
    "cordova-plugin-splashscreen": "5.0.2",
    "cordova-plugin-statusbar": "2.4.3",
    "cordova-plugin-wechat": "2.9.0",
    "cordova-plugin-whitelist": "1.3.3",
    "cordova-sqlite-storage": "4.0.0",
    "cordova-wifi-plugin": "1.0.4",
    "cz.blocshop.socketsforcordova": "1.1.0",
    "jpush-phonegap-plugin": "3.7.3"
}
// BOTTOM OF METADATA
});