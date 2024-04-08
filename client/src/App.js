import logo from './logo.svg';
import './App.css';
import Slider from './components/Slider'
import Dropdown from './components/Dropdown';
import Top_header from './components/Top_header'
import React, { Component, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
import Home from './pages/Home';
import Department from './pages/Department';
import About from './pages/About';
import AdmissionConfirmation from './pages/AdmissionConfirmation';
import UnderDevelopment from './components/UnderDevelopment';
import Facilities from './pages/Facilities';
import StudentCorner from './pages/StudentCorner';
import { StudentAdmission } from './pages/StudentAdmission';
import { AccreditationReports } from './pages/AccreditationReports';
import { TrainingPlacements } from './pages/TrainingPlacements';
import Footer from './components/Footer'
import { GrievancesCommittee } from './pages/GrievancesCommittee';
import AlumniRegistrationForm from './pages/AlumniRegistration';
import AdminLogin from './pages/admin/AdminLogin';
import GPSInNews from './pages/GPSInNews'



const Layout = ({ children }) => {
  return (
    <>
      <Top_header />
      {children}
      <Footer />
    </>
  );

}


function App() {
  const { progress, setProgress } = useState(0);
  return (
    <>
      <Router>
        {!window.location.href.includes('/admin-login/') && <Top_header />}
        <LoadingBar color='bincludeslack' progress={100} shadow={true} height={4} />
        <Routes>

          <Route path='/' element={<Home />}></Route>
          <Route path='/dept/:branch/:content' element={<Department />}></Route>
          <Route path='/facilities/:facility' element={<Facilities />}></Route>
          <Route path='/about-institute/:page' element={<About />}></Route>
          <Route path='/library' element={<UnderDevelopment />}></Route>
          <Route path='/confirm-admission' element={<AdmissionConfirmation />}></Route>
          <Route path='/alumni/registration-form' element={<AlumniRegistrationForm />}></Route>
          <Route path='/students-corner/:page' element={<StudentCorner />}></Route>
          <Route path='/students-admission-process' element={<StudentAdmission />}></Route>
          <Route path='/accreditation-reports/:page' element={<AccreditationReports />}></Route>
          <Route path='/training-placements' element={<TrainingPlacements />}></Route>
          <Route path='/committe/:committee' element={<GrievancesCommittee />}></Route>
          <Route path='/gps-in-news' element={< GPSInNews />}></Route>

          <Route path='/admin-login/:page' element={<AdminLogin />}></Route>
        </Routes>
        {!window.location.href.includes('/admin-login/') && <Footer />}
      </Router>
    </>
  );
}

export default App;
