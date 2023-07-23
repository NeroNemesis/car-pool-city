import { createContext, useState } from "react";

const TQContext = createContext();  //exporting context object

const TQProvider = ({ children }) => {
    const [TQ, setTQ] = useState(false);
    return (
      <TQContext.Provider value={{ TQ, setTQ }}>
        {children}
      </TQContext.Provider>
    );
};

export default TQContext;
export { TQProvider };  