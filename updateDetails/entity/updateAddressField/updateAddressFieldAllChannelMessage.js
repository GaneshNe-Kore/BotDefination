context.customerData = context.getCustomerData && context.getCustomerData.response && context.getCustomerData.response.body ? context.getCustomerData.response.body : [];

var addressField;
if((context.entities.captureUpdateField[0] === "Permanent address" && !context.customerData.permanentAddress && !context.customerData.permanentAddressObj) || (context.entities.captureUpdateField[0] === "Resident address" && !context.customerData.location && !context.customerData.residentAddress) || (context.entities.captureUpdateField[0] === "Courier address" && !context.customerData.deliveryAddress && !context.customerData.deliveryAddressObj)){
    text = content.newAddressValue;
}else{
    if(context.entities.captureUpdateField[0] === "Resident address"){
        addressField = context.customerData.residentAddress ? context.customerData.residentAddress : context.customerData.location ? context.customerData.location : {};
    }else if(context.entities.captureUpdateField[0] === "Permanent address"){
        addressField = context.customerData.permanentAddressObj ? context.customerData.permanentAddressObj : context.customerData.permanentAddress ? context.customerData.permanentAddress : {};
    }else{
        addressField = context.customerData.deliveryAddressObj ? context.customerData.deliveryAddressObj : context.customerData.deliveryAddress ? context.customerData.deliveryAddress : {};
    }
    text = content.updateAddressValue;
    
    if(addressField && Object.keys(addressField).length > 0 && typeof(addressField) !== 'string'){
        Object.keys(addressField).forEach(obj =>{
            context.addressField.push(addressField[obj]);
        });
        context.addressField = context.addressField.join(content.seperator + " ");
    }else{
        context.addressField = addressField;
    }
}
print(text);