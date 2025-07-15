// client/src/components/map/PinIcons.jsx
import { divIcon } from 'leaflet';

// Função para criar ícones SVG personalizados
const createCustomPin = (type, price) => {
  const color = type === 'buy' ? '#4CAF50' : '#2196F3';
  const text = type === 'buy' ? 'VENDA' : 'ARREND';
  const priceText = price ? `€${Math.round(price / 1000)}k` : '';

  const svgIcon = `
    <svg width="40" height="50" viewBox="0 0 40 50" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="rgba(0,0,0,0.3)"/>
        </filter>
        <linearGradient id="gradient-${type}" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${
            type === 'buy' ? '#45a049' : '#1976D2'
          };stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- Pin principal -->
      <path d="M20 0C9 0 0 9 0 20c0 11 20 30 20 30s20-19 20-30C40 9 31 0 20 0z" 
            fill="url(#gradient-${type})" 
            filter="url(#shadow)"/>
      
      <!-- Círculo interno -->
      <circle cx="20" cy="20" r="12" fill="white" opacity="0.9"/>
      
      <!-- Ícone da casa -->
      <path d="M20 10l-6 6v8h3v-4h6v4h3v-8l-6-6z" fill="${color}" stroke="white" stroke-width="0.5"/>
      
      <!-- Texto do tipo -->
      <text x="20" y="47" text-anchor="middle" 
            font-family="Arial, sans-serif" 
            font-size="6" 
            font-weight="bold" 
            fill="white">${text}</text>
      
      ${
        priceText
          ? `
        <!-- Badge do preço -->
        <rect x="8" y="2" width="24" height="10" rx="5" fill="rgba(0,0,0,0.8)"/>
        <text x="20" y="9" text-anchor="middle" 
              font-family="Arial, sans-serif" 
              font-size="7" 
              font-weight="bold" 
              fill="white">${priceText}</text>
      `
          : ''
      }
    </svg>
  `;

  return divIcon({
    html: svgIcon,
    className: `custom-pin custom-pin-${type}`,
    iconSize: [40, 50],
    iconAnchor: [20, 50],
    popupAnchor: [0, -50],
  });
};

// Função para criar ícone de cluster
const createClusterIcon = (count, types) => {
  const hasBuy = types.includes('buy');
  const hasRent = types.includes('rent');

  let color = '#6c757d';
  if (hasBuy && hasRent) {
    color = '#9C27B0'; // Roxo para misto
  } else if (hasBuy) {
    color = '#4CAF50'; // Verde para venda
  } else if (hasRent) {
    color = '#2196F3'; // Azul para arrendamento
  }

  const svgIcon = `
    <svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="cluster-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="rgba(0,0,0,0.4)"/>
        </filter>
        <linearGradient id="cluster-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${color};stop-opacity:0.8" />
        </linearGradient>
      </defs>
      
      <!-- Círculo principal -->
      <circle cx="25" cy="25" r="22" 
              fill="url(#cluster-gradient)" 
              filter="url(#cluster-shadow)"
              stroke="white" 
              stroke-width="3"/>
      
      <!-- Círculo interno -->
      <circle cx="25" cy="25" r="16" fill="white" opacity="0.9"/>
      
      <!-- Número -->
      <text x="25" y="30" text-anchor="middle" 
            font-family="Arial, sans-serif" 
            font-size="14" 
            font-weight="bold" 
            fill="${color}">${count}</text>
      
      <!-- Indicadores de tipo -->
      ${
        hasBuy && hasRent
          ? `
        <circle cx="18" cy="12" r="3" fill="#4CAF50"/>
        <circle cx="32" cy="12" r="3" fill="#2196F3"/>
      `
          : ''
      }
    </svg>
  `;

  return divIcon({
    html: svgIcon,
    className: 'custom-cluster',
    iconSize: [50, 50],
    iconAnchor: [25, 25],
  });
};

// Função para criar ícone de ponto selecionado
const createSelectedPin = type => {
  const color = type === 'buy' ? '#4CAF50' : '#2196F3';

  const svgIcon = `
    <svg width="50" height="60" viewBox="0 0 50 60" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="selected-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="3" stdDeviation="5" flood-color="rgba(0,0,0,0.5)"/>
        </filter>
        <linearGradient id="selected-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${
            type === 'buy' ? '#45a049' : '#1976D2'
          };stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- Pin ampliado -->
      <path d="M25 5C14 5 5 14 5 25c0 11 20 30 20 30s20-19 20-30C45 14 36 5 25 5z" 
            fill="url(#selected-gradient)" 
            filter="url(#selected-shadow)"/>
      
      <!-- Círculo interno -->
      <circle cx="25" cy="25" r="15" fill="white" opacity="0.95"/>
      
      <!-- Ícone da casa ampliado -->
      <path d="M25 15l-8 8v10h4v-6h8v6h4v-10l-8-8z" fill="${color}" stroke="white" stroke-width="1"/>
      
      <!-- Pulse ring -->
      <circle cx="25" cy="25" r="20" fill="none" stroke="${color}" stroke-width="2" opacity="0.6">
        <animate attributeName="r" values="20;25;20" dur="2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2s" repeatCount="indefinite"/>
      </circle>
    </svg>
  `;

  return divIcon({
    html: svgIcon,
    className: `custom-pin custom-pin-selected custom-pin-${type}`,
    iconSize: [50, 60],
    iconAnchor: [25, 60],
    popupAnchor: [0, -60],
  });
};

export { createCustomPin, createClusterIcon, createSelectedPin };
