import { createContext, useState } from "react";

const DriverContext = createContext();  //exporting context object

const DriverProvider = ({ children }) => {
    const [id, setId] = useState(null);
    return (
      <DriverContext.Provider value={{ id, setId }}>
        {children}
      </DriverContext.Provider>
    );
};

export default DriverContext;
export { DriverProvider };  