/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
const { publishApplication } = require('./gulp/application');
const { publishAuditing } = require('./gulp/auditing');
const { publishIam } = require('./gulp/iam');
const { publishOAuth } = require('./gulp/o-auth');
const { publishAzureAd } = require('./gulp/azure-ad');

function defaultTask(cb)
{
    // place code for your default task here
    cb();
}

exports.default = defaultTask;

// commands
exports.publishApplication = publishApplication;
exports.publishAuditing = publishAuditing;
exports.publishIam = publishIam;
exports.publishOAuth = publishOAuth;
exports.publishAzureAd = publishAzureAd;