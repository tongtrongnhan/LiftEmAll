var map;
var markers = [];

function initAutocomplete() { 
    setupMap();

    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function () {
        searchBox.setBounds(map.getBounds());
    });

    
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function (place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            var address = '';
            if (place.address_components) {
                address = [
                  (place.address_components[0] && place.address_components[0].short_name || ''),
                  (place.address_components[1] && place.address_components[1].short_name || ''),
                  (place.address_components[2] && place.address_components[2].short_name || '')
                ].join(' ');
            }
            var marker = new google.maps.Marker({
                markerId: markers.length + 1,
                map: map,
                icon: icon,
                title: place.name,
                address: address,
                position: place.geometry.location
            });           

            marker.setIcon(/** @type {google.maps.Icon} */({                
                url: place.icon,
                name: place.name,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(10, 10),
                scaledSize: new google.maps.Size(35, 35)
            }));
            marker.setPosition(place.geometry.location);
            marker.setVisible(true);

            // set event
            google.maps.event.addListener(marker, 'click', function (e) {
                getCurrentLocation(map, marker);
                
            });
            
            // Create a marker for each place.
            markers.push(marker);

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }           
            openInfoWindowTemplate(marker, place.name, address);
           
        });
         map.fitBounds(bounds);        
    });
}

function setupMap() {
    var mapOptions = {
        center: new google.maps.LatLng(10.799596, 106.7000696), /// need HCM city10.799596,106.7000696
        zoom: 9,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: true,
        overviewMapControl: true,
        rotateControl: true,
    };
    map = new google.maps.Map(document.getElementById("map"), mapOptions);

}

function getCurrentLocation(map, marker) {
    var latlng = new google.maps.LatLng(marker.position.lat, marker.position.lng); //{ lat: marker.position.lat, lng : marker.position.lng }
    
    var infowindow = new google.maps.InfoWindow();

    openInfoWindowTemplate(marker, marker.name, marker.address);   
}

function GetMarker(markerId) {
    for(i = 0; i < markers.length; i++){
        if (markers[i].markerId == markerId)
            return markers[i];
    }
}


function openInfoWindowTemplate(marker, name, address) {
    var infowindow = new google.maps.InfoWindow();
    infowindow.setContent('<div ><strong>' + name + '</strong><br>' + address + '<br><button data-markerid="' + marker.markerId + '" class="Pickup">Pickup</button><button  data-markerid="' + marker.markerId + '" class="Destination">Destination</button></div>');
    infowindow.open(map, marker);   
    google.maps.event.addListener(infowindow, 'domready', bindEventAfterShowInfoWindow);
    
}

function bindEventAfterShowInfoWindow() {
    bindEventToPickupButton();
    bindEventToDestinationButton();
}

function bindEventToPickupButton() {
    $('.Pickup').unbind('click').bind('click', function () {
        var marker = GetMarker($(this).data('markerid'));
        if (marker) {
            $("#PickUpLocation").val(marker.address);
            window.home.showRightPanel(true);
        }       
    });    
}

function bindEventToDestinationButton() {
    $('.Destination').unbind("click").bind('click', function (e) {
        var marker = GetMarker($(this).data('markerid'));
        if (marker) {
            $("#DestinationLocation").val(marker.address);
            window.home.showRightPanel(true);
        }
        
    });
}

function displayMarkers() {
    ClearMarkers();
    
    // this variable sets the map bounds and zoom level according to markers position
    var bounds = new google.maps.LatLngBounds();

    // For loop that runs through the info on markersData making it possible to createMarker function to create the markers
    for (var i = 0; i < markers.length; i++) {

        var latlng = new google.maps.LatLng(markers[i].position.lat(), markers[i].position.lng());
        var title = markers[i].title;
        var address = markers[i].address;

        createMarker(latlng, title, address, i + 1);

        // Marker’s Lat. and Lng. values are added to bounds variable
        bounds.extend(latlng);
    }

    // Finally the bounds variable is used to set the map bounds
    // with API’s fitBounds() function
    map.fitBounds(bounds);
}

function createMarker(latlng, title, address, markerId) {
   
    var infoWindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
        map: map,
        position: latlng,
        title: title,
        address: address,
        markerId: markerId
    });
    markers.push(marker);
    // This event expects a click on a marker
    // When this event is fired the infowindow content is created
    // and the infowindow is opened
    google.maps.event.addListener(marker, 'click', function () {
        // Variable to define the HTML content to be inserted in the infowindow
        openInfoWindowTemplate(marker, title, address);
    });
}

function ClearMarkers() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
}

function GetAllRequest() {
    var url = 
    $.ajax({
        url: '',
        data: {
            checklistItemId: id,
            statusId: status,
            comment: comment,
            userAction: userAction,
            url: url
        },
        type: 'POST',
        success: function (result) {
            $('#SearchForm').submit();
        }
    });
}