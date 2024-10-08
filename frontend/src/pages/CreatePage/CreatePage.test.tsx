import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { _reactRouterDom } from '@/test-support/__mocks__/react-router-dom'
import { _useTodoRepository } from '@/test-support/__mocks__/useTodoRepository'

import { CreatePage } from '@/pages/CreatePage/CreatePage'

vi.mock('@/repositories/useTodoRepository', () => import('@/test-support/__mocks__/useTodoRepository'))
vi.mock('react-router-dom', () => import('@/test-support/__mocks__/react-router-dom'))

beforeEach(() => {
  vi.clearAllMocks()
  _useTodoRepository.createTodoSpy.mockResolvedValue({
    json: vi.fn().mockResolvedValue({ id: 1, title: 'test todo', completed: false }),
  })
})

it('should render', () => {
  render(<CreatePage />)

  expect(screen.getByRole('heading', { name: 'Todoを登録する' })).toBeVisible()
  expect(screen.getByRole('textbox', { name: 'Todoタイトル' })).toBeVisible()
  expect(screen.getByRole('button', { name: '登録' })).toBeVisible()
})

it('should register todo', async () => {
  render(<CreatePage />)

  const input = screen.getByRole('textbox', { name: 'Todoタイトル' })
  await userEvent.type(input, 'test todo')
  const button = screen.getByRole('button', { name: '登録' })

  await userEvent.click(button)

  expect(_useTodoRepository.createTodoSpy).toHaveBeenCalledWith({ title: 'test todo', completed: false })
  expect(_reactRouterDom.navigateSpy).toHaveBeenCalledWith('/')
})

it('should not create todo', async () => {
  render(<CreatePage />)

  const button = screen.getByRole('button', { name: '登録' })

  await userEvent.click(button)

  expect(_useTodoRepository.createTodoSpy).not.toBeCalled()
})
