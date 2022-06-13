"use strict";
// ==UserScript==
// @name         demo-zsy
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://rancher-develop.meetwhale.com/p/c-t2g7l:p-gnhqj/workloads
// @match        https://rancher-develop.meetwhale.com/p/c-t2g7l:p-gnhqj/ingresses
// @icon         https://www.google.com/s2/favicons?sz=64&domain=meetwhale.com
// @updateUR     https://raw.githubusercontent.com/zsytssk/tampermonkey/master/dist/whale/rancher.js
// @grant        none
// @run-at document-end
// ==/UserScript==
async function main(target_list) {
    await isReady();
    const regex = /\s+命名空间: ([^\s]+)/g;
    const list = [...document.querySelectorAll('.group')];
    for (const item of list) {
        const item_dom = item.querySelector('.group-row td');
        if (!item_dom) {
            continue;
        }
        const item_str = item_dom.textContent;
        if (!item_str) {
            continue;
        }
        const item_name = [...item_str.matchAll(regex)][0][1];
        if (target_list.indexOf(item_name) === -1) {
            item.setAttribute('style', 'display: none');
        }
    }
}
main(['demo-zsy', 'demo-tssk']);
onUrlChange(() => main(['demo-zsy', 'demo-tssk']));
function onUrlChange(fn) {
    let url = location.href;
    setInterval(() => {
        if (url === location.href) {
            return;
        }
        url = location.href;
        fn();
    }, 500);
}
function isReady() {
    return new Promise((resolve, reject) => {
        let interval;
        const fn = () => {
            if (document.querySelectorAll('.group').length) {
                resolve();
                clearInterval(interval);
                return true;
            }
            return false;
        };
        if (!fn()) {
            interval = setInterval(fn, 1000);
        }
    });
}
function getSearchKey(key) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    return params[key];
}
