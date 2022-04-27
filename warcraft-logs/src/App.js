import React from 'react';
import { CharacterProvider } from './contexts/CharacterProvider';
import { SearchBar } from './components/SearchBar';
import { FilterBar } from './components/FilterBar';
import { Characters } from './components/Characters';
import './App.scss';

const App = () => {
  console.count('appRender: ');

  return (
    <CharacterProvider>
      <SearchBar />
      <FilterBar />
      <Characters />
    </CharacterProvider>
  );
};

export default App;
