import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ConnectionContext from "../constants/ConnectionContext";
import TranslationContext from "../constants/TranslationContext";
import { rootPrefix, jsonServerRoot } from "../constants/global";

const Contact = () => {
    const { isConnected } = useContext(ConnectionContext);
    const { isEnglish } = useContext(TranslationContext);
    const [translation, setTranslation] = useState(null);
    const h = useHistory();
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const form = document.querySelector('form');
        if(typeof(form) != undefined && form != null)
        {
            form.addEventListener('submit', function(e) {
                if (form.checkValidity()) {
                    h.push(rootPrefix);
                }
                e.preventDefault();
            })
        }
    }, []);

    useEffect(() => {
        const uri = isEnglish ? `${jsonServerRoot}/EnglishTranslation` : `${jsonServerRoot}/FrenchTranslation`;
        fetch(uri)
            .then(res => {
                if(res.ok)
                    return res.json()
                else
                    throw Error('Une erreur est survenue veuillez réessayer plus tard.')
            })
            .then((data) => {
                setTranslation(data);
                setIsPending(false);
                setError(null);
            })
            .catch(err => {
                setIsPending(false);
                setError(err.message);
            })
    }, [isEnglish]);

    return ( 
        <>
            { error && <div className='mt-5 mx-5'><h2></h2></div>}
            { isPending && <div className='mt-5 mx-5'><h2>Chargement en cours....</h2></div>}
            {translation && ( 
            <>
                <div className="text-center mt-5 mb-5">
                    <p className="home-title">{translation.title}</p>
                    <p className="sr-text mt-3">
                        {translation.message} 
                    </p>
                    <p className="sr-text mt-3">
                        {translation.tel}
                    </p>
                </div>
                <form>
                    {!isConnected &&
                        <input className="contact-input mx-auto mb-3 sr-text2" type="email" id="userMail" placeholder={translation.mailPlaceholder} required/>
                    }
                    <textarea className="contact-input mx-auto sr-text2" type="text" id="userText" placeholder={translation.messagePlaceholder} required></textarea>
                    <div className="d-flex justify-content-center">
                        <button id="sendBtn" className='mt-5 mx-auto sr-text p-0' type='submit'>
                            {translation.send}&nbsp;&nbsp;
                            <svg id="sendBtnSvg" xmlns="http://www.w3.org/2000/svg" width="74" height="24" viewBox="0 0 74 24" fill="none">
                                <path d="M73.0607 13.0607C73.6464 12.4749 73.6464 11.5251 73.0607 10.9393L63.5147 1.3934C62.9289 0.807611 61.9792 0.807611 61.3934 1.3934C60.8076 1.97919 60.8076 2.92893 61.3934 3.51472L69.8787 12L61.3934 20.4853C60.8076 21.0711 60.8076 22.0208 61.3934 22.6066C61.9792 23.1924 62.9289 23.1924 63.5147 22.6066L73.0607 13.0607ZM0 13.5H72V10.5H0V13.5Z" fill="#FCDE67"/>
                            </svg>
                        </button>
                    </div>
                    <p style={{placeContent:'center'}} className="d-flex sr-note2 mx-auto mb-auto mt-3"><span style={{color:'#C30606'}}>*</span>{translation.note}</p>
                </form>
            </>)
            }
        </>
     );
}
 
export default Contact;