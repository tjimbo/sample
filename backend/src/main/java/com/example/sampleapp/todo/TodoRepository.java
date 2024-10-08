package com.example.sampleapp.todo;

import com.amazonaws.xray.spring.aop.XRayEnabled;
import org.springframework.data.jpa.repository.JpaRepository;

@XRayEnabled
public interface TodoRepository extends JpaRepository<Todo, Long> {
}
