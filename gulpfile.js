/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
const { publishApplication } = require('./gulp/application');
const { publishAuditing } = require('./gulp/auditing');

function defaultTask(cb)
{
    // place code for your default task here
    cb();
}

exports.default = defaultTask;

// commands
exports.publishApplication = publishApplication;
exports.publishAuditing = publishAuditing;