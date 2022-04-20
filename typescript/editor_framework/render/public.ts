import { RenderType } from '../scheme/define';
import { renderArray } from './array';
import { renderBasic } from './basic';
import { renderDynamic } from './dynamic';
import { renderObject } from './object';
import { renderRegistry } from './renderRegistry';

renderRegistry.regRender(RenderType.int, renderBasic);
renderRegistry.regRender(RenderType.float, renderBasic);
renderRegistry.regRender(RenderType.boolean, renderBasic);
renderRegistry.regRender(RenderType.string, renderBasic);
renderRegistry.regRender(RenderType.object, renderObject);
renderRegistry.regRender(RenderType.array, renderArray);
renderRegistry.regRender(RenderType.dynamic, renderDynamic);

export * from './renderRegistry';
