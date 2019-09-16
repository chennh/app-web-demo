;(function (global, service) {

  'use strict'

  var axios = global['axios']

  service.restfulApi = {};
  service.init = function (url, extendApis) {
    service.restfulApi = $.extend(true, {
      /**
       * 数据列表
       * @param params
       */
      list: function (params) {
        return axios({
          url: url,
          method: 'get',
          params: params,
          responseType: 'json'
        })
      },
      /**
       * 详情
       * @param id
       */
      get: function (id) {
        return axios({
          url: url + '/' + id,
          method: 'get',
          responseType: 'json'
        })
      },
      /**
       * 保存
       * @param data
       */
      save: function (data) {
        return axios({
          url: url,
          method: 'POST',
          data: data
        })
      },
      /**
       * 更新
       * @param data
       */
      update: function (data) {
        return axios({
          url: url,
          method: 'PUT',
          data: data
        })
      },
      /**
       * 保存/更新
       * @param data
       * @returns {*}
       */
      saveOrUpdate: function (data) {
        return data.id ? this.update(data) : this.save(data)
      }
    }, extendApis)
  }

}((0, eval)('this'), (window.service || (window.service = {}))))
