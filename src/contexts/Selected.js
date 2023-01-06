import React, { createContext, useState } from 'react';

export const SelectedContext = createContext({});

export const Selected = ({ children }) => {
  const [selected, setSelected] = useState(null);

  return (
    <SelectedContext.Provider value={{ selected, setSelected }}>
      {children}
    </SelectedContext.Provider>
  );
};
