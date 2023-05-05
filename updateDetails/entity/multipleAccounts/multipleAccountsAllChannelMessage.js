var allData = {
    "CD": content.CD,
    "Credit Card": content.creditcard,
    "Mortgage": content.Mortgage,
    "Home Equity Loan": content.HomeEquityLoan,
    "IRA": content.IRA,
    "Personal Loan": content.PersonalLoan,
    "Savings Account": content.SavingsAccount,
    "Checking Account": content.CheckingAccount,
    "Line of Credit": content.LineOfCredit,
    "Home Equity Line": content.HomeEquityLine,
    "Auto Loan": content.AutoLoan,
};
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

// function getAccountString(accounts) {
//     var account1 = [],
//         account2 = "",
//         allAccounts = [];
//     accounts.forEach(function (obj) {
//         var objLabel = obj.nicknameLabel ? obj.nicknameLabel : obj.accountNickname ? obj.accountNickname : obj.label ? obj.label : obj.accountName;
//         account1.push(objLabel);
//     });
//     allAccounts = account1;
//     if (context.session.BotUserSession.isIVR) {
//         var userAcc = []
//         for(i=1; i <= allAccounts.length; i++) {
//             var obj = {
//                 number : i,
//                 accountOrPayee : allAccounts[i-1]
//             }
//             var option = prepareResponse(content.ivrOptionsRead,obj)
//             userAcc.push(option)
//         }
//         account1 = userAcc;
//         account2 = account1.pop();
//         return [account1.join(content.seperator + " "), account2];
//     } else {
//         return account1.join("\n");
//     }
// }
function getAccountString(accounts) {
    var account1 = [],
        account2 = "",
        allAccounts = [];
    accounts.forEach(function(obj) {
        var objLabel = obj.nicknameLabel ? obj.nicknameLabel : obj.accountNickname ? obj.accountNickname : obj.label ? obj.label : obj.accountName;
        allAccounts.push(objLabel);
    });
    if (context.session.BotUserSession.isIVR) {
        for (i = 1; i <= allAccounts.length; i++) {
            account1.push(prepareResponse(content.ivrOptionsRead, {
                number: i,
                accountOrPayee: allAccounts[i - 1]
            }));
        }
        account2 = account1.pop();
        return [account1.join(content.seperator + " "), account2];
    } else {
        return allAccounts.join("\n");
    }
}


var userMsg;
if (context.session.BotUserSession.isIVR) {
    context.accounts_one = getAccountString(context.customerAccounts)[0];
    context.accounts_two = getAccountString(context.customerAccounts)[1];
    if (context.entities.SelectCardType) {
        context.accType = context.entities.SelectCardType.toLowerCase() === "credit" ? content.accTypeCreditCard : content.accTypeDebitCard;
    } else if (context.entities.debitCardOrCreditCard) {
        context.accType = context.entities.debitCardOrCreditCard.toLowerCase() === "credit" ? content.accTypeCreditCard : content.accTypeDebitCard;
    } else {
        context.accType = allData[context.customerAccounts[0].accountType];
    }
    userMsg = content.ivr_multipleAccounts;
} else {
    if (context.loanaccountname || context.intentName === "LoanPayments") {
        userMsg = content.multipleAccounts + "\n" + getAccountString(context.customerAccounts);
    } else {
        userMsg = context.multipleDisplayMessage + "\n" + getAccountString(context.customerAccounts);
    }
}
print(userMsg);


