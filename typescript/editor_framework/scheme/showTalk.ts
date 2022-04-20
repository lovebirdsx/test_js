import { DataType, IShowTalk, ITalkItem } from '../type/action';
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

schemeRegistry.regObjScheme(DataType.showTalk, showTalkScheme);
