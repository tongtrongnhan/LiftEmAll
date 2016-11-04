(function (home, $, undefined) {
    "use strict";
    $("#panelCaller").on("click", function() {
        var opened = $(this).hasClass("open");
        $(this).toggleClass("open");

        opened ? $("#panel").removeClass("open") : $("#panel").addClass("open");
    });
    $("#panel .nav li[role='presentation'] a").on("click", function () {
        $("#panel .nav li[role='presentation']").removeClass("active");
        $(this).closest("li[role='presentation']").addClass("active");

        $("#panel .tab-content").removeClass("open");
        $($(this).data("target")).addClass("open");
    });
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
}(window.home = window.home || {}, jQuery));

function initAutocomplete() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -33.8688, lng: 151.2195 },
        zoom: 13,
        mapTypeId: 'roadmap'
    });

    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function () {
        searchBox.setBounds(map.getBounds());
    });

    var markers = [];
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

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            }));

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });
}