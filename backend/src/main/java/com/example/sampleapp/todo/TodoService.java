package com.example.sampleapp.todo;

import com.amazonaws.xray.spring.aop.XRayEnabled;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@XRayEnabled
@RequiredArgsConstructor
public class TodoService {
     private final TodoRepository todoRepository;

     public List<Todo> getTodos() {
         return todoRepository.findAll();
     }

     public Todo create(Todo todo) {
         return todoRepository.save(todo);
     }

     public Todo update(Todo todo) {
         return todoRepository.save(todo);
     }

     public void delete(Long id) {
         todoRepository.deleteById(id);
     }
}
