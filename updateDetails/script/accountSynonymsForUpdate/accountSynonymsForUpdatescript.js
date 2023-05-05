// For adding synoynms in double codes and compose objects for allBankSupported and customer accounts.
// var supportedAccounts = env.supportedAccounts ? JSON.parse(env.supportedAccounts).accounts : [];
// context.getAllAccounts = context.getAllAccounts ? context.getAllAccounts : {
//     "response": {
//         "body": supportedAccounts
//     }
// };
if(context.entities.personalFields && context.traits && context.traits.includes("updateemail")) {
    context.entities.personalFields = "email"
}else if(context.traits && context.traits.includes("updateaddress")) {
    context.entities.personalFields = "location"
}

var l = koreUtil._
context.accountEntityPrompt = false;

var allData = [{
    "accountName": "CD",
    "synonym": "\"~codsynonyms\"",
}, {
    "accountName": "IRA",
    "synonym": "\"~iraaccountsynonyms\""
}, {
    "accountName": "Credit Card",
    "synonym": "\"~creditcardsynonyms\""
}, {
    "accountName": "Mortgage",
    "synonym": "\"~mortgagesynonyms\""
}, {
    "accountName": "Home Equity Loan",
    "synonym": "\"~homeequityloansynonyms\""
}, {
    "accountName": "Personal Loan",
    "synonym": "\"~personalloansynonyms\""
}, {
    "accountName": "Savings Account",
    "synonym": "\"~savingsaccountsynonyms\""
}, {
    "accountName": "Checking Account",
    "synonym": "\"~checkingaccountsynonyms\""
}, {
    "accountName": "Line of Credit",
    "synonym": "\"~locsynonyms\""
}, {
    "accountName": "Home Equity Line",
    "synonym": "\"~homeequitylinesynonyms\""
}, {
    "accountName": "Auto Loan",
    "synonym": "\"~autoloansynonyms\""
}];
var allAccountsData = allData;
var data = context.getAccountData ? context.getAccountData.response.body.accounts : [];

context.count = 0;
context.fetchAccNames = {};
//functions used in this script
function getSynonyms(data, keyword) {
    var synonyms = data.find(function(account) {
        return account.accountName.toLowerCase().includes(keyword.toLowerCase())
    });
    if (synonyms) return synonyms.accountNickname;
    return [];
}

function getProductCodesSynonym(givenWord) {
    var givenWordList = givenWord.split(" ");
    var result = "";
    for (var i = 0; i < givenWordList.length; i++) {
        if (givenWordList[i].match(/Account/g) && i === givenWordList.length - 1) {} else if (accountsListPC.includes(givenWordList[i].toLowerCase())) {} else {
            if (result) {
                result += " ";
            }
            result += givenWordList[i];
        }
    }
    return result;
}

function productNameCombinations(cardName){
    var words = cardName.split(" ");
    var result = [];
    var setCount = Math.pow(2, words.length) - 1;
    for (var i = 0; i < setCount; i++) {
        var innerList = [];
        for (var j = 0; j < words.length; j++) {
            var position = 1 << j;
            if ((i & position) == position) {
                innerList.push(words[j]);
            }
        }
        if(innerList.length !== 0 && innerList.length !== 1) {
            result.push('"' + innerList.join(" ") + '"');
        }
    }
 return result.concat.apply([],result);
}


function findGenericLabel(accountObj, productCodes) {
    if (accountObj.accountNickname) {
        return accountObj.accountNickname + " - " + maskCardNumber(accountObj.accountNumber);
       
    } else {
        var productName = null;
        if (productCodes && Object.keys(productCodes).length > 0) {
            productName = productCodes[accountObj.productCode];
        }
        if (productName) {
               return productName + " - " + maskCardNumber(accountObj.accountNumber);
        } else {
              return accountObj.accountName + " - " + maskCardNumber(accountObj.accountNumber);
        }
    }
}


var tempData = data,
    apostrophe = "'";
// construct workbench data 
var taskNotSupported = false;

var partialmatch = env.partialmatch ? JSON.parse(env.partialmatch)["enabled"] : false;
var synonymCombinations = env.synonymCombinations ? JSON.parse(env.synonymCombinations)["enabled"] : false;

