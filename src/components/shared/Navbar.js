import { Link, useHistory } from 'react-router-dom';
import { rootPrefix } from '../../constants/global';
import { useContext, useEffect, useState, forwardRef } from 'react';
import ConnectionContext from '../../constants/ConnectionContext';
import TranslationContext from '../../constants/TranslationContext';
import { jsonServerRoot } from '../../constants/global';
import {Dropdown} from 'react-bootstrap';
import DropdownButton from 'react-bootstrap/DropdownButton';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Navbar = () => {
    const { isConnected, setIsConnected, setReferrer } = useContext(ConnectionContext);
    const { isEnglish, setIsEnglish, isContactPage, setIsContactPage } = useContext(TranslationContext);
    const h = useHistory();
    let localUrl = '';
    const translationSwitch = document.getElementById('translation-switch');
    const [translation, setTranslation] = useState(null);

    useEffect(() => {
        localUrl = window.location.pathname;
    }, [translation])

    useEffect(() => {
        if(document.getElementById('con') !== null)
        {
            document.getElementById('con').addEventListener('click', () => {
                setReferrer(localUrl);
                h.push(rootPrefix + "/connexion");
            })
        }
    })

    useEffect(() => {
        setIsContactPage(window.location.pathname.includes('contact'));

        if(translationSwitch !== null && window.location.pathname.includes('contact'))
        {
            document.getElementById('translation-switch').checked = isEnglish;
        }
    }, [translationSwitch, isContactPage, isEnglish, window.location.pathname])


    useEffect(() => {
        if(translationSwitch !== null && window.location.pathname.includes('contact'))
        {
            document.getElementById('translation-switch').addEventListener('click', () => {
                setIsEnglish(!isEnglish);
            });
        }
    })

    useEffect(() => {
        const uri = (isContactPage && isEnglish) ? `${jsonServerRoot}/EnglishTranslation` : `${jsonServerRoot}/FrenchTranslation`;
        fetch(uri)
            .then(res => {
                if(res.ok)
                    return res.json()
                else
                    throw Error('Une erreur est survenue veuillez réessayer plus tard.')
            })
            .then((data) => {
                setTranslation(data);
            })
    }, [isEnglish, isContactPage]);

    const CustomToggle = forwardRef(({ children, onClick }, ref) => (
        <button ref={ref} onClick={(e) => {e.preventDefault(); onClick(e);}} id='account-btn' className='border-0 bg-transparent nav-link'>
            {children}
        </button>
      ));

      useEffect(() => {
        if(document.getElementById('disconnect') !== null)
        {
            document.getElementById('disconnect').addEventListener('click', () => {
                setIsConnected(!isConnected);
            });
        }
    })


    return ( 
        <>
            {translation && <nav className="navbar navbar-expand-md bg-transparent">
                <Link className="navbar-brand ms-4" to={rootPrefix}><img className="logo" src={process.env.PUBLIC_URL + '/Images/logoWhite.jpg'}/></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-collapse collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto me-3">
                        <li className="nav-item nav-red home active">
                            <Link className="nav-link" to={rootPrefix}>{translation.home}</Link>
                        </li>
                        <li className="nav-item nav-red how">
                            <Link className="nav-link" to={rootPrefix+"#how"}>{translation.functioning}</Link>
                        </li>
                        <li className="nav-item nav-red contact">
                            <Link className="nav-link" to={rootPrefix+"/contact"}>Contact</Link>
                        </li>
                        {!isConnected && <li className="nav-item">
                            <button id='con' className="nav-link border-0 bg-transparent">{translation.connection}</button>
                        </li>}
                        {isConnected && <li className="nav-item">
                        <Dropdown>
                            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                            <svg id="red-wheel" xmlns="http://www.w3.org/2000/svg" width="28" height="26" viewBox="0 0 28 26" fill="none">
                                <path d="M27.6424 16.1242L25.1303 14.8347C25.3838 13.6185 25.3838 12.371 25.1303 11.1548L27.6424 9.86533C27.9313 9.71856 28.061 9.41453 27.9667 9.13147C27.3121 7.26534 26.1976 5.57745 24.7411 4.17261C24.517 3.9577 24.1514 3.90528 23.8683 4.05205L21.3562 5.34156C20.3006 4.53431 19.0859 3.91052 17.7709 3.50165V0.927868C17.7709 0.634321 17.5409 0.377467 17.2165 0.314564C15.0524 -0.115273 12.8351 -0.0943054 10.7771 0.314564C10.4527 0.377467 10.2227 0.634321 10.2227 0.927868V3.50689C8.91362 3.921 7.69884 4.54479 6.63739 5.3468L4.13118 4.05729C3.84223 3.91052 3.48252 3.9577 3.25843 4.17786C1.80188 5.57745 0.687357 7.26534 0.0327941 9.13671C-0.0674542 9.41977 0.0681759 9.7238 0.357127 9.87058L2.86923 11.1601C2.61566 12.3762 2.61566 13.6238 2.86923 14.8399L0.357127 16.1294C0.0681759 16.2762 -0.0615572 16.5802 0.0327941 16.8633C0.687357 18.7294 1.80188 20.4173 3.25843 21.8221C3.48252 22.0371 3.84813 22.0895 4.13118 21.9427L6.64329 20.6532C7.69884 21.4605 8.91362 22.0842 10.2286 22.4931V25.0721C10.2286 25.3657 10.4586 25.6225 10.783 25.6854C12.9471 26.1153 15.1644 26.0943 17.2224 25.6854C17.5468 25.6225 17.7767 25.3657 17.7767 25.0721V22.4931C19.0859 22.079 20.3006 21.4552 21.3621 20.6532L23.8742 21.9427C24.1632 22.0895 24.5229 22.0423 24.747 21.8221C26.2035 20.4226 27.318 18.7347 27.9726 16.8633C28.061 16.575 27.9313 16.271 27.6424 16.1242ZM13.9968 17.1883C11.3962 17.1883 9.27923 15.3064 9.27923 12.9948C9.27923 10.6831 11.3962 8.80123 13.9968 8.80123C16.5974 8.80123 18.7144 10.6831 18.7144 12.9948C18.7144 15.3064 16.5974 17.1883 13.9968 17.1883Z" fill="#C30606"/>
                            </svg>&nbsp;{translation.account}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className='dropdow-menu'>
                                <Dropdown.Item href="#">{translation.rides}</Dropdown.Item>
                                <Dropdown.Item href="#">{translation.info}</Dropdown.Item>
                                <Dropdown.Item id='disconnect' href={rootPrefix}>{translation.disconnect}</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        </li>}
                        {isContactPage &&
                            <li className="nav-item">
                                <div className="d-flex nav-link" id="translation-div">
                                    {isEnglish && <p className='my-auto pb-3 me-2' style={{fontSize: "2.6vmin"}} id='prating'>
                                        { translation.french }
                                    </p>}
                                    <label className="switch mb-1">
                                        <input id='translation-switch' type="checkbox" value={isEnglish} />
                                        <span className="slider round"></span>
                                    </label> 
                                    {!isEnglish && <p className='my-auto ms-2 pb-3' style={{fontSize: "2.6vmin"}} id='prating'>
                                        { translation.english }
                                    </p>}
                                </div>
                            </li>
                        }
                    </ul>
                </div>
            </nav>}
        </>
     );
}
 
export default Navbar;