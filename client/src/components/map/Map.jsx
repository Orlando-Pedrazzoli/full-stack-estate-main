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

function Map({ items = [], center, zoom, singleProperty = false }) {
  const [filteredItems, setFilteredItems] = useState([]);

  // Filtrar items baseado na URL atual ou mostrar todos se for página individual
  useEffect(() => {
    console.log('🗺️ Map useEffect executado');
    console.log('Items recebidos:', items.length);
    console.log('singleProperty:', singleProperty);

    if (!items || items.length === 0) {
      console.log('⚠️ Nenhum item para mostrar no mapa');
      setFilteredItems([]);
      return;
    }

    // Se for página individual, mostrar apenas o item
    if (singleProperty) {
      console.log(
        '📍 Modo single property - mostrando',
        items.length,
        'item(s)'
      );
      setFilteredItems(items);
      return;
    }

    // Para páginas de listagem, aplicar filtros da URL
    const urlParams = new URLSearchParams(window.location.search);
    const typeFilter = urlParams.get('type');
    const cityFilter = urlParams.get('city');
    const minPrice = urlParams.get('minPrice');
    const maxPrice = urlParams.get('maxPrice');

    console.log('🔍 Aplicando filtros:');
    console.log('- Type:', typeFilter);
    console.log('- City:', cityFilter);
    console.log('- Price range:', minPrice, '-', maxPrice);

    let filtered = [...items];

    // Aplicar filtros
    if (typeFilter) {
      filtered = filtered.filter(item => {
        const match = item.type === typeFilter;
        console.log(`Item ${item.id}: type=${item.type}, match=${match}`);
        return match;
      });
      console.log(
        `📊 Após filtro tipo '${typeFilter}':`,
        filtered.length,
        'items'
      );
    }

    if (cityFilter) {
      filtered = filtered.filter(
        item =>
          item.city &&
          item.city.toLowerCase().includes(cityFilter.toLowerCase())
      );
      console.log(
        `🏙️ Após filtro cidade '${cityFilter}':`,
        filtered.length,
        'items'
      );
    }

    if (minPrice && !isNaN(minPrice)) {
      filtered = filtered.filter(item => item.price >= parseInt(minPrice));
      console.log(
        `💰 Após filtro preço mín '${minPrice}':`,
        filtered.length,
        'items'
      );
    }

    if (maxPrice && !isNaN(maxPrice)) {
      filtered = filtered.filter(item => item.price <= parseInt(maxPrice));
      console.log(
        `💰 Após filtro preço máx '${maxPrice}':`,
        filtered.length,
        'items'
      );
    }

    console.log(`🎯 Total final no mapa: ${filtered.length} items`);
    setFilteredItems(filtered);

    // Debug das coordenadas
    filtered.forEach(item => {
      console.log(
        `Item ${item.id}: lat=${item.latitude}, lng=${item.longitude}, type=${item.type}`
      );
    });
  }, [items, singleProperty, window.location.search]);

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

  // Calcular centro baseado nos items filtrados ou usar props
  const getMapCenter = () => {
    if (center) {
      console.log('📍 Usando centro fornecido via props:', center);
      return center;
    }

    if (filteredItems.length === 0) {
      console.log('📍 Usando centro padrão (sem items)');
      return defaultCenter;
    }

    const validItems = filteredItems.filter(
      item =>
        item.latitude &&
        item.longitude &&
        !isNaN(parseFloat(item.latitude)) &&
        !isNaN(parseFloat(item.longitude))
    );

    console.log('📍 Items com coordenadas válidas:', validItems.length);

    if (validItems.length === 0) {
      console.log('📍 Usando centro padrão (coordenadas inválidas)');
      return defaultCenter;
    }

    if (validItems.length === 1) {
      const centerCoord = [
        parseFloat(validItems[0].latitude),
        parseFloat(validItems[0].longitude),
      ];
      console.log('📍 Centralizando em item único:', centerCoord);
      return centerCoord;
    }

    const avgLat =
      validItems.reduce((sum, item) => sum + parseFloat(item.latitude), 0) /
      validItems.length;
    const avgLng =
      validItems.reduce((sum, item) => sum + parseFloat(item.longitude), 0) /
      validItems.length;
    const centerCoord = [avgLat, avgLng];
    console.log('📍 Centro calculado para múltiplos items:', centerCoord);

    return centerCoord;
  };

  const getMapZoom = () => {
    if (zoom) {
      return zoom;
    }

    if (filteredItems.length === 0) return 7;
    if (filteredItems.length === 1) return 14;
    if (filteredItems.length <= 5) return 11;
    return 9;
  };

  const mapCenter = getMapCenter();
  const mapZoom = getMapZoom();

  console.log('🗺️ Renderizando mapa com:');
  console.log('- Centro:', mapCenter);
  console.log('- Zoom:', mapZoom);
  console.log('- Items filtrados:', filteredItems.length);

  return (
    <div className='map-wrapper'>
      {/* Header do mapa (apenas se não for página individual) */}
      {!singleProperty && (
        <div className='map-header'>
          <h3>📍 Localização das Propriedades</h3>
          <div className='map-info'>
            <span className='count'>
              {filteredItems.length}{' '}
              {filteredItems.length === 1 ? 'propriedade' : 'propriedades'}
            </span>
          </div>
        </div>
      )}

      {/* Container do mapa */}
      <div className='map-container'>
        <MapContainer
          center={mapCenter}
          zoom={mapZoom}
          style={{ height: '100%', width: '100%' }}
          key={`map-${filteredItems.length}-${mapCenter.join('-')}-${
            singleProperty ? 'single' : 'list'
          }`}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />

          {filteredItems.map(item => {
            const lat = parseFloat(item.latitude);
            const lng = parseFloat(item.longitude);

            if (isNaN(lat) || isNaN(lng)) {
              console.warn(
                `⚠️ Coordenadas inválidas para item ${item.id}: lat=${item.latitude}, lng=${item.longitude}`
              );
              return null;
            }

            const icon = item.type === 'buy' ? buyIcon : rentIcon;

            return (
              <Marker position={[lat, lng]} icon={icon} key={item.id}>
                <Popup>
                  <div className='popup-content'>
                    {/* Se não for página individual, mostrar link */}
                    {!singleProperty ? (
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
                    ) : (
                      // Se for página individual, mostrar info sem link
                      <div className='popup-single'>
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
                      </div>
                    )}
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

      {/* Legenda (apenas se não for página individual) */}
      {!singleProperty && (
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
      )}
    </div>
  );
}

export default Map;
