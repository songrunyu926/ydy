import {
    TextToCode
} from 'element-china-area-data'




//复制内容到粘贴板
export const copyToClipboard = function (elem) {
    var targetId = "_hiddenCopyText_";
    var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
    var origSelectionStart, origSelectionEnd;
    if (isInput) {
        // 复制选择内容
        target = elem;
        origSelectionStart = elem.selectionStart;
        origSelectionEnd = elem.selectionEnd;
    } else {
        // 必须有一个临时的元素存储复制的内容
        target = document.getElementById(targetId);
        if (!target) {
            var target = document.createElement("textarea");
            target.style.position = "absolute";
            target.style.left = "-9999px";
            target.style.top = "0";
            target.id = targetId;
            document.body.appendChild(target);
        }
        target.textContent = elem.textContent;
    }
    // 选择内容
    var currentFocus = document.activeElement;
    target.focus();
    target.setSelectionRange(0, target.value.length);
    // 复制内容
    var succeed;
    try {
        succeed = document.execCommand("copy");
    } catch (e) {
        succeed = false;
    }
    // 恢复焦点
    if (currentFocus && typeof currentFocus.focus === "function") {
        currentFocus.focus();
    }
    if (isInput) {
        // 恢复之前的选择
        elem.setSelectionRange(origSelectionStart, origSelectionEnd);
    } else {
        // 清除临时内容
        target.textContent = "";
    }
    return succeed;
}

//寄件人信息 收件人信息智能识别
export const parsingInfo = function (obj) {
    //解构  
    const {
        province,
        city,
        county,
        address,
        phone,
        name
    } = obj
    //因数据不统一 修改数据
    let c = '';
    if (city === '北京市' || city === '天津市' || city === '重庆市' || city === '上海市') {
        c = '市辖区'
    } else {
        c = city
    }
   
    return {
        city: [TextToCode[province].code, TextToCode[province][c].code, TextToCode[province][c][county].code],
        detailAddress: address,
        tel: phone,
        name
    }


}
