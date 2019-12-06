window.addEventListener("message", function(e)
{
    console.log(e.data);
    dataJson=e.data
    //承办部门
    $('#departmentName').combobox('setValue', dataJson.chengBanBuMen);
    anHao=dataJson.anHao
    //用正则匹配出信息
    reg=/（([0-9]{4})）赣([0-9]{2,4})([\u4e00-\u9fa5]+)([0-9]{1,5})号/gi
    arr=reg.exec(anHao,'i')
    nianFen=arr[1]
    daiZi=arr[3]
    xuHao=arr[4]

    // $('.caseNo-year').combobox('setValue', nianFen);
    // $('.caseNo-word').combobox('setValue', daiZi);
    // $('.only-caseNo').combobox('setValue', xuHao);
    //案由
    $('#caseCause').combobox('setValue', dataJson.liAnAnYou);
    //开庭法庭
    $('#roomName').combobox('setValue', dataJson.KaiTingFaTing);
    //承办人
    $('#cbr').combobox('setValue', dataJson.chengBanRen);


    if(dataJson.shenPanZhang!='') {
        $('#judge_name_1').combobox('setValue', dataJson.shenPanZhang);
    }else{
        $('#judge_name_1').combobox('setValue', dataJson.chengBanRen);
    }
    if(dataJson.anJianLeiBei=='刑事'){
        yuanGao='检察院'
        beiGao=dataJson.dangShiRen
        $('#party_txt_2').find('em')[4].click()
    }else {
        console.log(getDsr(dataJson.dangShiRen))
        yuanGao=getDsr(dataJson.dangShiRen)[0]
        beiGao=getDsr(dataJson.dangShiRen)[1]
        $('#party_txt_2').find('em')[1].click()
    }


    //原告
    $('#party_name_1').textbox('setValue', yuanGao);

    //被告
    if(beiGao!=''){
        $('#party_name_2').textbox('setValue', beiGao);

    }

}, false);
//获得当事人
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