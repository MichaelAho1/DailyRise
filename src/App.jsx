import Home from './HomePage/Home.jsx'
import Calender from './CalenderPage/CalenderSection.jsx';
import Info from './InfoPage/InfoPage.jsx';
import { HashRouter, Routes, Route } from 'react-router-dom'

function App() {
  return(
    <div>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/calender" element={<Calender />} />
          <Route path="/info" element={<Info />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App