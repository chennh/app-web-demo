;(function (global) {

    new Vue({
        el: '#app',
        data: function () {
            return {
                model: {
                    user: {
                        name: 'Admin'
                    }
                }
            }
        },
        created: function(){
            this.getUser();
        },
        methods: {
            logout: function () {
                 storage.cookie.macKey.remove();
                 storage.cookie.userInfo.remove();
                 location.assign('/web/login');
            },
            getUser: function () {
                if (storage.cookie.userInfo.get()) {
                    this.model.user = JSON.parse(storage.cookie.userInfo.get());
                }
            }
        }
    })

}((0, eval)('this')))
