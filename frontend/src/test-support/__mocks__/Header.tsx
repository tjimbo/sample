import type { Header } from '@/components/Header'
import type { ComponentProps } from 'react'

const mocksAndSpies = {
  headerSpy: vi.fn(),
}

const HeaderMock = (props: ComponentProps<typeof Header>) => {
  mocksAndSpies.headerSpy(props)
  return (
    <div>
      <div>{props.title}</div>
    </div>
  )
}

export { mocksAndSpies as _header, HeaderMock as Header }
