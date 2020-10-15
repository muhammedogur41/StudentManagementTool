$(document).ready(function(){
    $("#update_student_form").submit(function(evt) {
        evt.preventDefault();
        try {
            let studentId = $("#student_id").val();

            // PREPARE FORM DATA
            let formData = {
                firstname : $("#student_first_name").val(),
                lastname :  $("#student_last_name").val(),
                lesson: $("#student_lesson").val(),
                lessonId: $("#student_lessonid").val()
            }
            
            $.ajax({
                url: '/api/student/updatebyid/' + studentId + "/",
                type: 'PUT',
                contentType : "application/json",
                data: JSON.stringify(formData),
                dataType : 'json',
                async: false,
                cache: false,
                success: function (response) {
                    let student = response.students[0];
                    let studentString = "{firstname:" + student.firstname +
                                                " ,lastname:" + student.lastname +
                                                ", lesson:" + student.lesson +
                                                ", lessonid:" + student.age  + "}"
                    let successAlert = '<div class="alert alert-success alert-dismissible">' + 
                                            '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
                                            '<strong>' + response.message + '</strong> Student\'s Info = ' + studentString;
                                        '</div>'

                    $("#tr_" + studentId + " td.td_first_name").text(student.firstname.toUpperCase());
                    $("#tr_" + studentId + " td.td_lesson").text(student.lesson.toUpperCase());

                    $("#response").empty();
                    $("#response").append(successAlert);
                    $("#response").css({"display": "block"});
                },

                error: function (response) {
                    let errorAlert = '<div class="alert alert-danger alert-dismissible">' + 
                                        '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
                                        '<strong>' + response.message + '</strong>' + ' ,Error: ' + message.error + 
                                    '</div>';

                    $("#response").empty();                                    
                    $("#response").append(errorAlert);
                    $("#response").css({"display": "block"});
                }
            });
        } catch(error){
            console.log(error);
            alert(error);
        }
    });

    $(document).on("click", "table button.btn_id", function(){
        let id_of_button = (event.srcElement.id);
        let studentId = id_of_button.split("_")[2];
  
        $.ajax({
            url: '/api/student/findone/' + studentId,
            type: 'GET',
            success: function(response) {
                let student = response.students[0];
                $("#student_id").val(student.id);
                $("#student_first_name").val(student.firstname);
                $("#student_last_name").val(student.lastname);
                $("#student_lesson").val(student.lesson);
                $("#student_lessonId").val(student.lessonId);
                $("#div_student_updating").css({"display": "block"});
            },
            error: function(error){
                console.log(error);
                alert("Error -> " + error);
            }
        });        
    });
});