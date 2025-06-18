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
 * Copy common files to publish folder
 */
function copyCommon()
{
    return Promise.all([
        fse.copy('cliter/common', 'publish/cliter/common', { overwrite: true }),
        fse.copy('src/app/modules/admin/apps/common', 'publish/src/app/modules/admin/apps/common', { overwrite: true }),
        fse.copy('public/i18n/common', 'publish/public/i18n/common', { overwrite: true }),
    ]);
}

function copyToCLI()
{
    // remove old cli common files
    fs.rmSync('../aurora-cli/src/templates/front/packages/common', { recursive: true, force: true });
    // copy new cli common files
    return fse.copy('publish', '../aurora-cli/src/templates/front/packages/common', { overwrite: true });
}

async function clean()
{
    // remove publish folder
    fs.rmSync('publish', { recursive: true, force: true });
}

exports.publishCommon = series(
    cleanSourceDirectory,
    copyCommon,
    copyToCLI,
    clean,
);