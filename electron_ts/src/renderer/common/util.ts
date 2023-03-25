export async function readJsonObj<T>(path: string, defalut?: T): Promise<T | undefined> {
    const content = await window.electronAPI.readFile(path);
    if (content) {
        return JSON.parse(content) as T;
    }
    return defalut || undefined;
}

export async function writeJson(obj: unknown, path: string): Promise<void> {
    await window.electronAPI.writeFile(path, JSON.stringify(obj, null, 2));
}
