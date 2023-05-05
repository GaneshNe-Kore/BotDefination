context.updateKey = content.update_emailMsg;

context.profileOrAccount = context.entities.profileOrAccountLevel ? context.entities.profileOrAccountLevel.toLowerCase(): "NA";
context.noEmail = false;
if (context.entities.profileOrAccountLevel && context.entities.profileOrAccountLevel === "Profile") {
    if (context.getCustomerData.response.body.email && context.getCustomerData.response.body.email !== "") {
        context.valueToBeUpdated = context.getCustomerData.response.body.email;
    } else {
        context.noEmail = true;
    }
} else {
    if (context.customerAccounts && context.customerAccounts.length === 1 && context.customerAccounts[0].email && context.customerAccounts[0].email !=="") {
        context.valueToBeUpdated = context.customerAccounts[0].email;
    } else if (context.entities.AccountType && context.entities.AccountType.length === 1) {
        var filteredArrayObj = context.customerAccounts.filter(obj => obj.accountNumber === context.entities.AccountType[0]);
        if (filteredArrayObj && filteredArrayObj.length === 1 && filteredArrayObj[0].email !=="") {
            context.valueToBeUpdated = filteredArrayObj[0].email;
        } else {
            //context.valueToBeUpdated = "NA";
            context.noEmail = true;
        }
    }
}
if (context.accountEmail && context.entities.AddOrUpdateEmail) {
    print(content.addNewEmail);
} else if (context.noEmail === false) {
    var text = context.session.BotUserSession.source.toLowerCase()==="idfc" ? content.ccEmail : content.updatedQuestion;
    print(text);
    //print(content.updatedQuestion);
} else {
    print(content.noEmailFound + " "+content.fieldToBeQuery);
}