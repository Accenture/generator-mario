import {Region} from 'marionette';
import <%= controllerClassName %> from '<%= controllerPath %>';

describe('<%= controllerClassName %>', () => {
  beforeEach(() => {
    this.region = new Region({el: 'body'});
    this.controller = new <%= controllerClassName %>({region: this.region});
  });

  it('region should be ok', () => {
    expect(this.region).to.be.equal(this.controller.region);
  });

  it.skip('default method should render view', () => {
    throw new Error('default method not implemented yet');
  });
});
