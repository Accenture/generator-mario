import {Region} from 'marionette';
import HomeController from 'apps/home/home<%= delimiter %>controller';
import helpers from 'helpers/handlebars<%= delimiter %>helpers';

helpers.initialize();

describe('HomeController', function () {
  beforeEach(function () {
    this.region = new Region({el: 'body'});
    this.controller = new HomeController({region: this.region});
  });

  it('should render view', function () {
    this.controller.default();
    expect(this.region.$el.find('h2')).to.be.ok;
    expect(this.region.$el.find('h2').text()).to.be.equal('Home');
  });
});
