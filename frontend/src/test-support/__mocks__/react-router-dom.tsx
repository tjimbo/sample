import * as reactRouterDom from 'react-router-dom'

vi.mock('react-router-dom')

const mocksAndSpies = {
  blockerResetSpy: vi.fn(),
  blockerProceedSpy: vi.fn(),
  navigateSpy: vi.fn(),
  paramsMock: vi.fn<() => { id?: string }>(() => ({ id: '1' })),
  locationKeyMock: vi.fn(() => 'default'),
  navLinkSpy: vi.fn(),
  navigateComponentSpy: vi.fn(),
  navLinkComponentSpy: vi.fn(),
  navLinkComponentIsActiveMock: vi.fn(() => false),
  linkComponentSpy: vi.fn(),
}

const useNavigate = vi.mocked(reactRouterDom.useNavigate).mockReturnValue((to) => {
  mocksAndSpies.navigateSpy(to)
})
const useParams = vi.mocked(reactRouterDom.useParams).mockImplementation(() => mocksAndSpies.paramsMock())
const useLocation = vi.mocked(reactRouterDom.useLocation).mockImplementation(() => ({
  hash: '',
  pathname: '',
  search: '',
  state: undefined,
  key: mocksAndSpies.locationKeyMock(),
}))
const useBlocker = vi
  .mocked(reactRouterDom.useBlocker)
  // @ts-expect-error
  .mockImplementation((checkIsDirty: () => boolean) => ({
    state: checkIsDirty() ? 'blocked' : 'unblocked',
    reset: mocksAndSpies.blockerResetSpy,
    proceed: mocksAndSpies.blockerProceedSpy,
  }))
const Navigate = vi.mocked(reactRouterDom.Navigate).mockImplementation((props) => {
  mocksAndSpies.navigateComponentSpy(props)
  return null
})
const Outlet = vi.mocked(reactRouterDom.Outlet).mockImplementation(() => {
  return <div data-testid="outlet" />
})
const Link = vi.fn().mockImplementation((props) => {
  mocksAndSpies.linkComponentSpy(props)

  return (
    <a href={props.to} className={props.className}>
      {props.children}
    </a>
  )
})
const NavLink = vi.fn().mockImplementation((props) => {
  mocksAndSpies.navLinkComponentSpy(props)

  if (typeof props.children === 'function') {
    return (
      <a
        href={props.to}
        className={props.className({
          isActive: mocksAndSpies.navLinkComponentIsActiveMock(),
          isPending: false,
          isTransitioning: false,
        })}
      >
        {props.children({
          isActive: mocksAndSpies.navLinkComponentIsActiveMock(),
          isPending: false,
          isTransitioning: false,
        })}
      </a>
    )
  }

  return <a href={props.to}>{props.children}</a>
})
const { RouterProvider, createRoutesFromElements, createBrowserRouter } = await vi.importActual('react-router-dom')

export {
  mocksAndSpies as _reactRouterDom,
  useNavigate,
  useParams,
  useLocation,
  useBlocker,
  Navigate,
  Outlet,
  NavLink,
  Link,
  RouterProvider,
  createRoutesFromElements,
  createBrowserRouter,
}
