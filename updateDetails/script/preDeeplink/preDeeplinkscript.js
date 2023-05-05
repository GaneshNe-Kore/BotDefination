context.redirectLink = [];
var button = [];
var captureField = context.entities.captureUpdateField[0];

if(captureField === "Passport details"){
    button = [content.udPassportDetails_button];
    context.TypeOfUpdateField = content.udPassportDetails_option;
} else if(captureField === "Emirates ID details"){
    button = [content.udEIDDetails_button];
    context.TypeOfUpdateField = content.udEIDDetails_option;
} else if(captureField === "Renewed VISA"){
    button = [content.udRenewedVISA_button];
    context.TypeOfUpdateField = content.udRenewedVISA_option;
}

var usecaseObj = {
    "Passport details" : ["upload_passport"],
    "Emirates ID details" : ["upload_EID"],
    "Renewed VISA" : ["upload_renewedvisa"]
}

var reqBody = {
    "source": context.session.BotUserSession.source,
    "usecase": usecaseObj[captureField] ? usecaseObj[captureField] : "",
};

context.reqBody = JSON.stringify(reqBody);

var usecase = usecaseObj[captureField];

for (var i = 0; i < button.length; i++) {
    if (usecase && usecase.length > 0 && usecase[i]) {
        context.redirectLink.push({
            key: button[i],
            usecase: usecase[i]
        });
    }
}
// context.session.BotUserSession.source = "kore";