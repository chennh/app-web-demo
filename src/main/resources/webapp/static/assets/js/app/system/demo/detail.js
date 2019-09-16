;(function (global) {

  vueReady.initDirectives()

  new Vue({
    el: '#app',
    mixins: [global['detailMixin']]
  })

}((0, eval)('this')))