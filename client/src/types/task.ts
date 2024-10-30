export type Task = {
  id: number;
  title: string;
  description: string;
  dueDate: Date;
  isDraft?: boolean;
};
