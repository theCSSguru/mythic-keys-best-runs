import { useContext } from 'react';
import { DataContext } from '../../context/DataProvider';
import { SORT } from '../../utils/constants';

export const CharactersHeading = () => {
  const {
    characters,
    setCharacters,
    initialCharacters,
    sortClass,
    sortName,
    sortScore,
    sortedClass,
    sortedClassAll,
    sortedName,
    sortedScore,
    setSortClass,
    setSortedClassAll,
    setSortName,
    setSortScore,
    setSortedClass,
    setSortedName,
    setSortedScore
  } = useContext(DataContext);

  const sortClasses = () => {
    if (sortClass === SORT.DESC || sortClass === SORT.DEFAULT) {
      const asc = [...characters].sort(
        (a, b) => b.class.id - a.class.id || b.mythic_rating.rating - a.mythic_rating.rating
      );
      setSortClass(SORT.ASC);
      setCharacters(asc);
    }
    if (sortClass === SORT.ASC) {
      const desc = [...characters].sort(
        (a, b) => a.class.id - b.class.id || b.mythic_rating.rating - a.mythic_rating.rating
      );
      setSortClass(SORT.DESC);
      setCharacters(desc);
    }
    setSortedClass(true);
    setSortedName(false);
    setSortedScore(false);
    setSortName(SORT.DEFAULT);
    setSortScore(SORT.ASC);
  };

  const sortNames = () => {
    if (sortName === SORT.DESC || sortName === SORT.DEFAULT) {
      const asc = [...characters].sort((a, b) => (a.name > b.name ? 1 : -1));
      setSortName(SORT.ASC);
      setCharacters(asc);
    }
    if (sortName === SORT.ASC) {
      const desc = [...characters].sort((a, b) => (a.name < b.name ? 1 : -1));
      setSortName(SORT.DESC);
      setCharacters(desc);
    }
    setSortedClass(false);
    setSortedName(true);
    setSortedScore(false);
    setSortClass(SORT.DEFAULT);
    setSortScore(SORT.ASC);
  };

  const sortScores = () => {
    if (sortScore === SORT.DESC) {
      const asc = [...characters].sort((a, b) => (a.mythic_rating.rating > b.mythic_rating.rating ? 1 : -1));
      setSortScore(SORT.ASC);
      setCharacters(asc);
    }
    if (sortScore === SORT.ASC) {
      const desc = [...characters].sort((a, b) => (a.mythic_rating.rating < b.mythic_rating.rating ? 1 : -1));
      setSortScore(SORT.DESC);
      setCharacters(desc);
    }
    setSortedClass(false);
    setSortedName(false);
    setSortedScore(true);
    setSortClass(SORT.DEFAULT);
    setSortName(SORT.DEFAULT);
  };

  const handleClassShowAll = (e: any) => {
    setSortedClass(false);
    setSortedName(false);
    setSortedScore(true);
    setSortedClassAll(false);
    setCharacters(initialCharacters);
  };

  return (
    <div className='character-list-heading'>
      <div className='character-list-heading-class-wrap' data-sorted={sortedClass} data-sort={sortClass}>
        <button
          className='character-list-heading-class'
          data-sorted={sortedClassAll}
          onClick={sortClasses}
          disabled={sortedClassAll}
        >
          Class
        </button>
        <span className='character-list-heading-class-dash'>-</span>
        <button
          className='character-list-heading-class-all'
          data-sorted={sortedClassAll}
          onClick={handleClassShowAll}
          disabled={!sortedClassAll}
        >
          All
        </button>
      </div>
      <button className='character-list-heading-name' data-sorted={sortedName} data-sort={sortName} onClick={sortNames}>
        Name
      </button>
      <div className='character-list-heading-best-runs'>Best Runs</div>
      <button
        className='character-list-heading-score'
        data-sorted={sortedScore}
        data-sort={sortScore}
        onClick={sortScores}
      >
        M+ Score
      </button>
    </div>
  );
};
