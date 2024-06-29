import React from 'react';
import ReactDOM from 'react-dom/client';
import './sass/index.scss';
import { App } from './App';
import { TaskProvider } from './context/tasks/provider';
import { FiltersProvider } from './context/filters/provider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <TaskProvider>
    <FiltersProvider>
      <App />
    </FiltersProvider>
  </TaskProvider>
);

{
  /* </React.StrictMode> */
}
// <React.StrictMode>
