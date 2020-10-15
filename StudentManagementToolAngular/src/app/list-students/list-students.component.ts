import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { MessageService } from '../message.service';
import { StudentService } from '../student.service';
import { Message } from '../message';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html'
})
export class ListStudentsComponent implements OnInit {

  students: Array<Student> = [];
  showStudent: Student;
  isSelected: boolean = false;
  deletedStudent: Student;
  returnedMessage: string;

  constructor(private studentService: StudentService,
                private messageService: MessageService) { }

  setStudentDetails(student: Student){
    this.isSelected=!this.isSelected;
    if(this.isSelected){
      this.showStudent = student;
    }else{
      this.showStudent = undefined;
    }
  }

  prepareDeleteStudent(deleteStudent: Student){
    this.deletedStudent = deleteStudent;
    this.returnedMessage = undefined;
  }

  deleteStudent(){
    this.studentService.deleteStudent(this.deletedStudent.id)
                      .subscribe((message: Message) => {
                          this.students = this.students.filter(student => {
                            return student.id != this.deletedStudent.id;
                          })
                          this.returnedMessage = message.message;
                          this.showStudent = undefined;
                          this.messageService.add(message.message);
                        },
                        (error) => {
                          let errMsg: string = "Error! Details: " + error;
                          this.messageService.add(errMsg);
                        });
  }

  updateStudent() {
    this.studentService.updateStudent(this.showStudent)
                      .subscribe((message: Message) => {
                        this.students.map(x => {
                          if(x.id == this.showStudent.id){
                            x = this.showStudent;
                          }
                        });

                        let msg: string = "Update Successfully! -> New Student's properties: <br>"
                                          + "<ul>"
                                            + "<li>" + "id: " + this.showStudent.id + "</li>"
                                            + "<li>" + "firstname: " + this.showStudent.firstname + "</li>"
                                            + "<li>" +  "lastname: " + this.showStudent.lastname + "</li>"
                                            + "<li>" +  "lesson id: " + this.showStudent.lessonId + "</li>"
                                            + "<li>" +  "lesson: " + this.showStudent.lesson + "</li>"
                                          + "</ul>";
                        this.messageService.add(msg);
                      }
                      , (error) => {
                        let errMsg = "Update Fail ! Error = " + error;
                        this.messageService.add(errMsg);
                      });
  }

  retrieveAllStudents() {
    this.studentService.retrieveAllStudent()
                  .subscribe((message: Message) => {
                    this.students = message.students;
                  }
                  , (error) => {
                    let errMsg = "Update Fail ! Error = " + error;
                    this.messageService.add(errMsg);
                  });
  }

  ngOnInit(): void {
    this.retrieveAllStudents();
  }
}
