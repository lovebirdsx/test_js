export function indentToStr(indent?: number): string {
    if (!indent) {
        return '';
    }
    return ' '.repeat(indent * 4);
}
