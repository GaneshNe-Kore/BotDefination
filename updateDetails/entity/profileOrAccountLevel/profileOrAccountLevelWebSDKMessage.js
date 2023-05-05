function getQuickRepliesTemplate(text, quickReplies, payload) {
  var message = {
    type: "template",
    payload: {
      template_type: "quick_replies",
"lang": context.currentLanguage,
      text: text,
      quick_replies: [],
    },
  };

  for (i = 0; i < quickReplies.length; i++) {
    var quickReply = {
      content_type: "text",
      title: quickReplies[i],
      payload: payload[i],
    };

    message.payload.quick_replies.push(quickReply);
  }
  return JSON.stringify(message);
}
print(getQuickRepliesTemplate(content.profileOrAccount, [content.UpdateAccInfo_Profile, content.UpdateAccInfo_Account], [content.UpdateAccInfo_Profile, content.UpdateAccInfo_Account]));