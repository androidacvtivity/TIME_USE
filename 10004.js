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

