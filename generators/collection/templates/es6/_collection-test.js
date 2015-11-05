'use strict';

import <%= collectionNameCamelCase %> from '<%= collectionPath %>';

describe('<%= collectionNameCamelCase %>', () => {
  it('has default values', () => {
    var collection = new <%= collectionNameCamelCase %>();
    expect(collection).<%=assert.tobeok%>;
  });
});
