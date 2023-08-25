const OKBLUE = '\x1b[94m';
const OKCYAN = '\x1b[96m';
const OKGREEN = '\x1b[92m';
const WARNING = '\x1b[93m';
const FAIL = '\x1b[91m';
const ENDC = '\x1b[0m';
const BOLD = '\x1b[1m';
const UNDERLINE = '\x1b[4m';

export function blue(s: string): string {
    return OKBLUE + s + ENDC;
}

export function cyan(s: string): string {
    return OKCYAN + s + ENDC;
}

export function green(s: string): string {
    return OKGREEN + s + ENDC;
}

export function red(s: string): string {
    return FAIL + s + ENDC;
}

export function yellow(s: string): string {
    return WARNING + s + ENDC;
}

export function bold(s: string): string {
    return BOLD + s + ENDC;
}

export function underline(s: string): string {
    return UNDERLINE + s + ENDC;
}
