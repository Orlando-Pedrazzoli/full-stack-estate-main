// client/src/App.jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import ScrollToTop from './components/ScrollToTop';

// Páginas
import Layout from './routes/layout/layout';
import HomePage from './routes/homePage/homePage';
import ListPage from './routes/listPage/listPage';
import SinglePage from './routes/singlePage/singlePage';
import ProfilePage from './routes/profilePage/profilePage';
import ProfileUpdatePage from './routes/profileUpdatePage/profileUpdatePage';
import NewPostPage from './routes/newPostPage/newPostPage';
import LoginPage from './routes/login/login';
import RegisterPage from './routes/register/register';

// Páginas adicionais
import AboutPage from './routes/about/about';
import ContactPage from './routes/contact/contact';
import SellPropertyPage from './routes/sellProperty/SellPropertyPage';
import PrivacyPolicy from './routes/privacyPolicy/PrivacyPolicy';

// Loaders
import {
  listPageLoader,
  profilePageLoader,
  singlePageLoader,
  profileUpdatePageLoader,
} from './lib/loaders';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <ScrollToTop />
          <Layout />
        </>
      ),
      children: [
        {
          path: '/',
          element: <HomePage />,
        },
        {
          path: '/list',
          element: <ListPage />,
          loader: listPageLoader,
        },
        {
          path: '/about',
          element: <AboutPage />,
        },
        {
          path: '/sell-property',
          element: <SellPropertyPage />,
        },
        {
          path: '/contact',
          element: <ContactPage />,
        },
        {
          path: '/privacy-policy',
          element: <PrivacyPolicy />,
        },
        {
          path: '/profile',
          element: <ProfilePage />,
          loader: profilePageLoader,
        },
        {
          path: '/profile/update',
          element: <ProfileUpdatePage />,
          loader: profileUpdatePageLoader,
        },
        {
          path: '/add',
          element: <NewPostPage />,
        },
        {
          path: '/login',
          element: <LoginPage />,
        },
        {
          path: '/register',
          element: <RegisterPage />,
        },
        {
          // ROTA ESPECÍFICA para posts individuais
          path: '/post/:id',
          element: <SinglePage />,
          loader: singlePageLoader,
        },
      ],
    },
  ]);

  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;
