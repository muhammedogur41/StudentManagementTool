package com.studentmanagementtool.StudentManagementTool.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.studentmanagementtool.StudentManagementTool.model.Student;
import com.studentmanagementtool.StudentManagementTool.repository.StudentRepository;

@Service
public class StudentServices {

    @Autowired StudentRepository repository;

    public Student saveStudent(Student student) {
        return repository.save(student);
    }

    public List<Student> getStudentInfos(){
        return repository.findAll();
    }

    public Optional<Student> getStudentById(long id) {
        return repository.findById(id);
    }

    public boolean checkExistedStudent(long id) {
        if(repository.existsById((long) id)) {
            return true;
        }
        return false;
    }

    public Student updateStudent(Student student) {
        return repository.save(student);
    }

    public void deleteStudentById(long id) {
        repository.deleteById(id);
    }
}