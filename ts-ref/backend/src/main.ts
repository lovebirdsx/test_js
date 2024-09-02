import { getName, hello } from 'common/util';

function main() {
  hello();
  console.log('backend', getName());
}

main();
