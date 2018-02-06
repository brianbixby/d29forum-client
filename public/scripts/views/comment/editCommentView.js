'use strict';
var app = app || {};

(function(module) {
    const editCommentView = {};

    editCommentView.init = function(comment) {
        //restore comments that were being edited but weren't saved
        var $editViews = $('.editCommentView');
        $editViews.prev().removeClass('hidden');
        $editViews.addClass('hidden').val($editViews.prev().text());

        var $comment = $(`div[data-comment-id="${comment.comment_id}"]`);
        var $content = $comment.find('.comment-content').next();
        $content.addClass('hidden');
        $comment.find('.editCommentView').removeClass('hidden');
        $('#signup').off();
        $('#newUserForm').off();
        $('#signup').on('click', function(e) {
            e.preventDefault();
            $('#modal3').toggleClass('is-visible');
            $('#newUserForm').on('submit', app.newUserView.submit);
        });
        //save button
        $comment.on('click', '.saveCommentButton', function() {
          $(this).off();
          comment.content = $comment.find('.editCommentTextArea').val();
          comment.update();
          $content.text(comment.content);
          $comment.find('.editCommentView').addClass('hidden');
          $content.removeClass('hidden');
        });

        //delete button
        $comment.on('click', '.deleteCommentButton', function() {
          comment.delete();
          $comment.remove();
        });
    }
    
    module.editCommentView = editCommentView;
})(app);
