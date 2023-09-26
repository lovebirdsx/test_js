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

function getNextName(name: string): string {
    if (!name) {
        return 'user-1';
    }

    const dashIndex = name.lastIndexOf('-');
    if (dashIndex < 0) {
        return `${name}-1`;
    }

    const id = Number.parseInt(name.substring(dashIndex + 1), 10);
    if (Number.isNaN(id)) {
        return `${name}-1`;
    }

    return `${name.substring(0, dashIndex)}-${id + 1}`;
}

console.log(getNextName('hello'));
console.log(getNextName('hello-1'));
console.log(getNextName('hello-fuck'));

const a: string[] = [];
function getA(index: number): string {
    return a[index]!;
}
