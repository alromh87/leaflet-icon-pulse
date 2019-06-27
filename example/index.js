(function() {
    var map = new L.Map('map', {
            center: new L.LatLng(52.520, 13.385),
            zoom: 5
        }),
        layer = new L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
            minZoom: 5,
            maxZoom: 18
        });

    map.addLayer(layer);

    var pulsingIcon = L.icon.pulse({iconSize:[20,20],color:'red'});
    var marker = L.marker([52.9167,13.9333],{icon: pulsingIcon}).addTo(map)
                   .on('click', function(e){
                     this.options.icon.toggle();
                   })
                   .on('dblclick',function(e){
                     this.options.icon.setFillColor("rgb("+Math.round(Math.random() * 255)+","+Math.round(Math.random() * 255)+","+Math.round(Math.random() * 255)+")");
                   });
})();
