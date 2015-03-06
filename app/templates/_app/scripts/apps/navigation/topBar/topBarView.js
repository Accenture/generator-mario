/*global define*/

define(['marionette', 'templates'], function (Marionette, JST) {
    'use strict';

    var TopBarView = Marionette.ItemView.extend({
        tagName: 'ul',
        className: 'right',
        template: JST['app/scripts/apps/navigation/topBar/topBarTemp.hbs'],
        onDomRefresh: function () {
            $(document).foundation();
        }
    });
    return TopBarView;
});
