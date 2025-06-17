function afficher(csvURL, sel) {
    $.get(csvURL, function(data) {
        const [header, ...rows] = data.trim().split('\n').map(r => r.split(','));
        $(sel).DataTable({
            data: rows,
            columns: header.map(h => ({ title: h })),
            responsive: true,
            paging: false,
            searching: true,
            info: false
        });
    });
}