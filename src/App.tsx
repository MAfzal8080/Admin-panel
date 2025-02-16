import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { LoginPage } from './pages/LoginPage';
import { SettingsPage } from './pages/SettingsPage';
import { UsersPage } from './pages/UsersPage';
import { useEffect } from 'react';
import { AdminLayout } from './components/AdminLayout';

function App() {
  
  return (
    <BrowserRouter future={{v7_startTransition: true,}}>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="settings" element={<SettingsPage />} />
          <Route path="users" element={<UsersPage />} />
          {/* Index route for admin */}
          <Route index element={<Navigate to="/admin/settings" replace />} />
        </Route>
        <Route path="login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      <AuthHandler />
    </BrowserRouter>
  );
}

function AuthHandler() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/admin/settings');
    }
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const email = urlParams.get("email");
    const picture = urlParams.get("picture");
    const user = {
      email: email,
      picture: picture,
      token: token
    }
    if (token) {
      localStorage.setItem('user', JSON.stringify(user));

      navigate('/admin/settings');
    }
  }, []);
  

  return null;
}



export default App;
