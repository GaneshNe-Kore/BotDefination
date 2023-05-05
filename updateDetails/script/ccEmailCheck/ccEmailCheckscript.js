if(context.entities.newEmail && context.entities.reTypeEmail){
    var maxAttemptsReached = false;
    context.shortCardNo = "XX"+context.shortCardNo;
    if(!context.passcodeInput){
        context.passcodeInput = 1;
    }else{
        context.passcodeInput += 1;
    }
    
    delete context.entities.passcodeInput;
    
    if(context.passcodeInput >= context.session.BotUserSession.attemptsCount){
        maxAttemptsReached = true;
    }else{
        context.sameEmail = (context.entities.newEmail === context.entities.reTypeEmail) ? true : false;
        if(!context.sameEmail){
            delete context.entities.newEmail;
            delete context.entities.reTypeEmail;
        }
        koreDebugger.log(context.sameEmail);
    }
    context.maxAttemptsReached = maxAttemptsReached;
}