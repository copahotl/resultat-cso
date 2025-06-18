<script>
// Tri personnalisé : valeurs vides à la fin, robustes même si texte
$.fn.dataTable.ext.order['empty-last'] = function(settings, col) {
    return this.api().column(col, { order: 'index' }).nodes().map(function(td) {
        const val = $(td).text().trim();
        if (val === "") return Number.POSITIVE_INFINITY;

        const num = parseFloat(val.replace(',', '.'));
        return isNaN(num) ? val : num;
    });
};

function afficher(csvURL, sel) {
    $.get(csvURL, function(data) {
        const [header, ...rows] = data.trim().split('\n').map(r => r.split(','));

        // Adaptation automatique : chercher l'index de la colonne "Classement"
        const indexColonneTri = header.indexOf("Classement");

        $(sel).DataTable({
            data: rows,
            columns: header.map(h => ({ title: h })),
            responsive: true,
            paging: false,
            searching: true,
            info: false,
            order: indexColonneTri >= 0 ? [[indexColonneTri, 'asc']] : [],
            columnDefs: indexColonneTri >= 0 ? [{
                targets: indexColonneTri,
                orderDataType: 'empty-last'
            }] : []
        });
    });
}
</script>