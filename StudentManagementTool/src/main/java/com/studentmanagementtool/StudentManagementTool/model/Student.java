package com.studentmanagementtool.StudentManagementTool.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name="student")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column
    private String firstname;

    @Column
    private String lastname;

    @Column
    private String lesson;

    @Column
    private int lessonId;

    public void setId(long id) {
        this.id = id;
    }

    public long getId() {
        return this.id;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getFirstname() {
        return this.firstname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getLastname() {
        return this.lastname;
    }

    public void setLesson(String lesson) {
        this.lesson = lesson;
    }

    public String getLesson() {
        return this.lesson;
    }

    public void setLessonId(int age) {
        this.lessonId = age;
    }

    public int getLessonId() {
        return this.lessonId;
    }

    protected Student() {}

    public Student(String firstname, String lastname, String lesson, int lessonId) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.lesson = lesson;
        this.lessonId = lessonId;
    }

    public String toString() {
        return String.format("id=%d, firstname='%s', lastname'%s', lesson=%s, lessonId=%d",
                id, firstname, lastname, lesson, lessonId);
    }
}
