{"nodeOptions":{"customTags":{"session":[],"message":[],"user":[]},"transitionType":"auto","isRetriesExceeded":false,"promptOptions":"optional","reuseMarkedupPhrases":false,"interruptOptions":{"priority":"task","type":{"option":"doNotAllowHoldResume"}},"transitionMode":"initiateCurrentTask","inputHandlingOptions":"useAsEntityValue","reuseOptions":"1","userInputCorrection":true,"noAutoCorrection":false,"notForReuse":false,"contextTags":[],"precedence":"entityOverIntent","message":[],"errorMessage":[],"eventOptions":{"defaultMaxRetry":{"retry_limit":5,"action":"endOfDialog"}}},"vNameSpace":[],"preConditions":[],"useTaskLevelNs":true,"nodeId":"entity75","type":"entity","transitions":[{"if":{"context":"session.BotUserSession.externalAccountsEnabled","op":"eq","value":"true"},"then":"script116","metadata":{"color":"#299d8e","connId":"dummy4831"}},{"default":"logic187","metadata":{"color":"#299d8e","connId":"dummy363"}}],"metadata":{"left":1426,"top":1624},"componentId":"dc-d95c1cd6-c146-5bdc-8641-0190262a25d6"}