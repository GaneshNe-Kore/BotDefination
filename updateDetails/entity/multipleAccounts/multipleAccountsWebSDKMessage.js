var info = [];
var payload = [];
var accData = context.customerAccounts;
var message;

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

    for (var i = 0; i < data.elements.length; i++) {
        var element = {};
        element.title = data.elements[i].title;
        if (data.elements[i].subtitle) {
            // if (data.elements[i].subtitle.length > 6) {
            //     element.subtitle = data.elements[i].subtitle.substr(data.elements[i].subtitle.length - 6);
            // } else {
            element.subtitle = data.elements[i].subtitle;
            // }
        }
        element.value = data.elements[i].value;
        if (data.elements[i].color) {
            element.color = data.elements[i].color;
        }
        if (data.elements[i].tag) {
            element.tag = data.elements[i].tag;
        }
        if(data.elements[i].image_url){
            element.image_url = data.elements[i].image_url;
        }
        if (data.elements[i].isClickable) {
            element["default_action"] = data.elements[i].isClickable;
        } else {
            element["default_action"] = {};
        }
        // {
        //     "title": "Get Transactions from "+element.title,
        //     "type": "postback",
        //     "payload": "Get Transactions"
        // }
        elements.push(element);
    }
    payload.elements = elements;
    message.payload = payload;
    return message;
}


for (i = 0; i < accData.length; i++) {
    
    if (accData[i].nicknameLabel) {
        info.push(accData[i].nicknameLabel);
    } else {
        info.push(accData[i].label);
    }
    //payload.push(accData[i].accountNumber);
}

var text = context.loanaccountname ? content.multipleAccounts : context.multipleDisplayMessage;

if (context.session.BotUserSession.source.toLowerCase() === "idfc") {
    if (context.entities.isStatement && context.entities.isStatement.toLowerCase() === "statement") {
        text = content.chooseAccountStmt;
    } else if (
        context.entities.SelectCardIssue &&
        (context.entities.SelectCardIssue === "lost" || context.entities.SelectCardIssue === "freeze" || context.entities.SelectCardIssue === "stolen" || context.entities.SelectCardIssue === "damage")
    ) {
        text = content.selectOneCard;
    } else if (context.entities.relaceCard && context.entities.relaceCard === "replace") {
        text = content.selectOneCard;
    } else if (context.entities.ManageKeywords || context.entities.ManageCardTxn || context.entities.NameOfCountry) {
        context.channels = true;
        text = content.unblockCardMsg;
    } else if (context.intent === "PIN Reset") {
        text = content.selectCardToResetPin;
    }else if(context.entities.captureCheckCard && context.entities.captureCheckCard==="loan"){
        text = content.multiLoanAcc;
    }
}

if (context.intentName === "GetTransaction" || context.intentName === "GetBalance" || (context.intent === "PIN Reset" && context.session.BotUserSession.source.toLowerCase() === "idfc")) {
    var elements = [];
    for (i = 0; i < accData.length; i++) {
        var element = {};
        var accountName = accData[i].nicknameLabel.split("-")[0].trim();
        if (accData[i].accountName && accData[i].accountName.toLowerCase() === "credit card") {
            element["title"] = accountName;
            element["subtitle"] = context.session.BotUserSession.source === "mashreq" ? accData[i].displayAccountType ? accData[i].displayAccountType : accData[i].accountType : "";
            element["value"] = maskCardNumber(accData[i].cardNumber, "X") + "";
            element['image_url'] = accData[i].image;
            if (element["value"] && element["value"].length > 6 &&  context.session.BotUserSession.source !== "mashreq") {
                element["value"] = element["value"].substr(element["value"].length - 7);
            }
            element["color"] = "#222222";
            if (accData[i].cardType) {
                element["tag"] = accData[i].cardType;
            }
            element["isClickable"] = {
                title: element["title"],
                value: element["title"],
                type: "postback",
                payload: accData[i].accountNumber,
            };
        } else {
            if(context.session.BotUserSession.source.toLowerCase() === "idfc" && context.entities.captureCheckCard && context.entities.captureCheckCard==="loan"){
                element["title"] = accData[i].nicknameLabel.split("-")[0].trim();
                
                element["value"] = maskCardNumber(accData[i].accountNumber, "X")+" "+format(accData[i].currency,accData[i].originalLoanAmount);
                element["color"] = "#222222";
                element["isClickable"] = {
                    title: element["title"],
                    value: element["title"],
                    type: "postback",
                    payload: accData[i].accountNumber,
                };
            }else{
                element['image_url'] = accData[i].image;
                element["subtitle"] = context.session.BotUserSession.source === "mashreq" ? accData[i].displayAccountType ? accData[i].displayAccountType : accData[i].accountType : "";
                element["title"] = context.intent === "PIN Reset" && context.session.BotUserSession.source.toLowerCase() === "idfc" ? info[i] : accountName;
                element["value"] = context.intent === "PIN Reset" && context.session.BotUserSession.source.toLowerCase() === "idfc" ? " " : (context.session.BotUserSession.source === "mashreq" ?  accData[i].accountNumber : maskCardNumber(accData[i].accountNumber, "X"));
                element["color"] = "#222222";
                element["isClickable"] = {
                    title: element["title"],
                    value: element["title"],
                    type: "postback",
                    payload: accData[i].accountNumber,
                };
            }
            
        }
        elements.push(element);
    }
    var templateData = {};
    templateData["text"] = text;
    templateData["elements"] = elements;
    message = displayListV2Template(templateData);
} else {
    message = {
        type: "template",
        payload: {
            template_type: "button",
            text: text,
            subText: "Button Template Description",
            buttons: [],
        },
    };
    for (i = 0; i < info.length; i++) {
        // if the button is to send back text to platform
        var button = {
            type: "postback",
            title: info[i],
            payload: info[i],
        };

        /* Uncomment this if the button is to redirect to url
     var button = {
     "type":"web_url", // type can be "postback" if
     "url":"URL_TO_REDIRECT",
     "title":buttons[i]
     };
     */

        message.payload.buttons.push(button);
    }
}

