/*global define*/

'use strict';
define([
    'app',
    'marionette',
    'templates',
    './technologies-item-view'
], function (App, Marionette, JST, TechnologiesItemView) {
    return  Marionette.CompositeView.extend({
        tagName: 'div',
        template: JST['app/scripts/apps/main-layout/technologies/technologies-composite-view-template.hbs'],
        childView: TechnologiesItemView,
        childViewContainer: '#technologiesItemView'
    });
});
