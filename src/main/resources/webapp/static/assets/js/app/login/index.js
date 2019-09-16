;(function (global) {

  new Vue({
    el: '#app',
    data: function () {
      var rememberMe = storage.local.rememberMe.get() === 'true'
      return {
        model: {
          admin: {
            account: rememberMe ? storage.local.loginAccount.get() : '',
            password: '',
            code: '',
            rememberMe: rememberMe
          },
          validate: {
            admin: {
              account: true,
              password: true,
              code: true
            }
          },
          code: ''
        }
      }
    },
    created: function () {
      this.refreshCode()
    },
    methods: {
      login: function () {
        if (this.validateAdmin()) {
          var admin = $.extend(true, {}, this.model.admin)
          service.login(admin).then(function (data) {
            if (admin.rememberMe) {
              storage.local.rememberMe.set(true)
              storage.local.loginAccount.set(admin.account)
            } else {
              storage.local.rememberMe.remove()
              storage.local.loginAccount.remove()
            }
            //保存登录状态
            storage.cookie.macKey.set(res.data.macKey);
            storage.cookie.userInfo.set(JSON.stringify(res.data));
            location.assign('/web/frame');
          })
        }
      },
      /**
       * 刷新验证码
       */
      refreshCode: function () {
        var that = this;
        service.getCode().then(function (res) {
          that.model.code = 'data:image/png;base64,' + res.data.code;
          that.model.admin.index = res.data.index;
        })
      },
      /**
       * 校验账号信息
       * @param admin
       */
      validateAdmin: function () {
        return (
          this.validateAdminAccount(),
            this.validateAdminPassword(),
            this.validateAdminCode()
        )
      },
      /**
       * 校验用户名
       * @returns {boolean}
       */
      validateAdminAccount: function () {
        return this.model.validate.admin.account = !!this.model.admin.account
      },
      /**
       * 校验密码
       * @returns {boolean}
       */
      validateAdminPassword: function () {
        return this.model.validate.admin.password = !!this.model.admin.password
      },
      /**
       * 校验验证码
       * @returns {boolean}
       */
      validateAdminCode: function () {
        return this.model.validate.admin.code = !!this.model.admin.code
      }
    }
  })

}((0, eval)('this')))