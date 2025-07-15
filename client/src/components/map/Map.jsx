// 2. ATUALIZAR Map.jsx - Adicionar validação de coordenadas
// Substitua o arquivo Map.jsx completo por este:

import { MapContainer, TileLayer } from 'react-leaflet';
import './map.scss';
import 'leaflet/dist/leaflet.css';
import Pin from '../pin/Pin';

function Map({ items }) {
  // 🔧 CORREÇÃO: Filtrar apenas itens com coordenadas válidas
  const validItems = items.filter(item => {
    const lat =
      typeof item.latitude === 'string'
        ? parseFloat(item.latitude)
        : item.latitude;
    const lng =
      typeof item.longitude === 'string'
        ? parseFloat(item.longitude)
        : item.longitude;

    const isValid =
      lat !== null &&
      lng !== null &&
      !isNaN(lat) &&
      !isNaN(lng) &&
      lat !== 0 &&
      lng !== 0;

    if (isValid) {
      // Converter coordenadas para números se necessário
      item.latitude = lat;
      item.longitude = lng;
    }

    return isValid;
  });

  // Debug para ver quantos itens válidos temos
  console.log(
    `🗺️ Itens totais: ${items.length}, Itens válidos: ${validItems.length}`
  );

  // Determinar centro do mapa
  const getCenter = () => {
    if (validItems.length === 0) {
      // Portugal como padrão
      return [39.3999, -8.2245];
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

  const center = getCenter();
  const zoom = validItems.length === 1 ? 13 : validItems.length === 0 ? 7 : 10;

  console.log(`🗺️ Centro do mapa: [${center[0]}, ${center[1]}], Zoom: ${zoom}`);

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
      className='map'
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {validItems.map(item => {
        console.log(
          `🗺️ Renderizando pin para ${item.title}: [${item.latitude}, ${item.longitude}]`
        );
        return <Pin item={item} key={item.id} />;
      })}
    </MapContainer>
  );
}

export default Map;
