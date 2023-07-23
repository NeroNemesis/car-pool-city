import { createContext, useState } from "react";

const ConnectionContext = createContext();  //exporting context object

const ConnectionProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [referrer, setReferrer]  = useState(null);
    return (
      <ConnectionContext.Provider value={{ isConnected, setIsConnected, referrer, setReferrer }}>
        {children}
      </ConnectionContext.Provider>
    );
};

export default ConnectionContext;
export { ConnectionProvider };  