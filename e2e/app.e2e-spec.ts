import { JtPage } from './app.po';

describe('jt App', function() {
  let page: JtPage;

  beforeEach(() => {
    page = new JtPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
