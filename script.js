window.onload = () => {
    let latitude, longitude;

    navigator.geolocation.getCurrentPosition((position) => {
        latitude = position.coords.latitude
        longitude = position.coords.longitude
    })

    let places = staticLoadPlaces(latitude, longitude);
    renderPlaces(places)
}

function staticLoadPlaces(lat, lng) {
    return [
        {
            name: 'aframe box',
            location: {
                lat: lat,
                lng: lng
            },
        },
    ];
}

let models = [
    {
        position: "-1 0.5 -3",
        rotation: "0 45 0",
        color: "red"
    }
];

let modelIndex = 0;
let setModel = (model, entity) => {
    entity.setAttribute('position', model.position);
    entity.setAttribute('rotation', model.rotation);
    entity.setAttribute('color', model.color)
}

const renderPlaces = (places) => {
    let scene = document.querySelector("a-scene");

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let model = document.createElement("a-box")
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
    
        setModel(models[modelIndex], model);
        modelIndex++;

        scene.appendChild(model);
    });
}