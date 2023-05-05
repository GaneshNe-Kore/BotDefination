if(context.entities.profileOrAccountLevel === "Account" && !context.entities.personalFields) {
    context.personalFields = [{
            "name": content.acc_nickname,
            "value": "accountNickname",
            "synonyms": [
                "\"~nickname\""
            ],
            "label": content.prsnField_nickname,
        },
        {
            "name": content.prsnField_email,
            "value": "email",
            "synonyms": [
                "\"~eemail\"",
                "\"~emailpersonalfield\""
            ],
            "label": content.prsnField_email,
        },
        {
            "name": content.prsnField_phoneNum,
            "value": "primaryPhone",
            "synonyms": [
                "\"~phonenumber\""
            ],
            "label": content.prsnField_phoneNum,
        },
        {
            "name": content.AltPhone_number_title,
            "value": "alternatePhone",
            "synonyms": [
               "\"~primaryoralternatealternate\"",
               "\"~primaryoralternatealternatenumber\""
            ],
            "label": content.prsnField_phoneNum,
        },
        {
            "name": content.prsnField_address,
            "value": "location",
            "synonyms": [
                "\"~addr\"",
                "\"~addressdetails\""
            ],
            "label": content.prsnField_address,
        }
    ];
}
if(context.entities.multipleAccounts || (context.entities.AccountType && context.entities.AccountType.length>1)) {
    context.entities.AccountType = context.entities.multipleAccounts
    context.customerAccounts = context.customerAccounts.filter(x=> x.accountNumber === context.entities.multipleAccounts)
}

var fieldCodes = context.session.BotUserSession.fieldCodes
// checking whether user opted account is eligible to update or not.
var taskNotSupported = false;
var accountsMap = {
    "Checking Account" : "CHKN",
    "Savings Account" : "SVG",
    "Credit Card" : "CC",
    "Mortgage" : "MRTG",
    "Auto Loan":"LON",
    "Line of Credit" : "LIN",
    "Personal Loan" : "LON",
    "Home Equity Line" : "LIN",
    "CD" : "CD",
    "IRA" : "IRA",
    "Home Equity Loan" : "LON"
}
var fields = context.session.BotUserSession.fieldCodes;
var accountData = []
if(context.accountData) {
    context.accountData.forEach(function(actData) {
        var code = "EDITACC-" + accountsMap[actData.accountType] 
        if(fieldCodes[code]) {
            accountData.push(actData)
        }
    })
    context.accountData = accountData;
}

if(!context.accountData || (context.accountData && context.accountData.length === 0)) {
    taskNotSupported = true;
}

// if(context.workbenchAccountData && context.workbenchAccountData.length > 0){
//     var dataArray = context.workbenchAccountData.filter(account =>  context.entities.AccountType.includes(account.accountNumber));
//     if(dataArray && dataArray.length === 0){
//         taskNotSupported = true;
//         if(context.fieldToUpdate && context.fieldToUpdate === "accountNickname"){
//             context.field = content.updateAccNickName;
            
//         }else{
//             context.field = content.updateField;
//         }
//     }else{
//          context.customerAccounts = dataArray;
//          context.entities.AccountType = [];
//          dataArray.forEach(obj => context.entities.AccountType.push(obj.accountNumber));
//          context.multipleDisplayMessage = context.session.BotUserSession.isIVR ? content.ivr_multiAccMsg : content.multiAccMsg;
//         // primary and alternate logic
//         if(!context.entities.primaryOrAlternate && context.entities.personalFields && context.entities.personalFields === "phone"){
//             context.accountName = (dataArray && dataArray.length > 0) ? dataArray[0].accountName : "NA";
//             taskNotSupported = context.session.BotUserSession.fieldCodes["EDITACC-"+context.accountObject[context.accountName]+"-PHN"] ? false : true;
//             context.field = content.updatePhone;
//             if(dataArray && dataArray.length > 0 && !dataArray[0].alternatePhoneNumber &&!taskNotSupported){
//                 context.entities.primaryOrAlternate = "Primary";
//             }    
//         }
//     }
// }
if(context.accountData.length === 1){
    context.entities.AccountType = [];
    context.entities.AccountType.push(context.accountData[0].accountNumber);
}


