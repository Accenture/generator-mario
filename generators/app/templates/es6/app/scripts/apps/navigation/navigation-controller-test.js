import {Region} from 'marionette';
import NavigationController from './navigation-controller';

describe('NavigationController', function () {
  beforeEach(function () {
    this.region = new Region({el: 'body'});
    this.controller = new NavigationController({region: this.region});
  });

  it('should render view', function () {
    expect(this.region.$el.find('div.navbar')).to.be.ok;
  });

});