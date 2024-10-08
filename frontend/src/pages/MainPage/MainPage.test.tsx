import { _header } from '@/test-support/__mocks__/Header'
import { _todoList } from '@/test-support/__mocks__/TodoList'
import { _useTodoRepository } from '@/test-support/__mocks__/useTodoRepository'
import { render, screen, waitFor } from '@testing-library/react'

import { MainPage } from '@/pages/MainPage/MainPage'
import userEvent from '@testing-library/user-event'

vi.mock('@/components/TodoList', () => import('@/test-support/__mocks__/TodoList'))
vi.mock('@/components/Header', () => import('@/test-support/__mocks__/Header'))
vi.mock('@/repositories/useTodoRepository', () => import('@/test-support/__mocks__/useTodoRepository'))

const globalFetch = global.fetch
const fetchMock = vi.fn()
const todos = [{ id: 1, title: 'test first', completed: false }]

beforeAll(() => {
  global.fetch = fetchMock
})

afterAll(() => {
  global.fetch = globalFetch
})

beforeEach(() => {
  vi.clearAllMocks()
  _useTodoRepository.listTodosSpy.mockResolvedValue(todos)
})

it('should render with one todo', async () => {
  await waitFor(() => render(<MainPage />))

  expect(screen.getByRole('heading', { name: 'Todo一覧' })).toBeVisible()
  expect(_todoList.todoListSpy).toHaveBeenCalledWith(expect.objectContaining({ todos }))
})

it('should render with 2 todos that has completed and uncompleted', async () => {
  const uncompleted = { id: 1, title: 'test first', completed: false }
  const completed = { id: 2, title: 'test second', completed: true }
  const todos = [uncompleted, completed]
  _useTodoRepository.listTodosSpy.mockResolvedValue(todos)

  await waitFor(() => render(<MainPage />))

  expect(_todoList.todoListSpy).toHaveBeenCalledTimes(4)
  expect(_todoList.todoListSpy).toHaveBeenCalledWith(expect.objectContaining({ todos: [uncompleted] }))
  expect(_todoList.todoListSpy).toHaveBeenCalledWith(expect.objectContaining({ todos: [completed] }))
})

it('should display selected id when item clicked', async () => {
  await waitFor(() => render(<MainPage />))

  await userEvent.click(screen.getByTestId('todolistitem-1'))

  expect(_todoList.selectItemSpy).toHaveBeenCalledWith(1)
  expect(_todoList.todoListSpy).toHaveBeenCalledWith(expect.objectContaining({ selectedId: 1 }))
})
