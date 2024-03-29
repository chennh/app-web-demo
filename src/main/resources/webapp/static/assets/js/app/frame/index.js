//[Master Javascript]

//Project:	Minimalelite Admin - Responsive Admin Template
//Primary use:	Minimalelite Admin - Responsive Admin Template

//should be included in all pages. It controls some layout


// Make sure jQuery has been loaded
if (typeof jQuery === 'undefined') {
  throw new Error('template requires jQuery')
}

// Layout()

//  Implements layout.
//  Fixes the layout height in case min-height fails.

//  @usage activated automatically upon window load.
//  Configure any options by passing data-option="value"
//  to the body tag.


+
  function ($) {
    'use strict'

    function debounce(fn, delayMilliseconds) {
      var timer = null
      return function () {
        if (timer) clearTimeout(timer)
        timer = setTimeout(function () {
          fn.apply(this, arguments)
        }, delayMilliseconds)
      }
    }

    var DataKey = 'minimalelite.layout'

    var Default = {
      slimscroll: true,
      resetHeight: true
    }

    var Selector = {
      wrapper: '.wrapper',
      contentWrapper: '.content-wrapper',
      layoutBoxed: '.layout-boxed',
      mainFooter: '.main-footer',
      mainHeader: '.main-header',
      sidebar: '.sidebar',
      controlSidebar: '.control-sidebar',
      fixed: '.fixed',
      sidebarMenu: '.sidebar-menu',
      logo: '.main-header .logo'
    }

    var ClassName = {
      fixed: 'fixed',
      holdTransition: 'hold-transition'
    }

    var Layout = function (options) {
      this.options = options
      this.bindedResize = false
      this.activate()
    }

    Layout.prototype.activate = function () {
      this.fix()
      this.fixSidebar()

      $('body').removeClass(ClassName.holdTransition)

      if (this.options.resetHeight) {
        $('body, html, ' + Selector.wrapper).css({
          'height': 'auto',
          'min-height': '100%'
        })
      }

      if (!this.bindedResize) {
        $(window).resize(debounce(function () {
          this.fix()
          this.fixSidebar()

          $(Selector.logo + ', ' + Selector.sidebar).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
            this.fix()
            this.fixSidebar()
          }.bind(this))
        }.bind(this), 1000))

        this.bindedResize = true
      }

      $(Selector.sidebarMenu).on('expanded.tree', function () {
        this.fix()
        this.fixSidebar()
      }.bind(this))

      $(Selector.sidebarMenu).on('collapsed.tree', function () {
        this.fix()
        this.fixSidebar()
      }.bind(this))
    }

    Layout.prototype.fix = function () {
      // Remove overflow from .wrapper if layout-boxed exists
      $(Selector.layoutBoxed + ' > ' + Selector.wrapper).css('overflow', 'hidden')

      // Get window height and the wrapper height
      var footerHeight = $(Selector.mainFooter).outerHeight() || 0
      var neg = $(Selector.mainHeader).outerHeight() + footerHeight
      var windowHeight = $(window).height()
      var sidebarHeight = $(Selector.sidebar).height() || 0

      // Set the min-height of the content and sidebar based on
      // the height of the document.
      if ($('body').hasClass(ClassName.fixed)) {
        $(Selector.contentWrapper).css('min-height', windowHeight - footerHeight)
      } else {
        var postSetHeight

        if (windowHeight >= sidebarHeight) {
          $(Selector.contentWrapper).css('min-height', windowHeight - neg)
          postSetHeight = windowHeight - neg
        } else {
          $(Selector.contentWrapper).css('min-height', sidebarHeight)
          postSetHeight = sidebarHeight
        }

        // Fix for the control sidebar height
        var $controlSidebar = $(Selector.controlSidebar)
        if (typeof $controlSidebar !== 'undefined') {
          if ($controlSidebar.height() > postSetHeight)
            $(Selector.contentWrapper).css('min-height', $controlSidebar.height())
        }
      }
    }

    Layout.prototype.fixSidebar = function () {
      // Make sure the body tag has the .fixed class
      if (!$('body').hasClass(ClassName.fixed)) {
        if (typeof $.fn.slimScroll !== 'undefined') {
          $(Selector.sidebar).slimScroll({
            destroy: true
          }).height('auto')
        }
        return
      }

      // Enable slimscroll for fixed layout
      if (this.options.slimscroll) {
        if (typeof $.fn.slimScroll !== 'undefined') {
          // Destroy if it exists
          $(Selector.sidebar).slimScroll({
            destroy: true
          }).height('auto')

          // Add slimscroll
          $(Selector.sidebar).slimScroll({
            height: ($(window).height() - $(Selector.mainHeader).height()) + 'px',
            color: 'rgba(0,0,0,0.2)',
            size: '3px'
          })
        }
      }
    }

    // Plugin Definition
    function Plugin(option) {
      return this.each(function () {
        var $this = $(this)
        var data = $this.data(DataKey)

        if (!data) {
          var options = $.extend({}, Default, $this.data(), typeof option === 'object' && option)
          $this.data(DataKey, (data = new Layout(options)))
        }

        if (typeof option == 'string') {
          if (typeof data[option] == 'undefined') {
            throw new Error('No method named ' + option)
          }
          data[option]()
        }
      })
    }

    var old = $.fn.layout

    $.fn.layout = Plugin
    $.fn.layout.Constuctor = Layout

    // No conflict mode
    $.fn.layout.noConflict = function () {
      $.fn.layout = old
      return this
    }

    // Layout DATA-API
    $(window).on('load', function () {
      Plugin.call($('body'))
    })
  }(jQuery) // End of use strict

