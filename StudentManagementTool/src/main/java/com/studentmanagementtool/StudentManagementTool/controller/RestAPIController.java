package com.studentmanagementtool.StudentManagementTool.controller;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.studentmanagementtool.StudentManagementTool.model.Student;
import com.studentmanagementtool.StudentManagementTool.model.Message;
import com.studentmanagementtool.StudentManagementTool.service.StudentServices;


@RestController
@RequestMapping("/api/student")
public class RestAPIController {

    @Autowired
    StudentServices studentServices;

    @PostMapping("/create")
    public ResponseEntity<Message> addNewStudent(@RequestBody Student student) {
        try {
            Student returnedStudent = studentServices.saveStudent(student);

            return new ResponseEntity<Message>(new Message("Upload Successfully!",
                    Arrays.asList(returnedStudent), ""), HttpStatus.OK);
        }catch(Exception e) {
            return new ResponseEntity<Message>(new Message("Fail to post a new Student!",
                    null, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/retrieveinfos")
    public ResponseEntity<Message> retrieveStudentInfo() {

        try {
            List<Student> studentsInfos = studentServices.getStudentInfos();

            return new ResponseEntity<Message>(new Message("Get Students' Infos!",
                    studentsInfos, ""), HttpStatus.OK);
        }catch(Exception e) {
            return new ResponseEntity<Message>(new Message("Fail!",
                    null, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/findone/{id}")
    public ResponseEntity<Message> getStudentById(@PathVariable long id) {
        try {
            Optional<Student> optStudent = studentServices.getStudentById(id);

            if(optStudent.isPresent()) {
                return new ResponseEntity<Message>(new Message("Successfully! Retrieve a student by id = " + id,
                        Arrays.asList(optStudent.get()), ""), HttpStatus.OK);
            } else {
                return new ResponseEntity<Message>(new Message("Failure -> NOT Found a student by id = " + id,
                        null, ""), HttpStatus.NOT_FOUND);
            }
        }catch(Exception e) {
            return new ResponseEntity<Message>(new Message("Failure",
                    null, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/updatebyid/{id}")
    public ResponseEntity<Message> updateStudentById(@RequestBody Student _student,
                                                      @PathVariable long id) {
        try {
            if(studentServices.checkExistedStudent(id)) {
                Student student = studentServices.getStudentById(id).get();

                student.setFirstname(_student.getFirstname());
                student.setLastname(_student.getLastname());
                student.setLesson(_student.getLesson());
                student.setLessonId(_student.getLessonId());

                studentServices.updateStudent(student);

                return new ResponseEntity<Message>(new Message("Successfully! Updated a Student "
                        + "with id = " + id,
                        Arrays.asList(student), ""), HttpStatus.OK);
            }else {
                return new ResponseEntity<Message>(new Message("Failer! Can NOT Found a Student "
                        + "with id = " + id,
                        null, ""), HttpStatus.NOT_FOUND);
            }
        }catch(Exception e) {
            return new ResponseEntity<Message>(new Message("Failure",
                    null, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/deletebyid/{id}")
    public ResponseEntity<Message> deleteStudentById(@PathVariable long id) {
        try {
            if(studentServices.checkExistedStudent(id)) {
                studentServices.deleteStudentById(id);

                return new ResponseEntity<Message> (new Message("Successfully! Delete a Student with id = " + id,
                        null, ""), HttpStatus.OK);
            }else {
                return new ResponseEntity<Message>(new Message("Failer! Can NOT Found a Student "
                        + "with id = " + id, null, ""), HttpStatus.NOT_FOUND);
            }
        }catch(Exception e) {
            return new ResponseEntity<Message>(new Message("Failure",
                    null, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
