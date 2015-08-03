$(function(){
    $("#upload").click(function(){
        $.ajax({
            url: "/upload",
            type: "post",
            dataType: "json",
            data: $("#inputupload").val(),
            success: function (json) {
                console.log(json)

            }
        });

    })
})