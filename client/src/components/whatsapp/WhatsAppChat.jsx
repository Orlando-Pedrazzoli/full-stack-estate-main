// client/src/components/whatsapp/WhatsAppChat.jsx
import { useContext } from 'react';
import './whatsAppChat.scss';
import { AuthContext } from '../../context/AuthContext';

function WhatsAppChat({ property = null, contactType = 'general' }) {
  const { currentUser } = useContext(AuthContext);

  // Número da Raquel (substitua pelo número real)
  const RAQUEL_WHATSAPP = '351912164220'; // Formato: código país + número

  const generateWhatsAppMessage = () => {
    let message = '';

    if (contactType === 'property' && property) {
      message = `Olá Raquel! 👋

Tenho interesse na seguinte propriedade:

🏠 *${property.title}*
📍 ${property.address}
💰 €${property.price.toLocaleString('pt-PT')}
🛏️ ${property.bedroom} quartos | 🚿 ${property.bathroom} casas de banho

${
  currentUser
    ? `
👤 *Os meus dados:*
Nome: ${currentUser.username}
Email: ${currentUser.email}
`
    : ''
}

Poderia fornecer mais informações sobre este imóvel?

Obrigado(a)! 🙏`;
    } else if (contactType === 'sell') {
      message = `Olá Raquel! 👋

Tenho interesse em *vender* um imóvel e gostaria de conhecer os seus serviços.

${
  currentUser
    ? `
👤 *Os meus dados:*
Nome: ${currentUser.username}
Email: ${currentUser.email}
`
    : ''
}

Poderia entrar em contacto comigo para conversarmos?

Obrigado(a)! 🙏`;
    } else if (contactType === 'buy') {
      message = `Olá Raquel! 👋

Estou à procura de um imóvel para *comprar* e gostaria do seu apoio profissional.

${
  currentUser
    ? `
👤 *Os meus dados:*
Nome: ${currentUser.username}
Email: ${currentUser.email}
`
    : ''
}

Poderia ajudar-me a encontrar a propriedade ideal?

Obrigado(a)! 🙏`;
    } else if (contactType === 'rent') {
      message = `Olá Raquel! 👋

Estou à procura de um imóvel para *arrendar* e gostaria da sua ajuda.

${
  currentUser
    ? `
👤 *Os meus dados:*
Nome: ${currentUser.username}
Email: ${currentUser.email}
`
    : ''
}

Tem disponível alguma propriedade que se adeque às minhas necessidades?

Obrigado(a)! 🙏`;
    } else {
      message = `Olá Raquel! 👋

Gostaria de falar consigo sobre serviços imobiliários.

${
  currentUser
    ? `
👤 *Os meus dados:*
Nome: ${currentUser.username}
Email: ${currentUser.email}
`
    : ''
}

Quando seria possível conversarmos?

Obrigado(a)! 🙏`;
    }

    return encodeURIComponent(message);
  };

  const openWhatsApp = () => {
    const message = generateWhatsAppMessage();
    const whatsappURL = `https://wa.me/${RAQUEL_WHATSAPP}?text=${message}`;
    window.open(whatsappURL, '_blank');
  };

  const getButtonText = () => {
    switch (contactType) {
      case 'property':
        return '💬 Contactar sobre este imóvel';
      case 'sell':
        return '💰 Quero vender';
      case 'buy':
        return '🏠 Quero comprar';
      case 'rent':
        return '🔑 Quero arrendar';
      default:
        return '💬 Falar no WhatsApp';
    }
  };

  const getButtonClass = () => {
    switch (contactType) {
      case 'property':
        return 'whatsapp-btn property';
      case 'sell':
        return 'whatsapp-btn sell';
      case 'buy':
        return 'whatsapp-btn buy';
      case 'rent':
        return 'whatsapp-btn rent';
      default:
        return 'whatsapp-btn general';
    }
  };

  return (
    <div className='whatsapp-chat'>
      <button
        onClick={openWhatsApp}
        className={getButtonClass()}
        title='Contactar via WhatsApp'
      >
        <img src='/whatsapp.png' alt='WhatsApp' className='whatsapp-icon' />
        <span>{getButtonText()}</span>
      </button>
    </div>
  );
}

// Componente para o botão flutuante do WhatsApp
export function WhatsAppFloating() {
  const RAQUEL_WHATSAPP = '351912164220';

  const openWhatsApp = () => {
    const message = encodeURIComponent(`Olá Raquel! 👋

Vi o seu site e gostaria de falar consigo sobre serviços imobiliários.

Obrigado(a)! 🙏`);

    const whatsappURL = `https://wa.me/${RAQUEL_WHATSAPP}?text=${message}`;
    window.open(whatsappURL, '_blank');
  };

  return (
    <div className='whatsapp-floating' onClick={openWhatsApp}>
      <img src='/whatsapp.png' alt='WhatsApp' />
      <div className='tooltip'>Falar no WhatsApp</div>
    </div>
  );
}

export default WhatsAppChat;
