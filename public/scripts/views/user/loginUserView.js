'use strict';

(function(module) {
    const loginUserView = {};

    loginUserView.init = function(ctx, next) {
        if (localStorage.waitingComment) page.show(localStorage.waitingThread)
        $('.view').addClass('hidden').find('*').off();
        $('.loginUserView').removeClass('hidden');
        $('#signup').off();
        $('#newUserForm').off();
        $('#signup').on('click', function(e) {
            e.preventDefault();
            $('#modal3').toggleClass('is-visible');
            $('#newUserForm').on('submit', app.newUserView.submit);
        });
        $('#userLoginForm').on('submit', loginUserView.submit);
    }

    loginUserView.submit = e => {
        e.preventDefault();
        let user = {
            username: e.target.usernameLogin.value,
        };
        // console.log(user);
        app.User.login(user);
    }
    
    module.loginUserView = loginUserView;
})(app);


