var userMsg = content.updateFieldsList;
var pf = []
context.personalFields.forEach(function(x) { pf.push(x.name)});
userMsg += "\n" + context.session.BotUserSession.isIVR ? pf.join(content.seperator + " ") : pf.join("\n ")
print(userMsg);