import Home from './HomePage/Home.jsx'
import Calender from './CalenderPage/CalenderSection.jsx';
import Settings from './SettingsPage/Settings.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return(
    <div>
    <BrowserRouter>
      <Routes>
          <Route path="/home" element={<Home />} />
          <Route index element={<Home></Home>}></Route>
          <Route path="/calender" element={<Calender />} />
          <Route index element={<Calender></Calender>}></Route>
          <Route path="/settings" element={<Settings />} />
          <Route index element={<Settings></Settings>}></Route>

      </Routes>
    </BrowserRouter>
    </div>
  );

}

export default App