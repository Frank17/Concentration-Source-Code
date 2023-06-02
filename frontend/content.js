// let blocked_subjects = ['social media', 'sports']
let currentSubject = '';
let blockList;

let textArr = [];
let divisions = document.getElementsByTagName('div');
for (div of divisions) {
    textArr.push(div.innerText);
}
const textStr = textArr.join(' ').replaceAll('\n', ' ');
const HTTP = new XMLHttpRequest();

// Modify/use the function below once the signup/login system is finished
// function getBlockList() {
//     let HTTP = new XMLHttpRequest();
//     let url = 'https://web.nightstarry.repl.co/block_list/user1@gmail.com';

//     HTTP.open('GET', url, true);
//     HTTP.send(null);
//     HTTP.onreadystatechange = function () {
//         if (HTTP.readyState == 4) {
//             blockListStr = HTTP.responseText;
//             console.log("Block list: ");
//             console.log(blockListStr);
//             blockList = blockListStr.split(" ");
//             console.log("Restricted sites: ");
//             console.log(restrictedSites);
//         }
//     }
//     return;
// }

function checkSubject() {
    // const apiUrl = 'https://web.nightstarry.repl.co/dynamicTest';
    // const apiUrl = 'https://searchnew.nightstarry.repl.co/api/summary';
    // const apiUrl = 'https://concentrate.yulinzhang.repl.co/api/summary';
    const apiUrl = 'https://concentration-server.herokuapp.com/api/summary';
    HTTP.open('POST', apiUrl, true);

    chrome.storage.sync.get({ 'blist': [] }, function (obj) {
        const blockedSubjects = obj.blist;
        let data = new FormData();
        data.append('text', textStr);
        data.append('subjects', blockedSubjects);
        HTTP.send(data);

        const tokenN = textStr.split(' ').length;
        chrome.storage.sync.set({ 'tokenN': tokenN });
    });

    HTTP.onreadystatechange = function () {
        if (HTTP.readyState == 4 && HTTP.status == 200) {
            const shouldBlockPage = (HTTP.responseText === 'True');
            if (shouldBlockPage) {
                document.documentElement.innerHTML = 'Website is blocked';
                document.documentElement.scrollTop = 0;
                console.log('Please go back!');
            }
            console.log('Response text: ' + HTTP.responseText);
            console.log('Yes or no: ' + shouldBlockPage);
        }
    }
}


function isLoggedIn() {
    let HTTP = new XMLHttpRequest();
    let url = 'https://tunnel.nightstarry.repl.co/login_status';

    HTTP.open('GET', url, true);
    HTTP.send(null);

    HTTP.onreadystatechange = function () {
        if (HTTP.readyState == 4) {
            let loginStatus = HTTP.responseText;
            console.log(loginStatus === 'True');
        }
        return loginStatus === 'True';
    }
}


window.onload = checkSubject;


// setInterval(isLoggedIn, 1000);
// if (isLoggedIn()) {
//     console.log('c');
//     // getBlockList();
//     // checkSubject();
// }


// chrome.runtime.onMessage.addListener(gotMessage);
// chrome.browserAction.onMessage.addListener(gotPopup);
// let num = 1;
// function gotMessage(message, sender, sendResponse) {
//     console.log(message.text);

//     if (message.text === "hi from the background script!" && num % 2 === 0) {
//         let paragraphs = document.getElementsByTagName("p");
//         for (element of paragraphs) {
//             element.style["background-color"] = "#FF0000";
//         }
//         num = num + 1;
//     }
//     else {
//         let paragraphs = document.getElementsByTagName("p");
//         for (element of paragraphs) {
//             element.style["background-color"] = "#000000";
//         }
//         num = num + 1;
//     }
// }

// function gotPopup(message, sender, sendResponse) {

// }
// https://websitesetup.org/javascript-cheat-sheet/
// https://websitesetup.org/
// <all_urls>
// "browser_action": {
//   "default_popup": "popup.html"

// Add to the content script in manifest.json if needed:"checkDomains.js",
