/**
 * Cookies
 *
 * Cookie is used for redirecting the user to the last used login
 */

var language = 'da'; // Default

// Redirect to login choice.
function redirectToLogin() {
  if ($.cookie('cookie_redirect') != undefined) {
    window.location.replace($.cookie('cookie_redirect') + window.location.search);
  }
}

function checkLoginSaved() {
  var savedLoginLink = $('.js-footer-saved-login');

  if ($.cookie('cookie_redirect') != undefined) {
    savedLoginLink.show();
  } else {
    savedLoginLink.hide();
  }

}

// Save login choice.
function saveLoginChoice(text) {
  $.cookie('cookie_redirect', window.location.pathname, { expires: 30, path: '/' });

  $('.js-cookie-message-saved').text(text);
}

// Delete login choice.
function deleteLoginChoice(text) {
  $.removeCookie('cookie_redirect', { path: '/' });

  $('.js-cookie-message-not-saved').text(text);
}

// Delete all cookies choice.
function deleteAllCookies(selector, text) {
  $.removeCookie('cookie_redirect', { path: '/' });
  $.removeCookie('cookie_hide_message', { path: '/' });

  if(selector) $(selector).text(text);
}

// Show a message if the user is redirected
function cookieMessage() {
  var cookieMessage = $('.js-cookie-message');
  var cookieMessageSaved = $('.js-cookie-message-saved');
  var cookieLoginMessageNotsaved = $('.js-cookie-message-not-saved');

  if ($.cookie('cookie_redirect') != undefined) {
    cookieMessageSaved.hide();
    cookieLoginMessageNotsaved.show();
  } else {
    cookieMessageSaved.show();
    cookieLoginMessageNotsaved.hide();
  }

  // Show the message container
  if ($.cookie('cookie_hide_message') != 1) {
    // Show the message.
    cookieMessage.show();
  }

  // Attach hide message function to link
  $('.js-hide-message').click(function() {
    $.cookie('cookie_hide_message', 1, { expires: 30, path: '/' });

    cookieMessage.hide();
    return false;
  });
}

/**
 * Function for show/hide password in input fields
 */

function showHidePassword(hideText, showText) {
  // Attach toggle password function.
  // URL: https://github.com/cloudfour/hideShowPassword.
  
  $('input[type="password"]').hideShowPassword({
      show: false,
      innerToggle: true,
      toggleClass: 'form--toggle-password',
      states: {
         shown: {
            toggleText: hideText // 'Skjul' 
          },
          hidden: {
            toggleText: showText // 'Vis'
          }
      }
  });
  

}

/**
 * Start the magic.
 */

$(document).ready(function() {

  // Get the sites language from global template
  // update Global variable
  language = $.cookie('tidyLanguage') == 'en' ? 'en' : 'da';
  
  var toogletext = { da : [ 'Skjul', 'Vis'], en : [ 'Hide', 'Show' ] };
  
  // Show/hide password.
  showHidePassword(toogletext[language][0], toogletext[language][1]);

  // Check if the user has saved login
  checkLoginSaved();

  // Handle login-choice
  if ( $('.js-cookie-message') ) {
    cookieMessage();

    // Save login choice
    $('.js-save-login-choice').click(function() {
      saveLoginChoice('Dit loginvalg er gemt');
      return false;
    });

    // Delete login choice
    $('.js-delete-login-choice').click(function() {
      deleteLoginChoice('Dit loginvalg er slettet');
      return false;
    });
  }

  // Handle link on cookies-page
  $('.js-delete-cookies-link').click(function() {
    deleteAllCookies('.js-delete-cookies', 'Cookies blev slettet');
    return false;
  });

  // Handle link in footer
  $('.js-footer-saved-login').click(function() {
    deleteAllCookies();
    return false;
  });
  
  // Handle toplink
  $('.js-toplink').click(function() {
    deleteAllCookies();
    window.location.replace('/auth/method/' + window.location.search);
    return false;
  });

});
