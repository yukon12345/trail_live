/**
 * Created by IntelliJ IDEA.
 * @author  yukon12345
 * @email yukon12345@163.com
 */
bg = browser.extension.getBackgroundPage();
$(function () {
    j=bg.dataJson
    if (j==null){
        $('#state').html('当前没有复制任何案件信息')
    }else{
        $('#state').html('当前复制了:'+j.anHao+' 的直播信息（'+j.anJianMing+'）')
    }
})
// window.onload=function () {
//     j=bg.dataJson
//     if (j==null){
//       $('#state').html('当前没有复制任何案件信息')
//         document.getElementById('state').innerHTML='当前没有复制任何案件信息'
//      }else{
//         document.getElementById('state').innerHTML='当前复制了:'+j.anHao+' 的直播信息（'+j.anJianMing+'）'
//      }
// }
