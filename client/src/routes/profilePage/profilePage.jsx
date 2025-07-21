// client/src/routes/profilePage/profilePage.jsx
import List from '../../components/list/List';
import './profilePage.scss';
import apiRequest from '../../lib/apiRequest';
import { Await, Link, useLoaderData, useNavigate } from 'react-router-dom';
import { Suspense, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function ProfilePage() {
  const data = useLoaderData();
  const { updateUser, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiRequest.post('/auth/logout');
      updateUser(null);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  const openWhatsAppSupport = () => {
    const RAQUEL_WHATSAPP = '351933859122'; // Substitua pelo número real

    const message = encodeURIComponent(`Olá Raquel! 

Sou ${currentUser.username} e tenho algumas questões sobre os meus anúncios ou conta.

👤 *Os meus dados:*
Nome: ${currentUser.username}
Email: ${currentUser.email}

Poderia ajudar-me?

Obrigado(a)! 🙏`);

    const whatsappURL = `https://wa.me/${RAQUEL_WHATSAPP}?text=${message}`;
    window.open(whatsappURL, '_blank');
  };

  return (
    <div className='profilePage'>
      <div className='details'>
        <div className='wrapper'>
          <div className='title'>
            <h1>Informações do Utilizador</h1>
            <Link to='/profile/update'>
              <button>Atualizar Perfil</button>
            </Link>
          </div>

          <div className='info'>
            <span>
              Avatar:
              <img src={currentUser.avatar || 'noavatar.jpg'} alt='' />
            </span>
            <span>
              Nome de utilizador: <b>{currentUser.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser.email}</b>
            </span>
            <button onClick={handleLogout} className='logout-btn'>
              Sair da Conta
            </button>
          </div>

          <div className='title'>
            <h1>Os Meus Anúncios</h1>
            <Link to='/add'>
              <button>Criar Novo Anúncio</button>
            </Link>
          </div>

          <Suspense fallback={<p>A carregar...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Erro ao carregar anúncios!</p>}
            >
              {postResponse => <List posts={postResponse.data.userPosts} />}
            </Await>
          </Suspense>

          <div className='title'>
            <h1>Anúncios Guardados</h1>
          </div>

          <Suspense fallback={<p>A carregar...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Erro ao carregar anúncios guardados!</p>}
            >
              {postResponse => <List posts={postResponse.data.savedPosts} />}
            </Await>
          </Suspense>
        </div>
      </div>

      <div className='supportContainer'>
        <div className='wrapper'>
          <div className='support-card'>
            <div className='support-header'>
              <img
                src='/raquel-foto.png'
                alt='Raquel Perez'
                className='consultant-photo'
              />
              <div className='consultant-info'>
                <h3>Raquel Perez</h3>
                <p>Consultora Imobiliária</p>
                <div className='rating'>
                  ⭐⭐⭐⭐⭐ <span>4.9/5 (200+ avaliações)</span>
                </div>
              </div>
            </div>

            <div className='support-content'>
              <h4>Precisa de Ajuda?</h4>
              <p>
                Como o seu consultor imobiliário dedicado, estou aqui para
                ajudá-lo com qualquer questão sobre os seus anúncios,
                propriedades guardadas ou processo de compra/venda.
              </p>

              <div className='support-features'>
                <div className='feature'>
                  <span className='icon'>🏠</span>
                  <span>Avaliação gratuita de imóveis</span>
                </div>
                <div className='feature'>
                  <span className='icon'>📊</span>
                  <span>Relatórios de mercado personalizados</span>
                </div>
                <div className='feature'>
                  <span className='icon'>🤝</span>
                  <span>Apoio jurídico especializado</span>
                </div>
                <div className='feature'>
                  <span className='icon'>⚡</span>
                  <span>Resposta em menos de 30 minutos</span>
                </div>
              </div>

              <button
                onClick={openWhatsAppSupport}
                className='whatsapp-support-btn'
              >
                <img src='/whatsapp.png' alt='WhatsApp' />
                <span>Falar com a Raquel</span>
              </button>

              <div className='contact-methods'>
                <div className='method'>
                  <span className='icon'>📱</span>
                  <span>+351 933 859 122</span>
                </div>
                <div className='method'>
                  <span className='icon'>✉️</span>
                  <span>raquelperez@century21.pt</span>
                </div>
              </div>
            </div>
          </div>

          <div className='quick-actions'>
            <h4>Ações Rápidas</h4>
            <div className='actions-grid'>
              <button
                className='action-btn sell'
                onClick={() => {
                  const message = encodeURIComponent(
                    `Olá Raquel! Quero vender um imóvel. Nome: ${currentUser.username}, Email: ${currentUser.email}`
                  );
                  window.open(
                    `https://wa.me/351912164220?text=${message}`,
                    '_blank'
                  );
                }}
              >
                <span className='icon'>💰</span>
                <span>Quero Vender</span>
              </button>

              <button
                className='action-btn buy'
                onClick={() => {
                  const message = encodeURIComponent(
                    `Olá Raquel! Quero comprar um imóvel. Nome: ${currentUser.username}, Email: ${currentUser.email}`
                  );
                  window.open(
                    `https://wa.me/351912164220?text=${message}`,
                    '_blank'
                  );
                }}
              >
                <span className='icon'>🏠</span>
                <span>Quero Comprar</span>
              </button>

              <button
                className='action-btn rent'
                onClick={() => {
                  const message = encodeURIComponent(
                    `Olá Raquel! Quero arrendar um imóvel. Nome: ${currentUser.username}, Email: ${currentUser.email}`
                  );
                  window.open(
                    `https://wa.me/351912164220?text=${message}`,
                    '_blank'
                  );
                }}
              >
                <span className='icon'>🔑</span>
                <span>Quero Arrendar</span>
              </button>

              <button
                className='action-btn evaluate'
                onClick={() => {
                  const message = encodeURIComponent(
                    `Olá Raquel! Gostaria de uma avaliação do meu imóvel. Nome: ${currentUser.username}, Email: ${currentUser.email}`
                  );
                  window.open(
                    `https://wa.me/351912164220?text=${message}`,
                    '_blank'
                  );
                }}
              >
                <span className='icon'>📊</span>
                <span>Avaliar Imóvel</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
