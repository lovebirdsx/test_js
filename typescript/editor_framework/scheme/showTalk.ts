import { DataType, IShowTalk, ITalkItem } from '../type/action';
import { IShowTalkMeta } from '../type/actionMeta';
import { createArrayScheme, createObjectScheme, IObjMeta } from './define';
import { schemeRegistry } from './schemeRegistry';

const talkItemScheme = createObjectScheme<ITalkItem, IObjMeta>({
    who: schemeRegistry.getScheme(DataType.string),
    content: schemeRegistry.getScheme(DataType.string),
});

schemeRegistry.regScheme(DataType.talkItem, talkItemScheme);

const showTalkScheme = createObjectScheme<IShowTalk, IObjMeta>({
    resetCamera: schemeRegistry.getScheme(DataType.boolean),
    items: createArrayScheme(talkItemScheme),
});

schemeRegistry.regScheme(DataType.showTalk, showTalkScheme);
