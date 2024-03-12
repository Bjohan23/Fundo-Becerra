async function getData() {
  const response = await fetch("https://api-fundo.onrender.com/api/cultivos");
  const data = await response.json();
  return data;
}

getData().then((data) => {
  // Obtener referencia al elemento select
  const select = document.getElementById("select");

  // Agregar evento de cambio al select
  select.addEventListener("change", function () {
    // Obtener el valor seleccionado de la categoría
    const categoriaSeleccionada = this.value;

    // Filtrar los datos según la categoría seleccionada
    const filteredData = data.filter(
      (item) => item.categoria_id == categoriaSeleccionada
    );

    // Procesar los datos filtrados de la misma manera que lo hacías anteriormente
    const groupedData = filteredData.reduce((accumulator, current) => {
      const date = current.fecha;
      if (!accumulator[date]) {
        accumulator[date] = {
          fecha: date,
          peso: 0,
          cantidad: 0,
        };
      }
      accumulator[date].peso += current.peso;
      accumulator[date].cantidad += current.cantidad;
      return accumulator;
    }, {});

    const aggregatedData = Object.values(groupedData);

    // Resto del código para generar el gráfico con los datos filtrados
    const labels = aggregatedData.map((item) => item.fecha);
    const pesoData = aggregatedData.map((item) => item.peso);
    const cantidadData = aggregatedData.map((item) => item.cantidad);

    var ctx = document.getElementById("grafico").getContext("2d");

    var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
    gradientStroke.addColorStop(1, "rgba(72,72,176,0.2)");
    gradientStroke.addColorStop(0.2, "rgba(72,72,176,0.0)");
    gradientStroke.addColorStop(0, "rgba(119,52,169,0)");

    var data = {
      labels: labels,
      datasets: [
        {
          label: "Peso Kg",
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: "#DCC13A",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#DCC13A",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#DCC13A",
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: pesoData,
        },
        {
          label: "Cantidad",
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: "#ab290f",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#ab290f",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#ab290f",
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: cantidadData,
        },
      ],
    };

    var gradientChartOptionsConfigurationWithTooltipPurple = {
      maintainAspectRatio: false,
      legend: { display: false },
      tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(29,140,248,0.0)",
              zeroLineColor: "transparent",
            },
            ticks: {
              suggestedMin: 60,
              suggestedMax: 120,
              padding: 20,
              fontColor: "#9a9a9a",
            },
          },
        ],
        xAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(220,53,69,0.1)",
              zeroLineColor: "transparent",
            },
            ticks: {
              padding: 20,
              fontColor: "#9a9a9a",
            },
          },
        ],
      },
    };

    var myChart = new Chart(ctx, {
      type: "line",
      data: data,
      options: gradientChartOptionsConfigurationWithTooltipPurple,
    });
  });
});
