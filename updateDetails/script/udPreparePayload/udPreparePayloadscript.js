var capturefield = context.entities.captureUpdateField[0];
var fieldObj = fieldsUpdateEligibility(capturefield);
var customerData = context.getCustomerData.response.body;
context.customerData = customerData;

function IsJsonString(str) {
    // koreDebugger.log("entity " + str);
    try {
        JSON.parse(JSON.stringify(str));
        // koreDebugger.log("parsed " + JSON.parse(JSON.stringify(str)));
    } catch (e) {
        return str;
    }
    // koreDebugger.log("stringified " + JSON.stringify(str));
    return JSON.parse(JSON.stringify(str));
}

function fieldsUpdateEligibility(type) {
    var eligibleCustomerInfoUpdateList = ["Primary email", "Secondary email", "Permanent address", "Resident address", "Courier address", "Mobile number", "Bank communication"];
    if (eligibleCustomerInfoUpdateList.includes(type)) {
        return {
            isAllowed: true,
            type: "Customer",
        };
    } else {
        return {
            isAllowed: false,
            type: "",
        };
    }
}

context.AllowedToUpdate = fieldObj.isAllowed;
var body = {};
context.accNames = "";

if(context.AllowedToUpdate){
    context.fieldTypeObj = "Customer";
    body["customerId"] = context.customerData.customerId;
    if(context.entities.updateEmailField){
        if(capturefield === "Primary email"){
            body["email"] = context.entities.updateEmailField;
        } else {
            body["secondaryEmail"] = context.entities.updateEmailField;
        }
    } else if(context.entities.updateAddressField){
        var raw = context.entities.updateAddressField;
        var address = JSON.parse(raw);
        var formataddress = {
            "addressline1" : address.addressline1,
            "addressline2" : address.addressline2,
            "addressline3" : address.addressline3,
            "addressline4" : address.addressline4
        }
        address = formataddress;
        // if(address[]){
        //     // address["addressline4"] = address["addressline4"].split("-")[1];//temporary work around for issue PLAT-
        //     address["addressline4"] = address["addressline4"].trim();
        // }
        context.updateAddress = address;
        if(capturefield=== "Permanent address"){
            body["permanentAddressObj"] = address;
        } else if(capturefield ===  "Resident address"){
            body["residentAddress"] = address;
        } else {
            body["deliveryAddressObj"] = address;
        }
    } else if(context.entities.marketingCommunicationFields && capturefield === "Bank communication"){
        var communicationFields = [];
        body["bankCommunication"] = {};
        communicationFields = context.entities.marketingCommunicationFields;
        if(communicationFields.includes("emailId")){
            body["bankCommunication"].email =  context.customerData.email;
        }
        if(communicationFields.includes("sms")){
            body["bankCommunication"].sms = context.customerData.phone;
        }
        if(communicationFields.includes("phone")){
            body["bankCommunication"].phone = context.customerData.phone;
        }   
        // body["bankCommunication"] = context.entities.marketingCommunicationFields;
    }
    if(context.session.BotUserSession.source === "mashreq"){
        body["meta"] = {
            "challengeToken" : (context.getOTP && context.getOTP.response && context.getOTP.response.body) ? context.getOTP.response.body.challengeToken : "",
            "otp" :  context.enterOTP
        };
    }
    context.body = JSON.stringify(body);
}
context.phnNumber = context.customerData.phone;
