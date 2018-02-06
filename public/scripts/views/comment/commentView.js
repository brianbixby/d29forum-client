'use strict';

(function(module) {
    const commentView = {};

    commentView.init = function(ctx, next) {
        $('.view').addClass('hidden');
        $('.commentView').removeClass('hidden');
        $('#signup').off();
        $('#newUserForm').off();
        $('#signup').on('click', function(e) {
            e.preventDefault();
            $('#modal3').toggleClass('is-visible');
            $('#newUserForm').on('submit', app.newUserView.submit);
        });
        next();
    }
    
    module.commentView = commentView;
})(app);
