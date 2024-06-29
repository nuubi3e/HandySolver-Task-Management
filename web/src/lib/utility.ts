import { Members, Priority, Status } from '../types';

// Function to format date
export const dateConverter = (date: string) =>
  new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
  }).format(new Date(date));

// Function to convert 24 time format to AM & PM
export const timeConverter = (date: string) => {
  const hours = +date.split(':')[0];
  const minutes = date.split(':')[1];
  return `${hours > 12 ? hours - 12 : hours} : ${minutes} ${
    hours > 12 ? 'PM' : 'AM'
  }`;
};

export const priorities: Priority[] = ['low', 'medium', 'high'];
export const statues: Status[] = ['un-initialized', 'progress', 'success'];
export const members: Members[] = ['1', '2', '3', '4'];
