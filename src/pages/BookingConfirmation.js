import { useParams } from "react-router-dom";
import Search from "../components/shared/Search";

const BookingConfirmation = () => {
    const { name } = useParams()

    return ( 
        <>
            <div className="text-center mt-5 mb-5">
                <p className="home-title">Votre réservation avec {name} est confirmée !</p>
                <p className="sr-text mt-3">
                    Veuillez consulter les détails de la réservation dans le courriel que nous vous avons envoyé.
                    Il contient aussi les informations de contact du conducteur. N’hésitez pas à nous contactez 
                    si vous avez des questions !
                </p>
            </div>
            <Search isSearchPage={false}/>
        </>
     );
}
 
export default BookingConfirmation;