import { useTodoRepository } from '@/repositories/useTodoRepository'
import { _useApiClient } from '@/test-support/__mocks__/useApiClient'
import { renderHook } from '@testing-library/react'
vi.mock('@/repositories/useApiClient', () => import('@/test-support/__mocks__/useApiClient'))

it('should return todos', async () => {
  _useApiClient.getSpy.mockResolvedValue({
    json: vi.fn().mockResolvedValue([{ id: 1, title: 'test first', completed: false }]),
  })

  const { result } = renderHook(() => useTodoRepository())
  const resonse = await result.current.listTodos()

  expect(_useApiClient.getSpy).toHaveBeenCalledWith('api/todos')
  expect(resonse).toEqual([{ id: 1, title: 'test first', completed: false }])
})

it('should register new todo', async () => {
  const todo = { title: 'test todo', completed: false }
  _useApiClient.postSpy.mockResolvedValue({ json: vi.fn().mockResolvedValue({ id: 1, ...todo }) })

  const { result } = renderHook(() => useTodoRepository())
  const response = await result.current.createTodo(todo)

  expect(response).toEqual({ id: 1, ...todo })
  expect(_useApiClient.postSpy).toHaveBeenCalledWith('api/todos', { body: JSON.stringify(todo) })
})
