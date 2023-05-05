if (context.phoneNumberInvalid) {
    print(content.addPhoneNumberErrorPrompt);
} else {
    context.updateKey = content.phone_number;
    context.noPhone = false;
    // if (context.reverseflow === true) {
    //     print(content.getPhoneNumber);
    // }
    var l = koreUtil._;
    context.mobileNumberConfirmationFlag = true;
    context.profileOrAccount = context.entities.profileOrAccountLevel ?  context.entities.profileOrAccountLevel.toLowerCase() : "NA";
    
    if (context.entities.profileOrAccountLevel && context.entities.profileOrAccountLevel === "Profile") {
        if(context.entities.personalFields && context.entities.personalFields === "primaryPhone") {
            if(context.getCustomerData.response.body.phone && context.getCustomerData.response.body.phone!==null){
                context.valueToBeUpdated = context.getCustomerData.response.body.phone;
                context.mobileNumberConfirmationFlag = context.session.BotUserSession.fieldCodes["CP-CUST-PHN_MOB"];
            }else{
                context.valueToBeUpdated = "NA";
                context.noPhone = true;
            }
        } else if(context.entities.personalFields && context.entities.personalFields === "AlternatePhone") {
            if(context.getCustomerData.response.body.isAlternateMobileNumber && context.getCustomerData.response.body.isAlternateMobileNumber!==null) {
            context.valueToBeUpdated = context.getCustomerData.response.body.alternatePhoneNumber;
            context.mobileNumberConfirmationFlag = context.session.BotUserSession.fieldCodes["CP-CUST-ALTPHN_MOB"];
            } else {
                context.valueToBeUpdated = "NA";
                context.noPhone = true;
            }
        }
        
    } else {
        
        if (context.customerAccounts && context.customerAccounts.length === 1 && context.customerAccounts[0].phone && context.customerAccounts[0].phone !== null) {
                context.valueToBeUpdated = context.customerAccounts[0].phone;
                context.mobileNumberConfirmationFlag = context.session.BotUserSession.fieldCodes["EDITACC-" + context.customerAccounts[0].accountName + "-PHN_MOB"];
        } else if (context.entities.AccountType && context.entities.AccountType.length === 1) {
            var filteredArrayObj = l.filter(context.customerAccounts, {
                "accountNumber": context.entities.AccountType[0]
            });
            if (filteredArrayObj && filteredArrayObj.length === 1 && filteredArrayObj[0].phone && filteredArrayObj[0].phone !== null) {
                    context.valueToBeUpdated = filteredArrayObj[0].phone;
                    context.mobileNumberConfirmationFlag = context.session.BotUserSession.fieldCodes["EDITACC-" + filteredArrayObj[0].accountName + "-PHN_MOB"];
                
            } else {
                context.valueToBeUpdated = "NA";
                context.noPhone = true;
            }
        }

    }
    if (context.noPhone) {
        print(content.noPhoneNum + " "+content.fieldToBeQuery);
    } else {
        if (context.session.BotUserSession.isIVR && (context.valueToBeUpdated !== "NA" || context.valueToBeUpdated !== undefined)) {
            context.valueToBeUpdated = context.valueToBeUpdated.toString().split("").join(" ");
        }
        context.primaryOrAlternate = context.entities.primaryOrAlternate ? context.entities.primaryOrAlternate.toLowerCase():content.UpdateAccInfo_Primary.toLowerCase();
        print(content.phoneNumberTypes);
    }
}