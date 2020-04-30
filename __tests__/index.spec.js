(function() {
  var nx = require('@feizheng/next-js-core2');
  var NxTxCosObject = require('../src/next-tx-cos-object');

  describe('NxTxCosObject.methods', function() {
    test('init', function() {
      var data = {
        key: 1,
        value: 2
      };
      expect(!!data).toBe(true);
    });
  });
})();
