let resourceJsonPath = "json/TestResults.json";

function getReport(isKureColumnView) {
    $('#test_result').DataTable({
            "ajax": resourceJsonPath,
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

function createDisabledKureColumnWithReport() {
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

function setReportInfo() {

    let totalExecutedTest = 0;
    let passedTestCount = 0;
    let failedTestCount = 0;
    let disabledTestCount = 0;

    fetch(resourceJsonPath)
        .then(response => response.json())
        .then(data => {

            totalExecutedTest = data.data.length;

            data.data.forEach(each => {

                switch (each.Status) {
                    case testStatus.PASSED:
                        passedTestCount += 1;
                        break;
                    case testStatus.FAILED:
                        failedTestCount += 1;
                        break;
                    case testStatus.IGNORED:
                        disabledTestCount += 1;
                        break;

                    default:
                        throw new Error("Undefined Status : " + each.Status)
                }
            });

            document.querySelector("#total-executed-test > a").textContent = totalExecutedTest;
            document.querySelector("#passed-test-count > a").textContent = passedTestCount;
            document.querySelector("#failed-test-count > a").textContent = failedTestCount;
            document.querySelector("#disabled-test-count > a").textContent = disabledTestCount;
        });
}