// Product codes '
context.productCodes = [];
if (env.productcodes) {
    context.productCodes = JSON.parse(env.productcodes)["WB_prodCodes"];
}
var accountsListPC = ignorewords();
context.validationList = [];
for (var i = 0; i < data.length; i++) {
    context.fetchAccNames[data[i].accountNumber] = findGenericLabel(data[i], context.productCodes);
    var temp = [];
    temp.push("\"" + data[i].accountNumber + "\"");
    temp.push("\"" + maskCardNumber(data[i].accountNumber) + "\"");
    if (context.session.BotUserSession.isIVR) {
        temp.push("\"" + data[i].accountNumber.toString().split("").join(" ") + "\"");
        temp.push("\"" + maskCardNumber(data[i].accountNumber).toString().split("").join(" ") + "\"");
    }
    if (data[i].accountNickname) {
        if (data[i].accountNickname.toLowerCase().indexOf("checking") > -1 || data[i].accountNickname.toLowerCase().indexOf("check") > -1) {
            if (data[i].accountNickname.toLowerCase().indexOf("checking") > -1) {
                var position = data[i].accountNickname.toLowerCase().indexOf("checking");
            } else if (data[i].accountNickname.toLowerCase().indexOf("check") > -1) {
                var position = data[i].accountNickname.toLowerCase().indexOf("check");
            }
            if (position > 0) {
                var valueToBeInserted = "\"" + [data[i].accountNickname.slice(0, position), apostrophe, data[i].accountNickname.slice(position)].join('') + "\"";
                if (!temp.includes(valueToBeInserted)) {
                    temp.push(valueToBeInserted);
                }
            } else {
                var valueToBeInserted = "\"" + "'" + data[i].accountNickname.toLowerCase() + "\"";
                if (!temp.includes(valueToBeInserted)) {
                    temp.push(valueToBeInserted);
                }
            }
        } else {
            var valueToBeInserted = "\"" + data[i].accountNickname.toLowerCase() + "\"";
            if (!temp.includes(valueToBeInserted)) {
                temp.push(valueToBeInserted);
            }
        }
    }
   
    
    var txnProductCode = data[i].productName ? data[i].productName  : data[i].productCode &&  context.productCodes &&  Object.keys(context.productCodes).length > 0 ? context.productCodes[tempData[i].productCode]  : "";
          if (txnProductCode) {
          var productSyn = getProductCodesSynonym(txnProductCode);
          if (!temp.includes(productSyn)) {
            temp.push(productSyn);
          }
        }

    
    
   if(data[i].cardDetails && data[i].cardDetails.length>0 && data[i].accountType.toLowerCase() !== "credit card" ){
        var cardKind = data[i].accountType.toLowerCase() === "credit card" ? "Credit Card" : "Debit Card";
        temp.push("\"" + cardKind + "\"");
        data[i].cardDetails.forEach((card)=>{
            if(card.cardNumber && card.cardNumber!==""){
                temp.push("\"" + card.cardNumber + "\"");
                let cardNumberSplit = card.cardNumber.match(/.{1,4}/g);
                temp.push('"' + cardNumberSplit.join(" ") + '"');
                temp.push('"'+ cardNumberSplit.pop() +'"');
                temp.push("\"" + cardKind +" - "+ maskCardNumber(card.cardNumber) + "\"");
            }
            if(card.cardName && card.cardName!==""){
                 temp.push("\"" + card.cardName + "\"");
            }
            if(card.cardName && card.cardName!=="" && card.cardNumber && card.cardNumber!==""){
                temp.push("\"" + card.cardName +" - "+ maskCardNumber(card.cardNumber) + "\"");
            }
            if(card.cardType && card.cardType!=="" && card.cardNumber && card.cardNumber!==""){
                temp.push("\"" + card.cardType +" - "+ maskCardNumber(card.cardNumber) + "\"");
            }
        });
    }
    if (data[i].accountName.toLowerCase() === "credit card") {
        data[i].label = data[i].accountName + " - " + maskCardNumber(data[i].cardNumber);
        data[i].nicknameLabel = findGenericLabel(data[i], context.productCodes); //data[i].accountNickname + " - " + maskCardNumber(data[i].cardNumber);
        if (context.session.BotUserSession.isIVR) {
            data[i].label = data[i].accountName + " - " + maskCardNumber(data[i].accountNumber).split("").join(" ");
            data[i].nicknameLabel = data[i].nicknameLabel.split("-")[0] + " - " + maskCardNumber(data[i].accountNumber).split("").join(" ");
        }
        temp.push("\"" + maskCardNumber(data[i].cardNumber) + "\"");
        temp.push("\"" + data[i].nicknameLabel + "\"");
        temp.push("\"" + data[i].label + "\"");
        temp.push("\"" + data[i].accountNickname + " - " + maskCardNumber(data[i].cardNumber)+ "\"");
        if(data[i].cardNumber && data[i].cardNumber!==""){
                temp.push("\"" + data[i].cardNumber + "\"");
                let cardNumberSplit = data[i].cardNumber.match(/.{1,4}/g);
                temp.push('"' + cardNumberSplit.join(" ") + '"');
                temp.push('"'+ cardNumberSplit.pop() +'"');
        }
        if(data[i].cardName && data[i].cardName!==""){
            temp.push("\"" + data[i].cardName + "\"");
        }
       
    } else {
        data[i].label = data[i].accountName + " - " + maskCardNumber(data[i].accountNumber);
        data[i].nicknameLabel = findGenericLabel(data[i], context.productCodes); //data[i].accountNickname + " - " + maskCardNumber(data[i].accountNumber);
        if (context.session.BotUserSession.isIVR) {
            data[i].label = data[i].accountName + " - " + maskCardNumber(data[i].accountNumber).split("").join(" ");
            data[i].nicknameLabel = data[i].nicknameLabel.split("-")[0] + " - " + maskCardNumber(data[i].accountNumber).split("").join(" ");
        }
        temp.push("\"" + data[i].nicknameLabel + "\"");
        temp.push("\"" + data[i].label + "\"");   
    }
    temp.push("\"" + data[i].accountName + "\"");
    var allDataArrayObj = allAccountsData.filter(accountObj => accountObj.accountName === data[i].accountType);
    if(allDataArrayObj && allDataArrayObj.length > 0){
        temp.push(allDataArrayObj[0].synonym);
        allData = allData.filter(accountObj => accountObj.accountName !== data[i].accountType);
    }
    if(partialmatch){
        if(data[i].cardName && data[i].accountType === "Credit Card"){
            var productSyn = getProductCodesSynonym(data[i].cardName.toLowerCase());
            if (!temp.includes(productSyn)) {
                temp.push(productSyn);
            }
            
        }
        if(data[i].accountNickname){
            var productSyn = getProductCodesSynonym(data[i].accountNickname.toLowerCase());
            if (!temp.includes(productSyn)) {
                temp.push(productSyn);
            }
        }
    }
    if(synonymCombinations){
        if(data[i].productName){
            var item=[];
            item = data[i].productName ? productNameCombinations(data[i].productName.toLowerCase()) : [];
            temp = [].concat.apply(temp,item);
        }
        if(data[i].cardName && data[i].accountType === "Credit Card"){
            var item=[];
            item = data[i].cardName ? productNameCombinations(data[i].cardName.toLowerCase()) : [];
            temp = [].concat.apply(temp,item);
        }
    }
    temp = temp.filter((item, pos, self) => self.indexOf(item) == pos && ![""," "].includes(item));
    data[i].synonym = temp;
}

