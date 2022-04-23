import { IShowTalk, ITalkItem } from '../type/action';
import { boolScheme, stringScheme } from './basic';
import {
    createActionScheme,
    createArrayScheme,
    createObjectScheme,
} from './define';

export const talkItemScheme = createObjectScheme<ITalkItem>({
    name: 'TalkItem',
    fields: {
        who: stringScheme,
        content: stringScheme,
    },
});

export const showTalkScheme = createActionScheme<IShowTalk>({
    name: 'ShowTalk',
    fields: {
        resetCamera: boolScheme,
        items: createArrayScheme<ITalkItem>({
            elementScheme: talkItemScheme,
        }),
    },
});
