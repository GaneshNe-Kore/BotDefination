
if(context.entities.personalFields && context.entities.personalFields.toLowerCase() === "location"){
    print(content.ivr_addressProfOrAcc);
}
else{
    if(context.entities.personalFields) {
        var type = context.entities.personalFields.split(/(?=[A-Z])/).join(" ").toLowerCase();
        context.fieldType = type
        print(content.ivr_profileOrAccount);
    } else {
        print(content.ivr_profileOrAccountNoFields);
    }

}