interface Window {
    api: {
        readFile:(filePath: string) => Promise<string>;
    };
}
