import { useParams } from 'react-router-dom';
import Search from '../components/shared/Search';
import Driver from '../components/pages/SearchResults/Driver';
import { useState, useEffect, useContext } from 'react';
import { jsonServerRoot } from '../constants/global';
import TQContext from '../constants/TQContext';

const SearchResults = () => {
    const {  startLocation, endLocation, selectedDate, startTime, endTime } = useParams();
    const [Drivers, setDrivers] = useState(null);
    const [showFilters, setShowFilters] = useState(false);
    const [price, setPrice] = useState(0);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const { TQ } = useContext(TQContext);
    const [localUrl, setLocalUrl] = useState(null);

    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(3);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = Drivers ? Drivers.slice(indexOfFirstRecord, indexOfLastRecord) : [];
    const nPages = Drivers ? Math.ceil(Drivers.length / recordsPerPage) : -1;
    const totalRecords = Drivers ? Drivers.length : -1;
    const [displayString, setDisplayString] = useState("");

    //filter
    const [sortByExperience, setSortByExperience] = useState(false);
    const [sortByPrice, setSortByPrice] = useState(false);
    const [sortByRating, setSortByRating] = useState(true);

    const changeSortByExperience = async () => {
        setSortByExperience(!sortByExperience);
    };

    const changeSortByPrice = async () => {
        setSortByPrice(!sortByPrice);
    };

    const changeSortByRating = async () => {
        setSortByRating(!sortByRating);
    };

    if(document.getElementById('filterSwitches') !== null)
    {
        let byExperience = document.getElementById("experience");
        let byPrice = document.getElementById("price");
        let byRating = document.getElementById("rating");

        byExperience.addEventListener("change", async (e) => {
            changeSortByExperience();

            if(byExperience.checked && !byPrice.checked && !byRating.checked)
            {
                Drivers.sort((a, b) => b.experience - a.experience);
                setDrivers(Drivers);
            }
            else if(byExperience.checked && byPrice.checked && !byRating.checked)
            {
                Drivers.sort((a, b) => ( a.price - b.price || b.experience - a.experience ));
                setDrivers(Drivers);
            }
            else if(byExperience.checked && !byPrice.checked && byRating.checked)
            {
                Drivers.sort((a, b) => ( b.rating - a.rating || b.experience - a.experience ));
                setDrivers(Drivers);
            }
            else if(byExperience.checked && byPrice.checked && byRating.checked)
            {
                Drivers.sort((a, b) => ( b.rating - a.rating || a.price - b.price || b.experience - a.experience ));
                setDrivers(Drivers);
            }
            else if(!byExperience.checked && byPrice.checked && byRating.checked)
            {
                Drivers.sort((a, b) => ( b.rating - a.rating || a.price - b.price ));
                setDrivers(Drivers);
            }
            else if(!byExperience.checked && !byPrice.checked && byRating.checked)
            {
                Drivers.sort((a, b) => ( b.rating - a.rating ));
                setDrivers(Drivers);
            }
            else if(!byExperience.checked && byPrice.checked && !byRating.checked)
            {
                Drivers.sort((a, b) => ( a.price - b.price ));
                setDrivers(Drivers);
            }
            else
            {
                Drivers.sort((a, b) => a.id - b.id);
                setDrivers(Drivers);
            }
            e.preventDefault();
        });

        byPrice.addEventListener('change', async (e) => {
            changeSortByPrice();

            if(!byExperience.checked && byPrice.checked && !byRating.checked)
            {
                Drivers.sort((a, b) => a.price - b.price);
                setDrivers(Drivers);
            }
            else if(byExperience.checked && byPrice.checked && !byRating.checked)
            {
                Drivers.sort((a, b) => ( b.experience - a.experience || a.price - b.price ));
                setDrivers(Drivers);
            }
            else if(!byExperience.checked && byPrice.checked && byRating.checked)
            {
                Drivers.sort((a, b) => ( b.rating - a.rating || a.price - b.price ));
                setDrivers(Drivers);
            }
            else if(byExperience.checked && byPrice.checked && byRating.checked)
            {
                Drivers.sort((a, b) => ( b.experience - a.experience || b.rating - a.rating || a.price - b.price ));
                setDrivers(Drivers);
            }
            else if(byExperience.checked && !byPrice.checked && byRating.checked)
            {
                Drivers.sort((a, b) => ( b.experience - a.experience || b.rating - a.rating ));
                setDrivers(Drivers);
            }
            else if(!byExperience.checked && !byPrice.checked && byRating.checked)
            {
                Drivers.sort((a, b) => b.rating - a.rating);
                setDrivers(Drivers);
            }
            else if(byExperience.checked && !byPrice.checked && !byRating.checked)
            {
                Drivers.sort((a, b) => b.experience - a.experience);
                setDrivers(Drivers);
            }
            else
            {
                Drivers.sort((a, b) => a.id - b.id);
                setDrivers(Drivers);
            }
            e.preventDefault();
        });

        byRating.addEventListener('change', (e) => {
            changeSortByRating();

            if(!byExperience.checked && !byPrice.checked && byRating.checked)
            {
                Drivers.sort((a, b) => b.rating - a.rating);
                setDrivers(Drivers);
            }
            else if (byExperience.checked && !byPrice.checked && byRating.checked) {
                Drivers.sort((a, b) => (b.experience - a.experience || b.rating - a.rating));
                setDrivers(Drivers);
            }
            else if (!byExperience.checked && byPrice.checked && byRating.checked) {
                Drivers.sort((a, b) => (a.price - b.price || b.rating - a.rating));
                setDrivers(Drivers);
            }
            else if (byExperience.checked && byPrice.checked && byRating.checked) {
                Drivers.sort((a, b) => (b.experience - a.experience || a.price - b.price || b.rating - a.rating));
                setDrivers(Drivers);
            }
            else if (byExperience.checked && byPrice.checked && !byRating.checked) {
                Drivers.sort((a, b) => (b.experience - a.experience || a.price - b.price));
                setDrivers(Drivers);
            }
            else if (byExperience.checked && !byPrice.checked && !byRating.checked) {
                Drivers.sort((a, b) => b.experience - a.experience);
                setDrivers(Drivers);
            }
            else if (!byExperience.checked && byPrice.checked && !byRating.checked) {
                Drivers.sort((a, b) => a.price - b.price);
                setDrivers(Drivers);
            }
            else {
                Drivers.sort((a, b) => a.id - b.id);
                setDrivers(Drivers);
            }
            e.preventDefault();
        });
    }

    useEffect(() => {
        setLocalUrl(window.location.pathname);
    }, [localUrl])
    
    useEffect(() => {
        const uri = TQ ? `${jsonServerRoot}/Drivers?_sort=rating&_order=desc&TQ=true` : `${jsonServerRoot}/Drivers?_sort=rating&_order=desc`;
        setTimeout(() => {
            fetch(uri)
                .then(res => {
                    if(res.ok)
                        return res.json()
                    else
                        throw Error('Une erreur est survenue veuillez réessayer plus tard.')
                })
                .then((data) => {
                    setDrivers(data)
                    setIsPending(false);
                    setError(null);
                })
                .catch(err => {
                    setIsPending(false);
                    setError(err.message);
                })
        }, (1000));
    }
    , []);

    useEffect(() => {
        if(currentPage === nPages)
            setDisplayString(`Affichage des résultats ${currentRecords.find(x => x).id} à ${currentRecords.findLast(x => x).id} de ${totalRecords}`)
        else
            setDisplayString(`Affichage des résultats ${indexOfFirstRecord +1} à ${indexOfLastRecord} de ${totalRecords}`)
    }, [currentRecords, indexOfFirstRecord, indexOfLastRecord])

    useEffect(() => {
        if(document.getElementById('rating') !== null && document.getElementById('experience') !== null && document.getElementById('price') !== null)
        {
            document.getElementById('rating').checked = sortByRating;
            document.getElementById('experience').checked = sortByExperience;
            document.getElementById('price').checked = sortByPrice;
        }
    }, [showFilters]);

    const getPrice = () => {
        if(Drivers)
        {
            const r= Math.random();
            const maxPrice = Math.max(...Drivers.map(d => d.price));
            return Math.round((r * (maxPrice - (maxPrice - 2)) + (maxPrice - 2))*100)/100
        }
    }
    useEffect(() => {
        setPrice(getPrice());
    }, [Drivers])

    const nextPage = () => {
        if(currentPage !== nPages) 
            setCurrentPage(currentPage + 1)
    }
    const prevPage = () => {
        if(currentPage !== 1) 
            setCurrentPage(currentPage - 1)
    }

    const changeShowFilters = () => {
        setShowFilters(!showFilters);
    }
      
    return ( 
        <>
            <Search 
                isSearchPage={true} 
                startLocation={startLocation} 
                endLocation={endLocation} 
                selectedDate={new Date(selectedDate)} 
                startTime={new Date(startTime)} 
                endTime={new Date(endTime)}
            />
            <div className="d-flex justify-content-center mt-5">
                <p className='stepper my-auto ms-2 me-0 justify-content-center'>2</p>
            </div>
            <div className="row sr-row1 ms-5 me-5 mt-3 d-flex justify-content-between sr-text">
                <div id='displayString' className="col d-flex justify-content-start col-two">
                    {Drivers && <span className='sr-text'>{displayString}</span>}
                </div>
                <div id="priceTxt" className="col d-flex justify-content-end col-one">
                    <span className='sr-text'>Prix recommendé pour ce trajet : {price}$</span>
                </div>
            </div>
            <div className="row ms-5 me-5 mt-3 d-flex justify-content-between sr-text">
                <div className="col d-flex justify-content-start">
                    <button className='border-0 bg-transparent' id="filter" onClick={changeShowFilters}>
                        <svg className='filter-logo' xmlns="http://www.w3.org/2000/svg" width="54" height="50" viewBox="0 0 54 50" fill="none">
                            <path d="M31.5241 42.1769H24.8874C24.4474 42.1769 24.0254 42.362 23.7142 42.6916C23.4031 43.0212 23.2283 43.4682 23.2283 43.9342V47.449C23.2283 47.9151 23.4031 48.3621 23.7142 48.6916C24.0254 49.0212 24.4474 49.2063 24.8874 49.2063H31.5241C31.9641 49.2063 32.3861 49.0212 32.6973 48.6916C33.0084 48.3621 33.1832 47.9151 33.1832 47.449V43.9342C33.1832 43.4682 33.0084 43.0212 32.6973 42.6916C32.3861 42.362 31.9641 42.1769 31.5241 42.1769ZM18.2508 35.1474H13.2733V1.75737C13.2733 1.29129 13.0985 0.844292 12.7874 0.514722C12.4762 0.185151 12.0542 0 11.6142 0H8.29587C7.85583 0 7.43382 0.185151 7.12267 0.514722C6.81151 0.844292 6.63671 1.29129 6.63671 1.75737V35.1474H1.65924C0.187772 35.1474 -0.556775 37.041 0.488495 38.147L8.78428 48.6912C9.0954 49.0205 9.51725 49.2055 9.9571 49.2055C10.3969 49.2055 10.8188 49.0205 11.1299 48.6912L19.4257 38.147C20.4648 37.0431 19.7254 35.1474 18.2508 35.1474ZM44.7973 14.059H24.8874C24.4474 14.059 24.0254 14.2441 23.7142 14.5737C23.4031 14.9032 23.2283 15.3502 23.2283 15.8163V19.3311C23.2283 19.7971 23.4031 20.2441 23.7142 20.5737C24.0254 20.9033 24.4474 21.0884 24.8874 21.0884H44.7973C45.2374 21.0884 45.6594 20.9033 45.9705 20.5737C46.2817 20.2441 46.4565 19.7971 46.4565 19.3311V15.8163C46.4565 15.3502 46.2817 14.9032 45.9705 14.5737C45.6594 14.2441 45.2374 14.059 44.7973 14.059ZM38.1607 28.1179H24.8874C24.4474 28.1179 24.0254 28.3031 23.7142 28.6326C23.4031 28.9622 23.2283 29.4092 23.2283 29.8753V33.39C23.2283 33.8561 23.4031 34.3031 23.7142 34.6327C24.0254 34.9622 24.4474 35.1474 24.8874 35.1474H38.1607C38.6007 35.1474 39.0228 34.9622 39.3339 34.6327C39.6451 34.3031 39.8199 33.8561 39.8199 33.39V29.8753C39.8199 29.4092 39.6451 28.9622 39.3339 28.6326C39.0228 28.3031 38.6007 28.1179 38.1607 28.1179ZM51.434 0H24.8874C24.4474 0 24.0254 0.185151 23.7142 0.514722C23.4031 0.844292 23.2283 1.29129 23.2283 1.75737V5.27211C23.2283 5.73819 23.4031 6.18518 23.7142 6.51476C24.0254 6.84433 24.4474 7.02948 24.8874 7.02948H51.434C51.874 7.02948 52.296 6.84433 52.6072 6.51476C52.9183 6.18518 53.0931 5.73819 53.0931 5.27211V1.75737C53.0931 1.29129 52.9183 0.844292 52.6072 0.514722C52.296 0.185151 51.874 0 51.434 0Z" fill="#C30606"/>
                        </svg>
                        <span className='sr-text ms-2'>Trier par</span>
                    </button>
                </div>
                <div className="col d-flex justify-content-end">
                    <span className="sr-note"><span style={{color:'#C30606'}}>*</span>TQ : Disponible pour trajets quotidiens</span>
                </div>
            </div>
            {showFilters && <div id="filterSwitches"  className='d-flex flex-column ms-5 me-5 mt-2'>
                <div className="d-flex my-2 ms-3">
                    <label className="switch mb-1">
                        <input id='experience' type="checkbox" value={sortByExperience}/>
                        <span className="slider round"></span>
                    </label> 
                    <p className='my-auto ms-2' style={{fontSize: "2.6vmin"}} id='pexperience'>
                        <strong>années d'expérience (décroissant)</strong>
                    </p>
                </div>
                <div className="d-flex my-2 ms-3">
                    <label className="switch mb-1">
                        <input id='price' type="checkbox" value={sortByPrice}/>
                        <span className="slider round"></span>
                    </label> 
                    <p className='my-auto ms-2' style={{fontSize: "2.6vmin"}} id='pprice'>
                        <strong>prix (croissant)</strong>
                    </p>
                </div>
                <div className="d-flex my-2 ms-3">
                    <label className="switch mb-1">
                        <input id='rating' type="checkbox" value={sortByRating}/>
                        <span className="slider round"></span>
                    </label> 
                    <p className='my-auto ms-2' style={{fontSize: "2.6vmin"}} id='prating'>
                        <strong>note (décroissant)</strong>
                    </p>
                </div>
            </div>}
            { error && <div className='mt-5 mx-5'><h2></h2></div>}
            { isPending && <div className='mt-5 mx-5'><h2>Chargement en cours....</h2></div>}
            {Drivers && <div className='flex-container mt-5 mx-5'>
                {currentRecords.map((driver) =>
                (
                    <Driver key={driver.id} driver={driver} localUrl={localUrl}/>
                ))}
                <div className='d-flex justify-content-center home-title'>
                    {currentPage > 1 && <button onClick={prevPage} className='bg-transparent border-0 my-auto'><svg className='redArrow2' xmlns="http://www.w3.org/2000/svg" width="61" height="24" viewBox="0 0 61 24" fill="none">
                        <path d="M0.93934 10.9393C0.353553 11.5251 0.353553 12.4749 0.93934 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51472C13.1924 2.92893 13.1924 1.97918 12.6066 1.3934C12.0208 0.807612 11.0711 0.807612 10.4853 1.3934L0.93934 10.9393ZM60.5374 10.5L2 10.5V13.5L60.5374 13.5V10.5Z" fill="#C30606"/>
                    </svg></button>}
                    &nbsp;Page {currentPage} de {nPages}&nbsp;
                    {currentPage < nPages && <button onClick={nextPage} className='bg-transparent border-0 my-auto'><svg className='redArrow2' xmlns="http://www.w3.org/2000/svg" width="61" height="24" viewBox="0 0 61 24" fill="none">
                        <path d="M60.5607 13.0607C61.1464 12.4749 61.1464 11.5251 60.5607 10.9393L51.0147 1.3934C50.4289 0.807612 49.4792 0.807612 48.8934 1.3934C48.3076 1.97918 48.3076 2.92893 48.8934 3.51472L57.3787 12L48.8934 20.4853C48.3076 21.0711 48.3076 22.0208 48.8934 22.6066C49.4792 23.1924 50.4289 23.1924 51.0147 22.6066L60.5607 13.0607ZM0.962646 13.5H59.5V10.5H0.962646V13.5Z" fill="#C30606"/>
                    </svg></button>}
                </div>
            </div>}
        </>
);
}
 
export default SearchResults;