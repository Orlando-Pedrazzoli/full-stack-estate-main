// client/src/routes/layout/layout.jsx
import './layout.scss';
import Navbar from '../../components/navbar/Navbar';
import { WhatsAppFloating } from '../../components/whatsapp/WhatsAppChat';
import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function Layout() {
  return (
    <div className='layout'>
      <div className='navbar'>
        <Navbar />
      </div>
      <div className='content'>
        <Outlet />
      </div>
      {/* Botão flutuante do WhatsApp */}
      <WhatsAppFloating />
    </div>
  );
}

function RequireAuth() {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) return <Navigate to='/login' />;
  else {
    return (
      <div className='layout'>
        <div className='navbar'>
          <Navbar />
        </div>
        <div className='content'>
          <Outlet />
        </div>
        {/* Botão flutuante do WhatsApp */}
        <WhatsAppFloating />
      </div>
    );
  }
}

export { Layout, RequireAuth };
