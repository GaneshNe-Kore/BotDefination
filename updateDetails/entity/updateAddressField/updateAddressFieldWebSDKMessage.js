context.customerData = context.getCustomerData && context.getCustomerData.response && context.getCustomerData.response.body ? context.getCustomerData.response.body : [];
var text;
var addressField = {};
context.addressField = [];
if (context.entities.captureUpdateField[0] === "Resident address") {
    addressField = context.customerData.residentAddress ? context.customerData.residentAddress : context.customerData.location ? context.customerData.location : {};
    text = content.ud_residentAddress;
} else if (context.entities.captureUpdateField[0] === "Permanent address") {
    addressField = context.customerData.permanentAddressObj ? context.customerData.permanentAddressObj : context.customerData.permanentAddress ? context.customerData.permanentAddress : {};
    text = content.ud_permanentAddress;
} else {
    addressField = context.customerData.deliveryAddressObj ? context.customerData.deliveryAddressObj : context.customerData.deliveryAddress ? context.customerData.deliveryAddress : {};
    text = content.ud_deliveryAddress;
    addressField = {};
}
// text = content.updateAddressValue;

if (addressField && Object.keys(addressField).length > 0 && typeof(addressField) !== 'string') {
    Object.keys(addressField).forEach(obj => {
        context.addressField.push(addressField[obj]);
    });
    context.addressField = context.addressField.join(content.seperator + " ");
} else {
    context.addressField = addressField;
}
// }

let regionNames = new Intl.DisplayNames([context.currentLanguage], {
    type: 'region'
});

var country = Object.keys(addressField).length > 0 && addressField["addressline4"] ? addressField["addressline4"] : ""
var message = {
    "type": "template",
    "payload": {
        "template_type": "custom_form_template",
        "sliderView": true,
        "lang": context.currentLanguage,
        "heading": text,
        "submit_button": content.ud_submit,
        "form_fields": [{
                // "type": content.ud_input,
                "label": content.ud_address1,
                // "placeholder": content.ud_enterAddress1,
                "text": Object.keys(addressField).length > 0 && addressField["addressline1"] ? addressField["addressline1"] : addressField && (typeof addressField === "string") ? addressField : "",
                "errorMessage": content.ud_address1Error,
                "required": true
            },
            {
                // "type": content.ud_input,
                "label": content.ud_address2,
                "text": Object.keys(addressField).length > 0 && addressField["addressline2"] ? addressField["addressline2"] : "",
                "errorMessage": ""
                // "placeholder": content.ud_enterAddress2
            },
            {
                // "type": content.ud_input,
                "label": content.ud_address3,
                "text": Object.keys(addressField).length > 0 && addressField["addressline3"] ? addressField["addressline3"] : "",
                "errorMessage": ""
                // "placeholder": content.ud_enterAddress3
            }
        ],
        "dropdown": {
            "heading": content.ud_countryDropdown,
            "text": regionNames.of(country),
            // "countrycode" : country.split(",")[1]
            "countrycode": country
        }
    }
}
print(JSON.stringify(message));