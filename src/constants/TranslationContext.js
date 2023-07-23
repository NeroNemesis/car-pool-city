import { createContext, useState } from "react";

const TranslationContext = createContext();  //exporting context object

const TranslationProvider = ({ children }) => {
    const [isEnglish, setIsEnglish] = useState(false);
    const [switchLabel, setSwitchLabel]  = useState(null);
    const [isSearchPage, setIsSearchPage]  = useState(null);
    return (
      <TranslationContext.Provider value={{ isEnglish, setIsEnglish, switchLabel, setSwitchLabel, isSearchPage, setIsSearchPage }}>
        {children}
      </TranslationContext.Provider>
    );
};

export default TranslationContext;
export { TranslationProvider };  