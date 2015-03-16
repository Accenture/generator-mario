/*global define*/

'use strict';
define([
    'app',
    'marionette',
    'templates',
    './technologiesItemView'
], function (App, Marionette, JST, TechnologiesItemView) {
    return  Marionette.CompositeView.extend({
        tagName: 'div',
        template: JST['app/scripts/apps/mainLayout/technologies/technologiesCompositeViewTemp.hbs'],
        childView: TechnologiesItemView,
        childViewContainer: '#technologiesItemView'
    });
});
