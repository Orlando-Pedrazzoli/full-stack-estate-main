import { useContext, useState, useEffect } from 'react';
import './navbar.scss';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import apiRequest from '../../lib/apiRequest';

function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { currentUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Gerenciar scroll do body quando mobile menu está aberto
  useEffect(() => {
    if (open) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }

    // Cleanup quando componente é desmontado
    return () => {
      document.body.classList.remove('mobile-menu-open');
    };
  }, [open]);

  const handleLogout = async () => {
    try {
      await apiRequest.post('/auth/logout');
      updateUser(null);
      setOpen(false);
      setProfileMenuOpen(false);
      navigate('/');
    } catch (err) {
      console.log('Erro ao fazer logout:', err);
      // Mesmo com erro, limpar o estado local
      updateUser(null);
      setOpen(false);
      setProfileMenuOpen(false);
      navigate('/');
    }
  };

  const closeMenus = () => {
    setOpen(false);
    setProfileMenuOpen(false);
  };

  // Fechar mobile menu quando clicar fora
  const handleMobileMenuOverlayClick = () => {
    setOpen(false);
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
        </div>

        {/* Links de navegação centralizados */}
        <div className='nav-links'>
          <Link to='/list?type=buy' className='nav-link'>
            Comprar
          </Link>
          <Link to='/list?type=rent' className='nav-link'>
            Arrendar
          </Link>
          <Link to='/about' className='nav-link'>
            Sobre mim
          </Link>
          <Link to='/contact' className='nav-link'>
            Contacto
          </Link>
          <Link to='/sell-property' className='nav-link sell-link'>
            Vender
          </Link>
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
              {open ? (
                // Ícone X quando menu está aberto
                <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
                  <path
                    d='M18 6L6 18M6 6l12 12'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              ) : (
                // Ícone hamburger quando menu está fechado
                <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
                  <path
                    d='M3 12h18M3 6h18M3 18h18'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu com overlay */}
          {open && (
            <>
              {/* Overlay para fechar quando clicar fora */}
              <div
                className='mobile-menu-overlay'
                onClick={handleMobileMenuOverlayClick}
              ></div>

              {/* Menu mobile */}
              <div className={`mobile-menu ${open ? 'active' : ''}`}>
                <div className='mobile-menu-content'>
                  {/* Header do menu mobile com logo e botão X */}
                  <div className='mobile-menu-header'>
                    <Link to='/' className='mobile-logo' onClick={closeMenus}>
                      <img src='/rqfavicon.jpg' alt='Logo RP' />
                      <div className='mobile-text-block'>
                        <span className='mobile-name'>Raquel Perez</span>
                        <span className='mobile-subtitle'>
                          Consultora Imobiliária
                        </span>
                      </div>
                    </Link>

                    <button
                      className='mobile-close-btn'
                      onClick={() => setOpen(false)}
                    >
                      <svg
                        width='20'
                        height='20'
                        viewBox='0 0 24 24'
                        fill='none'
                      >
                        <path
                          d='M18 6L6 18M6 6l12 12'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Links de navegação */}
                  <Link
                    to='/sell-property'
                    onClick={closeMenus}
                    className='mobile-link'
                  >
                    Vender
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
                    to='/about'
                    onClick={closeMenus}
                    className='mobile-link'
                  >
                    Sobre mim
                  </Link>

                  <Link
                    to='/contact'
                    onClick={closeMenus}
                    className='mobile-link'
                  >
                    Contacto
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
                      <Link
                        to='/add'
                        onClick={closeMenus}
                        className='mobile-link'
                      >
                        Criar Anúncio
                      </Link>
                      <button
                        onClick={handleLogout}
                        className='mobile-link logout'
                      >
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

                  {/* Seção de Redes Sociais */}
                  <div className='mobile-divider'></div>

                  <div className='mobile-social-section'>
                    <h4 className='mobile-social-title'>Redes Sociais</h4>

                    <a
                      href='https://www.facebook.com/profile.php?id=61550820177225#'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='mobile-social-link facebook'
                      aria-label='Facebook'
                    >
                      <svg
                        width='20'
                        height='20'
                        viewBox='0 0 24 24'
                        fill='none'
                      >
                        <path
                          d='M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                      <span>Facebook</span>
                    </a>

                    <a
                      href='https://www.instagram.com/raquelperez.pt/'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='mobile-social-link instagram'
                      aria-label='Instagram'
                    >
                      <svg
                        width='20'
                        height='20'
                        viewBox='0 0 24 24'
                        fill='none'
                      >
                        <rect
                          x='2'
                          y='2'
                          width='20'
                          height='20'
                          rx='5'
                          ry='5'
                          stroke='currentColor'
                          strokeWidth='2'
                        />
                        <path
                          d='m16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z'
                          stroke='currentColor'
                          strokeWidth='2'
                        />
                        <line
                          x1='17.5'
                          y1='6.5'
                          x2='17.51'
                          y2='6.5'
                          stroke='currentColor'
                          strokeWidth='2'
                        />
                      </svg>
                      <span>Instagram</span>
                    </a>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Overlay para fechar dropdowns de desktop */}
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
