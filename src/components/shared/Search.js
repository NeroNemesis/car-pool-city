import { useEffect, useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DatePicker from 'react-datepicker';
import { rootPrefix } from '../../constants/global';
import 'react-datepicker/dist/react-datepicker.css'
import 'react-time-picker/dist/TimePicker.css';
import { useHistory } from 'react-router-dom';
import TQContext from '../../constants/TQContext';

const Search = (props) => {
    const [startLocation, setStartLocation] = useState(props.startLocation === undefined ? null : props.startLocation);
    const [endLocation, setEndLocation] = useState(props.endLocation === undefined ? null : props.endLocation)
    const [selectedDate, setSelectedDate] = useState(props.selectedDate === undefined ? false : props.selectedDate);
    const [startTime, setStartTime] = useState(props.startTime === undefined ? null : props.startTime);
    const [endTime, setEndTime] = useState(props.endTime === undefined ? null : props.endTime);
    const { TQ, setTQ } = useContext(TQContext);

    const filterStartTime = (time) => {
        const currentDate = new Date();
        const selTime= new Date(time);
        
        if(new Date(selectedDate).getDate() === currentDate.getDate())
            return currentDate.getTime() < selTime.getTime();
        else
            return true;
    };

    const filterEndTime = (time) => {
        const selectedDate = new Date(time);
    
        return startTime < selectedDate.getTime();
    };

    const handleTQChange = () => {
        setTQ(document.getElementById('tq').checked);
    };

    useEffect(() => {
        //console.log(props.TQ);
        document.getElementById('tq').checked = TQ;
    }, []);

    const history = useHistory();
    useEffect(() => {
        const form = document.querySelector('form');
        if(typeof(form) != undefined && form != null)
        {
            form.addEventListener('submit', function(e) {
                if (form.checkValidity() && startLocation && endLocation && selectedDate && startTime && endTime) {
                    history.push(rootPrefix + `/search/${startLocation}/${endLocation}/${selectedDate.toString()}/${startTime.toString()}/${endTime.toString()}`);
                }
                e.preventDefault();
            })
        }
    }, [startLocation, endLocation, selectedDate, startTime, endTime,TQ]);

    return ( 
        <div id='search' style={{overflowX: "hidden"}}>
            {!props.isSearchPage && <div className="row mt-5 mb-5 hRow">
                <div id="colToHide" className="col"></div>
                <div className='col'>
                    <div className="d-flex justify-content-center">
                        <p className="text-center home-title mt-auto mb-0">Où allez-vous ?</p>
                        <p className='stepper my-auto ms-2 me-0 justify-content-center'>1</p>
                    </div>
                </div>
                <div className='col d-flex justify-content-end' id="colToMove">
                    <a href="#" style={{textDecorationColor: "black", fontStyle: "italic", color: "black"}} className="mt-auto mb-0 pe-5 me-5">
                        <h5 style={{fontSize: "2.6vmin"}}>Devenir un conducteur&nbsp;&nbsp;<FontAwesomeIcon id="driverIcon" icon="fa-solid fa-arrow-right" style={{color: "#c30606"}} /></h5>
                    </a>
                </div>
            </div>}
            <form>
                <div className="row mt-5 ms-5 me-5 topSearchRow">
                    <div className="col">
                        <div className="row leftRighSearchRow">
                            <div className="col searchInput">
                                <FontAwesomeIcon className='searchIcon' icon="fa-solid fa-location-dot" style={{color: "#000000",}} />
                                <input
                                    value={startLocation == null ? "" : startLocation} 
                                    className="input-field" 
                                    type="text" 
                                    placeholder="Lieu de départ" 
                                    onChange={ location => setStartLocation(location.target.value) } 
                                    required
                                />
                            </div>
                            <div className="col searchInput">
                                <FontAwesomeIcon className='searchIcon' icon="fa-solid fa-location-dot" style={{color: "#000000",}} />
                                <input
                                    value={endLocation === null? "" : endLocation} 
                                    className="input-field" 
                                    type="text" 
                                    placeholder="Lieu d'arrivée" 
                                    onChange={location => setEndLocation(location.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col middleSearchCol">
                        <div className='row middleSearchRow'>
                            <div className="col"></div>
                            <div className="col-md-auto searchInput text-center">
                                <FontAwesomeIcon className='searchIcon' icon="fa-solid fa-calendar-days" style={{color: "#000000",}} />
                                <DatePicker 
                                    className='input-field'
                                    selected={selectedDate} 
                                    onChange={date => setSelectedDate(date)} 
                                    dateFormat='dd/MM/yyyy' minDate={new Date()}
                                    placeholderText='Quand ?' 
                                    showYearDropdown 
                                    scrollableYearDropdown
                                    required
                                    isClearable={false}
                                />
                            </div>
                            <div className="col"></div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="row leftRighSearchRow">
                            <div className="col searchInput">
                                <FontAwesomeIcon className='searchIcon' icon="fa-solid fa-clock" style={{color: "#000000",}} />
                                <DatePicker 
                                    className='input-field'
                                    selected={startTime} 
                                    showTimeSelect showTimeSelectOnly 
                                    dateFormat="HH:mm" timeIntervals={5}
                                    timeFormat="HH:mm" 
                                    onChange={ time => setStartTime(time) }
                                    filterTime={filterStartTime}
                                    placeholderText='Départ avant'
                                    required
                                    isClearable={false}
                                />
                            </div>
                            <div className="col searchInput">
                                <FontAwesomeIcon className='searchIcon' icon="fa-solid fa-clock" style={{color: "#000000",}} />
                                <DatePicker 
                                    className='input-field'
                                    selected={endTime} 
                                    showTimeSelect showTimeSelectOnly 
                                    dateFormat="HH:mm" timeIntervals={5} 
                                    timeFormat="HH:mm"
                                    onChange={ time => setEndTime(time) }
                                    filterTime={filterEndTime}
                                    placeholderText='Arrivée avant' 
                                    required
                                    disabled={startTime ? false : true}
                                    isClearable={false}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex mt-5 justify-content-center">
                    <label className="switch mb-1">
                        <input id='tq' type="checkbox" value={TQ} onChange={handleTQChange}/>
                        <span className="slider round"></span>
                    </label> 
                    <p className='my-auto ms-2' style={{fontSize: "2.6vmin"}} id='tqP'>
                        <strong>Trajet quotidien</strong>
                        &nbsp;&nbsp;
                        <FontAwesomeIcon 
                            icon="fa-solid fa-circle-info" 
                            title={"cliquez sur le boutton switch si ceci est un trajet qui vous ferez sur quotidiennement. Vous verez des conducteurs en mesure d'effectuer ce trajet quotidiennement avec vous."} 
                            style={{color: "#000000", fontSize: '3vmin'}} 
                        />
                    </p>
                </div>
                <div className='d-flex justify-content-center'>
                    {!props.isSearchPage && <button id='searchButton' className='bg-transparent border-0 home-title mt-5 mx-auto' type='submit'>
                        C'est parti ! <img className='redArrow' src={process.env.PUBLIC_URL + '/Images/arrowRedRight.jpg'} alt="red arrow" />
                    </button>}
                    {props.isSearchPage && <button id="searchPage-search" className='mt-5 mx-auto searchButton2 driver-txt' style={{fontSize: "2.6vmin"}} type='submit'>
                        Rechercher&nbsp;&nbsp;
                        <svg className='gold-arrow' xmlns="http://www.w3.org/2000/svg" width="64" height="24" viewBox="0 0 64 24" fill="none">
                            <path d="M63.1332 13.0607C63.719 12.4749 63.719 11.5251 63.1332 10.9393L53.5873 1.3934C53.0015 0.807611 52.0517 0.807611 51.4659 1.3934C50.8801 1.97919 50.8801 2.92893 51.4659 3.51472L59.9512 12L51.4659 20.4853C50.8801 21.0711 50.8801 22.0208 51.4659 22.6066C52.0517 23.1924 53.0015 23.1924 53.5873 22.6066L63.1332 13.0607ZM0 13.5H62.0725V10.5H0L0 13.5Z" fill="#FCDE67"/>
                        </svg>
                    </button>
                    }
                </div>
            </form>
        </div>
     );
}
 
export default Search;