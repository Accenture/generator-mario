import HomeModel from 'apps/home/home<%= delimiter %>model';

describe('HomeModel', () => {
  it('has default values', () => {
    let model = new HomeModel();
    expect(model).<%=assert.tobeok%>;
  });
});
