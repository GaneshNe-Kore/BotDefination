const fse = require('fs-extra');
const _ = require('lodash');
const botDefination = require('./botDefinition.json');
const utils = require('./utils');
const path = require('path');
const querystring = require('querystring');

let keysOfBotDefination = [
    '_id',
    'refId',
    'notifyUserViaEmail',
    'purpose',
    'hasTenant',
    'hasUserEndpoint',
    'offKoraConfirmation',
    'skipMakeEditLinks',
    'type',
    'variables',
    'showInMp',
    'defaultLanguage',
    'supportedLanguages',
    'languagePreferences',
    'ivrSettings',
    'twilioVoiceSettings',
    'enable_pii',
    'strict_pii',
    'pii_patterns',
    'languageConfigurations',
    'channels',
    'audioCodesSettings',
    'korevgSettings',
    'enableNameSpace',
    'vNameSpace',
    'krVNameSpace',
    'evVNameSpace',
    'color',
    'sBannerColor',
    'enableInputTranslation',
    'multiLingualConfigurations',
    'isSmartAssist',
    'bBannerColor',
    'categoryIds',
    'class',
    'featured',
    'sendVcf',
    'isNLEnabled',
    'interruptsEnabled',
    'externalNluAdapters',
    'sessionInactiveTime',
    'sessionClosureProcess',
    'skipSessionMessage',
    'clearAllAuthTokens',
    'runCustomScript',
    'isDeflect',
    'languagesToBeIgnored',
    'localeData',
    'interruptOptions',
    'detectMultiIntent',
    'assignAllChildBots',
    'recentBotLimit',
    'isCsMatchEnabled',
    'defaultDialogId',
    'enableAutoUtteranceAddition',
    'amendConfig',
    'botSentimentEvents',
    'enableNegativePatterns',
    'advancedNLSettings',
    'translationEngines',
    'preBuiltIntegrations',
    'botEvents',
    'idpConfigurations',
    'actions',
    'alerts',
    'patterns',
    'dialogComponents',
    'dialogs',
    'scenes',
    'sceneComponents',
    'widgetThemes',
    'knowledgeTasks',
    'smallTalk',
    'widgets',
    'panels',
    'forms',
    'unexportedTasks',
    'customDashboards',
    'paramMaps',
    'taskDgParamMaps',
    'sentences',
    'koraResponses',
    'customTemplates',
    'mlParams',
    'contentVariables',
    'namespaces',
    'exportOptions',
    'feedbackSurveys',
    'environmentVersionInfo',
    'traits',
    'encryptedHash'
];

//  keysOfBotDefination.forEach((value,index,arr)=>{
//     if(_.isArray(botDefination[value]) || _.isObject(botDefination[value])){
//     newArray1.push(value)
//     newArray2.push(botDefination[value])
//     }
//  })

function isFileEncrypted(botDefination) {
    return botDefination.encryptedHash ? true : false;
}

function getContentVarialbles(botDefination = {}) {
    if (Object.keys(botDefination).length === 0) {
        return "Empty bot defination file";
    }
    return botDefination.contentVariables;
}

function getDialogs(botDefination) {
    if (Object.keys(botDefination).length === 0) {
        return "Empty bot defination file";
    }
    let dialogs = botDefination.exportOptions.subTasks.dialogs;
    let dialogNames = [];
    botDefination.dialogComponents.forEach((value, index) => {
        for (let index = 0; index < dialogs.length; index++) {
            if (value.dialogId === dialogs[index])
                dialogNames.push({
                    "id": value.dialogId,
                    "IntentName": value.name,
                    "diaplayName": value.localeData.en.intent
                });
        }
    });
    fse.writeFileSync("dialogs.json", JSON.stringify(dialogNames));
    // let 
    return JSON.stringify(dialogNames);
}

function getComponents(botDefination) {
    if (Object.keys(botDefination).length === 0) {
        return "Empty bot defination file";
    }
    let components = {};

    botDefination.dialogComponents.forEach((value, index, arr) => {
        if (value.type === "intent") {

        }
        else if (value.type === "intent") {

        }
        else if (value.type === "dialogAct") {

        }
        else if (value.type === "script") {
        }
        else if (value.type === "message") {
        }
        else if (value.type === "entity") {
        }
        else if (value.type === "service") {
        }
    })
}

function getDialogNodes(botDefination, dialogName) {
    if (Object.keys(botDefination).length === 0) {
        console.log("Empty bot defination file");
        return {};
    }
    let dialogId = ""
    botDefination.dialogComponents.forEach((value, index) => {
        if (value.type === "intent" && value.name === dialogName) {
            dialogId = value.dialogId;
        }
    });
    if (!dialogId) {
        console.log("dialog not exists");
        return "dialog not exists"
    }
    let dialog = {}
    botDefination.dialogs.forEach((value, index) => {
        if (value._id === dialogId) {
            dialog = value;
        }
    });
    let dialogInfo = {
        nodes: {

        },
        allNodes: []
    };
    if (Object.keys(dialog).length > 0) {
        dialog.nodes.forEach((value, index) => {
            botDefination.dialogComponents.forEach((val, index) => {
                if (value.componentId === val._id) {
                    if (!dialogInfo.nodes[value.type]) {
                        dialogInfo.nodes[value.type] = [val.name]
                        if (dialogInfo.nodes[value.type] === "entity") {

                        }
                    }
                    else {
                        dialogInfo.nodes[value.type].push(val.name)
                    }
                    dialogInfo.allNodes.push(val.name)
                }
            });
        })
    }
    fse.writeFileSync(dialogName + ".json", JSON.stringify(dialogInfo));
    return dialogInfo;

}


