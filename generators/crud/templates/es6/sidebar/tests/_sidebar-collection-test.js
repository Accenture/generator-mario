import SidebarCollection from 'apps/sidebar/sidebar<%= delimiter %>collection';

describe('SidebarCollection', () => {
  it('has default values', () => {
    var collection = new SidebarCollection();
    expect(collection).<%=assert.tobeok%>;
  });
});
