$(document).ready(function() {
    $("#add_new_student").submit(function(evt) {
        evt.preventDefault();

        // PREPARE FORM DATA
        let formData = {
            firstname : $("#firstname").val(),
            lastname :  $("#lastname").val(),
            lesson: $("#lesson").val(),
            lessonId: $("#lessonId").val()
        }

        $.ajax({
            url: '/api/student/create',
            type: 'POST',
            contentType : "application/json",
            data: JSON.stringify(formData),
            dataType : 'json',
            async: false,
            cache: false,
            success: function (response) {
                let student = response.students[0];
                let studentString = "{ name: " + student.firstname + " " + student.lastname +
                                            ", lesson: " + student.lesson +
                                            ", lessonId: " + student.lessonId  + " }"
                let successAlert = '<div class="alert alert-success alert-dismissible">' + 
                                        '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
                                        '<strong>' + response.message + '</strong> Student\'s Info = ' + studentString;
                                    '</div>'
                $("#response").append(successAlert);
                $("#response").css({"display": "block"});

                resetUploadForm();
            },
            error: function (response) {
                let errorAlert = '<div class="alert alert-danger alert-dismissible">' + 
                                    '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
                                    '<strong>' + response.message + '</strong>' + ' ,Error: ' + message.error + 
                                '</div>'
                $("#response").append(errorAlert);
                $("#response").css({"display": "block"});

                resetUploadForm();
            }
        });
    });

    function resetUploadForm(){
        $("#firstname").val("");
        $("#lastname").val("");
        $("#lesson").val("");
        $("#lessonId").val("");
    }

    (function(){
        let pathname = window.location.pathname;
        if(pathname === "/"){
            $(".nav .nav-item a:first").addClass("active");
        } else if (pathname == "/students.html") {
            $(".nav .nav-item a:last").addClass("active");
        }
    })();
});
