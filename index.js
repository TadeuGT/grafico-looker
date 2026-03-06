const dscc = require('@google/dscc');

// Função para carregar scripts externos (jQuery e DataTables)
function loadScript(url, callback) {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = url;
  script.onload = callback;
  document.head.appendChild(script);
}

// 1. Carrega jQuery (necessário para o DataTables)
loadScript("https://code.jquery.com/jquery-3.6.0.min.js", () => {
  // 2. Carrega o DataTables
  loadScript("https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js", () => {
    // 3. Subscreve aos dados do Looker
    dscc.subscribeToData(drawViz, {transform: dscc.tableTransform});
  });
});

function drawViz(data) {
  const container = document.getElementById('viz');
  container.innerHTML = '<table id="myTable" class="display" style="width:100%"></table>';

  // Transforma os dados do Looker para o formato do DataTables
  const columns = data.fields.all.map(field => ({ title: field.name }));
  const rows = data.tables.DEFAULT.map(row => {
    return data.fields.all.map(field => row[field.id]);
  });

  // Inicializa o DataTables
  $('#myTable').DataTable({
    data: rows,
    columns: columns,
    paging: true,
    searching: true,
    ordering: true,
    responsive: true,
    language: {
      url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/pt-BR.json' // Tradução para PT-BR
    }
  });
}