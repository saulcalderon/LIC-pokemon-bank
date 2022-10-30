(function ($) {
  $(function () {
    $('.sidenav').sidenav();
    $('.parallax').parallax();
  }); // end of document ready

  $('#login-btn').click(function () {
    swal('Bienvenido', '', 'success').then((value) => {
      window.location.href = 'menu.html';
    });
  });
})(jQuery); // end of jQuery name space
