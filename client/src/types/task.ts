export type Task = {
  id: number;
  title: string;
  description: string;
  dueDate: number;
  isDraft?: boolean;
};

export type SharableTask = { value: Task };

export type Status = 'todo' | 'inprogress' | 'done';
