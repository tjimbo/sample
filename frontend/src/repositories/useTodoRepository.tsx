import { useApiClient } from '@/repositories/useApiClient'
import type { Todo } from '@/types/todo'

export const useTodoRepository = () => {
  const client = useApiClient()

  return {
    listTodos: async () => {
      const response = await client.get('api/todos')
      return response.json() as Promise<Todo[]>
    },
    createTodo: async (todo: Omit<Todo, 'id'>) => {
      const response = await client.post('api/todos', { body: JSON.stringify(todo) })
      return response.json() as Promise<Todo>
    },
  }
}
