// client/src/components/map/Map.jsx
import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import './map.scss';
import 'leaflet/dist/leaflet.css';
import Pin from '../pin/Pin';
import L from 'leaflet';

// Fix para os ícones padrão do Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function Map({ items = [] }) {
  const mapRef = useRef(null);
  const [isMapReady, setIsMapReady] = useState(false);

  // Validar se items existe e tem dados válidos
  const validItems = Array.isArray(items)
    ? items.filter(item => {
        const hasValidCoords =
          item &&
          typeof item.latitude === 'number' &&
          typeof item.longitude === 'number' &&
          !isNaN(item.latitude) &&
          !isNaN(item.longitude) &&
          item.latitude !== 0 &&
          item.longitude !== 0;

        return hasValidCoords;
      })
    : [];

  // Coordenadas padrão para Portugal
  const defaultCenter = [39.3999, -8.2245];
  const defaultZoom = 7;

  // Calcular centro e zoom baseado nos itens válidos
  const getMapCenter = () => {
    if (validItems.length === 0) {
      return defaultCenter;
    }

    if (validItems.length === 1) {
      return [validItems[0].latitude, validItems[0].longitude];
    }

    // Calcular centro baseado em múltiplos pontos
    const avgLat =
      validItems.reduce((sum, item) => sum + item.latitude, 0) /
      validItems.length;
    const avgLng =
      validItems.reduce((sum, item) => sum + item.longitude, 0) /
      validItems.length;

    return [avgLat, avgLng];
  };

  const getMapZoom = () => {
    if (validItems.length <= 1) {
      return validItems.length === 1 ? 13 : defaultZoom;
    }
    return 10;
  };

  // Forçar re-render do mapa quando necessário
  useEffect(() => {
    const timer = setTimeout(() => {
      if (mapRef.current) {
        try {
          mapRef.current.invalidateSize();
          setIsMapReady(true);
        } catch (error) {
          console.error('Error invalidating map size:', error);
        }
      }
    }, 100);

    const secondTimer = setTimeout(() => {
      if (mapRef.current) {
        try {
          mapRef.current.invalidateSize();
        } catch (error) {
          console.error('Error in second invalidateSize:', error);
        }
      }
    }, 500);

    return () => {
      clearTimeout(timer);
      clearTimeout(secondTimer);
    };
  }, [validItems]);

  // Adicionar listener para redimensionamento da janela
  useEffect(() => {
    const handleResize = () => {
      if (mapRef.current) {
        setTimeout(() => {
          mapRef.current.invalidateSize();
        }, 100);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const mapCenter = getMapCenter();
  const mapZoom = getMapZoom();

  // Sempre renderizar o mapa, mesmo sem itens válidos
  return (
    <div
      className='map-wrapper'
      style={{
        height: '100%',
        width: '100%',
        position: 'relative',
        minHeight: '300px',
        background: '#f8f9fa',
      }}
    >
      <div className='map-info'>
        <span>Propriedades: {validItems.length}</span>
        <span>
          Centro: [{mapCenter[0].toFixed(2)}, {mapCenter[1].toFixed(2)}]
        </span>
        <span>Zoom: {mapZoom}</span>
      </div>

      <MapContainer
        ref={mapRef}
        center={mapCenter}
        zoom={mapZoom}
        scrollWheelZoom={true}
        doubleClickZoom={true}
        dragging={true}
        zoomControl={true}
        className='map'
        style={{
          height: '100%',
          width: '100%',
          minHeight: '300px',
          background: '#f8f9fa',
          position: 'relative',
          zIndex: 1,
        }}
        key={`map-${validItems.length}-${mapCenter.join('-')}`}
        whenCreated={mapInstance => {
          setTimeout(() => {
            mapInstance.invalidateSize();
          }, 100);
          setTimeout(() => {
            mapInstance.invalidateSize();
          }, 500);
        }}
        whenReady={() => {
          setIsMapReady(true);
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          maxZoom={19}
          crossOrigin={true}
        />
        {validItems.map((item, index) => (
          <Pin item={item} key={`pin-${item.id || index}`} />
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;
