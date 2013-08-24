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
	var position;

	navigator.geolocation.getCurrentPosition(function(_position) {
		position = _position.coords;
		var myLatLng = new google.maps.LatLng(position.latitude, position.longitude);
		var beachMarker = new google.maps.Marker({
			position: myLatLng,
			map: map,
		});
		var lat = (position.latitude + "").substring(0, 8);
		var lon = (position.longitude + "").substring(0, 8);
		var type = "amenity=restaurant"
		var url = 'http://overpass.osm.rambler.ru/cgi/interpreter?data=[out:json];(node(around:250,' + lat + ',' + lon + ')[' + type + '];way(around:250,' + lat + ',' + lon + ')[' + type + '];);(._;>;);out body;';
		$.getJSON(url, function(data) {
			console.log(url);
			console.log(data);

			for (var i in data.elements) {
				var p=data.elements[i];


				var tagHTML=p.tags.name;
				if (p.tags.phone){
					tagHTML+="<br />phone "+p.tags.phone
				}
				if (p.tags.website){
					tagHTML+="<br />Website <a href='"+p.tags.website+"'>"+p.tags.website+"</a>"
				}


				var pos = new google.maps.LatLng(p.lat, p.lon);
				var marker = new google.maps.Marker({
					position: pos,
					map: map,
					title: p.tags.name 
				});

				var infowindow = new google.maps.InfoWindow({
					content: tagHTML
				});

				google.maps.event.addListener(marker, 'click', function() {
					infowindow.open(map, this);
				});
			}

		});

		console.log(position.latitude, position.longitude);
	});

	// バス路線をすべて読み込み
	for (var i = 1; i < 10; i++) {
		$.getJSON("http://tutujibus.com/busstopLookup.php?rosenid=" + i + "&callback=?",
			function(data) {
				for (var i in data.busstop) {
					var busstop = data.busstop[i];
					var busLatLng = new google.maps.LatLng(busstop.latitude, busstop.longitude);
					var marker = new google.maps.Marker({
						position: busLatLng,
						map: map,
						icon: "http://tutujibus.com/image/busstop32.png",
						title: data.busstop[i].name
					});

					var infowindow = new google.maps.InfoWindow({
						content: "<div>" + data.busstop[i].name + "</div>"
					});

					google.maps.event.addListener(marker, 'click', function() {
						infowindow.open(map, this);
					});

				}
			});
	}
});