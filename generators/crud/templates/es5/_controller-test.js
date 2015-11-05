'use strict';

define([
  'backbone',
  'marionette',
  'helpers/handlebars<%= delimiter %>helpers',
  '<%= controllerPath %>',
], function (Backbone, Marionette, helpers, <%= controllerName %>) {
  var dummyData = [{
    'text': 'This is just a sample text',
    'author': 'Sample',
    'created': 1439545097459,
    'isPublished': true
  }];

  helpers.initialize();

  describe('<%= controllerName %>', function () {
    beforeEach(function () {<% if (testFramework === 'mocha') { %>
      this.stub = sinon.stub(Backbone.Collection.prototype, 'fetch')
        .yieldsTo('success', dummyData);<% } %>
      this.region = new Marionette.Region({el: 'body'});
      this.controller = new <%= controllerName %>({region: this.region});
      this.controller.collection = new Backbone.Collection(dummyData);
      this.cid = this.controller.collection.models[0].cid;

      this.spy = <%=assert.createrealspy%>(Backbone.history, 'navigate');
    });
<% if (testFramework === 'mocha') { %>  afterEach(function() {
      this.spy.restore();
      this.stub.restore();
    });<% } %>
    it('list method should render view', function () {
      this.controller.list();
      expect(this.region.$el.find('#item-view-container')).<%=assert.tobeok%>;
    });

    it('list method should react to create click', function () {
      this.controller.list();
      this.region.$el.find('button.create').trigger('click');
      expect(this.spy.<%=assert.callcount%>).<%=assert.toequal%>(1);
    });

    it('list method should react to edit click', function () {
      this.controller.list();
      this.region.$el.find('button.edit').trigger('click');
      expect(this.spy.<%=assert.callcount%>).<%=assert.toequal%>(1);
    });

    it('create method should render view', function() {
      this.controller.create();
      expect(this.region.$el.find('form')).<%=assert.tobeok%>;
    });

    it('create method should react to create click', function() {
      this.controller.create();
      this.region.$el.find('button.create').trigger('click');
      expect(this.spy.<%=assert.callcount%>).<%=assert.toequal%>(1);
    });

    it('detail method should render view', function() {
      this.controller.detail();
      expect(this.region.$el.find('form')).<%=assert.tobeok%>;
    });

    it('detail method should react to save click', function() {
      this.controller.detail(this.cid);

      this.region.$el.find('button.save').trigger('click');
      expect(this.spy.<%=assert.callcount%>).<%=assert.toequal%>(1);
    });

    it('detail method should react to remove click', function() {
      this.controller.detail(this.cid);

      this.region.$el.find('button.remove').trigger('click');
      expect(this.spy.<%=assert.callcount%>).<%=assert.toequal%>(1);
    });

  });
});
