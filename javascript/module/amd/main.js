var requirejs = require('requirejs');

requirejs.config({
  // Node.js环境下使用requirejs时，需要配置baseUrL
  baseUrl: __dirname,
  nodeRequire: require,
});

requirejs(['foo'], function(foo) {
  console.log(foo.hello());
});
