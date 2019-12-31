import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AdsPlaylistComponentsPage, AdsPlaylistDeleteDialog, AdsPlaylistUpdatePage } from './ads-playlist-my-suffix.page-object';

const expect = chai.expect;

describe('AdsPlaylist e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let adsPlaylistComponentsPage: AdsPlaylistComponentsPage;
  let adsPlaylistUpdatePage: AdsPlaylistUpdatePage;
  let adsPlaylistDeleteDialog: AdsPlaylistDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load AdsPlaylists', async () => {
    await navBarPage.goToEntity('ads-playlist-my-suffix');
    adsPlaylistComponentsPage = new AdsPlaylistComponentsPage();
    await browser.wait(ec.visibilityOf(adsPlaylistComponentsPage.title), 5000);
    expect(await adsPlaylistComponentsPage.getTitle()).to.eq('musicApp.adsPlaylist.home.title');
  });

  it('should load create AdsPlaylist page', async () => {
    await adsPlaylistComponentsPage.clickOnCreateButton();
    adsPlaylistUpdatePage = new AdsPlaylistUpdatePage();
    expect(await adsPlaylistUpdatePage.getPageTitle()).to.eq('musicApp.adsPlaylist.home.createOrEditLabel');
    await adsPlaylistUpdatePage.cancel();
  });

  it('should create and save AdsPlaylists', async () => {
    const nbButtonsBeforeCreate = await adsPlaylistComponentsPage.countDeleteButtons();

    await adsPlaylistComponentsPage.clickOnCreateButton();
    await promise.all([
      adsPlaylistUpdatePage.setContentInput('content'),
      adsPlaylistUpdatePage.setImageInput('image'),
      adsPlaylistUpdatePage.setPlaylistIdInput('5')
    ]);
    expect(await adsPlaylistUpdatePage.getContentInput()).to.eq('content', 'Expected Content value to be equals to content');
    expect(await adsPlaylistUpdatePage.getImageInput()).to.eq('image', 'Expected Image value to be equals to image');
    expect(await adsPlaylistUpdatePage.getPlaylistIdInput()).to.eq('5', 'Expected playlistId value to be equals to 5');
    await adsPlaylistUpdatePage.save();
    expect(await adsPlaylistUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await adsPlaylistComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last AdsPlaylist', async () => {
    const nbButtonsBeforeDelete = await adsPlaylistComponentsPage.countDeleteButtons();
    await adsPlaylistComponentsPage.clickOnLastDeleteButton();

    adsPlaylistDeleteDialog = new AdsPlaylistDeleteDialog();
    expect(await adsPlaylistDeleteDialog.getDialogTitle()).to.eq('musicApp.adsPlaylist.delete.question');
    await adsPlaylistDeleteDialog.clickOnConfirmButton();

    expect(await adsPlaylistComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
