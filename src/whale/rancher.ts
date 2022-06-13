async function main(target_list: string[]) {
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

function onUrlChange(fn: () => void) {
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
    return new Promise<void>((resolve, reject) => {
        let interval: number;
        const fn = () => {
            if (document.querySelectorAll('.group').length) {
                resolve();
                clearInterval(interval);
                return true;
            }
            return false;
        };
        if (!fn()) {
            interval = setInterval(fn, 1000) as any;
        }
    });
}

function getSearchKey(key: string) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    return params[key];
}
