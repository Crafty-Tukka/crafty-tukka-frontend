const mapStyles = [
  {
    featureType: 'all',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'administrative',
    elementType: 'labels.text',
    stylers: [
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'landscape.natural',
    elementType: 'labels.text',
    stylers: [
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#aadd55'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.text',
    stylers: [
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text',
    stylers: [
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#0099dd'
      }
    ]
  }
];
export default mapStyles;
