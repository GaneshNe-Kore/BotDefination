{"nodeOptions":{"customTags":{"session":[],"message":[],"user":[]},"transitionType":"auto","isRetriesExceeded":false,"promptOptions":"required","reuseMarkedupPhrases":false,"interruptOptions":{"priority":"task","type":{"option":"doNotAllowHoldResume"}},"transitionMode":"initiateCurrentTask","inputHandlingOptions":"useAsEntityValue","reuseOptions":"1","userInputCorrection":true,"noAutoCorrection":false,"notForReuse":false,"contextTags":[],"message":[],"errorMessage":[]},"vNameSpace":[],"preConditions":[],"useTaskLevelNs":true,"nodeId":"message110","type":"message","componentId":"dc-9fda9502-44f1-5b46-89d0-a1a6537bb2c3","transitions":[{"if":{"context":"session.BotUserSession.source","op":"eq","value":"mashreq"},"then":"end","metadata":{"color":"#5ea8d3","connId":"dummy11966"}},{"if":{"context":"isValidAccount","op":"eq","value":"false"},"then":"entity65","metadata":{"color":"#299d8e","connId":"dummy10624"}},{"default":"end","metadata":{"color":"#299d8e","connId":"dummy770"}}],"metadata":{"left":976,"top":3701}}