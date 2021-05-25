jQuery( document ).ready(
	function ($) {
		address_map                  = ['billing_address_map_map'];
		var address_search           = ['billing_address_map_search_input'];
		var map_address_data         = jQuery.parseJSON( map_data );
		var billing_shipping_address = [map_address_data.billing_data, map_address_data.shipping_data, map_address_data.location_list];
		var default_country          = woocommerce_default_country.woocommerce_country;
		autocomplete                 = [];
		marker                       = [];
		$.each(
			address_map,
			function (index, value) {
				if ($( '#' + value ).length > 0) {
					initAutocomplete( value, address_search[index], billing_shipping_address[index], default_country );
					shippingAutocomplete( billing_shipping_address[index], default_country );
				}

			}
		);

		jQuery( document ).on(
			'input',
			".search_input",
			function () {
				jQuery( '.find_location' ).val( "false" );
			}
		);
	}
);

function addYourLocationButton(map, marker, geocoder, type) {
	var controlDiv = document.createElement( 'div' );

	var firstChild = document.createElement( 'button' );
	firstChild.setAttribute( 'type', 'button' );
	firstChild.style.backgroundColor = '#fff';
	firstChild.style.border          = 'none';
	firstChild.style.outline         = 'none';
	firstChild.style.width           = '40px';
	firstChild.style.height          = '40px';
	firstChild.style.borderRadius    = '2px';
	firstChild.style.boxShadow       = '0 1px 4px rgba(0,0,0,0.3)';
	firstChild.style.cursor          = 'pointer';
	firstChild.style.marginRight     = '10px';
	firstChild.style.padding         = '0px';
	firstChild.title                 = 'Your Location';
	controlDiv.appendChild( firstChild );

	var secondChild                      = document.createElement( 'div' );
	secondChild.style.margin             = '11px';
	secondChild.style.width              = '18px';
	secondChild.style.height             = '18px';
	secondChild.style.backgroundImage    = 'url(https://maps.gstatic.com/tactile/mylocation/mylocation-sprite-1x.png)';
	secondChild.style.backgroundSize     = '';
	secondChild.style.backgroundPosition = '0px 0px';
	secondChild.style.backgroundRepeat   = 'no-repeat';
	secondChild.id                       = 'you_location_img';
	firstChild.appendChild( secondChild );

	google.maps.event.addListener(
		map,
		'dragend',
		function () {
			jQuery( '#you_location_img' ).css( 'background-position', '0px 0px' );
		}
	);

	firstChild.addEventListener(
		'click',
		function () {
			var imgX              = '0';
			var animationInterval = setInterval(
				function () {
					if (imgX == '-18') {
						imgX = '0';
					} else {
						imgX = '-18';
					}
					jQuery( '#you_location_img' ).css( 'background-position', imgX + 'px 0px' );
				},
				500
			);
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					function (position) {
						var latlng = new google.maps.LatLng( position.coords.latitude, position.coords.longitude );
						marker.setPosition( latlng );
						map.setCenter( latlng );
						clearInterval( animationInterval );
						jQuery( '#you_location_img' ).css( 'background-position', '-144px 0px' );
						geocoder.geocode(
							{'latLng': latlng},
							function (results, status) {
								// validate
								if (status != google.maps.GeocoderStatus.OK) {
									return;
								}
								if ( ! results[0]) {
									return;
								}

								var location = results[0];
								var country  = get_map_place( results[0] );
								// set lat , long and address
								if ( type == 'billing' ) {
									update_map_location_fields( map.map_id, position.coords.latitude, position.coords.longitude, location.formatted_address );
									// update billing/shipping address details
									update_billing_shipping_map_place( results[0], 0 );
								} else {
									update_billing_shipping_map_place( results[0], 1 );
								}

							}
						)
					}
				);

			} else {
				clearInterval( animationInterval );
				jQuery( '#you_location_img' ).css( 'background-position', '0px 0px' );
			}
			clearInterval( animationInterval );
		}
	);

	controlDiv.index = 1;
	map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push( controlDiv );
}

