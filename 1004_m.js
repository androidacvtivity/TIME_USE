// capitol=10004 — autosumă col1 către Total_1, ID-uri cu punct (D.01)
var from = "";

$(document).ready(function () {
    from = $("#formDenShort").val();

    // Calcul inițial
    f_Capitol_1004_col1();

    // Un singur handler delegat: prinde și câmpurile dinamice
    $(document).on("input change", "input:not([type='button']):not([readonly]):not([disabled])", function () {
        f_Capitol_1004_col1();
    });
});

function f_Capitol_1004_col1() {
    // Câmpul total (verifică să existe exact acest ID în DOM)
    var totalEl = document.getElementById("102_10004_111507_Total_1");
    var sum = 0;

    // Listează rândurile ce intră în total (CU punct – exact cum apar în DOM!)
    var rowIDs = ['D.01', 'D.02', 'D.03', 'D.04','1.6-2-CMPA'];

    rowIDs.forEach(function (rowID) {
        var mdid = getMDID(rowID); // mapare cu chei conținând punctul
        if (!mdid || mdid === "UNKNOWN_MDID") return;

        // Construim ID-ul exact cum e în DOM, inclusiv punctul
        var id = "102_10004_" + mdid + "_" + rowID + "_1";
        var el = document.getElementById(id);
        if (!el || el.readOnly || el.disabled) return;

        var v = parseInt((el.value || "").trim(), 10);
        if (!isNaN(v)) sum += v;
    });

    if (totalEl) {
        totalEl.readOnly = true;
        totalEl.value = (sum === 0 ? "" : sum);
    }
}

// Mapare MDID — cheile sunt CU punct (exact 'D.01', 'D.02', ...)
function getMDID(rowID) {
    var mdidMapping = {
        'D.01': '84666',
        'D.02': '84667',
        'D.03': '84669',
        'D.04': '84668',
        '1.6-2-CMPA': '85323'
        // adaugă restul aici: 'D.05': 'xxxxx', etc.
    };
    return mdidMapping[rowID] || "UNKNOWN_MDID";
}
