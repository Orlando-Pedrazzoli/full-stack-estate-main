// client/src/components/pin/Pin.jsx
import { Marker, Popup } from 'react-leaflet';
import './pin.scss';
import { Link } from 'react-router-dom';

function Pin({ item }) {
  // Validar se o item tem coordenadas válidas
  if (
    !item ||
    typeof item.latitude !== 'number' ||
    typeof item.longitude !== 'number' ||
    isNaN(item.latitude) ||
    isNaN(item.longitude)
  ) {
    console.warn('Pin: Invalid coordinates for item:', item);
    return null;
  }

  const position = [item.latitude, item.longitude];

  console.log('Pin position:', position);

  return (
    <Marker position={position}>
      <Popup>
        <div className='popupContainer'>
          {item.images && item.images.length > 0 && (
            <img
              src={item.images[0]}
              alt={item.title || 'Propriedade'}
              onError={e => {
                e.target.style.display = 'none';
              }}
            />
          )}
          <div className='textContainer'>
            <Link to={`/post/${item.id}`}>{item.title || 'Propriedade'}</Link>
            <span>
              {item.bedroom} {item.bedroom === 1 ? 'quarto' : 'quartos'}
            </span>
            <b>
              € {item.price?.toLocaleString('pt-PT') || 'Preço não disponível'}
            </b>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

export default Pin;
