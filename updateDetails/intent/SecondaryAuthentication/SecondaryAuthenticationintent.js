{"nodeOptions":{"customTags":{"session":[],"message":[],"user":[]},"transitionType":"auto","isRetriesExceeded":false,"promptOptions":"required","reuseMarkedupPhrases":false,"interruptOptions":{"priority":"task"},"transitionMode":"initiateCurrentTask","inputHandlingOptions":"useAsEntityValue","reuseOptions":"1","userInputCorrection":true,"noAutoCorrection":false,"notForReuse":false,"contextTags":[],"message":[],"errorMessage":[]},"vNameSpace":[],"preConditions":[],"useTaskLevelNs":true,"nodeId":"intent167","type":"intent","componentId":"dc-1e001a1a-941c-5ff1-ad8d-a6a6885ab11b","transitions":[{"if":{"context":"OTPFailure","op":"eq","value":"true"},"then":"end","metadata":{"color":"#299d8e","connId":"dummy7466"}},{"default":"script165","metadata":{"color":"#299d8e","connId":"dummy7030"}}],"flowTaskId":"fe670d3e-2750-5b32-81ff-7c3d9429ae12","metadata":{"left":3564,"top":682},"contextMap":"{\"cardNumber\":\"context.cardNumber\",\"phnNumber\":\"context.phnNumber\",\"OTPreqBody\":\"context.OTPreqBody\",\"skipVerifyOTP\":\"true\",\"context.otpCounter\":\"context.otpCounter\",\"errCode\":\"context.customerInfoUpdate.response.body.errCode\"}","postContextMap":"{\"context.entities.allAccountType\":\"\",\"context.entities.AccountType\":\"\",\"context.entities.personalFields\":\"\",\"context.entities.multipleAccounts\":\"\",\"context.entities.accNickname\":\"\",\"context.entities.newEmail\":\"\",\"context.entities.newPhoneNumber\":\"\",\"context.entities.PaymentAddress\":\"\",\"context.entities.profileOrAccountLevel\":\"\",\"context.entities.AddOrUpdateEmail\":\"\",\"context.entities.VisitClosestBranch\":\"\",\"context.entities.multipleCards\":\"\",\"context.entities.reTypeEmail\":\"\",\"context.entities.captureCreditCard\":\"\",\"context.entities.captureUpdateField\":\"\",\"context.entities.updateAddressField\":\"\",\"context.entities.marketingCommunicationFields\":\"\",\"context.entities.updateEmailField\":\"\",\"context.entities.DUMMYNER\":\"\",\"context.entities.EmailFAQ\":\"\",\"context.entities.PhoneFAQ\":\"\",\"context.entities.ambiguousEmailField\":\"\",\"context.entities.ambiguousAddressField\":\"\",\"context.entities.addressEmailAmbiguous\":\"\",\"OTPFailure\":\"context.OTPFailure\",\"serviceFailure\":\"context.serviceFailure\",\"getOTP\":\"context.getOTP\",\"enterOTP\":\"context.enterOTP\",\"otpCounter\":\"context.otpCounter\",\"isEOD\":\"context.isEOD\"}"}