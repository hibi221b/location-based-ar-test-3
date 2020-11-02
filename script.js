window.onload = () => {
    let latitude, longitude;

    navigator.geolocation.getCurrentPosition((position) => {
        latitude = position.coords.latitude
        longitude = position.coords.longitude
    })

    let places = staticLoadPlaces(latitude, longitude);
    renderPlaces(places)

    changeAframeBoxColor()
}

const staticLoadPlaces = (lat, lng) => {
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

const setModel = (model, entity) => {
    entity.setAttribute('position', model.position);
    entity.setAttribute('color', model.color)
    entity.setAttribute('scale', model.scale)
}

const renderPlaces = (places) => {
    let scene = document.querySelector("a-scene");

    let modelIndex = 0;
    let models = [
        {
            position: "-20 4 10",
            color: "red",
            scale: "7 7 7"
        }
    ];

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let model = document.createElement("a-box")
        model.id = "aframe-box"
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
    
        setModel(models[modelIndex], model);
        modelIndex++;

        scene.appendChild(model);
    });
}

const changeAframeBoxColor = () => {
    setInterval(() => {
        const aframeBox = document.getElementById("aframe-box");
        const rgb = {
            r: Math.floor(Math.random() * 256), 
            g: Math.floor(Math.random() * 256),
            b: Math.floor(Math.random() * 256),
        };
        const aframeBoxColor = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
        aframeBox.setAttribute('color', aframeBoxColor)
    }, 10);
}