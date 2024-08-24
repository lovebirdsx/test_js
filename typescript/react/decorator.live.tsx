import React from 'react';
import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import {
  prefix, objToInterface, ObjectComponent, toHtml, name,
  line,
} from './common';

function liveHtml() {
  class Simple {
    @prefix('基本信息')
    @line()
    @name('姓名')
    name = 'hahah';

    @name('城市')
    city = 'beijing';

    @name('年龄')
    age = 18;

    @prefix('额外信息')
    @line()
    @name('发帖数量')
    postCout = 8898;
  }

  const s = new Simple();
  const v = objToInterface(s);
  const html = toHtml(<ObjectComponent value={s} prototype={Simple.prototype} onModify={(v) => {
    console.log('onModify', v);
  }} />, 'Decorator');
  const path = join(__dirname, 'temp', 'decorator.live.html');
  mkdirSync(join(__dirname, 'temp'), { recursive: true });
  writeFileSync(path, html, 'utf8');

  console.log('writeFileSync: ', path);
  console.log(html);
}

liveHtml();
