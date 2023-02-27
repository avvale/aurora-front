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
 * Copy oAuth files to publish folder
 */
function copyOAuth()
{
    return Promise.all([
        fse.copy('cliter/o-auth', 'publish/cliter/o-auth', { overwrite: true }),
        fse.copy('src/app/modules/admin/apps/o-auth', 'publish/src/app/modules/admin/apps/o-auth', { overwrite: true }),
        fse.copy('src/assets/i18n/o-auth', 'publish/src/assets/i18n/o-auth', { overwrite: true }),
    ]);
}

function copyToCLI()
{
    // remove old cli oAuth files
    fs.rmSync('../aurora-cli/src/templates/front/packages/o-auth', { recursive: true, force: true });
    // copy new cli oAuth files
    return fse.copy('publish', '../aurora-cli/src/templates/front/packages/o-auth', { overwrite: true });
}

async function clean()
{
    // remove publish folder
    fs.rmSync('publish', { recursive: true, force: true });
}

exports.publishOAuth = series(
    cleanSourceDirectory,
    copyOAuth,
    copyToCLI,
    clean,
);