import SidebarModel from './sidebar-model';

describe('SidebarModel', function() {
  it('has default values', () => {
    // Create empty note model.
    var model = new SidebarModel();
    expect(model).to.be.ok;
  });
});
