import {
} from '../scheme/basic';
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

renderRegistry.regRender(Scheme, renderBasic);
renderRegistry.regRender(ObjectScheme, renderObject);
renderRegistry.regRender(ArrayScheme, renderArray);
renderRegistry.regRender(DynamicActionScheme, renderDynamicAction);
renderRegistry.regRender(ActionScheme, renderAction);

export * from './render_registry';
