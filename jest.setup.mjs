import {
  TextDecoder, TextEncoder,
} from 'util';

// 确保使用服务器渲染时，TextEncoder 和 TextDecoder 可用
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
