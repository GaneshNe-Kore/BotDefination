const fs = require('fs-extra');
const botDefination = require('./botDefinition.json');
const path = require('path');
const { json } = require('body-parser');

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
        if (!fs.existsSync(currentPath)) {
            try {
                fs.mkdirSync(currentPath);
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
        fs.writeFileSync("botVariales.json", JSON.stringify(botDefination.contentVariables));
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
        fs.writeFileSync("dialogs.json", JSON.stringify(dialogNames));
    }
    console.log("Retriving all the dialogs is sucessful...");
    return JSON.stringify(dialogNames);
}
function getComponents(botDefination, createFile = false) {
    if (Object.keys(botDefination).length === 0) {
        return "Empty bot defination file";
    }
    if (createFile) {
        fs.writeFileSync("dialogComponents.json", JSON.stringify(botDefination.dialogComponents));
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
        fs.writeFileSync(dialogName + ".json", JSON.stringify(dialogInfo));
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
                            fs.writeFileSync(path + "/" + val.name + "" + value.type + ".json", JSON.stringify(value))
                            var path = createFolders(mainFolder, dialogName, value.type, val.name);
                            var script = "";
                            var fileName = "default.js";
                            if (value.type === "entity" || value.type === "dialogAct" || value.type === "message") {
                                fileName = val.name;
                                val.message.forEach((value, index) => {
                                    script = decodeURLcode(value.localeData.en.text);
                                    fileName = value.channel === "default" ? fileName += "AllChannel" : (value.channel === "rtm" ? fileName += "WebSDK" : fileName += "Others");
                                    fs.writeFileSync(path + "/" + fileName + "Message.js", script)
                                    fs.writeFileSync(allPath + "/" + fileName + "Message.js", script)

                                })
                            } else if (value.type === "script") {
                                script = decodeURLcode(val.script);
                                fileName = val.name + "" + capitalizeFirstLetter(val.type);
                                fs.writeFileSync(allPath + "/" + fileName + ".js", script)
                                fs.writeFileSync(path + "/" + val.name + ".js", script)
                            } else if (value.type === "service") {
                                var service = val;
                                service.payload = service.payload.type === "raw" ? decodeURLcode(service.payload.value) : service.payload.value;
                                service.headers.value = service.payload.type === "raw" ? JSON.parse(service.headers.value) : service.headers.value;
                                fs.writeFileSync(path + "/" + val.name + "" + capitalizeFirstLetter(val.type) + ".json", JSON.stringify(service))
                            } else {
                                fs.writeFileSync(path + "/" + val.name + "" + value.type + ".json", JSON.stringify(val))
                            }
                        }
                    }
                    else {
                        fs.writeFileSync(path + "/" + val.name + "" + value.type + ".json", JSON.stringify(value))
                        var path = createFolders(mainFolder, dialogName, value.type, val.name);
                        var script = "";
                        var fileName = "default.js";

                        if (value.type === "entity" || value.type === "dialogAct" || value.type === "message") {
                            fileName = val.name;
                            val.message.forEach((value, index) => {
                                script = decodeURLcode(value.localeData.en.text);
                                fileName = value.channel === "default" ? fileName += "AllChannel" : (value.channel === "rtm" ? fileName += "WebSDK" : fileName += "Others");
                                fs.writeFileSync(path + "/" + fileName + "Message.js", script)
                                fs.writeFileSync(allPath + "/" + fileName + "Message.js", script)

                            })
                        }
                        else if (value.type === "script") {
                            script = decodeURLcode(val.script);
                            fileName = val.name + "" + capitalizeFirstLetter(val.type);
                            fs.writeFileSync(allPath + "/" + fileName + ".js", script)
                            fs.writeFileSync(path + "/" + val.name + ".js", script)
                        } else if (value.type === "service") {
                            var service = val;
                            service.payload = service.payload.type === "raw" ? decodeURLcode(service.payload.value) : service.payload.value;
                            service.payload = service.payload.type === "raw" ? JSON.parse(service.headers.value) : service.headers.value;
                            fs.writeFileSync(path + "/" + val.name + "" + capitalizeFirstLetter(val.type) + ".json", JSON.stringify(service))
                        } else {
                            fs.writeFileSync(path + "/" + val.name + "" + value.type + ".json", JSON.stringify(val))
                        }
                        dialogInfo.nodes[value.type].push(val.name)
                    }
                    dialogInfo.allNodes.push(val.name)
                }
            });
        })
    }
    fs.writeFileSync(dialogName + ".json", JSON.stringify(dialogInfo));
    if (!allDetails) {
        return dialogInfo;
    }


}

