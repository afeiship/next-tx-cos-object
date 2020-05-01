(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@feizheng/next-js-core2');
  var NxTxAbstractCos = require('@feizheng/next-tx-abstract-cos');
  var Promise = require('bluebird');
  /* prettier-ignore */

  var RETURN_KEY = function (item) { return { Key: item.Key }; };
  var API_HOOKS = {
    del: 'deleteObjectAsync',
    dels: 'deleteMultipleObjectAsync'
  };

  var NxTxCosObject = nx.declare('nx.TxCosObject', {
    extends: NxTxAbstractCos,
    methods: {
      'put,del,dels': function (inName) {
        return function (inOptions) {
          this.parseOptions(inOptions);
          return this.cos[API_HOOKS[inName] || inName + 'ObjectAsync'](inOptions);
        };
      },
      empty: function (inOptions) {
        var self = this;
        this.parseOptions(inOptions);

        return new Promise(function (resolve) {
          self.cos
            .getBucketAsync(inOptions)
            .then(function (res) {
              var objs = res.Contents.map(RETURN_KEY);
              var reqs = nx.mix(null, inOptions, { Objects: objs });
              self.dels(reqs).then(resolve).catch(resolve);
            })
            .catch(resolve);
        });
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxTxCosObject;
  }
})();