if(context.entities.personalFields && context.entities.personalFields === "accountNickname"){
    taskNotSupported = (context.session.BotUserSession.fieldCodes["EDITACC"] && ((context.session.BotUserSession.fieldCodes["EDITACC-CHKN"] && context.session.BotUserSession.fieldCodes["EDITACC-CHKN-ACCNICK"]) || (context.session.BotUserSession.fieldCodes["EDITACC-SVG"] && context.session.BotUserSession.fieldCodes["EDITACC-SVG-ACCNICK"]) || (context.session.BotUserSession.fieldCodes["EDITACC-CC"] && context.session.BotUserSession.fieldCodes["EDITACC-CC-ACCNICK"]) || (context.session.BotUserSession.fieldCodes["EDITACC-LON"] && context.session.BotUserSession.fieldCodes["EDITACC-LON-ACCNICK"]) || (context.session.BotUserSession.fieldCodes["EDITACC-MRTG"] && context.session.BotUserSession.fieldCodes["EDITACC-MRTG-ACCNICK"]) || (context.session.BotUserSession.fieldCodes["EDITACC-LIN"] && context.session.BotUserSession.fieldCodes["EDITACC-LIN-ACCNICK"]))) ? false : true;
    context.field = taskNotSupported ? content.updateAccNickName  : context.field;
}else if (context.entities.personalFields && context.entities.personalFields === "location") {
    taskNotSupported = context.session.BotUserSession.fieldCodes["EDITACC"] && ((context.session.BotUserSession.fieldCodes["EDITACC-CHKN"] && context.session.BotUserSession.fieldCodes["EDITACC-CHKN-ADDR"]) || (context.session.BotUserSession.fieldCodes["EDITACC-SVG"] && context.session.BotUserSession.fieldCodes["EDITACC-SVG-ADDR"]) || (context.session.BotUserSession.fieldCodes["EDITACC-CC"] && context.session.BotUserSession.fieldCodes["EDITACC-CC-ADDR"]) || (context.session.BotUserSession.fieldCodes["EDITACC-LON"] && context.session.BotUserSession.fieldCodes["EDITACC-LON-ADDR"]) || (context.session.BotUserSession.fieldCodes["EDITACC-MRTG"] && context.session.BotUserSession.fieldCodes["EDITACC-MRTG-ADDR"]) || (context.session.BotUserSession.fieldCodes["EDITACC-LIN"] && context.session.BotUserSession.fieldCodes["EDITACC-LIN-ADDR"])) ? false : true;
    context.field = taskNotSupported ? content.updateAddress : context.field;
}else if (context.entities.personalFields && context.entities.personalFields === "email") {
    taskNotSupported = context.session.BotUserSession.fieldCodes["EDITACC"] && ((context.session.BotUserSession.fieldCodes["EDITACC-CHKN"] && context.session.BotUserSession.fieldCodes["EDITACC-CHKN-EMAIL"]) || (context.session.BotUserSession.fieldCodes["EDITACC-SVG"] && context.session.BotUserSession.fieldCodes["EDITACC-SVG-EMAIL"]) || (context.session.BotUserSession.fieldCodes["EDITACC-CC"] && context.session.BotUserSession.fieldCodes["EDITACC-CC-EMAIL"]) || (context.session.BotUserSession.fieldCodes["EDITACC-LON"] && context.session.BotUserSession.fieldCodes["EDITACC-LON-EMAIL"]) || (context.session.BotUserSession.fieldCodes["EDITACC-MRTG"] && context.session.BotUserSession.fieldCodes["EDITACC-MRTG-EMAIL"]) || (context.session.BotUserSession.fieldCodes["EDITACC-LIN"] && context.session.BotUserSession.fieldCodes["EDITACC-LIN-EMAIL"])) ? false : true;
    context.field = taskNotSupported ? content.updateEmail : context.field;
}else if (context.entities.personalFields && (context.entities.personalFields === "primaryPhone")||(context.entities.personalFields === "alternatePhone")) {
    taskNotSupported = context.session.BotUserSession.fieldCodes["EDITACC"] && ((context.session.BotUserSession.fieldCodes["EDITACC-CHKN"] && context.session.BotUserSession.fieldCodes["EDITACC-CHKN-PHN"]) || (context.session.BotUserSession.fieldCodes["EDITACC-SVG"] && context.session.BotUserSession.fieldCodes["EDITACC-SVG-PHN"]) || (context.session.BotUserSession.fieldCodes["EDITACC-CC"] && context.session.BotUserSession.fieldCodes["EDITACC-CC-PHN"]) || (context.session.BotUserSession.fieldCodes["EDITACC-LON"] && context.session.BotUserSession.fieldCodes["EDITACC-LON-PHN"]) || (context.session.BotUserSession.fieldCodes["EDITACC-MRTG"] && context.session.BotUserSession.fieldCodes["EDITACC-MRTG-PHN"]) || (context.session.BotUserSession.fieldCodes["EDITACC-LIN"] && context.session.BotUserSession.fieldCodes["EDITACC-LIN-PHN"])) ? false : true;
    context.field = taskNotSupported ? content.updatePhone : context.field;
}
context.taskNotSupported = taskNotSupported;


  var fieldsMap = {
    "ADDR" : "location",
    "EMAIL" : "email",
    "PHN" : "primaryPhone",
    "ALTPHN" : "alternatePhone",
    "ACCNICK" : "accountNickname"
    // ,
    // "PHN_MOB" : "primary mobile",
    // "ALTPHN_MOB" : "alternate mobile"
}
var updatedPF = []
var l = koreUtil._

