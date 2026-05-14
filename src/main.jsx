import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51TPgHkQl2ttgedD2vARMX0KKGeDDZjvR0hfLDH6NCNp994Ng2GfWtQe41p39IaNTA6g9um4gXwcpt6ervn3EwG4g00dFetZIRB");

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)