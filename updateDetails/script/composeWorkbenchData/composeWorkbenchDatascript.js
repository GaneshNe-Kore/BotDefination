// Set global variables in session data
// Checking if environment variable has the data against the mapped feature and parsing it accordingly.
contextTags.add("testTag");
var l = koreUtil._;
context.faqResponse = false;
context.skipLogin = false;
context.taskNotSupported = false;
context.resetpasswordfaqresponse = false;
const d = new Date();
let intime = d.getTime();
context.intime = intime;
var isDemo = env.isDemo ? JSON.parse(env.isDemo) : {};
var inputAccount = env.inputAccount ? JSON.parse(env.inputAccount) : {};
var externalAccounts = env.EXTERNAL_ACCOUNTS_ENABLED ? JSON.parse(env.EXTERNAL_ACCOUNTS_ENABLED) : {};

BotUserSession.put("subIntent", null);
BotUserSession.put("source", env.source ? env.source.toLowerCase() : null, 1440);
if(context.session.BotUserSession.source === "mashreq"){
    BotUserSession.put("subsource", env.subsource ? env.subsource.toLowerCase() : null, 1440);
}
BotUserSession.put("client", env.client ? env.client.toLowerCase() : null, 1440);
BotUserSession.put("vendor", env.vendor ? JSON.parse(env.vendor) : {}, 1440);
// FAQs which are not under KG will be executed only when botloginsupport is true
var botlogin = env.botloginsupport ? JSON.parse(env.botloginsupport) : {};
var botsupportedlogin = botlogin ? botlogin.enable : false;
//to send product codes for smt integration incase
if (!context.session.BotUserSession.prodDetails || !context.session.BotUserSession.productCodeDetails) {
  var path = env.path ? env.path : null;
  if (path === "smt") {
    var productcodes = env.productcodes ? JSON.parse(env.productcodes) : {};
    if (productcodes && productcodes.WB_prodDetails) {
      var productCodes = {
        productCodes: productcodes.WB_prodDetails,
      };
      BotUserSession.put("prodDetails", JSON.stringify(productCodes), 1440);
      BotUserSession.put("productCodeDetails", productcodes.WB_prodDetails, 1440);
    }
  } else {
    var productCodes = {
      productCodes: [
        {
          acc: "Checking",
          sub: "Regular Checking",
          code: "1",
        },
      ],
    };
    BotUserSession.put("prodDetails", JSON.stringify(productCodes), 1440);
    BotUserSession.put("productCodeDetails", productCodes.productCodes, 1440);
  }
}
//Tag to handle MainMenu and ZeroHandler dialog
if (context.session.BotUserSession.isIVR === "success") {
  contextTags.add("isIVR");
}

context.currency = env.currency;
if (externalAccounts && Object.keys(externalAccounts) && Object.keys(externalAccounts).length > 0) {
  BotUserSession.put("externalAccountsEnabled", externalAccounts.enabled, 1440);
}
//Tag to handle MainMenu and ZeroHandler dialog
if (context.session.BotUserSession.isIVR === "success") {
  contextTags.add("isIVR");
}
if (context.session.UserContext.firstName === "Aditya") {
//   context.session.BotUserSession.source = "visifi";
  // context.session.BotUserSession.isIVR = "success";
  //   BotUserSession.put("isIVR", "success", 1440);
  // context.session.BotUserSession.source = "visifi";
  // context.session.BotUserSession.isDemo = true;
  // context.session.BotUserSession.loginStatus = undefined;
  // context.session.BotUserSession.fieldCodes["EDITACC-CHKN-REQCHQBK"] = true;
  BotUserSession.put("isIVR", undefined);
  // context.session.BotUserSession.source = "kore"
}
if (context.session.UserContext.firstName.toLowerCase() === "ganesh") {
  //   BotUserSession.put("loginStatus", undefined, 1440);
  //   BotUserSession.put("isIVR", "success", 1440);
   BotUserSession.put("devLogin",true,1440);
//   BotUserSession.put("isIVR", undefined);
  // context.phoneNumber="4156307610";
//   BotUserSession.put("mobileNumber", "+14156307610", 1440);
  // context.session.BotUserSession.channels[0].handle.Caller = "+14156307610"
  // context.isIVRAuth = true;
//   context.session.BotUserSession.isDemo = false;
  // isDemo=true;
  //   context.faqResponse=true;
  //  context.session.BotUserSession.source = "visifi";
     context.session.BotUserSession.source = "kore";
//   context.session.BotUserSession.source = "mashreq";
  //  context.session.BotUserSession.channels[0].type = "ivr";
}

if (context.session.UserContext.firstName.toLowerCase() === "venkatesh") {
  //   BotUserSession.put("loginStatus", undefined, 1440);
  //   BotUserSession.put("isIVR", "success", 1440);
   BotUserSession.put("devLogin",true,1440);
  BotUserSession.put("isIVR", undefined);
  // context.phoneNumber="4156307610";
//   BotUserSession.put("mobileNumber", "+14156307610", 1440);
  // context.session.BotUserSession.channels[0].handle.Caller = "+14156307610"
  // context.isIVRAuth = true;
//   context.session.BotUserSession.isDemo = false;
  // isDemo=true;
  //   context.faqResponse=true;
  //  context.session.BotUserSession.source = "visifi";
     context.session.BotUserSession.source = "kore";
//   context.session.BotUserSession.source = "mashreq";
  //  context.session.BotUserSession.channels[0].type = "ivr";
}

// if (context.session.UserContext.firstName === "Susmitha") {

//       BotUserSession.put("source","mashreq",1440);
// }

// if (context.session.UserContext.firstName === "Abhinay" || context.session.UserContext.firstName === "Abhinay Meka") {
//     context.session.BotUserSession.source = "kore";
//     //   BotUserSession.put("isIVR", "success", 1440);
//     // BotUserSession.put("isIVR", undefined);
//     // context.session.BotUserSession.source = "kore"
// }

if (context.session.UserContext.firstName === "Abhinay" || context.session.UserContext.firstName === "Abhinay Meka") {
  context.session.BotUserSession.source = "mashreq";
  //   BotUserSession.put("isIVR", "success", 1440);
  // BotUserSession.put("isIVR", undefined);
  //context.session.BotUserSession.loginStatus = undefined;
}

if (context.session.UserContext.firstName.toLowerCase() === "keerthika") {
  //  BotUserSession.put("isIVR", "success", 1440);
  //  context.isIVRAuth = true;
  context.session.BotUserSession.isIVR = undefined;
  //   context.session.BotUserSession.source = "kore"
  //   context.isVisifi = true;
  //     context.isKore = false;
}
if (context.session.UserContext.firstName.toLowerCase() === "brahma") {
  //  BotUserSession.put("loginStatus", undefined, 1440);
  //  BotUserSession.put("isIVR", "success", 1440);
  // BotUserSession.put("devLogin",true,1440);
  BotUserSession.put("isIVR", undefined);
  // context.phoneNumber="4156307610";
  // context.session.BotUserSession.channels[0].handle.Caller = "+14156307610"
  // context.isIVRAuth = true;
  // context.session.BotUserSession.isDemo = false;
  // isDemo=true;
  //   context.faqResponse=true;
  //  context.session.BotUserSession.source = "visifi";
  context.session.BotUserSession.source = "kore";
  //  context.session.BotUserSession.source = "mashreq";
  //  context.session.BotUserSession.channels[0].type = "ivr";
}

if (context.session.BotUserSession.externalAccountsEnabled) {
  context.externalAccountEnabled = env.EXTERNAL_ACCOUNTS_ENABLED;
  context.externalAccountSource = env.EXTERNAL_ACCOUNTS_SOURCE;
  context.bankProvidesExternalAccounts = env.BANK_PROVIDES_EXTERNAL_ACCOUNTS;
}

//this is to parse feedback variabled and check all the Highlevel feedback conditions
// i was commented this variable because this is corrupted in the env variables , for workaround i was jus created {}
// var fdbk = env.feedback ? JSON.parse(env.feedback) : {};
var fdbk = {};

function assignFeedbackFlag(fdbkSession, fdbkPerSession, turnOffHits, totalHits, showAll, showNthUser, userCount, nthUserValue) {
  if ((fdbkSession || fdbkSession === 0) && fdbkSession < fdbkPerSession) {
    if (turnOffHits["enable"] && totalHits < turnOffHits["value"]) {
      return showAll || (showNthUser.enable && userCount % nthUserValue === 0) ? true : false;
    } else {
      return !turnOffHits["enable"] && (showAll || (showNthUser.enable && userCount % nthUserValue) === 0) ? true : false;
    }
  }
}
var Codes = fdbk["FDBK_INT_SPC"],
  fdbkFlag;
