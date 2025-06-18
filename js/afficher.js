<script>
// Tri personnalisé : les valeurs vides vont à la fin
$.fn.dataTable.ext.order['empty-last'] = function(settings, col) {
    return this.api().column(col, { order: 'index' }).nodes().map(function(td) {
        let val = $(td).text().trim();
        return val === "" ? Number.POSITIVE_INFINITY : parseFloat(val);
    });
};

function afficher(csvURL, sel) {
    $.get(csvURL, function(data) {
        const [header, ...rows] = data.trim().split('\n').map(r => r.split(','));

        // Exemple : colonne "Classement" = 3e colonne => index 2 (0-based)
        const indexColonneTri = 3; // adapte ceci si nécessaire

        $(sel).DataTable({
            data: rows,
            columns: header.map(h => ({ title: h })),
            responsive: true,
            paging: false,
            searching: true,
            info: false,
            order: [[indexColonneTri, 'asc']],
            columnDefs: [
                {
                    targets: indexColonneTri,
                    orderDataType: 'empty-last'
                }
            ]
        });
    });
}
</script>