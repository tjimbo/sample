import { Header } from '@/components/Header'
import { render, screen, within } from '@testing-library/react'

// ヘッダータイトルが表示されることを確認する
it('renders header title', () => {
  render(<Header title="TodoList" />)
  const headerTitle = screen.getByRole('heading', { name: 'TodoList' })
  expect(headerTitle).toBeInTheDocument()
})

it('should display navigation links', () => {
  render(<Header title="TodoList" />)
  const navigation = screen.getByRole('navigation')
  const navigationLinks = within(navigation).getAllByRole('link')
  expect(navigationLinks).toHaveLength(2)
  expect(navigationLinks[0]).toHaveTextContent('Home')
  expect(navigationLinks[1]).toHaveTextContent('Profile')
})
