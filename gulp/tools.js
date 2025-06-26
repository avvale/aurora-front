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
 * Copy tools files to publish folder
 */
function copyTools()
{
    return Promise.all([
        fse.copy('cliter/tools', 'publish/cliter/tools', { overwrite: true }),
        fse.copy('src/app/modules/admin/apps/tools', 'publish/src/app/modules/admin/apps/tools', { overwrite: true }),
        fse.copy('public/i18n/tools', 'publish/public/i18n/tools', { overwrite: true }),
    ]);
}

function copyToCLI()
{
    // remove old cli tools files
    fs.rmSync('../aurora-cli/src/templates/front/packages/tools', { recursive: true, force: true });
    // copy new cli tools files
    return fse.copy('publish', '../aurora-cli/src/templates/front/packages/tools', { overwrite: true });
}

async function clean()
{
    // remove publish folder
    fs.rmSync('publish', { recursive: true, force: true });
}

exports.publishTools = series(
    cleanSourceDirectory,
    copyTools,
    copyToCLI,
    clean,
);