import React, { useContext } from 'react';
import { DataContext } from '../context/DataProvider';
// import { wowClassNames } from '../Helpers';

export const FilterBar = () => {
  console.count('filterBarRender: ');

  // const { guild, characters, setCharacters, loading, loaded, error, filtered, setFiltered, initialState } =
  //   useContext(DataContext);

  const { guild, characters, setCharacters, loading, loaded, error, initialState } = useContext(DataContext);

  //const characterClassArray = Array.from(Array(12).keys());
  //const [filteredInitial, setFilteredInitial] = useState(filtered);

  // const filterCharacterClass = e => {
  //   const currentValue = e.target.value;
  //   const filterClass = characters.filter(member => member.class === currentValue);
  //   if (currentValue === 'DEFAULT') {
  //     setCharacters(initialState);
  //   } else {
  //     setFilteredInitial(filterClass);
  //     setFiltered(filterClass);
  //   }
  // };

  const sortCharactersNames = e => {
    const currentValue = e.target.value;
    const sortCharactersDesc = [...characters].sort((a, b) => (b.name > a.name ? 1 : -1));
    const sortCharactersAsc = [...characters].sort((a, b) => (a.name > b.name ? 1 : -1));
    //const sortFilteredDesc = [...filtered].sort((a, b) => (b.name > a.name ? 1 : -1));
    //const sortFilteredAsc = [...filtered].sort((a, b) => (a.name > b.name ? 1 : -1));
    if (currentValue === 'DEFAULT') {
      setCharacters(initialState);
      //setFiltered(filteredInitial);
    } else if (currentValue === 'ZA') {
      setCharacters(sortCharactersDesc);
      //setFiltered(sortFilteredDesc);
    } else if (currentValue === 'AZ') {
      setCharacters(sortCharactersAsc);
      //setFiltered(sortFilteredAsc);
    }
  };

  if (error) {
    return <em className='error'> - Error: {error.message}</em>;
  } else if (loading) {
    return <em className='loading'>Loading Filters...</em>;
  } else if (loaded) {
    return (
      <div className='filter-bar'>
        <div className='heading'>
          <h1>
            {guild.realm && (
              <>
                <span className={guild.faction}>{`<${guild.name ? guild.name : 'Guild Name'}>`}</span>-
                {guild.realm ? guild.realm : 'Realm'}
              </>
            )}
          </h1>
        </div>
        <div className='selectors'>
          {/* <div className='selector'>
            <label htmlFor='characterClass'>Select Class</label>
            <select name='characterClass' id='characterClass' defaultValue={'DEFAULT'} onChange={filterCharacterClass}>
              <option value='DEFAULT'>All Classes</option>
              {characterClassArray.map((item, i) => (
                <option key={i} value={wowClassNames(item + 1)}>
                  {wowClassNames(item + 1)}
                </option>
              ))}
            </select>
          </div> */}
          <div className='selector'>
            <label htmlFor='characterSort'>Sort By Name</label>
            <select name='characterSort' id='characterSort' defaultValue={'DEFAULT'} onChange={sortCharactersNames}>
              <option value='DEFAULT'>No Sort</option>
              <option value='AZ'>A-Z</option>
              <option value='ZA'>Z-A</option>
            </select>
          </div>
        </div>
      </div>
    );
  }
};
