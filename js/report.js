function getReport(isKureColumnView) {
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
            ],
            select: true,
        }
    );
}

function getDisabledKureColumnWithReport() {
    getReport(false);
}

function filterTable(kure) {
    $(document).ready(function () {

        var table = $("#test_result").DataTable();

        table.columns([0]).search(kure);
    });
}

function writeTestList() {
    $('#write-test-list').click(function () {

        var selectedItems = $('#test_result').DataTable();

        $.map(selectedItems.rows('.selected').data(), function (item) {

            var node = document.createElement("LI");

            var textnode = document.createTextNode(item.TestClassName.concat(".").concat(item.TestMethod));
            node.appendChild(textnode);

            document.getElementById("events").appendChild(node);
        });

    });
}