function initAutocomplete(map_element, search_input, billing_shipping_address, default_country) {
	// alert(map_element);
	// get map lat , lng and address
	var map_lat = '',
	map_lng     = '';
	var latlng;

	// get user address from billing/shipping user address
	if (billing_shipping_address.lat !== undefined && billing_shipping_address.lng !== undefined && billing_shipping_address.search_input !== undefined) {
		map_lat = parseFloat( billing_shipping_address.lat );
		map_lng = parseFloat( billing_shipping_address.lng );
		// map_country = billing_shipping_address.search_country;
		jQuery( '#' + map_element ).closest( '.form-row' ).find( '.search_input' ).val( billing_shipping_address.search_input );
		jQuery( '#' + map_element ).closest( '.form-row' ).find( '.search_lat' ).val( map_lat );
		jQuery( '#' + map_element ).closest( '.form-row' ).find( '.search_lng' ).val( map_lng );
		jQuery( '#' + map_element ).closest( '.form-row' ).find( '.find_location' ).val( "false" );
	} else {
		// Try HTML5 geolocation.
		infoWindow = new google.maps.InfoWindow();
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				function (position) {
					var pos = {
						lat: position.coords.latitude,
						lng: position.coords.longitude
					};

					latlng = new google.maps.LatLng( pos.lat, pos.lng );
					map.setCenter( pos );
					map_lat = pos.lat;
					map_lng = pos.lng;
					// update marker
					marker[0].setPosition( latlng );
					// show marker
					marker[0].setVisible( true );
					geocoder.geocode(
						{'latLng': latlng},
						function (results, status) {
							// validate
							if (status != google.maps.GeocoderStatus.OK) {
								console.log( 'Geocoder failed due to: ' + status );
								return;
							}
							if ( ! results[0]) {
								console.log( 'No results found' );
								return;
							}

							var location = results[0];
							var country  = get_map_place( results[0] );
							// set lat , long and address
							update_map_location_fields( map_element, pos.lat, pos.lng, location.formatted_address );
							// update billing/shipping address details
							update_billing_shipping_map_place( results[0], 0 );

						}
					);

				},
				function (error) {
					// handleLocationError(true, infoWindow, map.getCenter());
				}
			);
		} else {
			// Browser doesn't support Geolocation
			// handleLocationError(false, infoWindow, map.getCenter());
		}
	}

	// old place for map
	var map = new google.maps.Map(
		document.getElementById( map_element ),
		{
			center: {lat: map_lat, lng: map_lng},
			zoom: 8,
			mapTypeId: 'roadmap',
			streetViewControl: false,
			map_id: map_element,
		}
	);
	// geocode
	geocoder = new google.maps.Geocoder();
	if (billing_shipping_address.lat === undefined && billing_shipping_address.lng === undefined && billing_shipping_address.search_input === undefined) {

		geocodeAddress( geocoder, map, default_country );
	}
	marker.push(
		new google.maps.Marker(
			{
				map: map,
				draggable: true,
				animation: google.maps.Animation.DROP,
				position: {lat: map_lat, lng: map_lng}
			}
		)
	);

	latlng = new google.maps.LatLng( map_lat, map_lng );

	// var map_index = address_map.indexOf(map_element);

	if (marker.length - 1 != -1) {
		geocoder.geocode(
			{'latLng': latlng},
			function (results, status) {
				// validate
				if (status != google.maps.GeocoderStatus.OK) {
					console.log( 'Geocoder failed due to: ' + status );
					return;
				}
				if ( ! results[0]) {
					console.log( 'No results found' );
					return;
				}

				var location = results[0];
				var country  = get_map_place( results[0] );
				// update marker
				marker[marker.length - 1].setPosition( latlng );
				// show marker
				marker[marker.length - 1].setVisible( true );
				// set lat , long and address
				update_map_location_fields( map_element, map_lat, map_lng, location.formatted_address );
				// update billing/shipping address details
				update_billing_shipping_map_place( results[0], 0 );

			}
		);
	}

	// var e = new Event();
	marker[marker.length - 1].addListener(
		'click',
		function (e) {
			toggleBounce( e, jQuery( this ) );
		}
	);
	marker[marker.length - 1].addListener(
		'load',
		function (e) {
			toggleBounce( e, jQuery( this ) );
		}
	);
	marker[marker.length - 1].addListener(
		'dragend',
		function (e) {
			toggleBounce( e, jQuery( this ) );
		}
	);

	// Create the search box and link it to the UI element.
	var input = document.getElementById( search_input );
	autocomplete.push( new google.maps.places.Autocomplete( input ) );
	// var autocomplete = new google.maps.places.Autocomplete(input);
	autocomplete[autocomplete.length - 1].map = map;
	autocomplete[autocomplete.length - 1].bindTo( 'bounds', map );
	// map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

	// Bias the SearchBox results towards current map's viewport.
	map.addListener(
		'bounds_changed',
		function () {
			// searchBox.setBounds(map.getBounds());
		}
	);

	// change map marker when click on it
	map.addListener(
		'click',
		function (e) {
			changeMarkerCickMap( e, jQuery( this ), marker );
		}
	);
	// Listen for the event fired when the user selects a prediction and retrieve
	// more details for that place.
	autocomplete[autocomplete.length - 1].addListener(
		'place_changed',
		function (e) {
			// set vars
			var current_map = jQuery( this )[0].map;
			var map_id      = current_map.map_id;
			var map_index   = address_map.indexOf( map_id );
			// if there are map with with div map id then set map lat, lng and center
			if (map_index != -1) {
				var location          = autocomplete[map_index].getPlace();
				var country           = get_map_place( location );
				var lat               = location.geometry.location.lat();
				var lng               = location.geometry.location.lng();
				var latlng            = new google.maps.LatLng( lat, lng );
				var formatted_address = jQuery( '#' + map_id ).closest( '.form-row' ).find( '.search_input' ).val();
				// update marker
				marker[map_index].setPosition( latlng );
				// show marker
				marker[map_index].setVisible( true );
				// set center
				current_map.setCenter( latlng );

				// set lat , long and address
				update_map_location_fields( map_id, lat, lng, formatted_address );
				// update billing/shipping address details
				update_billing_shipping_map_place( location, map_index );
			}
		}
	);

	addYourLocationButton( map, marker[marker.length - 1], geocoder, 'billing' );
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition( pos );
	infoWindow.setContent(
		browserHasGeolocation ?
			'Error: The Geolocation service failed.' :
		'Error: Your browser doesn\'t support geolocation.'
	);
	infoWindow.open( map );
}

