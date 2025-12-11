/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('node:fs');
const cp = require('node:child_process');
const fse = require('fs-extra');
const { series } = require('gulp');

function cleanSourceDirectory(cb) {
    cp.exec('find . -name ".DS_Store" -delete', () => cb());
}

/**
 * Copy tools files to publish folder
 */
function copyScreenRecording() {
    return Promise.all([
        fse.copy(
            'src/app/modules/admin/apps/screen-recording',
            'publish/src/app/modules/admin/apps/screen-recording',
            { overwrite: true },
        ),
        fse.copy(
            'public/i18n/screen-recording',
            'publish/public/i18n/screen-recording',
            {
                overwrite: true,
            },
        ),
    ]);
}

function copyToCLI() {
    // remove old cli screen-recording files
    fs.rmSync('../aurora-cli/src/templates/front/packages/screen-recording', {
        recursive: true,
        force: true,
    });
    // copy new cli screen-recording files
    return fse.copy(
        'publish',
        '../aurora-cli/src/templates/front/packages/screen-recording',
        { overwrite: true },
    );
}

async function clean() {
    // remove publish folder
    fs.rmSync('publish', { recursive: true, force: true });
}

exports.publishScreenRecording = series(
    cleanSourceDirectory,
    copyScreenRecording,
    copyToCLI,
    clean,
);
