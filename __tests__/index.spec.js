(function() {
  const NxTxCosObject = require('../src');

  // var config = require('./config.json');
  var txObj = new NxTxCosObject(config);

  jest.setTimeout(30 * 1e3);

  describe('NxTxCosObject.methods', function () {
    test('dels', function (done) {
      // txObj
      //   .empty({
      //     Bucket: '19967-05-1301823685',
      //     Region: 'ap-beijing-fsi'
      //   })
      //   .then((res) => {
      //     console.log(res);
      //     done();
      //   });
    });
  });

})();