// context.taskNotSupported = taskNotSupported;
context.accountData = data;
context.allAccountsData = allData;
//delete context.getAccountData;
context.workbenchAccountData = data;

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
            "value": "AlternatePhone",
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

var customerData = context.getCustomerData ? context.getCustomerData.response.body: [];
var fieldCodes = context.session.BotUserSession.fieldCodes
var fieldsMap = {
    "ADDR" : "location",
    "EMAIL" : "email",
    "PHN" : "primaryPhone",
    "ALTPHN" : "AlternatePhone",
    "ACCNICK" : "accountNickname" //added this to handle if user says "update my nickname" then we need to understand that it is only account level and not profile level
    // ,
    // "PHN_MOB" : "primary mobile",
    // "ALTPHN_MOB" : "alternate mobile"
}
var updatedPF = []

var ar = Object.keys(fieldsMap)
// context.debugAR = ar
//  context.debugVALUES = []
 var pf = context.personalFields
ar.forEach(function(x) {
    valueCode = "CP-CUST-" + x
    if(fieldCodes[valueCode]) {
        var str = fieldsMap[x]
        var obj = pf.filter(a => a.value === str)
        if(str==="primaryPhone" && obj && obj.length>0 && fieldCodes["CP-CUST-PHN_MOB"]) {
            context.primaryMobileSupport = true;
        } else if(str==="AlternatePhone" && obj && obj.length>0 && fieldCodes["CP-CUST-ALTPHN_MOB"]) {
            context.alternatePhoneSupport = true;
        }
        if(obj.length>0) {
        updatedPF.push(obj[0])
        }
        }
})
if(context.entities.personalFields !== "accountNickname") { // this is added because we are filtering based on the workbench enablement and nickname exists only for Account level
    context.personalFields = updatedPF;
}

