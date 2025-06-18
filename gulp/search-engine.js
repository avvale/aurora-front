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
 * Copy search engine files to publish folder
 */
function copySearchEngine()
{
    return Promise.all([
        fse.copy('cliter/search-engine', 'publish/cliter/search-engine', { overwrite: true }),
        fse.copy('src/app/modules/admin/apps/search-engine', 'publish/src/app/modules/admin/apps/search-engine', { overwrite: true }),
        fse.copy('public/i18n/search-engine', 'publish/public/i18n/search-engine', { overwrite: true }),
    ]);
}

function copyToCLI()
{
    // remove old cli search engine files
    fs.rmSync('../aurora-cli/src/templates/front/packages/search-engine', { recursive: true, force: true });
    // copy new cli search engine files
    return fse.copy('publish', '../aurora-cli/src/templates/front/packages/search-engine', { overwrite: true });
}

async function clean()
{
    // remove publish folder
    fs.rmSync('publish', { recursive: true, force: true });
}

exports.publishSearchEngine = series(
    cleanSourceDirectory,
    copySearchEngine,
    copyToCLI,
    clean,
);