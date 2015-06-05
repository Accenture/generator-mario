/*global define*/

define(['marionette', 'templates'], function (Marionette, JST) {
    'use strict';

    var TopBarView = Marionette.ItemView.extend({
        tagName: 'ul',<% if (foundation) { %>
        className: 'right',<% } %><% if (bootstrap) { %>
        className: 'nav navbar-nav',<% } %>
        template: JST['app/scripts/apps/navigation/top-bar/top-bar-template.hbs']<% if (foundation) { %>,
        onDomRefresh: function () {
            $(document).foundation();
        }<% } %>
    });
    return TopBarView;
});
