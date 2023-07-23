import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Footer = () => {
    return ( 
        <footer style={{overflowX: "hidden"}} id="foot">
            <div className="row flex-container2 ms-auto me-auto footer-row mt-5 p-0" style={{maxWidth: "90%"}}>
                <div className="col p-0">
                    <img src={process.env.PUBLIC_URL + '/Images/logoBlack.jpg'} className="footer-logo mb-3" alt="logo"/>
                </div>
                <div className="col footer-col h-100"></div>
                <div className="col-4 footer-col ps-5">
                    <p className="mb-3 footer-title">Liens utiles</p>
                    <div className="position-relative footer-text">
                        <p><a className="footer-link" href="#" style={{color: "#C30606"}}>Devenir un conducteur</a></p>
                        <p><a className="footer-link" href="#">Signaler un incident</a></p>
                        <p><a className="footer-link" href="#">Objet perdu ou volé</a></p>
                        <p><a className="footer-link" href="#">Conditions d'utilisation</a></p>
                    </div>
                </div>
                <div className="col-4 footer-col h-100 ps-5">
                    <p className="mb-3 footer-title">Communiquez avec nous</p>
                    <div className="position-relative footer-text">
                        <p>Lundi-Vendredi 8h-17h</p>
                        <p>1-800-000-0000 (Québec)</p>
                        <p>1-800-000-0001 (Ailleurs)</p>
                    </div>
                </div>
                <div className="col footer-col h-100"></div>
            </div>
            <div className="d-flex row" style={{backgroundColor: "black"}}>
                <div className="row ms-auto me-auto mt-2 mb-2 footer-brand-row" style={{maxWidth: "90%"}}>
                    <div className="col col-two justify-content-start d-flex" style={{color: "#FAF8EF"}}>
                        <p className="footer-title my-auto">2023 CarPoolCITY No rights yet reserved.</p>
                    </div>
                    <div className="col col-one justify-content-end d-flex">
                        <a className="footer-icon" href="#"><FontAwesomeIcon icon="fa-brands fa-reddit" style={{color: "#1e4e98"}} /></a>
                        <a className="footer-icon" href="#"><FontAwesomeIcon icon="fa-brands fa-facebook" style={{color: "#1e4e98"}} /></a>
                        <a className="footer-icon" href="#"><FontAwesomeIcon icon="fa-brands fa-square-instagram" style={{color: "#1e4e98"}} /></a>
                        <a className="footer-icon" href="#"><FontAwesomeIcon icon="fa-brands fa-twitter" style={{color: "#1e4e98"}} /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
 
export default Footer;