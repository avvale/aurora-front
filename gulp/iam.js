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
 * Copy iam files to publish folder
 */
function copyIam()
{
    return Promise.all([
        fse.copy('cliter/iam', 'publish/cliter/iam', { overwrite: true }),
        fse.copy('src/app/modules/admin/apps/iam', 'publish/src/app/modules/admin/apps/iam', { overwrite: true }),
        fse.copy('public/i18n/iam', 'publish/public/i18n/iam', { overwrite: true }),
    ]);
}

function copyToCLI()
{
    // remove old cli iam files
    fs.rmSync('../aurora-cli/src/templates/front/packages/iam', { recursive: true, force: true });
    // copy new cli iam files
    return fse.copy('publish', '../aurora-cli/src/templates/front/packages/iam', { overwrite: true });
}

async function clean()
{
    // remove publish folder
    fs.rmSync('publish', { recursive: true, force: true });
}

exports.publishIam = series(
    cleanSourceDirectory,
    copyIam,
    copyToCLI,
    clean,
);