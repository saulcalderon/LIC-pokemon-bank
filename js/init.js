(function ($) {
  $(function () {
    $('.sidenav').sidenav();
    $('.parallax').parallax();

    if (window.location.pathname === '/index.html') {
      const user = {
        name: 'Ash Ketchum',
        pin: '1234',
        noAccount: '0987654321',
        balance: 500.0,
        transactions: [],
      };

      localStorage.setItem('user', JSON.stringify(user));
    }

    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user'));
      $('.bienvenida').text(`Bienvenido/a ${user.name}`);
      $('.no-cuenta').text(`Nº cuenta: ${user.noAccount}`);
      $('.balance-general').text(`Balance general: $${user.balance}`);
    }
  }); // end of document ready

  // information about the user
  const user = JSON.parse(localStorage.getItem('user'));
  $('#name').text(user.name);
  $('.no-cuenta').text(user.noAccount);
  $('.balance-general').text(user.balance);

  // Logic for the login page
  $('#btn-login').click(function () {
    const user = JSON.parse(localStorage.getItem('user'));

    const userValue = $('#user-input').val();
    const pinValue = $('#pin').val();

    if (!userValue || !pinValue) {
      swal(
        'Campos de entrada vacíos',
        'Uno o más campos están vacíos, por favor inténtelo de nuevo.',
        'warning'
      );
      return;
    }

    if (userValue === user.name && pinValue === user.pin) {
      swal('Bienvenido', '', 'success').then(() => {
        window.location.href = 'menu.html';
      });
      return;
    }

    swal('Usuario o PIN incorrecto', 'Por favor inténtelo de nuevo.', 'error');
  });

  // Logic for add money buttons
  $('#btn-add-25').click(function () {
    if (window.location.pathname === '/deposit.html') {
      $('#deposit-money-input').val(25);
    }

    if (window.location.pathname === '/withdraw.html') {
      $('#withdraw-money-input').val(25);
    }
  });

  $('#btn-add-50').click(function () {
    if (window.location.pathname === '/deposit.html') {
      $('#deposit-money-input').val(50);
    }

    if (window.location.pathname === '/withdraw.html') {
      $('#withdraw-money-input').val(50);
    }
  });

  $('#btn-add-100').click(function () {
    if (window.location.pathname === '/deposit.html') {
      $('#deposit-money-input').val(100);
    }

    if (window.location.pathname === '/withdraw.html') {
      $('#withdraw-money-input').val(100);
    }
  });

  $('#btn-add-200').click(function () {
    if (window.location.pathname === '/deposit.html') {
      $('#deposit-money-input').val(200);
    }

    if (window.location.pathname === '/withdraw.html') {
      $('#withdraw-money-input').val(200);
    }
  });

  $('.money-input').keypress(function (evt) {
    evt = evt || window.event;
    const charCode = evt.which || evt.keyCode;
    const charStr = String.fromCharCode(charCode);
    if (charStr === '-') return false;
    if (charStr === 'e') return false;
    if (charStr === 'E') return false;
  });

  // TODO: prevent user from entering more than 2 digits
  // $('.money-input').keydown(function (evt) {
  //   if (window.location.pathname === '/deposit.html') {
  //     const depositMoneyInput = $('#deposit-money-input').val()
  //     console.log(depositMoneyInput);

  //   }

  //   if (window.location.pathname === '/withdraw.html') {
  //     $('#withdraw-money-input').val(100);
  //   }
  // });

  // Logic for the deposit button in deposit.html
  $('#btn-deposit').click(function () {
    let depositMoneyInput = $('#deposit-money-input').val();
    if (!depositMoneyInput) {
      swal(
        'Campo vacío',
        'El campo del monto a depositar esta vacío, por favor inténtelo de nuevo.',
        'warning'
      );
      return;
    }

    depositMoneyInput = parseFloat(depositMoneyInput).toFixed(2);

    const user = JSON.parse(localStorage.getItem('user'));
    const newBalance = parseFloat(user.balance) + parseFloat(depositMoneyInput);
    user.balance = newBalance;
    user.transactions.push({
      type: 'deposit',
      amount: parseFloat(depositMoneyInput),
      date: new Date(),
    });
    localStorage.setItem('user', JSON.stringify(user));

    swal(
      'Depósito exitoso',
      `El depósito por la cantidad de $${depositMoneyInput} fue exitoso.`,
      'success'
    ).then(() => {
      window.location.href = 'menu.html';
    });
  });

  // Logic for the withdraw button in withdraw.html
  $('#btn-withdraw').click(function () {
    let withdrawMoneyInput = $('#withdraw-money-input').val();
    if (!withdrawMoneyInput) {
      swal(
        'Campo vacío',
        'El campo del monto a retirar esta vacío, por favor inténtelo de nuevo.',
        'warning'
      );
      return;
    }

    withdrawMoneyInput = parseFloat(withdrawMoneyInput).toFixed(2);

    const user = JSON.parse(localStorage.getItem('user'));
    const newBalance = parseFloat(user.balance) - parseFloat(withdrawMoneyInput);
    if (newBalance < 0) {
      swal(
        'Saldo insuficiente',
        'No tiene suficiente saldo para realizar esta operación.',
        'error'
      );
      return;
    }

    user.balance = newBalance;
    user.transactions.push({
      type: 'withdraw',
      amount: parseFloat(withdrawMoneyInput),
      date: new Date(),
    });
    localStorage.setItem('user', JSON.stringify(user));

    swal(
      'Retiro exitoso',
      `El retiro por la cantidad de $${withdrawMoneyInput} fue exitoso.`,
      'success'
    ).then(() => {
      window.location.href = 'menu.html';
    });
  });

  $('#btn-service-one').click(function () {
    swal('Digite el número único de la factura a pagar:', {
      closeOnClickOutside: false,
      content: 'input',
      buttons: {
        cancel: 'Cancelar',
        confirm: 'Siguiente',
      },
    }).then(() => {
      swal('Digite la cantidad a pagar en USD', {
        closeOnClickOutside: false,
        content: 'input',
        buttons: {
          cancel: 'Cancelar',
          confirm: 'Confirmar',
        },
      });
    });
  });

  //TODO: Add path validation to prevent null error in console
  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [
        {
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  const ctx2 = document.getElementById('myChart2').getContext('2d');
  const myChar2 = new Chart(ctx2, {
    type: 'pie',
    data: {
      labels: ['Red', 'Blue', 'Yellow'],
      datasets: [
        {
          label: 'My First Dataset',
          data: [300, 50, 100],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
          ],
          hoverOffset: 4,
        },
      ],
    },
  });
})(jQuery); // end of jQuery name space
