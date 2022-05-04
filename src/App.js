import React from 'react';
import { DataProvider } from './context/DataProvider';
import { SearchBar } from './components/SearchBar';
import { Characters } from './components/Characters';
import './App.scss';

const App = () => {
  console.count('appRender: ');

  return (
    <DataProvider>
      <SearchBar />
      <Characters />
    </DataProvider>
  );
};

export default App;
