;(function (global) {

  vueReady.initDirectives()

  new Vue({
    el: '#app',
    mixins: [global['formMixin']],
    data: {
      model: {
        entity: {
          text: '',
          select: '',
          checkbox: [],
          radios: '',
          date: '',
          time: '',
          datetime: '',
          dateBegin: '',
          dateEnd: '',
          datetimeBegin: '',
          datetimeEnd: '',
          dateFormatter: '',
          timeFormatter: '',
          datetimeFormatter: '',
          percentFormatter: '',
          priceFormatter: ''
        },
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          img: ''
        },
        tab: 'default'
      }
    },
    mounted: function () {
      // this.success('success')
    }
  })

}((0, eval)('this')))