import type { TodoList } from '@/components/TodoList'
import type { ComponentProps } from 'react'

const mocksAndSpies = {
  todoListSpy: vi.fn(),
  selectItemSpy: vi.fn(),
}

const TodoListMock = (props: ComponentProps<typeof TodoList>) => {
  mocksAndSpies.todoListSpy(props)
  return (
    <div>
      <div>{props.title}</div>
      <ul>
        {props.todos.map((todo) => (
          <li
            data-testid={`todolistitem-${todo.id}`}
            key={todo.id}
            onClick={() => {
              mocksAndSpies.selectItemSpy(todo.id)
              props.onClick(todo.id)
            }}
          >
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export { mocksAndSpies as _todoList, TodoListMock as TodoList }
