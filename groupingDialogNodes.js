const fse = require('fs-extra');
const _ = require('lodash');
const botDefination = require('./botDefinition.json');
const utils = require('./utils');
const path = require('path');
const querystring = require('querystring');

let keysOfBotDef = [
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

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
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
    return decodeURIComponent(encodedString)
}

function keysOfBotDefination(botDefination, all = true) {
    let keys = [];
    if (!all) {
        keysOfBotDefination.forEach((value) => {
            if (_.isArray(botDefination[value]) || _.isObject(botDefination[value])) {
                keys.push(value)
                // keys.push(botDefination[value])
            }
        });
    }
    else {
        keys = Object.keys(botDefination);
    }
    return keys;
}
function isFileEncrypted(botDefination) {
    return botDefination.encryptedHash ? true : false;
}

function getContentVarialbles(botDefination = {}, createFile = false) {
    if (Object.keys(botDefination).length === 0) {
        return "Empty bot defination file";
    }
    if (createFile) {
        fse.writeFileSync("botVariales.json", JSON.stringify(botDefination.contentVariables));
    }
    return botDefination.contentVariables;
}

function getDialogs(botDefination, createFile = false) {
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
    if (createFile) {
        fse.writeFileSync("dialogs.json", JSON.stringify(dialogNames));
    }
    console.log("Retriving all the dialogs is sucessful...");
    return JSON.stringify(dialogNames);
}

function getComponents(botDefination, createFile = false) {
    if (Object.keys(botDefination).length === 0) {
        return "Empty bot defination file";
    }
    if (createFile) {
        fse.writeFileSync("dialogComponents.json", JSON.stringify(botDefination.dialogComponents));
    }
    return SON.stringify(botDefination.dialogComponents);
}

