/**
 * Created by ziranzhang on 09/12/2016.
 */



/*$(document).ready(function () {
 editor = new $.fn.dataTable.Editor({
 ajax: "../php/staff.php",
 table: "#example",
 fields: [{
 label: "First name:",
 name: "first_name"
 }, {
 label: "Last name:",
 name: "last_name"
 }, {
 label: "Position:",
 name: "position"
 }, {
 label: "Office:",
 name: "office"
 }, {
 label: "Extension:",
 name: "extn"
 }, {
 label: "Start date:",
 name: "start_date",
 type: 'datetime'
 }, {
 label: "Salary:",
 name: "salary"
 }
 ]
 });

 var table = $('#example').DataTable({
 lengthChange: false,
 ajax: "../php/staff.php",
 columns: [
 {
 data: null, render: function (data, type, row) {
 // Combine the first and last names into a single table field
 return data.first_name + ' ' + data.last_name;
 }
 },
 {data: "position"},
 {data: "office"},
 {data: "extn"},
 {data: "start_date"},
 {data: "salary", render: $.fn.dataTable.render.number(',', '.', 0, '$')}
 ],
 select: true
 });

 // Display the buttons
 new $.fn.dataTable.Buttons(table, [
 {extend: "create", editor: editor},
 {extend: "edit", editor: editor},
 {extend: "remove", editor: editor}
 ]);

 table.buttons().container()
 .appendTo($('.col-sm-6:eq(0)', table.table().container()));
 });*/

$(document).ready(function () {

    var table = $('#bankTable').DataTable({

        "paging": true,
        "lengthChange": true,
        "searching": true,
//            "ordering": false,
        "info": true,
        "autoWidth": true,
        "processing": true,//保持加载提示
        "ajaxSource": "http://127.0.0.1:5000/operations/bank", // ajax features
        "serveSide": false,

        /* row selected */
       /* "rowCallBack": function(row, data){
            if ( $.inArray(data.DT_RowId, selected) !== -1 ) {
                $(row).addClass('selected');
            }
        },*/
        "select": true,
        /* fields in table */
        "columns": [
            {"data": "checkbox", name: "Checkbox", "orderable": false},
            {"data": "id", name: "Id", "orderable": true},
            {"data": "city", name: "City", "orderable": true},
            {"data": "name", name: "Name", "orderable": true},
            {"data": "address", name: "Address", "orderable": true},
            {"data": "options", name: "Options", "orderable": true}
        ],

        /* buttons for features */
        "fnServerData": function (sSource, aoData, fnCallback, oSettings) {

            console.log("sSource======>" + sSource);

            oSettings.jqXHR = $.ajax({

                "dataType": 'JSON',
                "type": "GET",
                "contentType": "application/json",
                "url": "operations/bank",
                "data": "",
                "success": function (response) {

                    console.log("response===>%s", response);
                    $.each(response, function (key, value) {

                        if (key.toLocaleLowerCase() == "result") {

                            console.log("result= %s", value);

                            $.each(value, function (key, value) {

                                if (key.toLocaleLowerCase() == "value") {

                                    oSettings.iDraw = oSettings.iDraw + 1;
                                    var data = {};
                                    data.aaData = value;
                                    var totalCounts = 3;

                                    data.iTotalRecords = totalCounts;
                                    data.iTotalDisplayRecords = totalCounts;
                                    data.sEcho = oSettings;
                                    fnCallback(data);
                                }
                            })
                        }
                    })
                },
                "error": function (response) {

                    console.log("failed for response");
                    var data = {};
                    data.aaData = [];
                    var totalCounts = 0;
                    data.iTotalRecords = totalCounts;
                    data.iTotalDisplayRecords = totalCounts;
                    data.sEcho = oSettings;
                    fnCallback(data);
                }
            })
        }
    });
});