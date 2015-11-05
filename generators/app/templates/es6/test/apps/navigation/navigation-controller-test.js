import {Region} from 'marionette';
import NavigationController from 'apps/navigation/navigation<%= delimiter %>controller';
import helpers from 'helpers/handlebars<%= delimiter %>helpers';

helpers.initialize();

describe('NavigationController', function () {
  beforeEach(function () {
    this.region = new Region({el: 'body'});
    this.controller = new NavigationController({region: this.region});
  });

  it('should render view', function () {
    expect(this.region.$el.find('div.navbar')).<%=assert.tobeok%>;
  });

});