/* PushMenu()
* Adds the push menu functionality to the sidebar.
*
* @usage: $('.btn').pushMenu(options)
*          or add [data-toggle="push-menu"] to any button
*          Pass any option as data-option="value"
*/
+
function ($) {
  'use strict'

  var DataKey = 'minimalelite.pushmenu'

  var Default = {
    collapseScreenSize: 767,
    expandOnHover: false,
    expandTransitionDelay: 200
  }

  var Selector = {
    collapsed: '.sidebar-collapse',
    open: '.sidebar-open',
    mainSidebar: '.main-sidebar',
    contentWrapper: '.content-wrapper',
    searchInput: '.sidebar-form .form-control',
    button: '[data-toggle="push-menu"]',
    mini: '.sidebar-mini',
    expanded: '.sidebar-expanded-on-hover',
    layoutFixed: '.fixed'
  }

  var ClassName = {
    collapsed: 'sidebar-collapse',
    open: 'sidebar-open',
    mini: 'sidebar-mini',
    expanded: 'sidebar-expanded-on-hover',
    expandFeature: 'sidebar-mini-expand-feature',
    layoutFixed: 'fixed'
  }

  var Event = {
    expanded: 'expanded.pushMenu',
    collapsed: 'collapsed.pushMenu'
  }

  // PushMenu Class Definition
  var PushMenu = function (options) {
    this.options = options
    this.init()
  }

  PushMenu.prototype.init = function () {
    if (this.options.expandOnHover ||
      ($('body').is(Selector.mini + Selector.layoutFixed))) {
      this.expandOnHover()
      $('body').addClass(ClassName.expandFeature)
    }

    $(Selector.contentWrapper).on(function () {
      // Enable hide menu when clicking on the content-wrapper on small screens
      if ($(window).width() <= this.options.collapseScreenSize && $('body').hasClass(ClassName.open)) {
        this.close()
      }
    }.bind(this))

    // __Fix for android devices
    $(Selector.searchInput).on(function (e) {
      e.stopPropagation()
    })
  }

  PushMenu.prototype.toggle = function () {
    var windowWidth = $(window).width()
    var isOpen = !$('body').hasClass(ClassName.collapsed)

    if (windowWidth <= this.options.collapseScreenSize) {
      isOpen = $('body').hasClass(ClassName.open)
    }

    if (!isOpen) {
      this.open()
    } else {
      this.close()
    }
  }

  PushMenu.prototype.open = function () {
    var windowWidth = $(window).width()

    if (windowWidth > this.options.collapseScreenSize) {
      $('body').removeClass(ClassName.collapsed)
        .trigger($.Event(Event.expanded))
    } else {
      $('body').addClass(ClassName.open)
        .trigger($.Event(Event.expanded))
    }
  }

  PushMenu.prototype.close = function () {
    var windowWidth = $(window).width()
    if (windowWidth > this.options.collapseScreenSize) {
      $('body').addClass(ClassName.collapsed)
        .trigger($.Event(Event.collapsed))
    } else {
      $('body').removeClass(ClassName.open + ' ' + ClassName.collapsed)
        .trigger($.Event(Event.collapsed))
    }
  }

  PushMenu.prototype.expandOnHover = function () {
    $(Selector.mainSidebar).hover(function () {
      if ($('body').is(Selector.mini + Selector.collapsed) &&
        $(window).width() > this.options.collapseScreenSize) {
        this.expand()
      }
    }.bind(this), function () {
      if ($('body').is(Selector.expanded)) {
        this.collapse()
      }
    }.bind(this))
  }

  PushMenu.prototype.expand = function () {
    setTimeout(function () {
      $('body').removeClass(ClassName.collapsed)
        .addClass(ClassName.expanded)
    }, this.options.expandTransitionDelay)
  }

  PushMenu.prototype.collapse = function () {
    setTimeout(function () {
      $('body').removeClass(ClassName.expanded)
        .addClass(ClassName.collapsed)
    }, this.options.expandTransitionDelay)
  }

  // PushMenu Plugin Definition
  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data = $this.data(DataKey)

      if (!data) {
        var options = $.extend({}, Default, $this.data(), typeof option === 'object' && option)
        $this.data(DataKey, (data = new PushMenu(options)))
      }

      if (option == 'toggle') data.toggle()
    })
  }

  var old = $.fn.pushMenu

  $.fn.pushMenu = Plugin
  $.fn.pushMenu.Constructor = PushMenu

  // No Conflict Mode
  $.fn.pushMenu.noConflict = function () {
    $.fn.pushMenu = old
    return this
  }

  // Data API
  $(document).on('click', Selector.button, function (e) {
    e.preventDefault()
    Plugin.call($(this), 'toggle')
  })
  $(window).on('load', function () {
    Plugin.call($(Selector.button))
  })
}(jQuery) // End of use strict


