import './App.css';
import Login from './component/LoginUser';
import NewUser from './component/NewUser';
import GpsSummary from './component/GpsSummary';
import GpsDetails from './component/GpsDetail';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
function App() {

  return (
    <>
    <Router>
    <Routes>
        <Route exact path="/" element={<Login/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/signup" element={<NewUser/>}/>
          <Route exact path="/gpssummary" element={<GpsSummary/>}/>
          <Route exacgt path="/gpsdetail/:id" element={<GpsDetails/>}/>
        </Routes>
    </Router>
    </>
  );
}

export default App;
