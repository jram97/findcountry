jQuery(document).on('ready', function ($) {
    const searchParams = new URLSearchParams(window.location.search)

    /*if(searchParams.has('country')){
        fetch('https://restcountries.eu/rest/v2/alpha/' + searchParams.get('country'))
        .then(response => response.json())
        .then(data => {
            const getTimeZone = ct.getCountry(data.alpha2Code);

            fetch('https://api.openweathermap.org/data/2.5/weather?q=' + data.capital + '&appid=' + 'f7dbdea5232a9f2b2ba006b794af0f1d&units=metric')
            .then(responseWeather => responseWeather.json())
            .then(weather => {
                $('#local-weather').html(weather.main.temp + "°C - " + weather.weather[0].main.toUpperCase() + " - " + weather.main.temp_max + "/" + weather.main.temp_min + "°C");
            });
            setInterval(function () {
                $('#local-time').html(moment().tz(getTimeZone.timezones[0]).format('hh:mm:ss A'));
            }, 100);
        });
    }*/

}(jQuery));
