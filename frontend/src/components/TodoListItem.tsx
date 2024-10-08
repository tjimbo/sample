import type { Todo } from '@/types/todo'

type TodoListItemProps = {
  todo: Todo
  onClick: (id: number) => void
  selectedId?: number
}

export const TodoListItem = ({ todo, onClick, selectedId }: TodoListItemProps) => {
  const handleOnClick = () => {
    onClick(todo.id)
  }

  const expanded = selectedId === todo.id

  return (
    <li
      className="cursor-pointer aria-selected:bg-gray-200"
      role={'option'}
      key={`listitemkey-${todo.id}`}
      onClick={handleOnClick}
      aria-selected={selectedId === todo.id}
      tabIndex={0}
    >
      <button 
        aria-expanded={expanded}
        aria-controls={`description-${todo.id}`}
        id={`listitem-${todo.id}`}
        >
        {todo.title}
      </button>
      {expanded && (
        <div
          id={`description-${todo.id}`}
          className="p-2 text-sm"
          role="region"
          aria-labelledby={`listitem-${todo.id}`}
        >
          description
        </div>
      )}
    </li>
  )
}
