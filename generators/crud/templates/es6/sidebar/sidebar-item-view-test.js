import SidebarItemView from './sidebar-item-view';

describe('SidebarItemView', function() {
  beforeEach(() => {
      this.model = new Backbone.Model({
        name: 'Sample',
        count: 20
      });
      this.view = new SidebarItemView({model: this.model});
      this.view.render();
    });

    it('render() should return the view object', () => {
      expect(this.view.render()).to.equal(this.view);
    });
    it('name should equal Sample', () => {
      expect(this.view.render().$('.text-capitalize').text()).to.equal('Sample');
    });
    it('count should equal 20', () => {
      expect(this.view.render().$('.badge.pull-right').text()).to.equal('20');
    });
});
