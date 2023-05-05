var phoneNumberInvalid = false, entityName = "";

if(context.entities.addPhoneNumber || context.entities.newPhoneNumber || context.entities.PhoneNumber || context.entities.MobileNumber){

if(context.entities.addPhoneNumber){
    entityName = "addPhoneNumber";
}else if(context.entities.newPhoneNumber){
    entityName = "newPhoneNumber";
}else if(context.entities.PhoneNumber){
    entityName = "PhoneNumber";
}else if(context.entities.MobileNumber){
    entityName = "MobileNumber";
}

    // Regex validation for phone number.
    // var phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
var phoneRegex = /^[+1 ]*?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if(entityName.length > 0 && context.entities[entityName] && (phoneRegex.test(context.entities[entityName]) || (String(context.entities[entityName]).length === 12 && String(context.entities[entityName])[0] === "+" && String(context.entities[entityName])[1] === "1") || (String(context.entities[entityName]).length === 11 && String(context.entities[entityName])[0] === "1"))){
        // if(context.session.BotUserSession.source === "visifi") {
        if(String(context.entities[entityName]).length === 12 && String(context.entities[entityName])[0] === "+" && String(context.entities[entityName])[1] === "1") {
           var newPhone = context.entities[entityName].slice(2,12);
        } else if(String(context.entities[entityName]).length === 11 && String(context.entities[entityName])[0] === "1") {
            var newPhone = context.entities[entityName].slice(1,11);
        }
        if(newPhone) {
            context.entities[entityName] = newPhone;
        }
        
        // }
        
    }else{
        phoneNumberInvalid = true;
        context.entities[entityName] = undefined;
    } 
    context.phoneNumberInvalid = phoneNumberInvalid;
}

if(phoneNumberInvalid!==true){
    var body = {};
    body["customerId"] = context.session.BotUserSession.customerID;
    if (context.entities.addEmail) {
        body["email"] = context.entities.addEmail;
        context.textOrMail =context.entities.addEmail;
    } 
    if (context.entities.addPhoneNumber) {
        body["phone"] = context.entities.addPhoneNumber;
    }
    context.body = JSON.stringify(body);

context.alertStatus = "";
    
}