if (fdbk.FDBK) {
  var fdbkfreq = fdbk["FDBK_FREQ"];
  context.session.BotUserSession.fdbkSession = context.session.BotUserSession.fdbkSession ? context.session.BotUserSession.fdbkSession : 0;
  context.session.BotContext.totalHits = context.session.BotContext.totalHits ? context.session.BotContext.totalHits : 0;
  fdbkFlag = assignFeedbackFlag(context.session.BotUserSession.fdbkSession, fdbkfreq["NUM_OF_FDBK_SESSION"], fdbkfreq["TURN_OFF_HITS"], context.session.BotContext.totalHits, fdbkfreq["SHW_ALL"], fdbkfreq["SHW_NUM_USERS"], context.session.BotContext.usercount, fdbkfreq["SHW_NUM_USERS"]["value"]);
}
if (context.intentName === "GetTransaction") {
  // this flag is for affordability workbench handling
  delete context.session.BotUserSession.fieldCodes;
  context.fdbkFlag = context.session.BotUserSession[context.intentName] ? false : fdbkFlag && Codes["TXN_INQ"].enable ? true : false;
  var inquiry = env.inquiry ? JSON.parse(env.inquiry) : {};
  if (context.traits && context.traits.includes("accountbalanceafterpayday")) {
    var moneymovement = env.moneymovement ? JSON.parse(env.moneymovement) : {};
    var fieldCodes = Object.assign(inquiry, moneymovement);
    BotUserSession.put("fieldCodes", fieldCodes, 1440);
    context.wb_noAccounts = (!context.session.BotUserSession.fieldCodes["BAL-CHKN-AB"] && !context.session.BotUserSession.fieldCodes["BAL-SVG-AB"]) || !context.session.BotUserSession.fieldCodes["SPND-CHKN-AFFRD"] ? true : false;
    context.field = !context.session.BotUserSession.fieldCodes["SPND-CHKN-AFFRD"] ? content.affDisable : content.depAccountBal;
  } else {
    BotUserSession.put("fieldCodes", inquiry, 1440);
  }

  context.entityRules = {
    txnDatePeriod: {
      tense: "past",
      range: {
        to: "today",
      },
    },
    howAboutDateRange: {
      tense: "past",
      range: {
        to: "today",
      },
    },
    transactionDateRange: {
      tense: "past",
      range: {
        to: "today",
      },
    },
    FutureDateRange: {
      tense: "future",
      range: {
        from: "tomorrow",
      },
    },
    BusinessOrPersonOrCityName: {
      cityName: {
        ignoreWords: "~cityignorewords",
      },
      PersonName: {
        ignoreWords: "~personignorewords",
      },
    },
    cityName: {
      ignoreWords: "~cityignorewords",
    },
    PersonName: {
      ignoreWords: "~personignorewords",
    },
    Amount: {
      currencyCodes: ["USD", "INR", "AED"],
    },
    AccountType: {
      asString: true,
    },
  };
  BotUserSession.put("inputAccount", inquiry["TXNSRCH-ALL_ACCNTS"] ? inquiry["TXNSRCH-ALL_ACCNTS"] : null);

  //This code is to trigger FAQ response when the user is not logged in and trait for an FAQ is found.
  if (botsupportedlogin && !context.session.BotUserSession.loginStatus && context.currentTraits && context.currentTraits.includes("statementonline")) {
    context.faqResponse = true;
  }
} else if (context.intentName === "Get_Paper_Statement") {
  var accountmaintenance = env.accountmaintenance ? JSON.parse(env.accountmaintenance) : {};
  fieldCodes = accountmaintenance;
  //context.fieldCodes = accountmaintenance;
  context.entityRules = {
    ppr_multipleAccounts: {
      asString: true,
    },
    ppr_PayAccMultipleOption: {
      asString: true,
    },
  };

  if (context.session.BotUserSession.source === "mashreq" && !context.session.BotUserSession.isKoreLogin) {
    context.reqbody = JSON.stringify({
      customerId: context.session.BotUserSession.customerID,
      meta: {
        accountType: ["Credit Card", "Account"],
      },
    });
  } else {
    context.reqbody = JSON.stringify({
      customerId: context.session.BotUserSession.customerID,
      meta: {
        accountType: ["Credit Card", "Checking Account", "Savings Account"],
      },
    });
  }
  context.field = content.pprStmtStatus;
  BotUserSession.put("fieldCodes", fieldCodes, 1440);
  if (context.session.BotUserSession.source !== "mashreq") {
    context.taskNotSupported = context.session.BotUserSession.fieldCodes["EDITACC"] && ((context.session.BotUserSession.fieldCodes["EDITACC-CHKN"] && context.session.BotUserSession.fieldCodes["EDITACC-CHKN-PPR_STMT"]) || (context.session.BotUserSession.fieldCodes["EDITACC-SVG"] && context.session.BotUserSession.fieldCodes["EDITACC-SVG-PPR_STMT"]) || (context.session.BotUserSession.fieldCodes["EDITACC-CC"] && context.session.BotUserSession.fieldCodes["EDITACC-CC-PPR_STMT"]) || (context.session.BotUserSession.fieldCodes["EDITACC-LON"] && context.session.BotUserSession.fieldCodes["EDITACC-LON-PPR_STMT"]) || (context.session.BotUserSession.fieldCodes["EDITACC-MRTG"] && context.session.BotUserSession.fieldCodes["EDITACC-MRTG-PPR_STMT"]) || (context.session.BotUserSession.fieldCodes["EDITACC-LIN"] && context.session.BotUserSession.fieldCodes["EDITACC-LIN-PPR_STMT"])) ? false : true;
  }
} else if (context.intentName === "GetBalance" || 
context.intentName === "GetAccountInformation" || 
context.intentName === "Get_Payment_Information" || 
context.intentName === "Get_Payoff_Amount" || 
context.intentName === "GetCustomerInformation" || 
context.intentName === "viewStatus" || 
context.intentName === "Get_Personal_Banker_Information" ||
context.intentName === "viewLimits" || 
context.intentName === "keywordDialog" ||
context.intentName === "Get_Account_Balance" || 
context.intentName === "Get_Statement_Date"  || 
context.intentName === "Get_Loan_Disbursal_Amount") {
  if (context.intentName === "keywordDialog") {
    var payload = [];
    if (context.session.BotUserSession.source === "mashreq" && !context.session.BotUserSession.isKoreLogin) {
      context.entities.supportedAccounts = context.entities.supportedAccounts ? context.entities.supportedAccounts : [];
      context.entities.supportedAccounts.forEach((obj) => {
        if (["Savings Account", "Checking Account"].includes(obj)) {
          payload.push("Account");
        } else if (["Credit Card"].includes(obj)) {
          payload.push("Credit Card");
        } else if (["Auto Loan", "Personal Loan", "Mortgage", "Home Equity Loan", "Home Equity Line", "Line of Credit"].includes(obj)) {
          payload.push("Loan");
        } else {
          payload.push("Deposit");
        }
      });
      context.reqbody = JSON.stringify({
        customerId: context.session.BotUserSession.customerID,
        meta: {
          accountType: payload,
        },
      });
    } else {
      context.reqbody = JSON.stringify({
        customerId: context.session.BotUserSession.customerID,
        meta: {
          accountType: context.entities.supportedAccounts,
          productCodes: context.session.BotUserSession.productCodeDetails ? context.session.BotUserSession.productCodeDetails : [],
        },
      });
    }
  } else {
    context.reqbody = JSON.stringify({
      customerId: context.session.BotUserSession.customerID,
      meta: {
        accountType: context.entities.supportedAccounts,
        productCodes: context.session.BotUserSession.productCodeDetails ? context.session.BotUserSession.productCodeDetails : [],
      },
    });
  }
  context.fdbkObj = {
    BAL_INQ: fdbkFlag ? Codes["BAL_INQ"].enable : false,
    ACC_INFO: fdbkFlag ? Codes["ACC_INFO"].enable : false,
    CUST_INFO: fdbkFlag ? Codes["CUST_INFO"].enable : false,
  };
  context.wb_noAccounts = false;
  delete context.session.BotUserSession.fieldCodes;
  var inquiry = env.inquiry ? JSON.parse(env.inquiry) : {};
  var custprofrelmanager = env.custprofrelmanager ? JSON.parse(env.custprofrelmanager) : {};
  if (context.traits && (context.traits.includes("affordTo") || context.traits.includes("balanceafterdefineddate"))) {
    var moneymovement = env.moneymovement ? JSON.parse(env.moneymovement) : {};
    fieldCodes = Object.assign(inquiry, moneymovement, custprofrelmanager);
    BotUserSession.put("fieldCodes", fieldCodes, 1440);
    if ((!context.session.BotUserSession.fieldCodes["BAL-CHKN-AB"] && !context.session.BotUserSession.fieldCodes["BAL-SVG-AB"]) || !context.session.BotUserSession.fieldCodes["SPND-CHKN-AFFRD"]) {
      context.wb_noAccounts = true;
      context.field = !context.session.BotUserSession.fieldCodes["SPND-CHKN-AFFRD"] ? content.affDisable : content.depAccountBal;
    }
  } else {
    var fieldCodes = Object.assign(inquiry, custprofrelmanager);
    if (context.intentName === "viewLimits") {
      var obj = {
        "ACC-SVG-TXNPERDAY": fieldCodes["ACC-CHKN-TXNPERDAY"],
        "ACC-SVG-PERTXNLMT": fieldCodes["ACC-CHKN-PERTXNLMT"],
        "ACC-SVG-MONPURLMT": fieldCodes["ACC-CHKN-MONPURLMT"],
        "ACC-SVG-MONWITDLMT": fieldCodes["ACC-CHKN-MONWITDLMT"],
        "ACC-SVG-DLYPURLMT": fieldCodes["ACC-CHKN-DLYPURLMT"],
        "ACC-SVG-ATMWITDLMT": fieldCodes["ACC-CHKN-ATMWITDLMT"],
      };
      fieldCodes = Object.assign(fieldCodes, obj);
    }
    BotUserSession.put("fieldCodes", fieldCodes, 1440);
  }
  //This code is to trigger FAQ response when the user is not logged in and trait for an FAQ is found.
  if (botsupportedlogin && !context.session.BotUserSession.loginStatus && context.currentTraits && (context.currentTraits.includes("accountnumber") || context.currentTraits.includes("accountnumberanythingelse") || context.currentTraits.includes("accessaccountonline") || context.currentTraits.includes("balancecheck") || context.currentTraits.includes("accessaccountoutofstate") || context.currentTraits.includes("atmwithdrawal"))) {
    context.faqResponse = true;
  }
  if ((context.session.BotUserSession.source === "visifi" || context.session.BotUserSession.source === "symitar") && context.currentTraits) {
    if (!context.session.BotUserSession.loginStatus && context.currentTraits.includes("your")) {
      context.faqResponse = true;
    }
    if (context.currentTraits.includes("routingnumber")) {
      context.faqResponse = true;
      context.visifiRouting = true;
    }
  }

  context.entityRules = {
    AccountType: {
      asString: true,
    },
    select_cc : {
      asString: true,
    }
  };
} else if (context.intentName === "MoveMoney" || context.intentName === "HandleCCAccounts" || context.intentName === "LoanPayments" || context.intentName === "TransferFunds" || context.intentName === "P2PPayment" || context.intentName === "PayBill" || context.intentName === "DisplayPayees") {
  context.wb_noAccounts = false;
  delete context.session.BotUserSession.fieldCodes;
  var moneymovement = env.moneymovement ? JSON.parse(env.moneymovement) : {};

  if (context.traits && context.traits.includes("affordTo")) {
    var inquiry = env.inquiry ? JSON.parse(env.inquiry) : {};
    var fieldCodes = Object.assign(inquiry, moneymovement);
    BotUserSession.put("fieldCodes", fieldCodes, 1440);
    if ((!context.session.BotUserSession.fieldCodes["BAL-CHKN-AB"] && !context.session.BotUserSession.fieldCodes["BAL-SVG-AB"]) || !context.session.BotUserSession.fieldCodes["SPND-CHKN-AFFRD"]) {
      context.wb_noAccounts = true;
      context.field = !context.session.BotUserSession.fieldCodes["SPND-CHKN-AFFRD"] ? content.affDisable : content.depAccountBal;
    }
  } else {
    BotUserSession.put("fieldCodes", moneymovement, 1440);
  }

  if ((context.session.BotUserSession.source === "finastra" && context.session.BotUserSession.vendor && context.session.BotUserSession.vendor.paybill === "ipay") || (context.session.BotUserSession.source === "visifi" && context.session.BotUserSession.vendor && context.session.BotUserSession.vendor.paybill === "ipay") || context.session.BotUserSession.source === "mashreq" || context.session.BotUserSession.source === "symitar" || context.session.BotUserSession.source === "silverlake") {
    BotUserSession.put("skipSupportedBillers", true, 1440);
  }
  if (!context.session.BotUserSession.fieldCodes["A2A"] && !context.session.BotUserSession.fieldCodes["PMNT"] && !context.session.BotUserSession.fieldCodes["BILL"] && !context.session.BotUserSession.fieldCodes["P2P"]) {
    context.taskNotSupported = true;
    context.field = content.field_moneyMovement;
  }
  //This code is to trigger FAQ response when the user is not logged in and trait for an FAQ is found.
  if (context.intentName === "MoveMoney" && botsupportedlogin && !context.session.BotUserSession.loginStatus && context.currentTraits && (context.currentTraits.includes("wayforloanpayment") || context.currentTraits.includes("loanpayment") || context.currentTraits.includes("transfertointernalaccount") || context.currentTraits.includes("wire") || context.currentTraits.includes("transfertoexternalaccount") || context.currentTraits.includes("howtomakeloanpayment") || context.currentTraits.includes("payloanwithdebitcard"))) {
    context.faqResponse = true;
    if (context.currentTraits.includes("wayforloanpayment") || context.currentTraits.includes("transfertoexternalaccount") || context.currentTraits.includes("wire")) {
      context.skipLogin = true;
    }
  }

  //This code is to set fdbkFlag all MoveMoney chid dialogs
  context.fdbkObj = {
    A2A: fdbkFlag ? Codes["A2A"].enable : false,
    P2P: fdbkFlag ? Codes["P2P"].enable : false,
    BIL_PAY: fdbkFlag ? Codes["BIL_PAY"].enable : false,
    PMNT: fdbkFlag ? Codes["PMNT"].enable : false,
    Payee: fdbkFlag ? Codes["P2P"].enable : false,
    Biller: fdbkFlag ? Codes["BIL_PAY"].enable : false,
  };

  if (context.intentName === "TransferFunds") {
    context.entityRules = {
      transferFundDate: {
        range: {
          from: "today",
        },
      },
      FromAccount: {
        asString: true,
      },
      toSpecificAccount: {
        asString: true,
      },
    };
    context.fdbkFlag = context.fdbkObj["A2A"];
  } else if (context.intentName === "P2PPayment") {
    context.entityRules = {
      UnknownPayee: {
        ignoreWords: "~personignorewords",
      },
      FromAccount: {
        asString: true,
      },
    };
    context.fdbkFlag = context.session.BotUserSession[context.intentName] ? false : fdbkFlag && Codes["P2P"].enable ? true : false;
  } else if (context.intentName === "PayBill") {
    context.entityRules = {
      Company: {
        ignoreWords: "~companyignorewords",
      },
    };

    context.fdbkFlag = context.session.BotUserSession[context.intentName] ? false : fdbkFlag && Codes["BIL_PAY"].enable ? true : false;
  } else if (context.intentName === "HandleCCAccounts") {
    context.entityRules = {
      fromCreditCard: {
        asString: true,
      },
      fromOtherAccount: {
        asString: true,
      },
    };
    context.fdbkFlag = context.fdbkObj["PMNT"];
  } else if (context.intentName === "LoanPayments") {
    context.entityRules = {
      captureLoanAccounts: {
        asString: true,
      },
      PaymentAccountNumber: {
        asString: true,
      },
    };
    context.fdbkFlag = context.fdbkObj["PMNT"];
  } else if (context.intentName === "MoveMoney") {
    context.entityRules = {
      FromAccount: {
        asString: true,
      },
      transferAccount: {
        asString: true,
      },
      toSpecificAccount: {
        asString: true,
      },
      PersonName: {
        ignoreWords: "~personignorewords",
      },
      Company: {
        ignoreWords: "~companyignorewords",
      },

      capturePersonName: {
        FirstNameOfPayee: {
          ignoreWords: "~personignorewords",
        },
        LastNameOfPayee: {
          ignoreWords: "~personignorewords",
        },
      },
    };
  } else if (context.intentName === "DisplayPayees") {
    context.field = content.disable_DisplayPayees;
    context.entityRules = {
      PersonName: {
        ignoreWords: ["~personignorewords", env.botName],
      },
    };
  }
} else if (context.intentName === "AddBiller" || context.intentName === "AddPayee" || context.intentName === "AddUpdatePayeeOrBiller" || context.intentName === "UpdatePayee") {
  delete context.session.BotUserSession.fieldCodes;
  var moneymovement = env.moneymovement ? JSON.parse(env.moneymovement) : {};
  BotUserSession.put("fieldCodes", moneymovement, 1440);
  context.fdbkObj = {
    Payee: fdbkFlag ? Codes["P2P"].enable : false,
    Biller: fdbkFlag ? Codes["BIL_PAY"].enable : false,
  };
  context.entityRules = {
    PersonName: {
      ignoreWords: ["~personignorewords", env.botName],
    },
  };

  // if (context.intentName === "AddBiller" && fdbkFlag && Codes["BIL_PAY"].enable) {
  //     context.fdbkFlag = true;
  // }
  if (context.intentName === "AddPayee") {
    context.fdbkFlag = context.session.BotUserSession[context.intentName] ? false : fdbkFlag && Codes["P2P"].enable ? true : false;
  } else if (context.intentName === "AddBiller") {
    context.fdbkFlag = context.session.BotUserSession[context.intentName] ? false : fdbkFlag && Codes["BIL_PAY"].enable ? true : false;
  }

  if (context.intentName === "AddUpdatePayeeOrBiller") {
    // Entity rules for entities in AddUpdatePayeeOrBiller. Merging into one script for performance
    context.entityRules = {
      PersonName: {
        ignoreWords: "~personignorewords",
      },
      FirstNameOfPayee: {
        ignoreWords: "~personignorewords",
      },
      LastNameOfPayee: {
        ignoreWords: "~personignorewords",
      },
    };
    context.entities.capture;
  }
  if (context.intentName === "AddUpdatePayeeOrBiller" && !context.session.BotUserSession.fieldCodes["BILL"] && !context.session.BotUserSession.fieldCodes["P2P"]) {
    context.taskNotSupported = true;
    context.field = content.disable_AddUpdatePayeeOrBiller;
  } else if (context.intentName === "AddPayee" && !context.session.BotUserSession.fieldCodes["P2P"]) {
    context.taskNotSupported = true;
    context.field = content.disable_AddPayee;
  } else if (context.intentName === "AddBiller" && !context.session.BotUserSession.fieldCodes["BILL"]) {
    context.taskNotSupported = true;
    context.field = content.disable_AddBiller;
  }
  if ((context.session.BotUserSession.source === "finastra" && context.session.BotUserSession.vendor && context.session.BotUserSession.vendor.paybill === "ipay") || (context.session.BotUserSession.source === "visifi" && context.session.BotUserSession.vendor && context.session.BotUserSession.vendor.paybill === "ipay")) {
    BotUserSession.put("skipSupportedBillers", true, 1440);
  }
} else if (context.intentName === "CardIssues" || context.intentName === "ReportCardLost" || context.intentName === "ReportCardLostDemos" || context.intentName === "ReplaceCard" || context.intentName === "CardActivation" || context.intentName === "DisputeTransaction" || context.intentName === "TravelNotification" || context.intentName === "ResetPin" || context.intent === "GetRewardDetails") {
  delete context.session.BotUserSession.fieldCodes;
  var accountmaintenance = env.accountmaintenance ? JSON.parse(env.accountmaintenance) : {};
  BotUserSession.put("fieldCodes", accountmaintenance, 1440);
  context.fdbkFlag = context.session.BotUserSession[context.intentName] ? false : fdbkFlag && Codes["CRDCNTRL"].enable ? true : false;
  //This code is to trigger FAQ response when the user is not logged in and trait for an FAQ is found.
  context.field = context.intentName === "CardIssues" || context.intentName === "ReportCardLost" || context.intentName === "ReportCardLostDemos" ? content.disable_cardIssues : context.intentName === "DisputeTransaction" ? content.disable_DisputeTransaction : context.intentName === "TravelNotification" ? content.disable_TravelNotification : context.intentName === "CardActivation" ? content.disable_CardActivation : context.intentName === "ResetPin" ? content.disable_ResetPin : content.notApplicable;
  if (!context.session.BotUserSession.loginStatus && botsupportedlogin && context.currentTraits) {
    if (context.intentName === "CardIssues" && context.currentTraits.includes("lostcard")) {
      context.faqResponse = true;
    }
  }
  //This code is to trigger FAQ response when the user is not logged in and trait for an FAQ is found.
  if (botsupportedlogin && !context.session.BotUserSession.loginStatus && context.intentName === "ResetPin" && context.currentTraits && context.currentTraits.includes("changepin")) {
    context.faqResponse = true;
  }
  if (context.intentName === "CardIssues" && context.traits && context.traits.includes("unfreeze")) {
    context.entities.SelectCardIssue = "unfreeze";
  }
  if (context.intentName === "CardIssues" || context.intentName === "CardActivation") {
    context.entityRules = {
      AccountType: {
        asString: true,
      },
      Activation_showCardAccounts: {
        asString: true,
      },
    };
    if (context.intentName === "CardActivation") {
      var accounts;
      if (context.session.BotUserSession.source === "mashreq" && !context.session.BotUserSession.isKoreLogin) {
        if (context.traits && context.traits.includes("creditcard")) {
          accounts = ["Credit Card"];
        } else if (context.traits && context.traits.includes("debitcard")) {
          accounts = ["Account"];
        } else {
          accounts = ["Account", "Credit Card"];
        }
      } else {
        if (context.traits && context.traits.includes("creditcard")) {
          accounts = ["Credit Card"];
        } else if (context.traits && context.traits.includes("debitcard")) {
          accounts = ["Checking Account", "Savings Account"];
        } else {
          accounts = ["Credit Card", "Checking Account", "Savings Account"];
        }
      }

      if (context.session.BotUserSession.source === "mashreq" && !context.session.BotUserSession.isKoreLogin) {
        context.reqbody = JSON.stringify({
          customerId: context.session.BotUserSession.customerID,
          meta: {
            accountType: accounts,
          },
        });
      } else {
        context.reqbody = JSON.stringify({
          customerId: context.session.BotUserSession.customerID,
          meta: {
            accountType: accounts,
            productCodes: context.session.BotUserSession.productCodeDetails ? context.session.BotUserSession.productCodeDetails : [],
          },
        });
      }
    }
  } else if (context.intentName === "ResetPin") {
    context.entityRules = {
      FromAccount: {
        asString: true,
      },
      RP_multipleCardsData: {
        asString: true,
      },
    };
  } else if (context.intentName === "DisputeTransaction") {
    context.entityRules = {
      FromAccount: {
        asString: true,
      },
      captureDate: {
        tense: "past",
        range: {
          to: "today",
        },
      },
      DateCapture: {
        tense: "past",
        range: {
          to: "today",
        },
      },
      purchaseCancelDate: {
        tense: "past",
        range: {
          to: "today",
        },
      },
      duplicateCharges: {
        allowConfirmation: true,
        ownership: "exclude",
        includeWords: ["shady", "~strongbadness", "~linkingverb ~strongbadness", "not [spend buy] {anything} ~prepositionlist"],
        // "excludeWords" : [
        // "~goodness",
        // ],

        confirmYesSynonyms: ["dispute ~it_words", "done"],
        confirmNoSynonyms: ["give up"],
      },
    };
  } else if (context.intentName === "TravelNotification") {
    // Entity rules for entities in Travel Notification. Merging into one script for performance
    context.entityRules = {
      compCityOrCountry: {
        city: {
          ignoreWords: "~cityignorewords",
        },
      },
      countryTravelDates: {
        range: {
          from: "today",
        },
      },
    };
    if (!context.session.BotUserSession.loginStatus && botsupportedlogin && context.currentTraits && (context.currentTraits.includes("travelnotification") || context.currentTraits.includes("outoftown"))) {
      context.faqResponse = true;
    }
  }

  //Generating dynamic cardTypes
  context.CardTypeList = [];
  var cardType = ["Debit", "Credit"];
  var payload = ["Debit", "Credit"];

  for (var i = 0; i < cardType.length; i++) {
    var temp = [];
    var message = {
      title: cardType[i],
      value: payload[i],
    };
    if (payload[i] === "Debit") {
      temp.push('"~debitcard"');
    } else if (payload[i] === "Credit") {
      temp.push('"~creditcard"');
    }
    temp.push('"' + payload[i] + '"');
    message.synonym = temp;
    context.CardTypeList.push(message);
  }
} else if (context.intentName === "updateAccountInfo" || context.intentName === "updateDetails") {
  // var source = "visifi";
  // BotUserSession.put('source', source, 1440);
  context.field = content.updateDetails;
  delete context.session.BotUserSession.fieldCodes;
  var accountmaintenance = env.accountmaintenance ? JSON.parse(env.accountmaintenance) : {};
  var custprofrelmanager = env.custprofrelmanager ? JSON.parse(env.custprofrelmanager) : {};
  fieldCodes = Object.assign(accountmaintenance, custprofrelmanager);
  BotUserSession.put("fieldCodes", fieldCodes, 1440);
  context.taskNotSupported = !context.session.BotUserSession.fieldCodes["EDITACC"] && !context.session.BotUserSession.fieldCodes["CP-CUST"] ? true : false;
  context.fdbkFlag = context.session.BotUserSession[context.intentName] ? false : fdbkFlag && Codes["EDITACC"].enable ? true : false;
  // if (context.session.BotUserSession.source === "visifi"){
  //     context.entities.profileOrAccountLevel = "Profile";
  // }

  context.entityRules = {
    cityName: {
      ignoreWords: "~cityignorewords",
    },
    AccountType: {
      asString: true,
    },
  };

  //This code is to trigger FAQ response when the user is not logged in and trait for an FAQ is found.
  if (botsupportedlogin && !context.session.BotUserSession.loginStatus && context.currentTraits && context.currentTraits.includes("addresschange")) {
    context.faqResponse = true;
  }
} else if (context.intentName === "ResetPassword") {
  delete context.session.BotUserSession.fieldCodes;
  var custprofrelmanager = env.custprofrelmanager ? JSON.parse(env.custprofrelmanager) : {};
  //var password = Base64.decode(custprofrelmanager.RP_PWD_Regex);
  BotUserSession.put("fieldCodes", custprofrelmanager, 1440);
  BotUserSession.put("caseInsensitive", true);
  BotUserSession.put("attemptsCount", 3);
  BotUserSession.put("typeOfReset", "both");
  BotUserSession.put("passwordRegexTest", context.session.BotUserSession.fieldCodes["RP_PWD_Regex"]);
  context.fdbkFlag = context.session.BotUserSession[context.intentName] ? false : fdbkFlag && Codes["OB_RP"].enable ? true : false;
  if (context.currentTraits && botsupportedlogin && (context.currentTraits.includes("changepassword") || context.currentTraits.includes("forgotpassword"))) {
    context.resetpasswordfaqresponse = true;
  }
} else if (context.intentName === "UnlockHomeBanking") {
  delete context.session.BotUserSession.fieldCodes;
  var custprofrelmanager = env.custprofrelmanager ? JSON.parse(env.custprofrelmanager) : {};
  BotUserSession.put("fieldCodes", custprofrelmanager, 1440);
  context.taskNotSupported = !context.session.BotUserSession.fieldCodes["OB-UNLCKHMBNK"] ? true : false;
  if (context.taskNotSupported) {
    context.field = content.field_unlockHomeBanking;
  }
  // context.fdbkFlag = context.session.BotUserSession[context.intentName] ? false : (fdbkFlag && Codes["OB_UNLCKHMBNK"].enable) ? true : false;
} else if (context.intentName === "PII_information") {
  delete context.session.BotUserSession.fieldCodes;
  var custprofrelmanager = env.custprofrelmanager ? JSON.parse(env.custprofrelmanager) : {};
  BotUserSession.put("fieldCodes", custprofrelmanager, 1440);
  context.taskNotSupported = !context.session.BotUserSession.fieldCodes["OB-UNLCKHMBNK-PII"] ? true : false;
} else if (context.intentName === "FindNearest") {
  delete context.session.BotUserSession.fieldCodes;
  var banklocator = env.banklocator ? JSON.parse(env.banklocator) : {};
  BotUserSession.put("fieldCodes", banklocator, 1440);
  context.fdbkFlag = context.session.BotUserSession[context.intentName] ? false : fdbkFlag && Codes["BANK_LOC"].enable ? true : false;
  context.client = env.client ? env.client.toLowerCase() : "";

  // entity rules
  context.entityRules = {
    bankLocation: {
      ZipCode1: {
        preferredCountries: ["US"],
      },
    },
  };
  if (context.session.BotUserSession.source === "visifi") {
    //pre-assigning the value for PSCU as they don not have ATMs at all.
    context.entities.type = "Branch";
  }
} else if (context.intentName === "SetupAlert") {
  delete context.session.BotUserSession.fieldCodes;
  var botgenalertsmarketing = env.botgenalertsmarketing ? JSON.parse(env.botgenalertsmarketing) : {};
  var accountmaintenance = env.accountmaintenance ? JSON.parse(env.accountmaintenance) : {};
  var fieldCodes = Object.assign(accountmaintenance, botgenalertsmarketing);
  BotUserSession.put("fieldCodes", fieldCodes, 1440);
  context.field = content.disable_SetupAlert;
  context.fdbkFlag = context.session.BotUserSession[context.intentName] ? false : fdbkFlag && Codes["CUSTALRT"].enable ? true : false;

  context.entityRules = {
    AccountType: {
      asString: true,
    },
    captureAccountType: {
      asString: true,
    },
  };
  //This code is to trigger FAQ response when the user is not logged in and trait for an FAQ is found.
  if (botsupportedlogin && !context.session.BotUserSession.loginStatus && context.currentTraits && context.currentTraits.includes("setupalert")) {
    context.faqResponse = true;
  }
  //Generating dynamic cardTypes
  context.CardTypeList = [];
  var cardType = ["Debit", "Credit"];
  var payload = ["Debit", "Credit"];

  for (var i = 0; i < cardType.length; i++) {
    var temp = [];
    var message = {
      title: cardType[i],
      value: payload[i],
    };
    if (payload[i] === "Debit") {
      temp.push('"~debitcard"');
    } else if (payload[i] === "Credit") {
      temp.push('"~creditcard"');
    }
    temp.push('"' + payload[i] + '"');
    message.synonym = temp;
    context.CardTypeList.push(message);
  }
} else if (context.intentName === "MakeDeposit") {
  delete context.session.BotUserSession.fieldCodes;
  var moneymovement = env.moneymovement ? JSON.parse(env.moneymovement) : {};
  BotUserSession.put("fieldCodes", moneymovement, 1440);

  //This code is to trigger FAQ response when the user is not logged in and trait for an FAQ is found.
  if (botsupportedlogin && !context.session.BotUserSession.loginStatus && context.currentTraits && context.currentTraits.includes("chequedeposit")) {
    context.faqResponse = true;
  }
  context.entityRules = {
    FromAccount: {
      asString: true,
    },
  };
} else if (context.intentName === "SBALoans") {
  delete context.session.BotUserSession.fieldCodes;
  var accountmaintenance = env.accountmaintenance ? JSON.parse(env.accountmaintenance) : {};
  BotUserSession.put("fieldCodes", accountmaintenance, 1440);

  context.fdbkFlag = context.session.BotUserSession[context.intentName] ? false : fdbkFlag && Codes["DFR_LON_PMNT"].enable ? true : false;
} else if (context.intentName === "AgentTransfer") {
  var agentTransfer = env.agenttransfer ? JSON.parse(env.agenttransfer) : {};
  if (agentTransfer && Object.keys(agentTransfer) && Object.keys(agentTransfer).length > 0) {
    BotUserSession.put("agentEnabled", agentTransfer.agentEnabled, 1440);
    BotUserSession.put("voiceEnabled", agentTransfer.voiceEnabled ? agentTransfer.voiceEnabled : false, 1440);
    BotUserSession.put("serviceName", agentTransfer.serviceName && agentTransfer.serviceName.length > 0 ? agentTransfer.serviceName : null, 1440);
  }
  context.bothAgentsEnabled = context.session.BotUserSession.agentEnabled && context.session.BotUserSession.voiceEnabled ? true : false;

  if (botsupportedlogin && !context.session.BotUserSession.loginStatus && context.currentTraits && context.currentTraits.includes("closeaccount")) {
    context.faqResponse = true;
  }
  tags.addMessageLevelTag("agentTransfer", "AgentTransfer");
  if (context.invocationSource && context.invocationSource.type === "userInputMatch") {
    tags.addMessageLevelTag("bankerTransfer", "User Initiated");
  } else if (context.invocationSource && context.invocationSource.type === "transitionBased" && context.BotSuggested) {
    tags.addMessageLevelTag("bankerTransfer", "Bot Suggested");
  } else if (context.invocationSource && context.invocationSource.type === "transitionBased") {
    tags.addMessageLevelTag("bankerTransfer", "Bot Initiated");
  }
  //This is to send the user information to the agent transfer so that the converstion will be more realistic.

  if (context.session.BotUserSession.customerName) {
    var userType = {};
    userType[context.session.BotUserSession.customerName] = {
      firstName: context.session.BotUserSession.firstName ? context.session.BotUserSession.firstName : null,
      lastName: context.session.BotUserSession.lastName ? context.session.BotUserSession.lastName : null,
      emailId: context.session.BotUserSession.customerEmailId ? context.session.BotUserSession.customerEmailId : null,
      phoneNumber: context.session.BotUserSession.mobileNumber ? context.session.BotUserSession.mobileNumber : null,
      customerID: context.session.BotUserSession.customerID ? context.session.BotUserSession.customerID : null,
      username: context.session.BotUserSession.username ? context.session.BotUserSession.username : null,
      custSegmentName: context.session.BotUserSession.custSegmentName ? context.session.BotUserSession.custSegmentName : null,
      CustomerType: context.session.BotUserSession.CustomerType ? context.session.BotUserSession.CustomerType : null,
    };
    agentUtils.setUserInfo(userType[context.session.BotUserSession.customerName]);
  }
} else if (context.intentName === "Account_Closure_Status") {
  BotUserSession.put("subIntent", "ACC_CLSR_STAT", 1440);
  // context.accountType = ["Checking Account", "Savings Account"];
  if (context.session.BotUserSession.source === "mashreq" && !context.session.BotUserSession.isKoreLogin) {
    context.reqbody = JSON.stringify({
      customerId: context.session.BotUserSession.customerID,
      meta: {
        accountType: ["Account", "Credit Card"],
      },
    });
  } else {
    context.reqbody = JSON.stringify({
      customerId: context.session.BotUserSession.customerID,
      meta: {
        accountType: ["Credit Card", "Checking Account", "Savings Account"],
        productCodes: context.session.BotUserSession.productCodeDetails ? context.session.BotUserSession.productCodeDetails : [],
      },
    });
  }
} else if (context.intentName === "Unlock_Card") {
  var accounts;
  if (context.session.BotUserSession.source === "mashreq" && !context.session.BotUserSession.isKoreLogin) {
    if (context.traits && context.traits.includes("creditcard")) {
      accounts = ["Credit Card"];
    } else if (context.traits && context.traits.includes("debitcard")) {
      accounts = ["Account"];
    } else {
      accounts = ["Account", "Credit Card"];
    }
  } else {
    if (context.traits && context.traits.includes("creditcard")) {
      accounts = ["Credit Card"];
    } else if (context.traits && context.traits.includes("debitcard")) {
      accounts = ["Checking Account", "Savings Account"];
    } else {
      accounts = ["Credit Card", "Checking Account", "Savings Account"];
    }
  }

  if (context.session.BotUserSession.source === "mashreq" && !context.session.BotUserSession.isKoreLogin) {
    context.reqbody = JSON.stringify({
      customerId: context.session.BotUserSession.customerID,
      meta: {
        accountType: accounts,
      },
    });
  } else {
    context.reqbody = JSON.stringify({
      customerId: context.session.BotUserSession.customerID,
      meta: {
        accountType: accounts,
        productCodes: context.session.BotUserSession.productCodeDetails ? context.session.BotUserSession.productCodeDetails : [],
      },
    });
  }
} else if (context.intentName === "Request_Cheque_Book") {
  delete context.session.BotUserSession.fieldCodes;
  // var accountmaintenance = env.accountmaintenance ? JSON.parse(env.accountmaintenance) : {};
  var accountmaintenance = env.accountmaintenance ? env.accountmaintenance : {};
  fieldCodes = accountmaintenance;
  BotUserSession.put("fieldCodes", fieldCodes, 1440);
  // if (context.session.BotUserSession.source === "mashreq" && !context.session.BotUserSession.isKoreLogin) {
  if (context.session.BotUserSession.source === "mashreq") {
    context.reqbody = JSON.stringify({
      customerId: context.session.BotUserSession.customerID,
      meta: {
        accountType: ["Account"],
        skipDetails: true,
      },
    });
  } else {
    context.reqbody = JSON.stringify({
      customerId: context.session.BotUserSession.customerID,
      meta: {
        accountType: ["Checking Account", "Savings Account"],
        productCodes: context.session.BotUserSession.productCodeDetails ? context.session.BotUserSession.productCodeDetails : [],
      },
    });
  }
  context.field = content.disable_requestchequebook;
} else if (context.intentName === "Credit_Card_Auto_Payment") {
  if (context.session.BotUserSession.source === "mashreq" && !context.session.BotUserSession.isKoreLogin) {
    context.reqbody = JSON.stringify({
      customerId: context.session.BotUserSession.customerID,
      meta: {
        accountType: ["Credit Card", "Account"],
      },
    });
  } else {
    context.reqbody = JSON.stringify({
      customerId: context.session.BotUserSession.customerID,
      meta: {
        accountType: ["Checking Account", "Savings Account", "Credit Card"],
        productCodes: context.session.BotUserSession.productCodeDetails ? context.session.BotUserSession.productCodeDetails : [],
      },
    });
  }

  context.entityRules = {
    Autopay_showActiveCards: {
      asString: true,
    },
  };
} else if (context.intentName === "CardsAccountsLimitsManage") {
  if (context.session.BotUserSession.source === "mashreq") {
    context.entityRules = {
      EnterAmount: {
        currencyCodes: ["AED"],
        defaultCode: "AED",
      },
    };
  }
} else if (context.intentName === "Reactivation_of_Dormant_accounts") {
  context.entityRules = {
    multipleDormantAccs: {
      asString: true,
    },
  };
  if (context.session.BotUserSession.source === "mashreq" && !context.session.BotUserSession.isKoreLogin) {
    context.reqbody = JSON.stringify({
      customerId: context.session.BotUserSession.customerID,
      meta: {
        accountType: ["Account"],
      },
    });
  } else {
    context.reqbody = JSON.stringify({
      customerId: context.session.BotUserSession.customerID,
      meta: {
        accountType: ["Savings Account", "Checking Account"],
        productCodes: context.session.BotUserSession.productCodeDetails ? context.session.BotUserSession.productCodeDetails : [],
      },
    });
  }
} else if (context.intentName === "Dispute_Form_Process") {
  context.entityRules = {
    disputeform_multipleAccounts: {
      asString: true,
    },
    TxnMultiDisplay: {
      asString: true,
    },
  };
  if (context.session.BotUserSession.source === "mashreq" && !context.session.BotUserSession.isKoreLogin) {
    context.reqbody = JSON.stringify({
      customerId: context.session.BotUserSession.customerID,
      meta: {
        accountType: ["Account", "Credit Card"],
      },
    });
  } else {
    context.reqbody = JSON.stringify({
      customerId: context.session.BotUserSession.customerID,
      meta: {
        accountType: ["Savings Account", "Checking Account", "Credit Card"],
        productCodes: context.session.BotUserSession.productCodeDetails ? context.session.BotUserSession.productCodeDetails : [],
      },
    });
  }
} else if (context.intentName === "Transaction_Decline_Reason") {
  if (context.session.BotUserSession.source === "mashreq" && !context.session.BotUserSession.isKoreLogin) {
    context.reqbody = JSON.stringify({
      customerId: context.session.BotUserSession.customerID,
      meta: {
        accountType: ["Account", "Credit Card"],
      },
    });
  } else {
    context.reqbody = JSON.stringify({
      customerId: context.session.BotUserSession.customerID,
      meta: {
        accountType: ["Credit Card", "Checking Account", "Savings Account"],
        productCodes: context.session.BotUserSession.productCodeDetails ? context.session.BotUserSession.productCodeDetails : [],
      },
    });
  }
} else if (context.intentName === "View_Statements") {
  context.entityRules = {
    view_multipleAccounts: {
      asString: true,
    },
  };

  if (context.session.BotUserSession.source === "mashreq") {
    context.reqbody = JSON.stringify({
      customerId: context.session.BotUserSession.customerID,
      meta: {
        accountType: ["Credit Card", "Account", "Loan"],
      },
    });
  } else {
    context.reqbody = JSON.stringify({
      customerId: context.session.BotUserSession.customerID,
      meta: {
        accountType: ["Checking Account", "Savings Account", "Credit Card"],
        productCodes: context.session.BotUserSession.productCodeDetails ? context.session.BotUserSession.productCodeDetails : [],
      },
    });
  }
} else if (context.intentName === "Close_Account") {
  context.entityRules = {
    CA_multipleAccounts: {
      asString: true,
    },
  };
} else if (context.intentName === "Manage_Limits_Custom") {
  if (context.session.BotUserSession.source === "mashreq" && !context.session.BotUserSession.isKoreLogin) {
    context.reqbody = JSON.stringify({
      customerId: context.session.BotUserSession.customerID,
      meta: {
        accountType: ["Credit Card", "Account"],
      },
    });
  } else {
    context.reqbody = JSON.stringify({
      customerId: context.session.BotUserSession.customerID,
      meta: {
        accountType: ["Credit Card"],
        productCodes: context.session.BotUserSession.productCodeDetails ? context.session.BotUserSession.productCodeDetails : [],
      },
    });
  }
  // context.entityRules ={
  // }
} else if (context.intentName === "Card_Cancelation") {
    
  var accountmaintenance = env.accountmaintenance ? JSON.parse(env.accountmaintenance) : {};

  context.entityRules = {
    cancellation_multiplecards: {
      asString: true,
    },
  };
  delete context.session.BotUserSession.fieldCodes;
  BotUserSession.put("fieldCodes", accountmaintenance, 1440);
  // only if entities.debitCardOrCreditCard exists
  if (context.entities.debitCardOrCreditCard) {
    if (context.entities.debitCardOrCreditCard.toLowerCase() === "credit" && !context.session.BotUserSession.fieldCodes["CRDCNTRL-CC-RQST_CRD_CNL"]) {
      // context.field = content.cc_card_cnl_notsupprted;
      context.field = "credit card cancellation";
      context.taskNotSupported = true;
    } else if (context.entities.debitCardOrCreditCard.toLowerCase() === "debit" && !context.session.BotUserSession.fieldCodes["CRDCNTRL-DC-RQST_CRD_CNL"]) {
      // context.field = content.dc_card_cnl_notsupprted;
      context.field = "debit card cancellation";
      context.taskNotSupported = true;
    }
  } else {
    if (context.session.BotUserSession.source === "kore") {
      if (!context.session.BotUserSession.fieldCodes["CRDCNTRL-CC-RQST_CRD_CNL"] && !context.session.BotUserSession.fieldCodes["CRDCNTRL-DD-RQST_CRD_CNL"]) {
        context.taskNotSupported = true;
        // context.field = content.card_cnl_notsupprted;
        context.field = "card cancellation";
      } else if (!context.session.BotUserSession.fieldCodes["CRDCNTRL-CC-RQST_CRD_CNL"]) {
        // context.field = content.cc_card_cnl_notsupprted;
        context.field = "credit card cancellation";
      } else if (!context.session.BotUserSession.fieldCodes["CRDCNTRL-DC-RQST_CRD_CNL"]) {
        // context.field = content.dc_card_cnl_notsupprted;
        context.field = "debit card cancellation";
      }
    }
  }
}
else if(context.intentName === "GetAffordability"){
    
    if (context.traits && (context.traits.includes("affordTo") || context.traits.includes("balanceafterdefineddate"))) {
        delete context.session.BotUserSession.fieldCodes
        var inquiry = env.inquiry ? JSON.parse(env.inquiry) : {};
        var custprofrelmanager = env.custprofrelmanager ? JSON.parse(env.custprofrelmanager) : {};
        var moneymovement = env.moneymovement ? JSON.parse(env.moneymovement) : {};
        var moneymovement = env.moneymovement ? JSON.parse(env.moneymovement) : {};
        fieldCodes = Object.assign(inquiry, moneymovement, custprofrelmanager);
        BotUserSession.put("fieldCodes", fieldCodes, 1440);
        if ((!context.session.BotUserSession.fieldCodes["BAL-CHKN-AB"] && !context.session.BotUserSession.fieldCodes["BAL-SVG-AB"]) || !context.session.BotUserSession.fieldCodes["SPND-CHKN-AFFRD"]) {
          context.wb_noAccounts = true;
          context.field = !context.session.BotUserSession.fieldCodes["SPND-CHKN-AFFRD"] ? content.affDisable : content.depAccountBal;
        }
    }
}

