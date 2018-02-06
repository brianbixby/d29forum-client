'use strict';

(function(module) {
    const subforumView = {};

    subforumView.init = function(ctx, next) {
        $('.view').addClass('hidden').find('*').off();
        $('.threadsContainer').empty();
        $('.subforumView').removeClass('hidden');
        $('#signup').off();
        $('#newUserForm').off();
        $('#signup').on('click', function(e) {
            e.preventDefault();
            $('#modal3').toggleClass('is-visible');
            $('#newUserForm').on('submit', app.newUserView.submit);
        });
        $('.threadsContainer').on('click', '.subforaAccordionToggle', subforumView.accordionControls);
        localStorage.banner ? $('.banner').addClass('hidden') : $('.banner').on('click', '.bannerCloseIconSpan', app.forumView.hideBanner);
        next();
    }

    subforumView.accordionControls = function() { 
        if($(this).parent().find('.lastCommenterRow').hasClass('randClass')) {
            $(this).parent().find('.lastCommenterRow').removeClass('randClass').addClass('hidden').slideToggle(500);
        }
        else {
            $('.threadsContainer').find('.randClass').removeClass('randClass').addClass('hidden').slideToggle(500);
            $(this).parent().find('.lastCommenterRow').addClass('randClass').slideToggle(500).removeClass('hidden');
        }
        if($(this).hasClass('openSubforumAccordion')) {
            $(this).removeClass('openSubforumAccordion');
        }
        else {
            $('.threadsContainer').find('.openSubforumAccordion').removeClass('openSubforumAccordion');
            $(this).addClass('openSubforumAccordion');
        }
    }
    
    module.subforumView = subforumView;
})(app);
