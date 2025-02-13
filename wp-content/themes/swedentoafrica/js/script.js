$(document).ready(function() {
	if ($('#map').length) {
	
		mapboxgl.accessToken =
      "pk.eyJ1IjoiZXZpZXhhYWIiLCJhIjoiY2lxaHJ2d3I4MDA5Zmk2a3g2MXluMzlkdyJ9.GzIqoAYBLTE5TZeFyQF0fg";

    const locations = [
      [57.706987482663415, 11.966897243282768], // Start
      [57.107118, 12.252091],
      [55.604981, 13.003822],
      [55.676097, 12.568337],
      [54.90233, 9.151075],
      [52.370216, 4.895168],
      [48.856614, 2.352222],
      [45.764043, 4.835659],
      [43.296482, 5.36978],
      [42.506285, 1.521801],
      [41.385064, 2.173403],
      [39.469907, -0.376288],
      [36.838976, -2.461095],
      [36.140751, -5.353585],
      [34.015049, -6.83272],
      [30.91987, -6.893539],
      [30.433333, -9.6],
      [23.69751, -15.93698],
      [18.084061, -15.97842],
      [14.764504, -17.366029],
      [11.866667, -15.6],
      [8.881667, -12.044167],
      [6.300774, -10.79716],
      [4.375968, -7.700942],
      [5.336318, -4.027751],
      [5.555717, -0.196306],
      [6.441158, 3.417977],
      [5.80934, 8.854195],
      [4.575472, 13.68459],
      [4.361698, 18.555975],
      [2.15, 21.516667],
      [-3.524167, 23.596389],
      [-5.892211, 22.402781],
      [-8.838333, 13.234444],
      [-14.707163, 13.821626],
      [-19.775174, 13.044385],
      [-22.558904, 17.082481],
      [-32.178611, 18.891111],
      [-33.924869, 18.424055],
      [-34.35712644507828, 18.473928186983837], // End
    ];

    const map = new mapboxgl.Map({
      container: "map",
      projection: "mercator",
      style: "mapbox://styles/mapbox/outdoors-v12",
      center: [16.863281, 20.776659],
      zoom: $("body").hasClass("page-id-14") ? 2 : 1,
    });

    map.addControl(new mapboxgl.NavigationControl());

    [locations[0], locations[locations.length - 1]].forEach(
      (coordinates, i) => {
        const el = document.createElement("div");
        el.className = "marker";
        el.style.width = `48px`;
        el.style.height = `22px`;
        el.style.backgroundImage = `url(http://www.swedentoafrica.com/img/${
          i === 0 ? "start" : "end"
        }.png)`;
        el.style.backgroundSize = "100%";
        new mapboxgl.Marker(el)
          .setLngLat([coordinates[1], coordinates[0]])
          .addTo(map);
      }
    );

    map.on("load", () => {
      map.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: locations.map((location) => location.reverse()),
          },
        },
      });
      map.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#F6F936",
          "line-width": 7,
        },
      });
    });
	}

	if ($('body').hasClass('single')) {
		if ($('.gallery').length) {
			var aside = $('<aside class="cf sidebar-gallery"><h2>Related photos</h2></aside>');
			aside.append($('.gallery'));
			aside.find('img').attr('width', '100').attr('height', '100');
aside.find('a').each(function() {
				$(this).attr('title', $(this).find('img').attr('alt'));
			});
			aside.find('.gallery').show();
			aside.insertAfter('#main-content');
		}

		
	}

	$("article a[href$='.jpg']").each(function() {
		$(this).attr('title', $(this).find('img').attr('alt'));
		$(this).attr('rel', 'post-gallery');
	});

	$(".gallery a, article a[href$='.jpg'], .sidebar-gallery a").fancybox({
		closeClick: true,
		prevEffect: 'none',
		nextEffect: 'none',
		closeBtn: false,

		helpers: {
			thumbs: {
				width: 50,
				height: 50
			}
		}
	});

	$('header ul.menu > li > a').on('click', function(e) {
		if ($(this).next().hasClass('sub-menu')) {
			e.preventDefault();
			$(this).parent().toggleClass('open');
		}
	}).mouseover(function() {
		$(this).parent().addClass('open');
	}).mouseout(function() {
		$(this).parent().removeClass('open');
	}).parent().mouseover(function() {
		$(this).addClass('open');
	}).mouseout(function() {
		$(this).removeClass('open');
	});

	// 10k km's beard special

	$('#10k-kms-beard').mouseover(function() {
		$(this).attr('src', $(this).attr('data-hover-image-src'));
	}).mouseout(function() {
		$(this).attr('src', $(this).attr('data-original-image-src'));
	});
});