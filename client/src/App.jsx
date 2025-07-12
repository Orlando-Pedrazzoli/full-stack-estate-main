import HomePage from './routes/homePage/homePage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ListPage from './routes/listPage/listPage';
import { Layout, RequireAuth } from './routes/layout/layout';
import SinglePage from './routes/singlePage/singlePage';
import ProfilePage from './routes/profilePage/profilePage';
import Login from './routes/login/login';
import Register from './routes/register/register';
import ProfileUpdatePage from './routes/profileUpdatePage/profileUpdatePage';
import NewPostPage from './routes/newPostPage/newPostPage';
import AboutPage from './routes/about/about';
import ContactPage from './routes/contact/contact';
import SellPropertyPage from './routes/sellProperty/SellPropertyPage';
import CookieConsent from 'react-cookie-consent';
import PrivacyPolicy from './routes/privacyPolicy/PrivacyPolicy';

import {
  listPageLoader,
  profilePageLoader,
  singlePageLoader,
} from './lib/loaders';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <HomePage />,
        },
        {
          path: '/about',
          element: <AboutPage />,
        },
        {
          path: '/contact',
          element: <ContactPage />,
        },
        {
          path: '/sell-property',
          element: <SellPropertyPage />,
        },
        {
          path: '/list',
          element: <ListPage />,
          loader: listPageLoader,
        },
        {
          path: '/:id',
          element: <SinglePage />,
          loader: singlePageLoader,
        },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/register',
          element: <Register />,
        },
        {
          path: '/privacy-policy',
          element: <PrivacyPolicy />,
        },
      ],
    },
    {
      path: '/',
      element: <RequireAuth />,
      children: [
        {
          path: '/profile',
          element: <ProfilePage />,
          loader: profilePageLoader,
        },
        {
          path: '/profile/update',
          element: <ProfileUpdatePage />,
        },
        {
          path: '/add',
          element: <NewPostPage />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />

      {/* Cookie Consent Banner */}
      <CookieConsent
        location='bottom'
        buttonText='Aceitar Todos'
        declineButtonText='Rejeitar'
        enableDeclineButton
        flipButtons
        cookieName='raquel-perez-cookie-consent'
        style={{
          background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
          fontSize: '14px',
          fontFamily: "'Inter', sans-serif",
          boxShadow: '0 -5px 20px rgba(0, 0, 0, 0.2)',
          padding: '20px',
          alignItems: 'center',
        }}
        buttonStyle={{
          background: 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)',
          color: 'white',
          fontSize: '13px',
          fontWeight: '600',
          padding: '12px 24px',
          borderRadius: '6px',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          marginLeft: '15px',
        }}
        declineButtonStyle={{
          background: 'transparent',
          color: 'white',
          fontSize: '13px',
          fontWeight: '500',
          padding: '12px 20px',
          borderRadius: '6px',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          marginLeft: '10px',
        }}
        expires={365}
        overlay={false}
        onAccept={() => {
          console.log('Cookies aceites pelo utilizador');
          // Aqui pode adicionar Google Analytics, Facebook Pixel, etc.
          // gtag('consent', 'update', {'analytics_storage': 'granted'});
        }}
        onDecline={() => {
          console.log('Cookies rejeitados pelo utilizador');
          // Aqui pode desativar analytics
          // gtag('consent', 'update', {'analytics_storage': 'denied'});
        }}
        customContentStyle={{
          flex: '1 1 300px',
          margin: '0',
        }}
        customButtonWrapperStyle={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px',
          marginTop: '10px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              fontSize: '20px',
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '8px',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            🍪
          </div>

          <div style={{ flex: '1', minWidth: '300px' }}>
            <div
              style={{
                fontWeight: '600',
                marginBottom: '5px',
                color: 'white',
              }}
            >
              Este site utiliza cookies
            </div>
            <div
              style={{
                color: 'rgba(255, 255, 255, 0.9)',
                lineHeight: '1.5',
                fontSize: '13px',
              }}
            >
              Utilizamos cookies para melhorar a sua experiência de navegação,
              analisar o tráfego do site e personalizar conteúdo.
              <a
                href='/privacy-policy'
                style={{
                  color: '#3498db',
                  textDecoration: 'underline',
                  marginLeft: '5px',
                }}
              >
                Saiba mais na nossa Política de Privacidade
              </a>
            </div>
          </div>
        </div>
      </CookieConsent>
    </>
  );
}

export default App;
