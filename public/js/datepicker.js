    /*----------------------------------
    //------ DATE PICKER ------//
    -----------------------------------*/
    $('input[name="datepicker-here"]').daterangepicker({
        autoUpdateInput: false,
        parentEl: $(".date-container"),
        singleDatePicker: true,
        locale: {
            cancelLabel: 'Clear'
        }
    });
    $('input[name="datepicker-here-time"]').daterangepicker({
        autoUpdateInput: false,
        parentEl: $(".date-container2"),
        singleDatePicker: true,
        timePicker: true,
        locale: {
            cancelLabel: 'Clear'
        }
    });
    $('input[name="datepicker-here-time"]').on('apply.daterangepicker', function (ev, picker) {
        $(this).val(picker.startDate.format('MM/DD/YYYY hh:mm A'));
    });
    $('input[name="datepicker-here-time"]').on('cancel.daterangepicker', function (ev, picker) {
        $(this).val('');
    });
    $('input[name="datepicker-here"]').on('apply.daterangepicker', function (ev, picker) {
        $(this).val(picker.startDate.format('MM/DD/YYYY'));
    });
    $('input[name="datepicker-here"]').on('cancel.daterangepicker', function (ev, picker) {
        $(this).val('');
    });
    $('input[name="dates"]').daterangepicker({
        autoUpdateInput: false,
        parentEl: $(".date-container3"),
        locale: {
            cancelLabel: 'Clear'
        }
    });
    $('input[name="dates"]').on('apply.daterangepicker', function (ev, picker) {
        $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
    });
    $('input[name="dates"]').on('cancel.daterangepicker', function (ev, picker) {
        $(this).val('');
    });