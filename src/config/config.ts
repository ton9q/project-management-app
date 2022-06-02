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
    health: '/',
    auth: {
      signIn: '/signin',
      signUp: '/signup',
    },
    users: {
      root: '/users',
      byId: (id: string) => `/users/${id}`,
    },
    boards: {
      root: '/boards',
      byId: (id: string) => `/boards/${id}`,
    },
    columns: {
      root: (boardId: string) => `/boards/${boardId}/columns`,
      byId: (boardId: string, columnId: string) => `/boards/${boardId}/columns/${columnId}`,
    },
    tasks: {
      root: (boardId: string, columnsId: string) => `/boards/${boardId}/columns/${columnsId}/tasks`,
      byId: (boardId: string, columnId: string, taskId: string) =>
        `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
    },
    file: {
      root: '/file',
      download: (taskId: string, fileName: string) => `/file/${taskId}/${fileName}`,
    },
  },
};

export const config = {
  urls,
  appTitle: 'Kanban App',
};