function toggleBounce(e, dataMap) {

	// vars
	var lat        = e.latLng.lat(),
			lng    = e.latLng.lng(),
			latlng = new google.maps.LatLng( lat, lng );
	var map_id     = dataMap[0].map.map_id;
	var map_index  = address_map.indexOf( map_id );
	if (map_index != -1) {

		if (marker[map_index].getAnimation() !== null) {
			marker[map_index].setAnimation( null );
		} else {
			marker[map_index].setAnimation( google.maps.Animation.BOUNCE );
		}

		geocoder.geocode(
			{'latLng': latlng},
			function (results, status) {
				// validate
				if (status != google.maps.GeocoderStatus.OK) {
					console.log( 'Geocoder failed due to: ' + status );
					return;
				}
				if ( ! results[0]) {
					console.log( 'No results found' );
					return;
				}

				var location = results[0];
				var country  = get_map_place( results[0] );
				// set lat , long and address
				update_map_location_fields( map_id, lat, lng, location.formatted_address );

				// update billing/shipping address details
				update_billing_shipping_map_place( results[0], map_index );
				if (marker[map_index].getAnimation()) {
					marker[map_index].setAnimation( null );
				}

			}
		);

	}

}

function changeMarkerCickMap(e, dataMap, marker) {
	// vars
	var lat       = e.latLng.lat(), lng = e.latLng.lng(), latlng = new google.maps.LatLng( lat, lng );
	var map_id    = dataMap[0].map_id;
	var map_index = address_map.indexOf( map_id );
	if (map_index != -1) {
		if (marker[map_index].getAnimation() !== null) {
			marker[map_index].setAnimation( null );
		} else {
			marker[map_index].setAnimation( google.maps.Animation.BOUNCE );
		}
		geocoder.geocode(
			{'latLng': latlng},
			function (results, status) {
				// validate
				if (status != google.maps.GeocoderStatus.OK) {
					console.log( 'Geocoder failed due to: ' + status );
					return;
				}
				if ( ! results[0]) {
					console.log( 'No results found' );
					return;
				}

				var location = results[0];
				var country  = get_map_place( results[0] );
				// update marker
				marker[map_index].setPosition( latlng );
				// show marker
				marker[map_index].setVisible( true );
				// set lat , long and address
				update_map_location_fields( map_id, lat, lng, location.formatted_address );
				// update billing/shipping address details
				update_billing_shipping_map_place( results[0], map_index );
				if (marker[map_index].getAnimation()) {
					marker[map_index].setAnimation( null );
				}
			}
		);
	} else {
		if (marker.getAnimation() !== null) {
			marker.setAnimation( null );
		} else {
			marker.setAnimation( google.maps.Animation.BOUNCE );
		}
		geocoder.geocode(
			{'latLng': latlng},
			function (results, status) {
				// validate
				if (status != google.maps.GeocoderStatus.OK) {
					console.log( 'Geocoder failed due to: ' + status );
					return;
				}
				if ( ! results[0]) {
					console.log( 'No results found' );
					return;
				}
				var location = results[0];
				// update marker
				marker.setPosition( latlng );
				// show marker
				marker.setVisible( true );
				// update billing/shipping address details
				update_billing_shipping_map_place( results[0], 1 );
				if (marker.getAnimation()) {
					marker.setAnimation( null );
				}

			}
		);
	}

}

