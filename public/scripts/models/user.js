'use strict';
var app = app || {};

// local
// const __API_URL__ = 'http://localhost:3737';
// staging
const __API_URL__ = 'https://d29forum-server-staging.herokuapp.com';
// production
// const __API_URL__ = 'https://d29forum-server-production.herokuapp.com';
// const __API_URL__ = 'https://d29forum-sv.herokuapp.com';

(function(module) {
  const user = {};
  let currentUserId = localStorage.currentUserId || '';
  let currentUserName = localStorage.currentUserName || '';
  let currentUserNavatar = localStorage.currentUserNavatar || '';

  function User(obj) {
    for (var prop in obj) obj[prop] ? this[prop] = obj[prop] : this[prop] = null;
  }
  
  // POST
  User.prototype.insert = function() {
    // console.log('user. prototype.insert');
    $.ajax({
      url: `${__API_URL__}/api/db/users`,
      method: 'POST',
      data: {username: this.username},
      success: results => {
        console.log(this.username);
        console.log(results);
        if (results[0].username == this.username){
          console.log('success');
          var setLS = callback => {
            $('#modal1').toggleClass('is-visible');
            $('#modal3').toggleClass('is-visible');
            localStorage.currentUserId = results[0].id;
            localStorage.currentUserName = this.username;
            localStorage.currentUserNavatar = results[0].gravatar_hash;
            callback();
          };
          setLS(() => localStorage.deferredRoute ? page.show(localStorage.deferredRoute) : page.show('../'));
          // setLS(() => localStorage.deferredRoute ? page.show(localStorage.deferredRoute) : page.show('/'));
        }
      },
      error: err => {
        console.log(err.responseText);
        (err.responseText === '23505') ?
        User.usernameAlreadyExists(user.username) :
        page.show('/error');
      }
    })
  };

  User.usernameAlreadyExists = function(usersname) {
    $('#modal2').toggleClass('is-visible');
    $('#userNameEntered').text(username);
  }

  // handlebars template for user profile
  User.prototype.toHtml = function() {
    var template = Handlebars.compile($('#user-profile-template').text());
    return template(this);
  }

  // 3rd - maps user from constructor to tamplate and appends it to html
  User.renderCurrent = (ctx, next) => {
      $('#userProfile').empty();
      ctx.currentUser.map(user => $('#userProfile').append(user.toHtml()));
      $('#editProfileButton').attr('href', `/user/${ctx.params.username}/edit`)
      // next();
  }

  // 2ND - takes the individual result and maps it to  the new User constructor
  User.loadCurrent = (ctx, next) => {
      ctx.currentUser = ctx.results.map(userObject => new User(userObject));
      next();
  }
  // 1st - user api call
  User.prototype.fetch = (ctx, next) => {
    $.get(`${__API_URL__}/api/db/users/${ctx.params.username}`)
      .then(results => {
        ctx.results = results;
        next();
      });
  }

  User.login = function(user) {
    // console.log(user);
    $.ajax({
      url: `${__API_URL__}/api/db/users/${user.username}`,
      method: 'GET',
      success: results => {
          var setLS = callback => {
            localStorage.currentUserId = results[0].id;
            localStorage.currentUserName = results[0].username;
            localStorage.currentUserNavatar = results[0].gravatar_hash;
            callback();
          };
          setLS(() => localStorage.deferredRoute ? page.show(localStorage.deferredRoute) : page.show('../'));
      },
      error: err => {
        console.log(err.responseText);
        (err.responseText === 'User does not exist') ?
        User.userIdNotFound(user.username) :
        errorView.init(err.responseText);
      }
    });
  }

  User.userIdNotFound = function(usersname) {
    $('#modal1').toggleClass('is-visible');
    $('#userNameEntered').text(user);
    $('#modalCreateUserButton').on('click', ()=> {
      let user = new app.User({username: usersname});
      user.insert();
    })
  }
  
  User.updateProfileTemplate = (ctx, next) => {
    $('#editUsername').val(ctx.currentUser[0].username);
    $('#editEmail').val(ctx.currentUser[0].email);
    $('#editFirst_name').val(ctx.currentUser[0].first_name);
    $('#editLast_name').val(ctx.currentUser[0].last_name);
    $('#editGravatar_hash').val(ctx.currentUser[0].gravatar_hash);
    $('#editInterests').val(ctx.currentUser[0].interests);
  }

// CALCULATE GRAVITAR HASH

  User.prototype.calcGavitarHash = function (ctx) {
    ctx = ctx.toLowerCase();
    ctx = ctx.trim();
    var hash = md5(ctx);
    return(hash);
  }

  User.prototype.update = function() {

    var gravitarHash = User.prototype.calcGavitarHash( $('#editEmail').val())

    let user = new app.User({
        username: $('#editUsername').val(),
        email: $('#editEmail').val(),
        first_name: $('#editFirst_name').val(),
        last_name: $('#editLast_name').val(),
        gravatar_hash: gravitarHash, 
        interests: $('#editInterests').val()
    });

    $.ajax({
      url: `${__API_URL__}/api/db/users/${currentUserName}`,
      method: 'PUT',
      data: {first_name: user.first_name, last_name: user.last_name, email: user.email,
        username: user.username, interests: user.interests, gravatar_hash:  user.gravatar_hash},
      success: results => {
        // console.log(results, results.username, results.gravatar_hash);
        localStorage.currentUserName = results.username;
        localStorage.currentUserNavatar = results.gravatar_hash;
        currentUserName = results.username;
        page.show(`/user/${results.username}`);
      },
      //error: app.errorView.init,
    });
  }

  User.prototype.delete = function() {
      $.ajax({
        url: `${__API_URL__}/api/db/users/${currentUserName}`,
        method: 'DELETE',
        success: () => {
          localStorage.clear();
          page.show('/');
        }
        //error: app.errorView.init,
      })

  }

  //Checks if user is logged In
  User.currentUserCheck = function(ctx, next) {
    console.log('cur user check');
    if(localStorage.currentUserId) {
      $('.notLoggedIn').addClass('hidden');
      $('#loggedInUser').attr('href', `/user/${localStorage.currentUserName}`).text(`${localStorage.currentUserName}'s Profile`);
      $('#navatarImageLink').attr('href', `/user/${localStorage.currentUserName}`);
      $('#navatarImage').attr('src', `https://www.gravatar.com/avatar/${localStorage.currentUserNavatar}`);
      $('.loggedIn').removeClass('hidden');
      localStorage.currentUserNavatar ? $('.userContainer').removeClass('hidden') : $('.userContainer').addClass('hidden');
      $('#logoutButton').on('click', () => {
        currentUserId = null;
        currentUserName = null;
        localStorage.clear();
        page.show('/');
      });
      // if(localStorage.currentUserNavatar) {
      //   $('.userContainer').removeClass('hidden');
      //   console.log('yes');
      // }
      // else {
      //   $('.userContainer').addClass('hidden');
      //   console.log('no');
      // }
      
    }
    else {
      $('.notLoggedIn').removeClass('hidden');
      $('.loggedIn').addClass('hidden');
    }
    next();
  }

  module.User = User;
})(app);
