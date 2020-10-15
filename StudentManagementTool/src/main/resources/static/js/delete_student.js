$(document).ready(function(){
    let studentId = 0;

    $(document).on("click", "#div_student_table table button.btn_delete", function() {
        let btn_id = (event.srcElement.id);
        studentId = btn_id.split("_")[2];

        $("div.modal-body")
            .text("Do you want delete a Student with id = " + studentId + " ?");
        $("#model-delete-btn").css({"display": "inline"});
    });

    $(document).on("click", "#model-delete-btn", function() {
        $.ajax({
            url: '/api/student/deletebyid/' + studentId,
            type: 'DELETE',
            success: function(response) {
                $("div.modal-body")
                    .text("Delete successfully a Student with id = " + studentId + "!");

                $("#model-delete-btn").css({"display": "none"});
                $("button.btn.btn-secondary").text("Close");

                let row_id = "tr_" + studentId;
                $("#" + row_id).remove();
                $("#div_student_updating").css({"display": "none"});
            },
            error: function(error){
                console.log(error);
                $("#div_student_updating").css({"display": "none"});
                alert("Error -> " + error);
            }
        });
    });
});