function update_map_location_fields(map_id, lat, lng, formatted_address) {
	// set lat , long and address
	jQuery( '#' + map_id ).closest( '.form-row' ).find( '.search_lat' ).val( lat );
	jQuery( '#' + map_id ).closest( '.form-row' ).find( '.search_lng' ).val( lng );
	jQuery( '#' + map_id ).closest( '.form-row' ).find( '.search_input' ).val( formatted_address );
	jQuery( '#' + map_id ).closest( '.form-row' ).find( '.find_location' ).val( "true" );
	jQuery( '#billing_address_1' ).val( formatted_address );
}

function update_billing_shipping_map_place(location, map_index) {
	// define vars
	var map_form = '';
	if (map_index == 0) {
		map_form = 'billing_';
	} else {
		map_form = 'shipping_';
	}
	var fields              = ['country', 'city', 'state', 'postcode'];
	var map_location_fields = ['country', 'locality', 'administrative_area_level_1', 'postal_code'];
	// get city , state and postal code

	jQuery.each(
		map_location_fields,
		function (index, value) {
			var filtered_array = location.address_components.filter(
				function (address_component) {
					if (address_component.types.includes( value )) {
						return address_component.types.includes( value );
					} else if (value == 'locality' && ! address_component.types.includes( value )) {
						if (address_component.types.includes( 'administrative_area_level_1' )) {
							return address_component.types.includes( 'administrative_area_level_1' );
						} else if ( ! address_component.types.includes( 'administrative_area_level_1' ) && address_component.types.includes( 'administrative_area_level_2' )) {
							return address_component.types.includes( 'administrative_area_level_2' );
						} else if ( ! address_component.types.includes( 'administrative_area_level_1' ) && ! address_component.types.includes( 'administrative_area_level_2' ) && address_component.types.includes( 'administrative_area_level_3' )) {
							return address_component.types.includes( 'administrative_area_level_3' );
						}

					}
				}
			);

			var map_field;

			setTimeout(
				function(){
					if (value == 'administrative_area_level_1' && filtered_array.length) {
						map_field = extractFromAdress( filtered_array );

						// check if billing state field is exist
						if ( jQuery( '#billing_state' ).length ) {
							if ( map_form == 'shipping_' ) {
								jQuery( "input#shipping_address_map_search_input" ).val( location.formatted_address );
								jQuery( '#shipping_state' ).val( map_field );
								jQuery( '#shipping_state' ).select2().trigger( 'change' );
								if ( jQuery( '#shipping_state' ).select2().val() === '' || jQuery( '#shipping_state' ).select2().val() === null ) {
									jQuery( "#shipping_state option" ).each(
										function() {
											var current = jQuery( this );
											var n       = jQuery( current ).text().toLowerCase();
											var m       = map_field.toLowerCase();
											if ( n == m || n.indexOf( m ) > -1 ) {
												var val = jQuery( current ).val();
												jQuery( '#shipping_state' ).val( val );
												jQuery( '#shipping_state' ).select2().trigger( 'change' );
											}
										}
									);
								}
							}
							jQuery( '#billing_state' ).val( map_field );
							jQuery( '#billing_state' ).select2().trigger( 'change' );
							if ( jQuery( '#billing_state' ).select2().val() === '' || jQuery( '#billing_state' ).select2().val() === null ) {
								jQuery( "#billing_state option" ).each(
									function() {
										var current = jQuery( this );
										var n       = jQuery( current ).text().toLowerCase();
										var m       = map_field.toLowerCase();
										if ( n == m || n.indexOf( m ) > -1 ) {
											var val = jQuery( current ).val();
											jQuery( '#billing_state' ).val( val );
											jQuery( '#billing_state' ).select2().trigger( 'change' );
										}
									}
								);
							}
						}
					}
				},
				1000
			);

			if (value == 'country' && filtered_array.length) {
				map_field = filtered_array[0].short_name;
			} else if (value == 'locality' && filtered_array.length) {
				map_field = extractFromAdress( filtered_array );
				map_field = filtered_array[0].long_name;

			} else if (filtered_array.length) {
				map_field = filtered_array[0].long_name;
			} else {
				map_field = "";
			}
			if (fields[index] === "country") {
				setTimeout(
					function(){
						jQuery( '#' + map_form + fields[index] ).val( map_field );
						jQuery( '#' + map_form + fields[index] ).select2().trigger( 'change' );
					},
					500
				);

			} else {
				jQuery( '#' + map_form + fields[index] ).val( map_field );
			}
		}
	);
}

