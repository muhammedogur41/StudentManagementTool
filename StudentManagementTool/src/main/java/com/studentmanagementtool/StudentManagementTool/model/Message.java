package com.studentmanagementtool.StudentManagementTool.model;

import java.util.ArrayList;
import java.util.List;

public class Message {
    private String message = "";
    private List<Student> students = new ArrayList<Student>();
    private String error = "";

    public Message(String message, List<Student> students, String error) {
        this.message = message;
        this.students = students;
        this.error = error;
    }

    public String getMessage() {
        return this.message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public List<Student> getStudentss(){
        return this.students;
    }

    public void setStudents(ArrayList<Student> students) {
        this.students = students;
    }

    public void setError(String error) {
        this.error = error;
    }

    public String getError() {
        return this.error;
    }
}