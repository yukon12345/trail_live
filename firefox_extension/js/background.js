/**
 * Created by IntelliJ IDEA.
 * @author  yukon12345
 * @email yukon12345@163.com
 */

browser.browserAction.setBadgeBackgroundColor({color: [255, 0, 0, 255]});
//omfcehcgiklgchnoppooeimmcecmmbfb


var dataJson=null
browser.browserAction.setBadgeText({text: ''});
browser.menus.create({
    title: "复制案件信息",
    id: "copy",
    contexts: ["all"],
    onclick: function () {

        sendMessageToContentScript({cmd:'copy', value:'你好，我是back!'}, function(response)
        {
            dataJson=response
            reg=/（([0-9]{4})）赣([0-9]{2,4})([\u4e00-\u9fa5]+)([0-9]{1,5})号/gi
            arr=reg.exec(dataJson.anHao,'i')
            xuHao=arr[4]
            browser.browserAction.setBadgeText({text: xuHao});
            browser.notifications.create(null, {
                type: 'basic',
                iconUrl: 'img/living.png',
                title: '[愉快庭审直播]案件信息已复制:',
                message: dataJson.anHao+'('+dataJson.anJianMing+')'
            });
            // todo console.log('来自content的回复：'+response);
        });


    },
    documentUrlPatterns  : ['http://sf.dolawing.com/liti/TtrialliveLiveInfo/ttrialliveliveinfo*copyView.action*', 'https://*.baidu.com/*']
});

browser.menus.create({
    title: "粘贴案件信息",
    id: "parse",
    contexts: ["all"],
    onclick: function () {
        sendMessageToContentScript({cmd:'parse', data:dataJson}, function(response)
        {
            //console.log('来自content的回复：'+response);
        });
    },
    documentUrlPatterns:['http://tingshen.court.gov.cn/jiameng/caseRelease*', 'https://*.baidu.com/*']
});
function sendMessageToContentScript(message, callback)
{
    browser.tabs.query({active: true, currentWindow: true}, function(tabs)
    {
        browser.tabs.sendMessage(tabs[0].id, message, function(response)
        {
            if(callback) callback(response);
        });
    });
}


