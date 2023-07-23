import { useState, useEffect, useContext } from "react";
import $ from 'jquery';
import { Link, useHistory } from "react-router-dom";
import { rootPrefix } from "../../../constants/global";
import ConnectionContext from "../../../constants/ConnectionContext";
import DriverContext from "../../../constants/DriverContext";
import TQContext from "../../../constants/TQContext";

const Driver = ({driver, localUrl}) => {
    const [votes, setVotes] = useState(0);
    const [showDisplayControlBtn, setShowDisplayControlBtn] = useState(document.body.clientWidth < 1336 ? true : false);
    const [toggleDisplayControlBtn, setToggleDisplayControlBtn] = useState(document.body.clientWidth < 1336 ? false : true);
    const [showCardBody, setShowCardBody] = useState(document.body.clientWidth < 1336 ? false : true);
    const placeholderImage = process.env.PUBLIC_URL + '/Images/Drivers/no-pic.jpg';
    const { TQ } = useContext(TQContext);
    const { isConnected, setReferrer } = useContext(ConnectionContext);
    const { setId } = useContext(DriverContext);
    const history = useHistory();

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    useEffect(() => {
        setVotes(getRandomInt(0, 100));
    }, []);

    
    const changeToggleDisplayControlBtnValue = () => {
        setToggleDisplayControlBtn(!toggleDisplayControlBtn);

        setShowCardBody(!showCardBody);
    }

    const onImageError = (e) => {
        e.target.src = placeholderImage
    }

    const NavigateToCorrectUrl = () => {
        if(!isConnected)
        {
            history.push(rootPrefix + "/connexion/")
        }
        else
        {
            history.push(rootPrefix + `/details/${driver.id}/${TQ}`)
        }
    }

    const handleBookingBtnClick = () => {
        setId(driver.id);
        setReferrer(localUrl);
        NavigateToCorrectUrl();
    }

    return (
        <div className="driver-box me-auto card mb-5">
            <img className="driver-img my-auto mx-3" src={driver.imgUrl} onError={onImageError} alt="driver image" />
            {showDisplayControlBtn && <button className="driver-txt border-0 bg-transparent me-auto ms-3 mb-2" onClick={changeToggleDisplayControlBtnValue}>
                {!toggleDisplayControlBtn && <svg id="toggleUp" xmlns="http://www.w3.org/2000/svg" width="24" height="36" viewBox="0 0 24 36" fill="none">
                    <path d="M14.3291 18.0409L14.7189 17.6759L14.3291 17.311L0.948927 4.78357C0.349405 4.22225 0.350439 3.33006 0.951547 2.76989L2.92068 0.934886C3.54293 0.355029 4.56532 0.355054 5.18745 0.934868L5.18747 0.934886L22.0705 16.6679L22.0705 16.6679C22.6726 17.2289 22.6726 18.123 22.0706 18.6841L5.18747 34.4171C4.56523 34.9969 3.54283 34.9969 2.9207 34.4171L2.57981 34.7829L2.92068 34.4171L0.951547 32.5821C0.350439 32.0219 0.349405 31.1297 0.948929 30.5684L14.3291 18.0409Z" fill="#1E4E98" stroke="#1E4E98"/>
                </svg>}
                {!toggleDisplayControlBtn && " Afficher les détails"}
                {toggleDisplayControlBtn && <svg id="toggleDown" xmlns="http://www.w3.org/2000/svg" width="36" height="24" viewBox="0 0 37 24" fill="none">
                    <path d="M18.1461 14.4941L18.5111 14.884L18.8761 14.4941L31.4035 1.11397C31.9648 0.514444 32.857 0.515478 33.4171 1.11659L35.2522 3.08572C35.832 3.70797 35.832 4.73036 35.2522 5.35249L35.2522 5.35251L19.5191 22.2356L19.5191 22.2356C18.9581 22.8376 18.0641 22.8377 17.503 22.2356L1.76995 5.35251C1.19009 4.73027 1.19012 3.70787 1.76993 3.08574L1.40416 2.74485L1.76995 3.08572L3.60496 1.11659C4.16512 0.515478 5.05731 0.514444 5.61863 1.11397L18.1461 14.4941Z" fill="#1E4E98" stroke="#1E4E98"/>
                </svg>}
                {toggleDisplayControlBtn && " Masquer les détails"}
            </button>}
            {showCardBody && <div className="card-body">
                <div className="row">
                    <div className="col">
                        <span className="driver-title m-0"><strong>{driver.name}</strong>&nbsp;</span>
                        {driver.TQ && <span className="driver-title">{"(TQ)"}</span>}
                    </div>
                    <div className="col d-flex">
                        <p className="driver-txt">$<span style={{color: '#C30606'}}><strong>{driver.price}</strong></span>&nbsp;/trajet</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <p className="driver-txt m-0">Départ: <strong>{driver.departTime}</strong></p>
                        <p className="driver-txt m-0">Arrivé estimée: <strong>{driver.arrivalTime}</strong></p>
                    </div>
                    <div className="col">
                        <p className="driver-txt m-0">Véhicule: <strong>{driver.car}</strong></p>
                        <p className="driver-txt m-0">Expérience: <strong>{driver.experience} ans</strong></p>
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col">
                        <p className="driver-txt m-0">Lieu de départ: <strong>{driver.meetUpLocation}</strong></p>
                        <p className="driver-txt m-0">Lieu d'arrivée: <strong>{driver.dropOffLocation}</strong></p>
                    </div>
                    <div className="col">
                        <div className="row">
                            <div className="col d-flex flex-column align-items-baseline" style={{justifyContent:"flex-end"}}>
                                <p className="driver-txt mb-0">Note: <strong>{driver.rating}</strong>&nbsp;({votes + "votes"})</p>
                            </div>
                            <div className="col d-flex flex-column align-items-baseline" style={{justifyContent:"flex-end"}}>
                                <button className='searchButton2 mb-0' style={{fontSize: "2.6vmin"}} type='submit' onClick={handleBookingBtnClick}>
                                    Réserver&nbsp;&nbsp;
                                    <svg className='gold-arrow' xmlns="http://www.w3.org/2000/svg" width="64" height="24" viewBox="0 0 64 24" fill="none">
                                        <path d="M63.1332 13.0607C63.719 12.4749 63.719 11.5251 63.1332 10.9393L53.5873 1.3934C53.0015 0.807611 52.0517 0.807611 51.4659 1.3934C50.8801 1.97919 50.8801 2.92893 51.4659 3.51472L59.9512 12L51.4659 20.4853C50.8801 21.0711 50.8801 22.0208 51.4659 22.6066C52.0517 23.1924 53.0015 23.1924 53.5873 22.6066L63.1332 13.0607ZM0 13.5H62.0725V10.5H0L0 13.5Z" fill="#FCDE67"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    );
}
 
export default Driver;