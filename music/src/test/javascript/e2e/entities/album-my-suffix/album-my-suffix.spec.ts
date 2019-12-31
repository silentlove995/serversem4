import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AlbumComponentsPage, AlbumDeleteDialog, AlbumUpdatePage } from './album-my-suffix.page-object';

const expect = chai.expect;

describe('Album e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let albumComponentsPage: AlbumComponentsPage;
  let albumUpdatePage: AlbumUpdatePage;
  let albumDeleteDialog: AlbumDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Albums', async () => {
    await navBarPage.goToEntity('album-my-suffix');
    albumComponentsPage = new AlbumComponentsPage();
    await browser.wait(ec.visibilityOf(albumComponentsPage.title), 5000);
    expect(await albumComponentsPage.getTitle()).to.eq('musicApp.album.home.title');
  });

  it('should load create Album page', async () => {
    await albumComponentsPage.clickOnCreateButton();
    albumUpdatePage = new AlbumUpdatePage();
    expect(await albumUpdatePage.getPageTitle()).to.eq('musicApp.album.home.createOrEditLabel');
    await albumUpdatePage.cancel();
  });

  it('should create and save Albums', async () => {
    const nbButtonsBeforeCreate = await albumComponentsPage.countDeleteButtons();

    await albumComponentsPage.clickOnCreateButton();
    await promise.all([
      albumUpdatePage.setTitleInput('title'),
      albumUpdatePage.setDescriptionInput('description'),
      albumUpdatePage.setVocalInput('vocal'),
      albumUpdatePage.setThumbnailInput('thumbnail')
    ]);
    expect(await albumUpdatePage.getTitleInput()).to.eq('title', 'Expected Title value to be equals to title');
    expect(await albumUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
    expect(await albumUpdatePage.getVocalInput()).to.eq('vocal', 'Expected Vocal value to be equals to vocal');
    expect(await albumUpdatePage.getThumbnailInput()).to.eq('thumbnail', 'Expected Thumbnail value to be equals to thumbnail');
    await albumUpdatePage.save();
    expect(await albumUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await albumComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Album', async () => {
    const nbButtonsBeforeDelete = await albumComponentsPage.countDeleteButtons();
    await albumComponentsPage.clickOnLastDeleteButton();

    albumDeleteDialog = new AlbumDeleteDialog();
    expect(await albumDeleteDialog.getDialogTitle()).to.eq('musicApp.album.delete.question');
    await albumDeleteDialog.clickOnConfirmButton();

    expect(await albumComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
