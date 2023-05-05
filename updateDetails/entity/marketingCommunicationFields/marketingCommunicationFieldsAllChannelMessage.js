// Advanced Multi Select
var communicationFields = [content.ud_email,content.ud_sms,content.ud_phone];
var message = content.marketingCommunicationFields + "\n";
for (var i = 0; i < communicationFields.length; i++) {
    message += communicationFields[i]+ "\n";
}

print(message);