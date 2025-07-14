// client/src/routes/singlePage/singlePage.jsx
import './singlePage.scss';
import Slider from '../../components/slider/Slider';
import Map from '../../components/map/Map';
import WhatsAppChat from '../../components/whatsapp/WhatsAppChat';
import { useNavigate, useLoaderData, Await } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { useContext, useState, Suspense } from 'react';
import { AuthContext } from '../../context/AuthContext';
import apiRequest from '../../lib/apiRequest';

function SinglePage() {
  const data = useLoaderData();
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className='singlePage'>
      <Suspense fallback={<div>Carregando...</div>}>
        <Await
          resolve={data.postResponse}
          errorElement={<div>Erro ao carregar post!</div>}
        >
          {postResponse => (
            <PostContent
              post={postResponse.data}
              currentUser={currentUser}
              navigate={navigate}
            />
          )}
        </Await>
      </Suspense>
    </div>
  );
}

function PostContent({ post, currentUser, navigate }) {
  const [saved, setSaved] = useState(post.isSaved);

  const handleSave = async () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    setSaved(prev => !prev);
    try {
      await apiRequest.post('/users/save', { postId: post.id });
    } catch (err) {
      console.log(err);
      setSaved(prev => !prev);
    }
  };

  // Verificar se todos os dados necessários existem
  if (!post) {
    return <div>Post não encontrado</div>;
  }

  return (
    <>
      <div className='details'>
        <div className='wrapper'>
          <Slider images={post.images || []} />
          <div className='info'>
            <div className='top'>
              <div className='post'>
                <h1>{post.title || 'Título não disponível'}</h1>
                <div className='address'>
                  <img src='/pin.png' alt='' />
                  <span>{post.address || 'Endereço não disponível'}</span>
                </div>
                <div className='price'>
                  €{' '}
                  {post.price
                    ? post.price.toLocaleString('pt-PT')
                    : 'Preço não disponível'}
                </div>
              </div>
              <div className='user'>
                <img src={post.user?.avatar || '/rq-profile.jpg'} alt='' />
                <span>{post.user?.username || 'Usuário'}</span>
              </div>
            </div>
            <div
              className='bottom'
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  post.postDetail?.desc || '<p>Descrição não disponível</p>'
                ),
              }}
            ></div>
          </div>
        </div>
      </div>

      <div className='features'>
        <div className='wrapper'>
          <p className='title'>Informações Gerais</p>
          <div className='listVertical'>
            <div className='feature'>
              <img src='/utility.png' alt='' />
              <div className='featureText'>
                <span>Despesas</span>
                {post.postDetail?.utilities === 'owner' ? (
                  <p>Incluídas pelo proprietário</p>
                ) : post.postDetail?.utilities === 'tenant' ? (
                  <p>Por conta do inquilino</p>
                ) : (
                  <p>Partilhadas</p>
                )}
              </div>
            </div>
            <div className='feature'>
              <img src='/pet.png' alt='' />
              <div className='featureText'>
                <span>Animais de Estimação</span>
                {post.postDetail?.pet === 'allowed' ? (
                  <p>Animais Permitidos</p>
                ) : (
                  <p>Animais Não Permitidos</p>
                )}
              </div>
            </div>
            <div className='feature'>
              <img src='/fee.png' alt='' />
              <div className='featureText'>
                <span>Política de Rendimento</span>
                <p>{post.postDetail?.income || 'Não especificado'}</p>
              </div>
            </div>
          </div>

          <p className='title'>Áreas</p>
          <div className='sizes'>
            <div className='size'>
              <img src='/size.png' alt='' />
              <span>{post.postDetail?.size || 0} m²</span>
            </div>
            <div className='size'>
              <img src='/bed.png' alt='' />
              <span>{post.bedroom || 0} quartos</span>
            </div>
            <div className='size'>
              <img src='/bath.png' alt='' />
              <span>{post.bathroom || 0} casa(s) de banho</span>
            </div>
          </div>

          <p className='title'>Proximidades</p>
          <div className='listHorizontal'>
            <div className='feature'>
              <img src='/school.png' alt='' />
              <div className='featureText'>
                <span>Escola</span>
                <p>
                  {post.postDetail?.school
                    ? post.postDetail.school > 999
                      ? Math.round(post.postDetail.school / 1000) + 'km'
                      : post.postDetail.school + 'm'
                    : 'Não informado'}{' '}
                  {post.postDetail?.school ? 'de distância' : ''}
                </p>
              </div>
            </div>
            <div className='feature'>
              <img src='/bus.png' alt='' />
              <div className='featureText'>
                <span>Paragem de Autocarro</span>
                <p>
                  {post.postDetail?.bus
                    ? post.postDetail.bus + 'm de distância'
                    : 'Não informado'}
                </p>
              </div>
            </div>
            <div className='feature'>
              <img src='/restaurant.png' alt='' />
              <div className='featureText'>
                <span>Restaurante</span>
                <p>
                  {post.postDetail?.restaurant
                    ? post.postDetail.restaurant + 'm de distância'
                    : 'Não informado'}
                </p>
              </div>
            </div>
          </div>

          <p className='title'>Localização</p>
          <div className='mapContainer'>
            <Map items={[post]} />
          </div>

          <div className='buttons'>
            {/* Componente WhatsApp personalizado para esta propriedade */}
            <WhatsAppChat property={post} contactType='property' />

            <button
              onClick={handleSave}
              style={{
                backgroundColor: saved ? '#fece51' : 'white',
              }}
              className='save-button'
            >
              <img src='/save.png' alt='' />
              {saved ? 'Imóvel Guardado' : 'Guardar Imóvel'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SinglePage;
