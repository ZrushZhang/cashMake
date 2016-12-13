/**
 * Created by ziranzhang on 06/12/2016.
 */

$(document).ready(function () {

    // add new data in Form
    $(document).on("click", "button#bankSave", function () {

        var data = $('#bankform').serialize();
        $.ajax({

            type: 'POST',
            url: 'http://127.0.0.1:5000/operations/bank',
            data: data,
            dataType: 'json',
            success: function (response) {

                $.each(response, function (key, value) {

                    if (key.toLocaleLowerCase() == "result") {
                        $.each(value, function (key, value) {

                            console.log(value);
                            if (key.toLocaleLowerCase() == "status") {

                                if (value.toLocaleLowerCase() == "true") {
                                    alert("保存成功");
                                    $("#bankModal").modal("hide");
                                    $("#bankRef").trigger("click");
                                } else {
                                    alert("保存失败");
                                }
                            }
                        })
                    }
                })
            },
            error: function (xhr, type) {

                alert("服务器通信出现异常");
            }
        });

        // refresh data table: sending 'GET' request and get json data
        $("#bankTable").DataTable().ajax.reload();
    });

    $(document).on("click", "button#bankDel", function () {

        var data = {};
        $("[name='checkbox'][checked]").each(function () {

            data["id" + $(this).val()] = $(this).val();
        });

        //$.modal.confirm('确实要删除此用户吗?', function () {
        $.ajax({

            type: 'DELETE',
            url: 'http://127.0.0.1:5000/operations/bank',
            data: data,
            dataType: 'json',
            success: function (response) {

                console.log("data====>%s", data);
                $.each(response, function (key, value) {

                    if (key.toLocaleLowerCase() == "result") {
                        $.each(value, function (key, value) {

                            console.log(value);
                            if (key.toLocaleLowerCase() == "status") {
                                if (value.toLocaleLowerCase() == 'true') {
                                    alert('删除成功!');
                                    start = $("#bankTable").dataTable().fnSettings()._iDisplayStart;
                                    total = $("#bankTable").dataTable().fnSettings().fnRecordsDisplay();
                                    window.location.reload();
                                    if ((total - start) == 1) {
                                        if (start > 0) {
                                            $("#bankTable").dataTable().fnPageChange('previous', true);
                                        }
                                    }
                                }
                            }
                        })
                    }
                })
            },
            error: function () {
                alert('服务器无响应，请联系管理员!');
            }
        });
        //}
    });
    //});
    $(document).on("click", "input#bankBox", function () {

        if ($(this).attr("checked")){

            console.log("unchecked");
            $(this).removeAttr("checked");
        } else {

            console.log("checked");
            $(this).attr("checked", "true");
        }
    });

    $(document).on("click", "input#bankAll_1", function () {

        if ($(this).attr("checked")) {

            $("#bankAll_1").removeAttr("checked");
            $("[name=checkbox]:checkbox").each(function () { //遍历每一个复选框

                $(this).removeAttr("checked"); //js方法
            });

        } else {

            $("#bankAll_1").attr("checked", true);
            $("[name=checkbox]:checkbox").each(function () { //遍历每一个复选框

                $(this).prop("checked", "true");
            });
        }
    });

    $(document).on("click", "button#bankChange", function () {

        var checkbox = $("[name='checkbox'][checked]");
        var data = $('#bankform').serialize();
        var id = checkbox.val();
        var url = 'http://127.0.0.1:5000/operations/bank/' + id;

        console.log("data: %s, url: %s", data, url);

        $.ajax({

            type: 'PUT',
            url: url,
            data: data,
            dataType: 'json',
            success: function (response) {

                $.each(response, function (key, value) {

                    if (key.toLocaleLowerCase() == "result") {
                        $.each(value, function (key, value) {

                            console.log(value);
                            if (key.toLocaleLowerCase() == "status") {

                                if (value.toLocaleLowerCase() == "true") {
                                    alert("保存成功");
                                    $("#bankModal").modal("hide");
                                    $("#bankRef").trigger("click");
                                } else {
                                    alert("保存失败");
                                }
                            }
                        })
                    }
                })
            },
            error: function (xhr, type) {

                alert("服务器通信出现异常");
            }
        });

        // refresh data table: sending 'GET' request and get json data
        $("#bankTable").DataTable().ajax.reload();
    });


});

/*$(function () {

    var bankTable = $("#bankTable");

    bankTable.find("tbody").on("click", "tr", function () {

        if ($(this).hasClass("selected")) {

            $(this).removeClass("selected");
        } else {
            //table.$('tr.selected').removeClass('selected');
            $(this).addClass("selected");
        }
    });
});*/

function loadModal(obj, idCol) {

    var bankTable = $("#bankTable");
    var bankCity = $("[name=bankCity] option");
    var bankName = $("[name=bankName] option");
    var bankAddress = $("[name=bankAddress]");

    if (obj.id == "bankAdd") {

        // control button
        $("#bankSave").show();
        $("#bankChange").hide();

        bankCity[0].selected = true;
        bankName[0].selected = true;
        bankAddress.val("");

        $('#bankModal').modal('show');

        console.log("bankAdd trigger");

    } else if (obj.id == "bankUpd") {

        var checkbox = $("[name='checkbox'][checked]");
        var size = checkbox.size();

        console.log("size : %s",size);
        if (size == 0){

            alert('你需要选中修改项');
            return;
        } else if (size > 1){

            alert('修改项不能为多个');
            return;
        }

        // control button
        $("#bankSave").hide();
        $("#bankChange").show();

        console.log("bankUpd trigger,idCol=%s", idCol);

        var dataRows = bankTable.dataTable().fnGetNodes();
        for (i = 0; i < dataRows.length; i++) {

            var row = bankTable.dataTable().fnGetData(dataRows[i]);
            console.log("city:%s,name:%s,address=%s", row.city, row.name, row.address);
            if (row.id == idCol) {

                var count = bankCity.length;
                console.log("count=%s",count);
                for (var i = 0; i < count; i++) {

                    if (bankCity[i].text == row.city) {
                        bankCity[i].selected = true;
                        break;
                    }
                }

                count = bankName.length;
                for (i = 0; i < count; i++) {

                    if (bankName[i].text == row.name) {
                        bankName[i].selected = true;
                        break;
                    }
                }
                bankAddress.val(row.address);

                break;
            }

        }

        $('#bankModal').modal('show');

    } else {

        alert("内部发生错误，请联系管理员");
    }
}