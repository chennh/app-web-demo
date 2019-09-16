;(function (global, vueReady) {

  var config = global['config']
  var Vue = global['Vue']
  var ELEMENT = global['ELEMENT']
  var storage = global['storage']

  $.extend(true, vueReady, {
    tools: {
      /**
       * 提供指令解析使用，获得表达式的上下文
       * @param viewModel
       * @param expression
       * @returns {{viewModel: *, target: *, key: string}}
       */
      transferContext: function (viewModel, expression) {
        var keys = $.trim(expression).split('.')
        var target = viewModel
        var key = keys[keys.length - 1]

        for (var i = 0, l = keys.length; i < l - 1; i++) {
          target = target[keys[i]]
        }
        return {
          viewModel: viewModel,
          target: target,
          key: key
        }
      },
      /**
       * 提供指令解析使用，获得表达式的上下文
       * @param viewModel
       * @param expression
       * @returns {Array}
       */
      transferContextArr: function (viewModel, expression) {
        var exps = expression.replace(/[\[\]]/g, '').split(',')
        var ctxs = []
        $.each(exps, function (i, exp) {
          ctxs.push(vueReady.tools.transferContext(viewModel, exp))
        })
        return ctxs
      },
      /**
       * 转日期
       * @param obj
       * @returns {*}
       */
      toMomentDate: function (obj) {
        if (typeof obj === 'number') {
          return new Date(obj)
        }
        return obj
      },
      /**
       *
       * @param names
       * @param obj
       * @returns {*}
       */
      transferNames: function (names, obj) {
        if (!names) {
          names = []
          $.each(obj, function (name) {
            names.push(name)
          })
        } else if (!$.isArray(names)) {
          names = [names]
        }
        return names
      },
      /**
       *
       * @param names
       * @param obj
       */
      initFromNames: function (names, obj) {
        $.each(vueReady.tools.transferNames(names, obj), function (i, name) {
          if (obj[name]) {
            obj[name]()
          }
        })
      }
    },
    directives: {
      /**
       * 配合daterangepicker.js使用
       */
      dateRange: function () {
        Vue.directive('model-daterange', {
          bind: function (el, binding, vnode) {
            var $el = $(el)

            function update(data) {
              var ctxs = vueReady.tools.transferContextArr(vnode.context, binding.expression)
              var startCtx = ctxs[0]
              var endCtx = ctxs[1]
              if (startCtx) {
                startCtx.viewModel.$set(startCtx.target, startCtx.key, data[0])
              }
              if (endCtx) {
                endCtx.viewModel.$set(endCtx.target, endCtx.key, data[1])
              }
              el.dispatchEvent(new Event('change'))
            }

            $el.on('apply.daterangepicker', function (e, picker) {
              update([picker.startDate.valueOf(), picker.endDate.valueOf()])
            })
            Vue.nextTick(function () {
              var $clear = $el.next()
              if ($clear.hasClass('action-clear')) {
                $clear.on('click', function () {
                  update(['', ''])
                })
              }
            }, 0)
          },
          update: function (el, binding, vnode) {
            ready.tools.assist($.fn.daterangepicker, '未引用daterangepicker')
            Vue.nextTick(function () {
              var $el = $(el)
              var pluginInstance = ready.tools.assist($el.data('daterangepicker'), '未初始化dateRange/datetimeRange')
              if (binding.value[0] === '' && binding.value[1] === '') {
                var now = new Date()
                pluginInstance.setStartDate(now)
                pluginInstance.setEndDate(now)
                $el.val('')
              } else {
                if (binding.value[0] !== binding.oldValue[0]) {
                  pluginInstance.setStartDate(vueReady.tools.toMomentDate(binding.value[0]))
                }
                if (binding.value[1] !== binding.oldValue[1]) {
                  pluginInstance.setEndDate(vueReady.tools.toMomentDate(binding.value[1]))
                }
              }
            })
          },
          unbind: function (el) {
            $(el).off('apply.daterangepicker')
          }
        })
      },
      /**
       * 配合daterangepicker.js使用
       */
      date: function () {
        Vue.directive('model-date', {
          bind: function (el, binding, vnode) {
            var $el = $(el)

            function update(data) {
              var ctx = vueReady.tools.transferContext(vnode.context, binding.expression)
              ctx.viewModel.$set(ctx.target, ctx.key, data)
              el.dispatchEvent(new Event('change'))
            }

            $el.on('apply.daterangepicker', function (e, picker) {
              update(picker.startDate.valueOf())
            })
            Vue.nextTick(function () {
              var $clear = $el.next()
              if ($clear.hasClass('action-clear')) {
                $clear.on('click', function () {
                  update('')
                })
              }
            }, 0)
          },
          update: function (el, binding, vnode) {
            ready.tools.assist($.fn.daterangepicker, '未引用daterangepicker')
            Vue.nextTick(function () {
              var $el = $(el)
              if (binding.value !== binding.oldValue) {
                var pluginInstance = ready.tools.assist($el.data('daterangepicker'), '未初始化date/datetime')
                if (binding.value === '') {
                  pluginInstance.setStartDate(new Date())
                  pluginInstance.setEndDate(new Date())
                  $el.val('')
                } else {
                  var date = vueReady.tools.toMomentDate(binding.value)
                  pluginInstance.setStartDate(date)
                  pluginInstance.setEndDate(date)
                }
              }
            })
          },
          unbind: function (el) {
            $(el).off('apply.daterangepicker')
          }
        })
      },
      /**
       * 配合bootstrap.timepicker.js使用
       */
      time: function () {
        Vue.directive('model-time', {
          bind: function (el, binding, vnode) {
            function update(data) {
              var ctx = vueReady.tools.transferContext(vnode.context, binding.expression)
              ctx.viewModel.$set(ctx.target, ctx.key, data)
              el.dispatchEvent(new Event('change'))
            }

            var $el = $(el)
            $el.on('changeTime.timepicker', function (e) {
              update(e.time.value)
            })
            Vue.nextTick(function () {
              var $clear = $el.next()
              if ($clear.hasClass('action-clear')) {
                $clear.on('click', function () {
                  update('')
                })
              }
            }, 0)
          },
          update: function (el, binding, vnode) {
            ready.tools.assist($.fn.timepicker, '未引用timepicker')
            Vue.nextTick(function () {
              var $el = $(el)
              if (binding.value !== binding.oldValue || binding.value !== el.value) {
                ready.tools.assist($el.data('timepicker'), '未初始化timepicker').setTime(binding.value)
              }
            })
          },
          unbind: function (el) {
            $(el).off('changeTime.timepicker')
          }
        })
      },
      /**
       * 配合jquery.formatter.js使用,注意：输出的值包含了pattern的字符
       */
      formatter: function () {
        Vue.directive('model-formatter', {
          bind: function (el, binding, vnode) {
            var $el = $(el)
            $el.on('change.formatter', function (e, data) {
              var ctx = vueReady.tools.transferContext(vnode.context, binding.expression)
              ctx.viewModel.$set(ctx.target, ctx.key, data)
            })
          },
          update: function (el, binding, vnode) {
            ready.tools.assist($.fn.formatter, '未引用formatter')
            Vue.nextTick(function () {
              var $el = $(el)
              if (binding.value !== binding.oldValue || binding.value !== el.value) {
                ready.tools.assist($el.data('plugin_formatter'), '未初始化formatter')._processKey(binding.value, false)
              }
            })
          },
          unbind: function (el) {
            $(el).off('change.formatter')
          }
        })
      }
    },
    plugins: {
      /**
       * 安装vmaElement
       */
      vmaElement: function () {
        if (global['vmaElement']) {
          Vue.use(global['vmaElement']['default'], {
            components: {
              upload: {
                imageUpload: {
                  defaultOptions: {
                    // 图片限制10M
                    singleFileSize: 10
                  }
                },
                qiniu: {
                  getQiniuTokenUrl: config.qiniuTokenUrl,
                  generalUrl: function (response) {
                    var attname = ''
                    if (response.fname) {
                      if (/\./.test(response.fname)) {
                        attname = response.fname.replace(/,/g, '')
                      } else {
                        attname = response.fname + response.ext
                      }
                    }
                    return response.domain + '/' + response.key + '?attname=' + attname
                  }
                }
              }
            }
          })
        }
      },
      /**
       * 安装vmaAssist
       */
      vmaAssist: function () {
        if (global['vmaAssist']) {
          Vue.use(global['vmaAssist']['default'], {
            plugins: {
              debug: config.isDev,
              axios: {
                defaults: {
                  baseURL: config.api,
                  timeout: 60000
                },
                interceptor: {
                  errorHandle: {
                    handleError: function (err) {
                      var message
                      if (err.response) {
                        message = err.response.data && err.response.data.message ? err.response.data.message : '系统出错了，请稍后再试'
                        if (err.response.status === 404) {
                          message = '访问路径不存在'
                        }
                        if (err.response.status === 401 && err.response.data.httpStatus === 'UNAUTHORIZED') {
                          ELEMENT.MessageBox.alert('长时间未登录，请重新登录', '提示', {
                            lock: true,
                            type: 'warning ',
                            showClose: false,
                            showCancelButton: false,
                            confirmButtonText: '重新登录',
                            callback: function () {
                              top.location.assign('/web/login')
                            }
                          })
                          return
                        }
                      } else {
                        message = '网络出错了，请稍后再试'
                      }
                      ELEMENT.Message.error(message)
                    }
                  },
                  loading: {
                    timer: null,
                    time: 150,
                    requestCount: 0,
                    loadingInstance: null,
                    showLoader: function () {
                      if (this.requestCount++ <= 0) {
                        var that = this
                        this.timer = setTimeout(function () {
                          that.loadingInstance = ELEMENT.Loading.service({
                            lock: true,
                            text: '拼命加载中...',
                            target: top.document.body,
                            background: 'rgba(0, 0, 0, 0.1)'
                          })
                        }, this.time)

                      }
                    },
                    hideLoader: function () {
                      if (--this.requestCount <= 0) {
                        if (this.timer) {
                          clearTimeout(this.timer)
                        }
                        if (this.loadingInstance) {
                          this.loadingInstance.close()
                        }
                      }
                    }
                  },
                  authorization: {
                    debug: config.isDev,
                    getMacKey: function () {
                      return storage.cookie.macKey.get() || ''
                    }
                  }
                }
              }
            }
          })
        }
      },
      /**
       * 安装vmaTemplateMinimalelite
       */
      vmaTemplateMinimalelite: function () {
        if (global['vmaTemplateMinimalelite']) {
          Vue.use(global['vmaTemplateMinimalelite']['default'])
        }
      }
    },
    /**
     * 初始化指令
     * @param names
     */
    initDirectives: function (names) {
      ready.tools.initFromNames(names, vueReady.directives)
    },
    /**
     * 初始化插件
     * @param names
     */
    initPlugins: function (names) {
      ready.tools.initFromNames(names, vueReady.plugins)
    }
  })


  vueReady.initPlugins()

}((0, eval)('this'), (window.vueReady || (window.vueReady = {}))))
