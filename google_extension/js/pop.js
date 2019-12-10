/**
 * Created by IntelliJ IDEA.
 * @author  yukon12345
 * @email yukon12345@163.com
 */
var bg = chrome.extension.getBackgroundPage();

$(function () {
    j=bg.dataJson
    if (j==null){
        $('#state').html('当前没有信息,请到江西直播-发布信息页面-右键复制，然后到中国直播-发布案件页面-右键粘贴，可以自动填写所有信息~<br>微信:yukon12345678')
    }else{
        $('#state').html('当前复制了:'+j.anHao+' 的直播信息（'+j.anJianMing+'）')
    }
})
