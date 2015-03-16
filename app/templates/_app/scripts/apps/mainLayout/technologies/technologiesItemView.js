/*global define*/

'use strict';
define(['marionette', 'templates'], function (Marionette, JST) {
    return Marionette.ItemView.extend({
        template: JST['app/scripts/apps/mainLayout/technologies/technologiesItemViewTemp.hbs'],
        tagName: 'li'
    });
});
