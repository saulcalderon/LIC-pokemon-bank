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