function getDialogNodesDetails(botDefination, dialogName, allDetails = false) {
    if (Object.keys(botDefination).length === 0) {
        console.log("Empty bot defination file");
        return {};
    }
    if (Object.keys(botDefination).length === 0) {
        console.log("Empty bot defination file");
        return {};
    }
    let dialogId = ""
    botDefination.dialogComponents.forEach((value, index) => {
        if (value.type === "intent" && value.name === dialogName) {
            dialogId = value.dialogId;
        }
    });
    if (!dialogId) {
        console.log("dialog not exists");
        return "dialog not exists"
    }
    let dialog = {}
    botDefination.dialogs.forEach((value, index) => {
        if (value._id === dialogId) {
            dialog = value;
        }
    });

    let dialogInfo = {
        nodes: {

        },
        allNodes: []
    };
    if (Object.keys(dialog).length > 0) {
        dialog.nodes.forEach((value, index) => {
            botDefination.dialogComponents.forEach((val, index) => {
                if (allDetails) {
                    createFolders(dialogName);
                }
                if (value.componentId === val._id) {
                    var path = createFolders(dialogName, value.type);
                    if (!dialogInfo.nodes[value.type]) {
                        dialogInfo.nodes[value.type] = [val.name]
                        if (allDetails && value.type && val.name) {
                            console.log(path);
                            fse.writeFileSync(path + "/" + val.name + "" + value.type + ".json", JSON.stringify(value))
                            var path = createFolders(dialogName, value.type, val.name);
                            if (value.type === "dialogAct") {
                                // fse.writeFileSync(path + "/" + val.name + ""+ value.type + ".json", JSON.stringify(value))

                            } else if (value.type === "message") {
                            }
                            else if (value.type === "entity") {

                                val.message.forEach((value, index) => {
                                    var name = "";
                                    var message = value.localeData.en.text;
                                    if (value.channel === "default") {
                                        name = "AllChannel";
                                        // message = value.localeData.en.text;
                                    } else if (value.channel === "rtm") {
                                        name = "WebSDK";
                                        // message = value.localeData.en.text;
                                    }
                                    else {
                                        name = "Others";
                                    }
                                    // message = decodeURLcode(message);
                                    fse.writeFileSync(path + "/" + val.name + "" + name + "Message.js", message)

                                })
                            }
                            else if (value.type === "script") {
                                let script = decodeURLcode(val.script);
                                // fse.writeFileSync(path + "/" + val.name + "" + value.type + ".js", val.script)
                                fse.writeFileSync(path + "/" + val.name + "" + value.type + ".js", script)

                            }
                            else {
                                fse.writeFileSync(path + "/" + val.name + "" + value.type + ".js", JSON.stringify(value))
                            }
                        }
                    }
                    else {
                        fse.writeFileSync(path + "/" + val.name + "" + value.type + ".json", JSON.stringify(value))
                        var path = createFolders(dialogName, value.type, val.name);
                        if (value.type === "dialogAct") {
                            // fse.writeFileSync(path + "/" + val.name + ""+ value.type + ".json", JSON.stringify(value))

                        } else if (value.type === "message") {
                        }
                        else if (value.type === "entity") {

                            val.message.forEach((value, index) => {
                                var name = "";
                                var message = value.localeData.en.text;
                                if (value.channel === "default") {
                                    name = "AllChannel";
                                    // message = value.localeData.en.text;
                                } else if (value.channel === "rtm") {
                                    name = "WebSDK";
                                    // message = value.localeData.en.text;
                                }
                                else {
                                    name = "Others";
                                }
                                message = decodeURLcode(message);
                                // fse.writeFileSync(path + "/" + val.name + "" + name + "Message.js", message)
                                fse.writeFileSync(path + "/" + val.name + "" + name + "Message.js", message)


                            })
                        }
                        else if (value.type === "script") {
                            let script = decodeURLcode(val.script);
                            // fse.writeFileSync(path + "/" + val.name + "" + value.type + ".js",val.script)
                            fse.writeFileSync(path + "/" + val.name + "" + value.type + ".js",script)

                        }
                        else {
                            fse.writeFileSync(path + "/" + val.name + "" + value.type + ".js", JSON.stringify(value))
                        }
                        dialogInfo.nodes[value.type].push(val.name)
                    }
                    dialogInfo.allNodes.push(val.name)
                }
            });
        })
    }
    fse.writeFileSync(dialogName + ".json", JSON.stringify(dialogInfo));
    if (!allDetails) {
        return dialogInfo;
    }


}


function createFolders(...folders) {
    let currentPath = __dirname;

    for (let i = 0; i < folders.length; i++) {
        const folderName = folders[i];
        currentPath = path.join(currentPath, folderName);

        // Check if the directory already exists
        if (!fse.existsSync(currentPath)) {
            try {
                fse.mkdirSync(currentPath);
            } catch (err) {
                console.error(`Error creating directory: ${currentPath}`);
                console.error(err);
                return;
            }
        }
    }
    return currentPath;
}
function decodeURLcode(encodedString) {
    return  decodeURIComponent(encodedString)
}
// decodeURLcode("wd")
getDialogNodesDetails(botDefination, "updateDetails", true)

// getDialogNodes(botDefination,"GetTransaction")

