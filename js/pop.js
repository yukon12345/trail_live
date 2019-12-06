var bg = chrome.extension.getBackgroundPage();

$(function () {
    j=bg.dataJson
    if (j==null){
        $('#state').html('当前没有复制任何案件信息')
    }else{
        $('#state').html('当前复制了:'+j.anHao+' 的直播信息（'+j.anJianMing+'）')
    }
})
