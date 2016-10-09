function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 40.8054491, lng: -73.9654415 },
    zoom: 16,

  });

  var marker = new google.maps.Marker({
      position: { lat: 40.8054491, lng: -73.9654415 },
      map: map,
      title: "Welcome to my house!"
  });

}

var styles = [
  {
    stylers: [ //alters the colors of the map as a whole
      { hue: '#00ffe6'},
      { saturation: -20 }
    ]
  },
  { //styles geometry lines of the roads:
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      { lightness: 100 },
      { visibility : 'simplified'}
    ]
  },
  { //The visibility of road labels:
    featureType: 'road',
    elementType: 'labels',
    stylers: [
      { visibility : 'simplified'}
    ]
  }
];
