export interface ITextItem {
    id: string;
    text: string;
}

export interface ITextCsv {
    id: string;
    items: ITextItem[];
}
