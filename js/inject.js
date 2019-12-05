
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
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
            'dangShiRen': getInfo($trs.eq(13)),
        }
        console.log(dataJson)
        sendResponse(dataJson);
    }else if(request.cmd == 'parse'){//粘贴
        typeArr={'刑事':0,'民事':1,'行政':2}
        if(request.data==null){
            alert('案件信息为空！')
            return;
        }else{
            //获得案件信息
            dataJson=request.data
            //承办部门
            $dn=$('input[name="departmentName"]')
            $dn.prev().prev().attr('placeholder',dataJson.chengBanBuMen)
            $dn.val(dataJson.chengBanBuMen)
            //触发点击
            if(typeArr[dataJson.anJianLeiBei]!=null){
            $('.caseType').find('em')[typeArr[dataJson.anJianLeiBei]].click();

            }

        }

    }
});

function getInfo($tr) {
        return $tr.find('td').eq(1).text().trim()
}