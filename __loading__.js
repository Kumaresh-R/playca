pc.script.createLoadingScreen(function (app) {
    var showSplash = function () {
        // splash wrapper
        var wrapper = document.createElement('div');
        wrapper.id = 'application-splash-wrapper';
        document.body.appendChild(wrapper);

        // splash
        var splash = document.createElement('div');
        splash.id = 'application-splash';
        wrapper.appendChild(splash);
        splash.style.display = 'none';

        var logo = document.createElement('img');
        logo.src = 'https://i.ibb.co/grmCyr8/loadingbar-red.png';//imageloading1
        splash.appendChild(logo);
        logo.onload = function () {
            splash.style.display = 'block';
        };

        var container = document.createElement('div');
        container.id = 'progress-bar-container';
        container.style.display = 'none';
        splash.appendChild(container);

        var bar = document.createElement('div');
        bar.id = 'progress-bar';
        bar.style.display = 'none';
        container.appendChild(bar);

    };
    var RadialProgress = function(size, barSize, barColor, backgroundColor, textColor, zIndex) { // jshint ignore:line
        this.radialProgress = document.createElement('div');
        this.radialProgress.id = "splash2";
        this.style = document.createElement('style');
        this.progress = 0;
        var requestAnimationFrame = window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame;

        barSize = (barSize % 2 === 1) ? (barSize + 1) : barSize;
        var innerSize = size - barSize;
        var innerMargin = barSize / 2;

        this.radialProgress.className = 'radial-progress';
        this.radialProgress.innerHTML = '<div class="inner-circle">' +
            '<div class="progress">0%<' + '/div>' +
            '</div>' +
            '<div class="outer-circle">' +
            '<div class="mask full">' +
            '<div class="fill"></div>' +
            '</div>' +
            '<div class="mask">' +
            '<div class="fill"></div>' +
            '<div class="fill fix"></div>' +
            '</div>' +
            '</div>';

        this.style.type = 'text/css';
        this.style.innerHTML = '.radial-progress {' +
            'width:' + size + 'px;' +
            'height: ' + size + 'px;' +
            'position: absolute;' +
            'margin: auto;' +
            'top: 0; right: 0; bottom: 0; left: 0;' +
            'z-index: ' + zIndex + ';' +
            'background-color: #DDD;' +
            'border-radius: 50%;' +
            'box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);' +
            '}' +
            '.radial-progress .inner-circle {' +
            'width: ' + innerSize + 'px;' +
            'height: ' + innerSize + 'px;' +
            'position: absolute;' +
            'margin-top: ' + innerMargin + 'px;' +
            'margin-left: ' + innerMargin + 'px;' +
            'background-color: ' + backgroundColor + ';' +
            'border-radius: 50%;' +
            'z-index: 10;' +
            '}' +
            '.radial-progress .inner-circle .progress {' +
            'height: 1em;' +
            'position: absolute;' +
            'margin: auto;' +
            'top: 0; right: 0; bottom: 0; left: 0;' +
            'text-align: center;' +
            'color: ' + textColor + ';' +
            '}' +
            '.radial-progress .outer-circle .mask,' +
            '.radial-progress .outer-circle .fill {' +
            'width: ' + size + 'px;' +
            'height: ' + size + 'px;' +
            'position: absolute;' +
            'border-radius: 50%;' +
            '-webkit-backface-visibility: hidden;' +
            '}' +
            '.radial-progress .outer-circle .mask {' +
            'clip: rect(0px, ' + size + 'px, ' + size + 'px, ' + size / 2 + 'px);' +
            '}' +
            '.radial-progress .outer-circle .mask .fill {' +
            'clip: rect(0px, ' + size / 2 + 'px, ' + size + 'px, 0px);' +
            'background-color: ' + barColor + ';' +
            '}';

        document.getElementsByTagName('head')[0].appendChild(this.style);
        document.body.appendChild(this.radialProgress);

        this.remove = function() {
            var self = this;
            var scale = 1;
            var deltaScale = 0.1 / 10;

            function step() {
            scale += deltaScale;
            scale = (scale < 0) ? 0 : scale;
            self.radialProgress.style.transform = 'scale(' + scale + ')';

            if (scale > 1.1) {
                deltaScale = -1.1 / 8;
            }

            if (scale > 0) {
                requestAnimationFrame(step);
            } else {
                document.getElementsByTagName('head')[0].removeChild(self.style);
                if(self.radialProgress){
                   // document.body.removeChild(self.radialProgress);
                }
                
            }
            }

            requestAnimationFrame(step);
        };

        this.setProgress4 = function(progress, duration) {
            progress = (progress > 100) ? 100 : progress;
            var self = this;
            var $maskFull = this.radialProgress.getElementsByClassName('mask full')[0];
            var $fill = this.radialProgress.getElementsByClassName('fill');
            var $fillFix = this.radialProgress.getElementsByClassName('fill fix')[0];
            var $progress = this.radialProgress.getElementsByClassName('progress')[0];
            var deltaProgress = (progress - this.progress) / (duration * 60);

            function step() {
            self.progress += deltaProgress;
            self.progress = (self.progress > progress) ? progress : self.progress;
            var rotate = self.progress * 1.8;
            $maskFull.style.transform = 'rotate(' + rotate + 'deg)';
            $progress.innerHTML = self.progress.toFixed() + '%';

            for (var i = 0; i < $fill.length; ++i) {
                $fill[i].style.transform = 'rotate(' + rotate + 'deg)';
            }

            $fillFix.style.transform = 'rotate(' + 2 * rotate + 'deg)';

            if (self.progress < progress) {
                requestAnimationFrame(step);
            }

            if (self.progress === 100) {
                setTimeout(function() {
                self.remove();
                }, 1000);
            }
            }

            requestAnimationFrame(step);
        };
        };

    var hideSplash = function () {
        var splash = document.getElementById('application-splash-wrapper');
        splash.parentElement.removeChild(splash);
        var splash2 = document.getElementById('splash2');
        if(splash2.parentElement){
            splash2.parentElement.removeChild(splash2);
        }
        
    };
    var progress = new RadialProgress(150,3, '#0095DD', '#FFF', '#000', 10);
    var setProgress2 = function (value) {
        var bar = document.getElementById('progress-bar');
        
        if(bar) {
            value = Math.min(1, Math.max(0, value));
            bar.style.width = value * 100 + '%';
            
            progress.setProgress4(parseInt(value*100), 0.5);
        }
    };

        

        function createProgress() {
        var progress = new RadialProgress(150,8, '#0095DD', '#FFF', '#000', 10);

        // setTimeout(function() {
        //     progress.setProgress(50, 0.5);
        // }, 1000);

        // setTimeout(function() {
        //     progress.setProgress(60, 0.5);
        // }, 3000);

        // setTimeout(function() {
        //     progress.setProgress(80, 0.5);
        // }, 5000);

        // setTimeout(function() {
        //     progress.setProgress(100, 0.5);
        // }, 7000);
        }

        //createProgress();

    var createCss = function () {
        var css = [
            'body {',
            '    background-color: #fff;',
            '}',
            '',
            '#application-splash-wrapper {',
            '    position: absolute;',
            '    top: 0;',
            '    left: 0;',
            '    height: 100%;',
            '    width: 100%;',
            '    background-color: #fff;',
            '}',
            '',
            '#application-splash {',
            '    position: absolute;',
            '    top: calc(34.5% - 28px);',// move the image
            '    width: 264px;',
            '    left: calc(52% - 122px);',
            '}',
            '',
             '#application-splash img {',
            '    width: 80%;',
            '}',
            '',
            '#progress-bar-container {',
            '    margin: 20px auto 0 auto;',
            '    height: 2px;',
            '    width: 100%;',
            '    background-color: #1d292c;',
            '}',
            '',
            '#progress-bar {',
            '    width: 0%;',
            '    height: 100%;',
            '    background-color: #f60;',
            '}',
            '',
            '@media (max-width: 480px) {',
            '    #application-splash {',
            '        width: 170px;',
            '        left: calc(52% - 85px);',
            '    }',
            '}'
        ].join('\n');

        var style = document.createElement('style');
        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }

        document.head.appendChild(style);
    };

    createCss();
    showSplash();

    app.on('preload:end', function () {
        app.off('preload:progress');
    });
    app.on('preload:progress', setProgress2);
    app.on('start', hideSplash);
});