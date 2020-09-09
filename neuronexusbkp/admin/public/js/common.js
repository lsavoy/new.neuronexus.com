$(document).ready(function () {
    $("#isFollowup").click(function () {
        if ($(this).is(":checked")) {
            $("#followupDate").show();
        } else {
            $("#followupDate").hide();
        }
    });
});

// Publish Datepicker
$('#createDate,#followupDate').datepicker({
    format: 'yyyy-mm-dd',
    autoclose: true
});

$(document).on("change", "#brochures_file", function (event) {
    var ext = $(this).val().split('.').pop().toLowerCase();
    if ($.inArray(ext, ['pdf']) == -1) {
        $(this).val('');
        swal.fire({
            title: 'Please upload files having extensions:  .pdf ',
            // text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancel!',
            reverseButtons: true
        })
    } else {
        return true;

    }
});

$(document).on("change", "#catalog_file", function (event) {
    var ext = $(this).val().split('.').pop().toLowerCase();
    if ($.inArray(ext, ['pdf']) == -1) {
        $(this).val('');
        swal.fire({
            title: 'Please upload files having extensions:  .pdf ',
            // text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancel!',
            reverseButtons: true
        })

    } else {
        return true;

    }
});


$(document).on('click', '#image_del', function () {
    var elemID = $(this).data('pid');
    console.log(elemID);
    var elemImg = $(this).data('img');
    swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
    }).then(function (result) {
        if (result.value) {
            window.location.href = `${window.location.protocol}//${window.location.host}/admin/property/delete_image/${elemID}/${elemImg}/`;
        }
    });
});

