function getReport(isKureColumnView) {
    $(document).ready(function () {
        $('#test_result').DataTable({
            "ajax": "json/TestResults.json",
            "columns": [
                {"data": "Kure"},
                {"data": "Status"},
                {"data": "TestClassName"},
                {"data": "TestMethod"},
                {"data": "StackTrace"},
                {"data": "TagName"},
                {"data": "DisplayName"},
                {"data": "TestTime"}
            ],
            "columnDefs": [
                {
                    "targets": [0],
                    "visible": isKureColumnView,
                }
            ]
        });
    });
}

function getDisabledKureColumnWithReport() {
    getReport(false);
}

function filterTable(kure) {
    $(document).ready(function () {
        var table = $("#test_result").DataTable();
        table.columns([0])
            .search(kure)
            .draw();
    });
}