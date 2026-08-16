import { Outlet, createRootRoute } from '@tanstack/react-router'
// TODO add react html for test
export const Route = createRootRoute({
  component: Outlet,
})

