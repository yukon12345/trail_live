function getState() {
    var bg = chrome.extension.getBackgroundPage();
    var j=bg.dataJson
    if (j=={}){
        return;
    }else{
        document.getElementById('state').html('当前复制了:'+j.anHao+' 的案件信息')
    }
}
getState()
alert('11')