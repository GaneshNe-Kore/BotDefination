var buttons = [];
var accountData =
    context.workbenchAccountData && context.workbenchAccountData.length > 0 ?
    context.workbenchAccountData :
    context.accountData;

context.accountEntityPrompt = true;

context.customerAccounts = context.accountData

if (context.session.BotUserSession.source === "mashreq" && context.entities.AccountFields && context.entities.AccountFields === "accountDetails") {
    accountData = context.customerAccounts ? context.customerAccounts : accountData;
    accountData = accountData.filter(obj => !obj.cardType || obj.cardType && obj.cardType.toLowerCase() !== "supplementary")
}

var balance = {
    "Checking Account": "availableBalance",
    "Savings Account": "availableBalance",
    "Credit Card": "totalBalance",
    "Home Equity Line": "totalBalance",
    "Line of Credit": "totalBalance",
    "Mortgage": "principalBalance",
    "Auto Loan": "principalBalance",
    "Home Equity Loan": "principalBalance",
    "Personal Loan": "principalBalance",
    "CD": "currentBalance",
    "IRA": "currentBalance",
};

function displayListV2Template(data) {
    var message = {
        type: "template",
    };
    var payload = {};
    payload.text = data.text;
    payload.template_type = "listView";
    payload.lang = context.currentLanguage;
    payload.heading = data.heading;
    payload.boxShadow = data.boxShadow;
    payload.seeMore = data.seeMore;
    payload.moreCount = data.moreCount;
    var elements = [];
    if (data.elements && data.elements.length > 0) {
        for (var i = 0; i < data.elements.length; i++) {
            var element = {};
            element.title = data.elements[i].title;

            if (data.elements[i].subtitle) {
                element.subtitle = data.elements[i].subtitle;
            }
            element.value = data.elements[i].value;
            if (data.elements[i].color) {
                element.color = data.elements[i].color;
            }
            if (data.elements[i].tag) {
                element.tag = data.elements[i].tag;
            }
            if (data.elements[i].image_url) {
                element.image_url = data.elements[i].image_url;
            }
            if (data.elements[i].isClickable) {
                element["default_action"] = data.elements[i].isClickable;
            } else {
                element["default_action"] = {};
            }
            elements.push(element);
        }
    }
    payload.elements = elements;
    message.payload = payload;
    return message;
}

if (context.intentName === "GetTransaction" || context.intentName === "GetBalance" || context.intentName === "GetAccountInformation" || context.intentName === "GetCustomerInformation") {
    var elements = [];
    for (i = 0; i < accountData.length; i++) {
        var element = {};
        var accountName = accountData[i].nicknameLabel.split("-")[0].trim();
        var balanceType = balance[accountData[i].accountType];
        var subtitle = (context.intentName === "GetTransaction" && context.session.BotUserSession.source === "mashreq") ? (accountData[i].displayAccountType ? accountData[i].displayAccountType : accountData[i].accountType) : accountData[i][balanceType] && accountData[i][balanceType] !== null ? format(accountData[i].currency, accountData[i][balanceType]) : accountData[i][balanceType] === 0 ? format(accountData[i].currency, accountData[i][balanceType]) : "";
        if (accountData[i].accountType === "Credit Card") {
            element["title"] = accountName;
            element["subtitle"] = subtitle;
            element['image_url'] = accountData[i].cardImage ? accountData[i].cardImage : accountData[i].image;
            element["value"] = maskCardNumber(accountData[i].cardNumber, "X") + "";
            element["tag"] = accountData[i].cardType ? accountData[i].cardType : "";
            element["color"] = "#222222";
            element["isClickable"] = {
                title: element["title"],
                value: element["title"],
                type: "postback",
                payload: accountData[i].cardNumber,
            };
        } else {
            element["title"] = accountName;
            element["subtitle"] = subtitle;
            element['image_url'] = accountData[i].image;
            element["value"] = context.session.BotUserSession.source === "mashreq" ? accountData[i].accountNumber : maskCardNumber(accountData[i].accountNumber, "X");
            element["tag"] = context.session.BotUserSession.source === "mashreq" && context.intentName !== "GetTransaction" ? (accountData[i].displayAccountType ? accountData[i].displayAccountType : accountData[i].accountType) : "";
            element["color"] = "#222222";
            element["isClickable"] = {
                title: element["title"],
                value: element["title"],
                type: "postback",
                payload: accountData[i].accountNumber,
            };
        }
        elements.push(element);
    }
} else {
    if (context.entities.AccountFields && context.entities.AccountFields === "earlyWithdrawalPenalty") {
        let count = {
            "CD": 0,
            "IRA": 0
        }
        for (let i = 0; i < accountData.length; i++) {
            if ((accountData[i].accountType === "CD" || accountData[i].accountType === "IRA") && count[accountData[i].accountType] === 0) {
                var button = {};
                button.type = "postback";
                button.title = accountData[i].accountType;
                button.payload = button.title;
                buttons.push(button);
                count[accountData[i].accountType] = accountData[i].accountType + 1;
            }
        }
    } else {
        for (var i = 0; i < accountData.length; i++) {
            var button = {};
            button.type = "postback";
            button.title = accountData[i].nicknameLabel;
            button.payload = button.title;
            buttons.push(button);
        }
    }
}

