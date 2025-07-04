import { useContext, useState } from 'react';
import './navbar.scss';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useNotificationStore } from '../../lib/notificationStore';

function Navbar() {
  const [open, setOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const fetch = useNotificationStore(state => state.fetch);
  const number = useNotificationStore(state => state.number);

  if (currentUser) fetch();

  return (
    <nav>
      <div className='left'>
        <a href='/' className='logo'>
          <img src='/rqfavicon.jpg' alt='Logo RP' />
          <div className='textBlock'>
            <span className='name'>Raquel Perez</span>
            <span className='subtitle'>Consultora Imobiliária</span>
          </div>
        </a>
        {/*  <Link to='/'>Home</Link> */}
        <Link to='/about'>Sobre mim</Link>
        {/*  <Link to='/contact'>Contacto</Link> */}
        <Link to='/list?type=buy'>Comprar</Link>
        <Link to='/list?type=rent'>Arrendar</Link>
      </div>
      <div className='right'>
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
        <div className='menuIcon'>
          <img src='/menu.png' alt='' onClick={() => setOpen(prev => !prev)} />
        </div>
        <div className={open ? 'menu active' : 'menu'}>
          <a href='/'>Home</a>
          <a href='/about'>About</a>
          <a href='/contact'>Contact</a>
          <a href='/'>Sign in</a>
          <a href='/'>Sign up</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
