import Backbone from 'backbone';
import Marionette from 'marionette';
import Radio from 'radio';
import <%= modelName %> from '<%= modelPath %>';
import <%= collectionName %> from '<%= collectionPath %>';
import <%= detailViewName %> from '<%= detailViewPath %>';
import <%= createViewName %> from '<%= createViewPath %>';
import <%= compositeViewName %> from '<%= compositeViewPath %>';

let msg = {};
msg.CREATE_ITEM = '<%= featureName %>:createItem';
msg.REMOVE_ITEM = '<%= featureName %>:removeItem';
msg.SAVE = '<%= featureName %>:save';
msg.SHOW_DETAIL = 'childview:<%= featureName %>:showDetail';
msg.NAVIGATE_NEW = '<%= featureName %>:navigateNew';
msg.CRUD_UPDATE = 'crud-update';

let feature = {
  name: '<%= featureName %>',
  baseRoute: '#<%= featureName %>'
};

export default Marionette.Object.extend({
  initialize(options) {
    let that = this;
    this.channel = Radio.channel('sidebar');

    this.collection = new <%= collectionName %>();
    this.collection.fetch({
      success() {
        that.channel.trigger(msg.CRUD_UPDATE, {
          name: feature.name, count: that.collection.length, baseRoute: feature.baseRoute
        });
      }
    });

    this.region = options.region;
  },
  list() {
    let view = new <%= compositeViewName %>({collection: this.collection});
    view.listenTo(view, msg.NAVIGATE_NEW, () => {
      Backbone.history.navigate('#<%= featureName %>/new', {trigger: true});
    });
    view.listenTo(view, msg.SHOW_DETAIL, args => {
      Backbone.history.navigate('#<%= featureName %>/' + args.model.cid, {trigger: true});
    });
    this.region.show(view);
  },
  create() {
    let view = new <%= createViewName %>({model: new <%= modelName %>()});
    view.listenTo(view, msg.CREATE_ITEM, model => {
      this.collection.add(model);
      //TODO: model.save();
      this.channel.trigger(msg.CRUD_UPDATE, {name: feature.name, count: that.collection.length, baseRoute: feature.baseRoute});
      Backbone.history.navigate('#<%= featureName %>', {trigger: true});
    });
    this.region.show(view);
  },
  detail(id) {
    let view = new <%= detailViewName %>({model: this.collection.get(id)});
    view.listenTo(view, msg.REMOVE_ITEM, args => {
      this.collection.remove(args.model.cid);
      this.channel.trigger(msg.CRUD_UPDATE, {name: feature.name, count: this.collection.length, baseRoute: feature.baseRoute});
      Backbone.history.navigate('#<%= featureName %>', {trigger: true});
    });
    view.listenTo(view, msg.SAVE, (/*args*/) => {
      //TODO: model save e.g. args.model.save();
      Backbone.history.navigate('#<%= featureName %>', {trigger: true});
    });
    this.region.show(view);
  }
});
