;(function (global) {

  'use strict'

  var ready = global['ready']
  var parentGlobal = global.parent.window

  global['formMixin'] = global['formMixin'] || {
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
       * 返回保存/更新接口调用结果
       * @param entity
       * @returns {*|void}
       */
      getSaveOrUpdateApi: function (entity) {
        return this.getApi().saveOrUpdate(entity)
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
      },
      /**
       * 提交表单前置操作，返回false不执行提交
       * @param data
       * @returns {boolean}
       */
      beforeSaveOrUpdate: function (entity) {
        return true
      },
      afterSaveOrUpdate: function (data) {

      },
      /**
       * 保存/更新
       */
      saveOrUpdate: function () {
        var entity = $.extend(true, {}, this.model.entity)
        var that = this
        if (this.beforeSaveOrUpdate(entity) === false) {
          return
        }
        this.getSaveOrUpdateApi(entity).then(function (data) {
          that.afterSaveOrUpdate(data)
        })
      },
      /**
       * 提交表单
       * @returns {*|void}
       */
      submit: function () {
        if (!$('#form').valid()) {
          return
        }
        return this.saveOrUpdate()
      },
      /**
       * 取消
       */
      cancel: function () {
        parentGlobal.hideForm()
      }
    }
  }

}((0, eval)('this')))