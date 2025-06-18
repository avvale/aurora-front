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
 * Copy settings files to publish folder
 */
function copySettings()
{
    return Promise.all([
        fse.copy('src/app/modules/admin/apps/settings', 'publish/src/app/modules/admin/apps/settings', { overwrite: true }),
        fse.copy('public/i18n/settings', 'publish/public/i18n/settings', { overwrite: true }),
    ]);
}

function copyToCLI()
{
    // remove old cli iam files
    fs.rmSync('../aurora-cli/src/templates/front/packages/settings', { recursive: true, force: true });
    // copy new cli iam files
    return fse.copy('publish', '../aurora-cli/src/templates/front/packages/settings', { overwrite: true });
}

async function clean()
{
    // remove publish folder
    fs.rmSync('publish', { recursive: true, force: true });
}

exports.publishSettings = series(
    cleanSourceDirectory,
    copySettings,
    copyToCLI,
    clean,
);