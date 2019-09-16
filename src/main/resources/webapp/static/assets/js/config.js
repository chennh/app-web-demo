;(function (global) {

  'use strict'

  var context = global['context']

  global['config'] = {

    // app名称
    app: context.app,

    // 命名空间
    namespace: context.app + '/' + context.env,

    // 基础接口地址
    api: context.api,

    // 是否为开发环境
    isDev: context.isDev,

    // 单文件限制10M
    singleFileSize: 10,

    // 生成七牛token的服务端地址
    qiniuTokenUrl: function (type) {
      return 'qiniu'
    }
  }


}((0, eval)('this')))