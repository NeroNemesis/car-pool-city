import React from 'react';
import ReactDOM from 'react-dom/client';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas, faCircleQuestion } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFontAwesome, faFacebook, faReddit, faSquareInstagram } from '@fortawesome/free-brands-svg-icons'
import { BrowserRouter as Router} from 'react-router-dom';
import $ from 'jquery';
import './index.css';
import App from './App';

library.add(fas, faTwitter, faFontAwesome, faFacebook, faReddit, faSquareInstagram, faCircleQuestion)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

//Changing nav section onclick
$(function(){
  $(document).on('click', '.nav-red', function(){
      $('.nav-red').removeClass("active");
      $(this).addClass("active");
  });
});