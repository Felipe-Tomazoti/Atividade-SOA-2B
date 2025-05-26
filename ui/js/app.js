document.addEventListener('DOMContentLoaded', () => {
  const navButtons = document.querySelectorAll('nav button');
  const sections   = document.querySelectorAll('section');

  navButtons.forEach(button => {
    button.addEventListener('click', () => handleTabSwitch(button, sections));
  });

  document.getElementById('btnEvolucao').addEventListener('click', handleEvolutionChart);
  document.getElementById('btnTop3').addEventListener('click', handleTop3ByUF);
  document.getElementById('btnComparar').addEventListener('click', handleNameComparison);
});

function handleTabSwitch(button, sections) {
  sections.forEach(sec => sec.style.display = 'none');
  const targetSectionId = button.dataset.aba;
  document.getElementById(targetSectionId).style.display = 'block';
}

function extractDecadeFromPeriod(periodString) {
  const years = periodString.match(/\d{4}/g);
  return years ? Number(years[years.length - 1]) : null;
}

let evolutionChartInstance = null;
async function handleEvolutionChart() {
  const nameInput   = document.getElementById('nome1').value.trim().toLowerCase();
  const startDecade = parseInt(document.getElementById('deDec').value, 10);
  const endDecade   = parseInt(document.getElementById('ateDec').value, 10);

  if (!nameInput) {
    alert('Digite um nome.');
    return;
  }
  if (startDecade > endDecade) {
    alert('A década inicial deve ser ≤ à final.');
    return;
  }

  try {
    const apiUrl = `/api/nomes/${encodeURIComponent(nameInput)}?de=${startDecade}&ate=${endDecade}`;
    const responseObj = await (await fetch(apiUrl)).json();

    const decades = [];
    for (let d = startDecade; d <= endDecade; d += 10) decades.push(d);

    const frequencyByDecade = Object.fromEntries(decades.map(d => [d, 0]));
    responseObj.res.forEach(record => {
      const decade = extractDecadeFromPeriod(record.periodo);
      if (decade !== null && decade >= startDecade && decade <= endDecade) {
        frequencyByDecade[decade] = record.frequencia;
      }
    });

    const labels = decades.map(d => `${d}s`);
    const data   = decades.map(d => frequencyByDecade[d]);

    if (evolutionChartInstance) evolutionChartInstance.destroy();

    evolutionChartInstance = new Chart(
      document.getElementById('graficoEvolucao'),
      buildChartConfig(labels, data, `Frequência do nome ${nameInput.toUpperCase()}`)
    );
  } catch (err) {
    console.error(err);
    alert('Erro ao buscar dados. Tente novamente.');
  }
}

async function handleTop3ByUF() {
  const selectedUF = document.getElementById('uf').value;
  const tableBody  = document.getElementById('tabelaTop3');
  tableBody.innerHTML = '';

  for (let decade = 1930; decade <= 2020; decade += 10) {
    const rankingUrl = `/api/ranking?uf=${selectedUF}&decada=${decade}`;
    const rankingObj = await (await fetch(rankingUrl)).json();

    const top3Names = rankingObj.res.slice(0, 3).map(entry => entry.nome || '-');
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${decade}</td>
      <td>${top3Names[0] || '-'}</td>
      <td>${top3Names[1] || '-'}</td>
      <td>${top3Names[2] || '-'}</td>
    `;
    tableBody.appendChild(row);
  }
}

let comparisonChartInstance = null;
async function handleNameComparison() {
  const firstName  = document.getElementById('nomeA').value.trim().toLowerCase();
  const secondName = document.getElementById('nomeB').value.trim().toLowerCase();
  if (!firstName || !secondName) {
    alert('Preencha ambos os nomes.');
    return;
  }

  try {
    const compareUrl = `/api/comparacao?nomeA=${encodeURIComponent(firstName)}&nomeB=${encodeURIComponent(secondName)}`;
    const results   = await (await fetch(compareUrl)).json();

    const dataFirst  = results.find(o => o.nome.toLowerCase() === firstName).res;
    const dataSecond = results.find(o => o.nome.toLowerCase() === secondName).res;

    const labels = dataFirst.map(r => extractDecadeFromPeriod(r.periodo) + 's');
    const data1  = dataFirst .map(r => r.frequencia);
    const data2  = dataSecond.map(r => r.frequencia);

    if (comparisonChartInstance) comparisonChartInstance.destroy();

    comparisonChartInstance = new Chart(
      document.getElementById('graficoComparacao'),
      {
        type: 'line',
        data: {
          labels,
          datasets: [
            buildDataset(firstName.toUpperCase(), data1),
            buildDataset(secondName.toUpperCase(), data2),
          ]
        },
        options: {
          scales: { y: { title: { display: true, text: 'Frequência de nascimentos' } } }
        }
      }
    );
  } catch (err) {
    console.error(err);
    alert('Erro ao comparar nomes. Tente novamente.');
  }
}

function buildChartConfig(labels, data, label) {
  return {
    type: 'line',
    data: { labels, datasets: [{ label, data, borderWidth: 2, tension: 0.25, fill: false }] },
    options: { scales: { y: { title: { display: true, text: 'Frequência de nascimentos' } } } }
  };
}
function buildDataset(label, data) { return { label, data, borderWidth: 2, tension: 0.25, fill: false }; }
