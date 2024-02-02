import './App.css';
import Home from './components/Home'
import AdminLogIn from './components/AdminLogIn'
import AdminSignUp from './components/AdminSignUp'
import EmployeeLogIn from './components/EmployeeLogIn'
import EmployeeDashboard from './components/EmployeeDashboard'
import Header from './components/Header'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



function App() {
  return (
    <div className="app">
      <Header/>
      <div className="body">
        <div className="navbar">        
            <Navbar/>
        </div>
        <div className="pages">
          This is the body
            <Router>
                <Routes>
                    <Route path={"/"} element={<Home/>} />
                    <Route path={"/adminsignup"} element={<AdminSignUp/>} />
                    <Route path={"/adminlogin"} element={<AdminLogIn />} />
                    <Route path={"/employeelogin"} element={<EmployeeLogIn />} />
                    <Route path={"/employeedashboard"} element={<EmployeeDashboard />} />
                </Routes>
            </Router>
        </div>
        </div>
        </div>
  );
}

export default App;