/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('node:fs');
const fse = require('fs-extra');
const { series } = require('gulp');

/**
 * Copy auditing files to publish folder
 */
function copyAuditing()
{
    return Promise.all([
        fse.copy('cliter/auditing', 'publish/cliter/auditing', { overwrite: true }),
        fse.copy('src/@api/auditing', 'publish/src/@api/auditing', { overwrite: true }),
        fse.copy('src/@app/auditing', 'publish/src/@app/auditing', { overwrite: true }),
    ]);
}

function copyToCLI()
{
    // remove old cli auditing files
    fs.rmSync('../aurora-cli/src/templates/back/packages/auditing', { recursive: true, force: true });
    // copy new cli auditing files
    return fse.copy('publish', '../aurora-cli/src/templates/back/packages/auditing', { overwrite: true });
}

async function clean()
{
    // remove publish folder
    fs.rmSync('publish', { recursive: true, force: true });
}

exports.publishAuditing = series(
    copyAuditing,
    copyToCLI,
    clean,
);