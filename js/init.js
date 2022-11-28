(function ($) {
  $(function () {
    $('.sidenav').sidenav();
    $('.parallax').parallax();

    // Custom logic for index page
    if (window.location.pathname === '/index.html') {
      // Definicion del usuario en el localStorage
      const user = {
        name: 'Ash Ketchum',
        pin: '1234',
        noAccount: '0987654321',
        balance: 500.0,
        transactions: [],
      };

      localStorage.setItem('user', JSON.stringify(user));
    }

    // Impresion de los datos del usuario en el DOM
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user'));
      $('.bienvenida').text(`Bienvenido/a ${user.name}`);
      $('.no-cuenta').text(`Nº cuenta: ${user.noAccount}`);
      $('.balance-general').text(`Balance general: $${user.balance}`);
    }

    // Custom logic for transactions page
    if (window.location.pathname === '/transactions.html') {
      const user = JSON.parse(localStorage.getItem('user'));
      const transactions = user.transactions;

      // Bar chart for different types of services
      let sumaDineroServiciosDeAgua = 0;
      let sumaDineroServiciosDeLuz = 0;
      let sumaDineroServiciosDeInternet = 0;

      // Collecting data for the bar chart
      transactions.forEach((transaction) => {
        if (transaction.type === 'service') {
          if (transaction.category === 'agua') {
            sumaDineroServiciosDeAgua += transaction.amount;
          }

          if (transaction.category === 'luz') {
            sumaDineroServiciosDeLuz += transaction.amount;
          }

          if (transaction.category === 'internet') {
            sumaDineroServiciosDeInternet += transaction.amount;
          }
        }
      });

      // Creating the bar chart
      const ctx = document.getElementById('myChart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: [
            'Servicio de Luz',
            'Servicio de Agua',
            'Servicio de Internet',
          ],
          datasets: [
            {
              label: 'Total de gastos en servicios',
              data: [
                sumaDineroServiciosDeLuz,
                sumaDineroServiciosDeAgua,
                sumaDineroServiciosDeInternet,
              ],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
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


      // Pie chart for different transaction types
      let sumaDineroDepositos = 0;
      let sumaDineroRetiros = 0;
      let sumaDineroServicios = 0;

      // Collecting data for the pie chart
      transactions.forEach((transaction) => {
        if (transaction.type === 'deposit') {
          sumaDineroDepositos += transaction.amount;
        }

        if (transaction.type === 'withdraw') {
          sumaDineroRetiros += transaction.amount;
        }

        if (transaction.type === 'service') {
          sumaDineroServicios += transaction.amount;
        }
      });

      // Creating the pie chart
      const ctx2 = document.getElementById('myChart2').getContext('2d');
      new Chart(ctx2, {
        type: 'pie',
        data: {
          labels: ['Depósitos', 'Retiros', 'Servicios'],
          datasets: [
            {
              label: 'Total de transacciones en USD',
              data: [
                sumaDineroDepositos,
                sumaDineroRetiros,
                sumaDineroServicios,
              ],
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
    }
  }); // end of document ready

  // information about the user
  const user = JSON.parse(localStorage.getItem('user'));
  $('#name').text(user.name);
  $('.no-cuenta').text(user.noAccount);
  $('.balance-general').text(user.balance);

  // Logic for the login page
  $('#btn-login').click(function () {
    // Logica para validacion del PIN
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

  // Button configuration for deposit and withdraw pages
  $('#btn-add-25').click(function () {
    if (window.location.pathname === '/deposit.html') {
      $('#deposit-money-input').val(25);
    }

    if (window.location.pathname === '/withdraw.html') {
      $('#withdraw-money-input').val(25);
    }
  });

  // Button configuration for deposit and withdraw pages
  $('#btn-add-50').click(function () {
    if (window.location.pathname === '/deposit.html') {
      $('#deposit-money-input').val(50);
    }

    if (window.location.pathname === '/withdraw.html') {
      $('#withdraw-money-input').val(50);
    }
  });

  // Button configuration for deposit and withdraw pages
  $('#btn-add-100').click(function () {
    if (window.location.pathname === '/deposit.html') {
      $('#deposit-money-input').val(100);
    }

    if (window.location.pathname === '/withdraw.html') {
      $('#withdraw-money-input').val(100);
    }
  });

  // Button configuration for deposit and withdraw pages
  $('#btn-add-200').click(function () {
    if (window.location.pathname === '/deposit.html') {
      $('#deposit-money-input').val(200);
    }

    if (window.location.pathname === '/withdraw.html') {
      $('#withdraw-money-input').val(200);
    }
  });

  // Function to validate money input
  function validateMoneyInput(evt) {
    evt = evt || window.event;
    const charCode = evt.which || evt.keyCode;
    const charStr = String.fromCharCode(charCode);
    if (charStr === '-') return false;
    if (charStr === 'e') return false;
    if (charStr === 'E') return false;
  }

  $('.money-input').keypress(validateMoneyInput);

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

    // Getting the user from local storage
    const user = JSON.parse(localStorage.getItem('user'));
    // Updating the user balance and saving it
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

    // Getting the user from local storage
    const user = JSON.parse(localStorage.getItem('user'));
    // Updating the user balance and saving it
    const newBalance =
      parseFloat(user.balance) - parseFloat(withdrawMoneyInput);
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

  // Logic for services buttons
  $('.btn-services').click(function (event) {
    swal('Digite el número único de la factura a pagar:', {
      closeOnClickOutside: false,
      content: {
        element: 'input',
        attributes: {
          placeholder: 'Número de factura',
          type: 'number',
        },
      },
      buttons: {
        cancel: 'Cancelar',
        confirm: 'Siguiente',
      },
    }).then((noBill) => {
      // Validaciones para el numero de factura
      if (
        isNaN(noBill) ||
        noBill.includes('e') ||
        noBill.includes('E') ||
        noBill.includes('-') ||
        noBill.includes('.') ||
        noBill === '0'
      ) {
        swal(
          'Valor inválido',
          'El número de factura debe ser un número, por favor inténtelo de nuevo.',
          'error'
        );
        return;
      }

      // Modal para ingresar el monto a pagar de la factura
      swal('Digite la cantidad a pagar en USD', {
        closeOnClickOutside: false,
        content: {
          element: 'input',
          attributes: {
            placeholder: 'Monto a pagar',
            type: 'number',
          },
        },
        buttons: {
          cancel: 'Cancelar',
          confirm: 'Confirmar',
        },
      }).then((value) => {
        // Validaciones para el monto a pagar
        if (
          isNaN(value) ||
          value.includes('e') ||
          value.includes('E') ||
          value.includes('-') ||
          value < 0.01
        ) {
          swal(
            'Valor inválido',
            'El valor del monto de la factura es inválido, por favor inténtelo de nuevo.',
            'error'
          );
          return;
        }

        value = parseFloat(value).toFixed(2);

        // Getting the user from local storage
        const user = JSON.parse(localStorage.getItem('user'));
        // Updating the user balance
        const newBalance = parseFloat(user.balance) - parseFloat(value);
        if (newBalance < 0) {
          swal(
            'Saldo insuficiente',
            'No tiene suficiente saldo para realizar esta operación.',
            'error'
          );
          return;
        }

        // Saving the transaction
        user.balance = newBalance;
        user.transactions.push({
          type: 'service',
          category: event.target.id,
          noBill,
          amount: parseFloat(value),
          date: new Date(),
        });
        localStorage.setItem('user', JSON.stringify(user));

        swal(
          'Pago exitoso',
          `El pago por la cantidad de $${value} fue exitoso.`,
          'success'
        ).then(() => {
          window.location.href = 'menu.html';
        });
      });
    });
  });
})(jQuery); // end of jQuery name space
