(function(window) {

    L.Icon.Pulse = L.DivIcon.extend({

        options: {
            className: '',
            iconSize: [12,12],
            fillColor: 'red',
            color: 'red',
            animate: true,
            heartbeat: 1,
        },

        initialize: function (options) {
            L.setOptions(this,options);

            // css

            var uniqueClassName = 'lpi-'+ new Date().getTime()+'-'+Math.round(Math.random()*100000);
            this.uniqueClassName = uniqueClassName;

            var before = ['background-color: '+this.options.fillColor];
            var after = [

                'box-shadow: 0 0 6px 2px '+this.options.color,

                'animation: pulsate ' + this.options.heartbeat + 's ease-out',
                'animation-iteration-count: infinite',
                'animation-delay: '+ (this.options.heartbeat + .1) + 's',
                'position:absolute',
                'left:0',
            ];

            var css = [
                '.'+uniqueClassName+'{'+before.join(';')+';}',
                '.'+uniqueClassName+':after{'+after.join(';')+';}',
            ].join('');

            var el = document.createElement('style');
            if (el.styleSheet){
                el.styleSheet.cssText = css;
            } else {
                el.appendChild(document.createTextNode(css));
            }

            document.getElementsByTagName('head')[0].appendChild(el);

            // apply css class

            this.options.className = this.options.className+' leaflet-pulsing-icon '+uniqueClassName+ (this.options.animate?'':' leaflet-pulsing-icon-stop');

            // initialize icon

            L.DivIcon.prototype.initialize.call(this, options);

            this.animate = function(active){
                var en = document.getElementsByClassName(this.uniqueClassName)[0];
                if(active){
                    en.classList.remove('leaflet-pulsing-icon-stop');
                }else{
                    en.classList.add('leaflet-pulsing-icon-stop');
                }
                this.options.animate=active;
            }
            this.toggle = function(active){ this.animate(!this.options.animate);}
            this.setFillColor = function(color){
                var en = document.getElementsByClassName(this.uniqueClassName)[0];
                en.style.backgroundColor = color;
                this.options.fillColor = color;
            }
        }
    });

    L.icon.pulse = function (options) {
        return new L.Icon.Pulse(options);
    };


    L.Marker.Pulse = L.Marker.extend({
        initialize: function (latlng,options) {
            options.icon = L.icon.pulse(options);
            L.Marker.prototype.initialize.call(this, latlng, options);
        }
    });

    L.marker.pulse = function (latlng,options) {
        return new L.Marker.Pulse(latlng,options);
    };

})(window);