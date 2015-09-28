'use strict';

define([
  'jquery',
  'underscore',
  'backbone',
  'helpers/handlebars-helpers',
  '<%= detailItemViewPath %>'
], function ($, _, Backbone, helpers, <%= detailItemViewName %>) {
  helpers.initialize();

  describe('<%= detailItemViewName %>', function () {
    beforeEach(function () {
      this.date = Date.now();

      this.model = new Backbone.Model({
        text: 'Sample',
        author: 'This Guy',
        created: this.date,
        isPublished: false
      });

      this.view = new <%= detailItemViewName %>({model: this.model});
      this.view.render();

      this.eventSpy = sinon.spy();
      this.triggerSpy = sinon.spy();
      this.view.listenTo(this.view, '<%= featureName %>:removeItem', this.triggerSpy);
      this.view.listenTo(this.view, '<%= featureName %>:save', this.eventSpy);
    });

    it('render() should return the view object', function () {
      expect(this.view.render()).to.equal(this.view);
    });

    it('name should equal Sample', function () {
      expect(this.view.render().$('textarea#text').text()).to.equal('Sample');
    });

    it('author should equal This Guy', function () {
      expect(this.view.render().$('#author').val()).to.equal('This Guy');
    });

    it('remove click event should trigger spy', function() {
      this.view.$el.find('button.remove').trigger('click');
      expect(this.triggerSpy.callCount).to.be.equal(1);
    });

    it('save click event should trigger spy', function() {
      this.view.$el.find('button.save').trigger('click');
      expect(this.eventSpy.callCount).to.be.equal(1);
    });
  });
});
