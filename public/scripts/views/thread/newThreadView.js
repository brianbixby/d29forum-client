'use strict';

(function(module) {
    const newThreadView = {};

    newThreadView.init = function(ctx, next) {
      console.log('1');
        $('.view').addClass('hidden').find('*').off();
        if (localStorage.deferredRoute) {
          console.log('1');
          delete localStorage.deferredRoute;
        } else {
          console.log('1');
          $('.newThreadTitle').empty();
          $('.newThreadContent').empty();
        }
        $('#signup').off();
        $('#newUserForm').off();
        $('#signup').on('click', function(e) {
            e.preventDefault();
            console.log('1');
            $('#modal3').toggleClass('is-visible');
            $('#newUserForm').on('submit', app.newUserView.submit);
        });
        $('.newThreadView header').empty();
        $('.newThreadView header').append(`<h3 class="bread-crumbs"><a href="/">D29 FORUM</a><span> > </span><a href="${window.location}">${ctx.params.subforum_title.toUpperCase()}</a><span> > </span><a href="${window.location}">NEW TOPIC</a></h3>`);
        $('.newThreadView').removeClass('hidden');

        $('.addThreadButton').on('click', () => {
          console.log('1');
          let newThread = new app.Thread({creator: localStorage.currentUserId, title: $('.newThreadTitle').val(), content: $('.newThreadContent').val(), subforum_parent: ctx.params.subforum_id});
          if (localStorage.currentUserId){
            console.log('1');
            newThread.insert();
          } 
          else {
            console.log('1');
            localStorage.deferredRoute = `/subfora/${ctx.params.subfora_id}/${ctx.params.subforum_title}/threads/new`;
            page.show('/login');
          }
        });
    }

    module.newThreadView = newThreadView;
})(app);
