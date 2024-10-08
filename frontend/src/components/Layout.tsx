import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { SideNavigation } from './SideNavigation'

export const Layout = () => {
  return (
    <div className="flex flex-row-reverse justify-end w-full">
      <div className="w-full px-4">
        <Header title="Todo App" />
        <hr className="mb-6 mt-2 border-borderDivider" />
        <main className="w-full">
          <Outlet />
        </main>
      </div>
      <div className="min-w-44">
        <SideNavigation />
      </div>
    </div>
  )
}