if(context.session.BotUserSession.source.toLowerCase() === "idfc" && context.intent === "LoanPayments"){
    
    text  = content.LoanAccOutstandingCharges;
    var elements = [];
    for (i = 0; i < accData.length; i++) {
        var element = {};
        if(accData[i].accountNickname){
            var accountName = accData[i].accountNickname.split("-")[0].trim();    
        }else{
            var accountName = accData[i].nicknameLabel.split("-")[0].trim();
        }
        
        if (accData[i].accountName && accData[i].accountName.toLowerCase() === "credit card") {
            element["title"] = accountName;
            element["value"] = maskCardNumber(accData[i].cardNumber, "X") + "";
              if (element["value"] && element["value"].length > 6) {
                element["value"] = element["value"].substr(
                  element["value"].length - 7
                );
              }
            element["color"] = "#222222";
            element["isClickable"] = {
                title: element["title"],
                value: element["title"],
                type: "postback",
                payload: accData[i].accountNumber,
            };
        } else {
            var totalCharges = accData[i].totalCharges ? accData[i].totalCharges: 0;
            var originalLoanAmt = accData[i].originalLoanAmount ? accData[i].originalLoanAmount: 0;
            var value = format(accData[i].currency, originalLoanAmt)+" "+format(accData[i].currency, totalCharges);
                element["title"] = accountName;
                element["value"] = value;
                element['subtitle'] =  maskCardNumber(accData[i].accountNumber, "X");
                element["color"] = "#222222";
               
                element["isClickable"] = {
                title: element["title"],
                value: element["title"],
                type: "postback",
                payload: accData[i].accountNumber,
            };
            }
        elements.push(element);
        
        }
        
    var templateData = {};
    templateData['text'] = text;
    templateData['elements'] = elements;
    message = displayListV2Template(templateData);
 }

if(context.tempBlocked || context.permBlocked){
 var elements = [];
 var frozenPermanentBlock = false;
 if(context.tempBlocked && context.permBlocked){
    var frozenPermanentBlock = true; 
 }
    for (i = 0; i < accData.length; i++) {
        var element = {};
        var accountName ="";
        if (accData[i].nicknameLabel) {
            accountName = accData[i].nicknameLabel;
        } else {
            accountName = accData[i].label;
        }
        if (
            accData[i].accountName &&
            accData[i].accountName.toLowerCase() === "credit card"
        ) {
            element["title"] = accountName;
            if(frozenPermanentBlock){
                element["value"] = accData[i].CardStatus;
            }
            element["color"] = "#222222";
            element["isClickable"] = {
                title: element["title"],
                value: element["title"],
                type: "postback",
                payload: accountName,
            };
        } else {
            element["title"] = accountName;
            if(frozenPermanentBlock){
                element["value"] = accData[i].CardStatus;
            }
            element["color"] = "#222222";
            element["isClickable"] = {
                title: element["title"],
                value: element["title"],
                type: "postback",
                payload: accountName,
            };
        }
        elements.push(element);
    }
    var templateData = {};
    templateData['text'] = text;
    templateData['elements'] = elements;
    message = displayListV2Template(templateData);   
}

print(JSON.stringify(message));
