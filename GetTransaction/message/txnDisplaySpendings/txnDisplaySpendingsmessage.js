{"nodeOptions":{"customTags":{"session":[],"message":[],"user":[]},"transitionType":"auto","isRetriesExceeded":false,"promptOptions":"required","reuseMarkedupPhrases":false,"interruptOptions":{"priority":"task","type":{"option":"doNotAllowHoldResume"}},"transitionMode":"initiateCurrentTask","inputHandlingOptions":"useAsEntityValue","reuseOptions":"1","userInputCorrection":true,"noAutoCorrection":false,"notForReuse":false,"contextTags":[],"message":[],"errorMessage":[],"eventOptions":{"maxRetry":{"action":"invokeCallTerminationHandler","ref":"AnythingElseDialog"}}},"vNameSpace":[],"preConditions":[],"useTaskLevelNs":true,"nodeId":"message53","type":"message","transitions":[{"if":{"conjoin":"or","tests":[{"context":"endHere","op":"eq","value":"true"},{"context":"txnView.length","op":"eq","value":"0"}]},"then":"logic209","metadata":{"color":"#5ea8d3","connId":"dummy1158"}},{"if":{"context":"session.BotUserSession.isIVR"},"then":"dialogAct118","metadata":{"color":"#299d8e","connId":"dummy1085"}},{"if":{"conjoin":"and","tests":[{"context":"session.BotUserSession.source","op":"eq","value":"idfc"},{"context":"captureCoffeeShops","op":"eq","value":"starbucks"}]},"then":"end","metadata":{"color":"#533a71","connId":"dummy9082"}},{"if":{"context":"captureCoffeeShops","op":"eq","value":"starbucks"},"then":"message134","metadata":{"color":"#e9c369","connId":"dummy1717"}},{"if":{"context":"session.BotUserSession.isDemo","op":"eq","value":"true"},"then":"message136","metadata":{"color":"#f3a261","connId":"dummy1719"}},{"default":"message54","metadata":{"color":"#299d8e","connId":"dummy312"}}],"metadata":{"left":2919,"top":1085},"componentId":"dc-9e8c550c-7cd5-5604-918f-521dbdccbfac"}