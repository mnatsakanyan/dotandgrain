/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
jQuery( document ).ready(
	function ($) {

		var input        = document.getElementById( '_billing_address_1' );
		var autocomplete = new google.maps.places.Autocomplete( input );
		google.maps.event.addListener(
			autocomplete,
			'place_changed',
			function () {
				var place = autocomplete.getPlace();
				document.getElementById( '_billing_admin_address_map' ).value = place.formatted_address;
				document.getElementById( '_billing_admin_search_lat' ).value  = place.geometry.location.lat();
				document.getElementById( '_billing_admin_search_lng' ).value  = place.geometry.location.lng();
				document.getElementById( '_billing_city' ).value              = place.name;
			}
		);

	}
);
