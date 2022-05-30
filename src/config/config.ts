const urls = {
  public: {
    root: '',
    welcome: '/',
    signIn: '/sign-in',
    signUp: '/sign-up',
    profile: {
      edit: '/profile/edit',
    },
    main: '/boards',
    board: (id: string) => `/boards/${id}`,
  },

  router: {
    board: '/boards/:id',
  },

  api: {
    baseURL: 'https://frozen-shelf-14063.herokuapp.com',

    auth: {
      signIn: '/signin',
      signUp: '/signup',
    },

    board: {
      root: (id: string) => `/boards/${id}`,
    },
  },
};

export const config = {
  urls,
  appTitle: 'Kanban App',
};