var text = "";

try {
    if (context.session.BotUserSession.source === "mashreq" && context.entities.AccountFields === "accountDetails") {
        text = content.accountDetailsMsg;
    } else if (context.entities.isStatement || (context.entities.AccountFields === "accountDetails" || context.entities.AccountFields === "routingNumber")) {
        // I have added this code because to display prompt when there are not account which you are mentioned.
        // text = content.chooseAccountStmt;
               if (context.entities.allAccountType) {
            context.accounts = context.entities.allAccountType.join(" or ");
        }
        text = !context.isValidAccount && typeof(context.isValidAccount) !== "undefined" ? content.noAccountMultiTxnMsg : content.chooseAccountStmt;
   
    } else if (
        context.entities.personalFields === "paperStatement" ||
        context.entities.personalFields === "accountNickname"
    ) {
        text = content.updatePM;
    } else if (!context.isValidAccount && typeof(context.isValidAccount) !== "undefined") {
        if (context.entities.allAccountType) {
            context.accounts = context.entities.allAccountType.join(" or ");
        }
        text = context.session.BotUserSession.source === "mashreq" ? content.noAccountTxnMsg : content.noAccountMultiTxnMsg;
    } else if (context.entities && context.entities.AccountFields && context.entities.AccountFields === "earlyWithdrawalPenalty") {
        text = content.gt_selectAccountType;
    } else if (context.depositQuery) {
        text = context.depositQuery;
    } else if (context.entities.AccountFields && (context.entities.AccountFields === "minimumBalance" || context.entities.AccountFields === "averageMonthlyBalance")) {
        text = content.minimumAB;
    } else if (context.entities.AccountFields && (context.entities.AccountFields === "payoffAmount")) {
        text = content.allLoanAccounts;
    } else if (context.Tenure) {
        text = content.chooseToSeeTenure;
    } else if (context.balance) {
        var text = content.idfcBalancePrompt;
    } else if (context.entities.AccountFields && context.entities.AccountFields === "OutstandingCharges") {
        text = content.LoanAccOutstandingCharges;
    } else {
        text = content.chooseAccountTxnSpecific;
    }
} catch (err) {
    text = content.chooseAccountTxnSpecific;
}



if (context.intentName === "GetTransaction") {
    if (context.accountErrorCount) {
        text = content.accountTypeErrorPrompt;
    } else {
        context.accountErrorCount = 1;
    }
}

var message;
if (context.intentName === "GetTransaction" || context.intentName === "GetBalance" || context.intentName === "GetAccountInformation" || context.intentName === "GetCustomerInformation" || context.intentName === "DisputeTransaction") {
    var templateData = {};
    templateData['text'] = text;
    templateData['elements'] = elements;
    context.elements = elements;
    templateData['moreCount'] = 25;
    if (elements && elements.length > 25 && context.session.BotUserSession.source !== "mashreq") {
        templateData['seeMore'] = true;
    }
    message = displayListV2Template(templateData);
} else {
    message = {
        type: "template",
        payload: {
            template_type: "button",
            text: text,
            buttons: buttons,
        },
    };
}

print(JSON.stringify(message));