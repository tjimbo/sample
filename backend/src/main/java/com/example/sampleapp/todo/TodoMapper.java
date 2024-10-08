package com.example.sampleapp.todo;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TodoMapper{

    TodoResponse toDto(Todo todo);

    @Mapping(target = "id", ignore = true)
    Todo toEntity(TodoRequest todoDto);
}
