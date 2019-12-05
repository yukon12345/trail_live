
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{

    if(request.cmd == 'test') alert(request.value);
    sendResponse($('.f-table').text());
    $trs=$('.f-table tr')

    dataJson={
        'anJianMing':getInfo($trs.eq(0)),
        'anHao':getInfo($trs.eq(1)),
        'hls':getInfo($trs.eq(3)),
        'chengBanBuMen':getInfo($trs.eq(4)),
        'KaiTingFaTing':getInfo($trs.eq(5)),
        'chengBanRen':getInfo($trs.eq(6)),
        'anJianLeiBei':getInfo($trs.eq(7)),
        'shenPanChengXu':getInfo($trs.eq(8)),
        'liAnAnYou':getInfo($trs.eq(9)),
        'dangShiRen':getInfo($trs.eq(13)),
    }
    console.log(dataJson)

});

function getInfo($tr) {
        return $tr.find('td').eq(1).text().trim()
}