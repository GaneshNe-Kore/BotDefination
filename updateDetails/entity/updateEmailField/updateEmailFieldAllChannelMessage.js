context.customerData = context.getCustomerData && context.getCustomerData.response && context.getCustomerData.response.body ? context.getCustomerData.response.body : [];

var text;
if(context.entities.captureUpdateField[0] === "Primary email"){
    if(!context.customerData.email || context.customerData.email === ""){
        text = content.newEmailField;
    }else{
        text = content.updatePrimaryEmailField;
    }
} else if(!context.customerData.secondaryEmail ||context.entities.captureUpdateField[0] === "Secondary email"){
    if(context.customerData.secondaryEmail === ""){
        text = content.newEmailField;
    } else{
        text= content.updateSecondaryEmailField;
    }
}

print(text);