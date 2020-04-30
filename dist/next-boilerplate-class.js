/*!
 * name: @feizheng/next-tx-cos-object
 * description: Tencent cos object for next.
 * url: https://github.com/afeiship/next-tx-cos-object
 * version: 1.0.0
 * date: 2020-03-28 12:58:30
 * license: MIT
 */

(function() {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@feizheng/next-js-core2');

  var NxTxCosObject = nx.declare('nx.TxCosObject', {});

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxTxCosObject;
  }
})();

//# sourceMappingURL=next-tx-cos-object.js.map
