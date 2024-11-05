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
 * Copy message files to publish folder
 */
function copyMessage()
{
    return Promise.all([
        fse.copy('cliter/message', 'publish/cliter/message', { overwrite: true }),
        fse.copy('src/app/modules/admin/apps/message', 'publish/src/app/modules/admin/apps/message', { overwrite: true }),
        fse.copy('public/i18n/message', 'publish/public/i18n/message', { overwrite: true }),
    ]);
}

function copyToCLI()
{
    // remove old cli message files
    fs.rmSync('../aurora-cli/src/templates/front/packages/message', { recursive: true, force: true });
    // copy new cli message files
    return fse.copy('publish', '../aurora-cli/src/templates/front/packages/message', { overwrite: true });
}

async function clean()
{
    // remove publish folder
    fs.rmSync('publish', { recursive: true, force: true });
}

exports.publishMessage = series(
    cleanSourceDirectory,
    copyMessage,
    copyToCLI,
    clean,
);