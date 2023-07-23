import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ConnectionContext from "../constants/ConnectionContext";
import { rootPrefix } from "../constants/global";

const Contact = () => {
    const { isConnected } = useContext(ConnectionContext);

    const h = useHistory();
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

    return ( 
        <>
            <div className="text-center mt-5 mb-5">
                <p className="home-title">Contactez-nous</p>
                <p className="sr-text mt-3">
                    Notre service de messagerie fonctionne 7jours/7 de 8h à 23h. 
                    N’hésitez pas à nous laisser un courriel, les délais de réponses varient entre 30 minutes et 2 heures. 
                </p>
                <p className="sr-text mt-3">
                    Vous pouvez aussi nous joindre aussi nous joindre 
                    au 1-800-000-0000 (Québec) ou 1-800-000-0001 (Ailleurs).
                </p>
            </div>
            <form>
                {!isConnected &&
                    <input className="contact-input mx-auto mb-3 sr-text2" type="email" id="userMail" placeholder="Veuillez entrer votre mail ici..." required/>
                }
                <textarea className="contact-input mx-auto sr-text2" type="text" id="userText" placeholder="Entrez votre message ici..." required></textarea>
                <div className="d-flex justify-content-center">
                    <button id="sendBtn" className='mt-5 mx-auto sr-text p-0' type='submit'>
                        Envoyer&nbsp;&nbsp;
                        <svg id="sendBtnSvg" xmlns="http://www.w3.org/2000/svg" width="74" height="24" viewBox="0 0 74 24" fill="none">
                            <path d="M73.0607 13.0607C73.6464 12.4749 73.6464 11.5251 73.0607 10.9393L63.5147 1.3934C62.9289 0.807611 61.9792 0.807611 61.3934 1.3934C60.8076 1.97919 60.8076 2.92893 61.3934 3.51472L69.8787 12L61.3934 20.4853C60.8076 21.0711 60.8076 22.0208 61.3934 22.6066C61.9792 23.1924 62.9289 23.1924 63.5147 22.6066L73.0607 13.0607ZM0 13.5H72V10.5H0V13.5Z" fill="#FCDE67"/>
                        </svg>
                    </button>
                </div>
                <p style={{placeContent:'center'}} className="d-flex sr-note2 mx-auto mb-auto mt-3"><span style={{color:'#C30606'}}>*</span>Une fois le message envoyé, vous serez redirigé vers la page d’accueil.</p>
            </form>
        </>
     );
}
 
export default Contact;