/* Tree()
 * Converts a nested list into a multilevel
 * tree view menu.
 *
 * @Usage: $('.my-menu').tree(options)
 *         or add [data-widget="tree"] to the ul element
 *         Pass any option as data-option="value"
 */
+
function ($) {
  'use strict'

  var DataKey = 'minimalelite.tree'

  var Default = {
    animationSpeed: 500,
    accordion: true,
    followLink: false,
    trigger: 'a'
  }

  var Selector = {
    tree: '.tree',
    treeview: '.treeview',
    treeviewMenu: '.treeview-menu',
    // open: '.menu-open, .active',
    li: 'li',
    data: '[data-widget="tree"]',
    active: '.active'
  }

  var ClassName = {
    // open: 'menu-open',
    tree: 'tree',
    active: 'active'
  }

  var Event = {
    collapsed: 'collapsed.tree',
    expanded: 'expanded.tree'
  }

  // Tree Class Definition
  var Tree = function (element, options) {
    this.element = element
    this.options = options

    $(this.element).addClass(ClassName.tree)

    this._setUpListeners()
  }

  Tree.prototype.toggle = function (link, event) {
    var parentLi = link.parent()
    var treeviewMenu = link.next(Selector.treeviewMenu)
    var isOpen = parentLi.hasClass(ClassName.active)

    if (!this.options.followLink && link.attr('href') == '#') {
      event.preventDefault()
    }

    if (isOpen) {
      this.collapse(treeviewMenu, parentLi)
    } else {
      this.expand(treeviewMenu, parentLi)
    }
  }

  Tree.prototype.expand = function (tree, parent) {
    var expandedEvent = $.Event(Event.expanded)

    if (this.options.accordion) {
      var openMenuLi = parent.siblings(Selector.active)
      var openTree = openMenuLi.children(Selector.treeviewMenu)
      this.collapse(openTree, openMenuLi)
    }

    if (tree.length) {
      tree.slideDown(this.options.animationSpeed, function () {
        parent.addClass(ClassName.active)
        tree.attr('style', '')
        $(this.element).trigger(expandedEvent)
      }.bind(this))
    } else {
      parent.addClass(ClassName.active)
    }
  }

  Tree.prototype.collapse = function (tree, parentLi) {
    var collapsedEvent = $.Event(Event.collapsed)

    if (tree.length) {
      tree.find(Selector.active).removeClass(ClassName.active)
      tree.slideUp(this.options.animationSpeed, function () {
        parentLi.removeClass(ClassName.active)
        tree.find(Selector.active + ' > ' + Selector.treeview).slideUp()
        $(this.element).trigger(collapsedEvent)
      }.bind(this))
    } else {
      parentLi.removeClass(ClassName.active)
    }
  }

  // Private

  Tree.prototype._setUpListeners = function () {
    var that = this

    $(this.element).on('click', this.options.trigger, function (event) {
      that.toggle($(this), event)
    })
  }

  // Plugin Definition
  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data = $this.data(DataKey)

      if (!data) {
        var options = $.extend({}, Default, $this.data(), typeof option === 'object' && option)
        $this.data(DataKey, new Tree($this, options))
      }
    })
  }

  var old = $.fn.tree

  $.fn.tree = Plugin
  $.fn.tree.Constructor = Tree

  // No Conflict Mode
  $.fn.tree.noConflict = function () {
    $.fn.tree = old
    return this
  }

  // Tree Data API
  $(window).on('load', function () {
    $(Selector.data).each(function () {
      Plugin.call($(this))
    })
  })

}(jQuery) // End of use strict

+
function ($) {

  // Disable demonstrative links!
  //
  $(document).on('click', 'a[href="#"]', function (e) {
    e.preventDefault()
  })

}(jQuery) // End of use strict