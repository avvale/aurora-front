/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
const { publishApplication } = require('./gulp/application');
const { publishAuditing } = require('./gulp/auditing');
const { publishAzureAd } = require('./gulp/azure-ad');
const { publishCommon } = require('./gulp/common');
const { publishIam } = require('./gulp/iam');
const { publishMessage } = require('./gulp/message');
const { publishOAuth } = require('./gulp/o-auth');
const { publishQueueManager } = require('./gulp/queue-manager');
const { publishSearchEngine } = require('./gulp/search-engine');
const { publishSettings } = require('./gulp/settings');
const { publishTools } = require('./gulp/tools');

function defaultTask(cb)
{
    // place code for your default task here
    cb();
}

exports.default = defaultTask;

// commands
exports.publishApplication = publishApplication;
exports.publishAuditing = publishAuditing;
exports.publishAzureAd = publishAzureAd;
exports.publishCommon = publishCommon;
exports.publishIam = publishIam;
exports.publishMessage = publishMessage;
exports.publishOAuth = publishOAuth;
exports.publishQueueManager = publishQueueManager;
exports.publishSearchEngine = publishSearchEngine;
exports.publishSettings = publishSettings;
exports.publishTools = publishTools;