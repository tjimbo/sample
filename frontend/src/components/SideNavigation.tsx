import { NavLink } from 'react-router-dom'

export const SideNavigation = () => {
  return (
    <nav className="px-2">
      <h1 className="text-2xl mt-4">menu</h1>
      <hr className="my-6 border-borderDivider" />
      <div className="flex flex-col gap-4">
        <NavLink className="w-full" to="/">
          Todo一覧
        </NavLink>
        <NavLink className="w-full" to="/new">
          Todo作成
        </NavLink>
      </div>
    </nav>
  )
}
