import { TextCsv, TextCsvSnapshoter } from './text_csv';
import { ITextItem } from './types';

type TTextCsv = 'entity' | 'quest'

export class TextCsvPool {
    // eslint-disable-next-line no-use-before-define
    private static myInstance: TextCsvPool | undefined = undefined;
    static get instance(): TextCsvPool {
        if (!this.myInstance) {
            this.myInstance = new TextCsvPool();
        }
        return this.myInstance;
    }

    private textCsvMap = new Map<TTextCsv, TextCsv>();

    private constructor() {
        const entityTexts: ITextItem[] = [
            { id: 'entity_1', text: 'entity_1' },
            { id: 'entity_2', text: 'entity_2' },
            { id: 'entity_3', text: 'entity_3' },
        ];
        this.textCsvMap.set('entity', new TextCsv('entity', entityTexts));

        const questTexts: ITextItem[] = [
            { id: 'quest_1', text: 'quest_1' },
            { id: 'quest_2', text: 'quest_2' },
            { id: 'quest_3', text: 'quest_3' },
        ];
        this.textCsvMap.set('quest', new TextCsv('quest', questTexts));
    }

    get(key: TTextCsv): TextCsv {
        const textCsv = this.textCsvMap.get(key);
        if (!textCsv) {
            throw new Error(`TextCsvPool.get: key ${key} not found`);
        }

        return textCsv;
    }

    toString() {
        const textCsvs = Array.from(this.textCsvMap.values());
        return textCsvs.map((textCsv) => textCsv.toString()).join('\n');
    }
}

export class TextCsvSnapshoterPool {
    // eslint-disable-next-line no-use-before-define
    private static myInstance: TextCsvSnapshoterPool | undefined = undefined;
    static get instance(): TextCsvSnapshoterPool {
        if (!this.myInstance) {
            this.myInstance = new TextCsvSnapshoterPool();
        }
        return this.myInstance;
    }

    private ssMap = new Map<TTextCsv, TextCsvSnapshoter>();

    get(key: TTextCsv): TextCsvSnapshoter {
        const ss = this.ssMap.get(key);
        if (!ss) {
            const textCsv = TextCsvPool.instance.get(key);
            const ss = new TextCsvSnapshoter(textCsv);
            this.ssMap.set(key, ss);
            return ss;
        }

        return ss;
    }
}