function writeToFile(path, name, data) {
    fs.writeFileSync(path + "/" + name, data)
}
//  new script file
function getDialogScripts(botDefination, dialogName, mainFolder) {
    try {
        if (!botDefination || !Object.keys(botDefination).length) {
            console.log("Empty bot definition file");
            return {};
        }
        if (botDefination.localeData?.en?.name && !mainFolder) {
            mainFolder = botDefination.localeData.en.name;
            addToGitignoreSync(mainFolder);
        }
        const dialogComponent = botDefination.dialogComponents.find((component) => component.type === "intent" && component.name === dialogName);
        if (!dialogComponent) {
            console.log("Dialog not exists");
            return "Dialog not exists";
        }
        let dialogId = dialogComponent.dialogId;
        let dialog = botDefination.dialogs.find((value) => value._id === dialogId);
        let dialogInfo = { nodes: {}, allNodes: [] };
        if (dialog) {
            var mainPath = createFolders(mainFolder, dialogName);
            const allPath = createFolders(mainFolder, dialogName, "AllNodes");
            var transitionPath = createFolders(mainFolder, dialogName, "Transitions");
            var dialogInfomation = {
                dialogId: dialogComponent._id,
                componentId: dialogComponent.componentId,
                intentName: dialogComponent.name,
                displayName: dialogComponent.localeData.en.intent,
                intentDescription: dialogComponent.localeData.en.desc,
                nodes: {
                    intent: {
                        count: 0,
                        names: [],
                    },
                    entity: {
                        count: 0,
                        names: [],
                    },
                    message: {
                        count: 0,
                        names: [],
                    },
                    script: {
                        count: 0,
                        names: [],
                    },
                    service: {
                        count: 0,
                        names: [],
                    },
                    logic: {
                        count: 0,
                        names: [],
                    },
                    all: {
                        count: 0,
                        names: []
                    }

                },
                transitions: [],
                namespaces: {
                    dialogLevelNameSpaces: [],
                    nodeLevelNameSpaces: []
                }
            }
            // dialogName = dialogInfomation.displayName;
            var variableAnalysis = {   
                intentName: dialogComponent.name,
                idfc:0,
                koreDebugger:0,
                accountName:0,
                content:{
                    count:0,
                    variables:[]
                },
                env:{
                    count:0,
                    variables:[]
                },
                context:{
                    count:0,
                    variables:[]
                },
                nodes:[]            
            }
            const dialogTransition = [];
            dialogInfomation.namespaces.dialogLevelNameSpaces = retriveNameSpacesWithRefIds(dialog.vNameSpace, botDefination);
            for (const node of dialog.nodes) {
                const component = botDefination.dialogComponents.find((component) => component._id === node.componentId);
                const typePath = createFolders(mainFolder, dialogName, node.type);
                const name = component.name;
                var transition = {
                    nodeName: component.name,
                    transition: node.transitions
                }
                var nodeInformation = {
                    nodeName: component.name,
                    nodeType: component.type,
                    nodeInformation: []
                }
                dialogInfomation.transitions.push(transition)
                dialogTransition.push(transition)
                if (!component.useTaskLevelNs) {
                    let nodeNameSpaces = {
                        nodeName: name,
                        namespaces: retriveNameSpacesWithRefIds(component.vNameSpace, botDefination)
                    }
                    dialogInfomation.namespaces.nodeLevelNameSpaces.push(nodeNameSpaces);
                }
                if (dialogInfomation.nodes[component.type]) {
                    dialogInfomation.nodes[component.type].count++;
                    dialogInfomation.nodes[component.type].names.push(component.name);
                    dialogInfomation.nodes.all.count++;
                    dialogInfomation.nodes.all.names.push(component.name)
                } else {
                    dialogInfomation.nodes[component.type] = {
                        count: 0,
                        names: []
                    }
                }
                if (!dialogInfo.nodes[node.type]) {
                    dialogInfo.nodes[node.type] = [component.name];
                    dialogInfo.allNodes = [component.name];
                } else {
                    dialogInfo.nodes[node.type].push(component.name);
                    dialogInfo.allNodes.push(component.name);
                }
                if (node.type && name) {
                    writeToFile(typePath, `${name}${node.type}.json`, JSON.stringify(node));
                    const nodePath = createFolders(mainFolder, dialogName, node.type, component.name);
                    if (node.type === "entity" || node.type === "dialogAct" || node.type === "message") {
                        component.message.forEach((value, index) => {
                            var fileName = name;
                            script = decodeURLcode(value.localeData.en.text);
                            fileName = value.channel === "default" ? fileName += "AllChannel" : (value.channel === "rtm" ? fileName += "WebSDK" : fileName += "Others");
                            var inform =  nodeAnalytics(nodePath, fileName, script,node.type,dialogInfomation.displayName);
                            variableAnalysis.nodes.push(inform);
                            writeToFile(nodePath, `${fileName}.js`, script);
                            writeToFile(allPath, `${fileName}.js`, script);
                        });
                    } else if (node.type === "script") {
                        var fileName = `${name}${capitalizeFirstLetter(node.type)}.js`;
                        const script = decodeURLcode(component.script);
                       var inform = nodeAnalytics(nodePath, fileName, script,node.type,dialogInfomation.displayName);
                       variableAnalysis.nodes.push(inform); 
                       writeToFile(nodePath, `${name}.js`, script);
                        writeToFile(allPath, fileName, script);
                    } else if (node.type === "service") {
                        const service = component;
                        try {
                            service.payload = service?.payload?.type === "raw" && service?.payload?.value ? decodeURLcode(service.payload.value) : service?.payload?.value;
                            service.headers.value = service?.headers?.type === "raw" && service?.headers?.value !== undefined && typeof service?.headers?.value === "string" ? JSON.parse(service.headers.value) : service.headers.value;
                        } catch (error) {
                            console.log(error);
                        }
                        writeToFile(nodePath, `${name}${capitalizeFirstLetter(node.type)}.json`, JSON.stringify(service));
                    } else {
                        writeToFile(nodePath, `${name}${node.type}.json`, JSON.stringify(component));
                    }
                }
            }
            //  this block is related to variables code for dialog level
            variableAnalysis.idfc = variableAnalysis.nodes.reduce((acc, val) => acc + val.idfc.count, 0);
            variableAnalysis.accountName = variableAnalysis.nodes.reduce((acc, val) => acc + val.accountName.count, 0);
            variableAnalysis.koreDebugger = variableAnalysis.nodes.reduce((acc, val) => acc + val.koreDebugger.count, 0);
            variableAnalysis.context.count = variableAnalysis.nodes.reduce((acc, val) => acc + val.context.count, 0);
            variableAnalysis.env.count = variableAnalysis.nodes.reduce((acc, val) => acc + val.env.count, 0);
            variableAnalysis.content.count = variableAnalysis.nodes.reduce((acc, val) => acc + val.content.count, 0);
            variableAnalysis.content.variables = [...new Set(variableAnalysis.nodes.reduce((acc, node) => acc.concat(node.content.names), []))];
            variableAnalysis.env.variables = [...new Set(variableAnalysis.nodes.reduce((acc, node) => acc.concat(node.env.names), []))];
            variableAnalysis.context.variables = [...new Set(variableAnalysis.nodes.reduce((acc, node) => acc.concat(node.context.names), []))];
            
            //
            writeToFile(mainPath, "dialogInformation.json", JSON.stringify(dialogInfomation));
            writeToFile(mainPath, "variableAnalysis.json", JSON.stringify(variableAnalysis));
            writeToFile(transitionPath, dialogName + "Transitions.json", JSON.stringify(dialogTransition));
            writeToFile(mainPath, dialogName + "NodesInfo.json", JSON.stringify(dialogInfo));
            console.log(` Extraction of ${dialogName} scripts for all nodes is done.......`);
        } else {
            console.log(`${dialogName} is not exists.......`);
        }

    } catch (error) {
        console.log("Failed");
        console.log(error);
    }

}

