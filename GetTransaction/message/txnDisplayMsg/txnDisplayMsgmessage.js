{"nodeOptions":{"customTags":{"session":[],"message":[],"user":[]},"transitionType":"auto","isRetriesExceeded":false,"promptOptions":"required","reuseMarkedupPhrases":false,"interruptOptions":{"priority":"task","type":{"option":"doNotAllowHoldResume"}},"transitionMode":"initiateCurrentTask","inputHandlingOptions":"useAsEntityValue","reuseOptions":"1","userInputCorrection":false,"noAutoCorrection":false,"notForReuse":false,"contextTags":[],"message":[],"errorMessage":[],"eventOptions":{"maxRetry":{"action":"invokeCallTerminationHandler","ref":"AnythingElseDialog"}}},"vNameSpace":[],"preConditions":[],"useTaskLevelNs":true,"nodeId":"message51","type":"message","transitions":[{"if":{"context":"smsTxn","op":"eq","value":"true"},"then":"script157","metadata":{"color":"#6183d8","connId":"dummy3819"}},{"if":{"context":"context.downloadDisabled","op":"eq","value":"true"},"then":"intent114","metadata":{"color":"#50c5b7","connId":"dummy5707"}},{"if":{"conjoin":"and","tests":[{"context":"session.BotUserSession.isIVR","op":"","value":""},{"context":"noMoreTransactions","op":"","value":"true"}]},"then":"end","metadata":{"color":"#e9c369","connId":"dummy993"}},{"if":{"context":"noDepositAccounts","op":"eq","value":"true"},"then":"end","metadata":{"color":"#299d8e","connId":"dummy15519"}},{"if":{"context":"session.BotUserSession.isIVR"},"then":"dialogAct169","metadata":{"color":"#1c77c3","connId":"dummy6376"}},{"if":{"field":"entity63"},"then":"service106","metadata":{"color":"#299d8e","connId":"dummy675"}},{"if":{"context":"hideStatementLink","op":"eq","value":"true"},"then":"logic209","metadata":{"color":"#5ea8d3","connId":"dummy886"}},{"if":{"conjoin":"and","tests":[{"context":"getTransactionsFromService.response.body.length","op":"eq","value":"0"},{"context":"txnRange","op":"dne","value":""}]},"then":"logic209","metadata":{"color":"#7ac74f","connId":"dummy6055"}},{"if":{"context":"sourceIntent","op":"eq","value":"checkAffordability"},"then":"end","metadata":{"color":"#f3a261","connId":"dummy2671"}},{"if":{"conjoin":"or","tests":[{"context":"currentTraits","op":"cnt","value":"paycheck"},{"context":"currentTraits","op":"cnt","value":"income"}]},"then":"logic209","metadata":{"color":"#533a71","connId":"dummy2941"}},{"if":{"context":"context.session.BotUserSession.source","op":"eq","value":"idfc"},"then":"logic195","metadata":{"color":"#9f86c0","connId":"dummy9290"}},{"default":"logic209","metadata":{"color":"#299d8e","connId":"dummy298"}}],"metadata":{"left":2713,"top":622},"componentId":"dc-c571466d-7184-5a91-9819-24e0fb5c515a"}