'use strict';

define([
  'jquery',
  'underscore',
  'backbone',
  'helpers/handlebars_helpers',
  '<%= itemViewPath %>'
], function ($, _, Backbone, helpers, <%= itemViewName %>) {
  helpers.initialize();

  describe('<%= itemViewName %>', function () {
    beforeEach(function () {
      this.model = new Backbone.Model({
        text: 'Sample'
      });
      this.view = new <%= itemViewName %>({model: this.model});
      this.view.render();

      this.eventSpy = <%=assert.createfakespy%>();
      this.view.listenTo(this.view, '<%= featureName %>:showDetail', this.eventSpy);
    });

    it('render() should return the view object', function () {
      expect(this.view.render()).<%=assert.toequal%>(this.view);
    });

    it('name should equal Sample', function () {
      expect(this.view.render().$('.text').text()).<%=assert.toequal%>('Sample');
    });

    it('click event should trigger spy', function() {
      this.view.$el.find('button.edit').trigger('click');
      expect(this.eventSpy.<%=assert.callcount%>).<%=assert.toequal%>(1);
    });
  });
});
