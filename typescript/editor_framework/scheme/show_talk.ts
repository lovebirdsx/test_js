import { IShowTalk, ITalkItem } from '../type/action';
import { boolScheme, stringScheme } from './basic';
import {
    createActionScheme,
    createArrayScheme,
    createObjectScheme,
} from './define';

export const showTalkScheme = createActionScheme<IShowTalk>({
    name: 'ShowTalk',
    fields: {
        resetCamera: boolScheme,
        items: createArrayScheme<ITalkItem>({
            elementScheme: createObjectScheme<ITalkItem>({
                fields: {
                    who: stringScheme,
                    content: stringScheme,
                },
            }),
        }),
    },
});
