import { Link, useHistory } from "react-router-dom";
import { useContext, useEffect } from "react";
import ConnectionContext from '../constants/ConnectionContext';
import DriverContext from '../constants/DriverContext';
import TQContext from '../constants/TQContext'
import { rootPrefix } from "../constants/global";

const Connexion = (props) => {
    const { isConnected, setIsConnected, referrer, setReferrer } = useContext(ConnectionContext);
    const { id } = useContext(DriverContext);
    const { TQ } = useContext(TQContext);
    const h = useHistory();

    useEffect(() => {
        const form = document.querySelector('form');
        if(typeof(form) != undefined && form != null)
        {
            form.addEventListener('submit', function(e) {
                if (form.checkValidity()) {
                    setIsConnected(true);
                    if(referrer.includes('search'))
                        h.push(rootPrefix + `/details/${id}`);
                    else if(referrer.includes('contact'))
                    {
                        h.push(rootPrefix + '/contact');
                    }
                    else
                        h.push(rootPrefix)
                }
                e.preventDefault();
            })
        }
    }, []);

    return ( 
        <>
            <form className="h-100">
                <div className="flex-container">
                    <div className="con-top-div  my-auto">
                        <p className="con-label home-title text-center">Connectez-vous ou <Link style={{color: 'black'}} to="/">créez un compte</Link></p>
                        <div className="mx-auto my-auto con-div">
                            <div className="row h-100 d-flex flex-column">
                                <div className="col con-col">
                                    <label className="sr-text my-auto d-block mx-auto" htmlFor="mail"><strong>E-mail</strong></label>
                                    <input className=" my-auto con-input mx-auto ps-5 sr-text" type="email" id="mail" required/>
                                </div>
                                <div className="col">
                                    <label className="sr-text home-title d-block mx-auto" htmlFor="password"><strong>Mot de passe</strong></label>
                                    <input className="my-auto con-input mx-auto ps-5 sr-text" type="password" id="password" required/>
                                </div>
                            </div>
                        </div>
                        <div className="row con-row mx-auto mt-4">
                            <div className="col">
                                <Link to={referrer}>
                                    <button className="sr-text border-0 bg-transparent" style={{color: '#1E4E98'}}>
                                        <svg id="con-prev-arr" xmlns="http://www.w3.org/2000/svg" width="65" height="24" viewBox="0 0 65 24" fill="none">
                                            <path d="M0.93934 10.9393C0.353553 11.5251 0.353553 12.4749 0.93934 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51472C13.1924 2.92893 13.1924 1.97918 12.6066 1.3934C12.0208 0.807612 11.0711 0.807612 10.4853 1.3934L0.93934 10.9393ZM65 10.5L2 10.5V13.5L65 13.5V10.5Z" fill="#1E4E98"/>
                                        </svg>&nbsp;<strong>Précédent</strong>
                                    </button>
                                </Link>
                            </div>
                            <div className="col d-flex justify-content-end">
                                <button type="submit" className="con-btn sr-text">
                                    <strong>Connexion</strong>&nbsp;
                                    <svg id="con-next-arr" xmlns="http://www.w3.org/2000/svg" width="65" height="24" viewBox="0 0 65 24" fill="none">
                                        <path d="M64.0607 13.0607C64.6464 12.4749 64.6464 11.5251 64.0607 10.9393L54.5147 1.3934C53.9289 0.807611 52.9792 0.807611 52.3934 1.3934C51.8076 1.97919 51.8076 2.92893 52.3934 3.51472L60.8787 12L52.3934 20.4853C51.8076 21.0711 51.8076 22.0208 52.3934 22.6066C52.9792 23.1924 53.9289 23.1924 54.5147 22.6066L64.0607 13.0607ZM0 13.5H63V10.5H0V13.5Z" fill="#FCDE67"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
     );
}
 
export default Connexion;