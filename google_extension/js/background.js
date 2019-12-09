/**
 * Created by IntelliJ IDEA.
 * @author  yukon12345
 * @email yukon12345@163.com
 */
//chrome.browserAction.setBadgeText({text: '直播'});

//omfcehcgiklgchnoppooeimmcecmmbfb
var dataJson=null
chrome.browserAction.setBadgeText({text: ''});
chrome.browserAction.setBadgeBackgroundColor({color: [255, 0, 0, 255]});
chrome.contextMenus.create({
    title: "粘贴案件信息",
    onclick: function () {
        sendMessageToContentScript({cmd:'parse', data:dataJson}, function(response)
        {


            // todo console.log('来自content的回复：'+response);
        });
    },
    documentUrlPatterns: ['http://tingshen.court.gov.cn:81/jiameng/caseRelease*']
});

chrome.contextMenus.create({
    title: "复制案件信息",
    onclick: function () {

        sendMessageToContentScript({cmd:'copy', value:'你好，我是back!'}, function(response)
        {
            dataJson=response
            reg=/（([0-9]{4})）赣([0-9]{2,4})([\u4e00-\u9fa5]+)([0-9]{1,5})号/gi
            arr=reg.exec(dataJson.anHao,'i')
            xuHao=arr[4]
            chrome.browserAction.setBadgeText({text: xuHao});

            chrome.notifications.create(null, {
                type: 'basic',
                iconUrl: 'img/living.png',
                title: '[愉快庭审直播]案件信息已复制:',
                message: dataJson.anHao+'('+dataJson.anJianMing+')'
            });
            // todo console.log('来自content的回复：'+response);
        });


    },
    documentUrlPatterns: ['http://sf.dolawing.com/liti/TtrialliveLiveInfo/ttrialliveliveinfo*copyView.action*']
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


