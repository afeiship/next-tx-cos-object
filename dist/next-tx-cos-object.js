/*!
 * name: @feizheng/next-tx-cos-object
 * description: Tencent cos object for next.
 * homepage: https://github.com/afeiship/next-tx-cos-object
 * version: 1.0.0
 * date: 2020-04-30T04:06:27.175Z
 * license: MIT
 */

(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@feizheng/next-js-core2');
  var COS = require('cos-nodejs-sdk-v5');
  var Promise = require('bluebird');
  var DEFAULT_OPTIONS = {
    SecretId: 'COS_SECRETID',
    SecretKey: 'COS_SECRETKEY'
  };

  var API_HOOKS = {
    del: 'deleteObjectAsync',
    dels: 'deleteMultipleObjectAsync'
  };

  var NxTxCosObject = nx.declare('nx.TxCosObject', {
    methods: {
      init: function (inOptions) {
        this.options = nx.mix(null, DEFAULT_OPTIONS, inOptions);
        this.cos = new COS(this.options);
        Promise.promisifyAll(this.cos, { context: this.cos });
      },
      'put,del,dels': function (inName) {
        return function (inOptions) {
          this.parseOptions(inOptions);
          return this.cos[API_HOOKS[inName] || inName + 'ObjectAsync'](inOptions);
        };
      },
      empty: function (inOptions) {
        var self = this;
        this.parseOptions(inOptions);

        return new Promise(function (resolve, reject) {
          self.cos.getBucketAsync(inOptions).then(function (res) {
            var objs = res.Contents.map(function (item) {
              return { Key: item.Key };
            });
            var reqs = nx.mix(null, inOptions, { Objects: objs });
            self
              .dels(reqs)
              .then(function (rst) {
                resolve(rst);
              })
              .catch(function (err) {
                reject(err);
              });
          });
        });
      },
      parseOptions: function (inOptions) {
        if (!inOptions) return;
        var appId = this.options.id;
        var bucket = inOptions.Bucket;
        bucket && (inOptions.Bucket = bucket.includes(appId) ? bucket : bucket + '-' + appId);
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxTxCosObject;
  }
})();

//# sourceMappingURL=next-tx-cos-object.js.map
