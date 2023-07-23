import { useState } from 'react';
import Search from '../components/shared/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Home = () => {
    return ( 
        <div className='flex-container'>
            <div id="home" className="flex-container3 section" style={{height: 'fit-content'}}>
                <div style={{minHeight: "17vh"}}></div>
                <img src={process.env.PUBLIC_URL + '/Images/figmaCar.png'} alt="Blue car" className="mx-auto" id="blueCar"/>
                <div className="d-block text-center mt-5">
                    <p className="mb-5 home-text">Le covoiturage par des gens de votre ville qui tiennent à vous.</p>
                    <p className="footer-title">Commencez ici !</p>
                    <a href="#how"><img src={process.env.PUBLIC_URL + '/Images/arrowBlue.jpg'} alt="blue arrow" id="arrowBlue" /></a>
                    <a className='d-block mt-5' style={{textDecorationColor: "black", fontWeight: "bold", color: "black"}} href="#search">ou cliquez ici pour sauter le tutoriel</a>
                </div>
            </div> 
            <div id="how" className="section mt-5">
                <p className="text-center home-title mt-5 mb-5">Comment ça marche ?</p>
                <div className="d-flex justify-content-center">
                    <video className='mb-5' src="" controls="controls" autoPlay={true}/>
                </div>
                <ul className="progressBar mt-5">
                    <li>
                        <FontAwesomeIcon className="howIcon" icon="fa-solid fa-road" style={{color: "#1e4e98",}} />
                        <div>
                            <h4 className='mt-3 howTitle'>Réservez un trajet</h4>
                            <p className='mt-3 howText p-3'>Réserver un trajet est assez simple. Il vous suffit de: vous rendre à la section en-dessous 
                            de celle-ci et de rentrer les informations requises en commençant par le lieu de départ, suivi
                            du lieu d'arrivée, suivi de la date de départ, suivi de l'heure de départ et enfin de l'heure espérée
                            d'arrivée et ensuite de cliquez sur le boutton "C'est parti !".</p>
                            <p className='howText ps-3 pe-3'>Il vous est aussi possible d'indiquez si ceci est un trajet quotidien, c'est-à-dire s'il est
                            répétitif, ainsi il nous sera possible de vous montrer des conducteurs qui effectuent ce trajet régulièrement.</p>
                        </div>
                    </li>
                    <li>
                        <FontAwesomeIcon className='howIcon' icon="fa-solid fa-car" style={{color: "#1e4e98",}} />
                        <div>
                            <h4 className='mt-3 howTitle'>Choisissez un conducteur</h4>
                            <p className='howText mt-3 p-3'>
                                Une fois le trajet entré et validé, vous serez dirigez vers les résultats correspondant à vos critères de recherche.
                                Ces résultats peuvent être trié avec la recherche par facettes mise à disposition et incluent les conducteurs effectuant le 
                                parcours que vous avez entré ainsi que le prix recommandé pour ce parcours. Il vous suffit juste de choisir le conducteur se 
                                raprochant le plus de vos critères et votre budget. N'hésitez pas à consulter le prix recommandé pour avoir une estimation 
                                de ce que vous devriez payer.
                            </p>
                            <p className='howText ps-3 pe-3'>
                                Veuillez noter que le prix recommandé par la plateforme n'est qu'un prix indicatif. Il s'agit ici d'une estimation de
                                ce que vous devriez payer pour un trajet similaire au votre. Le prix affiché par les conducteurs peut donc être différent
                                et il varie entre +-2$ pour les petits trajets (mois de 15km) et +-5$ pour les longs trajets (plus de 15km).
                            </p>
                        </div>
                    </li>
                    <li>
                        <FontAwesomeIcon className='howIcon' icon="fa-solid fa-location-dot" style={{color: "#1e4e98",}} />
                        <div>
                            <h4 className='mt-3 howTitle'>Arrivez à destination !</h4>
                            <p className='howText mt-3 p-3'>
                                Maintenant que le choix du conducteur a été fait et validé, il sera possible de voir un message de confirmation.
                                Vous recevrez aussi un e-mail contenant les détails du trajet aini que les coordonnées du conducteur. Prennez note
                                que la facturation est effectuée seulement une fois le trajet terminé.
                            </p>
                            <p className='howText ps-3 pe-3'>
                                Merci d'avoir choisi CarPoolCITY, nous espérons que vous saurez apprécier le voyage plus que la destination. Défilez vers
                                le bas pour commencer !
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
            <Search isSearchPage={false}/>
        </div>
        
     );
}
 
export default Home;