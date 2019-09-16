;(function (global, storage) {

  'use strict'

  var vmaAssistStorage = global['vmaAssistStorage']
  var config = global['config']

  $.extend(true, storage, {
    cookie: {
      /**
       * mac_key
       */
      macKey: new vmaAssistStorage.Cookie({
        name: encodeURIComponent(config.namespace + '/MAC_KEY')
      }),
      /**
       * 登录用户信息
       */
      userInfo: new vmaAssistStorage.Cookie({
        name: encodeURIComponent(config.namespace + '/USER_INFO')
      })
    },
    local: {
      /**
       * 登录页/记住我
       */
      rememberMe: new vmaAssistStorage.LocalItem({
        name: config.namespace + '/LOGIN_REMEMBER_ME'
      }),
      /**
       * 登录页/账号
       */
      loginAccount: new vmaAssistStorage.LocalItem({
        name: config.namespace + '/LOGIN_ACCOUNT'
      })
    }
  })

}((0, eval)('this'), (window.storage || (window.storage = {}))))
