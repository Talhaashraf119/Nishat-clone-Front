import React, { createContext, useState } from 'react';

export const ContextCreate = createContext();

export const Context = ({ children }) => {
  const [data, setdata] = useState([]);
  const [detaildata, setdetaildata] = useState([]);

  return (
    <>
      <ContextCreate.Provider value={{ data, setdata,detaildata,setdetaildata }}>
        {children}
      </ContextCreate.Provider>
    </>
  );
};
