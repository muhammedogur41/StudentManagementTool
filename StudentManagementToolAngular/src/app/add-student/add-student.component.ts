import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { StudentService } from '../student.service';
import { Message } from '../message';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html'
})
export class AddStudentComponent implements OnInit {
  student: Student;

  constructor(private studentService: StudentService,
                private messageService: MessageService) { }

  ngOnInit(): void {
    this.student = new Student();
  }

  save() {
    this.studentService.createStudent(this.student)
          .subscribe((message: Message) => {
            let student = message.students[0];
            let msg = "Success -> Post a Student: "
                + "<ul>"
                    + "<li>id: " + student.id + "</li>"
                    + "<li>firstname: " + student.firstname + "</li>"
                    + "<li>lastname: " + student.lastname + "</li>"
                    + "<li>lessonid: " + student.lessonId + "</li>"
                    + "<li>lesson: " + student.lesson + "</li>"
                + "</ul>";

            this.messageService.add(msg);
          }, error => {
            let msg = "Error! -> Action Posting a Student:"
                      + "<ul>"
                        + "<li>id = " + this.student.id + "</li>"
                        + "<li>firstname = " + this.student.firstname + "</li>"
                        + "<li>lastname = " + this.student.lastname + "</li>"
                        + "<li>lesson id = " + this.student.lessonId + "</li>"
                        + "<li>lesson = " + this.student.lesson + "</li>"
                      + "</ul>";

            this.messageService.add(msg);
          });
  }

  reset(){
    this.student = new Student();
  }


  onSubmit() {
    this.save();
    this.reset();
  }
}
