{"nodeOptions":{"customTags":{"session":[],"message":[],"user":[]},"transitionType":"auto","isRetriesExceeded":false,"promptOptions":"optional","reuseMarkedupPhrases":false,"interruptOptions":{"priority":"task","type":{"option":"doNotAllowHoldResume"}},"transitionMode":"initiateCurrentTask","inputHandlingOptions":"useAsEntityValue","reuseOptions":"1","userInputCorrection":true,"noAutoCorrection":false,"notForReuse":false,"contextTags":[],"precedence":"entityOverIntent","message":[],"errorMessage":[],"eventOptions":{"defaultMaxRetry":{"retry_limit":5,"action":"endOfDialog"}}},"vNameSpace":[],"preConditions":[],"useTaskLevelNs":true,"nodeId":"entity94","type":"entity","transitions":[{"if":{"conjoin":"and","tests":[{"context":"entities.allAccountType","op":"dne","value":""},{"context":"singleAccount","op":"eq","value":"true"},{"context":"entities.AccountType","op":"dne","value":""},{"context":"entities.isStatement","op":"dne","value":""},{"context":"entities.captureCheckCard","op":"dne","value":""},{"context":"synonymsUsed.allAccountType","op":"dne","value":""},{"context":"ambiguousEntityValues.AccountType","op":"dne","value":""}]},"then":"entity98","metadata":{"color":"#299d8e","connId":"dummy6559"}},{"if":{"context":"promptForAccount","op":"eq","value":"true"},"then":"entity65","metadata":{"color":"#f3a261","connId":"dummy9559"}},{"if":{"conjoin":"and","tests":[{"context":"entities.AccountType.length","op":"eq","value":"1"},{"context":"session.BotUserSession.source","op":"eq","value":"mashreq"}]},"then":"dialogAct238","metadata":{"color":"#50c5b7","connId":"dummy15021"}},{"if":{"conjoin":"and","tests":[{"context":"accountData.length","op":"eq","value":"1"},{"context":"session.BotUserSession.source","op":"eq","value":"mashreq"},{"context":"entities.captureCheckCard","op":"dne","value":""},{"context":"entities.allAccountType","op":"dne","value":""},{"context":"entities.AccountType","op":"dne","value":""}]},"then":"dialogAct238","metadata":{"color":"#6183d8","connId":"dummy14414"}},{"if":{"conjoin":"or","tests":[{"context":"entities.allAccountType","op":"","value":""},{"context":"entities.AccountType","op":"","value":""},{"context":"entities.isStatement","op":"","value":""},{"context":"entities.captureCheckCard","op":"","value":""},{"context":"synonymsUsed.allAccountType","op":"","value":""},{"context":"ambiguousEntityValues.AccountType","op":"","value":""},{"context":"session.BotUserSession.isDemo","op":"eq","value":"true"}]},"then":"script141","metadata":{"color":"#5ea8d3","connId":"dummy6560"}},{"if":{"conjoin":"and","tests":[{"context":"session.BotUserSession.source","op":"eq","value":"mashreq"},{"context":"traits","op":"cnt","value":"account"}]},"then":"script141","metadata":{"color":"#e9c369","connId":"dummy6680"}},{"default":"entity65","metadata":{"color":"#299d8e","connId":"dummy500"}}],"metadata":{"left":1165,"top":1919},"componentId":"dc-6548ff21-77bb-5fc8-95ef-ebc70e9f144f"}