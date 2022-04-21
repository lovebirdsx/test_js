import {
 BooleanScheme, DoCaculationScheme, FloatScheme, IntScheme, LogScheme, OpScheme, ShowMessageScheme, StringScheme,
} from '../scheme/basic';
import { NormalActionScheme } from '../scheme/dynamic';
import { ShowTalkScheme, TalkItemArrayScheme, TalkItemSheme } from '../scheme/showTalk';
import {
 IDoCaculation, ILog, IShowMessage, IShowTalk, ITalkItem, Op,
} from '../type/action';
import { renderArray } from './basic/array';
import { renderBasic } from './basic/basic';
import { renderAction } from './basic/action';
import { renderObject } from './basic/object';
import { renderRegistry } from './renderRegistry';

renderRegistry.regRender<number>(IntScheme, renderBasic);
renderRegistry.regRender<number>(FloatScheme, renderBasic);
renderRegistry.regRender<boolean>(BooleanScheme, renderBasic);
renderRegistry.regRender<string>(StringScheme, renderBasic);
renderRegistry.regRender<Op>(OpScheme, renderBasic);

renderRegistry.regObjRender<ITalkItem>(TalkItemSheme, renderObject);
renderRegistry.regArrayRender<ITalkItem>(TalkItemArrayScheme, renderArray);
renderRegistry.regObjRender<IShowTalk>(ShowTalkScheme, renderObject);

renderRegistry.regObjRender<IShowMessage>(ShowMessageScheme, renderObject);
renderRegistry.regObjRender<ILog>(LogScheme, renderObject);
renderRegistry.regObjRender<IDoCaculation>(DoCaculationScheme, renderObject);
renderRegistry.regActionRender(NormalActionScheme, renderAction);

export * from './renderRegistry';
