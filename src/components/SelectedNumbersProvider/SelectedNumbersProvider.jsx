import React, { createContext, useContext, useState } from 'react';

const SelectedNumbersContext = createContext();

export const SelectedNumbersProvider = ({ children }) =>
{
  const [selectedNumbers, setSelectedNumbers] = useState([]);

  const handleClick = (number) =>
  {
    // Lógica de manipulação de cliques
    setSelectedNumbers((prevSelectedNumbers) =>
    {
      if (prevSelectedNumbers.includes(number))
      {
        return prevSelectedNumbers.filter((num) => num !== number);
      }
      else
      {
        return [...prevSelectedNumbers, number];
      }
    });
  };

  return (
    <SelectedNumbersContext.Provider value={{ selectedNumbers, setSelectedNumbers, handleClick }}>
      {children}
    </SelectedNumbersContext.Provider>
  );
};

export const useSelectedNumbers = () => useContext(SelectedNumbersContext);