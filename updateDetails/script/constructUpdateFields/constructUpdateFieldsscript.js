context.updateFields =  [
    {
        "title" : content.udPrimaryEmail,
        "value": "Primary email",
        "synonyms" : ['"~primaryemail"','"~emailpersonalfield"', '"~eemail"', "\"" + "Primary email" + "\""]
    },{
        "title" : content.udSecondaryEmail,
        "value": "Secondary email",
        "synonyms" : ['"~secondaryemail"','"~emailpersonalfield"', '"~eemail"', "\"" +"Secondary email" + "\""]
    },{
        "title" :content.udPermanentAddress,
        "value": "Permanent address",
        "synonyms" : ['"~permanentaddress"','"~addr"',"\"" +"Permanent address" + "\""]
    },{
        "title" : content.udResidentAddress,
        "value": "Resident address",
        "synonyms" : ['"~residentaddress"','"~addr"',"\"" +"Resident address" + "\""]
    },{
        "title" : content.udCourierAddress,
        "value": "Courier address",
        "synonyms" : ['"~courieraddress"','"~addr"',"\"" +"Courier address" + "\""]
    },{
        "title" :content.udMobileNumber,
        "value": "Mobile number",
        "synonyms" : ['"~phone"','"~phonenumber"',"\"" +"Mobile number" + "\""]
    },{
        "title" : content.udPassportDetails,
        "value": "Passport details",
        "synonyms" : ['"~passportdetails"',"\"" +"Passport details" + "\""]
    },{
        "title" : content.udEIDDetails,
        "value": "Emirates ID details",
        "synonyms" : ['"~eiddetails"',"\"" +"Emirates ID details" + "\""]
    },{
        "title" :  content.udBankCommunication,
        "value": "Bank communication",
        "synonyms" : ['"~bankcommunication"',"\"" +"Bank communication" + "\""]
    },{
        "title" : content.udRenewedVISA,
        "value": "Renewed VISA",
        "synonyms" : ['"~renewedvisa"',"\"" +"Renewed VISA" + "\""]
    }
    ];
    
    if(context.traits && context.traits.includes("bankcommunication")){
        context.entities.captureUpdateField = ["Bank communication"];
    }
    
if(context.entities.captureUpdateField && context.entities.captureUpdateField.includes("Courier address")){
    context.isCourierAddress = true;
}