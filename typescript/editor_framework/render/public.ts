import { doCaculationScheme } from '../scheme/basic';
import { DynamicActionScheme } from '../scheme/dynamic_action';
import { renderArray } from './basic/array';
import { renderBasic } from './basic/basic';
import { renderAction } from './basic/action';
import { renderObject } from './basic/object';
import { renderRegistry } from './render_registry';
import {
 ActionScheme, ArrayScheme, ObjectScheme, Scheme,
} from '../scheme/define';
import { renderDynamicAction } from './basic/dymamic_action';
import { renderDoCalculate } from './extend/caculate';
import { talkItemScheme } from '../scheme/show_talk';
import { renderTalkItem } from './extend/show_talk';

renderRegistry.regRenderByClass(Scheme, renderBasic);
renderRegistry.regRenderByClass(ObjectScheme, renderObject);
renderRegistry.regRenderByClass(ArrayScheme, renderArray);
renderRegistry.regRenderByClass(DynamicActionScheme, renderDynamicAction);
renderRegistry.regRenderByClass(ActionScheme, renderAction);

renderRegistry.regObjectRender(doCaculationScheme, renderDoCalculate);
renderRegistry.regObjectRender(talkItemScheme, renderTalkItem);

export * from './render_registry';
