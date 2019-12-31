import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SongsComponentsPage, SongsDeleteDialog, SongsUpdatePage } from './songs-my-suffix.page-object';

const expect = chai.expect;

describe('Songs e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let songsComponentsPage: SongsComponentsPage;
  let songsUpdatePage: SongsUpdatePage;
  let songsDeleteDialog: SongsDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Songs', async () => {
    await navBarPage.goToEntity('songs-my-suffix');
    songsComponentsPage = new SongsComponentsPage();
    await browser.wait(ec.visibilityOf(songsComponentsPage.title), 5000);
    expect(await songsComponentsPage.getTitle()).to.eq('musicApp.songs.home.title');
  });

  it('should load create Songs page', async () => {
    await songsComponentsPage.clickOnCreateButton();
    songsUpdatePage = new SongsUpdatePage();
    expect(await songsUpdatePage.getPageTitle()).to.eq('musicApp.songs.home.createOrEditLabel');
    await songsUpdatePage.cancel();
  });

  it('should create and save Songs', async () => {
    const nbButtonsBeforeCreate = await songsComponentsPage.countDeleteButtons();

    await songsComponentsPage.clickOnCreateButton();
    await promise.all([
      songsUpdatePage.setTitleInput('title'),
      songsUpdatePage.genreSelectLastOption(),
      songsUpdatePage.setVocalInput('vocal'),
      songsUpdatePage.countrySelectLastOption(),
      songsUpdatePage.setDescriptionInput('description'),
      songsUpdatePage.setSongAddressInput('songAddress'),
      songsUpdatePage.setLyricInput('lyric'),
      songsUpdatePage.setAvatarInput('avatar'),
      songsUpdatePage.setListenCountInput('5'),
      songsUpdatePage.setFavoriteCountInput('5'),
      songsUpdatePage.adsSelectLastOption(),
      songsUpdatePage.playlistSelectLastOption(),
      songsUpdatePage.albumSelectLastOption(),
      songsUpdatePage.favoriteSelectLastOption()
    ]);
    expect(await songsUpdatePage.getTitleInput()).to.eq('title', 'Expected Title value to be equals to title');
    expect(await songsUpdatePage.getVocalInput()).to.eq('vocal', 'Expected Vocal value to be equals to vocal');
    expect(await songsUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
    expect(await songsUpdatePage.getSongAddressInput()).to.eq('songAddress', 'Expected SongAddress value to be equals to songAddress');
    expect(await songsUpdatePage.getLyricInput()).to.eq('lyric', 'Expected Lyric value to be equals to lyric');
    expect(await songsUpdatePage.getAvatarInput()).to.eq('avatar', 'Expected Avatar value to be equals to avatar');
    expect(await songsUpdatePage.getListenCountInput()).to.eq('5', 'Expected listenCount value to be equals to 5');
    expect(await songsUpdatePage.getFavoriteCountInput()).to.eq('5', 'Expected favoriteCount value to be equals to 5');
    await songsUpdatePage.save();
    expect(await songsUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await songsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Songs', async () => {
    const nbButtonsBeforeDelete = await songsComponentsPage.countDeleteButtons();
    await songsComponentsPage.clickOnLastDeleteButton();

    songsDeleteDialog = new SongsDeleteDialog();
    expect(await songsDeleteDialog.getDialogTitle()).to.eq('musicApp.songs.delete.question');
    await songsDeleteDialog.clickOnConfirmButton();

    expect(await songsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
