import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { FavoriteComponentsPage, FavoriteDeleteDialog, FavoriteUpdatePage } from './favorite-my-suffix.page-object';

const expect = chai.expect;

describe('Favorite e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let favoriteComponentsPage: FavoriteComponentsPage;
  let favoriteUpdatePage: FavoriteUpdatePage;
  let favoriteDeleteDialog: FavoriteDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Favorites', async () => {
    await navBarPage.goToEntity('favorite-my-suffix');
    favoriteComponentsPage = new FavoriteComponentsPage();
    await browser.wait(ec.visibilityOf(favoriteComponentsPage.title), 5000);
    expect(await favoriteComponentsPage.getTitle()).to.eq('musicApp.favorite.home.title');
  });

  it('should load create Favorite page', async () => {
    await favoriteComponentsPage.clickOnCreateButton();
    favoriteUpdatePage = new FavoriteUpdatePage();
    expect(await favoriteUpdatePage.getPageTitle()).to.eq('musicApp.favorite.home.createOrEditLabel');
    await favoriteUpdatePage.cancel();
  });

  it('should create and save Favorites', async () => {
    const nbButtonsBeforeCreate = await favoriteComponentsPage.countDeleteButtons();

    await favoriteComponentsPage.clickOnCreateButton();
    await promise.all([favoriteUpdatePage.setUserInput('user'), favoriteUpdatePage.setSongInput('song')]);
    expect(await favoriteUpdatePage.getUserInput()).to.eq('user', 'Expected User value to be equals to user');
    expect(await favoriteUpdatePage.getSongInput()).to.eq('song', 'Expected Song value to be equals to song');
    await favoriteUpdatePage.save();
    expect(await favoriteUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await favoriteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Favorite', async () => {
    const nbButtonsBeforeDelete = await favoriteComponentsPage.countDeleteButtons();
    await favoriteComponentsPage.clickOnLastDeleteButton();

    favoriteDeleteDialog = new FavoriteDeleteDialog();
    expect(await favoriteDeleteDialog.getDialogTitle()).to.eq('musicApp.favorite.delete.question');
    await favoriteDeleteDialog.clickOnConfirmButton();

    expect(await favoriteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
