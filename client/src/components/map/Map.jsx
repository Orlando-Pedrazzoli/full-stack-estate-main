// client/src/components/map/Map.jsx
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import './map.scss';

// Importar os ícones do Leaflet
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

// Corrigir problema dos ícones padrão do Leaflet
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

function Map({ items = [] }) {
  const [filteredItems, setFilteredItems] = useState([]);

  // Filtrar items baseado na URL atual
  useEffect(() => {
    if (!items || items.length === 0) {
      setFilteredItems([]);
      return;
    }

    // Obter parâmetros da URL atual
    const urlParams = new URLSearchParams(window.location.search);
    const typeFilter = urlParams.get('type');
    const cityFilter = urlParams.get('city');
    const minPrice = urlParams.get('minPrice');
    const maxPrice = urlParams.get('maxPrice');

    let filtered = [...items];

    // Aplicar filtros
    if (typeFilter) {
      filtered = filtered.filter(item => item.type === typeFilter);
    }

    if (cityFilter) {
      filtered = filtered.filter(
        item =>
          item.city &&
          item.city.toLowerCase().includes(cityFilter.toLowerCase())
      );
    }

    if (minPrice && !isNaN(minPrice)) {
      filtered = filtered.filter(item => item.price >= parseInt(minPrice));
    }

    if (maxPrice && !isNaN(maxPrice)) {
      filtered = filtered.filter(item => item.price <= parseInt(maxPrice));
    }

    console.log(`🗺️ Mostrando ${filtered.length} propriedades no mapa`);
    setFilteredItems(filtered);
  }, [items]);

  // Ícones customizados simples
  const buyIcon = new Icon({
    iconUrl: iconUrl,
    shadowUrl: shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    className: 'buy-marker',
  });

  const rentIcon = new Icon({
    iconUrl: iconUrl,
    shadowUrl: shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    className: 'rent-marker',
  });

  // Centro padrão (Lisboa)
  const defaultCenter = [38.7223, -9.1393];
  const defaultZoom = 10;

  // Calcular centro baseado nos items filtrados
  const getMapCenter = () => {
    if (filteredItems.length === 0) {
      return defaultCenter;
    }

    const validItems = filteredItems.filter(
      item =>
        item.latitude &&
        item.longitude &&
        !isNaN(parseFloat(item.latitude)) &&
        !isNaN(parseFloat(item.longitude))
    );

    if (validItems.length === 0) {
      return defaultCenter;
    }

    if (validItems.length === 1) {
      return [
        parseFloat(validItems[0].latitude),
        parseFloat(validItems[0].longitude),
      ];
    }

    const avgLat =
      validItems.reduce((sum, item) => sum + parseFloat(item.latitude), 0) /
      validItems.length;
    const avgLng =
      validItems.reduce((sum, item) => sum + parseFloat(item.longitude), 0) /
      validItems.length;

    return [avgLat, avgLng];
  };

  const getMapZoom = () => {
    if (filteredItems.length === 0) return 7;
    if (filteredItems.length === 1) return 14;
    if (filteredItems.length <= 5) return 11;
    return 9;
  };

  const mapCenter = getMapCenter();
  const mapZoom = getMapZoom();

  return (
    <div className='map-wrapper'>
      {/* Header do mapa */}
      <div className='map-header'>
        <h3>📍 Localização das Propriedades</h3>
        <div className='map-info'>
          <span className='count'>
            {filteredItems.length}{' '}
            {filteredItems.length === 1 ? 'propriedade' : 'propriedades'}
          </span>
        </div>
      </div>

      {/* Container do mapa */}
      <div className='map-container'>
        <MapContainer
          center={mapCenter}
          zoom={mapZoom}
          style={{ height: '100%', width: '100%' }}
          key={`map-${filteredItems.length}-${mapCenter.join('-')}`}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />

          {filteredItems.map(item => {
            const lat = parseFloat(item.latitude);
            const lng = parseFloat(item.longitude);

            if (isNaN(lat) || isNaN(lng)) {
              return null;
            }

            const icon = item.type === 'buy' ? buyIcon : rentIcon;

            return (
              <Marker position={[lat, lng]} icon={icon} key={item.id}>
                <Popup>
                  <div className='popup-content'>
                    <Link to={`/post/${item.id}`} className='popup-link'>
                      {item.images && item.images[0] && (
                        <div className='popup-image'>
                          <img
                            src={item.images[0]}
                            alt={item.title}
                            onError={e => {
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                      )}

                      <div className='popup-info'>
                        <h4>{item.title || 'Propriedade'}</h4>
                        <p className='price'>
                          €{item.price?.toLocaleString('pt-PT') || 'N/A'}
                          {item.type === 'rent' && '/mês'}
                        </p>
                        <p className='address'>{item.address}</p>
                        <div className='details'>
                          <span>🛏️ {item.bedroom}</span>
                          <span>🚿 {item.bathroom}</span>
                        </div>
                        <div className='type'>
                          <span className={`badge ${item.type}`}>
                            {item.type === 'buy' ? 'Venda' : 'Arrendamento'}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>

        {/* Overlay quando não há resultados */}
        {filteredItems.length === 0 && (
          <div className='no-results-overlay'>
            <div className='no-results-content'>
              <h4>🏠 Nenhuma propriedade encontrada</h4>
              <p>Tente ajustar os filtros de pesquisa</p>
            </div>
          </div>
        )}
      </div>

      {/* Legenda */}
      <div className='map-legend'>
        <div className='legend-item'>
          <div className='legend-marker buy'></div>
          <span>Venda</span>
        </div>
        <div className='legend-item'>
          <div className='legend-marker rent'></div>
          <span>Arrendamento</span>
        </div>
      </div>
    </div>
  );
}

export default Map;
