var info = [];
var accNum = [];
var payload = [];
var accData = context.customerAccounts;
var message;
context.channels = false;


function format(currency, amount) {
    if (typeof amount === "undefined") {
        return "NA";
    }
    var formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 2,
    });
    return formatter.format(amount);
}

function maskCardNumber(cardNumber, character) {
    var maskedNumber = cardNumber;
    if (typeof character === "undefined") {
        character = "";
    }
    if (typeof cardNumber === "string") {
        maskedNumber = cardNumber.replace(/.(?=.{4,}$)/g, character);
    } else {
        maskedNumber = String(cardNumber).replace(/\d(?=\d{4})/g, character);
    }
    maskedNumber = maskedNumber && maskedNumber.length >= 7 ? maskedNumber.slice(maskedNumber.length - 7) : character.repeat(7 - maskedNumber.length) + maskedNumber;
    return maskedNumber;
}

function displayListV2Template(data) {
  var message = {
    type: "template",
  };
  var payload = {};
  payload.text = data.text;
  if(data.templateType=== "advancedListViewTemplate"){
      payload.title = data.text;
  }
  payload.displayLimit = data.displayLimit ? data.displayLimit : 5;
  payload.template_type = data.templateType ? data.templateType : "listView";
  payload.heading = data.heading;
  payload.boxShadow = data.boxShadow;
  payload.seeMore = data.seeMore;
  payload.moreCount = data.moreCount;
  payload.class = "clickAble";
  payload.headerActions = {
      'copy' : false,
      'share' : false
  };
  var elements = [];

  for (var i = 0; i < data.elements.length; i++) {
    var element = {};
    element.title = data.elements[i].title;
    if(context.session.BotUserSession.source === "idfc"){
        element.disbursalDateTitle = data.elements[i].disbursalDateTitle ? data.elements[i].disbursalDateTitle : "";
        element.disbursalDateValue = data.elements[i].disbursalDateValue ? data.elements[i].disbursalDateValue : "";
        element.disbursalAmtTitle = data.elements[i].disbursalAmtTitle ? data.elements[i].disbursalAmtTitle : "";
        element.disbursalAmtValue = data.elements[i].disbursalAmtValue ? data.elements[i].disbursalAmtValue : "";
        if (data.elements[i].accountHolderName) {
          element["accountHolderName"] = data.elements[i].accountHolderName;
        }
          element["isAddOn"] = data.elements[i].isAddOn ? data.elements[i].isAddOn : false;
          element["cardType"] = data.elements[i].cardType;
          element["addOnColor"] = (data.elements[i].cardType && data.elements[i].cardType.toLowerCase() === "addon") ? "#ffffff" : "";
    	  element["addOnbgColor"] = (data.elements[i].cardType && data.elements[i].cardType.toLowerCase() === "addon") ? "#d64527" : "";
    }

    element.type = "postback"
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

context.info = info;

var domestickDisplayObj = {
    "atm" : "Domestic ATM limit",
    "online" :"Domestic online limit",
    "offline":"Domestic POS limit",
    "contactless" : "Domestic Contactless limit",
    "international": "Domestic limit"
}

var internationalDisplayObj = {
    "atm" : "International ATM limit",
    "online" :"International online limit",
    "offline":"International POS limit",
    "contactless" : "International Contactless limit",
    "international": "International limit"
}

var text = "";
if (context.loanaccountname) {
    text = content.multipleAccounts;
} else {
    text = context.multipleDisplayMessage;
}

if(context.session.BotUserSession.source.toLowerCase() === "idfc" && context.entities.isStatement && context.entities.isStatement.toLowerCase()=== "statement"){
    text = content.chooseAccountStmt;
}else if(context.session.BotUserSession.source.toLowerCase() === "idfc" && context.entities.SelectCardType && context.entities.SelectCardType === "Debit" && context.entities.SelectCardIssue && (context.entities.SelectCardIssue === "lost" || context.entities.SelectCardIssue === "freeze" || context.entities.SelectCardIssue === "stolen" || context.entities.SelectCardIssue === "damage")){
    text = content.selectOneCard;
}else if(context.session.BotUserSession.source.toLowerCase() === "idfc" && context.entities.SelectCardType && context.entities.SelectCardType === "Credit" && context.entities.SelectCardIssue && (context.entities.SelectCardIssue === "lost" || context.entities.SelectCardIssue === "freeze" || context.entities.SelectCardIssue === "stolen" || context.entities.SelectCardIssue === "damage")){
    text = content.selecttoFreezeCard;
}else if(context.session.BotUserSession.source.toLowerCase() === "idfc" && context.entities.relaceCard && context.entities.relaceCard === "replace"){
        text  = content.selectOneCard;
 }
 
 
 if(context.session.BotUserSession.source.toLowerCase() === "idfc" && context.entities.ManageKeywords && context.entities.ManageKeywords === "manage"){
     text = content.selectCreditCardFrChange;
 }else if(context.entities.ManageKeywords && ["enable", "disable"].includes(context.entities.ManageKeywords)){
    text = content.selectCardForLimits;
}else if(context.entities.channelType){
    text = content.selectCardForLimits;
}else if(context.session.BotUserSession.source.toLowerCase() === "idfc" && context.entities.AccountFields && context.entities.AccountFields.toLowerCase() === "availablecredit"){
     text = content.selectCardForLimit;
 }else if(context.session.BotUserSession.source.toLowerCase() === "idfc" && context.entities.AccountFields && context.entities.AccountFields === "interestRate" && context.accountTypes && context.accountTypes[0] === "Credit Card"){
     text = content.multipleCCRpts;
 }

 
if(context.intentName === "ResetPin" && context.session.BotUserSession.source.toLowerCase() === "idfc"){
     text = content.selectCardToResetPin;
}

if(context.entities.personalFields &&  context.entities.personalFields === "email" && context.session.BotUserSession.source.toLowerCase() === "idfc" && context.accountTypes && context.accountTypes.length === 1 && context.accountTypes[0]==="Credit Card"){
    text = content.multipleCC_Email;
}else if(context.entities.AccountFields && context.entities.AccountFields === "expDate" && context.session.BotUserSession.source.toLowerCase() === "idfc"){
    text = content.expiry_prompt;
}else if(context.entities.AccountFields && context.entities.AccountFields === "CVV" && context.session.BotUserSession.source.toLowerCase() === "idfc"){
    text = content.cvv_prompt;
}else if(context.entities.AccountFields && context.entities.AccountFields === "cardNumber" && context.session.BotUserSession.source.toLowerCase() === "idfc"){
    text = content.cardNumber_prompt;
}else if(context.entities.AccountFields &&  context.entities.AccountFields === "availableBalance" && context.session.BotUserSession.source.toLowerCase() === "idfc"){
    text =  content.CC_Balance;
}

if(context.entities.invalidAccountNumber  && context.session.BotUserSession.source.toLowerCase() === "idfc"){
    text = content.CCNotFound;
}

if(context.intentName === "GetTransaction" || context.intentName === "GetAccountInformation" || context.intentName === "GetBalance" || context.intentName.toLowerCase() === "resetpin" || context.intentName.toLowerCase() === "cardissues" || context.intentName.toLowerCase() === "rewardsscore" || context.intentName.toLowerCase() === "viewstatus" || context.intentName.toLowerCase() === "viewlimits" || context.intentName.toLowerCase() === "cardsaccountslimitsmanage" || context.intentName.toLowerCase() === "getcustomerinformation"){
    var elements = [];
    for (i = 0; i < accData.length; i++) {
        var element = {};
        var accountName = accData[i].accountNickname;
        if (
            accData[i].accountName &&
            accData[i].accountName.toLowerCase() === "credit card"
        ) {
            element["title"] = accountName;
            element["value"] = maskCardNumber(accData[i].cardNumber, "X") + "";
            if (element["value"] && element["value"].length > 6) {
                element["value"] = element["value"].substr(
                  element["value"].length - 7
                );
              }
            if(context.session.BotUserSession.source.toLowerCase() === "idfc"){
                element['subtitle'] = accData[i].cardType;
            if(context.entities.AccountFields && (context.entities.AccountFields === "availableBalance" || context.entities.AccountFields === "principalBalance")){
                element["title"]  = accData[i].accountNickname,
                element["value"]  = maskCardNumber(accData[i].accountNumber, 'X');
                element['disbursalAmtTitle'] = "Outstanding Balance";
                element['disbursalAmtValue'] = Number(accData[i].principalBalance)< 0 ?  format(accData[i].currency,(-1)*Number(accData[i].principalBalance)) : (format(accData[i].currency,accData[i].principalBalance));
            }else if(context.entities.ManageKeywords && ["manage","increase","decrease"].includes(context.entities.ManageKeywords.toLowerCase()) ){
                  element["title"]  = accData[i].accountNickname;
                  element["value"]  = maskCardNumber(accData[i].accountNumber, 'X');
            }else if(context.entities.channelType){
                   element["title"]  = accData[i].accountNickname+ " " + maskCardNumber(accData[i].cardNumber, 'X');
                   element["value"]  = ( accData[i].cardChannelInfo && accData[i].cardChannelInfo["international"] && accData[i].cardChannelInfo["international"]["enable"]) ?  internationalDisplayObj[context.entities.channelType]+ " : " + format(accData[i].currency,accData[i].cardChannelInfo["international"]["limit"]) : internationalDisplayObj[context.entities.channelType] + ": Disabled";
                   element["disbursalAmtTitle"]  = domestickDisplayObj[context.entities.channelType];
                   if(context.entities.channelType.toLowerCase() === 'international'){
                      element["disbursalAmtValue"]  = accData[i].maxTransactionLimit ? format(accData[i].currency,accData[i].maxTransactionLimit) : "Disabled";
                   }else{
                      element["disbursalAmtValue"]  =  (context.entities.channelType === "atm") ?  ( (accData[i].cardChannelInfo && accData[i].cardChannelInfo.ATM && accData[i].cardChannelInfo.ATM.enable) ? format(accData[i].currency,accData[i].cardChannelInfo.ATM.limit) : "Disabled") : (  (accData[i].cardChannelInfo && accData[i].cardChannelInfo[context.entities.channelType] && accData[i].cardChannelInfo[context.entities.channelType].enable)  ? format(accData[i].currency,accData[i].cardChannelInfo[context.entities.channelType].limit)  : "Disabled" );
                   }
            }else if(context.entities.AccountFields && context.entities.AccountFields.toLowerCase() === "availablecredit"){
                element["title"]  = accData[i].accountNickname,
                element["value"]  = maskCardNumber(accData[i].accountNumber, 'X');
                element['disbursalAmtValue'] = format(accData[i].currency,accData[i].availableCredit);
            }else if(context.intentName.toLowerCase() === "updateaccountinfo"){
                     element["title"] = accData[i].cardName;
                     element["value"]  = maskCardNumber(accData[i].cardNumber, 'X');
            }else if(context.entities.personalFields && context.entities.personalFields === "email"){
                context.isEmail = true;
                element["title"]  = accData[i].accountNickname,
                element["value"]  = maskCardNumber(accData[i].accountNumber, 'X');
                element['disbursalAmtTitle'] = "Email Address";
                element['disbursalAmtValue'] = accData[i].maskedCCEmail ? accData[i].maskedCCEmail : accData[i].email;
            
            }
            
            }
            element["color"] = "#222222";
            element["isClickable"] = {
                title: element["title"],
                value: element["title"],
                type: "postback",
                payload: accData[i].cardNumber,
            };
        } else   {
            element["title"] = accountName;
            element["value"] = maskCardNumber(accData[i].accountNumber, "X");
            if(context.intentName.toLowerCase() === "resetpin" || context.intentName.toLowerCase() === "cardissues" || context.intentName === "GetAccountInformation" || context.intentName.toLowerCase() === "cardsaccountslimitsmanage" || context.intentName.toLowerCase() === "viewlimits" || context.intentName.toLowerCase() === "viewstatus"){
                 element["title"] = accData[i].cardName;
                 element["value"] = maskCardNumber(accData[i].cardNumber, 'X');
                 if(context.entities.ManageKeywords && ["manage","increase","decrease"].includes(context.entities.ManageKeywords.toLowerCase()) ){
                     element["title"] = accData[i].cardName;
                     element["value"]  = maskCardNumber(accData[i].cardNumber, 'X');
                 }else if( context.entities.SelectCardIssue && ["lost","damage","stolen","freeze","unfreeze"].includes(context.entities.SelectCardIssue)  ){
                     element["title"] = accData[i].cardName;
                     element["value"]  = maskCardNumber(accData[i].cardNumber, 'X');
                 }else if(context.intentName.toLowerCase() === "updateaccountinfo"){
                     element["title"] = accData[i].cardName;
                     element["value"]  = maskCardNumber(accData[i].cardNumber, 'X');
                 }else if(context.intentName.toLowerCase() === "resetpin"){
                     element["title"] = accData[i].cardName;
                     element["value"]  = maskCardNumber(accData[i].cardNumber, 'X');
                 }else if(context.entities.channelType){
                     element["title"] = accData[i].cardName +" "+maskCardNumber(accData[i].cardNumber, 'X');
                     if((context.entities.channelType === "international") || (accData[i].onlydomestic)){
                         element["value"] = " "
                     }else{
                          element["value"]  =  (context.entities.channelType === "atm") ? ( (accData[i].cardChannelInfo && accData[i].cardChannelInfo.ATM && accData[i].cardChannelInfo.ATM.meta &&  accData[i].cardChannelInfo.ATM.meta.internationalStatus) ? ( internationalDisplayObj[context.entities.channelType] + " : " + format(accData[i].currency,accData[i].cardChannelInfo.ATM.meta.internationalLimit) ) : internationalDisplayObj[context.entities.channelType] + " : " + "Disabled" ) : (  (accData[i].cardChannelInfo && accData[i].cardChannelInfo[context.entities.channelType]  && accData[i].cardChannelInfo[context.entities.channelType]["meta"] && accData[i].cardChannelInfo[context.entities.channelType]["meta"]["internationalStatus"]) ? internationalDisplayObj[context.entities.channelType] + " : " + format(accData[i].currency,accData[i].cardChannelInfo[context.entities.channelType]["meta"]["internationalLimit"]) : internationalDisplayObj[context.entities.channelType] + " : " + "Disabled" );
                            element["disbursalAmtTitle"]  = domestickDisplayObj[context.entities.channelType];
                            element["disbursalAmtValue"]  =  (context.entities.channelType === "atm") ?  ( (accData[i].cardChannelInfo && accData[i].cardChannelInfo.ATM && accData[i].cardChannelInfo.ATM.enable) ? (format(accData[i].currency,accData[i].cardChannelInfo.ATM.limit)) : "Disabled") : (  (accData[i].cardChannelInfo && accData[i].cardChannelInfo[context.entities.channelType] && accData[i].cardChannelInfo[context.entities.channelType].limit)  ? format(accData[i].currency,accData[i].cardChannelInfo[context.entities.channelType].limit)  : "Disabled" );
                       }
                }else if(context.session.BotUserSession.source.toLowerCase() === "idfc" &&(context.entities.AccountFields || context.entities.personalFields) && context.entities.AccountFields === "expDate" || context.entities.AccountFields === "CVV" || context.entities.personalFields === "cardNumber"){
                    element["title"] = accData[i].cardName,
                     //element["subtitle"] = accData[i].nameOnAccount ? accData[i].nameOnAccount :"";
                    element["value"] = maskCardNumber(accData[i].cardNumber, 'X');
                }
            }
            element["color"] = "#222222";
            element["isClickable"] = {
                title: element["title"],
                value: element["title"],
                type: "postback",
                payload: accData[i].cardNumber,
            };
            }
        
     
        elements.push(element);
         context.elements = elements;
        
    }
    var templateData = {};
    templateData['text'] = text;
    templateData['elements'] = elements;
    if(context.session.BotUserSession.source.toLowerCase() === "idfc"){
        if(context.entities.AccountFields && ["availableBalance","principalBalance"].includes(context.entities.AccountFields)){
          templateData["templateType"] = "advancedListViewTemplate";
      }else if(context.entities.isStatement || (context.entities.ManageKeywords && ["manage","increase","decrease"].includes(context.entities.ManageKeywords.toLowerCase()) ) ){
         templateData["templateType"] = "advancedListViewTemplate";
      }else if(context.entities.SelectCardIssue && ["lost","damage","stolen",'freeze','unfreeze'].includes(context.entities.SelectCardIssue) ){
         templateData["templateType"] = "advancedListViewTemplate";
      }else if(context.intent.toLowerCase() === "resetpin"){
         templateData["templateType"] = "advancedListViewTemplate";
      }else if(context.entities.personalFields && context.entities.personalFields === "email"){
          templateData["templateType"] = "advancedListViewTemplate";
      }else if(context.intent.toLowerCase() === "updateaccountinfo"){
          templateData["templateType"] = "advancedListViewTemplate";
      }else if(context.entities.channelType){
          templateData["templateType"] = "advancedListViewTemplate";
      }else if(context.entities.AccountFields && (context.entities.AccountFields.toLowerCase() === "availablecredit" || context.entities.AccountFields === "dueAmount")){
          templateData["templateType"] = "advancedListViewTemplate";
      }else if(context.session.BotUserSession.source.toLowerCase() === "idfc" &&(context.entities.AccountFields || context.entities.personalFields) && (context.entities.AccountFields === "expDate" || context.entities.AccountFields === "rewardPoints") || context.entities.AccountFields === "CVV" || context.entities.personalFields === "cardNumber"){
         templateData["templateType"] = "advancedListViewTemplate";
      }else if(context.intent.toLowerCase() === "getaccountinformation" && (context.entities.AccountFields && context.entities.AccountFields==="accountDetails")){
          templateData["templateType"] = "advancedListViewTemplate";
      }
      else if(context.entities.AccountFields=="dueAmount" || context.entities.AccountFields=="minimumPaymentDue")
      {
          templateData["templateType"]="advancedListViewTemplate";
      }else if(context.intentName && context.intentName.toLowerCase() === "gettransaction"){
          templateData["templateType"] = "advancedListViewTemplate";
      }
      if( templateData["templateType"] === "advancedListViewTemplate"){
          templateData['moreCount'] = 3;
          templateData["displayLimit"] = 3;
            if(elements.length > 3){
                templateData['seeMore'] = true;
            }
      }
    message = displayListV2Template(templateData);
    }
    message = displayListV2Template(templateData);
}else{
message = {
    "type": "template",
    "payload": {
        "template_type": "button",
        "text": text,
        "subText": "Button Template Description",
        "buttons": []
    }
};
for (i = 0; i < info.length; i++) {
    // if the button is to send back text to platform
    var button = {
        "type": "postback",
        "title": info[i],
        "payload": info[i]
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

//IDFC credit card email case
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
        //var accountName = accData[i].accountNickname.split("-")[0].trim();
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
            //element["value"] = accData[i].CardStatus;//maskCardNumber(accData[i].accountNumber, "X");
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