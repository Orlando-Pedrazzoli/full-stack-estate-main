import { useContext, useState } from 'react';
import './navbar.scss';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useNotificationStore } from '../../lib/notificationStore';

function Navbar() {
  const [open, setOpen] = useState(false);
  const { currentUser, updateCurrentUser } = useContext(AuthContext);
  const fetch = useNotificationStore(state => state.fetch);
  const number = useNotificationStore(state => state.number);

  if (currentUser) fetch();

  // Função para lidar com o logout (adicionar no AuthContext se ainda não existir)
  const handleLogout = () => {
    // Implementar a lógica de logout aqui, ex: chamar uma API ou limpar o AuthContext
    // updateCurrentUser(null);
    console.log('Usuário deslogado.');
    setOpen(false); // Fechar o menu após o clique
  };

  return (
    <nav>
      {/* ... (Div left permanece a mesma) ... */}
      <div className='left'>
        <a href='/' className='logo'>
          <img src='/rqfavicon.jpg' alt='Logo RP' />
          <div className='textBlock'>
            <span className='name'>Raquel Perez</span>
            <span className='subtitle'>Consultora Imobiliária</span>
          </div>
        </a>
        <Link to='/about'>Serviços</Link>
        <Link to='/list?type=buy'>Comprar</Link>
        <Link to='/list?type=rent'>Arrendar</Link>
        <Link to='/list?type=rent'>Vender</Link>
      </div>

      {/* Div right permanece a mesma, apenas a lógica do menu móvel será ajustada */}
      <div className='right'>
        {/* ... (Lógica Desktop Autenticado vs. Não Autenticado) ... */}
        {currentUser ? (
          <div className='user'>
            <img src={currentUser.avatar || '/noavatar.jpg'} alt='' />
            <span>{currentUser.username}</span>
            <Link to='/profile' className='profile'>
              {number > 0 && <div className='notification'>{number}</div>}
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <a href='/login'>Sign in</a>
            <a href='/register' className='register'>
              Sign up
            </a>
          </>
        )}

        {/* ... (Menu Icon) ... */}
        <div className='menuIcon'>
          <img src='/menu.png' alt='' onClick={() => setOpen(prev => !prev)} />
        </div>

        {/* --- MENU MÓVEL REESTRUTURADO --- */}
        <div className={open ? 'menu active' : 'menu'}>
          <Link to='/about' onClick={() => setOpen(false)}>
            Sobre mim
          </Link>
          <Link to='/list?type=buy' onClick={() => setOpen(false)}>
            Comprar
          </Link>
          <Link to='/list?type=rent' onClick={() => setOpen(false)}>
            Arrendar
          </Link>

          {/* Lógica condicional para links de autenticação no menu móvel */}
          {currentUser ? (
            <>
              <Link to='/profile' onClick={() => setOpen(false)}>
                Profile
              </Link>
              <button onClick={handleLogout} className='logoutButton'>
                Sign out
              </button>
            </>
          ) : (
            <>
              <a href='/login' onClick={() => setOpen(false)}>
                Sign in
              </a>
              <a href='/register' onClick={() => setOpen(false)}>
                Sign up
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
