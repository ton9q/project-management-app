export type Task = {
  id: string;
  title: string;
  order: number;
  done: boolean;
  description: string;
  userId: string;
  files?: { filename: string; fileSize: number }[];
};

export type Column = {
  id: string;
  title: string;
  order: number;
  tasks: Task[];
};

export type Board = {
  id: string;
  title: string;
  description: string;
  columns: Column[];
};
