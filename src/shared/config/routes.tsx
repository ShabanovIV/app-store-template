import { ReactNode } from 'react';
import { AuthPage } from 'src/pages/AuthPage/AuthPage';

export const RouteTypes = {
  public: 'public', // Always displayed in the menu, accessible to all users
  private: 'private', // Always displayed in the menu, accessible only to authenticated users
  privateHidden: 'privateHidden', // Displayed in the menu and accessible only to authenticated users
} as const;

export type RouteType = (typeof RouteTypes)[keyof typeof RouteTypes];

export const MENU_ROUTES: {
  [key: string]: { path: string; title: string; type: RouteType; render: () => ReactNode };
} = {
  home: { path: '/', title: 'Home', type: RouteTypes.public, render: () => <div>Home</div> },
  login: {
    path: '/login',
    title: 'Login',
    type: RouteTypes.public,
    render: () => <AuthPage />,
  },
  test: {
    path: '/test',
    title: 'Test',
    type: RouteTypes.private,
    render: () => <div>Test redirect for private route</div>,
  },
  profile: {
    path: '/profile',
    title: 'Profile',
    type: RouteTypes.privateHidden,
    render: () => <div>Profile</div>,
  },
};
