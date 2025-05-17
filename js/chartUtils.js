function buildChartConfig(labels, data, label) {
  return {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label,
        data,
        borderWidth: 2,
        tension: 0.25,
        fill: false
      }]
    },
    options: {
      scales: {
        y: { title: { display: true, text: 'Frequência de nascimentos' } }
      }
    }
  };
}

function buildDataset(label, data) {
  return {
    label,
    data,
    borderWidth: 2,
    tension: 0.25,
    fill: false
  };
}
