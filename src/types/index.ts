export type Task = {
  id: string;
} & NewTask;

export type TaskWithSerialNo = {
  serialNo: number;
  isDraggable: boolean;
} & Task;

export type NewTask = {
  title: string;
  status: Status;
  assignedTo: Members;
  dueDate: string;
  isAssigned: boolean;
  estimatedHours: string;
  priority: Priority;
  createdOn: string;
};

export type Members = '1' | '2' | '3' | '4';
export type Status = 'progress' | 'success' | 'un-initialized';
export type Priority = 'low' | 'high' | 'medium';

export type Filters =
  | 'status'
  | 'assignedTo'
  | 'priority'
  | 'title'
  | 'dueDate'
  | 'estimatedHours'
  | 'createdOn'
  | 'taskId'
  | 'isAssigned';

export type FilterObj = Record<Filters, string>;
