import { TodoList } from '@/components/TodoList.tsx'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { _todoListItem } from '@/test-support/__mocks__/TodoListItem'

vi.mock('@/components/TodoListItem', () => import('@/test-support/__mocks__/TodoListItem'))

const onClick = vi.fn()
it('should render with one todo', () => {
  const todo = { id: 1, title: 'test first', completed: false }

  render(<TodoList title="未完了" todos={[todo]} onClick={onClick} />)

  const todoListItems = screen.getByRole('option')
  expect(screen.getByText('未完了')).toBeVisible()
  expect(within(todoListItems).getByText('test first')).toBeVisible()
})

it('should render with multiple todos', () => {
  const todos = [
    { id: 1, title: 'test first', completed: false },
    { id: 2, title: 'test second', completed: true },
  ]

  render(<TodoList title="" todos={todos} onClick={onClick} />)

  expect(_todoListItem.todoListItemSpy).toHaveBeenCalledWith(expect.objectContaining({ todo: todos[0] }))
  expect(_todoListItem.todoListItemSpy).toHaveBeenCalledWith(expect.objectContaining({ todo: todos[1] }))
})

it('click listitem and callback by id', async () => {
  const todos = [{ id: 1, title: 'test first', completed: false }]
  render(<TodoList title="" todos={todos} onClick={onClick} />)
  const todoListItem = screen.getAllByRole('option')[0]

  await userEvent.click(todoListItem)

  expect(onClick).toHaveBeenCalledWith(1)
})
