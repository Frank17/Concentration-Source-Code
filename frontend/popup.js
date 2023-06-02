window.onload = function () {
    const blockListEle = document.getElementById('blist');

    function appendItemHTML(listEle, newBlockItem) {
        let listItem = document.createElement('li');
        listItem.textContent = newBlockItem;
        listItem.setAttribute('class', 'fw-light');
        listEle.appendChild(listItem);
    }

    function updateBlockList(listHandler) {
        return () => {
            chrome.storage.sync.get({ 'blist': [] }, function (obj) {
                listHandler(obj.blist);
            });
        }
    }

    // Popup loading: Iterate and set each blocked domain to the list
    updateBlockList(function (blist) {
        blist.forEach(function (blockItem) {
            appendItemHTML(blockListEle, blockItem);
        })
    })();

    // New domain entered: Only set the new domain, also update the list in storage
    document.getElementById('blistSubmit').onclick = updateBlockList(function (blist) {
        const newBlockItem = document.getElementById('blistInput').value;
        if (newBlockItem.trim() &&
            !blist.includes(newBlockItem)) {
            blist.push(newBlockItem);
            appendItemHTML(blockListEle, newBlockItem);
            chrome.storage.sync.set({ 'blist': blist });
        }
    });

    // document.getElementById('loginBtn').onclick = function () {
    //     chrome.tabs.create({ url: 'https://searchnew.nightstarry.repl.co/login' });
    // }

    // document.getElementById('signupBtn').onclick = function () {
    //     chrome.tabs.create({ url: 'https://searchnew.nightstarry.repl.co/signup' });
    // }

    document.getElementById('blistRemove').onclick = function () {
        chrome.storage.sync.clear();
        blockListEle.innerHTML = '';
    }
}


// "sandbox": "script-src 'self' https://*.firebaseio.com; https://www.googleapis.com; object-src 'self'"
// "content_security_policy": {
//     "extension_pages": "script-src 'self' https://*.firebaseio.com; https://www.googleapis.com; object-src 'self'"
// }        "extension_pages": "script-src 'self'; object-src 'self'"