{"nodeOptions":{"customTags":{"session":[],"message":[],"user":[]},"transitionType":"auto","isRetriesExceeded":false,"promptOptions":"required","reuseMarkedupPhrases":false,"interruptOptions":{"priority":"task"},"transitionMode":"initiateCurrentTask","inputHandlingOptions":"useAsEntityValue","reuseOptions":"1","userInputCorrection":true,"noAutoCorrection":false,"notForReuse":false,"contextTags":[],"message":[],"errorMessage":[]},"vNameSpace":[],"preConditions":[],"useTaskLevelNs":true,"nodeId":"service57","type":"service","transitions":[{"if":{"conjoin":"and","tests":[{"context":"session.BotUserSession.source","op":"eq","value":"visifi"},{"context":"getAccountData.response.statusCode","op":"eq","value":"401"}]},"then":"intent162","metadata":{"color":"#e9c369","connId":"dummy7394"}},{"if":{"context":"getAccountData.response.statusCode","op":"neq","value":"200"},"then":"intent215","metadata":{"color":"#299d8e","connId":"dummy504"}},{"default":"entity240","metadata":{"color":"#299d8e","connId":"dummy327"}}],"metadata":{"left":546,"top":1132},"componentId":"dc-49d6c908-609a-57ba-b952-64a5ba6c78a8"}