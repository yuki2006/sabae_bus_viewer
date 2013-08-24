$(function() {
	/* 緯度・経度：日本, 表参道駅（東京）*/
	var latlng = new google.maps.LatLng(35.94267, 136.199032);
	/* 地図のオプション設定 */
	var mapOptions = {
		/*初期のズーム レベル */
		zoom: 15,
		/* 地図の中心点 */
		center: latlng,
		/* 地図タイプ */
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("map_canvas"),
		mapOptions);

	//        var map = new OpenLayers.Map("canvas");
	//        var mapnik = new OpenLayers.Layer.OSM();
	//        map.addLayer(mapnik);

	//        var lonLat = new OpenLayers.LonLat(133.744519, 34.569651)
	//            .transform(
	//                new OpenLayers.Projection("EPSG:4326"), 
	//                new OpenLayers.Projection("EPSG:900913")
	//            );
	//        map.setCenter(lonLat, 15);

	// var markers = new OpenLayers.Layer.Markers("Markers");
	// 	map.addLayer(markers);
	// var marker = new OpenLayers.Marker(
	//    	new OpenLayers.LonLat(139.76, 35.68)
	//        .transform(
	//            new OpenLayers.Projection("EPSG:4326"), 
	//            new OpenLayers.Projection("EPSG:900913")
	//        )
	//    );
	// 	markers.addMarker(marker);


	$.getJSON("http://tutujibus.com/busstopLookup.php?rosenid=1&callback=?",
		function(data) {
			for (var i in data.busstop) {
				var busstop=data.busstop[i];
				  var myLatLng = new google.maps.LatLng( busstop.latitude,busstop.longitude);
				  var beachMarker = new google.maps.Marker({
				      position: myLatLng,
				      map: map
				  });




				console.log(data.busstop[i].latitude);
			}
		});
});