import { CiklumHomeworkPage } from './app.po';

describe('ciklum-homework App', () => {
  let page: CiklumHomeworkPage;

  beforeEach(() => {
    page = new CiklumHomeworkPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
