var userMsg = content.ivr_MultipleAccounts;

context.accountEntityPrompt = true;
var accountData =
    context.workbenchAccountData && context.workbenchAccountData.length > 0 ?
    context.workbenchAccountData :
    context.accountData;

function getAccountString(accounts) {
    var account1 = [],
        account2 = "",
        allAccounts = [];
        if(context.entities.AccountFields && context.entities.AccountFields === "accountNickname") {
            accounts.forEach(function(obj) {
        var objLabel = obj.label ? obj.label : obj.accountName? obj.accountName : obj.accountType
        account1.push(objLabel);
    });
        } else {
    accounts.forEach(function(obj) {
        var objLabel = obj.nicknameLabel ? obj.nicknameLabel : obj.accountNickname ? obj.accountNickname : obj.label ? obj.label : obj.accountName;
        account1.push(objLabel);
    });
        }
    allAccounts = account1;
    if (context.session.BotUserSession.isIVR) {
        var userAcc = []
        for (i = 1; i <= allAccounts.length; i++) {
            var obj = {
                number: i,
                accountOrPayee: allAccounts[i - 1]
            }
            var option = prepareResponse(content.ivrOptionsRead, obj)
            userAcc.push(option)
        }
        account1 = userAcc;
        account2 = account1.pop();
        return [account1.join(content.seperator + " "), account2];
    } else {
        return account1.join("\n");
    }
        
        // return context.session.BotUserSession.isIVR ? [account1.join(content.seperator + " "), account2] : [allAccounts.join("\n")] ;
        // return context.session.BotUserSession.isIVR ? [account1.join(content.seperator + " "), account2] : account1.join("\n");
}

function prepareResponse(variable, obj) {
    if (variable) {
        var length = Object.keys(obj).length;
        for (var i = 0; i < length; i++) {
            var key = Object.keys(obj)[i];
            if (typeof obj[key] === "undefined") {
                obj[key] = "";
            }
            variable = variable.split("{{" + key + "}}").join(obj[key]);
        }
    }
    return variable;
}

if (context.intentName === "GetBalance" || context.intentName === "GetAccountInformation" || context.intentName === "GetCustomerInformation") {

    if (context.entities.personalFields) {
        context.fieldDetailName = context.entities.personalFields;
    } else if (context.entities.AccountFields) {
        context.fieldDetailName = context.entities.AccountFields;
    } else if(context.entities.balanceFields){
        context.fieldDetailName = context.entities.balanceFields;
    }

    // if (context.count === 1) {
        // var userMsg = content.ivr_AccountName;
        var accountData =
            context.workbenchAccountData && context.workbenchAccountData.length > 0 ?
            context.workbenchAccountData :
            context.accountData;
        const accString = getAccountString(accountData);
        //  var userMsg = content.ivr_AccountName;
        if (context.session.BotUserSession.isIVR) {
            context.items_one = accString[0];
            context.items_two = accString[1];
            userMsg = content.ivr_AccountName;
        }else{
            userMsg = content.web_AccountName + "\n" + accString;
        }
        // print(userMsg);
    // } else if (context.count === 2) {
        // print(content.ivr_reEnterAccountName)
    // } else if (context.count === 3) {
        // print(content.ivr_AccountNotFoundMsg)
        // context.count = 0;
    // }
} else if (context.intentName === "GetTransaction") {
    
    if (!context.isValidAccount && typeof(context.isValidAccount) !== "undefined") {
       
        if (context.entities.allAccountType) {
            context.accounts = context.entities.allAccountType.join(" or ");
            }
        userMsg = context.session.BotUserSession.source === "mashreq" ? content.noAccountTxnMsg : content.noAccountMultiTxnMsg;
    }if (context.accountErrorCount) {
        userMsg = content.accountTypeErrorPrompt;
    } else {
        
        context.accountErrorCount = 1;

        const accString = getAccountString(accountData);
        if (context.session.BotUserSession.isIVR) {
            context.items_one = accString[0];
            context.items_two = accString[1];
            userMsg = content.ivr_chooseAccount_list;
            
            if(context.entities.allAccountType && context.entities.allAccountType.includes("CD")){
                 //userMsg = content.noCDMsg;
                 
                 userMsg = "I did not find a CD account on your profile."
            }
        } else {
             
             userMsg = "I did not find a CD account on your profile."
          //  userMsg += "\n" + accString;
        }
    }
} else {
    if (context.entities && context.entities.AccountFields && context.entities.AccountFields === "earlyWithdrawalPenalty") {
        userMsg = content.gt_selectAccountType;
        let count = {
            "CD": 0,
            "IRA": 0
        }
        for (let i = 0; i < accountData.length; i++) {
            if ((accountData[i].accountType === "CD" || accountData[i].accountType === "IRA") && count[accountData[i].accountType] === 0) {
                userMsg += accountData[i].accountType + " \n";
                count[accountData[i].accountType] = accountData[i].accountType + 1;
            }
        }
    }
}
print(userMsg);
