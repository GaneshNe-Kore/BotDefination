// var info = context.updateFields;
// //context.updateFields[content.udPrimaryEmail, content.udSecondaryEmail, content.udPermanentAddress, content.udResidentAddress, content.udCourierAddress, content.udMobileNumber, content.udPassportDetails, content.udEIDDetails, content.udBankCommunication, content.udRenewedVISA];

// var message = {
//     "type": "template",
//     "payload": {
//         "template_type": "button",
//         "lang": context.currentLanguage,
//         "text": content.captureUpdateField,
//         "subText": "Button Template Description",
//         "buttons": []
//     }
// };
// for (i = 0; i < info.length; i++) {
//     // if the button is to send back text to platform
//     var button = {
//         "type": "postback",
//         "title": info[i].title,
//         "payload": info[i].title
//     };

//     /* Uncomment this if the button is to redirect to url
//      var button = {
//      "type":"web_url", // type can be "postback" if
//      "url":"URL_TO_REDIRECT",
//      "title":buttons[i]
//      };
//      */

//     message.payload.buttons.push(button);
// }

var message = content.captureUpdateField;
print(JSON.stringify(message));