if (context.session.UserContext.firstName === "Susmitha") {
  BotUserSession.put("isIVR", undefined);
  //     context.isIVRAuth = true;
  //     BotUserSession.put("isIVR", 'success',1440);
  //     BotUserSession.put("loginStatus", undefined);
}

//if (context.session.UserContext.firstName === "Sahith Raja") {

//       BotUserSession.put("isIVR", undefined);
//context.session.BotUserSession.source = "mashreq";
//context.session.BotUserSession.source = "visifi";
//     context.isIVRAuth = true;
//     BotUserSession.put("isIVR", 'success',1440);
//     BotUserSession.put("loginStatus", undefined);
//}

if (context.session.UserContext.lastName === "Nakka" || context.session.UserContext.firstName === "Poorna" || context.session.UserContext.lastName === "Sandeep" || context.session.UserContext.firstName === "Sandeep") {
  BotUserSession.put("isIVR", undefined);
  context.session.BotUserSession.source = "mashreq";
  context.tempflag = true;
  // context.isIVRAuth = true;
  // BotUserSession.put("isIVR", 'success',1440);
  // BotUserSession.put("loginStatus", undefined);
}

if (context.session.UserContext.firstName === "Sahith Raja") {
  BotUserSession.put("isIVR", undefined);
  context.session.BotUserSession.source = "mashreq";
  // context.isIVRAuth = true;
  // BotUserSession.put("isIVR", 'success',1440);
  // BotUserSession.put("loginStatus", undefined);
}

