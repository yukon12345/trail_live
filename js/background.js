//chrome.browserAction.setBadgeText({text: '直播'});
//chrome.browserAction.setBadgeBackgroundColor({color: [255, 0, 0, 255]});
//omfcehcgiklgchnoppooeimmcecmmbfb

chrome.contextMenus.create({
    title: "粘贴案件信息",
    onclick: function () {
        alert('粘贴完毕！');
    },
    documentUrlPatterns: ['http://tingshen.court.gov.cn:81/jiameng/caseRelease*', 'https://*.baidu.com/*']
});
dataJson={};
chrome.contextMenus.create({
    title: "复制案件信息",
    onclick: function () {
        sendMessageToContentScript({cmd:'test', value:'你好，我是back!'}, function(response)
        {
            dataJson=response
            var views = chrome.extension.getViews({type:'popup'});
            if(views.length > 0) {
               views[0].getState();
            }
            // todo console.log('来自content的回复：'+response);

            sendMessageToPopScript({cmd:'parse',value:response.anHao})
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


