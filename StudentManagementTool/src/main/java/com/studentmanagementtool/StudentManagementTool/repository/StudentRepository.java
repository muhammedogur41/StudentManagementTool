package com.studentmanagementtool.StudentManagementTool.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.studentmanagementtool.StudentManagementTool.model.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long>{

}