if (context.session.UserContext.firstName === "Swathy") {
  BotUserSession.put("isIVR", undefined);
  //context.session.BotUserSession.source = "mashreq";
  //context.isIVRAuth = true;
  //BotUserSession.put("isIVR", 'success',1440);
  //BotUserSession.put("loginStatus", undefined);
}

if (context.session.UserContext.firstName === "Sandeep") {
  //BotUserSession.put("isIVR", undefined);
  context.session.BotUserSession.source = "kore";
  //context.isIVRAuth = true;
  //BotUserSession.put("isIVR", 'success',1440);
  //BotUserSession.put("loginStatus", undefined);
}

if (context.session.UserContext.firstName === "Rajeswara") {
  BotUserSession.put("devLogin", true, 1440);
  BotUserSession.put("isIVR", undefined);
  //   BotUserSession.put("devLogin", undefined);
  // context.session.BotUserSession.source = "kore";
  // context.isIVRAuth = true;
  // context.session.BotUserSession.client = "gerber";
  //   BotUserSession.put("isIVR", 'success',1440);
  // context.client = "gerber"
  // BotUserSession.put("loginStatus", undefined);
}

//login status for sms channel - to trigger logmein dialog if auth is timedout.
if (context.session && context.session.BotUserSession && context.session.BotUserSession.channels && context.session.BotUserSession.channels.length > 0 && context.session.BotUserSession.channels[0].type) {
  //if(l.isUndefined(context.session.BotUserSession.channels[0]) === false){
  if (context.session.BotUserSession.channels[0].type === "sms") {
    context.isSMS = true;
    context.authTimedOut = false;
    BotUserSession.put("isSMS", "success", 1440);
    BotUserSession.put("isIVR", undefined);
    if (context.session.BotUserSession.loginTimestamp) {
      //Calculating the difference between the current time and time when user logged in to see if diff exceeded 6000 secs, if exceeds then loginStatus would be set as undefined.
      var timediff = context.session.BotUserSession.loginTimestamp - new Date().getTime();
      if (timediff > 6000) {
        context.authTimedOut = true;
        BotUserSession.put("loginStatus", undefined);
      }
    } else {
      //When user logs into the sms channel for the first time.
      context.authTimedOut = true;
      BotUserSession.put("loginStatus", undefined);
    }
  } else if (context.session.BotUserSession.channels[0].preferredChannelForResponse && ["audiocodes", "twiliovoice", "ivrVoice"].includes(context.session.BotUserSession.channels[0].preferredChannelForResponse) && !context.session.BotUserSession.loginStatus) {
    BotUserSession.put("isIVR", "success", 1440);
    var ivrauth = env.ivrauthentication ? JSON.parse(env.ivrauthentication) : {};
    var fieldCodes = context.session.BotUserSession.fieldCodes ? Object.assign(context.session.BotUserSession.fieldCodes, ivrauth) : ivrauth; //Object.assign(ivrauth);
    BotUserSession.put("fieldCodes", fieldCodes, 1440);
  } else if ((["audiocodes", "twiliovoice", "ivrVoice"].includes(context.session.BotUserSession.channels[0].type) || context.isIVRAuth) && !context.session.BotUserSession.loginStatus) {
    BotUserSession.put("isIVR", "success", 1440);
    var ivrauth = env.ivrauthentication ? JSON.parse(env.ivrauthentication) : {};
    var fieldCodes = context.session.BotUserSession.fieldCodes ? Object.assign(context.session.BotUserSession.fieldCodes, ivrauth) : ivrauth; //Object.assign(ivrauth);
    BotUserSession.put("fieldCodes", fieldCodes, 1440);
  }
}

