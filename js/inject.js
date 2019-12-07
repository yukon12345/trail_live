/**
 * Created by IntelliJ IDEA.
 * @author  yukon12345
 * @email yukon12345@163.com
 */
function pad(num, n) {//填充0
    var len = num.toString().length;
    while(len < n) {
        num = "0" + num;
        len++;
    }
    return num;
}
//当事人信息拆分
function getDsr(dsr) {
    if(dsr.indexOf(';')){
        dsrArr=dsr.split(';')
        yuanGao=dsrArr[0].split(':')[1]
        beiGao=dsrArr[1].split(':')[1]
        return [yuanGao,beiGao]
    }else{
        return[dsr,'']
    }
}
window.addEventListener("message", function(e)
{
    console.log(e.data);
    dataJson=e.data
    typeArr={'刑事':0,'民事':1,'行政':2}
    chengXuArr={'一审':0,'二审':1,'再审':2,'特别程序':3,'再审审查':4}
    //承办部门
    $('#departmentName').combobox('setValue', dataJson.chengBanBuMen);

    //设置案号
    anHao=dataJson.anHao
    //用正则匹配出信息
    reg=/（([0-9]{4})）赣([0-9]{2,4})([\u4e00-\u9fa5]+)([0-9]{1,5})号/gi
    arr=reg.exec(anHao,'i')
    nianFen=arr[1]
    daiZi=arr[3]
    xuHao=arr[4]
    $('.caseNo-year').val(nianFen)
    $('.caseNo-word').val(daiZi)
    $('.only-caseNo').val(xuHao)



    //触发点击案件类别
    if(typeArr[dataJson.anJianLeiBei]!=null){
        $('.caseType').find('em')[typeArr[dataJson.anJianLeiBei]].click();
    }

    //案由
    $('#caseCause').combobox('setValue', dataJson.liAnAnYou);

    //触发点击正确的审判程序
    if(chengXuArr[dataJson.shenPanChengXu]!=null){

        $('#phrase_ul').find('em')[chengXuArr[dataJson.shenPanChengXu]].click();
        if(daiZi.indexOf('特')!=-1){
            //是民特
            $('#phrase_ul').find('em')[3].click();
        }
    }

    //开庭时间
    myDate=new Date();
    year=myDate.getFullYear();
    month=parseInt(myDate.getMonth())+1;
    day=myDate.getDate();
    hour=parseInt(myDate.getHours());
    minute=pad(myDate.getMinutes(),2)
    //设置显示年月日
    $('#beginTime').val(year+'年'+pad(month,2)+'月'+pad(day,2)+'日').trigger('focus').trigger('blur');;
    //设置显示小时
    $('.liushuo-hours').val(hour+' 时')
    //设置分
    $('.liushuo-minutes').val(minute)

    //设置实际日期
    $('#ls-date').val(year+'-'+pad(month,2)+'-'+pad(day,2)+' '+pad(hour,2)+':'+minute)
    //hls地址
    $('#in_hls').val(dataJson.hls)

    //开庭法庭
    $('#roomName').combobox('setValue', dataJson.KaiTingFaTing);

    //案件描述
    $('#caseDescription').val(dataJson.liAnAnYou+',,,,'+dataJson.anJianMing)

    //承办人
    $('#cbr').combobox('setValue', dataJson.chengBanRen);

    //审判长
    if(dataJson.shenPanZhang!='') {
        $('#judge_name_1').combobox('setValue', dataJson.shenPanZhang);
    }else{
        $('#judge_name_1').combobox('setValue', dataJson.chengBanRen);
    }


    //当事人 原被告和选项点击
    console.log(dataJson.dangShiRen)
    if(dataJson.anJianLeiBei=='刑事'){
        yuanGao='检察院'
        beiGao=dataJson.dangShiRen
        if(dataJson.shenPanChengXu=='一审'){
            $('#party_txt_2').find('em')[4].click()
        }else if(dataJson.shenPanChengXu=='二审'){
            $('#party_txt_2').find('em')[1].click()
        }else if(dataJson.shenPanChengXu=='再审'){
            $('#party_txt_2').find('em')[5].click()
        }
        // else if(dataJson.shenPanChengXu=='复核'){
        //     $('#party_txt_2').find('em')[2].click()
        // }else if(dataJson.shenPanChengXu=='刑罚变更'){
        //     $('#party_txt_1').find('em')[1].click()
        // }

    }else {
        //民事、行政、赔偿，经观察通用
        if(dataJson.shenPanChengXu=='一审'||dataJson.shenPanChengXu=='') {
            //一审和民特同样顺序
            $('#party_txt_2').find('em')[1].click()

        }else {
            //再审和二审同样顺序
            $('#party_txt_1').find('em')[1].click()
            $('#party_txt_2').find('em')[2].click()
        }
            yuanGao = getDsr(dataJson.dangShiRen)[0]
            beiGao = getDsr(dataJson.dangShiRen)[1]
    }
    alert('粘贴完毕!请注意"当事人"选项是否自动填写正确!')
    //原告设置
    $('#party_name_1').val(yuanGao).trigger('focus').trigger('blur');
    //被告设置
    if(beiGao!=''){
        $('#party_name_2').val(beiGao).trigger('focus').trigger('blur');
    }
}, false);
