"use strict";
// Class definition
var KTDatatablePlans = function () {
  // Private functions
  var options = {
    // datasource definition
    data: {
      type: 'remote',
      source: {
        read: {
          url: `${location.protocol}//${window.location.host}/agent/case/getall`,
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

    columns: [{
        field: 'image',
        title: 'Image',
        sortable: false,
        width: 100,
        template: function (row) {
          return '<image src = "' + `${location.protocol}//${window.location.host}/uploads/case/${row.fileName}` + '" height="80" width="80">';

        }
      },
      {
        field: 'caseNumber',
        title: 'Number',
        sortable: true,
        width: 100,
        // template: '{{title}}',
        template: function (row) {
          return row.caseNumber;

        }
      },
      {
        field: 'createDate',
        title: 'Date',
        sortable: true,
        width: 100,
        // template: '{{title}}',
        template: function (row) {
          return moment(row.createDate).format('YYYY-MM-DD');

        }
      },
      {
        field: 'name',
        title: 'Name',
        sortable: true,
        width: 150,
        // template: '{{title}}',
        template: function (row) {
          return row.first_name+' '+row.last_name+'<br>'+row.email+'<br>'+row.office_phone;

        }
      },
      {
        field: 'type',
        title: 'Type',
        sortable: true,
        width: 100,
        // template: '{{title}}',
        template: function (row) {
          return row.casetypes.title;

        }
      },
      {
        field: 'status',
        title: 'Status',
        width: 90,
        // callback function support for column rendering
        template: function (row) {
          var status = {
            "open": {
              'title': 'Open',
              'class': 'kt-badge--brand'
            },
            "inactive": {
              'title': 'Inactive',
              'class': ' kt-badge--danger'
            },
            "closed": {
              'title': 'Closed',
              'class': ' kt-badge--dark'
            },
            "re-opened": {
              'title': 'Re-opened',
              'class': ' kt-badge--primary'
            },
          };
          return '<span class="kt-badge ' + status[row.status].class +
            ' kt-badge--inline kt-badge--pill KTMembershipStatusUpdate onHover curserpointer" data-id="' + row._id + '" data-status="' + row.status + '">' + status[row.status].title +
            '</span>';
        },
      }, {
        field: 'Actions',
        title: 'Actions',
        sortable: false,
        width: 90,
        overflow: 'visible',
        textAlign: 'left',
        autoHide: false,
        template: function (row) {
          return '\
                    \<a href="' + location.protocol + "//" + window.location.host + '/agent/case/edit/' + row._id + '" class="btn btn-sm btn-clean btn-icon btn-icon-sm" title="Edit">\
                        <i class="flaticon-edit"></i>\
                    </a>\
                    \<a id="del-' + row._id + '" href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-sm ktDelete" title="Delete">\
                        <i class="flaticon-delete"></i>\
                    </a>\
                ';
        },
      }
    ],
  };

  // basic demo
  var planRecordSelection = function () {

    options.search = {
      input: $('#generalSearch'),
    };

    var datatable = $('#caseSelection').KTDatatable(options);

    $('#kt_form_status').on('change', function () {
      datatable.search($(this).val(), 'Status');
    });

    $('#kt_form_casTypeId').on('change', function () {
      datatable.search($(this).val(), 'Type');
    });
    

    $('#kt_form_status').selectpicker();

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
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then(function (result) {
        if (result.value) {
          window.location.href = `${location.protocol}//${window.location.host}/agent/case/delete/${elemID}`;
        }
      });
    });
    var inputOptionsPromise = new Promise(function (resolve) {
      // get your data and pass it to resolve()
      setTimeout(function () {
        resolve({
          'open': 'Open',
          'inactive': 'Inactive',
          'closed': 'Closed',
          're-opened': 'Re-opened'
        })
      }, 2000)
    })

    $(document).on('click', '.KTMembershipStatusUpdate', function () {
      var elemID = $(this).data('id');
      var elemStatus = $(this).data('status');
      swal.fire({
        title: 'Are you sure?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, change it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
        input: 'select',
        inputOptions: inputOptionsPromise,
        inputPlaceholder: 'Select status',
        inputValue:elemStatus
      }).then(function (result) {
        if (result.value) {
            $.ajax({
              url: `${location.protocol}//${window.location.host}/agent/case/status-change/${elemID}`,
              type: 'POST',
              data: {
                  caseStatus: result.value
              },
              success: function (response) {
                window.location.href = `http://${window.location.host}/agent/case/list`; 
              }
          });
        }
      });
    });
  };



  return {
    // public functions
    init: function () {
      planRecordSelection();
    },
  };
}();

jQuery(document).ready(function () {
  KTDatatablePlans.init();
});