//This code is to set the api paths in session for the cases like reset password when we do not switch to logmein dialog.
var host = env.host ? env.host : null;
var path = env.path ? env.path : null;
var apiPath = null;
if (host) {
  host = host[host.length - 1] !== "/" ? host + "/" : host;
  apiPath = path ? host.concat(path) : host;
  apiPath = apiPath[apiPath.length - 1] !== "/" ? apiPath + "/" : apiPath;
}

// This is for Auth API path
var authPath = env.AUTH_API_PATH ? env.AUTH_API_PATH : null;
var authApiPath = null;
if (host) {
  host = host[host.length - 1] !== "/" ? host + "/" : host;
  authApiPath = authPath ? host.concat(authPath) : host;
  authApiPath = authApiPath[authApiPath.length - 1] !== "/" ? authApiPath + "/" : authApiPath;
}

BotUserSession.put("apiPath", apiPath, 1440);
BotUserSession.put("authApiPath", authApiPath, 1440);
BotUserSession.put("koreApiPath", env.koreApiPath, 1440);
BotUserSession.put("ubUserId", context.session.opts.userId, 1440);
BotUserSession.put("ubBotId", context.session.opts.streamId, 1440);
BotUserSession.put("isDemo", isDemo ? isDemo.enabled : false);
BotUserSession.put("accountId", env.ACCOUNT_ID, 1440);

