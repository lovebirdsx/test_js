import { version } from '@typescript-eslint/parser';
import Singleton from './singleton';

const s: Singleton = Singleton.Instance;
s.info();

console.log(version);
