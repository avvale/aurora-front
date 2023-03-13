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
 * Copy azureAd files to publish folder
 */
function copyAzureAd()
{
    return Promise.all([
        fse.copy('src/app/modules/azure-ad', 'publish/src/app/modules/azure-ad', { overwrite: true }),
    ]);
}

function copyToCLI()
{
    // remove old cli azureAd files
    fs.rmSync('../aurora-cli/src/templates/front/packages/azure-ad', { recursive: true, force: true });
    // copy new cli azureAd files
    return fse.copy('publish', '../aurora-cli/src/templates/front/packages/azure-ad', { overwrite: true });
}

async function clean()
{
    // remove publish folder
    fs.rmSync('publish', { recursive: true, force: true });
}

exports.publishAzureAd = series(
    cleanSourceDirectory,
    copyAzureAd,
    copyToCLI,
    clean,
);