// Mashreq specific for mobile sdk auth token updation. This code seems like obsolete.
// if (context.session.BotUserSession.source === "mashreq") {
//     var secureCustomData = context.session.UserContext.secureCustomData ? context.session.UserContext.secureCustomData : {};
// if(secureCustomData && Object.keys(secureCustomData).length > 0){
//     if (secureCustomData && secureCustomData.customerInfo && secureCustomData.customerInfo.firstName) {
//         BotUserSession.put("firstName", secureCustomData.customerInfo.firstName, 1440);
//         var customerName = secureCustomData.customerInfo.lastName ? secureCustomData.customerInfo.firstName + " " + secureCustomData.customerInfo.lastName : secureCustomData.customerInfo.firstName;
//         BotUserSession.put("customerName", customerName, 1440);
//     }else if(secureCustomData && secureCustomData.customerInfo && secureCustomData.customerInfo.customerName){
//          BotUserSession.put("firstName", secureCustomData.customerInfo.customerName, 1440);
//         BotUserSession.put("customerName", secureCustomData.customerInfo.customerName, 1440);
//     }
//     BotUserSession.put("accessToken", secureCustomData.accesstoken ? secureCustomData.accesstoken : null, 1440);
//     BotUserSession.put("authToken", secureCustomData.authtoken ? secureCustomData.authtoken : null,  1440);
//     BotUserSession.put("correlationid", Math.floor(100000 + Math.random() * 900000), 1440);
//  BotUserSession.put("loginStatus", secureCustomData.accesstoken && secureCustomData.authtoken  ? "success" : undefined, 1400);//     BotUserSession.put('customerEmailId', secureCustomData && secureCustomData.customerInfo && secureCustomData.customerInfo.customerEmailId ? secureCustomData.customerInfo.customerEmailId : null, 1440);
//     BotUserSession.put('mobileNumber', secureCustomData && secureCustomData.customerInfo && secureCustomData.customerInfo.mobileNumber ? secureCustomData.customerInfo.mobileNumber : null, 1440);
// }
// }

