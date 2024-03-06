async function getData() {
  const response = await fetch("http://localhost:3000/api/cultivos");
  const data = await response.json();
  return data;
}

getData().then((data) => {
  // Ordena los datos por fecha
  data.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

  const labels = data.map((item) => {
    const date = new Date(item.fecha);
    console.log("fecha seteada : ", date.toLocaleDateString());
    return date.toLocaleDateString();
  });
  const pesoData = data.map((item) => item.peso);
  const cantidadData = data.map((item) => item.cantidad);
  var ctx = document.getElementById("grafico").getContext("2d");

  var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

  gradientStroke.addColorStop(1, "rgba(72,72,176,0.2)");
  gradientStroke.addColorStop(0.2, "rgba(72,72,176,0.0)");
  gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors

  var data = {
    labels: labels, // Usa las etiquetas de tus datos
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
        data: pesoData, // Usa los datos de peso
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
        data: cantidadData, // Usa los datos de cantidad
      },
    ],
  };

  var gradientChartOptionsConfigurationWithTooltipPurple = {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
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
