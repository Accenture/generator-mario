'use strict';

define([
  'jquery',
  'underscore',
  'backbone',
  '<%= createItemViewPath %>'
], function ($, _, Backbone, <%= createItemViewName %>) {

  describe('<%= createItemViewName %>', function () {
    beforeEach(function () {
      this.date = Date.now();

      this.model = new Backbone.Model({});

      this.view = new <%= createItemViewName %>({model: this.model});
      this.view.render();

      this.eventSpy = sinon.spy();
      this.view.listenTo(this.view, '<%= featureName %>:createItem', this.eventSpy);
    });

    it('render() should return the view object', function () {
      expect(this.view.render()).to.equal(this.view);
    });

    it('text are should render', function () {
      expect(this.view.render().$('textarea#text')).to.not.equal(null);
    });

    it('author should be of type text', function () {
      expect(this.view.render().$('#author')).to.not.equal(null);
      expect(this.view.render().$('#author').attr('type')).to.equal('text');
    });

    it('created should be of type text', function () {
      expect(this.view.render().$('#created')).to.not.equal(null);
      expect(this.view.render().$('#created').attr('type')).to.equal('text');
    });

    it('click event should trigger spy', function() {
      this.view.$el.find('button.create').trigger('click');
      expect(this.eventSpy.callCount).to.be.equal(1);
    });

  });
});
