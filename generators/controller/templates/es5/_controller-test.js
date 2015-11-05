'use strict';

define([
  'marionette',
  '<%= controllerPath %>'
], function (Marionette, <%= controllerClassName %>) {

  describe('<%= controllerClassName %>', function() {
    beforeEach(function() {
      this.region = new Marionette.Region({el: 'body'});
      this.controller = new <%= controllerClassName %>({region: this.region});
    });

    it('region should be ok', function() {
      expect(this.region).<%=assert.toequal%>(this.controller.region);
    });

    <%=assert.skipit%>('default method should render view', function() {
      throw new Error('default method not implemented yet');
    });
  });
});
