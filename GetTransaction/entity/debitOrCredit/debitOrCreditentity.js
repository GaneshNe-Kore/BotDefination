{"nodeOptions":{"customTags":{"session":[],"message":[],"user":[]},"transitionType":"auto","isRetriesExceeded":false,"promptOptions":"optional","reuseMarkedupPhrases":false,"interruptOptions":{"priority":"task","type":{"option":"doNotAllowHoldResume"}},"transitionMode":"initiateCurrentTask","inputHandlingOptions":"useAsEntityValue","reuseOptions":"1","userInputCorrection":true,"noAutoCorrection":false,"notForReuse":false,"contextTags":[],"precedence":"entityOverIntent","message":[],"errorMessage":[],"eventOptions":{"defaultMaxRetry":{"retry_limit":5,"action":"endOfDialog"}}},"vNameSpace":[],"preConditions":[],"useTaskLevelNs":true,"nodeId":"entity73","type":"entity","transitions":[{"if":{"context":"session.BotUserSession.isDemo","op":"eq","value":"true"},"then":"entity129","metadata":{"color":"#299d8e","connId":"dummy1648"}},{"if":{"context":"session.BotUserSession.source","op":"eq","value":"mashreq"},"then":"message163","metadata":{"color":"#5ea8d3","connId":"dummy15300"}},{"default":"entity87","metadata":{"color":"#299d8e","connId":"dummy359"}}],"metadata":{"left":329,"top":2859},"componentId":"dc-5a3a4508-cab4-5a96-8fa5-3147385e4faf"}