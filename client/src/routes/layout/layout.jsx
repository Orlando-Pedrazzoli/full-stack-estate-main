// client/src/routes/layout/layout.jsx
import './layout.scss';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
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
      <Footer />
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
        <Footer />
        {/* Botão flutuante do WhatsApp */}
        <WhatsAppFloating />
      </div>
    );
  }
}

// Exportação padrão
export default Layout;

// Exportação nomeada
export { RequireAuth };
