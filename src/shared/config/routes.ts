export const RouteTypes = {
  public: 'public', // Route is always added; if isMenuItem = true, it is always displayed in the menu.
  private: 'private', // Route is always added, and the element is wrapped in PrivateRoute; if isMenuItem = true, it is always displayed in the menu.
  privateHidden: 'privateHidden', // Route is added for authorized users; if isMenuItem = true, it is displayed only for authorized users.
} as const;

export type RouteType = (typeof RouteTypes)[keyof typeof RouteTypes];

export const ROUTES = {
  home: {
    path: '/',
    title: 'Home',
    type: RouteTypes.public as RouteType,
    isMenuItem: true,
  },
  category: {
    path: '/catalog',
    title: 'Catalog',
    type: RouteTypes.private as RouteType,
    isMenuItem: true,
  },
  products: {
    basePath: '/products/',
    path: '/products/:categoryId',
    title: 'Products',
    type: RouteTypes.private as RouteType,
    isMenuItem: false,
  },
  auth: {
    path: '/auth',
    title: 'Sign In',
    type: RouteTypes.public as RouteType,
    isMenuItem: false,
  },
  profile: {
    path: '/profile',
    title: 'Profile',
    type: RouteTypes.privateHidden as RouteType,
    isMenuItem: true,
  },
} as const;

export const getWithoutHiddenRoutes = () => {
  return Object.keys(ROUTES)
    .map((key) => ROUTES[key as keyof typeof ROUTES])
    .filter((route) => route.type !== RouteTypes.privateHidden);
};

export const getHiddenRoutes = () => {
  return Object.keys(ROUTES)
    .map((key) => ROUTES[key as keyof typeof ROUTES])
    .filter((route) => route.type === RouteTypes.privateHidden);
};
