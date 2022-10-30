(function ($) {
  $(function () {
    $('.sidenav').sidenav();
    $('.parallax').parallax();
  }); // end of document ready

  $('#btn-login').click(function () {
    swal('Bienvenido', '', 'success').then((value) => {
      window.location.href = 'menu.html';
    });
  });

  $('#btn-deposit').click(function () {
    swal(
      'Depósito exitoso',
      'El depósito por la cantidad de $100 fue exitoso.',
      'success'
    ).then((value) => {
      window.location.href = 'menu.html';
    });
  });

  $('#btn-withdraw').click(function () {
    swal(
      'Retiro exitoso',
      'El retiro por la cantidad de $100 fue exitoso.',
      'success'
    ).then((value) => {
      window.location.href = 'menu.html';
    });
  });
})(jQuery); // end of jQuery name space
