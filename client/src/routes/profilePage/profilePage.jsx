// client/src/routes/profilePage/profilePage.jsx
import List from '../../components/list/List';
import './profilePage.scss';
import apiRequest from '../../lib/apiRequest';
import { Await, Link, useLoaderData, useNavigate } from 'react-router-dom';
import { Suspense, useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

function ProfilePage() {
  const data = useLoaderData();
  const { updateUser, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await apiRequest.post('/auth/logout');
      updateUser(null);
      navigate('/');
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const openWhatsAppSupport = () => {
    const RAQUEL_WHATSAPP = '351933859122';

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
      <div className='container'>
        {/* Header da página */}
        <div className='pageHeader'>
          <div className='welcomeSection'>
            <h1>Bem-vindo de volta, {currentUser.username}!</h1>
            <p>Gerencie os seus anúncios e mantenha o perfil atualizado</p>
          </div>
        </div>

        <div className='pageContent'>
          {/* Coluna principal */}
          <div className='mainColumn'>
            {/* Card de informações do utilizador */}
            <div className='profileCard'>
              <div className='cardHeader'>
                <div className='headerContent'>
                  <div className='avatarSection'>
                    <img
                      src={currentUser.avatar || '/noavatar.jpg'}
                      alt='Avatar do utilizador'
                      className='userAvatar'
                    />
                    <div className='statusBadge'>Online</div>
                  </div>
                  <div className='userInfo'>
                    <h2>{currentUser.username}</h2>
                    <p>{currentUser.email}</p>
                    <div className='memberSince'>
                      <svg
                        width='16'
                        height='16'
                        viewBox='0 0 24 24'
                        fill='none'
                      >
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
                      Membro desde 2024
                    </div>
                  </div>
                </div>
                <div className='headerActions'>
                  <Link to='/profile/update' className='editButton'>
                    <svg width='18' height='18' viewBox='0 0 24 24' fill='none'>
                      <path
                        d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7'
                        stroke='currentColor'
                        strokeWidth='2'
                      />
                      <path
                        d='M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z'
                        stroke='currentColor'
                        strokeWidth='2'
                      />
                    </svg>
                    Editar Perfil
                  </Link>
                  <button
                    onClick={handleLogout}
                    className='logoutButton'
                    disabled={loading}
                  >
                    {loading ? (
                      <div className='spinner'></div>
                    ) : (
                      <svg
                        width='18'
                        height='18'
                        viewBox='0 0 24 24'
                        fill='none'
                      >
                        <path
                          d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4'
                          stroke='currentColor'
                          strokeWidth='2'
                        />
                        <polyline
                          points='16,17 21,12 16,7'
                          stroke='currentColor'
                          strokeWidth='2'
                        />
                        <line
                          x1='21'
                          y1='12'
                          x2='9'
                          y2='12'
                          stroke='currentColor'
                          strokeWidth='2'
                        />
                      </svg>
                    )}
                    {loading ? 'Saindo...' : 'Sair'}
                  </button>
                </div>
              </div>
            </div>

            {/* Seção dos meus anúncios */}
            <div className='sectionCard'>
              <div className='sectionHeader'>
                <div className='sectionTitle'>
                  <h3>
                    <svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
                      <path
                        d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'
                        stroke='currentColor'
                        strokeWidth='2'
                      />
                      <polyline
                        points='9,22 9,12 15,12 15,22'
                        stroke='currentColor'
                        strokeWidth='2'
                      />
                    </svg>
                    Os Meus Anúncios
                  </h3>
                  <p>Gerencie e monitore os seus imóveis</p>
                </div>
                <Link to='/add' className='addButton'>
                  <svg width='18' height='18' viewBox='0 0 24 24' fill='none'>
                    <line
                      x1='12'
                      y1='5'
                      x2='12'
                      y2='19'
                      stroke='currentColor'
                      strokeWidth='2'
                    />
                    <line
                      x1='5'
                      y1='12'
                      x2='19'
                      y2='12'
                      stroke='currentColor'
                      strokeWidth='2'
                    />
                  </svg>
                  Novo Anúncio
                </Link>
              </div>

              <div className='sectionContent'>
                <Suspense
                  fallback={
                    <div className='loadingState'>
                      <div className='loadingSpinner'></div>
                      <p>A carregar os seus anúncios...</p>
                    </div>
                  }
                >
                  <Await
                    resolve={data.postResponse}
                    errorElement={
                      <div className='errorState'>
                        <svg
                          width='48'
                          height='48'
                          viewBox='0 0 24 24'
                          fill='none'
                        >
                          <circle
                            cx='12'
                            cy='12'
                            r='10'
                            stroke='currentColor'
                            strokeWidth='2'
                          />
                          <line
                            x1='15'
                            y1='9'
                            x2='9'
                            y2='15'
                            stroke='currentColor'
                            strokeWidth='2'
                          />
                          <line
                            x1='9'
                            y1='9'
                            x2='15'
                            y2='15'
                            stroke='currentColor'
                            strokeWidth='2'
                          />
                        </svg>
                        <p>Erro ao carregar anúncios</p>
                        <button onClick={() => window.location.reload()}>
                          Tentar novamente
                        </button>
                      </div>
                    }
                  >
                    {postResponse => (
                      <List posts={postResponse.data.userPosts} />
                    )}
                  </Await>
                </Suspense>
              </div>
            </div>

            {/* Seção anúncios guardados */}
            <div className='sectionCard'>
              <div className='sectionHeader'>
                <div className='sectionTitle'>
                  <h3>
                    <svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
                      <path
                        d='M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z'
                        stroke='currentColor'
                        strokeWidth='2'
                      />
                    </svg>
                    Anúncios Guardados
                  </h3>
                  <p>Imóveis que despertaram o seu interesse</p>
                </div>
              </div>

              <div className='sectionContent'>
                <Suspense
                  fallback={
                    <div className='loadingState'>
                      <div className='loadingSpinner'></div>
                      <p>A carregar anúncios guardados...</p>
                    </div>
                  }
                >
                  <Await
                    resolve={data.postResponse}
                    errorElement={
                      <div className='errorState'>
                        <svg
                          width='48'
                          height='48'
                          viewBox='0 0 24 24'
                          fill='none'
                        >
                          <circle
                            cx='12'
                            cy='12'
                            r='10'
                            stroke='currentColor'
                            strokeWidth='2'
                          />
                          <line
                            x1='15'
                            y1='9'
                            x2='9'
                            y2='15'
                            stroke='currentColor'
                            strokeWidth='2'
                          />
                          <line
                            x1='9'
                            y1='9'
                            x2='15'
                            y2='15'
                            stroke='currentColor'
                            strokeWidth='2'
                          />
                        </svg>
                        <p>Erro ao carregar anúncios guardados</p>
                        <button onClick={() => window.location.reload()}>
                          Tentar novamente
                        </button>
                      </div>
                    }
                  >
                    {postResponse => (
                      <List posts={postResponse.data.savedPosts} />
                    )}
                  </Await>
                </Suspense>
              </div>
            </div>
          </div>

          {/* Coluna lateral */}
          <div className='sideColumn'>
            {/* Card da consultora */}
            <div className='consultantCard'>
              <div className='consultantHeader'>
                <div className='consultantPhoto'>
                  <img src='/raquel-foto.png' alt='Raquel Perez' />
                  <div className='consultantBadge'>Premiada</div>
                </div>
                <div className='consultantInfo'>
                  <h4>Raquel Perez</h4>
                  <p>Consultora Imobiliária Century 21</p>
                  <div className='rating'>
                    <div className='stars'>★★★★★</div>
                    <span>4.9/5 (200+ avaliações)</span>
                  </div>
                </div>
              </div>

              <div className='consultantContent'>
                <h5>Precisa de Ajuda Personalizada?</h5>
                <p>
                  Como o seu consultor imobiliário dedicado, estou aqui para
                  ajudá-lo com qualquer questão sobre os seus anúncios,
                  propriedades guardadas ou processo de compra/venda.
                </p>

                <div className='services'>
                  <div className='service'>
                    <span className='serviceIcon'>🏠</span>
                    <span>Avaliação gratuita de imóveis</span>
                  </div>
                  <div className='service'>
                    <span className='serviceIcon'>📊</span>
                    <span>Relatórios de mercado personalizados</span>
                  </div>
                  <div className='service'>
                    <span className='serviceIcon'>🤝</span>
                    <span>Apoio jurídico especializado</span>
                  </div>
                  <div className='service'>
                    <span className='serviceIcon'>⚡</span>
                    <span>Resposta em menos de 30 minutos</span>
                  </div>
                </div>

                <button
                  onClick={openWhatsAppSupport}
                  className='whatsappButton'
                >
                  <img src='/whatsapp.png' alt='WhatsApp' />
                  Falar com a Raquel
                </button>

                <div className='contactInfo'>
                  <div className='contactItem'>
                    <svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
                      <path
                        d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z'
                        stroke='currentColor'
                        strokeWidth='2'
                      />
                    </svg>
                    +351 933 859 122
                  </div>
                  <div className='contactItem'>
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
                    raquelperez@century21.pt
                  </div>
                </div>
              </div>
            </div>

            {/* Ações rápidas */}
            <div className='quickActionsCard'>
              <h4>Ações Rápidas</h4>
              <div className='actionsGrid'>
                <button
                  className='actionButton sell'
                  onClick={() => {
                    const message = encodeURIComponent(
                      `Olá Raquel! Quero vender um imóvel. Nome: ${currentUser.username}, Email: ${currentUser.email}`
                    );
                    window.open(
                      `https://wa.me/351933859122?text=${message}`,
                      '_blank'
                    );
                  }}
                >
                  <div className='actionIcon'>💰</div>
                  <span>Quero Vender</span>
                </button>

                <button
                  className='actionButton buy'
                  onClick={() => {
                    const message = encodeURIComponent(
                      `Olá Raquel! Quero comprar um imóvel. Nome: ${currentUser.username}, Email: ${currentUser.email}`
                    );
                    window.open(
                      `https://wa.me/351933859122?text=${message}`,
                      '_blank'
                    );
                  }}
                >
                  <div className='actionIcon'>🏠</div>
                  <span>Quero Comprar</span>
                </button>

                <button
                  className='actionButton rent'
                  onClick={() => {
                    const message = encodeURIComponent(
                      `Olá Raquel! Quero arrendar um imóvel. Nome: ${currentUser.username}, Email: ${currentUser.email}`
                    );
                    window.open(
                      `https://wa.me/351933859122?text=${message}`,
                      '_blank'
                    );
                  }}
                >
                  <div className='actionIcon'>🔑</div>
                  <span>Quero Arrendar</span>
                </button>

                <button
                  className='actionButton evaluate'
                  onClick={() => {
                    const message = encodeURIComponent(
                      `Olá Raquel! Gostaria de uma avaliação do meu imóvel. Nome: ${currentUser.username}, Email: ${currentUser.email}`
                    );
                    window.open(
                      `https://wa.me/351933859122?text=${message}`,
                      '_blank'
                    );
                  }}
                >
                  <div className='actionIcon'>📊</div>
                  <span>Avaliar Imóvel</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
