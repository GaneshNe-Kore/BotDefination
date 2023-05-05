// Advanced Multi Select
var communicationFields = [content.ud_email,content.ud_sms,content.ud_phone];
var communicationvalues = ["emailId","phone","sms"]
var elements = [];

for (var i = 0; i < communicationFields.length; i++) {

    elements.push({
        "title": communicationFields[i],
        "value": communicationFields[i],
        "payload": communicationvalues[i]
    });

}


var message = {
    "type": "template",
    "payload": {
        "template_type": "advanced_multi_select",
        "lang": context.currentLanguage,
        "heading": content.marketingCommunicationFields,
        "sliderView": false,
        "showViewMore": false,
        "limit": 1,
        "elements": [
            {
                'collectionTitle': "Collection 1",
                'collection': elements

            }
        ],
        "buttons": [
            {
                "title": content.ud_Done,
                "type": "postback",
                "payload": "payload"
            }
        ]
    }
};
print(JSON.stringify(message));