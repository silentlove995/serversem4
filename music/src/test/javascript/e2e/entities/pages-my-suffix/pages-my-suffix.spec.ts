import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PagesComponentsPage, PagesDeleteDialog, PagesUpdatePage } from './pages-my-suffix.page-object';

const expect = chai.expect;

describe('Pages e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let pagesComponentsPage: PagesComponentsPage;
  let pagesUpdatePage: PagesUpdatePage;
  let pagesDeleteDialog: PagesDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Pages', async () => {
    await navBarPage.goToEntity('pages-my-suffix');
    pagesComponentsPage = new PagesComponentsPage();
    await browser.wait(ec.visibilityOf(pagesComponentsPage.title), 5000);
    expect(await pagesComponentsPage.getTitle()).to.eq('musicApp.pages.home.title');
  });

  it('should load create Pages page', async () => {
    await pagesComponentsPage.clickOnCreateButton();
    pagesUpdatePage = new PagesUpdatePage();
    expect(await pagesUpdatePage.getPageTitle()).to.eq('musicApp.pages.home.createOrEditLabel');
    await pagesUpdatePage.cancel();
  });

  it('should create and save Pages', async () => {
    const nbButtonsBeforeCreate = await pagesComponentsPage.countDeleteButtons();

    await pagesComponentsPage.clickOnCreateButton();
    await promise.all([
      pagesUpdatePage.setNameInput('name'),
      pagesUpdatePage.setAvatarInput('avatar'),
      pagesUpdatePage.setIdolInput('idol')
    ]);
    expect(await pagesUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await pagesUpdatePage.getAvatarInput()).to.eq('avatar', 'Expected Avatar value to be equals to avatar');
    expect(await pagesUpdatePage.getIdolInput()).to.eq('idol', 'Expected Idol value to be equals to idol');
    await pagesUpdatePage.save();
    expect(await pagesUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await pagesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Pages', async () => {
    const nbButtonsBeforeDelete = await pagesComponentsPage.countDeleteButtons();
    await pagesComponentsPage.clickOnLastDeleteButton();

    pagesDeleteDialog = new PagesDeleteDialog();
    expect(await pagesDeleteDialog.getDialogTitle()).to.eq('musicApp.pages.delete.question');
    await pagesDeleteDialog.clickOnConfirmButton();

    expect(await pagesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
