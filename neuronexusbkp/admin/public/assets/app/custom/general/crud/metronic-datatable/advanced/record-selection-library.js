"use strict";
// Class definition
var KTDatatableLibrary = function () {
    // Private functions
    var options = {
        // datasource definition
        data: {
            type: 'remote',
            source: {
                read: {
                    url: `${window.location.protocol}//${window.location.host}/library/getall`,
                },
            },
            pageSize: 10,
            serverPaging: true,
            serverFiltering: true,
            serverSorting: true,
        },

        // layout definition
        layout: {
            scroll: true, // enable/disable datatable scroll both horizontal and
            // vertical when needed.
            height: 500, // datatable's body's fixed height
            footer: false // display/hide footer
        },

        // column sorting
        sortable: true,

        pagination: true,

        // columns definition

        columns: [
        {
            field: 'file_name',
            title: 'File Name',
            width: 180,
            template: function (row) {
                return row.file_name;
            },
        },
        {
            field: 'description',
            title: 'Description',
            template: function (row) {
                return row.description;
            }
        },
        {
            field: 'createdAt',
            title: 'Create Time',
            template: function (row) {
                let date = function dateFormat(fmt, date) {
                    let ret;
                    const opt = {
                        "Y+": date.getFullYear().toString(),        // 年
                        "m+": (date.getMonth() + 1).toString(),     // 月
                        "d+": date.getDate().toString(),            // 日
                        "H+": date.getHours().toString(),           // 时
                        "M+": date.getMinutes().toString(),         // 分
                        "S+": date.getSeconds().toString()          // 秒
                    };
                    for (let k in opt) {
                        ret = new RegExp("(" + k + ")").exec(fmt);
                        if (ret) {
                            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
                        };
                    };
                    return fmt;
                };
                return date('YYYY-mm-dd HH:MM:SS', new Date(row.createdAt));
            }
        },
        {
            field: 'Actions',
            title: 'Actions',
            sortable: false,
            width: 120,
            overflow: 'visible',
            textAlign: 'left',
            autoHide: false,
            template: function (row) {
                return '\
                    \<a href="'+row.file_path+'" class="btn btn-sm btn-clean btn-icon btn-icon-sm btn-address-copy" title="Copy">\
                        <i class="flaticon-share"></i>\
                    </a>\
                    \<a href="'+window.location.protocol+'//'+ window.location.host + '/library/edit/' + row._id + '" class="btn btn-sm btn-clean btn-icon btn-icon-sm" title="Edit">\
                        <i class="flaticon-edit"></i>\
                    </a>\
                    \<a id="del-'+ row._id + '" href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-sm ktDelete" title="Delete">\
                    <i class="flaticon-delete"></i>\
                </a>\
                ';
            },
        }
    ],
    };

    // basic demo
    var librarySelector = function () {
        options.search = {
            input: $('#generalSearch'),
        };

        var datatable = $('#libraryRecordSelection').KTDatatable(options);

        $('#kt_form_status').on('change', function () {
            datatable.search($(this).val(), 'Status');
        });

        $('#kt_form_type').on('change', function () {
            datatable.search($(this).val().toLowerCase(), 'Type');
        });

        $('#kt_form_status,#kt_form_type').selectpicker();

        datatable.on(
            'kt-datatable--on-check kt-datatable--on-uncheck kt-datatable--on-layout-updated',
            function (e) {
                var checkedNodes = datatable.rows('.kt-datatable__row--active').nodes();
                var count = checkedNodes.length;
                $('#kt_datatable_selected_number').html(count);
                if (count > 0) {
                    $('#kt_datatable_group_action_form').collapse('show');
                } else {
                    $('#kt_datatable_group_action_form').collapse('hide');
                }
            });

        $('#kt_modal_fetch_id').on('show.bs.modal', function (e) {
            var ids = datatable.rows('.kt-datatable__row--active').
                nodes().
                find('.kt-checkbox--single > [type="checkbox"]').
                map(function (i, chk) {
                    return $(chk).val();
                });
            var c = document.createDocumentFragment();
            for (var i = 0; i < ids.length; i++) {
                var li = document.createElement('li');
                li.setAttribute('data-id', ids[i]);
                li.innerHTML = 'Selected record ID: ' + ids[i];
                c.appendChild(li);
            }
            $(e.target).find('.kt-datatable_selected_ids').append(c);
        }).on('hide.bs.modal', function (e) {
            $(e.target).find('.kt-datatable_selected_ids').empty();
        });

        $(document).on('click', '.ktDelete', function () {
            var elemID = $(this).attr('id').replace('del-', '');
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
                    window.location.href = `${window.location.protocol}//${window.location.host}/library/delete/${elemID}`;
                }
            });
        });

        $(document).on('click', '.btn-address-copy', function (obj) {
            var tmpHrefDom = document.createElement('input');
            tmpHrefDom.value = $(this).attr('href');
            document.body.appendChild(tmpHrefDom);
            tmpHrefDom.select(); // 选择对象
            document.execCommand("Copy");
            tmpHrefDom.style.display='none';
            swal.fire({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
                type: 'success',
                title: 'Copy Successful.'
            })
            return false;
        });
    };

    return {
        init: function () {
            librarySelector();
        },
    };
}();

jQuery(document).ready(function () {
    KTDatatableLibrary.init();
});
