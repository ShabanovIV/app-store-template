export const RouteTypes = {
  public: 'public',
  private: 'private',
  privateHide: 'privateHide',
} as const;

export type RouteType = (typeof RouteTypes)[keyof typeof RouteTypes];

export const ROUTES: { [key: string]: { path: string; title: string; type: RouteType } } = {
  home: { path: '/', title: 'Home', type: RouteTypes.public },
  login: { path: '/login', title: 'Login', type: RouteTypes.public },
  test: { path: '/test', title: 'Test', type: RouteTypes.public },
  profile: { path: '/profile', title: 'Profile', type: RouteTypes.private },
};