function getDialogNodes(botDefination, dialogName, createFile = true) {
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
                    }
                    else {
                        dialogInfo.nodes[value.type].push(val.name)
                    }
                    dialogInfo.allNodes.push(val.name)
                }
            });
        })
    }
    if (createFile) {
        fse.writeFileSync(dialogName + ".json", JSON.stringify(dialogInfo));
    }
    return dialogInfo;

}
// old script
function getDialogNodesDetails(botDefination, dialogName, allDetails = true, mainFolder = "Dialogs") {
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
                    var mainPath = createFolders(mainFolder, dialogName);
                    var allPath = createFolders(mainFolder, dialogName, "AllNodes");
                }
                if (value.componentId === val._id) {
                    var path = createFolders(mainFolder, dialogName, value.type);
                    if (!dialogInfo.nodes[value.type]) {
                        dialogInfo.nodes[value.type] = [val.name]
                        if (allDetails && value.type && val.name) {
                            fse.writeFileSync(path + "/" + val.name + "" + value.type + ".json", JSON.stringify(value))
                            var path = createFolders(mainFolder, dialogName, value.type, val.name);
                            var script = "";
                            var fileName = "default.js";
                            if (value.type === "entity" || value.type === "dialogAct" || value.type === "message") {
                                fileName = val.name;
                                val.message.forEach((value, index) => {
                                    script = decodeURLcode(value.localeData.en.text);
                                    fileName = value.channel === "default" ? fileName += "AllChannel" : (value.channel === "rtm" ? fileName += "WebSDK" : fileName += "Others");
                                    fse.writeFileSync(path + "/" + fileName + "Message.js", script)
                                    fse.writeFileSync(allPath + "/" + fileName + "Message.js", script)

                                })
                            } else if (value.type === "script") {
                                script = decodeURLcode(val.script);
                                fileName = val.name + "" + capitalizeFirstLetter(val.type);
                                fse.writeFileSync(allPath + "/" + fileName + ".js", script)
                                fse.writeFileSync(path + "/" + val.name + ".js", script)
                            } else if (value.type === "service") {
                                var service = val;
                                service.payload = service.payload.type === "raw" ? decodeURLcode(service.payload.value) : service.payload.value;
                                service.headers.value = service.payload.type === "raw" ? JSON.parse(service.headers.value) : service.headers.value;
                                fse.writeFileSync(path + "/" + val.name + "" + capitalizeFirstLetter(val.type) + ".json", JSON.stringify(service))
                            } else {
                                fse.writeFileSync(path + "/" + val.name + "" + value.type + ".json", JSON.stringify(val))
                            }
                        }
                    }
                    else {
                        fse.writeFileSync(path + "/" + val.name + "" + value.type + ".json", JSON.stringify(value))
                        var path = createFolders(mainFolder, dialogName, value.type, val.name);
                        var script = "";
                        var fileName = "default.js";

                        if (value.type === "entity" || value.type === "dialogAct" || value.type === "message") {
                            fileName = val.name;
                            val.message.forEach((value, index) => {
                                script = decodeURLcode(value.localeData.en.text);
                                fileName = value.channel === "default" ? fileName += "AllChannel" : (value.channel === "rtm" ? fileName += "WebSDK" : fileName += "Others");
                                fse.writeFileSync(path + "/" + fileName + "Message.js", script)
                                fse.writeFileSync(allPath + "/" + fileName + "Message.js", script)

                            })
                        }
                        else if (value.type === "script") {
                            script = decodeURLcode(val.script);
                            fileName = val.name + "" + capitalizeFirstLetter(val.type);
                            fse.writeFileSync(allPath + "/" + fileName + ".js", script)
                            fse.writeFileSync(path + "/" + val.name + ".js", script)
                        } else if (value.type === "service") {
                            var service = val;
                            service.payload = service.payload.type === "raw" ? decodeURLcode(service.payload.value) : service.payload.value;
                            service.payload = service.payload.type === "raw" ? JSON.parse(service.headers.value) : service.headers.value;
                            fse.writeFileSync(path + "/" + val.name + "" + capitalizeFirstLetter(val.type) + ".json", JSON.stringify(service))
                        } else {
                            fse.writeFileSync(path + "/" + val.name + "" + value.type + ".json", JSON.stringify(val))
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

function writeToFile(path,name, data) {
    fse.writeFileSync(path+"/"+name, data)
}

//  new script
function getDialogScripts(botDefination, dialogName, mainFolder = "Dialogs") {
    try {
        if (!botDefination || !Object.keys(botDefination).length) {
            console.log("Empty bot definition file");
            return {};
        }
        let dialogId = "";
        const dialogComponent = botDefination.dialogComponents.find((component) => component.type === "intent" && component.name === dialogName);
        if (!dialogComponent) {
            console.log("Dialog not exists");
            return "Dialog not exists";
        }
        dialogId = dialogComponent.dialogId;
        let dialog = botDefination.dialogs.find((value) => value._id === dialogId);
        let dialogInfo = { nodes: {}, allNodes: [] };
        if (dialog) {
            for (const node of dialog.nodes) {
                const component = botDefination.dialogComponents.find((component) => component._id === node.componentId);
                const mainPath = createFolders(mainFolder, dialogName);
                const allPath = createFolders(mainFolder, dialogName, "AllNodes");
                const typePath = createFolders(mainFolder, dialogName, node.type);
                const name = component.name;
                if (!dialogInfo.nodes[node.type]) {
                    dialogInfo.nodes[node.type] = [component.name];
                } else {
                    dialogInfo.nodes[node.type].push(component.name);
                }
                if (node.type && name) {
                    writeToFile(typePath, `${name}${node.type}.json`, JSON.stringify(node));
                    if (node.type === "entity" || node.type === "dialogAct" || node.type === "message") {
                        var fileName = name;
                        component.message.forEach((value, index) => {
                            script = decodeURLcode(value.localeData.en.text);
                            fileName = value.channel === "default" ? fileName += "AllChannel" : (value.channel === "rtm" ? fileName += "WebSDK" : fileName += "Others");
                            writeToFile(typePath, `${fileName}.js`, script);
                            writeToFile(allPath, `${fileName}.js`, script);
                        });
                    } else if (node.type === "script") {
                        var fileName = `${name}${capitalizeFirstLetter(node.type)}.js`;
                        const script = decodeURLcode(component.script);
                        writeToFile(typePath, `${name}.js`, script);
                        writeToFile(allPath, fileName, script);
                    } else if (node.type === "service") {
                        const service = component;
                        service.payload = service?.payload?.type === "raw" && service?.payload?.value ? decodeURLcode(service.payload.value) : service?.payload?.value;
                        service.headers.value = service?.headers?.type === "raw" && service?.headers?.value !== undefined && typeof service?.headers?.value === "string" ? JSON.parse(service.headers.value) : service.headers.value;
                        writeToFile(typePath, `${name}${capitalizeFirstLetter(node.type)}.json`, JSON.stringify(service));
                    } else {
                        writeToFile(typePath, `${name}${node.type}.json`, JSON.stringify(component));
                    }
                }
            }
        }
        writeToFile(mainFolder,dialogName + ".json", JSON.stringify(dialogInfo));
        console.log(` Extraction of ${dialogName} scripts for all nodes is done.......`);
    } catch (error) {
        console.log("Failed");
        console.log(error);
    }

}

function getAllDialogScripts(botDefination){
    if (!botDefination || !Object.keys(botDefination).length) {
        console.log("Empty bot definition file");
        return {};
    }
 try {
    let dialogs = JSON.parse(getDialogs(botDefination));
    dialogs.forEach((dialog,index)=>{
        console.log(`[${index+1}/${dialogs.length}] : ${dialog.diaplayName} extraction is starting.............`);
        getDialogScripts(botDefination,dialog.IntentName);
    });
 } catch (error) {
    
 }
}

// getDialogScripts(botDefination,"updateDetails");

getAllDialogScripts(botDefination);

// getDialogNodes(botDefination,"GetTransaction")

