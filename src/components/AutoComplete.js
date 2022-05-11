import React, { useState } from 'react';

export const AutoComplete = ({ defaultValue, placeholder, data }) => {
  const [filteredData, setFilteredData] = useState([]);
  // const [inputRealm, setInputRealm] = useState('Firetree');

  // const onInputRealm = e => {
  //   const { value } = e.target;
  //   const re = /^[A-Za-z ']*$/;
  //   if (value === '' || re.test(value)) {
  //     setInputRealm(value);
  //   }
  // };

  const handleFilter = e => {
    const { value } = e.target;
    const searchWord = e.target.value;
    const re = /^[A-Za-z ']*$/;
    if (value === '' || re.test(value)) {
      const newFilter = data.filter(a => {
        return a.name.toLowerCase().includes(searchWord.toLowerCase());
      });
      if (searchWord === '') {
        setFilteredData([]);
      } else {
        setFilteredData(newFilter);
      }
    }
  };

  return (
    <div className='auto-complete'>
      <input type='search' defaultValue={defaultValue} placeholder={placeholder} onChange={handleFilter} />
      <div className='auto-complete-list'>
        <ul>
          {filteredData.length !== 0 &&
            filteredData.map((item, index) => {
              return (
                <li key={index} data-id={item.id}>
                  {item.name}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};
