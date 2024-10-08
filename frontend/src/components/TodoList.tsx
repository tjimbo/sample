import type { Todo } from '@/types/todo'
import { TodoListItem } from './TodoListItem'

type TodoListProps = {
  title: string
  todos: Todo[]
  onClick: (id: number) => void
  selectedId?: number
}

export const TodoList = ({ title, todos, onClick, selectedId }: TodoListProps) => {
  return (
    <>
      <h1 className="text-lg" id={`listbox-${title}`}>
        {title}
      </h1>
      <ul
        aria-labelledby={`listbox-${title}`}
        aria-activedescendant={`listbox-${title}`}
        tabIndex={0}
        className="my-4 space-y-2"
      >
        {todos.map((todo) => (
          <TodoListItem key={`todolistitem-${todo.id}`} todo={todo} onClick={onClick} selectedId={selectedId} />
        ))}
      </ul>
    </>
  )
}
