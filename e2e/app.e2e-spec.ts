import { RoomsPage } from './app.po';

describe('rooms App', function() {
  let page: RoomsPage;

  beforeEach(() => {
    page = new RoomsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('aap works!');
  });
});
