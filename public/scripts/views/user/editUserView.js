'use strict';

(function(module) {
    const editUserView = {};

    editUserView.init = function(ctx, next) {
        $('.view').addClass('hidden').find('*').off();
        $('.editUserView').removeClass('hidden');
        $('#deleteProfileButton').on('click', app.User.prototype.delete);
        $('#signup').off();
        $('#newUserForm').off();
        $('#signup').on('click', function(e) {
            e.preventDefault();
            $('#modal3').toggleClass('is-visible');
            $('#newUserForm').on('submit', app.newUserView.submit);
        });
        $('#editButton').on('click', app.User.prototype.update);
        next();
    }
    
    module.editUserView = editUserView;
})(app);