if(context.entities.AccountType && !context.entities.multipleAccounts) {
    var accType = context.accountData.filter(x => context.entities.AccountType.includes(x.accountNumber))
    context.customerAccounts = accType
    // context.debug1 = accType
    if(accType && accType.length === 1) {
        accType = accountsMap[accType[0].accountType]
    } else if(accType && accType.length>1) {
        var accTypeList = []
        accType.forEach(x => accTypeList.push(x.accountType))
        accTypeList = l.uniq(accTypeList);
        if(accTypeList && accTypeList.length ===1) {
            accType = accountsMap[accTypeList[0].accountType];
        }
    }

 var pf = context.personalFields;
 Object.keys(fieldsMap).forEach(function(x) {
    valueCode = "EDITACC-" + accType + "-" + x;
    if(fieldCodes[valueCode]) {
        var str = fieldsMap[x];
        var obj = pf.filter(a => a.value === str);
        if(str==="primaryPhone" && obj && obj.length>0 && fieldCodes["EDITACC-" + accType + "-PHN_MOB"]) {
            context.primaryMobileSupport = true;
        } else if(str==="alternatePhone" && obj && obj.length>0 && fieldCodes["EDITACC-" + accType + "-ALTPHN_MOB"]) {
            context.alternatePhoneSupport = true;
        }
        if(obj.length>0) {
            updatedPF.push(obj[0]);
        }
        }
});

  if (context.entities.personalFields && !updatedPF.map((i)=>i.value).includes(context.entities.personalFields)){
   context.taskNotSupported = true;
}

context.personalFields = updatedPF;
}
if(context.entities.personalFields && context.taskNotSupported !== true && context.session.BotUserSession.source !== "idfc") {
    var updateField = context.personalFields.filter(obj=> obj.value===context.entities.personalFields);
    // context.debug1 = updateField
    // context.debug2 = context.personalFields
    context.updateKey = updateField && updateField.length>0 ? updateField[0].name : undefined;
    if(context.entities.personalFields === "accountNickname") {
        context.entities.profileOrAccountLevel = "Account";
    }
}
if (context.entities.personalFields && context.personalFields) {
    var updateField = context.personalFields.filter(obj=> obj.value===context.entities.personalFields);
    if(updateField.length === 0){
        context.taskNotSupported = true;
    }
}