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
                <svg width='18' height='18' viewBox='0 0 24 24' fill='none'>
                  <path
                    d='M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
                <a href='tel:+351933859122' className='contact-link'>
                  +351 933 859 122
                </a>
              </div>
              <div className='contact-subtext'>
                (Chamada para rede móvel nacional)
              </div>

              <div className='contact-item'>
                <svg width='18' height='18' viewBox='0 0 24 24' fill='none'>
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
                <a
                  href='mailto:raquelperez@century.pt'
                  className='contact-link'
                >
                  raquelperez@century.pt
                </a>
              </div>

              <div className='contact-item'>
                <svg width='18' height='18' viewBox='0 0 24 24' fill='none'>
                  <circle
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='2'
                  />
                  <polyline
                    points='12,6 12,12 16,14'
                    stroke='currentColor'
                    strokeWidth='2'
                  />
                </svg>
                <span>Segunda a Sexta: 10h - 19h</span>
              </div>
            </div>
          </div>

          {/* Coluna Century 21 Team e Localização */}
          <div className='footer-column'>
            <h3>Century 21 Team</h3>
            <div className='team-info'>
              <div className='team-item'>
                <svg width='18' height='18' viewBox='0 0 24 24' fill='none'>
                  <path
                    d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z'
                    stroke='currentColor'
                    strokeWidth='2'
                  />
                  <circle
                    cx='12'
                    cy='10'
                    r='3'
                    stroke='currentColor'
                    strokeWidth='2'
                  />
                </svg>
                <span>Escritório Estoril</span>
              </div>
              <div className='team-address'>
                Av. São Pedro, 1<br />
                2765-446 Estoril
                <br />
                <span className='location-details'>
                  Junto ao Casino Estoril
                </span>
              </div>

              <div className='transport-info'>
                <div className='transport-item'>
                  <span className='transport-icon'>🚆</span>
                  <span>Estação Estoril - 5 min a pé</span>
                </div>
                <div className='transport-item'>
                  <span className='transport-icon'>🚗</span>
                  <span>Estacionamento gratuito</span>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna Ligações Úteis */}
          <div className='footer-column'>
            <h3>Ligações Úteis</h3>
            <div className='useful-links'>
              <Link to='/' className='footer-link'>
                <svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
                  <path
                    d='M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z'
                    stroke='currentColor'
                    strokeWidth='2'
                  />
                  <polyline
                    points='9,22 9,12 15,12 15,22'
                    stroke='currentColor'
                    strokeWidth='2'
                  />
                </svg>
                <span>Início</span>
              </Link>

              <Link to='/about' className='footer-link'>
                <svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
                  <path
                    d='M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2'
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
                <span>Sobre mim</span>
              </Link>

              <Link to='/list?type=buy' className='footer-link'>
                <svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
                  <path
                    d='M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z'
                    stroke='currentColor'
                    strokeWidth='2'
                  />
                </svg>
                <span>Comprar Imóveis</span>
              </Link>

              <Link to='/list?type=rent' className='footer-link'>
                <svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
                  <rect
                    x='2'
                    y='3'
                    width='20'
                    height='14'
                    rx='2'
                    ry='2'
                    stroke='currentColor'
                    strokeWidth='2'
                  />
                  <line
                    x1='8'
                    y1='21'
                    x2='16'
                    y2='21'
                    stroke='currentColor'
                    strokeWidth='2'
                  />
                  <line
                    x1='12'
                    y1='17'
                    x2='12'
                    y2='21'
                    stroke='currentColor'
                    strokeWidth='2'
                  />
                </svg>
                <span>Arrendar</span>
              </Link>

              <Link to='/sell-property' className='footer-link'>
                <svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
                  <circle
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='2'
                  />
                  <path d='M12 6v6l4 2' stroke='currentColor' strokeWidth='2' />
                </svg>
                <span>Vender Propriedade</span>
              </Link>

              <Link to='/contact' className='footer-link'>
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
                <span>Contactos</span>
              </Link>

              <Link to='/privacy-policy' className='footer-link'>
                <svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
                  <path
                    d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'
                    stroke='currentColor'
                    strokeWidth='2'
                  />
                </svg>
                <span>Política de Privacidade</span>
              </Link>
            </div>
          </div>

          {/* Coluna Redes Sociais e Serviços */}
          <div className='footer-column'>
            <h3>Conecte-se</h3>
            <div className='social-links'>
              <a
                href='https://www.facebook.com/profile.php?id=61550820177225#'
                target='_blank'
                rel='noopener noreferrer'
                className='social-link facebook'
                aria-label='Facebook'
              >
                <svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
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
                className='social-link instagram'
                aria-label='Instagram'
              >
                <svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
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

            <div className='services-highlight'>
              <h4>Serviços Especializados</h4>
              <div className='service-tags'>
                <span className='service-tag'>Avaliação Gratuita</span>
                <span className='service-tag'>Consultoria</span>
                <span className='service-tag'>Investimento</span>
                <span className='service-tag'>Gestão</span>
              </div>
            </div>
          </div>
        </div>

        {/* Linha divisória */}
        <div className='footer-divider'></div>

        {/* Copyright e informações adicionais */}
        <div className='footer-bottom'>
          <div className='footer-bottom-content'>
            <div className='copyright'>
              <p>
                © 2025 RAQUEL PEREZ - Century 21. Todos os direitos reservados.
              </p>
              <p className='license-info'>
                AMI: 11104 | Consultora Imobiliária Certificada
              </p>
            </div>

            <div className='developer-credit'>
              <p>
                Desenvolvido por{' '}
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
      </div>
    </footer>
  );
}

export default Footer;
