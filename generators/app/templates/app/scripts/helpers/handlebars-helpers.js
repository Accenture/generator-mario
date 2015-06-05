'use strict';
define(['handlebars'], function (Handlebars) {

    Handlebars.registerHelper('getOriginLocationName', function (originLocation) {
        return (!originLocation || originLocation === '...') ? 'your current location' : originLocation;
    });

    Handlebars.registerHelper('cutDecimal', function (value) {
        return value.toFixed();
    });

    Handlebars.registerHelper('getUnit', function () {
        return (localStorage.getItem('units') === 'metric') ? 'C' : 'F';
    });

    Handlebars.registerHelper('getDay', function (time) {
        var dayName, dayNames;

        dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayName = dayNames[new Date(time * 1000).getDay()];

        return dayName;
    });

    Handlebars.registerHelper('getDate', function (time) {
        var date = new Date(time * 1000);

        return date.toLocaleDateString().substring(0, 5);
    });

    Handlebars.registerHelper('unitsRadioButtons', function () {
        var html, units, checked;
        units = ['imperial', 'metric'];
        html = '';

        for (var i = 0; i < units.length; i++) {
            checked = this.units === units[i] ? 'checked' : '';
            html += '<div><input type="radio" name="units" value="' + units[i] + '" id="units-' + units[i] + '" ' + checked + '>' +
                '<label for="units-' + units[i] + '">' + units[i].charAt(0).toUpperCase() +
                units[i].substring(1) + '</label></div>';
        }

        return new Handlebars.SafeString(html);
    });

    Handlebars.registerHelper('populateCurrencySelect', function () {
        var html, selected;
        var currencies = ['USD', 'EUR', 'GBP', 'RUB'];
        html = '';

        for (var i = 0; i < currencies.length; i++) {
            selected = this.currency === currencies[i] ? 'selected' : '';
            html += '<option value="' + currencies[i] + '"' + selected + '>' + currencies[i] + '</option>';
        }

        return new Handlebars.SafeString(html);
    });

    Handlebars.registerHelper('commentSender', function (userID) {
        if (userID === localStorage.getItem('userID')) {
            return 'myMessage';
        } else {
            return 'otherMessage';
        }
    });

    Handlebars.registerHelper('chatGetDate', function (time) {
        var date = new Date(time);

        return date.toLocaleDateString();
    });

    Handlebars.registerHelper('chatGetTime', function (time) {
        var hours = new Date(time);

        return hours.toLocaleTimeString();
    });

    Handlebars.registerHelper('formatDate', function (date) {
        if (date !== undefined) {
            var formatDate = date.substring(0, 10);
            return formatDate;
        }
    });

});
