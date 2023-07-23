import { useLocation, Route, Switch } from "react-router-dom";
import { rootPrefix } from "./constants/global";
import {useEffect, useState} from "react";
import HomePage from "./pages/Home"
import SearchPage from "./pages/SearchResults"
import Connexion from "./pages/Connexion";
import Details from "./pages/Details";
import BookingConfirmation from "./pages/BookingConfirmation";
import Contact from "./pages/Contact";

const useNavigation = () => {
    const location = useLocation();

    useEffect(() => {
        // if not a hash link, scroll to top
        if (location.hash === '') {
        window.scrollTo(0, 0);
        }
        // else scroll to id
        else {
        setTimeout(() => {
            const id = location.hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
            element.scrollIntoView();
            }
        }, 0);
        }
    }, [location]); // do this on route change

    return(
        <Switch>
            <Route exact path={rootPrefix}>
                <HomePage/>
            </Route>
            <Route path={rootPrefix + "/search/:startLocation/:endLocation/:selectedDate/:startTime/:endTime"}>
                <SearchPage/>
            </Route>
            <Route path={rootPrefix + "/connexion/"}>
                <Connexion/>
            </Route>
            <Route path={rootPrefix + "/details/:id"}>
                <Details/>
            </Route>
            <Route path={rootPrefix + "/confirmation/:name"}>
                <BookingConfirmation/>
            </Route>
            <Route path={rootPrefix + "/contact"}>
                <Contact/>
            </Route>
        </Switch>
    );
}
 
export default useNavigation;