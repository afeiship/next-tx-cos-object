(function () {
  var nx = require('@feizheng/next-js-core2');
  var NxTxCosObject = require('../src/next-tx-cos-object');
  var config = require('./config.json');
  var txObj = new NxTxCosObject(config);

  jest.setTimeout(30 * 1e3);

  describe('NxTxCosObject.methods', function () {
    test('dels', function (done) {
      txObj
        .empty({
          Bucket: '1ksfu-01',
          Region: 'ap-shanghai-fsi'
        })
        .then((res) => {
          console.log(res);
          done();
        });
    });
  });
})();
