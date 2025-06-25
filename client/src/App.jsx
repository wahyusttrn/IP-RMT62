import './App.css';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router';
import Home from './pages/Home.page';
import Navbar from './components/Navbar';
import Login from './pages/Login.page';
import Pricings from './pages/Pricings.page';

const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

const AuthLayout = () => {
  if (localStorage.getItem('access_token')) {
    return (
      <>
        <Navigate to={'/'} />
      </>
    );
  } else {
    return (
      <>
        <Navbar />
        <Outlet />
      </>
    );
  }
};

const MainLayout = () => {
  if (localStorage.getItem('access_token')) {
    return (
      <>
        <Navbar />
        <Outlet />
      </>
    );
  } else {
    return (
      <>
        <Navigate to={'/login'} />
      </>
    );
  }
};

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/pricings" element={<Pricings />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
          </Route>

          <Route element={<MainLayout />}>
            <Route path="/profile" element={<h1 className="mt-20 text-9xl">Ini profile</h1>} />
            <Route path="/collections" element={<h1 className="mt-20 text-9xl">Ini collections</h1>} />
            <Route path="/collections/:id" element={<h1 className="mt-20 text-9xl">Ini collections /:id</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
