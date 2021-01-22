// Creating map object
var myMap = L.map("mapid", {
    center: [40.7128, -74.0059],
    zoom: 3
  });
  
  // Adding tile layer
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);
  
  // Use this link to get the usgsjson data.
  var usgs = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
  
  // Function that will determine the color based on the depth of the earthquake
  function chooseColor(depth) {
    if (depth > 90)
    return "red";
    else if (depth > 70)
    return "orange";
    else if (depth > 50)
    return "light orange";
    else if (depth > 30)
    return "yellow";
    else if (depth >10)
    return "light green";
    else
    return "green";
  }
  
  // Function that will determine the size of marker based on the magnitute of the earthquake
    function chooseSize(mag) {
        return (mag*3000)

    }

    //Perform get request for the query
    d3.json(usgs, function(data) 
  {
    createFeatures(data.features)});


    //Define function
    function createFeatures(data){
        var earthquakedata =  L.geoJson(data, {
            
            // Called on each feature
            onEachFeature: function(feature, layer) {
                layer.bindPopup("<h1>" + feature.properties.place + "</h1> <hr> <h2>" + feature.properties.magnitude + "</h2>" + feature.geometry.coordinates[2])
            },
            pointToLayer: function (feature, latlong){
                return new L.circle(latlong, {
                    color: "white",
                  // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
                  fillColor: chooseColor(feature.geometry.coordinates[2]),
                  fillOpacity: 0.5,
                  weight: 1.5,
                  radius: chooseSize(feature.properties.mag)
                })

                }
        })
        //calling createMap function
        createMap(earthquakedata)
    }
  