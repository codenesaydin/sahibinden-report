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
            "deferRender": true

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

    let bireyselPassedTest = 0;
    let bireyselFailedTest = 0;

    let kurumsalPassedCount = 0;
    let kurumsalFailedCount = 0;

    let alisverisPassedCount = 0;
    let alisverisFailedCount = 0;

    let aramaPassedCount = 0;
    let aramaFailedCount = 0;

    let finansPassedCount = 0;
    let finansFailedCount = 0;

    let ilanPassedCount = 0;
    let ilanFailedCount = 0;

    let reklamPassedCount = 0;
    let reklamFailedCount = 0;

    fetch(resourceJsonPath)
        .then(response => response.json())
        .then(data => {

            totalExecutedTest = data.data.length;

            data.data.forEach(each => {

                switch (each.Kure) {
                    case Kure.BIREYSEL:
                        if (each.Status === testStatus.PASSED) {
                            bireyselPassedTest += 1;
                        } else if (each.Status === testStatus.FAILED) {
                            bireyselFailedTest += 1;
                        }
                        break;
                    case Kure.KURUMSAL:
                        if (each.Status === testStatus.PASSED) {
                            kurumsalPassedCount += 1;
                        } else if (each.Status === testStatus.FAILED) {
                            kurumsalFailedCount += 1;
                        }
                        break;
                    case Kure.ALISVERIS:
                        if (each.Status === testStatus.PASSED) {
                            alisverisPassedCount += 1;
                        } else if (each.Status === testStatus.FAILED) {
                            alisverisFailedCount += 1;
                        }
                        break;
                    case Kure.ARAMA:
                        if (each.Status === testStatus.PASSED) {
                            aramaPassedCount += 1;
                        } else if (each.Status === testStatus.FAILED) {
                            aramaFailedCount += 1;
                        }
                        break;
                    case Kure.FINANS:
                        if (each.Status === testStatus.PASSED) {
                            finansPassedCount += 1;
                        } else if (each.Status === testStatus.FAILED) {
                            finansFailedCount += 1;
                        }
                        break;
                    case Kure.ILAN:
                        if (each.Status === testStatus.PASSED) {
                            ilanPassedCount += 1;
                        } else if (each.Status === testStatus.FAILED) {
                            ilanFailedCount += 1;
                        }
                        break;
                    case Kure.REKLAM:
                        if (each.Status === testStatus.PASSED) {
                            reklamPassedCount += 1;
                        } else if (each.Status === testStatus.FAILED) {
                            reklamFailedCount += 1;
                        }
                        break;

                    default:
                        throw new Error("Undefined Küre : " + each.Kure)
                }
            });

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

            //document.querySelector("#total-executed-test > a").textContent = totalExecutedTest;
            document.querySelector("#passed-test-count > a").textContent = passedTestCount;
            document.querySelector("#failed-test-count > a").textContent = failedTestCount;
            //document.querySelector("#disabled-test-count > a").textContent = disabledTestCount;

            document.querySelector("#bireysel-passed > a").textContent = bireyselPassedTest;
            document.querySelector("#bireysel-failed > a").textContent = bireyselFailedTest;

            document.querySelector("#kurumsal-passed > a").textContent = kurumsalPassedCount;
            document.querySelector("#kurumsal-failed > a").textContent = kurumsalFailedCount;

            document.querySelector("#finans-passed > a").textContent = finansPassedCount;
            document.querySelector("#finans-failed > a").textContent = finansFailedCount;

            document.querySelector("#alisveris-passed > a").textContent = alisverisPassedCount;
            document.querySelector("#alisveris-failed > a").textContent = alisverisFailedCount;

            document.querySelector("#arama-passed > a").textContent = aramaPassedCount;
            document.querySelector("#arama-failed > a").textContent = aramaFailedCount;

            document.querySelector("#ilan-passed > a").textContent = ilanPassedCount;
            document.querySelector("#ilan-failed > a").textContent = ilanFailedCount;

            document.querySelector("#reklam-passed > a").textContent = reklamPassedCount;
            document.querySelector("#reklam-failed > a").textContent = reklamFailedCount;
        });
}