export const RouteTypes = {
  public: 'public', // Always displayed in the menu, accessible to all users
  private: 'private', // Always displayed in the menu, accessible only to authenticated users
  privateHidden: 'privateHidden', // Displayed in the menu and accessible only to authenticated users
} as const;

export type RouteType = (typeof RouteTypes)[keyof typeof RouteTypes];

export const MENU_ROUTES: { [key: string]: { path: string; title: string; type: RouteType } } = {
  home: { path: '/', title: 'Home', type: RouteTypes.public },
  login: { path: '/login', title: 'Login', type: RouteTypes.public },
  test: { path: '/test', title: 'Test', type: RouteTypes.public },
  profile: { path: '/profile', title: 'Profile', type: RouteTypes.privateHidden },
};
