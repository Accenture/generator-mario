'use strict';
define([
  'backbone',
  '<%= compositeViewPath %>'
], function (Backbone, <%= compositeViewName %>) {
  describe('<%= compositeViewName %>', function () {
    beforeEach(function () {
      this.collection = new Backbone.Collection([
        {text: 'This is just a sample text', author: 'Sample', created: Date.now(), isPublished: true},
        {text: 'This is just an example text', author: 'Example', created: Date.now(), isPublished: false},
      ]);
      this.view = new <%= compositeViewName %>({collection: this.collection});
      this.view.render();

      this.eventSpy = sinon.spy();
      this.view.listenTo(this.view, '<%= featureName %>:navigateNew', this.eventSpy);
    });

    it('is ok', function () {
      expect(this.collection).to.be.ok;
      expect(this.view).to.be.ok;
    });

    it('contains 2 values', function() {
      expect(this.collection).to.have.length(2);
      expect(this.view.$el.find('.list-group > li')).to.have.length(2);
    });

    it('click event should trigger spy', function() {
      this.view.$el.find('button.create').trigger('click');
      expect(this.eventSpy.callCount).to.be.equal(1);
    });
  });
});
