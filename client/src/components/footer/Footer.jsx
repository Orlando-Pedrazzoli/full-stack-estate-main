import './footer.scss';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className='professional-footer'>
      <div className='footer-container'>
        {/* Seção principal do footer */}
        <div className='footer-content'>
          {/* Coluna de Contactos */}
          <div className='footer-column'>
            <h3>Contactos</h3>
            <div className='contact-info'>
              <div className='contact-item'>
                <svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
                  <path
                    d='M22 12A10 10 0 1 1 12 2a10 10 0 0 1 10 10Z'
                    stroke='currentColor'
                    strokeWidth='2'
                  />
                  <path
                    d='m9 12 2 2 4-4'
                    stroke='currentColor'
                    strokeWidth='2'
                  />
                </svg>
                <span>351 912 799 356</span>
              </div>
              <div className='contact-subtext'>
                (Chamada para rede móvel nacional)
              </div>

              <div className='contact-item'>
                <svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
                  <path
                    d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z'
                    stroke='currentColor'
                    strokeWidth='2'
                  />
                  <polyline
                    points='22,6 12,13 2,6'
                    stroke='currentColor'
                    strokeWidth='2'
                  />
                </svg>
                <span>raquelperez@century.pt</span>
              </div>
            </div>
          </div>

          {/* Coluna REMAX Team */}
          <div className='footer-column'>
            <h3>Century 21 Team</h3>
            <div className='team-info'>
              <div className='team-item'>
                <svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
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
                <span>Praceta Professor</span>
              </div>
              <div className='team-address'>
                Alfredo de Sousa, 7D
                <br />
                1495-072, Oeiras
              </div>
            </div>
          </div>

          {/* Coluna Ligações Úteis */}
          <div className='footer-column'>
            <h3>Ligações Úteis</h3>
            <div className='useful-links'>
              <Link to='/' className='footer-link'>
                Início
              </Link>
              <Link to='/about' className='footer-link'>
                Sobre mim
              </Link>
              <Link to='/about' className='footer-link'>
                Serviços
              </Link>
              <Link to='/list' className='footer-link'>
                Imóveis
              </Link>
              <Link to='/contact' className='footer-link'>
                Contactos
              </Link>
              <Link to='/privacy-policy' className='footer-link'>
                Política de Privacidade
              </Link>
            </div>
          </div>

          {/* Coluna Redes Sociais */}
          <div className='footer-column'>
            <h3>Redes Sociais</h3>
            <div className='social-links'>
              <a
                href='https://facebook.com'
                target='_blank'
                rel='noopener noreferrer'
                className='social-link facebook'
                aria-label='Facebook'
              >
                <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
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
                href='https://instagram.com'
                target='_blank'
                rel='noopener noreferrer'
                className='social-link instagram'
                aria-label='Instagram'
              >
                <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
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

        {/* Linha divisória */}
        <div className='footer-divider'></div>

        {/* Copyright */}
        <div className='footer-bottom'>
          <div className='copyright'>
            <p>
              © 2025 RAQUEL PEREZ. All Rights Reserved. Desenvolvido por{' '}
              <a
                href='https://orlandopedrazzoli.com'
                target='_blank'
                rel='noopener noreferrer'
                className='developer-link'
              >
                ORLANDOPEDRAZZOLI.COM
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
