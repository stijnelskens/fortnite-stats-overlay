const FileSaver = require('file-saver');
const axios = require('axios').default;
const submitButton = document.getElementById('js-submit');

submitButton.addEventListener('click', function(){
    const input = document.getElementById('textInput');
    const inputValue = input.value;
    getStats(inputValue);
});

function getStats(inputValue) {
    axios.get(`https://fortnite-api.com/v1/stats/br/v2/${inputValue}`)
    .then(function (response) {
        // handle success
        const wins = document.getElementById('wins');
        const kills = document.getElementById('kills');
        const kd = document.getElementById('kd');

        let forniteOverlay = `
                                <!DOCTYPE html>
                                <html lang="en">
                                <head>
                                    <meta charset="UTF-8">
                                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                    <title>Fortnite Overlay by Streamergoods.com</title>
                                    <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet">
                                    <style>
                                        html {
                                            width: 600px;
                                            height: 80px;
                                        }
                                    </style>
                                </head>
                                <body>

                                    <div class="relative max-w-xl flex flex-wrap bg-black bg-opacity-25 pt-2 pb-1 px-3 uppercase" style="clip-path: polygon(3% 0, 100% 2%, 97% 99%, 0% 99%); text-shadow: 2px 2px 1px rgba(0,0,0,0.4);">
                                        <div id="error-message" class="w-full bg-red-500 text-white p-4 mb-2" style="display: none;">Something went wrong, try to refresh</div>
                                        <div id="sg-message" class="absolute z-10 top-0 right-0 bg-purple-700 text-white p-2 mb-2 text-xs font-bold uppercase" style="display: none;">streamergoods.com</div>
                                        <div class="w-1/3 px-1">
                                            <div class="bg-yellow-700 text-white p-2 text-center shadow-xl" style="clip-path: polygon(5% 0, 100% 0%, 96% 100%, 0% 100%);">
                                                <strong>Wins</strong>
                                                <div class="-mt-1"><span class="wins" id="wins"></span></div>
                                            </div>
                                        </div>
                                        <div class="w-1/3 px-1">
                                            <div class="bg-yellow-700 text-white p-2 text-center" style="clip-path: polygon(5% 0, 100% 0%, 96% 100%, 0% 100%);">
                                                <strong>Kills</strong>
                                                <div class="-mt-1"><span class="kills" id="kills"></span></div>
                                            </div>
                                        </div>
                                        <div class="w-1/3 px-1">
                                            <div class="bg-yellow-700 text-white p-2 text-center" style="clip-path: polygon(5% 0, 100% 0%, 96% 100%, 0% 100%);">
                                                <strong>KD</strong>
                                                <div class="-mt-1"><span class="kd" id="kd"></span></div>
                                            </div>
                                        </div>
                                        <div class="w-full mt-1 text-center">
                                            <span class="text-white font-bold uppercase text-sm">streamergoods.com</span>
                                        </div>
                                    </div>

                                    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
                                    <script>
                                        getStats();

                                        setInterval(function() {

                                            getStats();

                                        }, 28000);

                                        function getStats(inputValue) {
                                            axios.get('https://fortnite-api.com/v1/stats/br/v2/${inputValue}')
                                            .then(function (response) {

                                                var wins = document.getElementById('wins');
                                                var kills = document.getElementById('kills');
                                                var kd = document.getElementById('kd');

                                                wins.innerHTML = response.data.data.stats.all.overall.wins;
                                                kills.innerHTML = response.data.data.stats.all.overall.kills;
                                                kd.innerHTML = Math.round(response.data.data.stats.all.overall.kd * 100) / 100;

                                                document.getElementById('error-message').style.display = 'none';
                                            })
                                            .catch(function (error) {
                                                document.getElementById('error-message').style.display = 'block';
                                            })
                                            .then(function () {
                                                setTimeout(function() {
                                                    var sgMessage = document.getElementById('sg-message');
                                                    fadeIn(sgMessage);
                                                    function fadeIn(el, display) {
                                                        el.style.opacity = 0;
                                                        el.style.display = display || "block";
                                                        (function fade() {
                                                            var val = parseFloat(el.style.opacity);
                                                            if (!((val += .05) > 1)) {
                                                                el.style.opacity = val;
                                                                requestAnimationFrame(fade);
                                                            }
                                                        })();
                                                    };
                                                }, 3000);
                                                setTimeout(function() {
                                                    var sgMessage = document.getElementById('sg-message');
                                                    fadeOut(sgMessage);
                                                    function fadeOut(e) {
                                                        e.style.opacity = 1;
                                                        (function fade() {
                                                            if ((e.style.opacity -= .05) < 0) {
                                                                e.style.display = "none";
                                                            } else {
                                                                requestAnimationFrame(fade);
                                                            }
                                                        })();
                                                    };
                                                }, 6500);
                                            });
                                        } 
                                    </script>
                                </body>
                                </html>`;

        wins.innerHTML = response.data.data.stats.all.overall.wins;
        kills.innerHTML = response.data.data.stats.all.overall.kills;
        kd.innerHTML = Math.round(response.data.data.stats.all.overall.kd * 100) / 100;

        const blob = new Blob([forniteOverlay], {type: 'text/html'});
        FileSaver.saveAs(blob, 'fornite-overlay.html');
    })
    .catch(function (error) {
        document.getElementById('error-message').style.display = 'block';
    })
    .then(function () {
        setTimeout(function() {
            const sgMessage = document.getElementById('sg-message');
            fadeIn(sgMessage);
            function fadeIn(el, display) {
                el.style.opacity = 0;
                el.style.display = display || "block";
                (function fade() {
                    let val = parseFloat(el.style.opacity);
                    if (!((val += .05) > 1)) {
                        el.style.opacity = val;
                        requestAnimationFrame(fade);
                    }
                })();
            };
        }, 3000);
        setTimeout(function() {
            const sgMessage = document.getElementById('sg-message');
            fadeOut(sgMessage);
            function fadeOut(e) {
                e.style.opacity = 1;
                (function fade() {
                    if ((e.style.opacity -= .05) < 0) {
                        e.style.display = "none";
                    } else {
                        requestAnimationFrame(fade);
                    }
                })();
            };
        }, 6500);
  });
}