//Here we have to first filter the accountTypes based on workbench setting, For that we require a new workbench contract.
//Only casa accounts are enabled then use can update email address otherwise there will be different flow
if(context.session.BotUserSession.source.toLowerCase()==="idfc"){
    
    if(context.entities.personalFields && (context.entities.personalFields === "location" || context.entities.personalFields === "phone")){
        context.isUpdateTrue = true;
    }
    var casa = [];
    var noncasa = [];
    var noncasaCC = [];
    
    context.accountData.forEach((accountObj) => {
		 if(accountObj.accountType.toLowerCase()==="savings account" || accountObj.accountType.toLowerCase()==="checking account" || accountObj.accountType.toLowerCase()==="cd" || accountObj.accountType.toLowerCase()==="rd"){
			casa.push(accountObj);
		 }else if(accountObj.accountType.toLowerCase()==="auto loan" || accountObj.accountType.toLowerCase()==="personal loan" || accountObj.accountType.toLowerCase()==="home equity loan" || accountObj.accountType.toLowerCase()==="mortgage"){
			noncasa.push(accountObj);
		 }else if(accountObj.accountType.toLowerCase()==="credit card"){
			noncasaCC.push(accountObj);
		 }
        });

    if(noncasa.length>0 && casa.length>0 && noncasaCC.length>0){
        context.casaPlus = true;
        context.creditAcc = true;
    }else if(noncasa.length>0 && casa.length>0){
        context.casaPlus = true;
    }else if(casa.length>0 && noncasaCC.length>0){
        context.casaPlus = true;
        context.creditAcc = true;
    }else if(noncasa.length>0 && noncasaCC.length>0){
        context.casa = false;
        context.creditAcc = true;
    }else if(casa.length>0){
        context.casa = true;
    }else if(noncasa.length>0){
        context.casa = false;
    }else if(noncasaCC.length>0){
        context.creditAcc = true;
    }
}

