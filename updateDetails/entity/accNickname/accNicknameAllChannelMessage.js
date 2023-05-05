context.updateKey = content.prsnField_nickname;
if(context.entities.profileOrAccountLevel && context.entities.profileOrAccountLevel === "Profile"){
    context.valueToBeUpdated = context.getCustomerData.response.body.accountNickname;
}else{
    if(context.customerAccounts && context.customerAccounts.length === 1){
        context.valueToBeUpdated = context.customerAccounts[0].accountNickname;
    }else if(context.entities.AccountType && context.entities.AccountType.length === 1){
        var filteredArrayObj = context.customerAccounts.filter(obj => obj.accountNumber === context.entities.AccountType[0]);
        context.valueToBeUpdated = (filteredArrayObj && filteredArrayObj.length === 1) ? filteredArrayObj[0].accountNickname : content.notApplicable;
    }
}
print(content.updatedQuestion);