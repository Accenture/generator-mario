import <%= modelName %> from '<%= modelPath %>';

describe('<%= modelName %>', () => {
  it('has default values', () => {
    let model = new <%= modelName %>();
    expect(model).<%=assert.tobeok%>;
  });
});
