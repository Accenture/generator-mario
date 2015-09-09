'use strict';
define([
  'jquery',
  'underscore',
  'backbone',
  '<%= itemViewPath %>',
], function ($, _, Backbone, <%= itemViewName %>) {

  describe('<%= itemViewName %>', function () {
    beforeEach(function () {
      this.model = new Backbone.Model({
        text: 'Sample'
      });
      this.view = new <%= itemViewName %>({model: this.model});
      this.view.render();

      this.eventSpy = sinon.spy();
      this.view.listenTo(this.view, '<%= featureName %>:showDetail', this.eventSpy);
    });

    it('render() should return the view object', function () {
      expect(this.view.render()).to.equal(this.view);
    });

    it('name should equal Sample', function () {
      expect(this.view.render().$('.text').text()).to.equal('Sample');
    });

    it('click event should trigger spy', function() {
      this.view.$el.find('button.edit').trigger('click');
      expect(this.eventSpy.callCount).to.be.equal(1);
    });
  });
});
