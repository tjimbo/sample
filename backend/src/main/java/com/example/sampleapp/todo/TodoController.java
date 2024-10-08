package com.example.sampleapp.todo;

import com.amazonaws.xray.spring.aop.XRayEnabled;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
@AllArgsConstructor
@XRayEnabled
public class TodoController {
     private final TodoService todoService;
     private final TodoMapper todoMapper;

     @GetMapping
     public ResponseEntity<List<TodoResponse>> getTodos() {
         return ResponseEntity.ok(todoService.getTodos().stream().map(todoMapper::toDto).toList());
     }

     @PostMapping
     public ResponseEntity<TodoResponse> create(@RequestBody TodoRequest todoDto) {
         return ResponseEntity.ok(todoMapper.toDto(todoService.create(todoMapper.toEntity(todoDto))));
     }

     @PutMapping
     public ResponseEntity<TodoResponse> update(@RequestBody TodoRequest todoDto) {
         return ResponseEntity.ok(todoMapper.toDto(todoService.update(todoMapper.toEntity(todoDto))));
     }

     @DeleteMapping("/{id}")
     public ResponseEntity<Void> delete(@PathVariable Long id) {
         todoService.delete(id);
         return ResponseEntity.ok().build();
     }
}
