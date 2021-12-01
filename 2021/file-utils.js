import fs from 'fs';

export const readLines = (path) => {
    const content = fs.readFileSync(`2021/${path}`).toString('utf8');

    return content.split('\n');
};
