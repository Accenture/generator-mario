/*global define*/

'use strict';
define(['marionette', 'templates'], function (Marionette, JST) {
    return Marionette.ItemView.extend({
        template: JST['app/scripts/apps/main-layout/technologies/technologies-item-view-template.hbs'],<% if (foundation) { %>
        tagName: 'li'<% } %><% if (bootstrap) { %>
        tagName: 'div',
        className:'col-xs-6 col-sm-3'<% } %>
    });
});
