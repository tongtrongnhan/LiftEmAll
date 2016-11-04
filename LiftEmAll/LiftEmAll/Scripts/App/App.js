var markers = [];


function showRightPanel(show) {
    if (show) {
        $("#panel").css("right", "0px");
        return;
    }

    $("#panel").css("right") == "-300px" ?
    $("#panel").css("right", "0px") :
    $("#panel").css("right", "-300px");
}
$(function () {
    $('.slider-arrow').click(function () {
        if ($(this).hasClass('show')) {
            $(".slider-arrow, .panel").animate({
                left: "+=290"
            }, 700, function () {
                // Animation complete.
            });
            $(this).html('&laquo;').removeClass('show').addClass('hide');
        }
        else {
            $(".slider-arrow, .panel").animate({
                left: "-=290"
            }, 700, function () {
                // Animation complete.
            });
            $(this).html('&raquo;').removeClass('hide').addClass('show');
        }
    });
    
});

function initAutocomplete() {
    var mapOptions = {
        center: new google.maps.LatLng(33.8688, 151.2195), /// need HCM city
        zoom: 9,
        mapTypeId: google.maps.MapTypeId.HYBRID,
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: true,
        overviewMapControl: true,
        rotateControl: true,
    };
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    
    

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

        // Clear out the old markers.
        markers.forEach(function (marker) {
            marker.setMap(null);
        });
        markers = [];

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
            showRightPanel(true);
        }       
    });    
}

function bindEventToDestinationButton() {
    $('.Destination').unbind("click").bind('click', function (e) {
        var marker = GetMarker($(this).data('markerid'));
        if (marker) {
            $("#DestinationLocation").val(marker.address);
            showRightPanel(true);
        }
        
    });
}
