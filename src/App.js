import './App.css';
import Nav from './Homepage/Navcomponent/Nav';
import HeroSection from './Homepage/HeroSection/HeroSection';
import { Routes, Route } from 'react-router-dom';
import NewsComponent from './NewsComponent/NewsComponent';
import FooterComponent from './FooterComponent/FooterComponent';
import EventComponent from './EventsComponent/EventsComponent';
import LoginComponent from './LoginComponent/LoginComponent';
import SignupComponent from './LoginComponent/SignupComponent';
import PaymentComponent from './FanzoneComponent/PaymentComponent';
import CheckoutComponent from './FanzoneComponent/CheckOutComponent';
import FanzoneComponent from './FanzoneComponent/FanzoneComponent';
import { AuthProvider } from './AuthContext/AuthProvider';
import LegalComponent from "./LegalComponent/LegalComponent";
import AboutComponent from './AboutComponent/AboutComponent';
import CookieComponent from './CookieConsentComponent/CookieComponent';


function App() {
  return (
    <AuthProvider>
      <Nav />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/matches/:id" element={<HeroSection />} />
        <Route path="/news" element={<NewsComponent />} />
        <Route path="/event" element={<EventComponent />} />
        <Route path="/checkout" element={<CheckoutComponent />} />
        <Route path="/payment" element={<PaymentComponent />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/signup" element={<SignupComponent />} />
        <Route path="/fanzone" element={<FanzoneComponent />} />
        <Route path="/legal" element={<LegalComponent />} />
        <Route path="/about" element={<AboutComponent/>}/>
      </Routes>
      <FooterComponent />
      <CookieComponent />
    </AuthProvider>
  );
}

export default App;
