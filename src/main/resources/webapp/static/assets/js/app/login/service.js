;(function (service) {

  'use strict'

  $.extend(true, service, {
    /**
     * 登录
     * @param data
     */
    login: function (data) {
      return axios({
        url: 'login',
        method: 'post',
        data: data
      })
    },
    /**
     * 获取图片验证码
     */
    getCode: function () {
      return axios({
        url: 'code',
        method: 'get'
      })
    }
  })


}((window.service || (window.service = {}))))