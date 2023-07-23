import { createContext, useState } from "react";

const TranslationContext = createContext();  //exporting context object

const TranslationProvider = ({ children }) => {
    const [isEnglish, setIsEnglish] = useState(false);
    const [switchLabel, setSwitchLabel]  = useState(null);
    const [isContactPage, setIsContactPage]  = useState(window.location.href.includes('contact'));

    return (
      <TranslationContext.Provider value={{ isEnglish, setIsEnglish, switchLabel, setSwitchLabel, isContactPage, setIsContactPage }}>
        {children}
      </TranslationContext.Provider>
    );
};

export default TranslationContext;
export { TranslationProvider };  