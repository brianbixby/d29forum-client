'use strict';

(function(module) {
    const userView = {};

    userView.init = function(ctx, next) {
        $('.view').addClass('hidden').find('*').off();
        $('.userView').removeClass('hidden');
        $('#signup').off();
        $('#newUserForm').off();
        $('#signup').on('click', function(e) {
            e.preventDefault();
            $('#modal3').toggleClass('is-visible');
            $('#newUserForm').on('submit', app.newUserView.submit);
        });
        next();
    }
    
    module.userView = userView;
})(app);
