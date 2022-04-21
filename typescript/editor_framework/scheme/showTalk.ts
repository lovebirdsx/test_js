import { IShowTalk, ITalkItem } from '../type/action';
import { BooleanScheme, StringScheme } from './basic';
import {
    ActionScheme,
    ArrayScheme,
    IObjMeta,
    ObjectScheme,
    TFields,
} from './define';

export class TalkItemSheme extends ObjectScheme<ITalkItem, IObjMeta> {
    fields: TFields<ITalkItem> = {
        who: new StringScheme(),
        content: new StringScheme(),
    };
}

export class TalkItemArrayScheme extends ArrayScheme<
    ITalkItem,
    IObjMeta,
    IShowTalk
> {
    elementScheme = new TalkItemSheme();
}

export class ShowTalkScheme extends ActionScheme<IShowTalk, IObjMeta> {
    name: string = 'ShowTalk';
    fields: TFields<IShowTalk> = {
        resetCamera: new BooleanScheme(),
        items: new TalkItemArrayScheme(),
    };
}
