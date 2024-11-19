// Initialize the map
const map = L.map('map').setView([20, 0], 2);

// Add a blank tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors',
}).addTo(map);

// Load GeoJSON data for world borders
fetch('https://raw.githubusercontent.com/datasets/geo-boundaries-world-110m/master/countries.geojson')
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      style: {
        color: '#333',
        weight: 1,
        fillOpacity: 0.2,
      },
      onEachFeature: (feature, layer) => {
        layer.on('click', () => {
          const countryName = feature.properties.ADMIN; // Country name
          const guess = prompt(`What is the name of this country?`);
          
          if (guess && guess.toLowerCase() === countryName.toLowerCase()) {
            layer.setStyle({ fillColor: 'green', fillOpacity: 0.8 });
            alert('Correct!');
          } else {
            layer.setStyle({ fillColor: 'red', fillOpacity: 0.8 });
            alert(`Wrong! The correct answer is ${countryName}.`);
          }
        });
      },
    }).addTo(map);
  });