if (context.entities.personalFields === "email" && context.session.BotUserSession.source.toLowerCase()==="idfc") {
    context.updateKey = "email";
    if((context.entities.AccountType && context.entities.AccountType.length > 0 && context.accountTypes && context.accountTypes.includes("Credit Card")) || (context.entities.allAccountType && context.entities.allAccountType.includes("Credit Card"))){
          context.entities.profileOrAccountLevel = "Account";
          context.customerAccounts = (context.entities.allAccountType && context.entities.allAccountType.includes("Credit Card")) ? customerAccounts : context.customerAccounts;
          context.emailCC = true;
          BotUserSession.put("attemptsCount", 3);
            if(context.customerAccounts && context.customerAccounts.length>0 && context.hasAccount){
                  for (var i = 0; i < context.customerAccounts.length; i++) {
                      context.dataNotFound = true;
                      if (context.customerAccounts[i].email) {
                        context.dataNotFound = false;
                        context.accountEmail = true;
                        break;
                      }
                    }
            }
            if(!context.dataNotFound){
               koreDebugger.log("CC email case")
               if(context.customerAccounts && context.customerAccounts.length>0 && context.hasAccount){
                   context.hasAccount = true
                   context.noAccounts = false;
                   var customerAccounts = context.customerAccounts.filter(accountObj=>accountObj.accountName==="Credit Card");
                   context.customerAccounts = customerAccounts;   
                   var  activeAccounts = context.customerAccounts.filter(obj => obj.CardStatus.toLowerCase() === "active" || obj.CardStatus.toLowerCase() === "norm");
                   //context.customerAccounts = activeAccounts;
                   if(activeAccounts && activeAccounts.length > 1){
                       var primaryCCAcc = activeAccounts.filter(obj => obj.cardType.toLowerCase()==="primary");
                       if(primaryCCAcc && primaryCCAcc.length>1){
                            context.isMultiCard = true;
                            if(context.entities.invalidAccountNumber){
                                context.multipleDisplayMessage = content.CCNotFound;
                            }else{
                                context.multipleDisplayMessage = content.multipleCC;
                            }
                            
                            context.customerAccounts = primaryCCAcc;
                        }else if(primaryCCAcc && primaryCCAcc.length===1){
                            context.entities.multipleCards = primaryCCAcc[0].cardNumber;
                            context.singleCard = true;
                            if(context.entities.invalidAccountNumber){
                                context.multipleDisplayMessage = content.CCNotFound;
                            }else{
                                context.multipleDisplayMessage = content.multipleCC;
                            }
                            context.customerAccounts = primaryCCAcc;
                        }else{
                            context.noPrimaryCC = true;
                            context.linkInfo = content.addOnCCCardLink;
                        }
                   }else if(activeAccounts && activeAccounts.length === 1){
                       var primaryCCAcc = activeAccounts.filter(obj => obj.cardType.toLowerCase()==="primary");
                       if(primaryCCAcc && primaryCCAcc.length===1){
                           context.singleCard = true;
                            context.entities.multipleCards = primaryCCAcc[0].cardNumber;
                            context.customerAccounts = activeAccounts;
                        }else{
                            context.noPrimaryCC = true;
                            context.linkInfo = content.addOnCCCardLink;
                        }
                        
                   }else if(activeAccounts && activeAccounts.length === 0){
                        var newCreditCards =  context.customerAccounts.filter(obj => obj.CardStatus.toLowerCase() === "new");
                        if(newCreditCards && newCreditCards.length > 0){
                            context.newCCCardFound = true;
                        }else{
                            context.noActiveCreditCards =  true; 
                        }
                   }
               }else{
                   context.noCreditCard = true;
                   
               }
            }
        //   var custData = !customerDataObject.email ? true : false;
        //   context.custData = custData;
        //context.phoneNumber = customerDataObject.phone !== null ? customerDataObject.phone : "NA";
      }else{
    context.visit = !context.entities.allAccountType && !context.entities.AccountType && /*!context.entities.AccountNumber*/ !context.entities.profileOrAccountLevel ? true : false;
    context.visitAccountType = context.entities.profileOrAccountLevel === "Account" && !context.entities.AccountType ? true : false;
    if (context.entities.profileOrAccountLevel && context.entities.profileOrAccountLevel.toLowerCase() === "profile") {
        context.dataNotFound = !customerDataObject.email ? true : false;
    } else if ((context.entities.profileOrAccountLevel && context.entities.profileOrAccountLevel.toLowerCase() === "account") || context.entities.allAccountType || context.entities.AccountType || context.entities.AccountNumber) {
        for (var i = 0; i < context.customerAccounts.length; i++) {
            context.dataNotFound = true;
            if (context.customerAccounts[i].email) {
                context.dataNotFound = false;
                break;
            }
        }
    } else {
        var custData = !customerDataObject.email ? true : false;
        var accData = context.customerAccounts && context.customerAccounts.length === 0 ? true : false;
        for (var i = 0; i < context.customerAccounts.length; i++) {
            accData = true;
            if (context.customerAccounts[i].email) {
                accData = false;
                break;
            }
        }
        context.custData = custData;
        context.accData = accData;
        context.dataNotFound = custData && accData ? true : false;
        context.entities.profileOrAccountLevel = custData && !accData ? "Account" : !custData && accData ? "Profile" : undefined;
    }
}
}

var pfShortCodes = l.invert(fieldsMap)
if(context.entities.profileOrAccountLevel && context.entities.personalFields) {
    if(context.entities.profileOrAccountLevel === "Profile") {
        if(!fieldCodes["CP-CUST-"+ pfShortCodes[context.entities.personalFields]]) {
            taskNotSupported = true
        }
    }

}
context.taskNotSupported = taskNotSupported;
if(context.entities.personalFields && taskNotSupported !== true && context.session.BotUserSession.source !== "idfc") {
    var updateField = context.personalFields.filter(obj=> obj.value===context.entities.personalFields)
    context.updateKey = updateField && updateField.length>0 ? updateField[0].name : undefined
    if(context.entities.personalFields === "accountNickname") {
        context.entities.profileOrAccountLevel = "Account"
    }
}