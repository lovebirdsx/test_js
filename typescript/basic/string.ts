export function coverFullPathToName(path: string): string {
    const tokens = path.split(/:|\.|\\|\//g);
    return tokens.join('_');
}

const path = 'F:/hello\\foo\\bar.txt';
console.log(coverFullPathToName(path));

function normalPath(path: string): string {
    return path.split('/').join('\\');
}

console.log(normalPath(path));
