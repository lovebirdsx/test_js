import { RenderType } from '../scheme/define';
import { renderArray } from './basic/array';
import { renderBasic } from './basic/basic';
import { renderDynamic } from './basic/dynamic';
import { renderObject } from './basic/object';
import { renderRegistry } from './renderRegistry';

renderRegistry.regRender<number>(RenderType.int, renderBasic);
renderRegistry.regRender<number>(RenderType.float, renderBasic);
renderRegistry.regRender<boolean>(RenderType.boolean, renderBasic);
renderRegistry.regRender<string>(RenderType.string, renderBasic);
renderRegistry.regRender(RenderType.object, renderObject);
renderRegistry.regRender(RenderType.array, renderArray);
renderRegistry.regRender(RenderType.dynamic, renderDynamic);

export * from './renderRegistry';
