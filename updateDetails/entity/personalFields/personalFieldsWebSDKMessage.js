var info = context.personalFields;
var message = {
    "type": "template",
    "payload": {
        "template_type": "button",
"lang": context.currentLanguage,
        "text": content.updateFieldsList,
        // "subText": "Button Template Description",
        "buttons": []
    }
};
for (i = 0; i < info.length; i++) {
    // if the button is to send back text to platform
    var button = {
        "type": "postback",
        "title": info[i].name,
        "payload": info[i].name
    };

    /* Uncomment this if the button is to redirect to url
     var button = {
     "type":"web_url", // type can be "postback" if
     "url":"URL_TO_REDIRECT",
     "title":buttons[i]
     };
     */

    message.payload.buttons.push(button);
}
print(JSON.stringify(message));