function extractFromAdress(components) {

	if (components[0].types.includes( 'locality' )) {
		return components[0].long_name;
	} else {
		for (var i = components.length - 1; i >= 0; i--) {

			for (var j = 0; j < components[i].types.length; j++)
			if (components[i].types[j] == 'administrative_area_level_1') {
				return components[i].short_name;
				break;
			} else if (components[i].types[j] == 'administrative_area_level_2') {
				return components[i].long_name;
				break;
			} else if (components[i].types[j] == 'administrative_area_level_3') {
				return components[i].long_name;
				break;
			} else {
				return "none";
			}
		}
	}
	return "";
}
function get_map_place(location) {
	// get location
	var filtered_array = location.address_components.filter(
		function (address_component) {
			if (address_component.types.includes( "locality" )) {
				return address_component.types.includes( "locality" );
			} else if (address_component.types.includes( "administrative_area_level_1" )) {
				return address_component.types.includes( "administrative_area_level_1" );
			} else {
				return address_component.types.includes( "country" );
			}
		}
	);
	return filtered_array.length ? filtered_array[0].long_name : "";
}


// geocode
function geocodeAddress(geocoder, resultsMap, default_country) {
	geocoder.geocode(
		{'address': default_country},
		function (results, status) {
			// validate
			if (status != google.maps.GeocoderStatus.OK) {
				console.log( 'Geocoder failed due to: ' + status );
				return;
			}
			if ( ! results[0]) {
				console.log( 'No results found' );
				return;
			}

			if (status === 'OK') {
				resultsMap.setCenter( results[0].geometry.location );
				marker[0].setPosition( results[0].geometry.location );
				// show marker
				marker[0].setVisible( true );
			}
		}
	);
}

