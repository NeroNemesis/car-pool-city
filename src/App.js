import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import {useEffect, useState} from "react";
import useNavigation from "./useNavigation";
import { useLocation } from "react-router-dom";
import { ConnectionProvider } from "./constants/ConnectionContext";
import { DriverProvider } from "./constants/DriverContext";
import { TQProvider } from "./constants/TQContext";
import { TranslationProvider } from "./constants/TranslationContext";

function App() {
  const isConnexionPage = document.location.href.includes('connexion');
  const loc = useLocation();

  useEffect(() => {
    const sections = document.querySelectorAll(".section");
    const navItems = document.querySelectorAll(".nav-red");
    window.onscroll = () => {
      var current = "";
      
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 60) {
          current = section.id }
      });
  
      navItems.forEach((li) => {
        li.classList.remove("active");
        if (li.classList.contains(current)) {
          li.classList.add("active");
        }
      });
    };
  }, [loc]);

  useEffect(() => {
    window.addEventListener('load', function(){
      var home = document.querySelector('#home');
      var how = this.document.getElementById('#how');
    
      if(home === null || home === undefined)
      {
        var navs = document.querySelectorAll('.nav-red');
        navs.forEach(nav => nav.classList.remove('active'));
      }
    });
  }, [loc]);

  return (
    <div>
      <ConnectionProvider>
        {!isConnexionPage && <Navbar/>}
          <div className="flex-container mb-5">
            <DriverProvider>
              <TQProvider>
                <TranslationProvider>
                  {useNavigation()}
                </TranslationProvider>
              </TQProvider>
            </DriverProvider>
          </div>
        {!isConnexionPage && <Footer/>}
      </ConnectionProvider>
    </div>
  );
}

export default App;
