import React from 'react';
import { DataProvider } from './context/DataProvider';
import { Search } from './components/search/Search';
import { Characters } from './components/characters/Characters';
import './App.scss';

const App = () => {
  return (
    <DataProvider>
      <Search />
      <Characters />
    </DataProvider>
  );
};

export default App;
