'use strict';

define([
  'jquery',
  'underscore',
  'backbone',
  'helpers/handlebars<%= delimiter %>helpers',
  '<%= createItemViewPath %>'
], function ($, _, Backbone, helpers, <%= createItemViewName %>) {

  helpers.initialize();

  describe('<%= createItemViewName %>', function () {
    beforeEach(function () {
      this.date = Date.now();

      this.model = new Backbone.Model({});

      this.view = new <%= createItemViewName %>({model: this.model});
      this.view.render();

      this.eventSpy = <%=assert.createfakespy%>();
      this.view.listenTo(this.view, '<%= featureName %>:createItem', this.eventSpy);
    });

    it('render() should return the view object', function () {
      expect(this.view.render()).<%=assert.toequal%>(this.view);
    });

    it('text are should render', function () {
      expect(this.view.render().$('textarea#text')).not.<%=assert.toequal%>(null);
    });

    it('author should be of type text', function () {
      expect(this.view.render().$('#author')).not.<%=assert.toequal%>(null);
      expect(this.view.render().$('#author').attr('type')).<%=assert.toequal%>('text');
    });

    it('created should be of type text', function () {
      expect(this.view.render().$('#created')).not.<%=assert.toequal%>(null);
      expect(this.view.render().$('#created').attr('type')).<%=assert.toequal%>('text');
    });

    it('click event should trigger spy', function() {
      this.view.$el.find('button.create').trigger('click');
      expect(this.eventSpy.<%=assert.callcount%>).<%=assert.toequal%>(1);
    });

  });
});
