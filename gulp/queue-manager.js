/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('node:fs');
const cp = require('node:child_process');
const fse = require('fs-extra');
const { series } = require('gulp');

function cleanSourceDirectory(cb)
{
    cp.exec('find . -name ".DS_Store" -delete', () => cb());
}

/**
 * Copy queue manager files to publish folder
 */
function copyQueueManager()
{
    return Promise.all([
        fse.copy('cliter/queue-manager', 'publish/cliter/queue-manager', { overwrite: true }),
        fse.copy('src/app/modules/admin/apps/queue-manager', 'publish/src/app/modules/admin/apps/queue-manager', { overwrite: true }),
        fse.copy('public/i18n/queue-manager', 'publish/public/i18n/queue-manager', { overwrite: true }),
    ]);
}

function copyToCLI()
{
    // remove old cli queue manager files
    fs.rmSync('../aurora-cli/src/templates/front/packages/queue-manager', { recursive: true, force: true });
    // copy new cli queue manager files
    return fse.copy('publish', '../aurora-cli/src/templates/front/packages/queue-manager', { overwrite: true });
}

async function clean()
{
    // remove publish folder
    fs.rmSync('publish', { recursive: true, force: true });
}

exports.publishQueueManager = series(
    cleanSourceDirectory,
    copyQueueManager,
    copyToCLI,
    clean,
);