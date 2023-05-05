// This script is used to filter accounts.
context.dataNotFound = false;
var tempField;
// Setting tempField w.r.t the personal field entity captured.
if (context.updateKey) {
    tempField = context.updateKey.toLowerCase();
} else if (context.entities.personalFields) {
    context.updateKey = context.entities.personalFields.toLowerCase();
    tempField = context.updateKey;
}
if(context.entities.multipleCards && context.session.BotUserSession.source.toLowerCase() === "idfc" ){
    var path = env.path ? env.path : null;
    if(path === "wrapper"){
        context.customerAccounts = context.customerAccounts.filter(obj => obj.cardNumber === context.entities.multipleCards);     
    }else{
        context.customerAccounts = context.customerAccounts.filter(obj => obj.cardNumber === context.entities.multipleCards);
    }
}else{
// let accNumber = context.entities.multipleAccounts;
// context.customerAccounts = context.customerAccounts.filter(accObj => accObj.accountNumber === accNumber);

}

context.customerAccounts = context.accountData.filter(x => context.entities.AccountType.includes(x.accountNumber))

// if (tempField == "account nickname") {
//     tempField = "accountNickname";
// } else if (tempField == "address") {
//     tempField = "location";
// }
if (context.customerAccounts && context.customerAccounts.length === 1) {
    context.dataNotFound = true;
    context.visit = true;
    if(context.customerAccounts[0].accountName && context.customerAccounts[0].accountName.toLowerCase()==="credit card"){
        context.shortCardNo = maskCardNumber(context.customerAccounts[0].cardNumber);
        context.addresSerno = context.customerAccounts[0].AddressSerno ? JSON.parse(context.customerAccounts[0].AddressSerno):"NA";
        context.unMaskedphoneNumber = context.customerAccounts[0].phone !== null ? context.customerAccounts[0].phone : "NA";   
        context.phoneNumber = context.unMaskedphoneNumber!=="NA" ? "XXXXXX"+maskCardNumber(context.unMaskedphoneNumber): "NA";   
    }
    if (context.customerAccounts[0][tempField]) {
        context.dataNotFound = false;
        context.valueToBeUpdated = context.customerAccounts[0][tempField];
    }
}else if(context.customerAccounts && context.customerAccounts.length > 1) {
    context.multipleDisplayMessage = context.session.BotUserSession.isIVR ? content.ivr_multiAccMsg : content.update_MultiAccMsg;
    if(context.entities.AccountType) {
        context.multiAccountName = context.customerAccounts[0].accountType
    }
    
}
context.fieldToUpdate = tempField;
