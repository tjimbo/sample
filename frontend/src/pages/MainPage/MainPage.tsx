import { TodoList } from '@/components/TodoList'
import { useTodoRepository } from '@/repositories/useTodoRepository'
import type { Todo } from '@/types/todo'
import { useEffect, useState } from 'react'

export const MainPage = () => {
  const [selectedId, setSelectedId] = useState<number | undefined>(undefined)
  const [todos, setTodos] = useState<Todo[]>([])
  const { listTodos } = useTodoRepository()

  const selectItem = (id: number) => {
    setSelectedId(id)
  }

  useEffect(() => {
    ;(async () => {
      const listTodoResponse = await listTodos()
      setTodos(listTodoResponse)
    })()
  }, [])

  const completedTodos = todos.filter((todo) => todo.completed)
  const uncompletedTodos = todos.filter((todo) => !todo.completed)

  return (
    <>
      <h1 className="text-2xl">Todo一覧</h1>
      <div className="flex justify-between flex-row gap-2 w-full mt-4">
        <section className="w-1/2">
          <TodoList title="未完了" todos={uncompletedTodos} onClick={selectItem} selectedId={selectedId} />
        </section>
        <section className="w-1/2">
          <TodoList title="完了" todos={completedTodos} onClick={selectItem} selectedId={selectedId} />
        </section>
      </div>
    </>
  )
}
