import type { TodoListItem } from '@/components/TodoListItem'
import type { ComponentProps } from 'react'

const mocksAndSpies = {
  todoListItemSpy: vi.fn(),
  onClickSpy: vi.fn(),
}

const TodoListItemMock = (props: ComponentProps<typeof TodoListItem>) => {
  mocksAndSpies.todoListItemSpy(props)
  return (
    <li
      role="option"
      onClick={() => {
        mocksAndSpies.onClickSpy(props.todo.id)
        props.onClick(props.todo.id)
      }}
    >
      <div>{props.todo.title}</div>
    </li>
  )
}

export { mocksAndSpies as _todoListItem, TodoListItemMock as TodoListItem }
