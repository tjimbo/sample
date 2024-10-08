import { render, screen, within } from '@testing-library/react'
import { SideNavigation } from './SideNavigation'

vi.mock('react-router-dom', () => import('@/test-support/__mocks__/react-router-dom.tsx'))

it('should render', () => {
  render(<SideNavigation />)

  expect(screen.getByRole('heading', { name: 'menu' })).toBeVisible()
  const sideNavigation = screen.getByRole('navigation')
  expect(within(sideNavigation).getByRole('link', { name: 'Todo一覧' })).toBeVisible()
  expect(within(sideNavigation).getByRole('link', { name: 'Todo作成' })).toBeVisible()
})
