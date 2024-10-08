type Headerprops = {
  title: string
}

export const Header = ({ title }: Headerprops) => {
  return (
    <header className="w-full flex justify-between gap-4 h-16 items-center">
      <h1 className="text-4xl">{title}</h1>
      <nav className="flex gap-4">
        <a href="/">Home</a>
        <a href="/profile">Profile</a>
      </nav>
    </header>
  )
}
