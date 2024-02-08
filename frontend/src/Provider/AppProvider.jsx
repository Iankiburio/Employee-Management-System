import AppContext from "./AppContext";
import React, { useState } from "react";

const AppProvider = (props) => {
  const { children } = props;

  const [user, setUser] = useState(null);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
