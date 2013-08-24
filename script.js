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
		position = _position;
		var myLatLng = new google.maps.LatLng(busstop.latitude, busstop.longitude);
		var beachMarker = new google.maps.Marker({
			position: myLatLng,
			map: map,
		});

		console.log(position.coords.latitude);
	});


	for (var i = 1; i < 10; i++) {
		$.getJSON("http://tutujibus.com/busstopLookup.php?rosenid=" + i + "&callback=?",
			function(data) {
				for (var i in data.busstop) {
					var busstop = data.busstop[i];
					var busLatLng = new google.maps.LatLng(busstop.latitude, busstop.longitude);
					var beachMarker = new google.maps.Marker({
						position: busLatLng,
						map: map,
						icon: "http://tutujibus.com/image/busstop32.png"
					});
				}
			});
	}
});