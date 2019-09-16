;(function (ready) {

  'use strict'

  var sequence = 1

  var DATETIME_RANGE_LOCALE = {
    format: 'YYYY/MM/DD',
    applyLabel: '确定',
    cancelLabel: '取消',
    daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
  }

  $.extend(true, ready, {
    tools: {
      /**
       * 返回$dom或者jquerySelector
       * @param $dom
       * @param jquerySelector
       * @returns {*}
       */
      defaultDom: function ($dom, jquerySelector) {
        if ($dom && $dom.selector) {
          return $dom
        }
        return $(jquerySelector)
      },
      /**
       * 执行插件
       * @param $dom
       * @param fnName
       * @param options
       * @param optionName
       * @returns {*}
       */
      executePlugin: function ($dom, fnName, options, optionName) {
        return $dom.each(function () {
          var $this = $(this),
            domOptionsText = $this.attr(optionName)
          if ($.isFunction(fnName)) {
            return fnName.call($this, options, domOptionsText)
          } else {
            return $this[fnName]($.extend(true, ready.tools.parseJSON(domOptionsText || '{}'), options))
          }
        })
      },
      /**
       * 转json
       * @param text
       * @returns {*}
       */
      parseJSON: function (text) {
        try {
          return JSON.parse(text)
        } catch (e) {
          return new Function('return ' + text)()
        }
      },
      /**
       * 辅助错误判断
       * @param obj
       * @param errMsg
       * @returns {*}
       */
      assist: function (obj, errMsg) {
        if (obj === null || obj === undefined) {
          throw new Error(errMsg)
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
        $.each(ready.tools.transferNames(names, obj), function (i, name) {
          if (obj[name]) {
            obj[name]()
          }
        })
      }
    },
    components: {
      /**
       * box
       */
      box: function ($dom) {
        $dom = ready.tools.defaultDom($dom, '.box')

        var box = {
          /**
           * 关闭
           * @param $box
           */
          close: function ($box, $btn) {
            function close(fn) {
              if (typeof fn === 'function') {
                fn()
              } else {
                $box.fadeOut(300)
              }
            }

            var closeTarget = $btn.attr('box-close-target')
            if (closeTarget) {
              var targets = closeTarget.split('/')
              switch (targets[0]) {
                case 'parent':
                  close(window.parent[targets[1]])
                  break
                default:
                  close()
              }
            } else {
              close()
            }
          },
          /**
           * 切换显示/隐藏
           * @param $box
           */
          slide: function ($box) {
            $box.find('.box-body').slideToggle()
              .end()
              .find('.box-btn-slide').toggleClass('rotate-180')
          },
          /**
           * 最大化
           * @param $box
           */
          max: function ($box) {
            $box.toggleClass('box-maximize').removeClass('box-fullscreen')
          },
          /**
           * 全屏
           * @param $box
           */
          fullscreen: function ($box) {
            $box.toggleClass('box-fullscreen').removeClass('box-maximize')
          }
        }

        // $(selector).box('close/slide/max/fullscreen')
        //
        $.fn.box = $.fn.box || ($.fn.box = function (fnName, options) {
          if (fnName && box[fnName]) {
            box[fnName]($(this), options)
          }
        })

        // Close
        //
        $dom.off('click.box.close').on('click.box.close', '.box-btn-close', function () {
          var $this = $(this)
          box.close($this.parents('.box'), $this)
        })

        // Slide up/down
        //
        $dom.off('click.box.slide').on('click.box.slide', '.box-btn-slide', function () {
          var $this = $(this)
          box.slide($this.parents('.box'), $this)
        })

        // Maximize
        //
        $dom.off('click.box.max').on('click.box.max', '.box-btn-maximize', function () {
          var $this = $(this)
          box.max($this.parents('.box'), $this)
        })

        // Fullscreen
        //
        $dom.off('click.box.fullscreen').on('click.box.fullscreen', '.box-btn-fullscreen', function () {
          var $this = $(this)
          box.fullscreen($this.parents('.box'), $this)
        })
      },
      /**
       * radio
       * @param $dom
       */
      radio: function ($dom) {
        $dom = ready.tools.defaultDom($dom, 'input:radio')
        // 给radio自动添加id，并给label设置for
        $dom.each(function (idx) {
          var $this = $(this)
          var $label = $this.next('label')
          var id = $this.attr('id')
          if (!id) {
            id = 'radio-auto-' + idx
            $this.attr('id', id)
          }
          if (!$label.attr('for')) {
            $label.attr('for', id)
          }
        })
      },
      /**
       * checkbox
       * @param $dom
       */
      checkbox: function ($dom) {
        $dom = ready.tools.defaultDom($dom, 'input:checkbox')
        // 给radio自动添加id，并给label设置for
        $dom.each(function (idx) {
          var $this = $(this)
          var $label = $this.next('label')
          var id = $this.attr('id')
          if (!id) {
            id = 'checkbox-auto-' + idx
            $this.attr('id', id)
          }
          if (!$label.attr('for')) {
            $label.attr('for', id)
          }
        })
      }
    },
    plugins: {
      /**
       * bootstrap - tooltip
       * @param $dom
       * @param options
       */
      tooltip: function ($dom, options) {
        return ready.tools.defaultDom($dom, '[data-toggle="tooltip"]').tooltip(options)
      },
      /**
       * 日期时间范围
       * @param $dom
       * @param options
       * @returns {*}
       */
      datetimeRange: function ($dom, options) {
        return ready.tools.executePlugin(
          ready.tools.defaultDom($dom, '.datetimeRange-picker'),
          'daterangepicker',
          $.extend(true, {
            timePicker: true,
            timePicker24Hour: true,
            locale: $.extend({}, DATETIME_RANGE_LOCALE, {
              format: 'YYYY/MM/DD HH:mm'
            })
          }, options),
          'data-options-datetimeRange'
        )
      },
      /**
       * 日期范围
       * @param $dom
       * @param options
       * @returns {*}
       */
      dateRange: function ($dom, options) {
        return ready.tools.executePlugin(
          ready.tools.defaultDom($dom, '.dateRange-picker'),
          'daterangepicker',
          $.extend(true, {
            autoApply: true,
            locale: DATETIME_RANGE_LOCALE
          }, options),
          'data-options-dateRange'
        )
      },
      /**
       * 日期时间
       * @param $dom
       * @param options
       * @returns {*}
       */
      datetime: function ($dom, options) {
        return ready.tools.executePlugin(
          ready.tools.defaultDom($dom, '.datetime-picker'),
          'daterangepicker',
          $.extend(true, {
            singleDatePicker: true,
            timePicker: true,
            timePicker24Hour: true,
            locale: $.extend({}, DATETIME_RANGE_LOCALE, {
              format: 'YYYY/MM/DD HH:mm'
            })
          }, options),
          'data-options-datetime'
        )
      },
      /**
       * 日期
       * @param $dom
       * @param options
       * @returns {*}
       */
      date: function ($dom, options) {
        return ready.tools.executePlugin(
          ready.tools.defaultDom($dom, '.date-picker'),
          'daterangepicker',
          $.extend(true, {
            singleDatePicker: true,
            autoApply: true,
            locale: DATETIME_RANGE_LOCALE
          }, options),
          'data-options-date'
        )
      },
      /**
       * 时间
       * @param $dom
       * @param options
       * @returns {*}
       */
      time: function ($dom, options) {
        return ready.tools.executePlugin(
          ready.tools.defaultDom($dom, '.time-picker'),
          'timepicker',
          $.extend(true, {
            showMeridian: false,
            minuteStep: 5,
            defaultTime: false
          }, options),
          'data-options-time'
        )
      },
      /**
       * 格式化输入
       * @param $dom
       * @param options
       * @returns {*}
       */
      formatter: function ($dom, options) {
        return ready.tools.executePlugin(
          ready.tools.defaultDom($dom, '.formatter-picker'),
          'formatter',
          $.extend(true, {
            persistent: true
          }, options),
          'data-options-formatter'
        )
      },
      /**
       * select2
       * @param $dom
       * @param options
       * @returns {*}
       */
      select2: function ($dom, options) {
        return ready.tools.executePlugin(
          ready.tools.defaultDom($dom, '.select2-picker'),
          'select2',
          options,
          'data-options-select2'
        )
      }
    },
    /**
     * 初始化组件
     * @param names
     */
    initComponents: function (names) {
      ready.tools.initFromNames(names, ready.components)
    },
    /**
     * 初始化插件
     * @param names
     */
    initPlugins: function (names) {
      ready.tools.initFromNames(names, ready.plugins)
    },
    init: function (pluginNames) {

      // components
      //
      ready.initComponents(['radio', 'checkbox'])

      // plugins
      //
      ready.initPlugins(pluginNames)

      // Disable demonstrative links!
      //
      $(document).on('click', 'a[href="#"]', function (e) {
        e.preventDefault()
      })
    }
  })

}((window.ready || (window.ready = {}))))