// shipping
function shippingAutocomplete(default_country, billing_shipping_address) {
	let map, marker, geocoder, infoWindow;
	var s_input        = document.getElementById( 'shipping_address_map_search_input' );
	var s_autocomplete = new google.maps.places.Autocomplete( s_input );
	s_autocomplete.addListener(
		'place_changed',
		function (e) {
			var address_object = s_autocomplete.getPlace();
			var lat            = address_object.geometry.location.lat();
			var lng            = address_object.geometry.location.lng();
			var latlng         = new google.maps.LatLng( lat, lng );
			marker.setPosition( latlng );
			marker.setVisible( true );
			map.setCenter( latlng );
			update_billing_shipping_map_place( address_object, 1 );
		}
	);

	var map_lat = '', map_lng = '', map_address = '';
	let latlng;
	var map_element = "shipping_address_map";
	if (billing_shipping_address.lat !== undefined && billing_shipping_address.lng !== undefined && billing_shipping_address.search_input !== undefined) {
		map_lat = parseFloat( billing_shipping_address.lat );
		map_lng = parseFloat( billing_shipping_address.lng );
		latlng  = new google.maps.LatLng( map_lat, map_lng );
		var pos = {
			lat: map_lat,
			lng: map_lng
		};
		shipping_map_dragend( map_lat, map_lng, latlng, pos );

		jQuery( '#' + map_element + 'search_input' ).closest( '.form-row' ).find( '.search_input' ).val( billing_shipping_address.search_input );
		jQuery( '#' + map_element + 'search_lat' ).closest( '.form-row' ).find( '.search_lat' ).val( map_lat );
		jQuery( '#' + map_element + 'search_lng' ).closest( '.form-row' ).find( '.search_lng' ).val( map_lng );
		jQuery( '#' + map_element + 'find_location' ).closest( '.form-row' ).find( '.find_location' ).val( "false" );

		// shipping_map_dragend(map_lat, map_lng, new google.maps.LatLng(map_lat, map_lng), pos);
	} else {
		// Try HTML5 geolocation.
		infoWindow = new google.maps.InfoWindow();
		var slat   = 36.241384;
		var slng   = -113.7547193;
		latlng     = new google.maps.LatLng( slat, slng );
		map_lat    = slat;
		map_lng    = slng;
		var pos    = {
			lat: map_lat,
			lng: map_lng
		};
	}
	var s_map_element = document.getElementById( "shipping_address_map_map" );
	map               = new google.maps.Map(
		s_map_element,
		{
			center: {lat: latlng.lat(), lng: latlng.lng()},
			zoom: 8,
			mapTypeId: 'roadmap',
			streetViewControl: false,
			map_id: 'shipping_address_map_map',
		}
	);

	map.setCenter( pos );

	marker = new google.maps.Marker(
		{
			position: latlng,
			map: map,
			draggable: true,
			animation: google.maps.Animation.DROP,
		}
	);

	map.addListener(
		'click',
		function (e) {
			changeMarkerCickMap( e, jQuery( this ), marker );
		}
	);
	geocoder = new google.maps.Geocoder();
	marker.addListener(
		'click',
		function (e) {
			shippingToggleBounce( marker );
		}
	);
	marker.addListener(
		'load',
		function (e) {
			shippingToggleBounce( marker );
		}
	);
	google.maps.event.addListener(
		marker,
		'dragend',
		function(e) {
			shippingToggleBounce( marker );
			var lat = e.latLng.lat(),
			lng     = e.latLng.lng(),
			latlng  = new google.maps.LatLng( lat, lng );
			geocoder.geocode(
				{
					latLng: marker.getPosition()
				},
				function(responses, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						if ( responses[0] ) {
							var s_address_comp = responses[0];
							var s_city         = get_map_place( s_address_comp );
							update_shipping_map_location_fields( 'shipping_address_map', lat, lng, s_address_comp.formatted_address );
							update_billing_shipping_map_place( s_address_comp, 1 );
						}
					}
				}
			);
		}
	);
	addYourLocationButton( map, marker, geocoder, 'shipping' )
}

function update_shipping_map_location_fields(map_id, lat, lng, formatted_address) {
	jQuery( '#' + map_id + 'search_lat' ).closest( '.form-row' ).find( '.search_lat' ).val( lat );
	jQuery( '#' + map_id + 'search_lng' ).closest( '.form-row' ).find( '.search_lng' ).val( lng );
	jQuery( '#' + map_id + 'find_location' ).closest( '.form-row' ).find( '.find_location' ).val( "true" );
	jQuery( '#shipping_address_1' ).val( formatted_address );
	jQuery( '#shipping_address_map_search_input' ).val( formatted_address );
}

function shippingToggleBounce(marker) {
	if (marker.getAnimation() !== null) {
		marker.setAnimation( null );
	} else {
		marker.setAnimation( google.maps.Animation.BOUNCE );
	}
	setTimeout(
		function() {
			marker.setAnimation( null );
		},
		3000
	);
}
