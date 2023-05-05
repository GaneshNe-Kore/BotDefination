context.personalFields = [{
            "name": content.acc_nickname,
            "value": "accountNickname",
            "synonyms": [
                "\"~nickname\""
            ],
            "label": content.prsnField_nickname,
        },
        {
            "name": content.prsnField_email,
            "value": "email",
            "synonyms": [
                "\"~eemail\"",
                "\"~emailpersonalfield\""
            ],
            "label": content.prsnField_email,
        },
        {
            "name": content.prsnField_phoneNum,
            "value": "primaryPhone",
            "synonyms": [
                "\"~phonenumber\""
            ],
            "label": content.prsnField_phoneNum,
        },
        {
            "name": content.prsnField_phoneNum,
            "value": "AlternatePhone",
            "synonyms": [
               "\"~primaryoralternatealternate\"",
               "\"~primaryoralternatealternatenumber\""
            ],
            "label": content.prsnField_phoneNum,
        },
        {
            "name": content.prsnField_address,
            "value": "location",
            "synonyms": [
                "\"~addr\"",
                "\"~addressdetails\""
            ],
            "label": content.prsnField_address,
        }
    ];
    
if(context.session.BotUserSession.source === "idfc") {
    if(context.entities.captureCreditCard) {
        context.entities.profileOrAccountLevel = "Account"
    }
}

var fieldCodes = context.session.BotUserSession.fieldCodes
if(fieldCodes["EDITACC"] && !fieldCodes["CP-CUST"] && context.entities.profileOrAccountLevel === "Profile"){
     context.taskNotSupported = true;
} else if(!fieldCodes["EDITACC"] && fieldCodes["CP-CUST"] && context.entities.profileOrAccountLevel === "Account"){
     context.taskNotSupported = true;
}
else if(fieldCodes["EDITACC"] && !fieldCodes["CP-CUST"]) {
    context.entities.profileOrAccountLevel = "Account"
} else if (!fieldCodes["EDITACC"] && fieldCodes["CP-CUST"]) {
    context.entities.profileOrAccountLevel = "Profile"
}