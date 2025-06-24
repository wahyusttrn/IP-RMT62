import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './pages/Home.page';
import Navbar from './components/Navbar';
import Login from './pages/Login.page';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
