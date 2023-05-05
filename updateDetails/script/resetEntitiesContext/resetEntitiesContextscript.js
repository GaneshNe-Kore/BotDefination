// clear context for entities
context.type = "";
context.updateKey = context.updateKey? context.updateKey: context.entities.personalFields
if(context.entities.newEmail){
    delete context.entities.newEmail;
    context.entities.newEmail = undefined;
}
if(context.entities.newPhoneNumber){
    delete context.entities.newPhoneNumber;
    context.entities.newPhoneNumber = undefined;
}
if(context.entities.PaymentAddress){
    delete context.entities.PaymentAddress;
    delete context.entities.stateName;
    delete context.entities.streetName;
    delete context.entities.ZipCode;
    delete context.entities.cityName;
    context.entities.PaymentAddress = undefined;
}
if(context.entities.accNickname){
    delete context.entities.accNickname;
    context.entities.accNickname = undefined;
}
context.reverseflow = true;

// if(context.paperStatementEmail && !context.pprStatementEmail){
//     delete context.entities.newEmail;
//     context.entities.newEmail = undefined;
//     context.accountEmail = true;
//     context.entities.AddOrUpdateEmail = "add";
//     context.updateKey = "email";
// }