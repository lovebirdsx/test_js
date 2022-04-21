import { IShowTalk, ITalkItem } from '../type/action';
import { BooleanScheme, StringScheme } from './basic';
import {
    ActionScheme,
    ArrayScheme,
    ObjectScheme,
    TFields,
} from './define';

export class TalkItemSheme extends ObjectScheme<ITalkItem> {
    fields: TFields<ITalkItem> = {
        who: new StringScheme(),
        content: new StringScheme(),
    };
}

export class TalkItemArrayScheme extends ArrayScheme<ITalkItem> {
    elementScheme = new TalkItemSheme();
}

export class ShowTalkScheme extends ActionScheme<IShowTalk> {
    name: string = 'ShowTalk';
    fields: TFields<IShowTalk> = {
        resetCamera: new BooleanScheme(),
        items: new TalkItemArrayScheme(),
    };
}