function addToGitignoreSync(name) {
    const gitignorePath = '.gitignore';

    // Check if the .gitignore file exists, create it if it doesn't
    if (!fs.existsSync(gitignorePath)) {
        fs.writeFileSync(gitignorePath, '');
    }

    // Read the current contents of the .gitignore file
    const gitignoreContent = fs.readFileSync(gitignorePath, { encoding: 'utf8' });

    // Add the name to the .gitignore file if it's not already there
    if (!gitignoreContent.includes(name)) {
        fs.appendFileSync(gitignorePath, `\n${name}/`);
    }
}

function getBotInformation(botDefination, dialogName, mainFolder = "Dialogs") {
    try {
        if (!botDefination || !Object.keys(botDefination).length) {
            console.log("Empty bot definition file");
            return {};
        }
        if (botDefination.localeData?.en?.name) {
            mainFolder = botDefination.localeData.en.name;
            addToGitignoreSync(mainFolder);
        }
        const dialogComponent = botDefination.dialogComponents.find((component) => component.type === "intent" && component.name === dialogName);
        if (!dialogComponent) {
            console.log("Dialog not exists");
            return "Dialog not exists";
        }
        let dialogId = dialogComponent.dialogId;
        let dialog = botDefination.dialogs.find((value) => value._id === dialogId);
        let dialogInfo = { nodes: {}, allNodes: [] };
        if (dialog) {
            var mainPath = createFolders(mainFolder, dialogName);
            const allPath = createFolders(mainFolder, dialogName, "AllNodes");
            var transitionPath = createFolders(mainFolder, dialogName, "Transitions");
            var dialogInfomation = {
                dialogId: dialogComponent._id,
                componentId: dialogComponent.componentId,
                intentName: dialogComponent.name,
                displayName: dialogComponent.localeData.en.intent,
                intentDescription: dialogComponent.localeData.en.desc,
                nodes: {
                    intent: {
                        count: 0,
                        names: [],
                    },
                    entity: {
                        count: 0,
                        names: [],
                    },
                    message: {
                        count: 0,
                        names: [],
                    },
                    script: {
                        count: 0,
                        names: [],
                    },
                    service: {
                        count: 0,
                        names: [],
                    },
                    logic: {
                        count: 0,
                        names: [],
                    },
                    all: {
                        count: 0,
                        names: []
                    }

                },
                transitions: [],
                namespaces: {
                    dialogLevelNameSpaces: [],
                    nodeLevelNameSpaces: []
                }
            }
            const dialogTransition = [];
            dialogInfomation.namespaces.dialogLevelNameSpaces = retriveNameSpacesWithRefIds(dialog.vNameSpace, botDefination);
            for (const node of dialog.nodes) {
                const component = botDefination.dialogComponents.find((component) => component._id === node.componentId);
                const typePath = createFolders(mainFolder, dialogName, node.type);
                const name = component.name;
                var transition = {
                    nodeName: component.name,
                    transition: node.transitions
                }
                dialogInfomation.transitions.push(transition)
                dialogTransition.push(transition)
                if (!component.useTaskLevelNs) {
                    let nodeNameSpaces = {
                        nodeName: name,
                        namespaces: retriveNameSpacesWithRefIds(component.vNameSpace, botDefination)
                    }
                    dialogInfomation.namespaces.nodeLevelNameSpaces.push(nodeNameSpaces);
                }
                if (dialogInfomation.nodes[component.type]) {
                    dialogInfomation.nodes[component.type].count++;
                    dialogInfomation.nodes[component.type].names.push(component.name);
                    dialogInfomation.nodes.all.count++;
                    dialogInfomation.nodes.all.names.push(component.name)
                } else {
                    dialogInfomation.nodes[component.type] = {
                        count: 0,
                        names: []
                    }
                }
                if (!dialogInfo.nodes[node.type]) {
                    dialogInfo.nodes[node.type] = [component.name];
                    dialogInfo.allNodes = [component.name];
                } else {
                    dialogInfo.nodes[node.type].push(component.name);
                    dialogInfo.allNodes.push(component.name);
                }
                if (node.type && name) {
                    writeToFile(typePath, `${name}${node.type}.json`, JSON.stringify(node));
                    const nodePath = createFolders(mainFolder, dialogName, node.type, component.name);
                    if (node.type === "entity" || node.type === "dialogAct" || node.type === "message") {
                        component.message.forEach((value, index) => {
                            var fileName = name;
                            script = decodeURLcode(value.localeData.en.text);
                            fileName = value.channel === "default" ? fileName += "AllChannel" : (value.channel === "rtm" ? fileName += "WebSDK" : fileName += "Others");
                            writeToFile(nodePath, `${fileName}.js`, script);
                            writeToFile(allPath, `${fileName}.js`, script);
                        });
                    } else if (node.type === "script") {
                        var fileName = `${name}${capitalizeFirstLetter(node.type)}.js`;
                        const script = decodeURLcode(component.script);
                        writeToFile(nodePath, `${name}.js`, script);
                        writeToFile(allPath, fileName, script);
                    } else if (node.type === "service") {
                        const service = component;
                        service.payload = service?.payload?.type === "raw" && service?.payload?.value ? decodeURLcode(service.payload.value) : service?.payload?.value;
                        service.headers.value = service?.headers?.type === "raw" && service?.headers?.value !== undefined && typeof service?.headers?.value === "string" ? JSON.parse(service.headers.value) : service.headers.value;
                        writeToFile(nodePath, `${name}${capitalizeFirstLetter(node.type)}.json`, JSON.stringify(service));
                    } else {
                        writeToFile(nodePath, `${name}${node.type}.json`, JSON.stringify(component));
                    }
                }
            }
            writeToFile(mainPath, "dialogInformation.json", JSON.stringify(dialogInfomation));
            writeToFile(transitionPath, dialogName + "Transitions.json", JSON.stringify(dialogTransition));
            writeToFile(mainFolder, dialogName + ".json", JSON.stringify(dialogInfo));
            console.log(` Extraction of ${dialogName} scripts for all nodes is done.......`);
        } else {
            console.log(`${dialogName} is not exists.......`);
        }

    } catch (error) {
        console.log("Failed");
        console.log(error);
    }

}