if (context.session.UserContext.firstName === "Pavan") {
  BotUserSession.put("isIVR", undefined);
  //BotUserSession.put("customerID", "1055414", 1440);
}

if (context.session.UserContext.firstName === "Susmitha") {
  //BotUserSession.put("isSMS", undefined);
  //BotUserSession.put("isIVR", "success", 1440);
  //BotUserSession.put("isIVR", undefined);
  // BotUserSession.put("isDemo", undefined,1440);
  // BotUserSession.put("isIVR", "success", 1440);
  // context.session.BotUserSession.loginStatus = undefined;
  BotUserSession.put("source", "mashreq", 1440);
  //BotUserSession.put("isKoreLogin", true, 1440);
}

if (context.session.UserContext.firstName === "Swathy") {
  //BotUserSession.put("isSMS", undefined);
  // BotUserSession.put("isIVR", "success", 1440);
  BotUserSession.put("isIVR", undefined);
  // BotUserSession.put("isDemo", undefined,1440);
  // BotUserSession.put("isIVR", "success", 1440);
  // context.session.BotUserSession.loginStatus = undefined;
  // BotUserSession.put("source", "mashreq", 1440);
  context.session.BotUserSession.source = "mashreq";
  // context.session.BotUserSession.source = "kore";
}
if (context.session.UserContext.firstName.toLowerCase() === "yashwanth") {
  koreDebugger.log("Intent name "+context.intentName);

}

