/**
 * Created by IntelliJ IDEA.
 * @author  yukon12345
 * @email yukon12345@163.com
 */
console.log('tingshen')
function injectCustomJs(jsPath)//注入js到中国庭审
{
    oHead=document.head || document.getElementsByTagName("head")[0]
    jsPath = jsPath || 'js/inject.js';
    var temp = document.createElement('script');
    temp.type = "text\/javascript";
    //获得类似 moz-extension://33c89bc4-76b5-4474-86e8-20ed77a26be4/js/inject.js
    temp.src = browser.extension.getURL(jsPath);
    console.log(temp.src)
    //temp.onload = function()
    //{
        // 放在页面不好看，执行完后移除掉
       // this.parentNode.removeChild(this);
   //};
    oHead.appendChild(temp);
    console.log(temp.type)
}
injectCustomJs();
browser.runtime.onMessage.addListener(function(request, sender, sendResponse)
{

    if(request.cmd == 'copy') {

        $trs = $('.f-table tr')
        if($trs==null)return;
        dataJson = {
            'anJianMing': getInfo($trs.eq(0)),
            'anHao': getInfo($trs.eq(1)),
            'hls': getInfo($trs.eq(3)),
            'chengBanBuMen': getInfo($trs.eq(4)),
            'KaiTingFaTing': getInfo($trs.eq(5)),
            'chengBanRen': getInfo($trs.eq(6)),
            'anJianLeiBei': getInfo($trs.eq(7)),
            'shenPanChengXu': getInfo($trs.eq(8)),
            'liAnAnYou': getInfo($trs.eq(9)),
            'shenPanZhang': getInfo($trs.eq(11)),
            'dangShiRen': getInfo($trs.eq(13)),
        }

        console.log(dataJson)
        sendResponse(dataJson);
    }else if(request.cmd == 'parse'){//粘贴

        console.log('粘贴')
        console.log(request.data)
        if(request.data==null){
            alert('案件信息为空！请先复制江西庭审-发布信息页面!')
            return;
        }else{
            //用inject设置案件信息
            dataJson=request.data
            window.postMessage(dataJson, '*');

        }

    }
});

function getInfo($tr) {
        return $tr.find('td').eq(1).text().trim()
}