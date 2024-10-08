import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TodoListItem } from './TodoListItem'

it('should render', () => {
  const todo = { id: 1, title: 'test', completed: false }

  render(<TodoListItem todo={todo} onClick={() => {}} />)

  expect(within(screen.getByRole('option')).getByText('test')).toBeVisible()
})

it('should onClick called by click', async () => {
  const todo = { id: 1, title: 'test', completed: false }
  const onClick = vi.fn()

  render(<TodoListItem todo={todo} onClick={onClick} />)

  await userEvent.click(screen.getByRole('option'))

  expect(onClick).toHaveBeenCalledWith(1)
})

it('should aria-selected is true when selectedId is same as todo.id', () => {
  const todo = { id: 1, title: 'test', completed: false }

  render(<TodoListItem todo={todo} onClick={() => {}} selectedId={1} />)

  expect(screen.getByRole('option')).toHaveAttribute('aria-selected', 'true')
})

it('should expanded when list item is clicked', async () => {
  const todo = { id: 1, title: 'test', completed: false, description: 'description' }
  const onClick = vi.fn()

  render(<TodoListItem todo={todo} onClick={onClick} selectedId={1} />)

  await userEvent.click(screen.getByRole('option'))
  expect(screen.getByRole('button', { name: todo.title })).toHaveAttribute('aria-expanded', 'true')
  expect(screen.getByText('description')).toBeVisible()
})
