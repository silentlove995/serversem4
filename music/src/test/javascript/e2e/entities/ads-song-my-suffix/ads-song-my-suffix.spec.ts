import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AdsSongComponentsPage, AdsSongDeleteDialog, AdsSongUpdatePage } from './ads-song-my-suffix.page-object';

const expect = chai.expect;

describe('AdsSong e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let adsSongComponentsPage: AdsSongComponentsPage;
  let adsSongUpdatePage: AdsSongUpdatePage;
  let adsSongDeleteDialog: AdsSongDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load AdsSongs', async () => {
    await navBarPage.goToEntity('ads-song-my-suffix');
    adsSongComponentsPage = new AdsSongComponentsPage();
    await browser.wait(ec.visibilityOf(adsSongComponentsPage.title), 5000);
    expect(await adsSongComponentsPage.getTitle()).to.eq('musicApp.adsSong.home.title');
  });

  it('should load create AdsSong page', async () => {
    await adsSongComponentsPage.clickOnCreateButton();
    adsSongUpdatePage = new AdsSongUpdatePage();
    expect(await adsSongUpdatePage.getPageTitle()).to.eq('musicApp.adsSong.home.createOrEditLabel');
    await adsSongUpdatePage.cancel();
  });

  it('should create and save AdsSongs', async () => {
    const nbButtonsBeforeCreate = await adsSongComponentsPage.countDeleteButtons();

    await adsSongComponentsPage.clickOnCreateButton();
    await promise.all([
      adsSongUpdatePage.setContentInput('content'),
      adsSongUpdatePage.setImageInput('image'),
      adsSongUpdatePage.setSongIdInput('5')
    ]);
    expect(await adsSongUpdatePage.getContentInput()).to.eq('content', 'Expected Content value to be equals to content');
    expect(await adsSongUpdatePage.getImageInput()).to.eq('image', 'Expected Image value to be equals to image');
    expect(await adsSongUpdatePage.getSongIdInput()).to.eq('5', 'Expected songId value to be equals to 5');
    await adsSongUpdatePage.save();
    expect(await adsSongUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await adsSongComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last AdsSong', async () => {
    const nbButtonsBeforeDelete = await adsSongComponentsPage.countDeleteButtons();
    await adsSongComponentsPage.clickOnLastDeleteButton();

    adsSongDeleteDialog = new AdsSongDeleteDialog();
    expect(await adsSongDeleteDialog.getDialogTitle()).to.eq('musicApp.adsSong.delete.question');
    await adsSongDeleteDialog.clickOnConfirmButton();

    expect(await adsSongComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
