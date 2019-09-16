;(function (global) {

  'use strict'

  var ready = global['ready']

  global['detailMixin'] = global['detailMixin'] || {
    data: function () {
      return {
        model: {
          entity: {
            id: global['id']
          }
        }
      }
    },
    mounted: function () {
      ready.init()
    },
    methods: {
      getApi: function () {
        throw new Error('请重写getApi提供api')
      },
      /**
       * 返回详情接口调用结果
       * @param id
       */
      getDetailApi: function (id) {
        return this.getApi().get(id)
      },
      /**
       * 调用详情接口后置操作，可修改实体
       * @param data
       */
      afterGet: function (data) {
      },
      /**
       * 取详情
       * @returns {PromiseLike<T | never> | Promise<T | never> | *}
       */
      get: function () {
        var that = this
        return this.getDetailApi(this.model.entity.id).then(function (data) {
          that.afterGet(data)
          $.extend(true, that.model.entity, data)
        })
      }
    }
  }

}((0, eval)('this')))