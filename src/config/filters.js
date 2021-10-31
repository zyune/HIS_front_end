//过滤器的方法接收至少一个参数，也就是传入的值的参数

//申请的状态，1是暂存|2是开立|3是作废
//申请的收费状态 1是未收费|2是已收费

exports.applicationState=(val) => {
    console.log("进入了这个方法哦"+val)
    switch (val) {
        case "1":{
            console.log("暂存")
            return "暂存";
            break;
        }
        case "2":{
            return "开立";
            break;
        }
        case "3":{
            return "作废";
            break;
        }
    }
};
exports.checkstate=(val) => {
    switch (val) {
        case "1":{
            return "检查";
            break;
        }
        case "2":{
            return "检验";
            break;
        }
        case "3":{
            return "处置";
            break;
        }
    }
};
exports.feeState=(val) => {
    switch (val) {
        case "1":{
            return "未收费";
            break;
        }
        case "2":{
            return "已收费";
            break;
        }
    }
};
//项目的执行的状态
exports.handlerState=(val) => {
    switch (val) {
        case "1":{
            return "未执行";
            break;
        }
        case "2":{
            return "已执行";
            break;
        }
    }
};


//时间戳转日期
exports.dateTimeForm=(val) => {
    //val 为1561043409000后台传入的时间戳
    var newDate = new Date();
    newDate.setTime(val);
    return newDate.toDateString();
};

//收费金额
exports.price=(val) => {
    //val 为1561043409000后台传入的时间戳
    return val+"元"
};









