$(function() {
	var labelMap= new Array();

	$.get("csv/out.csv",function(csvdata){
	  csvdata = csvdata.replace("/\r/gm", "");
       var a = csvdata.split(String.fromCharCode(10));
      for (var i in a) {
      	var tmp = a[i].split(",");

      	labelMap[tmp[0]]=tmp[1];
      };
	});

	/* 緯度・経度：日本, 表参道駅（東京）*/
	var latlng = new google.maps.LatLng(35.94267, 136.199032);
	/* 地図のオプション設定 */
	var mapOptions = {
		/*初期のズーム レベル */
		zoom: 17,
		/* 地図の中心点 */
		center: latlng,
		/* 地図タイプ */
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	function getCurrentArea(latitude, longitude) {
		

		var lat = (latitude + "").substring(0, 8);
		var lon = (longitude + "").substring(0, 8);
		var type = $("#shopList").val();
		var url = 'http://overpass.osm.rambler.ru/cgi/interpreter?data=[out:json];(node(around:250,' + lat + ',' + lon + ')[' + type + '];way(around:250,' + lat + ',' + lon + ')[' + type + '];);(._;>;);out body;';
		$.getJSON(url, function(data) {

				for (var i in data.elements) {
					var p = data.elements[i];
						var pos = new google.maps.LatLng(p.lat, p.lon);
						var marker = new google.maps.Marker({
							position: pos,
							map: map,
							title: p.tags.name
						});

						function getEvent(p){
							return function(){
									var tagHTML = p.tags.name;
								if (p.tags.phone) {
									tagHTML += "<br />phone " + p.tags.phone
								}
								if (p.tags.website) {
									tagHTML += "<br />Website <a href='" + p.tags.website + "'>" + p.tags.website + "</a>"
								}

								var infowindow = new google.maps.InfoWindow({
									content: tagHTML
								});
							
								infowindow.open(map, this);							
							}
						}


					google.maps.event.addListener(marker, 'click', getEvent(p))

				};
		});
	}
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
						content: "<div>" + data.busstop[i].name+":" +labelMap[data.busstop[i].name]+ "</div>"
					});

					google.maps.event.addListener(marker, 'click', function() {
						console.log(this);

						getCurrentArea(this.position.mb, this.position.nb);
						map.panTo(new google.maps.LatLng(this.position.mb, this.position.nb));


						infowindow.open(map, this);
					});

				}
			});
	}
});