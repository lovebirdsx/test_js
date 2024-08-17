import { addAlias } from 'module-alias';

import { getVersion } from '@mytest/common/platform/lib';

addAlias('@mytest/common', `${__dirname}/../../common/out`);

console.log(getVersion());
