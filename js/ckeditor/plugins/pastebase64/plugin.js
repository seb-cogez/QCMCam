// ckeditor-pastebase64 1.0.1r (patched)
// https://github.com/ruvor/ckeditor-pastebase64
// orig: https://github.com/javaha/ckeditor-pastebase64
var browser = function() {
    // Return cached result if avalible, else get result then cache it.
    if (browser.prototype._cachedResult)
        return browser.prototype._cachedResult;

    // Opera 8.0+
    var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

    // Firefox 1.0+
    var isFirefox = typeof InstallTrigger !== 'undefined';

    // Safari 3.0+ "[object HTMLElementConstructor]" 
    var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);

    // Internet Explorer 6-11
    var isIE = /*@cc_on!@*/false || !!document.documentMode;

    // Edge 20+
    var isEdge = !isIE && !!window.StyleMedia;

    // Chrome 1+
    var isChrome = !!window.chrome && !!window.chrome.webstore;

    // Blink engine detection
    var isBlink = (isChrome || isOpera) && !!window.CSS;

    return browser.prototype._cachedResult =
        isOpera ? 'Opera' :
        isFirefox ? 'Firefox' :
        isSafari ? 'Safari' :
        isChrome ? 'Chrome' :
        isIE ? 'IE' :
        isEdge ? 'Edge' :
        isBlink ? 'Blink' :
        "Don't know";
};
(function () {
    'use strict';

    CKEDITOR.plugins.add('pastebase64', {
        init: init
    });

    function init(editor) {
        if (editor.addFeature) {
            editor.addFeature({
                allowedContent: 'img[alt,id,!src]{width,height};'
            });
        }

        editor.on("contentDom", function () {
            var editableElement = editor.editable ? editor.editable() : editor.document;
            editableElement.on("paste", onPaste, null, {editor: editor});
        });
    }

    function onPaste(event) {
        if(browser()=== 'Firefox')return;
        var editor = event.listenerData && event.listenerData.editor;
        var $event = event.data.$;
        var clipboardData = $event.clipboardData;
        var found = false;
        var imageType = /^image/;

        if (!clipboardData) {
            return;
        }

        return Array.prototype.forEach.call(clipboardData.types, function (type, i) {
            if (found) {
                return;
            }

            if (type.match(imageType) || clipboardData.items[i].type.match(imageType)) {
                readImageAsBase64(clipboardData.items[i], editor, clipboardData.items.length > 1);
                return found = true;
            }
        });
    }

    function readImageAsBase64(item, editor, useWorkAround) {
        if (!item || typeof item.getAsFile !== 'function') {
            return;
        }

        var file = item.getAsFile();
        var reader = new FileReader();

        reader.onload = function (evt) {
            var element = editor.document.createElement('img', {
                attributes: {
                    src: evt.target.result
                }
            });

            // We use a timeout callback to prevent a bug where insertElement inserts at first caret
            // position
            setTimeout(function () {
                if (useWorkAround) {
                    var img = editor.getSelection().getRanges()[0].getBoundaryNodes().endNode;
                    if (img.$.tagName !== "IMG") {
                        img = img.getPrevious();
                    }
                    if (img && img.$.tagName === "IMG") {
                        img.remove()
                    }
                }
                editor.insertElement(element);
            }, 10);
        };

        reader.readAsDataURL(file);
    }
})();