function retriveNameSpacesWithRefIds(ids, botDefination) {
    if (ids.length === 0 || botDefination.namespaces.length === 0) {
        console.log("NameSpaces are Empty");
        return [];
    }
    var vNameSpace = [];
    for (var id of ids) {
        try {
           var name =botDefination.namespaces.find((value) => value.refId === id).name;
            if(name){
                vNameSpace.push(name); 
            }else{
                vNameSpace.push(null)
            }
        } catch (error) {
            return
        }
    }
    return vNameSpace;
}

function getAllDialogScripts(botDefination) {
    if (!botDefination || !Object.keys(botDefination).length) {
        console.log("Empty bot definition file");
        return {};
    }
    try {
        let dialogs = JSON.parse(getDialogs(botDefination));
        dialogs.forEach((dialog, index) => {
            console.log(`[${index + 1}/${dialogs.length}] : ${dialog.diaplayName} extraction is starting.............`);
            getDialogScripts(botDefination, dialog.IntentName);
        });
    } catch (error) {

    }
}

function nodeAnalytics(path, name, code,nodeType,dialogName) {
    // var code = fs.readFileSync("./txnDisplaySpendingsAllChannel.js").toString();
    var botVariables = {
        nodeName:name,
        nodeType:nodeType,
        dialogName:dialogName,
        content: {
            names: [],
            dynamicNames: []
        },
        env: {
            names: [],
            dynamicNames: []
        },
        context: {
            names: []
        },
        idfc: {
            count: 0,
            lineNumbers: []
        },
        koreDebugger: {
            count: 0,
            lineNumbers: []
        },
        accountName: {
            count: 0,
            lineNumbers: []
        }
    };
    // Regular expressions to match the patterns
    const contentRegex = /content\.(\w+)/g;
    const envRegex = /env\.(\w+)/g;
    const contextRegex = /context\.(\w+)/g;
    const idfcRegex = /idfc/ig;
    const koreDebuggerRegex = /koreDebugger/g;
    const accountNameRegex = /accountName/g;

    // Extracting words from the string and adding them to the respective arrays
    let match;
    while (match = contentRegex.exec(code)) {
        botVariables.content.names.push(match[1]);
    }

    while (match = envRegex.exec(code)) {
        botVariables.env.names.push(match[1]);
    }

    while (match = contextRegex.exec(code)) {
        botVariables.context.names.push(match[1]);
    }

    // Adding counts and line numbers for additional patterns
    let lineNumber = 0;
    code.split('\n').forEach((line) => {
        lineNumber++;
        if (line.toLowerCase().includes('idfc')) {
            botVariables.idfc.count++;
            botVariables.idfc.lineNumbers.push(lineNumber);
        }
        let koreDebuggerMatch = line.match(koreDebuggerRegex);
        if (koreDebuggerMatch) {
            botVariables.koreDebugger.count += koreDebuggerMatch.length;
            botVariables.koreDebugger.lineNumbers.push(lineNumber);
        }
        let accountNameMatch = line.match(accountNameRegex);
        if (accountNameMatch) {
            botVariables.accountName.count += accountNameMatch.length;
            botVariables.accountName.lineNumbers.push(lineNumber);

        }
    });
    // Removing duplicates from each array
    botVariables.content.names = [...new Set(botVariables.content.names)];
    botVariables.env.names = [...new Set(botVariables.env.names)];
    botVariables.context.names = [...new Set(botVariables.context.names)];
    botVariables.content.count = botVariables.content.names.length;
    botVariables.context.count = botVariables.context.names.length;
    botVariables.env.count = botVariables.env.names.length;
    if (path) {
        fs.writeFileSync(`${path}/${name}NodeAnalytics.json`, JSON.stringify(botVariables));
    }
    return botVariables;
}


getAllDialogScripts(botDefination);
// getDialogScripts(botDefination, "GetTransaction");


