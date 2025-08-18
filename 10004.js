var from = "";
$(document).ready(function () {
    // Initialize form variable
    from = $("#formDenShort").val();

    // Initial calculation
    f_Capitol_1004_col1();
  
    // Attach event listener to all input fields initially present
    $("input:not([type='button']):not([readonly]):not([disabled])").on("change", function (e) {
        f_Capitol_1004_col1();
        
    });

    // Use event delegation to handle dynamically added rows
    $(document).on("change", "input:not([type='button']):not([readonly]):not([disabled])", function (e) {
        f_Capitol_1004_col1();
       
    });
});

function f_Capitol_1004_col1() {
    // Variable declarations for each row in column 9
    var Total_1 = $("#102_10004_111507_Total_1");
    var sum_Total_1_C1 = 0;

    // List of row IDs excluding 500
    var rowIDs = [
        D.01, D.02, D.02, D.02
        
    ];

    // Iterate over each row ID to compute the sum
    rowIDs.forEach(function (rowID) {
        var variable = $("#102_10004_" + getMDID(rowID) + "_" + rowID + "_1");
        var value = parseInt(variable.val()) || 0;
        sum_Total_1_C1 += value;
    });

    // Set R500_C9 to be readonly
    Total_1.prop("readonly", true);

    // Update R500_C9 with the computed sum
    Total_1.val(sum_Total_1_C1 === 0 ? "" : sum_Total_1_C1);
}


// Complete mapping for MDID based on rowID
function getMDID(rowID) {
    var mdidMapping = {
        D.01: "84666", D.02: "84666", D.03: "84669", D.04: "84668"
       
    };
    return mdidMapping[rowID] || "UNKNOWN_MDID";
}


//Trebuie d efacut autosuma dupa exemplu capitol=1128&capitol_vers=2000.js - Diferenta est c anumele randurilor este cu punt , ID sunt fara punct 