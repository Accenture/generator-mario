'use strict';

define([
  'backbone',
  'helpers/handlebars<%= delimiter %>helpers',
  '<%= compositeViewPath %>'
], function (Backbone, helpers, <%= compositeViewName %>) {
  helpers.initialize();

  describe('<%= compositeViewName %>', function () {
    beforeEach(function () {
      this.collection = new Backbone.Collection([
        {text: 'This is just a sample text', author: 'Sample', created: Date.now(), isPublished: true},
        {text: 'This is just an example text', author: 'Example', created: Date.now(), isPublished: false},
      ]);
      this.view = new <%= compositeViewName %>({collection: this.collection});
      this.view.render();

      this.eventSpy = <%=assert.createfakespy%>();
      this.view.listenTo(this.view, '<%= featureName %>:navigateNew', this.eventSpy);
    });

    it('is ok', function () {
      expect(this.collection).<%=assert.tobeok%>;
      expect(this.view).<%=assert.tobeok%>;
    });

    it('contains 2 values', function() {
      expect(this.collection.length).<%=assert.toequal%>(2);
      expect(this.view.$el.find('.list-group > li').length).<%=assert.toequal%>(2);
    });

    it('click event should trigger spy', function() {
      this.view.$el.find('button.create').trigger('click');
      expect(this.eventSpy.<%=assert.callcount%>).<%=assert.toequal%>(1);
    });
  });
});
