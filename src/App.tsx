import React from 'react';
import './App.css';
import GithubRepositoriesSearch from './components/GithubRepositoriesSearch';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <div className="app">
      <GithubRepositoriesSearch />
    </div>
  </QueryClientProvider>
);

export default App;
