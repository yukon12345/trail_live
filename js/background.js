//chrome.browserAction.setBadgeText({text: '直播'});
//chrome.browserAction.setBadgeBackgroundColor({color: [255, 0, 0, 255]});
//omfcehcgiklgchnoppooeimmcecmmbfb
var dataJson=null
chrome.contextMenus.create({
    title: "粘贴案件信息",
    onclick: function () {
        sendMessageToContentScript({cmd:'parse', data:dataJson}, function(response)
        {


            // todo console.log('来自content的回复：'+response);
        });
    },
    documentUrlPatterns: ['http://tingshen.court.gov.cn:81/jiameng/caseRelease*', 'https://*.baidu.com/*']
});

chrome.contextMenus.create({
    title: "复制案件信息",
    onclick: function () {

        sendMessageToContentScript({cmd:'copy', value:'你好，我是back!'}, function(response)
        {
            dataJson=response

            // todo console.log('来自content的回复：'+response);
        });


    },
    documentUrlPatterns: ['http://sf.dolawing.com/liti/TtrialliveLiveInfo/ttrialliveliveinfo*copyView.action*', 'https://*.baidu.com/*']
});

function sendMessageToContentScript(message, callback)
{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
    {
        chrome.tabs.sendMessage(tabs[0].id, message, function(response)
        {
            if(callback) callback(response);
        });
    });
}
function sendMessageToPopScript(message, callback)
{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
    {
        chrome.tabs.sendMessage(tabs[0].id, message, function(response)
        {
            if(callback) callback(response);
        });
    });
}


