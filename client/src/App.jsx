import './App.css';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router';
import Home from './pages/Home.page';
import Navbar from './components/Navbar';
import Login from './pages/Login.page';
import Pricings from './pages/Pricings.page';
import Collections from './pages/Collections.page';
import Canvas from './pages/Canvas.page';
import Profile from './pages/Profile.page';
import { Provider } from 'react-redux';
import { store } from './store';

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

const CanvasLayout = () => {
  if (localStorage.getItem('access_token')) {
    return (
      <>
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
    <Provider store={store}>
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
            <Route path="/profile" element={<Profile />} />
            <Route path="/collections" element={<Collections />} />
          </Route>

          <Route element={<CanvasLayout />}>
            <Route path="/collections/canvas/:id" element={<Canvas />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
