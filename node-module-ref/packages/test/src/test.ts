import { addAlias } from 'module-alias';
addAlias('@mytest/common', __dirname + '/../../common/out');

import { getVersion } from '@mytest/common/platform/lib';

console.log(getVersion());