// if (context.session.UserContext.firstName === "Sahith Raja") {
//     //BotUserSession.put("isSMS", undefined);
//     //BotUserSession.put("isIVR", "success", 1440);
//     BotUserSession.put("isIVR", undefined);
//     //BotUserSession.put("isDemo", undefined,1440);
//     //BotUserSession.put("isIVR", "success", 1440);
//     //context.session.BotUserSession.loginStatus = undefined;
//     context.session.BotUserSession.source = "mashreq";
//     //BotUserSession.put("source", "mashreq", 1440);
// }
// if (context.session.UserContext.firstName === "Rajeswara") {
//     context.session.BotUserSession.isIVR = undefined;
//     context.session.BotUserSession.source = "kore";
//     // context.session.BotUserSession.skipSupportedBillers = undefined;
//     // BotUserSession.put("isIVR", 'success',1440);
//     // context.isIVRAuth = true;
//     // context.session.BotUserSession.loginStatus = undefined;
//     // BotUserSession.put("isDemo", true ,1440);
//     // BotUserSession.put("isDemo", undefined, 1440);
// }

if (context.session.UserContext.firstName === "Abhinay" || context.session.UserContext.firstName === "Abhinay Meka") {
  context.session.BotUserSession.source = "mashreq";
  //   BotUserSession.put("isIVR", "success", 1440);
  // BotUserSession.put("isIVR", undefined);
  // context.session.BotUserSession.source = "kore"
}

if (context.session.UserContext.firstName === "Akilan") {
  //BotUserSession.put("isIVR", undefined);
  //context.session.BotUserSession.source = "mashreq";
  BotUserSession.put("isIVR", "success", 1440);
  //BotUserSession.put("isIVR", undefined);
  context.session.BotUserSession.isDemo = true;
  context.session.BotUserSession.loginStatus = undefined;
  context.session.BotUserSession.source = "kore";
}
if (context.session.UserContext.firstName === "Harsh") {
  // context.session.BotUserSession.source = "mashreq";
  //context.session.BotUserSession.isIVR = "success";
  // BotUserSession.put("isIVR", "success", 1440);

  //BotUserSession.put("customerID", "1045305", 1440);
  // BotUserSession.put("isIVR", undefined);
  // context.session.BotUserSession.loginStatus = undefined;
  //context.session.BotUserSession.source = "visifi";
  // context.session.BotUserSession.isDemo = true;
  // BotUserSession.put("isIVR", undefined);
  context.session.BotUserSession.source = "kore";
}
if (context.session.UserContext.firstName === "Aditya") {
  if (context.intentName === "View_Statements") {
    if (context.session.BotUserSession.source === "mashreq") {
      context.reqbody = JSON.stringify({
        customerId: context.session.BotUserSession.customerID,
        meta: {
          accountType: ["Checking Account", "Savings Account", "Credit Card", "Auto Loan", "Personal Loan", "Mortgage", "Home Equity Loan", "Home Equity Line", "Line of Credit"],
        },
      });
    }
  }
}

// This is to capture the user input as it is.

var userutterance = "";

function isEmpty(val) {
  return val === undefined || val === null || (val && val.length <= 0) ? true : false;
}
if (context.userInputs && context.userInputs.originalInput && context.userInputs.originalInput.sentence && !isEmpty(context.userInputs.originalInput.sentence)) {
  userutterance = context.userInputs.originalInput.sentence;
} else if (context.userInputs && context.userInputs.otherInputs && context.userInputs.otherInputs.length > 0 && !isEmpty(context.userInputs.otherInputs[context.userInputs.otherInputs.length - 1].sentence)) {
  userutterance = context.userInputs.otherInputs[context.userInputs.otherInputs.length - 1].sentence;
}
context.userutterance = userutterance;
if (context.session.UserContext.firstName.toLowerCase() === "yashwanth") {
  //   BotUserSession.put("loginStatus", undefined, 1440);
  //   BotUserSession.put("isIVR", "success", 1440);
  BotUserSession.put("devLogin", true, 1440);
  BotUserSession.put("isIVR", undefined);
  // context.phoneNumber="4156307610";
  BotUserSession.put("mobileNumber", "+14156307610", 1440);
  // context.session.BotUserSession.channels[0].handle.Caller = "+14156307610"
  // context.isIVRAuth = true;
  context.session.BotUserSession.isDemo = false;
  // isDemo=true;
  //   context.faqResponse=true;
  //  context.session.BotUserSession.source = "visifi";
  context.session.BotUserSession.source = "kore";
  //  context.session.BotUserSession.source = "mashreq";
  //  context.session.BotUserSession.channels[0].type = "ivr";
}
