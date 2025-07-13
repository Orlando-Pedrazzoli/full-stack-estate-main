import { useContext, useState } from 'react';
import './navbar.scss';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { currentUser, updateUser } = useContext(AuthContext);

  const handleLogout = () => {
    // Implementar a lógica de logout aqui
    console.log('Utilizador desconectado.');
    setOpen(false);
    setProfileMenuOpen(false);
  };

  const closeMenus = () => {
    setOpen(false);
    setProfileMenuOpen(false);
  };

  return (
    <nav className='professional-navbar'>
      {/* Container interno para limitar largura */}
      <div className='navbar-container'>
        <div className='left'>
          <Link to='/' className='logo'>
            <img src='/rqfavicon.jpg' alt='Logo RP' />
            <div className='textBlock'>
              <span className='name'>Raquel Perez</span>
              <span className='subtitle'>Consultora Imobiliária</span>
            </div>
          </Link>

          <div className='nav-links'>
            <Link to='/about' className='nav-link'>
              Serviços
            </Link>
            <Link to='/list?type=buy' className='nav-link'>
              Comprar
            </Link>
            <Link to='/list?type=rent' className='nav-link'>
              Arrendar
            </Link>
            <Link to='/sell-property' className='nav-link sell-link'>
              Vender
            </Link>
          </div>
        </div>

        <div className='right'>
          {currentUser ? (
            <div className='user-section'>
              <div className='user-info'>
                <img src={currentUser.avatar || '/noavatar.jpg'} alt='Avatar' />
                <span className='username'>{currentUser.username}</span>
              </div>

              <div className='profile-dropdown'>
                <button
                  className='profile-btn'
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                >
                  <svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
                    <path d='M12 13l-8-5 8-5 8 5-8 5z' fill='currentColor' />
                    <path
                      d='M12 13l-8-5v7l8 5 8-5v-7l-8 5z'
                      fill='currentColor'
                      opacity='0.6'
                    />
                  </svg>
                </button>

                {profileMenuOpen && (
                  <div className='dropdown-menu'>
                    <Link
                      to='/profile'
                      onClick={closeMenus}
                      className='dropdown-item'
                    >
                      <svg
                        width='16'
                        height='16'
                        viewBox='0 0 24 24'
                        fill='none'
                      >
                        <path
                          d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'
                          stroke='currentColor'
                          strokeWidth='2'
                        />
                        <circle
                          cx='12'
                          cy='7'
                          r='4'
                          stroke='currentColor'
                          strokeWidth='2'
                        />
                      </svg>
                      Perfil
                    </Link>
                    <Link
                      to='/add'
                      onClick={closeMenus}
                      className='dropdown-item'
                    >
                      <svg
                        width='16'
                        height='16'
                        viewBox='0 0 24 24'
                        fill='none'
                      >
                        <path
                          d='M12 5v14m-7-7h14'
                          stroke='currentColor'
                          strokeWidth='2'
                        />
                      </svg>
                      Criar Anúncio
                    </Link>
                    <button
                      onClick={handleLogout}
                      className='dropdown-item logout'
                    >
                      <svg
                        width='16'
                        height='16'
                        viewBox='0 0 24 24'
                        fill='none'
                      >
                        <path
                          d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4m7 14l5-5-5-5m5 5H9'
                          stroke='currentColor'
                          strokeWidth='2'
                        />
                      </svg>
                      Terminar Sessão
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className='auth-section'>
              <div className='auth-dropdown'>
                <button
                  className='auth-btn'
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                >
                  <svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
                    <path
                      d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'
                      stroke='currentColor'
                      strokeWidth='2'
                    />
                    <circle
                      cx='12'
                      cy='7'
                      r='4'
                      stroke='currentColor'
                      strokeWidth='2'
                    />
                  </svg>
                  <span>Conta</span>
                </button>

                {profileMenuOpen && (
                  <div className='dropdown-menu'>
                    <Link
                      to='/login'
                      onClick={closeMenus}
                      className='dropdown-item'
                    >
                      <svg
                        width='16'
                        height='16'
                        viewBox='0 0 24 24'
                        fill='none'
                      >
                        <path
                          d='M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4m-5-4l5-5-5-5m5 5H3'
                          stroke='currentColor'
                          strokeWidth='2'
                        />
                      </svg>
                      Iniciar Sessão
                    </Link>
                    <Link
                      to='/register'
                      onClick={closeMenus}
                      className='dropdown-item register'
                    >
                      <svg
                        width='16'
                        height='16'
                        viewBox='0 0 24 24'
                        fill='none'
                      >
                        <path
                          d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2'
                          stroke='currentColor'
                          strokeWidth='2'
                        />
                        <circle
                          cx='9'
                          cy='7'
                          r='4'
                          stroke='currentColor'
                          strokeWidth='2'
                        />
                        <path
                          d='M22 11h-4m2-2v4'
                          stroke='currentColor'
                          strokeWidth='2'
                        />
                      </svg>
                      Criar Conta
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className='menuIcon'>
            <button onClick={() => setOpen(!open)} className='mobile-menu-btn'>
              <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
                <path
                  d='M3 12h18m-9-9v18'
                  stroke='currentColor'
                  strokeWidth='2'
                />
              </svg>
            </button>
          </div>

          <div className={`mobile-menu ${open ? 'active' : ''}`}>
            <div className='mobile-menu-content'>
              <Link to='/about' onClick={closeMenus} className='mobile-link'>
                Serviços
              </Link>
              <Link
                to='/list?type=buy'
                onClick={closeMenus}
                className='mobile-link'
              >
                Comprar
              </Link>
              <Link
                to='/list?type=rent'
                onClick={closeMenus}
                className='mobile-link'
              >
                Arrendar
              </Link>
              <Link
                to='/sell-property'
                onClick={closeMenus}
                className='mobile-link'
              >
                Vender
              </Link>

              <div className='mobile-divider'></div>

              {currentUser ? (
                <>
                  <Link
                    to='/profile'
                    onClick={closeMenus}
                    className='mobile-link'
                  >
                    Perfil
                  </Link>
                  <Link to='/add' onClick={closeMenus} className='mobile-link'>
                    Criar Anúncio
                  </Link>
                  <button onClick={handleLogout} className='mobile-link logout'>
                    Terminar Sessão
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to='/login'
                    onClick={closeMenus}
                    className='mobile-link'
                  >
                    Iniciar Sessão
                  </Link>
                  <Link
                    to='/register'
                    onClick={closeMenus}
                    className='mobile-link register'
                  >
                    Criar Conta
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay para fechar dropdowns */}
      {profileMenuOpen && (
        <div
          className='dropdown-overlay'
          onClick={() => setProfileMenuOpen(false)}
        ></div>
      )}
    </nav>
  );
}

export default Navbar;
