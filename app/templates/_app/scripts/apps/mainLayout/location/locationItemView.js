/*global define*/

'use strict';
define(['marionette', 'templates'], function (Marionette, JST) {
    return Marionette.ItemView.extend({
        template: JST['app/scripts/apps/mainLayout/location/locationItemViewTemp.hbs'],
        tagName: 'li'
    });
});