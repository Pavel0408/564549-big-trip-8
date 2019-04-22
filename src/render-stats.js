import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

// Рассчитаем высоту канваса в зависимости от того, сколько данных в него будет передаваться
const BAR_HEIGHT = 55;

export const renderMoneyStats = (moneyLabels, moneyData) => {
  const moneyCtx = document.querySelector(`.statistic__money`);
  moneyCtx.height = BAR_HEIGHT * 6;

  const moneyChart = new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: moneyLabels,
      datasets: [
        {
          data: moneyData,
          backgroundColor: `#ffffff`,
          hoverBackgroundColor: `#ffffff`,
          anchor: `start`
        }
      ]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `€ ${val}`
        }
      },
      title: {
        display: true,
        text: `MONEY`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: `#000000`,
              padding: 5,
              fontSize: 13
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            barThickness: 44
          }
        ],
        xAxes: [
          {
            ticks: {
              display: false,
              beginAtZero: true
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            minBarLength: 50
          }
        ]
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });

  return moneyChart;
};

export const renderTransportStats = (transportLabels, transportData) => {
  const transportCtx = document.querySelector(`.statistic__transport`);
  transportCtx.height = BAR_HEIGHT * 4;

  const transportChart = new Chart(transportCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: transportLabels,
      datasets: [
        {
          data: transportData,
          backgroundColor: `#ffffff`,
          hoverBackgroundColor: `#ffffff`,
          anchor: `start`
        }
      ]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}x`
        }
      },
      title: {
        display: true,
        text: `TRANSPORT`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: `#000000`,
              padding: 5,
              fontSize: 13
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            barThickness: 44
          }
        ],
        xAxes: [
          {
            ticks: {
              display: false,
              beginAtZero: true
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            minBarLength: 50
          }
        ]
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });

  return transportChart;
};

export const renderTimeStats = (labels, times) => {
  const timeSpendCtx = document.querySelector(`.statistic__time-spend`);
  timeSpendCtx.height = BAR_HEIGHT * 6;

  const timeSpendChart = new Chart(timeSpendCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels,
      datasets: [
        {
          data: times,
          backgroundColor: `#ffffff`,
          hoverBackgroundColor: `#ffffff`,
          anchor: `start`
        }
      ]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}H`
        }
      },
      title: {
        display: true,
        text: `TIME SPENT`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: `#000000`,
              padding: 5,
              fontSize: 13
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            barThickness: 44
          }
        ],
        xAxes: [
          {
            ticks: {
              display: false,
              beginAtZero: true
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            minBarLength: 50
          }
        ]
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });

  return timeSpendChart;
};
