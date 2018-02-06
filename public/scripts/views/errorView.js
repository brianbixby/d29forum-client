'use strict';

(function(module) {
    const errorView = {};

    errorView.init = function(ctx, next) {
        $('.view').addClass('hidden').find('*').off();
        $('#signup').off();
        $('#newUserForm').off();
        $('#signup').on('click', function(e) {
            e.preventDefault();
            $('#modal3').toggleClass('is-visible');
            $('#newUserForm').on('submit', app.newUserView.submit);
        });
        $('.errorView').removeClass('hidden');
        // next();
    }
    
    module.errorView = errorView;
})(app);
