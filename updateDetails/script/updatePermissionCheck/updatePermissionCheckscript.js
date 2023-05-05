// if(context.intentName === "updateDetails") {
// To check whether user is allowed to update that particular field
var fieldObj = fieldsUpdateEligibility(context.entities.personalFields);
context.customerAddress = false;
context.accountAddress = false;

function fieldsUpdateEligibility(type) {
    var eligibleAccountInfoUpdateList = ["accountNickname", "email", "primaryPhone", "location", "alternatePhone" ];
    var eligibleCustomerInfoUpdateList = ["email", "primaryPhone", "location", "alternatePhone"];
    if (eligibleAccountInfoUpdateList.includes(type)) {
        return {
            isAllowed: true,
            type: "Account",
        };
    } else if (eligibleCustomerInfoUpdateList.includes(type)) {
        return {
            isAllowed: true,
            type: "Customer",
        };
    }
    return {
        isAllowed: false,
        type: "",
    };
}

// setting field based on the personal field entity  captured.
if (context.entities.profileOrAccountLevel && context.entities.profileOrAccountLevel.toLowerCase() === "profile") {
    if (fieldObj && fieldObj.type) {
        fieldObj.type = "Customer";
    }
} else {
    fieldObj.type = "Account";
}



context.AllowedToUpdate = fieldObj.isAllowed;
var body = {};
context.accNames = "";

if (context.entities.PaymentAddress) {
        context.paymentAddr = context.entities.PaymentAddress;
    //text ="";
    if (fieldObj.type === "Customer") {
        context.customerAddress = true;
    }
    if (fieldObj.type === "Account") {
        context.accountAddress = true;
    }
}

// constructing  payload for respective update account or customer services.
if (context.AllowedToUpdate) {
    if (fieldObj.type === "Customer") {
        context.fieldToUpdate = context.updateKey
        context.fieldTypeObj = "Customer";
        body["customerId"] = context.session.BotUserSession.customerID;
        if (context.entities.newEmail) {
            body["email"] = context.entities.newEmail;
        } else if (context.entities.newPhoneNumber) {
            context.fieldToUpdate = content.phone_number;
            if (context.entities.primaryOrAlternate && context.entities.primaryOrAlternate === "Alternate") {
                body["alternatePhoneNumber"] = context.entities.newPhoneNumber;
                body["isAlternateMobileNumber"] = (context.entities.mobileNumberConfirmation === "yes") ? true : false;
            } else {
                body["phone"] = context.entities.newPhoneNumber;
                body["isPrimaryMobileNumber"] = (context.entities.mobileNumberConfirmation === "yes") ? true : false;
            }
        } else if (context.entities.PaymentAddress) {
            body["location"] = context.paymentAddr;
        }
        if(context.authCode) {
            body["authCode"] = context.authCode;
        }
    } else if (fieldObj.type === "Account") {
        if (context.customerAccounts.length !== 1) {
            if (context.entities.AccountType) {
            var customerAccounts = [];
            for(var i = 0;i<context.entities.AccountType.length;i++){
               accountObjectForAllAccountType = context.customerAccounts.filter(accObj => accObj.accountNumber === context.entities.AccountType[i]);
               customerAccounts = customerAccounts.concat(accountObjectForAllAccountType);
            }
                context.customerAccounts = customerAccounts;
            }
        }
        context.id = [context.customerAccounts[0].accountNumber];
        body["accountNumber"] = context.customerAccounts[0].accountNumber;
        if (context.entities.accNickname) {
            body["accountNickname"] = context.entities.accNickname;
            context.accNames = context.customerAccounts[0].nicknameLabel;
            context.key = "accountNickname";
            context.value = context.entities.accNickname;
            context.fieldToUpdate = context.updateKey;
        } else if (context.entities.newEmail) {
            body["email"] = context.entities.newEmail;
            context.key = "email";
            context.value = context.entities.newEmail;
        } else if (context.entities.newPhoneNumber) {
            context.fieldToUpdate = content.phone_number;
            if (context.entities.primaryOrAlternate && context.entities.primaryOrAlternate === "Alternate") {
                body["alternatePhoneNumber"] = context.entities.newPhoneNumber;
                context.key = "alternatePhoneNumber";
                context.value = context.entities.newPhoneNumber;
                context.alternateKey = "isAlternateMobileNumber";
                context.alternateValue = (context.entities.mobileNumberConfirmation === "yes") ? true : false;
            } else {
                body["phone"] = context.entities.newPhoneNumber;
                context.key = "phone";
                context.value = context.entities.newPhoneNumber;
                context.alternateKey = "isPrimaryMobileNumber";
                context.alternateValue = (context.entities.mobileNumberConfirmation === "yes") ? true : false;
            }
        } else if (context.entities.PaymentAddress) {
            body["location"] = context.paymentAddr;
            context.key = "location";
            context.value = context.entities.PaymentAddress;
        } else if (context.entities.paperStatementStatus) {
            var accNumberList = [];
            for (var i = 0; i < context.customerAccounts.length; i++) {
                accNumberList.push(context.customerAccounts[i].accountNumber);
                context.accNames += context.customerAccounts[i].nicknameLabel;
                if (i + 1 < context.customerAccounts.length) {
                    context.accNames += ", "
                }
            }
            body["accountNumber"] = accNumberList;
            context.id = accNumberList;
            context.entities.paperStatementStatus = (context.entities.paperStatementStatus === "true") ? true : false;
            var custEmail;
            if (context.getCustomerData && context.getCustomerData.response && context.getCustomerData.response.body && context.getCustomerData.response.body.email) {
                custEmail = context.getCustomerData.response.body.email;
            }
            if(context.customerAccounts && context.customerAccounts.length > 1 && custEmail){
                context.custEmail = custEmail;
            }
            else if(context.entities.AccountType && context.customerAccounts && context.customerAccounts.length > 0){
                context.custEmail = context.customerAccounts[0].email;
            }else if(custEmail){
                context.custEmail = custEmail;
            }
            body["isStatement"] = context.entities.paperStatementStatus;
            context.key = "isStatement";
            context.value = context.entities.paperStatementStatus;
        }
        if(context.authCode) {
            body["authCode"] = context.authCode;
        }
    }
    if(context.session.BotUserSession.source.toLowerCase()==="idfc"){
        if(context.session.BotUserSession.otpToken){
            var preReq = context.session.BotUserSession.otpReqBody;
            if(context.entities.reTypeEmail){
                
                body["cardNumber"] = context.shortCardNo,
                body["emailId"] = context.entities.newEmail,
                body["addresSerno"] = context.addresSerno,
                body["Communication"] ={
                    TemplateIdentifier: "EMAIL_UPDATE",
                    maskedcardnumber: context.shortCardNo,
                    email: context.entities.newEmail,
                    mobilenumber: context.unMaskedphoneNumber
                }
                var meta = {
                'x-mfa-transaction-type': "CREDIT_CARD_EMAIL_UPDATE",
                'x-mfa-transaction-id': context.session.BotUserSession.transcation_id,
                'x-mfa-authorize-token': context.session.BotUserSession.otpToken
                }    
            }else{
                var meta = {
                'email' : context.entities.newEmail,
                'x-mfa-transaction-type': "EMAIL_UPDATE",
                'x-mfa-transaction-id': context.session.BotUserSession.transcation_id,
                'x-mfa-authorize-token': context.session.BotUserSession.otpToken
                }
            }
            
            body["meta"] = meta;
        }
        
    }
    context.fieldToUpdate = context.fieldToUpdate ? context.fieldToUpdate : context.updateKey
    context.body = JSON.stringify(body);
}