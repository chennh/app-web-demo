;(function (global) {

  'use strict'

  var ready = global['ready']

  global['listMixin'] = global['listMixin'] || {
    data: function () {
      return {
        model: {
          params: {
            current: 1,
            size: 10
          },
          table: {
            list: [],
            page: {}
          },
          form: {
            show: false,
            url: 'form',
            entity: {
              id: ''
            }
          },
          detail: {
            show: false,
            url: 'detail',
            entity: {
              id: ''
            }
          },
          initialed: false
        },
        cache: {
          params: {}
        }
      }
    },
    computed: {
      /**
       * 表单地址
       * @returns {*}
       */
      formUrl: function () {
        return vmaAssistUtils.compatUrl(this.model.form.url, {
          id: this.model.form.entity.id
        })
      },
      /**
       * 详情地址
       * @returns {*}
       */
      detailUrl: function () {
        return vmaAssistUtils.compatUrl(this.model.detail.url, {
          id: this.model.detail.entity.id
        })
      }
    },
    created: function () {
      this.cache.params = $.extend(true, {}, this.model.params)

      // 注册全局方法
      //
      global['hideForm'] = $.proxy(this.hideForm, this)
      global['hideDetail'] = $.proxy(this.hideDetail, this)
    },
    mounted: function () {
      ready.init()
      this.init()
    },
    methods: {
      init: function () {
        this.list()
      },
      /**
       * 返回api
       */
      getApi: function () {
        throw new Error('请重写getApi提供api')
      },
      /**
       * 设置查询分页参数
       * @param current
       * @param size
       */
      setSearchPage: function (current, size) {
        if (typeof current === 'number') {
          this.model.params.current = current
        }
        if (typeof size === 'number') {
          this.model.params.size = size
        }
      },
      /**
       * 分页查询前置操作，返回false不执行查询
       * @param params
       * @returns {boolean}
       */
      beforeList: function (params) {
        return true
      },
      /**
       * 分页查询后置操作，可对list进行处理
       * @param list
       */
      afterList: function (list, page) {
      },
      /**
       * 返回列表查询的api执行结果
       * @param params
       * @returns {*|void}
       */
      getListApi: function (params) {
        return this.getApi().list(params)
      },
      /**
       * 查询第一页
       */
      search: function () {
        this.list(1)
      },
      /**
       * 重置查询
       */
      resetSearch: function () {
        this.model.params = $.extend(true, {}, this.cache.params, {
          current: this.model.params.current,
          size: this.model.params.size
        })
        this.search()
      },
      /**
       * 分页查询
       * @param current 当前页码
       * @param size 分页数
       * @returns {PromiseLike<T | never> | Promise<T | never> | *}
       */
      list: function (current, size) {
        var params = $.extend(true, {}, this.model.params)
        var that = this
        this.setSearchPage(current, size)
        if (this.beforeList(params) === false) {
          return
        }
        return this.getListApi(params).then(function (res) {
          var page = res.data
          var list = page.records
          delete page.records
          if (page.total > 0 && list.length === 0) {
            // 异步问题，要return
            return that.list(params.current - 1, params.size)
          } else {
            that.afterList(list, page)
            that.setTableList(list)
            that.model.table.page = page
          }
        })
      },
      /**
       * 设置表格数据
       * @param list
       */
      setTableList: function (list) {
        this.model.table.list = list
      },
      /**
       * 显示表单页
       */
      showForm: function (id) {
        this.model.form.entity.id = id || ''
        this.model.form.show = true
      },
      /**
       * 关闭表单页
       */
      hideForm: function () {
        this.model.form.show = false
      },
      /**
       * 显示详情页
       */
      showDetail: function (id) {
        this.model.form.entity.id = id
        this.model.detail.show = true
      },
      /**
       * 关闭详情页
       */
      hideDetail: function () {
        this.model.detail.show = false
      },
      /**
       * 批量删除
       */
      showBatchDel: function () {
        var that = this
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          that.success('删除成功')
        }, function () {
        })
      }
    }
  }

}((0, eval)('this')))
