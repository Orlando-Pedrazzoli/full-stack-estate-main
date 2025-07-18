// client/src/components/card/Card.jsx
import { Link } from 'react-router-dom';
import WhatsAppChat from '../whatsapp/WhatsAppChat';
import './card.scss';

function Card({ item }) {
  const openWhatsApp = () => {
    const RAQUEL_WHATSAPP = '351933859122'; // Substitua pelo número real

    const message = encodeURIComponent(`Olá Raquel! 

Tenho interesse na seguinte propriedade:

 *${item.title}*
 ${item.address}
 €${item.price.toLocaleString('pt-PT')}
 ${item.bedroom} quartos |  ${item.bathroom} casas de banho

Poderia fornecer mais informações sobre este imóvel?

Obrigado(a)! `);

    const whatsappURL = `https://wa.me/${RAQUEL_WHATSAPP}?text=${message}`;
    window.open(whatsappURL, '_blank');
  };

  return (
    <div className='card'>
      <Link to={`/post/${item.id}`} className='imageContainer'>
        <img src={item.images[0]} alt='' />
      </Link>
      <div className='textContainer'>
        <h2 className='title'>
          <Link to={`/post/${item.id}`}>{item.title}</Link>
        </h2>
        <p className='address'>
          <img src='/pin.png' alt='' />
          <span>{item.address}</span>
        </p>
        <p className='price'>€ {item.price.toLocaleString('pt-PT')}</p>
        <div className='bottom'>
          <div className='features'>
            <div className='feature'>
              <img src='/bed.png' alt='' />
              <span>{item.bedroom} bedroom</span>
            </div>
            <div className='feature'>
              <img src='/bath.png' alt='' />
              <span>{item.bathroom} bathroom</span>
            </div>
          </div>
          <div className='icons'>
            <div className='icon'>
              <img src='/save.png' alt='' />
            </div>
            <div
              className='icon whatsapp-icon'
              onClick={openWhatsApp}
              title='Contactar via WhatsApp'
            >
              <img src='/whatsapp.png' alt='WhatsApp' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
