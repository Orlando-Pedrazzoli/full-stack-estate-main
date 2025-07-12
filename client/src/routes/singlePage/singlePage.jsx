// client/src/routes/singlePage/singlePage.jsx
import './singlePage.scss';
import Slider from '../../components/slider/Slider';
import Map from '../../components/map/Map';
import WhatsAppChat from '../../components/whatsapp/WhatsAppChat';
import { useNavigate, useLoaderData } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import apiRequest from '../../lib/apiRequest';

function SinglePage() {
  const post = useLoaderData();
  const [saved, setSaved] = useState(post.isSaved);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!currentUser) {
      navigate('/login');
    }
    setSaved(prev => !prev);
    try {
      await apiRequest.post('/users/save', { postId: post.id });
    } catch (err) {
      console.log(err);
      setSaved(prev => !prev);
    }
  };

  return (
    <div className='singlePage'>
      <div className='details'>
        <div className='wrapper'>
          <Slider images={post.images} />
          <div className='info'>
            <div className='top'>
              <div className='post'>
                <h1>{post.title}</h1>
                <div className='address'>
                  <img src='/pin.png' alt='' />
                  <span>{post.address}</span>
                </div>
                <div className='price'>
                  € {post.price.toLocaleString('pt-PT')}
                </div>
              </div>
              <div className='user'>
                <img src={post.user.avatar || '/rq-profile.jpg'} alt='' />
                <span>{post.user.username}</span>
              </div>
            </div>
            <div
              className='bottom'
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.postDetail.desc),
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
                {post.postDetail.utilities === 'owner' ? (
                  <p>Incluídas pelo proprietário</p>
                ) : (
                  <p>Por conta do inquilino</p>
                )}
              </div>
            </div>
            <div className='feature'>
              <img src='/pet.png' alt='' />
              <div className='featureText'>
                <span>Animais de Estimação</span>
                {post.postDetail.pet === 'allowed' ? (
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
                <p>{post.postDetail.income}</p>
              </div>
            </div>
          </div>

          <p className='title'>Áreas</p>
          <div className='sizes'>
            <div className='size'>
              <img src='/size.png' alt='' />
              <span>{post.postDetail.size} m²</span>
            </div>
            <div className='size'>
              <img src='/bed.png' alt='' />
              <span>{post.bedroom} quartos</span>
            </div>
            <div className='size'>
              <img src='/bath.png' alt='' />
              <span>{post.bathroom} casa(s) de banho</span>
            </div>
          </div>

          <p className='title'>Proximidades</p>
          <div className='listHorizontal'>
            <div className='feature'>
              <img src='/school.png' alt='' />
              <div className='featureText'>
                <span>Escola</span>
                <p>
                  {post.postDetail.school > 999
                    ? post.postDetail.school / 1000 + 'km'
                    : post.postDetail.school + 'm'}{' '}
                  de distância
                </p>
              </div>
            </div>
            <div className='feature'>
              <img src='/bus.png' alt='' />
              <div className='featureText'>
                <span>Paragem de Autocarro</span>
                <p>{post.postDetail.bus}m de distância</p>
              </div>
            </div>
            <div className='feature'>
              <img src='/restaurant.png' alt='' />
              <div className='featureText'>
                <span>Restaurante</span>
                <p>{post.postDetail.restaurant}m de distância</p>
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
    </div>
  );
}

export default SinglePage;
