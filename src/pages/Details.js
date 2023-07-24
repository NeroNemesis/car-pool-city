import { useContext, useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import TQContext from "../constants/TQContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { rootPrefix, jsonServerRoot } from "../constants/global";

const Details = () => {
    const { id } = useParams();
    const [ driver, setDriver ] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const { TQ } = useContext(TQContext);
    const confirmationBtn = document.getElementById('confirmation-btn')
    const [confirmationBtnDisabled, setConfirmationBtnDisabled] = useState(false);
    const [showToolTip, setShowToolTip] = useState(false);
    const [inputs, setInputs] = useState(document.getElementsByClassName('day-selector'));
    const [dayChecked, setDayChecked] = useState(false);
    const h = useHistory();
    

    useEffect(() => {
        const uri = `${jsonServerRoot}/Drivers?id=` + id;
        setTimeout(() => {
            fetch(uri)
                .then(res => {
                    if(res.ok)
                        return res.json()
                    else
                        throw Error('Une erreur est survenue veuillez réessayer plus tard.')
                })
                .then((data) => {
                    setDriver(data.find(x => x))
                    setIsPending(false);
                    setError(null);
                })
                .catch(err => {
                    setIsPending(false);
                    setError(err.message);
                })
        }, (1000));
    }, []);

    const disableConfirmationBtn = (value) => {
        setConfirmationBtnDisabled(value);
    }

    useEffect(() => {
        if(inputs.length > 0)
        {
            if(TQ)
            {
                const inputs_ = Array.prototype.slice.call(inputs);
                const enable = inputs_.some(input => input.checked);
                setConfirmationBtnDisabled(!enable)
                if(confirmationBtn !== null)
                {
                    if(confirmationBtnDisabled === true)
                        setShowToolTip(true);
                    else
                        setShowToolTip(false);
                }
            }
        }
    }, [driver, dayChecked, confirmationBtnDisabled])

    const handleInputChange = () => 
    {
        setDayChecked(!dayChecked);
    }

    useEffect(() => {
        if(confirmationBtn != null)
        {
            confirmationBtn.addEventListener('click', () => {
                h.push(rootPrefix + `/confirmation/${driver.name.split(" ")[0]}`)
            })
        }
    })

    return ( 
        <>
            { error && <div className='mt-5 mx-5'><h2></h2></div>}
            { isPending && <div className='mt-5 mx-5'><h2>Chargement en cours....</h2></div>}
            {driver && (
                <>
                    <div className="mt-5 d-flex" id="details-page-title">
                        <span>Détails de la réservation avec {driver.name.split(" ")[0]}</span>
                        <div className="d-flex justify-content-center ms-2">
                            <p className='stepper my-auto ms-2 me-0 justify-content-center'>3</p>
                        </div>
                    </div>
                    <div id="red-line"></div>
                    <div id="details" className="flex-container3 mx-auto">
                        {TQ && 
                            <>
                                <div className="d-flex">
                                    <div className="mt-5 d-flex vertical-red-line"></div>
                                    <span className="sr-text mt-5 ms-3" style={{fontWeight: '400'}}>Veuillez sélectionner les jours de trajet</span>
                                </div>
                                <div className="row d-flex sr-text mt-3">
                                    <div className="col d-flex">
                                        <label className="switch mb-1">
                                            <input className="day-selector" id='lundi' value={dayChecked} onChange={handleInputChange} type="checkbox" />
                                            <span className="slider round"></span>
                                        </label> 
                                        <p className='my-auto ms-2' style={{fontSize: "2.6vmin"}} id='plundi'>
                                            <strong>Lundi</strong>
                                        </p>
                                    </div>
                                    <div className="col d-flex">
                                        <label className="switch mb-1">
                                            <input className="day-selector" id='mardi' value={dayChecked} onChange={handleInputChange} type="checkbox" />
                                            <span className="slider round"></span>
                                        </label> 
                                        <p className='my-auto ms-2' style={{fontSize: "2.6vmin"}} id='pMardi'>
                                            <strong>Mardi</strong>
                                        </p>
                                    </div>
                                    <div className="col d-flex">
                                        <label className="switch mb-1">
                                            <input className="day-selector" id='mercredi' value={dayChecked} onChange={handleInputChange} type="checkbox" />
                                            <span className="slider round"></span>
                                        </label> 
                                        <p className='my-auto ms-2' style={{fontSize: "2.6vmin"}} id='pmercredi'>
                                            <strong>Mercredi</strong>
                                        </p>
                                    </div>
                                    <div className="col d-flex">
                                        <label className="switch mb-1">
                                            <input className="day-selector" id='jeudi' value={dayChecked} onChange={handleInputChange} type="checkbox" />
                                            <span className="slider round"></span>
                                        </label> 
                                        <p className='my-auto ms-2' style={{fontSize: "2.6vmin"}} id='pjeudi'>
                                            <strong>Jeudi</strong>
                                        </p>
                                    </div>
                                    <div className="col d-flex">
                                        <label className="switch mb-1">
                                            <input className="day-selector" id='vendredi' value={dayChecked} onChange={handleInputChange} type="checkbox" />
                                            <span className="slider round"></span>
                                        </label> 
                                        <p className='my-auto ms-2' style={{fontSize: "2.6vmin"}} id='pvendredi'>
                                            <strong>Vendredi</strong>
                                        </p>
                                    </div>
                                    <div className="col d-flex">
                                        <label className="switch mb-1">
                                            <input className="day-selector" id='samedi' value={dayChecked} onChange={handleInputChange} type="checkbox" />
                                            <span className="slider round"></span>
                                        </label> 
                                        <p className='my-auto ms-2' style={{fontSize: "2.6vmin"}} id='psamedi'>
                                            <strong>Samedi</strong>
                                        </p>
                                    </div>
                                    <div className="col d-flex">
                                        <label className="switch mb-1">
                                            <input className="day-selector" id='dimanche' value={dayChecked} onChange={handleInputChange} type="checkbox" />
                                            <span className="slider round"></span>
                                        </label> 
                                        <p className='my-auto ms-2' style={{fontSize: "2.6vmin"}} id='pdimanche'>
                                            <strong>Dimanche</strong>
                                        </p>
                                    </div>
                                </div>
                            </>
                        }
                        <div className="d-flex mt-5">
                            <div className="mt-5 d-flex vertical-red-line"></div>
                            <span className="sr-text mt-5 ms-3" style={{fontWeight: '400'}}>Trajet</span>
                        </div>
                        <div className="row d-flex flex-column mt-3">
                            <div className="col">
                                <div className="row d-flex trajet-details">
                                    <div className="col">
                                        <p className="driver-txt m-0">Départ: <strong>{driver.departTime}</strong></p>                                        
                                    </div>
                                    <div className="col-md-auto">
                                        <p className="driver-txt m-0">Lieu de départ: <strong>{driver.meetUpLocation}</strong></p>
                                    </div>
                                    <div className="col d-flex justify-content-end details-last-col">
                                        <p className="driver-txt m-0">
                                            Note:&nbsp;
                                            <strong>
                                                {driver.rating}&nbsp;
                                                <svg className="mb-2" id='red-star' xmlns="http://www.w3.org/2000/svg" width="33" height="32" viewBox="0 0 33 32" fill="none">
                                                    <path d="M31.1578 10.4804L22.1898 9.17888L18.1815 1.08846C17.4634 -0.35364 15.3825 -0.371971 14.6582 1.08846L10.6499 9.17888L1.68191 10.4804C0.0736882 10.7126 -0.570828 12.6864 0.595439 13.8168L7.08357 20.1107L5.54901 29.0016C5.27279 30.6087 6.97308 31.8125 8.39716 31.0609L16.4198 26.8629L24.4425 31.0609C25.8666 31.8064 27.5669 30.6087 27.2907 29.0016L25.7561 20.1107L32.2443 13.8168C33.4105 12.6864 32.766 10.7126 31.1578 10.4804ZM22.5949 19.0841L24.0497 27.5412L16.4198 23.551L8.79 27.5412L10.2448 19.0841L4.06969 13.0958L12.6019 11.8614L16.4198 4.16209L20.2378 11.8614L28.77 13.0958L22.5949 19.0841Z" fill="#C30606"/>
                                                </svg>
                                            </strong>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div id="second-details-col" className="col">
                                <div className="row d-flex trajet-details">
                                    <div className="col">
                                        <p className="driver-txt m-0">Arrivé estimée: <strong>{driver.arrivalTime}</strong></p>
                                    </div>
                                    <div className="col-md-auto">
                                        <p className="driver-txt m-0">Lieu d'arrivée: <strong>{driver.dropOffLocation}</strong></p>
                                    </div>
                                    <div className="col d-flex justify-content-end details-last-col">
                                        <p className="driver-txt">Prix:&nbsp;$<span style={{color: '#C30606'}}><strong>{driver.price}</strong></span>&nbsp;/trajet</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {TQ && <button id="confirmation-btn" className='mt-5 mx-auto my-auto searchButton2 driver-txt' style={{fontSize: "2.6vmin"}} disabled={confirmationBtnDisabled}>
                        Confirmer&nbsp;&nbsp;
                        <svg className='gold-arrow' xmlns="http://www.w3.org/2000/svg" width="64" height="24" viewBox="0 0 64 24" fill="none">
                            <path d="M63.1332 13.0607C63.719 12.4749 63.719 11.5251 63.1332 10.9393L53.5873 1.3934C53.0015 0.807611 52.0517 0.807611 51.4659 1.3934C50.8801 1.97919 50.8801 2.92893 51.4659 3.51472L59.9512 12L51.4659 20.4853C50.8801 21.0711 50.8801 22.0208 51.4659 22.6066C52.0517 23.1924 53.0015 23.1924 53.5873 22.6066L63.1332 13.0607ZM0 13.5H62.0725V10.5H0L0 13.5Z" fill="#FCDE67"/>
                        </svg>&nbsp;
                        { showToolTip && 
                            <FontAwesomeIcon 
                                icon="fa-solid fa-circle-info" 
                                title={"Vous devez sélectionner au moins un jour de répétition du trajet"} 
                                style={{color: "#FCDE67", fontSize: '3vmin'}} 
                            />
                        }
                    </button>}
                    {
                        !TQ && <Link className="mx-auto mb-2" to={rootPrefix + `/confirmation/${driver.name.split(" ")[0]}`}><button className='mt-5 mx-auto my-auto searchButton2 driver-txt' style={{fontSize: "2.6vmin"}} disabled={confirmationBtnDisabled}>
                        Confirmer&nbsp;&nbsp;
                        <svg className='gold-arrow' xmlns="http://www.w3.org/2000/svg" width="64" height="24" viewBox="0 0 64 24" fill="none">
                            <path d="M63.1332 13.0607C63.719 12.4749 63.719 11.5251 63.1332 10.9393L53.5873 1.3934C53.0015 0.807611 52.0517 0.807611 51.4659 1.3934C50.8801 1.97919 50.8801 2.92893 51.4659 3.51472L59.9512 12L51.4659 20.4853C50.8801 21.0711 50.8801 22.0208 51.4659 22.6066C52.0517 23.1924 53.0015 23.1924 53.5873 22.6066L63.1332 13.0607ZM0 13.5H62.0725V10.5H0L0 13.5Z" fill="#FCDE67"/>
                        </svg>
                        </button></Link>
                    }
                    <p className="sr-note2 mx-auto mb-auto"><span style={{color:'#C30606'}}>*</span>Les frais vous seront chargés après chaque trajets à la carte associée à votre compte.</p>
                </>
            )}
        </>
     );
}
 
export default Details;