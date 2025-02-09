import Home from './HomePage/Home.jsx'
import Calender from './CalenderPage/CalenderSection.jsx';
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
      </Routes>
    </BrowserRouter>
    </div>
  );

}

export default App