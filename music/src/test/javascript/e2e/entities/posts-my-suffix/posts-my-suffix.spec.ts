import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PostsComponentsPage, PostsDeleteDialog, PostsUpdatePage } from './posts-my-suffix.page-object';

const expect = chai.expect;

describe('Posts e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let postsComponentsPage: PostsComponentsPage;
  let postsUpdatePage: PostsUpdatePage;
  let postsDeleteDialog: PostsDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Posts', async () => {
    await navBarPage.goToEntity('posts-my-suffix');
    postsComponentsPage = new PostsComponentsPage();
    await browser.wait(ec.visibilityOf(postsComponentsPage.title), 5000);
    expect(await postsComponentsPage.getTitle()).to.eq('musicApp.posts.home.title');
  });

  it('should load create Posts page', async () => {
    await postsComponentsPage.clickOnCreateButton();
    postsUpdatePage = new PostsUpdatePage();
    expect(await postsUpdatePage.getPageTitle()).to.eq('musicApp.posts.home.createOrEditLabel');
    await postsUpdatePage.cancel();
  });

  it('should create and save Posts', async () => {
    const nbButtonsBeforeCreate = await postsComponentsPage.countDeleteButtons();

    await postsComponentsPage.clickOnCreateButton();
    await promise.all([
      postsUpdatePage.setTitleInput('title'),
      postsUpdatePage.setContentInput('content'),
      postsUpdatePage.setCommentInput('comment'),
      postsUpdatePage.setImageInput('image'),
      postsUpdatePage.setLikeInput('5'),
      postsUpdatePage.setSongAddressInput('songAddress'),
      postsUpdatePage.pagesSelectLastOption()
    ]);
    expect(await postsUpdatePage.getTitleInput()).to.eq('title', 'Expected Title value to be equals to title');
    expect(await postsUpdatePage.getContentInput()).to.eq('content', 'Expected Content value to be equals to content');
    expect(await postsUpdatePage.getCommentInput()).to.eq('comment', 'Expected Comment value to be equals to comment');
    expect(await postsUpdatePage.getImageInput()).to.eq('image', 'Expected Image value to be equals to image');
    expect(await postsUpdatePage.getLikeInput()).to.eq('5', 'Expected like value to be equals to 5');
    expect(await postsUpdatePage.getSongAddressInput()).to.eq('songAddress', 'Expected SongAddress value to be equals to songAddress');
    await postsUpdatePage.save();
    expect(await postsUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await postsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Posts', async () => {
    const nbButtonsBeforeDelete = await postsComponentsPage.countDeleteButtons();
    await postsComponentsPage.clickOnLastDeleteButton();

    postsDeleteDialog = new PostsDeleteDialog();
    expect(await postsDeleteDialog.getDialogTitle()).to.eq('musicApp.posts.delete.question');
    await postsDeleteDialog.clickOnConfirmButton();

    expect(await postsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
