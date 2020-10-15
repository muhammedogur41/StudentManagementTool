$(document).ready(function(){
    (function(){
        $.ajax({
            type : "GET",
            url : "/api/student/retrieveinfos",
            success: function(response){
              $.each(response.students, (i, student) => {

              /*  <button type="button" class="btn btn-danger btn_delete" data-toggle="modal" data-target="#myModal">
                Open modal
              </button>*/

                let deleteButton = '<button ' +
                                        'id=' +
                                        '\"' + 'btn_delete_' + student.id + '\"'+
                                        ' type="button" class="btn btn-danger btn_delete" data-toggle="modal" data-target="#delete-modal"' +
                                        '>&times</button>';

                let get_More_Info_Btn = '<button' +
                                            ' id=' + '\"' + 'btn_id_' + student.id + '\"' +
                                            ' type="button" class="btn btn-info btn_id">' +
                    student.id +
                                            '</button>';
                
                let tr_id = 'tr_' + student.id;
                let studentRow = '<tr id=\"' + tr_id + "\"" + '>' +
                          '<td>' + get_More_Info_Btn + '</td>' +
                          '<td class=\"td_first_name\">' + student.firstname.toUpperCase() + '</td>' +
                          '<td class=\"td_lesson\">' + student.lesson + '</td>' +
                          '<td>' + deleteButton + '</td>' +
                          '</tr>';                
                $('#studentTable tbody').append(studentRow);
              });
            },
            error : function(e) {
              alert("ERROR: ", e);
              console.log("ERROR: ", e);
            }
        });
    })();        
    
    (function(){
        let pathname = window.location.pathname;
        if (pathname == "/students.html") {
            $(".nav .nav-item a:last").addClass("active");
        }
    })();
});