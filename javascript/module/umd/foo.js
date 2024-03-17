// exampleUMD.js
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
      // AMD. Register as an anonymous module.
      define([], factory);
  } else if (typeof module === 'object' && module.exports) {
      // Node.js or CommonJS
      module.exports = factory();
  } else {
      // Browser globals (root is window)
      root.exampleUMD = factory();
  }
}(typeof self !== 'undefined' ? self : this, function() {
  // Module logic goes here.
  function sum(a, b) {
      return a + b;
  }

  // Return public API for the module
  return {
      sum: sum
  };
}));
